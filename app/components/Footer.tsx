export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C0A00] text-white/70 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#C41E1E] flex items-center justify-center shrink-0">
                <span
                  className="text-white font-semibold text-base leading-none select-none"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
                  aria-hidden="true"
                >
                  L
                </span>
              </div>
              <span
                className="text-xl font-semibold text-white tracking-wide"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Loulou
              </span>
            </div>
            <p
              className="text-sm leading-relaxed text-white/50 max-w-[220px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Pizzeria artisanale à Valras-Plage depuis 1985.
              Four à bois, pâtes maison, saveurs napolitaines.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-xs uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5" style={{ fontFamily: 'var(--font-body)' }}>
              {[
                { href: '#hero', label: 'Accueil' },
                { href: '#menu', label: 'La Carte' },
                { href: '#about', label: 'Notre Histoire' },
                { href: '#galerie', label: 'Galerie' },
                { href: '#avis', label: 'Avis clients' },
                { href: '#contact', label: 'Contact & Horaires' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-xs uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Nous contacter
            </h4>
            <address className="not-italic space-y-3.5" style={{ fontFamily: 'var(--font-body)' }}>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#C41E1E] mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-sm text-white/50">
                  35 Avenue Charles Cauquil<br />34350 Valras-Plage
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#C41E1E] shrink-0" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                <a
                  href="tel:+33467013267"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  04 67 01 32 67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#C41E1E] shrink-0" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a
                  href="mailto:contact@pizzeria-loulou.fr"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  contact@pizzeria-loulou.fr
                </a>
              </div>
            </address>
          </div>
        </div>

        <div
          className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <p>© {year} Pizzeria Loulou · Valras-Plage. Tous droits réservés.</p>
          <p className="tracking-wide">Fait avec amour et beaucoup de basilic</p>
        </div>
      </div>
    </footer>
  );
}
