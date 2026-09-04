import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crearMetadata, organismoAbreviado, nombreAbreviado } from "@/lib/site";
import { getOposicionPorRuta, getOposiciones, getBloquesConTemas, getCasosPracticosDeTema } from "@/lib/oposiciones";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
  searchParams: Promise<{ tema?: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

/**
 * Mismo criterio que /test y /flashcards: canonical fijo a [oposicion],
 * nunca a searchParams, y además `indexable: false` en cuanto la URL trae
 * `tema` — el canonical por sí solo no basta para evitar que Google
 * indexe la variante parametrizada si hay enlaces internos directos a
 * ella. (El glosario dejó de vivir bajo [oposicion] — ver /glosario en raíz.)
 */
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const { tema } = await searchParams;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Casos prácticos para ${nombreAbreviado(oposicion.nombre)} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Supuestos reales de ${oposicion.nombre} · ${oposicion.organismo} resueltos con preguntas encadenadas y corrección explicada, tema a tema.`,
    ruta: `/${organismo}/${puesto}/casos-practicos`,
    indexable: !tema,
  });
}

export default async function CasosPracticosPage({ params, searchParams }: PageProps) {
  const { organismo, oposicion: puesto } = await params;
  const { tema: temaParam } = await searchParams;

  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicionSlug);

  const temas = bloques.flatMap((b) => b.temas);
  const temaActivo = temas.find((t) => t.slug === temaParam);

  const casos = temaActivo ? await getCasosPracticosDeTema(oposicionSlug, temaActivo.slug) : [];

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
        basePath={`${base}/casos-practicos`}
        temaActivoSlug={temaActivo?.slug}
        anchoContenido="max-w-3xl"
      >
        {!temaActivo ? (
          /* ── Landing: elige un tema ── */
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-brand-900">Casos prácticos</h2>
              <p className="mt-1 text-slate-500">
                Un supuesto y una secuencia de preguntas encadenadas para aplicar la teoría, no solo
                recordarla. Selecciona un tema del menú.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {bloques.map((bloque) => (
                <div key={bloque.slug} className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold tracking-wider text-brand-500 uppercase">{bloque.titulo}</p>
                  <ul className="mt-3 space-y-1">
                    {bloque.temas.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`${base}/casos-practicos?tema=${t.slug}`}
                          className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          <span className="font-semibold text-brand-600">T{t.numero}</span>
                          {t.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : casos.length === 0 ? (
          /* ── Sin casos para este tema ── */
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
