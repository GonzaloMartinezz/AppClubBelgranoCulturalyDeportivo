/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#0033A0', // Azul Belgrano
        dark: '#121212',
        surface: '#1E1E1E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
