import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Portado de kubo-calendario tal cual estaba: bloquea TODO a los buscadores
 * (disallow "/"). Eso es intencional mientras el sitio está en desarrollo/sin
 * dominio propio — antes de lanzar hay que cambiar esto a `allow: "/"` (con
 * las exclusiones que corresponda, p. ej. `/admin`) o Google nunca indexará
 * el sitio.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
