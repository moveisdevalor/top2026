"use client";

import { useState } from "react";
import { FormaShapeFull } from "@/components/FormaShapeFull";

const linksMobile = [
  { href: "/", label: "Home" },
  { href: "/#pilares", label: "Sobre" },
  { href: "/#vencedores", label: "Vencedores" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#pilares", label: "Regulamento" },
  { href: "/material", label: "Material de divulgação" },
];

// Hero com a mesma forma azul da home (FormaShapeFull): recorte da logo no
// topo, menu e conteúdo centralizado. Usado nas páginas internas para manter a
// identidade da tela inicial.
export function HeroForma({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <section className="pt-1 pb-10 relative overflow-x-clip">
      <FormaShapeFull compact menuAberto={menuAberto} onMenuClick={() => setMenuAberto(!menuAberto)}>
        {/* menu nas laterais do recorte superior (igual à home) */}
        <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-full max-w-[1400px] z-20 hidden lg:flex items-center justify-between px-20 pt-4 text-[13px] text-white/85">
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/#pilares" className="hover:text-white transition-colors">Sobre</a>
            <a href="/#vencedores" className="hover:text-white transition-colors">Vencedores</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="/#pilares" className="hover:text-white transition-colors">Regulamento</a>
            <a href="/material" className="hover:text-white transition-colors">Material</a>
            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com/MoveisdeValor" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.3v7h2.7z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/moveisdevalor/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/revistamoveisdevalor/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 5A1.94 1.94 0 1 1 3.06 5a1.94 1.94 0 0 1 3.88 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {/* conteúdo do hero, centralizado na forma */}
        <div className="relative z-10 w-full self-center text-white text-center max-w-[1040px] mx-auto py-10">
          {children}
        </div>
      </FormaShapeFull>

      {/* painel do menu mobile: abre abaixo do recorte com o botão de menu */}
      {menuAberto && (
        <div className="lg:hidden absolute top-16 right-4 z-30 bg-white rounded-2xl shadow-xl px-5 py-4 space-y-1 min-w-[200px]">
          {linksMobile.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuAberto(false)}
              className="block py-2.5 text-base text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
