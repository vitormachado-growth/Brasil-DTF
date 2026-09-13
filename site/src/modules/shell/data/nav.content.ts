/**
 * Site navigation and contact points.
 *
 * The order is the one the client set for the page itself: impressoras, then
 * insumos, then programas e suporte. Navigation and page sequence stay the
 * same list, so a visitor never has to translate between them.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const navContent = {
  links: [
    { label: "Impressoras", href: "#impressoras" },
    { label: "Insumos", href: "#insumos" },
    // "Programas" is out of the menu until the client says what it is: he
    // listed it in the section order but has not explained it, and a link
    // to a section that does not exist is a defect, not a placeholder.
    { label: "Suporte", href: "#suporte" },
  ] as NavLink[],

  cta: {
    label: "Falar com a gente",
    href: "https://wa.me/5519999568864",
  },
} as const;

/**
 * Both WhatsApp numbers are real and both stay listed in the footer. The
 * buttons all point at 99956-8864, which is the one the client asked to
 * receive the clicks.
 */
export const contactContent = {
  whatsapp: ["https://wa.me/5519999568864", "https://wa.me/5519989066868"],
  instagram: "https://www.instagram.com/brasildtf/",
  youtube: "https://www.youtube.com/@BrasilDTF/videos",
  store: "https://brasildtf.com.br",
} as const;
