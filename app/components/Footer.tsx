export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C0800] text-white/70">
      {/* Italian tricolor stripe */}
      <div className="flex h-1" aria-hidden="true">
        <div className="flex-1 bg-[#16A34A]" />
        <div className="flex-1 bg-white/30" />
        <div className="flex-1 bg-[#CC1F1F]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#CC1F1F] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Pizza Sergio
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Pizzas artisanales à pâte fine et croustillante à Valras-Plage.
              Ingrédients frais, livraison soir toute l&apos;année.
            </p>
            <div className="mt-5 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-[#D97706]" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
              <span className="text-white/60 text-xs ml-2">5/5 · TripAdvisor</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { href: '#hero', label: 'Accueil' },
                { href: '#menu', label: 'La Carte' },
                { href: '#about', label: 'Notre Pizzeria' },
                { href: '#reviews', label: 'Avis Clients' },
                { href: '#contact', label: 'Horaires &amp; Livraison' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                    dangerouslySetInnerHTML={{ __html: l.label }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Nous contacter</h4>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#F87171] mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-sm text-white/60">2 Boulevard Gambetta<br />34350 Valras-Plage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#F87171] shrink-0" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                <a href="tel:+33467323264" className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer">
                  04 67 32 32 64
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1877F2] shrink-0" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a
                  href="https://fr-fr.facebook.com/PIZZA-Sergio-737785756303587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Pizza Sergio sur Facebook
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {year} Pizza Sergio &middot; Valras-Plage. Tous droits r&eacute;serv&eacute;s.</p>
          <p>Fait avec amour et beaucoup de mozzarella</p>
        </div>
      </div>
    </footer>
  );
}
