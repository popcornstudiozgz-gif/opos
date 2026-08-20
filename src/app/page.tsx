import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Navbar } from "@/components/layout/Navbar";
import { getOposiciones, getTemasDeOposicion } from "@/lib/oposiciones";
import { SITE } from "@/lib/site";

/** Portada general del dominio: catálogo de oposiciones disponibles. */
export default async function Home() {
  const oposiciones = await getOposiciones();
  const numTemasPorOposicion = await Promise.all(
    oposiciones.map(async (o) => ({ slug: o.slug, total: (await getTemasDeOposicion(o.slug)).length }))
  );
  const totalTemasDe = (slug: string) =>
    numTemasPorOposicion.find((n) => n.slug === slug)?.total ?? 0;

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-b from-brand-700 to-brand-900 text-white">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
              Catálogo de oposiciones
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              {SITE.nombre}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">
              {SITE.descripcionLarga}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            titulo="Elige tu oposición"
            subtitulo="Cada oposición tiene su propio temario. Cuando dos oposiciones comparten materia, comparten también ese contenido."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {oposiciones.map((oposicion) => {
              const numTemas = totalTemasDe(oposicion.slug);
              return (
                <Card key={oposicion.slug} className="flex flex-col p-6">
                  <p className="text-sm font-semibold text-brand-600">{oposicion.organismo}</p>
                  <h3 className="mt-1 text-xl font-bold text-brand-900">{oposicion.nombre}</h3>
                  <p className="mt-3 flex-1 text-slate-600">{oposicion.descripcionCorta}</p>
                  <p className="mt-4 text-sm text-slate-500">{numTemas} temas en el temario oficial</p>
                  <Button href={`/${oposicion.slug}`} className="mt-6 self-start">
                    Empezar a estudiar →
                  </Button>
                </Card>
              );
            })}

            <Card className="flex flex-col items-start justify-center border-dashed p-6 text-slate-500">
              <p className="text-sm font-semibold">Próxima oposición</p>
              <p className="mt-1 text-sm">
                Aquí aparecerá cada nueva oposición que se añada al catálogo, reutilizando los
                temas que ya existan cuando coincidan.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
