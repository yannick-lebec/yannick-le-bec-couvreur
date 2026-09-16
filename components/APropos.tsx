'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const points = [
  {
    titre: 'Devis gratuit',
    desc: 'Je me déplace pour évaluer vos travaux et vous remettre un devis clair, sans engagement.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    titre: 'Assuré décennal',
    desc: 'Assurance décennale en cours de validité. Vos travaux sont couverts 10 ans après réception.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titre: 'Travail soigné',
    desc: 'Finitions propres, matériaux de qualité, chantier nettoyé en fin de journée.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    titre: 'Essonne (91)',
    desc: 'Basé à Marolles-en-Hurepoix, j\'interviens dans tout le département.',
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

        {/* Photo + Text */}
        <div className="grid md:grid-cols-[320px_1fr] gap-10 mb-16 items-start">
          <div className="relative w-full aspect-square border-b-4 border-rouge overflow-hidden">
            <Image
              src="/Photo-yannick-le-bec.png"
              alt="Yannick Le Bec, couvreur"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <p className="text-gray-600 text-base leading-relaxed">
              <strong className="font-semibold text-noir">
                Couvreur depuis 25 ans, formé aux Compagnons du Devoir,
              </strong>{' '}
              j&apos;ai consacré toute ma carrière aux métiers de la toiture.
              Titulaire d&apos;un BEP Technique du Toit, j&apos;ai acquis une
              solide expérience en couverture, rénovation, charpente et
              zinguerie, sur tous types de bâtiments.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Aujourd&apos;hui artisan indépendant, j&apos;interviens
              directement auprès des particuliers en Essonne (91).
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              <strong className="font-semibold text-noir">
                Un seul interlocuteur du début à la fin : moi.
              </strong>{' '}
              Du premier rendez-vous à la réception des travaux, je réalise
              personnellement votre chantier. Je ne mène pas plusieurs
              chantiers en parallèle : lorsque j&apos;interviens chez vous,{' '}
              <strong className="font-semibold text-noir">
                votre chantier est ma priorité.
              </strong>
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              <strong className="font-semibold text-noir">
                Chaque soir, le chantier est rangé, nettoyé et soigneusement
                protégé et bâché,
              </strong>{' '}
              afin de sécuriser votre habitation jusqu&apos;à la reprise des
              travaux.
            </p>
          </div>
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

      </div>
    </section>
  )
}
