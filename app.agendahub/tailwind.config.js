const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "base-pink-light": "#A61C76",
      "base-pink-extralight": "#bf048d",
      "base-dark": "#2c2f40",
      "base-medium": "#5a758c",
      "base-light": "#a4b0bf",
      "purple-hb": "#362b45",

      success: "#380e76",
      primary: "#14052a",
      success: "#380e76",
      primary: "#14052a",
      "primary-light": "#261145",
      secondary: "#23224a",
      tertiary: "#71798a",
      clean: "#e6e5e3",
      "very-clean": "#ffffff",
      action: "#380e76",
      subaction: "#2e2d63",

      "palette-50": "#e9e8ff",
      "palette-100": "##d9d6ff",
      "palette-200": "##bbb4ff",
      "palette-300": "#9888ff",
      "palette-400": "#8059ff",
      "palette-500": "#7433ff",
      "palette-600": "#7211ff",
      "palette-700": "#6d07fb",
      "palette-800": "#5709ca",
      "palette-900": "#47129d",
      "palette-950": "#14052a",

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
