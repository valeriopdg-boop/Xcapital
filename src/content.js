/**
 * Contenuti approvati del sito Delex Capital.
 *
 * Il modulo mantiene copy e destinazioni separati dai componenti React, così
 * App.jsx può renderizzare le sezioni senza duplicare contenuti o slug.
 * Fonte primaria: Company Profile Delex Capital, settembre 2026.
 */

/** @typedef {{ label: string, href: string }} Link */

/**
 * @typedef {Link & {
 *   id: 'about' | 'competencies' | 'method' | 'track-record' | 'resources'
 * }} NavigationItem
 */

/**
 * @typedef {{
 *   id: 'independent' | 'senior-led' | 'execution-driven',
 *   title: string,
 *   description: string
 * }} ProofPoint
 */

/**
 * @typedef {{
 *   id: 'ma-advisory' | 'corporate-finance' | 'real-estate' | 'energy-infrastructure' | 'strategic-advisory' | 'growth-venture',
 *   title: string,
 *   description: string,
 *   href: string
 * }} Competency
 */

/**
 * @typedef {{
 *   number: string,
 *   title: string,
 *   description: string
 * }} MethodStep
 */

/** @type {{ items: NavigationItem[], cta: Link }} */
export const navigation = {
  items: [
    { id: 'about', label: 'Chi siamo', href: '/chi-siamo/' },
    { id: 'competencies', label: 'Practice', href: '/services/' },
    { id: 'method', label: 'Metodo', href: '#metodo' },
    { id: 'track-record', label: 'Track Record', href: '/track-record/' },
    { id: 'resources', label: 'Risorse', href: '/insight/' },
  ],
  cta: { label: 'Parla con il team', href: '/prenota/' },
};

/** @type {ProofPoint[]} */
export const proofPoints = [
  {
    id: 'independent',
    title: 'Indipendenti',
    description: 'Una boutique indipendente, senza vincoli di prodotto o logiche bancarie.',
  },
  {
    id: 'senior-led',
    title: 'Senior-led',
    description: 'Professionisti senior direttamente coinvolti in ogni mandato.',
  },
  {
    id: 'execution-driven',
    title: 'Execution driven',
    description: 'Il nostro valore non è un report, ma portare l’operazione a buon fine.',
  },
];

export const competenciesSection = {
  eyebrow: 'Le practice',
  title: 'Competenze profonde. Prospettiva ampia.',
  description:
    'Quattro practice principali — M&A, corporate finance, real estate ed energy & infrastructure — integrate da advisory strategica e supporto alla crescita.',
  note: {
    title: 'Un unico obiettivo',
    description: 'Il successo dei nostri clienti',
  },
};

/** @type {Competency[]} */
export const competencies = [
  {
    id: 'ma-advisory',
    title: 'M&A Advisory',
    description: 'Operazioni sell-side e buy-side, dalla strategia al closing.',
    href: '/ma-advisory/',
  },
  {
    id: 'corporate-finance',
    title: 'Corporate Finance & Capital Solutions',
    description: 'Soluzioni di capitale su misura per crescita e acquisizioni.',
    href: '/corporate-finance/',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Advisory',
    description: 'Valorizzazione e vendita di asset immobiliari e hospitality.',
    href: '/real-estate/',
  },
  {
    id: 'energy-infrastructure',
    title: 'Energy & Infrastructure',
    description: 'Progetti energetici e infrastrutturali che creano valore.',
    href: '/energy-infrastructure/',
  },
  {
    id: 'strategic-advisory',
    title: 'Strategic & Fractional Advisory',
    description: 'Preparare le imprese alla crescita e alle operazioni straordinarie.',
    href: '/strategic-advisory/',
  },
  {
    id: 'growth-venture',
    title: 'Growth & Venture Advisory',
    description: 'Imprese pronte a crescere, raccogliere capitale e scalare.',
    href: '/growth-venture/',
  },
];

export const methodSection = {
  eyebrow: 'Il modello operativo',
  overline: 'Dalla strategia al closing',
  title: 'Un approccio strutturato.',
  description:
    'Combiniamo competenze settoriali, intelligence proprietaria e un processo rigoroso per generare risultati concreti.',
};

