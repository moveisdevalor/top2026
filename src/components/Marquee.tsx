export function Marquee() {
  const words = ["Indústria", "Fornecedor", "Varejo", "Reconhecimento", "Editorial", "Trajetória"];
  const items = [...words, ...words, ...words];

  return (
    <section className="py-10 border-y hairline overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {items.map((w, i) => (
          <div key={i} className="flex items-center gap-16 font-display text-xl md:text-2xl tracking-tight text-muted">
            <span>{w}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
