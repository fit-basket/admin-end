/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // ringWidth: {
    //   2: "2px",
    // },
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
      indigo: {
        50: "#F0F7F6", // Lighter shade
        100: "#D9EEEB",
        200: "#B4DAD4",
        300: "#8FC5BD",
        400: "#6AB1A6",
        500: "#47C0A8", // Provided shade
        600: "#319C8A",
        700: "#1F786D",
        800: "#125C4F",
        900: "#004032",
        950: "#002A24", // Darker shade
      },
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
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

// #F9B81D, #800080, #47C0A8
