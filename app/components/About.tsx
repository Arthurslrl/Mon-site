'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const strengths = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#CC1F1F]" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    iconBg: 'bg-[#CC1F1F]/10',
    title: 'Ingrédients frais du jour',
    desc: 'Nos garnitures sont sélectionnées chaque matin sur les marchés locaux de Valras. Aucun compromis sur la fraîcheur.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#16A34A]" aria-hidden="true">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    iconBg: 'bg-[#16A34A]/10',
    title: 'Pâte fine maison',
    desc: 'Une pâte fine et croustillante préparée chaque jour, dorée à la perfection — la signature de Sergio depuis le premier jour.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#D97706]" aria-hidden="true">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    iconBg: 'bg-[#D97706]/10',
    title: 'Livraison rapide',
    desc: 'Livraison le soir toute l\'année à Valras-Plage et jardins de Sérignan. En juillet-août, aussi le midi. Livrées dans les temps, même avant.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-6 bg-[#FFF5ED]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-[#CC1F1F] font-semibold text-sm uppercase tracking-widest mb-4">Notre Pizzeria</p>
            <h2
              className="text-5xl font-bold text-[#1C0800] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              La pizza comme
              <br />
              <span className="text-[#CC1F1F]">on l&apos;aime</span>
            </h2>
            <div className="space-y-4 text-[#7C4528] leading-relaxed">
              <p>
                Au cœur de Valras-Plage, Pizza Sergio s&apos;est imposé comme la référence locale pour les amateurs de vraies pizzas. Sergio et son équipe préparent chaque jour une pâte fine et croustillante, garnie avec des produits frais soigneusement sélectionnés le matin même.
              </p>
              <p>
                Que vous soyez à la recherche d&apos;une pizza poisson généreuse, d&apos;une charcuterie gourmande ou d&apos;une margherita classique bien garnie, la carte de Sergio répond à toutes les envies — à des prix accessibles qui font revenir toute la famille.
              </p>
              <p>
                Et si vous ne pouvez pas vous déplacer, la livraison est assurée le soir toute l&apos;année à Valras-Plage et aux jardins de Sérignan, et même le midi en juillet et août !
              </p>
            </div>

            <a
              href="tel:+33467323264"
              className="inline-flex items-center gap-2 mt-8 bg-[#CC1F1F] hover:bg-[#A01818] text-white px-7 py-3.5 rounded-full font-semibold transition-colors duration-200 cursor-pointer shadow-md shadow-[#CC1F1F]/20"
            >
              Commander maintenant
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
            </a>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="space-y-5"
          >
            {/* Stat card */}
            <div className="bg-[#CC1F1F] rounded-3xl p-8 text-white mb-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>5.0 / 5</p>
                  <p className="text-white/80 text-sm mt-1">Note parfaite · 30 avis TripAdvisor</p>
                </div>
                <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="w-5 h-5 fill-[#D97706]" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
                <span className="text-white/80 text-sm ml-2">100% de satisfaction</span>
              </div>
            </div>

            {/* Strength cards */}
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(28,8,0,0.09)' }}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-[#CC1F1F]/10 hover:border-[#CC1F1F]/25 transition-colors duration-200 cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C0800] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#7C4528] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
