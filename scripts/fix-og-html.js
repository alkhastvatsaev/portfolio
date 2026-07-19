#!/usr/bin/env node
/**
 * Next file-based OG metadata injects /opengraph-image?<hash> which Vercel
 * serves as application/octet-stream. Rewrite built HTML to the *.png copies.
 */
const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".txt")) {
      out.push(full);
    }
  }
  return out;
}

const root = path.resolve(__dirname, "..", "out");
const files = walk(root);
let touched = 0;

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  let after = before
    .replaceAll("/opengraph-image?", "/opengraph-image.png?")
    .replaceAll("/twitter-image?", "/twitter-image.png?")
    .replaceAll(
      "content=\"https://alkhastvatsaev.dev/opengraph-image\"",
      "content=\"https://alkhastvatsaev.dev/opengraph-image.png\"",
    )
    .replaceAll(
      "content=\"https://alkhastvatsaev.dev/twitter-image\"",
      "content=\"https://alkhastvatsaev.dev/twitter-image.png\"",
    )
    .replaceAll(
      "content=\"https://alkhastvatsaev.dev/fr/opengraph-image\"",
      "content=\"https://alkhastvatsaev.dev/fr/opengraph-image.png\"",
    )
    .replaceAll(
      "content=\"https://alkhastvatsaev.dev/fr/twitter-image\"",
      "content=\"https://alkhastvatsaev.dev/fr/twitter-image.png\"",
    )
    // relative / absolute without query
    .replaceAll('content="/opengraph-image"', 'content="/opengraph-image.png"')
    .replaceAll('content="/twitter-image"', 'content="/twitter-image.png"')
    .replaceAll(
      'content="/fr/opengraph-image"',
      'content="/fr/opengraph-image.png"',
    )
    .replaceAll(
      'content="/fr/twitter-image"',
      'content="/fr/twitter-image.png"',
    );

  // strip pointless query hashes after we rewrote to .png?... keep file clean
  after = after.replace(
    /(opengraph-image|twitter-image)\.png\?[a-f0-9]+/g,
    "$1.png",
  );

  if (after !== before) {
    fs.writeFileSync(file, after);
    touched += 1;
  }
}

console.log(`rewrote OG urls in ${touched} files`);
