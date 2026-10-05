import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { crearMetadata, organismoAbreviado } from "@/lib/site";
import { getOposicionPorRuta, getOposiciones, getBloquesConTemas } from "@/lib/oposiciones";
import { TemaExplorerLayout, RejillaTemas } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
}

/**
 * Portada de /flashcards (sin tema elegido): estática. Cada tema vive en
 * `/flashcards/[tema]` (ver el comentario de `TemaExplorerLayout`).
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Flashcards para ${oposicion.nombre} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Repasa ${oposicion.nombre} · ${oposicion.organismo} con flashcards: pregunta y respuesta, tema a tema.`,
    ruta: `/${organismo}/${puesto}/flashcards`,
  });
}

export default async function FlashcardsPage({ params }: PageProps) {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicion.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: oposicion.organismo, href: `/${organismo}` },
          { label: oposicion.nombre, href: base },
          { label: "Flashcards", href: `${base}/flashcards` },
        ]}
      />
      <TemaExplorerLayout
        titulo="Flashcards"
        subtitulo={`${oposicion.nombre} · ${oposicion.organismo} — selecciona un tema para repasar`}
        bloques={bloques}
        basePath={`${base}/flashcards`}
        opcionTodos={{ label: "Todas las tarjetas", icono: "🃏", activo: false }}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Flashcards</h2>
            <p className="mt-1 text-slate-500">
              Selecciona un tema del menú para repasar con tarjetas de memoria activa.
            </p>
          </div>
          <RejillaTemas bloques={bloques} basePath={`${base}/flashcards`} />
        </div>
      </TemaExplorerLayout>
    </>
  );
}
