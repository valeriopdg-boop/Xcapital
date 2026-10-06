#!/usr/bin/env node
/**
 * Prerender statico: renderizza ogni route con l'SSR bundle e scrive
 * dist/client/<route>/index.html con HTML completo, title, meta description,
 * canonical, og per pagina e dati strutturati (BreadcrumbList, FAQPage).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const template = readFileSync(path.join(clientDir, "index.html"), "utf8");
const SITE_ORIGIN = "https://xcapital-ivory.vercel.app";

const { render, routes, pageMeta, serviceHubs } = await import(pathToFileURL(path.join(root, "dist", "ssr", "entry-server.js")).href);

function breadcrumbJsonLd(route, hub) {
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` }];
  if (hub) {
    items.push({ "@type": "ListItem", position: 2, name: "Servizi", item: `${SITE_ORIGIN}/servizi/` });
    items.push({ "@type": "ListItem", position: 3, name: hub.label, item: `${SITE_ORIGIN}${route}` });
  } else if (route !== "/") {
    items.push({ "@type": "ListItem", position: 2, name: route.split("/").filter(Boolean)[0], item: `${SITE_ORIGIN}${route}` });
  }
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

function faqJsonLd(hub) {
  if (!hub?.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function inject(template, html, meta, route, hub) {
  const jsonLd = [breadcrumbJsonLd(route, hub), faqJsonLd(hub)].filter(Boolean);
  return template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${meta.description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${meta.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${meta.description}$2`)
    .replace("</head>", `    <link rel="canonical" href="${SITE_ORIGIN}${route}" />\n    <meta property="og:url" content="${SITE_ORIGIN}${route}" />\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`);
}

for (const route of routes()) {
  const meta = pageMeta(route);
  const hub = serviceHubs.find((item) => item.path === route);
  const html = inject(template, render(route), meta, route, hub);
  const dir = route === "/" ? clientDir : path.join(clientDir, ...route.split("/").filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
}

console.log(`Prerender completato: ${routes().length} pagine`);
