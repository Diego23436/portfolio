import { onPage } from "./lifecycle";
import { prefersReducedMotion } from "./motion";

/**
 * Two infinite rows moving in opposite directions. Plain requestAnimationFrame, no library.
 * Scroll speed makes them faster (1x to 4x, easing back over about 0.6s). Scroll direction flips them. Hover pauses.
 */
onPage<HTMLElement>("[data-marquee]", (root) => {
  if (prefersReducedMotion()) return;

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

  let resizeTimer: number | undefined;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 200);
  };
  window.addEventListener("resize", onResize);

  const listeners: Array<() => void> = [];
  rows.forEach((item) => {
    const pause = () => (item.paused = true);
    const resume = () => (item.paused = false);
    item.row.addEventListener("pointerenter", pause);
    item.row.addEventListener("pointerleave", resume);
    listeners.push(() => {
      item.row.removeEventListener("pointerenter", pause);
      item.row.removeEventListener("pointerleave", resume);
    });
  });

  /* Only move while the band is on screen */
  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
  });
  observer.observe(root);

  /* Scroll velocity (px per second) -> speed boost, scroll direction -> direction */
  let lastY = window.scrollY;
  let boost = 1;
  let flip = 1;
  let frame = 0;
  let last = performance.now();
  let disposed = false;

  const tick = (now: number) => {
    if (disposed) return;
    const dt = Math.min(now - last, 64) / 1000;
    last = now;
    const y = window.scrollY;
    const velocity = dt > 0 ? (y - lastY) / dt : 0;
    lastY = y;
    if (Math.abs(velocity) > 20) flip = velocity < 0 ? -1 : 1;
    const target = Math.min(4, 1 + Math.abs(velocity) / 500);
    // Speed up fast, ease back slowly (about 0.6s)
    boost = target > boost ? target : boost + (1 - boost) * Math.min(1, dt / 0.25);

    if (visible) {
      rows.forEach((item) => {
        if (item.paused || !item.groupWidth) return;
        item.x += item.dir * flip * item.speed * boost * dt;
        // wrap between -groupWidth and 0
        item.x = ((((item.x % item.groupWidth) - item.groupWidth) % item.groupWidth) + item.groupWidth) % item.groupWidth - item.groupWidth;
        item.track.style.transform = `translate3d(${item.x.toFixed(2)}px, 0, 0)`;
      });
    }
    frame = requestAnimationFrame(tick);
  };

  // Start after the fonts are ready, so the widths are right.
  void document.fonts.ready.then(() => {
    if (disposed) return;
    build();
    frame = requestAnimationFrame(tick);
  });

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    listeners.forEach((fn) => fn());
    observer.disconnect();
  };
});
