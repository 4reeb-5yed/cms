'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProject() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    techStack: '',
    liveUrl: '',
    repoUrl: '',
    featured: false,
    publishedDate: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProject = {
      id: Date.now().toString(),
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      coverImage: { id: '1', url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop', alt: form.title, filename: 'default.jpg' },
      liveUrl: form.liveUrl,
      repoUrl: form.repoUrl,
      gallery: [],
      body: [],
      featured: form.featured,
      publishedDate: form.publishedDate,
      meta: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const stored = localStorage.getItem('cms_projects')
    const projects = stored ? JSON.parse(stored) : []
    projects.push(newProject)
    localStorage.setItem('cms_projects', JSON.stringify(projects))

    router.push('/admin/projects')
  }

  return (
    <div>
      <h1 className="text-3xl font-display text-ink mb-8">New Project</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-ledger border border-ink/10 p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="My Awesome Project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Slug</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember font-mono"
            placeholder="my-awesome-project"
          />
          <p className="text-xs text-ink/50 mt-1">URL: /projects/{form.slug || 'your-slug'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Summary</label>
          <textarea
            required
            rows={3}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember resize-none"
            placeholder="Brief description of the project..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Tech Stack</label>
          <input
            type="text"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="React, Node.js, PostgreSQL (comma-separated)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Live URL</label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Repo URL</label>
            <input
              type="url"
              value={form.repoUrl}
              onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Published Date</label>
          <input
            type="date"
            value={form.publishedDate}
            onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="text-sm text-ink">Featured Project</label>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2 bg-ember text-stone rounded-ledger hover:brightness-110">
            Create Project
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-ink/20 text-ink rounded-ledger hover:bg-stone/50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}