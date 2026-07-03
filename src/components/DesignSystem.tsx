/* Tokens e componentes compartilhados do design system do hero (FormaShapeFull):
   degradê azul, pills com círculo-seta, chips translúcidos, labels espaçadas.
   Usado pela home (HomeSections) e reaproveitado nas páginas internas. */

export const GRADIENTE =
  "radial-gradient(120% 90% at 50% -10%, #5b9cf6 0%, rgba(47,106,224,0.55) 40%, rgba(47,106,224,0) 65%), linear-gradient(160deg, #2e6fe8 0%, #1a4fd4 45%, #0d2fa6 100%)";

export const AZUL = "#1a4fd4";
export const CINZA = "#f1f3f7";

export function Seta() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function PillBranco({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
      style={{ color: AZUL }}
    >
      {children}
      <Seta />
    </a>
  );
}

export function PillAzul({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
      style={{ background: AZUL }}
    >
      {children}
      <Seta />
    </a>
  );
}

export function PillContorno({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/10 transition-colors"
    >
      {children}
    </a>
  );
}

export function Label({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className={`text-[11px] tracking-[0.3em] font-semibold mb-4 ${center ? "text-center" : ""}`}
      style={{ color: AZUL }}
    >
      {children}
    </p>
  );
}

export function LabelClaro({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`text-[11px] tracking-[0.3em] font-semibold mb-4 text-white/60 ${center ? "text-center" : ""}`}>
      {children}
    </p>
  );
}

export function ChipAzulClaro({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-semibold border border-white/25 text-white/85">
      {children}
    </span>
  );
}

/* Card de hero cheio (rounded-40px, degradê azul, texto branco) usado no topo
   das páginas internas para abrir com a mesma identidade do hero da home. */
export function HeroCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-4 sm:px-6 md:px-10 pt-6 pb-10 md:pt-8 md:pb-12">
      <div
        className="max-w-[1400px] mx-auto rounded-[40px] text-white text-center px-6 py-14 sm:px-10 sm:py-16 md:py-20"
        style={{ background: GRADIENTE }}
      >
        {children}
      </div>
    </section>
  );
}
