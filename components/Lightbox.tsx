'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import Image from 'next/image'

type Props = {
  images: string[]
  initialIndex?: number
  title?: string
  lieu?: string
  description?: string
  onClose: () => void
}

export default function Lightbox({
  images,
  initialIndex = 0,
  title,
  lieu,
  description,
  onClose,
}: Props) {
  const [current, setCurrent] = useState(initialIndex)
  const touchStartX = useRef<number | null>(null)

  const prev = useCallback(() =>
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() =>
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in-up-1"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/70 hover:text-rouge transition-colors p-2"
        aria-label="Fermer"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-3 sm:left-6 text-white/70 hover:text-white transition-colors p-2 z-10"
          aria-label="Précédent"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl w-full max-h-[85vh] px-14 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            key={current}
            src={images[current]}
            alt={title ?? `Photo ${current + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        {(title || lieu || description) && (
          <div className="mt-3 text-center">
            {title && <p className="text-white font-semibold text-sm">{title}</p>}
            {lieu && <p className="text-white/60 text-xs mt-0.5">{lieu}</p>}
            {description && (
              <p className="text-white/50 text-xs mt-1 max-w-xl mx-auto">{description}</p>
            )}
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-3 sm:right-6 text-white/70 hover:text-white transition-colors p-2 z-10"
          aria-label="Suivant"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Thumbnail dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === current ? 'bg-rouge' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
