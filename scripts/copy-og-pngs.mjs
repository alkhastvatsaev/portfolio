#!/usr/bin/env node
/**
 * Local helper: after `next build`, copy extensionless OG bytes from `out/`
 * into `public/*.png` so the next deploy includes them via the static export.
 *
 * Why public/? On Vercel, `onBuildComplete` packages `/vercel/output` during
 * `next build` — post-build edits to `out/` are discarded. Files in `public/`
 * are included in that package.
 *
 * Usage: npm run build && node scripts/copy-og-pngs.mjs
 * Then commit the updated public/*.png if the design changed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const pairs = [
  ["out/opengraph-image", "public/opengraph-image.png"],
  ["out/twitter-image", "public/twitter-image.png"],
  ["out/fr/opengraph-image", "public/fr/opengraph-image.png"],
  ["out/fr/twitter-image", "public/fr/twitter-image.png"],
];

let copied = 0;
for (const [from, to] of pairs) {
  const src = path.resolve(root, from);
  const dest = path.resolve(root, to);
  if (!fs.existsSync(src)) {
    console.warn("skip (missing):", from);
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied += 1;
  console.log("copied", from, "→", to);
}

if (copied === 0) {
  console.error("No OG images copied — restore opengraph-image routes temporarily or run a prior build that emits out/*.");
  process.exit(1);
}
