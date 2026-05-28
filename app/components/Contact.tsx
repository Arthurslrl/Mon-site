'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const hours = [
  { day: 'Lundi', time: 'Fermé', closed: true },
  { day: 'Mar – Jeu', time: '11h30–14h · 18h30–22h', closed: false },
  { day: 'Vendredi', time: '11h30–14h · 18h30–23h', closed: false },
  { day: 'Samedi', time: '11h30–23h (non-stop)', closed: false },
  { day: 'Dimanche', time: '11h30–22h30', closed: false },
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
    <section id="contact" className="py-24 px-6 bg-[#FEF3F3]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
            <p
              className="text-[#C41E1E] text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Contact & Horaires
            </p>
            <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
          </div>
          <h2
            className="text-5xl md:text-6xl font-semibold text-[#1C0A00] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            On vous attend
          </h2>
          <p
            className="mt-4 text-[#7C4A1E]/70 text-[15px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Réservations conseillées le week-end — venez profiter de la terrasse face à la mer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
            className="space-y-7"
          >
            {/* Adresse */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#C41E1E]/8 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#C41E1E]" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h3
                  className="font-semibold text-[#1C0A00] mb-1 text-[15px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Adresse
                </h3>
                <p
                  className="text-[#7C4A1E]/80 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  35 Avenue Charles Cauquil<br />34350 Valras-Plage
                </p>
                <a
                  href="https://maps.google.com/?q=35+Avenue+Charles+Cauquil+Valras-Plage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C41E1E] text-xs font-semibold tracking-wide hover:underline mt-1.5 inline-flex items-center gap-1 cursor-pointer"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Voir sur Google Maps
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                    <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#C41E1E]/8 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#C41E1E]" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </div>
              <div>
                <h3
                  className="font-semibold text-[#1C0A00] mb-1 text-[15px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Téléphone
                </h3>
                <a
                  href="tel:+33467013267"
                  className="text-[#C41E1E] font-semibold text-base hover:underline cursor-pointer"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  04 67 01 32 67
                </a>
                <p
                  className="text-xs text-[#7C4A1E]/60 mt-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Réservations conseillées le week-end
                </p>
              </div>
            </div>

            {/* Horaires */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#C41E1E]/8 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#C41E1E]" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="font-semibold text-[#1C0A00] mb-3 text-[15px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Horaires d&apos;ouverture
                </h3>
                <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 text-sm">
                      <span className={`font-medium ${h.closed ? 'text-[#7C4A1E]/50' : 'text-[#1C0A00]'}`}>
                        {h.day}
                      </span>
                      <span className={h.closed ? 'text-[#C41E1E] font-semibold' : 'text-[#7C4A1E]/75'}>
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
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <div className="bg-white rounded-2xl p-8 border border-[#C41E1E]/8 shadow-sm">
              <h3
                className="text-2xl font-semibold text-[#1C0A00] mb-6 tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Envoyer un message
              </h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-14 h-14 bg-[#C41E1E]/8 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#C41E1E]" aria-hidden="true">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <p
                    className="text-[#1C0A00] font-semibold text-lg"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Message envoyé !
                  </p>
                  <p
                    className="text-[#7C4A1E]/70 text-sm mt-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate style={{ fontFamily: 'var(--font-body)' }}>
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[#1C0A00]/70 mb-2 uppercase tracking-[0.1em]">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Marie Dupont"
                      className="w-full px-4 py-3 bg-[#FEF9F5] border border-[#C41E1E]/15 rounded-xl text-[#1C0A00] placeholder-[#7C4A1E]/35 focus:outline-none focus:border-[#C41E1E]/50 focus:ring-2 focus:ring-[#C41E1E]/12 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#1C0A00]/70 mb-2 uppercase tracking-[0.1em]">
                      Adresse e-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="marie@exemple.fr"
                      className="w-full px-4 py-3 bg-[#FEF9F5] border border-[#C41E1E]/15 rounded-xl text-[#1C0A00] placeholder-[#7C4A1E]/35 focus:outline-none focus:border-[#C41E1E]/50 focus:ring-2 focus:ring-[#C41E1E]/12 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#1C0A00]/70 mb-2 uppercase tracking-[0.1em]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Réservation pour 4 personnes samedi soir..."
                      className="w-full px-4 py-3 bg-[#FEF9F5] border border-[#C41E1E]/15 rounded-xl text-[#1C0A00] placeholder-[#7C4A1E]/35 focus:outline-none focus:border-[#C41E1E]/50 focus:ring-2 focus:ring-[#C41E1E]/12 transition-all duration-200 resize-none text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C41E1E] hover:bg-[#A01818] text-white py-3.5 rounded-xl font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-md shadow-[#C41E1E]/15 mt-1 min-h-[52px] text-sm"
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
