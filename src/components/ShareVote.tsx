"use client";

import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Gera uma arte 1080x1920 (formato story do Instagram) com o logo TOP20, a
// cadeira da campanha e uma mensagem de "eu já votei" convidando outras pessoas.
// Dois templates: "padrão" (mensagem genérica) e "marcas" (lista as marcas
// votadas). Oferece Compartilhar (Web Share API, no celular) com fallback de
// download.

type Template = "padrao" | "marcas";

type VotoFeito = { marca: string; nota: number };

type Props = {
  /** Ajusta o botão para o fundo azul do hero. */
  onDark?: boolean;
  /** Votos feitos, na ordem — habilita o template "Minhas marcas". */
  votos?: VotoFeito[];
  /** Cor de destaque (badge, estrelas, nota), a mesma do card "Seus votos". */
  accent?: string;
  /** Categoria de quem votou — define o lado da cadeira, igual ao hero
   *  (indústrias → direita, fornecedores → esquerda). */
  area?: "industria" | "fornecedores";
};

const W = 1080;
const H = 1920;
const SITE = "top20.moveisdevalor.com.br";
const TEAL = "#7fdcd4";

// Carrega uma imagem (same-origin) como Promise.
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Caminho de retângulo arredondado (o Canvas 2D roundRect não está disponível
// em todos os navegadores ainda, então desenhamos na mão com arcTo).
function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Encolhe a fonte até o texto caber em maxWidth; se nem no tamanho mínimo
// couber, trunca com reticências (nomes de marca têm tamanho imprevisível).
function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxSize: number, minSize = 22): string {
  let size = maxSize;
  const fonte = (s: number) => `900 ${s}px system-ui, 'Segoe UI', Arial, sans-serif`;
  ctx.font = fonte(size);
  while (size > minSize && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = fonte(size);
  }
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cortado = text;
  while (cortado.length > 1 && ctx.measureText(cortado + "…").width > maxWidth) {
    cortado = cortado.slice(0, -1);
  }
  return cortado + "…";
}

// Fundo + logos + cadeira: o mesmo em qualquer template. `cw` (largura da
// cadeira) varia por template — cada um tem uma folga vertical diferente até
// o texto que vem depois, medida com ctx.measureText (actualBoundingBoxAscent),
// não estimada, já que a linha de base do texto não é o topo real dos glifos.
async function desenhaBase(ctx: CanvasRenderingContext2D, lado: "esquerda" | "direita" | "centro", cw: number, cy = 420) {
  // Fundo: degradê da marca + brilho radial no topo. O canvas não resolve var()
  // do CSS, então estes literais precisam acompanhar a paleta do globals.css.
  const linear = ctx.createLinearGradient(0, 0, 0, H);
  linear.addColorStop(0, "#2ab3ad");
  linear.addColorStop(0.45, "#14807f");
  linear.addColorStop(1, "#063f45");
  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, -120, 80, W / 2, -120, 900);
  glow.addColorStop(0, "rgba(95,222,212,0.65)");
  glow.addColorStop(1, "rgba(95,222,212,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── Logo: só a TOP20 no topo (a Móveis de Valor vai no rodapé, com o
  // texto "Realização" — ver desenhaRealizacao) ──
  ctx.textAlign = "center";
  try {
    const top20 = await loadImage("/Logo_TOP20-crop.png");
    const lh = 230;
    const lw = (top20.width / top20.height) * lh;
    ctx.drawImage(top20, (W - lw) / 2, 70, lw, lh);
  } catch {
    // sem as imagens, cai no texto de antes
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 130px system-ui, 'Segoe UI', Arial, sans-serif";
    ctx.fillText("TOP20", W / 2, 260);
    ctx.font = "700 30px system-ui, 'Segoe UI', Arial, sans-serif";
    const antesSpacing = (ctx as any).letterSpacing;
    (ctx as any).letterSpacing = "14px";
    ctx.globalAlpha = 0.9;
    ctx.fillText("MÓVEIS DE VALOR", W / 2 + 7, 312);
    ctx.globalAlpha = 1;
    (ctx as any).letterSpacing = antesSpacing ?? "0px";
  }

  // ── Cadeira: cortada na borda, igual ao hero (indústrias → direita,
  // fornecedores → esquerda), só metade visível ──
  try {
    const chair = await loadImage("/chair-blue_copiar.png"); // a mesma poltrona teal da home
    const ch = (chair.height / chair.width) * cw;
    const cx = lado === "direita" ? W - cw / 2 : lado === "esquerda" ? -cw / 2 : (W - cw) / 2;
    // sombra suave atrás da cadeira
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 30;
    ctx.drawImage(chair, cx, cy, cw, ch);
    ctx.restore();
  } catch {
    // sem a imagem, segue só com texto
  }
}

