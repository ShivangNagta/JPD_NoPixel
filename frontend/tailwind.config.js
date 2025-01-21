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
          DEFAULT: '#fff', // Adjust this to your primary color
          foreground: '#000', // Adjust this to the text color on primary background
        },
        dark: {
          DEFAULT: '#0a0a0a', // Near-black dark mode background color
          foreground: '#ffffff', // White text color for dark mode
          muted: '#a0aec0', // Muted text color for dark mode
          card: '#18181b',
        },
      },
      fontFamily: {
        nohemi: ['Nohemi', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
      
    },
  },
  plugins: [],
}
}