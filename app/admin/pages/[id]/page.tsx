'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface PageData {
  id: string
  title: string
  slug: string
  showInNav: boolean
  navOrder: number
  metaTitle: string | null
  metaDescription: string | null
  blocks: string
}

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [page, setPage] = useState<PageData | null>(null)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    showInNav: false,
    navOrder: 0,
    metaTitle: '',
    metaDescription: '',
    blocks: '[]'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPage()
  }, [id])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/pages/${id}`)
      if (!response.ok) {
        throw new Error('Page not found')
      }
      const data = await response.json()
      setPage(data)
      setForm({
        title: data.title || '',
        slug: data.slug || '',
        showInNav: data.showInNav || false,
        navOrder: data.navOrder || 0,
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        blocks: typeof data.blocks === 'string' ? data.blocks : JSON.stringify(data.blocks || [])
      })
    } catch (err) {
      setError('Failed to load page')
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
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update page')
      }

      router.push('/admin/pages')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update page')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink/50">Loading page...</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-ink/70 mb-4">Page not found</p>
        <Link href="/admin/pages" className="text-ember hover:underline">
          Back to Pages
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/pages" className="text-sm text-ink/70 hover:text-ember mb-4 inline-block">
          ← Back to Pages
        </Link>
        <h1 className="text-3xl font-display text-ink">Edit Page</h1>
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
            placeholder="Page Title"
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
            placeholder="page-slug"
          />
          <p className="text-xs text-ink/50 mt-1">URL: /{form.slug || 'your-slug'}</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showInNav"
            checked={form.showInNav}
            onChange={(e) => setForm({ ...form, showInNav: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="showInNav" className="text-sm text-ink">Show in Navigation</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Navigation Order</label>
          <input
            type="number"
            value={form.navOrder}
            onChange={(e) => setForm({ ...form, navOrder: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="0"
          />
          <p className="text-xs text-ink/50 mt-1">Lower numbers appear first in navigation</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Meta Title</label>
          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="SEO title (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Meta Description</label>
          <textarea
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember resize-none"
            rows={2}
            placeholder="SEO description (optional)"
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
            onClick={() => router.push('/admin/pages')}
            className="px-6 py-2 border border-ink/20 text-ink rounded-ledger hover:bg-stone/50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
