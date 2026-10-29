"use client";

import { useEffect, useRef, useState } from "react";

const AZUL = "var(--azul)";
const BLACK = "#131313";

// Variante de largura total da FormaShape: a forma ocupa 100% da tela,
// mas o conteúdo fica num wrapper interno centralizado (máx. 1400px),
// mantendo as posições que tinha na versão em card.
// Sem cantos arredondados nem abas laterais — só o recorte superior e a aba inferior.
// Recorte do desktop. O desenho original (profundidade 44, transição em S de 45
// e trecho reto de 90, em unidades da caixa 880×530) é a referência: mexer só na
// profundidade deixa a curva íngreme, porque a transição continua com a largura
// de antes. Então o recorte inteiro é ESCALADO por um fator k — profundidade,
// transição e trecho reto juntos —, o que mantém a silhueta idêntica, só maior.
// A proporção entre estes três é o que define a silhueta: transição de 45 para
// profundidade de 32 é a curva longa e macia do desenho original. Aumentar a
// profundidade sem mexer na transição (o que eu tinha feito) deixa a curva
// íngreme — por isso a escala é uniforme, nunca só a profundidade.
const NOTCH_DEPTH = 32; // profundidade natural, em unidades da caixa
const NOTCH_TRANS = 45; // largura de cada transição em S
const NOTCH_FLAT_HALF = 45; // metade do trecho reto
const NOTCH_CX = 440; // centro horizontal
// k é calculado a partir da altura do card: a profundidade natural é
// proporcional a ela, então num notebook de tela baixa o recorte (e a logo
// dentro dele) ficaria pequeno demais. O piso/teto em px de tela corrige isso —
// em monitor grande k fica ~1 e o desenho é o original.
const NOTCH_DEPTH_MIN_PX = 72;

// fator de escala do recorte, a partir da altura do card em px
function notchScale(h: number) {
  if (!h) return 1;
  const natural = (NOTCH_DEPTH / 530) * h; // profundidade natural, em px de tela
  return Math.max(NOTCH_DEPTH_MIN_PX / natural, 1);
}

// kProfundidade escala só a profundidade (d): calculado a partir da altura
// REAL do card, para a profundidade em px ficar sempre legível (mín. 72px),
// seja no card cheio da home ou no compact das páginas internas.
// kLargura escala a transição e o trecho reto (t, f): calculado a partir da
// altura da hero CHEIA (não da altura real do card), para o recorte ter
// sempre a mesma largura na tela — senão o compact (mais baixo) puxava um
// kProfundidade maior para compensar a altura menor, e como t/f usavam o
// mesmo k, o recorte saía bem mais largo/achatado que o da home.
function buildDesktopPath(kProfundidade: number, kLargura: number) {
  const d = NOTCH_DEPTH * kProfundidade;
  const t = NOTCH_TRANS * kLargura;
  const f = NOTCH_FLAT_HALF * kLargura;
  const ini = NOTCH_CX - f - t; // onde a descida começa
  const fim = NOTCH_CX + f + t; // onde a subida termina
  return [
    "M0 0",
    // recorte superior: mesma curva de sempre, escalada por k
    `H${ini} C${ini + t / 2} 0 ${ini + t / 2 + kLargura} ${d} ${NOTCH_CX - f} ${d}`,
    `H${NOTCH_CX + f} C${fim - t / 2 - kLargura} ${d} ${fim - t / 2} 0 ${fim} 0`,
    "H880 V500",
    "H495 C470 500 468 529 440 529 C412 529 410 500 385 500", // aba inferior (convexa, para baixo)
    "H0 Z",
  ].join(" ");
}

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
// recortes laterais das setas do slider: mesmo desenho do recorte da logo
// (rebaixo reto com transições suaves em S), virado para a borda lateral e
// centralizado verticalmente no card. Medidas em px de tela.
const SIDE_NOTCH_DEPTH_PX = 30; // profundidade do rebaixo
const SIDE_NOTCH_FLAT_PX = 40; // trecho reto (onde a seta fica)
const SIDE_NOTCH_TRANS_PX = 48; // altura de cada transição em S

