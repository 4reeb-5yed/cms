'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface ProjectData {
  id: string
  title: string
  slug: string
  summary: string
  coverImageId: string | null
  techStack: string[]
  liveUrl: string | null
  repoUrl: string | null
  featured: boolean
  publishedDate: string
  category: string
  metaTitle: string | null
  metaDescription: string | null
  challenges: string | null
  solution: string | null
  outcome: string | null
}

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [project, setProject] = useState<ProjectData | null>(null)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    coverImageId: '',
    techStack: '',
    liveUrl: '',
    repoUrl: '',
    featured: false,
    publishedDate: new Date().toISOString().split('T')[0],
    category: '',
    metaTitle: '',
    metaDescription: '',
    challenges: '',
    solution: '',
    outcome: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      if (!response.ok) {
        throw new Error('Project not found')
      }
      const data = await response.json()
      setProject(data)
      setForm({
        title: data.title || '',
        slug: data.slug || '',
        summary: data.summary || '',
        coverImageId: data.coverImageId || '',
        techStack: Array.isArray(data.techStack) ? data.techStack.join(', ') : '',
        liveUrl: data.liveUrl || '',
        repoUrl: data.repoUrl || '',
        featured: data.featured || false,
        publishedDate: data.publishedDate ? new Date(data.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: data.category || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        challenges: data.challenges || '',
        solution: data.solution || '',
        outcome: data.outcome || ''
      })
    } catch (err) {
      setError('Failed to load project')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean)
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update project')
      }

      router.push('/admin/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink/50">Loading project...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-ink/70 mb-4">Project not found</p>
        <Link href="/admin/projects" className="text-ember hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/projects" className="text-sm text-ink/70 hover:text-ember mb-4 inline-block">
          ← Back to Projects
        </Link>
        <h1 className="text-3xl font-display text-ink">Edit Project</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-ledger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-ledger border border-ink/10 p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="Project Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Slug</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember font-mono"
            placeholder="project-slug"
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

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="e.g., Web Development, AI/ML, Cybersecurity"
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

        <div>
          <label className="block text-sm font-medium text-ink mb-2">The Challenge</label>
          <textarea
            rows={3}
            value={form.challenges}
            onChange={(e) => setForm({ ...form, challenges: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember resize-none"
            placeholder="What challenges does this project address?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">The Solution</label>
          <textarea
            rows={3}
            value={form.solution}
            onChange={(e) => setForm({ ...form, solution: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember resize-none"
            placeholder="How does this project solve those challenges?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">The Outcome</label>
          <textarea
            rows={3}
            value={form.outcome}
            onChange={(e) => setForm({ ...form, outcome: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember resize-none"
            placeholder="What results or impact does this project have?"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2 bg-ember text-stone rounded-ledger hover:brightness-110 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/admin/projects')}
            className="px-6 py-2 border border-ink/20 text-ink rounded-ledger hover:bg-stone/50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
