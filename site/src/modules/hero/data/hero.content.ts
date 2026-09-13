/**
 * Hero copy and figures.
 *
 * No text is hardcoded in the components. Contact details and the product
 * taxonomy were recovered from the live store rather than invented; anything
 * still marked CONFIRMAR is waiting on the client.
 */

export interface HeroStat {
  /** Text before the figure, same weight as the figure. */
  prefix?: string;
  value: number;
  /** Text directly after the figure, always in the accent colour. */
  suffix: string;
  label: string;
}

export const heroContent = {
  eyebrow: "DTF Têxtil e DTF UV",

  /**
   * The client asked for the live page's angle rather than the one we had
   * written: sell the outcome, not the technique. So the promise is his,
   * "a máquina DTF certa pra você começar a faturar", with the vague "começar"
   * traded for a claim his own FAQ already makes, that the training gets a
   * buyer producing from day one.
   *
   * Split by line so the display type breaks where it was designed to.
   */
  headingLines: ["A máquina DTF certa", "pra você faturar", "desde o 1º dia."],

  /** Carries the accent inside the headline, the way the live page does. */
  headingHighlight: "faturar",

  primaryCta: {
    label: "Falar no WhatsApp",
    href: "https://wa.me/5519999568864",
  },
  secondaryCta: {
    label: "Ver as 8 máquinas",
    href: "#impressoras",
  },

  /**
   * The same video the live page already leads with. It answers the one
   * question every visitor arrives with, which of the two DTF processes they
   * actually need, and it is the client on camera rather than stock footage.
   */
  video: {
    id: "iYdo2qmbD2o",
    label: "Assistir ao vídeo: qual a diferença entre DTF Têxtil e DTF UV",
  },

  /**
   * Reassurance, in the slot a standard landing page puts it: right under the
   * buttons. "Garantia + treinamento" is word for word from the page already
   * live at brasildtfimpressoras.com.br; the other two were reworded at the
   * client's request, on 03/09/2026, to read as a benefit rather than a
   * channel.
   *
   * CONFIRMAR: "Suporte Presencial/Remoto" claims an in-person option the
   * live copy never did. Confirm that's real before this ships. The prazo
   * da garantia is also still open.
   */
  trust: ["Garantia + treinamento", "Suporte Presencial/Remoto", "Insumos Premium"],

  /**
   * Two claims about the business, not the technique, swapped in at the
   * client's request on 03/09/2026 for the press parameters this used to
   * hold. Both numbers are placeholders written to match his brief, not
   * figures he has confirmed.
   *
   * CONFIRMAR: "+1000" clientes and "24h" de suporte precisam ser reais antes
   * de publicar. Não inventar prova social.
   */
  stats: [
    { prefix: "+ de ", value: 1000, suffix: " Clientes", label: "Todos os estados do Brasil" },
    { prefix: "Suporte ", value: 24, suffix: "H", label: "O suporte que você precisa" },
  ] as HeroStat[],

  /** Left slot of the hero status bar. */
  statusLine: "Máquinas e insumos, entrega para todo o Brasil",

  scrollLabel: "Rolar",
} as const;
