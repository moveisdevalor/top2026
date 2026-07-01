export function Mockup() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div className="relative rounded-[40px] bg-white border hairline shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] p-6 animate-float">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-ink)]" fill="currentColor">
              <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" />
            </svg>
            <span className="font-semibold text-sm">TOP 20</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted">2025</span>
        </div>

        <div className="rounded-2xl border hairline-soft p-5 mb-3">
          <div className="text-[11px] text-muted uppercase tracking-wider mb-1">Ranking geral</div>
          <div className="text-xs text-muted mb-4">Top Indústria</div>
          <Chart />
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t hairline-soft">
            <Mini label="Votos" value="2.4k" />
            <Mini label="Marcas" value="20" />
            <Mini label="Edição" value="07" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-2xl border hairline-soft p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Categoria</div>
            <div className="font-semibold text-sm">+18.5%</div>
            <div className="text-[10px] text-muted mt-1">indústria</div>
          </div>
          <div className="rounded-2xl border hairline-soft p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Conversão</div>
              <div className="font-semibold text-sm">4.2%</div>
            </div>
            <Ring />
          </div>
        </div>

        <div className="rounded-2xl border hairline-soft p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-3">Próximos vencedores</div>
          <ul className="space-y-1.5 text-[11px]">
            {["Indústria A", "Marca B", "Empresa C", "Fornecedor D"].map((n, i) => (
              <li key={n} className="flex justify-between">
                <span>{String(i + 1).padStart(2, "0")} · {n}</span>
                <span className="text-muted">→</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute -z-10 -inset-6 bg-white/60 rounded-[50px] blur-2xl" />
    </div>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 200 60" className="w-full">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity=".15" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 45 C 30 40, 50 50, 80 30 S 130 10, 160 18 S 200 8, 200 8 L 200 60 L 0 60 Z" fill="url(#area)" />
      <path d="M0 45 C 30 40, 50 50, 80 30 S 130 10, 160 18 S 200 8, 200 8" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
    </svg>
  );
}

function Ring() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9">
      <circle cx="18" cy="18" r="14" fill="none" stroke="#ececec" strokeWidth="3" />
      <circle cx="18" cy="18" r="14" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeDasharray="55 100" transform="rotate(-90 18 18)" strokeLinecap="round" />
    </svg>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-muted uppercase tracking-wider">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
}
