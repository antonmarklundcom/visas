#!/usr/bin/env node
/**
 * Converts the raw PNGs in deploy/imagery-src/ into the AVIF/WebP files the
 * site actually ships.
 *
 * Manual pre-step: generated images usually have to be downloaded by hand (an
 * agent sandbox can generate them but often cannot fetch the result URLs), so
 * save them into deploy/imagery-src/ under the filenames MANIFEST expects. Keep
 * that list and the site's image slots in step; the raw PNGs are git-ignored.
 *
 *     cd deploy && npm i sharp && node optimize-images.mjs
 *
 * Idempotent: re-running only touches files whose source changed.
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const srcDir = resolve(root, "deploy/imagery-src");

// slot, source filename, destination (relative to assets/img/), pixel widths.
// One entry per image slot the site has. Example shape — replace with this
// site's own slots (a service icon per service, the two homepage figures):
const MANIFEST = [
  // { slot: "icon-<service>", src: "icon-<service>.png", out: "services/<service>", widths: [128] },
  { slot: "hero-portrait", src: "hero-portrait.png", out: "team/portrait", widths: [420, 840] },
  { slot: "team-office",   src: "team-office.png",   out: "team/office",   widths: [420, 840] },
];

// The OG image stays a plain flattened PNG at a fixed size (Open Graph
// consumers don't reliably support AVIF/WebP), so it is handled separately.
const OG = { src: "og-default.png", out: "og-default.png", width: 1200, height: 630 };

async function convertOne({ slot, src, out, widths }) {
  const srcPath = resolve(srcDir, src);
  if (!existsSync(srcPath)) {
    console.warn(`skip ${slot}: ${src} not found in deploy/imagery-src/`);
    return;
  }
  const destDir = resolve(root, "assets/img", dirname(out));
  await mkdir(destDir, { recursive: true });
  const base = resolve(root, "assets/img", out);

  const image = sharp(srcPath);
  const width = Math.max(...widths);
  await image.clone().resize({ width }).avif({ quality: 62 }).toFile(`${base}.avif`);
  await image.clone().resize({ width }).webp({ quality: 72 }).toFile(`${base}.webp`);
  console.log(`wrote ${out}.avif + .webp (${width}px)`);
}

async function convertOg() {
  const srcPath = resolve(srcDir, OG.src);
  if (!existsSync(srcPath)) {
    console.warn(`skip og-default: ${OG.src} not found in deploy/imagery-src/`);
    return;
  }
  const destPath = resolve(root, "assets/img", OG.out);
  await sharp(srcPath)
    .resize({ width: OG.width, height: OG.height, fit: "cover" })
    .flatten({ background: "#0F1B2D" })
    .png({ compressionLevel: 9 })
    .toFile(destPath);
  console.log(`wrote ${OG.out} (${OG.width}x${OG.height})`);
}

for (const entry of MANIFEST) {
  await convertOne(entry);
}
await convertOg();
