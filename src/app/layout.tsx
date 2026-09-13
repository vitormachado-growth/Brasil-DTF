import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/** Display — signage grotesque, used heavy and tight. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/** Body — engineering sans, sized for reading. */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});


export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plexSans.variable}`}
    >
      <head>
        {/* Without JavaScript no timeline ever runs, so anything waiting to be
            revealed would stay invisible. Hand those elements straight to the
            reader instead. */}
        <noscript>
          <style>{`.animate-hidden{visibility:visible!important;opacity:1!important}#brand-intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>{children}</ScrollLayout>
      </body>
    </html>
  );
}
