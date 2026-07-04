export interface Media {
  id: string
  url: string
  alt: string
  caption?: string
}

export interface Page {
  id: string
  title: string
  slug: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: Media
  }
  showInNav: boolean
  navOrder: number
  blocks: Block[]
}

export interface Project {
  id: string
  title: string
  slug: string
  coverImage: Media
  summary: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  gallery: Media[]
  featured: boolean
  publishedDate: string
  body: Block[]
}

export type Block =
  | HeroBlock
  | RichTextBlock
  | ProjectGridBlock
  | ImageGalleryBlock
  | TimelineBlock
  | ContactFormBlock
  | CustomEmbedBlock

export interface HeroBlock {
  blockType: 'hero'
  heading: string
  subheading?: string
  image?: Media
  ctaLabel?: string
  ctaLink?: string
}

export interface RichTextBlock {
  blockType: 'richText'
  content: any
}

export interface ProjectGridBlock {
  blockType: 'projectGrid'
  heading?: string
  filterByTag?: string
  limit?: number
}

export interface ImageGalleryBlock {
  blockType: 'imageGallery'
  images: Media[]
  layout: 'grid' | 'strip'
}

export interface TimelineBlock {
  blockType: 'timeline'
  items: { year: string; title: string; description?: string }[]
}

export interface ContactFormBlock {
  blockType: 'contactForm'
  heading?: string
}

export interface CustomEmbedBlock {
  blockType: 'customEmbed'
  html: string
  caption?: string
}

export interface NavigationItem {
  label: string
  linkType: 'page' | 'project' | 'external'
  target?: { slug: string }
  externalUrl?: string
}

export interface Navigation {
  items: NavigationItem[]
}

export interface SiteSettings {
  siteTitle: string
  tagline?: string
  logo?: Media
  socialLinks: { platform: string; url: string }[]
  defaultSeoImage?: Media
  footerText?: string
}
