import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ChartLineUp, CheckCircle, Compass, Handshake, Leaf, List, ShareNetwork, Target, UsersThree, X } from "@phosphor-icons/react";
import { competencies, competenciesSection, footer, methodSection, methodSteps, navigation, proofPoints } from "./content.js";

const proofIcons = { "senior-expertise": UsersThree, "integrated-vision": Target, "direct-commitment": Handshake };
const competencyIcons = { "growth-capital": ChartLineUp, "strategic-advisory": Compass, "finance-fundraising": UsersThree, "business-development": ShareNetwork, "coaching-wellbeing": Leaf };

function ContactDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => { setSent(false); onClose(); };

  return (
    <dialog className="contact-dialog" ref={dialogRef} onClose={close}>
      <button className="dialog-close" type="button" onClick={close} aria-label="Chiudi finestra"><X size={24} aria-hidden="true" /></button>
      {sent ? (
        <div className="dialog-success" role="status">
          <CheckCircle size={42} weight="light" aria-hidden="true" />
          <p className="eyebrow">Richiesta acquisita</p>
          <h2>Grazie per averci contattato.</h2>
          <p>Questa è una demo: nessun dato è stato inviato. Nel sito definitivo collegheremo il form al flusso approvato.</p>
          <button className="button button-primary" type="button" onClick={close}>Chiudi</button>
        </div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <p className="eyebrow">Un primo confronto</p>
          <h2>Parliamo del tuo progetto.</h2>
          <p>Raccontaci brevemente il tuo obiettivo. Ti ricontatteremo per capire insieme il percorso più adatto.</p>
          <label>Nome e cognome<input name="name" autoComplete="name" required /></label>
          <label>Email professionale<input name="email" type="email" autoComplete="email" required /></label>
          <label>Azienda<input name="company" autoComplete="organization" /></label>
          <label>Di cosa vuoi parlare?<textarea name="message" rows="4" required /></label>
          <label className="consent"><input type="checkbox" required /> <span>Ho letto l’informativa privacy e acconsento al trattamento dei dati per essere ricontattato.</span></label>
          <button className="button button-primary" type="submit">Invia la richiesta <ArrowRight aria-hidden="true" /></button>
        </form>
      )}
    </dialog>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openContact = (event) => { event?.preventDefault(); setMenuOpen(false); setDialogOpen(true); };

  return (
    <>
      <a className="skip-link" href="#main">Vai al contenuto</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="XCapital homepage">XCAPITAL</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={25} /> : <List size={25} />}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Navigazione principale">
          {navigation.items.map((item) => <a key={item.id} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a className="button button-primary nav-cta" href={navigation.cta.href} onClick={openContact}>{navigation.cta.label}<ArrowRight aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Strategia. Capitale. Persone.</p>
            <h1 id="hero-title">Le decisioni importanti non si prendono da soli.</h1>
            <p className="hero-lead">Un team indipendente affianca imprenditori e manager dalla visione all’esecuzione.</p>
            <div className="button-row">
              <a className="button button-primary" href="/prenota/" onClick={openContact}>Parla con il team <ArrowRight aria-hidden="true" /></a>
              <a className="text-link" href="#metodo">Scopri come lavoriamo <ArrowRight aria-hidden="true" /></a>
            </div>
            <a className="scroll-cue" href="#competenze"><ArrowDown aria-hidden="true" /> Scorri</a>
          </div>
          <figure className="hero-media">
            <img src="/assets/hero-team.png" alt="Un confronto tra consulenti senior XCapital" />
            <figcaption>Un partner<br />per ciò che conta</figcaption>
          </figure>
        </section>

        <section className="proof-strip" aria-label="I principi del nostro lavoro">
          {proofPoints.map((point) => {
            const Icon = proofIcons[point.id];
            return <article key={point.id}><Icon size={38} weight="light" aria-hidden="true" /><div><h2>{point.title}</h2><p>{point.description}</p></div></article>;
          })}
        </section>

        <section className="competencies-section light-section" id="competenze">
          <div className="section-heading">
            <div><p className="eyebrow">{competenciesSection.eyebrow}</p><h2>{competenciesSection.title}</h2><p>{competenciesSection.description}</p></div>
            <aside><strong>{competenciesSection.note.title}</strong><span>{competenciesSection.note.description}</span></aside>
          </div>
          <div className="competency-list">
            {competencies.map((competency, index) => {
              const Icon = competencyIcons[competency.id];
              return <a className={index === 2 ? "competency is-featured" : "competency"} href={competency.href} key={competency.id}><Icon size={32} weight="light" aria-hidden="true" /><h3>{competency.title}</h3><p>{competency.description}</p><span className="sr-only">Scopri {competency.title}</span></a>;
            })}
          </div>
        </section>

        <section className="method-section light-section" id="metodo">
          <div className="method-heading"><div><p className="eyebrow">{methodSection.eyebrow}</p><h2>{methodSection.title}</h2><p>{methodSection.description}</p></div><span>{methodSection.overline}</span></div>
          <ol className="method-steps">{methodSteps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </section>

        <section className="team-section" id="chi-siamo">
          <div className="team-copy"><p className="eyebrow">Il nostro team</p><h2>Persone che fanno la differenza.</h2><p>Senior advisor, imprenditori e professionisti con competenze complementari, uniti dalla stessa ambizione: contribuire al successo dei nostri clienti.</p><a className="button button-primary" href="/chi-siamo/">Conosci il team <ArrowRight aria-hidden="true" /></a></div>
          <img src="/assets/team-collaboration.png" alt="Il team XCapital durante una sessione di lavoro" />
          <p className="team-values">Esperienza<br />Relazioni<br />Prospettiva<br />Risultati</p>
        </section>

        <section className="closing-cta">
          <div><p className="eyebrow">Una conversazione può fare la differenza</p><h2>Parliamo del tuo progetto.</h2><p>Raccontaci i tuoi obiettivi. Ti metteremo in contatto con il membro del team più adatto per una conversazione riservata e senza impegno.</p><a className="button button-primary" href="/prenota/" onClick={openContact}>Parla con il team <ArrowRight aria-hidden="true" /></a></div>
          <p>Stessa direzione.<br /><strong>Più possibilità.</strong></p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="/">{footer.brand}</a>
        <nav aria-label="Navigazione a piè di pagina">{footer.links.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
        <div className="footer-meta">{footer.legalLinks.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}<span className="locales">{footer.locales.map((locale) => <a key={locale.label} href={locale.href}>{locale.label}</a>)}</span><span>© 2026 XCapital. Tutti i diritti riservati.</span></div>
      </footer>

      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
