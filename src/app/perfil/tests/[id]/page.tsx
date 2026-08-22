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
    .select("id, modo, total, aciertos, started_at, finished_at, oposiciones(nombre, organismo), temas(titulo)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!intento) notFound();

  const { data: respuestas } = await supabase
    .from("test_respuestas")
    .select("pregunta_id, opcion_id, es_correcta, preguntas(enunciado, explicacion, opciones(id, texto, es_correcta, orden))")
    .eq("intento_id", intento.id)
    .returns<RawRespuesta[]>();

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
        <p className="mt-4 text-5xl font-black text-brand-700">{porcentaje}%</p>
        <p className="mt-2 text-slate-600">
          {intento.aciertos} de {intento.total} respuestas correctas
        </p>
      </Card>

      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-bold text-brand-900">Revisión de respuestas</h2>
        {!respuestas || respuestas.length === 0 ? (
          <Card className="p-6 text-sm text-slate-500">No hay detalle de preguntas guardado para este test.</Card>
        ) : (
          respuestas.map((r, i) => {
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
          })
        )}
      </div>
      </Container>
    </>
  );
}
