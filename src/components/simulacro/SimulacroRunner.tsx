"use client";

import { useState, useCallback, useMemo, useSyncExternalStore } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { CasoPractico, Pregunta } from "@/lib/types";
import { SimulacroQuiz, type PreguntaSimulacro } from "./SimulacroQuiz";
import { createClient } from "@/lib/supabase/client";
import { crearIntento, guardarRespuesta, cerrarIntento } from "@/lib/persistirIntento";

/**
 * Simulacro completo: dos fases cronometradas (test + casos prácticos) con
 * corrección y puntuación al estilo del examen real. El historial de
 * intentos en `localStorage` (para anónimos, con la nota sobre 15 puntos
 * con penalización) se mantiene tal cual; si hay sesión iniciada, al
 * terminar la Parte 2 se guarda además un `test_intentos` (modo
 * "simulacro") con el detalle de respuestas, igual que TestRunner/CasoRunner.
 */

type Fase = "inicio" | "test" | "resultado-test" | "casos" | "resultado-final";

interface ResultadoParcial {
  preguntas: PreguntaSimulacro[];
  respuestas: Record<string, string>;
  aciertos: number;
  fallos: number;
  sinResponder: number;
  nota: number;
}

interface EntradaHistorial {
  fecha: string;
  notaTest: number;
  notaCasos: number;
  notaTotal: number;
}

const LETRAS = (n: number) => String.fromCharCode(65 + n);
const HISTORIAL_EVENT = "oz-simulacro-historial-actualizado";

function historialKey(oposicionSlug: string): string {
  return `oz_simulacro_historial_${oposicionSlug}`;
}

function guardarHistorial(oposicionSlug: string, historial: EntradaHistorial[]) {
  try {
    localStorage.setItem(historialKey(oposicionSlug), JSON.stringify(historial));
    // localStorage no dispara el evento "storage" en la misma pestaña que escribe:
    // se avisa a mano para que useHistorialSimulacro vuelva a leer.
    window.dispatchEvent(new Event(HISTORIAL_EVENT));
  } catch {
    /* ignore */
  }
}

/**
 * Historial de intentos (localStorage) leído vía useSyncExternalStore, no
 * con el clásico useState + useEffect: así el snapshot del servidor ("[]",
 * porque no hay localStorage al generar la página estática) y el del
 * cliente quedan sincronizados sin el efecto secundario de setState dentro
 * de un useEffect ni riesgo de desajuste en la hidratación.
 */
function useHistorialSimulacro(oposicionSlug: string): EntradaHistorial[] {
  const suscribirse = useCallback((cb: () => void) => {
    window.addEventListener(HISTORIAL_EVENT, cb);
    window.addEventListener("storage", cb);
    return () => {
      window.removeEventListener(HISTORIAL_EVENT, cb);
      window.removeEventListener("storage", cb);
    };
  }, []);
  const getSnapshot = useCallback(() => localStorage.getItem(historialKey(oposicionSlug)) ?? "[]", [oposicionSlug]);
  const getServerSnapshot = useCallback(() => "[]", []);
  const raw = useSyncExternalStore(suscribirse, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    try {
      return JSON.parse(raw) as EntradaHistorial[];
    } catch {
      return [];
    }
  }, [raw]);
}

