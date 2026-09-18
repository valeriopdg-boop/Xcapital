import { useState } from "react";
import { ArrowDown, ArrowRight, ChartLineUp, CheckCircle, Compass, Handshake, Leaf, ShareNetwork, Target, UsersThree } from "@phosphor-icons/react";
import * as approvedContent from "./content.js";
import { Link } from "./router.jsx";
import { awards, companyDetails, editorialCards, processes, publications, serviceHubs, teamMembers, transactions, values } from "./siteRoutes.js";

const fallbackNavigation = { cta: { label: "Parla con il team", href: "/prenota/" } };
const fallbackProofs = [
  { id: "senior-expertise", title: "Senior expertise", description: "Un team con esperienza operativa e visione strategica." },
  { id: "integrated-vision", title: "Visione integrata", description: "Strategia, capitale, sviluppo e persone in un’unica prospettiva." },
  { id: "direct-commitment", title: "Impegno diretto", description: "Al fianco di imprenditori e manager in modo concreto e continuativo." },
];
const proofIcons = { "senior-expertise": UsersThree, "integrated-vision": Target, "direct-commitment": Handshake };
const competencyIcons = { "growth-capital": ChartLineUp, "strategic-advisory": Compass, "finance-fundraising": UsersThree, "business-development": ShareNetwork, "coaching-wellbeing": Leaf };

function PageHero({ eyebrow, title, description, image = "/assets/hero-team.png", imageAlt = "Professionisti XCapital al lavoro", cta = true }) {
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
        <figcaption>Strategia<br />che diventa azione</figcaption>
      </figure>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="method-section light-section" aria-labelledby="process-title">
      <div className="method-heading">
        <div><p className="eyebrow">Come lavoriamo</p><h2 id="process-title">Un processo chiaro e condiviso.</h2><p>Ogni incarico parte dalle domande giuste e procede con responsabilità, metodo e verifica.</p></div>
        <span>Dalla visione all’impatto</span>
      </div>
      <ol className="method-steps">{processes.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>
  );
}

function ClosingCta({ title = "Parliamo del tuo progetto.", description = "Un primo confronto può aiutare a mettere a fuoco priorità, rischi e opportunità." }) {
  return (
    <section className="closing-cta">
      <div><p className="eyebrow">Una conversazione può fare la differenza</p><h2>{title}</h2><p>{description}</p><Link className="button button-primary" href="/prenota/">Parla con il team <ArrowRight aria-hidden="true" /></Link></div>
      <p>Stessa direzione.<br /><strong>Più possibilità.</strong></p>
    </section>
  );
}

