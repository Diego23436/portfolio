/**
 * Motion helpers. GSAP is loaded only when a section asks for it,
 * so pages without animation do not download it.
 *
 * Usage inside a section script:
 *   const { gsap, ScrollTrigger } = await loadGsap({ scrollTrigger: true });
 */

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on a mouse or trackpad. Tilt, magnetic buttons and the spotlight use this. Never on touch. */
export function hasFinePointer(): boolean {
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

type GsapOptions = { scrollTrigger?: boolean; flip?: boolean };

let registered = { scrollTrigger: false, flip: false };

export async function loadGsap(options: GsapOptions = {}) {
  const { gsap } = await import("gsap");
  let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | undefined;
  let Flip: typeof import("gsap/Flip").Flip | undefined;

  if (options.scrollTrigger) {
    ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
    if (!registered.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      registered.scrollTrigger = true;
    }
  }
  if (options.flip) {
    ({ Flip } = await import("gsap/Flip"));
    if (!registered.flip) {
      gsap.registerPlugin(Flip);
      registered.flip = true;
    }
  }

  // Defaults from the art direction: 0.4-0.9s, power3/expo ease, nothing bounces.
  gsap.defaults({ duration: 0.7, ease: "power3.out" });

  return { gsap, ScrollTrigger, Flip, reduced: prefersReducedMotion() };
}
