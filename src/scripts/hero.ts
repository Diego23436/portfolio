import { onPage } from "./lifecycle";
import { hasFinePointer, loadGsap, prefersReducedMotion } from "./motion";
import { initMagnetic } from "./interactions";

/**
 * Home hero. The entrance itself is CSS only (hero.css), so the headline never waits for this script.
 * This script adds: counters, rotating word, photo tilt, chip drift and magnetic buttons.
 * The clock and the "Copy email" button are handled by foundation.ts (they also appear in the footer).
 */
onPage<HTMLElement>("[data-hero]", (hero, { initial }) => {
  let disposed = false;
  const cleanups: Array<() => void> = [];
  const all = <T extends HTMLElement>(selector: string) => Array.from(hero.querySelectorAll<T>(selector));
  const reduced = prefersReducedMotion();

  /* ---------- Counters: count up once, 1.2s (no library needed) ---------- */
  const counters = all<HTMLElement>("[data-count]");
  if (!reduced) {
    // Start from 0 right away, so the final numbers never flash before the count.
    counters.forEach((el) => (el.textContent = "0"));
    const startAt = initial ? 1150 : 300;
    const timer = window.setTimeout(() => {
      const begin = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - begin) / 1200);
        const eased = 1 - (1 - t) * (1 - t); // easeOutQuad
        counters.forEach((el) => {
          el.textContent = String(Math.round((Number(el.dataset.count) || 0) * eased));
        });
        if (t < 1 && !disposed) requestAnimationFrame(frame);
        else counters.forEach((el) => (el.textContent = String(Number(el.dataset.count) || 0)));
      };
      requestAnimationFrame(frame);
    }, startAt);
    cleanups.push(() => {
      window.clearTimeout(timer);
      counters.forEach((el) => (el.textContent = String(Number(el.dataset.count) || 0)));
    });
  }
  if (reduced) return () => {};

  void (async () => {
    // Let the first screen paint before loading the animation code.
    await new Promise<void>((resolve) => (window.requestIdleCallback ? window.requestIdleCallback(() => resolve(), { timeout: 1200 }) : window.setTimeout(resolve, 300)));
    if (disposed) return;
    const { gsap } = await loadGsap();
    if (disposed) return;
    await document.fonts.ready;
    if (disposed) return;

    /* ---------- Rotating word (every 2.2s, vertical mask slide) ---------- */
    const box = hero.querySelector<HTMLElement>("[data-words]");
    const words = box ? Array.from(box.querySelectorAll<HTMLElement>("[data-word]")) : [];
    let wordIndex = 0;
    let rotationCall: gsap.core.Tween | undefined;

    if (box && words.length > 1) {
      box.style.width = `${words[0].offsetWidth}px`;
      box.classList.add("is-live");
      words.forEach((word, index) => gsap.set(word, { yPercent: index === 0 ? 0 : 130 }));
      const next = () => {
        rotationCall = gsap.delayedCall(2.2, next);
        const current = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;
        const incoming = words[wordIndex];
        gsap
          .timeline()
          .to(current, { yPercent: -130, duration: 0.6, ease: "expo.inOut" }, 0)
          .fromTo(incoming, { yPercent: 130 }, { yPercent: 0, duration: 0.6, ease: "expo.inOut" }, 0)
          .to(box, { width: incoming.offsetWidth, duration: 0.5, ease: "expo.inOut" }, 0);
      };
      rotationCall = gsap.delayedCall(initial ? 3.6 : 2.2, next);
      cleanups.push(() => rotationCall?.kill());
    }

    /* ---------- Chips drift slowly (deterministic, no randomness) ---------- */
    const driftTimes = [4.6, 5.4, 6];
    all("[data-drift]").forEach((el, index) => {
      const tween = gsap.to(el, {
        y: index % 2 === 0 ? 6 : -6,
        duration: driftTimes[index % driftTimes.length],
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.8,
      });
      cleanups.push(() => tween.kill());
    });

    /* ---------- Photo tilt + chip parallax (mouse only) ---------- */
    const tilt = hero.querySelector<HTMLElement>("[data-tilt]");
    if (tilt && hasFinePointer()) {
      gsap.set(tilt, { transformPerspective: 1000 });
      const rotateX = gsap.quickTo(tilt, "rotationX", { duration: 0.7, ease: "power3.out" });
      const rotateY = gsap.quickTo(tilt, "rotationY", { duration: 0.7, ease: "power3.out" });
      const layers = all("[data-parallax]").map((el) => ({
        depth: Number(el.dataset.parallax) || 16,
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
      }));
      const onMove = (event: PointerEvent) => {
        const bounds = hero.getBoundingClientRect();
        if (event.clientY < bounds.top || event.clientY > bounds.bottom) return;
        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        rotateY(nx * 4);
        rotateX(-ny * 4);
        layers.forEach((layer) => {
          layer.x(nx * layer.depth);
          layer.y(ny * layer.depth * 0.7);
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));
    }

    /* ---------- Magnetic buttons (mouse only) ---------- */
    const stopMagnetic = await initMagnetic(all("[data-magnetic]"));
    if (disposed) stopMagnetic();
    else cleanups.push(stopMagnetic);
  })();

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
  };
});
