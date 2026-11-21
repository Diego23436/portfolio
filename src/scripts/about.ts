import { onPage } from "./lifecycle";
import { prefersReducedMotion } from "./motion";

/** About page: the photo moves a little slower than the scroll (desktop only). Plain scroll listener, no library. */
onPage<HTMLElement>("[data-about-photo]", (figure) => {
  const img = figure.querySelector<HTMLElement>("[data-about-img]");
  const desktop = window.matchMedia("(min-width: 1024px)");
  if (!img || prefersReducedMotion() || !desktop.matches) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = figure.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the figure enters at the bottom of the screen, 1 when it leaves at the top
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
    // The image is 12% taller than its frame, so it can drift about 20px each way without showing an edge.
    img.style.transform = `translate3d(0, ${(-20 + 40 * progress).toFixed(1)}px, 0)`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();

  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) cancelAnimationFrame(frame);
  };
});
