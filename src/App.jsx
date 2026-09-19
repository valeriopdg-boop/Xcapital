import { useEffect } from "react";
import {
  AboutPage,
  ContactPage,
  DetailPage,
  HomePage,
  HubPage,
  InsightPage,
  LegalPage,
  NotFoundPage,
  ServicesPage,
  TrackRecordPage,
} from "./PageTemplates.jsx";
import { SiteLayout } from "./SiteLayout.jsx";
import { useClientLocation } from "./router.jsx";
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

function resolvePage(pathname) {
  const path = normalizePath(pathname);
  if (path === "/") return { key: "home", element: <HomePage /> };
  if (path === "/chi-siamo/") return { key: "about", element: <AboutPage /> };
  if (path === "/services/") return { key: "services", element: <ServicesPage /> };

  const hub = serviceHubs.find((item) => item.path === path);
  if (hub) return { key: hub.path, element: <HubPage hub={hub} /> };

  const detail = detailPages.find((item) => item.path === path);
  if (detail) return { key: detail.path, element: <DetailPage page={detail} /> };

  if (path === "/track-record/") return { key: path, element: <TrackRecordPage /> };
  if (path.startsWith("/track-record/") && path.split("/").filter(Boolean).length === 2) {
    return { key: path, element: <TrackRecordPage slug={path.split("/").filter(Boolean)[1]} /> };
  }

  if (path === "/insight/") return { key: path, element: <InsightPage /> };
  if (path === "/education/") return { key: path, element: <InsightPage active="education" /> };
  if (path === "/category/press/") return { key: path, element: <InsightPage active="press" /> };
  if (path === "/webinar/") return { key: path, element: <InsightPage active="webinar" /> };
  if (path === "/contatti/") return { key: path, element: <ContactPage /> };
  if (path === "/prenota/") return { key: path, element: <ContactPage booking /> };
  if (path === "/privacy-policy/") return { key: path, element: <LegalPage type="privacy" /> };
  if (path === "/cookie-policy/") return { key: path, element: <LegalPage type="cookie" /> };

  return { key: "404", element: <NotFoundPage />, notFound: true };
}

export function App() {
  const location = useClientLocation();
  const pathname = location.split(/[?#]/)[0];
  const page = resolvePage(pathname);

  useEffect(() => {
    const path = normalizePath(pathname);
    const hub = serviceHubs.find((item) => item.path === path);
    const detail = detailPages.find((item) => item.path === path);
    document.title = titles[path] || (hub ? `${hub.label} | Delex Capital` : detail ? `${detail.title} | Delex Capital` : path.startsWith("/track-record/") ? "Operazione | Delex Capital" : "Pagina non trovata | Delex Capital");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", descriptions[path] || hub?.description || detail?.description || "Boutique indipendente di advisory per operazioni straordinarie, capitale ed esecuzione strategica.");
    document.documentElement.dataset.routeStatus = page.notFound ? "404" : "200";
  }, [page.notFound, pathname]);

  return <SiteLayout><div key={page.key}>{page.element}</div></SiteLayout>;
}
