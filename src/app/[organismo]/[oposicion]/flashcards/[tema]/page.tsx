import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { crearMetadata, organismoAbreviado } from "@/lib/site";
import {
  getOposicionPorRuta,
  getBloquesConTemas,
  getFlashcardsDeTema,
  getFlashcardsDeOposicion,
} from "@/lib/oposiciones";
import { FlashcardsStudio } from "@/components/flashcards/FlashcardsStudio";
import { TemaExplorerLayout } from "@/components/layout/TemaExplorerLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string; tema: string }>;
}

/**
 * Flashcards de un tema (`tema-5`) o de toda la oposición (`todas`).
 * Estática y cacheada, mismo criterio que `/test/[tema]`: el usuario, su
 * progreso SM-2 y el `?modo=repasar` del enlace "Repasar ahora" de /perfil
 * se resuelven en el navegador (`FlashcardsStudio`).
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Flashcards para ${oposicion.nombre} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Repasa ${oposicion.nombre} · ${oposicion.organismo} con flashcards: pregunta y respuesta, tema a tema.`,
    ruta: `/${organismo}/${puesto}/flashcards`,
    indexable: false,
  });
}

export default async function FlashcardsTemaPage({ params }: PageProps) {
  const { organismo, oposicion: puesto, tema: temaParam } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const base = `/${organismo}/${puesto}`;
  const bloques = await getBloquesConTemas(oposicionSlug);

  const todasActivo = temaParam === "todas";
  const temaActivo = bloques.flatMap((b) => b.temas).find((t) => t.slug === temaParam);
  if (!todasActivo && !temaActivo) notFound();

  const cards = temaActivo
    ? await getFlashcardsDeTema(oposicionSlug, temaActivo.slug)
    : await getFlashcardsDeOposicion(oposicionSlug);

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
        {cards.length === 0 ? (
          <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
            <p>Todavía no hay flashcards disponibles para este tema.</p>
            <Link href={`${base}/flashcards`} className="mt-3 inline-block font-semibold text-brand-600 hover:underline">
              Ver todos los temas
            </Link>
          </div>
        ) : (
          <FlashcardsStudio
            key={temaActivo?.slug ?? "todas"}
            cards={cards}
            contextLabel={temaActivo ? `Tema ${temaActivo.numero} · ${temaActivo.titulo}` : "Todas las tarjetas"}
            oposicionSlug={oposicionSlug}
          />
        )}
      </TemaExplorerLayout>
    </>
  );
}
