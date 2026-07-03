"use client";

const AZUL = "#1e3fa8";
const BLACK = "#131313";

// Variante de largura total da FormaShape: a forma ocupa 100% da tela,
// mas o conteúdo fica num wrapper interno centralizado (máx. 1240px),
// mantendo as posições que tinha na versão em card.
// Sem cantos arredondados nem abas laterais — só o recorte superior e a aba inferior.
const PATH = [
  "M0 0",
  "H350 C372 0 373 32 395 32 H485 C507 32 508 0 530 0", // recorte superior (180 de abertura, 32 de profundidade)
  "H880 V500",
  "H495 C470 500 468 529 440 529 C412 529 410 500 385 500", // aba inferior (convexa, para baixo)
  "H0 Z",
].join(" ");

export function FormaShapeFull({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        // cabe no campo de visão de uma tela (com folga para o padding da section)
        height: "calc(100svh - 20px)",
        minHeight: 620,
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <clipPath id="forma-clip-full" clipPathUnits="objectBoundingBox" transform={`scale(${1 / 880}, ${1 / 530})`}>
          <path d={PATH} />
        </clipPath>
      </svg>

      {/* forma azul com recortes transparentes; o conteúdo fica dentro do clip */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 50% -10%, #5b9cf6 0%, rgba(47,106,224,0.55) 40%, rgba(47,106,224,0) 65%), linear-gradient(160deg, #2e6fe8 0%, #1a4fd4 45%, #0d2fa6 100%)",
          clipPath: "url(#forma-clip-full)",
          WebkitClipPath: "url(#forma-clip-full)",
        }}
      >
        {/* wrapper interno: mantém o conteúdo na largura do card original */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1240,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "60px 80px",
          }}
        >
          {children}
        </div>
      </div>

      {/* logo na abertura superior */}
      <a
        href="/"
        aria-label="TOP20 — Móveis de Valor"
        style={{
          position: "absolute",
          top: `${(16 / 530) * 100}%`, // metade da profundidade do recorte (32/2)
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: BLACK,
          textDecoration: "none",
          lineHeight: 1,
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontWeight: 900,
            fontSize: "clamp(15px, 2.4vw, 28px)",
            letterSpacing: "-0.03em",
            textAlign: "center",
          }}
        >
          TOP20
        </span>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            fontSize: "clamp(4.5px, 0.6vw, 7px)",
            textTransform: "uppercase",
            opacity: 0.85,
            marginTop: 3,
          }}
        >
          {"MÓVEIS DE VALOR".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </span>
      </a>

      {/* seta para baixo na aba inferior: rola até a próxima section */}
      <button
        aria-label="Rolar para baixo"
        onClick={(e) => {
          const section = e.currentTarget.closest("section");
          section?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: 12,
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          padding: 0,
          color: "#fff",
          cursor: "pointer",
          display: "flex",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
}
