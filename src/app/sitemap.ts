import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getOposiciones } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";
import { getArticulosPublicados } from "@/lib/blog";

/**
 * Genera el sitemap.xml recorriendo todas las oposiciones activas del
 * catálogo. Las páginas de tema individual (`/[oposicion]/temario/[slug]`)
 * NO entran aquí a propósito: son `noindex` (ver `crearMetadata` en
 * `lib/site.ts`), y listar en el sitemap una URL marcada `noindex` es una
 * inconsistencia que las propias herramientas de SEO señalan como error.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [oposiciones, articulos] = await Promise.all([getOposiciones(), getArticulosPublicados()]);

  const porOposicion = await Promise.all(
    oposiciones.map(async (o) => {
      const base = `/${o.slug}`;
      const convocatoria = await getConvocatoria(o.slug);
      const rutasOposicion = [
        base,
        `${base}/temario`,
        `${base}/test`,
        `${base}/casos-practicos`,
        `${base}/flashcards`,
        `${base}/glosario`,
        `${base}/simulacro`,
        `${base}/noticias`,
      ];
      if (convocatoria) rutasOposicion.push(`${base}/convocatoria`);
      return rutasOposicion;
    })
  );

  const rutasBlog = ["/blog", ...articulos.map((a) => `/blog/${a.slug}`)];
  const rutasLegales = ["/aviso-legal", "/privacidad", "/cookies"];

  const rutas = ["/", "/faq", "/contacto", ...rutasBlog, ...porOposicion.flat(), ...rutasLegales];

  return rutas.map((ruta) => ({
    url: `${SITE.url}${ruta}`,
    changeFrequency: rutasLegales.includes(ruta) ? "yearly" : "weekly",
    priority: ruta === "/" ? 1 : rutasLegales.includes(ruta) ? 0.2 : 0.7,
  }));
}
