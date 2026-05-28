export default function Map() {
  return (
    <section id="acces" aria-label="Accès et localisation Pizzeria Loulou" className="relative">
      {/* Map embed */}
      <div className="relative h-[380px] sm:h-[440px] md:h-[500px] bg-[#F7F4F1] overflow-hidden">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=3.2703%2C43.2289%2C3.3103%2C43.2489&layer=mapnik&marker=43.2389%2C3.2903"
          title="Localisation Pizzeria Loulou — 35 Avenue Charles Cauquil, Valras-Plage"
          className="w-full h-full border-0"
          loading="lazy"
          aria-label="Carte OpenStreetMap — Pizzeria Loulou, Valras-Plage"
        />

        {/* Address card — overlaid on map */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white rounded-2xl shadow-xl shadow-black/12 p-5 sm:p-6 max-w-[260px] sm:max-w-xs border border-black/5">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#C41E1E] flex items-center justify-center shrink-0">
              <span
                className="text-white font-semibold text-sm leading-none select-none"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
                aria-hidden="true"
              >
                L
              </span>
            </div>
            <span className="font-semibold text-[#1C0A00]" style={{ fontFamily: 'var(--font-heading)' }}>
              Pizzeria Loulou
            </span>
          </div>

          {/* Address */}
          <div className="flex gap-2.5 mb-3">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#C41E1E] shrink-0 mt-0.5" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-[13px] text-[#1C0A00] font-medium leading-snug">35 Avenue Charles Cauquil</p>
              <p className="text-[12px] text-[#7C4A1E]/70">34350 Valras-Plage</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-2.5 mb-4">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#C41E1E] shrink-0 mt-0.5" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            <a
              href="tel:+33467013267"
              className="text-[13px] text-[#C41E1E] font-semibold hover:underline cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              04 67 01 32 67
            </a>
          </div>

          {/* CTA itinerary */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=35+Avenue+Charles+Cauquil+34350+Valras-Plage+France"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#C41E1E] hover:bg-[#A01818] text-white text-[12px] font-semibold py-2.5 rounded-xl transition-colors duration-200 cursor-pointer min-h-[44px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
              <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
            </svg>
            Obtenir l&apos;itinéraire
          </a>
        </div>
      </div>

      {/* Bottom info band */}
      <div className="bg-[#1C0A00] py-5 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2" style={{ fontFamily: 'var(--font-body)' }}>
            <span className="text-white/50 text-xs uppercase tracking-[0.1em]">
              Parkings gratuits à proximité
            </span>
            <span className="hidden sm:block text-white/20 text-xs">·</span>
            <span className="text-white/50 text-xs uppercase tracking-[0.1em]">
              Terrasse face à la mer
            </span>
            <span className="hidden sm:block text-white/20 text-xs">·</span>
            <span className="text-white/50 text-xs uppercase tracking-[0.1em]">
              Accès PMR
            </span>
          </div>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 bg-[#C41E1E] hover:bg-[#A01818] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap min-h-[40px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Réserver maintenant
          </a>
        </div>
      </div>
    </section>
  );
}
