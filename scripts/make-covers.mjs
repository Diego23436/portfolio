// Draws the project cover images (abstract product screens in silver and white).
// Run: npm run covers
// To use a real screenshot later: put <slug>.webp in public/images/projects/ and change `image` in src/data/projects.ts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "projects");
fs.mkdirSync(out, { recursive: true });

const S = "#94A3B8"; // silver
const W = "#F8FAFC"; // white
const PANEL = "#0C1322";
const CARD = "#111B30";
const LINE = "rgba(148,163,184,0.28)";
const LIVE = "#C6F432";

const r = (x, y, w, h, { rx = 0, fill = "none", stroke, sw = 1.5, op = 1 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""}${op !== 1 ? ` opacity="${op}"` : ""}/>`;
const bar = (x, y, w, h = 8, fill = S, op = 0.55) => r(x, y, w, h, { rx: h / 2, fill, op });
const circle = (cx, cy, rad, { fill = "none", stroke, sw = 1.5, op = 1 } = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""}${op !== 1 ? ` opacity="${op}"` : ""}/>`;
const path_ = (d, { fill = "none", stroke = S, sw = 1.5, op = 1, cap = "round" } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="round"${op !== 1 ? ` opacity="${op}"` : ""}/>`;

/** The shared frame: dark gradient, faint grid, soft silver glow, one window. */
function frame(inner, { x = 170, y = 95, w = 860, h = 485, url = true } = {}) {
  const grid = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V675" />`).join("") + Array.from({ length: 15 }, (_, i) => `<path d="M0 ${i * 48}H1200" />`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1220"/><stop offset="1" stop-color="#070B14"/></linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.12" r="0.7"><stop offset="0" stop-color="${W}" stop-opacity="0.13"/><stop offset="1" stop-color="${W}" stop-opacity="0"/></radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stop-color="#070B14" stop-opacity="0"/><stop offset="1" stop-color="#070B14" stop-opacity="0.85"/></linearGradient>
    <clipPath id="win"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22"/></clipPath>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g stroke="${S}" stroke-opacity="0.07" stroke-width="1">${grid}</g>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <g>
    <rect x="${x}" y="${y + 18}" width="${w}" height="${h}" rx="22" fill="#000" opacity="0.35"/>
    ${r(x, y, w, h, { rx: 22, fill: PANEL, stroke: LINE })}
    <g clip-path="url(#win)">
      ${r(x, y, w, 46, { fill: CARD })}
      ${circle(x + 26, y + 23, 5, { fill: S, op: 0.5 })}${circle(x + 46, y + 23, 5, { fill: S, op: 0.35 })}${circle(x + 66, y + 23, 5, { fill: S, op: 0.2 })}
      ${url ? r(x + 100, y + 12, 300, 22, { rx: 11, fill: PANEL, stroke: LINE, sw: 1 }) + bar(x + 116, y + 20, 110, 6, S, 0.4) : ""}
      <path d="M${x} ${y + 46}H${x + w}" stroke="${LINE}"/>
      ${inner(x, y + 46, w, h - 46)}
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#fade)"/>
    </g>
  </g>
</svg>
`;
}

const covers = {
  /* Stocky: stock dashboard */
  stocky: frame((x, y, w, h) => {
    const side = 170;
    const menu = [0, 1, 2, 3, 4].map((i) => r(x + 18, y + 24 + i * 42, side - 36, 30, { rx: 9, fill: i === 1 ? W : "none", op: i === 1 ? 0.12 : 1 }) + bar(x + 34, y + 35 + i * 42, 60 + (i % 3) * 18, 8, i === 1 ? W : S, i === 1 ? 0.9 : 0.5)).join("");
    const kpi = [0, 1, 2].map((i) => r(x + side + 24 + i * 210, y + 24, 192, 92, { rx: 14, fill: CARD, stroke: LINE, sw: 1 }) + bar(x + side + 42 + i * 210, y + 44, 70, 7) + r(x + side + 42 + i * 210, y + 66, 90 + i * 14, 24, { rx: 6, fill: W, op: 0.9 }) + (i === 0 ? circle(x + side + 190 + i * 210, y + 56, 5, { fill: LIVE }) : "")).join("");
    const heights = [60, 90, 70, 120, 100, 150, 130, 170, 140, 190, 160, 205];
    const chart = heights.map((hh, i) => r(x + side + 40 + i * 32, y + h - 36 - hh, 20, hh, { rx: 5, fill: i > 8 ? W : S, op: i > 8 ? 0.9 : 0.32 })).join("");
    const rows = [0, 1, 2, 3].map((i) => r(x + side + 440, y + 150 + i * 44, 200, 32, { rx: 8, fill: CARD, stroke: LINE, sw: 1 }) + circle(x + side + 458, y + 166 + i * 44, 7, { fill: S, op: 0.5 }) + bar(x + side + 474, y + 162 + i * 44, 90 - i * 10, 7) + bar(x + side + 590, y + 162 + i * 44, 34, 7, W, 0.7)).join("");
    return `${path_(`M${x + side} ${y}V${y + h}`, { stroke: LINE, sw: 1 })}${menu}${kpi}${chart}${rows}`;
  }),

  /* Oasis-Doc: document marketplace with a cart */
  "oasis-doc": frame((x, y, w, h) => {
    const docs = [0, 1, 2].map((i) => {
      const dx = x + 36 + i * 168;
      return r(dx, y + 36, 144, 200, { rx: 14, fill: CARD, stroke: i === 0 ? W : LINE, sw: i === 0 ? 1.8 : 1 }) +
        path_(`M${dx + 104} ${y + 36}v34h40`, { stroke: S, op: 0.5 }) +
        bar(dx + 18, y + 96, 90, 7) + bar(dx + 18, y + 116, 70, 7) + bar(dx + 18, y + 136, 100, 7) +
        circle(dx + 40, y + 190, 16, { stroke: i === 0 ? W : S, op: i === 0 ? 0.9 : 0.5 }) + path_(`M${dx + 33} ${y + 190}l5 5l10-11`, { stroke: i === 0 ? W : S, op: i === 0 ? 0.9 : 0.5 });
    }).join("");
    const filters = [0, 1, 2, 3].map((i) => r(x + 36 + i * 100, y + 262, 88, 28, { rx: 14, fill: i === 0 ? W : "none", stroke: LINE, sw: 1, op: i === 0 ? 0.92 : 1 }) + bar(x + 52 + i * 100, y + 273, 54, 6, i === 0 ? "#0B1220" : S, i === 0 ? 0.8 : 0.5)).join("");
    const cart = r(x + 560, y + 24, 270, h - 70, { rx: 16, fill: CARD, stroke: LINE, sw: 1 }) +
      bar(x + 584, y + 52, 90, 8, W, 0.8) +
      [0, 1, 2].map((i) => r(x + 584, y + 88 + i * 62, 40, 44, { rx: 8, fill: S, op: 0.18 }) + bar(x + 638, y + 96 + i * 62, 110, 7) + bar(x + 638, y + 114 + i * 62, 64, 6, S, 0.35)).join("") +
      path_(`M${x + 584} ${y + 288}H${x + 806}`, { stroke: LINE, sw: 1 }) + bar(x + 584, y + 306, 70, 7) + bar(x + 746, y + 304, 60, 10, W, 0.9) +
      r(x + 584, y + 342, 222, 44, { rx: 22, fill: W, op: 0.95 }) + bar(x + 650, y + 360, 90, 8, "#0B1220", 0.85);
    return docs + filters + cart;
  }),

  /* Easy Klin: mobile app + admin table */
  "easy-klin": frame((x, y, w, h) => {
    const table = r(x + 250, y + 28, w - 280, 36, { rx: 10, fill: CARD }) + [0, 1, 2, 3, 4, 5].map((i) => bar(x + 276, y + 42 + 0, 0, 0) +
      r(x + 250, y + 84 + i * 54, w - 280, 42, { rx: 10, fill: i === 1 ? "rgba(248,250,252,0.06)" : "none", stroke: LINE, sw: 1 }) +
      circle(x + 280, y + 105 + i * 54, 9, { fill: S, op: 0.4 }) + bar(x + 304, y + 101 + i * 54, 110, 7) + bar(x + 440, y + 101 + i * 54, 70, 7, S, 0.35) +
      r(x + 560, y + 96 + i * 54, 74, 20, { rx: 10, fill: i % 3 === 0 ? W : "none", stroke: i % 3 === 0 ? W : S, sw: 1, op: i % 3 === 0 ? 0.85 : 0.5 })).join("") +
      [0, 1, 2, 3].map((i) => bar(x + 276 + i * 90, y + 43, 50, 7, W, i === 0 ? 0.85 : 0.35)).join("");
    return table;
  }) .replace("</g>\n  </g>\n</svg>", `</g>
    <g>
      <rect x="130" y="205" width="250" height="440" rx="40" fill="#000" opacity="0.4" transform="translate(0 16)"/>
      ${r(130, 205, 250, 440, { rx: 40, fill: PANEL, stroke: W, sw: 1.8 })}
      ${r(222, 218, 66, 10, { rx: 5, fill: S, op: 0.5 })}
      ${[0, 1, 2].map((i) => r(152, 252 + i * 104, 206, 90, { rx: 16, fill: CARD, stroke: LINE, sw: 1 }) + circle(184, 297 + i * 104, 14, { fill: i === 0 ? W : S, op: i === 0 ? 0.9 : 0.35 }) + bar(212, 280 + i * 104, 110, 8, W, 0.75) + bar(212, 300 + i * 104, 76, 7) + r(212, 320 + i * 104, 130, 6, { rx: 3, fill: S, op: 0.25 }) + r(212, 320 + i * 104, 40 + i * 36, 6, { rx: 3, fill: i === 2 ? LIVE : W, op: 0.9 })).join("")}
    </g>
  </g>
</svg>`),

  /* SmartQueue: ticket queue flowing into services */
  smartqueue: frame((x, y, w, h) => {
    const ticket = (tx, ty, tw, th, hi) => r(tx, ty, tw, th, { rx: 10, fill: hi ? W : CARD, stroke: hi ? W : LINE, sw: 1.4, op: hi ? 0.95 : 1 }) + path_(`M${tx + tw * 0.68} ${ty + 6}V${ty + th - 6}`, { stroke: hi ? "#0B1220" : S, sw: 1.2, op: 0.5 }) + bar(tx + 14, ty + th / 2 - 4, tw * 0.4, 8, hi ? "#0B1220" : S, hi ? 0.8 : 0.5);
    const queue = [0, 1, 2, 3, 4].map((i) => ticket(x + 30 + i * 96, y + 150 + i * 6, 84, 54, i === 4)).join("");
    const services = [0, 1, 2].map((i) => {
      const sy = y + 50 + i * 126;
      return r(x + 560, sy, 240, 92, { rx: 16, fill: CARD, stroke: i === 1 ? W : LINE, sw: i === 1 ? 1.8 : 1 }) + circle(x + 594, sy + 46, 16, { stroke: i === 1 ? W : S, op: i === 1 ? 0.95 : 0.55 }) + bar(x + 626, sy + 34, 110, 8, W, 0.8) + bar(x + 626, sy + 54, 78, 7) + (i === 1 ? circle(x + 780, sy + 24, 5, { fill: LIVE }) : "");
    }).join("");
    const arrows = [0, 1, 2].map((i) => path_(`M${x + 470} ${y + 190}C${x + 520} ${y + 190} ${x + 510} ${y + 96 + i * 126} ${x + 556} ${y + 96 + i * 126}`, { stroke: i === 1 ? W : S, op: i === 1 ? 0.8 : 0.4, sw: 1.6 })).join("");
    return queue + arrows + services + circle(x + 70, y + 320, 5, { fill: S, op: 0.5 }) + circle(x + 92, y + 320, 5, { fill: S, op: 0.35 }) + circle(x + 114, y + 320, 5, { fill: S, op: 0.2 });
  }),

  /* Oasis-management: back-office table */
  "oasis-management": frame((x, y, w, h) => {
    const filters = [0, 1, 2].map((i) => r(x + 32 + i * 118, y + 26, 104, 30, { rx: 15, fill: i === 0 ? W : "none", stroke: LINE, sw: 1, op: i === 0 ? 0.92 : 1 }) + bar(x + 50 + i * 118, y + 38, 54, 6, i === 0 ? "#0B1220" : S, i === 0 ? 0.8 : 0.5)).join("");
    const search = r(x + w - 262, y + 26, 230, 30, { rx: 15, fill: "none", stroke: LINE, sw: 1 }) + circle(x + w - 240, y + 41, 6, { stroke: S, op: 0.5 });
    const head = r(x + 32, y + 80, w - 64, 34, { rx: 10, fill: CARD }) + [0, 1, 2, 3].map((i) => bar(x + 54 + [0, 200, 420, 600][i], y + 93, 70, 7, W, 0.55)).join("");
    const rows = Array.from({ length: 6 }, (_, i) => r(x + 32, y + 126 + i * 50, w - 64, 40, { rx: 10, fill: "none", stroke: LINE, sw: 1 }) + circle(x + 62, y + 146 + i * 50, 11, { fill: S, op: 0.3 }) + bar(x + 86, y + 142 + i * 50, 100 + (i % 3) * 20, 7, W, 0.7) + bar(x + 254, y + 142 + i * 50, 120, 7) + bar(x + 474, y + 142 + i * 50, 90, 7, S, 0.35) + r(x + 654, y + 136 + i * 50, 70, 20, { rx: 10, fill: i % 2 ? "none" : W, stroke: i % 2 ? S : W, sw: 1, op: i % 2 ? 0.5 : 0.85 }) + path_(`M${x + w - 80} ${y + 146 + i * 50}h28`, { stroke: S, op: 0.4 })).join("");
    return filters + search + head + rows;
  }),

  /* PDV Leadex Quiz: a question with four answers */
  "pdv-leadex-quiz": frame((x, y, w, h) => {
    const progress = r(x + 40, y + 28, w - 200, 8, { rx: 4, fill: S, op: 0.2 }) + r(x + 40, y + 28, (w - 200) * 0.62, 8, { rx: 4, fill: W, op: 0.9 });
    const timer = circle(x + w - 80, y + 32, 22, { stroke: S, op: 0.4, sw: 3 }) + path_(`M${x + w - 80} ${y + 10}A22 22 0 1 1 ${x + w - 98} ${y + 45}`, { stroke: W, sw: 3, op: 0.9 });
    const q = bar(x + 40, y + 84, 520, 14, W, 0.85) + bar(x + 40, y + 112, 380, 14, W, 0.6);
    const opts = [0, 1, 2, 3].map((i) => r(x + 40, y + 160 + i * 66, w - 80, 52, { rx: 14, fill: i === 1 ? "rgba(248,250,252,0.08)" : CARD, stroke: i === 1 ? W : LINE, sw: i === 1 ? 1.8 : 1 }) + circle(x + 74, y + 186 + i * 66, 13, { fill: i === 1 ? W : "none", stroke: i === 1 ? W : S, op: i === 1 ? 0.95 : 0.5 }) + (i === 1 ? path_(`M${x + 68} ${y + 186 + i * 66}l5 5l9-10`, { stroke: "#0B1220", sw: 2 }) : "") + bar(x + 108, y + 182 + i * 66, 240 + i * 34, 8, W, i === 1 ? 0.85 : 0.5)).join("");
    return progress + timer + q + opts;
  }),

  /* Clinique La Bienveillance: clinic website home page */
  "clinique-la-bienveillance": frame((x, y, w, h) => {
    const nav = bar(x + 40, y + 28, 60, 10, W, 0.85) + [0, 1, 2, 3].map((i) => bar(x + 380 + i * 80, y + 29, 50, 7)).join("") + r(x + w - 150, y + 18, 110, 30, { rx: 15, fill: W, op: 0.92 }) + bar(x + w - 128, y + 30, 66, 7, "#0B1220", 0.85);
    const hero = bar(x + 40, y + 100, 330, 18, W, 0.9) + bar(x + 40, y + 132, 270, 18, W, 0.9) + bar(x + 40, y + 172, 300, 8) + bar(x + 40, y + 190, 240, 8) + r(x + 40, y + 224, 150, 40, { rx: 20, fill: W, op: 0.95 }) + bar(x + 66, y + 240, 96, 8, "#0B1220", 0.85) + r(x + 204, y + 224, 120, 40, { rx: 20, stroke: S, sw: 1.2, op: 0.6 });
    const cross = circle(x + 640, y + 190, 130, { fill: CARD, stroke: LINE, sw: 1.2 }) + circle(x + 640, y + 190, 96, { stroke: S, sw: 1, op: 0.25 }) + r(x + 624, y + 142, 32, 96, { rx: 8, fill: W, op: 0.95 }) + r(x + 592, y + 174, 96, 32, { rx: 8, fill: W, op: 0.95 });
    const cards = [0, 1, 2].map((i) => r(x + 40 + i * 268, y + 296, 244, 100, { rx: 16, fill: CARD, stroke: LINE, sw: 1 }) + circle(x + 74 + i * 268, y + 332, 14, { fill: i === 0 ? W : S, op: i === 0 ? 0.9 : 0.35 }) + bar(x + 100 + i * 268, y + 326, 100, 8, W, 0.75) + bar(x + 62 + i * 268, y + 358, 160, 7) + bar(x + 62 + i * 268, y + 374, 120, 7, S, 0.35)).join("");
    return nav + hero + cross + cards;
  }),
};

for (const [slug, svg] of Object.entries(covers)) {
  fs.writeFileSync(path.join(out, `${slug}.svg`), svg);
}
console.log(`${Object.keys(covers).length} covers written to public/images/projects/`);
