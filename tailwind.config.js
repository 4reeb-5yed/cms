/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stone: '#E8E3D6',
        ink: '#1a1817',
        ember: '#B3502C',
        moss: '#5C6B4D',
        brass: '#8B7355',
        charcoal: '#2D2926',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      borderRadius: {
        'ledger': '0.5rem',
      },
    },
  },
  plugins: [],
}