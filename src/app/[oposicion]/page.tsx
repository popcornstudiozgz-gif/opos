import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getBloquesConTemas, getOposiciones } from "@/lib/oposiciones";

interface PageProps {
  params: Promise<{ oposicion: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `${oposicion.nombre} · ${oposicion.organismo}`,
    descripcion: oposicion.descripcionLarga,
    ruta: `/${slug}`,
  });
}

export default async function OposicionHome({ params }: PageProps) {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) notFound();

  const bloques = await getBloquesConTemas(slug);
  const totalTemas = bloques.reduce((n, b) => n + b.temas.length, 0);

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <p className="text-sm font-semibold text-brand-600">{oposicion.organismo}</p>
        <h1 className="mt-1 text-3xl font-black text-brand-900 sm:text-4xl">{oposicion.nombre}</h1>
        <p className="mt-4 max-w-2xl text-slate-600">{oposicion.descripcionLarga}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-3xl font-black text-brand-700">{totalTemas}</p>
            <p className="mt-1 text-sm font-semibold text-brand-900">Temas del temario</p>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/${slug}/temario`}>Ver el temario</Button>
          <Button href={`/${slug}/test`} variante="contorno">
            Hacer un test
          </Button>
          <Button href={`/${slug}/casos-practicos`} variante="contorno">
            Resolver casos prácticos
          </Button>
          <Button href={`/${slug}/flashcards`} variante="contorno">
            Practicar con flashcards
          </Button>
          <Button href={`/${slug}/glosario`} variante="contorno">
            Consultar el glosario
          </Button>
          <Button href={`/${slug}/simulacro`} variante="secundario">
            Hacer un simulacro de examen
          </Button>
          <Button href={`/${slug}/convocatoria`} variante="fantasma">
            Ver la convocatoria
          </Button>
        </div>
      </Container>
    </section>
  );
}
