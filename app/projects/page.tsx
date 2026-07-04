import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    slug: 'interviewiq',
    title: 'InterviewIQ',
    summary: 'AI-powered career intelligence platform for evidence-based résumé analysis, ATS evaluation, and interview preparation.',
    coverImage: { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop', alt: 'AI platform interface' },
    techStack: ['Python', 'AI/ML', 'NLP', 'FastAPI', 'LangGraph'],
    category: 'AI/ML',
    year: '2024',
    liveUrl: 'https://interview-iq-areeb-syed.vercel.app',
  },
  {
    slug: 'phishing-simulator',
    title: 'Phishing Simulator',
    summary: 'AI-powered phishing simulation and cybersecurity awareness platform with Gemini API integration.',
    coverImage: { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop', alt: 'Cybersecurity platform' },
    techStack: ['React', 'Express.js', 'MongoDB', 'Gemini API'],
    category: 'Cybersecurity',
    year: '2024',
    liveUrl: 'https://fish-sail.onrender.com',
  },
  {
    slug: 'caesar-cipher-tool',
    title: 'Caesar Cipher Pro',
    summary: 'Cryptographic analysis platform for automated Caesar cipher detection and statistical frequency analysis.',
    coverImage: { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop', alt: 'Cryptography tool' },
    techStack: ['React', 'Vite', 'Chi-squared Analysis'],
    category: 'Security Tools',
    year: '2024',
    liveUrl: 'https://caesar-cipher-pro.netlify.app',
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono uppercase border border-moss text-moss rounded-ledger">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3" onClick={(e) => e.preventDefault()}>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-ember text-stone text-xs font-medium rounded-ledger hover:brightness-110 z-10 relative">
                      View Live
                    </a>
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
