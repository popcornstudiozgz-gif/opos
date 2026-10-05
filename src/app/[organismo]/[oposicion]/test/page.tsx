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
 * Portada de /test (sin tema elegido): estática. Cada tema vive en
 * `/test/[tema]` (ver `[tema]/page.tsx` y el comentario de
 * `TemaExplorerLayout` sobre por qué ya no es `?tema=`).
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
    titulo: `Test online para ${oposicion.nombre} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Practica ${oposicion.nombre} · ${oposicion.organismo} con preguntas tipo test, corrección inmediata y explicaciones.`,
    ruta: `/${organismo}/${puesto}/test`,
  });
}

export default async function TestPage({ params }: PageProps) {
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
          { label: "Test", href: `${base}/test` },
        ]}
      />
      <TemaExplorerLayout
        titulo="Test"
        subtitulo={`${oposicion.nombre} · ${oposicion.organismo} — selecciona un tema para practicar`}
        bloques={bloques}
        basePath={`${base}/test`}
        opcionTodos={{ label: "Todas las preguntas", icono: "📋", activo: false }}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Test</h2>
            <p className="mt-1 text-slate-500">
              Selecciona un tema del menú para empezar a practicar con corrección y explicaciones al
              instante.
            </p>
          </div>
          <RejillaTemas bloques={bloques} basePath={`${base}/test`} />
        </div>
      </TemaExplorerLayout>
    </>
  );
}
