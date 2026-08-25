import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Lanzamiento: se abre el rastreo (antes bloqueaba TODO con `disallow: "/"`
 * mientras el sitio estaba en desarrollo). Las páginas privadas o sin
 * intención de búsqueda propia (`/perfil`, `/login`, `/registro`,
 * `/recuperar-password`, `/actualizar-password`, temas y casos prácticos
 * individuales...) NO se excluyen aquí con `disallow` — llevan su propio
 * `robots: { index: false, follow: true }` vía `crearMetadata` en cada
 * página (ver `lib/site.ts`), que es la forma correcta: permite rastrearlas
 * (así Google sigue los enlaces que salen de ellas) pero no las mete en el
 * índice. Un `disallow` aquí se lo impediría directamente rastrear, y una
 * URL bloqueada por robots.txt puede igualmente aparecer en resultados
 * (sin descripción) si Google la descubre por un enlace — el fallo de SEO
 * que se supone que estamos evitando.
 *
 * Lo que SÍ se excluye aquí es lo que no es una página en absoluto (rutas
 * de servidor sin HTML que indexar) o zonas privadas cuyo contenido real
 * está de todos modos detrás de un login (rastrearlas no aporta nada,
 * solo gasta el crawl budget del sitio):
 *   - /admin: panel de administración, protegido por `requireAdmin()`.
 *   - /api: endpoints (webhooks), no páginas.
 *   - /auth: callback del flujo de login, no una página en sí.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/auth"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
