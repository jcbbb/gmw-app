module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      pointerEvents: ["disabled"],
      backgroundColor: ["group-focus"],
      textColor: ["group-focus"],
    },
  },
  plugins: [],
};