function calcularResultado(preguntas: PreguntaSimulacro[], respuestas: Record<string, string>, maxPuntos: number): ResultadoParcial {
  let aciertos = 0;
  let fallos = 0;
  let sinResponder = 0;
  for (const p of preguntas) {
    const opcionId = respuestas[p.id];
    if (!opcionId) sinResponder++;
    else if (p.opciones.find((o) => o.id === opcionId)?.esCorrecta) aciertos++;
    else fallos++;
  }
  const raw = aciertos - fallos * 0.25;
  const nota = Math.max(0, preguntas.length > 0 ? (raw / preguntas.length) * maxPuntos : 0);
  return { preguntas, respuestas, aciertos, fallos, sinResponder, nota };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function RevisionRespuestas({ resultado }: { resultado: ResultadoParcial }) {
  return (
    <div className="space-y-3">
      {resultado.preguntas.map((p, i) => {
        const elegida = resultado.respuestas[p.id];
        const acertada = p.opciones.find((o) => o.id === elegida)?.esCorrecta ?? false;
        const sinResp = elegida === undefined;
        return (
          <Card key={p.id} className="p-4">
            {p.casoTitulo && (
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-500">{p.casoTitulo}</p>
            )}
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-brand-950">
                {i + 1}. {p.enunciado}
              </p>
              <span className={`shrink-0 text-xs font-bold ${acertada ? "text-emerald-600" : sinResp ? "text-slate-400" : "text-red-600"}`}>
                {acertada ? "✓" : sinResp ? "○" : "✗"}
              </span>
            </div>
            <ul className="mt-2 space-y-0.5 text-xs">
              {p.opciones.map((o, j) => (
                <li
                  key={o.id}
                  className={`rounded px-2 py-1 ${
                    o.esCorrecta ? "bg-emerald-50 text-emerald-800" : o.id === elegida ? "bg-red-50 text-red-800" : "text-slate-500"
                  }`}
                >
                  <span className="font-semibold">{LETRAS(j)})</span> {o.texto}
                </li>
              ))}
            </ul>
            {p.explicacion && <p className="mt-2 rounded bg-slate-50 px-2 py-1.5 text-xs text-slate-600">{p.explicacion}</p>}
          </Card>
        );
      })}
    </div>
  );
}

/** Guarda el simulacro completo (ambas fases) en Supabase cuando hay sesión. Nunca rechaza. */
async function persistirSimulacro(
  usuarioId: string,
  oposicionSlug: string,
  resultadoTest: ResultadoParcial,
  resultadoCasos: ResultadoParcial
) {
  const supabase = createClient();
  const total = resultadoTest.preguntas.length + resultadoCasos.preguntas.length;
  const aciertos = resultadoTest.aciertos + resultadoCasos.aciertos;

  const intentoId = await crearIntento(supabase, { usuarioId, oposicionSlug, modo: "simulacro", total });
  if (!intentoId) return;

  const filas = [
    ...resultadoTest.preguntas.map((p) => ({ pregunta: p, opcionId: resultadoTest.respuestas[p.id] })),
    ...resultadoCasos.preguntas.map((p) => ({ pregunta: p, opcionId: resultadoCasos.respuestas[p.id] })),
  ];
  await Promise.all(
    filas
      .filter((f): f is { pregunta: PreguntaSimulacro; opcionId: string } => !!f.opcionId)
      .map(({ pregunta, opcionId }) => {
        const opcion = pregunta.opciones.find((o) => o.id === opcionId);
        if (!opcion) return Promise.resolve();
        return guardarRespuesta(supabase, intentoId, pregunta.id, opcionId, opcion.esCorrecta);
      })
  );

  await cerrarIntento(supabase, intentoId, aciertos);
}

interface Props {
  oposicionSlug: string;
  preguntas: Pregunta[];
  casos: CasoPractico[];
  temaABloque: Record<string, string>;
  usuarioId?: string | null;
}

