import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { machines } from "@/modules/machines/data/machines.content";
import { MachineDetailView } from "@/views/machine-detail";

/**
 * Uma página por máquina, em /maquinas/<slug>.
 *
 * Os slugs são os mesmos que o cliente já usa no site no ar, de propósito:
 * quem tiver um link antigo de lá cai no lugar certo aqui, e ele reconhece os
 * endereços.
 *
 * Todas são estáticas: o catálogo é um arquivo de dados, não muda em tempo de
 * requisição, e página de produto é o que o Google mais visita.
 */
export const dynamicParams = false;

export const generateStaticParams = () =>
  machines.map((machine) => ({ slug: machine.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const machine = machines.find((m) => m.slug === slug);
  if (!machine) return buildMetadata();

  return buildMetadata({
    title: `${machine.name} | Brasil DTF`,
    description: `${machine.tagline} ${machine.target}`,
    url: `/maquinas/${machine.slug}`,
  });
};

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!machines.some((m) => m.slug === slug)) notFound();

  return <MachineDetailView slug={slug} />;
}
