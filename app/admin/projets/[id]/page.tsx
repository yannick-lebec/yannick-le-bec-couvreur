'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import UploadZone from '@/components/admin/UploadZone'

const CATEGORIES = ['Pose toiture', 'Rénovation', 'Charpente', 'Zinguerie', 'Isolation', 'Traitement']

type FormState = {
  titre: string; lieu: string; description: string; categorie: string; date: string
}

export default function EditProjet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<FormState>({ titre: '', lieu: '', description: '', categorie: '', date: '' })
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/projets')
      .then((r) => r.json())
      .then((projets: (FormState & { id: number; photos: { url: string }[] })[]) => {
        const found = projets.find((p) => p.id === parseInt(id))
        if (found) {
          setForm({ titre: found.titre, lieu: found.lieu, description: found.description, categorie: found.categorie, date: found.date })
          setPhotos(found.photos.map((ph) => ph.url))
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (photos.length === 0) { alert('Au moins une photo requise.'); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/projets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photos }),
      })
      if (!res.ok) throw new Error()
      router.push('/admin')
    } catch {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-2 border-rouge border-t-transparent rounded-full animate-spin" />
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push('/admin')} className="text-texte-secondaire hover:text-noir text-sm transition-colors">← Retour</button>
          <h1 className="font-bebas text-3xl text-noir tracking-widest">MODIFIER LE PROJET</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Photos *</label>
            <UploadZone value={photos} onChange={setPhotos} />
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Titre *</label>
            <input name="titre" value={form.titre} onChange={handleChange} required
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Lieu *</label>
              <input name="lieu" value={form.lieu} onChange={handleChange} required
                className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Date *</label>
              <input name="date" value={form.date} onChange={handleChange} required
                className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Catégorie *</label>
            <select name="categorie" value={form.categorie} onChange={handleChange} required
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors bg-white">
              <option value="">Choisir...</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors resize-none" />
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={() => router.push('/admin')}
              className="flex-1 border border-gris-moyen text-noir text-sm py-3 hover:bg-gris-clair transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-rouge text-white text-sm font-semibold py-3 hover:bg-rouge/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
              {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sauvegarde...</> : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
