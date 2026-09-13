/**
 * The "sobre" section, reproduzida da página já no ar em
 * brasildtfimpressoras.com.br.
 *
 * A copy é dele, palavra por palavra, porque já faz o trabalho dela lá: responde
 * a pergunta que o comprador tem depois de ver o preço, que é de quem ele está
 * comprando e o que acontece depois que a máquina chega.
 *
 * O quinto bullet foi reescrito a pedido do cliente em 04/09/2026, trocando o
 * "insumos abertos" pela versão dele, "insumos de qualidade". Corrigi só um
 * typo evidente na frase que ele mandou ("a de melhor" → "há de melhor");
 * o resto, incluindo a maiúscula em "Qualidade", ficou como ele escreveu.
 *
 * O segundo encurtou em 06/09/2026, também a pedido: era "Suporte em
 * português, em tempo real pelo WhatsApp" e virou só "Suporte em tempo real".
 * O idioma e o canal continuam ditos no FAQ, que é onde alguém procura por
 * eles; aqui a linha estava carregando três informações e a promessa era a
 * primeira delas.
 */
export const aboutContent = {
  eyebrow: "Sobre a Brasil DTF",
  heading: "Mais que uma máquina: um parceiro pra você produzir",

  bullets: [
    "Revenda especializada em máquinas e insumos DTF e UV-DTF.",
    "Suporte em tempo real.",
    "Treinamento incluso pra você operar desde o dia 1.",
    "Garantia e pós-venda de verdade.",
    "Insumos de Qualidade (tinta, pó de poliamida, filme): tudo que há de melhor para sua produção não parar.",
  ],

  cta: {
    label: "Tirar dúvidas no WhatsApp",
    href: "https://wa.me/5519999568864",
  },

  image: {
    alt: "Camisetas e moletom estampados em DTF, numa arara de loja de streetwear",
    /** Corner label, the same device the machine cards use. */
    badge: "Estampado em DTF",
  },
} as const;
