import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { organismoConPreposicionCompleto } from "@/lib/site";
import type { Oposicion } from "@/lib/types";
import type { Convocatoria } from "@/data/convocatorias";

/**
 * Portada de una oposición "solo ficha" (sin temas vinculados — ver
 * `Oposicion.soloFicha`): en vez de las herramientas de estudio, que aún no
 * existen, muestra lo que el opositor busca antes de empezar — plazas,
 * requisitos, el programa oficial completo, cómo es el examen y unas
 * preguntas frecuentes generadas a partir de esos mismos datos (con su
 * JSON-LD de FAQPage). Nada de enlaces a test o flashcards vacíos.
 */
export function FichaOposicion({
  oposicion,
  convocatoria,
}: {
  oposicion: Oposicion;
  convocatoria: Convocatoria | undefined;
}) {
  const base = `/${oposicion.organismoSlug}/${oposicion.puestoSlug}`;
  const numTemas = oposicion.temarioOficial.reduce((total, b) => total + b.temas.length, 0);
  const faq = preguntasFrecuentes(oposicion, convocatoria, numTemas);

  const datos = convocatoria
    ? [
        { valor: `${convocatoria.plazasTotal}`, etiqueta: "Plazas", detalle: convocatoria.numero },
        { valor: ESTADO[convocatoria.estado], etiqueta: "Plazo de instancias", detalle: undefined },
        { valor: `${convocatoria.pruebas.length}`, etiqueta: convocatoria.pruebas.length === 1 ? "Prueba" : "Pruebas", detalle: convocatoria.pruebas.map((p) => p.nombre).join(" · ") },
        { valor: `${numTemas}`, etiqueta: "Temas en el programa", detalle: "Temario oficial" },
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
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {oposicion.nombre}{" "}
              {organismoConPreposicionCompleto(oposicion.organismoSlug, oposicion.organismo)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">{oposicion.descripcionLarga}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {convocatoria && (
                <Button href={`${base}/convocatoria`} variante="secundario" tamano="lg">
                  Ver la convocatoria
                </Button>
              )}
              {numTemas > 0 && (
                <Button href="#temario-oficial" tamano="lg" className="bg-white/10 text-white hover:bg-white/20">
                  Ver el temario oficial
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Datos clave */}
      {datos.length > 0 && (
        <section className="border-b border-brand-100 bg-white">
          <Container className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {datos.map((d) => (
              <Card key={d.etiqueta} className="p-5">
                <p className="text-2xl font-black text-brand-700">{d.valor}</p>
                <p className="mt-1 text-sm font-semibold text-brand-900">{d.etiqueta}</p>
                {d.detalle && <p className="mt-0.5 text-xs text-slate-500">{d.detalle}</p>}
              </Card>
            ))}
          </Container>
        </section>
      )}

      {/* Requisitos y examen */}
      {convocatoria && (
        <section className="bg-white">
          <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-brand-900">Requisitos y plazo</h2>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Titulación</h3>
              <p className="mt-1 text-slate-600">{convocatoria.requisitoTitulacion}</p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Sistema de selección</h3>
              <p className="mt-1 text-slate-600">{convocatoria.sistemaSeleccion}</p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Plazo de instancias</h3>
              <p className="mt-1 text-slate-600">{convocatoria.plazoInstancias}</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-brand-900">Cómo es el examen</h2>
              <ol className="mt-4 space-y-4">
                {convocatoria.pruebas.map((p) => (
                  <li key={p.id}>
                    <p className="font-semibold text-brand-900">
                      {p.numero}. {p.nombre}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {[p.formato, p.duracion, p.opciones].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{p.detalle}</p>
                  </li>
                ))}
              </ol>
              <Button href={`${base}/convocatoria`} variante="contorno" tamano="sm" className="mt-6">
                Toda la información de la convocatoria →
              </Button>
            </Card>
          </Container>
        </section>
      )}

      {/* Temario oficial */}
      {numTemas > 0 && (
        <section id="temario-oficial" className="scroll-mt-20 bg-brand-50/50">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              titulo={`Temario oficial de ${oposicion.nombre}`}
              subtitulo={`Los ${numTemas} temas del programa, tal como los publica la convocatoria. Estamos preparando los temas desarrollados, test y flashcards de esta oposición.`}
            />
            <div className="mt-10 space-y-8">
              {oposicion.temarioOficial.map((bloque) => (
                <div key={bloque.bloque}>
                  <h3 className="text-lg font-bold text-brand-900">{bloque.bloque}</h3>
                  <Card className="mt-3 divide-y divide-slate-100 p-0">
                    {bloque.temas.map((t) => (
                      <p key={t.numero} className="flex gap-3 px-5 py-3 text-slate-700">
                        <span className="w-16 shrink-0 font-semibold text-brand-600">Tema {t.numero}</span>
                        <span>{t.titulo}</span>
                      </p>
                    ))}
                  </Card>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Preguntas frecuentes */}
      {faq.length > 0 && (
        <section className="bg-white">
          <Container className="max-w-3xl py-16 sm:py-20">
            <SectionHeading titulo="Preguntas frecuentes" />
            <div className="mt-8 space-y-3">
              {faq.map((f) => (
                <details key={f.pregunta} className="group rounded-xl border border-brand-100 bg-white p-5">
                  <summary className="cursor-pointer list-none font-semibold text-brand-900">{f.pregunta}</summary>
                  <p className="mt-3 text-slate-600">{f.respuesta}</p>
                </details>
              ))}
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.map((f) => ({
                    "@type": "Question",
                    name: f.pregunta,
                    acceptedAnswer: { "@type": "Answer", text: f.respuesta },
                  })),
                }),
              }}
            />
          </Container>
        </section>
      )}
    </>
  );
}

const ESTADO: Record<Convocatoria["estado"], string> = {
  abierta: "Abierto",
  cerrada: "Cerrado",
  pendiente_publicacion: "Sin convocar",
};

/** Preguntas frecuentes derivadas de los datos de la ficha: no se escribe ninguna a mano. */
function preguntasFrecuentes(oposicion: Oposicion, convocatoria: Convocatoria | undefined, numTemas: number) {
  const faq: { pregunta: string; respuesta: string }[] = [];
  const quien = `${oposicion.nombre} ${organismoConPreposicionCompleto(oposicion.organismoSlug, oposicion.organismo)}`;
  if (convocatoria) {
    const desglose = convocatoria.desglosePlazas.map((d) => `${d.cantidad} de ${d.turno.toLowerCase()}`).join(", ");
    faq.push({
      pregunta: `¿Cuántas plazas hay de ${quien}?`,
      respuesta: `${convocatoria.plazasTotal} plazas en la ${convocatoria.numero}${desglose ? `: ${desglose}` : ""}.`,
    });
    faq.push({
      pregunta: "¿Qué titulación se pide?",
      respuesta: convocatoria.requisitoTitulacion,
    });
    faq.push({
      pregunta: "¿Está abierto el plazo de inscripción?",
      respuesta:
        (convocatoria.estado === "abierta"
          ? "Sí. "
          : convocatoria.estado === "cerrada"
            ? "No, el plazo de esta convocatoria ya está cerrado. "
            : "Todavía no: las plazas están previstas, pero la convocatoria no se ha publicado. ") +
        convocatoria.plazoInstancias,
    });
    faq.push({
      pregunta: "¿Cómo es el examen?",
      respuesta: `${convocatoria.sistemaSeleccion}. ${convocatoria.pruebas
        .map((p) => `${p.nombre}: ${[p.formato, p.duracion, p.opciones].filter(Boolean).join(", ")}`)
        .join(". ")}.`,
    });
  }
  if (numTemas > 0) {
    faq.push({
      pregunta: "¿Cuántos temas tiene el temario?",
      respuesta: `El programa oficial tiene ${numTemas} temas${
        oposicion.temarioOficial.length > 1
          ? `, repartidos en ${oposicion.temarioOficial.length} bloques (${oposicion.temarioOficial
              .map((b) => `${b.bloque}: ${b.temas.length}`)
              .join("; ")})`
          : ""
      }.`,
    });
  }
  return faq;
}
