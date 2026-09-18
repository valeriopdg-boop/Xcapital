export const serviceHubs = [
  {
    path: "/growth/",
    label: "Growth Capital",
    eyebrow: "Crescita e operazioni straordinarie",
    title: "Capitale e competenze per accelerare la crescita.",
    description: "Affianchiamo imprenditori e investitori nelle decisioni che trasformano struttura, valore e traiettoria dell’impresa.",
    services: [
      ["M&A Advisory", "Acquisizioni, cessioni e operazioni straordinarie con un presidio senior."],
      ["Investment Banking Services", "Strutturazione finanziaria e accesso qualificato al mercato dei capitali."],
      ["Green Energy", "Finanza e advisory per progetti legati alla transizione energetica.", "/growth/green-energy/"],
      ["Real Estate", "Valutazione e sviluppo di opportunità immobiliari.", "/growth/real-estate/"],
      ["Finanza di capitali", "Soluzioni di capitale coerenti con obiettivi e fase aziendale."],
      ["Enterprise Evaluation", "Valutazioni indipendenti a supporto di scelte e negoziazioni."],
    ],
  },
  {
    path: "/advisory/",
    label: "Advisory strategico",
    eyebrow: "Scelte informate",
    title: "Strategia che diventa direzione operativa.",
    description: "Costruiamo percorsi strategici misurabili, collegando scenario competitivo, organizzazione e capacità di esecuzione.",
    services: [
      ["Strategia competitiva e marketing", "Posizionamento, priorità e piani di crescita sostenibili."],
      ["Trasformazione aziendale", "Modelli operativi, governance e processi pronti a evolvere."],
      ["Internazionalizzazione", "Selezione dei mercati e costruzione del percorso di ingresso."],
      ["Advisory pre-deal", "Analisi strategica prima di un investimento o di un’operazione."],
      ["Fractional management", "Competenze executive attivate sul bisogno e sugli obiettivi."],
      ["Legal advisory", "Coordinamento specialistico a supporto delle decisioni strategiche."],
    ],
  },
  {
    path: "/finanza/",
    label: "Finanza e Fundraising",
    eyebrow: "Capitale su misura",
    title: "La struttura finanziaria giusta per ogni ambizione.",
    description: "Prepariamo l’impresa all’incontro con il capitale e accompagniamo ogni fase del percorso finanziario.",
    services: [
      ["Fundraising Equity & Debt", "Strategia, materiali e processo per raccogliere capitale."],
      ["Private Equity", "Preparazione e gestione del dialogo con investitori istituzionali."],
      ["Debt Advisory", "Analisi e negoziazione di soluzioni di debito coerenti."],
      ["Finanza agevolata", "Individuazione e gestione delle opportunità disponibili."],
    ],
  },
  {
    path: "/business-development/",
    label: "Business Development",
    eyebrow: "Nuove opportunità",
    title: "Dalla strategia commerciale alla presenza sul mercato.",
    description: "Trasformiamo il potenziale in pipeline, partnership e sistemi di sviluppo replicabili.",
    services: [
      ["Sviluppo commerciale", "Architettura dell’offerta, pipeline e presidio delle opportunità."],
      ["Go to market", "Scelte di canale, mercato e priorità commerciali."],
      ["Start-up studio", "Validazione, lancio e accelerazione di nuove iniziative."],
      ["Comunicazione e Brand", "Posizionamento, identità e contenuti per sostenere il business.", "/business-development/comunicazione/"],
    ],
  },
  {
    path: "/coaching-benessere/",
    label: "Coaching e Benessere",
    eyebrow: "Persone e organizzazioni",
    title: "Leadership e benessere per risultati sostenibili.",
    description: "Aiutiamo leader e team a crescere, attraversare il cambiamento e lavorare con maggiore efficacia.",
    services: [
      ["Executive Coaching", "Percorsi individuali per decisioni, leadership e impatto."],
      ["Benessere organizzativo", "Programmi dedicati a energia, qualità del lavoro e cultura.", "/coaching-benessere/benessere/"],
      ["HR Strategy", "Persone, competenze e organizzazione allineate alla strategia."],
      ["Passaggio generazionale", "Accompagnamento delle persone e della governance nel cambiamento."],
    ],
  },
];

