/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        PhosphateProSolid: ["PhosphateProSolid", "serif"],
        arvo: ["Arvo", "serif"],
        FiraSansCondensed: ["Fira Sans Condensed", "sans-serif"],
      },
      colors: {
        primary: ["#4468E9", "#2260FF", "#708FFF", "#738EEC", "#ACBEFF"],
        filter: "#1C1C1C",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
