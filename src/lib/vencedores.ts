import type { TopWinner } from "@/lib/api";

export type Edicao = {
  ano: number;
  industrias: string[];
  fornecedores: string[];
};

// Agrupa os registros da tabela top_winners em edições (ano desc). A API já
// devolve ordenado por nota/votos; aqui só separamos por ano e categoria.
export function edicoesFromWinners(winners: TopWinner[]): Edicao[] {
  const porAno = new Map<number, Edicao>();
  for (const w of winners) {
    let ed = porAno.get(w.year);
    if (!ed) {
      ed = { ano: w.year, industrias: [], fornecedores: [] };
      porAno.set(w.year, ed);
    }
    // Na tabela top_winners: type 0 = indústrias, 1 = fornecedores
    (w.type === 1 ? ed.fornecedores : ed.industrias).push(w.brand);
  }
  const edicoes = [...porAno.values()].sort((a, b) => b.ano - a.ano);
  for (const ed of edicoes) {
    ed.industrias.sort((a, b) => a.localeCompare(b, "pt-BR"));
    ed.fornecedores.sort((a, b) => a.localeCompare(b, "pt-BR"));
  }
  return edicoes;
}

// Fallback exibido enquanto a API carrega ou se estiver indisponível.
// Listas ilustrativas — os nomes oficiais são divulgados nos canais Móveis de Valor.

export const edicoes: Edicao[] = [
  {
    ano: 2025,
    industrias: [
      "Móveis Alpha", "Lopas", "Henn", "Madesa", "Kappesberg",
      "Politorno", "Todeschini", "Dell Anno", "Florense", "Bontempo",
      "Sca", "Italínea", "Lider Interiores", "Artefacto", "Sierra Móveis",
      "Breton", "Estúdio Casa", "Cimol", "Carraro", "Móveis Tertúlia",
    ],
    fornecedores: [
      "Duratex", "Eucatex", "Berneck", "Arauco", "Guararapes",
      "Masisa", "Hettich", "Blum", "Soprano", "Hafele",
      "FGV", "Indufix", "Karsten", "Sultextil", "Nautika",
      "Sayerlack", "Renner", "Sherwin-Williams", "Anjo Tintas", "Jadlog",
    ],
  },
  {
    ano: 2024,
    industrias: [
      "Lopas", "Móveis Alpha", "Madesa", "Henn", "Politorno",
      "Kappesberg", "Dell Anno", "Todeschini", "Bontempo", "Florense",
      "Italínea", "Sca", "Artefacto", "Lider Interiores", "Breton",
      "Sierra Móveis", "Cimol", "Estúdio Casa", "Móveis Tertúlia", "Carraro",
    ],
    fornecedores: [
      "Eucatex", "Duratex", "Arauco", "Berneck", "Masisa",
      "Guararapes", "Blum", "Hettich", "Hafele", "Soprano",
      "Indufix", "FGV", "Sultextil", "Karsten", "Sayerlack",
      "Nautika", "Sherwin-Williams", "Renner", "Jadlog", "Anjo Tintas",
    ],
  },
  {
    ano: 2023,
    industrias: [
      "Madesa", "Henn", "Lopas", "Móveis Alpha", "Kappesberg",
      "Todeschini", "Politorno", "Florense", "Dell Anno", "Sca",
      "Bontempo", "Lider Interiores", "Italínea", "Sierra Móveis", "Artefacto",
      "Cimol", "Breton", "Carraro", "Estúdio Casa", "Móveis Tertúlia",
    ],
    fornecedores: [
      "Berneck", "Arauco", "Duratex", "Eucatex", "Hettich",
      "Masisa", "Soprano", "Guararapes", "Blum", "FGV",
      "Hafele", "Karsten", "Indufix", "Nautika", "Sultextil",
      "Renner", "Sayerlack", "Anjo Tintas", "Sherwin-Williams", "Jadlog",
    ],
  },
];
