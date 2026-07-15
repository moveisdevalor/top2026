"use client";

import { useCallback, useRef, useState } from "react";

// Gera uma arte 1080x1920 (formato story do Instagram) com o logo TOP20, a
// cadeira da campanha e uma mensagem de "eu já votei" convidando outras pessoas.
// Oferece Compartilhar (Web Share API, no celular) com fallback de download.

type Props = {
  /** Ajusta o botão para o fundo azul do hero. */
  onDark?: boolean;
};

const W = 1080;
const H = 1920;
const SITE = "top20.moveisdevalor.com.br";

// Carrega uma imagem (same-origin) como Promise.
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Desenha a arte no canvas e devolve um Blob PNG.
async function desenhaArte(): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Fundo: degradê azul da marca + brilho radial no topo.
  const linear = ctx.createLinearGradient(0, 0, 0, H);
  linear.addColorStop(0, "#2e6fe8");
  linear.addColorStop(0.45, "#1a4fd4");
  linear.addColorStop(1, "#0d2fa6");
  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, -120, 80, W / 2, -120, 900);
  glow.addColorStop(0, "rgba(91,156,246,0.65)");
  glow.addColorStop(1, "rgba(91,156,246,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── Logo TOP20 ──
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 130px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("TOP20", W / 2, 260);

  // "MÓVEIS DE VALOR" com letras espaçadas
  ctx.font = "700 30px system-ui, 'Segoe UI', Arial, sans-serif";
  const legenda = "MÓVEIS DE VALOR";
  const antesSpacing = (ctx as any).letterSpacing;
  (ctx as any).letterSpacing = "14px";
  ctx.globalAlpha = 0.9;
  ctx.fillText(legenda, W / 2 + 7, 312);
  ctx.globalAlpha = 1;
  (ctx as any).letterSpacing = antesSpacing ?? "0px";

  // ── Cadeira ──
  try {
    const chair = await loadImage("/chair-blue.png");
    const cw = 720;
    const ch = (chair.height / chair.width) * cw;
    const cx = (W - cw) / 2;
    const cy = 430;
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

  // ── Mensagem ──
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 96px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("EU JÁ", W / 2, 1300);
  ctx.fillStyle = "#7cc4e8";
  ctx.fillText("VOTEI!", W / 2, 1400);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "500 40px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Vote você também nas marcas mais", W / 2, 1500);
  ctx.fillText("admiradas do setor moveleiro.", W / 2, 1552);

  // ── Pílula com o site ──
  const pillText = SITE;
  ctx.font = "700 42px system-ui, 'Segoe UI', Arial, sans-serif";
  const tw = ctx.measureText(pillText).width;
  const padX = 46;
  const pillW = tw + padX * 2;
  const pillH = 92;
  const pillX = (W - pillW) / 2;
  const pillY = 1660;
  ctx.fillStyle = "#ffffff";
  const r = pillH / 2;
  ctx.beginPath();
  ctx.moveTo(pillX + r, pillY);
  ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, r);
  ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, r);
  ctx.arcTo(pillX, pillY + pillH, pillX, pillY, r);
  ctx.arcTo(pillX, pillY, pillX + pillW, pillY, r);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#1a4fd4";
  ctx.fillText(pillText, W / 2, pillY + 61);

  // ── Hashtag ──
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "700 34px system-ui, 'Segoe UI', Arial, sans-serif";
  ctx.fillText("#TOP20 #PrêmioTOP20", W / 2, 1820);

  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob falhou"))), "image/png"),
  );
}

export function ShareVote({ onDark = false }: Props) {
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const blobRef = useRef<Blob | null>(null);

  const gerar = useCallback(async () => {
    if (blobRef.current) return blobRef.current;
    const blob = await desenhaArte();
    blobRef.current = blob;
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(blob);
    });
    return blob;
  }, []);

  const compartilhar = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await gerar();
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
  }, [gerar]);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={compartilhar}
        disabled={busy}
        className={
          onDark
            ? "w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors disabled:opacity-60"
            : "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        }
      >
        <InstagramIcon />
        {busy ? "Gerando arte..." : "Compartilhar no Instagram"}
      </button>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Arte para compartilhar: Eu já votei no TOP 20"
            className="w-40 mx-auto rounded-xl shadow-lg"
          />
          <p className={`mt-2 text-center text-[11px] ${onDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
            Se o compartilhamento não abrir, a imagem foi baixada. Poste no seu story.
          </p>
        </div>
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
