import { Page, Project, Navigation, SiteSettings } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}`, {
      next: { revalidate: false },
    })
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }
    
    return res.json()
  } catch (error) {
    throw error
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    return await fetchAPI<Page>(`pages/${slug}`)
  } catch {
    return null
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    return await fetchAPI<Page[]>('pages')
  } catch {
    return []
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    return await fetchAPI<Project>(`projects/${slug}`)
  } catch {
    return null
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    return await fetchAPI<Project[]>('projects')
  } catch {
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return await fetchAPI<Project[]>('projects?featured=true')
  } catch {
    return []
  }
}

export async function getNavigation(): Promise<Navigation> {
  try {
    return await fetchAPI<Navigation>('navigation')
  } catch {
    return { items: [] }
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await fetchAPI<SiteSettings>('site-settings')
  } catch {
    return { siteTitle: 'Portfolio', socialLinks: [] }
  }
}
