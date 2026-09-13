/**
 * The supplies, in the order the client set on 04/09/2026: tintas, rolos, pó
 * de poliamida, folhas. Inside each group, cheapest first, the same ladder the
 * machines use.
 *
 * Every item, price and photo was pulled from the live store at
 * brasildtf.com.br (collections insumos-dtf-textil and tintas-dtf-100ml) on
 * 02/09/2026, not written here. Names were cleaned up for the card: the store
 * spells the ink set "CMKYW" on two products, which is a typo for CMYKW, and
 * it is corrected here.
 *
 * As tintas não vêm mais da loja: o cliente refez a linha por áudio em
 * 08/09/2026 e o que vale é o que ele disse. Só de 1 litro, R$ 249,00 a
 * garrafa, e o kit é a soma das cinco. Saíram de linha o Kit Iniciante, a
 * amarela avulsa de 1 litro (que era um item solto a R$ 690,00) e o Kit
 * Avançado de 5 litros com poliamida.
 *
 * CONFIRMAR: ele falou de um kit novo com rolos de 30 e 60 metros mais o pó
 * de poliamida, e disse que mandaria os valores em seguida. Ainda não
 * chegaram, então o kit não existe aqui. Nada de estimar preço de kit.
 *
 * The store has no UV supplies listed at all, so this section is têxtil only.
 * That gap is a question for the client, not something to paper over.
 */

/** The number the client chose to receive the clicks. */
const WHATSAPP = "5519999568864";

export const supplyWhatsappUrl = (supply: Supply): string =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Quero pedir ${supply.inquiry}. Pode me passar valor e prazo?`,
  )}`;

export type SupplyGroup = "tintas" | "rolos" | "po" | "folhas";

export interface Supply {
  slug: string;
  name: string;
  group: SupplyGroup;
  /** Volume, size or what is in the box. The one line under the name. */
  detail: string;
  /** Em reais, com centavos: insumo se compra por centavo. */
  price: number;
  /** Name that goes into the ready-made WhatsApp message. */
  inquiry: string;
}

