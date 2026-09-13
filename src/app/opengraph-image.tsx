import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Na exportação estática não existe servidor para desenhar esta imagem sob
// demanda, então ela é gerada uma vez, no build, e vira um arquivo. Sem esta
// linha o build para: o Next não assume sozinho que uma rota de imagem pode
// ser congelada.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Brasil DTF: máquinas e insumos para DTF têxtil e DTF UV";

/**
 * Social share card, used for Open Graph and Twitter alike.
 *
 * Satori (which renders this) cannot resolve `next/image` imports and cannot
 * decode WebP, so a PNG copy of the lockup is read off disk and inlined as a
 * data URI at build time.
 *
 * The display face has to be handed over as a real font file too. Satori has
 * no browser to fall back on, so an unsupplied family silently renders in its
 * default sans at a single weight, and the card comes out looking nothing like
 * the page it represents. WOFF is the compressed format it accepts; WOFF2 is
 * not.
 */
export default async function OpengraphImage() {
  const assets = join(process.cwd(), "src/modules/brand/assets");

  const [lockup, archivo] = await Promise.all([
    readFile(join(assets, "lockup-branco-og.png")),
    readFile(join(assets, "Archivo-ExtraBold.woff")),
  ]);
  const lockupSrc = `data:image/png;base64,${lockup.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "68px 76px",
          background: "#03122b",
          color: "#f4f7fc",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockupSrc} alt="" height={92} />

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              fontFamily: "Archivo",
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.02,
              maxWidth: 940,
              textTransform: "uppercase",
            }}
          >
            A estampa sai do filme e entra na peça.
          </span>
          <span style={{ fontSize: 30, color: "#9fb0c9" }}>
            Impressoras, tintas, filmes e pó para DTF têxtil e DTF UV
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 23,
            color: "#febf02",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Entrega para todo o Brasil</span>
          <span>brasildtf.com.br</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Archivo",
          data: archivo,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
