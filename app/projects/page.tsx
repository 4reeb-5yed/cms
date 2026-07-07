import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getProjects() {
  try {
    return await prisma.project.findMany({
      include: { coverImage: true },
      orderBy: { publishedDate: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
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

export default async function ProjectsPage() {
  const [projects, navigation] = await Promise.all([
    getProjects(),
    getNavigation()
  ])

  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Fieldnote</Link>
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

      <section className="block-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">Selected Work</h1>
          <p className="text-lg text-ink/70 max-w-2xl mb-12">A collection of projects spanning web applications, mobile apps, and design systems.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block bg-stone border border-ink/10 hover:border-ink rounded-ledger overflow-hidden transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={project.coverImage?.url || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'} 
                    alt={project.coverImage?.alt || project.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-brass">{project.category}</span>
                    <span className="text-xs text-ink/50">{formatYear(project.publishedDate)}</span>
                  </div>
                  <h2 className="font-display text-2xl text-ink mb-2 group-hover:text-ember transition-colors">{project.title}</h2>
                  <p className="text-sm text-ink/70 mb-4 line-clamp-2">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono uppercase border border-moss text-moss rounded-ledger">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
