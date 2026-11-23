/**
 * Site foundation. Loaded once. Works with Astro View Transitions:
 * page-specific setup runs on every "astro:page-load".
 */
import { hasFinePointer, prefersReducedMotion } from "./motion";
import { copyText } from "./toast";

const root = document.documentElement;

/* ---------------- Theme (light by default) ---------------- */
function storedTheme(): "dark" | "light" | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function syncThemeButtons() {
  const isDark = root.classList.contains("dark");
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
  });
}

function initThemeButtons() {
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const willBeDark = !root.classList.contains("dark");
      root.classList.toggle("dark", willBeDark);
      try {
        localStorage.setItem("theme", willBeDark ? "dark" : "light");
      } catch {
        /* storage can be blocked: the theme still changes for this visit */
      }
      syncThemeButtons();
    });
  });
  syncThemeButtons();
}

/* ---------------- Scroll reveal ---------------- */
let revealObserver: IntersectionObserver | null = null;

function initReveal() {
  revealObserver?.disconnect();
  const items = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible), .wipe:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  // A clip-path wipe hides the element itself, and browsers may then report it as not visible.
  // So a .wipe element is watched through its parent, and the class is added to the .wipe element.
  const targets = new Map<Element, HTMLElement>();
  items.forEach((el) => targets.set(el.classList.contains("wipe") ? (el.parentElement ?? el) : el, el));
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          targets.get(entry.target)?.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  targets.forEach((_, target) => revealObserver?.observe(target));
}

/* ---------------- Cursor spotlight (fine pointer only) ---------------- */
let spotlightReady = false;

function initSpotlight() {
  if (spotlightReady) return;
  if (!hasFinePointer() || prefersReducedMotion()) return;
  spotlightReady = true;
  root.classList.add("has-spotlight");

  let x = window.innerWidth * 0.6;
  let y = window.innerHeight * 0.3;
  let tx = x;
  let ty = y;
  let frame = 0;

  const paint = () => {
    // Ease toward the pointer so the glow trails a little.
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    const el = document.querySelector<HTMLElement>("[data-spotlight]");
    if (el) el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(paint) : 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    },
    { passive: true },
  );
  paint();
}

/* ---------------- Clocks: any [data-clock] shows the time in Douala ---------------- */
const douala = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Douala", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
let clockTimer: number | undefined;

function initClocks() {
  window.clearInterval(clockTimer);
  const clocks = document.querySelectorAll<HTMLElement>("[data-clock]");
  if (!clocks.length) return;
  const tick = () => {
    const time = douala.format(new Date());
    clocks.forEach((el) => {
      el.textContent = el.dataset.suffix ? `${time} ${el.dataset.suffix}` : time;
    });
  };
  tick();
  clockTimer = window.setInterval(tick, 30_000);
}

/* ---------------- Copy buttons: <button data-copy-text="..." data-copied="Copied ✓"> ---------------- */
document.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLElement>("[data-copy-text]");
  if (!button) return;
  void copyText(button.dataset.copyText ?? "", button.dataset.copied ?? "Copied", button.dataset.copyFailed ?? "Copy failed");
});

/* ---------------- Boot ---------------- */
// A page swap resets the <html> classes, so put the spotlight class back.
document.addEventListener("astro:after-swap", () => {
  if (spotlightReady) root.classList.add("has-spotlight");
});

document.addEventListener("astro:page-load", () => {
  initThemeButtons();
  initReveal();
  initSpotlight();
  initClocks();
});
