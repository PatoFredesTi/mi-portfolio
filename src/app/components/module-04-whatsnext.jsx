import { useState, useEffect } from "react";

const projects = {
  es: [
    {
      id: 1,
      title: "SaaS — CV con IA",
      subtitle: "SaaS · Inteligencia Artificial",
      description:
        "Plataforma donde el usuario ingresa su experiencia y la IA genera un CV profesional en PDF con múltiples templates. Integración con OpenAI/Claude API, generación de PDF con Puppeteer o react-pdf y arquitectura SSR/SSG moderna.",
      stack: ["Next.js", "Server Actions", "OpenAI API", "Puppeteer", "TypeScript", "Tailwind CSS"],
      status: "planned",
      statusLabel: "Planificado",
      progress: 10,
      github: null,
      category: "Full Stack",
      highlight: "IA + generación de PDF profesional",
      icon: "⚡",
    },
    {
      id: 2,
      title: "Panel Finanzas Personales",
      subtitle: "Dashboard · Gestión financiera",
      description:
        "Dashboard para registrar ingresos y egresos con gráficos, categorías y metas de ahorro. Arquitectura Angular enterprise con standalone components, NgRx para state management y visualizaciones con Chart.js o D3.",
      stack: ["Angular 17+", "NgRx", "Angular Material", "Chart.js", "D3", "TypeScript"],
      status: "planned",
      statusLabel: "Planificado",
      progress: 5,
      github: null,
      category: "Frontend",
      highlight: "Arquitectura Angular enterprise",
      icon: "▲",
    },
    {
      id: 3,
      title: "alertaBoda! 🤫",
      subtitle: "Proyecto secreto · ???",
      description:
        "Proyecto clasificado. Los detalles están bajo llave hasta que esté listo para ser revelado. Lo único confirmado: existe, está en la mente, y llegará.",
      stack: ["???", "🔒", "Top Secret"],
      status: "secret",
      statusLabel: "Clasificado",
      progress: 0,
      github: null,
      category: "???",
      highlight: "Próximamente revelado",
      icon: "🔐",
    },
    {
      id: 4,
      title: "FaithChat 🤫",
      subtitle: "Proyecto secreto · ???",
      description:
        "Proyecto clasificado. Acceso restringido hasta su lanzamiento oficial. Lo único que se sabe: tiene nombre, tiene propósito, y está en camino.",
      stack: ["???", "🔒", "Top Secret"],
      status: "secret",
      statusLabel: "Clasificado",
      progress: 0,
      github: null,
      category: "???",
      highlight: "Próximamente revelado",
      icon: "🔐",
    },
  ],
  en: [
    {
      id: 1,
      title: "SaaS — AI CV Generator",
      subtitle: "SaaS · Artificial Intelligence",
      description:
        "Platform where users enter their experience and AI generates a professional PDF resume with multiple templates. OpenAI/Claude API integration, PDF generation with Puppeteer or react-pdf and modern SSR/SSG architecture.",
      stack: ["Next.js", "Server Actions", "OpenAI API", "Puppeteer", "TypeScript", "Tailwind CSS"],
      status: "planned",
      statusLabel: "Planned",
      progress: 10,
      github: null,
      category: "Full Stack",
      highlight: "AI + professional PDF generation",
      icon: "⚡",
    },
    {
      id: 2,
      title: "Personal Finance Dashboard",
      subtitle: "Dashboard · Financial management",
      description:
        "Dashboard to track income and expenses with charts, categories and savings goals. Angular enterprise architecture with standalone components, NgRx for state management and visualizations with Chart.js or D3.",
      stack: ["Angular 17+", "NgRx", "Angular Material", "Chart.js", "D3", "TypeScript"],
      status: "planned",
      statusLabel: "Planned",
      progress: 5,
      github: null,
      category: "Frontend",
      highlight: "Angular enterprise architecture",
      icon: "▲",
    },
    {
      id: 3,
      title: "alertaBoda! 🤫",
      subtitle: "Secret project · ???",
      description:
        "Classified project. Details are locked away until it's ready to be revealed. The only confirmed thing: it exists, it's in the works, and it's coming.",
      stack: ["???", "🔒", "Top Secret"],
      status: "secret",
      statusLabel: "Classified",
      progress: 0,
      github: null,
      category: "???",
      highlight: "Coming soon — stay tuned",
      icon: "🔐",
    },
    {
      id: 4,
      title: "FaithChat 🤫",
      subtitle: "Secret project · ???",
      description:
        "Classified project. Access restricted until official launch. All that's known: it has a name, it has a purpose, and it's on its way.",
      stack: ["???", "🔒", "Top Secret"],
      status: "secret",
      statusLabel: "Classified",
      progress: 0,
      github: null,
      category: "???",
      highlight: "Coming soon — stay tuned",
      icon: "🔐",
    },
  ],
};