export const detailPages = [
  { path: "/growth/green-energy/", eyebrow: "Growth Capital", title: "Green Energy", description: "Advisory e finanza per iniziative nella transizione energetica, dall’analisi del progetto alla strutturazione del capitale.", capabilities: ["Valutazione del progetto", "Strutturazione finanziaria", "Ricerca di investitori", "Supporto alla negoziazione"] },
  { path: "/growth/real-estate/", eyebrow: "Growth Capital", title: "Real Estate", description: "Supporto strategico e finanziario per operazioni e progetti immobiliari ad alto potenziale.", capabilities: ["Analisi dell’opportunità", "Business planning", "Capital structure", "Partner search"] },
  { path: "/business-development/comunicazione/", eyebrow: "Business Development", title: "Comunicazione e Brand", description: "Identità, reputazione e contenuti collegati agli obiettivi di crescita dell’impresa.", capabilities: ["Brand identity e positioning", "PR e media relations", "Content marketing", "Social media strategy", "Comunicazione interna"] },
  { path: "/coaching-benessere/benessere/", eyebrow: "Coaching e Benessere", title: "Benessere organizzativo", description: "Programmi concreti per migliorare energia, relazioni e qualità del lavoro nelle organizzazioni.", capabilities: ["Assessment", "Programmi per i team", "Workshop e formazione", "Misurazione dei risultati"] },
];

export const editorialCards = [
  ["Pubblicazioni", "Analisi e strumenti per leggere scenari, capitale e trasformazione.", "/education/"],
  ["Blog & News", "Aggiornamenti, punti di vista e novità dal team XCapital.", "/category/press/"],
  ["Webinar", "Conversazioni con esperti su temi che incidono sulle decisioni.", "/webinar/"],
];

export const processes = [
  ["01", "Ascolto", "Mettiamo a fuoco contesto, ambizione e vincoli."],
  ["02", "Diagnosi", "Costruiamo una lettura condivisa e le priorità."],
  ["03", "Esecuzione", "Lavoriamo al fianco del team sulle azioni decisive."],
  ["04", "Misurazione", "Verifichiamo risultati e prossime scelte."],
];

// Contenuti pubblici recuperati dalla demo xcapital.dev-test.it.
// Sono esclusi i campi chiaramente provvisori (Lorem ipsum, nomi/email placeholder e KPI fittizi).
export const companyDetails = {
  legalName: "Delex Capital S.r.l.",
  address: "via Creta, 26 – 25124 Brescia",
  phone: "+39 030 2423238",
  phoneHref: "tel:+390302423238",
  email: "segreteria@delex.legal",
  emailHref: "mailto:segreteria@delex.legal",
  communityHref: "https://capitalcommunity.it/",
};

export const values = [
  ["Trasparenza", "Operiamo con chiarezza in ogni fase, costruendo relazioni basate sulla fiducia e sull’integrità."],
  ["Innovazione", "Utilizziamo tecnologia e idee nuove per affrontare le sfide del settore finanziario."],
  ["Eccellenza", "Manteniamo standard qualitativi elevati in ogni progetto e servizio."],
  ["Orientamento al cliente", "Ascoltiamo le esigenze e costruiamo strategie coerenti con gli obiettivi specifici dell’impresa."],
  ["Integrità", "Ogni decisione riflette responsabilità, correttezza e principi etici."],
  ["Sostenibilità", "Promuoviamo soluzioni attente all’impatto di lungo periodo."],
  ["Collaborazione", "Lavoriamo in sinergia con clienti e partner per ottenere risultati migliori."],
];

export const teamMembers = [
  {
    name: "Fabio Carretta",
    role: "Managing Partner",
    description: "Guida la strategia complessiva di XCapital, con esperienza nell’investment banking e nella gestione di operazioni finanziarie complesse.",
    image: "/assets/team/fabio-carretta.jpg",
  },
  {
    name: "Barbara Di Giovanni",
    role: "Compliance and Investor Relations",
    description: "Segue la compliance aziendale e le relazioni con gli investitori, presidiando l’allineamento agli standard normativi e alle aspettative degli stakeholder.",
    image: "/assets/team/barbara-di-giovanni.jpg",
  },
  {
    name: "Francesco Consoli",
    role: "Partner",
    description: "Contribuisce allo sviluppo strategico e alla supervisione delle principali operazioni, portando una profonda conoscenza del settore finanziario.",
    image: "/assets/team/francesco-consoli.jpg",
  },
];

