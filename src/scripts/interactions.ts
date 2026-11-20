import { hasFinePointer, loadGsap, prefersReducedMotion } from "./motion";

/**
 * Magnetic buttons: the element follows the cursor by at most `max` px
 * inside a `radius` px zone around it, and springs back on leave.
 * Fine pointers only. Returns a cleanup function.
 */
export async function initMagnetic(elements: HTMLElement[], { max = 8, radius = 100 } = {}): Promise<() => void> {
  if (!elements.length || !hasFinePointer() || prefersReducedMotion()) return () => {};
  const { gsap } = await loadGsap();

  const items = elements.map((el) => ({
    el,
    x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }),
    y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
  }));

  const onMove = (event: PointerEvent) => {
    for (const item of items) {
      const rect = item.el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const reachX = rect.width / 2 + radius;
      const reachY = rect.height / 2 + radius;
      if (Math.abs(dx) < reachX && Math.abs(dy) < reachY) {
        item.x(Math.max(-max, Math.min(max, dx * 0.2)));
        item.y(Math.max(-max, Math.min(max, dy * 0.2)));
      } else {
        item.x(0);
        item.y(0);
      }
    }
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    items.forEach((item) => gsap.set(item.el, { x: 0, y: 0 }));
  };
}
