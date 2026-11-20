import { onPage } from "./lifecycle";
import { loadGsap, prefersReducedMotion } from "./motion";

/** About page: the photo moves a little slower than the scroll (desktop only). */
onPage<HTMLElement>("[data-about-photo]", (figure) => {
  const img = figure.querySelector<HTMLElement>("[data-about-img]");
  if (!img || prefersReducedMotion()) return;

  let disposed = false;
  let kill: (() => void) | undefined;

  void (async () => {
    const { gsap, ScrollTrigger } = await loadGsap({ scrollTrigger: true });
    if (disposed || !ScrollTrigger) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // The image is 12% taller than its frame, so it can drift about 20px each way without showing an edge.
      gsap.fromTo(
        img,
        { y: -20 },
        { y: 20, ease: "none", scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    kill = () => mm.revert();
  })();

  return () => {
    disposed = true;
    kill?.();
  };
});
