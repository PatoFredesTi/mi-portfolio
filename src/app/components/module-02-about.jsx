import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const data = {
  bio: [
    "Full Stack Developer con 4 años de experiencia construyendo aplicaciones web productivas en entornos corporativos. Me especializo en React, Next.js y TypeScript en el frontend, con infraestructura cloud sobre AWS.",
    "He liderado migraciones tecnológicas, definido arquitecturas frontend y configurado pipelines CI/CD en producción. Disfruto resolver problemas complejos con código limpio, escalable y orientado al negocio.",
  ],
  exp: [
    {
      role:    "Full Stack Developer",
      company: "Anguita Osorio",
      period:  "Dic 2022 — Dic 2025",
      loc:     "Gran Santiago · Remoto",
      desc:    "Diseñé e implementé soluciones full stack para aplicaciones web productivas en entornos corporativos. Lideré la migración a Next.js, definí arquitectura frontend y configuré infraestructura AWS con CI/CD.",
      tags:    ["React", "Next.js", "TypeScript", "AWS", "CI/CD", "PHP"],
    },
    {
      role:    "Software Developer Jr.",
      company: "Agencia Aduanas J.C. Stephens",
      period:  "Ago 2022 — Nov 2022",
      loc:     "Valparaíso, Chile",
      desc:    "Diseñé soluciones internas para plataformas operativas. Desarrollé con JavaScript y PHP, optimizando consultas SQL sobre bases de datos relacionales.",
      tags:    ["JavaScript", "PHP", "SQL"],
    },
    {
      role:    "Software Developer Trainee",
      company: "Dual Vision Cognitive",
      period:  "Nov 2021 — Feb 2022",
      loc:     "Santiago, Chile",
      desc:    "Desarrollé aplicaciones full stack con Python (Flask) y React en entorno colaborativo, aplicando arquitectura web e integración de APIs.",
      tags:    ["Python", "Flask", "React"],
    },
  ],
  edu: [
    {
      title:  "Ingeniería en Informática",
      place:  "Duoc UC",
      period: "Mar 2023 — Dic 2027",
      note:   "Cursando actualmente · Vespertino",
    },
    {
      title:  "Técnico Universitario en Informática",
      place:  "UTFSM",
      period: "Mar 2020 — Abr 2022",
      note:   "Titulado",
    },
  ],
  cats: [
    {
      label: "Frontend",
      items: [
        { name:"React",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name:"Next.js",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name:"TypeScript", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name:"JavaScript", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name:"HTML5",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name:"CSS3",       icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name:"Tailwind",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      ],
    },
    {
      label: "Backend",
      items: [
        { name:"Node.js",  icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name:"Python",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name:"Java",     icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name:"PHP",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name:"Flask",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name:"Express",  icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      ],
    },
    {
      label: "Base de datos",
      items: [
        { name:"PostgreSQL", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name:"MongoDB",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name:"MySQL",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name:"SQL Server", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
      ],
    },
    {
      label: "Cloud & DevOps",
      items: [
        { name:"AWS",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name:"Docker", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name:"Git",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name:"GitHub", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name:"Linux",  icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      ],
    },
  ],
};

const tabs = [
  { key: "about", label: "Sobre mí"   },
  { key: "exp",   label: "Experiencia" },
  { key: "edu",   label: "Educación"   },
  { key: "stack", label: "Stack"       },
];

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

// ─── EXP CARD ────────────────────────────────────────────────────────────────
function ExpCard({ item, isLast }) {
  return (
    <div style={{ display:"flex", gap:16, position:"relative" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div style={{ width:9, height:9, borderRadius:"50%", marginTop:5, flexShrink:0,
          background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
          boxShadow:"0 0 8px rgba(14,165,233,.4)" }}/>
        {!isLast && (
          <div style={{ width:1, flex:1, marginTop:6,
            background:"linear-gradient(to bottom,rgba(14,165,233,.3),transparent)" }}/>
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 32, flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between",
          flexWrap:"wrap", gap:4, marginBottom:4 }}>
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:"#F1F5F9", margin:0 }}>{item.role}</p>
            <p style={{ fontSize:12.5, color:"#38BDF8", fontWeight:500, margin:"2px 0 0" }}>{item.company}</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontSize:11, color:"#475569", margin:0 }}>{item.period}</p>
            <p style={{ fontSize:10.5, color:"#334155", margin:"2px 0 0" }}>{item.loc}</p>
          </div>
        </div>
        <p style={{ fontSize:13, lineHeight:1.7, color:"#64748B", margin:"8px 0 10px" }}>
          {item.desc}
        </p>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {item.tags.map(tag => (
            <span key={tag} style={{ fontSize:9.5, fontWeight:600, letterSpacing:".08em",
              textTransform:"uppercase", padding:"3px 9px", borderRadius:2,
              border:"1px solid rgba(14,165,233,.15)", color:"#5BA8D4",
              background:"rgba(14,165,233,.05)" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EDU CARD ────────────────────────────────────────────────────────────────
function EduCard({ item }) {
  return (
    <div style={{ padding:"14px 18px", borderRadius:4,
      border:"1px solid rgba(255,255,255,.06)", background:"rgba(15,23,42,.5)",
      display:"flex", justifyContent:"space-between",
      alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
      <div>
        <p style={{ fontSize:13.5, fontWeight:600, color:"#E2E8F0", margin:0 }}>{item.title}</p>
        <p style={{ fontSize:12, color:"#38BDF8", margin:"3px 0 0", fontWeight:500 }}>{item.place}</p>
        <p style={{ fontSize:11, color:"#475569", margin:"4px 0 0" }}>{item.note}</p>
      </div>
      <span style={{ fontSize:10.5, fontWeight:600, color:"#64748B",
        padding:"4px 10px", borderRadius:2,
        border:"1px solid rgba(255,255,255,.08)",
        background:"rgba(255,255,255,.03)", whiteSpace:"nowrap" }}>
        {item.period}
      </span>
    </div>
  );
}

// ─── TAB BUTTON ──────────────────────────────────────────────────────────────
function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
      fontSize:13, fontWeight: active ? 600 : 400,
      color: active ? "#38BDF8" : "#475569",
      padding:"10px 0",
      borderBottom: active ? "2px solid #38BDF8" : "2px solid transparent",
      transition:"all .18s", letterSpacing:".02em", whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function StatCard({ value, label }) {
  return (
    <div style={{ padding:"14px 16px", borderRadius:4,
      border:"1px solid rgba(14,165,233,.12)",
      background:"rgba(14,165,233,.04)",
      display:"flex", flexDirection:"column", gap:4 }}>
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
        fontSize:26, color:"#38BDF8", lineHeight:1 }}>{value}</span>
      <span style={{ fontSize:10, fontWeight:500, color:"#64748B",
        letterSpacing:".06em", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

// ─── STACK CARD ──────────────────────────────────────────────────────────────
function StackCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", gap:8,
        padding:"14px 8px", borderRadius:6,
        border: hovered
          ? "1px solid rgba(14,165,233,.35)"
          : "1px solid rgba(255,255,255,.07)",
        background: hovered
          ? "rgba(14,165,233,.07)"
          : "rgba(15,23,42,.6)",
        cursor:"default",
        transition:"all .2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,.3)" : "none",
      }}
    >
      <img
        src={item.icon}
        alt={item.name}
        width={32}
        height={32}
        style={{
          objectFit:"contain",
          filter: hovered ? "brightness(1.1)" : "brightness(.85)",
          transition:"filter .2s",
        }}
        onError={e => { e.currentTarget.style.display = "none"; }}
      />
      <span style={{
        fontSize:10.5, fontWeight:500, color: hovered ? "#E2E8F0" : "#64748B",
        textAlign:"center", lineHeight:1.2, transition:"color .2s",
      }}>{item.name}</span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AboutModule({ lang: propLang }) {
  const [tab, setTab]         = useState("about");
  const [photoOpen, setPhotoOpen] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  // Cerrar lightbox con ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setPhotoOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
        .about-fade{animation:fadeUp .6s ease both;}
        .photo-wrap:hover .photo-overlay{opacity:1!important;}
      `}</style>

      {/* BG accents */}
      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:500, height:500,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 70%)",
        pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:"linear-gradient(90deg,transparent,rgba(14,165,233,.15),transparent)" }}/>

      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Section label */}
        <div className="about-fade" style={{ marginBottom: isMobile ? 40 : 64 }}>
          <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
            letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>
            Sobre mí
          </p>
          <div style={{ width:40, height:1,
            background:"linear-gradient(90deg,#0EA5E9,transparent)" }}/>
        </div>

        {/* Layout */}
        <div style={{ display:"flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? 48 : isTablet ? 56 : 80,
        }}>

          {/* ── LEFT ── */}
          <div style={{ flex: isMobile || isTablet ? "1" : "0 0 300px" }}>

            {/* ── FOTO GRANDE ── */}
            <div
              className="photo-wrap"
              onClick={() => setPhotoOpen(true)}
              style={{
                width: isMobile ? "100%" : 260,
                height: isMobile ? 300 : 320,
                borderRadius: 8, marginBottom: 28,
                border: "1px solid rgba(14,165,233,.2)",
                overflow: "hidden", position: "relative",
                cursor: "zoom-in",
                boxShadow: "0 16px 48px rgba(0,0,0,.5), 0 0 0 3px rgba(14,165,233,.06)",
                transition: "transform .25s, box-shadow .25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,.6), 0 0 0 3px rgba(14,165,233,.18)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,.5), 0 0 0 3px rgba(14,165,233,.06)";
              }}
            >
              <img
                src="/PatricioFredes.png"
                alt="Patricio Fredes"
                style={{ width:"100%", height:"100%",
                  objectFit:"cover", objectPosition:"center top", display:"block" }}
              />
              {/* Overlay hover */}
              <div className="photo-overlay" style={{
                position:"absolute", inset:0,
                background:"rgba(8,12,20,.35)", backdropFilter:"blur(1px)",
                display:"flex", alignItems:"center", justifyContent:"center",
                opacity:0, transition:"opacity .2s",
              }}>
                <div style={{ width:44, height:44, borderRadius:"50%",
                  background:"rgba(14,165,233,.2)", border:"1px solid rgba(14,165,233,.4)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#38BDF8" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
              {/* Corner accent */}
              <div style={{ position:"absolute", bottom:0, right:0, width:20, height:20,
                borderTop:"1px solid rgba(14,165,233,.5)",
                borderLeft:"1px solid rgba(14,165,233,.5)" }}/>
              {/* Bottom gradient name */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0,
                padding:"32px 16px 14px",
                background:"linear-gradient(to top, rgba(8,12,20,.85), transparent)" }}>
                <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700,
                  fontSize:15, color:"#F1F5F9", margin:0 }}>Patricio Fredes</p>
                <p style={{ fontSize:12, color:"#38BDF8", margin:"2px 0 0" }}>Full Stack Developer</p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
              <StatCard value="4+" label="Años exp." />
              <StatCard value="3"  label="Empresas"  />
              <StatCard value="∞"  label="Coffee ☕" />
            </div>

            {/* Idiomas */}
            <div style={{ padding:"14px 18px", borderRadius:4,
              border:"1px solid rgba(255,255,255,.06)", background:"rgba(15,23,42,.5)" }}>
              <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
                letterSpacing:".1em", textTransform:"uppercase", marginBottom:12 }}>
                Idiomas
              </p>
              {[
                { name:"Español", level:"Nativo",      pct:100 },
                { name:"English", level:"Intermedio",  pct:60  },
              ].map(lng => (
                <div key={lng.name} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12.5, color:"#CBD5E1", fontWeight:500 }}>{lng.name}</span>
                    <span style={{ fontSize:11, color:"#475569" }}>{lng.level}</span>
                  </div>
                  <div style={{ height:3, borderRadius:2, background:"rgba(255,255,255,.06)" }}>
                    <div style={{ height:"100%", width:`${lng.pct}%`, borderRadius:2,
                      background:"linear-gradient(90deg,#0EA5E9,#6366F1)" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — tabs ── */}
          <div style={{ flex:"1 1 auto", minWidth:0 }}>

            {/* Tab nav */}
            <div style={{ display:"flex", gap: isMobile ? 16 : 28, marginBottom:32,
              borderBottom:"1px solid rgba(255,255,255,.06)", overflowX:"auto" }}>
              {tabs.map(tb => (
                <Tab key={tb.key} label={tb.label}
                  active={tab === tb.key}
                  onClick={() => setTab(tb.key)} />
              ))}
            </div>

            {/* ── SOBRE MÍ ── */}
            {tab === "about" && (
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {data.bio.map((p, i) => (
                  <p key={i} style={{ fontSize:15, lineHeight:1.85,
                    color:"#94A3B8", margin:0 }}>{p}</p>
                ))}

                {/* Highlights */}
                <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:12 }}>
                  {[
                    "Migración React → Next.js con SSR/SSG en producción",
                    "Infraestructura AWS serverless (S3, CloudFront, Lambda, Cognito)",
                    "Pipelines CI/CD que automatizaron el 100% de los despliegues",
                    "Reducción de tiempos de carga en ~40% tras migración",
                    "Contraparte técnica directa con clientes corporativos",
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:5, height:5, borderRadius:"50%",
                        background:"#0EA5E9", flexShrink:0, marginTop:7,
                        boxShadow:"0 0 6px rgba(14,165,233,.5)" }}/>
                      <span style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Specialization card */}
                <div style={{ marginTop:8, padding:"16px 20px", borderRadius:4,
                  border:"1px solid rgba(99,102,241,.2)",
                  background:"rgba(99,102,241,.05)" }}>
                  <p style={{ fontSize:12.5, color:"#818CF8", fontWeight:600, marginBottom:6 }}>
                    🚀 Especialización destacada
                  </p>
                  <p style={{ fontSize:13, color:"#64748B", lineHeight:1.6, margin:0 }}>
                    Arquitectura frontend con Next.js + AWS: migración, CI/CD, S3, CloudFront,
                    Lambda, API Gateway y Cognito en producción.
                  </p>
                </div>
              </div>
            )}

            {/* ── EXPERIENCIA ── */}
            {tab === "exp" && (
              <div>
                {data.exp.map((item, i) => (
                  <ExpCard key={i} item={item} isLast={i === data.exp.length - 1} />
                ))}
              </div>
            )}

            {/* ── EDUCACIÓN ── */}
            {tab === "edu" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {data.edu.map((item, i) => <EduCard key={i} item={item} />)}
                <div style={{ marginTop:8, padding:"12px 16px", borderRadius:4,
                  border:"1px solid rgba(14,165,233,.1)",
                  background:"rgba(14,165,233,.04)" }}>
                  <p style={{ fontSize:12.5, color:"#64748B", lineHeight:1.6, margin:0 }}>
                    📌 Actualmente cursando Ingeniería en Informática en Duoc UC en jornada
                    vespertina, combinando estudios con trabajo profesional.
                  </p>
                </div>
              </div>
            )}

            {/* ── STACK ── */}
            {tab === "stack" && (
              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                {data.cats.map((cat, i) => (
                  <div key={i}>
                    <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
                      letterSpacing:".12em", textTransform:"uppercase", marginBottom:14 }}>
                      {cat.label}
                    </p>
                    <div style={{ display:"grid",
                      gridTemplateColumns:"repeat(auto-fill, minmax(100px, 1fr))",
                      gap:10 }}>
                      {cat.items.map(item => (
                        <StackCard key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ padding:"14px 18px", borderRadius:4,
                  border:"1px solid rgba(99,102,241,.2)",
                  background:"rgba(99,102,241,.05)" }}>
                  <p style={{ fontSize:12.5, color:"#818CF8", fontWeight:600, marginBottom:6 }}>
                    🚀 Especialización destacada
                  </p>
                  <p style={{ fontSize:12.5, color:"#64748B", lineHeight:1.6, margin:0 }}>
                    Arquitectura frontend con Next.js + AWS: migración, CI/CD, S3, CloudFront,
                    Lambda, API Gateway y Cognito en producción.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {photoOpen && (
        <div
          onClick={() => setPhotoOpen(false)}
          style={{
            position:"fixed", inset:0, zIndex:999,
            background:"rgba(0,0,0,.88)", backdropFilter:"blur(10px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"zoom-out", animation:"fadeIn .2s ease",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position:"relative", borderRadius:10, overflow:"hidden",
              border:"1px solid rgba(14,165,233,.2)",
              boxShadow:"0 40px 100px rgba(0,0,0,.8)",
              animation:"scaleIn .25s ease",
              maxWidth:"88vw", maxHeight:"88vh",
            }}
          >
            <img
              src="/PatricioFredes.png"
              alt="Patricio Fredes"
              style={{ display:"block", maxWidth:"80vw", maxHeight:"84vh",
                objectFit:"contain" }}
            />
            {/* Gradient bottom */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0,
              padding:"40px 24px 20px",
              background:"linear-gradient(to top,rgba(8,12,20,.92),transparent)" }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
                fontSize:18, color:"#F1F5F9", margin:0 }}>Patricio Fredes</p>
              <p style={{ fontSize:13, color:"#38BDF8", margin:"4px 0 0" }}>
                Full Stack Developer · Santiago, Chile
              </p>
            </div>
            {/* Close button */}
            <button
              onClick={() => setPhotoOpen(false)}
              style={{
                position:"absolute", top:14, right:14,
                width:34, height:34, borderRadius:"50%",
                background:"rgba(8,12,20,.8)",
                border:"1px solid rgba(255,255,255,.15)",
                color:"#94A3B8", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .18s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background="rgba(14,165,233,.2)";
                e.currentTarget.style.color="#38BDF8";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background="rgba(8,12,20,.8)";
                e.currentTarget.style.color="#94A3B8";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          {/* Hint */}
          <p style={{ position:"absolute", bottom:20, fontSize:11,
            color:"#334155", letterSpacing:".06em" }}>
            ESC o click para cerrar
          </p>
        </div>
      )}
    </section>
  );
}