import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const projects = {
  'ecommerce-dashboard': {
    title: 'E-commerce Dashboard',
    summary: 'A real-time analytics dashboard for online retailers, featuring sales tracking, inventory management, and customer insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
    category: 'Web Application',
    year: '2024',
    challenges: 'The main challenge was handling real-time data updates while maintaining smooth animations and interactions. We implemented WebSocket connections for live data and optimized D3.js rendering.',
    solution: 'Built a custom charting library on top of D3.js with virtual scrolling for large datasets. Used Redis pub/sub for real-time updates and PostgreSQL for persistent storage.',
    outcome: 'Reduced report generation time by 70% and increased user engagement by 40%.',
  },
  'mobile-banking': {
    title: 'Mobile Banking App',
    summary: 'A secure mobile banking application with biometric authentication and real-time transaction notifications.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
    techStack: ['React Native', 'TypeScript', 'GraphQL', 'AWS Cognito'],
    category: 'Mobile App',
    year: '2024',
    challenges: 'Implementing secure biometric authentication while maintaining a smooth user experience across different devices and OS versions.',
    solution: 'Used AWS Cognito for authentication with device-specific biometric integration. Built a custom secure storage layer for sensitive data.',
    outcome: 'Achieved 4.8 star rating on app stores with 500K+ downloads.',
  },
  'design-system': {
    title: 'Component Library',
    summary: 'A comprehensive design system with 50+ accessible components, serving as the foundation for multiple products.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    techStack: ['Storybook', 'Tailwind CSS', 'TypeScript', 'Figma'],
    category: 'Design System',
    year: '2023',
    challenges: 'Creating a consistent design language that works across multiple products while maintaining flexibility for product-specific customizations.',
    solution: 'Established design tokens and a component API that allows for easy theming and customization without forking the core components.',
    outcome: 'Reduced design-to-development time by 50% and improved design consistency across all products.',
  },
  'ai-content-platform': {
    title: 'AI Content Platform',
    summary: 'A content management system powered by AI, featuring automated tagging, content suggestions, and smart search.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    techStack: ['Next.js', 'OpenAI', 'PostgreSQL', 'Vector DB'],
    category: 'Web Application',
    year: '2023',
    challenges: 'Integrating AI capabilities without impacting performance or user experience. Ensuring content quality with AI-generated suggestions.',
    solution: 'Implemented async AI processing with user-friendly loading states. Built a feedback loop system to continuously improve suggestions.',
    outcome: 'Content creation time reduced by 60% with improved SEO performance.',
  },
  'fitness-tracker': {
    title: 'Fitness Tracker',
    summary: 'A comprehensive fitness tracking application with workout logging, progress visualization, and social challenges.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
    techStack: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit'],
    category: 'Mobile App',
    year: '2022',
    challenges: 'Syncing data across multiple health platforms while maintaining accuracy and privacy.',
    solution: 'Built a unified data layer that normalizes data from different sources. Implemented end-to-end encryption for health data.',
    outcome: '50K+ active users with 4.6 average rating.',
  },
  'real-estate-portal': {
    title: 'Real Estate Portal',
    summary: 'A modern real estate platform with virtual tours, advanced search filters, and mortgage calculator.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
    techStack: ['Vue.js', 'Node.js', 'Mapbox', 'Three.js'],
    category: 'Web Application',
    year: '2022',
    challenges: 'Creating immersive 3D virtual tours that load quickly on various devices and connections.',
    solution: 'Implemented progressive loading for 3D models with adaptive quality based on device capabilities.',
    outcome: 'Increased property engagement by 200% and reduced time-to-inquiry by 40%.',
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug as keyof typeof projects]
  
  if (!project) {
    notFound()
  }

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

      <article className="block-spacing">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/projects" className="inline-flex items-center text-sm text-ink/70 hover:text-ember mb-8">
            ← Back to Projects
          </Link>
          
          <div className="mb-8">
            <span className="text-xs font-mono uppercase text-brass">{project.category}</span>
            <h1 className="font-display text-4xl md:text-5xl text-ink mt-2 mb-4">{project.title}</h1>
            <p className="text-lg text-ink/70">{project.summary}</p>
          </div>

          <div className="aspect-[3/2] relative rounded-ledger overflow-hidden mb-12">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Year</h3>
              <p className="text-ink">{project.year}</p>
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
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">The Challenge</h2>
              <p className="text-ink/70 leading-relaxed">{project.challenges}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">The Solution</h2>
              <p className="text-ink/70 leading-relaxed">{project.solution}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">The Outcome</h2>
              <p className="text-ink/70 leading-relaxed">{project.outcome}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
