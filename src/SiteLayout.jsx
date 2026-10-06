import { useEffect, useState } from "react";
import { ArrowRight, ArrowSquareOut, CaretDown, LinkedinLogo, List, X } from "@phosphor-icons/react";
import { Link } from "./router.jsx";
import { companyDetails, serviceHubs } from "./siteRoutes.js";

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

function DesktopNavigation() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    if (!megaOpen && !resourcesOpen) return;
    const onKey = (event) => { if (event.key === "Escape") { setMegaOpen(false); setResourcesOpen(false); } };
    const onPointer = (event) => { if (!event.target.closest(".primary-nav")) { setMegaOpen(false); setResourcesOpen(false); } };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen, resourcesOpen]);

  const dropButtonStyle = { color: "#e7edf2", border: 0, background: "transparent", minHeight: 44, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14 };
  const dropPanelStyle = { position: "absolute", zIndex: 60, top: "100%", borderTop: "1px solid rgba(255,255,255,.13)", background: "#061b2a", boxShadow: "0 24px 45px rgba(0,0,0,.25)" };

  return (
    <nav className="primary-nav" aria-label="Navigazione principale">
      <Link href="/chi-siamo/">Chi siamo</Link>
      <button
        type="button"
        aria-expanded={megaOpen}
        aria-controls="services-mega-menu"
        onClick={() => { setMegaOpen((value) => !value); setResourcesOpen(false); }}
        style={dropButtonStyle}
      >
        Servizi <CaretDown size={14} aria-hidden="true" />
      </button>
      <Link href="/#metodo">Metodo</Link>
      <Link href="/track-record/">Track Record</Link>
      <button
        type="button"
        aria-expanded={resourcesOpen}
        aria-controls="resources-menu"
        onClick={() => { setResourcesOpen((value) => !value); setMegaOpen(false); }}
        style={dropButtonStyle}
      >
        Risorse <CaretDown size={14} aria-hidden="true" />
      </button>
      <a href={companyDetails.communityHref} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>Community <ArrowSquareOut size={12} aria-hidden="true" /></a>
      <Link className="button button-primary nav-cta" href="/prenota/">Prenota una call <ArrowRight aria-hidden="true" /></Link>

      {megaOpen && (
        <div
          id="services-mega-menu"
          style={{ ...dropPanelStyle, right: 0, left: 0, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "24px 36px", padding: "34px clamp(24px, 4vw, 68px)" }}
        >
          {serviceHubs.map((hub) => <div key={hub.path}><Link href={hub.path} onClick={() => setMegaOpen(false)} style={{ display: "block", marginBottom: 6, color: "white", fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 21, fontWeight: 700, textDecoration: "none" }}>{hub.label}</Link><span style={{ display: "block", color: "#afc1ce", fontSize: 12, lineHeight: 1.45 }}>{hub.navDesc}</span></div>)}
          <div><Link href="/servizi/" onClick={() => setMegaOpen(false)} style={{ display: "block", marginBottom: 6, color: "#62b7ef", fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 21, fontWeight: 700, textDecoration: "none" }}>Tutti i servizi</Link><span style={{ display: "block", color: "#afc1ce", fontSize: 12, lineHeight: 1.45 }}>La pagina indice delle 7 aree</span></div>
        </div>
      )}

      {resourcesOpen && (
        <div
          id="resources-menu"
          style={{ ...dropPanelStyle, right: 0, width: "min(340px, 90vw)", padding: "18px 0" }}
        >
          <Link href="/risorse/" onClick={() => setResourcesOpen(false)} style={{ display: "block", padding: "13px 26px", color: "#e7edf2", textDecoration: "none", fontSize: 14 }}>Approfondimenti</Link>
          <Link href="/risorse/rassegna-stampa/" onClick={() => setResourcesOpen(false)} style={{ display: "block", padding: "13px 26px", color: "#e7edf2", textDecoration: "none", fontSize: 14 }}>Rassegna stampa</Link>
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
        <summary style={{ padding: "17px 4px", color: "#e7edf2", cursor: "pointer", fontSize: 16 }}>Servizi</summary>
        <div style={{ padding: "0 0 14px 15px" }}>
          <Link href="/servizi/" onClick={onNavigate} style={{ display: "block", padding: "10px 0", color: "#62b7ef", textDecoration: "none" }}>Tutti i servizi</Link>
          {serviceHubs.map((hub) => <Link key={hub.path} href={hub.path} onClick={onNavigate} style={{ display: "block", padding: "9px 0", color: "#b8c8d3", fontSize: 13, textDecoration: "none" }}>{hub.label}</Link>)}
        </div>
      </details>
      <Link href="/#metodo" onClick={onNavigate}>Metodo</Link>
      <Link href="/track-record/" onClick={onNavigate}>Track Record</Link>
      <details style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
        <summary style={{ padding: "17px 4px", color: "#e7edf2", cursor: "pointer", fontSize: 16 }}>Risorse</summary>
        <div style={{ paddingLeft: 15 }}>
          <Link href="/risorse/" onClick={onNavigate}>Approfondimenti</Link>
          <Link href="/risorse/rassegna-stampa/" onClick={onNavigate}>Rassegna stampa</Link>
        </div>
      </details>
      <a href={companyDetails.communityHref} target="_blank" rel="noreferrer" onClick={onNavigate}>Community</a>
      <Link className="button button-primary nav-cta" href="/prenota/" onClick={onNavigate}>Prenota una call <ArrowRight aria-hidden="true" /></Link>
    </nav>
  );
}

export function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useMobileNavigation();

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <Link href="/servizi/">Servizi</Link>
          {serviceHubs.map((hub) => <Link key={hub.path} href={hub.path}>{hub.label}</Link>)}
          <Link href="/track-record/">Track Record</Link>
          <Link href="/risorse/">Risorse</Link>
        </nav>
        <div className="footer-meta">
          <span>{companyDetails.legalName}{companyDetails.vat ? ` · P.IVA ${companyDetails.vat}` : ""}</span>
          <span>Brescia, Via Creta, 26 – 25124 · Fidenza</span>
          <a href={companyDetails.phoneHref}>{companyDetails.phone}</a>
          <a href={companyDetails.emailHref}>{companyDetails.email}</a>
          <a href={companyDetails.linkedinHref} target="_blank" rel="noreferrer" aria-label="Delex Capital su LinkedIn"><LinkedinLogo size={16} aria-hidden="true" /> LinkedIn</a>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/cookie-policy/">Cookie Policy</Link>
          <Link href="/contatti/">Contatti</Link>
          <span>© 2026 {companyDetails.legalName}</span>
        </div>
      </footer>
    </>
  );
}
