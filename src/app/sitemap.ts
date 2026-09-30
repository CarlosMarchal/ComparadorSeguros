import type { MetadataRoute } from "next";
import { ramos } from "@/data/ramos";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const estaticas = ["", "/seguros", "/como-funciona", "/contacto"].map((ruta) => ({
    url: `${site.url}${ruta}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: ruta === "" ? 1 : 0.8,
  }));

  const fichas = ramos.map((r) => ({
    url: `${site.url}/seguros/${r.slug}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...estaticas, ...fichas];
}
