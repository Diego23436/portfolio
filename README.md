# Nk Forlan, portfolio

Source of **nkforlan.tech**: the portfolio of Nk Forlan, Full-Stack & DevOps Engineer in Douala, Cameroon.
English and French (`/en/`, `/fr/`). Built with Astro, Tailwind CSS, TypeScript and GSAP. It is a static site.

## Run it

```bash
npm install          # once
npm run dev          # http://127.0.0.1:4321/en/
npm run build        # builds the site into dist/
npm run preview      # serves dist/ on http://127.0.0.1:4321
```

Windows note: if a terminal shows your path with a lowercase drive letter (`c:\...`), the site would build without CSS.
`astro.config.mjs` already fixes this. On Linux (Cloudflare) the fix does nothing.

## Where things are

| What you want to change | File |
|---|---|
| Name, email, phone, links, photos, site address | `src/data/content.ts` → `profile` |
| All visible texts, English and French | `src/data/content.ts` → `content.en`, `content.fr` |
| Projects (hook, role, stack, metrics, diagram, links) | `src/data/projects.ts` |
| Skills, levels, and where each was used | `src/data/skills.ts` (`level`: `expert`, `advanced`, `working`; `usedIn`: project slugs) |
| Colours | CSS variables at the top of `src/styles/global.css` |
| Hero, marquee, pipeline, constellation, palette | `src/components/`, `src/styles/`, `src/scripts/` |

Words you must not invent are marked `TODO` in the data files. Search for `TODO` to see what is still missing.

## Photos

Put your files in `public/images/profile/`:

- `forlan-portrait.jpg`, `forlan-headshot.jpg`, `forlan-fullbody.jpg` (originals)
- `cutout.png`: you with a transparent background. **1200 × 1600 px or bigger** (PNG or WebP). It is the hero photo.

Then run:

```bash
npm run photos      # makes the optimized WebP crops and src/data/photos.generated.json
npm run og          # redraws the share image public/og.png (uses the cut-out)
```

Commit the generated files. Cloudflare does not run these scripts.

## Project covers

`npm run covers` redraws the 7 cover images in `public/images/projects/`. To use a real screenshot, put `<slug>.webp`
in that folder and change `image` in `src/data/projects.ts`.

## CV (PDF)

The CV is built from the same data as the site, so they never disagree.

```bash
npm run cv          # writes public/resume/Nk Forlan CV EN.pdf and Nk Forlan CV FR.pdf
```

The CV pages are `/en/cv/` and `/fr/cv/`. You can also open one and use **Print → Save as PDF**. Commit the PDFs.

## Checks

```bash
npm run copy-check  # word budgets and banned words for all texts, EN and FR
```

## Security headers and cache

`public/_headers` holds the security headers and the long cache for `/_astro/*` and `/images/*`.
At build time, `astro.config.mjs` writes the Content-Security-Policy into `dist/_headers`, with a hash for each inline script.
Test it locally with `node scripts/serve-dist.mjs` (serves `dist/` with these headers on port 4325).

Images are cached for one year. If you replace an image **without changing its file name**, visitors who already have it will
not see the new one. Give the new file a new name (for example `about-2.webp`) and update the data.

## Deploy on Cloudflare Pages

1. Push the repository to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose the repository.
3. Settings:
   - **Framework preset:** Astro (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22`
4. Save and deploy. The first build gives you `<project>.pages.dev`.
5. **Custom domain:** project → **Custom domains** → add `nkforlan.tech`. Add `www.nkforlan.tech` too and make it redirect to
   `https://nkforlan.tech` (Rules → Redirect Rules).
6. The footer shows the build hash from `CF_PAGES_COMMIT_SHA`, which Cloudflare sets for you.

`sharp`, `playwright` and `lighthouse` are only used on your computer (photos, covers, CV, share image, audits).
`npm run build` does not need them, because the generated WebP files and PDFs are committed.

## Contact form

The form posts to FormSubmit (`https://formsubmit.co/ajax/<formEmail>`). The first message sends one activation email to the
form address: click the link in it once. The address is `profile.formEmail` in `src/data/content.ts`.
