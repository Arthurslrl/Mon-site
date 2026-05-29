'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#', label: 'Blog' },
];

export default function FlowNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <a href="/flow" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Flow</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer px-4 py-2">
            Sign in
          </a>
          <a href="#" className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-500/20">
            Get started free
          </a>
        </div>

        <button
          className="md:hidden p-2 cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-300">
            {open
              ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              : <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden overflow-hidden border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-2 text-slate-300 hover:text-white transition-colors cursor-pointer text-sm">
                {l.label}
              </a>
            ))}
            <a href="#" className="mt-2 text-center bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-semibold text-sm cursor-pointer">
              Get started free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
