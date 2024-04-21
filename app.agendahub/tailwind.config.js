const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "base-pink-light": '#A61C76',
      "base-pink-extralight": '#bf048d',
      "base-dark": '#2c2f40',
      "base-medium": '#5a758c',
      "base-light": '#a4b0bf',
      "purple-hb": "#362b45",
      
      "success": "#380e76",
      "primary": "#14052a",
      "secondary": "#23224a",
      "tertiary": "#71798a",
      "clean": "#e6e5e3",
      "very-clean": "#ffffff",
      "action": "#380e76",
      "subaction": "#2e2d63",
      ...colors
    },
    extend: {
      width: {
        "90%": "90%",
        "8xl": "88rem"
      }
    },
  },
  plugins: [],
}

