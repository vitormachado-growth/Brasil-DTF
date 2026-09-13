import type { SVGProps } from "react";

export const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

export const SoundIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8.4 1.6a.8.8 0 0 0-.86.1L4.3 4.4H2.2a.8.8 0 0 0-.8.8v5.6a.8.8 0 0 0 .8.8h2.1l3.24 2.7a.8.8 0 0 0 1.31-.62V2.32a.8.8 0 0 0-.45-.72Z" />
    <path d="m15.3 5.76-.86-.86-1.84 1.84-1.84-1.84-.86.86L11.74 7.6 9.9 9.44l.86.86 1.84-1.84 1.84 1.84.86-.86L13.46 7.6l1.84-1.84Z" />
  </svg>
);

export const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.6 7.15 3.9 1.55A.98.98 0 0 0 2.4 2.4v11.2a.98.98 0 0 0 1.5.85l9.7-5.6a.98.98 0 0 0 0-1.7Z" />
  </svg>
);

/**
 * O risco do check, sozinho.
 *
 * A versao anterior desenhava o circulo cheio junto com o check, e era ela que
 * dava "cara de IA" (o cliente, 06/09/2026). Agora o icone e so o traco, e
 * quem decide o recipiente e o CSS: hoje e a `.check-box`, uma caixa de
 * marcacao de fio dourado. Separar as duas coisas e o que permite trocar o
 * recipiente sem redesenhar o icone.
 */
export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M2.5 8.6 6.2 12.3 13.5 4" />
  </svg>
);

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
    {...props}
  >
    <path d="M2.5 8h11M9.5 3.5 14 8l-4.5 4.5" />
  </svg>
);

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    {...props}
  >
    <path d="M8 2.5v11M3.5 9.5 8 14l4.5-4.5" />
  </svg>
);
