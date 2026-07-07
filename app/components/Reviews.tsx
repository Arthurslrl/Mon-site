'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const reviews = [
  {
    author: 'Voyageur TripAdvisor',
    date: 'Juillet 2021',
    rating: 5,
    title: 'Rien à dire, au top',
    body: '5 pizzas petites commandées et elles ne sont pas petites (32 cm) ! Vraiment excellentes et bien garnies. Le prix est intéressant aussi. Livraison dans les temps et même avant. Je recommande fortement.',
    avatar: 'V',
    avatarColor: 'bg-[#CC1F1F]',
  },
  {
    author: 'Tourist TripAdvisor',
    date: 'Juillet 2021',
    rating: 5,
    title: 'Bonnes pizzas',
    body: 'Très bonnes, un régal ! Super pizzas. Bien garnies, et bonnes, copieuses et super pâte. Je recommande fortement.',
    avatar: 'T',
    avatarColor: 'bg-[#16A34A]',
  },
  {
    author: 'Client fidèle',
    date: 'Juillet 2021',
    rating: 5,
    title: 'Pizzas excellentes',
    body: "Voulant commander chez il catanese mais complet… j'ai donc commandé chez Sergio, je n'ai pas été déçu. Livré à temps avec des pizzas généreuses et savoureuses. Une belle découverte que je referai.",
    avatar: 'C',
    avatarColor: 'bg-[#D97706]',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`w-4 h-4 ${i < n ? 'fill-[#D97706]' : 'fill-gray-200'}`} aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="reviews" className="py-24 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#CC1F1F] font-semibold text-sm uppercase tracking-widest mb-3">Avis Clients</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-[#1C0800]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ce qu&apos;ils en pensent
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-5 h-5 fill-[#D97706]" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="font-bold text-[#1C0800] text-lg">5.0</span>
            <span className="text-[#7C4528] text-sm">&middot; 30 avis TripAdvisor</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(28,8,0,0.10)' }}
              className="bg-[#FFF5ED] rounded-2xl p-6 border border-[#CC1F1F]/8 hover:border-[#CC1F1F]/20 transition-colors duration-200 cursor-default flex flex-col"
            >
              {/* Stars + date */}
              <div className="flex items-center justify-between mb-4">
                <Stars n={r.rating} />
                <span className="text-xs text-[#7C4528]/70">{r.date}</span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#1C0800] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                &ldquo;{r.title}&rdquo;
              </h3>

              {/* Body */}
              <p className="text-sm text-[#7C4528] leading-relaxed flex-1">{r.body}</p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#CC1F1F]/10">
                <div className={`w-9 h-9 rounded-full ${r.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1C0800]">{r.author}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#CC1F1F]" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs text-[#7C4528]/70">Avis v&eacute;rifi&eacute; TripAdvisor</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* TripAdvisor link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.tripadvisor.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#CC1F1F] font-semibold hover:underline cursor-pointer"
          >
            Voir tous les avis sur TripAdvisor
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
