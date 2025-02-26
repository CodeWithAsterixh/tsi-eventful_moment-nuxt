module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#008289",
        secondary: "#60CED4",
        accent: "#707070",
        tertiary: "#5271FF",
        others: "#FFF5A7",
        others1: "#C34F06",
        others2: "#06C3B4",
      },
      animation: {
        slideUp: "slideUp 0.3s ease-in-out",
        slideDown: "slideDown 0.3s ease-in-out",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-4px)" },
          "100%": { transform: "translateX(4px)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
