/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-primary": "#615EF0",
        "input-simple": "#F3F3F3",
        "hover-select": "#F6F6FE"
      }
    },
  },
  plugins: [],
}
