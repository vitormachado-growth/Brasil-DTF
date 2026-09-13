"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

export interface PhotoGalleryProps {
  fotos: StaticImageData[];
  /** Nome da máquina, para o texto alternativo de cada foto. */
  nome: string;
}

/**
 * A galeria da página da máquina, com ampliação.
 *
 * O cliente pediu em 12/09/2026 para poder abrir as fotos: as miniaturas
 * mostram detalhe fino (cabeça de impressão, o que vem na caixa) que no
 * tamanho do dedão não se lê.
 *
 * Usa o `<dialog>` nativo em vez de uma sobreposição própria, e a diferença
 * não é de gosto: `showModal()` já entrega tecla Esc para fechar, foco preso
 * dentro da janela, o resto da página inerte para leitor de tela e um
 * `::backdrop` de verdade. Refazer isso à mão é onde normalmente nasce um
 * modal que o teclado não fecha.
 *
 * As fotos chegam em proporções diferentes, então dentro da janela cada uma
 * aparece inteira, limitada pela altura da tela.
 */
export const PhotoGallery = ({ fotos, nome }: PhotoGalleryProps) => {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [atual, setAtual] = useState(0);
  const pararRolagem = useScroll((s) => s.stop);
  const voltarRolagem = useScroll((s) => s.start);

  const abrir = (indice: number) => {
    setAtual(indice);
    dialogo.current?.showModal();
    // A página rola com Lenis, que move a posição por JavaScript e por isso
    // passa por cima de `overflow: hidden`. Sem parar o Lenis, a roda do mouse
    // rola o catálogo atrás da foto aberta. Esta é a mesma trava que a intro e
    // o menu do celular já usam.
    pararRolagem();
  };

  const mover = useCallback(
    (passo: number) =>
      setAtual((i) => (i + passo + fotos.length) % fotos.length),
    [fotos.length],
  );

  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;

    // Setas para trocar de foto. O Esc já é do próprio elemento.
    const aoTeclar = (e: KeyboardEvent) => {
      if (fotos.length < 2) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        mover(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        mover(-1);
      }
    };

    // `close` cobre todas as saídas de uma vez: o botão, o clique no fundo e o
    // Esc, que fecha sem passar por nenhum código nosso.
    const aoFechar = () => voltarRolagem();

    el.addEventListener("keydown", aoTeclar);
    el.addEventListener("close", aoFechar);
    return () => {
      el.removeEventListener("keydown", aoTeclar);
      el.removeEventListener("close", aoFechar);
    };
  }, [mover, fotos.length, voltarRolagem]);

  // Se a página for trocada com a foto aberta, a rolagem não pode ficar presa.
  useEffect(() => () => voltarRolagem(), [voltarRolagem]);

  const [principal, ...demais] = fotos;

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => abrir(0)}
        aria-label={`Ampliar a foto 1 de ${fotos.length} da ${nome}`}
        className="group/foto relative block overflow-hidden rounded-panel border border-accent-line bg-ink-800 shadow-[0_0_60px_-12px_rgb(254_191_2_/_0.28)]"
      >
        <Image
          src={principal}
          alt={`Impressora ${nome}`}
          priority
          sizes="(max-width: 64rem) 92vw, 46vw"
          className="aspect-square w-full bg-ink-800 object-contain transition-transform duration-500 ease-out group-hover/foto:scale-[1.02]"
        />
        <span className="type-spec absolute bottom-4 right-4 rounded-control bg-ink-950/80 px-2.5 py-1.5 text-paper opacity-0 backdrop-blur-sm transition-opacity group-hover/foto:opacity-100 group-focus-visible/foto:opacity-100">
          Ampliar
        </span>
      </button>

      {demais.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3">
          {demais.map((foto, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => abrir(i + 1)}
                aria-label={`Ampliar a foto ${i + 2} de ${fotos.length} da ${nome}`}
                className="block w-full overflow-hidden rounded-panel border border-ink-600 bg-ink-800 transition-colors hover:border-accent-line focus-visible:border-accent-line"
              >
                <Image
                  src={foto}
                  alt={`${nome}, foto ${i + 2}`}
                  loading="lazy"
                  sizes="(max-width: 64rem) 30vw, 15vw"
                  className="aspect-square w-full bg-ink-800 object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="type-spec text-muted-2">Clique na foto para ampliar</p>

      <dialog
        ref={dialogo}
        // Clicar fora da foto fecha. O clique no <dialog> só chega aqui
        // quando cai no próprio elemento, ou seja, fora do conteúdo.
        onClick={(e) => {
          if (e.target === dialogo.current) dialogo.current?.close();
        }}
        className="foto-ampliada"
      >
        <div className="relative flex max-h-[90svh] w-full max-w-5xl flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <p className="type-spec text-muted">
              {nome} · {atual + 1} de {fotos.length}
            </p>
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              aria-label="Fechar"
              className="type-action rounded-control border border-ink-600 px-3 py-2 text-xs text-paper transition-colors hover:border-accent-line hover:text-accent-hi"
            >
              Fechar
            </button>
          </div>

          <Image
            src={fotos[atual]}
            alt={`${nome}, foto ${atual + 1} de ${fotos.length}`}
            sizes="90vw"
            className="max-h-[74svh] w-full rounded-panel bg-ink-900 object-contain"
          />

          {fotos.length > 1 ? (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Foto anterior"
                className="type-action rounded-control border border-ink-600 px-4 py-2 text-xs text-paper transition-colors hover:border-accent-line hover:text-accent-hi"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Próxima foto"
                className="type-action rounded-control border border-ink-600 px-4 py-2 text-xs text-paper transition-colors hover:border-accent-line hover:text-accent-hi"
              >
                Próxima
              </button>
            </div>
          ) : null}
        </div>
      </dialog>
    </div>
  );
};
