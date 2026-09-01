import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#ffffff",
        mist: "#f5f5f5",
        charcoal: "#111111",
        cement: "#757575",
        graphite: "#202020",
        warning: "#b45309"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial", "sans-serif"]
      },
      boxShadow: {
        crisp: "0 18px 60px rgba(0, 0, 0, 0.10)",
        lift: "0 12px 36px rgba(0, 0, 0, 0.14)"
      },
      letterSpacing: {
        widecaps: "0.08em"
      }
    }
  },
  plugins: []
};

export default config;
