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

Il form di contatto è attualmente dimostrativo e non trasmette dati a servizi
esterni. La newsletter richiede la configurazione di un provider (es. Brevo)
con double opt-in.
