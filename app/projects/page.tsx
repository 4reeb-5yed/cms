import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    slug: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    summary: 'A real-time analytics dashboard for online retailers, featuring sales tracking, inventory management, and customer insights.',
    coverImage: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Dashboard interface' },
    techStack: ['React', 'D3.js', 'Node.js'],
    category: 'Web Application',
    year: '2024',
  },
  {
    slug: 'mobile-banking',
    title: 'Mobile Banking App',
    summary: 'A secure mobile banking application with biometric authentication and real-time transaction notifications.',
    coverImage: { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop', alt: 'Mobile app screens' },
    techStack: ['React Native', 'TypeScript', 'GraphQL'],
    category: 'Mobile App',
    year: '2024',
  },
  {
    slug: 'design-system',
    title: 'Component Library',
    summary: 'A comprehensive design system with 50+ accessible components, serving as the foundation for multiple products.',
    coverImage: { url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop', alt: 'Design system components' },
    techStack: ['Storybook', 'Tailwind', 'Figma'],
    category: 'Design System',
    year: '2023',
  },
  {
    slug: 'ai-content-platform',
    title: 'AI Content Platform',
    summary: 'A content management system powered by AI, featuring automated tagging, content suggestions, and smart search.',
    coverImage: { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', alt: 'AI interface' },
    techStack: ['Next.js', 'OpenAI', 'PostgreSQL'],
    category: 'Web Application',
    year: '2023',
  },
  {
    slug: 'fitness-tracker',
    title: 'Fitness Tracker',
    summary: 'A comprehensive fitness tracking application with workout logging, progress visualization, and social challenges.',
    coverImage: { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', alt: 'Fitness app' },
    techStack: ['Flutter', 'Firebase', 'HealthKit'],
    category: 'Mobile App',
    year: '2022',
  },
  {
    slug: 'real-estate-portal',
    title: 'Real Estate Portal',
    summary: 'A modern real estate platform with virtual tours, advanced search filters, and mortgage calculator.',
    coverImage: { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', alt: 'Real estate website' },
    techStack: ['Vue.js', 'Node.js', 'Mapbox'],
    category: 'Web Application',
    year: '2022',
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Fieldnote</Link>
            <ul className="flex items-center gap-8">
              <li><Link href="/projects" className="text-sm font-medium text-ember">Work</Link></li>
              <li><Link href="/about" className="text-sm font-medium text-ink hover:text-ember">About</Link></li>
              <li><Link href="/contact" className="text-sm font-medium text-ink hover:text-ember">Contact</Link></li>
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
                  <Image src={project.coverImage.url} alt={project.coverImage.alt} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-brass">{project.category}</span>
                    <span className="text-xs text-ink/50">{project.year}</span>
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
