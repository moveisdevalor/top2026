import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/HomeSections";
import { Rankings } from "@/components/Rankings";
import { HeroCard, LabelClaro, ChipAzulClaro } from "@/components/DesignSystem";

export const metadata: Metadata = {
  title: "Vencedores — TOP 20 Móveis de Valor",
  description: "As 20 marcas mais admiradas do setor moveleiro em 2026.",
};

export default function VencedoresPage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <HeroCard>
          <LabelClaro center>EDIÇÃO 2026</LabelClaro>
          <h1 className="font-black text-[2.25rem] sm:text-5xl md:text-7xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 text-balance">
            As <span style={{ color: "#d4a017" }}>20 marcas</span><br />
            mais <span style={{ color: "#7cc4e8" }}>admiradas</span><br />
            do setor moveleiro.
          </h1>

          <p className="text-white/75 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-[15px] sm:text-base md:text-lg">
            Resultado oficial do prêmio TOP 20, escolhido por voto direto de
            varejistas e empresários que vivem o dia a dia do setor.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["INDÚSTRIA", "FORNECEDORES", "ANÚNCIO OFICIAL"].map((t) => (
              <ChipAzulClaro key={t}>{t}</ChipAzulClaro>
            ))}
          </div>
        </HeroCard>

        <Rankings />
      </main>
      <Footer />
    </>
  );
}
