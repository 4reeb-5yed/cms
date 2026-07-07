'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' })
        fetchProjects()
        router.refresh()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const project = projects.find(p => p.id === id)
      if (project) {
        await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featured: !currentFeatured })
        })
        fetchProjects()
      }
    } catch (error) {
      console.error('Error toggling featured:', error)
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
        <p className="text-ink/50">Loading projects...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display text-ink">Projects</h1>
        <Link href="/admin/projects/new" className="px-4 py-2 bg-ember text-stone rounded-ledger hover:brightness-110">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-ledger border border-ink/10 p-8 text-center">
          <p className="text-ink/70 mb-4">No projects yet</p>
          <Link href="/admin/projects/new" className="text-ember hover:underline">
            Create your first project
          </Link>
        </div>
      ) : (
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
                      onClick={() => toggleFeatured(project.id, project.featured)}
                      className={`px-2 py-1 text-xs rounded ${project.featured ? 'bg-ember/20 text-ember' : 'bg-ink/10 text-ink/50'}`}
                    >
                      {project.featured ? 'Featured' : 'No'}
                    </button>
                  </td>
                  <td className="p-4 text-ink/50 text-sm">{formatDate(project.publishedDate)}</td>
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
      )}
    </div>
  )
}