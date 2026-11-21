// Draws the 1200x630 share image (public/og.png) from the /og-card/ page.
// Run: npm run og      (builds the site, starts a preview, takes the screenshot, stops the preview)
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 4324;
// Set OG_BASE to reuse a server that is already running (then no preview is started).
const external = process.env.OG_BASE;
const base = external ?? `http://127.0.0.1:${port}`;
const isWindows = process.platform === "win32";
const preview = external ? null : spawn(isWindows ? "npx.cmd" : "npx", ["astro", "preview", "--host", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: "ignore", shell: isWindows });

try {
  for (let i = 0; i < 60; i += 1) {
    try {
      if ((await fetch(`${base}/og-card/`)).ok) break;
    } catch {
      /* not ready yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`${base}/og-card/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, "public", "og.png"), type: "png" });
  await browser.close();
  console.log("wrote public/og.png");
} finally {
  if (!preview) { /* nothing to stop */ } else if (isWindows) spawn("taskkill", ["/pid", String(preview.pid), "/T", "/F"], { stdio: "ignore" });
  else preview.kill();
}
