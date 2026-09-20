#!/usr/bin/env node
/**
 * Prerender statico: renderizza ogni route con l'SSR bundle e scrive
 * dist/client/<route>/index.html con HTML completo, title e meta description
 * specifici. Richiede che `vite build` e `vite build --ssr` siano già stati
 * eseguiti (vedi script "build" in package.json).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const template = readFileSync(path.join(clientDir, "index.html"), "utf8");

const { render, routes, pageMeta } = await import(pathToFileURL(path.join(root, "dist", "ssr", "entry-server.js")).href);

function inject(template, html, meta) {
  return template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${meta.description}$2`);
}

for (const route of routes()) {
  const meta = pageMeta(route);
  const html = inject(template, render(route), meta);
  const dir = route === "/" ? clientDir : path.join(clientDir, ...route.split("/").filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
}

console.log(`Prerender completato: ${routes().length} pagine`);
