"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Pregunta } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { crearIntento, guardarRespuesta, cerrarIntento } from "@/lib/persistirIntento";

/**
 * Recorre las preguntas de un caso práctico en el orden fijado por
 * `caso_preguntas.orden` — a diferencia de `TestRunner`, NO se baraja el
 * orden de las preguntas (muchas dan por conocido el contexto o la
 * respuesta de la anterior), ni hay fase de configuración (dificultad,
 * cantidad): un caso se resuelve completo, tal cual está planteado. Sí se
 * baraja el orden de las opciones de cada pregunta, para que la posición
 * de la correcta no sea un patrón detectable.
 */

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
  usuarioId?: string | null;
  oposicionSlug?: string;
  casoId?: string;
}

export function CasoRunner({ preguntas, usuarioId = null, oposicionSlug, casoId }: Props) {
  const sesion = useMemo(() => preguntas.map((p) => ({ ...p, opciones: mezclar(p.opciones) })), [preguntas]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<Record<string, string>>({});
  const [terminado, setTerminado] = useState(false);
  const intentoPromiseRef = useRef<Promise<string | null> | null>(null);

  // El caso no tiene fase de configuración: el intento se crea al montar,
  // no tras un botón "comenzar" como en TestRunner.
  useEffect(() => {
    intentoPromiseRef.current =
      usuarioId && oposicionSlug
        ? crearIntento(createClient(), { usuarioId, oposicionSlug, modo: "caso", casoId, total: sesion.length })
        : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function responder(preguntaId: string, opcionId: string) {
    if (seleccion[preguntaId]) return;
    setSeleccion((prev) => ({ ...prev, [preguntaId]: opcionId }));

    const intentoId = await intentoPromiseRef.current;
    if (!intentoId) return;
    const opcion = sesion.find((p) => p.id === preguntaId)?.opciones.find((o) => o.id === opcionId);
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
      setTerminado(true);
      return;
    }
    setIndice((i) => i + 1);
  }

  function reiniciar() {
    setIndice(0);
    setSeleccion({});
    setTerminado(false);
    intentoPromiseRef.current =
      usuarioId && oposicionSlug
        ? crearIntento(createClient(), { usuarioId, oposicionSlug, modo: "caso", casoId, total: sesion.length })
        : null;
  }

  if (terminado) {
    const aciertos = sesion.filter((p) => {
      const opcionId = seleccion[p.id];
      return opcionId && p.opciones.find((o) => o.id === opcionId)?.esCorrecta;
    }).length;

    return (
      <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm">
        <p className="text-5xl">{aciertos === sesion.length ? "🎉" : "📊"}</p>
        <h2 className="mt-3 text-2xl font-bold text-brand-900">Caso resuelto</h2>
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

        <Button variante="primario" className="mt-6 w-full" onClick={reiniciar}>
          Repetir caso
        </Button>
      </div>
    );
  }

  const pregunta = sesion[indice];
  const opcionElegida = seleccion[pregunta.id];
  const contestada = !!opcionElegida;
  const progreso = ((indice + 1) / sesion.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-700">Pregunta {indice + 1}</p>
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
        <p className="text-lg font-semibold text-brand-950">{pregunta.enunciado}</p>

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
