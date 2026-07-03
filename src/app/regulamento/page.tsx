import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/HomeSections";
import { HeroCard, LabelClaro } from "@/components/DesignSystem";

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
            Escolha qual regulamento você quer consultar.
          </p>
        </HeroCard>

        <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-line-soft)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24 grid sm:grid-cols-2 gap-4 sm:gap-6">
            <RegCard
              href="/regulamento/industria"
              label="QUEM TRANSFORMA"
              title="Indústria"
              desc="Regras para lojistas que indicam as marcas de indústria de móveis e colchões."
              color="#d4a017"
            />
            <RegCard
              href="/regulamento/fornecedor"
              label="QUEM ABASTECE"
              title="Fornecedor"
              desc="Regras para indústrias que indicam as marcas de fornecedores do setor."
              color="#4aa0c8"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function RegCard({
  href,
  label,
  title,
  desc,
  color,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className="group block p-6 sm:p-8 rounded-2xl border border-[var(--color-line)] bg-white hover:border-[var(--color-primary)] transition-colors"
    >
      <div
        className="text-[11px] tracking-[0.3em] font-bold mb-3"
        style={{ color }}
      >
        {label}
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3">
        {title}
      </h3>
      <p className="text-[var(--color-muted)] leading-relaxed mb-5 sm:mb-6 text-[15px] sm:text-base">{desc}</p>
      <span
        className="inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color }}
      >
        Ler regulamento
        <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
