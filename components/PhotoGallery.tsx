'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/cn'

interface PhotoGalleryProps {
  images: string[]
  title: string
  className?: string
}

export default function PhotoGallery({ images, title, className }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, prev, next])

  return (
    <>
      <div className={cn('space-y-2', className)}>
        {/* Main image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-bg-subtle group cursor-pointer"
          onClick={() => setLightboxOpen(true)}>
          <Image
            src={images[current]}
            alt={`${title} - photo ${current + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={current === 0}
            sizes="(max-width: 768px) 100vw, 65vw"
          />

          {/* Zoom hint */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
              <ZoomIn size={12} />
              View full size
            </div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150',
                  i === current
                    ? 'border-brand-700 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-90 hover:border-border-brand'
                )}
                aria-label={`Photo ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${title} - photo ${current + 1}`}
              width={1200}
              height={800}
              className="object-contain rounded-xl max-h-[85vh] w-full"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {current + 1} of {images.length}
          </div>
        </div>
      )}
    </>
  )
}
