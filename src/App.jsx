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
  TrackRecordPage,
  XCapitalPointPage,
} from "./PageTemplates.jsx";
import { SiteLayout } from "./SiteLayout.jsx";
import { useClientLocation } from "./router.jsx";
import { detailPages, normalizePath, serviceHubs } from "./siteRoutes.js";

const titles = {
  "/": "XCapital | Strategia, capitale, persone",
  "/chi-siamo/": "Chi siamo | XCapital",
  "/track-record/": "Track Record | XCapital",
  "/insight/": "Insight e Risorse | XCapital",
  "/education/": "Pubblicazioni | XCapital",
  "/category/press/": "Blog e News | XCapital",
  "/webinar/": "Webinar | XCapital",
  "/contatti/": "Contatti | XCapital",
  "/prenota/": "Prenota una call | XCapital",
  "/privacy-policy/": "Privacy Policy | XCapital",
  "/cookie-policy/": "Cookie Policy | XCapital",
  "/xcapital-point/": "XCapital Point",
};

const descriptions = {
  "/": "XCapital affianca imprenditori e manager con competenze strategiche, finanziarie e operative.",
  "/chi-siamo/": "Approccio, competenze e metodo del team XCapital.",
  "/track-record/": "L'archivio delle operazioni XCapital pubblicabili dopo verifica e autorizzazione.",
  "/insight/": "Analisi, risorse e approfondimenti di XCapital.",
  "/contatti/": "Contatta XCapital per un primo confronto sul tuo progetto.",
  "/prenota/": "Richiedi un primo confronto con il team XCapital.",
  "/privacy-policy/": "Informazioni sul trattamento dei dati personali nel sito XCapital.",
  "/cookie-policy/": "Informazioni sull'uso di cookie e tecnologie analoghe nel sito XCapital.",
};

function resolvePage(pathname) {
  const path = normalizePath(pathname);
  if (path === "/") return { key: "home", element: <HomePage /> };
  if (path === "/chi-siamo/") return { key: "about", element: <AboutPage /> };

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
  if (path === "/xcapital-point/") return { key: path, element: <XCapitalPointPage /> };

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
    document.title = titles[path] || (hub ? `${hub.label} | XCapital` : detail ? `${detail.title} | XCapital` : path.startsWith("/track-record/") ? "Operazione | XCapital" : "Pagina non trovata | XCapital");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", descriptions[path] || hub?.description || detail?.description || "Competenze integrate per le decisioni strategiche dell'impresa.");
    document.documentElement.dataset.routeStatus = page.notFound ? "404" : "200";
  }, [page.notFound, pathname]);

  return <SiteLayout><div key={page.key}>{page.element}</div></SiteLayout>;
}
