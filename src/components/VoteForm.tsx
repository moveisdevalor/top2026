"use client";

import { useEffect, useRef, useState } from "react";
import { createTopVote, getVotesByEmail } from "@/lib/api";
import { getLocation, type LocationInfo } from "@/lib/location";

type Props = {
  area: "industria" | "fornecedores";
  voterLabel: string;
  voteSubject: string;
  brandSuggestions?: string[];
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
        <div className="inline-block w-6 h-6 border-2 border-[var(--color-line)] border-t-[var(--color-ink)] rounded-full animate-spin" />
        <p className="mt-3 text-xs text-[var(--color-muted)]">Carregando seus votos...</p>
      </section>
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-12 md:py-16">
      {identified && !done && (
        <div className="lg:hidden mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[var(--color-muted)]">
              Voto {votes.length + 1} de {MAX}
            </span>
            <span className="text-xs font-semibold" style={{ color }}>
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
                      ? "var(--color-ink)"
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
            <div className="rounded-3xl bg-white border border-[var(--color-line)] p-6 sm:p-8">
              <div
                className="inline-grid place-items-center w-14 h-14 rounded-full mb-5"
                style={{ background: `${color}20`, color }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3">
                Obrigado!
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Sua participação contribui decisivamente para valorizar marcas
                que merecem reconhecimento pela qualidade de produtos e serviços.
              </p>
              <a
                href="/"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Voltar à home
              </a>
            </div>
          ) : !identified ? (
            <form
              onSubmit={identify}
              className="rounded-3xl bg-white border border-[var(--color-line)] p-5 sm:p-6 md:p-8 space-y-4"
            >
              <p className="text-xs font-semibold text-[var(--color-muted)] leading-relaxed">
                Informe seu nome e email para começar. Apenas {voterLabel.toLowerCase()}s podem votar.
              </p>
              <Input
                value={nome}
                onChange={setNome}
                placeholder="Seu nome"
              />
              <Input
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Começar a votar
              </button>
            </form>
          ) : (
            <div className="rounded-3xl bg-white border border-[var(--color-line)] p-5 sm:p-6 md:p-8 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs text-[var(--color-muted)] flex-1">
                  <p><strong className="text-[var(--color-ink)]">{nome}</strong></p>
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
                        className="text-xs px-2 py-1 border border-[var(--color-line)] rounded text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)]"
                      />
                    ) : (
                      <>
                        <span className="text-[var(--color-ink)] font-medium">
                          {manualCity || "Localização não detectada"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingCity(true)}
                          className="underline underline-offset-2 hover:text-[var(--color-ink)]"
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
                  className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors flex-shrink-0"
                >
                  Trocar
                </button>
              </div>

              <p className="text-xs font-semibold text-[var(--color-muted)]">
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
                <div className="text-[11px] tracking-[0.2em] font-semibold text-[var(--color-muted)] uppercase mb-2">
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

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="button"
                onClick={addVote}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Enviando..." : "Próximo →"}
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="text-[11px] tracking-[0.25em] font-semibold text-[var(--color-muted)] uppercase mb-4">
            Seus votos ({votes.length}/{MAX})
          </div>

          <div className="space-y-3">
            {Array.from({ length: MAX }).map((_, i) => {
              const v = votes[i];
              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-4 md:p-5 flex items-center gap-3 ${
                    v
                      ? "bg-white border-[var(--color-ink)]"
                      : "bg-[var(--color-bg-soft)] border-[var(--color-line)] border-dashed"
                  }`}
                >
                  <div
                    className="grid place-items-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
                    style={{
                      background: v ? color : "transparent",
                      color: v ? "#fff" : "var(--color-muted)",
                      border: v ? "none" : "1px solid var(--color-line)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex items-center justify-between gap-4 flex-1 min-w-0">
                    <div className="font-medium tracking-tight truncate">
                      {v ? v.marca : <span className="text-[var(--color-muted)]">Marca {i + 1}</span>}
                    </div>
                    <Stars value={v?.nota ?? 0} color={color} />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs leading-relaxed" style={{ color }}>
            <strong>IMPORTANTE:</strong> os resultados formarão um ranking das
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
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] text-base sm:text-sm focus:outline-none focus:border-[var(--color-ink)] transition-colors"
    />
  );
}

function Stars({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-3 h-3"
          fill={i < value ? color : "#e0e0e0"}
        >
          <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" />
        </svg>
      ))}
    </div>
  );
}
