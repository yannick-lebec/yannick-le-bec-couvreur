'use client'

import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gris-clair">
      {/* Header */}
      <header className="bg-noir border-b-2 border-rouge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-rouge flex items-center justify-center">
                <span className="font-bebas text-white text-sm tracking-widest">YLB</span>
              </div>
              <span className="font-bebas text-white tracking-widest text-sm">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/admin" className="text-gray-400 hover:text-white text-xs transition-colors">
                Projets
              </a>
              <a href="/admin/avis" className="text-gray-400 hover:text-white text-xs transition-colors">
                Avis
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xs transition-colors">
                Site →
              </a>
              <button onClick={handleLogout} className="text-gray-400 hover:text-rouge text-xs transition-colors">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
