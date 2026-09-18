import Link from 'next/link';
import Game from './components/Game';

export default function GamePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black py-6 px-3">
      <div className="w-full max-w-[420px] flex items-center justify-between mb-3 px-1">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
        >
          ← Accueil
        </Link>
        <span className="text-[11px] uppercase tracking-[0.15em] text-cyan-400/80">
          Canyon Squad
        </span>
      </div>
      <Game />
      <p className="mt-4 max-w-[420px] text-center text-[11px] text-white/35 px-2">
        Flèches / A-D ou tap gauche-droite pour changer de voie. Traverse les portails{' '}
        <span className="text-cyan-400">x2</span>, détruis les ennemis, abats le boss.
      </p>
    </main>
  );
}
