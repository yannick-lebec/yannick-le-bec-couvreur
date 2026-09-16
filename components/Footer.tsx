import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-noir border-t-2 border-rouge">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo-en-tête.png"
              alt="YLB Couverture"
              width={300}
              height={100}
              className="w-37.5 sm:w-50 h-auto shrink-0"
            />
            <div className="text-[10px] text-gray-500 tracking-wider uppercase">
              Couvreur Indépendant · Essonne (91)
            </div>
          </div>

          {/* Links */}
          <nav className="flex gap-6">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Réalisations', href: '#projets' },
              { label: 'Avis', href: '#avis' },
              { label: 'Contact', href: '#contact' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2025 Yannick Le Bec · SIRET : À compléter</span>
          <span>Couvreur indépendant · Île-de-France</span>
        </div>
      </div>
    </footer>
  )
}
