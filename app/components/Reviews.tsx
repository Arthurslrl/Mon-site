'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const reviews = [
  {
    name: 'Marie T.',
    initial: 'M',
    color: '#C41E1E',
    rating: 5,
    date: 'Juillet 2025',
    source: 'Google',
    sourceIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    text: 'Excellente pâte (sûrement de la farine 00), ingrédients de qualité, cuisson parfaite. Vraiment dans le style italien authentique. On reviendra à chaque passage à Valras !',
  },
  {
    name: 'Jean-Pierre V.',
    initial: 'J',
    color: '#CA8A04',
    rating: 5,
    date: 'Août 2025',
    source: 'TripAdvisor',
    sourceIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#34E0A1]" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/>
      </svg>
    ),
    text: 'Les meilleures pizzas de Valras ! Pâte fine et croustillante, bien garnie sans être surchargée. L\'accueil est chaleureux, le personnel vraiment sympa. Un incontournable.',
  },
  {
    name: 'Laurent B.',
    initial: 'L',
    color: '#059669',
    rating: 5,
    date: 'Juin 2025',
    source: 'Google',
    sourceIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    text: 'Toujours ravis à chaque passage ! Les pizzas sont top, service rapide et le personnel très sympathique. On fait 20 km rien que pour ça. Un vrai régal à prix correct.',
  },
  {
    name: 'Sophie M.',
    initial: 'S',
    color: '#7C3AED',
    rating: 4,
    date: 'Juillet 2025',
    source: 'TripAdvisor',
    sourceIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#34E0A1]" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/>
      </svg>
    ),
    text: 'Pizza pâte fine, bien garnie et cuisson au top. Personnel TRÈS sympa. Un très bon rapport qualité-prix pour Valras-Plage. La Reine et la 4 fromages sont mes préférées !',
  },
  {
    name: 'Peter W.',
    initial: 'P',
    color: '#0891B2',
    rating: 5,
    date: 'Août 2025',
    source: 'TripAdvisor',
    sourceIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#34E0A1]" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/>
      </svg>
    ),
    text: 'Fine and crispy pizza, perfectly cooked over a wood fire. Best pizza on the Hérault coast! The staff is incredibly friendly. We went back three times during our holiday.',
  },
  {
    name: 'Famille Durand',
    initial: 'F',
    color: '#B45309',
    rating: 5,
    date: 'Septembre 2025',
    source: 'Google',
    sourceIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    text: 'Une pizzeria familiale comme on les aime. Accueil chaleureux, nourriture fraîche, le sourire des vendeuses en prime. Les enfants ont adoré la Calzone Nutella. On recommande !',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${s <= rating ? 'fill-[#CA8A04]' : 'fill-[#CA8A04]/25'}`}
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="avis" aria-labelledby="reviews-title" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFAF4]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
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
            Ce que disent nos clients
          </h2>

          {/* Aggregate ratings */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { platform: 'Google', score: '4.5/5', count: '382 avis' },
              { platform: 'TripAdvisor', score: '4.5/5', count: '54 avis' },
              { platform: 'Sluurpy', score: '87/100', count: '1 390 avis' },
            ].map((r) => (
              <div
                key={r.platform}
                className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-[#C41E1E]/10"
              >
                <div>
                  <p className="text-xs text-[#7C4A1E] font-medium" style={{ fontFamily: 'var(--font-body)' }}>{r.platform}</p>
                  <p className="text-lg font-semibold text-[#1C0A00]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {r.score}
                  </p>
                </div>
                <p className="text-xs text-[#7C4A1E]">{r.count}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.0, 0.0, 0.2, 1] }}
              className="bg-white rounded-2xl p-6 border border-[#C41E1E]/8 hover:border-[#C41E1E]/20 hover:shadow-md hover:shadow-[#C41E1E]/5 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: review.color }}
                    aria-hidden="true"
                  >
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C0A00] text-sm">{review.name}</p>
                    <p className="text-xs text-[#7C4A1E]">{review.date}</p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-[#C41E1E]/10"
                  title={`Avis ${review.source}`}
                >
                  {review.sourceIcon}
                  <span className="text-xs text-[#7C4A1E] font-medium">{review.source}</span>
                </div>
              </div>

              <Stars rating={review.rating} />

              <blockquote className="mt-3 text-sm text-[#7C4A1E] leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </blockquote>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://www.google.com/search?q=Pizzeria+Loulou+Valras-Plage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C41E1E] hover:bg-[#A01818] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-md shadow-[#C41E1E]/20"
          >
            Laisser un avis Google
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </a>
          <a
            href="https://www.tripadvisor.fr/Restaurant_Review-g1055983-d10629545-Reviews-Pizza_Loulou-Valras_Plage_Herault_Occitanie.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-[#C41E1E]/20 hover:border-[#C41E1E]/40 text-[#1C0A00] px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            Voir sur TripAdvisor
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
