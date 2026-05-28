'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const hours = [
  { day: 'Lundi', time: 'Fermé' },
  { day: 'Mardi – Jeudi', time: '11h30 – 14h · 18h30 – 22h' },
  { day: 'Vendredi', time: '11h30 – 14h · 18h30 – 23h' },
  { day: 'Samedi', time: '11h30 – 23h (non-stop)' },
  { day: 'Dimanche', time: '11h30 – 22h30' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#DC2626] font-semibold text-sm uppercase tracking-widest mb-3">Contact & Horaires</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-[#450A0A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            On vous attend
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Adresse */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#DC2626]" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#450A0A] mb-1">Adresse</h3>
                <p className="text-[#78350F]">12 Avenue de la Méditerranée<br />34350 Valras-Plage</p>
                <a
                  href="https://maps.google.com/?q=Valras-Plage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DC2626] text-sm font-medium hover:underline mt-1 inline-block cursor-pointer"
                >
                  Voir sur Google Maps
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#DC2626]" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#450A0A] mb-1">Téléphone</h3>
                <a href="tel:+33467000000" className="text-[#DC2626] font-medium hover:underline cursor-pointer">
                  04 67 00 00 00
                </a>
                <p className="text-sm text-[#78350F] mt-1">Réservations conseillées le week-end</p>
              </div>
            </div>

            {/* Horaires */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#DC2626]" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#450A0A] mb-3">Horaires d&apos;ouverture</h3>
                <ul className="space-y-2">
                  {hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 text-sm">
                      <span className="text-[#450A0A] font-medium">{h.day}</span>
                      <span className={h.time === 'Fermé' ? 'text-[#DC2626] font-medium' : 'text-[#78350F]'}>
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-[#FEF2F2] rounded-3xl p-8 border border-[#DC2626]/10">
              <h3
                className="text-2xl font-bold text-[#450A0A] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Envoyer un message
              </h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-green-600" aria-hidden="true">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <p className="text-[#450A0A] font-semibold text-lg">Message envoyé !</p>
                  <p className="text-[#78350F] text-sm mt-2">Nous vous répondrons dans les plus brefs délais.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#450A0A] mb-1.5">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Marie Dupont"
                      className="w-full px-4 py-3 bg-white border border-[#DC2626]/20 rounded-xl text-[#450A0A] placeholder-[#78350F]/40 focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#450A0A] mb-1.5">
                      Adresse e-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="marie@exemple.fr"
                      className="w-full px-4 py-3 bg-white border border-[#DC2626]/20 rounded-xl text-[#450A0A] placeholder-[#78350F]/40 focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#450A0A] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Réservation pour 4 personnes samedi soir..."
                      className="w-full px-4 py-3 bg-white border border-[#DC2626]/20 rounded-xl text-[#450A0A] placeholder-[#78350F]/40 focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white py-3.5 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md shadow-[#DC2626]/20 mt-2"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
