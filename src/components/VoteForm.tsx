"use client";

import { useEffect, useRef, useState } from "react";
import { createTopVote, getVotesByEmail } from "@/lib/api";
import { getLocation, type LocationInfo } from "@/lib/location";
import { RegulamentoModal } from "@/components/RegulamentoModal";
import { trackEvent, EV } from "@/lib/analytics";

type Props = {
  area: "industria" | "fornecedores";
  voterLabel: string;
  voteSubject: string;
  brandSuggestions?: string[];
  /** Ajusta cores para quando o formulário está sobre o fundo azul do hero. */
  onDark?: boolean;
};

type Vote = { marca: string; nota: number };

const MAX = 5;
const SCORES = [5, 6, 7, 8, 9, 10];

// Atributos avaliados por marca (nota 5-10 em cada); a média vira a nota.
const ATRIBUTOS = [
  { key: "nota_produtos", label: "Qualidade de produtos" },
  { key: "nota_servicos", label: "Qualidade de serviços" },
  { key: "nota_atendimento", label: "Qualidade de atendimento" },
  { key: "nota_posvenda", label: "Qualidade de pós-venda" },
  { key: "nota_marketing", label: "Marketing e comunicação" },
] as const;
const accent = (area: Props["area"]) =>
  area === "industria" ? "#d4a017" : "#4aa0c8";
// top = 2 quando lojistas votam em indústrias / top = 1 quando indústrias votam em fornecedores
const TOP_ID = (area: Props["area"]) => (area === "industria" ? 2 : 1);

const STORAGE_KEY = (area: Props["area"]) => `top20:identity:${area}`;
const SWITCH_KEY = (area: Props["area"]) => `top20:switched:${area}`;

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

// Colapsa espaços repetidos: "Castor   Móveis" -> "Castor Móveis"
const limpaEspacos = (s: string) => s.trim().replace(/\s+/g, " ");

// Detecta nome com palavra repetida em sequência: "Castor Castor".
const temPalavraRepetida = (s: string) => {
  const palavras = norm(limpaEspacos(s)).split(" ").filter(Boolean);
  return palavras.some((p, i) => i > 0 && p === palavras[i - 1]);
};

// Detecta tentativa de informar mais de uma marca no mesmo campo:
// "Castor, Duratex" | "Castor / Duratex" | "Castor + Duratex" | "Castor e Duratex".
// O "&" grudado ("H&M") e o hífen ("Sherwin-Williams") continuam válidos.
// Testa o texto cru (sem colapsar espaços), senão uma quebra de linha viraria
// espaço e "Castor\nDuratex" passaria como se fosse um nome de duas palavras.
const SEPARADORES = /[,;/\\|\n\r\t]|\s[+&]\s|\se\s/i;
const temVariasMarcas = (s: string) => SEPARADORES.test(s.trim());

