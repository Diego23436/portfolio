/**
 * Site foundation. Loaded once. Works with Astro View Transitions:
 * page-specific setup runs on every "astro:page-load".
 */
import { hasFinePointer, prefersReducedMotion } from "./motion";

const root = document.documentElement;

/* ---------------- Theme (dark first) ---------------- */
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
  const items = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  items.forEach((el) => revealObserver?.observe(el));
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

/* ---------------- Boot ---------------- */
// A page swap resets the <html> classes, so put the spotlight class back.
document.addEventListener("astro:after-swap", () => {
  if (spotlightReady) root.classList.add("has-spotlight");
});

document.addEventListener("astro:page-load", () => {
  initThemeButtons();
  initReveal();
  initSpotlight();
});
