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
    { label: 'Contatti', href: '/contatti/' },
  ],
  locales: [
    { label: 'IT', href: '/' },
    { label: 'EN', href: '/en/' },
  ],
  copyright: '\u00a9 2026 XCapital. Tutti i diritti riservati.',
};
