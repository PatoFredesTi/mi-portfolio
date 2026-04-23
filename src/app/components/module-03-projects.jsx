import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const projects = {
  es: [
    {
      id: 1,
      title: "Tabla de Criptomonedas",
      subtitle: "Web App · Datos en tiempo real",
      description:
        "Aplicación que consume una API pública para mostrar datos en tiempo real de las principales criptomonedas. Tabla interactiva con ordenamiento por columna, toggle dark/light mode y soporte multilenguaje.",
      stack: ["React", "Tailwind CSS", "REST API", "JavaScript"],
      category: "Frontend",
      status: "paused",
      statusLabel: "Pausado",
      github: "https://github.com/PatoFredesTi/AplicacionTablaCriptomonedas",
      demo: null,
      highlights: ["Multilenguaje nativo", "Dark / Light mode", "Ordenamiento dinámico"],
      icon: "₿",
      color: "#F59E0B",
    },
    {
      id: 2,
      title: "ChatFlow Realtime",
      subtitle: "Web App · Comunicación en tiempo real",
      description:
        "Plataforma de chat en tiempo real con arquitectura moderna. Frontend completamente funcional con gestión de estado global, validación de formularios y conexión WebSocket. Backend en desarrollo activo.",
      stack: ["React 18", "TypeScript", "Zustand", "TanStack Query", "Socket.io", "Tailwind CSS", "React Router", "Zod"],
      category: "Full Stack",
      status: "active",
      statusLabel: "En desarrollo",
      github: "https://github.com/PatoFredesTi/chatflow-realtime",
      demo: null,
      highlights: ["WebSocket en tiempo real", "State management con Zustand", "Frontend production-ready"],
      icon: "💬",
      color: "#22D3EE",
    },
    {
      id: 3,
      title: "Web Scraper",
      subtitle: "Herramienta · Automatización de datos",
      description:
        "Herramienta de extracción y procesamiento de datos web. Obtiene información estructurada de sitios objetivo de forma automatizada, con salida configurable y soporte para múltiples fuentes.",
      stack: ["Python", "BeautifulSoup", "Requests", "Pandas"],
      category: "Backend",
      status: "building",
      statusLabel: "Repo próximamente",
      github: null,
      demo: null,
      highlights: ["Extracción automatizada", "Salida configurable", "Multi-fuente"],
      icon: "🕷",
      color: "#A78BFA",
    },
  ],
  en: [
    {
      id: 1,
      title: "Cryptocurrency Table",
      subtitle: "Web App · Real-time data",
      description:
        "Application that consumes a public API to display real-time data on major cryptocurrencies. Interactive table with column sorting, dark/light mode toggle and multilanguage support.",
      stack: ["React", "Tailwind CSS", "REST API", "JavaScript"],
      category: "Frontend",
      status: "paused",
      statusLabel: "Paused",
      github: "https://github.com/PatoFredesTi/AplicacionTablaCriptomonedas",
      demo: null,
      highlights: ["Native multilanguage", "Dark / Light mode", "Dynamic sorting"],
      icon: "₿",
      color: "#F59E0B",
    },
    {
      id: 2,
      title: "ChatFlow Realtime",
      subtitle: "Web App · Real-time communication",
      description:
        "Real-time chat platform with modern architecture. Fully functional frontend with global state management, form validation and WebSocket connection ready. Backend in active development.",
      stack: ["React 18", "TypeScript", "Zustand", "TanStack Query", "Socket.io", "Tailwind CSS", "React Router", "Zod"],
      category: "Full Stack",
      status: "active",
      statusLabel: "In development",
      github: "https://github.com/PatoFredesTi/chatflow-realtime",
      demo: null,
      highlights: ["Real-time WebSocket", "Zustand state management", "Production-ready frontend"],
      icon: "💬",
      color: "#22D3EE",
    },
    {
      id: 3,
      title: "Web Scraper",
      subtitle: "Tool · Data automation",
      description:
        "Web data extraction and processing tool. Automatically retrieves structured information from target sites with configurable output and support for multiple sources.",
      stack: ["Python", "BeautifulSoup", "Requests", "Pandas"],
      category: "Backend",
      status: "building",
      statusLabel: "Repo coming soon",
      github: null,
      demo: null,
      highlights: ["Automated extraction", "Configurable output", "Multi-source"],
      icon: "🕷",
      color: "#A78BFA",
    },
  ],
};

