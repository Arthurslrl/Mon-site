'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Phase = 'menu' | 'playing' | 'boss' | 'win' | 'gameover';
type Lane = 0 | 1 | 2;
type ObstacleType = 'gate' | 'enemy' | 'boss';

interface Obstacle {
  id: number;
  type: ObstacleType;
  lane: Lane;
  t: number; // 1 = spawn at horizon, 0 = at player
  value: number; // gate multiplier, enemy count, or boss max hp
  resolved: boolean;
}

interface Decor {
  id: number;
  t: number;
}

interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Flash {
  text: string;
  color: string;
  life: number;
}

const W = 390;
const H = 693;
const LANE_X = [0.2, 0.5, 0.8];
const VANISH_X = 0.5;
const HORIZON_Y = 0.3;
const PLAYER_Y = 0.86;
const PLAYER_T_THRESHOLD = 0.045;
const BOSS_STOP_T = 0.5;
const BOSS_DISTANCE = 2600;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function project(lane: number, t: number) {
  const clampedT = Math.max(0, Math.min(1, t));
  const y = lerp(PLAYER_Y * H, HORIZON_Y * H, clampedT);
  const laneCloseX = LANE_X[lane] * W;
  const x = lerp(laneCloseX, VANISH_X * W, clampedT);
  const scale = lerp(1, 0.14, Math.pow(clampedT, 0.85));
  return { x, y, scale };
}

interface GameData {
  phase: Phase;
  lane: Lane;
  squad: number;
  score: number;
  distance: number;
  obstacles: Obstacle[];
  decor: Decor[];
  coins: Coin[];
  flashes: Flash[];
  spawnTimer: number;
  decorTimer: number;
  nextId: number;
  bossHp: number;
  bossMaxHp: number;
  bossChipTimer: number;
  bossT: number;
  shake: number;
}

