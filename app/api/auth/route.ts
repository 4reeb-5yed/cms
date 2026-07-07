import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SESSION_COOKIE_NAME = 'cms_session'
const SESSION_EXPIRY = '7d'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Simple password comparison (for single-admin site)
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Create session token
    const sessionSecret = process.env.SESSION_SECRET || 'default-secret-change-me'
    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() },
      sessionSecret,
      { expiresIn: SESSION_EXPIRY }
    )

    const response = NextResponse.json({ success: true })
    
    // Set httpOnly cookie
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  })

  return response
}
