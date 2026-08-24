import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getOposiciones } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";
import { getArticulosPublicados } from "@/lib/blog";

/**
 * Genera el sitemap.xml recorriendo todas las oposiciones activas del
 * catálogo. Las páginas de tema individual (`/[oposicion]/temario/[slug]`) y
 * de caso práctico individual (`/[oposicion]/casos-practicos/[slug]`) NO
 * entran aquí a propósito: son `noindex` (ver `crearMetadata` en
 * `lib/site.ts`), y listar en el sitemap una URL marcada `noindex` es una
 * inconsistencia que las propias herramientas de SEO señalan como error.
 * El glosario tampoco entra por oposición: vive en una única URL de raíz,
 * `/glosario` (ver `src/app/glosario/page.tsx`).
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
        `${base}/simulacro`,
        `${base}/noticias`,
      ];
      if (convocatoria) rutasOposicion.push(`${base}/convocatoria`);
      return rutasOposicion;
    })
  );

  const rutasBlog = ["/blog", ...articulos.map((a) => `/blog/${a.slug}`)];
  const rutasLegales = ["/aviso-legal", "/privacidad", "/cookies"];

  // /glosario: una sola entrada en raíz (no por oposición) — ver la
  // cabecera de src/app/glosario/page.tsx.
  const rutas = [
    "/",
    "/faq",
    "/contacto",
    "/glosario",
    ...rutasBlog,
    ...porOposicion.flat(),
    ...rutasLegales,
  ];

  return rutas.map((ruta) => ({
    url: `${SITE.url}${ruta}`,
    changeFrequency: rutasLegales.includes(ruta) ? "yearly" : "weekly",
    priority: ruta === "/" ? 1 : rutasLegales.includes(ruta) ? 0.2 : 0.7,
  }));
}
