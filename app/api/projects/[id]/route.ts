import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
      include: { coverImage: true }
    })
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        summary: body.summary,
        coverImageId: body.coverImageId,
        techStack: body.techStack,
        liveUrl: body.liveUrl,
        repoUrl: body.repoUrl,
        gallery: body.gallery,
        body: body.body,
        featured: body.featured,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : undefined,
        category: body.category,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        challenges: body.challenges,
        solution: body.solution,
        outcome: body.outcome
      },
      include: { coverImage: true }
    })
    
    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.project.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
