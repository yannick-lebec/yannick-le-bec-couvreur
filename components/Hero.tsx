import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background photo, in transparency */}
      <Image
        src="/image-de-fond.png"
        alt=""
        fill
        className="object-cover object-center opacity-90"
        priority
      />
      {/* Orange vertical stripe */}
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-rouge" />

      {/* Content, over the background */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-lg backdrop-blur-xs p-6 sm:p-10">
          {/* Badge */}
          <div className="animate-fade-in-up-1 inline-flex items-center gap-2 bg-gris-clair border border-gris-moyen px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-extrabold text-gray-700 tracking-wide">
              Disponible · Essonne (91)
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up-2 font-bebas text-5xl sm:text-6xl lg:text-7xl text-noir leading-none tracking-widest mb-6">
            COUVREUR<br />
            <span className="text-rouge">+25 ANS</span><br />
            D&apos;EXPÉRIENCE
          </h1>

          {/* Paragraph */}
          <div className="animate-fade-in-up-3 backdrop-blur-md bg-white/40 p-4 mb-8 max-w-md">
            <p className="text-noir text-base sm:text-lg leading-relaxed">
              Artisan couvreur en Essonne (91) — pose, rénovation, entretien,
              démoussage. <span className="text-rouge">Devis gratuit</span>, intervention rapide.
            </p>
          </div>

          {/* Buttons */}
          <div className="animate-fade-in-up-4 flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="bg-rouge text-white font-semibold px-8 py-3 text-center hover:bg-rouge/90 hover:scale-105 transition-all duration-200"
            >
              Demander un devis gratuit
            </a>
            <a
              href="#projets"
              className="border-2 border-noir text-noir font-semibold px-8 py-3 text-center hover:bg-noir hover:text-white transition-all duration-200"
            >
              Voir mes réalisations
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up-4 flex gap-8 pt-6 border-t border-gris-moyen">
            <div>
              <div className="font-bebas text-4xl text-rouge tracking-wider">+25</div>
              <div className="text-xs text-rouge uppercase tracking-widest mt-1">
                Ans d&apos;expérience
              </div>
            </div>
            <div>
              <div className="font-bebas text-4xl text-rouge tracking-wider">IDF</div>
              <div className="text-xs text-rouge uppercase tracking-widest mt-1">
                Zone d&apos;intervention
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
