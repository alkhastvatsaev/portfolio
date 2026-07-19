#!/usr/bin/env node
/**
 * Static export emits extensionless opengraph-image files served as
 * application/octet-stream on Vercel — LinkedIn/Post Inspector reject that.
 * Duplicate as *.png so crawlers get a proper image URL + Content-Type.
 */
const fs = require("fs");
const path = require("path");

const pairs = [
  ["out/opengraph-image", "out/opengraph-image.png"],
  ["out/twitter-image", "out/twitter-image.png"],
  ["out/fr/opengraph-image", "out/fr/opengraph-image.png"],
  ["out/fr/twitter-image", "out/fr/twitter-image.png"],
];

let copied = 0;
for (const [from, to] of pairs) {
  const src = path.resolve(__dirname, "..", from);
  const dest = path.resolve(__dirname, "..", to);
  if (!fs.existsSync(src)) {
    console.warn("skip (missing):", from);
    continue;
  }
  fs.copyFileSync(src, dest);
  copied += 1;
  console.log("copied", from, "→", to);
}

if (copied === 0) {
  console.error("No OG images copied — was `next build` run?");
  process.exit(1);
}
