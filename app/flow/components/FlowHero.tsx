'use client';

import { motion } from 'framer-motion';

const logos = ['Linear', 'Vercel', 'Stripe', 'Notion', 'Figma'];

function MockupDashboard() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow behind mockup */}
      <div className="absolute inset-0 -m-8 rounded-3xl bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="h-5 w-28 bg-white/10 rounded-full" />
          <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-500/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded bg-indigo-400" />
          </div>
        </div>

        {/* Focus timer */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-indigo-300 font-medium uppercase tracking-wider">Focus Session</span>
            <span className="text-xs text-slate-400">Deep Work</span>
          </div>
          <div className="text-4xl font-bold text-white text-center mb-3 tracking-tight">24:37</div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-2.5">
          {[
            { label: 'Review Q3 roadmap deck', done: true, color: 'bg-green-400' },
            { label: 'Design system audit', done: false, color: 'bg-indigo-400' },
            { label: 'Sync with engineering', done: false, color: 'bg-violet-400' },
          ].map(task => (
            <div key={task.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${task.done ? 'bg-white/3 opacity-50' : 'bg-white/5 border border-white/8'}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${task.done ? 'bg-green-500/30 border-green-500/50' : 'border-white/20'}`}>
                {task.done && (
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-green-400"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                )}
              </div>
              <span className={`text-xs flex-1 ${task.done ? 'line-through text-slate-500' : 'text-slate-300'}`}>{task.label}</span>
              <div className={`w-2 h-2 rounded-full ${task.color} opacity-70`} />
            </div>
          ))}
        </div>

        {/* AI suggestion pill */}
        <div className="mt-4 flex items-center gap-2.5 bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </div>
          <span className="text-xs text-violet-300">AI suggests: schedule sync after 3pm for better focus</span>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-white font-medium">In flow state</span>
      </motion.div>

      {/* Floating stat */}
      <motion.div
        className="absolute -bottom-4 -left-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 shadow-xl"
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs text-slate-400">Productivity</p>
        <p className="text-lg font-bold text-white">+47%</p>
      </motion.div>
    </div>
  );
}

export default function FlowHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orbs */}
        <motion.div
          className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)', filter: 'blur(40px)' }}
          animate={{ x: [-40, 40, -40], y: [-20, 20, -20] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)', filter: 'blur(50px)' }}
          animate={{ x: [30, -30, 30], y: [30, -30, 30] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 65%)', filter: 'blur(60px)' }}
          animate={{ x: [-20, 20, -20], y: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Now in public beta · 50,000+ teams onboarded
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Work at the
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              speed of thought
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-lg mb-10"
          >
            Flow eliminates context switching, surfaces what matters, and keeps your team in a state of deep, uninterrupted focus — every single day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a href="#" className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer shadow-xl shadow-indigo-500/25">
              Start for free
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-slate-300" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
              Watch demo
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-white/8"
          >
            <div className="flex -space-x-2">
              {['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050508] flex items-center justify-center text-[10px] font-bold text-white" style={{ background: c }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-yellow-400" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <p className="text-xs text-slate-500">Trusted by <span className="text-slate-300 font-medium">50,000+</span> professionals</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              {logos.slice(0, 3).map(l => (
                <span key={l} className="text-xs text-slate-500 font-semibold tracking-wide">{l}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.0, 0.0, 0.2, 1] }}
          className="hidden lg:block"
        >
          <MockupDashboard />
        </motion.div>
      </div>
    </section>
  );
}
