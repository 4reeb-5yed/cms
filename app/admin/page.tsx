import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-display text-ink mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-ledger p-6 border border-ink/10">
          <div className="text-4xl font-display text-ember mb-2">6</div>
          <div className="text-sm text-ink/70">Projects</div>
        </div>
        <div className="bg-white rounded-ledger p-6 border border-ink/10">
          <div className="text-4xl font-display text-ember mb-2">5</div>
          <div className="text-sm text-ink/70">Pages</div>
        </div>
        <div className="bg-white rounded-ledger p-6 border border-ink/10">
          <div className="text-4xl font-display text-ember mb-2">3</div>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-ink/5">
              <div>
                <div className="text-sm text-ink">Project &quot;E-commerce Dashboard&quot; updated</div>
                <div className="text-xs text-ink/50">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-ink/5">
              <div>
                <div className="text-sm text-ink">Page &quot;About&quot; published</div>
                <div className="text-xs text-ink/50">1 day ago</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm text-ink">New project &quot;AI Content Platform&quot; created</div>
                <div className="text-xs text-ink/50">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}