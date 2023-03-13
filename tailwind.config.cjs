/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-light": "url('./bg-mobile-light.jpg')",
        "mobile-dark": "url('./bg-mobile-dark.jpg')",
        "desktop-light": "url('./bg-desktop-light.jpg')",
        "desktop-dark": "url('./bg-desktop-dark.jpg')",
      },
      colors: {
        "_bright-blue": "#3a7bfd",
        "_check-bg-gradient-1": "#57ddff",
        "_lt-check-bg-gradient-2": "#c058f3",
        "_lt-very-light-gray": "#fafafa",
        "_lt-very-light-grayish-blue": "#e4e5f1",
        "_lt-light-grayish-blue": "#d2d3db",
        "_lt-dark-grayish-blue": "#9394a5",
        "_lt-very-dark-grayish-blue": "#484b6a",
        "_dt-very-dark-blue": "#161722",
        "_dt-very-dark-desaturated-blue": "#25273c",
        "_dt-light-grayish-blue": "#cacde8",
        "_dt-light-grayish-blue-hover": "#e4e5f1",
        "_dt-dark-grayish-blue": "#777a92",
        "_dt-very-dark-grayish-blue-1": "#4d5066",
        "_dt-very-dark-grayish-blue-2": "	#393a4c",
      },
      fontFamily: {
        sans: ["'Josefin SansVariable'", "sans-serif"],
      },
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
