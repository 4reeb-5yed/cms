import Link from 'next/link'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'REST APIs'] },
  { category: 'Design', items: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Jest'] },
]

const experience = [
  { year: '2022-Present', role: 'Senior Frontend Developer', company: 'Tech Startup' },
  { year: '2020-2022', role: 'Full Stack Developer', company: 'Digital Agency' },
  { year: '2018-2020', role: 'UI/UX Designer', company: 'Creative Studio' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Fieldnote</Link>
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
                I'm a designer and developer based in San Francisco, passionate about creating digital experiences that balance aesthetics with functionality.
              </p>
              <p className="mb-6">
                With over 5 years of experience in the industry, I've worked with startups and established companies to build products that users love. My approach combines technical expertise with design thinking to deliver solutions that are both beautiful and effective.
              </p>
              <p>
                When I'm not coding or designing, you can find me exploring hiking trails, reading about technology, or experimenting with new design tools.
              </p>
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
            <h2 className="font-display text-2xl text-ink mb-8">Skills</h2>
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
