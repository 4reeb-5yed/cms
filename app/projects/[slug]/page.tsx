import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

async function getProject(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug },
      include: { coverImage: true }
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

async function getNavigation() {
  try {
    const pages = await prisma.page.findMany({
      where: { showInNav: true },
      orderBy: { navOrder: 'asc' }
    })
    return pages.map(page => ({
      label: page.title,
      slug: page.slug === '/' ? '' : page.slug
    }))
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return [
      { label: 'Work', slug: 'projects' },
      { label: 'About', slug: 'about' },
      { label: 'Contact', slug: 'contact' },
    ]
  }
}

function formatYear(date: Date) {
  return new Date(date).getFullYear().toString()
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, navigation] = await Promise.all([
    getProject(slug),
    getNavigation()
  ])
  
  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Areeb Syed</Link>
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link href={`/${item.slug}`} className={`text-sm font-medium ${item.slug === 'projects' ? 'text-ember' : 'text-ink'} hover:text-ember`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <article className="block-spacing">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/projects" className="inline-flex items-center text-sm text-ink/70 hover:text-ember mb-8">
            ← Back to Projects
          </Link>
          
          <div className="mb-8">
            <span className="text-xs font-mono uppercase text-brass">{project.category}</span>
            <h1 className="font-display text-4xl md:text-5xl text-ink mt-2 mb-4">{project.title}</h1>
            <p className="text-lg text-ink/70 mb-6">{project.summary}</p>
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-stone font-medium rounded-ledger hover:brightness-110 transition-all text-base">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  View Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-medium rounded-ledger hover:bg-ink/5 transition-all text-base">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  View Source Code
                </a>
              )}
            </div>
          </div>

          <div className="aspect-[3/2] relative rounded-ledger overflow-hidden mb-12">
            <Image 
              src={project.coverImage?.url || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop'} 
              alt={project.coverImage?.alt || project.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Year</h3>
              <p className="text-ink">{formatYear(project.publishedDate)}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Category</h3>
              <p className="text-ink">{project.category}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs border border-moss text-moss rounded-ledger">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12 border-t border-ink/10 pt-12">
            {project.challenges && (
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">The Challenge</h2>
                <p className="text-ink/70 leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">The Solution</h2>
                <p className="text-ink/70 leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.outcome && (
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">The Outcome</h2>
                <p className="text-ink/70 leading-relaxed">{project.outcome}</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}
