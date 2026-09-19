import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import * as approvedContent from "./content.js";
import { Link } from "./router.jsx";
import { companyDetails, coreServices, serviceHubs } from "./siteRoutes.js";

function useMobileNavigation() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1050px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return mobile;
}

function ContactDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    setSent(false);
    onClose();
  };

  return (
    <dialog className="contact-dialog" ref={dialogRef} onClose={close}>
      <button className="dialog-close" type="button" onClick={close} aria-label="Chiudi finestra"><X size={24} aria-hidden="true" /></button>
      {sent ? (
        <div className="dialog-success" role="status">
          <p className="eyebrow">Demo completata</p>
          <h2>Grazie per averci scritto.</h2>
          <p>Questa è una demo frontend: nessun dato è stato inviato o salvato.</p>
          <button className="button button-primary" type="button" onClick={close}>Chiudi</button>
        </div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <p className="eyebrow">Modulo dimostrativo</p>
          <h2>Parliamo del tuo progetto.</h2>
          <p>I dati restano nel browser e non vengono trasmessi a Delex Capital.</p>
          <label>Nome e cognome<input name="name" autoComplete="name" required /></label>
          <label>Email professionale<input name="email" type="email" autoComplete="email" required /></label>
          <label>Azienda<input name="company" autoComplete="organization" /></label>
          <label>Di cosa vuoi parlare?<textarea name="message" rows="4" required /></label>
          <label className="consent"><input type="checkbox" required /> <span>Confermo di aver compreso che questo form è una demo e non invia dati.</span></label>
          <button className="button button-primary" type="submit">Simula invio <ArrowRight aria-hidden="true" /></button>
        </form>
      )}
    </dialog>
  );
}

function DesktopNavigation() {
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (event) => { if (event.key === "Escape") setMegaOpen(false); };
    const onPointer = (event) => { if (!event.target.closest(".primary-nav")) setMegaOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen]);

  return (
    <nav className="primary-nav" aria-label="Navigazione principale">
      <Link href="/chi-siamo/">Chi siamo</Link>
      <button
        type="button"
        aria-expanded={megaOpen}
        aria-controls="services-mega-menu"
        onClick={() => setMegaOpen((value) => !value)}
        style={{ color: "#e7edf2", border: 0, background: "transparent", minHeight: 44, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14 }}
      >
        Practice <CaretDown size={14} aria-hidden="true" />
      </button>
      <Link href="/#metodo">Metodo</Link>
      <Link href="/track-record/">Track Record</Link>
      <Link href="/insight/">Risorse</Link>
      <a href={companyDetails.communityHref} target="_blank" rel="noreferrer">Community</a>
      <Link className="button button-primary nav-cta" href="/prenota/">Parla con il team <ArrowRight aria-hidden="true" /></Link>

      {megaOpen && (
        <div
          id="services-mega-menu"
          style={{ position: "absolute", zIndex: 60, top: "100%", right: 0, left: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "26px 40px", padding: "34px clamp(24px, 4vw, 68px)", borderTop: "1px solid rgba(255,255,255,.13)", background: "#061b2a", boxShadow: "0 24px 45px rgba(0,0,0,.25)" }}
        >
          {coreServices.map((service) => <div key={service.id}><Link href={service.href} onClick={() => setMegaOpen(false)} style={{ display: "block", marginBottom: 8, color: "white", fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 22, fontWeight: 700, textDecoration: "none" }}>{service.title}</Link><span style={{ display: "block", color: "#afc1ce", fontSize: 12, lineHeight: 1.45 }}>{service.tagline}</span></div>)}
        </div>
      )}
    </nav>
  );
}

function MobileNavigation({ open, onNavigate }) {
  return (
    <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Navigazione principale">
      <Link href="/chi-siamo/" onClick={onNavigate}>Chi siamo</Link>
      <details style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
        <summary style={{ padding: "17px 4px", color: "#e7edf2", cursor: "pointer", fontSize: 16 }}>Practice</summary>
        <div style={{ padding: "0 0 14px 15px" }}>
          <Link href="/services/" onClick={onNavigate} style={{ display: "block", padding: "10px 0", color: "#62b7ef", textDecoration: "none" }}>Tutte le practice</Link>
          {coreServices.map((service) => <Link key={service.id} href={service.href} onClick={onNavigate} style={{ display: "block", padding: "9px 0", color: "#b8c8d3", fontSize: 13, textDecoration: "none" }}>{service.title}</Link>)}
        </div>
      </details>
      <Link href="/#metodo" onClick={onNavigate}>Metodo</Link>
      <Link href="/track-record/" onClick={onNavigate}>Track Record</Link>
      <details style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
        <summary style={{ padding: "17px 4px", color: "#e7edf2", cursor: "pointer", fontSize: 16 }}>Risorse</summary>
        <div style={{ paddingLeft: 15 }}>
          <Link href="/insight/" onClick={onNavigate}>Tutte le risorse</Link>
          <Link href="/education/" onClick={onNavigate}>Pubblicazioni</Link>
          <Link href="/category/press/" onClick={onNavigate}>Blog &amp; News</Link>
          <Link href="/webinar/" onClick={onNavigate}>Webinar</Link>
        </div>
      </details>
      <a href={companyDetails.communityHref} target="_blank" rel="noreferrer" onClick={onNavigate}>Community</a>
      <Link className="button button-primary nav-cta" href="/prenota/" onClick={onNavigate}>Parla con il team <ArrowRight aria-hidden="true" /></Link>
    </nav>
  );
}

export function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const mobile = useMobileNavigation();
  const footer = approvedContent.footer ?? { brand: "DELEX CAPITAL", links: [], legalLinks: [], locales: [], copyright: "© 2026 Delex Capital S.r.l." };

  return (
    <>
      <a className="skip-link" href="#main">Vai al contenuto</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Delex Capital homepage">
          <img className="brand-logo" src="/assets/xcapital-logo.png" alt="Delex Capital" />
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={25} /> : <List size={25} />}
        </button>
        {mobile ? <MobileNavigation open={menuOpen} onNavigate={() => setMenuOpen(false)} /> : <DesktopNavigation />}
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <Link className="brand" href="/" aria-label="Delex Capital homepage">
          <img className="brand-logo brand-logo-footer" src="/assets/xcapital-logo.png" alt="Delex Capital" />
        </Link>
        <nav aria-label="Navigazione a piè di pagina">
          <Link href="/chi-siamo/">Chi siamo</Link>
          <Link href="/services/">Practice</Link>
          {serviceHubs.map((hub) => <Link key={hub.path} href={hub.path}>{hub.label}</Link>)}
          <Link href="/track-record/">Track Record</Link>
        </nav>
        <div className="footer-meta">
          <span>{companyDetails.offices}</span>
          <a href={companyDetails.phoneHref}>{companyDetails.phone}</a>
          <a href={companyDetails.emailHref}>{companyDetails.email}</a>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/cookie-policy/">Cookie Policy</Link>
          <Link href="/contatti/">Contatti</Link>
          <span>IT&nbsp;&nbsp;|&nbsp;&nbsp;EN</span>
          <span>© 2026 {companyDetails.legalName}</span>
        </div>
      </footer>

      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
