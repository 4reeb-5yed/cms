import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#211F1A',
        stone: '#E8E3D6',
        charcoal: '#2C2A24',
        ember: '#B3502C',
        moss: '#556253',
        brass: '#A6813F',
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'serif'],
        body: ['var(--font-general-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      spacing: {
        '1': '4px', '2': '8px', '3': '12px', '4': '16px',
        '6': '24px', '8': '32px', '12': '48px', '16': '64px', '24': '96px',
      },
      maxWidth: { reading: '68ch' },
      borderRadius: { ledger: '2px' },
      transitionTimingFunction: { deliberate: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      animation: {
        'deliberate': 'fadeSlideIn 480ms cubic-bezier(0.16, 1, 0.3, 1)',
        'standard': 'fadeIn 240ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
