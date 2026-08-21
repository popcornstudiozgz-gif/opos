import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getTemaDeOposicion, getFlashcardsDeTema, getParamsTemarioEstatico } from "@/lib/oposiciones";
import { FlashcardsStudio } from "@/components/flashcards/FlashcardsStudio";

interface PageProps {
  params: Promise<{ oposicion: string; slug: string }>;
}

export async function generateStaticParams() {
  return await getParamsTemarioEstatico();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug, slug } = await params;
  const tema = await getTemaDeOposicion(oposicionSlug, slug);
  if (!tema) return {};
  return crearMetadata({
    titulo: `Flashcards · Tema ${tema.numero}. ${tema.titulo}`,
    descripcion: `Practica el tema ${tema.numero} con flashcards: ${tema.descripcion}`,
    ruta: `/${oposicionSlug}/temario/${slug}/flashcards`,
  });
}

export default async function FlashcardsPage({ params }: PageProps) {
  const { oposicion: oposicionSlug, slug } = await params;
  const [oposicion, tema] = await Promise.all([
    getOposicion(oposicionSlug),
    getTemaDeOposicion(oposicionSlug, slug),
  ]);
  if (!oposicion || !tema) notFound();

  const cards = await getFlashcardsDeTema(oposicionSlug, slug);

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <Link
          href={`/${oposicionSlug}/temario/${slug}`}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          ← Volver al tema
        </Link>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
          Tema {tema.numero} · Flashcards
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-900">{tema.titulo}</h1>

        <div className="mx-auto mt-10 max-w-2xl">
          {cards.length > 0 ? (
            <FlashcardsStudio cards={cards} />
          ) : (
            <p className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
              Todavía no hay flashcards disponibles para este tema.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
