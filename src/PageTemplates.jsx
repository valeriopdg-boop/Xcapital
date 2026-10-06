import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Buildings, CaretDown, ChartLineUp, CheckCircle, Compass, Database, Handshake, Leaf, LinkedinLogo, Megaphone, MagnifyingGlass, Rocket, ShareNetwork, ShieldCheck, Target, UsersThree } from "@phosphor-icons/react";
import * as approvedContent from "./content.js";
import { Link, navigate } from "./router.jsx";
import articles from "./generated/articles.json";
import { activeMandates, advisoryBoard, awards, capitalCommunity, companyDetails, dealIntelligence, pillars, processes, sectors, serviceHubs, squadraRoles, transactions, transactionCategories, clientTypes, values } from "./siteRoutes.js";

const fallbackNavigation = { cta: { label: "Prenota una call", href: "/prenota/" } };
const proofIcons = { independent: ShieldCheck, "senior-led": UsersThree, "execution-driven": Target };
const areaIcons = [Handshake, ChartLineUp, Buildings, Leaf, Compass, Rocket, Megaphone];

function StatNumber({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setDisplay(`0${suffix}`);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <strong ref={ref}>{display}</strong>;
}

function PageHero({ eyebrow, title, description, image = "/assets/hero-team.webp", imageAlt = "Professionisti Delex Capital al lavoro", cta = true, crumbs }) {
  return (
    <section className="hero page-hero" aria-labelledby="page-title">
      <div className="hero-copy">
        {crumbs && <nav className="breadcrumb" aria-label="Percorso">{crumbs.map((crumb, index) => index < crumbs.length - 1
          ? <span key={crumb.href}><Link href={crumb.href}>{crumb.label}</Link><i aria-hidden="true">/</i></span>
          : <span key={crumb.label} aria-current="page">{crumb.label}</span>)}</nav>}
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

function TransactionCard({ transaction }) {
  return <Link className="transaction-card" href={`/track-record/${transaction.slug}/`}><div className="transaction-logo"><img src={transaction.image} alt={transaction.client} /></div><p className="eyebrow">{transaction.area}</p><h3>{transaction.client}</h3><p>{transaction.type}</p><strong>{transaction.amount}</strong><span>Scheda operazione <ArrowRight aria-hidden="true" /></span></Link>;
}

function MandateCard({ mandate }) {
  return (
    <article className="mandate-card">
      <div className="mandate-head"><span className="mandate-id">{mandate.id}</span><span className="mandate-status">{mandate.status}</span></div>
      <h3>{mandate.description}</h3>
      <dl>
        <div><dt>Area</dt><dd>{mandate.area}</dd></div>
        <div><dt>Settore</dt><dd>{mandate.sector}</dd></div>
        <div><dt>Ruolo di Delex Capital</dt><dd>{mandate.role}</dd></div>
      </dl>
    </article>
  );
}

function TransactionSlider({ items }) {
  const trackRef = useRef(null);
  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: "smooth" });
  };
  return (
    <div className="slider-wrap">
      <div className="transaction-slider" ref={trackRef}>{items.map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}</div>
      <div className="slider-nav">
        <button type="button" aria-label="Operazioni precedenti" onClick={() => scrollByCard(-1)}><ArrowLeft aria-hidden="true" /></button>
        <button type="button" aria-label="Operazioni successive" onClick={() => scrollByCard(1)}><ArrowRight aria-hidden="true" /></button>
      </div>
    </div>
  );
}

