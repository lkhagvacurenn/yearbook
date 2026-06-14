/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'handwriting': ['"Caveat"', 'cursive'],
        'serif-display': ['"Playfair Display"', 'serif'],
        'mono-fun': ['"Special Elite"', 'cursive'],
        'sans-clean': ['"Inter"', 'sans-serif'],
      },
      colors: {
        'yearbook': {
          'navy': '#0a1628',
          'blue': '#1e40af',
          'gold': '#d4af37',
          'silver': '#c0c0c0',
          'cream': '#fdf8f0',
          'paper': '#f5f0e8',
          'tape': 'rgba(255,255,150,0.6)',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.9), 0 0 60px rgba(59,130,246,0.4)' },
        },
      },
      boxShadow: {
        'polaroid': '0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2)',
        'book': '8px 8px 30px rgba(0,0,0,0.5), -2px 0 10px rgba(0,0,0,0.2)',
        'page': 'inset -3px 0 10px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
