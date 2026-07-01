import { Phone } from "./Phone";

export function Hero() {
  return (
    <section className="relative overflow-hidden -mt-24 pt-24" style={{ height: "100vh", minHeight: "720px" }}>
      <div className="absolute top-0 bottom-0 right-0 w-[55%] bg-[var(--color-primary)] z-0">
        <div className="absolute bottom-12 right-12 text-white/60 text-3xl select-none">✦</div>
        <div className="absolute top-1/3 right-6 text-white/35 text-base select-none">✦</div>
        <div className="absolute bottom-32 left-6 text-white/25 text-xs select-none">✦</div>
      </div>

      <div className="absolute top-44 left-1/3 text-[var(--color-ink)] text-2xl select-none">✦</div>
      <div className="absolute top-96 right-[44%] text-[var(--color-ink)] text-base select-none">✦</div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-10 items-center h-full">
        <div className="relative z-10">
          <h1 className="font-sans text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold tracking-[-0.035em] leading-[1.05]">
            As marcas que conectam o{" "}
            <span className="scribble">
              setor
              <svg viewBox="0 0 200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25 45 C 60 18, 140 18, 178 40 C 188 50, 180 65, 100 68 C 30 68, 8 55, 30 42 C 80 30, 160 25, 185 38"
                  stroke="#1554f0"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            moveleiro.
          </h1>

          <p className="mt-7 text-base text-muted max-w-md leading-relaxed">
            O TOP 20 Móveis de Valor é o prêmio que reconhece, há sete edições, as marcas mais admiradas do varejo e da indústria.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#vencedores" className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--color-ink)] text-white">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] opacity-80">Conheça os</div>
                <div className="font-semibold text-sm">Vencedores</div>
              </div>
            </a>
            <a href="#sobre" className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--color-ink)] text-white">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[var(--color-primary)]" fill="currentColor">
                <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] opacity-80">Sobre o</div>
                <div className="font-semibold text-sm">Prêmio TOP 20</div>
              </div>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["#1554f0", "#0a0a0a", "#a0a0a0", "#1554f0", "#3a3a3a"].map((c, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
              ))}
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm">Edição 2025</div>
              <div className="text-xs text-muted">200+ varejistas votando hoje</div>
            </div>
            <svg viewBox="0 0 90 60" className="hidden sm:block w-20 text-[var(--color-primary)] ml-1">
              <path
                d="M75 55 C 65 60, 50 50, 45 38 C 42 28, 50 20, 35 18 C 25 16, 15 22, 10 10"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M6 16 L10 10 L17 13" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="relative h-full hidden lg:block">
          <div className="absolute left-0 bottom-0 animate-float">
            <Phone variant="a" />
          </div>
          <div className="absolute left-[200px] bottom-[-20px] animate-float-d">
            <Phone variant="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
