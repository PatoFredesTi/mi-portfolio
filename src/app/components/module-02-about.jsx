import { useState, useEffect } from "react";

const i18n = {
  es: {
    section:"Sobre mí", label:"¿Quién soy?",
    bio1:"Full Stack Developer con 4 años de experiencia construyendo aplicaciones web productivas en entornos corporativos. Me especializo en React, Next.js y TypeScript en el frontend, con infraestructura cloud sobre AWS.",
    bio2:"He liderado migraciones tecnológicas, definido arquitecturas frontend y configurado pipelines CI/CD en producción. Disfruto resolver problemas complejos con código limpio, escalable y orientado al negocio.",
    experience:"Experiencia", education:"Educación", skills:"Stack",
    exp:[
      { role:"Full Stack Developer", company:"Anguita Osorio", period:"Dic 2022 — Dic 2025", loc:"Gran Santiago · Remoto",
        desc:"Diseñé soluciones full stack para aplicaciones productivas corporativas. Lideré la migración a Next.js, definí arquitectura frontend y configuré infraestructura AWS con CI/CD.",
        tags:["React","Next.js","TypeScript","AWS","CI/CD","PHP"] },
      { role:"Software Developer Jr.", company:"Agencia Aduanas J.C. Stephens", period:"Ago 2022 — Nov 2022", loc:"Valparaíso, Chile",
        desc:"Diseñé soluciones internas para plataformas operativas. Desarrollé con JavaScript y PHP, optimizando consultas SQL sobre bases de datos relacionales.",
        tags:["JavaScript","PHP","SQL"] },
      { role:"Software Developer Trainee", company:"Dual Vision Cognitive", period:"Nov 2021 — Feb 2022", loc:"Santiago, Chile",
        desc:"Desarrollé aplicaciones full stack con Python (Flask) y React en entorno colaborativo, aplicando arquitectura web e integración de APIs.",
        tags:["Python","Flask","React"] },
    ],
    edu:[
      { title:"Ingeniería en Informática", place:"Duoc UC", period:"Mar 2023 — Dic 2027", note:"Cursando · Vespertino" },
      { title:"Técnico Universitario en Informática", place:"UTFSM", period:"Mar 2020 — Abr 2022", note:"Titulado" },
    ],
    cats:[
      { label:"Frontend",      items:["React","Next.js","TypeScript","JavaScript","HTML5","CSS3"] },
      { label:"Backend",       items:["Node.js","Python","PHP (Kohana)","REST APIs"] },
      { label:"Base de datos", items:["PostgreSQL","SQL Server","MongoDB","MySQL"] },
      { label:"Cloud & DevOps",items:["AWS (S3, CloudFront, Lambda, API Gateway, Cognito)","Docker","CI/CD"] },
    ],
    eduNote:"📌 Actualmente cursando Ingeniería en Informática en Duoc UC en jornada vespertina, combinando estudios con trabajo profesional.",
    specLabel:"🚀 Especialización destacada",
    specText:"Arquitectura frontend con Next.js + AWS: migración, CI/CD, S3, CloudFront, Lambda, API Gateway y Cognito en producción.",
    idiomas:"Idiomas", native:"Nativo", intermediate:"Intermedio",
    yearsExp:"Años exp.", companies:"Empresas",
  },
  en: {
    section:"About me", label:"Who am I?",
    bio1:"Full Stack Developer with 4 years of experience building production-grade web applications in corporate environments. I specialize in React, Next.js and TypeScript on the frontend, with cloud infrastructure on AWS.",
    bio2:"I've led tech migrations, defined frontend architectures and set up CI/CD pipelines in production. I enjoy solving complex problems with clean, scalable, business-driven code.",
    experience:"Experience", education:"Education", skills:"Stack",
    exp:[
      { role:"Full Stack Developer", company:"Anguita Osorio", period:"Dec 2022 — Dec 2025", loc:"Greater Santiago · Remote",
        desc:"Designed full stack solutions for corporate production web apps. Led migration to Next.js, defined frontend architecture and set up AWS infrastructure with CI/CD.",
        tags:["React","Next.js","TypeScript","AWS","CI/CD","PHP"] },
      { role:"Software Developer Jr.", company:"J.C. Stephens Customs Agency", period:"Aug 2022 — Nov 2022", loc:"Valparaíso, Chile",
        desc:"Built internal tools for operational platforms using JavaScript and PHP, optimizing SQL queries on relational databases.",
        tags:["JavaScript","PHP","SQL"] },
      { role:"Software Developer Trainee", company:"Dual Vision Cognitive", period:"Nov 2021 — Feb 2022", loc:"Santiago, Chile",
        desc:"Built full stack apps with Python (Flask) and React in a collaborative environment, applying web architecture and API integration.",
        tags:["Python","Flask","React"] },
    ],
    edu:[
      { title:"Computer Engineering", place:"Duoc UC", period:"Mar 2023 — Dec 2027", note:"Enrolled · Evening" },
      { title:"Associate Degree in CS", place:"UTFSM", period:"Mar 2020 — Apr 2022", note:"Graduated" },
    ],
    cats:[
      { label:"Frontend",   items:["React","Next.js","TypeScript","JavaScript","HTML5","CSS3"] },
      { label:"Backend",    items:["Node.js","Python","PHP (Kohana)","REST APIs"] },
      { label:"Databases",  items:["PostgreSQL","SQL Server","MongoDB","MySQL"] },
      { label:"Cloud & DevOps", items:["AWS (S3, CloudFront, Lambda, API Gateway, Cognito)","Docker","CI/CD"] },
    ],
    eduNote:"📌 Currently enrolled in Computer Engineering at Duoc UC (evening schedule), combining studies with professional work.",
    specLabel:"🚀 Key specialization",
    specText:"Frontend architecture with Next.js + AWS: migration, CI/CD, S3, CloudFront, Lambda, API Gateway and Cognito in production.",
    idiomas:"Languages", native:"Native", intermediate:"Intermediate",
    yearsExp:"Years exp.", companies:"Companies",
  },
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

function StatCard({ value, label }) {
  return (
    <div style={{ padding:"16px 18px", borderRadius:4,
      border:"1px solid rgba(14,165,233,.12)", background:"rgba(14,165,233,.04)",
      display:"flex", flexDirection:"column", gap:4 }}>
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:"#38BDF8", lineHeight:1 }}>{value}</span>
      <span style={{ fontSize:10.5, fontWeight:500, color:"#64748B", letterSpacing:".06em", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

function ExpCard({ item, isLast }) {
  return (
    <div style={{ display:"flex", gap:16, position:"relative" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div style={{ width:9, height:9, borderRadius:"50%", marginTop:6, flexShrink:0,
          background:"linear-gradient(135deg,#0EA5E9,#6366F1)", boxShadow:"0 0 8px rgba(14,165,233,.4)" }}/>
        {!isLast && <div style={{ width:1, flex:1, marginTop:6,
          background:"linear-gradient(to bottom,rgba(14,165,233,.3),transparent)" }}/>}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 32, flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:4, marginBottom:4 }}>
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:"#F1F5F9", margin:0 }}>{item.role}</p>
            <p style={{ fontSize:12.5, color:"#38BDF8", fontWeight:500, margin:"2px 0 0" }}>{item.company}</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontSize:11, color:"#475569", margin:0 }}>{item.period}</p>
            <p style={{ fontSize:10.5, color:"#334155", margin:"2px 0 0" }}>{item.loc}</p>
          </div>
        </div>
        <p style={{ fontSize:13, lineHeight:1.7, color:"#64748B", margin:"8px 0 10px" }}>{item.desc}</p>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {item.tags.map(tag => (
            <span key={tag} style={{ fontSize:9.5, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase",
              padding:"3px 9px", borderRadius:2,
              border:"1px solid rgba(14,165,233,.15)", color:"#5BA8D4", background:"rgba(14,165,233,.05)" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EduCard({ item }) {
  return (
    <div style={{ padding:"14px 18px", borderRadius:4,
      border:"1px solid rgba(255,255,255,.06)", background:"rgba(15,23,42,.5)",
      display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
      <div>
        <p style={{ fontSize:13.5, fontWeight:600, color:"#E2E8F0", margin:0 }}>{item.title}</p>
        <p style={{ fontSize:12, color:"#38BDF8", margin:"3px 0 0", fontWeight:500 }}>{item.place}</p>
        <p style={{ fontSize:11, color:"#475569", margin:"4px 0 0" }}>{item.note}</p>
      </div>
      <span style={{ fontSize:10.5, fontWeight:600, color:"#64748B", padding:"4px 10px", borderRadius:2,
        border:"1px solid rgba(255,255,255,.08)", background:"rgba(255,255,255,.03)", whiteSpace:"nowrap" }}>
        {item.period}
      </span>
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
      fontSize:13, fontWeight: active ? 600 : 400,
      color: active ? "#38BDF8" : "#475569",
      padding:"8px 0", borderBottom: active ? "2px solid #38BDF8" : "2px solid transparent",
      transition:"all .18s", letterSpacing:".02em", whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

export default function AboutModule({ lang: propLang }) {
  const [lang, setLang] = useState(propLang || "es");
  const [tab, setTab]   = useState("exp");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const t = i18n[lang];

  const tabs = [
    { key:"exp",    label:t.experience },
    { key:"edu",    label:t.education  },
    { key:"skills", label:t.skills     },
  ];

  return (
    <section style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:"#080C14",
      color:"#E2E8F0", padding: isMobile ? "80px 20px" : isTablet ? "100px 32px" : "120px 40px",
      position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .about-fade{animation:fadeUp .6s ease both;}
      `}</style>

      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:500, height:500,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
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

        {/* Section label */}
        <div className="about-fade" style={{ marginBottom: isMobile ? 40 : 64 }}>
          <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
            letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>{t.section}</p>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,#0EA5E9,transparent)" }}/>
        </div>

        {/* Layout — stacked on mobile/tablet, side-by-side on desktop */}
        <div style={{ display:"flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? 48 : isTablet ? 56 : 80,
        }}>

          {/* LEFT — bio */}
          <div style={{ flex: isMobile || isTablet ? "1" : "0 0 300px" }}>

            {/* Avatar */}
            <div style={{ width:80, height:80, borderRadius:4, marginBottom:24,
              background:"linear-gradient(135deg,rgba(14,165,233,.2),rgba(99,102,241,.2))",
              border:"1px solid rgba(14,165,233,.2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", overflow:"hidden" }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:26, color:"#38BDF8" }}>PF</span>
              <div style={{ position:"absolute", bottom:0, right:0, width:16, height:16,
                borderTop:"1px solid rgba(14,165,233,.4)", borderLeft:"1px solid rgba(14,165,233,.4)" }}/>
            </div>

            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:22,
              color:"#F1F5F9", marginBottom:4 }}>Patricio Fredes</h2>
            <p style={{ fontSize:13, color:"#38BDF8", fontWeight:500, marginBottom:20 }}>Full Stack Developer</p>

            <p style={{ fontSize:14, lineHeight:1.8, color:"#64748B", marginBottom:14 }}>{t.bio1}</p>
            <p style={{ fontSize:14, lineHeight:1.8, color:"#64748B", marginBottom:32 }}>{t.bio2}</p>

            {/* Stats — 2x2 grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
              <StatCard value="4+" label={t.yearsExp}/>
              <StatCard value="3"  label={t.companies}/>
              <StatCard value="∞"  label="Coffee ☕"/>
            </div>

            {/* Languages */}
            <div style={{ padding:"14px 18px", borderRadius:4,
              border:"1px solid rgba(255,255,255,.06)", background:"rgba(15,23,42,.5)" }}>
              <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
                letterSpacing:".1em", textTransform:"uppercase", marginBottom:12 }}>{t.idiomas}</p>
              {[
                { name:"Español", level:t.native,       pct:100 },
                { name:"English", level:t.intermediate,  pct:60  },
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

          {/* RIGHT — tabs */}
          <div style={{ flex:"1 1 auto", minWidth:0 }}>
            {/* Tab nav */}
            <div style={{ display:"flex", gap: isMobile ? 20 : 28, marginBottom:32,
              borderBottom:"1px solid rgba(255,255,255,.06)", overflowX:"auto" }}>
              {tabs.map(tb => (
                <Tab key={tb.key} label={tb.label} active={tab===tb.key} onClick={() => setTab(tb.key)}/>
              ))}
            </div>

            {tab === "exp" && (
              <div>
                {t.exp.map((item, i) => (
                  <ExpCard key={i} item={item} isLast={i===t.exp.length-1}/>
                ))}
              </div>
            )}

            {tab === "edu" && (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {t.edu.map((item,i) => <EduCard key={i} item={item}/>)}
                <div style={{ marginTop:12, padding:"12px 16px", borderRadius:4,
                  border:"1px solid rgba(14,165,233,.1)", background:"rgba(14,165,233,.04)" }}>
                  <p style={{ fontSize:12.5, color:"#64748B", lineHeight:1.6, margin:0 }}>{t.eduNote}</p>
                </div>
              </div>
            )}

            {tab === "skills" && (
              <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
                {t.cats.map((cat, i) => (
                  <div key={i}>
                    <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
                      letterSpacing:".1em", textTransform:"uppercase", marginBottom:10 }}>{cat.label}</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {cat.items.map(item => (
                        <span key={item} style={{ fontSize:11.5, fontWeight:500, color:"#94A3B8",
                          padding:"5px 12px", borderRadius:3,
                          border:"1px solid rgba(148,163,184,.12)", background:"rgba(148,163,184,.05)" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ padding:"14px 18px", borderRadius:4,
                  border:"1px solid rgba(99,102,241,.2)", background:"rgba(99,102,241,.05)" }}>
                  <p style={{ fontSize:12.5, color:"#818CF8", fontWeight:600, marginBottom:6 }}>{t.specLabel}</p>
                  <p style={{ fontSize:12.5, color:"#64748B", lineHeight:1.6, margin:0 }}>{t.specText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