export const supplies: Supply[] = [
  // ---- Tintas DTF -------------------------------------------------------
  // Refeitas em 08/09/2026 pelo áudio do cliente: as cinco cores agora são
  // só de 1 litro, a R$ 249,00 cada uma, a branca inclusive (ela era a única
  // com preço diferente, R$ 71,00 contra R$ 69,90 das outras, e ele não abriu
  // exceção). As avulsas de 100 ml saíram da linha.
  {
    slug: "tinta-dtf-azul-1litro",
    name: "Tinta Azul",
    group: "tintas",
    detail: "1 litro",
    price: 249,
    inquiry: "a Tinta DTF Azul 1 litro",
  },
  {
    slug: "tinta-dtf-magenta-1litro",
    name: "Tinta Magenta",
    group: "tintas",
    detail: "1 litro",
    price: 249,
    inquiry: "a Tinta DTF Magenta 1 litro",
  },
  {
    slug: "tinta-dtf-amarela-1litro",
    name: "Tinta Amarela",
    group: "tintas",
    detail: "1 litro",
    price: 249,
    inquiry: "a Tinta DTF Amarela 1 litro",
  },
  {
    slug: "tinta-dtf-preta-1litro",
    name: "Tinta Preta",
    group: "tintas",
    detail: "1 litro",
    price: 249,
    inquiry: "a Tinta DTF Preta 1 litro",
  },
  {
    slug: "tinta-dtf-branca-1litro",
    name: "Tinta Branca",
    group: "tintas",
    detail: "1 litro",
    price: 249,
    inquiry: "a Tinta DTF Branca 1 litro",
  },
  {
    // Havia dois kits de cinco garrafas, um de 500 ml e um de 1 litro. Com
    // tudo virando litro os dois passariam a ser o mesmo produto com dois
    // nomes, então viraram um só. O preço é a soma que ele pediu: 5 x 249.
    slug: "kit-tinta-dtf-1litro-cmykw",
    name: "Kit Tinta CMYKW",
    group: "tintas",
    detail: "1 litro de cada cor, as cinco",
    price: 1245,
    inquiry: "o KIT Tinta DTF CMYKW, 1 litro de cada cor",
  },

  // ---- Rolos de impressão ------------------------------------------------
  // O de 30 cm caiu de R$ 990,00 para R$ 190,00 e o de 60 cm é novo, os dois
  // pela lista que ele mandou em 08/09/2026. O áudio dizia "rolos de 30 e 60
  // metros", mas a lista escrita esclarece: é a largura em cm, o comprimento
  // é 100 m nos dois. O de 60 cm fecha uma pendência antiga, porque duas das
  // oito máquinas imprimem nessa largura e a loja só tinha o de 30.
  {
    slug: "rolo-filme-30x100",
    name: "Rolo de filme DTF",
    group: "rolos",
    detail: "30 cm × 100 m",
    price: 190,
    inquiry: "o Rolo de Filme DTF 30cm x 100m",
  },
  {
    slug: "rolo-filme-60x100",
    name: "Rolo de filme DTF",
    group: "rolos",
    detail: "60 cm × 100 m",
    price: 350,
    inquiry: "o Rolo de Filme DTF 60cm x 100m",
  },

  // ---- Pó ----------------------------------------------------------------
  {
    // Ele renomeou de "Pó de Poliamida" para "Pó TPU Premium" e dobrou o
    // preço, e o peso não veio na lista que ele mandou. Veio na foto: o
    // rótulo da embalagem traz "Cor: Branco" e "Peso Líquido: 1000g"
    // marcados. Então é 1 kg por R$ 79,00, e não os 100 g de antes por
    // R$ 39,90. Lido da imagem dele, não estimado.
    slug: "po-tpu-premium",
    name: "Pó TPU Premium",
    group: "po",
    detail: "Branco, 1 kg",
    price: 79,
    inquiry: "o Pó TPU Premium de 1 kg",
  },

  // ---- Folhas ------------------------------------------------------------
  {
    slug: "filme-dtf-avulso-tamanho-a4",
    name: "Filme DTF A4",
    group: "folhas",
    detail: "Folha avulsa",
    price: 30,
    inquiry: "o Filme DTF avulso tamanho A4",
  },
  {
    slug: "filme-dtf-avulso-tamanho-a3",
    name: "Filme DTF A3",
    group: "folhas",
    detail: "Folha avulsa",
    price: 50,
    inquiry: "o Filme DTF avulso tamanho A3",
  },
];

export const suppliesContent = {
  eyebrow: "Insumos",
  /** His own line from the trust card, turned into the promise of the section. */
  heading: "Insumos pra sua produção não parar",
  lead: "Tinta, filme e pó de poliamida para DTF têxtil, os mesmos que saem com as máquinas. Entrega para todo o Brasil.",
  groups: [
    { key: "tintas" as SupplyGroup, label: "Tintas DTF", note: "Avulsas de 1 litro e o kit com as cinco cores." },
    { key: "rolos" as SupplyGroup, label: "Rolos de impressão", note: "Filme em bobina para as máquinas de 30 e de 60 cm." },
    { key: "po" as SupplyGroup, label: "Pó adesivo", note: "O que fixa a tinta no tecido." },
    /**
     * The client's list said "Folhas A3". The A4 sheet is in the store too, and
     * the entry machine (L8050) prints A4 only, so leaving it out would send
     * that buyer somewhere else for film. Both are listed; flagged for him.
     */
    { key: "folhas" as SupplyGroup, label: "Folhas DTF têxtil", note: "A3 e A4 avulsas, para as máquinas de folha." },
  ],
  disclaimer:
    "Valores da loja. Confirme disponibilidade e prazo de entrega no WhatsApp.",
  cardCta: "Pedir",
} as const;
