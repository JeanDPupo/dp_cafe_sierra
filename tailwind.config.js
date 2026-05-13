/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        soil: {
          50: '#f8f4ef',
          100: '#efe4d8',
          200: '#dfc4a8',
          300: '#c39c72',
          400: '#aa7d4f',
          500: '#8d643b',
          600: '#715030',
          700: '#594025',
          800: '#44301c',
          900: '#2f2014',
        },
        leaf: {
          50: '#eefbf3',
          100: '#d4f4df',
          200: '#a9e8c0',
          300: '#76d69a',
          400: '#48ba74',
          500: '#2f9657',
          600: '#227646',
          700: '#1e5d3a',
          800: '#1b4a30',
          900: '#173d29',
        },
        sky: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#bcdfff',
          300: '#8ecafe',
          400: '#58abfb',
          500: '#358beb',
          600: '#256ece',
          700: '#1f58a7',
          800: '#214b89',
          900: '#213f71',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 45px -24px rgba(23, 61, 41, 0.35)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top left, rgba(188,223,255,0.45), transparent 30%), radial-gradient(circle at top right, rgba(169,232,192,0.38), transparent 28%), linear-gradient(135deg, rgba(248,244,239,1) 0%, rgba(238,251,243,1) 45%, rgba(238,247,255,1) 100%)',
      },
    },
  },
  plugins: [],
};
