import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { crearMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getOposicionPorRuta, getCasoPractico, getParamsCasosPracticosEstatico } from "@/lib/oposiciones";
import { CasoRunner } from "@/components/casos-practicos/CasoRunner";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string; slug: string }>;
}

export async function generateStaticParams() {
  return await getParamsCasosPracticosEstatico();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto, slug } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  const caso = await getCasoPractico(oposicion.slug, slug);
  if (!caso) return {};
  return crearMetadata({
    titulo: caso.titulo,
    descripcion: caso.supuesto.slice(0, 160),
    ruta: `/${organismo}/${puesto}/casos-practicos/${slug}`,
    // Ver el comentario de `indexable` en crearMetadata: un supuesto
    // inventado no tiene demanda de búsqueda propia (nadie busca el
    // escenario por su nombre), y el mismo caso se repite igual en cada
    // oposición que reutilice ese tema_slug — decisión del 24/08/2026.
    indexable: false,
  });
}

export default async function CasoPracticoPage({ params }: PageProps) {
  const { organismo, oposicion: puesto, slug } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const base = `/${organismo}/${puesto}`;

  const supabase = await createClient();
  const [caso, { data: { user } }] = await Promise.all([
    getCasoPractico(oposicionSlug, slug),
    supabase.auth.getUser(),
  ]);
  if (!caso || caso.preguntas.length === 0) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: oposicion.organismo, href: `/${organismo}` },
          { label: oposicion.nombre, href: base },
          { label: "Casos prácticos", href: `${base}/casos-practicos` },
          { label: caso.titulo, href: `${base}/casos-practicos/${slug}` },
        ]}
      />
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <Link
            href={`${base}/casos-practicos?tema=${caso.temaSlug}`}
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

            <CasoRunner
              key={caso.slug}
              preguntas={caso.preguntas}
              usuarioId={user?.id ?? null}
              oposicionSlug={oposicionSlug}
              casoId={caso.id}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
