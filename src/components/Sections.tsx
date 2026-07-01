import { Phone } from "./Phone";

export function Tracking() {
  return (
    <section id="sobre" className="relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-[3px] border-[var(--color-primary)]" />
      <div className="absolute bottom-10 left-1/4 text-[var(--color-primary)] text-xl">✦</div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.1] max-w-md">
            Acompanhe os <span className="text-[var(--color-primary)]">resultados</span> em tempo real.
          </h2>

          <div className="mt-8 space-y-5 max-w-md">
            <Item title="Reconhecimento com propósito" desc="Cada voto carrega o peso de uma trajetória construída no setor." />
            <Item title="Voz do empresário importa" desc="Quem decide são as pessoas que vivem o mercado todos os dias." />
            <Item title="Valor editorial ampliado" desc="Conteúdo, análises e bastidores que dão profundidade ao prêmio." />
          </div>

          <a href="#vencedores" className="mt-8 inline-block text-sm font-semibold border-b-2 border-[var(--color-ink)] pb-0.5">
            Saiba mais
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="animate-float">
            <Phone variant="a" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="grid place-items-center w-8 h-8 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex-shrink-0 mt-0.5">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <div className="font-bold tracking-tight">{title}</div>
        <div className="text-sm text-muted mt-1 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export function Clients() {
  const marcas = ["Móveis A", "Indústria B", "Marca C", "Casa D", "Empresa E", "Fornecedor F", "Loja G", "Marca H"];

  return (
    <section id="categorias" className="bg-[var(--color-bg-soft)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight">Marcas vencedoras</h2>
          <div className="flex items-center justify-center gap-3 mt-4 text-[var(--color-primary)]">
            <span>✦</span>
            <p className="text-sm text-muted max-w-md">As marcas que se destacaram nas últimas edições do prêmio TOP 20.</p>
            <span>✦</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {marcas.map((m) => (
            <div key={m} className="bg-white rounded-2xl border hairline-soft px-6 py-8 flex items-center justify-center">
              <span className="font-bold text-lg tracking-tight italic">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Winners() {
  const top = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    name: ["Indústria", "Marca", "Empresa", "Fornecedor"][i % 4] + ` ${String.fromCharCode(65 + (i % 26))}`,
  }));

  return (
    <section id="vencedores" className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight max-w-xl">
          As <span className="text-[var(--color-primary)]">20 marcas</span> mais admiradas de 2026.
        </h2>
        <a href="#" className="text-sm font-semibold border-b-2 border-[var(--color-ink)] pb-0.5 self-start md:self-end">Lista oficial</a>
      </div>

      <div className="rounded-3xl bg-white border hairline overflow-hidden">
        <ul>
          {top.map((w) => (
            <li key={w.rank} className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-6 px-6 md:px-10 py-5 border-b hairline-soft last:border-b-0 items-center hover:bg-[var(--color-bg-soft)] transition-colors">
              <span className={`text-2xl font-bold tracking-tight ${w.rank <= 3 ? "text-[var(--color-primary)]" : "text-muted"}`}>
                {String(w.rank).padStart(2, "0")}
              </span>
              <span className="text-lg font-medium tracking-tight">{w.name}</span>
              <span className="text-muted text-sm">→</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs text-muted">* Lista ilustrativa. Os nomes oficiais são divulgados nos canais Móveis de Valor.</p>
    </section>
  );
}

export function Pillars() {
  return (
    <section id="pilares" className="relative overflow-hidden bg-[var(--color-bg-soft)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-28 text-center">
        <div className="text-[11px] tracking-[0.3em] text-muted font-semibold mb-4">
          SOBRE O PRÊMIO
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.15] sm:leading-[1.1] max-w-2xl mx-auto text-balance">
          Quem transforma o seu negócio <span className="text-[var(--color-primary)]">todos os dias?</span>
        </h2>
        <p className="mt-5 sm:mt-6 text-muted max-w-xl mx-auto leading-relaxed text-[15px] sm:text-base">
          O seu negócio nasce do mercado, para o mercado. E o TOP 20 é o reconhecimento de quem está na linha de frente. Ser TOP 20 é mais do que ser lembrado: é ter a confiança e o respeito de todo o setor.
        </p>
        <a href="/sobre" className="mt-7 sm:mt-8 inline-block btn-dark text-sm">Saiba mais</a>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    {
      q: "Por que votar no prêmio TOP 20?",
      a: "TOP é quem entrega o que promete — e um pouco mais. Vamos reconhecer as marcas que unem produto, serviço e relacionamento em uma entrega de valor contínua. Não se trata de ser perfeito, mas de manter uma cultura de melhoria constante e de compromisso com o parceiro de negócios.",
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
    <section id="faq" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-28">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-10 sm:gap-12">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.15] sm:leading-[1.1]">
            Perguntas frequentes
          </h2>
          <a href="#regulamento" className="mt-6 sm:mt-8 inline-block btn-dark text-sm">Falar com a equipe</a>
        </div>

        <div className="space-y-3">
          {items.map((it, i) => (
            <details key={it.q} open={i === 0} className={`group rounded-2xl px-5 py-4 sm:px-6 sm:py-5 transition-colors ${
              i === 0
                ? "bg-[var(--color-ink)] text-white open:bg-[var(--color-ink)]"
                : "bg-[var(--color-bg-soft)] open:bg-[var(--color-bg-soft)]"
            }`}>
              <summary className="flex items-center justify-between cursor-pointer list-none gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                  <span className={`font-bold text-xs sm:text-sm shrink-0 ${i === 0 ? "text-white/60" : "text-muted"}`}>
                    0{i + 1}
                  </span>
                  <span className="font-semibold text-[15px] sm:text-base md:text-lg tracking-tight">{it.q}</span>
                </div>
                <span className={`grid place-items-center w-8 h-8 rounded-full flex-shrink-0 group-open:rotate-45 transition-transform ${
                  i === 0 ? "bg-white text-[var(--color-ink)]" : "bg-white text-[var(--color-ink)] border hairline"
                }`}>+</span>
              </summary>
              <p className={`mt-3 sm:mt-4 pl-7 sm:pl-9 text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-muted"}`}>
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const items = [
    { name: "Carlos Andrade", role: "Diretor, Marca A", text: "O TOP 20 é a referência de reconhecimento editorial do setor — não há nada parecido." },
    { name: "Marina Lopes", role: "CEO, Indústria B", text: "Estar entre as 20 traduz a percepção do mercado sobre nossa trajetória de forma muito justa." },
    { name: "Roberto Mendes", role: "Sócio, Loja C", text: "Como varejista, votar no TOP 20 é assumir responsabilidade pelas marcas que escolhemos defender." },
  ];

  return (
    <section className="bg-[var(--color-bg-soft)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12">
          O que dizem
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border hairline-soft p-7">
              <div className="flex gap-1 text-[var(--color-primary)] mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--color-ink)] leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t hairline-soft">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]" />
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Editions() {
  const years = [2024, 2023, 2022, 2021, 2020, 2019];
  return (
    <section id="edicoes" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight">Edições anteriores</h2>
        <p className="text-muted text-sm max-w-sm">Sete anos consecutivos de reconhecimento editorial.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {years.map((y) => (
          <a key={y} href="#" className="group rounded-2xl bg-white border hairline-soft p-5 sm:p-6 hover:border-[var(--color-ink)] transition-colors">
            <div className="text-2xl md:text-3xl font-bold tracking-tight">{y}</div>
            <div className="text-[10px] text-muted mt-3 uppercase tracking-[0.2em] group-hover:text-[var(--color-primary)] transition-colors">Ver vencedores →</div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section id="regulamento" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-28">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px] bg-[var(--color-ink)] text-white p-8 sm:p-12 md:p-20 text-center">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--color-primary)]/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.02] max-w-4xl mx-auto text-balance">
            Ser lembrado é bom.
            <br />
            <span className="text-[var(--color-primary)]">Ser escolhido é TOP.</span>
          </h2>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a href="/industria" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[var(--color-ink)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
              Votar agora →
            </a>
            <a href="/sobre" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 hover:border-white hover:bg-white/5 font-semibold transition-colors">
              Saber mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pb-10 sm:pb-14">
      <div className="border-t hairline pt-10 sm:pt-14 grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-8 sm:gap-12">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[var(--color-primary)]" fill="currentColor">
              <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" />
            </svg>
            <span className="font-bold tracking-tight text-lg">TOP 20</span>
          </div>
          <p className="text-muted max-w-sm leading-relaxed text-sm">
            Uma realização Móveis de Valor — referência editorial do setor moveleiro brasileiro desde 2019.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+554199129877" className="hover:text-[var(--color-primary)]">(41) 9912-9877</a></li>
            <li><a href="mailto:contato@moveisdevalor.com.br" className="hover:text-[var(--color-primary)]">contato@moveisdevalor.com.br</a></li>
            <li className="text-muted">Curitiba — PR</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#sobre" className="hover:text-[var(--color-primary)]">Sobre</a></li>
            <li><a href="#vencedores" className="hover:text-[var(--color-primary)]">Vencedores</a></li>
            <li><a href="#faq" className="hover:text-[var(--color-primary)]">FAQ</a></li>
            <li><a href="#edicoes" className="hover:text-[var(--color-primary)]">Edições</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline-soft mt-10 pt-6 text-xs text-muted flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Móveis de Valor.</span>
        <span className="tracking-[0.2em] uppercase">Ser escolhido é TOP</span>
      </div>
    </footer>
  );
}
