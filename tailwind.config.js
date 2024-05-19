/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['"Noto Sans KR"', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        helveticaNeue: ['Helvetica Neue', 'sans-serif'],
      },
      colors: {
        customGray: '#444',
        customGray2: '#666',
        customGray3: '#777',
        customGray4: '#BBB',
        customGray5: '#EEE',
        customGray6: '#DDD',
        inputBg: 'rgba(221, 221, 221, 0.2)',
      },
      flexShrink: {
        10: '10',
      },
      boxShadow: {
        'custom-dark':
          '0 4px 6px 0 rgba(0, 0, 0, 0.4), 0 5px 15px 0 rgba(0, 0, 0, 0.1)',
        'custom-shadow': '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
        'profile-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      width: {
        1540: '1540px',
      },
      strokeWidth: {
        1: '1px',
      },
      stroke: {
        custom: 'rgba(0, 0, 0, 0.11)',
      },
      filter: {
        custom: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      },
      borderWidth: {
        1: '1px',
      },
      screens: {
        custom: '1160px',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
