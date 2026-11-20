import { onPage } from "./lifecycle";
import { loadGsap, prefersReducedMotion } from "./motion";

/**
 * Footer wordmark: the outlined "NK FORLAN" fills with white from left to right
 * as the footer scrolls into view.
 */
onPage<HTMLElement>("[data-footer]", (footer) => {
  const fill = footer.querySelector<HTMLElement>(".wm-fill");
  if (!fill || prefersReducedMotion()) return;

  let disposed = false;
  let kill: (() => void) | undefined;

  void (async () => {
    const { gsap, ScrollTrigger } = await loadGsap({ scrollTrigger: true });
    if (disposed || !ScrollTrigger) return;
    const tween = gsap.fromTo(
      fill,
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: footer, start: "top 92%", end: "bottom bottom", scrub: 0.4 },
      },
    );
    kill = () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  })();

  return () => {
    disposed = true;
    kill?.();
  };
});
