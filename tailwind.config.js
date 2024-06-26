/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        fadeIn1: "0.5s fadeIn 0s ease-in-out forwards",
        fadeIn2: "0.5s fadeIn 0.5s ease-in-out forwards",
        fadeIn3: "0.5s fadeIn 1s ease-in-out forwards",
        fadeIn4: "0.5s fadeIn 1.5s ease-in-out forwards",
        fadeIn5: "0.5s fadeIn 2s ease-in-out forwards",
        fadeIn6: "0.5s fadeIn 2.5s ease-in-out forwards",
        fadeIn7: "0.5s fadeIn 3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
