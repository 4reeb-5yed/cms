import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  try {
    const [projectsCount, pagesCount, featuredCount, recentProjects, recentPages] = await Promise.all([
      prisma.project.count(),
      prisma.page.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.project.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: { id: true, title: true, updatedAt: true }
      }),
      prisma.page.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: { id: true, title: true, updatedAt: true }
      })
    ])

    // Combine and sort recent activity
    const recentActivity = [
      ...recentProjects.map(p => ({ type: 'project', title: p.title, updatedAt: p.updatedAt })),
      ...recentPages.map(p => ({ type: 'page', title: p.title, updatedAt: p.updatedAt }))
    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5)

    return { projectsCount, pagesCount, featuredCount, recentActivity }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return { projectsCount: 0, pagesCount: 0, featuredCount: 0, recentActivity: [] }
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div>
      <h1 className="text-3xl font-display text-ink mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-ledger p-6 border border-ink/10">
          <div className="text-4xl font-display text-ember mb-2">{stats.projectsCount}</div>
          <div className="text-sm text-ink/70">Projects</div>
        </div>
        <div className="bg-white rounded-ledger p-6 border border-ink/10">
          <div className="text-4xl font-display text-ember mb-2">{stats.pagesCount}</div>
          <div className="text-sm text-ink/70">Pages</div>
        </div>
        <div className="bg-white rounded-ledger p-6 border border-ink/10">
          <div className="text-4xl font-display text-ember mb-2">{stats.featuredCount}</div>
          <div className="text-sm text-ink/70">Featured</div>
        </div>
      </div>

      <div className="bg-white rounded-ledger border border-ink/10 overflow-hidden">
        <div className="p-4 border-b border-ink/10">
          <h2 className="font-display text-xl text-ink">Quick Actions</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/pages/new" className="p-4 border border-ink/10 rounded-ledger hover:border-ember transition-colors">
            <div className="text-lg font-medium text-ink mb-1">+ New Page</div>
            <div className="text-sm text-ink/70">Create a new page</div>
          </Link>
          <Link href="/admin/projects/new" className="p-4 border border-ink/10 rounded-ledger hover:border-ember transition-colors">
            <div className="text-lg font-medium text-ink mb-1">+ New Project</div>
            <div className="text-sm text-ink/70">Add a portfolio piece</div>
          </Link>
          <Link href="/admin/settings" className="p-4 border border-ink/10 rounded-ledger hover:border-ember transition-colors">
            <div className="text-lg font-medium text-ink mb-1">Site Settings</div>
            <div className="text-sm text-ink/70">Configure your site</div>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-ledger border border-ink/10 overflow-hidden">
        <div className="p-4 border-b border-ink/10">
          <h2 className="font-display text-xl text-ink">Recent Activity</h2>
        </div>
        <div className="p-4">
          {stats.recentActivity.length === 0 ? (
            <p className="text-sm text-ink/50">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-ink/5 last:border-0">
                  <div>
                    <div className="text-sm text-ink">
                      {activity.type === 'project' ? 'Project' : 'Page'} &quot;{activity.title}&quot; updated
                    </div>
                    <div className="text-xs text-ink/50">{formatTimeAgo(activity.updatedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}