import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/HomeSections";
import { HeroCard, LabelClaro } from "@/components/DesignSystem";
import { Regulamento } from "@/components/Regulamento";
import { artigosIndustria, artigosFornecedor } from "@/lib/regulamentos";

export const metadata: Metadata = {
  title: "Regulamento — TOP 20 Móveis de Valor",
  description: "Regulamento do ranking TOP 20 · Edição 2026.",
};

export default function RegulamentoIndexPage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <HeroCard>
          <LabelClaro center>REGULAMENTO · EDIÇÃO 2026</LabelClaro>
          <h1 className="font-black text-3xl sm:text-4xl md:text-6xl leading-[1.05] sm:leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6 text-balance">
            Regulamento do<br />
            <span style={{ color: "#d4a017" }}>TOP 20</span> 2026
          </h1>
          <p className="text-white/75 leading-relaxed max-w-2xl mx-auto text-[15px] sm:text-base md:text-lg">
            Consulte abaixo o regulamento de Indústria e o de Fornecedor.
          </p>
        </HeroCard>

        <Regulamento
          area="industria"
          voterLabel="Indústria"
          brandLabel="indústrias de móveis e colchões"
          data={artigosIndustria}
        />
        <Regulamento
          area="fornecedor"
          voterLabel="Fornecedor"
          brandLabel="fornecedores das indústrias do mobiliário"
          data={artigosFornecedor}
        />
      </main>
      <Footer />
    </>
  );
}
