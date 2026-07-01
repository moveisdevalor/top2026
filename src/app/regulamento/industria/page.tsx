import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { Regulamento } from "@/components/Regulamento";

export const metadata: Metadata = {
  title: "Regulamento Indústria — TOP 20 Móveis de Valor",
  description: "Regulamento do ranking TOP 20 · Edição 2026 · Indústria.",
};

const artigos = [
  {
    num: "1º",
    body:
      "TOP 20 | Edição 2026 é uma promoção de caráter eminentemente de valor de marcas, promovida pela revista Móveis de Valor, com objetivos de reconhecer publicamente as indústrias que constroem valor através da qualidade, da parceria e do respeito ao cliente; permitir aos lojistas e/ou compradores de lojas ranquear até 05 marcas de indústrias de móveis e colchão.",
  },
  {
    num: "2º",
    body: "Os critérios considerados são:",
    itens: [
      "Qualidade de produtos",
      "Qualidade de serviços",
      "Qualidade de atendimento",
      "Qualidade de assistência pós-venda",
      "Parcerias em marketing e comunicação",
    ],
  },
  {
    num: "3º",
    body:
      "Poderão participar todos os fabricantes que produzam móveis e colchões, localizadas em território brasileiro.",
  },
  {
    num: "4º",
    body:
      "Terão direito a voto o proprietário ou o comprador da loja, havendo apenas um voto por empresa. No caso de filiais do grupo, será contabilizado apenas o primeiro voto lançado no sistema online.",
    paragrafos: [
      {
        titulo: "Parágrafo 1º",
        body:
          "Serão desconsiderados os votos não identificáveis com segurança como oriundos de lojistas, bem como as marcas de indústrias que não puderem ser identificadas com segurança.",
      },
    ],
  },
  {
    num: "5º",
    body:
      "Cada proprietário ou comprador poderá indicar até cinco indústrias, atribuindo pontuação entre 5 e 10. Indicações sem pontuação receberão a nota mínima de 5.",
  },
  {
    num: "6º",
    body:
      "Para formação do TOP 20 serão consideradas as 20 indústrias com maior pontuação, independentemente do número de indicações. O total de pontos obtidos prevalece para ranqueamento.",
  },
  {
    num: "7º",
    body:
      "Em caso de empate de pontuação além de 20, a marca que primeiro alcançar a pontuação final será considerada vencedora.",
  },
  {
    num: "8º",
    body:
      "Todas as indústrias brasileiras e estrangeiras em operação no Brasil podem ser votadas. As indústrias podem promover a votação junto a representantes comerciais.",
  },
  {
    num: "9º",
    body:
      "O formulário e regulamento estão disponíveis em top20.moveisdevalor.com.br até o final da promoção.",
  },
  {
    num: "10º",
    body:
      "O prazo para votação inicia em zero hora do dia 05 de agosto de 2026 e encerra às 24 horas do dia 07 de novembro de 2026.",
  },
  {
    num: "11º",
    body:
      "O resultado será anunciado na edição da revista MÓVEIS DE VALOR, circulando a partir de 30 de novembro de 2026.",
  },
  {
    num: "12º",
    body:
      "Todos os votos válidos serão guardados e poderão ser consultados por empresas indicadas ou participantes.",
  },
  {
    num: "13º",
    body:
      'O resultado será reconhecido como "opinião verdadeira dos clientes" das marcas vencedoras, não sendo objeto de contestação.',
  },
  {
    num: "14º",
    body:
      "Todas as marcas vencedoras terão direito de uso do selo com logotipo da promoção em sua comunicação. O arquivo digital será fornecido com informações técnicas.",
  },
  {
    num: "15º",
    body:
      "Cada indústria vencedora receberá um Certificado da revista Móveis de Valor contendo marcas da organização e patrocinador.",
  },
  {
    num: "16º",
    body:
      "Todas as indústrias indicadas e lojas votantes declaram aceitar as regras da promoção, cujo objetivo é reconhecer qualidade, serviço e parceria.",
  },
  {
    num: "17º",
    body: "Tentativas de fraude resultam no cancelamento imediato do voto.",
    paragrafos: [
      {
        titulo: "Parágrafo único",
        body:
          "Reincidência ou tentativa sistemática de manipulação resulta em desclassificação automática da marca, sem direito a contestação.",
      },
    ],
  },
  {
    num: "18º",
    body:
      "Casos omissos serão analisados pela Organização e decididos conforme o espírito da promoção.",
  },
];

export default function RegulamentoIndustriaPage() {
  return (
    <>
      <Header />
      <main>
        <Regulamento
          area="industria"
          voterLabel="Indústria"
          brandLabel="indústrias de móveis e colchões"
          data={artigos}
        />
      </main>
      <Footer />
    </>
  );
}
