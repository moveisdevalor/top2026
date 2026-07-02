"use client";

import { useEffect, useState } from "react";

const linksLeft = [
  { href: "/sobre", label: "Sobre" },
  { href: "/vencedores", label: "Vencedores" },
  { href: "/#pilares", label: "Pilares" },
];

const linksRight = [
  { href: "/#categorias", label: "Categorias" },
  { href: "/#faq", label: "FAQ" },
  { href: "/regulamento", label: "Regulamento" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white text-[var(--color-ink)] border-b border-[var(--color-line-soft)]">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
        <nav className="hidden lg:flex items-center gap-7 flex-1">
          <a
            href="/industria"
            className="text-[11px] tracking-[0.25em] font-bold px-3 py-1.5 border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
          >
            INDÚSTRIA
          </a>
          {linksLeft.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="/" className="inline-flex flex-col items-stretch leading-none shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-[-0.04em] flex items-baseline gap-1.5 lg:justify-center">
            TOP
            <span style={{ color: "#d4a017" }}>20</span>
          </span>
          <span className="hidden lg:flex mt-0 justify-between text-[7px] font-bold text-[var(--color-muted)] uppercase w-full">
            {"MÓVEIS DE VALOR".split("").map((c, i) => (
              <span key={i}>{c === " " ? " " : c}</span>
            ))}
          </span>
          <span className="lg:hidden mt-0.5 text-[8px] font-bold text-[var(--color-muted)] uppercase tracking-[0.2em]">
            Móveis de Valor
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-end">
          {linksRight.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/fornecedores"
            className="text-[11px] tracking-[0.25em] font-bold px-3 py-1.5 border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
          >
            FORNECEDORES
          </a>
        </nav>

        <button
          aria-label="Menu"
          aria-expanded={open}
          className="lg:hidden -mr-2 w-11 h-11 inline-flex flex-col items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block w-5 h-px bg-[var(--color-ink)] transition-transform ${
              open ? "translate-y-1 rotate-45" : "mb-1"
            }`}
          />
          <span
            className={`block w-5 h-px bg-[var(--color-ink)] transition-transform ${
              open ? "-translate-y-px -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white overflow-y-auto border-t border-[var(--color-line-soft)] px-5 py-6 space-y-1">
          <a
            href="/industria"
            onClick={() => setOpen(false)}
            className="block py-3 text-[11px] tracking-[0.25em] font-bold text-[var(--color-ink)]"
          >
            INDÚSTRIA
          </a>
          {linksLeft.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/fornecedores"
            onClick={() => setOpen(false)}
            className="block py-3 mt-2 text-[11px] tracking-[0.25em] font-bold border-t border-[var(--color-line-soft)] text-[var(--color-ink)]"
          >
            FORNECEDORES
          </a>
          {linksRight.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
