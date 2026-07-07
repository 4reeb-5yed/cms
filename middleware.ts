import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'cms_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)

    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
