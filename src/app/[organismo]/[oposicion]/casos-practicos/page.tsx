import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { crearMetadata, organismoAbreviado, nombreAbreviado } from "@/lib/site";
import { getOposicionPorRuta, getOposiciones, getBloquesConTemas } from "@/lib/oposiciones";
import { TemaExplorerLayout, RejillaTemas } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
}

/**
 * Portada de /casos-practicos (sin tema elegido): estática. Los casos de
 * cada tema se listan en `/casos-practicos/tema/[tema]` — con el `tema/`
 * intermedio para no chocar con `/casos-practicos/[slug]`, la página de
 * cada caso.
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
    titulo: `Casos prácticos para ${nombreAbreviado(oposicion.nombre)} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Supuestos reales de ${oposicion.nombre} · ${oposicion.organismo} resueltos con preguntas encadenadas y corrección explicada, tema a tema.`,
    ruta: `/${organismo}/${puesto}/casos-practicos`,
  });
}

export default async function CasosPracticosPage({ params }: PageProps) {
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
          { label: "Casos prácticos", href: `${base}/casos-practicos` },
        ]}
      />
      <TemaExplorerLayout
        titulo="Casos prácticos"
        subtitulo={`${oposicion.nombre} · ${oposicion.organismo} — selecciona un tema para practicar`}
        bloques={bloques}
        basePath={`${base}/casos-practicos/tema`}
        anchoContenido="max-w-3xl"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Casos prácticos</h2>
            <p className="mt-1 text-slate-500">
              Un supuesto y una secuencia de preguntas encadenadas para aplicar la teoría, no solo
              recordarla. Selecciona un tema del menú.
            </p>
          </div>
          <RejillaTemas bloques={bloques} basePath={`${base}/casos-practicos/tema`} />
        </div>
      </TemaExplorerLayout>
    </>
  );
}
