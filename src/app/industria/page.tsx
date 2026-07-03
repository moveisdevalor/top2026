import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/HomeSections";
import { VoteForm } from "@/components/VoteForm";
import { HeroCard } from "@/components/DesignSystem";

export const metadata: Metadata = {
  title: "Votar — Indústria | TOP 20 Móveis de Valor",
  description: "Vote nas indústrias de móveis mais admiradas do setor.",
};

const sugestoes = [
  "Móveis Alpha",
  "Lopas",
  "Henn",
  "Madesa",
  "Kappesberg",
  "Politorno",
  "Todeschini",
  "Dell Anno",
  "Florense",
  "Bontempo",
  "Sca",
  "Italínea",
  "Lider Interiores",
  "Artefacto",
  "Sierra Móveis",
  "Breton",
];

export default function IndustriaPage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <HeroCard>
          <p className="text-[11px] tracking-[0.3em] font-semibold mb-4 text-white/60">
            QUEM TRANSFORMA
          </p>

          <h1 className="font-black text-2xl sm:text-3xl md:text-5xl leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] mb-5 sm:mb-6 max-w-2xl mx-auto text-balance">
            Quem são as <span style={{ color: "#d4a017" }}>20 indústrias</span> mais importantes do setor?
          </h1>

          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full mb-5 sm:mb-6 text-[11px] sm:text-xs font-bold tracking-wide border border-white/25 text-white/85">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
            VOTAÇÃO EXCLUSIVA PARA LOJISTAS
          </div>

          <p className="text-white/75 leading-relaxed max-w-2xl mx-auto mb-2 text-[15px] sm:text-base md:text-lg">
            Como <strong className="text-white">lojista</strong>, você pode indicar até <strong className="text-white">05 marcas de indústria</strong>, atribuindo a cada uma nota entre <strong className="text-white">5 e 10 pontos</strong>.
          </p>
        </HeroCard>

        <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-line-soft)]">
          <VoteForm
            area="industria"
            voterLabel="Lojista"
            voteSubject="indústria"
            brandSuggestions={sugestoes}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
