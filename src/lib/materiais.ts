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
  {
    titulo: "Fornecedores: acrescente sua logo",
    descricao: "Arte para fornecedores divulgarem participação no TOP 20.",
    arquivo: "/Fornecedores_ Acrescente sua logo_TOP20.jpg",
    formato: "JPG",
    tamanho: "672 KB",
  },
  {
    titulo: "Fornecedores: acrescente sua logo",
    descricao: "Arte para fornecedores divulgarem participação no TOP 20.",
    arquivo: "/Fornecedores_ Acrescente sua logo_TOP20.pdf",
    formato: "PDF",
    tamanho: "27 MB",
  },
  {
    titulo: "Indústria: acrescente sua logo",
    descricao: "Arte para indústria divulgar participação no TOP 20.",
    arquivo: "/Indústria_ Acrescente sua logo_TOP20.jpg",
    formato: "JPG",
    tamanho: "661 KB",
  },
  {
    titulo: "Indústria: acrescente sua logo",
    descricao: "Arte para indústria divulgar participação no TOP 20.",
    arquivo: "/Indústria_ Acrescente sua logo_TOP20.pdf",
    formato: "PDF",
    tamanho: "27 MB",
  },
  {
    titulo: "Logo TOP20",
    descricao: "Logotipo oficial do prêmio TOP 20.",
    arquivo: "/Logo_TOP20.png",
    formato: "PNG",
    tamanho: "795 KB",
  },
  {
    titulo: "Logo TOP20",
    descricao: "Logotipo oficial do prêmio TOP 20.",
    arquivo: "/Logo_TOP20_2026.pdf",
    formato: "PDF",
    tamanho: "2,5 MB",
  },
];
