'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

type Projet = {
  id: number
  titre: string
  lieu: string
  description: string
  categorie: string
  date: string
  photoUrl: string
}

export default function Projets() {
  const [projets, setProjets] = useState<Projet[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, isVisible } = useIntersectionObserver()

  useEffect(() => {
    fetch('/api/projets')
      .then((r) => r.json())
      .then(setProjets)
      .catch(() => setProjets([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projets" className="py-20 bg-white">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="mb-14">
          <h2 className="font-bebas text-5xl text-noir tracking-widest mb-3">
            MES PROJETS
          </h2>
          <div className="w-16 h-1 bg-rouge" />
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-rouge border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && projets.length === 0 && (
          <div className="text-center py-16 text-texte-secondaire">
            <div className="font-bebas text-3xl tracking-widest mb-2">
              Projets bientôt disponibles
            </div>
            <p className="text-sm">Les réalisations seront ajoutées prochainement.</p>
          </div>
        )}

        {!loading && projets.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets.map((p, i) => (
              <div
                key={p.id}
                className={`group relative overflow-hidden bg-gris-clair transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.photoUrl}
                    alt={p.titre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Red overlay */}
                  <div className="absolute inset-0 bg-rouge/0 group-hover:bg-rouge/80 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-6">
                      <div className="font-bebas text-white text-2xl tracking-widest mb-2">
                        {p.titre}
                      </div>
                      <div className="text-white/90 text-sm">{p.description}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-noir">{p.titre}</h3>
                      <p className="text-texte-secondaire text-sm mt-0.5">{p.lieu}</p>
                    </div>
                    <span className="text-xs bg-gris-moyen text-gray-600 px-2 py-1 shrink-0">
                      {p.categorie}
                    </span>
                  </div>
                  <p className="text-texte-secondaire text-xs mt-2">{p.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
