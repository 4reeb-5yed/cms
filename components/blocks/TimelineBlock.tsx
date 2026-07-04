"use client"
import { TimelineBlock as TimelineBlockType } from '@/types'

export function TimelineBlock({ items }: TimelineBlockType) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="block-spacing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-brass transform md:-translate-x-px" />
          
          <div className="space-y-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 animate-standard"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:text-left md:pl-12'}>
                  {index % 2 === 1 && <div className="hidden md:block absolute left-1/2 top-0 w-2 h-2 bg-brass transform -translate-x-1/2 rotate-45" />}
                  <span className="font-mono text-xs tracking-wider uppercase text-brass">{item.year}</span>
                  <h3 className="font-display text-xl text-ink mt-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-ink/70 mt-2">{item.description}</p>
                  )}
                </div>
                {index % 2 === 0 && <div className="hidden md:block absolute left-1/2 top-0 w-2 h-2 bg-brass transform -translate-x-1/2 rotate-45" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
