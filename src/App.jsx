import { useEffect } from "react";
import {
  AboutPage,
  ArticlePage,
  ContactPage,
  GraziePage,
  HomePage,
  HubPage,
  LegalPage,
  NotFoundPage,
  RassegnaStampaPage,
  RisorsePage,
  ServicesPage,
  TrackRecordPage,
  XCapitalPointPage,
} from "./PageTemplates.jsx";
import { SiteLayout } from "./SiteLayout.jsx";
import { useClientLocation } from "./router.jsx";
import { pageMeta } from "./pageMeta.js";
import { normalizePath, serviceHubs } from "./siteRoutes.js";

// Redirect lato client dagli indirizzi precedenti (i 301 SEO sono in vercel.json).
const LEGACY_REDIRECTS = {
  "/services/": "/servizi/",
  "/ma-advisory/": "/servizi/fusioni-acquisizioni/",
  "/corporate-finance/": "/servizi/finanza-raccolta-capitali/",
  "/real-estate/": "/servizi/immobiliare/",
  "/energy-infrastructure/": "/servizi/energia-infrastrutture/",
  "/strategic-advisory/": "/servizi/advisory-strategico/",
  "/growth-venture/": "/servizi/crescita-startup/",
  "/insight/": "/risorse/",
  "/insight/2024-11-15-adattamento-analisi-startup/": "/risorse/approfondimenti/adattamento-analisi-startup/",
  "/insight/2024-09-25-safe-per-pmi-innovative/": "/risorse/approfondimenti/safe-per-pmi-innovative/",
  "/education/": "/risorse/",
  "/category/press/": "/risorse/",
  "/webinar/": "/risorse/",
  "/track-record/industrial-sell-side/": "/track-record/#mandati-in-corso",
  "/track-record/strategic-buy-side/": "/track-record/#mandati-in-corso",
  "/track-record/hospitality-asset-sale/": "/track-record/#mandati-in-corso",
  "/track-record/energy-project-financing/": "/track-record/#mandati-in-corso",
  "/track-record/growth-capital-round/": "/track-record/#mandati-in-corso",
  "/track-record/iride-acque-secondo-round/": "/track-record/iride-acque-2-round/",
  "/track-record/iride-acque-primo-round/": "/track-record/iride-acque-1-round/",
  "/track-record/socopet-terzo-round/": "/track-record/socopet-3-round/",
  "/track-record/socopet-secondo-round/": "/track-record/socopet-2-round/",
  "/track-record/wearena-secondo-round/": "/track-record/wearena-2-round/",
  "/track-record/royal-primo-round/": "/track-record/royal-1-round/",
  "/track-record/ellemme-minibond-uno/": "/track-record/ellemme-minibond-1-milione/",
  "/track-record/ellemme-minibond-cinque/": "/track-record/ellemme-minibond-5-milioni/",
};

function resolvePage(pathname) {
  const path = normalizePath(pathname);
  if (path === "/") return { key: "home", element: <HomePage /> };
  if (path === "/chi-siamo/") return { key: "about", element: <AboutPage /> };
  if (path === "/servizi/") return { key: "servizi", element: <ServicesPage /> };

  const hub = serviceHubs.find((item) => item.path === path);
  if (hub) return { key: hub.path, element: <HubPage hub={hub} /> };

  if (path === "/track-record/") return { key: path, element: <TrackRecordPage /> };
  if (path.startsWith("/track-record/") && path.split("/").filter(Boolean).length === 2) {
    return { key: path, element: <TrackRecordPage slug={path.split("/").filter(Boolean)[1]} /> };
  }

  if (path === "/risorse/") return { key: path, element: <RisorsePage /> };
  if (path === "/risorse/rassegna-stampa/") return { key: path, element: <RassegnaStampaPage /> };
  if (path.startsWith("/risorse/approfondimenti/") && path.split("/").filter(Boolean).length === 3) {
    return { key: path, element: <ArticlePage slug={path.split("/").filter(Boolean)[2]} /> };
  }

  if (path === "/contatti/") return { key: path, element: <ContactPage /> };
  if (path === "/prenota/") return { key: path, element: <ContactPage booking /> };
  if (path === "/prenota/grazie/") return { key: path, element: <GraziePage /> };
  if (path === "/privacy-policy/") return { key: path, element: <LegalPage type="privacy" /> };
  if (path === "/cookie-policy/") return { key: path, element: <LegalPage type="cookie" /> };
  if (path === "/xcapital-point/") return { key: path, element: <XCapitalPointPage /> };

  return { key: "404", element: <NotFoundPage />, notFound: true };
}

export function App({ initialPath }) {
  const location = useClientLocation(initialPath);
  const pathname = location.split(/[?#]/)[0];
  const legacyTarget = LEGACY_REDIRECTS[normalizePath(pathname)];
  const effectivePath = legacyTarget ? legacyTarget.split("#")[0] : pathname;
  const page = resolvePage(effectivePath);

  useEffect(() => {
    if (legacyTarget && typeof window !== "undefined") {
      window.history.replaceState({}, "", legacyTarget);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [legacyTarget]);

  useEffect(() => {
    const meta = pageMeta(effectivePath);
    document.title = meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", meta.description);
    document.documentElement.dataset.routeStatus = page.notFound ? "404" : "200";
  }, [page.notFound, effectivePath]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = document.querySelectorAll("main section");
    sections.forEach((section, index) => { if (index > 0) section.classList.add("reveal"); });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -12% 0px" });
    sections.forEach((section) => { if (section.classList.contains("reveal")) observer.observe(section); });
    return () => observer.disconnect();
  }, [pathname]);

  return <SiteLayout><div key={page.key}>{page.element}</div></SiteLayout>;
}
