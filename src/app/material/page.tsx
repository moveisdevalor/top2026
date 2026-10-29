import type { Metadata } from "next";
import { HeroForma } from "@/components/HeroForma";
import { Footer } from "@/components/HomeSections";
import { AZUL } from "@/components/DesignSystem";
import { MATERIAIS } from "@/lib/materiais";

export const metadata: Metadata = {
  title: "Material de divulgação — TOP 20 Móveis de Valor",
  description:
    "Baixe selos, artes e peças oficiais do prêmio TOP 20 para divulgar sua marca.",
};

export default function MaterialPage() {
  return (
    <>
      <main>
        <HeroForma>
          <p className="text-[11px] tracking-[0.3em] text-white/60 mb-4">DIVULGAÇÃO</p>
          <h1 className="font-black text-[2.25rem] sm:text-5xl md:text-6xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6 text-balance">
            Material de<br />
            <span style={{ color: "var(--azul-claro)" }}>divulgação</span>
          </h1>
          <p className="text-white/75 leading-relaxed max-w-xl mx-auto text-[15px] sm:text-base">
            Selos, artes e peças oficiais do prêmio TOP 20 para você divulgar sua
            participação e reconhecimento nos seus canais.
          </p>
        </HeroForma>

        <section className="relative bg-white overflow-hidden">
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            {MATERIAIS.length === 0 ? (
              <div className="text-center rounded-3xl border border-[var(--color-line)] px-6 py-8 text-[var(--color-muted)] text-sm leading-relaxed">
                Os materiais de divulgação estarão disponíveis em breve. Volte mais
                tarde ou fale com a organização do prêmio.
              </div>
            ) : (
              <div className="rounded-3xl border border-[var(--color-line)] overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {MATERIAIS.map((m) => (
                      <tr
                        key={m.arquivo}
                        className="border-b border-[var(--color-line)] last:border-0"
                      >
                        <td className="px-5 py-4 text-[var(--color-ink)]">
                          <span className="font-bold tracking-tight block">{m.titulo}</span>
                          {m.formato && (
                            <span className="text-[10px] tracking-[0.15em] font-semibold uppercase text-[var(--color-muted)]">
                              {m.formato}
                              {m.tamanho ? ` · ${m.tamanho}` : ""}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <a
                            href={m.arquivo}
                            download
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                            style={{ color: AZUL }}
                          >
                            Baixar
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
