'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-stone">
      <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors">Fieldnote</Link>
            <ul className="flex items-center gap-8">
              <li><Link href="/projects" className="text-sm font-medium text-ink hover:text-ember">Work</Link></li>
              <li><Link href="/about" className="text-sm font-medium text-ink hover:text-ember">About</Link></li>
              <li><Link href="/contact" className="text-sm font-medium text-ember">Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="block-spacing">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">Get in Touch</h1>
          <p className="text-lg text-ink/70 mb-12">Have a project in mind? Let's talk about how we can work together.</p>

          {submitted ? (
            <div className="bg-moss/10 border border-moss text-moss p-8 rounded-ledger text-center">
              <h2 className="font-display text-2xl mb-2">Message Sent!</h2>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-stone border border-ink/20 text-ink rounded-ledger focus:outline-none focus:border-ember transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-stone border border-ink/20 text-ink rounded-ledger focus:outline-none focus:border-ember transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-stone border border-ink/20 text-ink rounded-ledger focus:outline-none focus:border-ember transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-ember text-stone font-medium rounded-ledger hover:brightness-110 transition-all"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="mt-16 pt-8 border-t border-ink/10">
            <p className="text-sm text-ink/70 mb-4">Or reach me directly:</p>
            <div className="flex gap-6">
              <a href="mailto:hello@fieldnote.dev" className="text-ember hover:underline">hello@fieldnote.dev</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-ink">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-ink">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
