import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Navbar } from "@/components/layout/Navbar";
import { getOposiciones, getTemasDeOposicion, getEstadisticasCatalogo } from "@/lib/oposiciones";
import { getConvocatoriasAbiertas } from "@/data/convocatorias";
import { getArticulosPublicados } from "@/lib/blog";
import { ArticuloCard } from "@/components/blog/ArticuloCard";
import { SITE, crearMetadata } from "@/lib/site";
import type { Oposicion } from "@/lib/types";

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
    descripcion: "Todo el temario organizado por bloques, con la normativa enlazada al BOE, listo para estudiar y repasar.",
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

/** Ventajas reales de crear una cuenta — mismas cuatro que en /faq, ninguna inventada aquí. */
const VENTAJAS_REGISTRO = [
  {
    titulo: "Historial de cada intento",
    descripcion: "Tests, casos prácticos y simulacros con la revisión pregunta a pregunta, guardados en tu perfil.",
    icono: "📈",
  },
  {
    titulo: "Repaso inteligente de verdad",
    descripcion: "La repetición espaciada de las flashcards (qué tarjeta te toca repasar y cuándo) se guarda en tu cuenta, no solo en el navegador.",
    icono: "🧠",
  },
  {
    titulo: "Marca tu progreso en el temario",
    descripcion: "Señala qué temas ya te has estudiado y lleva el control de lo que te falta.",
    icono: "☑️",
  },
  {
    titulo: "Te sigue en cualquier dispositivo",
    descripcion: "Empieza en el ordenador y continúa en el móvil: todo va contigo al iniciar sesión.",
    icono: "🔄",
  },
];

const VENTAJAS_GRATIS = [
  {
    titulo: "100% gratis, sin letra pequeña",
    descripcion: "Temario, tests, flashcards, casos prácticos, glosario y simulacros: todo el contenido, sin registrarte y sin pagar nada.",
    icono: "🆓",
  },
  {
    titulo: "Fuentes oficiales citadas, no apuntes genéricos",
    descripcion: "Cada tema enlaza a la norma real (BOE, BOA, BOPZ) en la que se basa, en vez de un resumen sin origen verificable.",
    icono: "⚖️",
  },
  {
    titulo: "Oficios que las academias generalistas no cubren",
    descripcion: "Herrero, fontanero, guardallaves, planta potabilizadora... contenido específico para las 16 oposiciones de oficios del Ayuntamiento de Zaragoza, no solo Auxiliar Administrativo.",
    icono: "🔧",
  },
  {
    titulo: "A tu ritmo, sin horarios",
    descripcion: "Sin clases que cuadrar ni desplazamientos: estudia cuando puedas, desde el móvil o el ordenador.",
    icono: "🕒",
  },
];

/** Emoji por defecto para cualquier "Oficial X" no listado explícitamente aquí (nuevas altas no rompen el icono). */
const ICONO_OFICIO_DEFECTO = "🔧";
const ICONOS_OFICIO: Record<string, string> = {
  "oficial-albanil": "🧱",
  "oficial-agente-inspector": "🌳",
  "oficial-carpintero": "🪚",
  "oficial-cementerio": "🪦",
  "oficial-conductor-general": "🚐",
  "oficial-conductor-maquinaria-pesada": "🚜",
  "oficial-electricista": "💡",
  "oficial-fontanero": "🚿",
  "oficial-guardallaves": "🔑",
  "oficial-herrero": "🔨",
  "oficial-instalaciones-deportivas": "🏊",
  "oficial-mantenimiento": "🛠️",
  "oficial-mecanico": "🚗",
  "oficial-pintor-general": "🎨",
  "oficial-pintor-grafica": "🖌️",
  "oficial-planta-potabilizadora": "💧",
};

