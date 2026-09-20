#!/usr/bin/env node
/**
 * Genera le immagini ottimizzate del sito:
 * - hero delle practice, ritagliate dalle foto del Company Profile (sorgente
 *   in design/deck-pages/, una pagina renderizzata per practice)
 * - versioni WebP delle foto principali in public/assets/
 *
 * Uso: node scripts/build-images.mjs
 */
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const deckDir = path.join(root, "design", "deck-pages");
const outDir = path.join(root, "public", "assets", "heroes");
mkdirSync(outDir, { recursive: true });

// Ritagli calibrati sulle pagine 1672x941 del Company Profile (Sept 2026).
const heroCrops = [
  { page: "page-06", out: "ma-advisory", left: 690, top: 320, width: 290, height: 290 },
  { page: "page-07", out: "corporate-finance", left: 692, top: 388, width: 280, height: 280 },
  { page: "page-08", out: "real-estate", left: 697, top: 355, width: 280, height: 280 },
  { page: "page-09", out: "energy-infrastructure", left: 780, top: 95, width: 385, height: 425 },
  { page: "page-10", out: "strategic-advisory", left: 830, top: 95, width: 480, height: 435 },
  { page: "page-11", out: "growth-venture", left: 760, top: 95, width: 640, height: 435 },
];

for (const crop of heroCrops) {
  const source = path.join(deckDir, `${crop.page}.jpeg`);
  if (!existsSync(source)) {
    console.warn(`Sorgente mancante, salto ${crop.out}: ${source}`);
    continue;
  }
  await sharp(source)
    .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
    .resize({ width: 1200 })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, `${crop.out}.webp`));
  console.log(`hero: ${crop.out}.webp`);
}

// Foto principali riutilizzate nel sito: conversione WebP full-width.
const photos = ["hero-team", "team-collaboration"];
for (const name of photos) {
  const source = path.join(root, "public", "assets", `${name}.png`);
  if (!existsSync(source)) continue;
  await sharp(source).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(root, "public", "assets", `${name}.webp`));
  console.log(`foto: ${name}.webp`);
}
