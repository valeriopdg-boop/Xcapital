import articles from "./generated/articles.json";
import { normalizePath, serviceHubs, transactions } from "./siteRoutes.js";

const titles = {
  "/": "Advisory M&A, finanza straordinaria, immobiliare ed energia | Delex Capital",
  "/chi-siamo/": "Chi siamo: l’Advisory Board | Delex Capital",
  "/servizi/": "Le 7 aree di servizio | Delex Capital",
  "/track-record/": "Le nostre operazioni | Delex Capital",
  "/risorse/": "Approfondimenti e risorse | Delex Capital",
  "/risorse/rassegna-stampa/": "Rassegna stampa | Delex Capital",
  "/contatti/": "Contatti | Delex Capital",
  "/prenota/": "Prenota una call gratuita | Delex Capital",
  "/prenota/grazie/": "Grazie | Delex Capital",
  "/privacy-policy/": "Privacy Policy | Delex Capital",
  "/cookie-policy/": "Cookie Policy | Delex Capital",
  "/xcapital-point/": "Programma di affiliazione | Delex Capital",
};

const descriptions = {
  "/": "Boutique indipendente di advisory per M&A, finanza straordinaria, immobiliare ed energia: affianchiamo imprenditori, aziende e investitori. Prima call gratuita.",
  "/chi-siamo/": "L’Advisory Board e il team di Delex Capital: competenze senior, esecuzione integrata e intelligence proprietaria per il mid-market italiano.",
  "/servizi/": "Le 7 aree di servizio Delex Capital: M&A, finanza straordinaria, immobiliare, energia, advisory strategico, startup e marketing.",
  "/track-record/": "Operazioni concluse e mandati in corso di Delex Capital: M&A, corporate finance, real estate, energia e growth capital.",
  "/risorse/": "Analisi e approfondimenti di Delex Capital su M&A, capitale, mercati e operazioni straordinarie.",
  "/risorse/rassegna-stampa/": "Le uscite stampa di Delex Capital 2020–2026: Il Sole 24 Ore, Giornale di Brescia, CrowdFundMe e altre testate.",
  "/contatti/": "Contatta Delex Capital per un primo confronto sul tuo progetto. Sedi a Brescia e Fidenza.",
  "/prenota/": "Richiedi una prima call gratuita di 45 minuti con il team Delex Capital.",
  "/privacy-policy/": "Informazioni sul trattamento dei dati personali nel sito Delex Capital.",
  "/cookie-policy/": "Informazioni sull'uso di cookie e tecnologie analoghe nel sito Delex Capital.",
  "/xcapital-point/": "Il programma territoriale e di affiliazione di Delex Capital.",
};

/** Meta title/description per una route, condivisi tra App (client) e prerender (build). */
export function pageMeta(pathname) {
  const path = normalizePath(pathname);
  const hub = serviceHubs.find((item) => item.path === path);
  const article = path.startsWith("/risorse/approfondimenti/") ? articles.find((item) => item.slug === path.split("/").filter(Boolean)[2]) : undefined;
  const transaction = path.startsWith("/track-record/") ? transactions.find((item) => item.slug === path.split("/").filter(Boolean)[1]) : undefined;

  const title = titles[path]
    || (article ? `${article.title} | Delex Capital` : null)
    || (hub ? hub.seoTitle : null)
    || (transaction ? `${transaction.client} – ${transaction.type} | Delex Capital` : null)
    || "Pagina non trovata | Delex Capital";

  const description = descriptions[path]
    || article?.excerpt
    || hub?.seoDescription
    || (transaction ? `${transaction.client}: ${transaction.type} seguita da Delex Capital come ${transaction.role}. Area: ${transaction.area}.` : null)
    || "Boutique indipendente di advisory per operazioni straordinarie, capitale ed esecuzione strategica.";

  return { title, description };
}
