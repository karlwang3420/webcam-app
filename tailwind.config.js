/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
        160: "40rem",
        192: "48rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
