import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Navbar } from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { crearMetadata, organismoConPreposicionCompleto } from "@/lib/site";
import { getOposiciones, getOposicionesDeOrganismo, getTemasDeOposicion } from "@/lib/oposiciones";

interface PageProps {
  params: Promise<{ organismo: string }>;
}

/** Un organismo por cada `organismoSlug` distinto entre las oposiciones activas. */
export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  const organismos = new Set(oposiciones.map((o) => o.organismoSlug));
  return [...organismos].map((organismo) => ({ organismo }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo } = await params;
  const oposiciones = await getOposicionesDeOrganismo(organismo);
  if (oposiciones.length === 0) return {};
  const nombreOrganismo = oposiciones[0].organismo;
  return crearMetadata({
    titulo: `Oposiciones ${organismoConPreposicionCompleto(organismo, nombreOrganismo)}`,
    descripcion: `Prepara gratis las oposiciones ${organismoConPreposicionCompleto(organismo, nombreOrganismo)}: temario, test, flashcards, casos prácticos y simulacros.`,
    ruta: `/${organismo}`,
  });
}

/**
 * Portada de un organismo (p. ej. Ayuntamiento de Zaragoza): lista las
 * oposiciones activas que caen bajo él. Con un organismo por cada
 * oposición hoy, esta página parece redundante con la propia home de esa
 * oposición — pero es la que absorbe a futuro cualquier otra oposición
 * nueva del mismo organismo sin tener que inventar dónde enlazarla, y deja
 * un nivel real en las migas de pan (antes de la reestructuración de URLs,
 * este nivel no existía).
 */
export default async function OrganismoPage({ params }: PageProps) {
  const { organismo } = await params;
  const oposiciones = await getOposicionesDeOrganismo(organismo);
  if (oposiciones.length === 0) notFound();

  const nombreOrganismo = oposiciones[0].organismo;

  const numTemasPorOposicion = await Promise.all(
    oposiciones.map(async (o) => ({ slug: o.slug, total: (await getTemasDeOposicion(o.slug)).length }))
  );
  const totalTemasDe = (slug: string) => numTemasPorOposicion.find((n) => n.slug === slug)?.total ?? 0;

  return (
    <>
      <Navbar />
      <Breadcrumbs items={[{ label: nombreOrganismo, href: `/${organismo}` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-700 to-brand-900 text-white">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
              {nombreOrganismo}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Oposiciones {organismoConPreposicionCompleto(organismo, nombreOrganismo)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">
              Temario oficial, test, flashcards, casos prácticos y simulacros cronometrados para
              cada oposición {organismoConPreposicionCompleto(organismo, nombreOrganismo)}, gratis.
            </p>
          </div>
        </Container>
      </section>

      {/* Catálogo de oposiciones del organismo */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            titulo="Oposiciones disponibles"
            subtitulo="Cada oposición tiene su propio temario. Cuando dos oposiciones comparten materia, comparten también ese contenido."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {oposiciones.map((oposicion) => {
              const numTemas = totalTemasDe(oposicion.slug);
              return (
                <Card key={oposicion.slug} className="flex flex-col p-6 transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-bold text-brand-900">{oposicion.nombre}</h3>
                  <p className="mt-3 flex-1 text-slate-600">{oposicion.descripcionCorta}</p>
                  <p className="mt-4 text-sm text-slate-500">{numTemas} temas en el temario oficial</p>
                  <Button
                    href={`/${oposicion.organismoSlug}/${oposicion.puestoSlug}`}
                    className="mt-6 self-start"
                  >
                    Empezar a estudiar →
                  </Button>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
