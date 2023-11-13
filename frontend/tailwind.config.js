/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    ringWidth: {
      2: "2px",
    },
    colors: {
      primary: "#F9B81D",
      secondary: {
        light: "#8062D6",
        dark: "#800080",
      },
      button: {
        lighter: "#dff7f2",
        light: "#65cfb9",
        main: "#47C0A8",
        dark: "#359c87",
      },
      white: "#ffffff",
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
      gray: {
        50: " rgb(249 250 251)",
        200: "rgb(229 231 235);",
        300: "rgb(209 213 219)",
        500: "rgb(107 114 128)",
        900: "rgb(17 24 39)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

// #F9B81D, #800080, #47C0A8
