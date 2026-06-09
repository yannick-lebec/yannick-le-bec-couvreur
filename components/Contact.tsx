'use client'

import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

type FormState = {
  entreprise: string
  nom: string
  email: string
  telephone: string
  typeMission: string
  description: string
}

const TYPES = [
  'Renfort équipe ponctuel',
  'Chantier complet en sous-traitance',
  'Mission longue durée',
  'Urgence / dépannage',
  'Autre',
]

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver()
  const [form, setForm] = useState<FormState>({
    entreprise: '',
    nom: '',
    email: '',
    telephone: '',
    typeMission: '',
    description: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ entreprise: '', nom: '', email: '', telephone: '', typeMission: '', description: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 bg-gris-clair">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — infos */}
          <div>
            <h2 className="font-bebas text-5xl text-noir tracking-widest mb-3">
              ME CONTACTER
            </h2>
            <div className="w-16 h-1 bg-rouge mb-8" />

            <p className="text-gray-600 text-base leading-relaxed mb-10">
              Vous cherchez un couvreur qualifié pour renforcer vos équipes ou
              sous-traiter un chantier en Île-de-France ? Contactez-moi via ce
              formulaire, je vous réponds sous 24h.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rouge flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-texte-secondaire uppercase tracking-widest mb-0.5">Téléphone</div>
                  <a href="tel:0695301487" className="text-noir text-sm hover:text-rouge transition-colors">
                    06 95 30 14 87
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rouge flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-texte-secondaire uppercase tracking-widest mb-0.5">Email</div>
                  <a href="mailto:yannick.le.bec.couvreur@gmail.com" className="text-noir text-sm hover:text-rouge transition-colors">
                    yannick.le.bec.couvreur@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rouge flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-texte-secondaire uppercase tracking-widest mb-0.5">Zone</div>
                  <div className="text-noir text-sm">Essonne (91)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div className="bg-white border border-green-200 p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-noir text-lg mb-2">Message envoyé !</h3>
                <p className="text-texte-secondaire text-sm">Je vous répondrai dans les 24h.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-rouge text-sm hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Entreprise
                    </label>
                    <input
                      name="entreprise"
                      value={form.entreprise}
                      onChange={handleChange}
                      className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
                      placeholder="Nom de votre société ou particulier (facultatif)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Votre nom *
                    </label>
                    <input
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      required
                      className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
                      placeholder="Prénom Nom"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
                      placeholder="contact@entreprise.fr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Téléphone
                    </label>
                    <input
                      name="telephone"
                      type="tel"
                      value={form.telephone}
                      onChange={handleChange}
                      className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Type de mission *
                  </label>
                  <select
                    name="typeMission"
                    value={form.typeMission}
                    onChange={handleChange}
                    required
                    className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors bg-white"
                  >
                    <option value="">Sélectionnez...</option>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
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
                    rows={4}
                    className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors resize-none"
                    placeholder="Décrivez votre besoin, la localisation, les dates..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-rouge text-sm">
                    Erreur lors de l&apos;envoi. Réessayez ou contactez-moi par email.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-rouge text-white font-semibold py-3 hover:bg-rouge/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer ma demande'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
