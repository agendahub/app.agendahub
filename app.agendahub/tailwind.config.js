const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      success: "#380e76",
      primary: "#14052a",
      "primary-light": "#261145",
      secondary: "#23224a",
      tertiary: "#71798a",
      clean: "#e6e5e3",
      "very-clean": "#ffffff",
      action: "#380e76",
      subaction: "#2e2d63",
      ...colors,
    },
    extend: {
      width: {
        "90%": "90%",
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
