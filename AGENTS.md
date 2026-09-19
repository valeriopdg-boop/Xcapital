# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable decisions

- The logo mark is the "X" (file `public/assets/xcapital-logo.png`), but the brand name is **Delex Capital**: use "Delex Capital" in copy, titles, meta, footer and aria-labels.
- Content source of truth: "Company Profile Delex Capital, September 2026" (PDF provided by the user). Positioning: "Independent Advisory. Proprietary Intelligence. Execution." / "Beyond Traditional Advisory". Four pillars: Advisory, Origination, Intelligence, Distribution. Six practices: M&A Advisory, Corporate Finance & Capital Solutions, Real Estate Advisory, Energy & Infrastructure, Strategic & Fractional Advisory, Growth & Venture Advisory. Operating model in 8 steps. Real stats (June 2026): 33 active mandates, 50+ transactions managed, 100+ mandates, 13+ sectors, 20+ years combined experience, 80+ qualified contacts/month. Offices: Brescia · Fidenza. Contacts: info@delexcapital.com, www.delexcapital.com.
- Work happens on branch `delex-brand-realignment`.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
