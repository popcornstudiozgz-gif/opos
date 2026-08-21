import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getOposiciones, getTemasDeOposicion } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";

/** Genera el sitemap.xml recorriendo todas las oposiciones activas del catálogo. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const oposiciones = await getOposiciones();

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
      ];
      if (convocatoria) rutasOposicion.push(`${base}/convocatoria`);
      return [...rutasOposicion, ...temas.map((t) => `${base}/temario/${t.slug}`)];
    })
  );

  const rutas = ["/", ...porOposicion.flat()];

  return rutas.map((ruta) => ({
    url: `${SITE.url}${ruta}`,
    changeFrequency: "weekly",
    priority: ruta === "/" ? 1 : 0.7,
  }));
}
