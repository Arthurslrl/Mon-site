'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const highlights = [
  { title: 'Four à bois traditionnel', desc: 'Cuisson à haute température, comme en Italie.' },
  { title: 'Pâtes maison', desc: 'Pétries et levées sur place chaque jour.' },
  { title: 'Ingrédients du terroir', desc: 'Produits frais sélectionnés localement.' },
];

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="avis" aria-labelledby="reviews-title" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#EFE1BC]" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-[#4A7040]" aria-hidden="true" />
            <p
              className="text-[#C41E1E] text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Avis clients
            </p>
            <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
          </div>
          <h2
            id="reviews-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C0A00] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Venez juger par vous-même
          </h2>
          <p
            className="mt-4 text-[#7C4A1E]/80 max-w-lg mx-auto text-[15px] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Nos avis clients sont en cours de mise à jour sur cette page.
            En attendant, retrouvez les retours vérifiés de nos clients directement sur Google et TripAdvisor.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4 mt-12"
        >
          {highlights.map((h) => (
            <div key={h.title} className="bg-white rounded-2xl p-5 border border-[#C41E1E]/8 text-left">
              <p className="font-semibold text-[#1C0A00] text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {h.title}
              </p>
              <p className="text-[13px] text-[#7C4A1E]/75 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {h.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://www.google.com/search?q=Pizzeria+Loulou+Valras-Plage+avis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C41E1E] hover:bg-[#A01818] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-md shadow-[#C41E1E]/20"
          >
            Voir les avis Google
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7z"/>
            </svg>
          </a>
          <a
            href="https://www.tripadvisor.fr/Search?q=Pizzeria%20Loulou%20Valras-Plage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-[#C41E1E]/20 hover:border-[#C41E1E]/40 text-[#1C0A00] px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            Chercher sur TripAdvisor
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
