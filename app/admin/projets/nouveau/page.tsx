'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import UploadZone from '@/components/admin/UploadZone'

const CATEGORIES = [
  'Pose toiture',
  'Rénovation',
  'Étanchéité',
  'Charpente',
  'Zinguerie',
  'Urgence',
]

export default function NouveauProjet() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    titre: '',
    lieu: '',
    description: '',
    categorie: '',
    date: '',
    photoUrl: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.photoUrl) {
      alert("Veuillez uploader une photo.")
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/projets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      router.push('/admin')
    } catch {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="text-texte-secondaire hover:text-noir text-sm transition-colors"
          >
            ← Retour
          </button>
          <h1 className="font-bebas text-3xl text-noir tracking-widest">
            NOUVEAU PROJET
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Photo *
            </label>
            <UploadZone
              value={form.photoUrl}
              onChange={(url) => setForm((prev) => ({ ...prev, photoUrl: url }))}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Titre *
            </label>
            <input
              name="titre"
              value={form.titre}
              onChange={handleChange}
              required
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
              placeholder="Ex: Réfection toiture ardoise"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                Lieu *
              </label>
              <input
                name="lieu"
                value={form.lieu}
                onChange={handleChange}
                required
                className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
                placeholder="Ville (91)"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                Date *
              </label>
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
                placeholder="Juin 2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Catégorie *
            </label>
            <select
              name="categorie"
              value={form.categorie}
              onChange={handleChange}
              required
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors bg-white"
            >
              <option value="">Choisir...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors resize-none"
              placeholder="Décrivez les travaux réalisés..."
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="flex-1 border border-gris-moyen text-noir text-sm py-3 hover:bg-gris-clair transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-rouge text-white text-sm font-semibold py-3 hover:bg-rouge/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                'Publier le projet'
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