const i18n = {
  es: {
    section:    "What's Next",
    heading:    "Lo que viene",
    subheading: "Proyectos en mente que pasarán al módulo de Proyectos una vez completados.",
    progress:   "Progreso",
    note:       "Estos proyectos están en fase de planificación o desarrollo temprano. Una vez completados, se moverán a la sección de Proyectos.",
  },
  en: {
    section:    "What's Next",
    heading:    "What's coming",
    subheading: "Projects in mind that will move to the Projects section once completed.",
    progress:   "Progress",
    note:       "These projects are in planning or early development. Once completed, they'll move to the Projects section.",
  },
};

const statusConfig = {
  planned: { color:"#A78BFA", bg:"rgba(167,139,250,.08)", border:"rgba(167,139,250,.2)", dot:"#A78BFA" },
  secret:  { color:"#F472B6", bg:"rgba(244,114,182,.06)", border:"rgba(244,114,182,.18)", dot:"#F472B6" },
};

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

function ProjectCard({ project, t, isMobile }) {
  const cfg = statusConfig[project.status] || statusConfig.planned;
  const isSecret = project.status === "secret";

  return (
    <div
      style={{
        borderRadius:6, border:`1px solid ${cfg.border}`,
        background: isSecret ? "rgba(10,8,20,.8)" : "rgba(10,18,35,.7)",
        backdropFilter:"blur(8px)",
        padding: isMobile ? "24px 20px" : "28px 28px",
        display:"flex", flexDirection:"column", gap:20,
        position:"relative", overflow:"hidden",
        transition:"transform .2s, box-shadow .2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,.5), 0 0 0 1px ${cfg.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:`linear-gradient(90deg,transparent,${cfg.color}55,transparent)` }}/>

      {isSecret && (
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.03, pointerEvents:"none" }}>
          <filter id="sn"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/></filter>
          <rect width="100%" height="100%" filter="url(#sn)"/>
        </svg>
      )}

      {/* Category */}
      <div style={{ position:"absolute", top:20, right:20, fontSize:9.5, fontWeight:700,
        letterSpacing:".1em", textTransform:"uppercase", padding:"3px 10px", borderRadius:2,
        border:"1px solid rgba(255,255,255,.07)", color:"#334155", background:"rgba(255,255,255,.03)" }}>
        {project.category}
      </div>

      {/* Icon + status */}
      <div>
        <div style={{ fontSize:28, marginBottom:14, lineHeight:1 }}>{project.icon}</div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginBottom:14,
          padding:"4px 12px", borderRadius:2, background:cfg.bg, border:`1px solid ${cfg.border}` }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot,
            boxShadow:`0 0 6px ${cfg.dot}`, flexShrink:0 }}/>
          <span style={{ fontSize:10.5, fontWeight:700, color:cfg.color,
            letterSpacing:".08em", textTransform:"uppercase" }}>{project.statusLabel}</span>
        </div>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize: isMobile ? 19 : 21, color: isSecret ? "#CBD5E1" : "#F1F5F9",
          margin:"0 0 4px", letterSpacing:"-.01em" }}>{project.title}</h3>
        <p style={{ fontSize:12, color:"#475569", fontWeight:500, margin:0 }}>{project.subtitle}</p>
      </div>

      {/* Description */}
      <p style={{ fontSize:13.5, lineHeight:1.75,
        color: isSecret ? "#4A4060" : "#64748B", margin:0,
        filter: isSecret ? "blur(.4px)" : "none",
        fontStyle: isSecret ? "italic" : "normal" }}>
        {project.description}
      </p>

      {/* Highlight */}
      <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px",
        borderRadius:2, width:"fit-content",
        background: isSecret ? "rgba(244,114,182,.06)" : "rgba(167,139,250,.07)",
        border:`1px solid ${isSecret ? "rgba(244,114,182,.2)" : "rgba(167,139,250,.2)"}` }}>
        <span style={{ fontSize:10, color:cfg.color }}>✦</span>
        <span style={{ fontSize:11.5, color:cfg.color, fontWeight:500 }}>{project.highlight}</span>
      </div>

      {/* Stack pills */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {project.stack.map(tag => (
          <span key={tag} style={{ fontSize:10, fontWeight:600, letterSpacing:".08em",
            textTransform:"uppercase", padding:"3px 10px", borderRadius:2,
            border: isSecret ? "1px solid rgba(244,114,182,.1)" : "1px solid rgba(167,139,250,.15)",
            color: isSecret ? "#4A4060" : "#9B8EC4",
            background: isSecret ? "rgba(244,114,182,.03)" : "rgba(167,139,250,.05)" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Progress */}
      {!isSecret && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:10.5, fontWeight:600, color:"#334155",
              letterSpacing:".06em", textTransform:"uppercase" }}>{t.progress}</span>
            <span style={{ fontSize:11, fontWeight:700, color:cfg.color }}>{project.progress}%</span>
          </div>
          <div style={{ height:3, borderRadius:2, background:"rgba(255,255,255,.06)" }}>
            <div style={{ height:"100%", width:`${project.progress}%`, borderRadius:2,
              background:`linear-gradient(90deg,${cfg.color},${cfg.color}88)` }}/>
          </div>
        </div>
      )}

      {/* Secret lock */}
      {isSecret && (
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
          borderRadius:3, border:"1px dashed rgba(244,114,182,.15)", background:"rgba(244,114,182,.03)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="1.8" style={{ opacity:.5 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{ fontSize:11.5, color:"#4A4060", fontStyle:"italic" }}>
            {"// detalles clasificados hasta el lanzamiento"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function WhatsNextModule({ lang: propLang }) {
  const [lang, setLang] = useState(propLang || "es");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const t = i18n[lang];
  const list = projects[lang];
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
        .wn-fade{animation:fadeUp .6s ease both;}
      `}</style>

      {/* BG */}
      <div style={{ position:"absolute", top:"5%", right:"-8%", width:520, height:520,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"0%", left:"-8%", width:400, height:400,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(244,114,182,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:"linear-gradient(90deg,transparent,rgba(167,139,250,.25),transparent)" }}/>

      {/* Standalone lang toggle */}
      {!propLang && (
        <div style={{ position:"absolute", top:24, right: isMobile ? 20 : 40,
          display:"flex", gap:2, background:"rgba(255,255,255,.04)", borderRadius:3, padding:2 }}>
          {["es","en"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontSize:10.5, fontWeight:700, letterSpacing:".1em", padding:"5px 10px",
              borderRadius:2, cursor:"pointer", border:"none", fontFamily:"inherit", transition:"all .15s",
              background: lang===l ? "rgba(167,139,250,.14)" : "transparent",
              color: lang===l ? "#A78BFA" : "#334155" }}>{l.toUpperCase()}</button>
          ))}
        </div>
      )}

      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Header */}
        <div className="wn-fade" style={{ marginBottom: isMobile ? 40 : 60 }}>
          <p style={{ fontSize:10.5, fontWeight:700, color:"#A78BFA",
            letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>{t.section}</p>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,#A78BFA,transparent)", marginBottom:28 }}/>
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
                { color:"#A78BFA", label: lang==="es" ? "Planificado" : "Planned" },
                { color:"#F472B6", label: lang==="es" ? "Secreto"     : "Secret"  },
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

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap: isMobile ? 20 : 24 }}>
          {list.map((project, i) => (
            <div key={project.id} className="wn-fade" style={{ animationDelay:`${.12 + i * .1}s` }}>
              <ProjectCard project={project} t={t} isMobile={isMobile} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="wn-fade" style={{ marginTop: isMobile ? 48 : 64, padding:"20px 24px",
          borderRadius:4, border:"1px solid rgba(167,139,250,.12)", background:"rgba(167,139,250,.04)",
          display:"flex", alignItems: isMobile ? "flex-start" : "center",
          gap:14, flexDirection: isMobile ? "column" : "row", animationDelay:".4s" }}>
          <div style={{ width:36, height:36, borderRadius:3, flexShrink:0,
            background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.2)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <p style={{ fontSize:13, color:"#64748B", lineHeight:1.7, margin:0 }}>{t.note}</p>
        </div>
      </div>
    </section>
  );
}
