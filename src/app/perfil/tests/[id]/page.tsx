import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Resultado del test",
  descripcion: "Revisión de un test completado.",
  ruta: "/perfil",
  indexable: false, // página privada, sin valor de búsqueda propio
});

const LETRAS = ["A", "B", "C", "D"] as const;

type RawOpcion = { id: string; texto: string; es_correcta: boolean; orden: number };
type RawPregunta = { enunciado: string; explicacion: string | null; opciones: RawOpcion[] } | null;
type RawRespuesta = {
  pregunta_id: string;
  opcion_id: string | null;
  es_correcta: boolean;
  preguntas: RawPregunta;
};

type CasoInfo = { id: string; slug: string; titulo: string; supuesto: string };
type FilaCasoPregunta = {
  pregunta_id: string;
  orden: number;
  casos_practicos: CasoInfo | CasoInfo[] | null;
};

function unico<T>(v: T | T[] | null): T | null {
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

function tituloModo(modo: string, temas: { titulo: string } | { titulo: string }[] | null): string {
  if (modo === "aleatorio") return "Todas las preguntas";
  if (modo === "simulacro") return "Simulacro";
  if (modo === "caso") return "Caso práctico";
  if (modo === "tema") return unico(temas)?.titulo ?? "Tema";
  return modo;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultadoTestPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/perfil/tests/${id}`);
  }

  const { data: intento } = await supabase
    .from("test_intentos")
    .select(
      "id, modo, total, aciertos, started_at, finished_at, nota_test, nota_casos, total_test, aciertos_test, total_casos, aciertos_casos, oposiciones(nombre, organismo), temas(titulo)"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!intento) notFound();

  // El simulacro tiene su propia nota por parte (con penalización de
  // fallos incluida, ver `supabase/migrations/0014_simulacro_desglose.sql`)
  // — el % simple de aciertos/total del resto de modos no la representa.
  const esSimulacroConDesglose = intento.modo === "simulacro" && intento.nota_test != null && intento.nota_casos != null;
  const notaTotal = esSimulacroConDesglose ? Math.round((intento.nota_test! + intento.nota_casos!) * 100) / 100 : null;

  const { data: respuestas } = await supabase
    .from("test_respuestas")
    .select("pregunta_id, opcion_id, es_correcta, preguntas(enunciado, explicacion, opciones(id, texto, es_correcta, orden))")
    .eq("intento_id", intento.id)
    .returns<RawRespuesta[]>();

  // Si alguna de estas preguntas pertenece a un caso práctico (modo "caso",
  // o la parte de casos de un simulacro), su supuesto es imprescindible
  // para que la pregunta tenga sentido — sin él son preguntas sueltas sin
  // contexto. Se agrupan aquí en vez de asumir `intento.caso_id`: un
  // simulacro reparte sus preguntas de casos entre DOS casos distintos, y
  // esa columna solo guarda uno.
  const { data: casoPreguntas } =
    respuestas && respuestas.length > 0
      ? await supabase
          .from("caso_preguntas")
          .select("pregunta_id, orden, casos_practicos(id, slug, titulo, supuesto)")
          .in(
            "pregunta_id",
            respuestas.map((r) => r.pregunta_id)
          )
          .returns<FilaCasoPregunta[]>()
      : { data: [] as FilaCasoPregunta[] };

  const casoPorPregunta = new Map<string, { casoId: string; orden: number }>();
  const casosPorId = new Map<string, CasoInfo>();
  for (const fila of casoPreguntas ?? []) {
    const caso = unico(fila.casos_practicos);
    if (!caso) continue;
    casoPorPregunta.set(fila.pregunta_id, { casoId: caso.id, orden: fila.orden });
    casosPorId.set(caso.id, caso);
  }

  const preguntasSueltas = (respuestas ?? []).filter((r) => !casoPorPregunta.has(r.pregunta_id));
  const respuestasPorCaso = new Map<string, RawRespuesta[]>();
  for (const r of respuestas ?? []) {
    const info = casoPorPregunta.get(r.pregunta_id);
    if (!info) continue;
    respuestasPorCaso.set(info.casoId, [...(respuestasPorCaso.get(info.casoId) ?? []), r]);
  }
  const gruposPorCaso = [...respuestasPorCaso.entries()]
    .map(([casoId, lista]) => ({
      caso: casosPorId.get(casoId)!,
      respuestas: [...lista].sort(
        (a, b) => (casoPorPregunta.get(a.pregunta_id)?.orden ?? 0) - (casoPorPregunta.get(b.pregunta_id)?.orden ?? 0)
      ),
    }))
    .sort((a, b) => a.caso.slug.localeCompare(b.caso.slug));

  const oposicion = unico(intento.oposiciones);
  const porcentaje = intento.total > 0 ? Math.round((intento.aciertos / intento.total) * 100) : 0;
  const fecha = new Date(intento.started_at).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Navbar />
      <Container className="max-w-2xl py-12">
      <Link href="/perfil" className="text-sm font-medium text-brand-600 hover:underline">
        ← Volver a mi perfil
      </Link>

      <Card className="mt-6 p-8 text-center">
        {oposicion && (
          <p className="text-xs font-semibold text-brand-500">
            {oposicion.nombre} ({oposicion.organismo})
          </p>
        )}
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-500">
          {tituloModo(intento.modo, intento.temas)}
        </p>
        <p className="mt-1 text-xs text-slate-400">{fecha}</p>
        {esSimulacroConDesglose ? (
          <>
            <p className="mt-4 text-5xl font-black text-brand-700">{notaTotal!.toFixed(2)}/15</p>
            <p className="mt-2 text-slate-600">
              Test: {intento.aciertos_test}/{intento.total_test} ({intento.nota_test!.toFixed(2)}/10) · Casos:{" "}
              {intento.aciertos_casos}/{intento.total_casos} ({intento.nota_casos!.toFixed(2)}/5)
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-5xl font-black text-brand-700">{porcentaje}%</p>
            <p className="mt-2 text-slate-600">
              {intento.aciertos} de {intento.total} respuestas correctas
            </p>
          </>
        )}
      </Card>

      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-bold text-brand-900">Revisión de respuestas</h2>
        {!respuestas || respuestas.length === 0 ? (
          <Card className="p-6 text-sm text-slate-500">No hay detalle de preguntas guardado para este test.</Card>
        ) : (
          <>
            {/* Simulacro con ambas partes: separa test y casos con su propio
                encabezado. Un caso suelto (modo "caso") no necesita esta
                separación — solo tiene el grupo de su propio caso. */}
            {gruposPorCaso.length > 0 && preguntasSueltas.length > 0 && (
              <h3 className="text-sm font-bold tracking-wide text-brand-500 uppercase">Parte 1 · Test</h3>
            )}
            {preguntasSueltas.map((r, i) => renderPregunta(r, i))}

            {gruposPorCaso.length > 0 && preguntasSueltas.length > 0 && (
              <h3 className="pt-2 text-sm font-bold tracking-wide text-brand-500 uppercase">Parte 2 · Casos prácticos</h3>
            )}
            {gruposPorCaso.map(({ caso, respuestas: respuestasCaso }) => (
              <div key={caso.id} className="space-y-4">
                <Card className="border-brand-100 bg-brand-50/40 p-5">
                  <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
                    Caso práctico · {caso.titulo}
                  </p>
                  <p className="mt-2 text-xs font-semibold tracking-wide text-brand-500 uppercase">Supuesto</p>
                  <p className="mt-1 whitespace-pre-line leading-relaxed text-slate-700">{caso.supuesto}</p>
                </Card>
                {respuestasCaso.map((r, i) => renderPregunta(r, i))}
              </div>
            ))}
          </>
        )}
      </div>
      </Container>
    </>
  );

  function renderPregunta(r: RawRespuesta, i: number) {
    const pregunta = r.preguntas;
    if (!pregunta) return null;
    const opciones = [...pregunta.opciones].sort((a, b) => a.orden - b.orden);
    return (
      <Card key={r.pregunta_id} className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium text-slate-800">
            {i + 1}. {pregunta.enunciado}
          </p>
          <span className={`shrink-0 text-sm font-semibold ${r.es_correcta ? "text-emerald-600" : "text-rose-600"}`}>
            {r.es_correcta ? "Correcta" : "Incorrecta"}
          </span>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {opciones.map((op, j) => {
            const esElegida = op.id === r.opcion_id;
            return (
              <li
                key={op.id}
                className={`rounded-md px-3 py-1.5 ${
                  op.es_correcta
                    ? "bg-emerald-50 text-emerald-800"
                    : esElegida
                      ? "bg-rose-50 text-rose-800"
                      : "text-slate-600"
                }`}
              >
                <span className="font-semibold">{LETRAS[j]})</span> {op.texto}
              </li>
            );
          })}
        </ul>
        {pregunta.explicacion && (
          <p className="mt-3 rounded-md bg-brand-50 px-3 py-2 text-sm text-brand-800">{pregunta.explicacion}</p>
        )}
      </Card>
    );
  }
}
