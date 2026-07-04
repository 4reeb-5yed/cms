import Link from 'next/link'
import Image from 'next/image'

const sampleProjects = [
  {
    slug: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    summary: 'A real-time analytics dashboard for online retailers, featuring sales tracking, inventory management, and customer insights.',
    coverImage: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Dashboard interface' },
    techStack: ['React', 'D3.js', 'Node.js'],
  },
  {
    slug: 'mobile-banking',
    title: 'Mobile Banking App',
    summary: 'A secure mobile banking application with biometric authentication and real-time transaction notifications.',
    coverImage: { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop', alt: 'Mobile app screens' },
    techStack: ['React Native', 'TypeScript', 'GraphQL'],
  },
  {
    slug: 'design-system',
    title: 'Component Library',
    summary: 'A comprehensive design system with 50+ accessible components, serving as the foundation for multiple products.',
    coverImage: { url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop', alt: 'Design system components' },
    techStack: ['Storybook', 'Tailwind', 'Figma'],
  },
]

const navigation = [
  { label: 'Work', slug: 'projects' },
  { label: 'About', slug: 'about' },
  { label: 'Contact', slug: 'contact' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Fieldnote</Link>
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link href={`/${item.slug}`} className="text-sm font-medium text-ink hover:text-ember relative group">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ember transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl text-ink leading-[1.05] mb-6">Building things that matter</h1>
            <p className="text-lg md:text-xl text-ink/70 leading-relaxed mb-8">Designer and developer crafting digital experiences at the intersection of form and function.</p>
            <Link href="/projects" className="inline-flex px-6 py-3 bg-ember text-stone font-medium text-sm rounded-ledger hover:brightness-110 transition-all">View work</Link>
          </div>
        </div>
      </section>

      <section className="block-spacing bg-stone">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">Selected work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block bg-stone border border-ink/10 hover:border-ink rounded-ledger overflow-hidden transition-all">
                <div className="aspect-[3/2] relative overflow-hidden">
                  <Image src={project.coverImage.url} alt={project.coverImage.alt} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-ink mb-2 group-hover:text-ember transition-colors">{project.title}</h3>
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

      <footer className="bg-charcoal text-stone">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display text-xl mb-4">Fieldnote</h3>
              <p className="text-stone/70 text-sm">Designer and developer crafting digital experiences.</p>
            </div>
            <nav>
              <h4 className="text-xs font-mono uppercase text-brass mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.label}><Link href={`/${item.slug}`} className="text-sm text-stone/70 hover:text-stone">{item.label}</Link></li>
                ))}
              </ul>
            </nav>
            <div>
              <h4 className="text-xs font-mono uppercase text-brass mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-stone/70 hover:text-stone"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
