const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            default: {
              100: "#F1F3F5",
              200: "#E9ECEF",
              300: "#DDE1E6",
              400: "#CED4DA",
              500: "#ADB5BD",
              600: "#868E96",
              700: "#495057",
              800: "#343A40",
              900: "#212529",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            default: {
              100: "#16181A",
              200: "#1C1E21",
              300: "#242629",
              400: "#2C2F33",
              500: "#3B4044",
              600: "#4B5054",
              700: "#5C6166",
              800: "#6C7075",
              900: "#7D8084",
            },
          },
        },
      },
    }),
  ],
}