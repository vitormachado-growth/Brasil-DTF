/**
 * The last section in the client's order: "programas e suporte".
 *
 * Only the support half is here. Every question and answer below is the FAQ
 * already live at brasildtfimpressoras.com.br, word for word, and the closing
 * band is that page's closing band. Nothing was written new.
 *
 * "Programas" is not here because the client has never said what it means
 * (asked twice, no answer). The best guess is the RIP software that ships
 * with the machines, but a guess is not a section.
 *
 * Answers use **double asterisks** for the bold the original marked with
 * <strong>; `FaqList` renders them.
 */

/** The number the client chose to receive the clicks. */
const WHATSAPP = "5519999568864";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "O que é DTF?",
    a: "DTF (**Direct to Film**) é a impressão num filme especial que depois é transferido pro tecido com calor. Estampa **qualquer cor de tecido**, com cores vivas e ótima durabilidade.",
  },
  {
    q: "Preciso de experiência?",
    a: "Não. Todas as máquinas saem com **treinamento incluso** pra você operar desde o primeiro dia.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Todas as impressoras têm **garantia e suporte técnico**.",
  },
  {
    q: "Vocês dão suporte?",
    a: "Sim, **suporte em português pelo WhatsApp** em tempo real.",
  },
  {
    q: "Dá pra parcelar?",
    a: "Temos **condições facilitadas** de pagamento. Fale com a gente no WhatsApp pra ver a melhor opção pra você.",
  },
  {
    q: "Qual a diferença de têxtil pra UV-DTF?",
    a: "**Têxtil** é pra estampar tecidos (camisetas, moletons). **UV-DTF** é pra superfícies rígidas e rótulos crystal (vidro, metal, plástico, acrílico, madeira).",
  },
  {
    q: "Quais insumos eu preciso?",
    a: "Tinta, pó de poliamida e filme PET. **A Brasil DTF fornece os insumos**.",
  },
];

/**
 * Keeps a hyphenated term whole on a narrow screen: "UV-DTF" and "Z650-2" were
 * breaking at the hyphen. U+2011 is the non-breaking hyphen, and it is applied
 * at display time only, so the schema and any copied text keep the ordinary
 * character that a screen reader and a search engine expect.
 */
export const keepTermsWhole = (text: string): string =>
  text.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, "$1‑$2");

/** Plain text of an answer, for the FAQPage schema: Google wants no markup there. */
export const plainAnswer = (a: string): string => a.replace(/\*\*/g, "");

/**
 * The picker from the client's live page, beside the questions. It is the one
 * thing a visitor who read eight machine cards still cannot answer on their
 * own: which row am I. Five rows cover all eight machines; the two adapted
 * ones share the first row because the only choice between them is sheet size.
 */
export interface GuideRow {
  who: string;
  pick: string;
}

export const guide: GuideRow[] = [
  { who: "Começando agora", pick: "L8050 (A4) ou L8180 (A3)" },
  { who: "Pequeno negócio", pick: "XF-400PRO A2" },
  { who: "Produção em 60 cm", pick: "702E C650SC ou Z650-2" },
  { who: "Alto volume", pick: "C605 H6502" },
  { who: "UV e rótulos", pick: "XF-420S ou XF-450S" },
];

export const supportContent = {
  eyebrow: "Suporte",
  /** The live page's FAQ heading. */
  heading: "Perguntas rápidas",
  lead: "O que quase todo mundo pergunta antes de comprar a primeira máquina. Se a sua não estiver aqui, o WhatsApp responde.",

  guide: {
    heading: "Qual máquina é pra você?",
    cta: {
      label: "Me ajuda a escolher",
      href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        "Olá! Me ajuda a escolher a máquina DTF certa pro meu caso?",
      )}`,
    },
  },

  /**
   * The live page's closing band, verbatim.
   *
   * Split by line for the same reason the hero headline is: left to break on
   * its own it fell into three lines with "a" stranded at the end of the
   * second. The words are unchanged, only the breaks are chosen.
   */
  band: {
    titleLines: ["Pronto pra começar", "a faturar com DTF?"],
    /** The same word the hero pays in gold, in the same promise. */
    highlight: "faturar",
    subtitle:
      "Fale com a gente no WhatsApp: a gente te ajuda a escolher a máquina certa, tira suas dúvidas e passa as condições.",
    cta: {
      label: "Falar no WhatsApp",
      href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        "Olá! Quero começar no DTF e preciso de ajuda pra escolher a máquina certa.",
      )}`,
    },
    /**
     * The number spelled out under the button, for whoever would rather save
     * it than click. It is the same line the button dials, formatted; nothing
     * new is being claimed here.
     */
    phone: "WhatsApp (19) 99956-8864",
  },
} as const;
