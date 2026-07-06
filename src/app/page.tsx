"use client";

import { useRef, useState } from "react";
import { FormaShapeFull } from "@/components/FormaShapeFull";
import { Pilares, Faq, Cta, Footer } from "@/components/HomeSections";
import { VoteForm } from "@/components/VoteForm";

const sugestoesIndustria = [
  "Móveis Alpha", "Lopas", "Henn", "Madesa", "Kappesberg", "Politorno",
  "Todeschini", "Dell Anno", "Florense", "Bontempo", "Sca", "Italínea",
  "Lider Interiores", "Artefacto", "Sierra Móveis", "Breton",
];

const sugestoesFornecedor = [
  "Duratex", "Eucatex", "Berneck", "Arauco", "Guararapes", "Masisa",
  "Hettich", "Blum", "Soprano", "Hafele", "FGV", "Indufix", "Karsten",
  "Sultextil", "Sayerlack", "Renner", "Sherwin-Williams",
];

const linksMobile = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/vencedores", label: "Vencedores" },
  { href: "/#categorias", label: "Categorias" },
  { href: "/#faq", label: "FAQ" },
  { href: "/regulamento", label: "Regulamento" },
];

export default function Home() {
  const [votando, setVotando] = useState<"industria" | "fornecedores" | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [slide, setSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // no mobile as colunas viram slides (scroll-snap horizontal); no desktop
  // continuam lado a lado (grid), sem efeito de slider.
  function handleCarouselScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  }

  function scrollToSlide(index: number) {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  // arrastar com o mouse/trackpad: o toque já rola nativamente (overflow +
  // scroll-snap); aqui replicamos o gesto para ponteiro de mouse, desligando o
  // snap durante o arrasto e realinhando ao slide mais próximo ao soltar.
  const dragRef = useRef({ startX: 0, startLeft: 0, dragging: false });

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = carouselRef.current;
    if (!el || e.pointerType !== "mouse" || el.scrollWidth <= el.clientWidth + 1) return;
    dragRef.current = { startX: e.clientX, startLeft: el.scrollLeft, dragging: true };
    el.style.scrollSnapType = "none";
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = carouselRef.current;
    if (!el || !dragRef.current.dragging) return;
    el.scrollLeft = dragRef.current.startLeft - (e.clientX - dragRef.current.startX);
  }

  function handlePointerUp() {
    const el = carouselRef.current;
    if (!el || !dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    el.style.scrollSnapType = "";
    scrollToSlide(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <main>
      {/* hero: forma azul de largura total; menu e conteúdo vivem dentro dela */}
      <section className="pt-1 pb-16 relative">
        <FormaShapeFull
          menuAberto={menuAberto}
          onMenuClick={() => setMenuAberto(!menuAberto)}
          sideNotches={votando ? undefined : { left: slide > 0, right: slide < 1 }}
          overlay={
            !votando ? (
              <div className="md:hidden">
                {/* setas do slider: encaixadas nos recortes laterais do card
                    (fora do clip, senão a parte sobre o recorte sumiria) */}
                <button
                  type="button"
                  aria-label="Slide anterior"
                  onClick={() => scrollToSlide(slide - 1)}
                  disabled={slide === 0}
                  className="absolute z-20 w-9 h-9 flex items-center justify-center text-[#1a4fd4] transition-opacity disabled:opacity-0"
                  style={{ left: -10, top: "50%", transform: "translateY(-50%)", pointerEvents: "auto" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Próximo slide"
                  onClick={() => scrollToSlide(slide + 1)}
                  disabled={slide === 1}
                  className="absolute z-20 w-9 h-9 flex items-center justify-center text-[#1a4fd4] transition-opacity disabled:opacity-0"
                  style={{ right: -10, top: "50%", transform: "translateY(-50%)", pointerEvents: "auto" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ) : null
          }
        >
          {/* menu nas laterais do recorte superior */}
          <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-full max-w-[1400px] z-20 hidden lg:flex items-center justify-between px-20 pt-4 text-[13px] text-white/85">
            <div className="flex items-center gap-6">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/sobre" className="hover:text-white transition-colors">Sobre</a>
              <a href="/vencedores" className="hover:text-white transition-colors">Vencedores</a>
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

          {/* cadeira: desliza até a borda do container quando um "Votar" é clicado
              (indústrias → direita, fornecedores → esquerda), ficando só metade
              visível — cortada na borda do container (não na borda da tela), por
              isso fica num wrapper com overflow:hidden do tamanho do container. */}
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/chair-blue.png"
              alt=""
              className="absolute w-[38%] max-w-[520px] select-none"
              style={{
                top: "50%",
                left: votando === "industria" ? "100%" : votando === "fornecedores" ? "0%" : "50%",
                transform: "translate(-50%, -50%)",
                transition: "left 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>

          {/* cadeira no mobile: mesmo critério do votar (indústrias → direita,
              fornecedores → esquerda), mas seguindo o slide ativo do carrossel
              em vez do estado de voto — sempre de um lado, nunca centralizada. */}
          <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/chair-blue.png"
              alt=""
              className="absolute w-[92%] max-w-[420px] select-none"
              style={{
                top: "50%",
                left: (votando ?? (slide === 0 ? "industria" : "fornecedores")) === "industria" ? "100%" : "0%",
                transform: "translate(-50%, -50%)",
                transition: "left 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>

          {/* marcadores (+) sobre a cadeira: somem junto com a votação */}
          <span
            className="hidden md:flex absolute left-[37%] top-[38%] w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-white items-center justify-center text-base pointer-events-none transition-opacity duration-300"
            style={{ opacity: votando ? 0 : 1 }}
          >
            +
          </span>
          <span
            className="hidden md:flex absolute right-[39%] bottom-[27%] w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-white items-center justify-center text-base pointer-events-none transition-opacity duration-300"
            style={{ opacity: votando ? 0 : 1 }}
          >
            +
          </span>

          {/* seletor nomeado do slider — só no mobile, no alto do card (abaixo
              do recorte da logo), some durante a votação */}
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 z-20 md:hidden"
            style={{ display: votando ? "none" : undefined }}
          >
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => scrollToSlide(0)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  slide === 0 ? "bg-white text-[#1a4fd4]" : "text-white/70"
                }`}
              >
                Indústrias
              </button>
              <button
                type="button"
                onClick={() => scrollToSlide(1)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  slide === 1 ? "bg-white text-[#1a4fd4]" : "text-white/70"
                }`}
              >
                Fornecedores
              </button>
            </div>
          </div>

          {/* colunas: Indústrias × Fornecedores, ancoradas na base — somem ao votar
              (display:none, não apenas opacidade, para não disputar espaço no flex com o painel de voto).
              No mobile viram um slider (scroll-snap horizontal, 1 item por vez);
              no desktop continuam lado a lado num grid normal. */}
          <div
            className="relative z-10 w-full self-end mb-14 text-white"
            style={{ display: votando ? "none" : "block" }}
          >
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing md:cursor-auto md:grid md:grid-cols-2 md:gap-10 md:overflow-visible md:snap-none items-end"
            >
            <div className="w-full shrink-0 snap-center md:max-w-[420px] md:w-auto md:shrink text-left">
              <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">QUEM TRANSFORMA</p>
              <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em] mb-4">
                INDÚSTRIAS
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Fábricas que projetam, produzem e entregam o móvel acabado ao mercado final.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 justify-start">
                <Tag>SOFAS</Tag>
                <Tag>RACKS</Tag>
                <Tag>COLCHÕES</Tag>
                <Tag>COZINHAS</Tag>
                <Tag>GUARDA-ROUPA</Tag>
                <Tag>MESAS</Tag>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-start">
                <button
                  type="button"
                  onClick={() => setVotando("industria")}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
                >
                  Votar
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="text-xs font-semibold tracking-wide" style={{ color: "#d4a017" }}>
                  Apenas lojistas
                </span>
              </div>
            </div>

            <div className="w-full shrink-0 snap-center md:max-w-[420px] md:w-auto md:shrink md:ml-auto text-right">
              <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">QUEM ABASTECE</p>
              <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em] mb-4">
                FORNECEDORES
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Quem fornece a matéria-prima, os componentes e a logística que sustentam a produção.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 justify-end">
                <Tag>MADEIRA &amp; MDF</Tag>
                <Tag>FERRAGENS</Tag>
                <Tag>TECIDOS</Tag>
                <Tag>TINTAS</Tag>
                <Tag>ESPUMAS</Tag>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-end">
                <span className="text-xs font-semibold tracking-wide" style={{ color: "#4aa0c8" }}>
                  Apenas indústrias
                </span>
                <button
                  type="button"
                  onClick={() => setVotando("fornecedores")}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
                >
                  Votar
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            </div>

          </div>

          {/* formulário de voto: ocupa 70% da tela do lado oposto à cadeira
              (indústrias → cadeira na direita, painel na esquerda; e vice-versa) */}
          {votando && (
            <div
              className={`relative z-10 w-full lg:w-[70%] self-end mt-12 lg:mt-0 mb-8 text-white ${votando === "industria" ? "mr-auto" : "ml-auto"}`}
            >
              <button
                type="button"
                onClick={() => setVotando(null)}
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>
              <div className="text-[var(--color-ink)] [&>section]:max-w-none [&>section]:px-0 [&>section]:py-0">
                <VoteForm
                  area={votando}
                  voterLabel={votando === "industria" ? "Lojista" : "Indústria"}
                  voteSubject={votando === "industria" ? "indústria" : "fornecedor"}
                  brandSuggestions={votando === "industria" ? sugestoesIndustria : sugestoesFornecedor}
                  onDark
                />
              </div>
            </div>
          )}
        </FormaShapeFull>

        {/* painel do menu mobile: abre abaixo do recorte com o botão de menu */}
        {menuAberto && (
          <div className="lg:hidden absolute top-16 right-4 z-30 bg-white rounded-2xl shadow-xl px-5 py-4 space-y-1 min-w-[200px]">
            {linksMobile.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuAberto(false)}
                className="block py-2.5 text-base text-[var(--color-ink)]"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
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
