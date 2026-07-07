import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'cms_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to login page and public routes always
  if (pathname === '/admin/login' || !pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Protect /admin routes (except login) - but only redirect, don't block the entire site
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)

    // If no session cookie, redirect to login
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
