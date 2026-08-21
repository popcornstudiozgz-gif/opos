import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getOposiciones, getBloquesConTemas, getCasosPracticosDeTema } from "@/lib/oposiciones";

interface PageProps {
  params: Promise<{ oposicion: string }>;
  searchParams: Promise<{ tema?: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

/** Mismo criterio que /test, /flashcards y /glosario: canonical fijo a [oposicion], nunca a searchParams. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Casos prácticos",
    descripcion: `Supuestos prácticos de ${oposicion.nombre} para aplicar la teoría, con preguntas encadenadas y corrección explicada.`,
    ruta: `/${oposicionSlug}/casos-practicos`,
  });
}

export default async function CasosPracticosPage({ params, searchParams }: PageProps) {
  const { oposicion: oposicionSlug } = await params;
  const { tema: temaParam } = await searchParams;

  const [oposicion, bloques] = await Promise.all([
    getOposicion(oposicionSlug),
    getBloquesConTemas(oposicionSlug),
  ]);
  if (!oposicion) notFound();

  const temas = bloques.flatMap((b) => b.temas);
  const temaActivo = temas.find((t) => t.slug === temaParam);

  const casos = temaActivo ? await getCasosPracticosDeTema(oposicionSlug, temaActivo.slug) : [];

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <h1 className="text-3xl font-black text-brand-900">Casos prácticos</h1>
        <p className="mt-2 text-slate-600">
          {oposicion.nombre} · {oposicion.organismo}
        </p>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Un supuesto y una secuencia de preguntas encadenadas para aplicar la teoría, no solo recordarla.
        </p>

        {/* Selector de tema */}
        <div className="mt-6 flex flex-wrap gap-2">
          {temas.map((t) => (
            <Link
              key={t.slug}
              href={`/${oposicionSlug}/casos-practicos?tema=${t.slug}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                temaActivo?.slug === t.slug
                  ? "bg-brand-600 text-white"
                  : "bg-brand-50 text-brand-700 hover:bg-brand-100"
              }`}
            >
              Tema {t.numero}
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {!temaActivo ? (
            /* ── Landing: elige un tema ── */
            <div className="space-y-8">
              <p className="text-slate-600">Elige un tema para ver sus casos prácticos.</p>
              {bloques.map((bloque) => (
                <div key={bloque.slug}>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-brand-600">{bloque.titulo}</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {bloque.temas.map((t) => (
                      <Link key={t.slug} href={`/${oposicionSlug}/casos-practicos?tema=${t.slug}`}>
                        <Card className="h-full p-4 transition-shadow hover:shadow-md">
                          <p className="text-xs font-semibold text-brand-600">Tema {t.numero}</p>
                          <p className="mt-1 font-semibold text-brand-900">{t.titulo}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : casos.length === 0 ? (
            /* ── Sin casos para este tema ── */
            <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
              <p>Todavía no hay casos prácticos para este tema.</p>
              <Link
                href={`/${oposicionSlug}/casos-practicos`}
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
                    <Button href={`/${oposicionSlug}/casos-practicos/${caso.slug}`} tamano="sm">
                      Resolver caso
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
