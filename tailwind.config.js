/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3f51b5",
          900: "#3F51B5",
          700: "#646FD8",
          500: "#888EFB",
          300: "#ACAFFF",
          100: "#D0D1FF",
        },
        "primary-light": "#757de8",
        secondary: "#003f8f",
        "secondary-light": "#2196f3",
        success: "#198754",
        info: "#0dcaf0",
        warning: "#ffc107",
        danger: "#dc3545",
        white: "#fdfcff",
        light: "#f8f8fa",
        dark: "#131722",
        "dark-light": "#2a2e39",
        grey: "#494d58",
        "dark-green": "#104a31",
        "light-green": "#46a681",
        "dark-red": "#800000",
        "light-red": "#ff0000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newutilities = {
        ".custom-class": {
          // padding: "16px",
          "@apply px-20": {}, // Use @apply inside the class definition
        },
        ".custom-class2": {
          "@apply py-20": {}, // Use @apply inside the class definition
        },
        ".link": {
          "@apply p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium":
            {},
        },
      };
      addUtilities(newutilities, ["responsive", "hover"]);
    },
  ],
};
