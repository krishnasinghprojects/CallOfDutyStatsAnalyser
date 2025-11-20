/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cod-gold': '#FFD700',
        'cod-black': '#0a0a0a',
        'tech-cyan': '#00FFFF',
      },
      fontFamily: {
        heading: ['"Black Ops One"', 'cursive'],
        body: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(green|yellow|red|blue|purple|orange|pink|cyan)-(400|500|900)/,
    },
  ],
}
