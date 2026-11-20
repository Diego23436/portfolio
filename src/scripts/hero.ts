import { onPage } from "./lifecycle";
import { hasFinePointer, loadGsap, prefersReducedMotion } from "./motion";
import { initMagnetic } from "./interactions";

/**
 * Home hero: entrance timeline, rotating word, counters, photo tilt, chip drift, magnetic buttons.
 * The clock and the "Copy email" button are handled by foundation.ts (they also appear in the footer).
 */
onPage<HTMLElement>("[data-hero]", (hero, { initial }) => {
  // Reduced motion: everything is visible at once, no rotation, no tilt.
  if (prefersReducedMotion()) {
    hero.classList.add("is-ready");
    return;
  }
  // Coming from another page (View Transition): no entrance, the hero is simply there.
  if (!initial) hero.classList.add("is-ready");

  let disposed = false;
  const cleanups: Array<() => void> = [];
  const all = <T extends HTMLElement>(selector: string) => Array.from(hero.querySelectorAll<T>(selector));

  void (async () => {
    const { gsap } = await loadGsap();
    if (disposed) return;
    await document.fonts.ready;
    if (disposed) return;

    const top = all('[data-in="top"]');
    const lines = all(".hero-line-in");
    const rise = all('[data-in="rise"]');
    const photo = all('[data-in="photo"]');
    const glow = all('[data-in="glow"]');
    const chips = all('[data-in="chip"]');
    const counters = all<HTMLElement>("[data-count]");

    /* ---------- Counters: count up once, 1.2s ---------- */
    const runCounters = () => {
      counters.forEach((el) => {
        const target = Number(el.dataset.count) || 0;
        const state = { value: 0 };
        el.textContent = "0";
        gsap.to(state, {
          value: target,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
          onComplete: () => {
            el.textContent = String(target);
          },
        });
      });
    };

    /* ---------- Rotating word (every 2.2s, vertical mask slide) ---------- */
    const box = hero.querySelector<HTMLElement>("[data-words]");
    const words = box ? Array.from(box.querySelectorAll<HTMLElement>("[data-word]")) : [];
    let wordIndex = 0;
    let rotationCall: gsap.core.Tween | undefined;

    const startRotation = (delay: number) => {
      if (!box || words.length < 2) return;
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
      rotationCall = gsap.delayedCall(delay, next);
    };

    /* ---------- Entrance (first load only) ---------- */
    if (initial) {
      // The CSS start position is a pixel transform for GSAP: reset it so only yPercent moves the line.
      gsap.set(lines, { y: 0, yPercent: 110 });
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => hero.classList.add("is-ready"),
      });
      tl.to(top, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .to(lines[0], { yPercent: 0, duration: 0.9 }, 0.15)
        .to(lines[1], { yPercent: 0, duration: 0.9 }, 0.3)
        .fromTo(rise, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.55)
        .fromTo(photo, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 0.7)
        .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.7)
        .fromTo(chips, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, 0.9)
        .call(runCounters, undefined, 1.15);
      cleanups.push(() => tl.kill());
      startRotation(2.2 + 1.4);
    } else {
      runCounters();
      startRotation(2.2);
    }
    cleanups.push(() => rotationCall?.kill());

    /* ---------- Chips drift slowly (deterministic, no randomness) ---------- */
    const drifts = all("[data-drift]");
    const driftTimes = [4.6, 5.4, 6];
    drifts.forEach((el, index) => {
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
