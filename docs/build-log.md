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
