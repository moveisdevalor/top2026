export function HeroConcept() {
  return (
    <section className="hidden lg:block relative bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="relative bg-white overflow-hidden">
          {/* corner flag */}
          <div className="absolute top-0 left-14 w-10 h-16 bg-[#0a0a0a] flag z-20" >
            <div className="logo">
              <p>
                  TOP
              </p>
              <p>
                <span>20</span>
              </p>
            </div>

            </div>

          {/* inner nav bar */}
          <div className="relative flex items-center justify-between px-14 pt-6 pb-3 z-10">
            <div className="w-10" />
            <nav className="flex items-center gap-12 text-[11px] tracking-[0.25em] font-medium text-[var(--color-muted)]">
              <a href="/industria" className="hover:text-[var(--color-ink)]">Indústria</a>
              <a href="/fornecedores" className="hover:text-[var(--color-ink)]">Fornecedor</a>
              <a href="/vencedores" className="hover:text-[var(--color-ink)]">Vencedores</a>
              <a href="/sobre" className="hover:text-[var(--color-ink)]">Sobre</a>
            </nav>
            <div className="flex items-center gap-5 text-[var(--color-muted)]">
              <a href="#" aria-label="Instagram" className="hover:text-[var(--color-ink)]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[var(--color-ink)]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.5-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[var(--color-ink)]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M4 4h4v16H4zM6 2.5A2.5 2.5 0 118.5 5 2.5 2.5 0 016 2.5zM10 8h3.8v2.2h.1c.5-1 1.9-2.2 3.9-2.2 4.2 0 5 2.7 5 6.3V20h-4v-5.4c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20h-4z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] min-h-[560px]">
            {/* LEFT — editorial */}
            <div className="relative px-14 pt-16 pb-20 flex flex-col justify-between">
              {/* vertical wordmark */}
              <div
                className="absolute left-10 top-20 text-[72px] leading-none font-extralight tracking-[-0.03em] text-[var(--color-ink)] select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                top20
              </div>

              <div className="pl-28">
                <div className="text-[11px] tracking-[0.4em] text-[var(--color-muted)] mb-4">
                  EDIÇÃO 2026
                </div>
                <h1 className="text-[64px] font-extralight tracking-[-0.03em] leading-[0.95] mb-1">
                  THE ART
                </h1>
                <div className="flex items-center gap-4 mb-8">
                  <span className="block w-14 h-px bg-[var(--color-ink)]" />
                  <div className="text-lg tracking-[0.18em] font-light text-[var(--color-ink)]">
                    OF RECOGNITION
                  </div>
                </div>

                <p className="text-[12px] leading-[1.9] text-[var(--color-muted)] max-w-[280px] mb-8">
                  Em seu sentido mais essencial, o Top20 reconhece as marcas mais
                  admiradas do setor moveleiro brasileiro — através do voto direto
                  de quem vive o mercado.
                </p>

                <a
                  href="/industria"
                  className="inline-flex items-center gap-3 pl-6 pr-4 py-3 bg-[var(--color-ink)] text-white text-[11px] tracking-[0.3em] font-medium hover:bg-[#3d5a52] transition-colors"
                >
                  votar
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>

              {/* Scroll square with side label */}
              <div className="pl-28 mt-12 flex items-center gap-0">
                <div className="w-24 h-20 border border-[var(--color-ink)]" />
                <div className="-ml-8 w-32 h-20 bg-[#3d5a52] text-white flex items-center justify-end pr-4">
                  <span
                    className="text-[10px] tracking-[0.4em] font-semibold uppercase"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    scroll
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — visual */}
            <div className="relative bg-[#f4f1ec] flex items-center justify-center overflow-hidden">
              {/* horizontal band */}
              <div className="absolute left-0 right-20 top-[42%] -translate-y-1/2 h-24 bg-[#c9d3ce]/60" />

              {/* big "01" number */}
              <div className="absolute right-12 top-[38%] -translate-y-1/2 text-[240px] font-extralight leading-none text-white select-none">
                01
              </div>

              {/* central visual: TOP 20 stack */}
              <div className="relative z-10 flex flex-col items-center leading-none">
                <div className="text-[190px] font-black tracking-[-0.06em] text-[var(--color-ink)]">
                  20
                </div>
                <div
                  className="text-[15px] font-bold tracking-[0.7em] mt-3 text-[var(--color-ink)]"
                  style={{ marginLeft: "0.7em" }}
                >
                  TOP
                </div>
              </div>

              {/* base plate ellipse (like bonsai plate) */}
              <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 w-[360px] h-[24px] border border-[var(--color-ink)]/70 rounded-[50%]" />

              {/* bottom selector labels */}
              <div className="absolute bottom-14 left-0 right-0 flex justify-center items-center gap-14 text-[11px] tracking-[0.25em] uppercase">
                <span className="text-[var(--color-muted)]/60">Fornecedor</span>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[var(--color-ink)] font-semibold">Indústria</span>
                  <div className="flex gap-2 text-[var(--color-muted)]">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                <span className="text-[var(--color-muted)]/60">Vencedores</span>
              </div>

              {/* share icon bottom-right */}
              <button
                aria-label="Compartilhar"
                className="absolute right-6 bottom-6 w-6 h-6 grid place-items-center text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="12" r="2" />
                  <circle cx="18" cy="6" r="2" />
                  <circle cx="18" cy="18" r="2" />
                  <path d="M8 11l8-4M8 13l8 4" />
                </svg>
              </button>
            </div>

            {/* nav arrows */}
            <button
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              aria-label="Próximo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .clip-flag {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
        }
      `}</style>
    </section>
  );
}
