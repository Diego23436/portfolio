/** @type {import('tailwindcss').Config} */

// All colours come from CSS variables in src/styles/global.css.
// To change the accent colour, edit --accent, --accent-solid and --accent-strong there.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Space Grotesk Variable",
          "Space Grotesk",
          "Inter Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        portfolio: {
          ink: token("ink"),
          muted: token("muted"),
          paper: token("paper"),
          panel: token("panel"),
          line: token("line"),
          // accent: text, icons, borders (changes in dark mode to stay readable)
          accent: token("accent"),
          // accent-solid: button fills that carry white text (same in both modes)
          "accent-solid": token("accent-solid"),
          "accent-strong": token("accent-strong"),
          night: token("night"),
          "night-panel": token("night-panel"),
          "night-line": token("night-line"),
        },
      },
    },
  },
  plugins: [],
};