export function SimulacroRunner({ oposicionSlug, preguntas, casos, temaABloque, usuarioId = null }: Props) {
  const [fase, setFase] = useState<Fase>("inicio");
  const [resultadoTest, setResultadoTest] = useState<ResultadoParcial | null>(null);
  const [resultadoCasos, setResultadoCasos] = useState<ResultadoParcial | null>(null);
  const [verTest, setVerTest] = useState(false);
  const [verCasos, setVerCasos] = useState(false);
  const historial = useHistorialSimulacro(oposicionSlug);

  const preguntasCasos: PreguntaSimulacro[] = casos.flatMap((caso) =>
    caso.preguntas.map((p) => ({ ...p, casoTitulo: caso.titulo, casoSupuesto: caso.supuesto }))
  );

  function handleFinTest(respuestas: Record<string, string>) {
    const r = calcularResultado(preguntas, respuestas, 10);
    setResultadoTest(r);
    setFase("resultado-test");
  }

  function handleFinCasos(respuestas: Record<string, string>) {
    const r = calcularResultado(preguntasCasos, respuestas, 5);
    setResultadoCasos(r);

    if (resultadoTest) {
      const entry: EntradaHistorial = {
        fecha: new Date().toLocaleDateString("es-ES"),
        notaTest: round2(resultadoTest.nota),
        notaCasos: round2(r.nota),
        notaTotal: round2(resultadoTest.nota + r.nota),
      };
      guardarHistorial(oposicionSlug, [entry, ...historial].slice(0, 5));

      if (usuarioId) {
        void persistirSimulacro(usuarioId, oposicionSlug, resultadoTest, r);
      }
    }

    setFase("resultado-final");
  }

  function reiniciar() {
    setResultadoTest(null);
    setResultadoCasos(null);
    setVerTest(false);
    setVerCasos(false);
    setFase("inicio");
  }

  // ── Inicio ──────────────────────────────────────────────
  if (fase === "inicio") {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="space-y-6 p-8">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Simulacro completo</h2>
            <p className="mt-1 text-slate-500">Examen en dos fases cronometradas en condiciones reales.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-brand-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-400">Parte 1</p>
              <p className="mt-1 font-bold text-brand-900">Test tipo test</p>
              <p className="mt-1 text-sm text-brand-700">{preguntas.length} preguntas · 55 min · puntuación /10</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Parte 2</p>
              <p className="mt-1 font-bold text-slate-800">Casos prácticos</p>
              <p className="mt-1 text-sm text-slate-600">{preguntasCasos.length} preguntas · 30 min · puntuación /5</p>
            </div>
          </div>

          <div className="space-y-1.5 rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-700">Sistema de puntuación</p>
            <p>
              <span className="font-medium text-emerald-700">✅ Correcta</span>: +1 punto ·{" "}
              <span className="font-medium text-red-600">❌ Incorrecta</span>: −0,25 puntos ·{" "}
              <span className="text-slate-500">○ Sin responder</span>: 0 puntos
            </p>
            <p className="text-slate-500">
              Puntuación total máxima: <span className="font-semibold text-slate-700">15 puntos</span> (10 + 5)
            </p>
          </div>

          {historial.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Últimos resultados</p>
              <div className="mt-2 space-y-1.5">
                {historial.map((h, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                    <span className="text-slate-400">{h.fecha}</span>
                    <span className="text-slate-600">
                      Test <span className="font-semibold text-brand-700">{h.notaTest.toFixed(2)}/10</span> · Casos{" "}
                      <span className="font-semibold text-brand-700">{h.notaCasos.toFixed(2)}/5</span> · Total{" "}
                      <span className="font-bold text-brand-900">{h.notaTotal.toFixed(2)}/15</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button tamano="lg" onClick={() => setFase("test")} className="w-full" disabled={preguntas.length === 0}>
            Comenzar Parte 1 · Test →
          </Button>
        </Card>
      </div>
    );
  }

  // ── Test ────────────────────────────────────────────────
  if (fase === "test") {
    return <SimulacroQuiz preguntas={preguntas} tiempoLimiteSegundos={55 * 60} etiquetaFase="Parte 1 · Test" onFinalizar={handleFinTest} />;
  }

  // ── Resultado test ──────────────────────────────────────
  if (fase === "resultado-test" && resultadoTest) {
    const porBloque: Record<string, { total: number; aciertos: number }> = {};
    for (const p of resultadoTest.preguntas) {
      const bloque = temaABloque[p.temaSlug] ?? "Otros";
      if (!porBloque[bloque]) porBloque[bloque] = { total: 0, aciertos: 0 };
      porBloque[bloque].total++;
      const opId = resultadoTest.respuestas[p.id];
      if (p.opciones.find((o) => o.id === opId)?.esCorrecta) porBloque[bloque].aciertos++;
    }

    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Card className="space-y-3 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Parte 1 completada ✓</p>
          <p className="text-5xl font-black text-brand-700">
            {resultadoTest.nota.toFixed(2)}
            <span className="text-2xl font-bold text-brand-400">/10</span>
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <span className="text-emerald-700">✅ {resultadoTest.aciertos} aciertos</span>
            <span className="text-red-600">❌ {resultadoTest.fallos} fallos</span>
            <span className="text-slate-500">○ {resultadoTest.sinResponder} sin resp.</span>
          </div>
        </Card>

        <Card className="space-y-3 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Por bloque temático</p>
          {Object.entries(porBloque).map(([bloque, datos]) => {
            const pct = Math.round((datos.aciertos / datos.total) * 100);
            return (
              <div key={bloque}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">{bloque}</span>
                  <span className="font-medium text-slate-600">
                    {datos.aciertos}/{datos.total}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 70 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </Card>

        <button onClick={() => setVerTest((v) => !v)} className="text-sm font-medium text-brand-600 hover:underline">
          {verTest ? "Ocultar" : "Ver"} respuestas del test
        </button>
        {verTest && <RevisionRespuestas resultado={resultadoTest} />}

        {preguntasCasos.length > 0 ? (
          <Button tamano="lg" onClick={() => setFase("casos")} className="w-full">
            Continuar con los Casos Prácticos →
          </Button>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            No hay casos prácticos disponibles todavía. El simulacro ha concluido.
          </div>
        )}
      </div>
    );
  }

  // ── Casos ───────────────────────────────────────────────
  if (fase === "casos") {
    return <SimulacroQuiz preguntas={preguntasCasos} tiempoLimiteSegundos={30 * 60} etiquetaFase="Parte 2 · Casos prácticos" onFinalizar={handleFinCasos} />;
  }

  // ── Resultado final ─────────────────────────────────────
  if (fase === "resultado-final" && resultadoTest && resultadoCasos) {
    const total = round2(resultadoTest.nota + resultadoCasos.nota);

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="space-y-6 p-8 text-center">
          <p className="text-5xl">🎉</p>
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Simulacro completado</h2>
            <p className="mt-1 text-slate-500">Aquí tienes tu resultado</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 rounded-xl bg-brand-50 py-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-400">Test</p>
              <p className="mt-1 text-4xl font-black text-brand-700">{resultadoTest.nota.toFixed(2)}</p>
              <p className="text-sm text-brand-400">/10</p>
            </div>
            <span className="text-2xl font-bold text-slate-300">+</span>
            <div className="flex-1 rounded-xl bg-slate-50 py-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Casos</p>
              <p className="mt-1 text-4xl font-black text-slate-700">{resultadoCasos.nota.toFixed(2)}</p>
              <p className="text-sm text-slate-400">/5</p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-600 py-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Puntuación total</p>
            <p className="mt-2 text-6xl font-black">{total.toFixed(2)}</p>
            <p className="mt-1 text-base font-medium opacity-60">de 15 puntos</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl bg-emerald-50 py-3">
              <p className="text-xl font-black text-emerald-700">{resultadoTest.aciertos + resultadoCasos.aciertos}</p>
              <p className="text-xs text-emerald-600">aciertos</p>
            </div>
            <div className="rounded-xl bg-red-50 py-3">
              <p className="text-xl font-black text-red-600">{resultadoTest.fallos + resultadoCasos.fallos}</p>
              <p className="text-xs text-red-500">fallos</p>
            </div>
            <div className="rounded-xl bg-slate-50 py-3">
              <p className="text-xl font-black text-slate-600">{resultadoTest.sinResponder + resultadoCasos.sinResponder}</p>
              <p className="text-xs text-slate-500">sin resp.</p>
            </div>
          </div>

          <Button onClick={reiniciar} className="w-full">
            Nuevo simulacro
          </Button>
        </Card>

        <div className="space-y-3">
          <button onClick={() => setVerTest((v) => !v)} className="text-sm font-medium text-brand-600 hover:underline">
            {verTest ? "Ocultar" : "Ver"} respuestas del test
          </button>
          {verTest && <RevisionRespuestas resultado={resultadoTest} />}
        </div>

        {preguntasCasos.length > 0 && (
          <div className="space-y-3">
            <button onClick={() => setVerCasos((v) => !v)} className="text-sm font-medium text-brand-600 hover:underline">
              {verCasos ? "Ocultar" : "Ver"} respuestas de los casos prácticos
            </button>
            {verCasos && <RevisionRespuestas resultado={resultadoCasos} />}
          </div>
        )}
      </div>
    );
  }

  return null;
}
