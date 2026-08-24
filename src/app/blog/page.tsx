import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { ArticuloCard } from "@/components/blog/ArticuloCard";
import { crearMetadata } from "@/lib/site";
import { getArticulosPublicados, getArticulosDeOposicion } from "@/lib/blog";
import { getOposicion } from "@/lib/oposiciones";

interface PageProps {
  searchParams: Promise<{ oposicion?: string }>;
}

/**
 * Blog en raíz, con filtro opcional por oposición — antes vivía además como
 * ruta aparte, `/[oposicion]/noticias`. Mismo patrón que el glosario
 * (`/glosario?oposicion=`): canonical SIEMPRE `/blog`, sin parámetros, así
 * que Google nunca ve más de una URL real. Un artículo puede etiquetarse a
 * varias oposiciones a la vez (`articulo_oposicion` es muchos-a-muchos), así
 * que una ruta separada por oposición podía mostrar la misma noticia dos
 * veces en dos URLs — decisión del 24/08/2026, ver conversación.
 */
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await searchParams;
  const oposicion = oposicionSlug ? await getOposicion(oposicionSlug) : undefined;
  return crearMetadata({
    titulo: oposicion ? `Noticias de ${oposicion.nombre} · ${oposicion.organismo}` : "Blog de oposiciones en Zaragoza",
    descripcion: oposicion
      ? `Novedades de ${oposicion.nombre} · ${oposicion.organismo}: convocatoria, plazos y cambios normativos.`
      : "Noticias y artículos sobre oposiciones en Zaragoza: convocatorias, plazos, novedades del BOE y consejos de estudio.",
    ruta: "/blog",
  });
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { oposicion: oposicionSlug } = await searchParams;
  const oposicion = oposicionSlug ? await getOposicion(oposicionSlug) : undefined;

  const articulos = oposicion
    ? await getArticulosDeOposicion(oposicionSlug!)
    : await getArticulosPublicados();

  return (
    <>
      <Navbar oposicionSlug={oposicion ? oposicionSlug : undefined} />
      <PageHeader
        titulo="Blog"
        descripcion={
          oposicion
            ? `Novedades de ${oposicion.nombre} · ${oposicion.organismo}: convocatoria, plazos y cambios normativos.`
            : "Noticias y artículos sobre oposiciones en Zaragoza: convocatorias, plazos y novedades de cada proceso."
        }
      />

      <Container className="py-12">
        {articulos.length === 0 ? (
          <p className="text-slate-500">
            {oposicion
              ? "Todavía no hay noticias publicadas para esta oposición. Vuelve pronto."
              : "Todavía no hay artículos publicados. Vuelve pronto."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((articulo) => (
              <ArticuloCard key={articulo.id} articulo={articulo} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