// Pílula branca com o endereço do site — usada nos dois templates, só muda o Y.
function desenhaPilula(ctx: CanvasRenderingContext2D, y: number) {
  ctx.textAlign = "center";
  ctx.font = "700 42px system-ui, 'Segoe UI', Arial, sans-serif";
  const tw = ctx.measureText(SITE).width;
  const padX = 46;
  const pillW = tw + padX * 2;
  const pillH = 92;
  const pillX = (W - pillW) / 2;
  ctx.fillStyle = "#ffffff";
  roundedRectPath(ctx, pillX, y, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.fillStyle = "#14807f";
  ctx.fillText(SITE, W / 2, y + 61);
}

function desenhaHashtag(ctx: CanvasRenderingContext2D, y: number) {
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "700 34px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("#TOP20 #PrêmioTOP20", W / 2, y);
}

// Rodapé "REALIZAÇÃO" + logo Móveis de Valor — a arte já é branca e o fundo
// aqui é o degradê escuro, então ela assenta direto, sem o brightness(0) que
// o recorte do hero precisa (lá o fundo é branco).
async function desenhaRealizacao(ctx: CanvasRenderingContext2D, y: number) {
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "700 22px system-ui, 'Segoe UI', Arial, sans-serif";
  const antesSpacing = (ctx as any).letterSpacing;
  (ctx as any).letterSpacing = "4px";
  ctx.fillText("REALIZAÇÃO", W / 2 + 10, y);
  (ctx as any).letterSpacing = antesSpacing ?? "0px";

  try {
    const mv = await loadImage("/Logo_Moveis_de_Valor-2.png");
    const mh = 85;
    const mw = (mv.width / mv.height) * mh;
    ctx.drawImage(mv, (W - mw) / 2, y + 18, mw, mh);
  } catch {
    // sem a imagem, fica só o texto
  }
}

// Template "padrão": mensagem genérica de convite, sem citar as marcas.
// O headline fica no meio vertical do canvas (H/2=960), por cima da cadeira —
// a sombra no texto (mesmo truque de legenda sobre foto) garante leitura mesmo
// assim, como o hero já faz cobrindo a cadeira com o painel do formulário.
async function desenhaPadrao(ctx: CanvasRenderingContext2D) {
  ctx.textAlign = "center";
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 96px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("EU JÁ VOTEI!", W / 2, 920);
  ctx.fillStyle = TEAL;
  ctx.fillText("E VOCÊ?", W / 2, 1020);
  ctx.restore();

  // colado no headline (mesmo grupo visual: "EU JÁ VOTEI! E VOCÊ?" + convite),
  // não mais lá embaixo perto do rodapé — por isso a sombra, a cadeira passa
  // por trás dele também
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "500 40px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Vote você também nas marcas mais", W / 2, 1140);
  ctx.fillText("admiradas do setor moveleiro.", W / 2, 1192);
  ctx.restore();

  // (sem hashtag aqui: dá mais respiro pro rodapé "Realização" logo abaixo)
  desenhaPilula(ctx, 1500);
  await desenhaRealizacao(ctx, 1642);
}

