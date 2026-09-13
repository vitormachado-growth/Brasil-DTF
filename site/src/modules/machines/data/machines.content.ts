/**
 * As oito impressoras, na ordem que o comprador se encontra nelas: do kit de
 * entrada à industrial, por preço crescente dentro de cada linha.
 *
 * Nome, diferencial, público e ficha vieram da primeira landing page deste
 * cliente, não foram escritos aqui. O que muda é a apresentação.
 *
 * A L8050 A4 (R$ 9.900) entrou em 04/09/2026 com dados reais do cliente. Em
 * 05/09 ele corrigiu: ela é um modelo A MAIS, não substitui a L8180 A3
 * (R$ 14.980) da página antiga, que voltou. São duas adaptadas de entrada,
 * uma por formato de folha.
 *
 * Preços confirmados em 10/09/2026. O cliente mandou a tabela de parcelas e
 * disse que todos os valores do site são à vista. As parcelas batem com eles
 * nas oito máquinas: 12 vezes a parcela dá cerca de 1,20 vez o preço à vista
 * em todas (1,19 na L8180 e na C605). Ou seja, a tabela foi calculada em cima
 * destes preços exatos, o que encerra a pendência de "alguns preços mudaram".
 *
 * Os selos também foram reescritos por ele no mesmo dia, trocando a faixa
 * ("Compacta", "Profissional") pelo tipo de impressora. A ordem das palavras
 * foi normalizada para um padrão só, Impressora + tipo + processo + formato,
 * porque no áudio ela variava de uma máquina para outra.
 */

/** O número que o cliente escolheu para receber os cliques. */
const WHATSAPP = "5519999568864";

/** Todas as máquinas parcelam no mesmo número de vezes. */
export const INSTALLMENTS = 12;

/**
 * Abre a conversa já no assunto. Quem clica num card não deveria ter que
 * digitar de qual máquina está falando, e do outro lado a mensagem chega
 * dizendo o que a pessoa estava olhando.
 */
export const whatsappUrl = (machine: Machine): string =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Tenho interesse na ${machine.inquiry}. Pode me passar mais informações?`,
  )}`;

export type MachineLine = "textil" | "uv";

export interface MachineSpec {
  label: string;
  value: string;
}

export interface Machine {
  slug: string;
  name: string;
  line: MachineLine;
  /** Tipo de impressora, processo e formato, nas palavras do cliente. */
  badge: string;
  /** O diferencial em uma linha. É por isso que a pessoa para no card. */
  tagline: string;
  /** Para quem a máquina é, que é o que faz o comprador se reconhecer. */
  target: string;
  /** Preço à vista, em reais. */
  price?: number;
  /** Valor de cada parcela no parcelado em `INSTALLMENTS` vezes. */
  installment?: number;
  specs: MachineSpec[];
  /** Nome que entra na mensagem pronta do WhatsApp. */
  inquiry: string;
}

