import { onPage } from "./lifecycle";

/**
 * Contact page: the form opens with a smooth height animation, validates inline,
 * and sends to FormSubmit. Copy-email is handled by foundation.ts (data-copy-text).
 */
onPage<HTMLElement>("[data-cform]", (panel) => {
  const toggle = document.querySelector<HTMLButtonElement>("[data-form-toggle]");
  const form = panel.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!toggle || !form) return;

  const act = toggle.querySelector<HTMLElement>("[data-form-act]");
  const submit = form.querySelector<HTMLButtonElement>("[data-submit]")!;
  const sent = form.querySelector<HTMLElement>("[data-sent]")!;
  const failure = form.querySelector<HTMLElement>("[data-send-error]")!;
  const names = ["name", "email", "subject", "message"] as const;

  const setOpen = (open: boolean) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    // Closed content must not be reachable with the keyboard.
    panel.toggleAttribute("inert", !open);
    if (act) act.textContent = open ? "–" : "+";
    if (open) window.setTimeout(() => form.querySelector<HTMLInputElement>("input[name='name']")?.focus({ preventScroll: true }), 350);
  };
  // Start closed (without JS the form is open, because the panel only collapses under .js).
  setOpen(false);
  const onToggle = () => setOpen(!panel.classList.contains("is-open"));
  toggle.addEventListener("click", onToggle);

  /* ---- Inline validation ---- */
  const message = (key: (typeof names)[number]) => form.dataset[`inv${key[0].toUpperCase()}${key.slice(1)}`] ?? "";
  const validate = (key: (typeof names)[number]): boolean => {
    const input = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
    const value = input.value.trim();
    const ok = key === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : value.length > 0;
    const field = input.closest<HTMLElement>(".field")!;
    const err = field.querySelector<HTMLElement>(".field-err")!;
    if (ok) {
      field.removeAttribute("data-invalid");
      input.removeAttribute("aria-invalid");
      err.textContent = "";
    } else {
      field.setAttribute("data-invalid", "");
      input.setAttribute("aria-invalid", "true");
      err.textContent = message(key);
    }
    return ok;
  };
  names.forEach((key) => {
    const input = form.elements.namedItem(key) as HTMLElement;
    input.addEventListener("blur", () => {
      if ((input as HTMLInputElement).value.trim() !== "" || input.closest(".field")?.hasAttribute("data-invalid")) validate(key);
    });
    input.addEventListener("input", () => {
      if (input.closest(".field")?.hasAttribute("data-invalid")) validate(key);
    });
  });

  /* ---- Send ---- */
  const onSubmit = async (event: Event) => {
    event.preventDefault();
    sent.hidden = true;
    failure.hidden = true;
    const results = names.map(validate);
    if (results.includes(false)) {
      (form.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus();
      return;
    }
    const data = new FormData(form);
    if (String(data.get("_honey") ?? "").trim()) return; // bots fill this hidden field

    const payload = Object.fromEntries(data.entries()) as Record<string, string>;
    payload._subject = String(data.get("subject") ?? "");
    payload._replyto = String(data.get("email") ?? "");

    const label = form.dataset.submitLabel ?? submit.textContent ?? "";
    submit.disabled = true;
    submit.textContent = form.dataset.sending ?? "...";
    try {
      const response = await fetch(form.dataset.endpoint ?? "", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("form failed");
      form.reset();
      names.forEach((key) => {
        (form.elements.namedItem(key) as HTMLElement).closest(".field")?.removeAttribute("data-invalid");
      });
      sent.hidden = false;
    } catch {
      failure.textContent = form.dataset.error ?? "";
      failure.hidden = false;
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  };
  form.addEventListener("submit", onSubmit);

  return () => {
    toggle.removeEventListener("click", onToggle);
    form.removeEventListener("submit", onSubmit);
  };
});
