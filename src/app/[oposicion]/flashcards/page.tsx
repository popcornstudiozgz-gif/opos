import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { crearMetadata } from "@/lib/site";
import {
  getOposicion,
  getOposiciones,
  getBloquesConTemas,
  getFlashcardsDeTema,
  getFlashcardsDeOposicion,
} from "@/lib/oposiciones";
import { FlashcardsStudio } from "@/components/flashcards/FlashcardsStudio";

interface PageProps {
  params: Promise<{ oposicion: string }>;
  searchParams: Promise<{ tema?: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

/**
 * El canonical NO depende de `searchParams`: da igual qué `?tema=` traiga la
 * URL, siempre apunta a `/[oposicion]/flashcards`. Así el filtro por tema es
 * una vista más de la misma página a ojos de los buscadores, en vez de 20
 * URLs casi-duplicadas compitiendo entre sí por indexación.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Flashcards",
    descripcion: `Repasa ${oposicion.nombre} con flashcards: pregunta y respuesta, tema a tema.`,
    ruta: `/${oposicionSlug}/flashcards`,
  });
}

export default async function FlashcardsPage({ params, searchParams }: PageProps) {
  const { oposicion: oposicionSlug } = await params;
  const { tema: temaParam } = await searchParams;

  const [oposicion, bloques] = await Promise.all([
    getOposicion(oposicionSlug),
    getBloquesConTemas(oposicionSlug),
  ]);
  if (!oposicion) notFound();

  const temas = bloques.flatMap((b) => b.temas);
  const todasActivo = temaParam === "todas";
  const temaActivo = !todasActivo ? temas.find((t) => t.slug === temaParam) : undefined;
  const hayFiltro = todasActivo || !!temaActivo;

  const cards = todasActivo
    ? await getFlashcardsDeOposicion(oposicionSlug)
    : temaActivo
      ? await getFlashcardsDeTema(oposicionSlug, temaActivo.slug)
      : [];

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <h1 className="text-3xl font-black text-brand-900">Flashcards</h1>
        <p className="mt-2 text-slate-600">
          {oposicion.nombre} · {oposicion.organismo}
        </p>

        {/* Selector de tema */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/${oposicionSlug}/flashcards?tema=todas`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              todasActivo
                ? "bg-brand-600 text-white"
                : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            Todas las tarjetas
          </Link>
          {temas.map((t) => (
            <Link
              key={t.slug}
              href={`/${oposicionSlug}/flashcards?tema=${t.slug}`}
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

        <div className="mx-auto mt-10 max-w-2xl">
          {!hayFiltro ? (
            /* ── Landing: elige un tema o bloque ── */
            <div className="space-y-8">
              <p className="text-slate-600">
                Elige un tema para repasar, o practica con todas las tarjetas a la vez.
              </p>
              {bloques.map((bloque) => (
                <div key={bloque.slug}>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-brand-600">
                    {bloque.titulo}
                  </h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {bloque.temas.map((t) => (
                      <Link key={t.slug} href={`/${oposicionSlug}/flashcards?tema=${t.slug}`}>
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
          ) : cards.length === 0 ? (
            /* ── Sin tarjetas para este tema ── */
            <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
              <p>Todavía no hay flashcards disponibles para este tema.</p>
              <Link
                href={`/${oposicionSlug}/flashcards`}
                className="mt-3 inline-block font-semibold text-brand-600 hover:underline"
              >
                Ver todos los temas
              </Link>
            </div>
          ) : (
            <FlashcardsStudio
              key={temaActivo?.slug ?? "todas"}
              cards={cards}
              contextLabel={temaActivo ? `Tema ${temaActivo.numero} · ${temaActivo.titulo}` : "Todas las tarjetas"}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
