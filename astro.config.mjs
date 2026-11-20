import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // TODO: confirm the final URL once the site is deployed on Cloudflare Pages.
  site: "https://nk-forlan.pages.dev",
  integrations: [tailwind()],
});
