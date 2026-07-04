import { notFound } from 'next/navigation'
import { Header, Footer } from '@/components/layout'
import { BlockRenderer } from '@/components/BlockRenderer'
import { getPage, getFeaturedProjects, getNavigation, getSiteSettings } from '@/lib/api'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const [page, projects, navigation, settings] = await Promise.all([
    getPage(slug),
    getFeaturedProjects(),
    getNavigation(),
    getSiteSettings(),
  ])

  if (!page) {
    notFound()
  }

  return (
    <main>
      <Header navigation={navigation.items} siteTitle={settings.siteTitle} />
      <BlockRenderer blocks={page.blocks} projects={projects} />
      <Footer navigation={navigation.items} settings={settings} />
    </main>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)
  
  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
  }
}
