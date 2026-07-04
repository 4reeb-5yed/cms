"use client"
import { useState } from 'react'
import Image from 'next/image'
import { ImageGalleryBlock as ImageGalleryBlockType } from '@/types'

export function ImageGalleryBlock({ images, layout = 'grid' }: ImageGalleryBlockType) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section className="block-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className={layout === 'strip' ? 'flex gap-4 overflow-x-auto pb-4' : 'grid grid-cols-2 md:grid-cols-3 gap-4'}>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className={`relative overflow-hidden rounded-ledger ${layout === 'strip' ? 'flex-shrink-0 w-64 h-48' : 'aspect-square'}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity duration-100"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-stone hover:text-stone/70 transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-6 text-stone hover:text-stone/70 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-4xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
            />
            {images[currentIndex].caption && (
              <p className="absolute bottom-0 left-0 right-0 p-4 bg-charcoal/80 text-stone text-sm text-center">
                {images[currentIndex].caption}
              </p>
            )}
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-6 text-stone hover:text-stone/70 transition-colors"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
