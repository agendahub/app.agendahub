const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "base-pink-light": '#A61C76',
      "base-pink-extralight": '#bf048d',
      "base-dark": '#2c2f40',
      "base-medium": '#5a758c',
      "base-light": '#a4b0bf',
      ...colors
    },
    extend: {},
  },
  plugins: [],
}

