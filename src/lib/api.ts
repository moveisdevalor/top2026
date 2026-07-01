const BASE = process.env.NEXT_PUBLIC_API_URL || "";

export type CreateTopPayload = {
  loja:    string;
  email:   string;
  panel:   "S" | "N";
  marca:   string;
  nota:    number;
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
  const now = new Date().toISOString();
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

  const res = await fetch(`${BASE}/top`, {
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
  const res = await fetch(
    `${BASE}/top/email/${encodeURIComponent(email)}`,
  );
  if (!res.ok) return [];
  const all = (await res.json()) as TopVote[];
  return top === undefined ? all : all.filter((v) => v.top === top);
}

export type VoteCounts = {
  total: number;
  byTop: Record<string, number>;
  industria: number;
  fornecedores: number;
};

// Busca totais públicos. status=1 = aprovados.
export async function getVoteCounts(status?: number): Promise<VoteCounts> {
  const url = new URL(`${BASE}/top/counts`);
  if (status !== undefined) url.searchParams.set("status", String(status));
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return { total: 0, byTop: {}, industria: 0, fornecedores: 0 };
  return res.json();
}
