import { useEffect } from "react";
import {
  AboutPage,
  ArticlePage,
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
import { pageMeta } from "./pageMeta.js";
import { detailPages, normalizePath, serviceHubs } from "./siteRoutes.js";

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
  if (path.startsWith("/insight/") && path.split("/").filter(Boolean).length === 2) {
    return { key: path, element: <ArticlePage slug={path.split("/").filter(Boolean)[1]} /> };
  }
  if (path === "/education/") return { key: path, element: <InsightPage active="education" /> };
  if (path === "/category/press/") return { key: path, element: <InsightPage active="press" /> };
  if (path === "/webinar/") return { key: path, element: <InsightPage active="webinar" /> };
  if (path === "/contatti/") return { key: path, element: <ContactPage /> };
  if (path === "/prenota/") return { key: path, element: <ContactPage booking /> };
  if (path === "/privacy-policy/") return { key: path, element: <LegalPage type="privacy" /> };
  if (path === "/cookie-policy/") return { key: path, element: <LegalPage type="cookie" /> };

  return { key: "404", element: <NotFoundPage />, notFound: true };
}

export function App({ initialPath }) {
  const location = useClientLocation(initialPath);
  const pathname = location.split(/[?#]/)[0];
  const page = resolvePage(pathname);

  useEffect(() => {
    const meta = pageMeta(pathname);
    document.title = meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", meta.description);
    document.documentElement.dataset.routeStatus = page.notFound ? "404" : "200";
  }, [page.notFound, pathname]);

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
