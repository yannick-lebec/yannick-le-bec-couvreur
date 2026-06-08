'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Projet = {
  id: number
  titre: string
  lieu: string
  description: string
  categorie: string
  date: string
  photoUrl: string
}

export default function ProjetCard({
  projet,
  onDeleted,
}: {
  projet: Projet
  onDeleted: () => void
}) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Supprimer "${projet.titre}" ?`)) return
    await fetch(`/api/projets/${projet.id}`, { method: 'DELETE' })
    onDeleted()
  }

  return (
    <div className="bg-white border border-gris-moyen overflow-hidden">
      <div className="relative aspect-[4/3] bg-gris-clair">
        <Image
          src={projet.photoUrl}
          alt={projet.titre}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-semibold text-noir text-sm">{projet.titre}</h3>
          <span className="text-xs bg-gris-clair text-texte-secondaire px-2 py-0.5 shrink-0">
            {projet.categorie}
          </span>
        </div>
        <p className="text-texte-secondaire text-xs mb-1">{projet.lieu}</p>
        <p className="text-texte-secondaire text-xs">{projet.date}</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => router.push(`/admin/projets/${projet.id}`)}
            className="flex-1 border border-noir text-noir text-xs py-2 hover:bg-noir hover:text-white transition-colors"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 border border-rouge text-rouge text-xs py-2 hover:bg-rouge hover:text-white transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
