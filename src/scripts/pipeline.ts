import { onPage } from "./lifecycle";
import { loadGsap, prefersReducedMotion } from "./motion";

/**
 * "How I ship": a pipeline that lights up stage by stage, then a terminal that types a deploy log.
 *  - desktop (1024px and up): the section is pinned and the scroll drives the light along the line
 *  - phone and tablet: a vertical timeline, each stage lights up as it reaches the middle of the screen (no pinning)
 *  - reduced motion: everything is lit and the log is shown in full
 */
onPage<HTMLElement>("[data-pipeline]", (root) => {
  if (prefersReducedMotion()) return;

  let disposed = false;
  let mm: { revert: () => void } | undefined;
  const cleanups: Array<() => void> = [];

  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
  const track = root.querySelector<HTMLElement>("[data-pipe-track]");
  const stage = root.querySelector<HTMLElement>("[data-pipe-stage]");
  const fill = root.querySelector<HTMLElement>("[data-pipe-fill]");
  const term = root.querySelector<HTMLElement>("[data-term]");
  if (!track || !stage || !term) return;
  // Reserve the pin's scroll space right away (see pipeline.css). Removed again if the animation cannot start.
  root.classList.add("will-pin");

  /* ---------- Terminal typing ---------- */
  const lineEls = Array.from(term.querySelectorAll<HTMLElement>(".tl"));
  const fullText = new Map<HTMLElement, string>();
  lineEls.forEach((line) => {
    if (line.dataset.kind === "cmd") fullText.set(line, line.querySelector(".tx")?.textContent ?? "");
  });
  let typed = false;

  const prepareLog = () => {
    lineEls.forEach((line) => {
      line.style.visibility = "hidden";
      const tx = line.querySelector(".tx");
      if (tx && fullText.has(line)) tx.textContent = "";
    });
  };
  const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

  const typeLog = async () => {
    if (typed) return;
    typed = true;
    for (const line of lineEls) {
      if (disposed) return;
      line.style.visibility = "visible";
      if (line.dataset.kind === "cmd") {
        const tx = line.querySelector<HTMLElement>(".tx")!;
        const cursor = document.createElement("span");
        cursor.className = "cur";
        tx.after(cursor);
        for (const char of fullText.get(line) ?? "") {
          if (disposed) return;
          tx.textContent += char;
          await sleep(30);
        }
        cursor.remove();
        await sleep(260);
      } else {
        await sleep(170);
        if (line.dataset.kind === "live") line.querySelector(".liv")?.classList.add("blink");
      }
    }
  };
  prepareLog();
  cleanups.push(() => {
    // Put the page back to its plain state (full log) when leaving, so a return visit starts clean.
    disposed = true;
    lineEls.forEach((line) => {
      line.style.visibility = "";
      line.querySelector(".cur")?.remove();
      if (fullText.has(line)) line.querySelector(".tx")!.textContent = fullText.get(line)!;
    });
  });

  const start = async () => {
    let lib: Awaited<ReturnType<typeof loadGsap>>;
    try {
      lib = await loadGsap({ scrollTrigger: true });
    } catch {
      root.classList.remove("will-pin");
      return;
    }
    const { gsap, ScrollTrigger } = lib;
    if (disposed || !ScrollTrigger) return;
    mm = gsap.matchMedia();

    /* ===== Desktop: pinned, scroll-driven ===== */
    mm.add("(min-width: 1024px)", () => {
      const nodes = steps.map((step) => step.querySelector<HTMLElement>("[data-node]")!);
      const texts = steps.map((step) => step.querySelector<HTMLElement>("[data-text]")!);
      const labels = steps.map((step) => step.querySelector<HTMLElement>(".pipe-label")!);

      gsap.set(fill, { scaleX: 0 });
      gsap.set(nodes, { opacity: 0.3, scale: 0.8 });
      gsap.set(texts, { opacity: 0, y: 14 });
      gsap.set(labels, { opacity: 0.78 });
      gsap.set(term, { opacity: 0, x: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top 66px",
          end: "+=250%",
          pin: true,
          pinSpacing: false, // the space is already reserved by CSS
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (!typed && self.progress > 0.88) void typeLog();
          },
        },
      });

      tl.to(fill, { scaleX: 1, duration: 6 }, 0);
      steps.forEach((_, i) => {
        tl.to(nodes[i], { opacity: 1, scale: 1.3, duration: 0.2, ease: "power2.out" }, i)
          .to(nodes[i], { scale: 1, duration: 0.2, ease: "power2.out" }, i + 0.2)
          .to(labels[i], { opacity: 1, duration: 0.3 }, i)
          .to(texts[i], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, i);
        if (i > 0) tl.to(texts[i - 1], { opacity: 0.8, duration: 0.3 }, i);
      });
      tl.to(term, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, 6.2);
      tl.to({}, { duration: 0.8 }, 6.2); // hold at the end so the log has time to type

      return () => {
        // gsap.matchMedia reverts the tweens and the pin for us
      };
    });

    /* ===== Tablet and phone: vertical timeline ===== */
    mm.add("(max-width: 1023px)", () => {
      let frame = 0;
      const update = () => {
        frame = 0;
        const middle = window.innerHeight * 0.62;
        steps.forEach((step) => step.classList.toggle("is-lit", step.getBoundingClientRect().top < middle));
        const rect = track.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (middle - rect.top) / rect.height));
        track.style.setProperty("--p", progress.toFixed(3));
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) void typeLog();
        },
        { threshold: 0.6 },
      );
      observer.observe(term);

      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        observer.disconnect();
        if (frame) cancelAnimationFrame(frame);
        steps.forEach((step) => step.classList.remove("is-lit"));
        track.style.removeProperty("--p");
      };
    });
  };

  // The animation code loads only when the section is within about two screens (it is far below the first screen).
  const near = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        near.disconnect();
        void start();
      }
    },
    { rootMargin: "1800px 0px" },
  );
  near.observe(root);
  cleanups.push(() => near.disconnect());

  return () => {
    disposed = true;
    root.classList.remove("will-pin");
    mm?.revert();
    cleanups.forEach((fn) => fn());
  };
});
