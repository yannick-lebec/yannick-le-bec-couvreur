'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const temoignages = [
  {
    entreprise: 'Bâtiment Pro Essonne',
    contact: 'Marc D., Chef de chantier',
    texte:
      "Yannick intervient sur nos chantiers depuis 3 ans. Toujours ponctuel, efficace, aucun besoin de le superviser. On le rappelle à chaque fois.",
  },
  {
    entreprise: 'Rénov\'Toit 91',
    contact: 'Sophie L., Gérante',
    texte:
      "Qualité de travail irréprochable. Yannick maîtrise aussi bien les toitures traditionnelles que les matériaux modernes. Je le recommande sans hésiter.",
  },
  {
    entreprise: 'ConstrucGroup IDF',
    contact: 'Patrick M., Directeur travaux',
    texte:
      "Réactif, sérieux, et vraiment autonome. Exactement ce qu'on cherche pour nos chantiers en sous-traitance. Les délais sont toujours respectés.",
  },
]

const Stars = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function Temoignages() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section id="avis" className="py-20 bg-noir">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="mb-14">
          <h2 className="font-bebas text-5xl text-white tracking-widest mb-3">
            ILS TÉMOIGNENT
          </h2>
          <div className="w-16 h-1 bg-rouge" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {temoignages.map((t, i) => (
            <div
              key={t.entreprise}
              className={`border border-rouge/40 hover:border-rouge p-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Stars />
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.texte}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-white text-sm">{t.contact}</div>
                <div className="text-rouge text-xs tracking-wide mt-0.5">{t.entreprise}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
