/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('https://res.cloudinary.com/dedpvue13/image/upload/v1727583622/pexels-david-besh-884788_ati9tw.jpg')",
      }
    },
  },
  plugins: [],
}