function ProcessList({ steps, showMethodLink = true }) {
  return (
    <div className="process-vertical">
      <ol>{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      {showMethodLink && <Link className="text-link dark-link" href="/#metodo">Scopri il nostro metodo completo <ArrowRight aria-hidden="true" /></Link>}
    </div>
  );
}

function FaqSection({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <div className="faq-section">
      <p className="eyebrow">Domande frequenti</p>
      <div className="accordion">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary><span>{question}</span><CaretDown size={18} aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function SessionForm({ areaLabel }) {
  const [status, setStatus] = useState("idle");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <div className="session-form" role="status"><div className="session-copy"><p className="eyebrow">Richiesta inviata</p><h2>Grazie, ti ricontatteremo a breve.</h2><p>Il referente dell’area {areaLabel} ti risponderà personalmente.</p></div></div>;
  }

  return (
    <div className="session-form">
      <div className="session-copy">
        <p className="eyebrow">Prima sessione gratuita</p>
        <h2>45 minuti, senza impegno.</h2>
        <p>Per capire come possiamo aiutarti sul tuo progetto di {areaLabel.toLowerCase()}.</p>
        <Link className="text-link dark-link" href={`/prenota/?area=${encodeURIComponent(areaLabel)}`}>Prenota ora <ArrowRight aria-hidden="true" /></Link>
      </div>
      <form className="session-fields" onSubmit={handleSubmit}>
        <input type="hidden" name="area" value={areaLabel} />
        <label>Nome e cognome<input name="name" autoComplete="name" required /></label>
        <label>Email professionale<input name="email" type="email" autoComplete="email" required /></label>
        <label>Messaggio<textarea name="message" rows="3" required /></label>
        <div className="hp-field" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="consent"><input type="checkbox" required /><span>Acconsento al trattamento dei dati (<Link href="/privacy-policy/">informativa</Link>).</span></label>
        {status === "error" && <p className="form-error" role="alert">Invio non riuscito: scrivici a <a href={companyDetails.emailHref}>{companyDetails.email}</a>.</p>}
        <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Invio…" : "Invia la richiesta"} <ArrowRight aria-hidden="true" /></button>
      </form>
    </div>
  );
}

function ClosingCta({ title = "Parliamo del tuo progetto.", description = "Un primo confronto può aiutare a mettere a fuoco priorità, rischi e opportunità." }) {
  return (
    <section className="closing-cta">
      <div><p className="eyebrow">Una conversazione può fare la differenza</p><h2>{title}</h2><p>{description}</p><Link className="button button-primary" href="/prenota/">Prenota una call <ArrowRight aria-hidden="true" /></Link></div>
      <p>Connecting opportunities.<br /><strong>Creating value.</strong></p>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Consulenza strategica indipendente</p>
          <h1 id="hero-title">Advisory indipendente per M&A, finanza straordinaria, immobiliare ed energia.</h1>
          <p className="hero-lead"><strong>Dalla strategia alla crescita. Risultati concreti, competenze reali.</strong><br />Una boutique indipendente che affianca imprenditori, aziende e investitori in operazioni straordinarie, raccolta di capitale ed esecuzione strategica.</p>
          <div className="button-row"><Link className="button button-primary" href="/prenota/">Prenota una call gratuita <ArrowRight aria-hidden="true" /></Link><Link className="text-link" href="/servizi/">Scopri i servizi <ArrowRight aria-hidden="true" /></Link></div>
          <Link className="scroll-cue" href="#valori"><ArrowDown aria-hidden="true" /> Scorri</Link>
        </div>
        <figure className="hero-media"><img src="/assets/hero-team.webp" alt="Un confronto tra i senior advisor Delex Capital" /><figcaption>Connecting opportunities.<br />Creating value.</figcaption></figure>
      </section>

      <section className="proof-strip" id="valori" aria-label="I nostri valori">
        <article><ShieldCheck size={38} weight="light" aria-hidden="true" /><div><h2>Indipendenti</h2><p>Una boutique indipendente, senza vincoli di prodotto o logiche bancarie.</p></div></article>
        <article><UsersThree size={38} weight="light" aria-hidden="true" /><div><h2>Guidati da professionisti senior</h2><p>Professionisti senior direttamente coinvolti in ogni mandato.</p></div></article>
        <article><Target size={38} weight="light" aria-hidden="true" /><div><h2>Orientati al risultato</h2><p>Il nostro valore non è un report, ma portare l’operazione a buon fine.</p></div></article>
      </section>

      <section className="intro-section light-section" aria-labelledby="intro-title">
        <div className="intro-grid">
          <div>
            <p className="eyebrow">Chi è Delex Capital</p>
            <h2 id="intro-title">Un ecosistema di competenze al servizio della crescita.</h2>
            <p>Una boutique indipendente di advisory, focalizzata sul lower-mid e mid-market italiano: competenze finanziarie, ricerca proprietaria delle opportunità e conoscenza trasversale del mercato, con un approccio senior e orientato all’esecuzione in ogni incarico.</p>
            <Link className="text-link dark-link" href="/chi-siamo/#advisory-board">Scopri l’Advisory Board <ArrowRight aria-hidden="true" /></Link>
          </div>
          <img src="/assets/heroes/strategic-advisory.webp" alt="Un tavolo di lavoro Delex Capital con vista sul lago" />
        </div>
      </section>

      <section className="pillars-section light-section" id="pilastri" aria-labelledby="pillars-title">
        <div className="section-heading"><div><p className="eyebrow">Il nostro posizionamento</p><h2 id="pillars-title">Oltre l’advisory tradizionale.</h2><p>Un ecosistema integrato che unisce competenze, accesso e intelligenza proprietaria per creare valore e generare risultati.</p></div><aside><strong>Quattro pilastri</strong><span>Un unico obiettivo: il successo dei nostri clienti.</span></aside></div>
        <div className="pillars-grid">{pillars.map((pillar) => { const icons = { advisory: Handshake, origination: MagnifyingGlass, intelligence: Database, distribution: ShareNetwork }; const Icon = icons[pillar.id] || Compass; return <article className="pillar-card" key={pillar.id}><Icon size={36} weight="light" aria-hidden="true" /><h3>{pillar.title}</h3><p>{pillar.description}</p></article>; })}</div>
      </section>

      <section className="competencies-section light-section" id="servizi">
        <div className="section-heading"><div><p className="eyebrow">Le aree di servizio</p><h2>Costruiamo valore. Insieme.</h2><p>Sette aree coordinate in un unico percorso, con responsabilità chiare e presidio senior.</p></div><aside><strong>Un unico obiettivo</strong><span>Il successo dei nostri clienti.</span></aside></div>
        <div className="competency-list grid-three">{serviceHubs.map((hub, index) => { const Icon = areaIcons[index] || Compass; return <Link className="competency" href={hub.path} key={hub.path} aria-label={`Scopri ${hub.label}`}><Icon size={32} weight="light" aria-hidden="true" /><h3>{hub.label}</h3><p>{hub.navDesc}</p></Link>; })}</div>
      </section>

      <section className="challenge-section light-section" aria-labelledby="challenge-title">
        <div className="section-heading">
          <div><p className="eyebrow">La tua sfida</p><h2 id="challenge-title">Qual è la tua sfida oggi?</h2><p>Cinque percorsi per raggiungere subito l’area più vicina al tuo obiettivo.</p></div>
        </div>
        <div className="challenge-grid">
          <Link href="/servizi/fusioni-acquisizioni/" className="challenge-card"><span>01</span><h3>Voglio fare un’acquisizione o cedere la mia impresa</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/servizi/energia-infrastrutture/" className="challenge-card"><span>02</span><h3>Voglio finanziare un progetto di energia rinnovabile</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/servizi/immobiliare/" className="challenge-card"><span>03</span><h3>Cerco opportunità di investimento immobiliare</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/servizi/advisory-strategico/" className="challenge-card"><span>04</span><h3>Ho bisogno di consulenza strategica per la mia azienda</h3><ArrowRight aria-hidden="true" /></Link>
          <Link href="/servizi/marketing-comunicazione/" className="challenge-card"><span>05</span><h3>Voglio far crescere vendite e marchio</h3><ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="stats-band" aria-label="Delex Capital in numeri">
        <div className="stats-grid">
          <article><StatNumber value="33" /><span>Mandati attivi</span></article>
          <article><StatNumber value="50+" /><span>Operazioni gestite</span></article>
          <article><StatNumber value="100+" /><span>Mandati e operazioni</span></article>
          <article><StatNumber value="13+" /><span>Aree di settore</span></article>
          <article><StatNumber value="20+" /><span>Anni di esperienza combinata</span></article>
        </div>
        <p className="stats-note">Dati aggiornati al 30 giugno 2026</p>
      </section>

      <section className="method-section light-section" id="metodo">
        <div className="method-heading"><div><p className="eyebrow">Il modello operativo</p><h2>Dalla strategia alla chiusura: un approccio strutturato.</h2><p>Combiniamo competenze settoriali, intelligence proprietaria e un processo rigoroso per generare risultati concreti.</p></div><span>Dalla strategia alla chiusura</span></div>
        <ol className="method-steps model-grid">{processes.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </section>

      <section className="di-section" id="deal-intelligence" aria-labelledby="di-title">
        <div className="section-heading"><div><p className="eyebrow">Delex Deal Intelligence</p><h2 id="di-title">Dall’attività di mercato all’intelligenza proprietaria.</h2><p>Ogni attività di ricerca, ogni contatto, ogni mandato e ogni operazione arricchiscono continuamente il nostro database proprietario, creando un patrimonio unico di relazioni, informazioni e insight.</p></div><aside><strong>Un patrimonio che cresce ogni giorno</strong><span>Ogni mandato rende Delex più informata e più efficace per quello successivo.</span></aside></div>
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
        <div className="section-heading"><div><p className="eyebrow">Esperienza nei settori</p><h2 id="sectors-title">Competenza profonda. Prospettiva ampia.</h2><p>Operiamo in un’ampia gamma di settori con un solido track record di operazioni, mandati e incarichi di consulenza.</p></div><aside><strong>Focalizzati quando serve</strong><span>Trasversali per natura.</span></aside></div>
        <ul className="sectors-cloud">{sectors.map((sector) => <li key={sector}>{sector}</li>)}</ul>
      </section>

      <section className="evidence-section light-section" aria-labelledby="awards-title">
        <div className="section-heading"><div><p className="eyebrow">Riconoscimenti</p><h2 id="awards-title">Ambizione. Crescita. Riconoscimento.</h2><p>Tre riconoscimenti consecutivi nel settore Corporate Finance.</p></div></div>
        <div className="awards-strip">
          <img src={awards[0].image} alt="Finance Monthly M&A Awards — Delex Capital" />
          <div>
            <h3>Finance Monthly M&A Awards</h3>
            <p>Delex Capital Adviser of the Year per il settore Corporate Finance.</p>
          </div>
          <ul>{awards.map((award) => <li key={award.year}>{award.year}</li>)}</ul>
        </div>
      </section>

      <section className="operations-preview light-section" aria-labelledby="operations-title">
        <div className="section-heading"><div><p className="eyebrow">Track Record</p><h2 id="operations-title">Operazioni recenti.</h2><p>Una selezione delle operazioni concluse seguite dal team Delex Capital.</p></div><Link className="button button-primary" href="/track-record/">Vedi tutte le operazioni <ArrowRight aria-hidden="true" /></Link></div>
        <TransactionSlider items={transactions} />
      </section>

      <NewsletterSection />

      <section className="board-section light-section" aria-labelledby="board-title">
        <div className="section-heading"><div><p className="eyebrow">Advisory Board</p><h2 id="board-title">Competenze senior. Esecuzione integrata.</h2><p>Quattro professionisti alla guida di ogni mandato, con responsabilità diretta e presidio continuo.</p></div><Link className="button button-primary" href="/chi-siamo/#advisory-board">Conosci l’Advisory Board <ArrowRight aria-hidden="true" /></Link></div>
        <div className="board-grid">{advisoryBoard.map((member) => <article className="board-card" key={member.name}>{member.image ? <img src={member.image} alt={member.name} /> : <div className="board-photo-pending" aria-hidden="true"><UsersThree size={40} weight="light" /></div>}<div><p className="eyebrow">{member.role}</p><h3>{member.name}</h3></div></article>)}</div>
      </section>
      <ClosingCta />
    </>
  );
}

function NewsletterSection() {
  const [status, setStatus] = useState("idle");
  const latest = articles.slice(0, 2);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="newsletter-section light-section" aria-labelledby="newsletter-title">
      <div className="newsletter-grid">
        <div className="newsletter-articles">
          <p className="eyebrow">Approfondimenti</p>
          <h2 id="newsletter-title">Rimani aggiornato.</h2>
          {latest.map((article) => <Link className="newsletter-article" href={`/risorse/approfondimenti/${article.slug}/`} key={article.slug}><span>{article.date}</span><strong>{article.title}</strong><ArrowRight aria-hidden="true" /></Link>)}
          <Link className="text-link dark-link" href="/risorse/">Tutti gli approfondimenti <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="newsletter-box">
          {status === "sent" ? (
            <div role="status"><h3>Iscrizione registrata.</h3><p>Riceverai i prossimi insight di Delex Capital via email.</p></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>La newsletter di Delex Capital</h3>
              <p>Analisi e operazioni selezionate, direttamente nella tua inbox.</p>
              <label htmlFor="newsletter-email" className="sr-only">Email professionale</label>
              <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Email professionale" required />
              <div className="hp-field" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <label className="consent"><input type="checkbox" required /><span>Ho letto l’<Link href="/privacy-policy/">informativa privacy</Link> e acconsento a ricevere la newsletter.</span></label>
              {status === "error" && <p className="form-error" role="alert">Il servizio non è ancora attivo. Scrivici a <a href={companyDetails.emailHref}>{companyDetails.email}</a>.</p>}
              <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Iscrizione…" : "Iscriviti"} <ArrowRight aria-hidden="true" /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function HubPage({ hub }) {
  const related = hub.relatedPaths.map((path) => serviceHubs.find((item) => item.path === path)).filter(Boolean);
  const concluded = hub.trackConcluded.map((slug) => transactions.find((t) => t.slug === slug)).filter(Boolean);
  const mandates = hub.trackMandates.map((id) => activeMandates.find((m) => m.id === id)).filter(Boolean);
  const boardWithPhoto = advisoryBoard.filter((member) => member.image);

  return (
    <>
      <PageHero eyebrow={hub.eyebrow} title={hub.title} description={hub.description} image={hub.image} crumbs={[{ label: "Home", href: "/" }, { label: "Servizi", href: "/servizi/" }, { label: hub.label }]} />
      <section className="hub-body light-section" id="page-content">
        <div className="hub-main">
          <p className="hub-intro">{hub.description}</p>

          <p className="eyebrow">Come operiamo</p>
          <h2 className="hub-subtitle">Le aree di intervento.</h2>
          <div className="accordion">
            {hub.services.map(([title, description]) => (
              <details key={title}>
                <summary><span>{title}</span><CaretDown size={18} aria-hidden="true" /></summary>
                <p>{description}</p>
              </details>
            ))}
          </div>

          <blockquote className="testimonial">
            <p>{hub.quote}</p>
            <cite>Delex Capital</cite>
          </blockquote>

          <div className="hub-process">
            <p className="eyebrow">Il processo</p>
            <ProcessList steps={hub.process} />
          </div>

          {(concluded.length > 0 || mandates.length > 0) && (
            <div className="hub-track-record">
              <p className="eyebrow">Track record</p>
              <div className="hub-tr-grid">
                {concluded.map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}
                {mandates.map((mandate) => <MandateCard mandate={mandate} key={mandate.id} />)}
              </div>
            </div>
          )}

          <FaqSection faqs={hub.faqs} />

          <SessionForm areaLabel={hub.label} />
        </div>
        <aside className="hub-sidebar">
          <div className="metric-cards">
            {hub.sidebarMetrics.map(([value, label]) => <div className="metric-card" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className="sidebar-cta">
            <h3>Prima sessione gratuita</h3>
            <p>45 minuti senza impegno per capire come possiamo aiutarti.</p>
            <Link className="button button-primary" href={`/prenota/?area=${encodeURIComponent(hub.label)}`}>Prenota una call gratuita <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="sidebar-team">
            <p className="eyebrow">I referenti</p>
            {boardWithPhoto.map((member) => (
              <div className="sidebar-person" key={member.name}>
                <img src={member.image} alt={member.name} />
                <div><strong>{member.name}</strong><span>{member.role}</span></div>
              </div>
            ))}
          </div>
          <nav className="sidebar-related" aria-label="Servizi correlati">
            <p className="eyebrow">Servizi correlati</p>
            {related.map((item) => <Link key={item.path} href={item.path}>{item.label}</Link>)}
          </nav>
        </aside>
      </section>
      <ClosingCta title={`Confrontiamoci su ${hub.label.toLowerCase()}.`} />
    </>
  );
}

export function ServicesPage() {
  return <>
    <PageHero eyebrow="Le aree di servizio" title="Sette aree. Un unico interlocutore." description="M&A, finanza straordinaria, immobiliare, energia, advisory strategico, startup e marketing: competenze profonde, coordinate in un unico percorso." crumbs={[{ label: "Home", href: "/" }, { label: "Servizi" }]} />
    <section className="services-intro light-section" id="page-content">
      <div className="section-heading"><div><p className="eyebrow">Il modello Delex</p><h2>Advisory. Ricerca. Intelligenza. Distribuzione.</h2><p>Un modello di advisory indipendente, imprenditoriale e orientato ai risultati. Combiniamo competenze finanziarie, ricerca proprietaria delle opportunità e conoscenza trasversale del mercato per guidare decisioni complesse e portare le operazioni a buon fine.</p><p>Non ci limitiamo a trovare opportunità: costruiamo le condizioni per trasformarle in risultati.</p></div></div>
      <div className="service-detail-list">{serviceHubs.map((hub, index) => <article className="service-detail" id={hub.shortLabel.toLowerCase()} key={hub.path}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><div><p className="eyebrow">{hub.label}</p><h2>{hub.navDesc}</h2><p>{hub.description}</p><Link className="text-link dark-link" href={hub.path}>Scopri {hub.label} <ArrowRight aria-hidden="true" /></Link></div></article>)}</div>
    </section>
    <ClosingCta title="Quale obiettivo vuoi raggiungere?" description="Condividi obiettivi, tempi e contesto: individueremo l’area e il team più adatti." />
  </>;
}

export function TrackRecordPage({ slug }) {
  const [filter, setFilter] = useState("Tutte");
  const categories = ["Tutte", ...transactionCategories];
  const visible = filter === "Tutte" ? transactions : transactions.filter((t) => t.area === filter);
  const visibleMandates = filter === "Tutte" ? activeMandates : activeMandates.filter((m) => m.area === filter);

  if (slug) {
    const transaction = transactions.find((item) => item.slug === slug);
    if (!transaction) return <NotFoundPage />;
    const similar = transactions.filter((item) => item.slug !== slug && item.area === transaction.area).slice(0, 2);
    return (
      <>
        <PageHero eyebrow={`Track Record · ${transaction.area}`} title={`${transaction.client}: ${transaction.type}`} description={`Operazione conclusa seguita da Delex Capital come ${transaction.role}.`} cta={false} crumbs={[{ label: "Home", href: "/" }, { label: "Track Record", href: "/track-record/" }, { label: transaction.client }]} />
        <section className="transaction-detail light-section" id="page-content">
          <div className="transaction-detail-logo"><img src={transaction.image} alt={transaction.client} /></div>
          <div>
            <p className="eyebrow">Valore dell’operazione</p>
            <h2>{transaction.amount}</h2>
            <dl className="transaction-facts">
              <div><dt>Area di servizio</dt><dd><Link href={transaction.areaPath}>{transaction.area}</Link></dd></div>
              <div><dt>Tipo di operazione</dt><dd>{transaction.type}</dd></div>
              <div><dt>Ruolo di Delex Capital</dt><dd>{transaction.role}</dd></div>
              <div><dt>Stato</dt><dd>Conclusa</dd></div>
            </dl>
            <p>Un incarico seguito con presidio specialistico nelle fasi decisive dell’operazione.</p>
            {similar.length > 0 && <p>Operazioni simili: {similar.map((item, index) => <span key={item.slug}>{index > 0 && " · "}<Link href={`/track-record/${item.slug}/`}>{item.client}</Link></span>)}</p>}
            <Link className="text-link dark-link" href="/track-record/">Torna al Track Record <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>
        <ClosingCta title="Hai un’operazione simile? Parliamone." />
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Track Record" title="Le nostre operazioni." description="Operazioni diverse. Un unico standard di esecuzione." crumbs={[{ label: "Home", href: "/" }, { label: "Track Record" }]} />
      <section className="operations-archive light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Operazioni concluse</p><h2>Risultati costruiti insieme.</h2><p>Una selezione di operazioni perfezionate con il supporto del team.</p></div><div className="filter-row" role="group" aria-label="Filtra per area di servizio">{categories.map((category) => <button key={category} type="button" className={category === filter ? "filter-chip is-active" : "filter-chip"} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
        <div className="transaction-grid">{visible.map((transaction) => <TransactionCard transaction={transaction} key={transaction.slug} />)}</div>

        <div className="mandates-section" id="mandati-in-corso">
          <div className="section-heading"><div><p className="eyebrow">Mandati in corso</p><h2>Le operazioni su cui stiamo lavorando.</h2><p>Mandati attivi anonimi: nome e dettagli saranno pubblicati, se autorizzati, a operazione conclusa.</p></div><aside><strong>Dati al 30 giugno 2026</strong><span>33 mandati attivi complessivi.</span></aside></div>
          <div className="mandate-grid">{visibleMandates.map((mandate) => <MandateCard mandate={mandate} key={mandate.id} />)}</div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}

export function RisorsePage() {
  return (
    <>
      <PageHero eyebrow="Risorse" title="Approfondimenti e risorse." description="Analisi, incontri e strumenti per affrontare con maggiore consapevolezza le decisioni che contano." crumbs={[{ label: "Home", href: "/" }, { label: "Risorse" }]} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">In evidenza</p><h2>Dall’esperienza di mercato a una voce pubblica.</h2><p>Contenuti pubblicati da Delex Capital per accompagnare valutazioni e decisioni.</p></div></div>
        <div className="competency-list grid-two">
          <Link className="competency" href="/risorse/rassegna-stampa/"><Megaphone size={32} weight="light" aria-hidden="true" /><h3>Rassegna stampa</h3><p>Le uscite su stampa e media di Delex Capital dal 2020 a oggi.</p></Link>
          <Link className="competency" href="/chi-siamo/#advisory-board"><UsersThree size={32} weight="light" aria-hidden="true" /><h3>L’Advisory Board</h3><p>I professionisti che guidano i nostri mandati.</p></Link>
        </div>
        {articles.length > 0 ? <div className="publication-list" id="articoli">{articles.map((article) => <Link className="publication-card" href={`/risorse/approfondimenti/${article.slug}/`} key={article.slug}><p className="eyebrow">{article.date}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span>Leggi l’articolo <ArrowRight aria-hidden="true" /></span></Link>)}</div> : <div className="empty-state"><Compass size={40} weight="light" aria-hidden="true" /><h3>Articoli in preparazione.</h3><p>Il primo contenuto editoriale sarà pubblicato a breve.</p></div>}
      </section>
      <ClosingCta title="Vuoi approfondire un tema?" />
    </>
  );
}

export function RassegnaStampaPage() {
  return (
    <>
      <PageHero eyebrow="Rassegna stampa" title="Delex Capital su stampa e media." description="Le uscite pubbliche del team dal 2020 a oggi: interviste, analisi e commenti su M&A, capitale e mercati." crumbs={[{ label: "Home", href: "/" }, { label: "Risorse", href: "/risorse/" }, { label: "Rassegna stampa" }]} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">2020–2026</p><h2>45 riferimenti verificati sulle principali testate.</h2><p>Una presenza pubblica costruita negli anni su finanza straordinaria, raccolta di capitale e temi di settore.</p></div><aside><strong>Media & thought leadership</strong><span>10 articoli firmati, 3 Finance Monthly Awards, 7 anni di copertura.</span></aside></div>
        <ul className="sectors-cloud">{["Il Sole 24 Ore", "Giornale di Brescia", "CrowdFundMe", "DWF", "Finanza Semplice", "Opstart", "Askanews", "Watergas", "Italia Economy", "LinkedIn"].map((outlet) => <li key={outlet}>{outlet}</li>)}</ul>
        <p className="press-note">L’elenco completo delle uscite con titolo, data e link originale è in fase di pubblicazione.</p>
      </section>
      <ClosingCta title="Vuoi approfondire un tema?" />
    </>
  );
}

export function ArticlePage({ slug }) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${globalThis.location?.origin ?? ""}/risorse/approfondimenti/${article.slug}/`)}`;
  return (
    <>
      <section className="article-hero" aria-labelledby="article-title">
        <div className="article-hero-inner">
          <nav className="breadcrumb" aria-label="Percorso"><span><Link href="/">Home</Link><i aria-hidden="true">/</i></span><span><Link href="/risorse/">Risorse</Link><i aria-hidden="true">/</i></span><span aria-current="page">{article.title}</span></nav>
          <p className="eyebrow">{article.date || "Approfondimenti"}</p>
          <h1 id="article-title">{article.title}</h1>
          {article.excerpt && <p className="hero-lead">{article.excerpt}</p>}
        </div>
      </section>
      <section className="article-section light-section" id="page-content">
        <article className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} />
        <div className="article-actions">
          <a className="button button-primary" href={shareUrl} target="_blank" rel="noreferrer"><LinkedinLogo aria-hidden="true" /> Pubblica su LinkedIn</a>
          <Link className="text-link dark-link" href="/risorse/">Tutti gli approfondimenti <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
      <ClosingCta title="Vuoi approfondire un tema?" />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Chi siamo" title="Chi siamo: competenze senior, esecuzione integrata." description="Delex Capital è una boutique indipendente di advisory che affianca imprenditori, aziende, investitori e sviluppatori in operazioni straordinarie, raccolta di capitale ed esecuzione strategica, con focus sul lower-mid e mid-market italiano." image="/assets/team-collaboration.webp" crumbs={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]} />
      <section className="team-section" id="page-content"><div className="team-copy"><p className="eyebrow">Missione e visione</p><h2>Esperienza che entra nel merito.</h2><p>Senior advisor, analisti finanziari, relationship manager, specialisti immobiliari ed esperti di settore lavorano insieme in un unico modello di esecuzione integrata: un unico team, un unico standard.</p><Link className="button button-primary" href="/prenota/">Parla con noi <ArrowRight aria-hidden="true" /></Link></div><img src="/assets/hero-team.webp" alt="Professionisti Delex Capital riuniti al tavolo" /><p className="team-values">Indipendenza<br />Rigore<br />Riservatezza<br />Risultati</p></section>
      <section className="people-section light-section" aria-labelledby="clients-title"><div className="section-heading"><div><p className="eyebrow">Con chi lavoriamo</p><h2 id="clients-title">Partner di fiducia per imprenditori, investitori e operatori.</h2><p>Affianchiamo una clientela diversificata con esigenze specifiche, offrendo soluzioni su misura e massima riservatezza.</p></div></div><div className="clients-grid">{clientTypes.map(([title, description]) => <article className="competency" key={title}><UsersThree size={32} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="people-section light-section" id="advisory-board" aria-labelledby="board-title"><div className="section-heading"><div><p className="eyebrow">Advisory Board</p><h2 id="board-title">Le persone alla guida dei mandati.</h2><p>Quattro professionisti con esperienza diretta in operazioni, capitale e mercati.</p></div></div><div className="people-grid">{advisoryBoard.map((member) => <article className="person-card" key={member.name}>{member.image ? <img src={member.image} alt={member.name} /> : <div className="board-photo-pending board-photo-lg" aria-hidden="true"><UsersThree size={48} weight="light" /></div>}<div><p className="eyebrow">{member.role}</p><h3>{member.name}</h3><p>{member.description}</p>{member.linkedin && <a className="text-link dark-link" href={member.linkedin} target="_blank" rel="noreferrer">Profilo LinkedIn <ArrowRight aria-hidden="true" /></a>}</div></article>)}</div></section>
      <section className="people-section light-section" aria-labelledby="squadra-title"><div className="section-heading"><div><p className="eyebrow">La nostra squadra</p><h2 id="squadra-title">Un modello di esecuzione integrata.</h2><p>Dietro ogni mandato, un team che combina ruoli e competenze complementari.</p></div></div><div className="roles-grid">{squadraRoles.map((role) => <article className="competency" key={role}><CheckCircle size={32} weight="light" aria-hidden="true" /><h3>{role}</h3></article>)}</div></section>
      <section className="values-section light-section" aria-labelledby="values-title"><div className="section-heading"><div><p className="eyebrow">Principi cardine</p><h2 id="values-title">I valori che guidano il lavoro.</h2><p>Indipendenza, riservatezza e orientamento ai risultati nelle relazioni con clienti e partner.</p></div></div><div className="values-grid">{values.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="quote-section light-section"><blockquote className="testimonial"><p>Non ci limitiamo a trovare opportunità. Costruiamo le condizioni per trasformarle in risultati.</p><cite>Delex Capital</cite></blockquote></section>
      <section className="xpoint-section light-section" aria-labelledby="xpoint-title"><div className="section-heading"><div><p className="eyebrow">Programma di affiliazione</p><h2 id="xpoint-title">Una rete vicina alle imprese.</h2><p>Il programma territoriale e di affiliazione di Delex Capital.</p></div><Link className="button button-primary" href="/xcapital-point/">Scopri il programma <ArrowRight aria-hidden="true" /></Link></div></section>
      <ClosingCta />
    </>
  );
}

export function ContactPage({ booking = false }) {
  const [status, setStatus] = useState("idle");
  const areaFromQuery = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("area") : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok && booking) {
        navigate("/prenota/grazie/");
        return;
      }
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero eyebrow={booking ? "Prenota una call gratuita" : "Contatti"} title={booking ? "Prenota una call gratuita di 45 minuti." : "Parliamo del tuo progetto."} description="Raccontaci il contesto e l’obiettivo su cui desideri confrontarti: ti risponderà il referente più adatto." cta={false} crumbs={[{ label: "Home", href: "/" }, { label: booking ? "Prenota" : "Contatti" }]} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Primo contatto</p><h2>{status === "sent" ? "Richiesta inviata." : "Raccontaci il tuo obiettivo."}</h2><p>{status === "sent" ? "Grazie: ti ricontatteremo al più presto." : "Compila il modulo o scrivici direttamente: ogni richiesta viene letta dal team."}</p></div></div>
        <address className="contact-details"><div><span>Sedi</span><strong>{companyDetails.offices}</strong><small>{companyDetails.address}</small></div><a href={companyDetails.phoneHref}><span>Telefono</span><strong>{companyDetails.phone}</strong></a><a href={companyDetails.emailHref}><span>Email</span><strong>{companyDetails.email}</strong></a></address>
        {status === "sent" ? <div className="dialog-success" role="status"><CheckCircle size={48} weight="light" aria-hidden="true" /><h2>Grazie.</h2><p>La tua richiesta è stata inviata al team Delex Capital.</p><button className="button button-primary" type="button" onClick={() => setStatus("idle")}>Nuova richiesta</button></div> : <form className="contact-dialog" style={{ display: "block", position: "static", margin: 0, maxHeight: "none", boxShadow: "none", border: "1px solid var(--line)" }} onSubmit={handleSubmit}><label>Nome e cognome<input name="name" autoComplete="name" required /></label><label>Email professionale<input name="email" type="email" autoComplete="email" required /></label><label>Azienda<input name="company" autoComplete="organization" /></label><label>Telefono <span className="optional">(facoltativo)</span><input name="phone" type="tel" autoComplete="tel" /></label><label>Area di interesse<select name="area" defaultValue={areaFromQuery || ""}><option value="">Seleziona un’area</option>{serviceHubs.map((hub) => <option key={hub.path} value={hub.label}>{hub.label}</option>)}<option value="Altro">Altro / Non so ancora</option></select></label><label>Messaggio<textarea name="message" rows="5" required /></label><div className="hp-field" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div><label className="consent"><input type="checkbox" required /><span>Ho letto l’<Link href="/privacy-policy/">informativa privacy</Link> e acconsento al trattamento dei dati per essere ricontattato.</span></label>{status === "error" && <p className="form-error" role="alert">L’invio non è riuscito. Scrivici direttamente a <a href={companyDetails.emailHref}>{companyDetails.email}</a>.</p>}<button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Invio in corso…" : "Invia la richiesta"} <ArrowRight aria-hidden="true" /></button></form>}
      </section>
    </>
  );
}

export function GraziePage() {
  return (
    <>
      <PageHero eyebrow="Richiesta inviata" title="Grazie per averci scritto." description="La tua richiesta è stata inviata al team Delex Capital: ti ricontatteremo al più presto per fissare la call." cta={false} crumbs={[{ label: "Home", href: "/" }, { label: "Prenota", href: "/prenota/" }, { label: "Grazie" }]} />
      <section className="competencies-section light-section" id="page-content">
        <div className="section-heading"><div><p className="eyebrow">Nel frattempo</p><h2>Scopri come lavoriamo.</h2><p>Metodo, aree di servizio e operazioni seguite dal team.</p></div></div>
        <div className="competency-list grid-three">
          <Link className="competency" href="/#metodo"><Compass size={32} weight="light" aria-hidden="true" /><h3>Il modello operativo</h3><p>Gli 8 passaggi con cui portiamo le operazioni a buon fine.</p></Link>
          <Link className="competency" href="/servizi/"><ChartLineUp size={32} weight="light" aria-hidden="true" /><h3>Le 7 aree di servizio</h3><p>Dalla strategia alla chiusura, un unico interlocutore.</p></Link>
          <Link className="competency" href="/track-record/"><CheckCircle size={32} weight="light" aria-hidden="true" /><h3>Track Record</h3><p>Le operazioni concluse e i mandati in corso.</p></Link>
        </div>
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
  return <><PageHero eyebrow="Informazioni legali" title={title} description={description} cta={false} crumbs={[{ label: "Home", href: "/" }, { label: title }]} /><section className="competencies-section light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">Struttura del documento</p><h2>Contenuto da validare prima del rilascio.</h2><p>Le sezioni seguenti sono segnaposto redazionali, non un’informativa legale completa.</p></div></div><div className="competency-list grid-two">{items.map((item) => <article className="competency" key={item}><CheckCircle size={32} weight="light" aria-hidden="true" /><h3>{item}</h3><p>Testo definitivo da fornire e approvare.</p></article>)}</div></section></>;
}

export function XCapitalPointPage() {
  return <><PageHero eyebrow="Programma di affiliazione" title="Esperienza vicina alle imprese." description="Landing dedicata al programma territoriale e di affiliazione di Delex Capital." crumbs={[{ label: "Home", href: "/" }, { label: "Programma di affiliazione" }]} /><section className="competencies-section light-section" id="page-content"><div className="section-heading"><div><p className="eyebrow">Il programma</p><h2>Una rete con una direzione comune.</h2><p>Modello, requisiti e condizioni del programma di affiliazione saranno pubblicati a breve.</p></div></div></section><ClosingCta /></>;
}

export function NotFoundPage() {
  return <><PageHero eyebrow="Errore 404" title="Questa pagina non esiste." description="L’indirizzo potrebbe essere cambiato oppure la risorsa non è più disponibile." cta={false} /><section className="closing-cta" id="page-content"><div><h2>Riparti dalla homepage.</h2><p>Troverai una panoramica delle aree di servizio, del metodo e dell’Advisory Board Delex Capital.</p><Link className="button button-primary" href="/">Torna alla homepage <ArrowRight aria-hidden="true" /></Link></div></section></>;
}
