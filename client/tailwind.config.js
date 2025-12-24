/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#1d4ed8',
        muted: '#94a3b8'
      },
      fontFamily: {
        sans: ['"Cairo"', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
