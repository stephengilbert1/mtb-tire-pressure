<<<<<<< HEAD
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#4f46e5", // indigo-600
        secondary: "#e0e7ff", // indigo-100
        dark: "#1e293b", // slate-800
      },
    },
  },
  plugins: [],
};
=======
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
>>>>>>> 8e57d5b40fdb306c18ac51772d3d3a7872e2ae5b
