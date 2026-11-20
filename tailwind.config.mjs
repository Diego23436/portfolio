/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        portfolio: {
          ink: "#172033",
          muted: "#5f6f89",
          paper: "#f7f7f2",
          panel: "#ffffff",
          line: "#dbe3ef",
          accent: "#0f9f8f",
          "accent-strong": "#0a6f64",
          night: "#0d1117",
          "night-panel": "#141b24",
          "night-line": "#263241",
        },
      },
    },
  },
  plugins: [],
};
