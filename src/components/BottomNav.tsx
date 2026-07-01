"use client";

import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Início",
    match: (p: string) => p === "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    href: "/industria",
    label: "Votar",
    match: (p: string) => p === "/industria" || p === "/fornecedores",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.6 6.6L22 9.3l-5.3 5 1.5 7.3L12 17.8 5.8 21.6l1.5-7.3L2 9.3l7.4-.7L12 2z" />
      </svg>
    ),
    primary: true,
  },
  {
    href: "/vencedores",
    label: "Top 20",
    match: (p: string) => p.startsWith("/vencedores"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V3h12v6" />
        <path d="M6 9a6 6 0 0012 0" />
        <path d="M9 21h6" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    href: "/sobre",
    label: "Mais",
    match: (p: string) => p === "/sobre" || p.startsWith("/regulamento"),
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname() || "/";

  return (
    <>
      <div aria-hidden className="lg:hidden h-16" />
      <nav
        aria-label="Navegação principal"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[var(--color-line-soft)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-4 max-w-md mx-auto h-16">
          {tabs.map((t) => {
            const active = t.match(pathname);
            const tone = active ? "var(--color-ink)" : "var(--color-muted)";
            return (
              <li key={t.label} className="h-full">
                <a
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className="h-full flex flex-col items-center justify-center gap-1 px-1"
                >
                  <span
                    className={`grid place-items-center rounded-full ${
                      t.primary ? "w-9 h-9 text-white" : "w-6 h-6"
                    }`}
                    style={
                      t.primary
                        ? { background: active ? "#d4a017" : "var(--color-ink)" }
                        : { color: tone }
                    }
                  >
                    <span className={t.primary ? "w-4 h-4 block" : "w-5 h-5 block"}>
                      {t.icon}
                    </span>
                  </span>
                  <span
                    className="text-[10px] font-semibold tracking-wide leading-none"
                    style={{ color: tone }}
                  >
                    {t.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
