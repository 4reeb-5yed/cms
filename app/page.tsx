import Link from 'next/link'
import Image from 'next/image'

const featuredProjects = [
  {
    slug: 'interviewiq',
    title: 'InterviewIQ',
    summary: 'AI-powered career intelligence platform for evidence-based résumé analysis, ATS evaluation, and interview preparation.',
    coverImage: { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop', alt: 'AI platform interface' },
    techStack: ['Python', 'AI/ML', 'NLP', 'React'],
  },
  {
    slug: 'phishing-simulator',
    title: 'Phishing Simulator',
    summary: 'AI-powered phishing simulation and cybersecurity awareness platform with Gemini API integration.',
    coverImage: { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop', alt: 'Cybersecurity platform' },
    techStack: ['React', 'Express.js', 'MongoDB', 'Gemini API'],
  },
  {
    slug: 'caesar-cipher-tool',
    title: 'Caesar Cipher Tool',
    summary: 'Cryptographic analysis platform for automated Caesar cipher detection and statistical frequency analysis.',
    coverImage: { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop', alt: 'Cryptography tool' },
    techStack: ['JavaScript', 'Cryptography', 'Statistics'],
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
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Areeb Syed</Link>
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
            <h1 className="font-display text-5xl md:text-7xl text-ink leading-[1.05] mb-6">Building intelligent systems</h1>
            <p className="text-lg md:text-xl text-ink/70 leading-relaxed mb-8">Applied AI • Cybersecurity • Systems Engineering. Building intelligence-oriented security tooling and analytical platforms.</p>
            <Link href="/projects" className="inline-flex px-6 py-3 bg-ember text-stone font-medium text-sm rounded-ledger hover:brightness-110 transition-all">View Projects</Link>
          </div>
        </div>
      </section>

      <section className="block-spacing bg-stone">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
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
              <h3 className="font-display text-xl mb-4">Areeb Syed</h3>
              <p className="text-stone/70 text-sm">Applied AI • Cybersecurity • Systems Engineering</p>
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
                <a href="mailto:areeb.syed1@outlook.com" className="text-stone/70 hover:text-ember" title="Email">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="https://github.com/4reeb-5yed" target="_blank" rel="noopener noreferrer" className="text-stone/70 hover:text-stone" title="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/areeb-syed-b19491245" target="_blank" rel="noopener noreferrer" className="text-stone/70 hover:text-stone" title="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-stone/10 mt-12 pt-8 text-center text-stone/50 text-sm">
            © 2024 Areeb Syed. Building intelligent systems.
          </div>
        </div>
      </footer>
    </main>
  )
}
