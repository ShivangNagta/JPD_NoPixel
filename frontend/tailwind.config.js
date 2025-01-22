/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',


  
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ebebeb',
          foreground: '#000000',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff',
          muted: '#a0aec0',
          card: '#18181b',
        },
      },
      fontFamily: {
        labil: ['LabilGrotesk', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
    },
    plugins: [],
  }
}