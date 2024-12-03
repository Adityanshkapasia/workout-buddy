import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: "#FFD93D",
        background: "#F7FFF7",
        text: "#2F2F2F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      gradientColorStops: (theme) => ({
        "primary-gradient": "#FF6B6B",
        "secondary-gradient": "#4ECDC4",
      }),
    },
  },
  plugins: [],
};

export default config;
