import Link from 'next/link'
import Image from 'next/image'
import { Header, Footer } from '@/components/layout'
import { getAllProjects, getNavigation, getSiteSettings } from '@/lib/api'

export default async function ProjectsPage() {
  const [projects, navigation, settings] = await Promise.all([
    getAllProjects(),
    getNavigation(),
    getSiteSettings(),
  ])

  return (
    <main>
      <Header navigation={navigation.items} siteTitle={settings.siteTitle} />
      <section className="block-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-display text-5xl md:text-6xl text-ink mb-4 animate-deliberate">Projects</h1>
          <p className="text-lg text-ink/70 mb-16 max-w-reading">A collection of work spanning design, development, and everything in between.</p>
          
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
                  <h2 className="font-display text-xl text-ink mb-2 group-hover:text-ember transition-colors duration-100">
                    {project.title}
                  </h2>
                  <p className="text-sm text-ink/70 mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer navigation={navigation.items} settings={settings} />
    </main>
  )
}
