import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      include: { coverImage: true },
      orderBy: { navOrder: 'asc' }
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newPage = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        showInNav: body.showInNav || false,
        navOrder: body.navOrder || 0,
        coverImageId: body.coverImageId,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        blocks: body.blocks || '[]'
      },
      include: { coverImage: true }
    })
    
    return NextResponse.json(newPage, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
