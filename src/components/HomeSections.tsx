"use client";

/* Seções da home no design system do hero (FormaShape):
   degradê azul, cantos 40px, pills com círculo-seta, chips e labels espaçadas.
   As faixas alternam branco/cinza, conectadas pelo divisor de aba central
   (mesma curva da base do hero). */

import { useEffect, useState } from "react";
import { GRADIENTE, AZUL, CINZA, Label, PillAzul, PillBranco, ChipAzulClaro } from "./DesignSystem";
import { RegulamentoModal } from "./RegulamentoModal";
import { Ranking, SeletorAno, useEdicoes } from "./Rankings";
import { getVoteCounts, type VoteCounts } from "@/lib/api";

/* Divisor de faixa: a cor da seção anterior "pinga" sobre a atual com a
   mesma aba convexa da base do hero; a seta (opcional) rola até a seção. */
export function Divisor({
  corAnterior,
  comSeta = true,
  corSeta = AZUL,
}: {
  corAnterior: string;
  comSeta?: boolean;
  corSeta?: string;
}) {
  return (
    <div className="relative">
      <svg viewBox="0 0 880 29" preserveAspectRatio="none" className="block w-full h-12" aria-hidden="true">
        <path d="M385 0 C410 0 412 29 440 29 C468 29 470 0 495 0 Z" fill={corAnterior} />
      </svg>
      {comSeta && (
        <button
          aria-label="Rolar até a seção"
          onClick={(e) => e.currentTarget.closest("section, footer")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute left-1/2 top-3 -translate-x-1/2 flex bg-transparent border-none p-0 cursor-pointer"
          style={{ color: corSeta }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ── NÚMEROS ── */
/* Totais de votos aprovados da edição atual, direto da API (/top/counts). */
export function Numeros() {
  const [counts, setCounts] = useState<VoteCounts | null>(null);

  useEffect(() => {
    getVoteCounts(1).then(setCounts);
  }, []);

  const fmt = (n: number) => n.toLocaleString("pt-BR");
  const stats = [
    { valor: counts ? fmt(counts.total) : "—", label: "votos computados" },
    { valor: counts ? fmt(counts.industria) : "—", label: "votos em indústrias" },
    { valor: counts ? fmt(counts.fornecedores) : "—", label: "votos em fornecedores" },
  ];

  return (
    <section id="numeros" className="px-4 sm:px-6 md:px-10 pb-16 md:pb-20">
      <div className="max-w-[1400px] mx-auto text-center">
        <Label center>OS NÚMEROS</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 max-w-[900px] mx-auto">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-black text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em]"
                style={{ color: AZUL }}
              >
                {s.valor}
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PILARES ── */
export function Pilares() {
  const [regulamento, setRegulamento] = useState<"industria" | "fornecedores" | null>(null);

  return (
    <section id="pilares" className="px-4 sm:px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto text-center">
        <Label>SOBRE O PRÊMIO</Label>
        <h2 className="font-black text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.08] text-balance">
          Quem transforma o seu negócio <span style={{ color: AZUL }}>todos os dias?</span>
        </h2>
        <p className="mt-6 text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed text-[15px] sm:text-base">
          O seu negócio nasce do mercado, para o mercado. E o TOP 20 é o reconhecimento de quem
          está na linha de frente. Ser TOP 20 é mais do que ser lembrado: é ter a confiança e o
          respeito de todo o setor.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRegulamento("industria")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Regulamento Indústria
          </button>
          <button
            type="button"
            onClick={() => setRegulamento("fornecedores")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Regulamento Fornecedor
          </button>
        </div>
      </div>

      {regulamento && (
        <RegulamentoModal area={regulamento} onClose={() => setRegulamento(null)} />
      )}
    </section>
  );
}

/* ── CATEGORIAS ── */
export function Categorias() {
  return (
    <section id="categorias" style={{ background: CINZA }}>
      <Divisor corAnterior="#ffffff" />
      <div className="px-4 sm:px-6 md:px-10 pt-8 pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <Label>QUEM PARTICIPA</Label>
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.08]">
            Duas categorias, um prêmio.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <CardCategoria
            imagem="/Industria.jpg"
            alt="Indústria"
            label="QUEM TRANSFORMA"
            titulo="INDÚSTRIAS"
            descricao="Fábricas que projetam, produzem e entregam o móvel acabado ao mercado final."
            chips={["PRODUÇÃO", "MARCENARIA", "ACABAMENTO", "DESIGN"]}
            href="/industria"
            nota="Apenas lojistas"
            notaCor="#d4a017"
          />
          <CardCategoria
            imagem="/Fornecedores.jpg"
            alt="Fornecedores"
            label="QUEM ABASTECE"
            titulo="FORNECEDORES"
            descricao="Quem fornece a matéria-prima, os componentes e a logística que sustentam a produção."
            chips={["MADEIRA & MDF", "FERRAGENS", "TECIDOS", "TINTAS", "LOGÍSTICA"]}
            href="/fornecedores"
            nota="Apenas indústrias"
            notaCor="#7cc4e8"
          />
        </div>
      </div>
      </div>
    </section>
  );
}

function CardCategoria(props: {
  imagem: string;
  alt: string;
  label: string;
  titulo: string;
  descricao: string;
  chips: string[];
  href: string;
  nota: string;
  notaCor: string;
}) {
  return (
    <div className="rounded-[40px] text-white p-7 sm:p-10" style={{ background: GRADIENTE }}>
      <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">{props.label}</p>
      <h3 className="font-black text-3xl lg:text-4xl leading-none tracking-[-0.02em] mb-4">
        {props.titulo}
      </h3>
      <p className="text-white/70 text-sm leading-relaxed mb-5">{props.descricao}</p>
      <div className="flex flex-wrap gap-2 mb-7">
        {props.chips.map((c) => (
          <ChipAzulClaro key={c}>{c}</ChipAzulClaro>
        ))}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <PillBranco href={props.href}>Votar</PillBranco>
        <span className="text-xs font-semibold tracking-wide" style={{ color: props.notaCor }}>
          {props.nota}
        </span>
      </div>
    </div>
  );
}

/* ── VENCEDORES (por ano) ── */
export function Vencedores() {
  const edicoes = useEdicoes();
  const [ano, setAno] = useState<number | null>(null);
  const edicao = edicoes.find((e) => e.ano === ano) ?? edicoes[0];
  // Até 2021 o prêmio não tinha categoria de fornecedores: mostra só indústrias.
  const temFornecedores = edicao.fornecedores.length > 0;

  return (
    // full-bleed como o hero; a faixa final sólida (#0d2fa6) garante que a aba
    // do Divisor da seção seguinte case exatamente com a cor da base
    <section
      id="vencedores"
      className="text-white"
      style={{
        background: `linear-gradient(to top, #0d2fa6 0, #0d2fa6 60px, rgba(13,47,166,0) 260px), ${GRADIENTE}`,
      }}
    >
      <Divisor corAnterior="#ffffff" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-8 pb-16 md:pb-24">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">VENCEDORES</p>
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.08]">
            As marcas mais admiradas, <span style={{ color: "#7cc4e8" }}>ano a ano.</span>
          </h2>
        </div>

        <SeletorAno anos={edicoes.map((e) => e.ano)} ano={edicao.ano} onChange={setAno} onDark />

        <div
          className={
            temFornecedores
              ? "grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-0 lg:divide-x lg:divide-white/15"
              : "max-w-[720px] mx-auto"
          }
        >
          <div className={temFornecedores ? "lg:pr-12" : undefined}>
            <Ranking
              label="QUEM TRANSFORMA"
              title="indústria"
              accent="#d4a017"
              items={edicao.industrias}
              onDark
            />
          </div>
          {temFornecedores && (
            <div className="lg:pl-12 border-t lg:border-t-0 border-white/15 pt-10 sm:pt-12 lg:pt-0">
              <Ranking
                label="QUEM ABASTECE"
                title="fornecedores"
                accent="#7cc4e8"
                items={edicao.fornecedores}
                onDark
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

/* ── FAQ ── */
export function Faq() {
  const items = [
    {
      q: "Por que votar no prêmio TOP 20?",
      a: "TOP é quem entrega o que promete — e um pouco mais. Vamos reconhecer as marcas que unem produto, serviço e relacionamento em uma entrega de valor contínua. Não se trata de ser perfeito, mas de manter uma cultura de melhoria constante e de compromisso com o parceiro de negócios.",
    },
    {
      q: "Como faço para minha marca participar?",
      a: "Não existe inscrição, e é justamente aí que está o valor. No TOP 20, ninguém se candidata: é indicado. Toda marca do setor já está elegível, e entra no ranking no instante em que alguém se lembra dela espontaneamente na hora de votar. Lojistas indicam indústrias; indústrias indicam fornecedores. O que coloca uma marca aqui não é um formulário, é a relação construída dia após dia: produto, serviço, atendimento, pós-venda e parceria. A melhor forma de participar, portanto, é seguir entregando valor. O reconhecimento vem de quem trabalha ao seu lado.",
    },
    {
      q: "Quem pode votar nos melhores fornecedores?",
      a: "Apenas as INDÚSTRIAS de móveis e colchões votam em fornecedores. Os LOJISTAS continuam votando nas indústrias de móveis e colchões.",
    },
    {
      q: "Como funciona o processo de votação?",
      a: "É simples. Basta acessar o ícone INDÚSTRIA ou FORNECEDOR (dependendo se é lojista ou fabricante), escolher até cinco marcas e votar, atribuindo a cada marca uma nota entre 5 e 10.",
    },
    {
      q: "Até quando eu posso votar no TOP 20 de 2026?",
      a: "O questionário para votação permanece disponível até as 24 horas do dia 07 de novembro de 2026.",
    },
    {
      q: "Onde eu posso obter mais informações?",
      a: "Basta acessar a aba Regulamento. Tudo o que você precisa saber sobre a promoção está lá, com regulamentos específicos para lojistas e fabricantes.",
    },
  ];

  return (
    <section id="faq" style={{ background: CINZA }}>
      <Divisor corAnterior="#0d2fa6" corSeta="#ffffff" />
      <div className="px-4 sm:px-6 md:px-10 pt-8 pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 sm:gap-12">
        <div>
          <Label>DÚVIDAS</Label>
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.08]">
            Perguntas frequentes
          </h2>
          <div className="mt-8">
            <PillAzul href="/#pilares">Regulamento</PillAzul>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((it, i) => (
            <details
              key={it.q}
              open={i === 0}
              className={`group rounded-3xl px-5 py-4 sm:px-7 sm:py-5 ${i === 0 ? "text-white" : "bg-[var(--color-primary-soft)]"}`}
              style={i === 0 ? { background: GRADIENTE } : undefined}
            >
              <summary className="flex items-center justify-between cursor-pointer list-none gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                  <span className={`font-black text-xs sm:text-sm shrink-0 ${i === 0 ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                    0{i + 1}
                  </span>
                  <span className="font-semibold text-[15px] sm:text-base md:text-lg tracking-tight">
                    {it.q}
                  </span>
                </div>
                <span
                  className="grid place-items-center w-8 h-8 rounded-full flex-shrink-0 bg-white group-open:rotate-45 transition-transform"
                  style={{ color: AZUL }}
                >
                  +
                </span>
              </summary>
              <p className={`mt-3 sm:mt-4 pl-7 sm:pl-9 text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-[var(--color-muted)]"}`}>
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
export function Cta() {
  return (
    <section className="bg-white">
      <Divisor corAnterior={CINZA} />
      <div className="px-4 sm:px-6 md:px-10 pt-8 pb-16 md:pb-24">
      <div
        className="max-w-[1400px] mx-auto rounded-[40px] text-white text-center px-8 py-14 sm:px-12 md:px-20 md:py-24"
        style={{ background: GRADIENTE }}
      >
        <h2 className="font-black text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] leading-[1.05] text-balance">
          Ser lembrado é bom.
          <br />
          Ser escolhido é TOP.
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <PillBranco href="/industria">Votar agora</PillBranco>
          <a
            href="/#pilares"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:border-white hover:bg-white/10 transition-colors"
          >
            Regulamento
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
/* Mesmo tom de azul do hero (GRADIENTE), full-bleed como a primeira section,
   sem o divisor de aba no topo — encosta reto na seção anterior. */
export function Footer() {
  return (
    <footer className="text-white" style={{ background: GRADIENTE }}>
      <div className="px-4 sm:px-6 md:px-10 pt-10 pb-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-8 sm:gap-12">
          <div>
            <div className="font-black text-2xl tracking-[-0.02em] mb-4">TOP20</div>
            <p className="text-white/70 max-w-sm leading-relaxed text-sm">
              Uma realização Móveis de Valor — referência editorial do setor moveleiro brasileiro
              desde 2019.
            </p>
            <div className="flex items-center gap-2 mt-6">
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
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-5">Contato</h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li><a href="tel:+554199129877" className="hover:text-white transition-colors">(41) 9912-9877</a></li>
              <li><a href="mailto:contato@moveisdevalor.com.br" className="hover:text-white transition-colors">contato@moveisdevalor.com.br</a></li>
              <li className="text-white/60">Curitiba — PR</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-5">Navegação</h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li><a href="/#pilares" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="/#vencedores" className="hover:text-white transition-colors">Vencedores</a></li>
              <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/#pilares" className="hover:text-white transition-colors">Regulamento</a></li>
              <li><a href="/material" className="hover:text-white transition-colors">Material de divulgação</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-10 pt-6 text-xs text-white/60 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Móveis de Valor.</span>
          <span className="tracking-[0.2em] uppercase">Ser escolhido é TOP</span>
        </div>
      </div>
      </div>
    </footer>
  );
}
