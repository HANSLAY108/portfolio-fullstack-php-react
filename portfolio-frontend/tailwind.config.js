/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'primary-hover': '#7C3AED',
        'dark-bg': '#111827',
        'dark-card': '#1F2937',
        'dark-border': '#374151',
        'dark-text-primary': '#F9FAFB',
        'dark-text-secondary': '#9CA3AF',
      }
    },
  },
  plugins: [],
}