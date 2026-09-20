# Delex Capital

Sito corporate di Delex Capital, realizzato con React e Vite.

## Sviluppo locale

```bash
npm install
npm run dev
```

## Scrivere e pubblicare articoli

Gli articoli della sezione Insight sono file markdown in `content/articles/`,
convertiti in `src/generated/articles.json` dagli hook `predev`/`prebuild`.

Per scrivere con l'interfaccia redazionale (Decap CMS) in locale:

```bash
npm run cms      # proxy Git locale per Decap
npm run dev      # in un altro terminale
# poi aprire http://localhost:5173/admin/index.html
```

(Nota: in dev Vite riserva `/admin/` al fallback SPA; usare il path completo
`/admin/index.html`. In produzione `/admin/` funziona direttamente.)

In produzione l'interfaccia `/admin/` usa l'OAuth GitHub tramite le funzioni
`api/auth.js` e `api/callback.js`: richiede una GitHub OAuth App con callback
`<origine-del-sito>/api/callback` e le variabili ambiente `GITHUB_CLIENT_ID` e
`GITHUB_CLIENT_SECRET` configurate su Vercel, più `base_url` in
`public/admin/config.yml` puntato all'origine pubblica.

Ogni articolo pubblicato ha un pulsante "Pubblica su LinkedIn" che apre la
condivisione con il link precompilato (fase 1). La pubblicazione automatica
sulla pagina aziendale via LinkedIn Posts API è la fase 2 e richiede un'app
LinkedIn con scope `w_organization_social`.

## Verifiche

```bash
npm run build
npm run test:sites
```

## Setup produzione (checklist lancio)

1. **Form contatti** (`api/contact.js`): configurare su Vercel `BREVO_API_KEY`,
   `CONTACT_TO_EMAIL` (destinatario) e `CONTACT_FROM_EMAIL` (mittente
   verificato su Brevo). Senza queste variabili il form risponde con un
   fallback che invita a scrivere a info@delexcapital.com.
2. **CMS redazione**: creare una GitHub OAuth App (callback
   `<dominio>/api/callback`), impostare `GITHUB_CLIENT_ID` e
   `GITHUB_CLIENT_SECRET` su Vercel e aggiornare `base_url` in
   `public/admin/config.yml` con l'origine pubblica.
3. **Dominio**: collegare il dominio definitivo su Vercel, poi aggiornare
   `SITE_ORIGIN` in `scripts/build-sitemap.mjs`, gli URL in `index.html`
   (og:image, JSON-LD) e rimuovere il meta `noindex,nofollow`.
4. **LinkedIn fase 2** (pubblicazione automatica): registrare un'app LinkedIn
   con la pagina aziendale come prodotto, richiedere lo scope
   `w_organization_social`, quindi implementare una funzione `/api/linkedin`
   che pubblichi titolo + abstract + link articolo.
5. **Newsletter**: con l'account Brevo attivo, collegare il form di
   iscrizione con double opt-in (GDPR) e creare la campagna collegata agli
   articoli pubblicati.

Il build genera: bundle client, prerender statico di tutte le route
(`scripts/prerender.mjs`), sitemap (`scripts/build-sitemap.mjs`) e il bundle
per l'handoff Sites. Le immagini hero delle practice derivano dal Company
Profile e si rigenerano con `node scripts/build-images.mjs`.
