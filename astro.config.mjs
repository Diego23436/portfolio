import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// Windows fix: when the project is opened from a path with a lowercase drive letter
// (for example "c:\Users\..." from some terminals), Astro builds the site without any CSS.
// We force an uppercase drive letter so the styles always load.
const cwd = process.cwd();
const root = /^[a-z]:/.test(cwd) ? cwd[0].toUpperCase() + cwd.slice(1) : cwd;

export default defineConfig({
  root,
  site: "https://nkforlan.tech",
  devToolbar: { enabled: false },
  integrations: [tailwind(), icon()],
});
