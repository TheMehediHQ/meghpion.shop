/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Meghpiyon signature sky blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        brand: {
          light: '#f0f9ff',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          navy: '#0f172a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Noto Sans Bengali"',
          'sans-serif',
        ],
        bengali: [
          '"Hind Siliguri"',
          '"Noto Sans Bengali"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