export const machines: Machine[] = [
  {
    slug: "l8050-xp600-pro",
    name: "L8050 XP600-PRO",
    line: "textil",
    badge: "Impressora adaptada DTF têxtil A4",
    tagline: "O jeito mais barato e completo de começar no DTF.",
    target: "Quem está começando o primeiro negócio.",
    price: 9900,
    installment: 990,
    specs: [
      { label: "Cabeças", value: "1× Epson XP600-PRO" },
      { label: "Largura", value: "Somente Folha A4" },
      // CONFIRMAR: o cliente mandou o modelo, o preço e o kit certos em
      // 04/09/2026, mas não a velocidade. O número antigo (7 min/folha) era
      // do L8180, uma máquina diferente: não reaproveitar sem confirmar.
      { label: "Velocidade", value: "Sob consulta" },
    ],
    inquiry: "Impressora Adaptada DTF Têxtil L8050 - A4 / XP600-PRO",
  },
  {
    slug: "l8180-xp600",
    name: "L8180 XP600",
    line: "textil",
    badge: "Impressora adaptada DTF têxtil A3",
    tagline: "A adaptada de folha A3, com forno e mesa a vácuo no kit.",
    target: "Quem começa já querendo o formato maior.",
    price: 14980,
    installment: 1490,
    specs: [
      { label: "Cabeças", value: "1× Epson XP600" },
      { label: "Largura", value: "Somente Folha A3" },
      { label: "Velocidade", value: "1 folha a cada 7 min" },
    ],
    inquiry: "Impressora DTF L8180 XP600 - Kit Completo",
  },
  {
    slug: "xf-450s-uv",
    name: "XF-450S UV",
    line: "uv",
    badge: "Impressora industrial DTF UV",
    tagline: "Imprime e lamina rótulos crystal numa passada.",
    target: "Estúdios e PMEs de rótulos e superfícies rígidas.",
    price: 49900,
    installment: 4990,
    specs: [
      { label: "Cabeças", value: "3× Epson i1600" },
      { label: "Largura", value: "30 cm" },
      { label: "Velocidade", value: "até 10 m lineares/h" },
    ],
    inquiry: "XF-450S UV (Crystal Label)",
  },
  {
    slug: "xf-400pro-a2",
    name: "XF-400PRO A2",
    line: "textil",
    badge: "Impressora industrial DTF têxtil 42 cm",
    tagline: "All-in-one compacta: imprime, aplica pó e cura num equipamento só.",
    target: "Pequeno negócio ou quem quer subir do A3.",
    price: 53900,
    installment: 5390,
    specs: [
      { label: "Cabeças", value: "2× Epson F1080-A1" },
      { label: "Largura", value: "42 cm" },
      { label: "Velocidade", value: "até 10 m lineares/h" },
    ],
    inquiry: "XF-400PRO A2",
  },
  {
    slug: "702e-c650sc",
    name: "702E C650SC",
    line: "textil",
    badge: "Impressora industrial DTF têxtil 60 cm",
    tagline: "Entrada no formato 60 cm com pó e cura automáticos.",
    target: "Produção têxtil em crescimento.",
    price: 69900,
    installment: 6990,
    specs: [
      { label: "Cabeças", value: "2× Epson i3200-A1" },
      { label: "Largura", value: "60 cm" },
      { label: "Velocidade", value: "até 10 m lineares/h" },
    ],
    inquiry: "702E + C650SC (60cm Dual i3200)",
  },
  {
    slug: "xf-420s",
    name: "XF-420S",
    line: "uv",
    badge: "Impressora industrial DTF UV",
    tagline: "UV-DTF e bordado 3D no mesmo equipamento.",
    target: "Quem quer rótulos e adesivos premium com efeito 3D.",
    price: 69900,
    installment: 6990,
    specs: [
      { label: "Cabeças", value: "4× Epson i1600" },
      { label: "Largura", value: "42 cm" },
      { label: "Velocidade", value: "até 16 m lineares/h" },
    ],
    inquiry: "XF-420S (UV-DTF + Bordado 3D)",
  },
  {
    slug: "702e-z650-2",
    name: "702E Z650-2",
    line: "textil",
    badge: "Impressora industrial DTF têxtil 60 cm",
    tagline: "A 60 cm mais rápida para quem já produz em escala.",
    target: "Confecção e produção em volume.",
    price: 79900,
    installment: 7990,
    specs: [
      { label: "Cabeças", value: "2× Epson i3200-A1" },
      { label: "Largura", value: "60 cm" },
      { label: "Velocidade", value: "até 12 m lineares/h" },
    ],
    inquiry: "702E + Z650-2 (60cm Dual i3200, alta velocidade)",
  },
  {
    slug: "c605-h6502",
    name: "C605 H6502",
    line: "textil",
    // No print que o cliente mandou, os três selos de 60 cm aparecem juntos
    // e ele pediu o novo texto "em todas". Esta era "Industrial • 5 cabeças",
    // não "Profissional", mas também é de 60 cm e entrou no mesmo pedido. As
    // cinco cabeças continuam ditas no diferencial e na ficha.
    badge: "Impressora industrial DTF têxtil 60 cm",
    tagline: "Máquina industrial de 5 cabeças para alto volume.",
    target: "Operação de médio e grande porte.",
    price: 109900,
    installment: 10900,
    specs: [
      { label: "Cabeças", value: "5× Epson i3200-A1" },
      { label: "Largura", value: "60 cm" },
      { label: "Velocidade", value: "até 50 m lineares/h" },
    ],
    inquiry: "C605 + H6502 (industrial 5 cabeças 60cm)",
  },
];

export const machinesContent = {
  eyebrow: "Impressoras",
  heading: "Escolha pela produção que você quer ter",
  lead: "Oito modelos, do kit A4 para quem está começando à industrial de cinco cabeças. Todas saem com insumos, treinamento e garantia.",
  groups: [
    {
      line: "textil" as MachineLine,
      label: "DTF Têxtil",
      note: "Camiseta, moletom, boné e qualquer tecido.",
    },
    {
      line: "uv" as MachineLine,
      label: "DTF UV",
      note: "Rótulo crystal e superfície rígida: vidro, metal, acrílico, madeira.",
    },
  ],
  /** CONFIRMAR com o cliente se ele quer manter esta ressalva. */
  disclaimer:
    "Valores de referência. Confirme a condição e o prazo de entrega no WhatsApp.",
  cardCta: "Falar no WhatsApp",
  /** O botão que o cliente pediu em 10/09/2026, ao lado do WhatsApp. */
  cardDetails: "Ver detalhes",

  /**
   * A página de cada máquina. Os títulos e a faixa final são os mesmos da
   * página que já está no ar em brasildtfimpressoras.com.br/maquinas/<slug>,
   * que o cliente apontou como espelho.
   */
  detail: {
    back: "Voltar ao catálogo",
    highlights: "Destaques",
    kit: "O que acompanha",
    specs: "Especificações",
    bandTitle: "Quer essa máquina ou tem dúvidas?",
    bandText:
      "Fale com a Brasil DTF no WhatsApp: a gente passa as condições, tira dúvidas técnicas e te ajuda a decidir.",
    idealFor: "Ideal para",
  },
} as const;
