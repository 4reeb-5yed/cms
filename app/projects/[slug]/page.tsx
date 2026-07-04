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
            <p className="text-lg text-ink/70">{project.summary}</p>
          </div>

          <div className="aspect-[3/2] relative rounded-ledger overflow-hidden mb-12">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Year</h3>
              <p className="text-ink">{project.year}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Category</h3>
              <p className="text-ink">{project.category}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs border border-moss text-moss rounded-ledger">{tech}</span>
                ))}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Live Demo</h3>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-ember text-stone text-sm rounded-ledger hover:brightness-110">
                View Live →
              </a>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase text-brass mb-2">Source</h3>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 border border-ink/20 text-ink text-sm rounded-ledger hover:bg-ink/5">
                GitHub →
              </a>
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
