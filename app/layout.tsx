import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Using Playfair Display as the display font (similar to Instrument Serif style)
// Using Source Sans 3 as the body font (clean, readable)
// JetBrains Mono for monospace
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Areeb Syed | Applied AI & Cybersecurity Developer',
  description: 'Building intelligence-oriented security tooling, analytical cryptographic systems, and offensive-simulation infrastructure. View my projects in AI, cybersecurity, and systems engineering.',
  keywords: ['Areeb Syed', 'AI', 'Cybersecurity', 'Machine Learning', 'Python', 'React', 'Portfolio'],
  authors: [{ name: 'Areeb Syed' }],
  openGraph: {
    title: 'Areeb Syed | Applied AI & Cybersecurity Developer',
    description: 'Building intelligence-oriented security tooling, analytical cryptographic systems, and offensive-simulation infrastructure.',
    url: siteUrl,
    siteName: 'Areeb Syed Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Areeb Syed | Applied AI & Cybersecurity Developer',
    description: 'Building intelligence-oriented security tooling and analytical platforms.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
