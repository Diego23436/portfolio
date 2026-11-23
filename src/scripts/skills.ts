import { onPage } from "./lifecycle";
import { loadGsap, prefersReducedMotion } from "./motion";

type Used = { t: string; h: string; slug: string };
type Texts = {
  levels: Record<string, string>;
  dots: Record<string, number>;
  usedIn: string;
  close: string;
};

/**
 * Stack constellation (desktop) and grouped grid with a bottom sheet (tablet, phone).
 * Positions are computed at build time in the component, this script only reacts:
 *  - hover / focus / click on a logo: dim the rest, show a tooltip, draw lines to the projects
 *  - group chips: dim the other groups
 *  - Esc closes the tooltip or the sheet
 */
onPage<HTMLElement>("[data-skills]", (root) => {
  const text = JSON.parse(root.dataset.i18n ?? "{}") as Texts;
  const canvas = root.querySelector<HTMLElement>("[data-canvas]");
  const tip = root.querySelector<HTMLElement>("[data-tip]");
  const svg = root.querySelector<SVGSVGElement>("[data-lines]");
  const sheet = root.querySelector<HTMLElement>("[data-sheet]");
  // Portal: a fixed sheet inside .defer-render / .reveal is clipped to its parent (content-visibility, transforms).
  // Moving it to <body> makes it cover the real screen. It is removed again when the page changes.
  if (sheet) document.body.append(sheet);
  const sheetCard = sheet?.querySelector<HTMLElement>("[data-sheet-card]") ?? null;
  const chips = Array.from(root.querySelectorAll<HTMLElement>("[data-skill]"));
  const pills = Array.from(root.querySelectorAll<HTMLElement>("[data-pill]"));
  const labels = Array.from(root.querySelectorAll<HTMLElement>(".cluster-label"));
  const cleanups: Array<() => void> = [];
  let disposed = false;

  /* ---------- Entrance: chips pop in when the map comes into view ---------- */
  if ("IntersectionObserver" in window) {
    // .in-view: on screen (the float animation runs only then). .is-in: has been seen once (the pop-in).
    const observer = new IntersectionObserver(
      (entries) => {
        const on = entries.some((entry) => entry.isIntersecting);
        root.classList.toggle("in-view", on);
        if (on) root.classList.add("is-in");
      },
      { threshold: 0.05 },
    );
    observer.observe(root);
    cleanups.push(() => observer.disconnect());
  } else {
    root.classList.add("is-in", "in-view");
  }

  /* ---------- Helpers ---------- */
  const dotsHtml = (level: string) =>
    `<span class="dots" aria-hidden="true">${[1, 2, 3].map((n) => `<i class="${n <= (text.dots[level] ?? 0) ? "on" : ""}"></i>`).join("")}</span>`;

  const fillInfo = (target: HTMLElement, name: string, level: string, used: Used[]) => {
    target.replaceChildren();
    const title = document.createElement("p");
    title.className = "tip-name";
    title.textContent = name;
    const lvl = document.createElement("p");
    lvl.className = "tip-level";
    lvl.innerHTML = `${dotsHtml(level)}<span></span>`;
    lvl.querySelector("span:last-child")!.textContent = text.levels[level] ?? level;
    const usedBox = document.createElement("p");
    usedBox.className = "tip-used";
    if (used.length) {
      usedBox.append(`${text.usedIn}: `);
      used.forEach((project, index) => {
        if (index) usedBox.append(" · ");
        const link = document.createElement("a");
        link.href = project.h;
        link.textContent = project.t;
        usedBox.append(link);
      });
    }
    if (used.length) target.append(title, lvl, usedBox);
    else target.append(title, lvl);
  };

  /* ---------- Constellation ---------- */
  let closeTimer: number | undefined;
  let active: HTMLElement | null = null;
  let gsapLib: Awaited<ReturnType<typeof loadGsap>> | null = null;
  const ensureGsap = () => {
    // Loaded on the first hover: the lines still appear at once if it is not ready yet.
    if (!gsapLib) void loadGsap().then((lib) => (gsapLib = lib));
  };

  const clearLines = () => svg?.replaceChildren();

  const drawLines = (chip: HTMLElement, used: Used[]) => {
    if (!canvas || !svg) return;
    clearLines();
    const box = canvas.getBoundingClientRect();
    const scale = 1200 / box.width;
    const c = chip.getBoundingClientRect();
    const x1 = (c.left + c.width / 2 - box.left) * scale;
    const y1 = (c.top + c.height / 2 - box.top) * scale;
    used.forEach((project) => {
      const pill = pills.find((p) => p.dataset.pill === project.slug);
      if (!pill) return;
      const p = pill.getBoundingClientRect();
      const x2 = (p.left + p.width / 2 - box.left) * scale;
      const y2 = (p.top + p.height / 2 - box.top) * scale;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(x1));
      line.setAttribute("y1", String(y1));
      line.setAttribute("x2", String(x2));
      line.setAttribute("y2", String(y2));
      svg.append(line);
      const length = Math.hypot(x2 - x1, y2 - y1);
      if (gsapLib && !prefersReducedMotion()) {
        gsapLib.gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" });
      }
    });
  };

  const place = (chip: HTMLElement) => {
    if (!canvas || !tip) return;
    const box = canvas.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    const cx = c.left + c.width / 2 - box.left;
    const cy = c.top + c.height / 2 - box.top;
    const width = tip.offsetWidth || 260;
    const height = tip.offsetHeight || 120;
    let left = cx + c.width / 2 + 14;
    if (left + width > box.width - 8) left = cx - c.width / 2 - 14 - width;
    const top = Math.min(Math.max(cy - 40, 8), box.height - height - 8);
    tip.style.left = `${Math.round(left)}px`;
    tip.style.top = `${Math.round(top)}px`;
  };

  const open = (chip: HTMLElement) => {
    if (!canvas || !tip) return;
    window.clearTimeout(closeTimer);
    active = chip;
    const used = JSON.parse(chip.dataset.used ?? "[]") as Used[];
    ensureGsap();
    root.classList.add("is-focus");
    chips.forEach((other) => other.classList.toggle("is-on", other === chip));
    const slugs = new Set(used.map((u) => u.slug));
    pills.forEach((pill) => pill.classList.toggle("is-on", slugs.has(pill.dataset.pill ?? "")));
    fillInfo(tip, chip.dataset.name ?? "", chip.dataset.level ?? "", used);
    tip.hidden = false;
    place(chip);
    drawLines(chip, used);
  };

  const close = () => {
    active = null;
    root.classList.remove("is-focus");
    chips.forEach((chip) => chip.classList.remove("is-on"));
    pills.forEach((pill) => pill.classList.remove("is-on"));
    if (tip) tip.hidden = true;
    clearLines();
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(close, 180);
  };

  chips.forEach((chip) => {
    chip.addEventListener("pointerenter", (event) => {
      if ((event as PointerEvent).pointerType !== "touch") open(chip);
    });
    chip.addEventListener("pointerleave", scheduleClose);
    chip.addEventListener("focus", () => open(chip));
    chip.addEventListener("blur", scheduleClose);
    chip.addEventListener("click", () => open(chip));
  });
  tip?.addEventListener("pointerenter", () => window.clearTimeout(closeTimer));
  tip?.addEventListener("pointerleave", scheduleClose);
  tip?.addEventListener("focusin", () => window.clearTimeout(closeTimer));
  tip?.addEventListener("focusout", scheduleClose);

  /* ---------- Group filter chips ---------- */
  const filters = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-skill-filter]"));
  const applyFilter = (key: string) => {
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.skillFilter === key)));
    root.classList.toggle("is-filter", key !== "all");
    [...chips, ...labels].forEach((el) => el.classList.toggle("is-dim", key !== "all" && el.dataset.group !== key));
    close();
  };
  filters.forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.skillFilter ?? "all")));

  /* ---------- Phone: bottom sheet ---------- */
  let opener: HTMLElement | null = null;
  const closeSheet = () => {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    document.documentElement.classList.remove("sheet-open");
    opener?.focus({ preventScroll: true });
  };
  const openSheet = (button: HTMLElement) => {
    if (!sheet || !sheetCard) return;
    opener = button;
    fillInfo(sheetCard, button.dataset.name ?? "", button.dataset.level ?? "", JSON.parse(button.dataset.used ?? "[]") as Used[]);
    const done = document.createElement("button");
    done.type = "button";
    done.className = "btn btn--ghost sheet-close";
    done.textContent = text.close;
    done.addEventListener("click", closeSheet);
    sheetCard.append(done);
    sheet.hidden = false;
    document.documentElement.classList.add("sheet-open");
    done.focus({ preventScroll: true });
  };
  root.querySelectorAll<HTMLElement>("[data-skill-btn]").forEach((button) => button.addEventListener("click", () => openSheet(button)));
  sheet?.addEventListener("click", (event) => {
    if (event.target === sheet) closeSheet();
  });
  // Keep Tab inside the open sheet.
  sheet?.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || !sheetCard) return;
    const items = Array.from(sheetCard.querySelectorAll<HTMLElement>("a[href], button"));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    if (sheet && !sheet.hidden) closeSheet();
    else if (active) {
      const was = active;
      close();
      was.focus({ preventScroll: true });
    }
  };
  document.addEventListener("keydown", onKey);
  cleanups.push(() => document.removeEventListener("keydown", onKey));

  return () => {
    disposed = true;
    window.clearTimeout(closeTimer);
    document.documentElement.classList.remove("sheet-open");
    sheet?.remove();
    cleanups.forEach((fn) => fn());
    void disposed;
  };
});
