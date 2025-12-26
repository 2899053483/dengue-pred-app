/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- 必须加上这一行！
  theme: {
    extend: {},
  },
  plugins: [],
}