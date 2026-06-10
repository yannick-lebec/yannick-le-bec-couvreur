'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const MAX_PHOTOS = 10

async function readExifDate(file: File): Promise<string | null> {
  try {
    const exifr = (await import('exifr')).default
    const exif = await exifr.parse(file, ['DateTimeOriginal', 'CreateDate'])
    const date: Date | undefined = exif?.DateTimeOriginal ?? exif?.CreateDate
    if (!date) return null
    const formatted = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  } catch {
    return null
  }
}

export default function UploadZone({
  value,
  onChange,
  onDateDetected,
}: {
  value: string[]
  onChange: (urls: string[]) => void
  onDateDetected?: (date: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data.url
  }

  const handleFiles = async (files: File[]) => {
    setError('')
    const images = files.filter((f) => f.type.startsWith('image/'))
    const remaining = MAX_PHOTOS - value.length
    const toUpload = images.slice(0, remaining)
    if (images.length > remaining) {
      setError(`Maximum ${MAX_PHOTOS} photos par projet`)
    }
    if (toUpload.length === 0) return

    // Lire la date EXIF de la première photo si aucune photo n'existe déjà
    if (onDateDetected && value.length === 0 && toUpload[0]) {
      const date = await readExifDate(toUpload[0])
      if (date) onDateDetected(date)
    }

    setUploading(true)
    let current = [...value]
    try {
      for (const file of toUpload) {
        const url = await uploadFile(file)
        current = [...current, url]
        onChange(current)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur upload')
    } finally {
      setUploading(false)
    }
  }

  const moveUp = (i: number) => {
    if (i === 0) return
    const next = [...value]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
  }
  const moveDown = (i: number) => {
    if (i === value.length - 1) return
    const next = [...value]
    ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
    onChange(next)
  }
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div key={url + i} className="relative">
              <div className="relative aspect-square bg-gris-clair overflow-hidden border border-gris-moyen">
                <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" />
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-rouge text-white text-[10px] text-center py-0.5">
                    Principale
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rouge text-white text-xs rounded-full flex items-center justify-center hover:bg-noir transition-colors"
              >
                ✕
              </button>
              <div className="flex gap-1 mt-1">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="flex-1 text-xs border border-gris-moyen py-0.5 disabled:opacity-25 hover:bg-gris-clair transition-colors"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === value.length - 1}
                  className="flex-1 text-xs border border-gris-moyen py-0.5 disabled:opacity-25 hover:bg-gris-clair transition-colors"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length < MAX_PHOTOS && (
        <div
          onDrop={(e) => { e.preventDefault(); handleFiles(Array.from(e.dataTransfer.files)) }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className="border-2 border-dashed border-gris-moyen hover:border-rouge transition-colors cursor-pointer py-10 flex flex-col items-center gap-3 text-texte-secondaire"
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-rouge border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Upload en cours...</span>
            </>
          ) : (
            <>
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm text-center">
                <span className="text-rouge font-medium">Cliquez</span> ou glissez des photos
              </div>
              <div className="text-xs text-center">{value.length}/{MAX_PHOTOS} · Sélectionnez plusieurs photos à la fois (Ctrl+clic)</div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-rouge text-xs">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files))
            e.target.value = ''
          }
        }}
      />
    </div>
  )
}
