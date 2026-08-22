"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Dificultad, Pregunta } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { crearIntento, guardarRespuesta, cerrarIntento } from "@/lib/persistirIntento";

type FiltroDificultad = "todos" | Dificultad;
type Cantidad = 10 | 20 | 30 | 50 | "todas";
type Fase = "config" | "sesion" | "fin";

const FILTROS: { id: FiltroDificultad; label: string }[] = [
  { id: "todos", label: "Todas" },
  { id: "facil", label: "Básico" },
  { id: "media", label: "Medio" },
  { id: "dificil", label: "Avanzado" },
];

const CANTIDADES: { id: Cantidad; label: string }[] = [
  { id: 10, label: "10" },
  { id: 20, label: "20" },
  { id: 30, label: "30" },
  { id: 50, label: "50" },
  { id: "todas", label: "Todas" },
];

function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

interface Props {
  preguntas: Pregunta[];
  contextLabel?: string;
  /** Id del usuario logueado, o null si es anónimo. Resuelto server-side. */
  usuarioId?: string | null;
  oposicionSlug?: string;
  modo?: "tema" | "aleatorio";
  temaSlug?: string | null;
}

export function TestRunner({
  preguntas,
  contextLabel,
  usuarioId = null,
  oposicionSlug,
  modo = "aleatorio",
  temaSlug = null,
}: Props) {
  const [fase, setFase] = useState<Fase>("config");
  const [filtro, setFiltro] = useState<FiltroDificultad>("todos");
  const [cantidad, setCantidad] = useState<Cantidad>(20);
  const [sesion, setSesion] = useState<Pregunta[]>([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<Record<string, string>>({}); // preguntaId -> opcionId
  // Guarda la promesa (no solo el id) del intento en curso, para que las
  // respuestas que lleguen antes de que el insert resuelva no se pierdan.
  const intentoPromiseRef = useRef<Promise<string | null> | null>(null);

  const counts = useMemo(
    () => ({
      facil: preguntas.filter((p) => p.dificultad === "facil").length,
      media: preguntas.filter((p) => p.dificultad === "media").length,
      dificil: preguntas.filter((p) => p.dificultad === "dificil").length,
    }),
    [preguntas]
  );

  const filtradas = useMemo(
    () => (filtro === "todos" ? preguntas : preguntas.filter((p) => p.dificultad === filtro)),
    [preguntas, filtro]
  );
  const disponibles = filtradas.length;
  const numEfectivo = cantidad === "todas" ? disponibles : Math.min(cantidad, disponibles);

  function comenzar() {
    const mezcladas = mezclar(filtradas);
    const seleccionadas = cantidad === "todas" ? mezcladas : mezcladas.slice(0, cantidad);
    // Se baraja también el orden de las opciones de cada pregunta: si la
    // correcta estuviera siempre en la misma posición de inserción, el
    // patrón sería detectable sin saberse la respuesta.
    setSesion(seleccionadas.map((p) => ({ ...p, opciones: mezclar(p.opciones) })));
    setIndice(0);
    setSeleccion({});
    setFase("sesion");

    intentoPromiseRef.current =
      usuarioId && oposicionSlug
        ? crearIntento(createClient(), {
            usuarioId,
            oposicionSlug,
            modo,
            temaSlug: modo === "tema" ? temaSlug : null,
            total: seleccionadas.length,
          })
        : null;
  }

  async function responder(preguntaId: string, opcionId: string) {
    if (seleccion[preguntaId]) return; // ya contestada, no se puede cambiar
    setSeleccion((prev) => ({ ...prev, [preguntaId]: opcionId }));

    const intentoId = await intentoPromiseRef.current;
    if (!intentoId) return;
    const pregunta = sesion.find((p) => p.id === preguntaId);
    const opcion = pregunta?.opciones.find((o) => o.id === opcionId);
    if (!opcion) return;
    await guardarRespuesta(createClient(), intentoId, preguntaId, opcionId, opcion.esCorrecta);
  }

  async function siguiente() {
    if (indice + 1 >= sesion.length) {
      const aciertos = sesion.filter((p) => {
        const opcionId = seleccion[p.id];
        return opcionId && p.opciones.find((o) => o.id === opcionId)?.esCorrecta;
      }).length;
      const intentoId = await intentoPromiseRef.current;
      if (intentoId) await cerrarIntento(createClient(), intentoId, aciertos);
      setFase("fin");
      return;
    }
    setIndice((i) => i + 1);
  }

  // ── Configuración ──────────────────────────────────────
  if (fase === "config") {
    return (
      <div className="space-y-6">
        {contextLabel && (
          <p className="text-sm text-slate-500">
            Practicando: <span className="font-semibold text-brand-700">{contextLabel}</span>
          </p>
        )}

        <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl bg-brand-50 px-4 py-3 text-center">
              <p className="text-2xl font-black text-brand-700">{preguntas.length}</p>
              <p className="text-xs text-brand-500">preguntas disponibles</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Dificultad</p>
            <div className="flex flex-wrap gap-2">
              {FILTROS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFiltro(f.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    filtro === f.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50"
                  }`}
                >
                  {f.label}
                  {f.id !== "todos" && <span className="ml-1 opacity-60">({counts[f.id]})</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Número de preguntas
            </p>
            <div className="flex flex-wrap gap-2">
              {CANTIDADES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCantidad(c.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    cantidad === c.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50"
                  }`}
                >
                  {c.label}
                  {c.id === "todas" && <span className="ml-1 opacity-60">({disponibles})</span>}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={comenzar}
            disabled={disponibles === 0}
            className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Empezar test · {numEfectivo} preguntas
          </button>
        </div>
      </div>
    );
  }

  // ── Fin de sesión ───────────────────────────────────────
  if (fase === "fin") {
    const aciertos = sesion.filter((p) => {
      const opcionId = seleccion[p.id];
      return opcionId && p.opciones.find((o) => o.id === opcionId)?.esCorrecta;
    }).length;

    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">{aciertos === sesion.length ? "🎉" : "📊"}</p>
          <h2 className="mt-3 text-2xl font-bold text-brand-900">Test completado</h2>
          <p className="mt-1 text-slate-500">{sesion.length} preguntas respondidas</p>

          <div className="mt-5 flex justify-center gap-4">
            <div className="rounded-xl bg-emerald-50 px-6 py-4 text-center">
              <p className="text-3xl font-black text-emerald-700">{aciertos}</p>
              <p className="mt-0.5 text-xs text-emerald-600">Correctas</p>
            </div>
            <div className="rounded-xl bg-red-50 px-6 py-4 text-center">
              <p className="text-3xl font-black text-red-600">{sesion.length - aciertos}</p>
              <p className="mt-0.5 text-xs text-red-500">Falladas</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variante="primario" className="flex-1" onClick={comenzar}>
              Repetir sesión
            </Button>
            <Button variante="contorno" className="flex-1" onClick={() => setFase("config")}>
              Nueva configuración
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Sesión activa ───────────────────────────────────────
  const pregunta = sesion[indice];
  const opcionElegida = seleccion[pregunta.id];
  const contestada = !!opcionElegida;
  const progreso = ((indice + 1) / sesion.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setFase("config")} className="text-sm font-medium text-brand-600 hover:underline">
          ← Salir
        </button>
        <p className="text-sm text-slate-500">
          {indice + 1} / {sesion.length}
        </p>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-300"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            {pregunta.dificultad === "facil" ? "Básico" : pregunta.dificultad === "dificil" ? "Avanzado" : "Medio"}
          </span>
        </div>
        <p className="mt-3 text-lg font-semibold text-brand-950">{pregunta.enunciado}</p>

        <div className="mt-4 space-y-2">
          {pregunta.opciones.map((o) => {
            const esElegida = opcionElegida === o.id;
            let estilo = "border-brand-100 hover:border-brand-300";
            if (contestada) {
              if (o.esCorrecta) estilo = "border-emerald-400 bg-emerald-50";
              else if (esElegida) estilo = "border-red-400 bg-red-50";
              else estilo = "border-slate-100 opacity-60";
            }
            return (
              <button
                key={o.id}
                onClick={() => responder(pregunta.id, o.id)}
                disabled={contestada}
                className={`block w-full rounded-lg border px-4 py-3 text-left text-sm font-medium text-brand-950 transition-colors disabled:cursor-default ${estilo}`}
              >
                {o.texto}
                {contestada && o.esCorrecta && <span className="ml-2 text-emerald-600">✓</span>}
                {contestada && esElegida && !o.esCorrecta && <span className="ml-2 text-red-600">✗</span>}
              </button>
            );
          })}
        </div>

        {contestada && pregunta.explicacion && (
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{pregunta.explicacion}</p>
        )}
      </div>

      {contestada && (
        <Button variante="primario" onClick={siguiente} className="w-full">
          {indice + 1 === sesion.length ? "Ver resultado" : "Siguiente →"}
        </Button>
      )}
    </div>
  );
}
