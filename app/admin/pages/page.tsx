'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Page {
  id: string
  title: string
  slug: string
  showInNav: boolean
  updatedAt: string
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cms_pages')
    if (stored) {
      setPages(JSON.parse(stored))
    } else {
      const defaultPages = [
        { id: '1', title: 'Home', slug: '/', showInNav: false, updatedAt: '2024-01-01' },
        { id: '2', title: 'About', slug: 'about', showInNav: true, updatedAt: '2024-01-15' },
        { id: '3', title: 'Contact', slug: 'contact', showInNav: true, updatedAt: '2024-01-20' },
      ]
      setPages(defaultPages)
      localStorage.setItem('cms_pages', JSON.stringify(defaultPages))
    }
  }, [])

  const deletePage = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      const updated = pages.filter(p => p.id !== id)
      setPages(updated)
      localStorage.setItem('cms_pages', JSON.stringify(updated))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display text-ink">Pages</h1>
        <Link href="/admin/pages/new" className="px-4 py-2 bg-ember text-stone rounded-ledger hover:brightness-110">
          + New Page
        </Link>
      </div>

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
                <td className="p-4 text-ink/50 text-sm">{page.updatedAt}</td>
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
    </div>
  )
}