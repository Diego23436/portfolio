// Serves the built site (dist/) the way Cloudflare Pages will: with the rules from dist/_headers and a 404 page.
// Use it to test the security headers locally:   node scripts/serve-dist.mjs [port]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] || 4325);

// Parse dist/_headers: blocks of "<path pattern>" followed by indented "Name: value" lines.
const rules = [];
let current = null;
for (const raw of fs.readFileSync(path.join(root, "_headers"), "utf8").split(/\r?\n/)) {
  if (!raw.trim() || raw.trim().startsWith("#")) continue;
  if (!/^\s/.test(raw)) {
    current = { pattern: raw.trim(), headers: {} };
    rules.push(current);
  } else if (current) {
    const i = raw.indexOf(":");
    current.headers[raw.slice(0, i).trim()] = raw.slice(i + 1).trim();
  }
}
const matches = (pattern, url) => (pattern.endsWith("*") ? url.startsWith(pattern.slice(0, -1)) : url === pattern);

const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain", ".pdf": "application/pdf", ".json": "application/json" };

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = path.join(root, url);
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    let status = 200;
    if (!fs.existsSync(file)) {
      file = path.join(root, "404.html");
      status = 404;
    }
    const headers = { "Content-Type": types[path.extname(file)] || "application/octet-stream" };
    for (const rule of rules) if (matches(rule.pattern, url)) Object.assign(headers, rule.headers);
    res.writeHead(status, headers);
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, "127.0.0.1", () => console.log(`serving dist on http://127.0.0.1:${port}`));
