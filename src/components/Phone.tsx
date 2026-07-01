export function Phone({ variant = "a" }: { variant?: "a" | "b" }) {
  return (
    <div className="relative w-[230px] aspect-[9/19] rounded-[36px] bg-[var(--color-ink)] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[var(--color-ink)] rounded-b-2xl z-10" />
      <div className="relative w-full h-full rounded-[28px] bg-white overflow-hidden p-4">
        {variant === "a" ? <ScreenA /> : <ScreenB />}
      </div>
    </div>
  );
}

function ScreenA() {
  return (
    <>
      <div className="text-[10px] text-muted mb-1 mt-3">Ranking 2025</div>
      <div className="font-bold text-xl tracking-tight">20 marcas</div>

      <div className="mt-4 rounded-2xl bg-[var(--color-bg-soft)] p-3">
        <div className="text-[9px] text-muted mb-1.5">Top categoria</div>
        <div className="flex items-end gap-1 h-16">
          {[40, 65, 50, 80, 55, 90, 70, 95, 60, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i % 2 === 0 ? "var(--color-primary)" : "#cbd9ff",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[8px] text-muted mt-2">
          <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[var(--color-primary)] text-white p-3">
        <div className="text-[9px] opacity-80">Categoria 01</div>
        <div className="font-bold text-sm">TOP Indústria</div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[9px] opacity-80">Votos válidos</span>
          <span className="bg-white text-[var(--color-primary)] text-[9px] font-bold rounded-full px-1.5 py-0.5">76%</span>
        </div>
      </div>
    </>
  );
}

function ScreenB() {
  return (
    <>
      <div className="text-[10px] text-muted mt-3">Olá,</div>
      <div className="font-bold text-lg tracking-tight">Móveis de Valor</div>

      <div className="mt-3 rounded-2xl bg-[var(--color-bg-soft)] p-3">
        <div className="flex items-end gap-1 h-20">
          {[30, 55, 40, 70, 50, 85, 65, 90, 70, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i === 7 ? "var(--color-primary)" : "#d6d6d6",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[8px] text-muted mt-2">
          <span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span><span>D</span>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white border hairline-soft p-3">
        <div className="text-[9px] text-muted">Categoria 02</div>
        <div className="font-bold text-sm">Fornecedor</div>
        <div className="text-right text-[9px] font-bold mt-1">35%</div>
      </div>

      <div className="mt-2 rounded-2xl bg-white border hairline-soft p-3">
        <div className="text-[9px] text-muted">Edição</div>
        <div className="font-bold text-sm">2025 — 7ª</div>
      </div>
    </>
  );
}
