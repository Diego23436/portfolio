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

  /* ---------- Architecture diagram draws itself ---------- */
  const arch = root.querySelector<HTMLElement>("[data-arch]");
  if (arch && !reduced) {
    void (async () => {
      const { gsap, ScrollTrigger } = await loadGsap({ scrollTrigger: true });
      if (disposed || !ScrollTrigger) return;
      const edges = arch.querySelectorAll("[data-edge]");
      const nodes = arch.querySelectorAll("[data-node]");
      gsap.set(edges, { strokeDashoffset: 1 });
      gsap.set(nodes, { opacity: 0, y: 10 });
      const trigger = ScrollTrigger.create({
        trigger: arch,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(nodes, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 });
          gsap.to(edges, { strokeDashoffset: 0, duration: 0.8, stagger: 0.15, ease: "power2.inOut", delay: 0.25 });
        },
      });
      cleanups.push(() => trigger.kill());
    })();
  }

  /* ---------- Next project preview follows the cursor (mouse only) ---------- */
  const next = root.querySelector<HTMLElement>("[data-next]");
  const preview = root.querySelector<HTMLElement>("[data-next-preview]");
  if (next && preview && hasFinePointer() && !reduced) {
    void (async () => {
      const { gsap } = await loadGsap();
      if (disposed) return;
      const x = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        x(event.clientX + 24);
        y(event.clientY - 70);
      };
      const enter = (event: PointerEvent) => {
        gsap.set(preview, { x: event.clientX + 24, y: event.clientY - 70 });
        gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, overwrite: true });
      };
      const leave = () => gsap.to(preview, { opacity: 0, duration: 0.25, overwrite: true });
      gsap.set(preview, { scale: 0.92 });
      next.addEventListener("pointerenter", enter);
      next.addEventListener("pointermove", move);
      next.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        next.removeEventListener("pointerenter", enter);
        next.removeEventListener("pointermove", move);
        next.removeEventListener("pointerleave", leave);
      });
    })();
  }

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
  };
});
