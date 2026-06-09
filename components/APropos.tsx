'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const points = [
  {
    titre: 'Autonomie',
    desc: 'Intervention immédiate sans encadrement constant. Je gère mon travail de A à Z.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titre: 'Respect des délais',
    desc: 'Ponctualité et fiabilité sur chaque chantier. Vos plannings sont respectés.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titre: 'Sécurité',
    desc: 'Équipements aux normes et procédures de sécurité rigoureuses sur tous les toits.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titre: 'Essonne (91)',
    desc: 'Basé en Essonne (91), mobile en Essonne selon vos besoins.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function APropos() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section id="apropos" className="py-20 bg-white">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="mb-14">
          <h2 className="font-bebas text-5xl text-noir tracking-widest mb-3">
            QUI SUIS-JE ?
          </h2>
          <div className="w-16 h-1 bg-rouge" />
        </div>

        {/* Text */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <p className="text-gray-600 text-base leading-relaxed">
            Couvreur indépendant depuis 25 ans, j&apos;ai débuté ma carrière en
            apprentissage aux Compagnons du Devoir où j&apos;ai obtenu mon BEP Technique
            du Toit. J&apos;ai ensuite créé ma propre entreprise Couverture Pro pendant
            4 ans, avant de devenir chef d&apos;équipe chez Art-Toit pour le reste de
            ma carrière.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            Aujourd&apos;hui je propose ma main-d&apos;œuvre au TJM de 350 €* pour une
            journée de 7 heures. Je me déplace principalement dans l&apos;Essonne (91),
            avec des exceptions possibles selon le projet.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <div
              key={p.titre}
              className={`border border-gris-moyen p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-rouge mb-4">{p.icon}</div>
              <h3 className="font-semibold text-noir text-base mb-2">{p.titre}</h3>
              <p className="text-texte-secondaire text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Asterisk note */}
        <p className="text-texte-secondaire text-xs italic mt-8 leading-relaxed">
          *TJM de base calculé sur 7h de travail effectif, départ depuis Marolles-en-Hurepoix (91).
          Toute heure supplémentaire est facturée en sus. Tarif susceptible d&apos;être revu selon
          la distance, la durée et la difficulté du chantier.
        </p>
      </div>
    </section>
  )
}
