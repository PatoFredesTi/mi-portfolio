import { useState, useEffect } from "react";

const i18n = {
  es: {
    greeting: "Hola, soy",
    role: "Full Stack Developer",
    tagline: "Construyo productos digitales que escalan — del backend al pixel.",
    cta_primary: "Ver proyectos",
    cta_cv: "Descargar CV",
    available: "Disponible para proyectos",
    scroll: "Scroll para explorar",
    nav: { about: "Sobre mí", projects: "Proyectos", next: "What's Next", contact: "Contacto" },
  },
  en: {
    greeting: "Hey, I'm",
    role: "Full Stack Developer",
    tagline: "I build digital products that scale — from backend to pixel.",
    cta_primary: "View projects",
    cta_cv: "Download CV",
    available: "Available for projects",
    scroll: "Scroll to explore",
    nav: { about: "About me", projects: "Projects", next: "What's Next", contact: "Contact" },
  },
};

const techs = ["React","Next.js","Node.js","TypeScript","Python","PostgreSQL","SQL Server","Docker","AWS","MongoDB"];
const SOCIAL = {
  github:   "https://github.com/PatoFredesTi",
  linkedin: "https://www.linkedin.com/in/patriciofredesti/",
};

function useTypewriter(text, speed = 58, delay = 800) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    const t = setTimeout(() => {
      let i = 0;
      const tick = setInterval(() => {
        setDisplayed(text.slice(0, i + 1)); i++;
        if (i >= text.length) { clearInterval(tick); setDone(true); }
      }, speed);
      return () => clearInterval(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [text]);
  return { displayed, done };
}

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

export default function HeroModule({ lang: propLang, onLangChange }) {
  const [lang, setLang] = useState(propLang || "es");
  const [menuOpen, setMenuOpen] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const t = i18n[lang];
  const { displayed, done } = useTypewriter(t.role, 58, 900);

  const handleLang = (l) => {
    setLang(l);
    onLangChange && onLangChange(l);
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:"#080C14", minHeight:"100vh", color:"#E2E8F0", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes floatA{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-28px) scale(1.04)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.88)}}
        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

        .f1{animation:fadeUp .65s ease both;animation-delay:.12s}
        .f2{animation:fadeUp .65s ease both;animation-delay:.26s}
        .f3{animation:fadeUp .65s ease both;animation-delay:.40s}
        .f4{animation:fadeUp .65s ease both;animation-delay:.56s}
        .f5{animation:fadeUp .65s ease both;animation-delay:.72s}
        .f6{animation:fadeUp .65s ease both;animation-delay:.88s}
        .f7{animation:fadeUp .65s ease both;animation-delay:1.04s}
        .f8{animation:fadeUp .65s ease both;animation-delay:1.18s}

        .nav-link{color:#64748B;font-size:11.5px;font-weight:500;letter-spacing:.08em;
          text-transform:uppercase;cursor:pointer;padding:4px 0;background:none;border:none;
          border-bottom:1px solid transparent;transition:color .2s,border-color .2s;font-family:inherit;}
        .nav-link:hover{color:#CBD5E1;border-color:rgba(14,165,233,.4);}

        .mobile-nav-link{color:#94A3B8;font-size:15px;font-weight:500;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;padding:14px 0;background:none;border:none;
          border-bottom:1px solid rgba(255,255,255,.05);width:100%;text-align:left;
          font-family:inherit;transition:color .2s;}
        .mobile-nav-link:hover{color:#E2E8F0;}

        .btn-primary{display:inline-flex;align-items:center;gap:8px;
          background:linear-gradient(135deg,#0EA5E9 0%,#6366F1 100%);
          color:#fff;font-size:13.5px;font-weight:600;letter-spacing:.03em;
          padding:12px 26px;border-radius:3px;border:none;cursor:pointer;
          transition:transform .18s,box-shadow .18s;font-family:inherit;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(14,165,233,.3);}

        .btn-ghost{display:inline-flex;align-items:center;gap:8px;
          background:transparent;color:#94A3B8;font-size:13.5px;font-weight:500;
          padding:11px 26px;border-radius:3px;border:1px solid rgba(148,163,184,.2);
          cursor:pointer;transition:color .2s,border-color .2s,transform .18s;font-family:inherit;}
        .btn-ghost:hover{color:#E2E8F0;border-color:rgba(14,165,233,.35);transform:translateY(-2px);}

        .pill{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
          padding:4px 11px;border-radius:2px;
          border:1px solid rgba(14,165,233,.18);color:#5BA8D4;
          background:rgba(14,165,233,.05);white-space:nowrap;}

        .social{width:36px;height:36px;border-radius:3px;
          border:1px solid rgba(148,163,184,.12);display:flex;align-items:center;
          justify-content:center;cursor:pointer;color:#475569;background:transparent;
          transition:color .2s,border-color .2s,transform .18s;text-decoration:none;}
        .social:hover{color:#CBD5E1;border-color:rgba(14,165,233,.35);transform:translateY(-2px);}

        .lang{font-size:10.5px;font-weight:700;letter-spacing:.1em;
          padding:5px 10px;border-radius:2px;cursor:pointer;border:none;font-family:inherit;transition:all .15s;}
        .lang-on{background:rgba(14,165,233,.14);color:#38BDF8;}
        .lang-off{background:transparent;color:#334155;}
        .lang-off:hover{color:#64748B;}

        .hamburger{background:none;border:none;cursor:pointer;padding:6px;
          display:flex;flex-direction:column;gap:5px;color:#94A3B8;}
        .hamburger span{display:block;width:22px;height:1.5px;background:currentColor;
          transition:all .2s;border-radius:1px;}

        .code-box{background:rgba(10,18,35,.85);border:1px solid rgba(14,165,233,.14);
          border-radius:6px;overflow:hidden;backdrop-filter:blur(10px);
          box-shadow:0 24px 80px rgba(0,0,0,.6),0 0 0 1px rgba(14,165,233,.06);}
        .code-dot{width:10px;height:10px;border-radius:50%;}
      `}</style>

      {/* BG */}
      <div style={{position:"fixed",inset:0,zIndex:0,
        backgroundImage:"linear-gradient(rgba(14,165,233,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.035) 1px,transparent 1px)",
        backgroundSize:"72px 72px",
        maskImage:"radial-gradient(ellipse 80% 55% at 50% 0%,black 40%,transparent 100%)"}}/>
      <div style={{position:"fixed",top:"-8%",left:"58%",width:isMobile?300:580,height:isMobile?300:580,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(14,165,233,.11) 0%,transparent 70%)",
        zIndex:0,animation:"floatA 9s ease-in-out infinite"}}/>
      <div style={{position:"fixed",top:"35%",left:"-8%",width:isMobile?200:420,height:isMobile?200:420,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 70%)",
        zIndex:0,animation:"floatB 11s ease-in-out infinite"}}/>
      <svg style={{position:"fixed",inset:0,width:"100%",height:"100%",opacity:.035,pointerEvents:"none",zIndex:1}}>
        <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#n)"/>
      </svg>
      <div style={{position:"fixed",top:0,left:0,right:0,height:1,zIndex:200,
        background:"linear-gradient(90deg,transparent,rgba(14,165,233,.5),transparent)"}}/>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,height:60,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding: isMobile ? "0 20px" : "0 40px",
        background:"rgba(8,12,20,.85)",backdropFilter:"blur(18px)",
        borderBottom:"1px solid rgba(255,255,255,.04)",
      }}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:3,
            background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:12,fontWeight:800,color:"#fff",fontFamily:"'Syne',sans-serif"}}>PF</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#E2E8F0"}}>Patricio</span>
        </div>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{display:"flex",gap: isTablet ? 20 : 28}}>
            {Object.values(t.nav).map(l => <button key={l} className="nav-link">{l}</button>)}
          </div>
        )}

        {/* Right controls */}
        <div style={{display:"flex",alignItems:"center",gap: isMobile ? 10 : 14}}>
          <div style={{display:"flex",gap:2,background:"rgba(255,255,255,.04)",borderRadius:3,padding:2}}>
            {["es","en"].map(l => (
              <button key={l} className={`lang ${lang===l?"lang-on":"lang-off"}`} onClick={() => handleLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {!isMobile && (
            <button className="btn-primary" style={{padding:"8px 18px",fontSize:12.5}}>
              {t.cta_primary} <span style={{fontSize:15}}>↗</span>
            </button>
          )}
          {/* Hamburger */}
          {isMobile && (
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none"}}/>
              <span style={{opacity: menuOpen ? 0 : 1}}/>
              <span style={{transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none"}}/>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{
          position:"fixed",top:60,left:0,right:0,zIndex:99,
          background:"rgba(8,12,20,.97)",backdropFilter:"blur(20px)",
          padding:"8px 20px 24px",borderBottom:"1px solid rgba(255,255,255,.06)",
          animation:"slideDown .2s ease both",
        }}>
          {Object.values(t.nav).map(l => (
            <button key={l} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l}</button>
          ))}
          <button className="btn-primary" style={{marginTop:16,width:"100%",justifyContent:"center"}}>
            {t.cta_primary} ↗
          </button>
        </div>
      )}

      {/* ── HERO MAIN ── */}
      <main style={{
        position:"relative",zIndex:10,minHeight:"100vh",
        display:"flex",alignItems:"center",
        padding: isMobile ? "80px 20px 60px" : isTablet ? "80px 32px 60px" : "80px 40px 60px",
        maxWidth:1180,margin:"0 auto",
      }}>
        <div style={{
          display:"flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          alignItems: isMobile || isTablet ? "flex-start" : "center",
          gap: isMobile ? 40 : isTablet ? 48 : 0,
          width:"100%",
        }}>
          {/* Left */}
          <div style={{flex:"1 1 auto", maxWidth: isMobile || isTablet ? "100%" : 660}}>

            {/* Badge */}
            <div className="f1" style={{display:"inline-flex",alignItems:"center",gap:8,
              marginBottom: isMobile ? 28 : 36,
              padding:"5px 14px",borderRadius:2,
              border:"1px solid rgba(34,211,238,.18)",background:"rgba(34,211,238,.05)"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#22D3EE",
                boxShadow:"0 0 8px rgba(34,211,238,.7)",animation:"pulse 2s infinite"}}/>
              <span style={{fontSize:10.5,fontWeight:700,letterSpacing:".1em",color:"#22D3EE",textTransform:"uppercase"}}>
                {t.available}
              </span>
            </div>

            {/* Greeting */}
            <p className="f2" style={{fontSize: isMobile ? 14 : 16,fontWeight:300,color:"#475569",marginBottom:6,letterSpacing:".02em"}}>
              {t.greeting}
            </p>

            {/* Name */}
            <h1 className="f3" style={{
              fontFamily:"'Syne',sans-serif",fontWeight:800,
              fontSize: isMobile ? "clamp(36px,10vw,52px)" : isTablet ? "clamp(44px,7vw,64px)" : "clamp(42px,5.5vw,76px)",
              lineHeight:1.0,color:"#F1F5F9",letterSpacing:"-.025em",marginBottom:14,
            }}>Patricio Fredes</h1>

            {/* Role typewriter */}
            <div className="f4" style={{marginBottom:20,minHeight: isMobile ? 36 : 46}}>
              <h2 style={{
                fontFamily:"'Syne',sans-serif",fontWeight:700,
                fontSize: isMobile ? "clamp(16px,5vw,22px)" : isTablet ? "clamp(18px,3.5vw,26px)" : "clamp(19px,2.8vw,32px)",
                lineHeight:1.2,margin:0,
                background:"linear-gradient(135deg,#38BDF8 20%,#818CF8 80%)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
              }}>
                {displayed}
                {!done && <span style={{display:"inline-block",width:2,height:"0.85em",
                  background:"#38BDF8",marginLeft:2,verticalAlign:"middle",
                  animation:"blink .85s step-end infinite"}}/>}
              </h2>
            </div>

            {/* Tagline */}
            <p className="f5" style={{
              fontSize: isMobile ? 14 : 15,fontWeight:300,lineHeight:1.75,
              color:"#64748B",marginBottom: isMobile ? 28 : 38,maxWidth:500,
            }}>{t.tagline}</p>

            {/* CTAs */}
            <div className="f6" style={{
              display:"flex",gap:12,
              flexDirection: isMobile ? "column" : "row",
              marginBottom: isMobile ? 28 : 40,
            }}>
              <button className="btn-primary" style={isMobile ? {justifyContent:"center"} : {}}>
                {t.cta_primary} →
              </button>
              <button className="btn-ghost" style={isMobile ? {justifyContent:"center"} : {}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {t.cta_cv}
              </button>
            </div>

            {/* Pills */}
            <div className="f7" style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom: isMobile ? 28 : 40,maxWidth:560}}>
              {techs.map(tech => <span key={tech} className="pill">{tech}</span>)}
            </div>

            {/* Socials */}
            <div className="f8" style={{display:"flex",gap:8}}>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="social" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="social" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.91 1.64-1.87 3.37-1.87 3.6 0 4.27 2.37 4.27 5.45v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.22 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Code block — hidden on mobile, shown tablet+ */}
          {!isMobile && (
            <div className="f5" style={{
              flex:"0 0 auto",
              width: isTablet ? "100%" : 288,
              maxWidth: isTablet ? 420 : 288,
              marginLeft: isTablet ? 0 : "auto",
            }}>
              <div className="code-box">
                <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",
                  display:"flex",alignItems:"center",gap:6}}>
                  <div className="code-dot" style={{background:"#FF5F57"}}/>
                  <div className="code-dot" style={{background:"#FFBD2E"}}/>
                  <div className="code-dot" style={{background:"#28C840"}}/>
                  <span style={{marginLeft:8,fontSize:10.5,color:"#334155",
                    fontFamily:"'JetBrains Mono','Fira Code',monospace"}}>about.ts</span>
                </div>
                <pre style={{margin:0,padding:"18px 20px",fontSize:11.5,lineHeight:1.85,
                  fontFamily:"'JetBrains Mono','Fira Code',Consolas,monospace",
                  color:"#94A3B8",overflowX:"auto",background:"transparent"}}>
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
        </div>

        {/* Scroll indicator — hidden on mobile */}
        {!isMobile && (
          <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",
            display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <div style={{width:1,height:44,
              background:"linear-gradient(to bottom,#0EA5E9,transparent)",
              animation:"scan 2.2s ease-in-out infinite"}}/>
            <span style={{fontSize:9.5,fontWeight:700,letterSpacing:".12em",
              color:"#1E3A52",textTransform:"uppercase"}}>{t.scroll}</span>
          </div>
        )}
      </main>

      <div style={{position:"fixed",bottom:0,left:0,right:0,height:1,zIndex:100,
        background:"linear-gradient(90deg,transparent,rgba(14,165,233,.25),transparent)"}}/>
    </div>
  );
}
