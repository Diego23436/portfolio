import { onPage } from "./lifecycle";
import { loadGsap, prefersReducedMotion } from "./motion";

/**
 * Projects page: filter chips. The cards that stay glide to their new place (GSAP Flip),
 * the others fade out. The filter lives in the URL (?filter=team) so it can be shared.
 * Without JavaScript the chips are hidden and every project is shown.
 */
onPage<HTMLElement>("[data-projects-page]", (root) => {
  const filters = root.querySelector<HTMLElement>("[data-filters]");
  const grid = root.querySelector<HTMLElement>("[data-grid]");
  const empty = root.querySelector<HTMLElement>("[data-empty]");
  if (!filters || !grid) return;

  filters.classList.add("is-on");
  const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-tile]"));
  const chips = Array.from(filters.querySelectorAll<HTMLButtonElement>("[data-filter]"));
  const valid = chips.map((chip) => chip.dataset.filter!);
  let flipLib: Awaited<ReturnType<typeof loadGsap>> | null = null;
  let disposed = false;

  const matches = (tile: HTMLElement, key: string) => key === "all" || (tile.dataset.categories ?? "").split(" ").includes(key);

  const paint = (key: string) => {
    chips.forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.filter === key)));
    const url = new URL(window.location.href);
    if (key === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", key);
    window.history.replaceState(window.history.state, "", url);
  };

  const apply = (key: string, animate: boolean) => {
    paint(key);
    const state = animate && flipLib?.Flip ? flipLib.Flip.getState(tiles) : null;
    tiles.forEach((tile) => {
      tile.hidden = !matches(tile, key);
    });
    if (empty) empty.hidden = tiles.some((tile) => !tile.hidden);
    if (state && flipLib?.Flip && flipLib.gsap && !prefersReducedMotion()) {
      const { gsap, Flip } = flipLib;
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.04,
        scale: true,
        absolute: true,
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.15 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.35 }),
      });
    }
  };

  const onClick = (event: Event) => {
    const chip = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-filter]");
    if (chip) apply(chip.dataset.filter!, true);
  };
  filters.addEventListener("click", onClick);

  // Start from the URL
  const initial = new URL(window.location.href).searchParams.get("filter") ?? "all";
  apply(valid.includes(initial) ? initial : "all", false);

  // The filter works without the animation library. Flip is loaded when the browser is idle, or on first interest.
  let loadingFlip = false;
  const loadFlip = () => {
    if (loadingFlip) return;
    loadingFlip = true;
    void loadGsap({ flip: true }).then((lib) => {
      if (!disposed) flipLib = lib;
    });
  };
  filters.addEventListener("pointerenter", loadFlip, { once: true });
  filters.addEventListener("focusin", loadFlip, { once: true });
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
  idle(loadFlip);

  return () => {
    disposed = true;
    filters.removeEventListener("click", onClick);
  };
});