/** @type {MethodStep[]} */
export const methodSteps = [
  { number: '01', title: 'Comprendere', description: 'Ascoltiamo obiettivi, priorità e fattori critici di successo.' },
  { number: '02', title: 'Analizzare', description: 'Analizziamo business, numeri, mercato e posizionamento.' },
  { number: '03', title: 'Posizionare', description: 'Definiamo value story, driver di valore e struttura dell’operazione.' },
  { number: '04', title: 'Identificare', description: 'Selezioniamo buyer, target, investitori e controparti più adatte.' },
  { number: '05', title: 'Attivare', description: 'Attiviamo contatti diretti, proprietari e qualificati.' },
  { number: '06', title: 'Negoziare', description: 'Gestiamo NDA, LOI e condizioni per creare valore e allineamento.' },
  { number: '07', title: 'Eseguire', description: 'Coordiniamo due diligence, finanziamenti e documentazione.' },
  { number: '08', title: 'Chiudere', description: 'Affianchiamo il cliente fino al completamento dell’operazione.' },
];

/** @type {{ brand: string, links: Link[], legalLinks: Link[], locales: Link[], copyright: string }} */
export const footer = {
  brand: 'DELEX CAPITAL',
  links: navigation.items.map(({ label, href }) => ({ label, href })),
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
    { label: 'Contatti', href: '/contatti/' },
  ],
  locales: [
    { label: 'IT', href: '/' },
    { label: 'EN', href: '/en/' },
  ],
  copyright: '© 2026 Delex Capital S.r.l. Tutti i diritti riservati.',
};

/**
 * Stato editoriale dei contenuti multipagina.
 * `ready` indica copy utilizzabile; gli altri valori richiedono un intervento
 * esplicito prima della pubblicazione in produzione.
 *
 * @typedef {'ready' | 'content-pending' | 'data-pending' | 'integration-pending' | 'legal-review'} EditorialStatus
 */

/**
 * @typedef {{
 *   eyebrow?: string,
 *   title: string,
 *   description: string,
 *   primaryAction?: Link,
 *   secondaryAction?: Link
 * }} PageHero
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   href?: string,
 *   status?: EditorialStatus,
 *   note?: string
 * }} ContentItem
 */

/**
 * @typedef {{
 *   id: string,
 *   route: string,
 *   title: string,
 *   seo: { title: string, description: string },
 *   hero: PageHero,
 *   status: EditorialStatus,
 *   pendingFields?: string[]
 * }} BasePage
 */

/** Messaggi condivisi per contenuti non ancora disponibili. */
export const editorialMessages = {
  contentPending: 'Contenuto in preparazione e in attesa di approvazione editoriale.',
  dataPending: 'I dati saranno pubblicati dopo verifica e autorizzazione.',
  integrationPending: 'Funzione in attesa della configurazione del servizio e delle verifiche privacy.',
  legalReview: 'Testo in attesa di revisione e approvazione legale.',
};

/**
 * Homepage completa come sorgente dati per la futura versione multipagina.
 * Gli array condivisi restano gli stessi già consumati dall'attuale App.jsx.
 */
