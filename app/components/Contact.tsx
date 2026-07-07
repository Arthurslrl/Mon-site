'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const hours = [
  { day: 'Tous les jours', time: '11h00 – 13h30' },
  { day: 'Tous les jours', time: '18h00 – 21h00' },
];

const deliveryZones = [
  { label: 'Valras-Plage', note: 'Soir toute l\'année · Midi + soir juil/août', color: 'bg-[#16A34A]' },
  { label: 'Jardins de Sérignan', note: 'Soir toute l\'année · Midi + soir juil/août', color: 'bg-[#D97706]' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 px-6 bg-[#FFF5ED]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#CC1F1F] font-semibold text-sm uppercase tracking-widest mb-3">Contact &amp; Horaires</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-[#1C0800]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Commandez ou venez nous voir
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            {/* Phone CTA */}
            <div className="bg-[#CC1F1F] rounded-2xl p-6 text-white">
              <p className="font-semibold text-white/80 text-sm mb-2">Commander par téléphone</p>
              <a
                href="tel:+33467323264"
                className="text-3xl font-bold tracking-wide hover:text-white/80 transition-colors cursor-pointer"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                04 67 32 32 64
              </a>
              <p className="text-white/70 text-sm mt-2">Disponible pendant les heures d&apos;ouverture</p>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#CC1F1F]/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#CC1F1F]" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1C0800] mb-1">Adresse</h3>
                <p className="text-[#7C4528]">2 Boulevard Gambetta<br />34350 Valras-Plage</p>
                <a
                  href="https://maps.google.com/?q=2+Boulevard+Gambetta+Valras-Plage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CC1F1F] text-sm font-medium hover:underline mt-1 inline-block cursor-pointer"
                >
                  Voir sur Google Maps
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#CC1F1F]/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#CC1F1F]" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1C0800] mb-3">Horaires d&apos;ouverture</h3>
                <ul className="space-y-2">
                  {hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-4 text-sm">
                      <span className="text-[#1C0800] font-medium">{h.day}</span>
                      <span className="text-[#7C4528]">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Facebook */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1877F2]" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1C0800] mb-1">Facebook</h3>
                <a
                  href="https://fr-fr.facebook.com/PIZZA-Sergio-737785756303587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1877F2] text-sm font-medium hover:underline cursor-pointer"
                >
                  Pizza Sergio · 815 fans
                </a>
              </div>
            </div>
          </motion.div>

          {/* Delivery + Map column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Delivery zones */}
            <div className="bg-white rounded-2xl p-6 border border-[#CC1F1F]/10">
              <h3 className="font-bold text-[#1C0800] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#CC1F1F]" aria-hidden="true">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                Zones de livraison
              </h3>
              <div className="space-y-3">
                {deliveryZones.map((z) => (
                  <div key={z.label} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${z.color} mt-1.5 shrink-0`} />
                    <div>
                      <p className="font-semibold text-[#1C0800] text-sm">{z.label}</p>
                      <p className="text-xs text-[#7C4528] mt-0.5">{z.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#7C4528]/70 mt-4 pt-4 border-t border-[#CC1F1F]/10">
                Livraison soir toute l&apos;année · Midi &amp; soir en juillet et août
              </p>
            </div>

            {/* OpenStreetMap embed */}
            <div className="rounded-2xl overflow-hidden border border-[#CC1F1F]/10 h-64 w-full">
              <iframe
                title="Localisation Pizza Sergio"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.2850%2C43.2360%2C3.2970%2C43.2430&layer=mapnik&marker=43.2395%2C3.2921"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                aria-label="Carte localisation Pizza Sergio, 2 Boulevard Gambetta Valras-Plage"
              />
            </div>
            <p className="text-xs text-center text-[#7C4528]/60">
              2 Boulevard Gambetta, 34350 Valras-Plage
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
