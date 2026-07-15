// Materiais de divulgação disponíveis para download na página /material.
// Coloque os arquivos em /public e referencie aqui. Enquanto a lista estiver
// vazia, a página mostra um aviso de "em breve".

export type Material = {
  titulo: string;
  descricao: string;
  arquivo: string; // caminho em /public, ex.: "/material/selo-top20.png"
  formato?: string; // ex.: "PDF", "PNG", "ZIP"
  tamanho?: string; // ex.: "2,3 MB"
};

export const MATERIAIS: Material[] = [
  // {
  //   titulo: "Selo TOP 20 2026",
  //   descricao: "Logotipo oficial do prêmio para uso na sua comunicação.",
  //   arquivo: "/material/selo-top20-2026.zip",
  //   formato: "ZIP",
  //   tamanho: "1,2 MB",
  // },
];
