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
      backgroundImage: {
        "gradient-dark": "radial-gradient(50% 64.5% at 50% 41.8%, #fff 0, hsla(0, 0%, 100%, 0.945) 65.7286%, hsla(0, 0%, 100%, 0) 215.757%);",
        "gradient-white": "radial-gradient(50% 64.5% at 50% 41.8%, #14052a 0, hsla(0, 0%, 100%, 0.945) 65.7286%, hsla(0, 0%, 100%, 0) 215.757%);",
      },
      width: {
        "90%": "90%",
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
