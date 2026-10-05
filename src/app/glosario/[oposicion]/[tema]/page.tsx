import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getBloquesConTemas, getGlosarioDeTema, getGlosarioDeOposicion } from "@/lib/oposiciones";
import { GlosarioBuscador } from "@/components/glosario/GlosarioBuscador";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";

interface PageProps {
  params: Promise<{ oposicion: string; tema: string }>;
}

/**
 * Glosario de un tema (`tema-5`) o de toda la oposición (`todas`). Estática
 * y cacheada al pedirse, mismo criterio que `/test/[tema]`.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Glosario",
    descripcion: `Definiciones de los conceptos clave de ${oposicion.nombre} (${oposicion.organismo}), tema a tema.`,
    ruta: "/glosario",
  });
}

export default async function GlosarioTemaPage({ params }: PageProps) {
  const { oposicion: oposicionSlug, tema: temaParam } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) notFound();
  const bloques = await getBloquesConTemas(oposicionSlug);

  const todasActivo = temaParam === "todas";
  const temaActivo = bloques.flatMap((b) => b.temas).find((t) => t.slug === temaParam);
  if (!todasActivo && !temaActivo) notFound();

  const terminos = temaActivo
    ? await getGlosarioDeTema(oposicionSlug, temaActivo.slug)
    : await getGlosarioDeOposicion(oposicionSlug);

  return (
    <>
      <Navbar oposicionSlug={oposicionSlug} />
      <TemaExplorerLayout
        titulo="Glosario"
        subtitulo="Términos jurídicos y administrativos"
        bloques={bloques}
        basePath={`/glosario/${oposicionSlug}`}
        opcionTodos={{ label: "Todos los conceptos", icono: "📖", activo: todasActivo }}
        temaActivoSlug={temaActivo?.slug}
      >
        {terminos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
            <p>Todavía no hay términos de glosario para este tema.</p>
            <Link
              href={`/glosario/${oposicionSlug}`}
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
