'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Mot de passe incorrect')
        return
      }
      router.push('/admin')
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-rouge flex items-center justify-center">
            <span className="font-bebas text-white text-xl tracking-widest">YLB</span>
          </div>
          <div>
            <div className="font-bebas text-white text-xl tracking-widest">ADMIN</div>
            <div className="text-xs text-gray-500 tracking-wider">Espace privé</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full border border-gris-moyen px-4 py-3 text-sm focus:outline-none focus:border-rouge transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-rouge text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rouge text-white font-semibold py-3 hover:bg-rouge/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
