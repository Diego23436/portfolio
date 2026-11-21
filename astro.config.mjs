import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

// Windows fix: when the project is opened from a path with a lowercase drive letter
// (for example "c:\Users\..." from some terminals), Astro builds the site without any CSS.
// We force an uppercase drive letter so the styles always load. On Linux this does nothing.
const cwd = process.cwd();
const root = /^[a-z]:/.test(cwd) ? cwd[0].toUpperCase() + cwd.slice(1) : cwd;

/**
 * After the build: fill the Content-Security-Policy in dist/_headers.
 * Inline scripts are allowed by hash (not by 'unsafe-inline'), so only our own scripts can run.
 */
function securityHeaders() {
  return {
    name: "security-headers",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const out = fileURLToPath(dir);
        const hashes = new Set();
        const walk = (folder) => {
          for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
            const full = path.join(folder, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (entry.name.endsWith(".html")) {
              const html = fs.readFileSync(full, "utf8");
              for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
                const attrs = match[1];
                if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue; // external files and data blocks
                hashes.add(`'sha256-${crypto.createHash("sha256").update(match[2]).digest("base64")}'`);
              }
            }
          }
        };
        walk(out);
        const csp = [
          "default-src 'self'",
          `script-src 'self' ${[...hashes].join(" ")}`.trim(),
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self' https://formsubmit.co",
          "form-action 'self' https://formsubmit.co",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "object-src 'none'",
          "upgrade-insecure-requests",
        ].join("; ");
        const file = path.join(out, "_headers");
        if (fs.existsSync(file)) fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace("__CSP__", csp));
      },
    },
  };
}

export default defineConfig({
  root,
  site: "https://nkforlan.tech",
  devToolbar: { enabled: false },
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      filter: (page) => !/\/(404|og-card|cv)(\/|$)/.test(page),
      i18n: { defaultLocale: "en", locales: { en: "en", fr: "fr" } },
    }),
    securityHeaders(),
  ],
  vite: {
    // Never inline files as data: URLs. Fonts stay real files, so the CSP (font-src 'self') and the long cache apply.
    build: { assetsInlineLimit: 0 },
    // Pre-bundle GSAP so the dev server never has to re-optimise it in the middle of a session.
    optimizeDeps: { include: ["gsap", "gsap/ScrollTrigger", "gsap/Flip"] },
  },
});
