import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático: o build grava o HTML pronto em `out/` em vez de subir um
  // servidor. Não é uma troca de qualidade, é de embalagem. O `next build`
  // já marcava 12 das 13 rotas como prerenderizadas; a única dinâmica era uma
  // rota de exemplo do template que nada usava, e ela saiu. Todo o movimento
  // da página (GSAP, Lenis, a abertura, a ampliação das fotos) é JavaScript
  // de navegador e vai igual.
  output: "export",

  // Pin the workspace root — silences Next's "inferred workspace root" warning
  // when lockfiles exist above this project directory.
  turbopack: {
    root: __dirname,
  },

  // Drop the `X-Powered-By: Next.js` response header.
  poweredByHeader: false,

  compiler: {
    // Strip `console.*` from production bundles, keeping error/warn for
    // monitoring. Left on in dev so logs stay available.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    // Obrigatório na exportação estática: sem servidor, não há quem gere as
    // versões redimensionadas sob demanda, então cada foto é servida como
    // está. Não muda o que aparece na tela, muda quantos bytes o celular
    // baixa. Aceitável aqui porque todas já foram convertidas para webp no
    // tamanho de uso (cards 800px, galeria no máximo 1200px, 2,9 MB no total).
    // Para recuperar o redimensionamento sem voltar a ter servidor, o caminho
    // é o Polish/Image Resizing da própria Cloudflare.
    unoptimized: true,

    // Modern formats — smaller than JPEG/PNG; the browser picks what it supports.
    formats: ["image/avif", "image/webp"],
    // Breakpoints `next/image` uses to build `srcset`. `deviceSizes` covers
    // full-width images (aligned with the adaptive-grid breakpoints + retina);
    // `imageSizes` covers smaller, fixed-width images and icons.
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // React Compiler (automatic memoisation) is an opt-in performance win.
  // It requires the `babel-plugin-react-compiler` dev dependency and routes
  // the build through Babel — enable once installed:
  // reactCompiler: true,
};

export default nextConfig;
