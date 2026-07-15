"use client";

import { Ranking, useEdicoes } from "./Rankings";
import { Label } from "./DesignSystem";
import { VIDEO_EMBED_URL, FOTOS } from "@/lib/comemoracao";

// Comemoração da última edição concluída (a mais recente da tabela de vencedores;
// a edição em andamento ainda não tem vencedores, então cai na do ano passado).
export function Comemoracao() {
  const edicoes = useEdicoes();
  const edicao = edicoes[0];
  const temFornecedores = edicao.fornecedores.length > 0;
  const temMidia = Boolean(VIDEO_EMBED_URL) || FOTOS.length > 0;

  return (
    <>
      {temMidia && (
        <section className="px-4 sm:px-6 md:px-10 pb-16 md:pb-20">
          <div className="max-w-[1000px] mx-auto">
            <Label center>A CELEBRAÇÃO DE {edicao.ano}</Label>

            {VIDEO_EMBED_URL && (
              <div className="relative w-full rounded-[28px] overflow-hidden bg-black/5 aspect-video">
                <iframe
                  src={VIDEO_EMBED_URL}
                  title={`Premiação TOP 20 ${edicao.ano}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {FOTOS.length > 0 && (
              <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${VIDEO_EMBED_URL ? "mt-6" : ""}`}>
                {FOTOS.map((f) => (
                  <img
                    key={f.src}
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover rounded-2xl"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pb-16 md:pb-24">
        <div className="text-center mb-10">
          <Label center>OS VENCEDORES DE {edicao.ano}</Label>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.08] text-balance">
            As marcas que o setor escolheu no ano passado.
          </h2>
        </div>

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
    </>
  );
}
