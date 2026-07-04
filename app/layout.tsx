import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fieldnote Portfolio',
  description: 'A portfolio of crafted work',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
