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
          dark: "#21362F",
          muted: "#3B5C51",
        },
        sage: {
          DEFAULT: "#6D7D69",
          light: "#A3B09F",
          tint: "#EBF0E8",
        },
        terracotta: {
          DEFAULT: "#B86449",
          dark: "#9A4D34",
          tint: "#F7EAE5",
        },
        ink: {
          DEFAULT: "#242621",
          secondary: "#4A4E45",
          muted: "#60645B",
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
