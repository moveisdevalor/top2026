"use client";

import { useEffect, useState } from "react";

// prazo oficial do regulamento: encerra às 24h do dia 07/11/2026 (horário de Brasília)
const DEADLINE = new Date("2026-11-07T23:59:59-03:00").getTime();

type Tempo = { dias: number; horas: number; minutos: number; segundos: number };

function getRemaining(): Tempo | null {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) return null;
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

// contagem regressiva solta sobre o gradiente do hero (sem cápsula/fundo),
// centralizada no espaço entre o menu e a poltrona (ver uso em page.tsx)
export function CountdownBanner() {
  const [tempo, setTempo] = useState<Tempo | null>(null);

  useEffect(() => {
    setTempo(getRemaining());
    const id = setInterval(() => setTempo(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!tempo) return null;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-20 top-[150px] sm:top-[150px] lg:top-[112px] flex flex-col items-center gap-1.5 sm:gap-2 text-white pointer-events-none">
      <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-white/80 uppercase">
        Votação encerra em
      </span>
      <div className="flex items-center gap-2 sm:gap-3">
        <Unidade valor={tempo.dias} label="dias" />
        <Separador />
        <Unidade valor={tempo.horas} label="h" />
        <Separador />
        <Unidade valor={tempo.minutos} label="min" />
        <Separador />
        <Unidade valor={tempo.segundos} label="s" />
      </div>
    </div>
  );
}

function Unidade({ valor, label }: { valor: number; label: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-black text-2xl sm:text-3xl lg:text-4xl tabular-nums leading-none">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="text-[11px] sm:text-xs text-white/60">{label}</span>
    </div>
  );
}

function Separador() {
  return <span className="text-white/30 text-2xl sm:text-3xl lg:text-4xl leading-none">:</span>;
}
