/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#591D32', // deep burgundy
        'primary-dark': '#3E1222',
        'primary-light': '#7E3550',
        accent: '#D9A0AD', // dusty pink
        'accent-dark': '#C27D8D',
        blush: '#F3DDE1',
        gold: '#B69A62',
        background: '#FFF7EF', // warm ivory
        surface: '#FFFCF8',
        ink: '#35221F', // dark chocolate
        muted: '#7A625C',
        divider: '#EBDDD2',
        deep: '#2A1519',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
