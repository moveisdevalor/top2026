"use client";

import { useEffect, useState } from "react";
import { edicoes as edicoesFallback, edicoesFromWinners, type Edicao } from "@/lib/vencedores";
import { getTopWinnersList } from "@/lib/api";

// Carrega os vencedores da API (tabela top_winners); enquanto carrega — ou se
// a API estiver indisponível/vazia — usa as listas ilustrativas de fallback.
export function useEdicoes(): Edicao[] {
  const [edicoes, setEdicoes] = useState(edicoesFallback);

  useEffect(() => {
    getTopWinnersList().then((winners) => {
      const remotas = edicoesFromWinners(winners);
      if (remotas.length > 0) setEdicoes(remotas);
    });
  }, []);

  return edicoes;
}

export function Rankings() {
  const edicoes = useEdicoes();
  const [ano, setAno] = useState<number | null>(null);
  const edicao = edicoes.find((e) => e.ano === ano) ?? edicoes[0];
  // Até 2021 o prêmio não tinha categoria de fornecedores: mostra só indústrias.
  const temFornecedores = edicao.fornecedores.length > 0;

  return (
    <section id="vencedores" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24">
      <SeletorAno anos={edicoes.map((e) => e.ano)} ano={edicao.ano} onChange={setAno} />

      <div
        className={
          temFornecedores
            ? "grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-0 lg:divide-x lg:divide-[var(--color-line)]"
            : "max-w-[720px] mx-auto"
        }
      >
        <div className={temFornecedores ? "lg:pr-12" : undefined}>
          <Ranking
            label="QUEM TRANSFORMA"
            title="indústria"
            accent="#d4a017"
            items={edicao.industrias}
          />
        </div>
        {temFornecedores && (
          <div className="lg:pl-12 border-t lg:border-t-0 border-[var(--color-line)] pt-10 sm:pt-12 lg:pt-0">
            <Ranking
              label="QUEM ABASTECE"
              title="fornecedores"
              accent="#4aa0c8"
              items={edicao.fornecedores}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function SeletorAno({
  anos,
  ano,
  onChange,
  onDark = false,
}: {
  anos: number[];
  ano: number;
  onChange: (ano: number) => void;
  /** Ajusta cores para quando o seletor está sobre o card azul do hero. */
  onDark?: boolean;
}) {
  return (
    <div className="flex justify-center mb-10 sm:mb-14">
      <div
        className={`flex items-center gap-1 p-1 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-full border ${
          onDark
            ? "bg-white/10 border-white/25 backdrop-blur-sm"
            : "bg-[var(--color-bg-soft)] border-[var(--color-line)]"
        }`}
      >
        {anos.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onChange(a)}
            className={`shrink-0 px-4 sm:px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              a === ano
                ? onDark
                  ? "bg-white text-[#1a4fd4]"
                  : "bg-[var(--color-primary)] text-white"
                : onDark
                ? "text-white/70 hover:text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Ranking({
  label,
  title,
  accent,
  items,
  onDark = false,
}: {
  label: string;
  title: string;
  accent: string;
  items: string[];
  /** Ajusta cores para quando o ranking está sobre o card azul do hero. */
  onDark?: boolean;
}) {
  return (
    <div className={onDark ? "text-white" : undefined}>
      <div className="pb-5 sm:pb-6 mb-2">
        <div
          className="text-[11px] tracking-[0.3em] font-semibold mb-2"
          style={{ color: accent }}
        >
          {label}
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.02em]">
          As <span style={{ color: accent }}>20 marcas</span> de {title}
        </h3>
      </div>

      <ul>
        {items.map((name, i) => {
          const rank = i + 1;
          const top3 = rank <= 3;
          return (
            <li
              key={name}
              className={`grid grid-cols-[44px_1fr_auto] sm:grid-cols-[56px_1fr_auto] md:grid-cols-[72px_1fr_auto] gap-3 sm:gap-4 py-3.5 sm:py-4 border-b last:border-b-0 items-center transition-colors ${
                onDark
                  ? "border-white/15 hover:bg-white/5"
                  : "border-[var(--color-line-soft)] hover:bg-[var(--color-bg-soft)]"
              }`}
            >
              <span
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                style={{ color: top3 ? accent : onDark ? "rgba(255,255,255,0.6)" : "var(--color-muted)" }}
              >
                {String(rank).padStart(2, "0")}
              </span>
              <span className="text-[15px] sm:text-base md:text-lg font-medium tracking-tight">
                {name}
              </span>
              <span className={`text-sm ${onDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>→</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
