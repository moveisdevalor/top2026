"use client";

const AZUL = "#1e3fa8";
const BLACK = "#131313";

// Variante de largura total da FormaShape: a forma ocupa 100% da tela,
// mas o conteúdo fica num wrapper interno centralizado (máx. 1400px),
// mantendo as posições que tinha na versão em card.
// Sem cantos arredondados nem abas laterais — só o recorte superior e a aba inferior.
const PATH_DESKTOP = [
  "M0 0",
  "H350 C372 0 373 32 395 32 H485 C507 32 508 0 530 0", // recorte superior (180 de abertura, 32 de profundidade)
  "H880 V500",
  "H495 C470 500 468 529 440 529 C412 529 410 500 385 500", // aba inferior (convexa, para baixo)
  "H0 Z",
].join(" ");

// Mobile: vira um card com margem (cantos arredondados nos 4 lados) e o
// recorte superior é estreito, deslocado à direita — só para o botão de menu.
// O logo "TOP20" fica fora do card, solto na margem superior esquerda.
const PATH_MOBILE = [
  "M40 0",
  "H620 C645 0 646 28 668 28 H752 C774 28 775 0 800 0", // recorte estreito (menu), deslocado à direita
  "H840 A40 40 0 0 1 880 40",
  "V490 A40 40 0 0 1 840 530",
  "H40 A40 40 0 0 1 0 490",
  "V40 A40 40 0 0 1 40 0 Z",
].join(" ");

// posição do centro do recorte mobile (para o botão de menu), em % da caixa 880×530
const MENU_LEFT_PCT = ((668 + 752) / 2 / 880) * 100;
const MENU_TOP_PCT = (14 / 530) * 100;

export function FormaShapeFull({
  children,
  menuAberto,
  onMenuClick,
}: {
  children?: React.ReactNode;
  /** Estado do menu mobile (para animar o ícone hambúrguer no recorte). */
  menuAberto?: boolean;
  /** Clique no botão de menu mobile, dentro do recorte. */
  onMenuClick?: () => void;
}) {
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
          <path d={PATH_DESKTOP} />
        </clipPath>
        <clipPath id="forma-clip-mobile" clipPathUnits="objectBoundingBox" transform={`scale(${1 / 880}, ${1 / 530})`}>
          <path d={PATH_MOBILE} />
        </clipPath>
      </svg>

      {/* forma azul com recortes transparentes; o conteúdo fica dentro do clip.
          Abaixo de lg, vira um card com margem e o recorte fica largo. */}
      <div
        className="forma-frame forma-clip-path"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #5b9cf6 0%, rgba(47,106,224,0.55) 40%, rgba(47,106,224,0) 65%), linear-gradient(160deg, #2e6fe8 0%, #1a4fd4 45%, #0d2fa6 100%)",
        }}
      >
        {/* wrapper interno: mantém o conteúdo na largura do card original */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1400,
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

      {/* frame invisível com a MESMA margem/posição do card acima (sem clip nem
          fundo) — referência para o botão de menu ficar exatamente dentro do
          recorte, já que no mobile o card tem inset em relação à caixa cheia. */}
      <div className="forma-frame lg:hidden" style={{ pointerEvents: "none" }}>
        <button
          aria-label="Menu"
          aria-expanded={menuAberto}
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1"
          style={{
            position: "absolute",
            top: `${MENU_TOP_PCT}%`,
            left: `${MENU_LEFT_PCT}%`,
            transform: "translate(-50%, -50%)",
            width: 32,
            height: 32,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <span className={`block w-4 h-0.5 bg-[#131313] transition-transform ${menuAberto ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`block w-4 h-0.5 bg-[#131313] transition-opacity ${menuAberto ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-0.5 bg-[#131313] transition-transform ${menuAberto ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* logo mobile: fora do card, solto na margem superior esquerda */}
      <a
        href="/"
        aria-label="TOP20 — Móveis de Valor"
        className="lg:hidden flex flex-col"
        style={{
          position: "absolute",
          top: 18,
          left: 16,
          color: BLACK,
          textDecoration: "none",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: "-0.03em" }}>TOP20</span>
        <span style={{ fontWeight: 700, fontSize: 7, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, marginTop: 2 }}>
          Móveis de Valor
        </span>
      </a>

      <style jsx>{`
        .forma-frame {
          position: absolute;
          inset: 0;
        }
        .forma-clip-path {
          clip-path: url(#forma-clip-full);
          -webkit-clip-path: url(#forma-clip-full);
        }
        @media (max-width: 1023px) {
          .forma-frame {
            top: 56px;
            right: 16px;
            bottom: 16px;
            left: 16px;
          }
          .forma-clip-path {
            clip-path: url(#forma-clip-mobile);
            -webkit-clip-path: url(#forma-clip-mobile);
          }
        }
      `}</style>

      {/* logo na abertura superior — desktop: centralizado no recorte */}
      <a
        href="/"
        aria-label="TOP20 — Móveis de Valor"
        className="hidden lg:flex"
        style={{
          position: "absolute",
          top: `${(16 / 530) * 100}%`, // metade da profundidade do recorte (32/2)
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: BLACK,
          textDecoration: "none",
          lineHeight: 1,
          userSelect: "none",
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
            <span key={i}>{c === " " ? " " : c}</span>
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
