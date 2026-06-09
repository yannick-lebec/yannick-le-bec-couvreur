'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

type Avis = {
  id: number
  nom: string
  entreprise?: string
  poste?: string
  note: number
  commentaire: string
  valide: boolean
  createdAt: string
}

function Stars({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 fill-current ${i <= note ? 'text-yellow-400' : 'text-gray-200'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function AdminAvis() {
  const [avisList, setAvisList] = useState<Avis[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'published'>('pending')

  const fetchAvis = () => {
    setLoading(true)
    fetch('/api/admin/avis')
      .then((r) => r.json())
      .then(setAvisList)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchAvis() }, [])

  const handlePublish = async (id: number) => {
    await fetch(`/api/admin/avis/${id}`, { method: 'PATCH' })
    fetchAvis()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet avis ?')) return
    await fetch(`/api/admin/avis/${id}`, { method: 'DELETE' })
    fetchAvis()
  }

  const pending = avisList.filter((a) => !a.valide)
  const published = avisList.filter((a) => a.valide)
  const current = tab === 'pending' ? pending : published

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bebas text-3xl text-noir tracking-widest">GESTION DES AVIS</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gris-moyen">
        <button
          onClick={() => setTab('pending')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === 'pending'
              ? 'border-b-2 border-rouge text-rouge'
              : 'text-texte-secondaire hover:text-noir'
          }`}
        >
          En attente {pending.length > 0 && <span className="ml-1.5 bg-rouge text-white text-xs px-1.5 py-0.5 rounded-full">{pending.length}</span>}
        </button>
        <button
          onClick={() => setTab('published')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === 'published'
              ? 'border-b-2 border-rouge text-rouge'
              : 'text-texte-secondaire hover:text-noir'
          }`}
        >
          Publiés ({published.length})
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-rouge border-t-transparent rounded-full animate-spin" />
        </div>
      ) : current.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gris-moyen">
          <p className="text-texte-secondaire text-sm">
            {tab === 'pending' ? 'Aucun avis en attente.' : 'Aucun avis publié.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {current.map((a) => (
            <div key={a.id} className="bg-white border border-gris-moyen p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Stars note={a.note} />
                    <span className="text-xs text-texte-secondaire">
                      {new Date(a.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 italic">
                    &ldquo;{a.commentaire}&rdquo;
                  </p>
                  <div>
                    <span className="font-semibold text-noir text-sm">{a.nom}</span>
                    {a.entreprise && <span className="text-texte-secondaire text-xs ml-2">· {a.entreprise}</span>}
                    {a.poste && <span className="text-texte-secondaire text-xs ml-1">· {a.poste}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {!a.valide && (
                    <button
                      onClick={() => handlePublish(a.id)}
                      className="bg-green-600 text-white text-xs px-3 py-1.5 hover:bg-green-700 transition-colors"
                    >
                      ✅ Publier
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="border border-rouge text-rouge text-xs px-3 py-1.5 hover:bg-rouge hover:text-white transition-colors"
                  >
                    ❌ Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
