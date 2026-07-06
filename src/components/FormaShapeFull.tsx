"use client";

import { useEffect, useRef, useState } from "react";

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

// Mobile: vira um card com margem. O recorte da logo já começa na altura do
// canto esquerdo (sem subida antes dele — canto baixo, aguardando definição
// de quanto de arredondamento é aceitável ali). A transição de volta ao topo
// (depois da logo) é uma curva suave, com os pontos de controle bem
// espaçados entre si (não agrupados perto de um ponto): pontos de controle
// muito próximos criam uma quebra/ângulo no meio da curva em vez de uma
// transição lisa, e isso fica mais visível ainda por causa da escala não
// uniforme do clip-path (objectBoundingBox), que distorce o desenho.
const PATH_MOBILE = [
  // canto superior esquerdo arredondado (~40px na tela; raios diferentes em x/y
  // para compensar a escala não uniforme do clip-path)
  "M0 71",
  "C0 52 46 36 103 36",
  "H350 C400 36 445 0 490 0", // recorte da logo: mais curto, só o necessário para a logo
  "H880 V530",
  "H0 Z",
].join(" ");

// O clip-path (objectBoundingBox) estica o desenho junto com o card, então o
// PATH_MOBILE estático só fica certo perto de 375px de largura — em telas
// intermediárias (ex.: tablets) o canto vira uma elipse larga. Esta versão
// recalcula o path a partir do tamanho real do card: raio do canto (40px,
// igual ao border-radius) e profundidade do recorte (32px) são fixados em px
// de tela e convertidos de volta para as unidades da caixa 880×530.
function buildMobilePath(w: number, h: number) {
  const rx = 40 / (w / 880);
  const ry = 40 / (h / 530);
  const d = 44 / (h / 530); // profundidade do recorte da logo
  return [
    `M0 ${d + ry}`,
    `C0 ${d + ry * 0.45} ${rx * 0.45} ${d} ${rx} ${d}`,
    `H350 C400 ${d} 445 0 490 0`,
    "H880 V530",
    "H0 Z",
  ].join(" ");
}

// posição da logo dentro do recorte: horizontal em % (o recorte escala com a
// largura), vertical em px fixo (a profundidade do recorte é fixa em 44px de
// tela — % desalinharia quando o card cresce com o conteúdo)
const NOTCH_LEFT_PCT = (215 / 880) * 100;
// um pouco acima do centro do recorte (44px), para sobrar mais respiro
// entre a logo e a borda azul abaixo dela
const NOTCH_TOP_PX = 16;

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
  const cardRef = useRef<HTMLDivElement>(null);
  // path estático como fallback (SSR / antes da primeira medição)
  const [mobilePath, setMobilePath] = useState(PATH_MOBILE);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) setMobilePath(buildMobilePath(w, h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="forma-shape-wrapper"
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <clipPath id="forma-clip-full" clipPathUnits="objectBoundingBox" transform={`scale(${1 / 880}, ${1 / 530})`}>
          <path d={PATH_DESKTOP} />
        </clipPath>
        <clipPath id="forma-clip-mobile" clipPathUnits="objectBoundingBox" transform={`scale(${1 / 880}, ${1 / 530})`}>
          <path d={mobilePath} />
        </clipPath>
      </svg>

      {/* forma azul com recortes transparentes; o conteúdo fica dentro do clip.
          Abaixo de lg, vira um card com margem e o recorte fica largo.
          O card fica no fluxo normal (não absoluto) para que, no mobile, a
          altura acompanhe o conteúdo (ex.: formulário de voto empilhado). */}
      <div
        ref={cardRef}
        className="forma-card forma-clip-path"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #5b9cf6 0%, rgba(47,106,224,0.55) 40%, rgba(47,106,224,0) 65%), linear-gradient(160deg, #2e6fe8 0%, #1a4fd4 45%, #0d2fa6 100%)",
        }}
      >
        {/* wrapper interno: mantém o conteúdo na largura do card original */}
        <div
          className="forma-content-padding"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>

      {/* frame invisível com a MESMA margem/posição do card acima (sem clip nem
          fundo) — referência para a logo e o botão de menu ficarem exatamente
          na posição certa, já que no mobile o card tem inset em relação à
          caixa cheia. */}
      <div className="forma-frame lg:hidden" style={{ pointerEvents: "none" }}>
        {/* logo: dentro do recorte à esquerda (fundo branco do próprio card) */}
        <a
          href="/"
          aria-label="TOP20 — Móveis de Valor"
          className="flex flex-col items-center"
          style={{
            position: "absolute",
            top: NOTCH_TOP_PX,
            left: `${NOTCH_LEFT_PCT}%`,
            transform: "translate(-50%, -50%)",
            color: BLACK,
            textDecoration: "none",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "auto",
          }}
        >
          <span style={{ fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>TOP20</span>
          <span style={{ fontWeight: 700, fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginTop: 2, whiteSpace: "nowrap" }}>
            Móveis de Valor
          </span>
        </a>

        {/* menu: ícone simples, sem recorte nem fundo, direto sobre o azul */}
        <button
          aria-label="Menu"
          aria-expanded={menuAberto}
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1"
          style={{
            position: "absolute",
            top: 24,
            right: 20,
            width: 32,
            height: 32,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <span className={`block w-4 h-0.5 bg-white transition-transform ${menuAberto ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`block w-4 h-0.5 bg-white transition-opacity ${menuAberto ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-0.5 bg-white transition-transform ${menuAberto ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <style jsx>{`
        .forma-shape-wrapper {
          /* flow-root impede o margin do card de colapsar para fora do wrapper,
             o que desalinharia o frame de referência da logo/menu em 16px */
          display: flow-root;
          height: calc(100svh - 20px);
          min-height: 620px;
        }
        .forma-frame {
          position: absolute;
          inset: 0;
        }
        .forma-card {
          position: relative;
          height: 100%;
        }
        .forma-clip-path {
          clip-path: url(#forma-clip-full);
          -webkit-clip-path: url(#forma-clip-full);
        }
        .forma-content-padding {
          padding: 60px 80px;
        }
        @media (max-width: 1023px) {
          .forma-shape-wrapper {
            height: auto;
            min-height: 680px;
          }
          .forma-frame {
            top: 16px;
            right: 16px;
            bottom: 16px;
            left: 16px;
            border-radius: 40px;
            border-top-left-radius: 0;
          }
          .forma-card {
            height: auto;
            min-height: 648px;
            margin: 16px;
            border-radius: 40px;
            border-top-left-radius: 0;
          }
          .forma-clip-path {
            clip-path: url(#forma-clip-mobile);
            -webkit-clip-path: url(#forma-clip-mobile);
            overflow: hidden;
          }
          .forma-content-padding {
            padding: 40px 24px;
            min-height: 648px;
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

      {/* seta para baixo na aba inferior: rola até a próxima section (só desktop) */}
      <button
        aria-label="Rolar para baixo"
        className="hidden lg:flex"
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
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
}
