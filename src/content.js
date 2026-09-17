/**
 * Contenuti approvati della homepage XCapital.
 *
 * Il modulo mantiene copy e destinazioni separati dai componenti React, così
 * App.jsx può renderizzare le sezioni senza duplicare contenuti o slug.
 */

/** @typedef {{ label: string, href: string }} Link */

/**
 * @typedef {Link & {
 *   id: 'about' | 'competencies' | 'method' | 'track-record' | 'resources'
 * }} NavigationItem
 */

/**
 * @typedef {{
 *   id: 'senior-expertise' | 'integrated-vision' | 'direct-commitment',
 *   title: string,
 *   description: string
 * }} ProofPoint
 */

/**
 * @typedef {{
 *   id: 'growth-capital' | 'strategic-advisory' | 'finance-fundraising' | 'business-development' | 'coaching-wellbeing',
 *   title: string,
 *   description: string,
 *   href: string
 * }} Competency
 */

/**
 * @typedef {{
 *   number: '01' | '02' | '03' | '04',
 *   title: string,
 *   description: string
 * }} MethodStep
 */

/** @type {{ items: NavigationItem[], cta: Link }} */
export const navigation = {
  items: [
    { id: 'about', label: 'Chi siamo', href: '/chi-siamo/' },
    { id: 'competencies', label: 'Competenze', href: '#competenze' },
    { id: 'method', label: 'Metodo', href: '#metodo' },
    { id: 'track-record', label: 'Track Record', href: '/track-record/' },
    { id: 'resources', label: 'Risorse', href: '/insight/' },
  ],
  cta: { label: 'Parla con il team', href: '/prenota/' },
};

/** @type {ProofPoint[]} */
export const proofPoints = [
  {
    id: 'senior-expertise',
    title: 'Senior expertise',
    description: 'Un team con esperienza operativa e visione strategica.',
  },
  {
    id: 'integrated-vision',
    title: 'Visione integrata',
    description: 'Strategia, capitale, sviluppo e persone in un\u2019unica prospettiva.',
  },
  {
    id: 'direct-commitment',
    title: 'Impegno diretto',
    description: 'Al fianco di imprenditori e manager in modo concreto e continuativo.',
  },
];

export const competenciesSection = {
  eyebrow: 'Le nostre competenze',
  title: 'Competenze diverse. Una sola direzione.',
  description:
    'Un approccio multidisciplinare per supportare la crescita delle imprese in ogni fase del percorso.',
  note: {
    title: 'Un obiettivo comune',
    description: 'Valore duraturo per l\u2019imprenditore',
  },
};

/** @type {Competency[]} */
export const competencies = [
  {
    id: 'growth-capital',
    title: 'Growth Capital',
    description: 'Crescita, acquisizioni e operazioni straordinarie.',
    href: '/growth/',
  },
  {
    id: 'strategic-advisory',
    title: 'Advisory strategico',
    description: 'Scelte informate per un vantaggio competitivo duraturo.',
    href: '/advisory/',
  },
  {
    id: 'finance-fundraising',
    title: 'Finanza e Fundraising',
    description: 'Accesso al capitale e strutture finanziarie su misura.',
    href: '/finanza/',
  },
  {
    id: 'business-development',
    title: 'Business Development',
    description: 'Nuovi mercati, partnership e sviluppo internazionale.',
    href: '/business-development/',
  },
  {
    id: 'coaching-wellbeing',
    title: 'Coaching e Benessere',
    description: 'Leadership, team e crescita personale per risultati sostenibili.',
    href: '/coaching-benessere/',
  },
];

export const methodSection = {
  eyebrow: 'Il nostro metodo',
  overline: 'Dalla visione all\u2019impatto',
  title: 'Dall\u2019ascolto ai risultati.',
  description:
    'Un percorso chiaro, concreto e condiviso, per trasformare le ambizioni in risultati.',
};

/** @type {MethodStep[]} */
export const methodSteps = [
  {
    number: '01',
    title: 'Ascolto',
    description: 'Comprendiamo obiettivi, contesto e sfide.',
  },
  {
    number: '02',
    title: 'Diagnosi',
    description: 'Analizziamo opzioni e priorità.',
  },
  {
    number: '03',
    title: 'Affiancamento',
    description: 'Lavoriamo insieme all\u2019esecuzione.',
  },
  {
    number: '04',
    title: 'Risultati',
    description: 'Costruiamo valore duraturo nel tempo.',
  },
];

