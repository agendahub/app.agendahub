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
      
      "primary": "#14052a",
      "secondary": "#23224a",
      "tertiary": "#71798a",
      "clean": "#f0ece5",
      "very-clean": "#ffffff",
      ...colors
    },
    extend: {
      width: {
        "90%": "90%"
      }
    },
  },
  plugins: [],
}

