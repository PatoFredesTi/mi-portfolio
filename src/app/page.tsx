"use client";
import { useState, useEffect } from "react";

import HeroModule     from "@/app/components/module-01-hero";
import AboutModule    from "@/app/components/module-02-about";
import ProjectsModule from "@/app/components/module-03-projects";
import WhatsNext      from "@/app/components/module-04-whatsnext";
import CVModule       from "@/app/components/module-05-cv";
import ContactModule  from "@/app/components/module-06-contact";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface NavLink {
  id: string;
  label: string;
}

interface NavbarProps {
  lang: string;
  setLang: (lang: string) => void;
  isMobile: boolean;
}

// ─── SCROLL UTILS ─────────────────────────────────────────────────────────────
function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── BREAKPOINT ───────────────────────────────────────────────────────────────
function useBreakpoint(): string {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

// ─── ACTIVE SECTION TRACKER ───────────────────────────────────────────────────
function useActiveSection(sections: string[]): string {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observers = sections.map((id: string) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);
  return active;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ lang, setLang, isMobile }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sections = ["hero","about","projects","whatsnext","cv","contact"];
  const active = useActiveSection(sections);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: Record<string, NavLink[]> = {
    es: [
      { id:"about",     label:"Sobre mí"    },
      { id:"projects",  label:"Proyectos"   },
      { id:"whatsnext", label:"What's Next" },
      { id:"cv",        label:"CV"          },
      { id:"contact",   label:"Contacto"    },
    ],
    en: [
      { id:"about",     label:"About me"    },
      { id:"projects",  label:"Projects"    },
      { id:"whatsnext", label:"What's Next" },
      { id:"cv",        label:"Resume"      },
      { id:"contact",   label:"Contact"     },
    ],
  };

  const links: NavLink[] = navLinks[lang];

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        height:60, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding: isMobile ? "0 20px" : "0 40px",
        background: scrolled ? "rgba(8,12,20,.92)" : "rgba(8,12,20,.75)",
        backdropFilter:"blur(18px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid rgba(255,255,255,.03)",
        transition:"background .3s, border-color .3s",
      }}>
        {/* Logo */}
        <button onClick={() => scrollToSection("hero")} style={{
          display:"flex", alignItems:"center", gap:10,
          background:"none", border:"none", cursor:"pointer", padding:0,
        }}>
          <div style={{ width:30, height:30, borderRadius:3,
            background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, fontWeight:800, color:"#fff", fontFamily:"'Syne',sans-serif" }}>PF</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#E2E8F0" }}>
            Patricio
          </span>
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display:"flex", gap:28 }}>
            {links.map((l: NavLink) => (
              <button key={l.id} onClick={() => scrollToSection(l.id)} style={{
                color: active === l.id ? "#38BDF8" : "#64748B",
                fontSize:11.5, fontWeight: active === l.id ? 600 : 500,
                letterSpacing:".08em", textTransform:"uppercase",
                cursor:"pointer", padding:"4px 0", background:"none", border:"none",
                borderBottom: active === l.id ? "1px solid #38BDF8" : "1px solid transparent",
                transition:"color .2s, border-color .2s", fontFamily:"inherit",
              }}>{l.label}</button>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {!isMobile && (
            <button onClick={() => scrollToSection("contact")} style={{
              display:"inline-flex", alignItems:"center", gap:7,
              background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
              color:"#fff", fontSize:12.5, fontWeight:600, letterSpacing:".03em",
              padding:"8px 18px", borderRadius:3, border:"none", cursor:"pointer",
              transition:"transform .18s, box-shadow .18s", fontFamily:"inherit",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform="translateY(-1px)";
                e.currentTarget.style.boxShadow="0 8px 24px rgba(14,165,233,.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform="none";
                e.currentTarget.style.boxShadow="none";
              }}>
              {lang === "es" ? "Contactar" : "Contact"} ↗
            </button>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background:"none", border:"none", cursor:"pointer", padding:6,
              display:"flex", flexDirection:"column", gap:5, color:"#94A3B8",
            }}>
              <span style={{ display:"block", width:22, height:1.5, background:"currentColor", borderRadius:1,
                transition:"all .2s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }}/>
              <span style={{ display:"block", width:22, height:1.5, background:"currentColor", borderRadius:1,
                transition:"all .2s", opacity: menuOpen ? 0 : 1 }}/>
              <span style={{ display:"block", width:22, height:1.5, background:"currentColor", borderRadius:1,
                transition:"all .2s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }}/>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{
          position:"fixed", top:60, left:0, right:0, zIndex:199,
          background:"rgba(8,12,20,.97)", backdropFilter:"blur(20px)",
          padding:"8px 20px 24px",
          borderBottom:"1px solid rgba(255,255,255,.06)",
          animation:"slideDown .2s ease both",
        }}>
          {links.map((l: NavLink) => (
            <button key={l.id} onClick={() => { scrollToSection(l.id); setMenuOpen(false); }} style={{
              color: active === l.id ? "#38BDF8" : "#94A3B8",
              fontSize:15, fontWeight: active === l.id ? 600 : 400,
              letterSpacing:".06em", textTransform:"uppercase",
              cursor:"pointer", padding:"14px 0", background:"none", border:"none",
              borderBottom:"1px solid rgba(255,255,255,.05)",
              width:"100%", textAlign:"left", fontFamily:"inherit", transition:"color .2s",
              display:"block",
            }}>{l.label}</button>
          ))}
          <button onClick={() => { scrollToSection("contact"); setMenuOpen(false); }} style={{
            marginTop:16, width:"100%",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
            color:"#fff", fontSize:14, fontWeight:600,
            padding:"13px 20px", borderRadius:3, border:"none", cursor:"pointer",
            fontFamily:"inherit",
          }}>
            {lang === "es" ? "Contactar" : "Contact"} ↗
          </button>
        </div>
      )}
    </>
  );
}

// ─── SCROLL TO TOP ─────────────────────────────────────────────────────────────
function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button onClick={() => scrollToSection("hero")} style={{
      position:"fixed", bottom:32, right:32, zIndex:150,
      width:42, height:42, borderRadius:4,
      background:"rgba(14,165,233,.15)", border:"1px solid rgba(14,165,233,.3)",
      color:"#38BDF8", cursor:"pointer", display:"flex", alignItems:"center",
      justifyContent:"center", transition:"all .2s",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background="rgba(14,165,233,.25)";
        e.currentTarget.style.transform="translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background="rgba(14,165,233,.15)";
        e.currentTarget.style.transform="none";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(14,165,233,.1),transparent)" }}/>
  );
}

// ─── READING PROGRESS ─────────────────────────────────────────────────────────
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position:"fixed", top:60, left:0, right:0, height:2, zIndex:199,
      background:"rgba(255,255,255,.04)" }}>
      <div style={{ height:"100%", width:`${pct}%`,
        background:"linear-gradient(90deg,#0EA5E9,#6366F1)",
        transition:"width .1s linear" }}/>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("es");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <div style={{ background:"#080C14", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#080C14;color:#E2E8F0;font-family:'DM Sans',system-ui,sans-serif;}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <Navbar lang={lang} setLang={setLang} isMobile={isMobile} />
      <ReadingProgress />
      <ScrollTop />

      <div id="hero">
        <HeroModule lang={lang} onLangChange={setLang} />
      </div>

      <Divider />

      <div id="about">
        <AboutModule lang={lang} />
      </div>

      <Divider />

      <div id="projects">
        <ProjectsModule lang={lang} />
      </div>

      <Divider />

      <div id="whatsnext">
        <WhatsNext lang={lang} />
      </div>

      <Divider />

      <div id="cv">
        <CVModule lang={lang} />
      </div>

      <Divider />

      <div id="contact">
        <ContactModule lang={lang} />
      </div>
    </div>
  );
}