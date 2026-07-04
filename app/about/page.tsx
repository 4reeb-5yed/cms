import Link from 'next/link'

const skills = [
  { category: 'AI & Machine Learning', items: ['Python', 'NLP', 'TensorFlow', 'Gemini API', 'OpenAI'] },
  { category: 'Cybersecurity', items: ['Penetration Testing', 'Cryptography', 'Phishing Detection', 'Security Analysis', 'Risk Assessment'] },
  { category: 'Full Stack', items: ['React', 'Next.js', 'Express.js', 'Node.js', 'MongoDB'] },
  { category: 'Tools & Platforms', items: ['Git', 'GitHub', 'Docker', 'Vercel', 'AWS'] },
]

const experience = [
  { year: '2024-Present', role: 'Student Researcher', company: 'The Venture MIT-WPU' },
  { year: '2023-2027', role: 'B.Tech Student', company: 'MIT World Peace University' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Areeb Syed</Link>
            <ul className="flex items-center gap-8">
              <li><Link href="/projects" className="text-sm font-medium text-ink hover:text-ember">Work</Link></li>
              <li><Link href="/about" className="text-sm font-medium text-ember">About</Link></li>
              <li><Link href="/contact" className="text-sm font-medium text-ink hover:text-ember">Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="block-spacing">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl text-ink mb-8">About</h1>
            <div className="prose prose-lg text-ink/80">
              <p className="mb-6">
                I'm <strong>Areeb Syed</strong>, a student at MIT World Peace University pursuing Analytics & Artificial Intelligence. I'm passionate about building intelligence-oriented security tooling, analytical cryptographic systems, and offensive-simulation infrastructure.
              </p>
              <p className="mb-6">
                My work focuses on the intersection of AI and cybersecurity, where I develop tools that help organizations strengthen their security posture through simulated attacks and intelligent analysis. I'm particularly interested in automated security assessment and AI-powered threat detection.
              </p>
              <p className="mb-6">
                With hands-on experience in phishing simulation platforms, cryptographic analysis tools, and AI-powered career intelligence systems, I'm constantly exploring new ways to apply machine learning to real-world security challenges.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a href="https://www.linkedin.com/in/areeb-syed-b19491245" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-ink text-stone rounded-ledger hover:bg-ink/80 transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/4reeb-5yed" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-ink text-ink rounded-ledger hover:bg-ink/5 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-display text-2xl text-ink mb-8">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.role} className="border-l-2 border-ember pl-6">
                  <span className="text-xs font-mono uppercase text-brass">{exp.year}</span>
                  <h3 className="font-display text-xl text-ink mt-1">{exp.role}</h3>
                  <p className="text-ink/70">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <h3 className="text-xs font-mono uppercase text-brass mb-3">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="px-3 py-1 text-sm border border-ink/20 text-ink/80 rounded-ledger">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
