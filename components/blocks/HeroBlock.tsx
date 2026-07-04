"use client"
import Image from 'next/image'
import Link from 'next/link'
import { HeroBlock as HeroBlockType } from '@/types'

export function HeroBlock({ heading, subheading, image, ctaLabel, ctaLink }: HeroBlockType) {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-stone overflow-hidden">
      <div className="absolute inset-0">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover opacity-20"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-stone via-stone/95 to-stone/80" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl animate-deliberate">
          <h1 className="font-display text-5xl md:text-7xl text-ink leading-[1.05] mb-6">
            {heading}
          </h1>
          {subheading && (
            <p className="text-lg md:text-xl text-ink/70 leading-relaxed mb-8 max-w-reading">
              {subheading}
            </p>
          )}
          {ctaLabel && ctaLink && (
            <Link href={ctaLink} className="btn-primary">
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
