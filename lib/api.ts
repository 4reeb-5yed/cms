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
    title: 'E-commerce Dashboard',
    slug: 'ecommerce-dashboard',
    summary: 'A real-time analytics dashboard for online retailers, featuring sales tracking, inventory management, and customer insights.',
    coverImage: { id: '1', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Dashboard interface', filename: 'dashboard.jpg' },
    techStack: ['React', 'D3.js', 'Node.js'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    gallery: [],
    body: [],
    featured: true,
    publishedDate: '2024-01-15',
    meta: { metaTitle: 'E-commerce Dashboard', metaDescription: 'Analytics dashboard for online retailers' },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    slug: 'mobile-banking',
    summary: 'A secure mobile banking application with biometric authentication and real-time transaction notifications.',
    coverImage: { id: '2', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop', alt: 'Mobile app screens', filename: 'mobile.jpg' },
    techStack: ['React Native', 'TypeScript', 'GraphQL'],
    gallery: [],
    body: [],
    featured: true,
    publishedDate: '2024-02-20',
    meta: {},
    createdAt: '2024-02-01',
    updatedAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Component Library',
    slug: 'design-system',
    summary: 'A comprehensive design system with 50+ accessible components, serving as the foundation for multiple products.',
    coverImage: { id: '3', url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop', alt: 'Design system components', filename: 'design.jpg' },
    techStack: ['Storybook', 'Tailwind', 'Figma'],
    repoUrl: 'https://github.com',
    gallery: [],
    body: [],
    featured: true,
    publishedDate: '2023-11-10',
    meta: {},
    createdAt: '2023-11-01',
    updatedAt: '2023-11-10'
  },
  {
    id: '4',
    title: 'AI Content Platform',
    slug: 'ai-content-platform',
    summary: 'A content management system powered by AI, featuring automated tagging, content suggestions, and smart search.',
    coverImage: { id: '4', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', alt: 'AI interface', filename: 'ai.jpg' },
    techStack: ['Next.js', 'OpenAI', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    gallery: [],
    body: [],
    featured: false,
    publishedDate: '2023-08-05',
    meta: {},
    createdAt: '2023-08-01',
    updatedAt: '2023-08-05'
  },
  {
    id: '5',
    title: 'Fitness Tracker',
    slug: 'fitness-tracker',
    summary: 'A comprehensive fitness tracking application with workout logging, progress visualization, and social challenges.',
    coverImage: { id: '5', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', alt: 'Fitness app', filename: 'fitness.jpg' },
    techStack: ['Flutter', 'Firebase', 'HealthKit'],
    gallery: [],
    body: [],
    featured: false,
    publishedDate: '2022-12-20',
    meta: {},
    createdAt: '2022-12-01',
    updatedAt: '2022-12-20'
  },
  {
    id: '6',
    title: 'Real Estate Portal',
    slug: 'real-estate-portal',
    summary: 'A modern real estate platform with virtual tours, advanced search filters, and mortgage calculator.',
    coverImage: { id: '6', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', alt: 'Real estate website', filename: 'realestate.jpg' },
    techStack: ['Vue.js', 'Node.js', 'Mapbox'],
    gallery: [],
    body: [],
    featured: false,
    publishedDate: '2022-09-15',
    meta: {},
    createdAt: '2022-09-01',
    updatedAt: '2022-09-15'
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
  siteTitle: 'Fieldnote',
  tagline: 'Designer and developer crafting digital experiences',
  socialLinks: [
    { platform: 'github', url: 'https://github.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' }
  ],
  footerText: '© 2024 Fieldnote. All rights reserved.'
}

export const sampleNavigation: NavigationItem[] = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
]