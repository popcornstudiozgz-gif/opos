import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getOposiciones, getTemasDeOposicion } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";

/** Genera el sitemap.xml recorriendo todas las oposiciones activas del catálogo. */
export default function sitemap(): MetadataRoute.Sitemap {
  const oposiciones = getOposiciones();

  const rutas = [
    "/",
    ...oposiciones.flatMap((o) => {
      const base = `/${o.slug}`;
      const rutasOposicion = [base, `${base}/temario`];
      if (getConvocatoria(o.slug)) rutasOposicion.push(`${base}/convocatoria`);
      return [
        ...rutasOposicion,
        ...getTemasDeOposicion(o.slug).map((t) => `${base}/temario/${t.slug}`),
      ];
    }),
  ];

  return rutas.map((ruta) => ({
    url: `${SITE.url}${ruta}`,
    changeFrequency: "weekly",
    priority: ruta === "/" ? 1 : 0.7,
  }));
}
