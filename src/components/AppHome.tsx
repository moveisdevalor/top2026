export function AppHome() {
  return (
    <section className="lg:hidden px-4 bg-white">
      <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg,#111 0%,#1a1a1a 100%)" }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#d4a017]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#4aa0c8]/20 blur-3xl" />
        <div className="relative p-6 pt-8 text-white">
          <div className="text-[10px] tracking-[0.3em] text-white/60 font-semibold mb-3">
            EDIÇÃO 2026
          </div>
          <h1 className="font-bold text-[2rem] leading-[1.05] tracking-[-0.02em] mb-3 text-balance">
            Ser lembrado é bom.<br />
            <span className="text-[#d4a017]">Ser escolhido é TOP.</span>
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed mb-6">
            Vote nas marcas que fazem a diferença no seu dia a dia do setor moveleiro.
          </p>
          <div className="flex gap-2">
            <a
              href="/industria"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-full bg-white text-[var(--color-ink)] text-sm font-bold"
            >
              Votar agora
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/vencedores"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/25 text-white text-sm font-semibold"
            >
              Top 20
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <Stat value="11ª" label="Edição" />
        <Stat value="20" label="Marcas" />
        <Stat value="2026" label="Ano" />
      </div>

      <div className="mt-7">
        <SegHeader title="Como funciona" />
        <div className="rounded-3xl border border-[var(--color-line)] bg-white overflow-hidden divide-y divide-[var(--color-line-soft)]">
          <Step n="01" title="Identifique-se" desc="Informe nome e e-mail. Só profissionais do setor podem votar." />
          <Step n="02" title="Indique até 5 marcas" desc="Atribua uma nota de 5 a 10 a cada marca escolhida." />
          <Step n="03" title="Acompanhe o ranking" desc="O resultado é publicado na revista Móveis de Valor." />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-3 text-center">
      <div className="text-2xl font-bold tracking-[-0.02em]">{value}</div>
      <div className="text-[10px] tracking-[0.2em] font-semibold text-[var(--color-muted)] uppercase mt-0.5">
        {label}
      </div>
    </div>
  );
}

function SegHeader({
  title,
  link,
}: {
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between mb-3 px-1">
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      {link && (
        <a href={link.href} className="text-xs font-semibold text-[var(--color-primary)]">
          {link.label} →
        </a>
      )}
    </div>
  );
}

function CategoryCard({
  href,
  label,
  title,
  desc,
  color,
  img,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
  color: string;
  img: string;
}) {
  return (
    <a href={href} className="block rounded-3xl overflow-hidden bg-white border border-[var(--color-line)] active:scale-[0.98] transition-transform">
      <div className="aspect-square relative bg-[var(--color-bg-soft)]">
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-3.5">
        <div className="text-[9px] tracking-[0.25em] font-bold mb-1" style={{ color }}>
          {label}
        </div>
        <div className="font-bold text-base tracking-tight">{title}</div>
        <div className="text-[11px] text-[var(--color-muted)] mt-0.5">{desc}</div>
      </div>
    </a>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="text-2xl font-bold tracking-tight text-[var(--color-muted)] leading-none w-10 shrink-0">
        {n}
      </div>
      <div className="min-w-0">
        <div className="font-bold text-[15px] tracking-tight">{title}</div>
        <div className="text-[13px] text-[var(--color-muted)] leading-relaxed mt-0.5">
          {desc}
        </div>
      </div>
    </div>
  );
}
