import { navigate } from "astro:transitions/client";
import { prefersReducedMotion } from "./motion";
import { copyText } from "./toast";

/**
 * Command palette (Ctrl+K / Cmd+K) and the "sudo hire forlan" easter egg.
 * The dialog is rendered on every page, so every listener sits on the document and looks the dialog up when used.
 * That keeps everything working after a View Transition.
 */

type Item = {
  id: string;
  group: "navigate" | "projects" | "actions";
  label: string;
  keywords?: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  action?: "copy-email" | "theme" | "lang";
};
type Data = {
  items: Item[];
  groups: Record<string, string>;
  empty: string;
  results: string;
  copied: string;
  copyFailed: string;
  email: string;
  whatsapp: string;
  other: "en" | "fr";
  egg: { label: string; cmd: string; password: string; granted: string; opening: string; link: string };
};

const PHRASE = "sudo hire forlan";
let selected = 0;
let shown: Item[] = [];
let data: Data | null = null;

const dialog = () => document.querySelector<HTMLDialogElement>("[data-palette]");
const input = () => document.querySelector<HTMLInputElement>("[data-palette-input]");
const list = () => document.querySelector<HTMLElement>("[data-palette-list]");

function loadData(): Data | null {
  const el = document.querySelector<HTMLScriptElement>("[data-palette-data]");
  if (!el) return null;
  if (!data || data.other !== (JSON.parse(el.textContent ?? "{}") as Data).other) data = JSON.parse(el.textContent ?? "{}") as Data;
  return data;
}

/* ---------------- Fuzzy match: letters in order, with a simple score ---------------- */
function fuzzy(text: string, query: string): { score: number; marks: number[] } | null {
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  // 1) An exact piece of the text wins (for example "cv" in "Download CV"). Earlier is better.
  const at = t.indexOf(q);
  if (at >= 0) {
    const wordStart = at === 0 || t[at - 1] === " " || t[at - 1] === "(";
    return { score: 100 - at + (wordStart ? 10 : 0), marks: Array.from({ length: q.length }, (_, i) => at + i) };
  }

  // 2) Otherwise: the letters in order ("stk" finds "Stocky"), with a bonus for neighbours and word starts.
  const marks: number[] = [];
  let qi = 0;
  let score = 0;
  let last = -2;
  for (let i = 0; i < t.length && qi < q.length; i += 1) {
    if (t[i] === q[qi]) {
      marks.push(i);
      score += (i === last + 1 ? 3 : 1) + (i === 0 || t[i - 1] === " " ? 2 : 0);
      last = i;
      qi += 1;
    }
  }
  return qi === q.length ? { score: score - t.length * 0.01, marks } : null;
}

function highlight(label: string, marks: number[]): string {
  const set = new Set(marks);
  return [...label].map((ch, i) => (set.has(i) ? `<b>${ch.replace("<", "&lt;")}</b>` : ch.replace("<", "&lt;"))).join("");
}

/* ---------------- Render ---------------- */
function render(query: string) {
  const d = loadData();
  const ul = list();
  if (!d || !ul) return;
  const q = query.trim();
  type Row = { item: Item; html: string; score: number };
  let rows: Row[] = [];

  if (q.toLowerCase() === PHRASE) {
    rows = [{ item: { id: "egg", group: "actions", label: d.egg.label }, html: `<b>${d.egg.label}</b>`, score: 99 }];
  } else if (!q) {
    rows = d.items.map((item) => ({ item, html: item.label, score: 0 }));
  } else {
    for (const item of d.items) {
      const byLabel = fuzzy(item.label, q);
      if (byLabel) {
        rows.push({ item, html: highlight(item.label, byLabel.marks), score: byLabel.score + 5 });
        continue;
      }
      const byWords = item.keywords ? fuzzy(item.keywords, q) : null;
      if (byWords) rows.push({ item, html: item.label, score: byWords.score });
    }
    rows.sort((a, b) => b.score - a.score);
  }

  shown = rows.map((row) => row.item);
  selected = 0;
  ul.replaceChildren();
  if (!rows.length) {
    const li = document.createElement("li");
    li.className = "pal-empty";
    li.textContent = d.empty;
    ul.append(li);
  } else {
    let currentGroup = "";
    rows.forEach((row, index) => {
      if (!q && row.item.group !== currentGroup) {
        currentGroup = row.item.group;
        const header = document.createElement("li");
        header.className = "pal-group";
        header.setAttribute("role", "presentation");
        header.textContent = d.groups[currentGroup] ?? currentGroup;
        ul.append(header);
      }
      const li = document.createElement("li");
      li.className = "pal-item";
      li.id = `pal-${index}`;
      li.setAttribute("role", "option");
      li.dataset.index = String(index);
      li.innerHTML = `<span>${row.html}</span><span class="pal-enter" aria-hidden="true">↵</span>`;
      ul.append(li);
    });
  }
  paintSelection();
  const status = document.querySelector<HTMLElement>("[data-palette-status]");
  if (status) status.textContent = `${shown.length} ${d.results}`;
}

function paintSelection() {
  const ul = list();
  const field = input();
  if (!ul) return;
  ul.querySelectorAll<HTMLElement>(".pal-item").forEach((li) => {
    const on = Number(li.dataset.index) === selected;
    li.setAttribute("aria-selected", String(on));
    if (on) {
      li.scrollIntoView({ block: "nearest" });
      field?.setAttribute("aria-activedescendant", li.id);
    }
  });
}

/* ---------------- Open, close, run ---------------- */
function openPalette() {
  const dlg = dialog();
  if (!dlg || dlg.open) return;
  const field = input();
  if (field) field.value = "";
  render("");
  dlg.showModal();
  field?.focus();
}

