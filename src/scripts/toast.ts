/** Small status message at the bottom of the screen. The element lives in BaseLayout: <div data-toast role="status">. */
let timer: number | undefined;

export function showToast(message: string, ms = 2000) {
  const el = document.querySelector<HTMLElement>("[data-toast]");
  if (!el) return;
  window.clearTimeout(timer);
  el.textContent = message;
  el.classList.add("is-on");
  timer = window.setTimeout(() => el.classList.remove("is-on"), ms);
}

/** Copies text, then shows "Copied ✓" (or the failure message). */
export async function copyText(text: string, okMessage: string, failMessage: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(okMessage);
  } catch {
    // Older browsers: fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    showToast(ok ? okMessage : failMessage);
  }
}
