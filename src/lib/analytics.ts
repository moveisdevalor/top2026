// Registro de acessos e eventos compatível com o analytics do site principal
// (mesmas chaves de sessão/visitante e mesmo endpoint /trackEvent).
//
// A tabela analytics_event só guarda event_type + url, então cada evento é
// codificado no event_type (namespace "top20_*") e a área/seção vai no hash
// da url (ex.: /top20#industria). O carregamento usa "page_view" para também
// aparecer nas métricas normais de acesso do site.

const BASE = process.env.NEXT_PUBLIC_API_URL || "";
const TRACK_ENDPOINT = `${BASE}/trackEvent`;

// Namespace dos acessos deste site (evita colidir com o site principal).
export const TRACK_PREFIX = "/top20";

// "/" -> "/top20" | "/comemoracao" -> "/top20/comemoracao"
function namespacePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean && clean !== "/" ? TRACK_PREFIX + clean : TRACK_PREFIX;
}

// Tipos de evento registrados no dashboard.
export const EV = {
  view: "page_view", // acesso (carregamento)
  section: (id: string) => `top20_sec_${id}`, // rolou até a seção
  voteStart: "top20_vote_start", // clicou em "Votar"
  voteId: "top20_vote_id", // se identificou (nome + email)
  voteCast: "top20_vote_cast", // registrou uma marca
  voteDone: "top20_vote_done", // concluiu os 5 votos
} as const;

const SESSION_KEY = "analytics_session_v3";
const VISITOR_KEY = "analytics_visitor_v3";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

type StoredSession = { id: string; lastActivity: number; startedAt: number };

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getSessionId(): string {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const stored = raw ? (JSON.parse(raw) as StoredSession) : null;
    if (stored?.id && now - stored.lastActivity < SESSION_TIMEOUT) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...stored, lastActivity: now }));
      return stored.id;
    }
  } catch {
    /* ignora */
  }
  const fresh: StoredSession = { id: uuid(), lastActivity: now, startedAt: now };
  localStorage.setItem(SESSION_KEY, JSON.stringify(fresh));
  return fresh.id;
}

function getVisitorId(): string {
  const stored = localStorage.getItem(VISITOR_KEY);
  if (stored) return stored;
  const id = uuid();
  localStorage.setItem(VISITOR_KEY, id);
  return id;
}

function resolveSource(): string {
  const ref = document.referrer || "";
  const rules: Array<[RegExp, string]> = [
    [/facebook|fb\.com/i, "facebook"],
    [/instagram/i, "instagram"],
    [/linkedin/i, "linkedin"],
    [/google/i, "google"],
    [/youtube/i, "youtube"],
    [/whatsapp/i, "whatsapp"],
  ];
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  if (utm) return utm.toLowerCase();
  for (const [pattern, source] of rules) if (pattern.test(ref)) return source;
  return "direct";
}

// Envia um evento (event_type + url) para o analytics.
function send(eventType: string, url: string): void {
  if (!isBrowser() || !TRACK_ENDPOINT) return;
  try {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      event_type: eventType,
      event_name: url,
      meta: { path: url, query: window.location.search, title: document.title, preview: false },
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      source: resolveSource(),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      referrer: document.referrer || null,
      user_id: null,
    };
    fetch(TRACK_ENDPOINT, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      /* ignora */
    });
  } catch {
    /* ignora */
  }
}

// Acesso (carregamento da página). A home é "/top20"; rotas extras ganham sufixo.
export function trackPageView(pathname = "/"): void {
  send(EV.view, namespacePath(pathname));
}

// Evento genérico; `area` (industria/fornecedores) ou seção vai no hash da url.
export function trackEvent(eventType: string, area?: string): void {
  send(eventType, area ? `${TRACK_PREFIX}#${area}` : TRACK_PREFIX);
}
