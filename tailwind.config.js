/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/apps/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      // colors: {
      //   primary: "#FBC557",
      //   secondary: "#697C8F",
      //   danger: "#FF5F5F",
      //   info: "#4168D0",
      //   success: "#34C79F",
      //   orange: "#FC8942",
      //   cyanSecondary: "",
      // },
    },
  },
  plugins: [],
};
