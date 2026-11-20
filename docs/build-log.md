# Build log

Short log of each step. Newest at the bottom.

## Step 0: Rulebook
- Updated `.claude/skills/portfolio-art-director/SKILL.md` to the silver palette (accent `#94A3B8` dark / `#475569` light, white for headlines and primary buttons, no blue, lime only for live states).
- Checked: no unwanted "blue" left in the file (the only mention is the rule "No blue anywhere").
- Commit: `Update art-director skill to silver palette`.

## Step 3: Hero + marquee
- Done: new hero (status label, Douala clock, rotating headline, buttons, counters, cut-out photo stage, 3 chips, tilt, magnetic buttons, entrance timeline) and the role marquee (2 rows, scroll-velocity speed, hover pause).
- Checked: `npm run build` passes. 28 browser checks pass (rotation, counters, copy email + toast, magnetic max 8px, tilt, no sideways scroll at 1440/390/360/320, chips inside the phone screen, reduced motion, page change without replaying the entrance). Screenshots and a frame strip are in `docs/preview/`. Animation JS is about 46 KB gzip.
- Bugs found by looking at pictures and fixed: (1) the headline was invisible because GSAP read the CSS start position as pixels; (2) on phones the photo kept its desktop grid column and sat off screen; (3) the next rotating word peeked out under the current one; (4) a page change showed an empty hero until its script loaded (the hidden start state now exists only on the first page load of a visit).
- Open: the cut-out is only 433 px wide (soft on retina). The old project cover SVGs are still blue, they are redone in Step 4. Glow options A (silver) and B (cold tint `#CBD5E1`) wait for the owner's choice; the tint rule is `.hero--tint` in `hero.css`.

## Step 4: Projects
- Done: new project data (hook, tag, year, categories, true metrics, architecture, result, short role), 7 designed silver covers (`npm run covers`), home bento (Stocky 2x2, Oasis-Doc, Easy Klin, SmartQueue wide), projects page with filter chips (GSAP Flip, `?filter=` in the URL, all projects shown without JS), rebuilt case study (View Transition morph, metrics, sticky nav, self-drawing architecture diagram, scroll progress, next-project hover preview).
- Checked: build passes. 31 browser checks pass (tile is one real link, hover strip and arrow, page change without reload, filters and URL, no-JS, diagram draws, side nav, progress bar, no overflow at 390 on 6 pages). Opened screenshots of projects (desktop dark/light, phone), 3 case studies, 4 diagrams in dark/light and EN/FR, bento on desktop and phone.
- Bugs found by pixel checks and fixed: diagram boxes overlapped and the first box was clipped (now sized from the label and the row gap, kept inside the drawing); the meta row repeated words ("TEAM TEAM OF 3"); nodes were too close for arrows (positions now use the full width).
- Open (TODO in data): Stocky status/repo/demo, SmartQueue stack/repo, years for most projects, Oasis-Doc/Easy Klin/SmartQueue status. "Result" and "Learning" texts are drafts from true facts, for the owner to review.

## Step 5: "How I ship" pipeline + terminal
- Done: 7-stage pipeline on Home (Spec, ERD, Tickets, Code, Review, CI, Deploy) with one line and one proof each, EN/FR. Desktop: pinned for 2.5 screens, a light travels along the line, each stage lights and the earlier text dims, Deploy turns lime, then a terminal types a deploy log. Phone/tablet: vertical timeline, stages light up in the middle of the screen, no pinning, the log types when it is visible. Reduced motion: all lit, full log. "How I Work" removed from About.
- Checked: build passes. 17 browser checks pass (pin, stage states at 0/20/55/90/100%, scroll back, one pin after a page change, no console errors, reduced motion, phone states, no overflow). Opened screenshots: desktop dark at 5 scroll points, desktop light, French reduced motion, phone at 3 scroll points.
- Bug found by looking: the pinned section was only as tall as its content (empty half screen). Now it fills the screen under the header.
- Open (TODO in data): the terminal numbers (12.4s, 48 passed) are illustrative, marked `illustrative: true` in `deployLog`.

## Step 6: Skills
- Done: `usedIn` on every skill (only from true facts, unknown = empty). New stack constellation: clusters laid out at build time (deterministic spiral, no runtime randomness), logo size by level, slow CSS float, faint lines inside each cluster, hover/focus tooltip (name, level dots, links to the projects), lines to project pills, group filter chips, keyboard (Tab, Esc), screen-reader list. Phone/tablet: grouped grid + bottom sheet. Professional skills are now a numbered editorial list with a clip-path wipe. Home shows a compact map (22 logos, no "working knowledge") and 4 list rows; About shows the full map (36 logos) and 8 rows. Mobile logo merged into the Frontend cluster.
- Checked: build passes. 27 browser checks pass (22 / 36 logos, no overlap and all inside the canvas by geometry, no logo on a group label, tooltip content and links, dimming, lines, pills, tooltip stays open under the mouse, keyboard, filter, wipe reveal, reduced motion, phone grid and sheet, no overflow, no console errors). Opened screenshots: home and about (dark), FR about (light) with hover, phone grid and sheet, professional list desktop and phone.
- Bugs found by pictures and fixed: logos touched when two large ones were neighbours; project pills at the bottom collided (now short names); the wipe never started because browsers do not report a fully clipped element as visible (the parent is observed now); the sheet Close button had no style on pages without the projects CSS (buttons are global now).
- Fact fix: the Easy Klin diagram showed "PostgreSQL", which was never given. It is a generic "Database" node now (TODO in data).
- Open (TODO): `usedIn` is empty for JavaScript, FastAPI, CinetPay, MinIO, Kubernetes, networking, prompt engineering, ElevenLabs, LaTeX until Forlan says where they were used.
