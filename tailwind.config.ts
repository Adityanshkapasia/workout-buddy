import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FF6B6B",
          dark: "#FF8E8E",
        },
        secondary: {
          light: "#4ECDC4",
          dark: "#45B7AE",
        },
        accent: {
          light: "#FFD93D",
          dark: "#FFE066",
        },
        background: {
          light: "#F7FFF7",
          dark: "#2C3E50",
        },
        text: {
          light: "#2F2F2F",
          dark: "#ECF0F1",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "neumorphic-light": "20px 20px 60px #d1d9d1, -20px -20px 60px #ffffff",
        "neumorphic-dark": "20px 20px 60px #25323f, -20px -20px 60px #334a61",
      },
    },
  },
  plugins: [],
};

export default config;
