#!/usr/bin/env node
/**
 * Genera public/sitemap.xml partendo dalle route note (siteRoutes) e dagli
 * articoli generati. Eseguito da prebuild, dopo build-articles.mjs.
 * Aggiornare SITE_ORIGIN quando il dominio definitivo è collegato.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_ORIGIN = "https://xcapital-ivory.vercel.app";

const { serviceHubs, transactions } = await import(path.join(root, "src", "siteRoutes.js"));
const articles = JSON.parse(readFileSync(path.join(root, "src", "generated", "articles.json"), "utf8"));

const staticRoutes = [
  "/",
  "/chi-siamo/",
  "/servizi/",
  ...serviceHubs.map((hub) => hub.path),
  "/track-record/",
  ...transactions.map((t) => `/track-record/${t.slug}/`),
  "/risorse/",
  "/risorse/rassegna-stampa/",
  ...articles.map((a) => `/risorse/approfondimenti/${a.slug}/`),
  "/contatti/",
  "/prenota/",
  "/privacy-policy/",
  "/cookie-policy/",
  "/xcapital-point/",
];

const today = new Date().toISOString().slice(0, 10);
const urls = staticRoutes
  .map((route) => `  <url><loc>${SITE_ORIGIN}${route}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");

writeFileSync(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`Sitemap generata: ${staticRoutes.length} URL`);
