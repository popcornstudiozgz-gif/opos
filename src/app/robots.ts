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
 *
 * Excepción deliberada al criterio de arriba (28/09/2026): las variantes
 * con `?tema=`/`?modo=` de test, flashcards, casos prácticos y glosario.
 * Ya llevan `index: false`, pero son ~1.000 URLs que se renderizan en
 * cada petición (no son estáticas) y los robots las recorrían una a una:
 * eran el grueso del consumo de CPU de funciones en Vercel. Su versión
 * sin parámetros (la indexable) sigue abierta y enlaza a lo mismo, así que
 * Google no pierde ningún camino hacia el resto del sitio.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/auth", "/*?tema=", "/*&tema=", "/*?modo=", "/*&modo="],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
