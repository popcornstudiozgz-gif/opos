import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { crearMetadata, organismoAbreviado } from "@/lib/site";
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
    titulo: `Temario ${oposicion.nombre} ${organismoAbreviado(slug, oposicion.organismo)}`,
    descripcion: `Temario oficial de ${oposicion.nombre} · ${oposicion.organismo}, organizado por bloques.`,
    ruta: `/${slug}/temario`,
  });
}

export default async function TemarioPage({ params }: PageProps) {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) notFound();

  const bloques = await getBloquesConTemas(slug);

  return (
    <>
      <PageHeader
        titulo={`Temario oficial de ${oposicion.nombre} · ${oposicion.organismo}`}
        descripcion="Todo el contenido organizado por bloques — entra en cada tema para estudiarlo y practicar sus preguntas."
      />

      <Container className="space-y-10 py-12">
        {bloques.map((bloque) => (
          <div key={bloque.slug}>
            <h2 className="text-lg font-bold text-brand-900">{bloque.titulo}</h2>
            <p className="mt-1 text-sm text-slate-500">{bloque.descripcion}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {bloque.temas.map((tema) => (
                <Link key={tema.slug} href={`/${slug}/temario/${tema.slug}`}>
                  <Card className="h-full p-4 transition-shadow hover:shadow-md">
                    <p className="text-xs font-semibold text-brand-600">Tema {tema.numero}</p>
                    <p className="mt-1 font-semibold text-brand-900">{tema.titulo}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">{tema.descripcion}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
