import { useState, useEffect } from "react";

const i18n = {
  es: {
    section:"Contacto", heading:"Trabajemos juntos",
    subheading:"¿Tienes un proyecto en mente o quieres conversar sobre una oportunidad? Escríbeme, respondo en menos de 24 horas.",
    name:"Nombre", name_ph:"Tu nombre",
    email:"Email", email_ph:"tu@email.com",
    subject:"Asunto", subject_ph:"¿De qué se trata?",
    message:"Mensaje", message_ph:"Cuéntame sobre tu proyecto o consulta...",
    send:"Enviar mensaje", sending:"Enviando...",
    success_title:"¡Mensaje enviado!", success_msg:"Gracias por escribirme, Patricio te responderá pronto.",
    error_msg:"Algo salió mal. Intenta de nuevo o escribe directamente al email.",
    or:"O contáctame directamente", copy:"Copiar", copied:"¡Copiado!",
    required:"Campo requerido", invalid_email:"Email inválido",
    available:"Disponible para proyectos",
    available_text:"Abierto a oportunidades freelance, trabajo remoto o posiciones full-time en Chile y LATAM.",
    send_another:"Enviar otro mensaje",
    guarantee:"✦ Respuesta garantizada en menos de 24 horas.",
    copyright:`© ${new Date().getFullYear()} · Diseñado y desarrollado por Patricio Fredes`,
    info:[
      { label:"Email",    value:"patricio.fredes.g@gmail.com", href:"mailto:patricio.fredes.g@gmail.com" },
      { label:"LinkedIn", value:"patriciofredesti",             href:"https://www.linkedin.com/in/patriciofredesti/" },
      { label:"GitHub",   value:"PatoFredesTi",                 href:"https://github.com/PatoFredesTi" },
      { label:"Ubicación",value:"Santiago, Chile",              href:null },
    ],
  },
  en: {
    section:"Contact", heading:"Let's work together",
    subheading:"Have a project in mind or want to discuss an opportunity? Send me a message — I reply within 24 hours.",
    name:"Name", name_ph:"Your name",
    email:"Email", email_ph:"you@email.com",
    subject:"Subject", subject_ph:"What's it about?",
    message:"Message", message_ph:"Tell me about your project or question...",
    send:"Send message", sending:"Sending...",
    success_title:"Message sent!", success_msg:"Thanks for reaching out — Patricio will get back to you soon.",
    error_msg:"Something went wrong. Try again or email directly.",
    or:"Or reach me directly", copy:"Copy", copied:"Copied!",
    required:"Required field", invalid_email:"Invalid email",
    available:"Available for projects",
    available_text:"Open to freelance, remote work or full-time opportunities in Chile and LATAM.",
    send_another:"Send another message",
    guarantee:"✦ Guaranteed response within 24 hours.",
    copyright:`© ${new Date().getFullYear()} · Designed & built by Patricio Fredes`,
    info:[
      { label:"Email",    value:"patricio.fredes.g@gmail.com", href:"mailto:patricio.fredes.g@gmail.com" },
      { label:"LinkedIn", value:"patriciofredesti",             href:"https://www.linkedin.com/in/patriciofredesti/" },
      { label:"GitHub",   value:"PatoFredesTi",                 href:"https://github.com/PatoFredesTi" },
      { label:"Location", value:"Santiago, Chile",              href:null },
    ],
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

const githubIcon = <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const linkedinIcon = <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.91 1.64-1.87 3.37-1.87 3.6 0 4.27 2.37 4.27 5.45v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.22 0z"/></svg>;

const infoIcons = {
  Email:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  LinkedIn: linkedinIcon,
  GitHub:   githubIcon,
  Ubicación:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Location: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
};

  const Field = ({ label, error, children }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:11, fontWeight:600,
        color: error ? "#F87171" : "#64748B", letterSpacing:".06em", textTransform:"uppercase" }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontSize:11, color:"#F87171" }}>{error}</span>}
    </div>
  );

