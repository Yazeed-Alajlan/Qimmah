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
        primary_light: "#757de8",
        secondary: "#003f8f",
        secondary_light: "#2196f3",
        success: "#198754",
        info: "#0dcaf0",
        warning: "#ffc107",
        danger: "#dc3545",
        white: "#F5F5F5",
        light: "#DADDE2",
        dark: "#131722",
        dark_light: "#2a2e39",
        grey: "#494d58",
        dark_green: "#104a31",
        light_green: "#46a681",
        dark_red: "#800000",
        light_red: "#ff0000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
