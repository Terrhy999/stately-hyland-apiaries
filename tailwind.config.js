module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway"],
        lato: ["Lato"],
      },
      typography: {
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
          },
        },
      },
      colors: {
        shaGreen: "#1abc9c",
        shaBlack: "#1d1d1d",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