const i18n = {
  es: {
    section:    "Proyectos",
    heading:    "Lo que he construido",
    subheading: "Proyectos personales donde experimento con tecnologías fuera del trabajo.",
    all:        "Todos",
    github:     "Ver código",
    demo:       "Ver demo",
    coming:     "Repo próximamente",
    features:   "Highlights",
    filter:     "Filtrar por",
    status: {
      active:   { color:"#22D3EE", bg:"rgba(34,211,238,.08)",  border:"rgba(34,211,238,.2)"  },
      paused:   { color:"#F59E0B", bg:"rgba(245,158,11,.08)",  border:"rgba(245,158,11,.2)"  },
      building: { color:"#A78BFA", bg:"rgba(167,139,250,.08)", border:"rgba(167,139,250,.2)" },
    },
  },
  en: {
    section:    "Projects",
    heading:    "What I've built",
    subheading: "Personal projects where I experiment with technologies outside of work.",
    all:        "All",
    github:     "View code",
    demo:       "Live demo",
    coming:     "Repo coming soon",
    features:   "Highlights",
    filter:     "Filter by",
    status: {
      active:   { color:"#22D3EE", bg:"rgba(34,211,238,.08)",  border:"rgba(34,211,238,.2)"  },
      paused:   { color:"#F59E0B", bg:"rgba(245,158,11,.08)",  border:"rgba(245,158,11,.2)"  },
      building: { color:"#A78BFA", bg:"rgba(167,139,250,.08)", border:"rgba(167,139,250,.2)" },
    },
  },
};

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

