import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata } from "@/lib/site";
import {
  getOposicion,
  getOposiciones,
  getBloquesConTemas,
  getGlosarioDeTema,
  getGlosarioDeOposicion,
} from "@/lib/oposiciones";
import { GlosarioBuscador } from "@/components/glosario/GlosarioBuscador";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";

interface PageProps {
  params: Promise<{ oposicion: string }>;
  searchParams: Promise<{ tema?: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

/**
 * Mismo criterio que /flashcards: el canonical depende solo de
 * [oposicion], nunca de `searchParams`, para no generar una URL indexable
 * por cada tema.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Glosario",
    descripcion: `Definiciones de los conceptos clave de ${oposicion.nombre} (${oposicion.organismo}), tema a tema.`,
    ruta: `/${oposicionSlug}/glosario`,
  });
}

export default async function GlosarioPage({ params, searchParams }: PageProps) {
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

  const terminos = todasActivo
    ? await getGlosarioDeOposicion(oposicionSlug)
    : temaActivo
      ? await getGlosarioDeTema(oposicionSlug, temaActivo.slug)
      : [];

  return (
    <TemaExplorerLayout
      titulo="Glosario"
      subtitulo="Términos jurídicos y administrativos"
      bloques={bloques}
      basePath={`/${oposicionSlug}/glosario`}
      opcionTodos={{ label: "Todos los conceptos", icono: "📖", activo: todasActivo }}
      temaActivoSlug={temaActivo?.slug}
    >
      {!hayFiltro ? (
        /* ── Landing: elige un tema o bloque ── */
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Glosario</h2>
            <p className="mt-1 text-slate-500">
              Selecciona un tema del menú para ver sus términos, o consulta el glosario completo.
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
                        href={`/${oposicionSlug}/glosario?tema=${t.slug}`}
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
      ) : terminos.length === 0 ? (
        /* ── Sin términos para este tema ── */
        <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
          <p>Todavía no hay términos de glosario para este tema.</p>
          <Link
            href={`/${oposicionSlug}/glosario`}
            className="mt-3 inline-block font-semibold text-brand-600 hover:underline"
          >
            Ver todos los temas
          </Link>
        </div>
      ) : (
        <>
          {temaActivo && (
            <p className="mb-5 text-sm text-slate-500">
              Filtrando por:{" "}
              <span className="font-semibold text-brand-700">
                Tema {temaActivo.numero} · {temaActivo.titulo}
              </span>
            </p>
          )}
          <GlosarioBuscador terminos={terminos} />
        </>
      )}
    </TemaExplorerLayout>
  );
}
