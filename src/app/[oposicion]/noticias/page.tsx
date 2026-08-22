import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getOposiciones } from "@/lib/oposiciones";
import { getArticulosDeOposicion } from "@/lib/blog";
import { ArticuloCard } from "@/components/blog/ArticuloCard";

interface PageProps {
  params: Promise<{ oposicion: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Noticias",
    descripcion: `Noticias y novedades de la oposición de ${oposicion.nombre} (${oposicion.organismo}): convocatoria, plazos y cambios normativos.`,
    ruta: `/${slug}/noticias`,
  });
}

export default async function NoticiasOposicionPage({ params }: PageProps) {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) notFound();

  const articulos = await getArticulosDeOposicion(slug);

  return (
    <>
      <PageHeader
        titulo="Noticias"
        descripcion={`Novedades de la oposición de ${oposicion.nombre} (${oposicion.organismo}): convocatoria, plazos y cambios normativos.`}
      />

      <Container className="py-12">
        {articulos.length === 0 ? (
          <p className="text-slate-500">Todavía no hay noticias publicadas para esta oposición. Vuelve pronto.</p>
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
