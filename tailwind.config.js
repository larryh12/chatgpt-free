/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        screen: '100svh',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: true,
  },
};
