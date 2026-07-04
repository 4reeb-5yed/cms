// Content types matching the architecture
export interface Page {
  id: string
  title: string
  slug: string
  showInNav: boolean
  navOrder: number
  meta: {
    metaTitle?: string
    metaDescription?: string
  }
  blocks: Block[]
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  coverImage: Media
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  gallery: Media[]
  body: Block[]
  featured: boolean
  publishedDate: string
  meta: {
    metaTitle?: string
    metaDescription?: string
  }
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  url: string
  alt: string
  filename: string
  width?: number
  height?: number
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface SiteSettings {
  siteTitle: string
  tagline: string
  logo?: Media
  socialLinks: { platform: string; url: string }[]
  footerText: string
}

// Block types
export type Block = HeroBlock | RichTextBlock | ProjectGridBlock | ImageGalleryBlock | TimelineBlock | ContactFormBlock

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
  content: string // HTML or rich text
}

export interface ProjectGridBlock {
  blockType: 'projectGrid'
  heading?: string
  filterByTag?: string
  limit?: number
}

export interface ImageGalleryBlock {
  blockType: 'imageGallery'
  images: { image: Media; caption?: string }[]
}

export interface TimelineBlock {
  blockType: 'timeline'
  items: { year: string; title: string; description?: string }[]
}

export interface ContactFormBlock {
  blockType: 'contactForm'
  heading?: string
  description?: string
}

// Sample data
export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'InterviewIQ',
    slug: 'interviewiq',
    summary: 'AI-powered career intelligence platform for evidence-based résumé analysis, ATS evaluation, and interview preparation.',
    coverImage: { id: '1', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop', alt: 'Career platform interface', filename: 'interviewiq.jpg' },
    techStack: ['Python', 'AI/ML', 'NLP', 'React'],
    repoUrl: 'https://github.com/4reeb-5yed/InterviewIQ',
    gallery: [],
    body: [],
    featured: true,
    publishedDate: '2024-06-15',
    meta: { metaTitle: 'InterviewIQ', metaDescription: 'AI-powered career intelligence platform' },
    createdAt: '2024-06-01',
    updatedAt: '2024-06-15'
  },
  {
    id: '2',
    title: 'Phishing Simulator',
    slug: 'phishing-simulator',
    summary: 'AI-powered phishing simulation and cybersecurity awareness platform with Gemini API integration.',
    coverImage: { id: '2', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop', alt: 'Cybersecurity platform', filename: 'phishing.jpg' },
    techStack: ['React', 'Express.js', 'MongoDB', 'Gemini API', 'JavaScript'],
    repoUrl: 'https://github.com/4reeb-5yed/Phishing_Simulator',
    gallery: [],
    body: [],
    featured: true,
    publishedDate: '2024-04-20',
    meta: { metaTitle: 'Phishing Simulator', metaDescription: 'AI-powered cybersecurity awareness platform' },
    createdAt: '2024-04-01',
    updatedAt: '2024-04-20'
  },
  {
    id: '3',
    title: 'Caesar Cipher Tool',
    slug: 'caesar-cipher-tool',
    summary: 'Cryptographic analysis platform for automated Caesar cipher detection, statistical frequency analysis, and analytical reporting.',
    coverImage: { id: '3', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop', alt: 'Cryptography tool', filename: 'cipher.jpg' },
    techStack: ['JavaScript', 'Cryptography', 'Statistics'],
    repoUrl: 'https://github.com/4reeb-5yed/caesar-cipher-tool',
    gallery: [],
    body: [],
    featured: true,
    publishedDate: '2024-02-10',
    meta: { metaTitle: 'Caesar Cipher Tool', metaDescription: 'Automated cryptographic analysis platform' },
    createdAt: '2024-02-01',
    updatedAt: '2024-02-10'
  }
]

export const samplePages: Page[] = [
  {
    id: 'home',
    title: 'Home',
    slug: '/',
    showInNav: false,
    navOrder: 0,
    meta: { metaTitle: 'Fieldnote Portfolio', metaDescription: 'Designer and developer crafting digital experiences' },
    blocks: [
      { blockType: 'hero', heading: 'Building things that matter', subheading: 'Designer and developer crafting digital experiences at the intersection of form and function.', ctaLabel: 'View work', ctaLink: '/projects' }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export const sampleSiteSettings: SiteSettings = {
  siteTitle: 'Areeb Syed',
  tagline: 'Applied AI • Cybersecurity • Systems Engineering',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/4reeb-5yed' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/areeb-syed-b19491245' },
    { platform: 'email', url: 'mailto:areeb.syed1@outlook.com' }
  ],
  footerText: '© 2024 Areeb Syed. Building intelligence-oriented security tooling.'
}

export const sampleNavigation: NavigationItem[] = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
]