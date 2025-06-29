/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'warm-brown': {
          50: '#fdf8f3',
          100: '#faf0e4',
          200: '#f3dcc3',
          300: '#ebc098',
          400: '#e0a066',
          500: '#d88444',
          600: '#ca6f39',
          700: '#a85a32',
          800: '#87492f',
          900: '#6e3d28',
        },
        'soft-beige': {
          50: '#fefdf9',
          100: '#fdfbf3',
          200: '#fbf5e1',
          300: '#f7ebca',
          400: '#f1dca9',
          500: '#e8c688',
          600: '#ddb167',
          700: '#ce9a4c',
          800: '#a97d3e',
          900: '#886535',
        },
        'warm-yellow': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      fontFamily: {
        'serif': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'strong': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neu': '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        'neu-dark': '20px 20px 60px #0a0f1a, -20px -20px 60px #2c3e50',
        'glow': '0 0 20px rgba(216, 132, 68, 0.5)',
        'glow-strong': '0 0 40px rgba(216, 132, 68, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}