import articles from "./generated/articles.json";
import { detailPages, normalizePath, serviceHubs } from "./siteRoutes.js";

const titles = {
  "/": "Delex Capital | Independent Advisory. Proprietary Intelligence. Execution.",
  "/chi-siamo/": "Chi siamo | Delex Capital",
  "/services/": "Le practice | Delex Capital",
  "/track-record/": "Track Record | Delex Capital",
  "/insight/": "Insight e Risorse | Delex Capital",
  "/education/": "Pubblicazioni | Delex Capital",
  "/category/press/": "Blog e News | Delex Capital",
  "/webinar/": "Webinar | Delex Capital",
  "/contatti/": "Contatti | Delex Capital",
  "/prenota/": "Prenota una call | Delex Capital",
  "/privacy-policy/": "Privacy Policy | Delex Capital",
  "/cookie-policy/": "Cookie Policy | Delex Capital",
};

const descriptions = {
  "/": "Delex Capital è una boutique indipendente di advisory: M&A, corporate finance, real estate, energy & infrastructure e strategic advisory per il mid-market italiano.",
  "/chi-siamo/": "Competenze senior, execution integrata e intelligence proprietaria: chi è Delex Capital.",
  "/services/": "Le practice Delex Capital: M&A advisory, corporate finance, real estate, energy & infrastructure, strategic e growth advisory.",
  "/track-record/": "Una selezione delle operazioni seguite dal team Delex Capital.",
  "/insight/": "Analisi, risorse e approfondimenti di Delex Capital.",
  "/contatti/": "Contatta Delex Capital per un primo confronto sul tuo progetto.",
  "/prenota/": "Richiedi un primo confronto con il team Delex Capital.",
  "/privacy-policy/": "Informazioni sul trattamento dei dati personali nel sito Delex Capital.",
  "/cookie-policy/": "Informazioni sull'uso di cookie e tecnologie analoghe nel sito Delex Capital.",
};

/** Meta title/description per una route, condivisi tra App (client) e prerender (build). */
export function pageMeta(pathname) {
  const path = normalizePath(pathname);
  const hub = serviceHubs.find((item) => item.path === path);
  const detail = detailPages.find((item) => item.path === path);
  const article = path.startsWith("/insight/") ? articles.find((item) => item.slug === path.split("/").filter(Boolean)[1]) : undefined;

  const title = titles[path]
    || (article ? `${article.title} | Delex Capital` : null)
    || (hub ? `${hub.label} | Delex Capital` : null)
    || (detail ? `${detail.title} | Delex Capital` : null)
    || (path.startsWith("/track-record/") ? "Operazione | Delex Capital" : null)
    || "Pagina non trovata | Delex Capital";

  const description = descriptions[path]
    || article?.excerpt
    || hub?.description
    || detail?.description
    || "Boutique indipendente di advisory per operazioni straordinarie, capitale ed esecuzione strategica.";

  return { title, description };
}
