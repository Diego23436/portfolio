// Makes the website photo crops from your original photos.
// Run: npm run photos
//
// Originals (you replace these):   public/images/profile/forlan-portrait.jpg
//                                  public/images/profile/forlan-headshot.jpg
//                                  public/images/profile/forlan-fullbody.jpg
// Results (the site uses these):   public/images/profile/hero-front.webp, hero-back.webp, about.webp
//
// "face" is the position of your face in the ORIGINAL photo, in pixels.
// "ratio" is where the face should sit in the crop (0 = left/top, 1 = right/bottom).
// If you swap a photo, update its numbers.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "profile");

const jobs = [
  { src: "forlan-portrait.jpg", out: "hero-front.webp", width: 720, face: { x: 270, y: 530 }, ratio: { x: 0.4, y: 0.3 } },
  { src: "forlan-headshot.jpg", out: "hero-back.webp", width: 960, face: { x: 430, y: 300 }, ratio: { x: 0.45, y: 0.26 } },
  { src: "forlan-fullbody.jpg", out: "about.webp", width: 560, face: { x: 515, y: 500 }, ratio: { x: 0.5, y: 0.35 } },
];

for (const job of jobs) {
  const input = path.join(dir, job.src);
  const meta = await sharp(input).metadata();
  const width = Math.min(job.width, meta.width);
  const height = Math.round(width * 1.25); // 4:5
  const clamp = (value, max) => Math.max(0, Math.min(Math.round(value), max));
  const left = clamp(job.face.x - width * job.ratio.x, meta.width - width);
  const top = clamp(job.face.y - height * job.ratio.y, meta.height - height);
  await sharp(input)
    .extract({ left, top, width, height: Math.min(height, meta.height - top) })
    .webp({ quality: 82 })
    .toFile(path.join(dir, job.out));
  console.log(`${job.out}: ${width}x${height} (from ${job.src}, crop at ${left},${top})`);
}
