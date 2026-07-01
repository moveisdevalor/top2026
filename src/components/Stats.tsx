"use client";

import { useEffect, useState } from "react";
import { getVoteCounts, type VoteCounts } from "@/lib/api";

const fmt = (n: number) => n.toLocaleString("pt-BR");

export function Stats() {
  const [data, setData] = useState<VoteCounts | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      getVoteCounts(1).then((d) => alive && setData(d)).catch(() => {});
    load();
    const id = setInterval(load, 30_000); // atualiza a cada 30s
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const items = [
    { label: "Total de votos", value: data ? fmt(data.total) : "—" },
    { label: "Indústria",      value: data ? fmt(data.industria) : "—" },
    { label: "Fornecedores",   value: data ? fmt(data.fornecedores) : "—" },
  ];

  return (
    <section className="relative bg-[#0a0a0a] text-white">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 grid grid-cols-3 gap-3 sm:gap-8">
        {items.map((it) => (
          <div
            key={it.label}
            className="text-center sm:border-r sm:border-white/15 sm:last:border-r-0"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-white">
              {it.value}
            </div>
            <div className="mt-1.5 sm:mt-2 text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] font-semibold text-white/55 uppercase">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
