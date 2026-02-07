/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        accent: '#1e3a8a',
        'custom-blue': '#bfeaff',
        brand: {
          50: '#EBF4FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          600: '#1E40AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

