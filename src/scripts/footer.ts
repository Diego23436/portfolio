import { onPage } from "./lifecycle";
import { prefersReducedMotion } from "./motion";

/**
 * Footer wordmark: the outlined "NK FORLAN" fills with white from left to right
 * as the footer scrolls into view. Plain scroll listener, no library.
 */
onPage<HTMLElement>("[data-footer]", (footer) => {
  const fill = footer.querySelector<HTMLElement>(".wm-fill");
  if (!fill || prefersReducedMotion()) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    const rect = footer.getBoundingClientRect();
    // 0 when the footer top is at 92% of the screen, 1 when its bottom reaches the bottom of the screen
    const span = rect.height - vh * 0.08;
    const progress = span > 0 ? Math.min(1, Math.max(0, (vh * 0.92 - rect.top) / span)) : 1;
    fill.style.clipPath = `inset(0% ${((1 - progress) * 100).toFixed(2)}% 0% 0%)`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  // The page can change height after load (images, sections that start later): update then too.
  const sizeWatcher = new ResizeObserver(schedule);
  sizeWatcher.observe(document.body);
  update();

  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    sizeWatcher.disconnect();
    if (frame) cancelAnimationFrame(frame);
  };
});
