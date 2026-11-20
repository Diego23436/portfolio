/** @type {import('tailwindcss').Config} */

// All colours come from CSS variables in src/styles/global.css.
// Change the palette there, in one place.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        // Body
        sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        // Big headings
        display: ["Bricolage Grotesque Variable", "Bricolage Grotesque", "Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        // 1-3 accent words per section
        serif: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
        // Labels, numbers, terminal
        mono: ["JetBrains Mono Variable", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        // ---- New semantic tokens (they switch with the theme, no dark: prefix needed)
        canvas: token("base"), // page background (named canvas: "base" would clash with text-base)
        surface: token("surface"), // panels
        fg: token("fg"), // main text and white-on-dark
        soft: token("soft"), // muted text
        edge: token("edge"), // hairlines (use with opacity: border-edge/15)
        accent: token("accent"), // silver-slate: labels, icons, glow
        live: token("live"), // lime: ONLY for live / passed / available
        // ---- Old tokens, kept until every page is rebuilt
        portfolio: {
          ink: token("ink"),
          muted: token("muted"),
          paper: token("paper"),
          panel: token("panel"),
          line: token("line"),
          accent: token("accent"),
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
