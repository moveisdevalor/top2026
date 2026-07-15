"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, trackEvent, EV } from "@/lib/analytics";

// Seções da home observadas por rolagem (ids no DOM). Em outras rotas não
// existem, então o observer simplesmente não observa nada.
const SECTIONS = ["numeros", "pilares", "vencedores", "faq"];

// Registra 1 acesso por rota e 1 evento por seção ao rolar até ela.
export function AccessTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            trackEvent(EV.section(id), id);
          }
        }
      },
      // dispara quando o topo da seção passa dos 70% da viewport (rolou até ela);
      // threshold baixo garante que seções altas também contam.
      { threshold: 0.01, rootMargin: "0px 0px -30% 0px" },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
