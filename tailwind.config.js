/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "320px",
      // => @media (min-width: 640px) { ... }
      bigMobile: "500px",
      tablet: "640px",

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1400px",
      lgdesktop: "1490px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
