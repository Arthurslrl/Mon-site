'use client';

import { motion } from 'framer-motion';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const },
  } as const;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FEF2F2]"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#DC2626]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#CA8A04]/10 blur-3xl" />
      </div>

      {/* Decorative pizza wheel */}
      <motion.div
        className="absolute right-[4%] top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 300" className="w-[520px] h-[520px]">
          <circle cx="150" cy="150" r="140" fill="#DC2626" />
          <circle cx="150" cy="150" r="110" fill="#CA8A04" />
          <circle cx="150" cy="150" r="80" fill="#F87171" />
          <line x1="150" y1="10" x2="150" y2="290" stroke="#FEF2F2" strokeWidth="3" />
          <line x1="10" y1="150" x2="290" y2="150" stroke="#FEF2F2" strokeWidth="3" />
          <line x1="47" y1="47" x2="253" y2="253" stroke="#FEF2F2" strokeWidth="3" />
          <line x1="253" y1="47" x2="47" y2="253" stroke="#FEF2F2" strokeWidth="3" />
          <circle cx="110" cy="105" r="14" fill="#450A0A" opacity="0.5" />
          <circle cx="185" cy="120" r="10" fill="#450A0A" opacity="0.5" />
          <circle cx="130" cy="185" r="12" fill="#450A0A" opacity="0.5" />
          <circle cx="192" cy="178" r="9" fill="#450A0A" opacity="0.5" />
          <circle cx="152" cy="145" r="8" fill="#450A0A" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Floating dots */}
      <motion.div
        className="absolute top-[22%] left-[8%] w-3 h-3 rounded-full bg-[#CA8A04] hidden md:block"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[62%] left-[12%] w-5 h-5 rounded-full bg-[#DC2626]/25 hidden md:block"
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 bg-[#DC2626]/10 text-[#DC2626] text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-[#DC2626]/20">
          <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
          Valras-Plage · Depuis 1985
        </motion.p>

        <motion.h1
          {...fadeUp(0.12)}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#450A0A] leading-none tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pizzeria
          <br />
          <span className="text-[#DC2626]">Loulou</span>
        </motion.h1>

        <motion.p {...fadeUp(0.24)} className="text-lg md:text-xl text-[#78350F] max-w-xl mx-auto mt-6 mb-10 leading-relaxed">
          L&apos;authenticité italienne au bord de la Méditerranée.
          Pâtes maison, four à bois, ingrédients du terroir.
        </motion.p>

        <motion.div {...fadeUp(0.36)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-4 rounded-full text-base font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-[#DC2626]/25"
          >
            Découvrir la carte
          </a>
          <a
            href="#contact"
            className="border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 cursor-pointer"
          >
            Nous trouver
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.48)} className="flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-[#DC2626]/15">
          {[
            { value: '40+', label: "ans d'expérience" },
            { value: '30+', label: 'pizzas au menu' },
            { value: '100%', label: 'produits frais' },
            { value: 'Four', label: 'à bois artisanal' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[#DC2626]" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
              <p className="text-sm text-[#78350F] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#78350F]/60"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </motion.div>
    </section>
  );
}
