import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata, organismoAbreviado } from "@/lib/site";
import {
  getOposicionPorRuta,
  getBloquesConTemas,
  getPreguntasDeTema,
  getPreguntasDeOposicion,
} from "@/lib/oposiciones";
import { TestRunner } from "@/components/test/TestRunner";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string; tema: string }>;
}

/**
 * Test de un tema (`tema-5`) o de toda la oposición (`todas`). Página
 * estática generada la primera vez que alguien la pide y cacheada (se
 * regenera como mucho cada hora): el usuario se resuelve en cliente
 * (`TestRunner` → `useUsuarioId`), así que el servidor no necesita la
 * sesión. `generateStaticParams` vacío = no se pre-generan en el build
 * (serían ~400 páginas por sección), pero sí se cachean al pedirse.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

/**
 * Canonical fijo a /test y `indexable: false`: cada tema es una vista de
 * la misma herramienta, no una página que deba competir en el buscador.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Test online para ${oposicion.nombre} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Practica ${oposicion.nombre} · ${oposicion.organismo} con preguntas tipo test, corrección inmediata y explicaciones.`,
    ruta: `/${organismo}/${puesto}/test`,
    indexable: false,
  });
}

export default async function TestTemaPage({ params }: PageProps) {
  const { organismo, oposicion: puesto, tema: temaParam } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicionSlug);

  const todasActivo = temaParam === "todas";
  const temaActivo = bloques.flatMap((b) => b.temas).find((t) => t.slug === temaParam);
  if (!todasActivo && !temaActivo) notFound();

  const preguntas = temaActivo
    ? await getPreguntasDeTema(oposicionSlug, temaActivo.slug)
    : await getPreguntasDeOposicion(oposicionSlug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: oposicion.organismo, href: `/${organismo}` },
          { label: oposicion.nombre, href: base },
          { label: "Test", href: `${base}/test` },
        ]}
      />
      <TemaExplorerLayout
        titulo="Test"
        subtitulo={`${oposicion.nombre} · ${oposicion.organismo} — selecciona un tema para practicar`}
        bloques={bloques}
        basePath={`${base}/test`}
        opcionTodos={{ label: "Todas las preguntas", icono: "📋", activo: todasActivo }}
        temaActivoSlug={temaActivo?.slug}
      >
        {preguntas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
            <p>Todavía no hay preguntas de test para este tema.</p>
            <Link href={`${base}/test`} className="mt-3 inline-block font-semibold text-brand-600 hover:underline">
              Ver todos los temas
            </Link>
          </div>
        ) : (
          <TestRunner
            key={temaActivo?.slug ?? "todas"}
            preguntas={preguntas}
            contextLabel={temaActivo ? `Tema ${temaActivo.numero} · ${temaActivo.titulo}` : "Todas las preguntas"}
            oposicionSlug={oposicionSlug}
            modo={temaActivo ? "tema" : "aleatorio"}
            temaSlug={temaActivo?.slug ?? null}
          />
        )}
      </TemaExplorerLayout>
    </>
  );
}