// Template "minhas marcas": lista os votos no mesmo desenho de cartão do
// bloco "Seus votos" do formulário — card branco, badge numerado na cor da
// área, estrelas e nota — para a arte parecer a mesma coisa que já existe.
async function desenhaMarcas(ctx: CanvasRenderingContext2D, votos: VotoFeito[], accent: string) {
  // headline perto do meio vertical do canvas (H/2=960), por cima da cadeira:
  // a sombra no texto garante leitura mesmo assim (os cards da lista abaixo já
  // são opacos, cobrem qualquer coisa por trás sem precisar de cuidado especial)
  ctx.textAlign = "center";
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 5;
  // mesmo tamanho de fonte (96px) e posição do headline do template "Padrão",
  // pra manter a mesma identidade visual entre os dois
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 96px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("EU JÁ VOTEI!", W / 2, 920);
  // accent (dourado/azul da área) em vez do TEAL: contra o fundo e a cadeira,
  // que também são teal, o TEAL claro tinha pouco contraste e sumia — accent
  // além de destacar, já é a mesma cor do badge/estrelas da lista abaixo
  ctx.fillStyle = accent;
  ctx.fillText("E VOCÊ?", W / 2, 1020);
  ctx.restore();

  // pílulas do tamanho do próprio texto (chip) — vidro translúcido, o mesmo
  // efeito das abas "Padrão"/"Minhas marcas" e do seletor Indústrias/Fornecedores
  // do site (bg-white/10 border border-white/25): fundo branco a 10%, borda a 25%.
  // Ficam lado a lado (como um flex-wrap), quebrando linha quando não cabe mais.
  const rowH = 56;
  const rowGapY = 16;
  const gapX = 14;
  const rowTop0 = 1385; // cadeira do tamanho do Padrão desce bem mais, empurra a lista
  const padX = 32;
  const maxRowWidth = 900; // largura útil da linha (canvas tem 1080px)
  const maxPillTextWidth = 320; // teto de texto por pílula, pra caber mais de uma por linha

  ctx.textAlign = "center";

  // mede cada pílula com o próprio tamanho de fonte (fitText encolhe nomes
  // longos) e guarda a fonte usada, já que cada uma pode sair em um tamanho
  const pilulas = votos.map(({ marca }) => {
    const texto = fitText(ctx, marca, maxPillTextWidth, 30, 17);
    const font = ctx.font; // fitText deixa o ctx.font já ajustado ao texto retornado
    const pillW = ctx.measureText(texto).width + padX * 2;
    return { texto, font, pillW };
  });

  // empacota as pílulas em linhas, respeitando a largura máxima da linha
  const linhas: (typeof pilulas)[] = [];
  let linhaAtual: typeof pilulas = [];
  let larguraAtual = 0;
  for (const p of pilulas) {
    const proximaLargura = linhaAtual.length === 0 ? p.pillW : larguraAtual + gapX + p.pillW;
    if (proximaLargura > maxRowWidth && linhaAtual.length > 0) {
      linhas.push(linhaAtual);
      linhaAtual = [p];
      larguraAtual = p.pillW;
    } else {
      linhaAtual.push(p);
      larguraAtual = proximaLargura;
    }
  }
  if (linhaAtual.length > 0) linhas.push(linhaAtual);

  ctx.textBaseline = "middle";
  let rowY = rowTop0;
  for (const linha of linhas) {
    const larguraLinha = linha.reduce((s, p) => s + p.pillW, 0) + gapX * (linha.length - 1);
    const cy = rowY + rowH / 2;
    let x = (W - larguraLinha) / 2;

    for (const p of linha) {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;
      roundedRectPath(ctx, x, rowY, p.pillW, rowH, rowH / 2);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fill();
      ctx.restore();

      roundedRectPath(ctx, x, rowY, p.pillW, rowH, rowH / 2);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.font = p.font;
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(p.texto, x + p.pillW / 2, cy + 1);
      ctx.restore();

      x += p.pillW + gapX;
    }
    rowY += rowH + rowGapY;
  }
  ctx.textBaseline = "alphabetic";

  // sem hashtag aqui (a lista já é o conteúdo principal): a pílula do site e o
  // rodapé "Realização" cabem melhor, e com respiro de verdade, sem ela
  const listaBase = rowY - rowGapY;
  desenhaPilula(ctx, listaBase + 45);
  await desenhaRealizacao(ctx, listaBase + 45 + 92 + 45);
}

// Desenha a arte no canvas e devolve um Blob PNG.
async function desenhaArte(
  template: Template,
  votos: VotoFeito[],
  accent: string,
  lado: "esquerda" | "direita" | "centro",
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const temMarcas = template === "marcas" && votos.length > 0;
  // O texto tem sombra própria (ver desenhaPadrao/desenhaMarcas), então a
  // cadeira pode passar por trás dele sem perder legibilidade — o limite real
  // agora é não invadir os cards da lista de marcas (que são opacos, mas
  // "vazar" a cadeira entre eles ficaria estranho) ou o fim do canvas.
  // Cadeira do mesmo tamanho nos dois templates; no "marcas" ela começa mais
  // acima (cy menor) pra sobrar espaço pra lista de marcas + rodapé abaixo.
  await desenhaBase(ctx, lado, 1150, temMarcas ? 340 : 420);

  if (temMarcas) {
    await desenhaMarcas(ctx, votos, accent);
  } else {
    await desenhaPadrao(ctx);
  }

  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob falhou"))), "image/png"),
  );
}