export const homePage = {
  id: 'home',
  route: '/',
  title: 'Homepage',
  status: 'ready',
  seo: {
    title: 'Delex Capital | Independent Advisory. Proprietary Intelligence. Execution.',
    description:
      'Boutique indipendente di advisory per imprenditori, aziende, investitori e sviluppatori: operazioni straordinarie, capitale ed esecuzione strategica.',
  },
  hero: {
    eyebrow: 'Independent Advisory. Proprietary Intelligence. Execution.',
    title: 'Beyond Traditional Advisory.',
    description:
      'Una boutique indipendente di advisory che affianca imprenditori, aziende, investitori e sviluppatori in operazioni straordinarie, capitale ed esecuzione strategica.',
    primaryAction: { label: 'Parla con il team', href: '/prenota/' },
    secondaryAction: { label: 'Scopri le practice', href: '/services/' },
  },
  proofPoints,
  competencies: {
    ...competenciesSection,
    items: competencies,
  },
  method: {
    ...methodSection,
    steps: methodSteps,
  },
  teamIntroduction: {
    eyebrow: 'Il nostro team',
    title: 'Senior expertise. Esecuzione integrata.',
    description:
      'Senior advisor, analisti finanziari, relationship manager e specialisti di settore, uniti in un unico team con un unico standard.',
    action: { label: 'Conosci il team', href: '/chi-siamo/' },
  },
  closingCallToAction: {
    eyebrow: 'Una conversazione può fare la differenza',
    title: 'Parliamo del tuo progetto.',
    description:
      'Raccontaci i tuoi obiettivi. Ti metteremo in contatto con il membro del team più adatto per un primo confronto.',
    action: { label: 'Parla con il team', href: '/prenota/' },
  },
  newsletter: {
    status: 'integration-pending',
    title: 'Rimani aggiornato',
    items: [],
    emptyState: editorialMessages.integrationPending,
    pendingFields: ['provider', 'double opt-in', 'informativa contestuale', 'retention'],
  },
};

/** Pagina Chi siamo: profili e dati societari ulteriori richiedono approvazione. */
export const aboutPage = {
  id: 'about',
  route: '/chi-siamo/',
  title: 'Chi siamo',
  status: 'ready',
  seo: {
    title: 'Chi siamo | Delex Capital',
    description: 'Una boutique indipendente di advisory al servizio di imprenditori, investitori e sviluppatori.',
  },
  hero: {
    eyebrow: 'Chi siamo',
    title: 'Competenze senior. Esecuzione integrata.',
    description:
      'Combiniamo competenze di alto profilo con una rete integrata di professionisti e partner per creare valore sostenibile.',
    primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
  },
  sections: [
    {
      id: 'mission-vision',
      title: 'Missione e visione',
      status: 'ready',
      items: [],
      emptyState: editorialMessages.contentPending,
    },
    {
      id: 'advisory-board',
      title: 'Advisory Board',
      status: 'data-pending',
      items: [],
      emptyState: 'Profili e ruoli saranno inseriti dopo verifica e approvazione.',
    },
    {
      id: 'team',
      title: 'La nostra squadra',
      status: 'ready',
      items: [],
      emptyState: 'I profili del team saranno pubblicati dopo la raccolta dei materiali approvati.',
    },
    {
      id: 'values',
      title: 'Valori',
      status: 'ready',
      items: [],
      emptyState: editorialMessages.contentPending,
    },
    {
      id: 'csr',
      title: 'Responsabilità sociale',
      status: 'content-pending',
      items: [],
      emptyState: editorialMessages.contentPending,
    },
    {
      id: 'partnerships',
      title: 'Partnership',
      status: 'data-pending',
      items: [],
      emptyState: editorialMessages.dataPending,
    },
  ],
  pendingFields: [
    'responsabilità sociale',
    'profili e fotografie aggiuntivi',
    'partnership autorizzate',
  ],
};

const sharedHubProcess = {
  title: 'Come lavoriamo',
  description: 'Un processo rigoroso, adattato al contesto e agli obiettivi del progetto.',
  steps: methodSteps,
};

const sharedHubCallToAction = {
  title: 'Parliamo del tuo progetto',
  description: 'Un primo confronto per comprendere il contesto, le priorità e il percorso possibile.',
  action: { label: 'Parla con un esperto', href: '/prenota/' },
};

/**
 * Le sei practice previste dalla sitemap, allineate al Company Profile
 * Delex Capital di settembre 2026.
 */