export function VoteForm({
  area,
  voterLabel,
  voteSubject,
  brandSuggestions = [],
  onDark = false,
}: Props) {
  const [identified, setIdentified] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [aceite, setAceite] = useState(true);
  const [regulamentoAberto, setRegulamentoAberto] = useState(false);

  const [marca, setMarca] = useState("");
  const [notas, setNotas] = useState<Record<string, number>>({});
  const [votes, setVotes] = useState<Vote[]>([]);
  const notasCompletas = ATRIBUTOS.every((a) => notas[a.key] != null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const locationRef = useRef<LocationInfo | null>(null);

  const color = accent(area);
  const remaining = MAX - votes.length;
  const done = votes.length >= MAX;

  // rótulo e título no estilo das colunas do hero
  const heroLabel = area === "industria" ? "QUEM TRANSFORMA" : "QUEM ABASTECE";
  const heroTitle = area === "industria" ? "INDÚSTRIAS" : "FORNECEDORES";
  // o campo coleta o nome do estabelecimento de quem vota (loja ou indústria)
  const nomeLabel = area === "industria" ? "nome da loja" : "nome da indústria";

  const [locStatus, setLocStatus] = useState<"idle" | "pending" | "gps" | "ip-only">("idle");
  const [manualCity, setManualCity] = useState("");

  // Captura localização (IP + GPS se permitido) uma vez ao montar
  useEffect(() => {
    setLocStatus("pending");
    getLocation().then((loc) => {
      locationRef.current = loc;
      setLocStatus(loc.lat && loc.long ? "gps" : "ip-only");
      if (loc.city && !manualCity) setManualCity(loc.city);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restaura identificação + busca votos da API ao carregar
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY(area)) : null;
    if (!raw) {
      setLoading(false);
      return;
    }
    try {
      const { nome: n, email: e } = JSON.parse(raw) as { nome: string; email: string };
      if (!n || !e) {
        setLoading(false);
        return;
      }
      setNome(n);
      setEmail(e);
      getVotesByEmail(e, TOP_ID(area))
        .then((remote) => {
          setVotes(remote.map((r) => ({ marca: r.marca, nota: r.nota })));
          setIdentified(true);
        })
        .catch(() => setIdentified(true))
        .finally(() => setLoading(false));
    } catch {
      setLoading(false);
    }
  }, [area]);

  const filteredSuggestions =
    marca.length >= 2
      ? brandSuggestions
          .filter(
            (b) =>
              norm(b).includes(norm(marca)) &&
              !votes.some((v) => norm(v.marca) === norm(b)),
          )
          .slice(0, 6)
      : [];

  const identify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const n = nome.trim();
    const em = email.trim();
    if (!n || !em) {
      setError(`Preencha o ${nomeLabel} e email.`);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Email inválido.");
      return;
    }
    if (!aceite) {
      setError("É preciso aceitar o regulamento para votar.");
      return;
    }
    setSubmitting(true);
    try {
      const remote = await getVotesByEmail(em, TOP_ID(area));
      setVotes(remote.map((r) => ({ marca: r.marca, nota: r.nota })));
    } catch {
      // se a API falhar na busca, segue sem votos prévios
    } finally {
      localStorage.setItem(STORAGE_KEY(area), JSON.stringify({ nome: n, email: em }));
      setIdentified(true);
      setSubmitting(false);
      trackEvent(EV.voteId, area);
    }
  };

  const addVote = async () => {
    setError("");
    const marcaLimpa = limpaEspacos(marca);
    if (!marcaLimpa) return setError("Informe a marca.");
    if (temVariasMarcas(marcaLimpa)) {
      return setError("Informe apenas uma marca por vez.");
    }
    if (temPalavraRepetida(marcaLimpa)) {
      return setError("Nome de marca inválido: há uma palavra repetida.");
    }
    if (!notasCompletas) return setError("Dê uma nota para cada atributo.");
    if (votes.some((v) => norm(v.marca) === norm(marcaLimpa))) {
      return setError("Você já votou nesta marca.");
    }

    const media = Math.round(
      ATRIBUTOS.reduce((s, a) => s + notas[a.key], 0) / ATRIBUTOS.length,
    );

    setSubmitting(true);
    try {
      const switched = localStorage.getItem(SWITCH_KEY(area)) === "1";
      const loc = locationRef.current ?? (await getLocation());
      locationRef.current = loc;

      await createTopVote({
        loja:  nome.trim(),
        email: email.trim(),
        panel: switched ? "S" : "N",
        marca: marcaLimpa,
        nota_produtos:    notas.nota_produtos,
        nota_servicos:    notas.nota_servicos,
        nota_atendimento: notas.nota_atendimento,
        nota_posvenda:    notas.nota_posvenda,
        nota_marketing:   notas.nota_marketing,
        top:   TOP_ID(area),
        lat:   loc.lat,
        long:  loc.long,
        city:  manualCity.trim() || loc.city,
        country: loc.country,
        ip:    loc.ip,
      });

      if (switched) localStorage.removeItem(SWITCH_KEY(area));

      const novos = [...votes, { marca: marcaLimpa, nota: media }];
      setVotes(novos);
      setMarca("");
      setNotas({});
      trackEvent(EV.voteCast, area);
      if (novos.length >= MAX) trackEvent(EV.voteDone, area);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar voto.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY(area));
    localStorage.setItem(SWITCH_KEY(area), "1");
    setIdentified(false);
    setNome("");
    setEmail("");
    setVotes([]);
    setMarca("");
    setNotas({});
    setError("");
  };

  if (loading) {
    return (
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 text-center">
        <div
          className={`inline-block w-6 h-6 border-2 rounded-full animate-spin ${
            onDark
              ? "border-white/30 border-t-white"
              : "border-[var(--color-line)] border-t-[var(--color-ink)]"
          }`}
        />
        <p className={`mt-3 text-xs ${onDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
          Carregando seus votos...
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-12 md:py-16">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-10 items-center">
        <div>
          {done ? (
            <div
              className={
                onDark
                  ? "text-white max-w-[420px]"
                  : "rounded-3xl bg-white border border-[var(--color-line)] p-6 sm:p-8"
              }
            >
              <div
                className={`inline-grid place-items-center w-14 h-14 rounded-full mb-5 ${onDark ? "border border-white/25" : ""}`}
                style={{ background: onDark ? "rgba(255,255,255,0.12)" : `${color}20`, color: onDark ? "#fff" : color }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2
                className={
                  onDark
                    ? "font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em] mb-4"
                    : "text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3"
                }
              >
                Obrigado!
              </h2>
              <p className={`leading-relaxed ${onDark ? "text-white/70 text-sm" : "text-[var(--color-muted)]"}`}>
                Sua participação contribui decisivamente para valorizar marcas
                que merecem reconhecimento pela qualidade de produtos e serviços.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="/comemoracao"
                  className={
                    onDark
                      ? "inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
                      : "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  }
                >
                  Ver a última edição
                  {onDark && <ArrowIcon />}
                </a>
                <a
                  href="/"
                  className={
                    onDark
                      ? "inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/10 transition-colors"
                      : "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[var(--color-line)] text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
                  }
                >
                  Voltar à home
                </a>
              </div>
            </div>
          ) : !identified ? (
            <form
              onSubmit={identify}
              className={
                onDark
                  ? "space-y-4 text-white max-w-[420px]"
                  : "rounded-3xl bg-white border border-[var(--color-line)] p-5 sm:p-6 md:p-8 space-y-4"
              }
            >
              {onDark && (
                <div>
                  <p className="text-[11px] tracking-[0.3em] text-white/60 mb-1">{heroLabel}</p>
                  <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em]">
                    {heroTitle}
                  </h2>
                </div>
              )}
              <p
                className={
                  onDark
                    ? "text-white/70 text-sm leading-relaxed"
                    : "text-xs font-semibold text-[var(--color-muted)] leading-relaxed"
                }
              >
                Informe o {nomeLabel} e email para começar. Apenas {voterLabel.toLowerCase()}s podem votar.
              </p>
              <Input
                value={nome}
                onChange={setNome}
                placeholder={area === "industria" ? "Nome da loja" : "Nome da indústria"}
                dark={onDark}
              />
              <Input
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
                dark={onDark}
              />
              <p className={`text-[11px] leading-relaxed ${onDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                Utilizaremos este email apenas para, se necessário, confirmar os dados do seu voto.
              </p>
              <label className={`flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer select-none ${onDark ? "text-white/80" : "text-[var(--color-muted)]"}`}>
                <input
                  type="checkbox"
                  checked={aceite}
                  onChange={(e) => {
                    setAceite(e.target.checked);
                    setError("");
                  }}
                  className="mt-0.5 w-4 h-4 shrink-0 accent-[#1a4fd4] cursor-pointer"
                />
                <span>
                  Li e aceito o{" "}
                  <button
                    type="button"
                    onClick={() => setRegulamentoAberto(true)}
                    className={`underline underline-offset-2 font-semibold ${onDark ? "text-white hover:text-white/80" : "text-[var(--color-ink)]"}`}
                  >
                    regulamento
                  </button>{" "}
                  do prêmio TOP 20.
                </span>
              </label>
              {error && <p className={`text-xs ${onDark ? "text-red-200" : "text-red-600"}`}>{error}</p>}
              <button
                type="submit"
                className={
                  onDark
                    ? heroPillClass
                    : "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                }
              >
                Começar a votar
                {onDark && <ArrowIcon />}
              </button>
            </form>
          ) : (
            <div
              className={
                onDark
                  ? "space-y-5 text-white max-w-[420px]"
                  : "rounded-3xl bg-white border border-[var(--color-line)] p-5 sm:p-6 md:p-8 space-y-5"
              }
            >
              {onDark && (
                <div>
                  <p className="text-[11px] tracking-[0.3em] text-white/60 mb-1">{heroLabel}</p>
                  <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em]">
                    {heroTitle}
                  </h2>
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className={`space-y-1 text-xs flex-1 ${onDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                  <p><strong className={onDark ? "text-white" : "text-[var(--color-ink)]"}>{nome}</strong></p>
                  <p>{email}</p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className={`text-[10px] uppercase tracking-[0.15em] transition-colors flex-shrink-0 ${
                    onDark
                      ? "text-white/60 hover:text-white"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  Trocar
                </button>
              </div>

              <div className="relative">
                <Input
                  value={marca}
                  onChange={(v) => {
                    setMarca(v);
                    setError("");
                  }}
                  placeholder={`Marca de ${voteSubject}`}
                  dark={onDark}
                />
                {filteredSuggestions.length > 0 && (
                  <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-[var(--color-line)] rounded-xl shadow-sm overflow-hidden">
                    {filteredSuggestions.map((b) => (
                      <li key={b}>
                        <button
                          type="button"
                          onClick={() => setMarca(b)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg-soft)]"
                        >
                          {b}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className={`mt-2 text-[10px] leading-snug ${onDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                  Você ainda pode indicar {remaining} marca{remaining !== 1 && "s"}.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Durante a votação esta coluna mostra os atributos (no desktop fica ao
            lado do formulário; no mobile o grid colapsa e ela vem abaixo).
            "Seus votos" aparece antes de identificar e ao concluir os 5 votos. */}
        <div className={identified ? undefined : "hidden lg:block"}>
          {identified && !done ? (
            <div className="space-y-5">
            <div className="space-y-3">
              <div className={`flex items-center justify-between text-[11px] tracking-[0.2em] font-semibold uppercase ${onDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                <span>Avalie cada atributo</span>
                <span className="tracking-normal normal-case">5 a 10</span>
              </div>
              {ATRIBUTOS.map((atr) => {
                const val = notas[atr.key];
                return (
                  <div key={atr.key} className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-[142px] sm:w-[180px] shrink-0 text-[11px] sm:text-[13px] leading-tight font-medium ${onDark ? "text-white/85" : "text-[var(--color-ink)]"}`}>
                      {atr.label}
                    </div>
                    <div
                      className={`flex flex-1 min-w-0 rounded-full overflow-hidden border ${
                        onDark ? "border-white/25" : "border-[var(--color-line)]"
                      }`}
                    >
                      {SCORES.map((s) => {
                        const active = val === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setNotas((p) => ({ ...p, [atr.key]: s }));
                              setError("");
                            }}
                            className={`flex-1 h-8 text-[11px] sm:text-xs font-bold transition-colors ${
                              active
                                ? "text-white"
                                : onDark
                                ? "text-white/70 hover:text-white hover:bg-white/10"
                                : "text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-soft)]"
                            } ${s !== SCORES[0] ? (onDark ? "border-l border-white/15" : "border-l border-[var(--color-line)]") : ""}`}
                            style={active ? { background: color } : undefined}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {error && <p className={`text-xs ${onDark ? "text-red-200" : "text-red-600"}`}>{error}</p>}

            <button
              type="button"
              onClick={addVote}
              disabled={submitting}
              className={
                onDark
                  ? heroPillClass
                  : "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              }
            >
              {submitting ? "Enviando..." : "Próximo"}
              {!submitting && onDark && <ArrowIcon />}
              {!submitting && !onDark && "→"}
            </button>
            </div>
          ) : (
          <>
          <div className={`text-[11px] tracking-[0.25em] font-semibold uppercase mb-4 ${onDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
            Seus votos ({votes.length}/{MAX})
          </div>

          <div className="space-y-3">
            {Array.from({ length: MAX }).map((_, i) => {
              const v = votes[i];
              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-4 md:p-5 flex items-center gap-3 transition-colors ${
                    v
                      ? onDark
                        ? "bg-white border-transparent shadow-lg shadow-black/15"
                        : "bg-white border-[var(--color-ink)]"
                      : onDark
                      ? "bg-white/10 border-white/25 border-dashed backdrop-blur-sm"
                      : "bg-[var(--color-bg-soft)] border-[var(--color-line)] border-dashed"
                  }`}
                >
                  <div
                    className="grid place-items-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
                    style={{
                      background: v ? color : "transparent",
                      color: v ? "#fff" : onDark ? "rgba(255,255,255,0.7)" : "var(--color-muted)",
                      border: v
                        ? "none"
                        : `1px solid ${onDark ? "rgba(255,255,255,0.35)" : "var(--color-line)"}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex items-center justify-between gap-4 flex-1 min-w-0">
                    <div className="font-medium tracking-tight truncate">
                      {v ? (
                        v.marca
                      ) : (
                        <span className={onDark ? "text-white/60" : "text-[var(--color-muted)]"}>
                          Marca {i + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Stars
                        value={v?.nota ?? 0}
                        color={color}
                        emptyColor={!v && onDark ? "rgba(255,255,255,0.3)" : "#e0e0e0"}
                      />
                      {v && (
                        <span className="text-sm font-bold tabular-nums" style={{ color }}>
                          {v.nota}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p
            className={`mt-6 text-xs leading-relaxed rounded-2xl p-4 ${onDark ? "bg-white/10 border border-white/20 text-white/85" : ""}`}
            style={onDark ? undefined : { color, background: `${color}14` }}
          >
            <strong style={onDark ? { color } : undefined}>IMPORTANTE:</strong> os resultados formarão um ranking das
            20 marcas mais bem avaliadas e será divulgado na edição da revista
            MÓVEIS DE VALOR.
          </p>
          </>
          )}
        </div>
      </div>

      {regulamentoAberto && (
        <RegulamentoModal area={area} onClose={() => setRegulamentoAberto(false)} />
      )}
    </section>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  dark = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  dark?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={
        dark
          ? "w-full px-5 py-3 rounded-full bg-white/10 border border-white/25 text-white placeholder-white/50 text-base sm:text-sm focus:outline-none focus:border-white/70 transition-colors backdrop-blur-sm"
          : "w-full px-4 py-3 rounded-xl border border-[var(--color-line)] text-base sm:text-sm focus:outline-none focus:border-[var(--color-ink)] transition-colors"
      }
    />
  );
}

// botão-pílula branco no estilo do "Votar" do hero
const heroPillClass =
  "w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Stars({
  value,
  color,
  emptyColor = "#e0e0e0",
}: {
  value: number;
  color: string;
  emptyColor?: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-3 h-3"
          fill={i < value ? color : emptyColor}
        >
          <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" />
        </svg>
      ))}
    </div>
  );
}