function InfoCard({ item, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(item.value).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"12px 16px", borderRadius:4,
      border:"1px solid rgba(255,255,255,.06)", background:"rgba(15,23,42,.5)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ color:"#0EA5E9", flexShrink:0 }}>{infoIcons[item.label]}</div>
        <div>
          <p style={{ fontSize:10, fontWeight:600, color:"#334155",
            letterSpacing:".08em", textTransform:"uppercase", marginBottom:2 }}>{item.label}</p>
          {item.href ? (
            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{ fontSize:13, color:"#94A3B8", textDecoration:"none", transition:"color .18s" }}
              onMouseEnter={e => e.currentTarget.style.color="#E2E8F0"}
              onMouseLeave={e => e.currentTarget.style.color="#94A3B8"}>
              {item.value}
            </a>
          ) : (
            <p style={{ fontSize:13, color:"#94A3B8", margin:0 }}>{item.value}</p>
          )}
        </div>
      </div>
      {item.label === "Email" && (
        <button onClick={handleCopy} style={{
          background: copied ? "rgba(34,197,94,.1)" : "rgba(255,255,255,.04)",
          border:`1px solid ${copied ? "rgba(34,197,94,.2)" : "rgba(255,255,255,.08)"}`,
          borderRadius:3, padding:"4px 8px", cursor:"pointer",
          color: copied ? "#4ADE80" : "#475569", fontSize:10.5,
          fontWeight:600, fontFamily:"inherit", transition:"all .18s",
          display:"flex", alignItems:"center", gap:4, flexShrink:0,
        }}>
          {copied ? "✓" : "⎘"} {copied ? copiedLabel : copyLabel}
        </button>
      )}
    </div>
  );
}

const inputBase = {
  width:"100%", background:"rgba(15,23,42,.6)", color:"#E2E8F0",
  border:"1px solid rgba(148,163,184,.12)", borderRadius:3,
  padding:"11px 14px", fontSize:13.5, fontFamily:"inherit",
  outline:"none", transition:"border-color .18s",
};

