import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { pageMeta } from "./pageMeta.js";
import { serviceHubs, transactions } from "./siteRoutes.js";
import articles from "./generated/articles.json";

export function render(path) {
  return renderToString(<App initialPath={path} />);
}

export { pageMeta };

export function routes() {
  return [
    "/",
    "/chi-siamo/",
    "/services/",
    ...serviceHubs.map((hub) => hub.path),
    "/track-record/",
    ...transactions.map((t) => `/track-record/${t.slug}/`),
    "/insight/",
    ...articles.map((a) => `/insight/${a.slug}/`),
    "/education/",
    "/category/press/",
    "/webinar/",
    "/contatti/",
    "/prenota/",
    "/privacy-policy/",
    "/cookie-policy/",
    "/xcapital-point/",
  ];
}
