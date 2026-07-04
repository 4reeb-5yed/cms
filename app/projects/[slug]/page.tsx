import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const projects = {
  'interviewiq': {
    title: 'InterviewIQ',
    summary: 'AI-powered career intelligence platform for evidence-based résumé analysis, ATS evaluation, and interview preparation.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
    techStack: ['Python', 'AI/ML', 'NLP', 'React', 'FastAPI', 'LangGraph'],
    category: 'AI/ML',
    year: '2024',
    liveUrl: 'https://interview-iq-areeb-syed.vercel.app',
    repoUrl: 'https://github.com/4reeb-5yed/InterviewIQ',
    challenges: 'Creating an accurate ATS evaluation system that can analyze resumes against job descriptions and provide actionable feedback. Ensuring the AI understands context and nuances in professional experiences.',
    solution: 'Built a multi-layer NLP pipeline that parses resumes, extracts key skills and experiences, and compares them against job requirements. Integrated with OpenAI for intelligent feedback generation.',
    outcome: 'Helps job seekers understand their resume performance and improve their chances of passing ATS screening.',
  },
  'phishing-simulator': {
    title: 'Phishing Simulator',
    summary: 'AI-powered phishing simulation and cybersecurity awareness platform with Gemini API integration.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop',
    techStack: ['React', 'Express.js', 'MongoDB', 'Gemini API', 'JavaScript'],
    category: 'Cybersecurity',
    year: '2024',
    liveUrl: 'https://fish-sail.onrender.com',
    repoUrl: 'https://github.com/4reeb-5yed/Phishing_Simulator',
    challenges: 'Creating realistic phishing templates that test employee awareness while ensuring the simulation is ethical and educational. Integrating AI for dynamic content generation.',
    solution: 'Built a comprehensive phishing template system with AI-generated scenarios. Implemented detailed tracking and reporting for organizations to measure security awareness.',
    outcome: 'Organizations can train employees to recognize phishing attempts and measure improvement over time.',
  },
  'caesar-cipher-tool': {
    title: 'Caesar Cipher Pro',
    summary: 'Cryptographic analysis platform for automated Caesar cipher detection and statistical frequency analysis.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop',
    techStack: ['React', 'Vite', 'JavaScript', 'Chi-squared Analysis'],
    category: 'Security Tools',
    year: '2024',
    liveUrl: 'https://caesar-cipher-pro.netlify.app',
    repoUrl: 'https://github.com/4reeb-5yed/caesar-cipher-tool',
    challenges: 'Developing an algorithm that can efficiently crack Caesar ciphers of varying lengths and languages. Balancing accuracy with computational efficiency.',
    solution: 'Implemented multiple attack strategies including brute force, frequency analysis, and pattern matching using chi-squared statistical analysis.',
    outcome: 'Educational tool that demonstrates cryptographic concepts and automated cryptanalysis techniques.',
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
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Areeb Syed</Link>
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
            <p className="text-lg text-ink/70 mb-6">{project.summary}</p>
            <div className="flex flex-wrap gap-4">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-stone font-medium rounded-ledger hover:brightness-110 transition-all text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View Live Demo
              </a>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-medium rounded-ledger hover:bg-ink/5 transition-all text-base">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View Source Code
              </a>
            </div>
          </div>

          <div className="aspect-[3/2] relative rounded-ledger overflow-hidden mb-12">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
