"use client";

import { useEffect, useRef, useState } from "react";
import { createTopVote, getVotesByEmail } from "@/lib/api";
import { getLocation, type LocationInfo } from "@/lib/location";

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
const accent = (area: Props["area"]) =>
  area === "industria" ? "#d4a017" : "#4aa0c8";
// top = 2 quando lojistas votam em indústrias / top = 1 quando indústrias votam em fornecedores
const TOP_ID = (area: Props["area"]) => (area === "industria" ? 2 : 1);

const STORAGE_KEY = (area: Props["area"]) => `top20:identity:${area}`;
const SWITCH_KEY = (area: Props["area"]) => `top20:switched:${area}`;

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

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

  const [marca, setMarca] = useState("");
  const [nota, setNota] = useState<number | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
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

  const [locStatus, setLocStatus] = useState<"idle" | "pending" | "gps" | "ip-only">("idle");
  const [manualCity, setManualCity] = useState("");
  const [editingCity, setEditingCity] = useState(false);

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
      setError("Preencha nome e email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Email inválido.");
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
    }
  };

  const addVote = async () => {
    setError("");
    if (!marca.trim()) return setError("Informe a marca.");
    if (nota === null) return setError("Selecione uma nota.");
    if (votes.some((v) => norm(v.marca) === norm(marca))) {
      return setError("Você já votou nesta marca.");
    }

    setSubmitting(true);
    try {
      const switched = localStorage.getItem(SWITCH_KEY(area)) === "1";
      const loc = locationRef.current ?? (await getLocation());
      locationRef.current = loc;

      await createTopVote({
        loja:  nome.trim(),
        email: email.trim(),
        panel: switched ? "S" : "N",
        marca: marca.trim(),
        nota,
        top:   TOP_ID(area),
        lat:   loc.lat,
        long:  loc.long,
        city:  manualCity.trim() || loc.city,
        country: loc.country,
        ip:    loc.ip,
      });

      if (switched) localStorage.removeItem(SWITCH_KEY(area));

      setVotes([...votes, { marca: marca.trim(), nota }]);
      setMarca("");
      setNota(null);
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
    setNota(null);
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
      {identified && !done && (
        <div className="lg:hidden mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${onDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
              Voto {votes.length + 1} de {MAX}
            </span>
            <span className="text-xs font-semibold" style={{ color: onDark ? "#fff" : color }}>
              {votes.length}/{MAX}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: MAX }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full transition-colors"
                style={{
                  background:
                    i < votes.length
                      ? color
                      : i === votes.length
                      ? onDark
                        ? "#fff"
                        : "var(--color-ink)"
                      : onDark
                      ? "rgba(255,255,255,0.25)"
                      : "var(--color-line)",
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-10 items-start">
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
              <a
                href="/"
                className={
                  onDark
                    ? "mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#1a4fd4] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-soft)] transition-colors"
                    : "mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                }
              >
                Voltar à home
                {onDark && <ArrowIcon />}
              </a>
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
                  <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">{heroLabel}</p>
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
                Informe seu nome e email para começar. Apenas {voterLabel.toLowerCase()}s podem votar.
              </p>
              <Input
                value={nome}
                onChange={setNome}
                placeholder="Seu nome"
                dark={onDark}
              />
              <Input
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
                dark={onDark}
              />
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
                  <p className="text-[11px] tracking-[0.3em] text-white/60 mb-3">{heroLabel}</p>
                  <h2 className="font-black text-3xl lg:text-5xl leading-none tracking-[-0.02em]">
                    {heroTitle}
                  </h2>
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className={`space-y-1 text-xs flex-1 ${onDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                  <p><strong className={onDark ? "text-white" : "text-[var(--color-ink)]"}>{nome}</strong></p>
                  <p>{email}</p>
                  <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                    </svg>
                    {editingCity ? (
                      <input
                        autoFocus
                        type="text"
                        value={manualCity}
                        onChange={(e) => setManualCity(e.target.value)}
                        onBlur={() => setEditingCity(false)}
                        onKeyDown={(e) => e.key === "Enter" && setEditingCity(false)}
                        placeholder="Sua cidade"
                        className={
                          onDark
                            ? "text-xs px-2 py-1 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/70"
                            : "text-xs px-2 py-1 border border-[var(--color-line)] rounded text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)]"
                        }
                      />
                    ) : (
                      <>
                        <span className={`font-medium ${onDark ? "text-white" : "text-[var(--color-ink)]"}`}>
                          {manualCity || "Localização não detectada"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingCity(true)}
                          className={`underline underline-offset-2 ${onDark ? "hover:text-white" : "hover:text-[var(--color-ink)]"}`}
                        >
                          alterar
                        </button>
                      </>
                    )}
                  </div>
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

              <p className={`text-xs font-semibold ${onDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                Você ainda pode indicar {remaining} marca{remaining !== 1 && "s"}, com nota entre 5 e 10.
              </p>

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
              </div>

              <div>
                <div className={`text-[11px] tracking-[0.2em] font-semibold uppercase mb-2 ${onDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                  Nota
                </div>
                <div className="grid grid-cols-6 gap-2 sm:flex sm:flex-wrap">
                  {SCORES.map((s) => {
                    const active = nota === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNota(s)}
                        className={`h-12 sm:h-11 sm:w-11 rounded-full text-base sm:text-sm font-bold transition-colors ${
                          active
                            ? "text-white"
                            : onDark
                            ? "text-white/85 border border-white/30 hover:border-white hover:text-white"
                            : "text-[var(--color-muted)] border border-[var(--color-line)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                        }`}
                        style={active ? { background: color } : undefined}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
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
          )}
        </div>

        {/* no mobile a lista "Seus votos" só aparece após concluir os 5 votos;
            no desktop fica sempre visível ao lado do formulário */}
        <div className={done ? undefined : "hidden lg:block"}>
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
        </div>
      </div>
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
