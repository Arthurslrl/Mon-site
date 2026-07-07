'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function CountUp({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * to).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals]);
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>;
}

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.65, ease: [0.0, 0.0, 0.2, 1] as const },
  } as const;
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1800&q=85&auto=format&fit=crop"
        alt="Pizza artisanale croustillante"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C0800]/90 via-[#1C0800]/45 to-[#1C0800]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C0800]/40 via-transparent to-transparent" />

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
        className="absolute top-28 right-6 md:right-12 bg-[#CC1F1F] text-white rounded-2xl px-5 py-3 text-center shadow-xl shadow-[#CC1F1F]/30"
      >
        <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>5/5</div>
        <div className="text-xs text-white/80 mt-0.5">TripAdvisor · 30 avis</div>
        <div className="flex justify-center gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#D97706]" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <motion.p {...fade(0)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
          Valras-Plage · Livraison à domicile
        </motion.p>

        <motion.h1
          {...fade(0.1)}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pizza
          <br />
          <span className="text-[#F87171]">Sergio</span>
        </motion.h1>

        <motion.p {...fade(0.22)} className="text-lg md:text-xl text-white/80 max-w-lg mx-auto mt-6 mb-10 leading-relaxed">
          Pâte fine et croustillante, ingrédients frais chaque jour.
          Livraison soir toute l&apos;année à Valras-Plage et jardins de Sérignan.
        </motion.p>

        <motion.div {...fade(0.34)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+33467323264"
            className="relative bg-[#CC1F1F] hover:bg-[#A01818] text-white px-8 py-4 rounded-full text-base font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-[#CC1F1F]/30 flex items-center justify-center gap-2"
          >
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#CC1F1F]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            04 67 32 32 64
          </a>
          <a
            href="#menu"
            className="border-2 border-white text-white hover:bg-white hover:text-[#1C0800] px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            Voir la carte
            <motion.svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </motion.svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.46)} className="flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-white/15">
          {[
            { to: 30, suffix: '+', label: 'avis TripAdvisor 5/5' },
            { to: 815, label: 'fans sur Facebook' },
            { to: 100, suffix: '%', label: 'ingrédients frais' },
            { to: 2, suffix: ' zones', label: 'de livraison' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                <CountUp to={stat.to} suffix={stat.suffix ?? ''} />
              </p>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
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
