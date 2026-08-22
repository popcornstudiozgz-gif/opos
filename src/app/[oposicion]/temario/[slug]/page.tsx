import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crearMetadata } from "@/lib/site";
import {
  getOposicion,
  getTemaDeOposicion,
  getFlashcardsDeTema,
  getGlosarioDeTema,
  getPreguntasDeTema,
  getCasosPracticosDeTema,
  getParamsTemarioEstatico,
} from "@/lib/oposiciones";
import { MarcarCompletado } from "@/components/temario/MarcarCompletado";

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
    titulo: `Tema ${tema.numero}. ${tema.titulo}`,
    descripcion: tema.descripcion,
    ruta: `/${oposicionSlug}/temario/${slug}`,
  });
}

export default async function TemaPage({ params }: PageProps) {
  const { oposicion: oposicionSlug, slug } = await params;
  const [oposicion, tema] = await Promise.all([
    getOposicion(oposicionSlug),
    getTemaDeOposicion(oposicionSlug, slug),
  ]);
  if (!oposicion || !tema) notFound();

  const [flashcards, glosario, preguntas, casos] = await Promise.all([
    getFlashcardsDeTema(oposicionSlug, slug),
    getGlosarioDeTema(oposicionSlug, slug),
    getPreguntasDeTema(oposicionSlug, slug),
    getCasosPracticosDeTema(oposicionSlug, slug),
  ]);

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <Link href={`/${oposicionSlug}/temario`} className="text-sm font-medium text-brand-600 hover:underline">
          ← Volver al temario
        </Link>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
          Tema {tema.numero}
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-900">{tema.titulo}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{tema.descripcion}</p>

        <MarcarCompletado oposicionSlug={oposicionSlug} temaSlug={slug} />

        {(preguntas.length > 0 || casos.length > 0 || flashcards.length > 0 || glosario.length > 0) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {preguntas.length > 0 && (
              <Button href={`/${oposicionSlug}/test?tema=${slug}`} tamano="sm">
                Hacer un test ({preguntas.length})
              </Button>
            )}
            {casos.length > 0 && (
              <Button href={`/${oposicionSlug}/casos-practicos?tema=${slug}`} variante="contorno" tamano="sm">
                Resolver casos prácticos ({casos.length})
              </Button>
            )}
            {flashcards.length > 0 && (
              <Button href={`/${oposicionSlug}/flashcards?tema=${slug}`} variante="contorno" tamano="sm">
                Practicar con flashcards ({flashcards.length})
              </Button>
            )}
            {glosario.length > 0 && (
              <Button href={`/${oposicionSlug}/glosario?tema=${slug}`} variante="contorno" tamano="sm">
                Ver glosario ({glosario.length})
              </Button>
            )}
          </div>
        )}

        {tema.contenido && (
          <Card className="mt-8 p-6">
            <p className="leading-relaxed text-slate-700">{tema.contenido}</p>
          </Card>
        )}

        {tema.enlacesBoe && tema.enlacesBoe.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-bold text-brand-900">Normativa de referencia</h2>
            <ul className="mt-2 space-y-1">
              {tema.enlacesBoe.map((ley) => (
                <li key={ley.url}>
                  <a
                    href={ley.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-brand-600 hover:underline"
                  >
                    {ley.titulo} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
