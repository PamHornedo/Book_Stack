/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        accent: '#1e3a8a',
        'custom-blue': '#bfeaff',
      },
      borderRadius: {
        DEFAULT: '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