export const awards = [
  { year: "2023", title: "Finance Monthly M&A Awards", description: "DELEX Capital Adviser of the Year per il settore Corporate Finance.", image: "/assets/awards/finance-monthly-2023.jpg" },
  { year: "2022", title: "Finance Monthly M&A Awards", description: "DELEX Capital Adviser of the Year per il settore Corporate Finance.", image: "/assets/awards/finance-monthly-2022.jpg" },
  { year: "2021", title: "Finance Monthly M&A Awards", description: "DELEX Capital Adviser of the Year per il settore Corporate Finance.", image: "/assets/awards/finance-monthly-2021.jpg" },
];

export const transactions = [
  { slug: "iride-acque-secondo-round", client: "Iride Acque S.r.l.", type: "Advisory nella raccolta di Equity", detail: "Secondo round", amount: "€ 700.000,00", image: "/assets/clients/iride-acque.png" },
  { slug: "socopet-terzo-round", client: "Socopet S.r.l.", type: "Advisory nella raccolta di Equity", detail: "Terzo round", amount: "€ 500.000,00", image: "/assets/clients/socopet.png" },
  { slug: "amicorp-ipo", client: "Amicorp Limited", type: "Advisor nella IPO in collaborazione con Bowsprit Partners Ltd", detail: "", amount: "€ 16.000.000,00", image: "/assets/clients/amicorp.png" },
  { slug: "ellemme-minibond-uno", client: "Ellemme S.p.A.", type: "Advisory nell’emissione di minibond", detail: "", amount: "€ 1.000.000,00", image: "/assets/clients/ellemme.png" },
  { slug: "wearena-secondo-round", client: "WeArena S.p.A.", type: "Advisory nella raccolta di Equity", detail: "Secondo round", amount: "€ 500.000,00", image: "/assets/clients/wearena.png" },
  { slug: "ellemme-minibond-cinque", client: "Ellemme S.p.A.", type: "Advisory nell’emissione di minibond", detail: "", amount: "€ 5.000.000,00", image: "/assets/clients/ellemme.png" },
  { slug: "iride-acque-primo-round", client: "Iride Acque S.r.l.", type: "Advisory nella raccolta di Equity", detail: "Primo round", amount: "€ 700.000,00", image: "/assets/clients/iride-acque.png" },
  { slug: "royal-primo-round", client: "Royal S.r.l.", type: "Advisory nella raccolta di Equity", detail: "Primo round", amount: "€ 300.000,00", image: "/assets/clients/royal.png" },
  { slug: "socopet-secondo-round", client: "Socopet S.r.l.", type: "Advisory nella raccolta di Equity", detail: "Secondo round", amount: "€ 1.000.000,00", image: "/assets/clients/socopet.png" },
];

export const publications = [
  {
    date: "15 novembre 2024",
    title: "Adattamento dell’analisi per startup early-stage e late-stage",
    description: "Come valutare e investire nelle diverse fasi di sviluppo di una startup.",
    href: "https://xcapital.dev-test.it/adattamento-dellanalisi-per-startup-early-stage-e-late-stage-come-valutare-e-investire-in-ogni-fase-di-sviluppo/",
  },
  {
    date: "25 settembre 2024",
    title: "SAFE per PMI innovative",
    description: "Funzionamento, fiscalità e vantaggi rispetto agli strumenti finanziari partecipativi.",
    href: "https://xcapital.dev-test.it/safe-per-pmi-innovative-funzionamento-fiscalita-e-vantaggi-rispetto-agli-strumenti-finanziari-partecipativi-sfp/",
  },
];

export function normalizePath(pathname) {
  if (pathname === "/") return pathname;
  return `${pathname.replace(/\/+$/, "")}/`;
}
