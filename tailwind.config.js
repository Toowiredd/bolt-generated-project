/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#1a1b2e',
        'deep-purple': '#2d2a4a',
        'warm-amber': {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
        }
      },
      fontFamily: {
        'art-nouveau': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