export default function ContactModule({ lang: propLang }) {
  const [lang, setLang]     = useState(propLang || "es");
  const [form, setForm]     = useState({ name:"", email:"", subject:"", message:"" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const t = i18n[lang];

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = t.required;
    if (!form.email.trim())   e.email   = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.invalid_email;
    if (!form.subject.trim()) e.subject = t.required;
    if (!form.message.trim()) e.message = t.required;
    return e;
  };

const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length) { setErrors(e); return; }
  setErrors({});
  setStatus("sending");

  try {
    const res = await fetch("https://formspree.io/f/mlgaalpb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    form.name,
        email:   form.email,
        subject: form.subject,
        message: form.message,
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
};

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };
  

  const focusStyle = (field) => ({
    ...inputBase,
    borderColor: focused === field ? "rgba(14,165,233,.5)"
      : errors[field] ? "rgba(248,113,113,.4)"
      : "rgba(148,163,184,.12)",
  });

  return (
    <section style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:"#080C14",
      color:"#E2E8F0",
      padding: isMobile ? "80px 20px 60px" : isTablet ? "100px 32px 60px" : "120px 40px 80px",
      position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
        input::placeholder,textarea::placeholder{color:#334155;}
        input:focus,textarea:focus{outline:none;}
        textarea{resize:vertical;}
        .contact-fade{animation:fadeUp .6s ease both;}

        .submit-btn{display:flex;align-items:center;justify-content:center;gap:9px;
          color:#fff;font-size:14px;font-weight:600;letter-spacing:.03em;
          padding:14px 28px;border-radius:3px;border:none;cursor:pointer;
          transition:transform .18s,box-shadow .18s;font-family:inherit;}
        .submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 40px rgba(14,165,233,.3);}
        .submit-btn:disabled{opacity:.7;cursor:default;}
      `}</style>

      {/* BG */}
      <div style={{ position:"absolute", top:"-10%", left:"-5%", width:500, height:500,
        borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-5%", right:"-5%", width:400, height:400,
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

        {/* Header */}
        <div className="contact-fade" style={{ marginBottom: isMobile ? 40 : 64 }}>
          <p style={{ fontSize:10.5, fontWeight:700, color:"#0EA5E9",
            letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>{t.section}</p>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,#0EA5E9,transparent)" }}/>
        </div>

        {/* Layout */}
        <div style={{ display:"flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? 48 : isTablet ? 56 : 80,
          alignItems:"flex-start",
        }}>

          {/* LEFT */}
          <div style={{ flex: isMobile || isTablet ? "1" : "0 0 300px" }}>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
              fontSize: isMobile ? "clamp(26px,8vw,36px)" : "clamp(28px,3.5vw,40px)",
              lineHeight:1.1, color:"#F1F5F9", marginBottom:14, letterSpacing:"-.02em" }}>
              {t.heading}
            </h2>
            <p style={{ fontSize:14, lineHeight:1.75, color:"#64748B", marginBottom:36 }}>{t.subheading}</p>

            {/* Info cards */}
            <p style={{ fontSize:10.5, fontWeight:700, color:"#334155",
              letterSpacing:".1em", textTransform:"uppercase", marginBottom:10 }}>{t.or}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
              {t.info.map((item, i) => (
                <InfoCard key={i} item={item} copyLabel={t.copy} copiedLabel={t.copied}/>
              ))}
            </div>

            {/* Available badge */}
            <div style={{ padding:"12px 16px", borderRadius:4,
              border:"1px solid rgba(34,211,238,.15)", background:"rgba(34,211,238,.04)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"#22D3EE",
                  boxShadow:"0 0 8px rgba(34,211,238,.6)", flexShrink:0 }}/>
                <span style={{ fontSize:11, fontWeight:600, color:"#22D3EE" }}>{t.available}</span>
              </div>
              <p style={{ fontSize:12.5, color:"#475569", lineHeight:1.6 }}>{t.available_text}</p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{ flex:"1 1 auto", minWidth:0 }}>
            {status === "success" ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
                padding:"50px 32px", borderRadius:6,
                border:"1px solid rgba(34,197,94,.2)", background:"rgba(34,197,94,.04)",
                textAlign:"center", animation:"popIn .4s ease both" }}>
                <div style={{ width:52, height:52, borderRadius:"50%",
                  background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.3)",
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:20,
                  color:"#4ADE80", marginBottom:10 }}>{t.success_title}</h3>
                <p style={{ fontSize:14, color:"#64748B", lineHeight:1.7, maxWidth:300 }}>{t.success_msg}</p>
                <button onClick={() => { setStatus("idle"); setForm({ name:"", email:"", subject:"", message:"" }); }}
                  style={{ marginTop:24, background:"transparent", border:"1px solid rgba(255,255,255,.1)",
                    color:"#64748B", fontSize:12.5, padding:"8px 20px", borderRadius:3,
                    cursor:"pointer", fontFamily:"inherit" }}>
                  {t.send_another}
                </button>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                {/* Name + Email — stacked on mobile, side by side on tablet+ */}
                <div style={{ display:"grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:16 }}>
                  <Field label={t.name} error={errors.name}>
                    <input type="text" placeholder={t.name_ph} value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={focusStyle("name")}/>
                  </Field>
                  <Field label={t.email} error={errors.email}>
                    <input type="email" placeholder={t.email_ph} value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      style={focusStyle("email")}/>
                  </Field>
                </div>

                <Field label={t.subject} error={errors.subject}>
                  <input type="text" placeholder={t.subject_ph} value={form.subject}
                    onChange={e => handleChange("subject", e.target.value)}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                    style={focusStyle("subject")}/>
                </Field>

                <Field label={t.message} error={errors.message}>
                  <textarea rows={isMobile ? 5 : 6} placeholder={t.message_ph} value={form.message}
                    onChange={e => handleChange("message", e.target.value)}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...focusStyle("message"), lineHeight:1.7 }}/>
                </Field>

                {status === "error" && (
                  <div style={{ padding:"12px 16px", borderRadius:3,
                    border:"1px solid rgba(248,113,113,.2)", background:"rgba(248,113,113,.05)" }}>
                    <p style={{ fontSize:13, color:"#F87171", margin:0 }}>{t.error_msg}</p>
                  </div>
                )}

                <button className="submit-btn"
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    background: status === "sending"
                      ? "rgba(14,165,233,.3)"
                      : "linear-gradient(135deg,#0EA5E9,#6366F1)",
                    width: isMobile ? "100%" : "auto",
                    alignSelf: isMobile ? "stretch" : "flex-start",
                  }}>
                  {status === "sending" ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        style={{ animation:"spin 1s linear infinite" }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>
                      </svg>
                      {t.send}
                    </>
                  )}
                </button>

                <p style={{ fontSize:11.5, color:"#1E3A52" }}>{t.guarantee}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: isMobile ? 60 : 100, paddingTop:28,
          borderTop:"1px solid rgba(255,255,255,.05)",
          display:"flex", flexDirection: isMobile ? "column" : "row",
          justifyContent:"space-between", alignItems: isMobile ? "center" : "center",
          gap:16, textAlign: isMobile ? "center" : "left" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:26, height:26, borderRadius:3,
              background:"linear-gradient(135deg,#0EA5E9,#6366F1)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontWeight:800, color:"#fff", fontFamily:"'Syne',sans-serif" }}>PF</div>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:"#334155" }}>
              Patricio Fredes
            </span>
          </div>
          <p style={{ fontSize:11, color:"#1E3A52" }}>{t.copyright}</p>
          <div style={{ display:"flex", gap:8 }}>
            {[
              { href:"https://github.com/PatoFredesTi", icon:githubIcon },
              { href:"https://www.linkedin.com/in/patriciofredesti/", icon:linkedinIcon },
            ].map((s,i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ width:32, height:32, borderRadius:3,
                  border:"1px solid rgba(148,163,184,.1)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#334155", textDecoration:"none", transition:"all .18s" }}
                onMouseEnter={e => { e.currentTarget.style.color="#94A3B8"; e.currentTarget.style.borderColor="rgba(14,165,233,.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#334155"; e.currentTarget.style.borderColor="rgba(148,163,184,.1)"; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
