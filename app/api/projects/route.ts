import { NextResponse } from 'next/server'
import { sampleProjects } from '@/lib/api'

export async function GET() {
  const stored = typeof window === 'undefined' ? null : localStorage.getItem('cms_projects')
  const projects = stored ? JSON.parse(stored) : sampleProjects
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newProject = {
    ...body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  // In a real implementation, this would save to database
  return NextResponse.json(newProject, { status: 201 })
}