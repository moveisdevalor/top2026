import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { VoteForm } from "@/components/VoteForm";

export const metadata: Metadata = {
  title: "Votar — Fornecedores | TOP 20 Móveis de Valor",
  description:
    "Vote nos fornecedores mais importantes da indústria moveleira.",
};

const sugestoes = [
  "Duratex",
  "Eucatex",
  "Berneck",
  "Arauco",
  "Guararapes",
  "Masisa",
  "Hettich",
  "Blum",
  "Soprano",
  "Hafele",
  "FGV",
  "Indufix",
  "Karsten",
  "Sultextil",
  "Sayerlack",
  "Renner",
  "Sherwin-Williams",
];

export default function FornecedoresPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative bg-white text-[var(--color-ink)] overflow-hidden">
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-16 pb-6 sm:pb-10 text-center">
            <div className="inline-flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-12 h-px bg-[var(--color-line)]" />
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] font-semibold"
                style={{ color: "#4aa0c8" }}
              >
                QUEM ABASTECE
              </span>
              <span className="w-8 sm:w-12 h-px bg-[var(--color-line)]" />
            </div>
          </div>

          <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 pb-10 sm:pb-12 text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] mb-5 sm:mb-6 max-w-2xl mx-auto text-balance">
              Quem são os <span style={{ color: "#4aa0c8" }}>20 fornecedores</span> mais importantes da sua indústria?
            </h1>

            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full mb-5 sm:mb-6 text-[11px] sm:text-xs font-bold tracking-wide" style={{ background: "#4aa0c815", color: "#4aa0c8" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
              VOTAÇÃO EXCLUSIVA PARA INDÚSTRIAS
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-8 text-[15px] sm:text-base md:text-lg">
              Como <strong className="text-[var(--color-ink)]">indústria</strong>, você pode indicar até <strong className="text-[var(--color-ink)]">05 marcas de fornecedor</strong>, atribuindo a cada uma nota entre <strong className="text-[var(--color-ink)]">5 e 10 pontos</strong>.
            </p>

          </div>
        </section>

        <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-line-soft)]">
          <VoteForm
            area="fornecedores"
            voterLabel="Indústria"
            voteSubject="fornecedor"
            brandSuggestions={sugestoes}
          />
        </section>
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
