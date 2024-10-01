/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('https://res.cloudinary.com/dedpvue13/image/upload/v1727668870/currency_sgowt2.jpg')",
      }

    }, fontFamily: {
      chakra: ['"Chakra Petch"', 'sans-serif'],
    },

  },
  plugins: [],
}

