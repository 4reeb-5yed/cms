import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const page = await prisma.page.findUnique({
      where: { id },
      include: { coverImage: true }
    })
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    
    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedPage = await prisma.page.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        showInNav: body.showInNav,
        navOrder: body.navOrder,
        coverImageId: body.coverImageId,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        blocks: body.blocks
      },
      include: { coverImage: true }
    })
    
    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.page.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}
