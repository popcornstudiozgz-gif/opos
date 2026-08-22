import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getOposiciones, getTemasDeOposicion } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";
import { getArticulosPublicados } from "@/lib/blog";

/** Genera el sitemap.xml recorriendo todas las oposiciones activas del catálogo. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [oposiciones, articulos] = await Promise.all([getOposiciones(), getArticulosPublicados()]);

  const porOposicion = await Promise.all(
    oposiciones.map(async (o) => {
      const base = `/${o.slug}`;
      const [convocatoria, temas] = await Promise.all([
        getConvocatoria(o.slug),
        getTemasDeOposicion(o.slug),
      ]);
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
      return [...rutasOposicion, ...temas.map((t) => `${base}/temario/${t.slug}`)];
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
