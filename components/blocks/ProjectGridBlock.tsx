"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ProjectGridBlock as ProjectGridBlockType, Project } from '@/types'

interface ProjectGridBlockProps extends ProjectGridBlockType {
  projects?: Project[]
}

export function ProjectGridBlock({ heading, projects = [] }: ProjectGridBlockProps) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section className="block-spacing bg-stone">
      <div className="max-w-6xl mx-auto px-6">
        {heading && (
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-12 animate-standard">
            {heading}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block bg-stone border border-ink/10 hover:border-ink rounded-ledger overflow-hidden transition-all duration-100"
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                {project.coverImage && (
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt}
                    fill
                    className="object-cover transition-transform duration-100 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-ink mb-2 group-hover:text-ember transition-colors duration-100">
                  {project.title}
                </h3>
                <p className="text-sm text-ink/70 mb-4 line-clamp-2">
                  {project.summary}
                </p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
