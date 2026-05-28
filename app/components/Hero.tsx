'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.85, ease: [0.0, 0.0, 0.2, 1] as const },
  } as const;
}

const tags = ['Four à bois · 450°C', 'Pâtes maison', 'Ingrédients frais', 'Depuis 1985'];

const stats = [
  { value: '40+', label: "ans d'expérience" },
  { value: '30+', label: 'pizzas artisanales' },
  { value: '4.5★', label: '382 avis Google' },
  { value: '450°', label: 'cuisson au feu' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Accueil Pizzeria Loulou"
    >
      {/* Real pizza photo */}
      <Image
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&h=1080&fit=crop&q=88"
        alt="Pizza artisanale au four à bois — Pizzeria Loulou Valras-Plage"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay — dark bottom + left edge for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,3,0,0.95) 0%, rgba(10,3,0,0.72) 35%, rgba(10,3,0,0.42) 65%, rgba(10,3,0,0.28) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Left vignette for editorial feel */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: 'linear-gradient(to right, rgba(10,3,0,0.55) 0%, transparent 55%)' }}
        aria-hidden="true"
      />

      {/* Floating ornament dots — statiques, pas d'animation continue (anti-pattern UX) */}
      <div
        className="absolute top-[18%] right-[12%] w-2 h-2 rounded-full bg-[#CA8A04]/50 hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-[55%] right-[7%] w-3 h-3 rounded-full bg-[#DC2626]/35 hidden lg:block"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-6xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-28 pb-10 sm:pb-14">

        {/* Italian tricolor accent */}
        <motion.div {...fadeUp(0)} className="flex gap-1 mb-5" aria-hidden="true">
          <span className="block w-8 h-[3px] bg-[#4A9040] rounded-full" />
          <span className="block w-8 h-[3px] bg-white/45 rounded-full" />
          <span className="block w-8 h-[3px] bg-[#DC2626] rounded-full" />
        </motion.div>

        <motion.div {...fadeUp(0.06)} className="flex items-center gap-3 mb-6">
          <span className="block w-7 h-px bg-[#CA8A04]" aria-hidden="true" />
          <span
            className="text-[#CA8A04] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Valras-Plage · Hérault · Depuis 1985
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.14)}
          className="text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.025em] text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pizzeria
          <br />
          <em className="text-[#DC2626] not-italic italic">Loulou</em>
        </motion.h1>

        {/* Tags */}
        <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/15 text-white/80 text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-wide"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="w-1 h-1 rounded-full bg-[#CA8A04] shrink-0" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.p
          {...fadeUp(0.26)}
          className="text-white/65 text-sm sm:text-base max-w-md leading-relaxed mb-8"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          L&apos;authenticité italienne au bord de la Méditerranée.
          Pâtes maison, ingrédients du terroir héraultais.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.34)} className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-14">
          <a
            href="#reservation"
            className="inline-flex items-center justify-center bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-lg shadow-black/30 min-h-[52px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Réserver une table
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 hover:bg-white/8 text-white/85 hover:text-white backdrop-blur-sm px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer min-h-[52px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Voir la carte
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.44)}
          className="pt-6 border-t border-white/12 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-0"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`${i > 0 ? 'sm:border-l sm:border-white/12 sm:pl-7' : ''}`}
            >
              <p
                className="text-xl sm:text-2xl font-semibold text-[#CA8A04]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {s.value}
              </p>
              <p
                className="text-[10px] text-white/40 uppercase tracking-[0.12em] mt-0.5 leading-tight"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 6, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="text-[9px] text-white/40 tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
          Défiler
        </span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/30">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </motion.div>
    </section>
  );
}
