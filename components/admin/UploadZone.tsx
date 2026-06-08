'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

export default function UploadZone({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Fichier image requis (jpg, png, webp...)')
      return
    }
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onChange(data.url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur upload')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative aspect-[4/3] bg-gris-clair border border-gris-moyen overflow-hidden">
          <Image src={value} alt="Aperçu" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-rouge text-white text-xs px-2 py-1 hover:bg-rouge/90"
          >
            Changer
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gris-moyen hover:border-rouge transition-colors cursor-pointer py-12 flex flex-col items-center gap-3 text-texte-secondaire"
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-rouge border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm text-center">
                <span className="text-rouge font-medium">Cliquez</span> ou glissez une image
              </div>
              <div className="text-xs">JPG, PNG, WEBP — max 5 Mo</div>
            </>
          )}
        </div>
      )}
      {error && <p className="text-rouge text-xs">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  )
}
