import { FormaShapeFull } from "@/components/FormaShapeFull";
import { Pilares, Categorias, Faq, Cta, Footer } from "@/components/HomeSections";

export default function Home() {
  return (
    <main>
      {/* hero: forma azul de largura total; menu e conteúdo vivem dentro dela */}
      <section className="pt-1 pb-16">
        <FormaShapeFull>
          {/* menu nas laterais do recorte superior */}
          <nav className="absolute top-5 inset-x-0 z-20 hidden lg:flex items-center justify-between px-8 pt-4 text-[13px] text-white/85">
            <div className="flex items-center gap-6">
              <a href="/sobre" className="hover:text-white transition-colors">Sobre</a>
              <a href="/vencedores" className="hover:text-white transition-colors">Vencedores</a>
              <a href="/#pilares" className="hover:text-white transition-colors">Pilares</a>
            </div>
            <div className="flex items-center gap-5">
              <a href="/#categorias" className="hover:text-white transition-colors">Categorias</a>
              <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="/regulamento" className="hover:text-white transition-colors">Regulamento</a>
              <div className="flex items-center gap-2">
                <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.3v7h2.7z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" aria-label="X" className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.7 3h2.9l-6.4 7.3L21.7 21h-5.9l-4.6-6-5.3 6H3l6.9-7.8L2.7 3h6l4.1 5.5L17.7 3zm-1 16.2h1.6L7.8 4.7H6L16.7 19.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          {/* cadeira no centro */}
          <img
            src="/chair-blue.png"
            alt=""
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] max-w-[520px] pointer-events-none select-none"
          />

          {/* marcadores (+) sobre a cadeira */}
          <span className="hidden md:flex absolute left-[37%] top-[38%] w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-white items-center justify-center text-base pointer-events-none">
            +
          </span>
          <span className="hidden md:flex absolute right-[39%] bottom-[27%] w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-white items-center justify-center text-base pointer-events-none">
            +
          </span>

          {/* colunas: Indústrias × Fornecedores, ancoradas na base */}
          <div className="relative z-10 w-full self-end mb-14 grid gap-10 md:grid-cols-2 items-end text-white">
            <div className="max-w-[340px]">
              <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">QUEM TRANSFORMA</p>
              <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em] mb-4">
                INDÚSTRIAS
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Fábricas que projetam, produzem e entregam o móvel acabado ao mercado final.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Tag>SOFAS</Tag>
                <Tag>RACKS</Tag>
                <Tag>COLCHÕES</Tag>
                <Tag>COZINHAS</Tag>
                <Tag>GUARDA-ROUPA</Tag>
                <Tag>MESAS</Tag>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="/industria"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
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

            <div className="max-w-[340px] md:ml-auto md:text-right">
              <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">QUEM ABASTECE</p>
              <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em] mb-4">
                FORNECEDORES
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Quem fornece a matéria-prima, os componentes e a logística que sustentam a produção.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 md:justify-end">
                <Tag>MADEIRA &amp; MDF</Tag>
                <Tag>FERRAGENS</Tag>
                <Tag>TECIDOS</Tag>
                <Tag>TINTAS</Tag>
                <Tag>ESPUMAS</Tag>
              </div>
              <div className="flex items-center gap-3 flex-wrap md:justify-end">
                <span className="text-xs font-semibold tracking-wide" style={{ color: "#4aa0c8" }}>
                  Apenas indústrias
                </span>
                <a
                  href="/fornecedores"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
                >
                  Votar
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>

              </div>
            </div>
          </div>

        </FormaShapeFull>
      </section>

      <Pilares />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-semibold border border-white/25 text-white/85">
      {children}
    </span>
  );
}
