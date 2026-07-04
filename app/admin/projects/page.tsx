'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { sampleProjects } from '@/lib/api'

interface Project {
  id: string
  title: string
  slug: string
  featured: boolean
  publishedDate: string
  updatedAt: string
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cms_projects')
    if (stored) {
      setProjects(JSON.parse(stored))
    } else {
      setProjects(sampleProjects.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        featured: p.featured,
        publishedDate: p.publishedDate,
        updatedAt: p.updatedAt
      })))
    }
  }, [])

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      localStorage.setItem('cms_projects', JSON.stringify(updated))
    }
  }

  const toggleFeatured = (id: string) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    )
    setProjects(updated)
    localStorage.setItem('cms_projects', JSON.stringify(updated))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display text-ink">Projects</h1>
        <Link href="/admin/projects/new" className="px-4 py-2 bg-ember text-stone rounded-ledger hover:brightness-110">
          + New Project
        </Link>
      </div>

      <div className="bg-white rounded-ledger border border-ink/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-ink">Title</th>
              <th className="text-left p-4 text-sm font-medium text-ink">Slug</th>
              <th className="text-left p-4 text-sm font-medium text-ink">Featured</th>
              <th className="text-left p-4 text-sm font-medium text-ink">Date</th>
              <th className="text-right p-4 text-sm font-medium text-ink">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-ink/10">
                <td className="p-4">
                  <Link href={`/admin/projects/${project.id}`} className="text-ink hover:text-ember font-medium">
                    {project.title}
                  </Link>
                </td>
                <td className="p-4 text-ink/70 font-mono text-sm">/{project.slug}</td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleFeatured(project.id)}
                    className={`px-2 py-1 text-xs rounded ${project.featured ? 'bg-ember/20 text-ember' : 'bg-ink/10 text-ink/50'}`}
                  >
                    {project.featured ? 'Featured' : 'No'}
                  </button>
                </td>
                <td className="p-4 text-ink/50 text-sm">{project.publishedDate}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/projects/${project.id}`} className="text-ember hover:underline mr-4">
                    Edit
                  </Link>
                  <button onClick={() => deleteProject(project.id)} className="text-red-600 hover:underline">
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