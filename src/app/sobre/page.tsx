import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/HomeSections";
import { HeroCard, LabelClaro, ChipAzulClaro, PillBranco, PillContorno, PillAzul, GRADIENTE, AZUL } from "@/components/DesignSystem";

export const metadata: Metadata = {
  title: "Sobre — TOP 20 Móveis de Valor",
  description:
    "O TOP 20 é o prêmio que consagra relevância, reputação e relacionamento no setor moveleiro.",
};

export default function SobrePage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <HeroCard>
          <LabelClaro center>SOBRE O PRÊMIO TOP 20</LabelClaro>

          <h1 className="font-black text-[2.25rem] sm:text-5xl md:text-7xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 text-balance">
            Vote agora e ajude<br className="hidden sm:block" /> a decidir quem é<br />
            <span style={{ color: "#d4a017" }}>TOP 20</span> de <span style={{ color: "#7cc4e8" }}>2026</span>.
          </h1>

          <p className="text-white/75 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-[15px] sm:text-base md:text-lg">
            A edição 2026 do TOP 20 é mais que um ranking — é o prêmio que
            consagra relevância, reputação e relacionamento no setor moveleiro.
            E quem define os vencedores é quem realmente entende o mercado:
            lojistas e compradores que vivem o dia a dia das vendas e dos
            desafios da indústria.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 mb-10 sm:mb-12">
            <PillBranco href="/industria">Votar agora</PillBranco>
            <PillContorno href="/vencedores">Ver vencedores</PillContorno>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["RELEVÂNCIA", "REPUTAÇÃO", "RELACIONAMENTO", "RECONHECIMENTO"].map((t) => (
              <ChipAzulClaro key={t}>{t}</ChipAzulClaro>
            ))}
          </div>
        </HeroCard>

        <section className="relative bg-white overflow-hidden">
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-28">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-16 items-center">
              <div>
                <p className="text-[11px] tracking-[0.3em] font-semibold mb-4" style={{ color: AZUL }}>
                  O PRÊMIO
                </p>
                <h2 className="font-black text-[2rem] sm:text-4xl md:text-6xl leading-[1.05] sm:leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 text-balance">
                  Quem transforma<br />o seu negócio<br />
                  <span style={{ color: AZUL }}>todos os dias?</span>
                </h2>
                <p className="text-[var(--color-muted)] leading-relaxed max-w-md mb-7 sm:mb-8 text-[15px] sm:text-base">
                  O seu negócio nasce do mercado, para o mercado. E o TOP 20 é o
                  reconhecimento de quem está na linha de frente. Ser TOP 20 é mais
                  do que ser lembrado: é ter a confiança e o respeito de todo o setor.
                </p>

                <PillAzul href="/industria">Participar do TOP 20</PillAzul>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Metric value="12.480" label="Votos" accent="#d4a017" />
                <Metric value="20" label="Marcas" accent={AZUL} />
                <Metric value="11ª" label="Edição" accent="#d4a017" />
                <Metric value="2026" label="Ano" accent={AZUL} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative text-white overflow-hidden" style={{ background: GRADIENTE }}>
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 pb-6 sm:pb-10 text-center">
            <div className="inline-flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-12 h-px bg-white/20" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-white/60 font-semibold">
                COMO FUNCIONA
              </span>
              <span className="w-8 sm:w-12 h-px bg-white/20" />
            </div>
          </div>

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pb-16 sm:pb-20 md:pb-28">
            <h2 className="font-black text-[2rem] sm:text-4xl md:text-6xl leading-[1.05] sm:leading-[0.95] tracking-[-0.02em] mb-10 sm:mb-12 text-center max-w-2xl mx-auto text-balance">
              Três passos<br />para participar.
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <Step
                n="01"
                title="Identifique-se"
                desc="Informe o nome da sua empresa e e-mail. Apenas profissionais do setor podem votar."
                accent="#d4a017"
              />
              <Step
                n="02"
                title="Indique até 5 marcas"
                desc="Escolha as marcas que você considera as mais admiradas e atribua uma nota de 5 a 10."
                accent="#ffffff"
              />
              <Step
                n="03"
                title="Resultado oficial"
                desc="O ranking é publicado na revista Móveis de Valor e nos canais oficiais do TOP 20."
                accent="#7cc4e8"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Metric({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="relative p-4 sm:p-6 rounded-2xl border border-[var(--color-line)] bg-white">
      <div
        className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px"
        style={{ background: accent, opacity: 0.5 }}
      />
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
        {value}
      </div>
      <div
        className="mt-2 text-[10px] tracking-[0.3em] font-semibold uppercase"
        style={{ color: accent }}
      >
        {label}
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
  accent,
}: {
  n: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/10 transition-colors">
      <div
        className="text-4xl sm:text-5xl font-bold tracking-tight leading-none mb-5 sm:mb-6"
        style={{ color: accent }}
      >
        {n}
      </div>
      <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-3 text-white">
        {title}
      </h3>
      <p className="text-sm text-white/75 leading-relaxed">{desc}</p>
    </div>
  );
}
