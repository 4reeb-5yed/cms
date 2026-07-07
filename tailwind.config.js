/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System "Fieldnote" palette
        // Source of truth: Design System doc (portfolio-platform-design-system.md)
        stone: '#E8E3D6',      // Primary background
        ink: '#211F1A',         // Primary text (from design doc)
        ember: '#B3502C',        // Primary accent
        moss: '#556253',        // Secondary accent (from design doc)
        brass: '#A6813F',       // Tertiary accent (from design doc)
        charcoal: '#2C2A24',     // Dark surfaces (from design doc)
      },
      fontFamily: {
        // Using CSS variables set by next/font in layout.tsx
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'ledger': '0.125rem',   // 2px - designed corner, not soft rounded
      },
    },
  },
  plugins: [],
}