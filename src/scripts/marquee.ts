import { onPage } from "./lifecycle";
import { loadGsap, prefersReducedMotion } from "./motion";

/**
 * Two infinite rows moving in opposite directions.
 * Scroll speed makes them faster (1x to 4x, easing back over 0.6s). Scroll direction flips them. Hover pauses.
 */
onPage<HTMLElement>("[data-marquee]", (root) => {
  if (prefersReducedMotion()) return;

  let disposed = false;
  const cleanups: Array<() => void> = [];

  void (async () => {
    const { gsap, ScrollTrigger } = await loadGsap({ scrollTrigger: true });
    if (disposed || !ScrollTrigger) return;
    await document.fonts.ready;
    if (disposed) return;

    const boost = { value: 1 };
    let flip = 1;
    let visible = true;

    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-marquee-row]")).map((row) => {
      const track = row.querySelector<HTMLElement>(".marquee-track")!;
      const group = track.querySelector<HTMLElement>(".marquee-group")!;
      return {
        row,
        track,
        group,
        dir: row.dataset.dir === "right" ? 1 : -1,
        speed: Number(row.dataset.speed) || 60, // pixels per second
        x: 0,
        paused: false,
        groupWidth: 0,
      };
    });

    /* Fill each row with enough copies of the group for a seamless loop. */
    const build = () => {
      rows.forEach((item) => {
        item.track.querySelectorAll(".is-clone").forEach((clone) => clone.remove());
        item.groupWidth = item.group.getBoundingClientRect().width;
        if (!item.groupWidth) return;
        const copies = Math.ceil(item.row.clientWidth / item.groupWidth) + 1;
        for (let i = 0; i < copies; i += 1) {
          const clone = item.group.cloneNode(true) as HTMLElement;
          clone.classList.add("is-clone");
          clone.setAttribute("aria-hidden", "true");
          item.track.appendChild(clone);
        }
      });
    };
    build();

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 200);
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    rows.forEach((item) => {
      const pause = () => (item.paused = true);
      const resume = () => (item.paused = false);
      item.row.addEventListener("pointerenter", pause);
      item.row.addEventListener("pointerleave", resume);
    });

    /* Scroll velocity -> speed, scroll direction -> direction */
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        boost.value = Math.min(4, Math.max(boost.value, 1 + velocity / 500));
        flip = self.direction === -1 ? -1 : 1;
        gsap.to(boost, { value: 1, duration: 0.6, ease: "power2.out", overwrite: true, delay: 0.08 });
      },
    });
    cleanups.push(() => trigger.kill());

    /* Only move while the band is on screen */
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    observer.observe(root);
    cleanups.push(() => observer.disconnect());

    const tick = (_time: number, deltaMs: number) => {
      if (!visible) return;
      const dt = Math.min(deltaMs, 64) / 1000;
      rows.forEach((item) => {
        if (item.paused || !item.groupWidth) return;
        item.x += item.dir * flip * item.speed * boost.value * dt;
        item.x = gsap.utils.wrap(-item.groupWidth, 0, item.x);
        item.track.style.transform = `translate3d(${item.x.toFixed(2)}px, 0, 0)`;
      });
    };
    gsap.ticker.add(tick);
    cleanups.push(() => gsap.ticker.remove(tick));
  })();

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
  };
});
