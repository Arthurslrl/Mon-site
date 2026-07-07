'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#menu', label: 'La Carte' },
  { href: '#about', label: 'Notre Pizzeria' },
  { href: '#reviews', label: 'Avis' },
  { href: '#contact', label: 'Horaires & Livraison' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFBF5]/95 backdrop-blur-md shadow-md border border-[#CC1F1F]/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-[#CC1F1F] flex items-center justify-center shadow-sm group-hover:bg-[#A01818] transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-[#1C0800] tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Pizza Sergio
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[#1C0800] hover:text-[#CC1F1F] transition-colors duration-200 font-medium text-sm cursor-pointer"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="tel:+33467323264"
          className="hidden md:flex items-center gap-2 bg-[#CC1F1F] hover:bg-[#A01818] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          Commander
        </a>

        {/* Burger */}
        <button
          className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-[#CC1F1F]/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1C0800]" aria-hidden="true">
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#FFFBF5] border-t border-[#CC1F1F]/10 rounded-b-2xl"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[#1C0800] hover:text-[#CC1F1F] font-medium cursor-pointer transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+33467323264"
                className="mt-2 block bg-[#CC1F1F] hover:bg-[#A01818] text-white text-center py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer"
              >
                04 67 32 32 64
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
