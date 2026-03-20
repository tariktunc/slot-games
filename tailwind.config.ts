import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bet-bg":       "#0f212e",
        "bet-surface":  "#1a2c38",
        "bet-card":     "#213743",
        "bet-elevated": "#2d4a5a",
        "bet-accent":   "#00e701",
        "bet-accent-d": "#00b800",
        "bet-gold":     "#f59e0b",
        "bet-gold-d":   "#d97706",
        "bet-red":      "#f44336",
        "bet-red-d":    "#c62828",
        "bet-text":     "#ffffff",
        "bet-muted":    "#8aa3b0",
        "bet-border":   "#2d4a5a",
        "bet-border-l": "#3a5a6e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
