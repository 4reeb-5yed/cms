'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login'

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-ink text-stone">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="font-display text-xl">Fieldnote CMS</Link>
              <div className="flex gap-6">
                <Link href="/admin/pages" className={`text-sm ${pathname.startsWith('/admin/pages') ? 'text-ember' : 'text-stone/70 hover:text-stone'}`}>Pages</Link>
                <Link href="/admin/projects" className={`text-sm ${pathname.startsWith('/admin/projects') ? 'text-ember' : 'text-stone/70 hover:text-stone'}`}>Projects</Link>
                <Link href="/admin/settings" className={`text-sm ${pathname === '/admin/settings' ? 'text-ember' : 'text-stone/70 hover:text-stone'}`}>Settings</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-sm text-stone/70 hover:text-stone">View Site →</Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-sm text-stone/70 hover:text-stone">Logout</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}