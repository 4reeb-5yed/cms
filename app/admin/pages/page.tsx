'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Page {
  id: string
  title: string
  slug: string
  showInNav: boolean
  updatedAt: string
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/pages')
      const data = await response.json()
      setPages(data)
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      try {
        await fetch(`/api/pages/${id}`, { method: 'DELETE' })
        fetchPages()
        router.refresh()
      } catch (error) {
        console.error('Error deleting page:', error)
      }
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink/50">Loading pages...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display text-ink">Pages</h1>
        <Link href="/admin/pages/new" className="px-4 py-2 bg-ember text-stone rounded-ledger hover:brightness-110">
          + New Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-ledger border border-ink/10 p-8 text-center">
          <p className="text-ink/70 mb-4">No pages yet</p>
          <Link href="/admin/pages/new" className="text-ember hover:underline">
            Create your first page
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-ledger border border-ink/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-ink">Title</th>
                <th className="text-left p-4 text-sm font-medium text-ink">Slug</th>
                <th className="text-left p-4 text-sm font-medium text-ink">In Nav</th>
                <th className="text-left p-4 text-sm font-medium text-ink">Updated</th>
                <th className="text-right p-4 text-sm font-medium text-ink">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-t border-ink/10">
                  <td className="p-4">
                    <Link href={`/admin/pages/${page.id}`} className="text-ink hover:text-ember font-medium">
                      {page.title}
                    </Link>
                  </td>
                  <td className="p-4 text-ink/70 font-mono text-sm">/{page.slug}</td>
                  <td className="p-4">
                    {page.showInNav ? (
                      <span className="px-2 py-1 text-xs bg-moss/20 text-moss rounded">Yes</span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-ink/10 text-ink/50 rounded">No</span>
                    )}
                  </td>
                  <td className="p-4 text-ink/50 text-sm">{formatDate(page.updatedAt)}</td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/pages/${page.id}`} className="text-ember hover:underline mr-4">
                      Edit
                    </Link>
                    <button onClick={() => deletePage(page.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}