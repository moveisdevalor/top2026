const BASE = process.env.NEXT_PUBLIC_API_URL || "";

// Evita que o servidor fique preso esperando a API externa travar a página inteira.
function fetchWithTimeout(input: string, init?: RequestInit, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

// Gera o timestamp já no horário de Brasília, independente do fuso do servidor.
function nowInBrazil(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}-03:00`;
}

export type CreateTopPayload = {
  loja:    string;
  email:   string;
  panel:   "S" | "N";
  marca:   string;
  // notas por atributo (5-10); a média é calculada no backend
  nota_produtos:    number;
  nota_servicos:    number;
  nota_atendimento: number;
  nota_posvenda:    number;
  nota_marketing:   number;
  top:     number;
  lat?:    string;
  long?:   string;
  city?:   string;
  country?: string;
  ip?:     string;
  date?:   string;
  dateUpdate?: string;
  status?: number;
};

export async function createTopVote(payload: CreateTopPayload) {
  const now = nowInBrazil();
  const body = {
    lat: "",
    long: "",
    city: "",
    country: "",
    ip: "",
    date: now,
    dateUpdate: now,
    status: 0,
    ...payload,
  };

  const res = await fetchWithTimeout(`${BASE}/top`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}

export type TopVote = {
  id: number;
  loja: string;
  email: string;
  panel: string;
  marca: string;
  nota: number;
  top: number;
  status: number;
  date: string;
  dateUpdate: string;
};

export async function getVotesByEmail(email: string, top?: number): Promise<TopVote[]> {
  try {
    const res = await fetchWithTimeout(`${BASE}/top/email/${encodeURIComponent(email)}`);
    if (!res.ok) return [];
    const all = (await res.json()) as TopVote[];
    return top === undefined ? all : all.filter((v) => v.top === top);
  } catch {
    return [];
  }
}

export type TopWinner = {
  id: number;
  year: number;
  brand: string;
  note: number;
  vote: number;
  link: string;
  type: number; // 0 = indústrias, 1 = fornecedores
};

// Vencedores das edições anteriores (tabela top_winners).
export async function getTopWinnersList(): Promise<TopWinner[]> {
  try {
    const res = await fetchWithTimeout(`${BASE}/top/winners-list`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export type VoteCounts = {
  total: number;
  byTop: Record<string, number>;
  industria: number;
  fornecedores: number;
};

// Busca totais públicos. status=1 = aprovados.
export async function getVoteCounts(status?: number): Promise<VoteCounts> {
  const empty = { total: 0, byTop: {}, industria: 0, fornecedores: 0 };
  try {
    const url = new URL(`${BASE}/top/counts`);
    if (status !== undefined) url.searchParams.set("status", String(status));
    const res = await fetchWithTimeout(url.toString(), { cache: "no-store" });
    if (!res.ok) return empty;
    return res.json();
  } catch {
    return empty;
  }
}
