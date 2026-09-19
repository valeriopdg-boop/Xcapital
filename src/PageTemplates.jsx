import { useState } from "react";
import { ArrowDown, ArrowRight, Buildings, ChartLineUp, CheckCircle, Compass, Database, Handshake, Leaf, MagnifyingGlass, Rocket, ShareNetwork, ShieldCheck, Target, UsersThree } from "@phosphor-icons/react";
import * as approvedContent from "./content.js";
import { Link } from "./router.jsx";
import { awards, capitalCommunity, companyDetails, coreServices, dealIntelligence, editorialCards, pillars, processes, publications, sectors, serviceHubs, stats, teamMembers, transactions, clientTypes, values } from "./siteRoutes.js";

const fallbackNavigation = { cta: { label: "Parla con il team", href: "/prenota/" } };
const fallbackProofs = [
  { id: "independent", title: "Indipendenti", description: "Una boutique indipendente, senza vincoli di prodotto o logiche bancarie." },
  { id: "senior-led", title: "Senior-led", description: "Professionisti senior direttamente coinvolti in ogni mandato." },
  { id: "execution-driven", title: "Execution driven", description: "Il nostro valore non è un report, ma portare l’operazione a buon fine." },
];
const proofIcons = { independent: ShieldCheck, "senior-led": UsersThree, "execution-driven": Target };
const competencyIcons = { "ma-advisory": Handshake, "corporate-finance": ChartLineUp, "real-estate": Buildings, "energy-infrastructure": Leaf, "strategic-advisory": Compass, "growth-venture": Rocket };
const pillarIcons = { advisory: Handshake, origination: MagnifyingGlass, intelligence: Database, distribution: ShareNetwork };

