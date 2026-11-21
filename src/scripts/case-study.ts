import { onPage } from "./lifecycle";
import { hasFinePointer, loadGsap, prefersReducedMotion } from "./motion";

/**
 * Case study page:
 *  - 2px scroll progress bar at the top
 *  - side navigation with the active section highlighted
 *  - architecture diagram that draws itself on scroll
 *  - a small preview of the next project that follows the cursor
 */
onPage<HTMLElement>("[data-case]", (root) => {
  const cleanups: Array<() => void> = [];
  let disposed = false;
  const reduced = prefersReducedMotion();

  /* ---------- Progress bar ---------- */
  const bar = document.querySelector<HTMLElement>("[data-progress]");
  if (bar) {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    cleanups.push(() => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    });
  }

  /* ---------- Side navigation ---------- */
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-nav] a"));
  const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"));
  if (links.length && sections.length && "IntersectionObserver" in window) {
    const setActive = (id: string) => {
      links.forEach((link) => link.setAttribute("aria-current", String(link.getAttribute("href") === `#${id}`)));
    };
    setActive(sections[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());
  }

  /* ---------- Architecture diagram draws itself (CSS transitions, the script only adds a class) ---------- */
  const arch = root.querySelector<HTMLElement>("[data-arch]");
  if (arch) {
    if (reduced || !("IntersectionObserver" in window)) {
      arch.classList.add("is-drawn");
    } else {
      const drawObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            arch.classList.add("is-drawn");
            drawObserver.disconnect();
          }
        },
        { rootMargin: "0px 0px -20% 0px" },
      );
      drawObserver.observe(arch);
      cleanups.push(() => drawObserver.disconnect());
    }
  }

  /* ---------- Next project preview follows the cursor (mouse only). GSAP loads on the first hover. ---------- */
  const next = root.querySelector<HTMLElement>("[data-next]");
  const preview = root.querySelector<HTMLElement>("[data-next-preview]");
  if (next && preview && hasFinePointer() && !reduced) {
    type Api = { show: (event: PointerEvent) => void; move: (event: PointerEvent) => void; hide: () => void };
    let api: Api | null = null;
    let loading: Promise<void> | null = null;
    const load = () =>
      (loading ??= loadGsap().then(({ gsap }) => {
        if (disposed) return;
        const x = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
        const y = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
        gsap.set(preview, { scale: 0.92 });
        api = {
          show: (event) => {
            gsap.set(preview, { x: event.clientX + 24, y: event.clientY - 70 });
            gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, overwrite: true });
          },
          move: (event) => {
            x(event.clientX + 24);
            y(event.clientY - 70);
          },
          hide: () => {
            gsap.to(preview, { opacity: 0, duration: 0.25, overwrite: true });
          },
        };
      }));
    const enter = (event: PointerEvent) => {
      void load().then(() => api?.show(event));
    };
    const move = (event: PointerEvent) => api?.move(event);
    const leave = () => api?.hide();
    next.addEventListener("pointerenter", enter);
    next.addEventListener("pointermove", move);
    next.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      next.removeEventListener("pointerenter", enter);
      next.removeEventListener("pointermove", move);
      next.removeEventListener("pointerleave", leave);
    });
  }

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
  };
});
