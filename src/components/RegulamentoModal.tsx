"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { artigosIndustria, artigosFornecedor } from "@/lib/regulamentos";

// modal com o regulamento da área: lojistas votando em indústrias veem o
// regulamento de indústria; indústrias votando em fornecedores, o de fornecedor
export function RegulamentoModal({
  area,
  onClose,
}: {
  area: "industria" | "fornecedores";
  onClose: () => void;
}) {
  const artigos = area === "industria" ? artigosIndustria : artigosFornecedor;
  const titulo = area === "industria" ? "Indústria" : "Fornecedor";

  // trava o scroll da página enquanto a modal está aberta
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // portal no body: dentro do hero a modal seria cortada pelo clip-path do card
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Regulamento — ${titulo}`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-[720px] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4 border-b border-[var(--color-line-soft)]">
          <div>
            <h2 className="font-bold text-lg sm:text-xl tracking-tight text-[var(--color-ink)]">
              Regulamento do Ranking TOP 20
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Edição 2026 · {titulo}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-soft)] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 sm:px-8 py-5 space-y-5 text-[var(--color-ink)]">
          {artigos.map((a) => (
            <div key={a.num}>
              <p className="text-sm leading-relaxed">
                <strong className="font-bold">Art. {a.num} —</strong> {a.body}
              </p>
              {a.itens && (
                <ul className="mt-2 ml-5 list-disc text-sm leading-relaxed marker:text-[var(--color-muted)]">
                  {a.itens.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )}
              {a.paragrafos?.map((p) => (
                <p key={p.titulo} className="mt-2 ml-5 text-[13px] leading-relaxed text-[var(--color-muted)]">
                  <em className="font-semibold not-italic text-[var(--color-ink)]">{p.titulo} —</em> {p.body}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="px-6 sm:px-8 py-4 border-t border-[var(--color-line-soft)]">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
