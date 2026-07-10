type Artigo = {
  num: string;
  body: string;
  paragrafos?: { titulo: string; body: string }[];
  itens?: string[];
};

type Props = {
  area: "industria" | "fornecedor";
  voterLabel: string;
  brandLabel: string;
  data: Artigo[];
};

const accent = (area: Props["area"]) =>
  area === "industria" ? "#d4a017" : "#4aa0c8";

export function Regulamento({ area, voterLabel, brandLabel, data }: Props) {
  const color = accent(area);

  return (
    <section className="bg-[var(--color-bg-soft)] pt-10 sm:pt-16 pb-16 sm:pb-20">
      <div className="max-w-[820px] mx-auto px-4 sm:px-6">
        <article className="bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-[var(--color-line-soft)] rounded-2xl sm:rounded-none p-6 sm:p-10 md:p-16 lg:p-20">
          <header className="text-center pb-6 sm:pb-8 mb-8 sm:mb-10 border-b border-[var(--color-line-soft)]">
            <div
              className="text-[10px] tracking-[0.4em] font-bold mb-3"
              style={{ color }}
            >
              MÓVEIS DE VALOR
            </div>
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight mb-2">
              Regulamento do Ranking TOP 20
            </h1>
            <div className="text-sm text-[var(--color-muted)]">
              Edição 2026 · {voterLabel}
            </div>
          </header>

          <p className="text-[var(--color-ink)] leading-[1.7] text-[15px] mb-8 sm:mb-10 sm:text-justify">
            O presente Regulamento objetiva explicitar os critérios que regem a
            pesquisa de opinião intitulada <strong>TOP 20</strong> que busca
            identificar, por meio de questionário disponibilizado online
            (top20.moveisdevalor.com.br), através de pesquisa espontânea, as 20
            marcas de {brandLabel} mais prestigiadas de todo o Brasil.
          </p>

          <div className="space-y-6 sm:space-y-7">
            {data.map((a) => (
              <div key={a.num}>
                <p className="text-[15px] leading-[1.7] text-[var(--color-ink)] sm:text-justify">
                  <strong className="font-bold">Art. {a.num} —</strong>{" "}
                  {a.body}
                </p>

                {a.itens && (
                  <ul className="mt-3 ml-5 sm:ml-6 list-disc text-[15px] leading-[1.7] text-[var(--color-ink)] marker:text-[var(--color-muted)]">
                    {a.itens.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}

                {a.paragrafos?.map((p) => (
                  <p
                    key={p.titulo}
                    className="mt-3 ml-5 sm:ml-6 text-[14px] leading-[1.65] text-[var(--color-muted)] sm:text-justify"
                  >
                    <em className="font-semibold not-italic text-[var(--color-ink)]">
                      {p.titulo} —
                    </em>{" "}
                    {p.body}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <footer className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[var(--color-line-soft)] text-center">
            <p className="text-sm text-[var(--color-ink)] mb-1">
              Curitiba, 04 de agosto de 2026.
            </p>
            <p className="text-sm italic text-[var(--color-muted)]">
              A Organização
            </p>
          </footer>
        </article>

        <div className="text-center mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href={`/${area === "industria" ? "industria" : "fornecedores"}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ir para votação
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
