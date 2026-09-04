import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata, organismoAbreviado } from "@/lib/site";
import {
  getOposicionPorRuta,
  getOposiciones,
  getBloquesConTemas,
  getFlashcardsDeTema,
  getFlashcardsDeOposicion,
} from "@/lib/oposiciones";
import { FlashcardsStudio, type ProgresoFlashcard, type Modo } from "@/components/flashcards/FlashcardsStudio";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
  searchParams: Promise<{ tema?: string; modo?: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

/**
 * El canonical NO depende de `searchParams`: da igual qué `?tema=` traiga la
 * URL, siempre apunta a `/[organismo]/[oposicion]/flashcards`. Así el filtro
 * por tema es una vista más de la misma página a ojos de los buscadores, en
 * vez de 20 URLs casi-duplicadas compitiendo entre sí por indexación.
 *
 * El canonical por sí solo es solo una sugerencia — Google puede decidir
 * indexar igualmente la variante con `?tema=` si hay enlaces internos
 * directos a ella (los hay: el menú de temas linka a `?tema=tema-5`, etc.).
 * Por eso, además, se marca `indexable: false` en cuanto la URL trae
 * `tema` o `modo`: la variante parametrizada se puede rastrear y seguir
 * (así Google llega igualmente al resto del sitio) pero no se mete en el
 * índice — solo la URL base sin parámetros es indexable.
 */
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const { tema, modo } = await searchParams;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Flashcards para ${oposicion.nombre} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Repasa ${oposicion.nombre} · ${oposicion.organismo} con flashcards: pregunta y respuesta, tema a tema.`,
    ruta: `/${organismo}/${puesto}/flashcards`,
    indexable: !tema && !modo,
  });
}

export default async function FlashcardsPage({ params, searchParams }: PageProps) {
  const { organismo, oposicion: puesto } = await params;
  const { tema: temaParam, modo: modoParam } = await searchParams;
  // Deep-link desde "Repasar ahora" en /perfil (`?tema=todas&modo=repasar`):
  // preselecciona el modo en vez de aterrizar siempre en "Todas".
  const modoInicial: Modo = modoParam === "repasar" ? "repasar" : "todas";

  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicionSlug);

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
    // Sin filtrar por `flashcard_id`: con "Todas las tarjetas" en una
    // oposición grande (~800 flashcards) un `.in()` con esa lista entera
    // generaba una URL demasiado larga, la petición fallaba y — al no
    // comprobarse el error — se silenciaba devolviendo "sin progreso" para
    // TODO el mazo (por eso "para repasar" salía a 0 con `?tema=todas` pero
    // sí funcionaba en un tema suelto, con muchas menos tarjetas). Ya no
    // hace falta: la fila ya viene acotada a este usuario y esta oposición.
    const { data, error } = await supabase
      .from("flashcard_progreso")
      .select("flashcard_id, repeticiones, factor_facilidad, intervalo_dias, proxima_revision")
      .eq("user_id", user.id)
      .eq("oposicion_slug", oposicionSlug);
    if (error) console.error("No se pudo cargar el progreso de flashcards:", error);
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
                          href={`${base}/flashcards?tema=${t.slug}`}
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
              href={`${base}/flashcards`}
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
            modoInicial={modoInicial}
          />
        )}
      </TemaExplorerLayout>
    </>
  );
}
