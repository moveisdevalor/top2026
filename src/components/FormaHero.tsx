"use client";

const BG = "#f0ede8";
const CARD_RADIUS = 40;
const CORNER_BITE = 60; // raio dos círculos que "mordem" os cantos inferiores
const TAB_H = 80;
const TAB_W = 40;
const TAB_BITE = 38; // quanto do tab fica fora do card

export function FormaHero() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* wrapper relativo para os overlays côncavos */}
      <div style={{ position: "relative", width: "100%", maxWidth: 1240 }}>

        {/* ── CARD AZUL ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: "calc(100vh - 40px)",
            borderRadius: CARD_RADIUS,
            background: "linear-gradient(155deg, #3080f8 0%, #1055d4 45%, #082fa0 100%)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── NAV BRANCO com cantos côncavos na base ── */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                background: "white",
                padding: "14px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: "-0.03em" }}>
                forma<span style={{ fontWeight: 300 }}> studio.</span>
              </span>
              <nav style={{ display: "flex", gap: 32, fontSize: 13, color: "#555" }}>
                {["Work", "About", "Contact"].map((l) => (
                  <a key={l} href="#" style={{ color: "#555", textDecoration: "none" }}>{l}</a>
                ))}
              </nav>
              <button style={{ background: "#0a0a0a", color: "white", border: "none", borderRadius: 9999, padding: "9px 22px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                Book a call
              </button>
            </div>
            {/* SVG: cantos côncavos na base do nav */}
            <svg viewBox="0 0 1240 36" style={{ width: "100%", height: 36, display: "block", marginTop: -1 }} preserveAspectRatio="none">
              <path d="M0,0 H1240 V20 Q1240,36 1210,36 H30 Q0,36 0,20 V0 Z" fill="white" />
            </svg>
          </div>

          {/* ── CONTEÚDO ── */}
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", padding: "0 70px 100px", overflow: "hidden" }}>
            {/* fo */}
            <span style={{ position: "absolute", left: "-0.02em", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(140px,33vh,380px)", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em" }}>fo</span>
            {/* ma */}
            <span style={{ position: "absolute", right: "-0.02em", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(140px,33vh,380px)", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em" }}>ma</span>

            <div style={{ position: "relative", zIndex: 1, color: "white" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>DESIGN STUDIO</p>
              <h1 style={{ fontSize: "clamp(38px,6.5vw,82px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 28 }}>
                Transformamos<br />espaços em<br />experiências.
              </h1>
              <button style={{ background: "white", color: "#0a0a0a", border: "none", borderRadius: 9999, padding: "13px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Ver projetos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* ── ONDA INFERIOR ── */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
            <svg viewBox="0 0 1240 60" style={{ width: "100%", height: 60, display: "block" }} preserveAspectRatio="none">
              <path d="M0,0 L420,0 Q620,60 820,0 L1240,0 L1240,60 L0,60 Z" fill="rgba(6,38,120,0.6)" />
            </svg>
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.45)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </div>
          </div>
        </div>

        {/* ══ OVERLAYS da cor do fundo que criam cantos CÔNCAVOS no card ══ */}

        {/* Canto inferior-esquerdo */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: CORNER_BITE, height: CORNER_BITE, borderRadius: "50%", background: BG, transform: "translate(-45%, 45%)", pointerEvents: "none", zIndex: 5 }} />
        {/* Canto inferior-direito */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: CORNER_BITE, height: CORNER_BITE, borderRadius: "50%", background: BG, transform: "translate(45%, 45%)", pointerEvents: "none", zIndex: 5 }} />

        {/* ══ TABS LATERAIS ══ */}

        {/* Tab esquerda */}
        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: TAB_W, height: TAB_H, background: "white", borderRadius: `0 ${TAB_H}px ${TAB_H}px 0`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 6, boxShadow: "3px 0 10px rgba(0,0,0,0.1)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </div>

        {/* Tab direita */}
        <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: TAB_W, height: TAB_H, background: "white", borderRadius: `${TAB_H}px 0 0 ${TAB_H}px`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 6, boxShadow: "-3px 0 10px rgba(0,0,0,0.1)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        </div>

      </div>
    </div>
  );
}