export const serviceHubPages = [
  {
    id: 'ma-advisory',
    route: '/ma-advisory/',
    title: 'M&A Advisory',
    status: 'ready',
    seo: {
      title: 'M&A Advisory | Delex Capital',
      description: 'Operazioni sell-side e buy-side, dalla strategia al closing.',
    },
    hero: {
      eyebrow: 'Practice',
      title: 'M&A Advisory',
      description:
        'Supportiamo imprenditori e investitori in operazioni di successo, dalla strategia al closing.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'sell-side', title: 'Sell-side advisory', description: 'Preparazione, equity story, buyer identification e processo competitivo.', status: 'ready' },
      { id: 'buy-side', title: 'Buy-side advisory', description: 'Strategia di acquisizione, screening, origination proprietaria ed esecuzione.', status: 'ready' },
    ],
    process: sharedHubProcess,
    trackRecord: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    testimonial: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'corporate-finance',
    route: '/corporate-finance/',
    title: 'Corporate Finance & Capital Solutions',
    status: 'ready',
    seo: {
      title: 'Corporate Finance & Capital Solutions | Delex Capital',
      description: 'Soluzioni di capitale su misura per crescita, acquisizioni e sviluppo strategico.',
    },
    hero: {
      eyebrow: 'Practice',
      title: 'Corporate Finance & Capital Solutions',
      description:
        'Strutturiamo soluzioni di capitale su misura per sostenere crescita, acquisizioni e sviluppo strategico.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'equity-raising', title: 'Equity Raising', description: 'Ricerca di investitori e strutturazione di operazioni di equity.', status: 'ready' },
      { id: 'debt-advisory', title: 'Debt Advisory', description: 'Rapporti con banche e finanziatori, rifinanziamenti e ottimizzazione.', status: 'ready' },
      { id: 'growth-capital', title: 'Growth Capital', description: 'Funding per piani di espansione e consolidamento competitivo.', status: 'ready' },
      { id: 'acquisition-finance', title: 'Acquisition Finance', description: 'Soluzioni finanziarie per acquisizioni strategiche, MBO e LBO.', status: 'ready' },
      { id: 'structured-finance', title: 'Structured Finance', description: 'Operazioni complesse, strumenti partecipativi, bond e green bond.', status: 'ready' },
      { id: 'business-planning', title: 'Business Planning & Modelling', description: 'Business plan, analisi finanziarie e modelli previsionali.', status: 'ready' },
    ],
    process: sharedHubProcess,
    trackRecord: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    testimonial: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'real-estate',
    route: '/real-estate/',
    title: 'Real Estate Advisory',
    status: 'ready',
    seo: {
      title: 'Real Estate Advisory | Delex Capital',
      description: 'Valorizzazione, strutturazione e vendita di asset immobiliari e hospitality.',
    },
    hero: {
      eyebrow: 'Practice',
      title: 'Real Estate Advisory',
      description:
        'Affianchiamo proprietari, investitori e operatori nella valorizzazione, strutturazione e vendita di asset immobiliari e hospitality.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'hospitality', title: 'Hospitality & Hotels', description: 'Hotel, resort, boutique hotel e asset hospitality.', status: 'ready' },
      { id: 'trophy-assets', title: 'Trophy & Prime Assets', description: 'Asset iconici, prime properties e opportunità ad alto standing.', status: 'ready' },
      { id: 'commercial', title: 'Commercial Real Estate', description: 'Asset commerciali, mixed-use, direzionali e immobili a reddito.', status: 'ready' },
      { id: 'special-situations', title: 'Development & Special Situations', description: 'Development opportunity, riposizionamenti e situazioni complesse.', status: 'ready' },
    ],
    process: sharedHubProcess,
    trackRecord: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'energy-infrastructure',
    route: '/energy-infrastructure/',
    title: 'Energy & Infrastructure',
    status: 'ready',
    seo: {
      title: 'Energy & Infrastructure | Delex Capital',
      description: 'Progetti energetici e infrastrutturali che creano valore e impatto positivo.',
    },
    hero: {
      eyebrow: 'Focus sector',
      title: 'Energy & Infrastructure',
      description:
        'Affianchiamo operatori, sviluppatori e investitori nella realizzazione di progetti energetici e infrastrutturali.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'bess-storage', title: 'BESS & Storage', description: 'Sistemi di accumulo elettrochimico per la stabilità della rete.', status: 'ready' },
      { id: 'biogas-biometano', title: 'Biogas & Biometano', description: 'Impianti per la transizione energetica e le risorse locali.', status: 'ready' },
      { id: 'agrivoltaico', title: 'Agrivoltaico & Rinnovabili', description: 'Progetti agrivoltaici e impianti rinnovabili integrati.', status: 'ready' },
      { id: 'water-environmental', title: 'Water & Environmental', description: 'Infrastrutture per il ciclo idrico e la gestione ambientale.', status: 'ready' },
    ],
    process: sharedHubProcess,
    trackRecord: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'strategic-advisory',
    route: '/strategic-advisory/',
    title: 'Strategic & Fractional Advisory',
    status: 'ready',
    seo: {
      title: 'Strategic & Fractional Advisory | Delex Capital',
      description: 'Preparare le imprese alla crescita, al capitale e alle operazioni straordinarie.',
    },
    hero: {
      eyebrow: 'Practice',
      title: 'Strategic & Fractional Advisory',
      description:
        'Competenze strategiche e operative per rafforzare il posizionamento competitivo e creare valore nel tempo.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'strategic-assessment', title: 'Strategic Assessment', description: 'Analisi di business, mercato e posizionamento competitivo.', status: 'ready' },
      { id: 'business-planning', title: 'Business Planning', description: 'Piani industriali e finanziari solidi e realistici.', status: 'ready' },
      { id: 'growth-strategy', title: 'Growth Strategy', description: 'Strategie di sviluppo organico e per linee esterne.', status: 'ready' },
      { id: 'fractional-executive', title: 'Fractional Executive Support', description: 'Manager esperti on-demand per funzioni chiave.', status: 'ready' },
    ],
    process: sharedHubProcess,
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'growth-venture',
    route: '/growth-venture/',
    title: 'Growth & Venture Advisory',
    status: 'ready',
    seo: {
      title: 'Growth & Venture Advisory | Delex Capital',
      description: 'Imprese pronte a crescere, raccogliere capitale e scalare.',
    },
    hero: {
      eyebrow: 'Practice',
      title: 'Growth & Venture Advisory',
      description:
        'Affianchiamo startup innovative, scale-up e imprenditori nella crescita, nella raccolta di capitale e nella creazione di strutture solide.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'fundraising-strategy', title: 'Fundraising Strategy', description: 'Strategia di raccolta e partner finanziari più adatti.', status: 'ready' },
      { id: 'investor-readiness', title: 'Investor Readiness', description: 'Posizionamento, pitch deck e processi per gli investitori.', status: 'ready' },
      { id: 'public-incentives', title: 'Public Incentives & Funding', description: 'Bandi e agevolazioni per massimizzare le risorse.', status: 'ready' },
      { id: 'work-for-equity', title: 'Work for Equity', description: 'Piani di work for equity e supporto strategico continuativo.', status: 'ready' },
    ],
    process: sharedHubProcess,
    callToAction: sharedHubCallToAction,
  },
];