// ─── FEATURED CARD (large, first project) ────────────────────────────────────
function FeaturedCard({ project, t, isMobile }) {
  const st = t.status[project.status];

  return (
    <div style={{
      gridColumn: isMobile ? "1" : "1 / -1",
      borderRadius: 8,
      border: `1px solid rgba(255,255,255,.08)`,
      background: "rgba(10,18,35,.8)",
      backdropFilter: "blur(10px)",
      overflow: "hidden",
      position: "relative",
      transition: "box-shadow .25s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 24px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1)`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Accent top border */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg,transparent,${project.color},transparent)` }}/>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: isMobile ? "auto" : 280,
      }}>
        {/* Left — visual panel */}
        <div style={{
          flex: "0 0 300px",
          background: `radial-gradient(ellipse at center, ${project.color}15 0%, transparent 70%)`,
          borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.06)",
          borderBottom: isMobile ? "1px solid rgba(255,255,255,.06)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px 32px", minHeight: isMobile ? 160 : "auto",
          position: "relative", overflow: "hidden",
        }}>
          {/* Grid pattern */}
          <div style={{ position:"absolute", inset:0,
            backgroundImage:`linear-gradient(${project.color}08 1px,transparent 1px),linear-gradient(90deg,${project.color}08 1px,transparent 1px)`,
            backgroundSize:"32px 32px" }}/>
          <span style={{ fontSize: 72, position:"relative", zIndex:1, filter:"drop-shadow(0 0 24px currentColor)" }}>
            {project.icon}
          </span>
          {/* Featured label */}
          <div style={{ position:"absolute", top:16, left:16,
            fontSize:9, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase",
            padding:"3px 10px", borderRadius:2,
            background:`${project.color}20`, border:`1px solid ${project.color}40`,
            color: project.color }}>
            Featured
          </div>
        </div>

        {/* Right — content */}
        <div style={{ flex:1, padding: isMobile ? "28px 24px" : "36px 40px",
          display:"flex", flexDirection:"column", gap:18 }}>

          {/* Header */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between",
            alignItems:"flex-start", gap:12 }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginBottom:10,
                padding:"3px 10px", borderRadius:2, background:st.bg, border:`1px solid ${st.border}` }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:st.color,
                  boxShadow:`0 0 5px ${st.color}` }}/>
                <span style={{ fontSize:10, fontWeight:700, color:st.color,
                  letterSpacing:".08em", textTransform:"uppercase" }}>{project.statusLabel}</span>
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize: isMobile ? 22 : 26,
                color:"#F1F5F9", margin:"0 0 4px", letterSpacing:"-.015em" }}>{project.title}</h3>
              <p style={{ fontSize:12.5, color:"#475569", margin:0 }}>{project.subtitle}</p>
            </div>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
              padding:"4px 12px", borderRadius:2,
              border:"1px solid rgba(255,255,255,.08)", color:"#334155",
              background:"rgba(255,255,255,.03)" }}>{project.category}</span>
          </div>

          <p style={{ fontSize:14, lineHeight:1.8, color:"#64748B", margin:0 }}>{project.description}</p>

          {/* Highlights */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {project.highlights.map(h => (
              <div key={h} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:project.color, flexShrink:0 }}/>
                <span style={{ fontSize:12.5, color:"#94A3B8" }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {project.stack.map(tag => (
              <span key={tag} style={{ fontSize:10, fontWeight:600, letterSpacing:".08em",
                textTransform:"uppercase", padding:"3px 10px", borderRadius:2,
                border:"1px solid rgba(14,165,233,.18)", color:"#5BA8D4",
                background:"rgba(14,165,233,.05)" }}>{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:"auto" }}>
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:7,
                  padding:"10px 20px", borderRadius:3, textDecoration:"none",
                  background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
                  color:"#fff", fontSize:13, fontWeight:600, transition:"all .18s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(14,165,233,.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                {t.github}
              </a>
            ) : (
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 20px",
                borderRadius:3, border:"1px dashed rgba(148,163,184,.1)", color:"#334155", fontSize:13 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {t.coming}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REGULAR CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, t, isMobile }) {
  const st = t.status[project.status];

  return (
    <div style={{
      borderRadius:6,
      border:"1px solid rgba(255,255,255,.06)",
      background:"rgba(10,18,35,.7)",
      backdropFilter:"blur(8px)",
      padding: isMobile ? "24px 20px" : "28px 28px",
      display:"flex", flexDirection:"column", gap:18,
      position:"relative", overflow:"hidden",
      transition:"transform .2s, box-shadow .2s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.08)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:`linear-gradient(90deg,transparent,${project.color}44,transparent)` }}/>

      {/* Category */}
      <div style={{ position:"absolute", top:20, right:20, fontSize:9.5, fontWeight:700,
        letterSpacing:".1em", textTransform:"uppercase", padding:"3px 10px", borderRadius:2,
        border:"1px solid rgba(255,255,255,.07)", color:"#334155", background:"rgba(255,255,255,.03)" }}>
        {project.category}
      </div>

      {/* Icon + status */}
      <div>
        <div style={{ fontSize:36, marginBottom:16, lineHeight:1 }}>{project.icon}</div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginBottom:12,
          padding:"3px 10px", borderRadius:2, background:st.bg, border:`1px solid ${st.border}` }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:st.color,
            boxShadow:`0 0 5px ${st.color}`, flexShrink:0 }}/>
          <span style={{ fontSize:10, fontWeight:700, color:st.color,
            letterSpacing:".08em", textTransform:"uppercase" }}>{project.statusLabel}</span>
        </div>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize: isMobile ? 19 : 21,
          color:"#F1F5F9", margin:"0 0 4px", letterSpacing:"-.01em" }}>{project.title}</h3>
        <p style={{ fontSize:12, color:"#475569", margin:0 }}>{project.subtitle}</p>
      </div>

      <p style={{ fontSize:13.5, lineHeight:1.75, color:"#64748B", margin:0, flex:1 }}>
        {project.description}
      </p>

      {/* Highlights */}
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {project.highlights.map(h => (
          <div key={h} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:4, height:4, borderRadius:"50%", background:project.color, flexShrink:0 }}/>
            <span style={{ fontSize:12.5, color:"#64748B" }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {project.stack.map(tag => (
          <span key={tag} style={{ fontSize:9.5, fontWeight:600, letterSpacing:".08em",
            textTransform:"uppercase", padding:"3px 9px", borderRadius:2,
            border:"1px solid rgba(14,165,233,.15)", color:"#5BA8D4",
            background:"rgba(14,165,233,.05)" }}>{tag}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px",
              borderRadius:3, textDecoration:"none",
              border:"1px solid rgba(148,163,184,.15)", color:"#94A3B8",
              fontSize:12.5, fontWeight:500, background:"rgba(255,255,255,.03)", transition:"all .18s" }}
            onMouseEnter={e => { e.currentTarget.style.color="#E2E8F0"; e.currentTarget.style.borderColor="rgba(14,165,233,.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="#94A3B8"; e.currentTarget.style.borderColor="rgba(148,163,184,.15)"; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {t.github}
          </a>
        ) : (
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px",
            borderRadius:3, border:"1px dashed rgba(148,163,184,.1)", color:"#334155", fontSize:12.5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            {t.coming}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ProjectsModule({ lang: propLang }) {
  const [lang, setLang]     = useState(propLang || "es");
  const [filter, setFilter] = useState("all");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const t = i18n[lang];
  const list = projects[lang];

  const categories = ["all", ...Array.from(new Set(list.map(p => p.category)))];
  const filtered   = filter === "all" ? list : list.filter(p => p.category === filter);

  // First project is featured, rest are regular cards
  const [featured, ...rest] = filtered;

  const cols = isMobile ? 1 : isTablet ? 2 : 2;

  return (
    <section style={{
      fontFamily:"'DM Sans',system-ui,sans-serif",
      background:"#080C14", color:"#E2E8F0",
      padding: isMobile ? "80px 20px" : isTablet ? "100px 32px" : "120px 40px",
      position:"relative", overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .p-fade{animation:fadeUp .6s ease both;}
        .filter-btn{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;
          padding:6px 16px;border-radius:2px;cursor:pointer;border:none;font-family:inherit;transition:all .18s;}
        .filter-on{background:rgba(14,165,233,.15);color:#38BDF8;border:1px solid rgba(14,165,233,.3);}
        .filter-off{background:rgba(255,255,255,.03);color:#475569;border:1px solid rgba(255,255,255,.06);}
        .filter-off:hover{color:#94A3B8;border-color:rgba(255,255,255,.1);}
      `}</style>

      {/* BG */}
      <div style={{ position:"absolute", top:"-5%", left:"30%", width:600, height:600,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"0", right:"-5%", width:400, height:400,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:"linear-gradient(90deg,transparent,rgba(14,165,233,.15),transparent)" }}/>

      {/* Standalone lang toggle */}
      {!propLang && (
        <div style={{ position:"absolute", top:24, right: isMobile ? 20 : 40,
          display:"flex", gap:2, background:"rgba(255,255,255,.04)", borderRadius:3, padding:2 }}>
          {["es","en"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontSize:10.5, fontWeight:700, letterSpacing:".1em", padding:"5px 10px",
              borderRadius:2, cursor:"pointer", border:"none", fontFamily:"inherit", transition:"all .15s",
              background: lang===l ? "rgba(14,165,233,.14)" : "transparent",
              color: lang===l ? "#38BDF8" : "#334155" }}>{l.toUpperCase()}</button>
          ))}
        </div>
      )}

      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Header */}
        <div className="p-fade" style={{ marginBottom: isMobile ? 40 : 56 }}>
          <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
            letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>{t.section}</p>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,#0EA5E9,transparent)", marginBottom:28 }}/>
          <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row",
            justifyContent:"space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap:16 }}>
            <div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
                fontSize: isMobile ? "clamp(26px,8vw,36px)" : "clamp(28px,3.5vw,42px)",
                lineHeight:1.1, color:"#F1F5F9", marginBottom:12, letterSpacing:"-.02em" }}>
                {t.heading}
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 15, lineHeight:1.7, color:"#64748B", maxWidth:500 }}>
                {t.subheading}
              </p>
            </div>
            {/* Legend */}
            <div style={{ display:"flex", gap:16, flexShrink:0 }}>
              {[
                { color:"#22D3EE", label: lang==="es" ? "Activo"  : "Active"  },
                { color:"#F59E0B", label: lang==="es" ? "Pausado" : "Paused"  },
                { color:"#A78BFA", label: lang==="es" ? "Pronto"  : "Soon"    },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:s.color,
                    boxShadow:`0 0 6px ${s.color}` }}/>
                  <span style={{ fontSize:11, color:"#475569", fontWeight:500 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-fade" style={{ display:"flex", gap:8, flexWrap:"wrap",
          marginBottom: isMobile ? 32 : 48, animationDelay:".1s" }}>
          {categories.map(cat => (
            <button key={cat} className={`filter-btn ${filter===cat?"filter-on":"filter-off"}`}
              onClick={() => setFilter(cat)}>
              {cat === "all" ? t.all : cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap: isMobile ? 20 : 24 }}>

          {/* Featured — spans full width */}
          {featured && (
            <div className="p-fade" style={{ gridColumn: isMobile ? "1" : "1 / -1", animationDelay:".15s" }}>
              <FeaturedCard project={featured} t={t} isMobile={isMobile} />
            </div>
          )}

          {/* Regular cards */}
          {rest.map((project, i) => (
            <div key={project.id} className="p-fade" style={{ animationDelay:`${.25 + i * .1}s` }}>
              <ProjectCard project={project} t={t} isMobile={isMobile} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="p-fade" style={{ marginTop: isMobile ? 48 : 64, padding:"18px 24px",
          borderRadius:4, border:"1px solid rgba(14,165,233,.1)", background:"rgba(14,165,233,.04)",
          display:"flex", alignItems: isMobile ? "flex-start" : "center",
          gap:12, flexDirection: isMobile ? "column" : "row", animationDelay:".4s" }}>
          <div style={{ width:34, height:34, borderRadius:3, flexShrink:0,
            background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.2)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
            </svg>
          </div>
          <p style={{ fontSize:13, color:"#64748B", lineHeight:1.7, margin:0 }}>
            {lang === "es"
              ? "Proyectos personales desarrollados fuera del horario laboral para explorar nuevas tecnologías y patrones de arquitectura."
              : "Personal projects developed outside work hours to explore new technologies and architecture patterns."}
          </p>
        </div>
      </div>
    </section>
  );
}
