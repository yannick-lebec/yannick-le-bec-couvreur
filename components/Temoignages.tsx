'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

type Avis = {
  id: number
  nom: string
  entreprise?: string
  poste?: string
  note: number
  commentaire: string
}

const FALLBACK: Avis[] = [
  { id: -1, nom: 'Marc D., Chef de chantier', entreprise: 'Bâtiment Pro Essonne', note: 5, commentaire: "Yannick intervient sur nos chantiers depuis 3 ans. Toujours ponctuel, efficace, aucun besoin de le superviser. On le rappelle à chaque fois." },
  { id: -2, nom: "Sophie L., Gérante", entreprise: "Rénov'Toit 91", note: 5, commentaire: "Qualité de travail irréprochable. Yannick maîtrise aussi bien les toitures traditionnelles que les matériaux modernes. Je le recommande sans hésiter." },
  { id: -3, nom: 'Patrick M., Directeur travaux', entreprise: 'ConstrucGroup IDF', note: 5, commentaire: "Réactif, sérieux, et vraiment autonome. Exactement ce qu'on cherche pour nos chantiers en sous-traitance. Les délais sont toujours respectés." },
]

function Stars({ note, interactive, onSelect }: { note: number; interactive?: boolean; onSelect?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onSelect?.(i)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <svg
            className={`w-5 h-5 ${i <= note ? 'text-yellow-400' : 'text-gray-300'} fill-current transition-colors`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function AvisModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nom: '', entreprise: '', poste: '', note: 0, commentaire: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.note === 0) return
    setStatus('loading')
    try {
      const res = await fetch('/api/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gris-moyen">
          <h3 className="font-bebas text-2xl text-noir tracking-widest">LAISSER UN AVIS</h3>
          <button onClick={onClose} className="text-texte-secondaire hover:text-noir">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-noir mb-2">Merci pour votre avis !</p>
            <p className="text-texte-secondaire text-sm">Il sera publié après validation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Nom et prénom *</label>
                <input name="nom" value={form.nom} onChange={handleChange} required
                  className="w-full border border-gris-moyen px-3 py-2.5 text-sm focus:outline-none focus:border-rouge transition-colors"
                  placeholder="Jean Dupont" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Entreprise</label>
                <input name="entreprise" value={form.entreprise} onChange={handleChange}
                  className="w-full border border-gris-moyen px-3 py-2.5 text-sm focus:outline-none focus:border-rouge transition-colors"
                  placeholder="Facultatif" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Poste occupé</label>
              <input name="poste" value={form.poste} onChange={handleChange}
                className="w-full border border-gris-moyen px-3 py-2.5 text-sm focus:outline-none focus:border-rouge transition-colors"
                placeholder="Chef de chantier, Gérant..." />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Note *</label>
              <Stars note={form.note} interactive onSelect={(n) => setForm((p) => ({ ...p, note: n }))} />
              {form.note === 0 && <p className="text-xs text-texte-secondaire mt-1">Cliquez pour noter</p>}
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Témoignage *</label>
              <textarea name="commentaire" value={form.commentaire} onChange={handleChange} required rows={4}
                className="w-full border border-gris-moyen px-3 py-2.5 text-sm focus:outline-none focus:border-rouge transition-colors resize-none"
                placeholder="Décrivez votre expérience avec Yannick..." />
            </div>

            {status === 'error' && (
              <p className="text-rouge text-sm">Erreur. Réessayez ou contactez-moi par email.</p>
            )}

            <button type="submit" disabled={status === 'loading' || form.note === 0}
              className="w-full bg-rouge text-white font-semibold py-3 hover:bg-rouge/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {status === 'loading' ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Envoi...</> : 'Envoyer mon avis'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Temoignages() {
  const { ref, isVisible } = useIntersectionObserver()
  const [avisList, setAvisList] = useState<Avis[] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetch('/api/avis')
      .then((r) => r.json())
      .then(setAvisList)
      .catch(() => setAvisList([]))
  }, [])

  const displayed = avisList && avisList.length > 0 ? avisList : FALLBACK

  return (
    <>
      <section id="avis" className="py-20 bg-noir">
        <div
          ref={ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-14">
            <h2 className="font-bebas text-5xl text-white tracking-widest mb-3">ILS TÉMOIGNENT</h2>
            <div className="w-16 h-1 bg-rouge" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayed.map((a, i) => (
              <div
                key={a.id}
                className={`border border-rouge/40 hover:border-rouge p-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <Stars note={a.note} />
                <p className="text-gray-300 text-sm leading-relaxed my-4 italic">
                  &ldquo;{a.commentaire}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-white text-sm">{a.nom}</div>
                  {a.entreprise && <div className="text-rouge text-xs tracking-wide mt-0.5">{a.entreprise}</div>}
                  {a.poste && <div className="text-gray-500 text-xs mt-0.5">{a.poste}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => setModalOpen(true)}
              className="border border-rouge text-rouge hover:bg-rouge hover:text-white font-semibold px-8 py-3 transition-all duration-200 hover:scale-105"
            >
              ⭐ Laisser un avis
            </button>
          </div>
        </div>
      </section>

      {modalOpen && <AvisModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
