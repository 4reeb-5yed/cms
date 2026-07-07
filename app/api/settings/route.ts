import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' }
    })
    
    if (!settings) {
      // Return default settings if none exist
      return NextResponse.json({
        id: 'singleton',
        siteTitle: 'My Portfolio',
        tagline: '',
        logoUrl: null,
        footerText: '',
        socialLinks: '[]'
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    const updatedSettings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: {
        siteTitle: body.siteTitle,
        tagline: body.tagline,
        logoUrl: body.logoUrl,
        footerText: body.footerText,
        socialLinks: body.socialLinks
      },
      create: {
        id: 'singleton',
        siteTitle: body.siteTitle || 'My Portfolio',
        tagline: body.tagline || '',
        logoUrl: body.logoUrl,
        footerText: body.footerText || '',
        socialLinks: body.socialLinks || '[]'
      }
    })
    
    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
