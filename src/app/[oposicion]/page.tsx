import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getOposiciones, getEstadisticasOposicion } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";

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
    // "Oposición" al frente: es como se busca ("oposición auxiliar
    // administrativo ayuntamiento de zaragoza"), no solo el nombre del puesto.
    titulo: `Oposición ${oposicion.nombre} · ${oposicion.organismo}`,
    descripcion: `${oposicion.descripcionLarga} Tests, flashcards, casos prácticos y simulacros incluidos. Empieza gratis.`,
    ruta: `/${slug}`,
  });
}

export default async function OposicionHome({ params }: PageProps) {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) notFound();

  const [estadisticas, convocatoria] = await Promise.all([
    getEstadisticasOposicion(slug),
    getConvocatoria(slug),
  ]);

  const ESTADISTICAS = [
    { valor: `${estadisticas.temas}`, etiqueta: "Temas" },
    { valor: `${estadisticas.preguntas}+`, etiqueta: "Preguntas de test" },
    { valor: `${estadisticas.flashcards}+`, etiqueta: "Flashcards" },
    { valor: "1", etiqueta: "Simulacro" },
  ];

  const CARACTERISTICAS = [
    {
      titulo: "Temario interactivo",
      descripcion: "Todo el temario organizado por bloques, listo para estudiar y repasar.",
      href: `/${slug}/temario`,
      icono: "📚",
    },
    {
      titulo: "Tests teóricos",
      descripcion: "Preguntas tipo test con corrección inmediata y explicación de cada respuesta.",
      href: `/${slug}/test`,
      icono: "✓",
    },
    {
      titulo: "Flashcards",
      descripcion: "Memoriza conceptos clave con tarjetas de repaso activo, tema a tema.",
      href: `/${slug}/flashcards`,
      icono: "⚡",
    },
    {
      titulo: "Casos prácticos",
      descripcion: "Supuestos reales del puesto resueltos mediante preguntas encadenadas.",
      href: `/${slug}/casos-practicos`,
      icono: "📋",
    },
    {
      titulo: "Glosario",
      descripcion: "Definiciones claras de los términos administrativos más importantes.",
      href: `/${slug}/glosario`,
      icono: "🔎",
    },
    {
      titulo: "Simulacro cronometrado",
      descripcion: "Examen completo con tiempo límite que reproduce las condiciones reales.",
      href: `/${slug}/simulacro`,
      icono: "⏱",
    },
  ];

  const datosConvocatoria = convocatoria
    ? [
        { valor: `${convocatoria.plazasTotal}`, etiqueta: "Plazas convocadas" },
        {
          valor: `${convocatoria.pruebas.length} pruebas`,
          etiqueta: "Estructura del examen",
          detalle: convocatoria.pruebas.map((p) => p.nombre).join(" · "),
        },
        { valor: convocatoria.duracionMaximaProceso, etiqueta: "Duración máxima del proceso" },
        {
          valor: convocatoria.numero,
          etiqueta: "Convocatoria vigente",
          detalle: `Decreto de ${convocatoria.fechaDecreto}`,
        },
      ]
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-700 to-brand-900 text-white">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
              {convocatoria ? `Oposición · ${convocatoria.numero}` : `Oposición · ${oposicion.organismo}`}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {oposicion.nombre}
            </h1>
            <p className="mt-2 text-lg font-medium text-brand-100">{oposicion.organismo}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">
              {oposicion.descripcionLarga}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${slug}/test`} variante="secundario" tamano="lg">
                Empezar un test gratis
              </Button>
              <Button
                href={`/${slug}/temario`}
                tamano="lg"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                Ver el temario
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Estadísticas */}
      <section className="border-b border-brand-100 bg-white">
        <Container className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {ESTADISTICAS.map((e) => (
            <div key={e.etiqueta} className="text-center">
              <p className="text-3xl font-black text-brand-700 sm:text-4xl">{e.valor}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{e.etiqueta}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Ficha rápida de la convocatoria */}
      {convocatoria && (
        <section className="bg-white">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                titulo="Convocatoria vigente"
                subtitulo={`${convocatoria.numero} · ${convocatoria.plaza}.`}
              />
              <Button href={`/${slug}/convocatoria`} variante="contorno" tamano="sm">
                Ver toda la información →
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {datosConvocatoria.map((d) => (
                <Card key={d.etiqueta} className="p-5">
                  <p className="text-2xl font-black text-brand-700">{d.valor}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-900">{d.etiqueta}</p>
                  {d.detalle && <p className="mt-0.5 text-xs text-slate-500">{d.detalle}</p>}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Características */}
      <section className="bg-brand-50/50">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            centrado
            titulo={`Aprueba la oposición de ${oposicion.nombre}`}
            subtitulo={`Combina teoría, práctica y simulacros en un único lugar, diseñado para que apruebes la oposición de ${oposicion.organismo} de forma eficaz desde el móvil o el ordenador.`}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARACTERISTICAS.map((c) => (
              <Link key={c.href} href={c.href} className="group">
                <Card className="h-full p-6 transition-shadow hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                    <span aria-hidden>{c.icono}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-900 group-hover:text-brand-700">
                    {c.titulo}
                  </h3>
                  <p className="mt-2 text-slate-600">{c.descripcion}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                    Acceder →
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Llamada a la acción final */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <Card className="overflow-hidden">
            <div className="bg-brand-700 px-8 py-12 text-center text-white sm:px-12">
              <h2 className="text-3xl font-bold sm:text-4xl">Saca tu plaza en {oposicion.organismo}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
                Haz tu primer test ahora y comprueba tu nivel. Cuando quieras, pasa al temario
                completo y al simulacro cronometrado.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {CARACTERISTICAS.slice(0, 4).map((c) => (
                  <Button key={c.href} href={c.href} className="bg-white/10 text-white hover:bg-white/20">
                    {c.titulo}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
