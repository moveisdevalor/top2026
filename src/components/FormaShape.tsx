"use client";

const AZUL = "#1e3fa8";

// Forma desenhada em coordenadas 880×530 e escalada para objectBoundingBox,
// então acompanha o tamanho do container (que trava a proporção via aspect-ratio).
// Corpo do card: y 0–500. Abas laterais convexas PARA DENTRO (apex em x=20/x=860);
// aba inferior convexa para fora, descendo até y=529.
const PATH = [
  "M40 0",
  "H330 C357 0 358 40 385 40 H495 C522 40 523 0 550 0", // recorte superior (220 de abertura, 40 de profundidade)
  "H840 A40 40 0 0 1 880 40",
  "V214 C880 230 860 232 860 250 C860 268 880 270 880 286", // aba lateral direita (para dentro)
  "V460 A40 40 0 0 1 840 500",
  "H495 C470 500 468 529 440 529 C412 529 410 500 385 500", // aba inferior (para fora)
  "H40 A40 40 0 0 1 0 460",
  "V286 C0 270 20 268 20 250 C20 232 0 230 0 214", // aba lateral esquerda (para dentro)
  "V40 A40 40 0 0 1 40 0 Z",
].join(" ");

const setaStyle: React.CSSProperties = {
  position: "absolute",
  top: `${(250 / 530) * 100}%`, // centro das abas laterais (y=250 do path)
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  padding: 0,
  color: AZUL,
  cursor: "pointer",
  display: "flex",
};

export function FormaShape({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1240,
        aspectRatio: "880 / 530",
        margin: "0 auto",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <clipPath id="forma-clip" clipPathUnits="objectBoundingBox" transform={`scale(${1 / 880}, ${1 / 530})`}>
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
          clipPath: "url(#forma-clip)",
          WebkitClipPath: "url(#forma-clip)",
          display: "flex",
          alignItems: "center",
          padding: "60px 80px",
        }}
      >
        {children}
      </div>

      {/* texto na abertura superior */}
      <span
        style={{
          position: "absolute",
          top: "1%",
          left: "50%",
          transform: "translateX(-50%)",
          color: AZUL,
          fontWeight: 900,
          fontSize: "clamp(15px, 3.4vw, 36px)", // escala junto com o recorte
          letterSpacing: "-0.02em",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        TOP20
      </span>

      {/* setas nas abas laterais (no vão, sobre o fundo da página) */}
      <button aria-label="Anterior" style={{ ...setaStyle, left: 8 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button aria-label="Próximo" style={{ ...setaStyle, right: 8 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* seta para baixo na aba inferior */}
      <button
        aria-label="Rolar para baixo"
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
