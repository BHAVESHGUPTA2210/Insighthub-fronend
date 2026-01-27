/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      // Optional: Add custom colors or extend theme
      colors: {
        // You can add custom colors for dark mode if needed
      },
      backgroundImage: {
        // Add gradient variants for dark mode if needed
      }
    },
  },
  plugins: [],
};