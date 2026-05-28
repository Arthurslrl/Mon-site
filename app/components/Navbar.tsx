'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#menu', label: 'La Carte' },
  { href: '#about', label: 'Notre Histoire' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#avis', label: 'Avis' },
  { href: '#reservation', label: 'Réservation' },
  { href: '#acces', label: 'Accès' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
        scrolled
          ? 'bg-[#FEF9F5]/96 backdrop-blur-xl shadow-sm shadow-[#C41E1E]/8 border border-[#C41E1E]/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5" aria-label="Navigation principale">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 cursor-pointer group" aria-label="Pizzeria Loulou — accueil">
          <div className="w-9 h-9 rounded-full bg-[#C41E1E] flex items-center justify-center shadow-sm group-hover:bg-[#A01818] transition-colors duration-200 shrink-0">
            <span
              className="text-white font-semibold text-base leading-none select-none"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
              aria-hidden="true"
            >
              L
            </span>
          </div>
          <span
            className="text-xl font-semibold text-[#1C0A00] tracking-wide hidden sm:block"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Loulou
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[#1C0A00]/75 hover:text-[#C41E1E] transition-colors duration-200 font-medium text-[13px] uppercase tracking-[0.08em] cursor-pointer"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="tel:+33467013267"
          className="hidden lg:flex items-center gap-2 bg-[#C41E1E] hover:bg-[#A01818] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-md shadow-[#C41E1E]/20"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          Réserver
        </a>

        {/* Burger */}
        <button
          className="lg:hidden cursor-pointer p-2 rounded-lg hover:bg-[#C41E1E]/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1C0A00]" aria-hidden="true">
            {open
              ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              : <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-[#FEF9F5] border-t border-[#C41E1E]/10 rounded-b-2xl"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-2 text-[#1C0A00]/80 hover:text-[#C41E1E] font-medium text-sm uppercase tracking-[0.07em] cursor-pointer transition-colors duration-200 border-b border-[#C41E1E]/8 last:border-0"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+33467013267"
                className="mt-3 flex items-center justify-center gap-2 bg-[#C41E1E] hover:bg-[#A01818] text-white py-3.5 rounded-full font-semibold text-sm tracking-wide transition-colors duration-200 cursor-pointer min-h-[44px]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                04 67 01 32 67
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
