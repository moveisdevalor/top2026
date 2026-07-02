import type { Metadata } from "next";
import { MenuInvertido } from "@/components/MenuInvertido";
import { Footer } from "@/components/Sections";
import { Regulamento } from "@/components/Regulamento";

export const metadata: Metadata = {
  title: "Regulamento Fornecedor — TOP 20 Móveis de Valor",
  description: "Regulamento do ranking TOP 20 · Edição 2026 · Fornecedor.",
};

const artigos = [
  {
    num: "1º",
    body:
      "TOP 20 | Edição 2026 é uma promoção de caráter eminentemente de valor de marcas, promovida pela revista Móveis de Valor, e tem como principais objetivos: reconhecer publicamente as marcas que constroem valor através da qualidade, da parceria e do respeito ao cliente; permitir aos fabricantes e/ou compradores de fábricas ranquear até 05 marcas de fornecedores das indústrias de móveis e colchão, a partir dos critérios de qualidade nomeados a seguir.",
  },
  {
    num: "2º",
    body: "Os critérios considerados pelo TOP 20 | Edição 2026 são:",
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
      "Poderão concorrer na formação do Ranking TOP 20 todos os fornecedores que produzam máquinas, equipamentos, matérias-primas e insumos para produção de móveis e colchões, localizadas em território brasileiro.",
  },
  {
    num: "4º",
    body:
      "Terão direito a voto o proprietário ou o comprador da indústria, o que significa que poderá haver apenas um voto por empresa, observando-se que, no caso de haver mais filiais do grupo, serão contabilizados apenas o primeiro voto lançado no sistema online.",
    paragrafos: [
      {
        titulo: "Parágrafo 1º",
        body:
          "Serão desconsiderados os votos que não puderem ser identificados com segurança como oriundo de fabricantes, de acordo com os critérios indicados acima e, da mesma forma, as marcas de fornecedores que não puderem ser identificadas com segurança.",
      },
    ],
  },
  {
    num: "5º",
    body:
      "Cada proprietário ou comprador de indústria poderá indicar até cinco marcas, atribuindo a cada uma delas pontuação entre 5 e 10. Onde houver indicação de marcas de fornecedores, porém sem que se indique pontuação, será atribuída a menor nota do prêmio = 5.",
  },
  {
    num: "6º",
    body:
      "Para formação do TOP 20 | Edição 2026 serão consideradas as 20 marcas com maior pontuação, independentemente do número de indicações. Para efeito de ranqueamento, prevalecerá sempre o total de pontos obtidos na pesquisa.",
  },
  {
    num: "7º",
    body:
      "Em caráter excepcional, caso haja empate de pontuação além de 20, a organização do TOP 20 | Edição 2026 considerará vencedora a marca que primeiro alcançar a pontuação final.",
  },
  {
    num: "8º",
    body:
      "Todas as marcas brasileiras de fornecedores das indústrias de móveis e colchões — ou estrangeiras em operação no Brasil — estão aptas a serem votadas, bem como permite-se que promovam o TOP 20 | Edição 2026 junto a seus representantes comerciais, estimulando fabricantes a apoiá-las para obtenção de indicações.",
  },
  {
    num: "9º",
    body:
      "O formulário da pesquisa e o presente Regulamento encontram-se disponíveis neste site top20.moveisdevalor.com.br, permanecendo à disposição dos interessados até o final da promoção.",
  },
  {
    num: "10º",
    body:
      "O prazo para votação se inicia a zero hora do dia 05 de agosto de 2026 e se encerrará, impreterivelmente, às 24 horas do dia 07 de novembro de 2026.",
  },
  {
    num: "11º",
    body:
      "O resultado da pesquisa será anunciado na edição da revista MÓVEIS DE VALOR, que circulará a partir de 30 de novembro de 2026.",
  },
  {
    num: "12º",
    body:
      "Todos os votos válidos, a partir do preenchimento de questionário, serão guardados pela organização do TOP 20 | Edição 2026 e poderão ser consultados, a pedido, por empresas indicadas ou participantes da votação.",
  },
  {
    num: "13º",
    body:
      "O resultado será reconhecido como a opinião verdadeira dos clientes das marcas vencedoras, não sendo objeto de contestação por quem quer que seja.",
  },
  {
    num: "14º",
    body:
      "Todas as marcas de fornecedores que formarem o TOP 20 | Edição 2026 terão direito de uso do selo, com o logotipo da promoção, em sua comunicação. Para isso devem solicitar o arquivo digital do logotipo que será fornecido com todas as informações técnicas para os diversos usos.",
  },
  {
    num: "15º",
    body:
      "Cada fornecedor que figurar na relação dos vencedores do ranking receberá da revista Móveis de Valor um Certificado alusivo ao evento, contendo as marcas da organização e do patrocinador da promoção.",
  },
  {
    num: "16º",
    body:
      "Todas as marcas de fornecedores indicadas, bem como as indústrias votantes, declaram explicitamente aceitar as regras da promoção TOP 20 | Edição 2026, que tem como principal objetivo reconhecer o valor de quem leva produtos, serviços, atendimento, assistência de qualidade e parceria para viabilizar a produção de móveis e colchões, facilitando a atividade de seus clientes e melhorando a imagem do setor de móveis e colchões junto ao mercado.",
  },
  {
    num: "17º",
    body:
      "Caso seja comprovada qualquer tentativa de fraude no processo de votação, o voto será imediatamente cancelado.",
    paragrafos: [
      {
        titulo: "Parágrafo único",
        body:
          "Em caso de reincidência ou tentativa sistemática de manipulação dos resultados, a marca envolvida poderá ser automaticamente desclassificada do Ranking TOP 20 | Edição 2026, sem direito a contestação.",
      },
    ],
  },
  {
    num: "18º",
    body:
      "Casos omissos ao presente Regulamento serão analisados pela Organização do prêmio e decididos dentro do espírito que rege esta promoção.",
  },
];

export default function RegulamentoFornecedorPage() {
  return (
    <>
      <MenuInvertido />
      <main>
        <Regulamento
          area="fornecedor"
          voterLabel="Fornecedor"
          brandLabel="fornecedores das indústrias do mobiliário"
          data={artigos}
        />
      </main>
      <Footer />
    </>
  );
}
