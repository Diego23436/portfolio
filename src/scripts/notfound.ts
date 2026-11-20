import { onPage } from "./lifecycle";
import { prefersReducedMotion } from "./motion";

/** 404 page: a terminal that types the missing path, then shows the way back. */
onPage<HTMLElement>("[data-notfound]", (root) => {
  const pathEl = root.querySelector<HTMLElement>("[data-path]");
  const lines = Array.from(root.querySelectorAll<HTMLElement>(".tl"));
  const back = root.querySelector<HTMLElement>(".nf-back");
  const path = window.location.pathname;
  if (pathEl) pathEl.textContent = path;
  if (prefersReducedMotion() || !lines.length) return;

  let disposed = false;
  const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
  const cmdTexts = new Map<HTMLElement, string>();
  lines.forEach((line) => {
    const tx = line.querySelector<HTMLElement>(".tx");
    if (line.dataset.kind === "cmd" && tx) cmdTexts.set(line, tx.textContent ?? "");
  });
  lines.forEach((line) => {
    line.style.visibility = "hidden";
    const tx = line.querySelector<HTMLElement>(".tx");
    if (tx && cmdTexts.has(line)) tx.textContent = "";
  });
  if (back) back.hidden = true;

  void (async () => {
    for (const line of lines) {
      if (disposed) return;
      line.style.visibility = "visible";
      const tx = line.querySelector<HTMLElement>(".tx");
      if (tx && cmdTexts.has(line)) {
        for (const char of cmdTexts.get(line) ?? "") {
          if (disposed) return;
          tx.textContent += char;
          await sleep(28);
        }
        await sleep(280);
      } else {
        await sleep(200);
      }
    }
    if (back && !disposed) back.hidden = false;
  })();

  return () => {
    disposed = true;
  };
});
