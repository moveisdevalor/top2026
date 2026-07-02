import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/Sections";
import { Rankings } from "@/components/Rankings";

export const metadata: Metadata = {
  title: "Vencedores — TOP 20 Móveis de Valor",
  description: "As 20 marcas mais admiradas do setor moveleiro em 2026.",
};

export default function VencedoresPage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <section className="relative bg-white text-[var(--color-ink)] overflow-hidden">
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-16 pb-6 sm:pb-10 text-center">
            <div className="inline-flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-12 h-px bg-[var(--color-line)]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-[var(--color-muted)] font-semibold">
                EDIÇÃO 2026
              </span>
              <span className="w-8 sm:w-12 h-px bg-[var(--color-line)]" />
            </div>
          </div>

          <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 pb-10 sm:pb-12 text-center">
            <h1 className="font-bold text-[2.25rem] sm:text-5xl md:text-7xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 text-balance">
              As <span style={{ color: "#d4a017" }}>20 marcas</span><br />
              mais <span style={{ color: "#4aa0c8" }}>admiradas</span><br />
              do setor moveleiro.
            </h1>

            <p className="text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-[15px] sm:text-base md:text-lg">
              Resultado oficial do prêmio TOP 20, escolhido por voto direto de
              varejistas e empresários que vivem o dia a dia do setor.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {["INDÚSTRIA", "FORNECEDORES", "ANÚNCIO OFICIAL"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </section>

        <Rankings />
      </main>
      <Footer />
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] font-semibold border border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-bg-soft)]">
      {children}
    </span>
  );
}
