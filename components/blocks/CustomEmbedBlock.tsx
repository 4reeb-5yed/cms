"use client"
import { CustomEmbedBlock as CustomEmbedBlockType } from '@/types'

export function CustomEmbedBlock({ html, caption }: CustomEmbedBlockType) {
  return (
    <section className="block-spacing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border border-ink/10 rounded-ledger p-6 bg-charcoal/5">
          <div 
            className="[&_iframe]:w-full [&_iframe]:border-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {caption && (
            <p className="text-xs font-mono text-ink/50 mt-4 text-center">{caption}</p>
          )}
        </div>
      </div>
    </section>
  )
}
