/**
 * Page lifecycle helper for scripts that work with Astro View Transitions.
 *
 *   onPage("[data-hero]", (el, { initial }) => { ...; return () => cleanup(); });
 *
 * - init runs on every page that contains the selector (first load and after each navigation).
 * - the cleanup function runs before the page is swapped out.
 * - `initial` is true only for the very first page load of the visit (not for View Transition navigations).
 *
 * A script that belongs to one page (for example the hero) is loaded late when the visitor arrives
 * from another page. It misses the "astro:page-load" event, so it also starts itself once if the
 * document is already complete.
 */

let navigations = 0;

// Registered first (this module is imported before the others), so it runs before the other page-load listeners.
document.addEventListener("astro:page-load", () => {
  navigations += 1;
});

export function onPage<T extends HTMLElement = HTMLElement>(
  selector: string,
  init: (el: T, ctx: { initial: boolean }) => void | (() => void),
) {
  let cleanup: (() => void) | undefined;
  let started = false;

  const start = (initial: boolean) => {
    cleanup?.();
    cleanup = undefined;
    const el = document.querySelector<T>(selector);
    if (!el) return;
    cleanup = init(el, { initial }) || undefined;
  };

  document.addEventListener("astro:before-swap", () => {
    cleanup?.();
    cleanup = undefined;
  });

  document.addEventListener("astro:page-load", () => {
    started = true;
    start(navigations === 1);
  });

  // Late start (script arrived with a View Transition, after the page-load event).
  if (document.readyState === "complete") {
    window.setTimeout(() => {
      if (!started) {
        started = true;
        start(false);
      }
    }, 0);
  }
}