export function HomePage() {
  const navigation = approvedContent.navigation ?? fallbackNavigation;
  const proofPoints = approvedContent.proofPoints ?? fallbackProofs;
  const competenciesSection = approvedContent.competenciesSection ?? { eyebrow: "Le nostre competenze", title: "Competenze diverse. Una sola direzione.", description: "Un approccio multidisciplinare per supportare la crescita delle imprese.", note: { title: "Un obiettivo comune", description: "Valore duraturo per l’imprenditore" } };
  const competencies = approvedContent.competencies ?? serviceHubs.map((hub, index) => ({ id: ["growth-capital", "strategic-advisory", "finance-fundraising", "business-development", "coaching-wellbeing"][index], title: hub.label, description: hub.description, href: hub.path }));
  const methodSection = approvedContent.methodSection ?? { eyebrow: "Il nostro metodo", title: "Dall’ascolto ai risultati.", description: "Un percorso chiaro, concreto e condiviso.", overline: "Dalla visione all’impatto" };
  const methodSteps = approvedContent.methodSteps ?? processes.map(([number, title, description]) => ({ number, title, description }));

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Strategia. Capitale. Persone.</p>
          <h1 id="hero-title">Le decisioni importanti non si prendono da soli.</h1>
          <p className="hero-lead">Un team indipendente affianca imprenditori e manager dalla visione all’esecuzione.</p>
          <div className="button-row"><Link className="button button-primary" href={navigation.cta?.href || "/prenota/"}>{navigation.cta?.label || "Parla con il team"} <ArrowRight aria-hidden="true" /></Link><Link className="text-link" href="#metodo">Scopri come lavoriamo <ArrowRight aria-hidden="true" /></Link></div>
          <Link className="scroll-cue" href="#competenze"><ArrowDown aria-hidden="true" /> Scorri</Link>
        </div>
        <figure className="hero-media"><img src="/assets/hero-team.png" alt="Un confronto tra consulenti senior XCapital" /><figcaption>Un partner<br />per ciò che conta</figcaption></figure>
      </section>

      <section className="proof-strip" aria-label="I principi del nostro lavoro">
        {proofPoints.map((point) => { const Icon = proofIcons[point.id] || CheckCircle; return <article key={point.id || point.title}><Icon size={38} weight="light" aria-hidden="true" /><div><h2>{point.title}</h2><p>{point.description}</p></div></article>; })}
      </section>

      <section className="competencies-section light-section" id="competenze">
        <div className="section-heading"><div><p className="eyebrow">{competenciesSection.eyebrow}</p><h2>{competenciesSection.title}</h2><p>{competenciesSection.description}</p></div><aside><strong>{competenciesSection.note?.title}</strong><span>{competenciesSection.note?.description}</span></aside></div>
        <div className="competency-list">{competencies.map((competency, index) => { const Icon = competencyIcons[competency.id] || Compass; return <Link className={index === 2 ? "competency is-featured" : "competency"} href={competency.href} key={competency.id || competency.title}><Icon size={32} weight="light" aria-hidden="true" /><h3>{competency.title}</h3><p>{competency.description}</p></Link>; })}</div>
      </section>

      <section className="method-section light-section" id="metodo">
        <div className="method-heading"><div><p className="eyebrow">{methodSection.eyebrow}</p><h2>{methodSection.title}</h2><p>{methodSection.description}</p></div><span>{methodSection.overline}</span></div>
        <ol className="method-steps">{methodSteps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      </section>

      <section className="challenge-section light-section" aria-labelledby="challenge-title">
        <div className="section-heading">
          <div><p className="eyebrow">La tua sfida</p><h2 id="challenge-title">Da dove vuoi iniziare?</h2><p>Quattro percorsi per raggiungere subito le competenze più vicine al tuo obiettivo.</p></div>
        </div>
        <div className="challenge-grid">
          <Link href="/growth/" className="challenge-card"><span>01</span><h3>Acquisire o cedere un’impresa</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/growth/green-energy/" className="challenge-card"><span>02</span><h3>Finanziare un progetto di energia rinnovabile</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/growth/real-estate/" className="challenge-card"><span>03</span><h3>Valutare un’opportunità immobiliare</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/advisory/" className="challenge-card"><span>04</span><h3>Definire una nuova direzione strategica</h3><ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="evidence-section light-section" aria-labelledby="awards-title">
        <div className="section-heading"><div><p className="eyebrow">Riconoscimenti</p><h2 id="awards-title">Ambizione. Crescita. Riconoscimento.</h2><p>Tre riconoscimenti consecutivi nel settore Corporate Finance.</p></div></div>
        <div className="award-grid">{awards.map((award) => <article className="award-card" key={award.year}><img src={award.image} alt={`${award.title} ${award.year}`} /><p className="eyebrow">{award.year}</p><h3>{award.title}</h3><p>{award.description}</p></article>)}</div>
      </section>

      <section className="operations-preview light-section" aria-labelledby="operations-title">
        <div className="section-heading"><div><p className="eyebrow">Track Record</p><h2 id="operations-title">Operazioni recenti.</h2><p>Una selezione delle operazioni seguite dal team XCapital.</p></div><Link className="button button-primary" href="/track-record/">Vedi tutte le operazioni <ArrowRight aria-hidden="true" /></Link></div>
        <div className="transaction-grid">{transactions.slice(0, 3).map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}</div>
      </section>

      <section className="team-section" id="chi-siamo">
        <div className="team-copy"><p className="eyebrow">Il nostro team</p><h2>Persone che fanno la differenza.</h2><p>Senior advisor, imprenditori e professionisti con competenze complementari, uniti dalla stessa ambizione: contribuire al successo dei nostri clienti.</p><Link className="button button-primary" href="/chi-siamo/">Conosci il team <ArrowRight aria-hidden="true" /></Link></div>
        <img src="/assets/team-collaboration.png" alt="Il team XCapital durante una sessione di lavoro" />
        <p className="team-values">Esperienza<br />Relazioni<br />Prospettiva<br />Risultati</p>
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
        <div className="section-heading"><div><p className="eyebrow">Le aree di intervento</p><h2>{hub.label}</h2><p>Competenze coordinate in un unico percorso, con responsabilità chiare e presidio senior.</p></div><aside><strong>Approccio XCapital</strong><span>Indipendente, concreto, multidisciplinare.</span></aside></div>
        <div className="competency-list grid-three">
          {hub.services.map(([title, description, href]) => <Link className="competency" href={href || "/prenota/"} key={title}><Compass size={32} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{description}</p></Link>)}
        </div>
      </section>
      <ProcessSection />
      <ClosingCta title={`Confrontiamoci su ${hub.label}.`} />
    </>
  );
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
      <PageHero eyebrow="Chi siamo" title="Competenze diverse, responsabilità condivisa." description="XCapital è il brand di Delex Capital S.r.l., società indipendente che affianca imprenditori, manager e investitori nelle fasi decisive della crescita." image="/assets/team-collaboration.png" />
      <section className="team-section" id="page-content"><div className="team-copy"><p className="eyebrow">Il nostro team</p><h2>Esperienza che entra nel merito.</h2><p>Advisory board, senior advisor e specialisti lavorano insieme, combinando visione strategica ed esperienza operativa.</p><Link className="button button-primary" href="/prenota/">Parla con noi <ArrowRight aria-hidden="true" /></Link></div><img src="/assets/hero-team.png" alt="Professionisti XCapital riuniti al tavolo" /><p className="team-values">Indipendenza<br />Rigore<br />Ascolto<br />Impatto</p></section>
      <section className="people-section light-section" aria-labelledby="team-title"><div className="section-heading"><div><p className="eyebrow">Persone</p><h2 id="team-title">Il team XCapital.</h2><p>Competenze complementari per seguire strategia, finanza, compliance e sviluppo delle opportunità.</p></div></div><div className="people-grid">{teamMembers.map((member) => <article className="person-card" key={member.name}><img src={member.image} alt={member.name} /><div><p className="eyebrow">{member.role}</p><h3>{member.name}</h3><p>{member.description}</p></div></article>)}</div></section>
      <section className="values-section light-section" aria-labelledby="values-title"><div className="section-heading"><div><p className="eyebrow">Principi cardine</p><h2 id="values-title">I valori che guidano il lavoro.</h2><p>Trasparenza, competenza e responsabilità nelle relazioni con clienti e partner.</p></div></div><div className="values-grid">{values.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
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

  return <><PageHero eyebrow="Track Record" title="Esperienza nelle decisioni che contano." description="Operazioni di equity, IPO e minibond seguite da XCapital." /><section className="operations-archive light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">Operazioni</p><h2>Risultati costruiti insieme.</h2><p>Una selezione di operazioni perfezionate con il supporto del team.</p></div></div><div className="transaction-grid">{transactions.map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}</div></section><ClosingCta /></>;
}

export function InsightPage({ active }) {
  const titleByActive = { education: "Pubblicazioni", press: "Blog & News", webinar: "Webinar" };
  const title = titleByActive[active] || "Insight e Risorse";
  const cards = active ? [] : editorialCards;
  return <><PageHero eyebrow="Risorse" title={title} description="Analisi, incontri e strumenti per affrontare con maggiore consapevolezza le decisioni che contano." /><section className="competencies-section light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">In evidenza</p><h2>Conoscenza che prepara l’azione.</h2><p>Contenuti pubblicati da XCapital per accompagnare valutazioni e decisioni.</p></div></div>{cards.length > 0 && <div className="competency-list grid-three">{cards.map(([cardTitle, description, href]) => <Link className="competency" href={href} key={cardTitle}><Compass size={32} weight="light" aria-hidden="true" /><h3>{cardTitle}</h3><p>{description}</p></Link>)}</div>}<div className="publication-list">{publications.map((publication) => <a className="publication-card" href={publication.href} target="_blank" rel="noreferrer" key={publication.title}><p className="eyebrow">{publication.date}</p><h3>{publication.title}</h3><p>{publication.description}</p><span>Leggi la pubblicazione <ArrowRight aria-hidden="true" /></span></a>)}</div></section><ClosingCta title="Vuoi approfondire un tema?" /></>;
}

export function ContactPage({ booking = false }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow={booking ? "Prenota una call" : "Contatti"} title={booking ? "Iniziamo da una conversazione." : "Parliamo del tuo progetto."} description="Il modulo è una demo frontend: mostra il flusso e gli stati dell’esperienza, ma non invia dati a un backend." cta={false} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Demo senza invio esterno</p><h2>{sent ? "Richiesta simulata." : "Raccontaci il tuo obiettivo."}</h2><p>{sent ? "Nessun dato è stato trasmesso o archiviato." : "Nel sito definitivo il form dovrà essere collegato a un endpoint approvato, con gestione privacy, sicurezza e consenso."}</p></div></div>
        <address className="contact-details"><div><span>Sede</span><strong>{companyDetails.address}</strong></div><a href={companyDetails.phoneHref}><span>Telefono</span><strong>{companyDetails.phone}</strong></a><a href={companyDetails.emailHref}><span>Email</span><strong>{companyDetails.email}</strong></a></address>
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

export function XCapitalPointPage() {
  return <><PageHero eyebrow="XCapital Point" title="Competenze vicine alle imprese." description="Landing dimostrativa dedicata al programma territoriale e di affiliazione XCapital." /><section className="competencies-section light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">Il programma</p><h2>Una rete con una direzione comune.</h2><p>Modello, requisiti e condizioni devono essere definiti prima della pubblicazione.</p></div></div></section><ClosingCta /></>;
}

export function NotFoundPage() {
  return <><PageHero eyebrow="Errore 404" title="Questa pagina non esiste." description="L’indirizzo potrebbe essere cambiato oppure la risorsa non è più disponibile." cta={false} /><section className="closing-cta" id="page-content"><div><h2>Riparti dalla homepage.</h2><p>Troverai una panoramica delle competenze, del metodo e del team XCapital.</p><Link className="button button-primary" href="/">Torna alla homepage <ArrowRight aria-hidden="true" /></Link></div></section></>;
}
