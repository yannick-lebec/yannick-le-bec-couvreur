'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import ProjetCard from '@/components/admin/ProjetCard'

type Projet = {
  id: number
  titre: string
  lieu: string
  description: string
  categorie: string
  date: string
  photos: { id: number; url: string; ordre: number }[]
}

export default function AdminPage() {
  const router = useRouter()
  const [projets, setProjets] = useState<Projet[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjets = () => {
    setLoading(true)
    fetch('/api/projets')
      .then((r) => r.json())
      .then(setProjets)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProjets()
  }, [])

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-3xl text-noir tracking-widest">MES PROJETS</h1>
          <p className="text-texte-secondaire text-sm mt-1">
            {projets.length} projet{projets.length !== 1 ? 's' : ''} en ligne
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/projets/nouveau')}
          className="bg-rouge text-white text-sm font-semibold px-6 py-2.5 hover:bg-rouge/90 hover:scale-105 transition-all duration-200"
        >
          + Nouveau projet
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-rouge border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projets.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gris-moyen">
          <div className="font-bebas text-2xl text-texte-secondaire tracking-widest mb-2">
            Aucun projet
          </div>
          <p className="text-texte-secondaire text-sm mb-6">
            Ajoutez votre premier projet pour qu&apos;il apparaisse sur le site.
          </p>
          <button
            onClick={() => router.push('/admin/projets/nouveau')}
            className="bg-rouge text-white text-sm font-semibold px-6 py-2.5 hover:bg-rouge/90 transition-colors"
          >
            Ajouter un projet
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projets.map((p) => (
            <ProjetCard key={p.id} projet={p} onDeleted={fetchProjets} />
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