function PageHero({ eyebrow, title, description, image = "/assets/hero-team.png", imageAlt = "Professionisti Delex Capital al lavoro", cta = true }) {
  return (
    <section className="hero page-hero" aria-labelledby="page-title">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className="hero-lead">{description}</p>
        {cta && <div className="button-row"><Link className="button button-primary" href="/prenota/">Parla con un esperto <ArrowRight aria-hidden="true" /></Link></div>}
        <Link className="scroll-cue" href="#page-content"><ArrowDown aria-hidden="true" /> Scopri di più</Link>
      </div>
      <figure className="hero-media">
        <img src={image} alt={imageAlt} />
        <figcaption>Advisory.<br />Intelligence.<br />Distribution.</figcaption>
      </figure>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="method-section light-section" aria-labelledby="process-title">
      <div className="method-heading">
        <div><p className="eyebrow">Come lavoriamo</p><h2 id="process-title">Un approccio strutturato.</h2><p>Combiniamo competenze settoriali, intelligence proprietaria e un processo rigoroso per generare risultati concreti.</p></div>
        <span>Dalla strategia al closing</span>
      </div>
      <ol className="method-steps model-grid">{processes.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>
  );
}

function ClosingCta({ title = "Parliamo del tuo progetto.", description = "Un primo confronto può aiutare a mettere a fuoco priorità, rischi e opportunità." }) {
  return (
    <section className="closing-cta">
      <div><p className="eyebrow">Una conversazione può fare la differenza</p><h2>{title}</h2><p>{description}</p><Link className="button button-primary" href="/prenota/">Parla con il team <ArrowRight aria-hidden="true" /></Link></div>
      <p>Connecting opportunities.<br /><strong>Creating value.</strong></p>
    </section>
  );
}

export function HomePage() {
  const navigation = approvedContent.navigation ?? fallbackNavigation;
  const proofPoints = approvedContent.proofPoints ?? fallbackProofs;
  const competenciesSection = approvedContent.competenciesSection ?? { eyebrow: "Le practice", title: "Competenze profonde. Prospettiva ampia.", description: "Quattro practice principali integrate da advisory strategica e supporto alla crescita.", note: { title: "Un unico obiettivo", description: "Il successo dei nostri clienti" } };
  const competencies = approvedContent.competencies ?? serviceHubs.map((hub) => ({ id: hub.path.replaceAll("/", ""), title: hub.label, description: hub.description, href: hub.path }));
  const methodSection = approvedContent.methodSection ?? { eyebrow: "Il modello operativo", title: "Un approccio strutturato.", description: "Competenze settoriali, intelligence proprietaria e processo rigoroso.", overline: "Dalla strategia al closing" };
  const methodSteps = approvedContent.methodSteps ?? processes.map(([number, title, description]) => ({ number, title, description }));

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Independent Advisory. Proprietary Intelligence. Execution.</p>
          <h1 id="hero-title">Beyond Traditional Advisory.</h1>
          <p className="hero-lead">Una boutique indipendente di advisory che affianca imprenditori, aziende, investitori e sviluppatori in operazioni straordinarie, capitale ed esecuzione strategica.</p>
          <div className="button-row"><Link className="button button-primary" href={navigation.cta?.href || "/prenota/"}>{navigation.cta?.label || "Parla con il team"} <ArrowRight aria-hidden="true" /></Link><Link className="text-link" href="/services/">Scopri le practice <ArrowRight aria-hidden="true" /></Link></div>
          <Link className="scroll-cue" href="#pilastri"><ArrowDown aria-hidden="true" /> Scorri</Link>
        </div>
        <figure className="hero-media"><img src="/assets/hero-team.png" alt="Un confronto tra i senior advisor Delex Capital" /><figcaption>Connecting opportunities.<br />Creating value.</figcaption></figure>
      </section>

      <section className="proof-strip" aria-label="I principi del nostro lavoro">
        {proofPoints.map((point) => { const Icon = proofIcons[point.id] || CheckCircle; return <article key={point.id || point.title}><Icon size={38} weight="light" aria-hidden="true" /><div><h2>{point.title}</h2><p>{point.description}</p></div></article>; })}
      </section>

      <section className="pillars-section light-section" id="pilastri" aria-labelledby="pillars-title">
        <div className="section-heading"><div><p className="eyebrow">Il nostro posizionamento</p><h2 id="pillars-title">Beyond Traditional Advisory.</h2><p>Un ecosistema integrato che unisce competenze, accesso e intelligenza proprietaria per creare valore e generare risultati.</p></div><aside><strong>Quattro pilastri</strong><span>Un unico obiettivo: il successo dei nostri clienti.</span></aside></div>
        <div className="pillars-grid">{pillars.map((pillar) => { const Icon = pillarIcons[pillar.id] || Compass; return <article className="pillar-card" key={pillar.id}><Icon size={36} weight="light" aria-hidden="true" /><h3>{pillar.title}</h3><p>{pillar.description}</p></article>; })}</div>
      </section>

      <section className="competencies-section light-section" id="competenze">
        <div className="section-heading"><div><p className="eyebrow">{competenciesSection.eyebrow}</p><h2>{competenciesSection.title}</h2><p>{competenciesSection.description}</p></div><aside><strong>{competenciesSection.note?.title}</strong><span>{competenciesSection.note?.description}</span></aside></div>
        <div className="competency-list grid-three">{competencies.map((competency) => { const Icon = competencyIcons[competency.id] || Compass; return <Link className="competency" href={competency.href} key={competency.id || competency.title}><Icon size={32} weight="light" aria-hidden="true" /><h3>{competency.title}</h3><p>{competency.description}</p></Link>; })}</div>
      </section>

      <section className="stats-band" aria-label="Delex Capital in numeri">
        <div className="stats-grid">
          <article><strong>33</strong><span>Mandati attivi</span></article>
          <article><strong>50+</strong><span>Operazioni gestite</span></article>
          <article><strong>100+</strong><span>Mandati e operazioni</span></article>
          <article><strong>13+</strong><span>Aree di settore</span></article>
          <article><strong>20+</strong><span>Anni di esperienza combinata</span></article>
        </div>
        <p className="stats-note">Dati aggiornati al 30 giugno 2026</p>
      </section>

      <section className="method-section light-section" id="metodo">
        <div className="method-heading"><div><p className="eyebrow">{methodSection.eyebrow}</p><h2>{methodSection.title}</h2><p>{methodSection.description}</p></div><span>{methodSection.overline}</span></div>
        <ol className="method-steps model-grid">{methodSteps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      </section>

      <section className="di-section" id="deal-intelligence" aria-labelledby="di-title">
        <div className="section-heading"><div><p className="eyebrow">Delex Deal Intelligence</p><h2 id="di-title">Dall’attività di mercato all’intelligenza proprietaria.</h2><p>Ogni attività di origination, ogni contatto, ogni mandato e ogni operazione arricchiscono continuamente il nostro database proprietario, creando un patrimonio unico di relazioni, informazioni e insight.</p></div><aside><strong>Un patrimonio che cresce ogni giorno</strong><span>Ogni mandato rende Delex più informata e più efficace per quello successivo.</span></aside></div>
        <ul className="di-domains">{dealIntelligence.domains.map((domain) => <li key={domain}>{domain}</li>)}</ul>
        <div className="di-benefits">{dealIntelligence.benefits.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="cc-section light-section" id="capital-community" aria-labelledby="cc-title">
        <div className="section-heading"><div><p className="eyebrow">Capital Community</p><h2 id="cc-title">Un ecosistema qualificato per opportunità selezionate.</h2><p>Capital Community è la piattaforma proprietaria di Delex Capital che connette opportunità di investimento e di business con una rete qualificata di investitori, imprenditori e professionisti.</p></div><aside><strong>Advisory. Intelligence. Distribution.</strong><span>Distribuzione riservata e mirata, nel pieno rispetto della riservatezza.</span></aside></div>
        <div className="cc-grid">
          <ul className="cc-categories">{capitalCommunity.categories.map((category) => <li key={category}><CheckCircle size={22} weight="light" aria-hidden="true" /> {category}</li>)}</ul>
          <ul className="cc-qualities">{capitalCommunity.qualities.map((quality) => <li key={quality}>{quality}</li>)}</ul>
        </div>
        <a className="text-link dark-link" href={companyDetails.communityHref} target="_blank" rel="noreferrer">Scopri Capital Community <ArrowRight aria-hidden="true" /></a>
      </section>

      <section className="sectors-section light-section" aria-labelledby="sectors-title">
        <div className="section-heading"><div><p className="eyebrow">Sector experience</p><h2 id="sectors-title">Competenza profonda. Prospettiva ampia.</h2><p>Operiamo in un’ampia gamma di settori con un solido track record di operazioni, mandati e incarichi di consulenza.</p></div><aside><strong>Sector-focused quando serve</strong><span>Trasversali per natura.</span></aside></div>
        <ul className="sectors-cloud">{sectors.map((sector) => <li key={sector}>{sector}</li>)}</ul>
      </section>

      <section className="evidence-section light-section" aria-labelledby="awards-title">
        <div className="section-heading"><div><p className="eyebrow">Riconoscimenti</p><h2 id="awards-title">Ambizione. Crescita. Riconoscimento.</h2><p>Tre riconoscimenti consecutivi nel settore Corporate Finance.</p></div></div>
        <div className="award-grid">{awards.map((award) => <article className="award-card" key={award.year}><img src={award.image} alt={`${award.title} ${award.year}`} /><p className="eyebrow">{award.year}</p><h3>{award.title}</h3><p>{award.description}</p></article>)}</div>
      </section>

      <section className="operations-preview light-section" aria-labelledby="operations-title">
        <div className="section-heading"><div><p className="eyebrow">Track Record</p><h2 id="operations-title">Proven expertise. Diverse transactions.</h2><p>Una selezione delle operazioni seguite dal team Delex Capital.</p></div><Link className="button button-primary" href="/track-record/">Vedi tutte le operazioni <ArrowRight aria-hidden="true" /></Link></div>
        <div className="transaction-grid">{transactions.slice(0, 3).map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}</div>
      </section>

      <section className="team-section" id="chi-siamo">
        <div className="team-copy"><p className="eyebrow">Il nostro team</p><h2>Senior expertise. Esecuzione integrata.</h2><p>Senior advisor, analisti finanziari, relationship manager e specialisti di settore: un unico team, un unico standard, al fianco di ogni mandato.</p><Link className="button button-primary" href="/chi-siamo/">Conosci il team <ArrowRight aria-hidden="true" /></Link></div>
        <img src="/assets/team-collaboration.png" alt="Il team Delex Capital durante una sessione di lavoro" />
        <p className="team-values">Indipendenza<br />Intelligence<br />Relazioni<br />Risultati</p>
      </section>
      <ClosingCta />
    </>
  );
}

export function HubPage({ hub }) {
  return (
    <>
      <PageHero eyebrow={hub.eyebrow} title={hub.title} description={hub.description} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Le aree di intervento</p><h2>{hub.label}</h2><p>Attività coordinate in un unico percorso, con responsabilità chiare e presidio senior.</p></div><aside><strong>Approccio Delex</strong><span>Indipendente, senior-led, orientato all’execution.</span></aside></div>
        <div className={hub.services.length > 4 ? "competency-list grid-three" : "competency-list grid-two"}>
          {hub.services.map(([title, description, href]) => <Link className="competency" href={href || "/prenota/"} key={title}><Compass size={32} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{description}</p></Link>)}
        </div>
      </section>
      <ProcessSection />
      <ClosingCta title={`Confrontiamoci su ${hub.label}.`} />
    </>
  );
}

export function ServicesPage() {
  return <>
    <PageHero eyebrow="Le practice" title="Beyond Traditional Advisory." description="Quattro practice principali — M&A, corporate finance, real estate ed energy & infrastructure — integrate da advisory strategica e supporto alla crescita di startup e scale-up." />
    <section className="services-intro light-section" id="page-content">
      <div className="section-heading"><div><p className="eyebrow">Il modello Delex</p><h2>Advisory. Origination. Intelligence. Distribution.</h2><p>Un modello di advisory indipendente, imprenditoriale e orientato ai risultati. Combiniamo competenze finanziarie, origination proprietaria e conoscenza trasversale del mercato per guidare decisioni complesse e portare le operazioni a buon fine.</p><p>Non ci limitiamo a trovare opportunità: costruiamo le condizioni per trasformarle in risultati.</p></div></div>
      <div className="service-detail-list">{coreServices.map((service) => <article className="service-detail" id={service.id} key={service.id}><span className="service-number">{service.number}</span><div><p className="eyebrow">{service.title}</p><h2>{service.tagline}</h2><p>{service.description}</p>{service.href && <Link className="text-link dark-link" href={service.href}>Scopri la practice <ArrowRight aria-hidden="true" /></Link>}</div></article>)}</div>
    </section>
    <ClosingCta title="Quale operazione vuoi realizzare?" description="Condividi obiettivi, tempi e contesto: individueremo la practice e il team più adatti." />
  </>;
}

export function DetailPage({ page }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Cosa includiamo</p><h2>Un percorso costruito sul progetto.</h2><p>Perimetro, team e priorità vengono definiti dopo una prima diagnosi condivisa.</p></div></div>
        <div className="competency-list grid-two">{page.capabilities.map((item) => <article className="competency" key={item}><CheckCircle size={32} weight="light" aria-hidden="true" /><h3>{item}</h3><p>Attività configurata sulla complessità, gli obiettivi e i tempi dell’organizzazione.</p></article>)}</div>
      </section>
      <ProcessSection />
      <ClosingCta />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Chi siamo" title="Competenze senior. Esecuzione integrata." description="Delex Capital è una boutique indipendente di advisory che affianca imprenditori, aziende, investitori e sviluppatori in operazioni straordinarie, capitale ed esecuzione strategica, con focus sul lower-mid e mid-market italiano." image="/assets/team-collaboration.png" />
      <section className="team-section" id="page-content"><div className="team-copy"><p className="eyebrow">Il nostro team</p><h2>Esperienza che entra nel merito.</h2><p>Senior advisor, analisti finanziari, relationship manager, specialisti real estate e industry expert lavorano insieme in un modello di esecuzione integrata: un unico team, un unico standard.</p><Link className="button button-primary" href="/prenota/">Parla con noi <ArrowRight aria-hidden="true" /></Link></div><img src="/assets/hero-team.png" alt="Professionisti Delex Capital riuniti al tavolo" /><p className="team-values">Indipendenza<br />Rigore<br />Riservatezza<br />Risultati</p></section>
      <section className="people-section light-section" aria-labelledby="clients-title"><div className="section-heading"><div><p className="eyebrow">Con chi lavoriamo</p><h2 id="clients-title">Partner di fiducia per imprenditori, investitori e operatori.</h2><p>Affianchiamo una clientela diversificata con esigenze specifiche, offrendo soluzioni su misura e massima riservatezza.</p></div></div><div className="clients-grid">{clientTypes.map(([title, description]) => <article className="competency" key={title}><UsersThree size={32} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="people-section light-section" aria-labelledby="team-title"><div className="section-heading"><div><p className="eyebrow">Persone</p><h2 id="team-title">Il team Delex Capital.</h2><p>Professionalità complementari per seguire strategia, finanza, compliance e sviluppo delle opportunità.</p></div></div><div className="people-grid">{teamMembers.map((member) => <article className="person-card" key={member.name}><img src={member.image} alt={member.name} /><div><p className="eyebrow">{member.role}</p><h3>{member.name}</h3><p>{member.description}</p></div></article>)}</div></section>
      <section className="values-section light-section" aria-labelledby="values-title"><div className="section-heading"><div><p className="eyebrow">Principi cardine</p><h2 id="values-title">I valori che guidano il lavoro.</h2><p>Indipendenza, riservatezza e orientamento ai risultati nelle relazioni con clienti e partner.</p></div></div><div className="values-grid">{values.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <ClosingCta />
    </>
  );
}

function TransactionCard({ transaction }) {
  return <Link className="transaction-card" href={`/track-record/${transaction.slug}/`}><div className="transaction-logo"><img src={transaction.image} alt={transaction.client} /></div><p className="eyebrow">{transaction.type}</p><h3>{transaction.client}</h3>{transaction.detail && <p>{transaction.detail}</p>}<strong>{transaction.amount}</strong><span>Approfondisci <ArrowRight aria-hidden="true" /></span></Link>;
}

export function TrackRecordPage({ slug }) {
  if (slug) {
    const transaction = transactions.find((item) => item.slug === slug);
    if (!transaction) return <NotFoundPage />;
    return <><PageHero eyebrow="Track Record" title={transaction.client} description={`${transaction.type}${transaction.detail ? ` · ${transaction.detail}` : ""}.`} cta={false} /><section className="transaction-detail light-section" id="page-content"><div className="transaction-detail-logo"><img src={transaction.image} alt={transaction.client} /></div><div><p className="eyebrow">Valore dell’operazione</p><h2>{transaction.amount}</h2><p>Un incarico seguito con presidio specialistico nelle fasi decisive dell’operazione.</p><Link className="text-link dark-link" href="/track-record/">Torna al Track Record <ArrowRight aria-hidden="true" /></Link></div></section><ClosingCta /></>;
  }

  return <><PageHero eyebrow="Track Record" title="Proven expertise. Diverse transactions." description="Una selezione di operazioni di equity, IPO e minibond seguite dal team: operazioni diverse, un unico standard di esecuzione." /><section className="operations-archive light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">Operazioni</p><h2>Risultati costruiti insieme.</h2><p>Una selezione di operazioni perfezionate con il supporto del team.</p></div></div><div className="transaction-grid">{transactions.map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}</div></section><ClosingCta /></>;
}

export function InsightPage({ active }) {
  const titleByActive = { education: "Pubblicazioni", press: "Blog & News", webinar: "Webinar" };
  const title = titleByActive[active] || "Insight e Risorse";
  const cards = active ? [] : editorialCards;
  return <><PageHero eyebrow="Risorse" title={title} description="Analisi, incontri e strumenti per affrontare con maggiore consapevolezza le decisioni che contano." /><section className="competencies-section light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">In evidenza</p><h2>Dall’esperienza di mercato a una voce pubblica.</h2><p>Contenuti pubblicati da Delex Capital per accompagnare valutazioni e decisioni.</p></div></div>{cards.length > 0 && <div className="competency-list grid-three">{cards.map(([cardTitle, description, href]) => <Link className="competency" href={href} key={cardTitle}><Compass size={32} weight="light" aria-hidden="true" /><h3>{cardTitle}</h3><p>{description}</p></Link>)}</div>}<div className="publication-list">{publications.map((publication) => <a className="publication-card" href={publication.href} target="_blank" rel="noreferrer" key={publication.title}><p className="eyebrow">{publication.date}</p><h3>{publication.title}</h3><p>{publication.description}</p><span>Leggi la pubblicazione <ArrowRight aria-hidden="true" /></span></a>)}</div></section><ClosingCta title="Vuoi approfondire un tema?" /></>;
}

export function ContactPage({ booking = false }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow={booking ? "Prenota una call" : "Contatti"} title={booking ? "Iniziamo da una conversazione." : "Parliamo del tuo progetto."} description="Il modulo è una demo frontend: mostra il flusso e gli stati dell’esperienza, ma non invia dati a un backend." cta={false} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Demo senza invio esterno</p><h2>{sent ? "Richiesta simulata." : "Raccontaci il tuo obiettivo."}</h2><p>{sent ? "Nessun dato è stato trasmesso o archiviato." : "Nel sito definitivo il form dovrà essere collegato a un endpoint approvato, con gestione privacy, sicurezza e consenso."}</p></div></div>
        <address className="contact-details"><div><span>Sedi</span><strong>{companyDetails.address} · {companyDetails.offices}</strong></div><a href={companyDetails.phoneHref}><span>Telefono</span><strong>{companyDetails.phone}</strong></a><a href={companyDetails.emailHref}><span>Email</span><strong>{companyDetails.email}</strong></a></address>
        {sent ? <div className="dialog-success" role="status"><CheckCircle size={48} weight="light" aria-hidden="true" /><h2>Grazie.</h2><p>La simulazione si è conclusa correttamente.</p><button className="button button-primary" type="button" onClick={() => setSent(false)}>Nuova richiesta</button></div> : <form className="contact-dialog" style={{ display: "block", position: "static", margin: 0, maxHeight: "none", boxShadow: "none", border: "1px solid var(--line)" }} onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Nome e cognome<input name="name" autoComplete="name" required /></label><label>Email professionale<input name="email" type="email" autoComplete="email" required /></label><label>Azienda<input name="company" autoComplete="organization" /></label><label>Messaggio<textarea name="message" rows="5" required /></label><label className="consent"><input type="checkbox" required /><span>Confermo di aver compreso che questo form è una demo e non invia dati.</span></label><button className="button button-primary" type="submit">Simula invio <ArrowRight aria-hidden="true" /></button></form>}
      </section>
    </>
  );
}

const legalCopy = {
  privacy: ["Informativa privacy", "Questa pagina è predisposta per ospitare l’informativa privacy definitiva. Prima della pubblicazione deve essere completata e approvata dal titolare del trattamento e dai consulenti competenti.", ["Titolare e dati di contatto", "Finalità e basi giuridiche", "Categorie di dati e conservazione", "Destinatari e trasferimenti", "Diritti degli interessati"]],
  cookie: ["Cookie Policy", "Questa pagina è predisposta per ospitare la cookie policy definitiva. La versione pubblicata dovrà riflettere soltanto i cookie e i servizi effettivamente attivi.", ["Cookie tecnici", "Preferenze", "Misurazione e analytics", "Servizi di terze parti", "Gestione del consenso"]],
};

export function LegalPage({ type }) {
  const [title, description, items] = legalCopy[type];
  return <><PageHero eyebrow="Informazioni legali" title={title} description={description} cta={false} /><section className="competencies-section light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">Struttura del documento</p><h2>Contenuto da validare prima del rilascio.</h2><p>Le sezioni seguenti sono segnaposto redazionali, non un’informativa legale completa.</p></div></div><div className="competency-list grid-two">{items.map((item) => <article className="competency" key={item}><CheckCircle size={32} weight="light" aria-hidden="true" /><h3>{item}</h3><p>Testo definitivo da fornire e approvare.</p></article>)}</div></section></>;
}

export function NotFoundPage() {
  return <><PageHero eyebrow="Errore 404" title="Questa pagina non esiste." description="L’indirizzo potrebbe essere cambiato oppure la risorsa non è più disponibile." cta={false} /><section className="closing-cta" id="page-content"><div><h2>Riparti dalla homepage.</h2><p>Troverai una panoramica delle practice, del modello operativo e del team Delex Capital.</p><Link className="button button-primary" href="/">Torna alla homepage <ArrowRight aria-hidden="true" /></Link></div></section></>;
}
