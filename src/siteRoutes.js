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

export function normalizePath(pathname) {
  if (pathname === "/") return pathname;
  return `${pathname.replace(/\/+$/, "")}/`;
}

