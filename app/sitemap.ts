import type { MetadataRoute } from "next";
import { cms } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://labho.vercel.app";
  const [projetos, entrevistas, eventos] = await Promise.all([
    cms.getProjetos(),
    cms.getEntrevistas(),
    cms.getEventos(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/laboratorio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/acervo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/eventos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const projetoRoutes: MetadataRoute.Sitemap = projetos.map((p) => ({
    url: `${baseUrl}/acervo/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const entrevistaRoutes: MetadataRoute.Sitemap = entrevistas.map((e) => ({
    url: `${baseUrl}/entrevista/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const eventoRoutes: MetadataRoute.Sitemap = eventos.map((ev) => ({
    url: `${baseUrl}/eventos/${ev.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projetoRoutes, ...entrevistaRoutes, ...eventoRoutes];
}
