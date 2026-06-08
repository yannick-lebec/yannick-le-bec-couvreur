export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row pt-16">
      {/* Left — white */}
      <div className="flex-[3] bg-white flex items-center px-8 sm:px-12 lg:px-20 py-16">
        <div className="max-w-lg">
          {/* Badge */}
          <div className="animate-fade-in-up-1 inline-flex items-center gap-2 bg-gris-clair border border-gris-moyen px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Disponible · Essonne (91)
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up-2 font-bebas text-5xl sm:text-6xl lg:text-7xl text-noir leading-none tracking-widest mb-6">
            COUVREUR<br />
            <span className="text-rouge">25 ANS</span><br />
            D&apos;EXPÉRIENCE
          </h1>

          {/* Paragraph */}
          <p className="animate-fade-in-up-3 text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Artisan couvreur indépendant disponible pour vos chantiers en
            Île-de-France. Sérieux, autonome et réactif — je m&apos;intègre
            immédiatement dans vos équipes.
          </p>

          {/* Buttons */}
          <div className="animate-fade-in-up-4 flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="bg-rouge text-white font-semibold px-8 py-3 text-center hover:bg-rouge/90 hover:scale-105 transition-all duration-200"
            >
              Me contacter
            </a>
            <a
              href="#projets"
              className="border-2 border-noir text-noir font-semibold px-8 py-3 text-center hover:bg-noir hover:text-white transition-all duration-200"
            >
              Voir mes projets
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up-4 flex gap-8 pt-6 border-t border-gris-moyen">
            <div>
              <div className="font-bebas text-4xl text-rouge tracking-wider">25</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Ans d&apos;expérience
              </div>
            </div>
            <div>
              <div className="font-bebas text-4xl text-rouge tracking-wider">100+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Chantiers réalisés
              </div>
            </div>
            <div>
              <div className="font-bebas text-4xl text-rouge tracking-wider">IDF</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Zone d&apos;intervention
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — black */}
      <div className="flex-[2] bg-noir relative flex items-center justify-center min-h-[50vh] md:min-h-0 overflow-hidden">
        {/* Placeholder photo */}
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-bebas text-6xl text-white/10 tracking-widest">YLB</div>
            <div className="text-gray-600 text-sm tracking-widest mt-2 uppercase">
              Photo à venir
            </div>
          </div>
        </div>

        {/* Red vertical stripe */}
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-rouge" />
      </div>
    </section>
  )
}