function buildMobilePath(
  w: number,
  h: number,
  notches: { left?: boolean; right?: boolean } = {},
) {
  const sx = w / 880;
  const sy = h / 530;
  const rx = 40 / sx;
  const ry = 40 / sy;
  const d = 66 / sy; // profundidade do recorte da logo
  const D = SIDE_NOTCH_DEPTH_PX / sx;
  const F = SIDE_NOTCH_FLAT_PX / sy / 2; // metade do trecho reto
  const T = SIDE_NOTCH_TRANS_PX / sy;
  const cy = 265; // centro vertical do card
  const p = [
    `M0 ${d + ry}`,
    `C0 ${d + ry * 0.45} ${rx * 0.45} ${d} ${rx} ${d}`,
    `H350 C400 ${d} 445 0 490 0`,
    "H880",
  ];
  if (notches.right) {
    // borda direita, descendo (transições com o mesmo padrão do recorte da logo)
    p.push(
      `V ${cy - F - T}`,
      `C 880 ${cy - F - T + 0.36 * T} ${880 - D} ${cy - F - T + 0.68 * T} ${880 - D} ${cy - F}`,
      `V ${cy + F}`,
      `C ${880 - D} ${cy + F + 0.32 * T} 880 ${cy + F + 0.64 * T} 880 ${cy + F + T}`,
    );
  }
  p.push("V530 H0");
  if (notches.left) {
    // borda esquerda, subindo
    p.push(
      `V ${cy + F + T}`,
      `C 0 ${cy + F + T - 0.36 * T} ${D} ${cy + F + T - 0.68 * T} ${D} ${cy + F}`,
      `V ${cy - F}`,
      `C ${D} ${cy - F - 0.32 * T} 0 ${cy - F - 0.64 * T} 0 ${cy - F - T}`,
    );
  }
  p.push("Z");
  return p.join(" ");
}

// Posição da logo no recorte do mobile. Ancorada pela ESQUERDA, não centrada:
// o bloco tem largura própria e, centrado numa % da largura, ele vazava para
// fora em telas estreitas (o centro anda, a largura não).
// A altura é fluida (vw) para o bloco encolher junto com o card — o limite à
// direita é a curva, que escala com a largura. Não é o fim do trecho reto: acima
// dele a curva ainda deixa branco (na altura da logo sobra até ~167px num card
// de 367). Medido no browser com isPointInFill, não estimado.
const NOTCH_LEFT_PCT = 4.5;
const NOTCH_LOGO_H = "clamp(28px, 9vw, 40px)";
// centro do recorte (66px de profundidade)
const NOTCH_TOP_PX = 33;

