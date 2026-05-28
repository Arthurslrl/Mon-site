'use client';

import { motion } from 'framer-motion';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: [0.0, 0.0, 0.2, 1] as const },
  } as const;
}

const tags = ['Four à bois · 450°C', 'Pâtes maison', 'Produits frais', 'Depuis 1985'];

const stats = [
  { value: '40+', label: "ans d'expérience" },
  { value: '30+', label: 'pizzas au menu' },
  { value: '4.5★', label: '382 avis Google' },
  { value: '450°', label: 'cuisson au feu' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0D0500]"
    >
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-15%] w-[800px] h-[800px] rounded-full bg-[#C41E1E]/18 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B8860B]/12 blur-[100px]" />
        <div className="absolute top-[40%] left-[35%] w-[500px] h-[500px] rounded-full bg-[#C41E1E]/6 blur-[80px]" />
      </div>

      {/* Decorative pizza — desktop only, right side */}
      <motion.div
        className="absolute right-[-8%] top-1/2 -translate-y-[52%] hidden xl:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 440 440" className="w-[520px] h-[520px] opacity-90">
          {/* Plate shadow */}
          <circle cx="220" cy="228" r="208" fill="#1A0800" opacity="0.8"/>
          {/* Outer plate rim */}
          <circle cx="220" cy="220" r="210" fill="none" stroke="#C41E1E" strokeWidth="1.5" opacity="0.25"/>
          <circle cx="220" cy="220" r="204" fill="#2A0D00" opacity="0.95"/>
          {/* Crust ring */}
          <circle cx="220" cy="220" r="194" fill="#7A2400"/>
          {/* Sauce */}
          <circle cx="220" cy="220" r="178" fill="#C41E1E"/>
          {/* Cheese */}
          <circle cx="220" cy="220" r="155" fill="#D4880A"/>
          {/* Cheese blobs */}
          <circle cx="200" cy="195" r="30" fill="#E8A030" opacity="0.7"/>
          <circle cx="245" cy="210" r="24" fill="#E8A030" opacity="0.7"/>
          <circle cx="218" cy="248" r="28" fill="#E8A030" opacity="0.65"/>
          <circle cx="170" cy="235" r="22" fill="#E8A030" opacity="0.6"/>
          <circle cx="255" cy="248" r="20" fill="#E8A030" opacity="0.6"/>
          {/* Slice lines */}
          <line x1="220" y1="26" x2="220" y2="414" stroke="#1A0800" strokeWidth="2.5" opacity="0.45"/>
          <line x1="26" y1="220" x2="414" y2="220" stroke="#1A0800" strokeWidth="2.5" opacity="0.45"/>
          <line x1="73" y1="73" x2="367" y2="367" stroke="#1A0800" strokeWidth="2.5" opacity="0.45"/>
          <line x1="367" y1="73" x2="73" y2="367" stroke="#1A0800" strokeWidth="2.5" opacity="0.45"/>
          {/* Toppings */}
          <circle cx="155" cy="155" r="11" fill="#1A0800" opacity="0.55"/>
          <circle cx="278" cy="168" r="9" fill="#1A0800" opacity="0.55"/>
          <circle cx="165" cy="278" r="10" fill="#1A0800" opacity="0.55"/>
          <circle cx="285" cy="278" r="8" fill="#1A0800" opacity="0.55"/>
          <circle cx="220" cy="178" r="7" fill="#1A0800" opacity="0.5"/>
          <circle cx="178" cy="220" r="9" fill="#1A0800" opacity="0.5"/>
          <circle cx="263" cy="228" r="8" fill="#1A0800" opacity="0.5"/>
          <circle cx="225" cy="258" r="7" fill="#1A0800" opacity="0.5"/>
          {/* Outer ring decoration */}
          <circle cx="220" cy="220" r="210" fill="none" stroke="#B8860B" strokeWidth="0.5" strokeDasharray="6 5" opacity="0.3"/>
        </svg>
      </motion.div>

      {/* Floating ornaments */}
      <motion.div
        className="absolute top-[22%] left-[5%] w-1.5 h-1.5 rounded-full bg-[#B8860B] hidden md:block"
        animate={{ y: [-8, 8, -8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[68%] left-[8%] w-2.5 h-2.5 rounded-full bg-[#C41E1E]/40 hidden md:block"
        animate={{ y: [8, -8, 8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[45%] left-[16%] w-1 h-1 rounded-full bg-[#B8860B]/60 hidden lg:block"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-5 sm:px-8 pt-28 pb-12">

        {/* Top label */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center gap-3 mb-8"
        >
          <span className="block w-8 h-px bg-[#B8860B]" aria-hidden="true" />
          <span
            className="text-[#B8860B] text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Valras-Plage · Hérault · Occitanie
          </span>
        </motion.div>

        {/* Giant heading */}
        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(3.8rem,11vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.025em] text-white mb-7"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pizzeria
          <br />
          <span className="text-[#C41E1E] italic">Loulou</span>
        </motion.h1>

        {/* Ingredient tags */}
        <motion.div
          {...fadeUp(0.18)}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 bg-white/6 border border-white/10 text-white/70 text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-wide"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="w-1 h-1 rounded-full bg-[#B8860B] shrink-0" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.26)}
          className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          L&apos;authenticité italienne au bord de la Méditerranée.
          Pâtes maison, four à bois, ingrédients du terroir héraultais.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.34)}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#menu"
            className="inline-flex items-center justify-center bg-[#C41E1E] hover:bg-[#A01818] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-lg shadow-[#C41E1E]/30 min-h-[52px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Découvrir la carte
          </a>
          <a
            href="tel:+33467013267"
            className="inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white/85 hover:text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer min-h-[52px]"
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
          className="mt-14 pt-8 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center sm:text-left ${i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-8' : ''}`}
            >
              <p
                className="text-2xl sm:text-3xl font-semibold text-[#B8860B] mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {s.value}
              </p>
              <p
                className="text-[11px] text-white/40 uppercase tracking-[0.12em] leading-tight"
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
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 7, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span
          className="text-[9px] text-white/35 tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Défiler
        </span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/30">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </motion.div>
    </section>
  );
}
