"use client";

const AZUL = "#1e3fa8";

/* Menu invertido do hero (FormaShapeFull) para as páginas internas:
   onde era azul fica branco (barra), onde era branco fica azul (links, aba do logo).
   A aba central usa a mesma geometria do recorte superior do hero (180×32), preenchida. */
export function MenuInvertido() {
  return (
    <header className="relative z-50 bg-white border-t-4" style={{ borderTopColor: AZUL }}>
      <div className="relative max-w-[1400px] mx-auto pt-5 pb-3 px-8 flex items-center justify-between text-[13px]" style={{ color: AZUL }}>
        <nav className="hidden lg:flex items-center gap-6">
          <a href="/sobre" className="hover:opacity-70 transition-opacity">Sobre</a>
          <a href="/vencedores" className="hover:opacity-70 transition-opacity">Vencedores</a>
          <a href="/#pilares" className="hover:opacity-70 transition-opacity">Pilares</a>
        </nav>
        <nav className="hidden lg:flex items-center gap-5">
          <a href="/#categorias" className="hover:opacity-70 transition-opacity">Categorias</a>
          <a href="/#faq" className="hover:opacity-70 transition-opacity">FAQ</a>
          <a href="/regulamento" className="hover:opacity-70 transition-opacity">Regulamento</a>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#1e3fa8]/10 border border-[#1e3fa8]/25 flex items-center justify-center hover:bg-[#1e3fa8]/20 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.3v7h2.7z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#1e3fa8]/10 border border-[#1e3fa8]/25 flex items-center justify-center hover:bg-[#1e3fa8]/20 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="X" className="w-8 h-8 rounded-full bg-[#1e3fa8]/10 border border-[#1e3fa8]/25 flex items-center justify-center hover:bg-[#1e3fa8]/20 transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.7 3h2.9l-6.4 7.3L21.7 21h-5.9l-4.6-6-5.3 6H3l6.9-7.8L2.7 3h6l4.1 5.5L17.7 3zm-1 16.2h1.6L7.8 4.7H6L16.7 19.2z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* aba azul central: o "negativo" do recorte do hero, com o logo em branco
          (mesmas medidas do logo da home: TOP20 28px + micro 7px) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px]">
        <svg viewBox="0 0 180 32" className="w-full h-auto block" aria-hidden="true">
          <path d="M0 0 C22 0 23 32 45 32 H135 C157 32 158 0 180 0 Z" fill={AZUL} />
        </svg>
        <a
          href="/"
          aria-label="TOP20 — Móveis de Valor"
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{ textDecoration: "none", lineHeight: 1, userSelect: "none" }}
        >
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 900, fontSize: 28, letterSpacing: "-0.03em", textAlign: "center" }}>
              TOP20
            </span>
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: 7,
                textTransform: "uppercase",
                opacity: 0.85,
                marginTop: 3,
              }}
            >
              {"MÓVEIS DE VALOR".split("").map((c, i) => (
                <span key={i}>{c === " " ? " " : c}</span>
              ))}
            </span>
          </span>
        </a>
      </div>
    </header>
  );
}
