import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Areeb Syed | Applied AI & Cybersecurity Developer',
  description: 'Building intelligence-oriented security tooling, analytical cryptographic systems, and offensive-simulation infrastructure. View my projects in AI, cybersecurity, and systems engineering.',
  keywords: ['Areeb Syed', 'AI', 'Cybersecurity', 'Machine Learning', 'Python', 'React', 'Portfolio'],
  authors: [{ name: 'Areeb Syed' }],
  openGraph: {
    title: 'Areeb Syed | Applied AI & Cybersecurity Developer',
    description: 'Building intelligence-oriented security tooling, analytical cryptographic systems, and offensive-simulation infrastructure.',
    url: 'https://cms-areeb-syed.vercel.app',
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
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
