export function Ecosystem() {
  return (
    <section
      id="categorias"
      className="relative bg-white text-[var(--color-ink)] overflow-hidden"
    >
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-14 lg:gap-0 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="relative lg:pr-20">
          <div className="flex justify-center mb-10 sm:mb-16">
            <img
              src="/Industria.jpg"
              alt="Indústria"
              className="w-full max-w-[34rem] h-auto"
            />
          </div>

          <div className="text-[11px] tracking-[0.3em] text-[var(--color-muted)] mb-3 sm:mb-4">
            QUEM TRANSFORMA
          </div>

          <h2 className="font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6 text-[var(--color-ink)]">
            INDÚSTRIAS
          </h2>

          <p className="text-[var(--color-muted)] leading-relaxed max-w-md mb-7 sm:mb-8 text-[15px] sm:text-base">
            Fábricas que projetam, produzem e entregam o móvel acabado ao mercado final.
          </p>

          <div className="flex items-center gap-3 flex-wrap mb-3 mt-8">
            <a
              href="/industria"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-primary)] transition-colors"
            >
              Votar
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <span className="text-xs font-semibold tracking-wide" style={{ color: "#d4a017" }}>
              Apenas lojistas
            </span>
          </div>
        </div>

        <div className="relative lg:pl-20 lg:text-right">
          <div className="flex justify-center mb-10 sm:mb-16">
            <img
              src="/Fornecedores.jpg"
              alt="Fornecedores"
              className="w-full max-w-[34rem] h-auto"
            />
          </div>

          <div className="text-[11px] tracking-[0.3em] text-[var(--color-muted)] mb-3 sm:mb-4">
            QUEM ABASTECE
          </div>

          <h2 className="font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6 text-[var(--color-ink)]">
            FORNECEDORES
          </h2>

          <p className="text-[var(--color-muted)] leading-relaxed max-w-md mb-7 sm:mb-8 lg:ml-auto text-[15px] sm:text-base">
            Quem fornece a matéria-prima, os componentes e a logística que sustentam a produção.
          </p>

          <div className="flex items-center gap-3 flex-wrap lg:justify-end mb-3 mt-8">
            <a
              href="/fornecedores"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-primary)] transition-colors"
            >
              Votar
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <span className="text-xs font-semibold tracking-wide" style={{ color: "#4aa0c8" }}>
              Apenas indústrias
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] font-semibold border border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-bg-soft)]"
    >
      {children}
    </span>
  );
}

