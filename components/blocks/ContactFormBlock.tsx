"use client"
import { useState } from 'react'
import { ContactFormBlock as ContactFormBlockType } from '@/types'

export function ContactFormBlock({ heading }: ContactFormBlockType) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email)
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formState.name.trim()) {
      newErrors.name = 'Your name is required'
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Your email is required'
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "That email doesn't look complete — check the @ and domain"
    }
    if (!formState.message.trim()) {
      newErrors.message = 'A message would be nice'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    
    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleBlur = () => {
    validate()
  }

  if (submitted) {
    return (
      <section className="block-spacing bg-stone">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-moss/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-ink mb-4">Message sent</h2>
            <p className="text-ink/70">I will reply within a few days.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="block-spacing bg-stone">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-md mx-auto">
          {heading && (
            <h2 className="font-display text-3xl text-ink mb-8 text-center">{heading}</h2>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-b-2 ${errors.name ? 'border-red-700' : 'border-ink/40 focus:border-ember'} px-0 py-2 text-ink transition-colors duration-100 outline-none`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-red-700 mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-red-700' : 'border-ink/40 focus:border-ember'} px-0 py-2 text-ink transition-colors duration-100 outline-none`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-b-2 ${errors.message ? 'border-red-700' : 'border-ink/40 focus:border-ember'} px-0 py-2 text-ink transition-colors duration-100 outline-none resize-none`}
                placeholder="What would you like to say?"
              />
              {errors.message && <p className="text-xs text-red-700 mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full"
            >
              {submitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
