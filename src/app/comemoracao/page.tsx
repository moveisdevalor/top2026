import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/HomeSections";
import { Comemoracao } from "@/components/Comemoracao";
import { HeroCard, LabelClaro, PillContorno } from "@/components/DesignSystem";

export const metadata: Metadata = {
  title: "Obrigado por votar — TOP 20 Móveis de Valor",
  description:
    "Seu voto foi registrado. Reveja a celebração e os vencedores da última edição do prêmio TOP 20.",
};

export default function ComemoracaoPage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <HeroCard>
          <LabelClaro center>VOTO REGISTRADO</LabelClaro>
          <h1 className="font-black text-[2.25rem] sm:text-5xl md:text-7xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 text-balance">
            Obrigado por<br />
            <span style={{ color: "#7cc4e8" }}>reconhecer</span> quem<br />
            faz o setor girar.
          </h1>

          <p className="text-white/75 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-[15px] sm:text-base md:text-lg">
            Sua indicação entra na apuração do TOP 20 de 2026. Enquanto o
            resultado não sai, relembre a celebração da última edição e as
            marcas que o setor escolheu.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <PillContorno href="/">Voltar à home</PillContorno>
          </div>
        </HeroCard>

        <Comemoracao />
      </main>
      <Footer />
    </>
  );
}
