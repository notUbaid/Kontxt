/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2EFE7', // Murrey / Alabaster requested bg
        primary: '#13265C', // Dark Blue
        accent: '#8B004A', // Alabaster / Magenta accent
        muted: '#E0DDD5', // Slightly darker than background for borders/cards
        'muted-foreground': '#64748B',
        foreground: '#13265C', // Use primary for main text
        'accent-foreground': '#F2EFE7',
        input: '#D1CFC7', // For borders
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