/** @type {{ brand: string, links: Link[], legalLinks: Link[], locales: Link[], copyright: string }} */
export const footer = {
  brand: 'XCAPITAL',
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
  copyright: '\u00a9 2026 XCapital. Tutti i diritti riservati.',
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
    title: 'XCapital | Strategia, capitale e persone',
    description:
      'Competenze integrate per affiancare imprenditori e manager dalla visione all\u2019esecuzione.',
  },
  hero: {
    eyebrow: 'Strategia. Capitale. Persone.',
    title: 'Le decisioni importanti non si prendono da soli.',
    description:
      'Un team indipendente affianca imprenditori e manager dalla visione all\u2019esecuzione.',
    primaryAction: { label: 'Parla con il team', href: '/prenota/' },
    secondaryAction: { label: 'Scopri come lavoriamo', href: '#metodo' },
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
    title: 'Persone che fanno la differenza.',
    description:
      'Senior advisor, imprenditori e professionisti con competenze complementari, uniti dalla stessa ambizione: contribuire al successo dei nostri clienti.',
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

/** Pagina Chi siamo: nessun nominativo, partner o dato societario è precompilato. */
export const aboutPage = {
  id: 'about',
  route: '/chi-siamo/',
  title: 'Chi siamo',
  status: 'content-pending',
  seo: {
    title: 'Chi siamo | XCapital',
    description: 'Competenze e approccio di XCapital al servizio della crescita aziendale.',
  },
  hero: {
    eyebrow: 'Chi siamo',
    title: 'Competenze diverse. Una sola direzione.',
    description:
      'Un approccio integrato che mette in relazione strategia, capitale, sviluppo e persone.',
    primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
  },
  sections: [
    {
      id: 'mission-vision',
      title: 'Missione e visione',
      status: 'content-pending',
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
      status: 'data-pending',
      items: [],
      emptyState: 'I profili del team saranno pubblicati dopo la raccolta dei materiali approvati.',
    },
    {
      id: 'values',
      title: 'Valori',
      status: 'content-pending',
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
    {
      id: 'xcapital-point',
      title: 'XCapital Point',
      status: 'content-pending',
      items: [],
      emptyState: 'Programma in attesa dei contenuti e dei materiali di progetto.',
    },
  ],
  pendingFields: [
    'missione e visione approvate',
    'valori',
    'responsabilità sociale',
    'profili e fotografie',
    'partnership autorizzate',
    'materiali XCapital Point',
  ],
};

const sharedHubProcess = {
  title: 'Come lavoriamo',
  description: 'Un percorso strutturato, adattato al contesto e agli obiettivi del progetto.',
  steps: methodSteps,
};

const sharedHubCallToAction = {
  title: 'Parliamo del tuo progetto',
  description: 'Un primo confronto per comprendere il contesto, le priorità e il percorso possibile.',
  action: { label: 'Parla con un esperto', href: '/prenota/' },
};

/**
 * Le cinque aree previste dalla sitemap. Le note `content-pending` e
 * `legal-review` impediscono di scambiare una voce di menu per un'offerta già
 * descritta o per un claim professionale approvato.
 */
export const serviceHubPages = [
  {
    id: 'growth-capital',
    route: '/growth/',
    title: 'Growth Capital',
    status: 'content-pending',
    seo: {
      title: 'Growth Capital | XCapital',
      description: 'Competenze dedicate a crescita, capitale e operazioni straordinarie.',
    },
    hero: {
      eyebrow: 'Competenze',
      title: 'Growth Capital',
      description:
        'Supporto strategico nelle fasi in cui capitale, struttura e operazioni straordinarie incidono sul percorso di crescita.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'ma-advisory', title: 'M&A Advisory', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'investment-banking', title: 'Investment Banking Services', description: editorialMessages.contentPending, status: 'legal-review' },
      { id: 'green-energy', title: 'Green Energy', description: editorialMessages.contentPending, href: '/growth/green-energy/', status: 'content-pending' },
      { id: 'real-estate', title: 'Real Estate', description: editorialMessages.contentPending, href: '/growth/real-estate/', status: 'content-pending' },
      { id: 'capital-finance', title: 'Finanza di capitali', description: editorialMessages.contentPending, status: 'content-pending', note: 'Collocazione nella sitemap da confermare.' },
      { id: 'enterprise-evaluation', title: 'Enterprise Evaluation', description: editorialMessages.contentPending, status: 'content-pending' },
    ],
    process: sharedHubProcess,
    trackRecord: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    testimonial: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'strategic-advisory',
    route: '/advisory/',
    title: 'Advisory strategico',
    status: 'content-pending',
    seo: {
      title: 'Advisory strategico | XCapital',
      description: 'Percorsi di advisory per scelte, trasformazione e sviluppo aziendale.',
    },
    hero: {
      eyebrow: 'Competenze',
      title: 'Advisory strategico',
      description:
        'Analisi e affiancamento per tradurre priorità aziendali in decisioni e percorsi operativi.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'competitive-strategy', title: 'Strategia competitiva', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'business-transformation', title: 'Trasformazione aziendale', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'internationalisation', title: 'Internazionalizzazione', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'pre-deal', title: 'Advisory Pre-deal', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'fractional-management', title: 'Fractional Management', description: editorialMessages.contentPending, status: 'content-pending', note: 'Collocazione nella sitemap da confermare.' },
      { id: 'legal', title: 'Legale', description: editorialMessages.legalReview, status: 'legal-review', note: 'Perimetro del servizio e responsabilità professionali da confermare.' },
    ],
    process: sharedHubProcess,
    testimonial: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'finance-fundraising',
    route: '/finanza/',
    title: 'Finanza e Fundraising',
    status: 'content-pending',
    seo: {
      title: 'Finanza e Fundraising | XCapital',
      description: 'Competenze dedicate alla struttura finanziaria e ai percorsi di raccolta.',
    },
    hero: {
      eyebrow: 'Competenze',
      title: 'Finanza e Fundraising',
      description:
        'Affiancamento nella valutazione delle opzioni finanziarie coerenti con obiettivi, fase e struttura dell\u2019impresa.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'equity-debt-fundraising', title: 'Fundraising Equity & Debt', description: editorialMessages.contentPending, status: 'legal-review' },
      { id: 'private-equity', title: 'Private Equity', description: editorialMessages.contentPending, status: 'legal-review' },
      { id: 'debt-advisory', title: 'Debt Advisory', description: editorialMessages.contentPending, status: 'legal-review' },
      { id: 'subsidised-finance', title: 'Finanza Agevolata', description: editorialMessages.contentPending, status: 'content-pending' },
    ],
    process: sharedHubProcess,
    trackRecord: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    testimonial: { items: [], emptyState: editorialMessages.dataPending, status: 'data-pending' },
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'business-development',
    route: '/business-development/',
    title: 'Business Development',
    status: 'content-pending',
    seo: {
      title: 'Business Development | XCapital',
      description: 'Percorsi per sviluppo commerciale, nuovi mercati e posizionamento.',
    },
    hero: {
      eyebrow: 'Competenze',
      title: 'Business Development',
      description:
        'Supporto alla definizione e all\u2019esecuzione di percorsi di sviluppo commerciale e di mercato.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'sales-development', title: 'Sviluppo commerciale', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'go-to-market', title: 'Go to Market', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'strategic-marketing', title: 'Marketing strategico', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'startup-studio', title: 'Start-up Studio', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'communication-brand', title: 'Comunicazione e Brand', description: editorialMessages.contentPending, href: '/business-development/comunicazione/', status: 'content-pending' },
    ],
    process: sharedHubProcess,
    callToAction: sharedHubCallToAction,
  },
  {
    id: 'coaching-wellbeing',
    route: '/coaching-benessere/',
    title: 'Coaching e Benessere',
    status: 'content-pending',
    seo: {
      title: 'Coaching e Benessere | XCapital',
      description: 'Percorsi dedicati a leadership, organizzazione e sviluppo delle persone.',
    },
    hero: {
      eyebrow: 'Competenze',
      title: 'Coaching e Benessere',
      description:
        'Percorsi rivolti alla leadership, all\u2019organizzazione e alla crescita delle persone nel contesto aziendale.',
      primaryAction: { label: 'Parla con un esperto', href: '/prenota/' },
    },
    services: [
      { id: 'executive-coaching', title: 'Executive Coaching', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'organisational-wellbeing', title: 'Benessere organizzativo', description: editorialMessages.contentPending, href: '/coaching-benessere/benessere/', status: 'content-pending' },
      { id: 'hr-strategy', title: 'HR Strategy', description: editorialMessages.contentPending, status: 'content-pending' },
      { id: 'generational-transition', title: 'Cambio e passaggio generazionale', description: editorialMessages.contentPending, status: 'content-pending' },
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
    title: 'Track Record | XCapital',
    description: 'Archivio delle operazioni pubblicabili di XCapital.',
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
    title: 'Insight e Risorse | XCapital',
    description: 'Approfondimenti, notizie, pubblicazioni e webinar di XCapital.',
  },
  hero: {
    eyebrow: 'Risorse',
    title: 'Idee e strumenti per leggere il cambiamento.',
    description: 'Approfondimenti dedicati a strategia, capitale, mercati, organizzazione e persone.',
  },
  collections: [
    { id: 'publications', title: 'Pubblicazioni', route: '/education/', items: [], emptyState: editorialMessages.contentPending },
    { id: 'news', title: 'Blog e News', route: '/category/press/', items: [], emptyState: editorialMessages.contentPending },
    { id: 'webinars', title: 'Webinar', route: '/webinar/', items: [], emptyState: editorialMessages.contentPending },
  ],
  newsletter: {
    status: 'integration-pending',
    title: 'Rimani aggiornato',
    description: 'L\u2019iscrizione sarà disponibile dopo la configurazione del servizio e del consenso.',
    pendingFields: ['provider', 'double opt-in', 'informativa', 'retention'],
  },
};

export const contactPage = {
  id: 'contact',
  route: '/contatti/',
  title: 'Contatti',
  status: 'integration-pending',
  seo: {
    title: 'Contatti | XCapital',
    description: 'Contatta XCapital per un primo confronto.',
  },
  hero: {
    eyebrow: 'Contatti',
    title: 'Iniziamo da una conversazione.',
    description: 'Raccontaci il contesto e l\u2019obiettivo su cui desideri confrontarti.',
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
    title: 'Prenota una call | XCapital',
    description: 'Richiedi un primo confronto con il team XCapital.',
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
    title: 'Privacy Policy | XCapital',
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
    title: 'Cookie Policy | XCapital',
    description: 'Informazioni sull\u2019uso di cookie e tecnologie analoghe.',
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
