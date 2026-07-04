import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { BlockRenderer } from '@/components/BlockRenderer'
import { getProject, getAllProjects, getNavigation, getSiteSettings } from '@/lib/api'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const [project, allProjects, navigation, settings] = await Promise.all([
    getProject(slug),
    getAllProjects(),
    getNavigation(),
    getSiteSettings(),
  ])

  if (!project) {
    notFound()
  }

  const relatedProjects = allProjects
    .filter(p => p.slug !== project.slug && p.featured)
    .slice(0, 2)

  return (
    <main>
      <Header navigation={navigation.items} siteTitle={settings.siteTitle} />
      
      <article>
        <header className="relative h-[50vh] min-h-[400px]">
          {project.coverImage && (
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
              <span className="font-mono text-xs tracking-wider uppercase text-brass">
                {new Date(project.publishedDate).getFullYear()}
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-stone mt-2">
                {project.title}
              </h1>
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.techStack.map((tag) => (
                    <span key={tag} className="tag border-stone/30 text-stone">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-reading mx-auto">
            <p className="text-xl text-ink/70 leading-relaxed mb-8">
              {project.summary}
            </p>
            
            <div className="flex gap-4 mb-12">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  View live
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Source code
                </a>
              )}
            </div>

            {project.body && project.body.length > 0 && (
              <BlockRenderer blocks={project.body} />
            )}
          </div>
        </section>

        {relatedProjects.length > 0 && (
          <section className="bg-stone py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="font-display text-2xl text-ink mb-8">More projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group block border border-ink/10 hover:border-ink rounded-ledger overflow-hidden transition-all duration-100"
                  >
                    <div className="aspect-[3/2] relative overflow-hidden">
                      {p.coverImage && (
                        <Image
                          src={p.coverImage.url}
                          alt={p.coverImage.alt}
                          fill
                          className="object-cover transition-transform duration-100 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg text-ink group-hover:text-ember transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer navigation={navigation.items} settings={settings} />
    </main>
  )
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.summary,
  }
}
