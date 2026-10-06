import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { pageMeta } from "./pageMeta.js";
import { serviceHubs, transactions } from "./siteRoutes.js";
import articles from "./generated/articles.json";

export function render(path) {
  return renderToString(<App initialPath={path} />);
}

export { pageMeta };
export { serviceHubs };

export function routes() {
  return [
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
    "/prenota/grazie/",
    "/privacy-policy/",
    "/cookie-policy/",
    "/xcapital-point/",
  ];
}