function freshData(): GameData {
  return {
    phase: 'menu',
    lane: 1,
    squad: 6,
    score: 0,
    distance: 0,
    obstacles: [],
    decor: [],
    coins: [],
    flashes: [],
    spawnTimer: 0.6,
    decorTimer: 0.2,
    nextId: 1,
    bossHp: 0,
    bossMaxHp: 0,
    bossChipTimer: 0,
    bossT: BOSS_STOP_T,
    shake: 0,
  };
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataRef = useRef<GameData>(freshData());
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>('menu');
  const [summary, setSummary] = useState({ score: 0, squad: 0 });

  const startRun = useCallback(() => {
    dataRef.current = freshData();
    dataRef.current.phase = 'playing';
    setPhase('playing');
  }, []);

  const moveLane = useCallback((dir: -1 | 1) => {
    const d = dataRef.current;
    if (d.phase !== 'playing' && d.phase !== 'boss') return;
    const next = Math.max(0, Math.min(2, d.lane + dir)) as Lane;
    d.lane = next;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLane(-1);
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveLane(1);
      else if (e.key === ' ' || e.key === 'Enter') {
        const p = dataRef.current.phase;
        if (p === 'menu' || p === 'gameover' || p === 'win') startRun();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [moveLane, startRun]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const p = dataRef.current.phase;
      if (p === 'menu' || p === 'gameover' || p === 'win') {
        startRun();
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      moveLane(relX < 0.5 ? -1 : 1);
    },
    [moveLane, startRun]
  );

  const spawnFlash = (d: GameData, text: string, color: string) => {
    d.flashes.push({ text, color, life: 0.8 });
  };

  const spawnCoins = (d: GameData, x: number, y: number, n: number) => {
    const count = Math.min(40, Math.max(6, n));
    for (let i = 0; i < count; i++) {
      d.coins.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 220,
        vy: -260 - Math.random() * 160,
        life: 1.1 + Math.random() * 0.5,
      });
    }
  };

  const resolveObstacle = useCallback((d: GameData, o: Obstacle) => {
    const { x, y } = project(o.lane, 0.03);
    if (o.type === 'gate') {
      if (o.lane === d.lane) {
        d.squad = Math.min(9999, Math.round(d.squad * o.value));
        spawnFlash(d, `x${o.value}`, '#67e8f9');
        d.shake = 6;
      }
    } else if (o.type === 'enemy') {
      if (o.lane === d.lane) {
        if (d.squad > o.value) {
          const losses = Math.ceil(o.value * 0.3);
          d.squad = Math.max(1, d.squad - losses);
          d.score += o.value * 15;
          spawnCoins(d, x, y, o.value);
          spawnFlash(d, `+${o.value * 15}`, '#fde047');
        } else {
          d.squad = Math.max(0, d.squad - Math.ceil(o.value * 0.6));
          spawnFlash(d, 'IMPACT', '#f87171');
          d.shake = 10;
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const tick = (ts: number) => {
      const d = dataRef.current;
      const last = lastTsRef.current ?? ts;
      const dt = Math.min(0.05, (ts - last) / 1000);
      lastTsRef.current = ts;

      if (d.phase === 'playing') {
        d.distance += 160 * dt;
        const speed = Math.min(0.52, 0.32 + d.distance / 9000);

        d.spawnTimer -= dt;
        if (d.spawnTimer <= 0) {
          const isGate = Math.random() < 0.55;
          const lane = Math.floor(Math.random() * 3) as Lane;
          const wave = Math.floor(d.distance / 400);
          d.obstacles.push({
            id: d.nextId++,
            type: isGate ? 'gate' : 'enemy',
            lane,
            t: 1,
            value: isGate ? 2 : Math.min(30, 2 + wave * 2 + Math.floor(Math.random() * 3)),
            resolved: false,
          });
          d.spawnTimer = Math.max(0.65, 1.3 - d.distance / 8000);
        }

        for (const o of d.obstacles) {
          o.t -= speed * dt;
          if (!o.resolved && o.t <= PLAYER_T_THRESHOLD) {
            o.resolved = true;
            resolveObstacle(d, o);
          }
        }
        d.obstacles = d.obstacles.filter((o) => o.t > -0.05);

        if (d.squad <= 0) {
          d.phase = 'gameover';
          setPhase('gameover');
          setSummary({ score: Math.round(d.score), squad: 0 });
        } else if (d.distance >= BOSS_DISTANCE) {
          d.phase = 'boss';
          d.obstacles = [];
          d.bossMaxHp = 520;
          d.bossHp = 520;
          d.bossT = 1;
          d.bossChipTimer = 0;
          setPhase('boss');
        }
      } else if (d.phase === 'boss') {
        if (d.bossT > BOSS_STOP_T) {
          d.bossT -= 0.25 * dt;
          if (d.bossT < BOSS_STOP_T) d.bossT = BOSS_STOP_T;
        } else {
          d.bossHp -= d.squad * 2.1 * dt;
          d.bossChipTimer += dt;
          if (d.bossChipTimer >= 0.45) {
            d.bossChipTimer = 0;
            d.squad = Math.max(0, d.squad - 1);
            d.shake = 4;
          }
          if (d.bossHp <= 0) {
            const { x, y } = project(1, BOSS_STOP_T);
            spawnCoins(d, x, y, 60);
            d.score += 1000;
            d.phase = 'win';
            setPhase('win');
            setSummary({ score: Math.round(d.score), squad: d.squad });
          } else if (d.squad <= 0) {
            d.phase = 'gameover';
            setPhase('gameover');
            setSummary({ score: Math.round(d.score), squad: 0 });
          }
        }
      }

      // decorative arches always drift, even outside 'playing'
      if (d.phase === 'playing') {
        d.decorTimer -= dt;
        if (d.decorTimer <= 0) {
          d.decor.push({ id: d.nextId++, t: 1 });
          d.decorTimer = 1.8 + Math.random() * 0.8;
        }
      }
      for (const arch of d.decor) arch.t -= 0.12 * dt;
      d.decor = d.decor.filter((a) => a.t > -0.1);

      // coin physics
      for (const c of d.coins) {
        c.vy += 700 * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.life -= dt;
      }
      d.coins = d.coins.filter((c) => c.life > 0);

      d.flashes.forEach((f) => (f.life -= dt));
      d.flashes = d.flashes.filter((f) => f.life > 0);

      d.shake = Math.max(0, d.shake - dt * 30);

      draw(ctx, d);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [resolveObstacle]);

  return (
    <div className="relative w-full max-w-[420px] select-none">
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        style={{ width: '100%', height: 'auto', aspectRatio: `${W} / ${H}` }}
        className="rounded-2xl border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.12)] bg-black touch-none"
      />

      {phase !== 'playing' && phase !== 'boss' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm px-6 text-center gap-4">
          {phase === 'menu' && (
            <>
              <h1 className="text-2xl font-bold text-cyan-300 tracking-wide">CANYON SQUAD</h1>
              <p className="text-white/60 text-sm max-w-[260px]">
                Franchis les portails <span className="text-cyan-400">x2</span>, écrase les
                ennemis, abats le scorpion doré.
              </p>
              <button
                onClick={startRun}
                className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold text-sm tracking-wide hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                JOUER
              </button>
            </>
          )}
          {phase === 'gameover' && (
            <>
              <h1 className="text-2xl font-bold text-red-400 tracking-wide">ESCOUADE ANÉANTIE</h1>
              <p className="text-white/70 text-sm">Score : {summary.score}</p>
              <button
                onClick={startRun}
                className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold text-sm tracking-wide hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                REJOUER
              </button>
            </>
          )}
          {phase === 'win' && (
            <>
              <h1 className="text-2xl font-bold text-amber-300 tracking-wide">SCORPION VAINCU</h1>
              <p className="text-white/70 text-sm">
                Score : {summary.score} · Escouade restante : {summary.squad}
              </p>
              <button
                onClick={startRun}
                className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold text-sm tracking-wide hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                REJOUER
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function draw(ctx: CanvasRenderingContext2D, d: GameData) {
  const shakeX = d.shake ? (Math.random() - 0.5) * d.shake : 0;
  const shakeY = d.shake ? (Math.random() - 0.5) * d.shake : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);

  // sky / canyon gradient (golden hour)
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#3a1408');
  sky.addColorStop(0.35, '#8a3a12');
  sky.addColorStop(0.55, '#d97a2e');
  sky.addColorStop(1, '#f2b25c');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // sun glow at horizon
  const glow = ctx.createRadialGradient(
    VANISH_X * W,
    HORIZON_Y * H,
    4,
    VANISH_X * W,
    HORIZON_Y * H,
    220
  );
  glow.addColorStop(0, 'rgba(255,230,180,0.9)');
  glow.addColorStop(1, 'rgba(255,230,180,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // canyon walls
  ctx.fillStyle = '#5c2410';
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, H * 0.55);
  ctx.lineTo(VANISH_X * W - 40, HORIZON_Y * H);
  ctx.lineTo(VANISH_X * W - 10, HORIZON_Y * H);
  ctx.lineTo(0, H * 0.75);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(W, H);
  ctx.lineTo(W, H * 0.55);
  ctx.lineTo(VANISH_X * W + 40, HORIZON_Y * H);
  ctx.lineTo(VANISH_X * W + 10, HORIZON_Y * H);
  ctx.lineTo(W, H * 0.75);
  ctx.closePath();
  ctx.fill();

  // lane guide lines
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1.5;
  const laneEdges = [-0.5, 0.5, 1.5, 2.5];
  for (const edge of laneEdges) {
    const laneFrac = LANE_X[1] + (edge - 1) * (LANE_X[1] - LANE_X[0]);
    const bottom = { x: laneFrac * W, y: PLAYER_Y * H };
    const top = { x: VANISH_X * W, y: HORIZON_Y * H };
    ctx.beginPath();
    ctx.moveTo(bottom.x, bottom.y);
    ctx.lineTo(top.x, top.y);
    ctx.stroke();
  }

  // gather drawable world items sorted far -> near
  type Drawable = { t: number; draw: () => void };
  const drawables: Drawable[] = [];

  for (const arch of d.decor) {
    if (arch.t <= 0 || arch.t > 1) continue;
    drawables.push({
      t: arch.t,
      draw: () => drawArch(ctx, arch.t),
    });
  }

  if (d.phase === 'playing') {
    for (const o of d.obstacles) {
      if (o.t > 1 || o.t < -0.05) continue;
      drawables.push({ t: o.t, draw: () => drawObstacle(ctx, o) });
    }
  }

  drawables.sort((a, b) => b.t - a.t);
  for (const item of drawables) item.draw();

  // boss
  if (d.phase === 'boss') {
    drawBoss(ctx, d);
  }

  // squad
  drawSquad(ctx, d);

  // laser beams during combat
  if (d.phase === 'boss' && d.bossT <= BOSS_STOP_T + 0.001) {
    drawLasers(ctx, d.lane, project(1, BOSS_STOP_T));
  }

  // coins
  ctx.save();
  for (const c of d.coins) {
    const alpha = Math.max(0, Math.min(1, c.life));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // flashes
  ctx.save();
  ctx.textAlign = 'center';
  d.flashes.forEach((f, i) => {
    const alpha = Math.max(0, Math.min(1, f.life / 0.8));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = f.color;
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(f.text, W / 2, H * 0.4 - i * 26 - (0.8 - f.life) * 40);
  });
  ctx.restore();

  ctx.restore();

  // HUD (not affected by shake)
  drawHud(ctx, d);
}

function drawArch(ctx: CanvasRenderingContext2D, t: number) {
  const left = project(-0.6, t);
  const right = project(2.6, t);
  const top = project(1, t);
  const height = 90 * left.scale;
  ctx.fillStyle = `rgba(60,25,10,${0.5 + 0.5 * (1 - t)})`;
  ctx.fillRect(left.x, top.y - height, 14 * left.scale, height);
  ctx.fillRect(right.x - 14 * right.scale, top.y - height, 14 * right.scale, height);
  ctx.fillRect(left.x, top.y - height, right.x - left.x, 10 * left.scale);
}

function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle) {
  const { x, y, scale } = project(o.lane, o.t);
  if (o.type === 'gate') {
    const w = 70 * scale;
    const h = 130 * scale;
    ctx.save();
    ctx.globalAlpha = 0.85;
    const grad = ctx.createLinearGradient(x - w / 2, y - h, x + w / 2, y);
    grad.addColorStop(0, 'rgba(34,211,238,0.15)');
    grad.addColorStop(0.5, 'rgba(103,232,249,0.55)');
    grad.addColorStop(1, 'rgba(34,211,238,0.15)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - w / 2, y - h, w, h);
    ctx.strokeStyle = '#a5f3fc';
    ctx.lineWidth = Math.max(1, 2 * scale);
    ctx.strokeRect(x - w / 2, y - h, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.max(10, 20 * scale)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`x${o.value}`, x, y - h / 2 + 6 * scale);
    ctx.restore();
  } else if (o.type === 'enemy') {
    const n = Math.min(8, Math.max(2, Math.round(o.value / 3)));
    const spread = 30 * scale;
    for (let i = 0; i < n; i++) {
      const ox = x + (i - (n - 1) / 2) * (spread / Math.max(1, n - 1) + 6 * scale);
      drawSoldier(ctx, ox, y, scale * 0.9, '#dc2626', '#7f1d1d');
    }
    ctx.fillStyle = '#fecaca';
    ctx.font = `bold ${Math.max(9, 13 * scale)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`${o.value}`, x, y - 34 * scale);
  }
}

function drawSoldier(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  body: string,
  dark: string
) {
  const w = 10 * scale;
  const h = 20 * scale;
  ctx.fillStyle = dark;
  ctx.fillRect(x - w / 2, y - h, w, h);
  ctx.fillStyle = body;
  ctx.fillRect(x - w / 2 + 1.5 * scale, y - h + 1.5 * scale, w - 3 * scale, h - 6 * scale);
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(x, y - h + 1.5 * scale, w * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawSquad(ctx: CanvasRenderingContext2D, d: GameData) {
  const { x, y, scale } = project(d.lane, 0);
  const count = Math.min(24, Math.max(1, d.squad));
  const cols = Math.min(6, count);
  const gap = 16;
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = x + (col - (cols - 1) / 2) * gap;
    const oy = y - row * 16;
    drawSoldier(ctx, ox, oy, scale, '#22d3ee', '#0e7490');
  }
  if (d.squad > 24) {
    ctx.fillStyle = '#cffafe';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`x${d.squad}`, x, y + 22);
  }
}

function drawLasers(
  ctx: CanvasRenderingContext2D,
  lane: Lane,
  target: { x: number; y: number }
) {
  const { x, y } = project(lane, 0);
  ctx.save();
  ctx.strokeStyle = `rgba(103,232,249,${0.5 + Math.random() * 0.4})`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x + (Math.random() - 0.5) * 20, y - 10);
    ctx.lineTo(target.x + (Math.random() - 0.5) * 30, target.y + (Math.random() - 0.5) * 30);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBoss(ctx: CanvasRenderingContext2D, d: GameData) {
  const { x, y, scale } = project(1, d.bossT);
  const s = scale * 3.2;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.ellipse(0, 0, 60 * s, 34 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.ellipse(0, -4 * s, 46 * s, 24 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // pincers
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(-50 * s, -10 * s);
  ctx.lineTo(-85 * s, -30 * s);
  ctx.lineTo(-65 * s, -5 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(50 * s, -10 * s);
  ctx.lineTo(85 * s, -30 * s);
  ctx.lineTo(65 * s, -5 * s);
  ctx.closePath();
  ctx.fill();
  // tail + stinger
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 10 * s;
  ctx.beginPath();
  ctx.moveTo(0, 10 * s);
  ctx.quadraticCurveTo(30 * s, 40 * s, 10 * s, 60 * s);
  ctx.stroke();
  ctx.fillStyle = '#fb923c';
  ctx.beginPath();
  ctx.arc(10 * s, 60 * s, 6 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // boss hp bar
  if (d.bossMaxHp > 0) {
    const barW = 220;
    const pct = Math.max(0, d.bossHp / d.bossMaxHp);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(W / 2 - barW / 2, 54, barW, 10);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(W / 2 - barW / 2, 54, barW * pct, 10);
    ctx.strokeStyle = '#fde68a';
    ctx.strokeRect(W / 2 - barW / 2, 54, barW, 10);
  }
}

function drawHud(ctx: CanvasRenderingContext2D, d: GameData) {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(0, 0, W, 40);
  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Score ${Math.round(d.score)}`, 12, 25);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#22d3ee';
  ctx.fillText(`Squad ${d.squad}`, W - 12, 25);
  if (d.phase === 'boss') {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('BOSS', W / 2, 25);
  }
  ctx.restore();
}
