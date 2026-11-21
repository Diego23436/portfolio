// Builds the two CV PDFs from the CV pages, so the CV and the website never disagree.
// Run: npm run cv      (it builds the site, starts a local preview, prints the pages to PDF, stops the preview)
// Result: public/resume/Nk Forlan CV EN.pdf and Nk Forlan CV FR.pdf  (commit them, Cloudflare does not run this)
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "resume");
const port = 4323;
// Set CV_BASE to reuse a server that is already running (then no preview is started).
const external = process.env.CV_BASE;
const base = external ?? `http://127.0.0.1:${port}`;

fs.mkdirSync(outDir, { recursive: true });
const isWindows = process.platform === "win32";
const preview = external ? null : spawn(isWindows ? "npx.cmd" : "npx", ["astro", "preview", "--host", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: "ignore", shell: isWindows });

async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`${base}/en/cv/`);
      if (res.ok) return;
    } catch {
      /* not ready yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("The preview server did not start. Run `npm run build` first.");
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  for (const lang of ["en", "fr"]) {
    const page = await browser.newPage();
    await page.goto(`${base}/${lang}/cv/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(outDir, `Nk Forlan CV ${lang.toUpperCase()}.pdf`);
    await page.pdf({ path: file, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log(`wrote ${path.relative(root, file)}`);
    await page.close();
  }
  await browser.close();
} finally {
  if (!preview) { /* nothing to stop */ } else if (isWindows) spawn("taskkill", ["/pid", String(preview.pid), "/T", "/F"], { stdio: "ignore" });
  else preview.kill();
}
