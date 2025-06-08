// tailwind.config.cjs
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