function closePalette() {
  const dlg = dialog();
  if (dlg?.open) dlg.close();
}

function go(href: string, item: Item) {
  closePalette();
  if (item.external || item.download) {
    const a = document.createElement("a");
    a.href = href;
    if (item.external) {
      a.target = "_blank";
      a.rel = "noreferrer";
    }
    if (item.download) a.download = "";
    document.body.append(a);
    a.click();
    a.remove();
  } else {
    void navigate(href);
  }
}

function run(item: Item | undefined) {
  const d = loadData();
  if (!item || !d) return;
  if (item.id === "egg") {
    closePalette();
    void hireForlan();
    return;
  }
  if (item.href) return go(item.href, item);
  closePalette();
  if (item.action === "copy-email") void copyText(d.email, d.copied, d.copyFailed);
  if (item.action === "theme") document.querySelector<HTMLElement>("[data-theme-toggle]")?.click();
  if (item.action === "lang") {
    const here = window.location.pathname;
    const target = /^\/(en|fr)(\/|$)/.test(here) ? here.replace(/^\/(en|fr)/, `/${d.other}`) : `/${d.other}/`;
    void navigate(target + window.location.search);
  }
}

/* ---------------- Easter egg: sudo hire forlan ---------------- */
let eggRunning = false;

async function hireForlan() {
  const d = loadData();
  const box = document.querySelector<HTMLElement>("[data-egg]");
  if (!d || !box || eggRunning) return;
  eggRunning = true;
  const reduced = prefersReducedMotion();
  const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, reduced ? 0 : ms));
  box.hidden = false;
  box.replaceChildren();
  const line = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    box.append(div);
    return div;
  };

  const cmd = line(`<span class="dim">$</span> `);
  const typed = d.egg.cmd.replace(/^\$ /, "");
  for (const ch of typed) {
    cmd.append(ch);
    await sleep(35);
  }
  await sleep(250);
  line(`<span class="dim">${d.egg.password}</span>`);
  await sleep(500);
  line(`<span class="ok">${d.egg.granted}</span>`);
  await sleep(350);
  line(d.egg.opening);
  if (!reduced) confetti();

  await sleep(1400);
  const opened = window.open(d.whatsapp, "_blank", "noopener,noreferrer");
  if (!opened) {
    const fallback = line(`<a href="${d.whatsapp}" target="_blank" rel="noreferrer">${d.egg.link}</a>`);
    fallback.className = "dim";
  }
  await sleep(opened ? 2500 : 8000);
  box.hidden = true;
  eggRunning = false;
}

/** Small confetti burst on a canvas. No library: 40 particles, white / silver / lime, about 1.2s. */
function confetti() {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-confetti]");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.hidden = false;
  ctx.scale(dpr, dpr);
  const colors = ["#F8FAFC", "#94A3B8", "#C6F432"];
  const originX = window.innerWidth - 200;
  const originY = window.innerHeight - 120;
  const particles = Array.from({ length: 40 }, (_, i) => {
    const angle = -Math.PI / 2 + ((i / 40) * 2 - 1) * 0.95 + (i % 3) * 0.07;
    const speed = 7 + (i % 7) * 1.4;
    return { x: originX, y: originY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size: 5 + (i % 4), color: colors[i % 3], spin: (i % 5) - 2 };
  });
  const start = performance.now();
  const frame = (now: number) => {
    const t = (now - start) / 1200;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (t >= 1) {
      canvas.hidden = true;
      return;
    }
    particles.forEach((p) => {
      p.vy += 0.32;
      p.x += p.vx;
      p.y += p.vy;
      ctx.save();
      ctx.globalAlpha = 1 - t * t;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin * t * 6);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------------- Listeners (document level, registered once) ---------------- */
let buffer = "";

document.addEventListener("keydown", (event) => {
  const dlg = dialog();
  const isPalette = dlg?.open;

  // Ctrl+K / Cmd+K
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (isPalette) closePalette();
    else openPalette();
    return;
  }

  if (isPalette) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!shown.length) return;
      selected = (selected + (event.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length;
      paintSelection();
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(shown[selected]);
    }
    return;
  }

  // Easter egg: type the phrase anywhere outside form fields
  const target = event.target as HTMLElement | null;
  if (target && (target.closest("input, textarea, select, [contenteditable='true']") || event.ctrlKey || event.metaKey || event.altKey)) return;
  if (event.key.length !== 1) return;
  buffer = (buffer + event.key.toLowerCase()).slice(-20);
  if (buffer.endsWith(PHRASE)) {
    buffer = "";
    void hireForlan();
  }
});

document.addEventListener("input", (event) => {
  const target = event.target as HTMLElement;
  if (target.matches("[data-palette-input]")) render((target as HTMLInputElement).value);
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest("[data-palette-open]")) {
    openPalette();
    return;
  }
  if (target.closest("[data-palette-close]")) {
    closePalette();
    return;
  }
  const option = target.closest<HTMLElement>(".pal-item");
  if (option && dialog()?.open) {
    selected = Number(option.dataset.index);
    run(shown[selected]);
    return;
  }
  const dlg = dialog();
  if (dlg?.open && target === dlg) closePalette(); // click on the backdrop
});

document.addEventListener("pointermove", (event) => {
  const option = (event.target as HTMLElement).closest<HTMLElement>(".pal-item");
  if (option && dialog()?.open && Number(option.dataset.index) !== selected) {
    selected = Number(option.dataset.index);
    paintSelection();
  }
});

// Show "Ctrl K" or the Command symbol, depending on the computer
document.addEventListener("astro:page-load", () => {
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  document.querySelectorAll<HTMLElement>("[data-palette-key]").forEach((el) => {
    el.textContent = mac ? "⌘K" : "Ctrl K";
  });
});
