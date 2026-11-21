// Checks the site copy against the art-director rules (docs: .claude/skills/portfolio-art-director/SKILL.md).
// Run: npm run copy-check
import { buildSync } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = path.join(root, "node_modules", ".copy-check.mjs");
buildSync({ entryPoints: [path.join(root, "src/data/content.ts")], bundle: true, format: "esm", platform: "node", outfile: tmp, logLevel: "silent", loader: { ".json": "json" } });
const mod = await import(pathToFileURL(tmp).href + "?t=" + Date.now());
fs.rmSync(tmp, { force: true });
const { content, projects, skillGroups } = mod;

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;
const problems = [];
const checked = { texts: 0 };
// Wording the owner approved word for word, even though it is one word over the budget.
const approved = new Set([
  "Smart queue system in microservices. I framed the project and led a team of 4.",
  "File d'attente intelligente en microservices. J'ai cadré le projet et dirigé une équipe de 4.",
]);
const over = (label, text, max) => {
  checked.texts += 1;
  if (words(text) > max && !approved.has(text)) problems.push(`${label}: ${words(text)} words (max ${max}) -> "${text}"`);
};

// Banned words (EN and the closest FR forms)
const banned = /\b(passionate|passionné|leverag\w*|seamless\w*|cutting-edge|robust solutions?|innovati\w+|journey|parcours professionnel|dive in|elevat\w+|empower\w*|unlock\w*|synerg\w+|world-class|state-of-the-art|game-?chang\w+)\b/i;
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const seen = new Set();
const scan = (value, where) => {
  if (typeof value === "string") {
    checked.texts += 1;
    const hit = value.match(banned);
    if (hit) problems.push(`banned word "${hit[0]}" in ${where}: "${value}"`);
    if (emoji.test(value.replace(/[✓✦●→↗↵·–—…]/gu, ""))) problems.push(`emoji in ${where}: "${value}"`);
    if (/\bI am an? [^.]* who loves\b/i.test(value)) problems.push(`"I am a ... who loves ..." in ${where}`);
  } else if (value && typeof value === "object" && !seen.has(value)) {
    seen.add(value);
    for (const [k, v] of Object.entries(value)) scan(v, `${where}.${k}`);
  }
};
scan(content, "content");
scan(projects, "projects");
scan(skillGroups, "skills");

for (const lang of ["en", "fr"]) {
  const t = content[lang];
  const h = t.hero;
  over(`${lang} hero headline`, `${h.lead} ${h.ship} ${h.words.reduce((a, b) => (a.length > b.length ? a : b))}`, 7);
  over(`${lang} hero sub-line`, h.sub, 20);
  for (const [k, title] of Object.entries({
    "projects.title": t.projects.title, "projects.allTitle": t.projects.allTitle, "skills.title": t.skills.title,
    "proSkills.title": t.proSkills.title, "pipeline.title": t.pipeline.title, "about.now.title": t.about.now.title,
    "about.pathTitle": t.about.pathTitle, "services.title": t.services.title, "contactPage.title": t.contactPage.title,
  })) over(`${lang} section title ${k}`, title, 5);
  t.proSkills.items.forEach((item) => over(`${lang} pro skill proof "${item.title}"`, item.proof, 12));
  t.pipeline.stages.forEach((stage) => over(`${lang} pipeline "${stage.title}"`, stage.line, 12));
  over(`${lang} services cta`, t.services.cta.body, 15);
  t.about.paragraphs.forEach((p, i) => over(`${lang} about paragraph ${i + 1}`, p, 40));
  over(`${lang} about total`, t.about.paragraphs.join(" "), 60);
}

for (const p of projects) {
  for (const lang of ["en", "fr"]) {
    over(`${lang} ${p.slug} hook`, p.hook[lang], 14);
    for (const key of ["problem", "solution", "result"]) if (p[key]) over(`${lang} ${p.slug} ${key}`, p[key][lang], 45);
    if (p.learning) over(`${lang} ${p.slug} learning`, p.learning[lang], 45);
    if (p.highlights[lang].length > 4) problems.push(`${lang} ${p.slug}: ${p.highlights[lang].length} highlights (max 4)`);
    p.highlights[lang].forEach((item, i) => over(`${lang} ${p.slug} highlight ${i + 1}`, item, 12));
  }
}

console.log(`Checked ${checked.texts} texts in EN and FR.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n- ` + problems.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("No problems: budgets and banned words are respected.");
}
