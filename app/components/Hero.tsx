'use client';

import { motion } from 'framer-motion';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.0, 0.0, 0.2, 1] as const },
  } as const;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FEF9F5]"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] right-[-8%] w-[700px] h-[700px] rounded-full bg-[#C41E1E]/7 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full bg-[#B8860B]/7 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#C41E1E]/4 blur-3xl" />
      </div>

      {/* Decorative pizza wheel */}
      <motion.div
        className="absolute right-[3%] top-1/2 -translate-y-1/2 opacity-[0.055] hidden xl:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 300" className="w-[560px] h-[560px]">
          <circle cx="150" cy="150" r="144" fill="#C41E1E" />
          <circle cx="150" cy="150" r="112" fill="#B8860B" />
          <circle cx="150" cy="150" r="80" fill="#E85C5C" />
          <line x1="150" y1="6" x2="150" y2="294" stroke="#FEF9F5" strokeWidth="2.5" />
          <line x1="6" y1="150" x2="294" y2="150" stroke="#FEF9F5" strokeWidth="2.5" />
          <line x1="48" y1="48" x2="252" y2="252" stroke="#FEF9F5" strokeWidth="2.5" />
          <line x1="252" y1="48" x2="48" y2="252" stroke="#FEF9F5" strokeWidth="2.5" />
          <circle cx="110" cy="108" r="13" fill="#1C0A00" opacity="0.45" />
          <circle cx="187" cy="122" r="10" fill="#1C0A00" opacity="0.45" />
          <circle cx="128" cy="188" r="11" fill="#1C0A00" opacity="0.45" />
          <circle cx="190" cy="176" r="8" fill="#1C0A00" opacity="0.45" />
          <circle cx="154" cy="146" r="7" fill="#1C0A00" opacity="0.45" />
        </svg>
      </motion.div>

      {/* Floating ornaments */}
      <motion.div
        className="absolute top-[20%] left-[7%] w-2.5 h-2.5 rounded-full bg-[#B8860B] hidden md:block"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[64%] left-[10%] w-4 h-4 rounded-full bg-[#C41E1E]/20 hidden md:block"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[35%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#B8860B]/60 hidden lg:block"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">

        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2.5 mb-8">
          <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
          <span
            className="text-[#C41E1E] text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Valras-Plage · Depuis 1985
          </span>
          <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-[clamp(4rem,12vw,9rem)] font-semibold text-[#1C0A00] leading-[0.92] tracking-[-0.02em] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pizzeria
          <br />
          <span className="text-[#C41E1E] italic">Loulou</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.22)}
          className="text-lg md:text-xl text-[#7C4A1E]/80 max-w-lg mx-auto leading-relaxed mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          L&apos;authenticité italienne au bord de la Méditerranée.
          Pâtes maison, four à bois, ingrédients du terroir héraultais.
        </motion.p>

        <motion.div {...fadeUp(0.32)} className="flex flex-col sm:flex-row gap-3.5 justify-center">
          <a
            href="#menu"
            className="bg-[#C41E1E] hover:bg-[#A01818] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-lg shadow-[#C41E1E]/25 min-h-[52px] flex items-center justify-center"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Découvrir la carte
          </a>
          <a
            href="tel:+33467013267"
            className="border border-[#C41E1E]/40 text-[#C41E1E] hover:bg-[#C41E1E]/8 px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer min-h-[52px] flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            04 67 01 32 67
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.44)}
          className="flex flex-wrap justify-center gap-10 mt-20 pt-10 border-t border-[#C41E1E]/12"
        >
          {[
            { value: '40+', label: "ans d'expérience" },
            { value: '30+', label: 'pizzas artisanales' },
            { value: '4.5★', label: '382 avis Google' },
            { value: '450°', label: 'four à bois' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl font-semibold text-[#C41E1E]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs text-[#7C4A1E]/70 mt-1.5 uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#7C4A1E]/50"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Défiler
        </span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </motion.div>
    </section>
  );
}
