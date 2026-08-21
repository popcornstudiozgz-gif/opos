import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getCasoPractico, getParamsCasosPracticosEstatico } from "@/lib/oposiciones";
import { CasoRunner } from "@/components/casos-practicos/CasoRunner";

interface PageProps {
  params: Promise<{ oposicion: string; slug: string }>;
}

export async function generateStaticParams() {
  return await getParamsCasosPracticosEstatico();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug, slug } = await params;
  const [oposicion, caso] = await Promise.all([getOposicion(oposicionSlug), getCasoPractico(oposicionSlug, slug)]);
  if (!oposicion || !caso) return {};
  return crearMetadata({
    titulo: caso.titulo,
    descripcion: caso.supuesto.slice(0, 160),
    ruta: `/${oposicionSlug}/casos-practicos/${slug}`,
  });
}

export default async function CasoPracticoPage({ params }: PageProps) {
  const { oposicion: oposicionSlug, slug } = await params;
  const [oposicion, caso] = await Promise.all([getOposicion(oposicionSlug), getCasoPractico(oposicionSlug, slug)]);
  if (!oposicion || !caso || caso.preguntas.length === 0) notFound();

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <Link
          href={`/${oposicionSlug}/casos-practicos?tema=${caso.temaSlug}`}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          ← Volver a casos prácticos
        </Link>

        <h1 className="mt-4 text-3xl font-black text-brand-900">{caso.titulo}</h1>

        <div className="mx-auto mt-8 max-w-2xl space-y-6">
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Supuesto</p>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">{caso.supuesto}</p>
          </Card>

          <CasoRunner key={caso.slug} preguntas={caso.preguntas} />
        </div>
      </Container>
    </section>
  );
}
