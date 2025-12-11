/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'google-blue': '#1a73e8',
        'google-grey': '#5f6368',
        'google-bg': '#f8f9fa',
      }
    },
  },
  plugins: [],
}
