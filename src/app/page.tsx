"use client";
import { useState, useEffect, useRef } from "react";

import HeroModule     from "@/app/components/module-01-hero";
import AboutModule    from "@/app/components/module-02-about";
import ProjectsModule from "@/app/components/module-03-projects";
import WhatsNext      from "@/app/components/module-04-whatsnext";
import CVModule       from "@/app/components/module-05-cv";
import ContactModule  from "@/app/components/module-06-contact";
//
// Para el preview inline, los componentes están embebidos al final de este archivo.

// ─── SCROLL UTILS ─────────────────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── BREAKPOINT ───────────────────────────────────────────────────────────────
function useBreakpoint() {
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
function useActiveSection(sections) {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observers = sections.map(id => {
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

// ─── NAVBAR SHARED ────────────────────────────────────────────────────────────
function Navbar({ lang, setLang, isMobile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sections = ["hero","about","projects","whatsnext","cv","contact"];
  const active = useActiveSection(sections);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = {
    es: [
      { id:"about",      label:"Sobre mí"    },
      { id:"projects",   label:"Proyectos"   },
      { id:"whatsnext",  label:"What's Next" },
      { id:"cv",         label:"CV"          },
      { id:"contact",    label:"Contacto"    },
    ],
    en: [
      { id:"about",      label:"About me"    },
      { id:"projects",   label:"Projects"    },
      { id:"whatsnext",  label:"What's Next" },
      { id:"cv",         label:"Resume"      },
      { id:"contact",    label:"Contact"     },
    ],
  };

  const links = navLinks[lang];

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
            {links.map(l => (
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
          {/* Lang toggle */}
          <div style={{ display:"flex", gap:2, background:"rgba(255,255,255,.04)", borderRadius:3, padding:2 }}>
            {["es","en"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                fontSize:10.5, fontWeight:700, letterSpacing:".1em",
                padding:"5px 10px", borderRadius:2, cursor:"pointer", border:"none",
                fontFamily:"inherit", transition:"all .15s",
                background: lang===l ? "rgba(14,165,233,.14)" : "transparent",
                color: lang===l ? "#38BDF8" : "#334155",
              }}>{l.toUpperCase()}</button>
            ))}
          </div>

          {/* CTA desktop */}
          {!isMobile && (
            <button onClick={() => scrollToSection("contact")} style={{
              display:"inline-flex", alignItems:"center", gap:7,
              background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
              color:"#fff", fontSize:12.5, fontWeight:600, letterSpacing:".03em",
              padding:"8px 18px", borderRadius:3, border:"none", cursor:"pointer",
              transition:"transform .18s, box-shadow .18s", fontFamily:"inherit",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(14,165,233,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
              {lang === "es" ? "Contactar" : "Contact"} ↗
            </button>
          )}

          {/* Hamburger mobile */}
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
          {links.map(l => (
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

// ─── SCROLL TO TOP BUTTON ─────────────────────────────────────────────────────
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
      onMouseEnter={e => { e.currentTarget.style.background="rgba(14,165,233,.25)"; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="rgba(14,165,233,.15)"; e.currentTarget.style.transform="none"; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(14,165,233,.1),transparent)" }}/>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
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

      {/* Global UI */}
      <Navbar lang={lang} setLang={setLang} isMobile={isMobile} />
      <ReadingProgress />
      <ScrollTop />

      {/* ── SECTIONS ── */}
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

// ─── HERO PLACEHOLDER (demo del navbar con scroll) ────────────────────────────
function HeroPlaceholder({ lang, onLangChange, isMobile }) {
  const t = {
    es: { greeting:"Hola, soy", role:"Full Stack Developer", tagline:"Construyo productos digitales que escalan — del backend al pixel.", cta:"Ver proyectos", cv:"Descargar CV", available:"Disponible para proyectos" },
    en: { greeting:"Hey, I'm",  role:"Full Stack Developer", tagline:"I build digital products that scale — from backend to pixel.",       cta:"View projects", cv:"Download CV",   available:"Available for projects" },
  }[lang];

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      padding: isMobile ? "80px 20px 60px" : "80px 40px 60px",
      position:"relative", overflow:"hidden",
      background:"#080C14",
    }}>
      <style>{`
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.88)}}
        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
        .hf1{animation:fadeUp .65s ease both;animation-delay:.12s}
        .hf2{animation:fadeUp .65s ease both;animation-delay:.28s}
        .hf3{animation:fadeUp .65s ease both;animation-delay:.44s}
        .hf4{animation:fadeUp .65s ease both;animation-delay:.60s}
        .hf5{animation:fadeUp .65s ease both;animation-delay:.76s}
        .hf6{animation:fadeUp .65s ease both;animation-delay:.92s}
        .btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0EA5E9,#6366F1);color:#fff;font-size:13.5px;font-weight:600;padding:12px 26px;border-radius:3px;border:none;cursor:pointer;transition:transform .18s,box-shadow .18s;font-family:inherit;}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(14,165,233,.3);}
        .btn-g{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#94A3B8;font-size:13.5px;font-weight:500;padding:11px 26px;border-radius:3px;border:1px solid rgba(148,163,184,.2);cursor:pointer;transition:all .18s;font-family:inherit;}
        .btn-g:hover{color:#E2E8F0;border-color:rgba(14,165,233,.35);transform:translateY(-2px);}
        .pill-t{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:4px 11px;border-radius:2px;border:1px solid rgba(14,165,233,.18);color:#5BA8D4;background:rgba(14,165,233,.05);white-space:nowrap;}
        .soc-a{width:36px;height:36px;border-radius:3px;border:1px solid rgba(148,163,184,.12);display:flex;align-items:center;justify-content:center;color:#475569;background:transparent;transition:all .18s;text-decoration:none;}
        .soc-a:hover{color:#CBD5E1;border-color:rgba(14,165,233,.35);transform:translateY(-2px);}
      `}</style>

      {/* BG */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(14,165,233,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.035) 1px,transparent 1px)",backgroundSize:"72px 72px",maskImage:"radial-gradient(ellipse 80% 55% at 50% 0%,black 40%,transparent 100%)"}}/>
      <div style={{position:"absolute",top:"-8%",left:"58%",width:isMobile?280:580,height:isMobile?280:580,borderRadius:"50%",background:"radial-gradient(circle,rgba(14,165,233,.11) 0%,transparent 70%)",animation:"floatA 9s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"35%",left:"-8%",width:isMobile?180:420,height:isMobile?180:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 70%)",animation:"floatB 11s ease-in-out infinite"}}/>
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.035,pointerEvents:"none"}}><filter id="hn"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#hn)"/></svg>

      <div style={{maxWidth:1180,margin:"0 auto",width:"100%",display:"flex",alignItems:"center",
        flexDirection: isMobile ? "column" : "row", gap: isMobile ? 40 : 0}}>
        <div style={{flex:"1 1 auto",maxWidth: isMobile ? "100%" : 660,position:"relative",zIndex:1}}>
          <div className="hf1" style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:36,padding:"5px 14px",borderRadius:2,border:"1px solid rgba(34,211,238,.18)",background:"rgba(34,211,238,.05)"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#22D3EE",boxShadow:"0 0 8px rgba(34,211,238,.7)",animation:"pulse 2s infinite"}}/>
            <span style={{fontSize:10.5,fontWeight:700,letterSpacing:".1em",color:"#22D3EE",textTransform:"uppercase"}}>{t.available}</span>
          </div>
          <p className="hf2" style={{fontSize:16,fontWeight:300,color:"#475569",marginBottom:6}}>{t.greeting}</p>
          <h1 className="hf3" style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:isMobile?"clamp(38px,10vw,52px)":"clamp(44px,5.5vw,76px)",lineHeight:1.0,color:"#F1F5F9",letterSpacing:"-.025em",marginBottom:14}}>Patricio Fredes</h1>
          <div className="hf4" style={{marginBottom:24,minHeight:44}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:isMobile?"clamp(18px,5vw,24px)":"clamp(20px,2.8vw,32px)",lineHeight:1.2,margin:0,background:"linear-gradient(135deg,#38BDF8 20%,#818CF8 80%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              {t.role}
            </h2>
          </div>
          <p className="hf5" style={{fontSize:isMobile?14:16,fontWeight:300,lineHeight:1.75,color:"#64748B",marginBottom:36,maxWidth:500}}>{t.tagline}</p>
          <div className="hf5" style={{display:"flex",gap:12,flexDirection:isMobile?"column":"row",marginBottom:36}}>
            <button className="btn-p" onClick={() => scrollToSection("projects")} style={isMobile?{justifyContent:"center"}:{}}>{t.cta} →</button>
            <button className="btn-g" onClick={() => scrollToSection("cv")} style={isMobile?{justifyContent:"center"}:{}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {t.cv}
            </button>
          </div>
          <div className="hf6" style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:36}}>
            {["React","Next.js","Node.js","TypeScript","Python","PostgreSQL","SQL Server","Docker","AWS","MongoDB"].map(tech=><span key={tech} className="pill-t">{tech}</span>)}
          </div>
          <div className="hf6" style={{display:"flex",gap:8}}>
            <a href="https://github.com/PatoFredesTi" target="_blank" rel="noopener noreferrer" className="soc-a">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/patriciofredesti/" target="_blank" rel="noopener noreferrer" className="soc-a">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.91 1.64-1.87 3.37-1.87 3.6 0 4.27 2.37 4.27 5.45v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.22 0z"/></svg>
            </a>
          </div>
        </div>

        {/* Code block */}
        {!isMobile && (
          <div style={{flex:"0 0 288px",marginLeft:"auto",position:"relative",zIndex:1}}>
            <div style={{background:"rgba(10,18,35,.85)",border:"1px solid rgba(14,165,233,.14)",borderRadius:6,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,.6)"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:6}}>
                {["#FF5F57","#FFBD2E","#28C840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                <span style={{marginLeft:8,fontSize:10.5,color:"#334155",fontFamily:"monospace"}}>about.ts</span>
              </div>
              <pre style={{margin:0,padding:"18px 20px",fontSize:11.5,lineHeight:1.85,fontFamily:"'JetBrains Mono','Fira Code',monospace",color:"#94A3B8",background:"transparent"}}>
{`const dev = {
  `}<span style={{color:"#38BDF8"}}>name</span>{`: `}<span style={{color:"#86EFAC"}}>"Patricio Fredes"</span>{`,
  `}<span style={{color:"#38BDF8"}}>role</span>{`: `}<span style={{color:"#86EFAC"}}>"Full Stack Dev"</span>{`,
  `}<span style={{color:"#38BDF8"}}>stack</span>{`: [
    `}<span style={{color:"#86EFAC"}}>"Next.js"</span>{`, `}<span style={{color:"#86EFAC"}}>"Node"</span>{`,
    `}<span style={{color:"#86EFAC"}}>"Python"</span>{`, `}<span style={{color:"#86EFAC"}}>"AWS"</span>{`,
  ],
  `}<span style={{color:"#38BDF8"}}>location</span>{`: `}<span style={{color:"#86EFAC"}}>"Santiago, CL"</span>{`,
  `}<span style={{color:"#38BDF8"}}>open</span>{`: `}<span style={{color:"#FB923C"}}>true</span>{`,
  `}<span style={{color:"#38BDF8"}}>coffee</span>{`: `}<span style={{color:"#86EFAC"}}>"∞"</span>{`,
};`}
              </pre>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        {!isMobile && (
          <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <div style={{width:1,height:44,background:"linear-gradient(to bottom,#0EA5E9,transparent)",animation:"scan 2.2s ease-in-out infinite"}}/>
            <span style={{fontSize:9.5,fontWeight:700,letterSpacing:".12em",color:"#1E3A52",textTransform:"uppercase"}}>{lang==="es"?"Scroll para explorar":"Scroll to explore"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION PLACEHOLDER ──────────────────────────────────────────────────────
// Reemplaza cada uno de estos con el componente real al integrar
function SectionPlaceholder({ label, title, color }) {
  return (
    <div style={{ minHeight:400, display:"flex", alignItems:"center", justifyContent:"center",
      padding:"80px 40px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse at center,${color}08 0%,transparent 70%)` }}/>
      <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
        <p style={{ fontSize:10.5, fontWeight:700, color, letterSpacing:".14em",
          textTransform:"uppercase", marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>{label}</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:36,
          color:"#F1F5F9", marginBottom:16 }}>{title}</h2>
        <p style={{ fontSize:13, color:"#334155", fontFamily:"'DM Sans',sans-serif" }}>
          Importa el módulo correspondiente para ver el contenido aquí.
        </p>
        <div style={{ marginTop:20, padding:"10px 20px", borderRadius:3, display:"inline-block",
          border:`1px dashed ${color}40`, background:`${color}06` }}>
          <code style={{ fontSize:12, color, fontFamily:"monospace" }}>
            {`import ${title.replace(/\s/g,"")}Module from "@/components/${label.toLowerCase().replace(" ","-")}"`}
          </code>
        </div>
      </div>
    </div>
  );
}