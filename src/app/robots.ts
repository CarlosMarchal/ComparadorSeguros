import type { MetadataRoute } from "next";
import { site, INDEXAR } from "@/data/site";

/**
 * Mientras `NEXT_PUBLIC_INDEXAR` no valga "true", esto cierra el sitio entero
 * a los buscadores. Es lo que queremos en los despliegues de prueba de Vercel.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXAR) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
