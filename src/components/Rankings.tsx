const industrias = [
  "Móveis Alpha", "Lopas", "Henn", "Madesa", "Kappesberg",
  "Politorno", "Todeschini", "Dell Anno", "Florense", "Bontempo",
  "Sca", "Italínea", "Lider Interiores", "Artefacto", "Sierra Móveis",
  "Breton", "Estúdio Casa", "Cimol", "Carraro", "Móveis Tertúlia",
];

const fornecedores = [
  "Duratex", "Eucatex", "Berneck", "Arauco", "Guararapes",
  "Masisa", "Hettich", "Blum", "Soprano", "Hafele",
  "FGV", "Indufix", "Karsten", "Sultextil", "Nautika",
  "Sayerlack", "Renner", "Sherwin-Williams", "Anjo Tintas", "Jadlog",
];

export function Rankings() {
  return (
    <section id="vencedores" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-0 lg:divide-x lg:divide-[var(--color-line)]">
        <div className="lg:pr-12">
          <Ranking
            label="QUEM TRANSFORMA"
            title="indústria"
            accent="#d4a017"
            items={industrias}
          />
        </div>
        <div className="lg:pl-12 border-t lg:border-t-0 border-[var(--color-line)] pt-10 sm:pt-12 lg:pt-0">
          <Ranking
            label="QUEM ABASTECE"
            title="fornecedores"
            accent="#4aa0c8"
            items={fornecedores}
          />
        </div>
      </div>

      <p className="mt-10 sm:mt-12 text-xs text-[var(--color-muted)] text-center">
        * Lista ilustrativa. Os nomes oficiais são divulgados nos canais Móveis de Valor.
      </p>
    </section>
  );
}

function Ranking({
  label,
  title,
  accent,
  items,
}: {
  label: string;
  title: string;
  accent: string;
  items: string[];
}) {
  return (
    <div>
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
              className="grid grid-cols-[44px_1fr_auto] sm:grid-cols-[56px_1fr_auto] md:grid-cols-[72px_1fr_auto] gap-3 sm:gap-4 py-3.5 sm:py-4 border-b border-[var(--color-line-soft)] last:border-b-0 items-center hover:bg-[var(--color-bg-soft)] transition-colors"
            >
              <span
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                style={{ color: top3 ? accent : "var(--color-muted)" }}
              >
                {String(rank).padStart(2, "0")}
              </span>
              <span className="text-[15px] sm:text-base md:text-lg font-medium tracking-tight">
                {name}
              </span>
              <span className="text-[var(--color-muted)] text-sm">→</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
