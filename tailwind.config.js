/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*"
],
  theme: {
    extend: {
      colors: {
        accent: '#F16639'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}