export function ShareVote({ onDark = false, votos = [], accent = "#14807f", area }: Props) {
  const [template, setTemplate] = useState<Template>("padrao");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const blobsRef = useRef<Partial<Record<Template, Blob>>>({});

  const temVotos = votos.length > 0;
  // mesmo critério do hero: indústrias → cadeira na direita, fornecedores → esquerda
  const lado = area === "industria" ? "direita" : area === "fornecedores" ? "esquerda" : "centro";

  const gerar = useCallback(
    async (t: Template) => {
      const existente = blobsRef.current[t];
      if (existente) return existente;
      const blob = await desenhaArte(t, votos, accent, lado);
      blobsRef.current[t] = blob;
      return blob;
    },
    [votos, accent, lado],
  );

  // botão principal: gera a arte e abre o modal com a prévia, sem compartilhar ainda
  const abrirModal = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await gerar(template);
      setPreview((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(blob);
      });
      setModalAberto(true);
    } finally {
      setBusy(false);
    }
  }, [gerar, template]);

  const fecharModal = () => setModalAberto(false);

  // troca Sim/Não dentro do modal: regenera a prévia pro template escolhido
  const escolherTemplate = useCallback(
    async (t: Template) => {
      setTemplate(t);
      setBusy(true);
      try {
        const blob = await gerar(t);
        setPreview((old) => {
          if (old) URL.revokeObjectURL(old);
          return URL.createObjectURL(blob);
        });
      } finally {
        setBusy(false);
      }
    },
    [gerar],
  );

  const compartilhar = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await gerar(template);
      const file = new File([blob], "top20-eu-votei.png", { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({
          files: [file],
          title: "Prêmio TOP 20",
          text: "Eu já votei no TOP 20! Vote você também: " + SITE,
        });
      } else {
        // fallback: baixa a imagem
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "top20-eu-votei.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // usuário cancelou ou share indisponível — ignora
    } finally {
      setBusy(false);
    }
  }, [gerar, template]);

  // dentro do modal o fundo é sempre o overlay escuro, então o estilo não
  // depende de onDark (diferente do resto do componente)
  const tabClass = (ativo: boolean) =>
    `flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
      ativo ? "bg-white text-[var(--azul)]" : "text-white/70 hover:text-white"
    }`;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={abrirModal}
        disabled={busy}
        className={
          onDark
            ? "w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[var(--azul)] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors disabled:opacity-60"
            : "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        }
      >
        <InstagramIcon />
        {busy ? "Gerando arte..." : "Compartilhar no Instagram"}
      </button>

      {modalAberto &&
        preview &&
        createPortal(
          // portal pro <body>: algumas telas (ex. hero da home) têm um
          // ancestral com clip-path, que cria um novo containing block pra
          // position:fixed e prendia o modal dentro da forma azul do hero
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={fecharModal}
          >
            <div className="relative max-w-[380px] w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={fecharModal}
                aria-label="Fechar"
                className="absolute -top-3 -right-3 w-9 h-9 grid place-items-center rounded-full bg-white text-[var(--color-ink)] shadow-lg"
              >
                <CloseIcon />
              </button>
              <img
                src={preview}
                alt="Arte para compartilhar: Eu já votei no TOP 20"
                className="w-full rounded-2xl shadow-2xl"
                style={{ display: "block" }}
              />
              {temVotos && (
                <div className="mt-4">
                  <p className="text-xs font-semibold mb-2 text-white/85">
                    Deseja compartilhar as marcas?
                  </p>
                  <div className="flex gap-1 p-1 rounded-full bg-white/10 border border-white/25">
                    <button
                      type="button"
                      onClick={() => escolherTemplate("marcas")}
                      className={tabClass(template === "marcas")}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => escolherTemplate("padrao")}
                      className={tabClass(template === "padrao")}
                    >
                      Não
                    </button>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={compartilhar}
                disabled={busy}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--azul)] text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors disabled:opacity-60"
              >
                <InstagramIcon />
                {busy ? "Enviando..." : "Compartilhar"}
              </button>
              <p className="mt-2 text-center text-[11px] text-white/70">
                Se o compartilhamento não abrir, a imagem foi baixada. Poste no seu story.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
