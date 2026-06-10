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
  const [scale, setScale] = useState(1)
  const [origin, setOrigin] = useState('50% 50%')
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const resetZoom = useCallback(() => {
    setScale(1)
    setOrigin('50% 50%')
  }, [])

  const prev = useCallback(() => { resetZoom(); setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)) }, [images.length, resetZoom])
  const next = useCallback(() => { resetZoom(); setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)) }, [images.length, resetZoom])

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

  // Wheel zoom — centré sur la position du curseur
  useEffect(() => {
    const el = imageWrapRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setOrigin(`${x}% ${y}%`)
      setScale((prev) => Math.min(4, Math.max(1, prev - e.deltaY * 0.003)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale > 1) return
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (scale > 1 || touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={scale > 1 ? resetZoom : onClose}
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
      {images.length > 1 && scale === 1 && (
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
        ref={imageWrapRef}
        className="relative w-full flex flex-col items-center justify-center px-10 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}
          style={{ overflow: 'hidden' }}
        >
          <Image
            key={current}
            src={images[current]}
            alt={title ?? `Photo ${current + 1}`}
            width={1600}
            height={1200}
            className="max-w-full max-h-[82vh] w-auto h-auto object-contain"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: origin,
              transition: scale === 1 ? 'transform 0.3s ease' : 'none',
            }}
            priority
          />
        </div>

        {/* Caption */}
        {(title || lieu) && scale === 1 && (
          <div className="mt-2 text-center">
            {title && <p className="text-white font-semibold text-sm">{title}</p>}
            {lieu && <p className="text-white/60 text-xs mt-0.5">{lieu}</p>}
            {description && (
              <p className="hidden sm:block text-white/50 text-xs mt-1 max-w-xl mx-auto">{description}</p>
            )}
          </div>
        )}

        {/* Hint zoom */}
        {scale === 1 && (
          <p className="hidden sm:block absolute bottom-2 right-4 text-white/30 text-xs">
            Molette pour zoomer
          </p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && scale === 1 && (
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
      {images.length > 1 && scale === 1 && (
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
