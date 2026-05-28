'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#C41E1E]" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    title: 'Produits locaux',
    desc: 'Tomates, herbes et légumes sourcés auprès des producteurs de l\'Hérault, chaque matin au marché de Valras.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#C41E1E]" aria-hidden="true">
        <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.45 2.01-3.48 5.21-2.87 8.21.08.46.22.9.49 1.29.26.4.62.77 1.06.94.76.3 1.56-.06 2.15-.51.61-.46 1.03-1.13 1.36-1.83.33-.7.51-1.5.8-2.22.29-.73.82-1.43 1.52-1.65.14-.05.29-.08.44-.08.17 0 .35.04.5.12.32.16.5.5.5.86 0 .03 0 .06-.01.09.39 1.09.47 2.27.14 3.39-.35 1.15-1.08 2.13-2.02 2.83-.93.7-2.03 1.11-3.15 1.22-2.5.24-4.92-.72-6.36-2.72C4.49 13.7 4 12.06 4 10.39c0-2.13.72-4.22 1.97-5.93C6.86 3.25 8 2.24 9.3 1.51c-.69 1.07-1.04 2.31-.98 3.55.03.62.15 1.24.35 1.83.46 1.32 1.34 2.46 2.47 3.23.48.33.99.59 1.53.77.19.06.39.11.59.14z"/>
      </svg>
    ),
    title: 'Four à bois artisanal',
    desc: 'Notre four en pierre réfractaire chauffe à 450°C pour une cuisson parfaite en 90 secondes — croûte croustillante garantie.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#C41E1E]" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    title: 'Recettes authentiques',
    desc: 'Les recettes de la famille Rossi, transmises de génération en génération depuis Naples, respectées à la lettre depuis 1985.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-6 bg-[#FFF5F5]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
              <p
                className="text-[#C41E1E] text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Notre Histoire
              </p>
            </div>
            <h2
              className="text-5xl font-semibold text-[#1C0A00] leading-[1.05] tracking-[-0.01em] mb-7"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              40 ans de passion
              <br />
              <span className="text-[#C41E1E] italic">au bord de la mer</span>
            </h2>
            <div
              className="space-y-4 text-[#7C4A1E]/80 leading-relaxed text-[15px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <p>
                C&apos;est en 1985 que Luigi &laquo;&nbsp;Loulou&nbsp;&raquo; Rossi a posé ses valises à Valras-Plage,
                avec dans ses bagages les recettes de sa grand-mère napolitaine et un rêve simple&nbsp;:
                partager l&apos;authenticité de la cuisine italienne avec les habitants du littoral héraultais.
              </p>
              <p>
                Quarante ans plus tard, la Pizzeria Loulou est une institution incontournable de la côte.
                Chaque pizza sort de notre four à bois centenaire, construit pierre par pierre par Luigi lors de l&apos;ouverture.
              </p>
              <p>
                Aujourd&apos;hui, c&apos;est la famille au complet qui perpétue la tradition,
                avec la même exigence et la même générosité qu&apos;au premier jour.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 mt-9 bg-[#B8860B] hover:bg-[#9A7009] text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-md shadow-[#B8860B]/20 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Venir nous voir
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </a>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1], delay: 0.12 }}
            className="space-y-4"
          >
            {/* Decorative stat card */}
            <div className="bg-[#C41E1E] rounded-2xl p-7 text-white">
              <p
                className="text-5xl font-semibold mb-1.5 tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                +40 000
              </p>
              <p
                className="text-white/70 text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                pizzas cuites au four à bois chaque année
              </p>
              <div className="mt-5 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-[#B8860B]" aria-hidden="true">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span
                  className="text-white/70 text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  4.5 / 5 · 382 avis Google
                </span>
              </div>
            </div>

            {/* Value cards */}
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.28 + i * 0.1, ease: [0.0, 0.0, 0.2, 1] }}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-[#C41E1E]/8 hover:border-[#C41E1E]/20 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#C41E1E]/8 flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold text-[#1C0A00] mb-1 text-[15px]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm text-[#7C4A1E]/70 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