/** Nessuna operazione viene esposta finché dati e autorizzazioni non sono disponibili. */
export const trackRecordPage = {
  id: 'track-record',
  route: '/track-record/',
  title: 'Track Record',
  status: 'data-pending',
  seo: {
    title: 'Track Record | Delex Capital',
    description: 'Archivio delle operazioni pubblicabili di Delex Capital.',
  },
  hero: {
    eyebrow: 'Esperienza',
    title: 'Track Record',
    description:
      'Una selezione di operazioni sarà disponibile dopo la verifica dei dati e delle autorizzazioni alla pubblicazione.',
    primaryAction: { label: 'Parla con il team', href: '/contatti/' },
  },
  filters: [],
  operations: [],
  emptyState: editorialMessages.dataPending,
  pendingFields: [
    'operazioni pubblicabili',
    'ruolo svolto',
    'data e importo autorizzati',
    'loghi e denominazioni autorizzati',
    'criteri di anonimizzazione',
  ],
};

export const insightPage = {
  id: 'insight',
  route: '/insight/',
  title: 'Insight e Risorse',
  status: 'content-pending',
  seo: {
    title: 'Insight e Risorse | Delex Capital',
    description: 'Approfondimenti, notizie, pubblicazioni e webinar di Delex Capital.',
  },
  hero: {
    eyebrow: 'Risorse',
    title: 'Idee e strumenti per leggere il cambiamento.',
    description: 'Approfondimenti dedicati a strategia, capitale, mercati e operazioni.',
  },
  collections: [
    { id: 'publications', title: 'Pubblicazioni', route: '/education/', items: [], emptyState: editorialMessages.contentPending },
    { id: 'news', title: 'Blog e News', route: '/category/press/', items: [], emptyState: editorialMessages.contentPending },
    { id: 'webinars', title: 'Webinar', route: '/webinar/', items: [], emptyState: editorialMessages.contentPending },
  ],
  newsletter: {
    status: 'integration-pending',
    title: 'Rimani aggiornato',
    description: 'L’iscrizione sarà disponibile dopo la configurazione del servizio e del consenso.',
    pendingFields: ['provider', 'double opt-in', 'informativa', 'retention'],
  },
};

