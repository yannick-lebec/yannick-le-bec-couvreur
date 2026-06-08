export default function Footer() {
  return (
    <footer className="bg-noir border-t-2 border-rouge">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rouge flex items-center justify-center">
              <span className="font-bebas text-white text-lg tracking-widest">YLB</span>
            </div>
            <div>
              <div className="font-bebas text-white text-base tracking-widest">
                YANNICK LE BEC
              </div>
              <div className="text-[10px] text-gray-500 tracking-wider uppercase">
                Couvreur Indépendant · Essonne (91)
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex gap-6">
            {['Services', 'Projets', 'Avis', 'Contact'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {l}
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