// Conteúdo do recorte: TOP20 + traço azul + Móveis de Valor.
// A arte da Móveis de Valor é branca chapada, e o recorte tem fundo branco, daí
// o brightness(0): deixa ela preta mantendo o recorte do alfa, no mesmo tom do
// "TOP 2026" da outra logo.
// No mobile a altura vem em px; no desktop o próprio <a> tem altura (que escala
// com o recorte) e as peças se medem em % dela.
function LogosDoRecorte({ altura }: { altura?: number }) {
  const h = (fracao: number) => (altura ? altura * fracao : `${fracao * 100}%`);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Logo_TOP20-crop.png" alt="TOP20 2026" style={{ height: h(1), width: "auto", display: "block" }} />
      <span
        aria-hidden="true"
        style={{
          width: 2,
          height: h(0.78),
          borderRadius: 1,
          background: "var(--azul)", // mesmo azul do fundo do hero
          flex: "none",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Logo_Moveis_de_Valor-2.png"
        alt="Móveis de Valor"
        style={{ height: h(0.75), width: "auto", display: "block", filter: "brightness(0)" }}
      />
    </>
  );
}

export function FormaShapeFull({
  children,
  menuAberto,
  onMenuClick,
  sideNotches,
  overlay,
  compact = false,
}: {
  children?: React.ReactNode;
  /** Estado do menu mobile (para animar o ícone hambúrguer no recorte). */
  menuAberto?: boolean;
  /** Clique no botão de menu mobile, dentro do recorte. */
  onMenuClick?: () => void;
  /** Recortes laterais para as setas do slider, por lado (só abaixo de md). */
  sideNotches?: { left?: boolean; right?: boolean };
  /** Conteúdo extra no frame não clipado do mobile (ex.: setas nos recortes). */
  overlay?: React.ReactNode;
  /** Altura reduzida (páginas internas), em vez de ocupar a tela toda. */
  compact?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  // path estático como fallback (SSR / antes da primeira medição)
  const [mobilePath, setMobilePath] = useState(PATH_MOBILE);
  // escala da profundidade do recorte (1 = desenho original): a partir da
  // altura REAL do card, para a profundidade em px (e o tamanho da logo, que
  // é % dela) ficarem sempre legíveis — inclusive no card mais baixo (compact).
  const [escalaProfundidade, setEscalaProfundidade] = useState(1);
  // escala da largura do recorte (transição + trecho reto): a partir da
  // altura da hero CHEIA (mesma fórmula do CSS não-compacto, nunca da altura
  // real do card), pra o recorte ter sempre a mesma largura na tela — senão o
  // compact puxava a mesma escala da profundidade e o recorte saía mais
  // largo/achatado que o da home.
  const [escalaLargura, setEscalaLargura] = useState(1);

  const notchLeft = !!sideNotches?.left;
  const notchRight = !!sideNotches?.right;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // os recortes das setas só existem enquanto o slider existe (abaixo de md)
    const mq = window.matchMedia("(max-width: 767px)");
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        setMobilePath(
          buildMobilePath(w, h, {
            left: notchLeft && mq.matches,
            right: notchRight && mq.matches,
          }),
        );
        setEscalaProfundidade(notchScale(h));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [notchLeft, notchRight]);

  useEffect(() => {
    function atualizarEscalaLargura() {
      setEscalaLargura(notchScale(Math.max(window.innerHeight - 20, 620)));
    }
    atualizarEscalaLargura();
    window.addEventListener("resize", atualizarEscalaLargura);
    return () => window.removeEventListener("resize", atualizarEscalaLargura);
  }, []);

  return (
    <div
      className={`forma-shape-wrapper${compact ? " forma-shape-compact" : ""}`}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <clipPath id="forma-clip-full" clipPathUnits="objectBoundingBox" transform={`scale(${1 / 880}, ${1 / 530})`}>
          <path d={buildDesktopPath(escalaProfundidade, escalaLargura)} />
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
"var(--grad)",
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
          className="flex flex-row items-center gap-2.5"
          style={{
            position: "absolute",
            top: NOTCH_TOP_PX,
            left: `${NOTCH_LEFT_PCT}%`,
            height: NOTCH_LOGO_H,
            transform: "translateY(-50%)",
            color: BLACK,
            textDecoration: "none",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "auto",
          }}
        >
          <LogosDoRecorte />
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

        {/* conteúdo extra fora do clip (ex.: setas do slider nos recortes laterais) */}
        {overlay}
      </div>

      {/* logo na abertura superior — desktop: centralizado no recorte */}
      <a
        href="/"
        aria-label="TOP20 — Móveis de Valor"
        className="hidden lg:flex"
        style={{
          position: "absolute",
          // a logo acompanha a profundidade do recorte: topo e altura em %
          // da caixa 880×530, usando a mesma escala de profundidade do path
          top: `${((NOTCH_DEPTH * escalaProfundidade) / 2 / 530) * 100}%`, // centro do recorte
          height: `${((NOTCH_DEPTH * escalaProfundidade * 0.72) / 530) * 100}%`, // 72% da profundidade: respiro em cima e embaixo
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: BLACK,
          textDecoration: "none",
          lineHeight: 1,
          userSelect: "none",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <LogosDoRecorte />
      </a>

      {/* seta para baixo na aba inferior: rola até a próxima section (só desktop) */}
      <button
        aria-label="Rolar para baixo"
        className="hidden lg:flex arrow-float"
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
