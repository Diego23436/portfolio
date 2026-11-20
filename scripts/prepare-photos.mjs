// Makes the optimized website photos from your originals.
// Run: npm run photos
//
// Originals (you replace these):   public/images/profile/forlan-portrait.jpg
//                                  public/images/profile/forlan-headshot.jpg
//                                  public/images/profile/forlan-fullbody.jpg
//                                  public/images/profile/cutout.png   (transparent background, 1200x1600 or bigger)
// Results (the site uses these):   hero-front.webp, hero-back.webp, about.webp
//                                  cutout-600.webp, cutout-1200.webp (only sizes your original can support)
// Sizes are written to src/data/photos.generated.json, so you never type width/height by hand.
//
// For the crops, "face" is the position of your face in the ORIGINAL photo, in pixels.
// "ratio" is where the face should sit in the crop (0 = left/top, 1 = right/bottom).
// If you swap a photo, update its numbers.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "images", "profile");

const crops = [
  { src: "forlan-portrait.jpg", out: "hero-front.webp", width: 720, face: { x: 270, y: 530 }, ratio: { x: 0.4, y: 0.3 } },
  { src: "forlan-headshot.jpg", out: "hero-back.webp", width: 960, face: { x: 430, y: 300 }, ratio: { x: 0.45, y: 0.26 } },
  { src: "forlan-fullbody.jpg", out: "about.webp", width: 560, face: { x: 515, y: 500 }, ratio: { x: 0.5, y: 0.35 } },
];

const meta = { cutout: null };

for (const job of crops) {
  const input = path.join(dir, job.src);
  const info = await sharp(input).metadata();
  const width = Math.min(job.width, info.width);
  const height = Math.round(width * 1.25); // 4:5
  const clamp = (value, max) => Math.max(0, Math.min(Math.round(value), max));
  const left = clamp(job.face.x - width * job.ratio.x, info.width - width);
  const top = clamp(job.face.y - height * job.ratio.y, info.height - height);
  await sharp(input)
    .extract({ left, top, width, height: Math.min(height, info.height - top) })
    .webp({ quality: 82 })
    .toFile(path.join(dir, job.out));
  console.log(`${job.out}: ${width}x${height} (from ${job.src})`);
}

// ---- Cut-out (transparent PNG/WebP). Optional: the hero falls back to hero-front.webp without it.
const cutoutSource = ["cutout.png", "cutout.webp"].map((name) => path.join(dir, name)).find((file) => fs.existsSync(file));

if (cutoutSource) {
  const info = await sharp(cutoutSource).metadata();
  const widths = [...new Set([600, 1200].map((w) => Math.min(w, info.width)))];
  const variants = [];
  for (const width of widths) {
    const file = `cutout-${width}.webp`;
    const out = await sharp(cutoutSource)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 100 })
      .toFile(path.join(dir, file));
    variants.push({ file, width: out.width, height: out.height });
    console.log(`${file}: ${out.width}x${out.height} (from ${path.basename(cutoutSource)}, ${Math.round(out.size / 1024)} KB)`);
  }
  // Remove old variants that this source cannot make any more.
  for (const old of fs.readdirSync(dir).filter((name) => /^cutout-\d+\.webp$/.test(name))) {
    if (!variants.some((variant) => variant.file === old)) fs.rmSync(path.join(dir, old));
  }
  meta.cutout = { source: path.basename(cutoutSource), sourceWidth: info.width, sourceHeight: info.height, variants };
  if (info.width < 1200) {
    console.log(`\nNOTE: the cut-out is only ${info.width}px wide. Use 1200x1600 or bigger so it stays sharp on retina screens.`);
  }
} else {
  console.log("No cutout.png found: the hero will use hero-front.webp.");
}

fs.writeFileSync(path.join(root, "src", "data", "photos.generated.json"), JSON.stringify(meta, null, 2) + "\n");
console.log("Wrote src/data/photos.generated.json");
