import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured')
  
  try {
    const projects = featured === 'true'
      ? await prisma.project.findMany({
          where: { featured: true },
          include: { coverImage: true },
          orderBy: { publishedDate: 'desc' }
        })
      : await prisma.project.findMany({
          include: { coverImage: true },
          orderBy: { publishedDate: 'desc' }
        })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newProject = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        summary: body.summary || '',
        coverImageId: body.coverImageId,
        techStack: body.techStack || [],
        liveUrl: body.liveUrl,
        repoUrl: body.repoUrl,
        gallery: body.gallery || '[]',
        body: body.body || '[]',
        featured: body.featured || false,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : new Date(),
        category: body.category || '',
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        challenges: body.challenges,
        solution: body.solution,
        outcome: body.outcome
      },
      include: { coverImage: true }
    })
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}