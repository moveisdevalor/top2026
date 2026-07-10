"use client";

import { useState } from "react";

const BLACK = "#131313";

const LINKS_MOBILE = [
  { href: "/", label: "Home" },
  { href: "/#pilares", label: "Sobre" },
  { href: "/#vencedores", label: "Vencedores" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#pilares", label: "Regulamento" },
  { href: "/material", label: "Material de divulgação" },
];

/* Menu das páginas internas no modelo do hero (FormaShapeFull): barra azul com
   o mesmo degradê do card, links brancos, sociais translúcidos e a logo escura
   dentro do recorte branco central — a mesma geometria do recorte superior do
   hero (180×32). No mobile, hambúrguer com painel branco, como na home. */
export function MenuInvertido() {
  const [aberto, setAberto] = useState(false);

  return (
    <header
      className="relative z-50"
      style={{
        background: "linear-gradient(160deg, #2e6fe8 0%, #1a4fd4 45%, #0d2fa6 100%)",
      }}
    >
      <div className="relative max-w-[1400px] mx-auto h-16 px-5 lg:px-8 flex items-center justify-between text-[13px] text-white/85">
        <nav className="hidden lg:flex items-center gap-6">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/#pilares" className="hover:text-white transition-colors">Sobre</a>
          <a href="/#vencedores" className="hover:text-white transition-colors">Vencedores</a>
        </nav>
        <nav className="hidden lg:flex items-center gap-5">
          <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="/#pilares" className="hover:text-white transition-colors">Regulamento</a>
          <a href="/material" className="hover:text-white transition-colors">Material</a>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.3v7h2.7z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="X" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.7 3h2.9l-6.4 7.3L21.7 21h-5.9l-4.6-6-5.3 6H3l6.9-7.8L2.7 3h6l4.1 5.5L17.7 3zm-1 16.2h1.6L7.8 4.7H6L16.7 19.2z" />
              </svg>
            </a>
          </div>
        </nav>

        {/* menu mobile: hambúrguer no azul, como no hero */}
        <button
          aria-label="Menu"
          aria-expanded={aberto}
          onClick={() => setAberto(!aberto)}
          className="lg:hidden ml-auto flex flex-col items-center justify-center gap-1 w-8 h-8"
        >
          <span className={`block w-4 h-0.5 bg-white transition-transform ${aberto ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`block w-4 h-0.5 bg-white transition-opacity ${aberto ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-0.5 bg-white transition-transform ${aberto ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* recorte central branco com a logo escura — o mesmo desenho do recorte
          superior do hero, aqui como "mordida" branca na barra azul */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] lg:w-[300px]">
        <svg viewBox="0 0 180 32" className="w-full h-auto block" aria-hidden="true">
          <path d="M0 0 C22 0 23 32 45 32 H135 C157 32 158 0 180 0 Z" fill="#fff" />
        </svg>
        <a
          href="/"
          aria-label="TOP20 — Móveis de Valor"
          className="absolute inset-0 flex items-start justify-center"
          style={{ color: BLACK, textDecoration: "none", lineHeight: 1, userSelect: "none" }}
        >
          <span style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
            <span className="text-[20px] lg:text-[24px]" style={{ fontWeight: 900, letterSpacing: "-0.03em", textAlign: "center" }}>
              TOP20
            </span>
            <span
              className="text-[5px] lg:text-[6px]"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                textTransform: "uppercase",
                opacity: 0.85,
                marginTop: 2,
              }}
            >
              {"MÓVEIS DE VALOR".split("").map((c, i) => (
                <span key={i}>{c === " " ? " " : c}</span>
              ))}
            </span>
          </span>
        </a>
      </div>

      {/* painel do menu mobile: branco, como na home */}
      {aberto && (
        <div className="lg:hidden absolute top-14 right-4 z-30 bg-white rounded-2xl shadow-xl px-5 py-4 space-y-1 min-w-[200px]">
          {LINKS_MOBILE.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setAberto(false)}
              className="block py-2.5 text-base text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
