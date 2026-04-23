import { useState, useEffect } from "react";

const i18n = {
  es: {
    section:     "Currículum",
    heading:     "Descarga mi CV",
    subheading:  "Disponible en español e inglés. Actualizado con mi experiencia y stack más reciente.",
    download_es: "Descargar CV en Español",
    download_en: "Descargar CV en Inglés",
    preview:     "Vista previa",
    updated:     "Actualizado",
    date:        "Abril 2026",
    pages:       "2 páginas",
    format:      "PDF · listo para compartir",
    highlights: [
      "4 años de experiencia en entornos productivos corporativos",
      "Stack completo: React, Next.js, TypeScript, Node.js, AWS",
      "Migraciones tecnológicas y arquitectura frontend lideradas",
      "CI/CD, infraestructura AWS serverless en producción",
      "Python para automatización, scraping y procesamiento de datos",
    ],
    highlights_en: [
      "4 years of experience in corporate production environments",
      "Full stack: React, Next.js, TypeScript, Node.js, AWS",
      "Led tech migrations and frontend architecture decisions",
      "CI/CD, AWS serverless infrastructure in production",
      "Python for automation, scraping and data processing",
    ],
    also:        "También puedes encontrarme en",
    or:          "o revisar mi trabajo en",
    note:        "Respondo mensajes en menos de 24 horas.",
  },
  en: {
    section:     "Resume",
    heading:     "Download my CV",
    subheading:  "Available in Spanish and English. Updated with my latest experience and stack.",
    download_es: "Download CV in Spanish",
    download_en: "Download CV in English",
    preview:     "Preview",
    updated:     "Updated",
    date:        "April 2026",
    pages:       "2 pages",
    format:      "PDF · ready to share",
    highlights: [
      "4 años de experiencia en entornos productivos corporativos",
      "Stack completo: React, Next.js, TypeScript, Node.js, AWS",
      "Migraciones tecnológicas y arquitectura frontend lideradas",
      "CI/CD, infraestructura AWS serverless en producción",
      "Python para automatización, scraping y procesamiento de datos",
    ],
    highlights_en: [
      "4 years of experience in corporate production environments",
      "Full stack: React, Next.js, TypeScript, Node.js, AWS",
      "Led tech migrations and frontend architecture decisions",
      "CI/CD, AWS serverless infrastructure in production",
      "Python for automation, scraping and data processing",
    ],
    also:        "You can also find me on",
    or:          "or check my work on",
    note:        "I reply to messages within 24 hours.",
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

// ─── CV CARD ─────────────────────────────────────────────────────────────────
function CVCard({ lang: cardLang, label, filename, accentColor, isMobile, onDownload, downloaded }) {
  const isES = cardLang === "es";

  return (
    <div style={{
      flex: "1 1 280px",
      borderRadius: 6,
      border: `1px solid ${accentColor}25`,
      background: "rgba(10,18,35,.8)",
      backdropFilter: "blur(10px)",
      overflow: "hidden",
      position: "relative",
      transition: "transform .2s, box-shadow .2s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,.5), 0 0 0 1px ${accentColor}35`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}/>

      {/* CV Preview mockup */}
      <div style={{
        background: `radial-gradient(ellipse at top, ${accentColor}10 0%, transparent 60%)`,
        borderBottom: "1px solid rgba(255,255,255,.05)",
        padding: "32px 28px 24px",
        display: "flex", flexDirection: "column", gap: 10,
        minHeight: 200, position: "relative", overflow: "hidden",
      }}>
        {/* Grid bg */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(${accentColor}06 1px,transparent 1px),linear-gradient(90deg,${accentColor}06 1px,transparent 1px)`,
          backgroundSize:"24px 24px" }}/>

        {/* Fake doc lines */}
        <div style={{ position:"relative", zIndex:1 }}>
          {/* Name line */}
          <div style={{ height:10, width:"60%", borderRadius:2,
            background:`linear-gradient(90deg,${accentColor}60,${accentColor}20)`, marginBottom:6 }}/>
          {/* Subtitle */}
          <div style={{ height:6, width:"80%", borderRadius:2,
            background:"rgba(255,255,255,.1)", marginBottom:16 }}/>
          {/* Section lines */}
          {[90, 75, 85, 70, 80, 60].map((w, i) => (
            <div key={i} style={{ height: i % 3 === 0 ? 5 : 4, width:`${w}%`, borderRadius:2,
              background: i % 3 === 0 ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.06)",
              marginBottom: i % 3 === 0 ? 8 : 5 }}/>
          ))}
        </div>

        {/* Language badge */}
        <div style={{ position:"absolute", top:16, right:16,
          fontSize:11, fontWeight:800, letterSpacing:".1em",
          padding:"4px 10px", borderRadius:2,
          background:`${accentColor}20`, border:`1px solid ${accentColor}40`,
          color: accentColor }}>
          {isES ? "ES" : "EN"}
        </div>

        {/* PDF icon */}
        <div style={{ position:"absolute", bottom:16, right:16 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" opacity=".4">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "24px 28px", display:"flex", flexDirection:"column", gap:16 }}>
        <div>
          <p style={{ fontSize:11, fontWeight:700, color: accentColor,
            letterSpacing:".1em", textTransform:"uppercase", marginBottom:4 }}>
            {label}
          </p>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18,
            color:"#F1F5F9", margin:"0 0 4px" }}>
            Patricio Fredes
          </h3>
          <p style={{ fontSize:12.5, color:"#475569", margin:0 }}>
            Full Stack Software Developer
          </p>
        </div>

        {/* Meta */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {[
            { icon:"📄", text: "2 páginas" },
            { icon:"📅", text: isES ? "Abr 2026" : "Apr 2026" },
            { icon:"🌐", text: isES ? "Español" : "English" },
          ].map(m => (
            <div key={m.text} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ fontSize:11 }}>{m.icon}</span>
              <span style={{ fontSize:11.5, color:"#475569" }}>{m.text}</span>
            </div>
          ))}
        </div>

        {/* Download button */}
        <a
          href={`/cv/${filename}`}
          download={filename}
          onClick={onDownload}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:9,
            padding:"12px 20px", borderRadius:3, textDecoration:"none",
            background: downloaded
              ? "rgba(34,197,94,.15)"
              : `linear-gradient(135deg, ${accentColor}dd, ${accentColor}88)`,
            border: downloaded ? "1px solid rgba(34,197,94,.3)" : "none",
            color: downloaded ? "#4ADE80" : "#fff",
            fontSize:13.5, fontWeight:600, fontFamily:"inherit",
            transition:"all .2s",
          }}
        >
          {downloaded ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              {isES ? "¡Descargado!" : "Downloaded!"}
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {label}
            </>
          )}
        </a>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CVModule({ lang: propLang }) {
  const [lang, setLang]           = useState(propLang || "es");
  const [downloadedES, setDlES]   = useState(false);
  const [downloadedEN, setDlEN]   = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const t = i18n[lang];

  const highlights = lang === "es" ? t.highlights : t.highlights_en;

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
        .cv-fade{animation:fadeUp .6s ease both;}
      `}</style>

      {/* BG */}
      <div style={{ position:"absolute", top:"0%", left:"20%", width:600, height:600,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:400, height:400,
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

        {/* Section header */}
        <div className="cv-fade" style={{ marginBottom: isMobile ? 40 : 64 }}>
          <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
            letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>{t.section}</p>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,#0EA5E9,transparent)" }}/>
        </div>

        {/* Layout */}
        <div style={{ display:"flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? 48 : isTablet ? 56 : 80,
          alignItems: "flex-start",
        }}>

          {/* LEFT — heading + highlights */}
          <div style={{ flex: isMobile || isTablet ? "1" : "0 0 320px" }}>
            <h2 className="cv-fade" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
              fontSize: isMobile ? "clamp(26px,8vw,36px)" : "clamp(28px,3.5vw,40px)",
              lineHeight:1.1, color:"#F1F5F9", marginBottom:14, letterSpacing:"-.02em",
              animationDelay:".1s" }}>
              {t.heading}
            </h2>

            <p className="cv-fade" style={{ fontSize:14.5, lineHeight:1.75, color:"#64748B",
              marginBottom:36, animationDelay:".2s" }}>{t.subheading}</p>

            {/* Highlights */}
            <div className="cv-fade" style={{ display:"flex", flexDirection:"column", gap:12,
              marginBottom:36, animationDelay:".3s" }}>
              <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
                letterSpacing:".1em", textTransform:"uppercase", marginBottom:4 }}>
                {lang === "es" ? "Lo que encontrarás" : "What you'll find"}
              </p>
              {highlights.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#0EA5E9",
                    flexShrink:0, marginTop:6, boxShadow:"0 0 6px rgba(14,165,233,.5)" }}/>
                  <span style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Contact note */}
            <div className="cv-fade" style={{ padding:"16px 20px", borderRadius:4,
              border:"1px solid rgba(34,211,238,.15)", background:"rgba(34,211,238,.04)",
              animationDelay:".4s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"#22D3EE",
                  boxShadow:"0 0 8px rgba(34,211,238,.6)" }}/>
                <span style={{ fontSize:11.5, fontWeight:600, color:"#22D3EE" }}>
                  {lang === "es" ? "Disponible para proyectos" : "Available for projects"}
                </span>
              </div>
              <p style={{ fontSize:13, color:"#475569", lineHeight:1.6, margin:"0 0 12px" }}>
                {t.note}
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <a href="mailto:patricio.fredes.g@gmail.com"
                    style={{ fontSize:12.5, color:"#475569", textDecoration:"none", transition:"color .18s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#94A3B8"}
                    onMouseLeave={e => e.currentTarget.style.color="#475569"}>
                    patricio.fredes.g@gmail.com
                  </a>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color:"#334155" }}>
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.91 1.64-1.87 3.37-1.87 3.6 0 4.27 2.37 4.27 5.45v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.22 0z"/>
                  </svg>
                  <a href="https://www.linkedin.com/in/patriciofredesti/" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:12.5, color:"#475569", textDecoration:"none", transition:"color .18s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#94A3B8"}
                    onMouseLeave={e => e.currentTarget.style.color="#475569"}>
                    linkedin.com/in/patriciofredesti
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — CV cards */}
          <div style={{ flex:"1 1 auto", display:"flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 20 : 24,
            alignItems:"flex-start",
          }}>
            <CVCard
              cardLang="es"
              label={t.download_es}
              filename="CV_PatricioFredes_ES.pdf"
              accentColor="#0EA5E9"
              isMobile={isMobile}
              downloaded={downloadedES}
              onDownload={() => { setDlES(true); setTimeout(() => setDlES(false), 3000); }}
            />
            <CVCard
              cardLang="en"
              label={t.download_en}
              filename="CV_PatricioFredes_EN.pdf"
              accentColor="#6366F1"
              isMobile={isMobile}
              downloaded={downloadedEN}
              onDownload={() => { setDlEN(true); setTimeout(() => setDlEN(false), 3000); }}
            />
          </div>
        </div>

        {/* Bottom note */}
        <div className="cv-fade" style={{ marginTop: isMobile ? 48 : 64,
          padding:"18px 24px", borderRadius:4,
          border:"1px solid rgba(255,255,255,.06)", background:"rgba(15,23,42,.5)",
          display:"flex", alignItems: isMobile ? "flex-start" : "center",
          gap:12, flexDirection: isMobile ? "column" : "row",
          animationDelay:".5s" }}>
          <div style={{ width:34, height:34, borderRadius:3, flexShrink:0,
            background:"rgba(14,165,233,.08)", border:"1px solid rgba(14,165,233,.15)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
            </svg>
          </div>
          <p style={{ fontSize:13, color:"#64748B", lineHeight:1.7, margin:0 }}>
            {lang === "es"
              ? "Los archivos PDF están alojados en el repositorio. Si el link no funciona, escríbeme directamente a patricio.fredes.g@gmail.com y te lo envío."
              : "PDF files are hosted in the repository. If the link doesn't work, write me directly at patricio.fredes.g@gmail.com and I'll send it to you."}
          </p>
        </div>
      </div>
    </section>
  );
}