export const contactPage = {
  id: 'contact',
  route: '/contatti/',
  title: 'Contatti',
  status: 'integration-pending',
  seo: {
    title: 'Contatti | Delex Capital',
    description: 'Contatta Delex Capital per un primo confronto.',
  },
  hero: {
    eyebrow: 'Contatti',
    title: 'Iniziamo da una conversazione.',
    description: 'Raccontaci il contesto e l’obiettivo su cui desideri confrontarti.',
  },
  contactDetails: [],
  form: {
    status: 'integration-pending',
    fields: [],
    submitLabel: 'Invia la richiesta',
    notice: editorialMessages.integrationPending,
  },
  pendingFields: ['recapiti approvati', 'campi del modulo', 'destinatari', 'retention', 'informativa privacy'],
};

export const bookingPage = {
  id: 'booking',
  route: '/prenota/',
  title: 'Prenota una call',
  status: 'integration-pending',
  seo: {
    title: 'Prenota una call | Delex Capital',
    description: 'Richiedi un primo confronto con il team Delex Capital.',
  },
  hero: {
    eyebrow: 'Un primo confronto',
    title: 'Parliamo del tuo progetto.',
    description: 'Condividi il tuo obiettivo per individuare il referente e il percorso più adatti.',
  },
  scheduler: {
    status: 'integration-pending',
    provider: null,
    embedUrl: null,
    notice: editorialMessages.integrationPending,
  },
  pendingFields: ['provider di prenotazione', 'disponibilità', 'durata', 'referenti', 'informativa privacy'],
};

export const privacyPage = {
  id: 'privacy',
  route: '/privacy-policy/',
  title: 'Privacy Policy',
  status: 'legal-review',
  publishable: false,
  seo: {
    title: 'Privacy Policy | Delex Capital',
    description: 'Informazioni sul trattamento dei dati personali.',
  },
  hero: {
    title: 'Privacy Policy',
    description: editorialMessages.legalReview,
  },
  sections: [],
  pendingFields: [
    'titolare e contatti',
    'finalità e basi giuridiche',
    'categorie di dati',
    'destinatari e responsabili',
    'trasferimenti',
    'tempi di conservazione',
    'diritti degli interessati',
  ],
};

export const cookiePage = {
  id: 'cookies',
  route: '/cookie-policy/',
  title: 'Cookie Policy',
  status: 'legal-review',
  publishable: false,
  seo: {
    title: 'Cookie Policy | Delex Capital',
    description: 'Informazioni sull’uso di cookie e tecnologie analoghe.',
  },
  hero: {
    title: 'Cookie Policy',
    description: editorialMessages.legalReview,
  },
  cookieCategories: [],
  services: [],
  pendingFields: [
    'inventario cookie',
    'durata',
    'fornitore',
    'finalità',
    'base giuridica',
    'preferenze e revoca del consenso',
  ],
};

/** Registro unico delle pagine, utile al router e alla generazione di sitemap. */
export const sitePages = [
  homePage,
  aboutPage,
  ...serviceHubPages,
  trackRecordPage,
  insightPage,
  contactPage,
  bookingPage,
  privacyPage,
  cookiePage,
];

/** Lookup stabile per route, senza duplicare la struttura dei contenuti. */
export const pageByRoute = Object.fromEntries(sitePages.map((page) => [page.route, page]));
