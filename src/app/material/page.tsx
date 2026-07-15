import type { Metadata } from "next";
import { HeroForma } from "@/components/HeroForma";
import { Footer } from "@/components/HomeSections";
import { MATERIAIS } from "@/lib/materiais";

export const metadata: Metadata = {
  title: "Material de divulgação — TOP 20 Móveis de Valor",
  description:
    "Baixe selos, artes e peças oficiais do prêmio TOP 20 para divulgar sua marca.",
};

export default function MaterialPage() {
  return (
    <>
      <main>
        <HeroForma>
          <p className="text-[11px] tracking-[0.3em] text-white/60 mb-4">DIVULGAÇÃO</p>
          <h1 className="font-black text-[2.25rem] sm:text-5xl md:text-6xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6 text-balance">
            Material de<br />
            <span style={{ color: "#7cc4e8" }}>divulgação</span>
          </h1>
          <p className="text-white/75 leading-relaxed max-w-xl mx-auto text-[15px] sm:text-base mb-8 sm:mb-10">
            Selos, artes e peças oficiais do prêmio TOP 20 para você divulgar sua
            participação e reconhecimento nos seus canais.
          </p>

          {MATERIAIS.length === 0 ? (
            <div className="max-w-[520px] mx-auto text-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-8 text-white/80 text-sm leading-relaxed">
              Os materiais de divulgação estarão disponíveis em breve. Volte mais
              tarde ou fale com a organização do prêmio.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-left">
              {MATERIAIS.map((m) => (
                <a
                  key={m.arquivo}
                  href={m.arquivo}
                  download
                  className="group flex flex-col rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 hover:bg-white/15 hover:border-white/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-grid place-items-center w-11 h-11 rounded-2xl bg-white/15 text-white">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                      </svg>
                    </span>
                    {m.formato && (
                      <span className="text-[10px] tracking-[0.15em] font-semibold uppercase text-white/50">
                        {m.formato}
                        {m.tamanho ? ` · ${m.tamanho}` : ""}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold tracking-tight text-white mb-1">{m.titulo}</h3>
                  <p className="text-sm text-white/70 leading-relaxed flex-1">{m.descricao}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Baixar
                    <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          )}
        </HeroForma>
      </main>
      <Footer />
    </>
  );
}
