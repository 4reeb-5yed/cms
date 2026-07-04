"use client"
import Link from 'next/link'
import { NavigationItem } from '@/types'

interface HeaderProps {
  navigation: NavigationItem[]
  siteTitle: string
}

export function Header({ navigation, siteTitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-stone/95 backdrop-blur-sm border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl text-ink hover:text-ember transition-colors duration-100">
            {siteTitle}
          </Link>
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.linkType === 'external' ? item.externalUrl || '#' : `/${item.target?.slug || ''}`}
                  className="text-sm font-medium text-ink hover:text-ember transition-colors duration-100 relative group"
                  target={item.linkType === 'external' ? '_blank' : undefined}
                  rel={item.linkType === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ember transition-all duration-100 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