/** Portada general del dominio: catálogo de oposiciones agrupado por organismo. */
export default async function Home() {
  const [oposiciones, estadisticas, ultimasNoticias, convocatoriasAbiertas] = await Promise.all([
    getOposiciones(),
    getEstadisticasCatalogo(),
    getArticulosPublicados(3),
    getConvocatoriasAbiertas(),
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

  // Agrupa por organismo, y dentro del Ayuntamiento separa Auxiliar
  // Administrativo (administración) del resto de "Oficial X" (oficios) —
  // con 17 oposiciones bajo un único organismo, listarlas todas seguidas
  // sin ningún criterio sería tan plano como la rejilla que sustituye.
  const organismos = new Map<string, { nombre: string; oposiciones: Oposicion[] }>();
  for (const o of oposiciones) {
    const entrada = organismos.get(o.organismoSlug) ?? { nombre: o.organismo, oposiciones: [] };
    entrada.oposiciones.push(o);
    organismos.set(o.organismoSlug, entrada);
  }
  const bloquesOrganismo = [...organismos.entries()]
    .map(([organismoSlug, { nombre, oposiciones: lista }]) => ({ organismoSlug, nombre, oposiciones: lista }))
    .sort((a, b) => b.oposiciones.length - a.oposiciones.length);

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
              <Button href="#organismos" variante="secundario" tamano="lg">
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

      {/* Convocatorias con el plazo abierto ahora mismo */}
      <section className="bg-white">
        <Container className="py-12 sm:py-16">
          {convocatoriasAbiertas.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
                <h2 className="text-xl font-bold text-brand-900">Plazo de instancias abierto ahora mismo</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {convocatoriasAbiertas.map((c) => (
                  <Card key={c.oposicionSlug} className="p-5">
                    <p className="text-sm font-semibold text-brand-600">{c.organismo}</p>
                    <h3 className="mt-1 text-lg font-bold text-brand-900">{c.nombre}</h3>
                    <p className="mt-2 text-sm text-slate-600">{c.plazasTotal} plazas · {c.plazoInstancias}</p>
                    <Button
                      href={`/${c.organismoSlug}/${c.puestoSlug}/convocatoria`}
                      tamano="sm"
                      className="mt-4"
                    >
                      Ver convocatoria →
                    </Button>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="flex flex-col items-start gap-3 border-dashed p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-brand-900">
                  Ahora mismo no hay ninguna convocatoria con el plazo de instancias abierto.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Sigue preparándote: en cuanto se abra un plazo nuevo, aparecerá aquí el primer día.
                </p>
              </div>
              <Button href="#organismos" variante="contorno" tamano="sm" className="shrink-0">
                Ver el catálogo →
              </Button>
            </Card>
          )}
        </Container>
      </section>

      {/* Elige tu organismo */}
      <section id="organismos" className="bg-brand-50/50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            titulo="Elige tu organismo"
            subtitulo="Cada organismo convoca sus propias plazas. Cuando dos oposiciones comparten materia, comparten también ese contenido — nunca se estudia dos veces lo mismo."
          />

          <div className="mt-10 space-y-12">
            {bloquesOrganismo.map(({ organismoSlug, nombre, oposiciones: lista }) => {
              const administracion = lista.filter((o) => !o.puestoSlug.startsWith("oficial-"));
              const oficios = lista.filter((o) => o.puestoSlug.startsWith("oficial-"));
              return (
                <div key={organismoSlug}>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h3 className="text-2xl font-bold text-brand-900">{nombre}</h3>
                    <Button href={`/${organismoSlug}`} variante="fantasma" tamano="sm">
                      Ver ficha del organismo →
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {lista.length} {lista.length === 1 ? "oposición" : "oposiciones"} disponibles
                  </p>

                  {administracion.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {administracion.map((oposicion) => (
                        <OposicionCard
                          key={oposicion.slug}
                          oposicion={oposicion}
                          numTemas={totalTemasDe(oposicion.slug)}
                        />
                      ))}
                    </div>
                  )}

                  {oficios.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">
                        Oficios y personal técnico
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {oficios.map((oposicion) => (
                          <OficioCard
                            key={oposicion.slug}
                            oposicion={oposicion}
                            icono={ICONOS_OFICIO[oposicion.puestoSlug] ?? ICONO_OFICIO_DEFECTO}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="bg-white">
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

      {/* Ventajas de registrarte */}
      <section className="bg-brand-50/50">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
            <div>
              <SectionHeading
                titulo="Crear una cuenta es gratis y no hace falta para estudiar"
                subtitulo="Puedes usar todo el contenido sin registrarte. Si te registras, esto es lo que ganas:"
              />
              <Button href="/registro" tamano="lg" className="mt-6">
                Crear cuenta gratis →
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {VENTAJAS_REGISTRO.map((v) => (
                <Card key={v.titulo} className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden>{v.icono}</span>
                    <div>
                      <h3 className="font-bold text-brand-900">{v.titulo}</h3>
                      <p className="mt-1 text-sm text-slate-600">{v.descripcion}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Por qué gratis / frente a una academia */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            centrado
            titulo="¿Por qué gratis, en vez de una academia?"
            subtitulo="No sustituye una preparación con tutor si la necesitas — pero para repasar temario, hacer tests y llegar con horas de práctica encima, esto es lo que ofrece esta web frente a una academia de pago."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VENTAJAS_GRATIS.map((v) => (
              <Card key={v.titulo} className="h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                  <span aria-hidden>{v.icono}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-900">{v.titulo}</h3>
                <p className="mt-2 text-slate-600">{v.descripcion}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Últimas noticias */}
      {ultimasNoticias.length > 0 && (
        <section className="bg-brand-50/50">
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
                <Button href="#organismos" className="bg-white/10 text-white hover:bg-white/20">
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

function OposicionCard({ oposicion, numTemas }: { oposicion: Oposicion; numTemas: number }) {
  return (
    <Card className="flex flex-col p-6 transition-shadow hover:shadow-md">
      <h3 className="text-xl font-bold text-brand-900">{oposicion.nombre}</h3>
      <p className="mt-3 flex-1 text-slate-600">{oposicion.descripcionCorta}</p>
      <p className="mt-4 text-sm text-slate-500">{numTemas} temas en el temario oficial</p>
      <Button href={`/${oposicion.organismoSlug}/${oposicion.puestoSlug}`} className="mt-6 self-start">
        Empezar a estudiar →
      </Button>
    </Card>
  );
}

/** Tarjeta compacta para los oficios: con 16 en el Ayuntamiento, la versión completa de OposicionCard ocuparía demasiado. */
function OficioCard({ oposicion, icono }: { oposicion: Oposicion; icono: string }) {
  return (
    <Link
      href={`/${oposicion.organismoSlug}/${oposicion.puestoSlug}`}
      className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
    >
      <span className="text-2xl" aria-hidden>{icono}</span>
      <span className="text-sm font-semibold text-brand-900">{oposicion.nombre.replace(/^Oficial\s*/, "")}</span>
    </Link>
  );
}
