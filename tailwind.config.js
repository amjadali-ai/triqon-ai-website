/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F5F2E9",
          light: "#FAF8F3",
          border: "#E3DEC9",
        },
        forest: {
          DEFAULT: "#2D483F",
          dark: "#233831",
          muted: "#3B5C51",
        },
        sage: {
          DEFAULT: "#82917E",
          light: "#A3B09F",
          tint: "#EBF0E8",
        },
        terracotta: {
          DEFAULT: "#C17055",
          dark: "#A95D43",
          tint: "#F7EAE5",
        },
        ink: {
          DEFAULT: "#272924",
          secondary: "#52564D",
          muted: "#767A70",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
