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
      },
      colors: {
        customGray: '#444',
        customGray2: '#666',
        customGray3: '#777',
        customGray4: '#BBB',
        inputBg: 'rgba(221, 221, 221, 0.2)',
      },
      flexShrink: {
        10: '10',
      },
    },
  },
  plugins: [],
};
