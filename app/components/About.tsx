'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#DC2626]" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    title: 'Produits locaux',
    desc: 'Tomates, herbes et légumes sourcés auprès des producteurs de l\'Hérault, chaque matin au marché de Valras.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#DC2626]" aria-hidden="true">
        <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3zm0 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    title: 'Four à bois artisanal',
    desc: 'Notre four en pierre réfractaire chauffe à 450°C pour une cuisson parfaite en 90 secondes, croûte croustillante garantie.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#DC2626]" aria-hidden="true">
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-[#DC2626] font-semibold text-sm uppercase tracking-widest mb-4">Notre Histoire</p>
            <h2
              className="text-5xl font-bold text-[#450A0A] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              40 ans de passion
              <br />
              <span className="text-[#DC2626]">au bord de la mer</span>
            </h2>
            <div className="space-y-4 text-[#78350F] leading-relaxed">
              <p>
                C&apos;est en 1985 que Luigi &quot;Loulou&quot; Rossi a posé ses valises à Valras-Plage, avec dans ses bagages les recettes de sa grand-mère napolitaine et un rêve simple : partager l&apos;authenticité de la cuisine italienne avec les habitants du littoral héraultais.
              </p>
              <p>
                Quarante ans plus tard, la Pizzeria Loulou est devenue une institution incontournable de la côte. Chaque pizza sort de notre four à bois centenaire, construit pierre par pierre par Luigi lui-même lors de l&apos;ouverture.
              </p>
              <p>
                Aujourd&apos;hui, c&apos;est la famille au complet qui perpétue la tradition, avec la même exigence et la même générosité qu&apos;au premier jour.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 bg-[#CA8A04] hover:bg-[#A16207] text-white px-7 py-3.5 rounded-full font-semibold transition-colors duration-200 cursor-pointer shadow-md shadow-[#CA8A04]/20"
            >
              Venir nous voir
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </a>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="space-y-5"
          >
            {/* Decorative card */}
            <div className="bg-[#DC2626] rounded-3xl p-8 text-white mb-6">
              <p className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>+40 000</p>
              <p className="text-white/80 text-sm">pizzas cuites au four à bois chaque année</p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="w-5 h-5 fill-[#CA8A04]" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
                <span className="text-white/80 text-sm ml-2">4.9/5 · 800+ avis</span>
              </div>
            </div>

            {/* Value cards */}
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-[#DC2626]/10 hover:border-[#DC2626]/30 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#450A0A] mb-1">{v.title}</h3>
                  <p className="text-sm text-[#78350F] leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
