import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata, organismoAbreviado } from "@/lib/site";
import {
  getOposicionPorRuta,
  getOposiciones,
  getBloquesConTemas,
  getPreguntasDeTema,
  getPreguntasDeOposicion,
} from "@/lib/oposiciones";
import { TestRunner } from "@/components/test/TestRunner";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
  searchParams: Promise<{ tema?: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

/** Mismo criterio que /flashcards: canonical fijo a [oposicion], nunca a searchParams. (El glosario dejó de vivir bajo [oposicion] — ver /glosario en raíz.) */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Test online para ${oposicion.nombre} ${organismoAbreviado(oposicion.slug, oposicion.organismo)}`,
    descripcion: `Practica ${oposicion.nombre} · ${oposicion.organismo} con preguntas tipo test, corrección inmediata y explicaciones.`,
    ruta: `/${organismo}/${puesto}/test`,
  });
}

export default async function TestPage({ params, searchParams }: PageProps) {
  const { organismo, oposicion: puesto } = await params;
  const { tema: temaParam } = await searchParams;

  const supabase = await createClient();
  const [oposicion, { data: { user } }] = await Promise.all([
    getOposicionPorRuta(organismo, puesto),
    supabase.auth.getUser(),
  ]);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicionSlug);

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
      titulo="Test"
      subtitulo={`${oposicion.nombre} · ${oposicion.organismo} — selecciona un tema para practicar`}
      bloques={bloques}
      basePath={`${base}/test`}
      opcionTodos={{ label: "Todas las preguntas", icono: "📋", activo: todasActivo }}
      temaActivoSlug={temaActivo?.slug}
    >
      {!hayFiltro ? (
        /* ── Landing: elige un tema o bloque ── */
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Test</h2>
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
                        href={`${base}/test?tema=${t.slug}`}
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
            href={`${base}/test`}
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
