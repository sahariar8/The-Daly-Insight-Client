/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        rancho:"'Rancho', cursive",
        slobo:"'Slabo 27px',serif",
        racing: "'Rye', serif;"
      }
    },
  },
  plugins: [require("daisyui")],
}

