import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Navbar } from "@/components/layout/Navbar";
import { getOposiciones, getTemasDeOposicion, getEstadisticasCatalogo } from "@/lib/oposiciones";
import { getArticulosPublicados } from "@/lib/blog";
import { ArticuloCard } from "@/components/blog/ArticuloCard";
import { SITE, crearMetadata } from "@/lib/site";

/**
 * Portada del dominio: palabra clave objetivo "oposiciones Zaragoza" (título,
 * H1 y contenido). Cada oposición concreta tiene su propio SEO en
 * `[oposicion]/page.tsx` — esta página posiciona el catálogo en conjunto.
 */
export const metadata: Metadata = crearMetadata({
  titulo: "Oposiciones en Zaragoza: temario, test y simulacros gratis",
  descripcion: SITE.descripcionLarga,
  ruta: "/",
});

const CARACTERISTICAS = [
  {
    titulo: "Temario interactivo",
    descripcion: "Todo el temario organizado por bloques, listo para estudiar y repasar.",
    icono: "📚",
  },
  {
    titulo: "Tests teóricos",
    descripcion: "Cientos de preguntas tipo test con corrección inmediata y explicación de cada respuesta.",
    icono: "✓",
  },
  {
    titulo: "Flashcards",
    descripcion: "Memoriza conceptos clave con tarjetas de repaso activo, tema a tema.",
    icono: "⚡",
  },
  {
    titulo: "Simulacros cronometrados",
    descripcion: "Exámenes completos con tiempo límite que reproducen las condiciones reales.",
    icono: "⏱",
  },
  {
    titulo: "Casos prácticos",
    descripcion: "Supuestos reales resueltos mediante preguntas encadenadas, tema a tema.",
    icono: "📋",
  },
  {
    titulo: "Glosario",
    descripcion: "Definiciones claras de los términos que más cuesta recordar de cada tema.",
    icono: "🔎",
  },
];

/** Portada general del dominio: catálogo de oposiciones disponibles. */
export default async function Home() {
  const [oposiciones, estadisticas, ultimasNoticias] = await Promise.all([
    getOposiciones(),
    getEstadisticasCatalogo(),
    getArticulosPublicados(3),
  ]);
  const numTemasPorOposicion = await Promise.all(
    oposiciones.map(async (o) => ({ slug: o.slug, total: (await getTemasDeOposicion(o.slug)).length }))
  );
  const totalTemasDe = (slug: string) =>
    numTemasPorOposicion.find((n) => n.slug === slug)?.total ?? 0;

  const ESTADISTICAS = [
    { valor: `${estadisticas.oposiciones}`, etiqueta: "Oposiciones" },
    { valor: `${estadisticas.temas}`, etiqueta: "Temas" },
    { valor: `${estadisticas.preguntas}+`, etiqueta: "Preguntas de test" },
    { valor: `${estadisticas.flashcards}+`, etiqueta: "Flashcards" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-700 to-brand-900 text-white">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
              Temario oficial · Actualizado 2026
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Oposiciones en Zaragoza
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">
              {SITE.descripcionLarga}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#oposiciones" variante="secundario" tamano="lg">
                Ver oposiciones disponibles
              </Button>
              <Button href="#como-funciona" tamano="lg" className="bg-white/10 text-white hover:bg-white/20">
                Cómo funciona
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

      {/* Catálogo de oposiciones */}
      <section id="oposiciones" className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            titulo="Elige tu oposición en Zaragoza"
            subtitulo="Cada oposición tiene su propio temario. Cuando dos oposiciones comparten materia, comparten también ese contenido."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {oposiciones.map((oposicion) => {
              const numTemas = totalTemasDe(oposicion.slug);
              return (
                <Card key={oposicion.slug} className="flex flex-col p-6 transition-shadow hover:shadow-md">
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

      {/* Cómo funciona */}
      <section id="como-funciona" className="bg-brand-50/50">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            centrado
            titulo="Todo lo que necesitas para aprobar"
            subtitulo="Cada oposición del catálogo incluye las mismas herramientas de estudio, pensadas para preparar de forma eficaz desde el móvil o el ordenador."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARACTERISTICAS.map((c) => (
              <Card key={c.titulo} className="h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                  <span aria-hidden>{c.icono}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-900">{c.titulo}</h3>
                <p className="mt-2 text-slate-600">{c.descripcion}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Últimas noticias */}
      {ultimasNoticias.length > 0 && (
        <section className="bg-white">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                titulo="Últimas noticias"
                subtitulo="Convocatorias, plazos y novedades de las oposiciones de Zaragoza."
              />
              <Button href="/blog" variante="contorno" tamano="sm">
                Ver todo el blog →
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ultimasNoticias.map((articulo) => (
                <ArticuloCard key={articulo.id} articulo={articulo} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Llamada a la acción final */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <Card className="overflow-hidden">
            <div className="bg-brand-700 px-8 py-12 text-center text-white sm:px-12">
              <h2 className="text-3xl font-bold sm:text-4xl">Elige tu oposición y empieza hoy</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
                Haz tu primer test ahora y comprueba tu nivel. Cuando quieras, pasa al temario
                completo y a los simulacros cronometrados.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="#oposiciones" className="bg-white/10 text-white hover:bg-white/20">
                  Ver oposiciones disponibles →
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
