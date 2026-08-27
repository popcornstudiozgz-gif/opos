import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getOposiciones } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";
import { getArticulosPublicados } from "@/lib/blog";

/**
 * Genera el sitemap.xml recorriendo todas las oposiciones activas del
 * catálogo. Las páginas de tema individual
 * (`/[organismo]/[oposicion]/temario/[slug]`) y de caso práctico individual
 * (`/[organismo]/[oposicion]/casos-practicos/[slug]`) NO entran aquí a
 * propósito: son `noindex` (ver `crearMetadata` en
 * `lib/site.ts`), y listar en el sitemap una URL marcada `noindex` es una
 * inconsistencia que las propias herramientas de SEO señalan como error.
 * Tampoco entran aviso legal, cookies y privacidad, por el mismo motivo
 * (sin intención de búsqueda propia — ver esas 3 páginas). El glosario y
 * las noticias tampoco entran por oposición: viven en una única URL de
 * raíz cada uno, `/glosario` y `/blog` (con `?oposicion=` opcional).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [oposiciones, articulos] = await Promise.all([getOposiciones(), getArticulosPublicados()]);

  // Un /[organismo] por cada organismoSlug distinto (26/08/2026, junto con
  // las migas de pan): con un organismo por cada oposición hoy solapa con
  // la home de esa oposición, pero es la página que absorbe cualquier otra
  // oposición nueva del mismo organismo sin duplicar sitio.
  const rutasOrganismo = [...new Set(oposiciones.map((o) => o.organismoSlug))].map((o) => `/${o}`);

  const porOposicion = await Promise.all(
    oposiciones.map(async (o) => {
      const base = `/${o.organismoSlug}/${o.puestoSlug}`;
      const convocatoria = await getConvocatoria(o.slug);
      const rutasOposicion = [
        base,
        `${base}/temario`,
        `${base}/test`,
        `${base}/casos-practicos`,
        `${base}/flashcards`,
        `${base}/simulacro`,
      ];
      if (convocatoria) rutasOposicion.push(`${base}/convocatoria`);
      return rutasOposicion;
    })
  );

  const rutasBlog = ["/blog", ...articulos.map((a) => `/blog/${a.slug}`)];

  const rutas = ["/", "/faq", "/contacto", "/glosario", ...rutasOrganismo, ...rutasBlog, ...porOposicion.flat()];

  return rutas.map((ruta) => ({
    url: `${SITE.url}${ruta}`,
    changeFrequency: "weekly",
    priority: ruta === "/" ? 1 : 0.7,
  }));
}
