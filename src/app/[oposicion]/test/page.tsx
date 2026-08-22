import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata } from "@/lib/site";
import {
  getOposicion,
  getOposiciones,
  getBloquesConTemas,
  getPreguntasDeTema,
  getPreguntasDeOposicion,
} from "@/lib/oposiciones";
import { TestRunner } from "@/components/test/TestRunner";
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

/** Mismo criterio que /flashcards y /glosario: canonical fijo a [oposicion], nunca a searchParams. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Test de oposición",
    descripcion: `Practica ${oposicion.nombre} con preguntas tipo test, corrección inmediata y explicaciones.`,
    ruta: `/${oposicionSlug}/test`,
  });
}

export default async function TestPage({ params, searchParams }: PageProps) {
  const { oposicion: oposicionSlug } = await params;
  const { tema: temaParam } = await searchParams;

  const supabase = await createClient();
  const [oposicion, bloques, { data: { user } }] = await Promise.all([
    getOposicion(oposicionSlug),
    getBloquesConTemas(oposicionSlug),
    supabase.auth.getUser(),
  ]);
  if (!oposicion) notFound();

  const temas = bloques.flatMap((b) => b.temas);
  const todasActivo = temaParam === "todas";
  const temaActivo = !todasActivo ? temas.find((t) => t.slug === temaParam) : undefined;
  const hayFiltro = todasActivo || !!temaActivo;

  const preguntas = todasActivo
    ? await getPreguntasDeOposicion(oposicionSlug)
    : temaActivo
      ? await getPreguntasDeTema(oposicionSlug, temaActivo.slug)
      : [];

  return (
    <TemaExplorerLayout
      titulo="Test teóricos"
      subtitulo="Selecciona un tema para practicar"
      bloques={bloques}
      basePath={`/${oposicionSlug}/test`}
      opcionTodos={{ label: "Todas las preguntas", icono: "📋", activo: todasActivo }}
      temaActivoSlug={temaActivo?.slug}
    >
      {!hayFiltro ? (
        /* ── Landing: elige un tema o bloque ── */
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Test teóricos</h2>
            <p className="mt-1 text-slate-500">
              Selecciona un tema del menú para empezar a practicar con corrección y explicaciones
              al instante.
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
                        href={`/${oposicionSlug}/test?tema=${t.slug}`}
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
      ) : preguntas.length === 0 ? (
        /* ── Sin preguntas para este tema ── */
        <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
          <p>Todavía no hay preguntas de test para este tema.</p>
          <Link
            href={`/${oposicionSlug}/test`}
            className="mt-3 inline-block font-semibold text-brand-600 hover:underline"
          >
            Ver todos los temas
          </Link>
        </div>
      ) : (
        <TestRunner
          key={temaActivo?.slug ?? "todas"}
          preguntas={preguntas}
          contextLabel={temaActivo ? `Tema ${temaActivo.numero} · ${temaActivo.titulo}` : "Todas las preguntas"}
          usuarioId={user?.id ?? null}
          oposicionSlug={oposicionSlug}
          modo={temaActivo ? "tema" : "aleatorio"}
          temaSlug={temaActivo?.slug ?? null}
        />
      )}
    </TemaExplorerLayout>
  );
}
