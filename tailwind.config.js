/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#171717',
        secondary: '#404040',
        accent: '#D4AF37', // Gold
        background: '#FFFFFF',
      },
      fontFamily: {
        heading: ['var(--heading-font-family)'],
        body: ['var(--body-font-family)'],
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fluid': '400ms',
      }
    },
  },
  plugins: [],
}
