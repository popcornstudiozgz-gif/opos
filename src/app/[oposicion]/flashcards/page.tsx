import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata } from "@/lib/site";
import {
  getOposicion,
  getOposiciones,
  getBloquesConTemas,
  getFlashcardsDeTema,
  getFlashcardsDeOposicion,
} from "@/lib/oposiciones";
import { FlashcardsStudio, type ProgresoFlashcard } from "@/components/flashcards/FlashcardsStudio";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { createClient } from "@/lib/supabase/server";

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let progresoInicial: Record<string, ProgresoFlashcard> = {};
  if (user && cards.length > 0) {
    const { data } = await supabase
      .from("flashcard_progreso")
      .select("flashcard_id, repeticiones, factor_facilidad, intervalo_dias, proxima_revision")
      .eq("user_id", user.id)
      .eq("oposicion_slug", oposicionSlug)
      .in(
        "flashcard_id",
        cards.map((c) => c.id)
      );
    if (data) {
      progresoInicial = Object.fromEntries(
        data.map((p) => [
          p.flashcard_id,
          {
            repeticiones: p.repeticiones,
            factorFacilidad: p.factor_facilidad,
            intervaloDias: p.intervalo_dias,
            proximaRevision: p.proxima_revision,
          },
        ])
      );
    }
  }

  return (
    <TemaExplorerLayout
      titulo="Flashcards"
      subtitulo="Selecciona un tema para repasar"
      bloques={bloques}
      basePath={`/${oposicionSlug}/flashcards`}
      opcionTodos={{ label: "Todas las tarjetas", icono: "🃏", activo: todasActivo }}
      temaActivoSlug={temaActivo?.slug}
    >
      {!hayFiltro ? (
        /* ── Landing: elige un tema o bloque ── */
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Flashcards</h2>
            <p className="mt-1 text-slate-500">
              Selecciona un tema del menú para repasar con tarjetas de memoria activa.
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
                        href={`/${oposicionSlug}/flashcards?tema=${t.slug}`}
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
          oposicionSlug={oposicionSlug}
          usuarioId={user?.id ?? null}
          progresoInicial={progresoInicial}
        />
      )}
    </TemaExplorerLayout>
  );
}
