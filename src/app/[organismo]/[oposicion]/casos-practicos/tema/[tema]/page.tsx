import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crearMetadata, organismoAbreviado, nombreAbreviado } from "@/lib/site";
import { getOposicionPorRuta, getBloquesConTemas, getCasosPracticosDeTema } from "@/lib/oposiciones";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string; tema: string }>;
}

/** Casos prácticos de un tema. Estática y cacheada, mismo criterio que `/test/[tema]`. */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Casos prácticos para ${nombreAbreviado(oposicion.nombre)} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Supuestos reales de ${oposicion.nombre} · ${oposicion.organismo} resueltos con preguntas encadenadas y corrección explicada, tema a tema.`,
    ruta: `/${organismo}/${puesto}/casos-practicos`,
    indexable: false,
  });
}

export default async function CasosPracticosTemaPage({ params }: PageProps) {
  const { organismo, oposicion: puesto, tema: temaParam } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicionSlug);

  const temaActivo = bloques.flatMap((b) => b.temas).find((t) => t.slug === temaParam);
  if (!temaActivo) notFound();
  const casos = await getCasosPracticosDeTema(oposicionSlug, temaActivo.slug);

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
        temaActivoSlug={temaActivo.slug}
        anchoContenido="max-w-3xl"
      >
        {casos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
            <p>Todavía no hay casos prácticos para este tema.</p>
            <Link
              href={`${base}/casos-practicos`}
              className="mt-3 inline-block font-semibold text-brand-600 hover:underline"
            >
              Ver todos los temas
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {casos.map((caso) => (
              <Card key={caso.id} className="flex h-full flex-col p-5">
                <p className="font-bold text-brand-900">{caso.titulo}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{caso.supuesto}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{caso.numPreguntas} preguntas</span>
                  <Button href={`${base}/casos-practicos/${caso.slug}`} tamano="sm">
                    Resolver caso
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </TemaExplorerLayout>
    </>
  );
}
