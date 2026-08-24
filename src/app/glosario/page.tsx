import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata, SITE } from "@/lib/site";
import {
  getOposicion,
  getBloquesConTemas,
  getGlosarioDeTema,
  getGlosarioDeOposicion,
  getGlosarioCompleto,
} from "@/lib/oposiciones";
import { GlosarioBuscador } from "@/components/glosario/GlosarioBuscador";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";

interface PageProps {
  searchParams: Promise<{ oposicion?: string; tema?: string }>;
}

/**
 * Glosario en raíz, independiente de oposición — a propósito, no vive bajo
 * `/[oposicion]/`. Es el mismo patrón que ya usan test/flashcards con
 * `?tema=`, extendido con una dimensión más (`?oposicion=`): el `canonical`
 * es SIEMPRE `/glosario`, sin parámetros, así que Google nunca ve más de
 * una URL real — no hace falta ningún `noindex` en ninguna variante,
 * porque no hay ninguna página duplicada que apagar.
 *
 * A diferencia de test/flashcards/casos prácticos, el glosario no guarda
 * progreso de usuario por oposición (sin tabla en
 * `0007_usuarios_progreso.sql`, sin llamada a Supabase en
 * `GlosarioBuscador`), así que consolidarlo en una sola ruta no pierde
 * nada — decisión del 24/08/2026, ver conversación.
 *
 * Sin `?oposicion=`: glosario general de toda la plataforma
 * (`getGlosarioCompleto`), la versión indexable de verdad. Con
 * `?oposicion=X` (y opcionalmente `&tema=Y`): la misma herramienta de
 * estudio filtrable que antes vivía en `/[oposicion]/glosario`.
 */
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await searchParams;
  const oposicion = oposicionSlug ? await getOposicion(oposicionSlug) : undefined;
  return crearMetadata({
    titulo: "Glosario",
    descripcion: oposicion
      ? `Definiciones de los conceptos clave de ${oposicion.nombre} (${oposicion.organismo}), tema a tema.`
      : `Glosario de términos jurídicos y administrativos de ${SITE.nombre}, para todas las oposiciones del catálogo.`,
    ruta: "/glosario",
  });
}

export default async function GlosarioPage({ searchParams }: PageProps) {
  const { oposicion: oposicionSlug, tema: temaParam } = await searchParams;
  const oposicion = oposicionSlug ? await getOposicion(oposicionSlug) : undefined;

  // Sin oposición (o con un slug que no existe): glosario general, sin
  // sidebar de bloques/temas — esa estructura solo tiene sentido dentro de
  // una oposición concreta.
  if (!oposicion) {
    const terminos = await getGlosarioCompleto();
    return (
      <>
        <Navbar />
        <section className="bg-white">
          <Container className="max-w-2xl py-16 sm:py-20">
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">Glosario</p>
            <h1 className="mt-1 text-3xl font-black text-brand-900 sm:text-4xl">
              Términos jurídicos y administrativos
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {terminos.length} definiciones claras, de todas las oposiciones del catálogo. Si estás
              preparando una en concreto, entra en su ficha para ver el glosario filtrado por tema.
            </p>

            <div className="mt-8">
              <GlosarioBuscador terminos={terminos} />
            </div>
          </Container>
        </section>
      </>
    );
  }

  const bloques = await getBloquesConTemas(oposicionSlug!);
  const temas = bloques.flatMap((b) => b.temas);
  const todasActivo = temaParam === "todas";
  const temaActivo = !todasActivo ? temas.find((t) => t.slug === temaParam) : undefined;
  const hayFiltro = todasActivo || !!temaActivo;

  const terminos = todasActivo
    ? await getGlosarioDeOposicion(oposicionSlug!)
    : temaActivo
      ? await getGlosarioDeTema(oposicionSlug!, temaActivo.slug)
      : [];

  return (
    <>
      <Navbar oposicionSlug={oposicionSlug} />
      <TemaExplorerLayout
        titulo="Glosario"
        subtitulo="Términos jurídicos y administrativos"
        bloques={bloques}
        basePath={`/glosario?oposicion=${oposicionSlug}`}
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
                          href={`/glosario?oposicion=${oposicionSlug}&tema=${t.slug}`}
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
              href={`/glosario?oposicion=${oposicionSlug}`}
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
    </>
  );
}
