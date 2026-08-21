"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Pregunta } from "@/lib/types";

/** Una pregunta del simulacro, con metadata del caso práctico al que pertenece (si aplica). */
export interface PreguntaSimulacro extends Pregunta {
  casoTitulo?: string;
  casoSupuesto?: string;
}

interface Props {
  preguntas: PreguntaSimulacro[];
  tiempoLimiteSegundos: number;
  etiquetaFase: string;
  onFinalizar: (respuestas: Record<string, string>) => void;
}

function letra(indice: number): string {
  return String.fromCharCode(65 + indice); // A, B, C, D...
}

function formatearTiempo(s: number): string {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const seg = (s % 60).toString().padStart(2, "0");
  return `${m}:${seg}`;
}

/**
 * Fase cronometrada de un simulacro (test o casos prácticos): tiempo límite
 * que finaliza la fase automáticamente al llegar a 0, navegación libre
 * entre preguntas (no se bloquea al responder, a diferencia de
 * TestRunner/CasoRunner: aquí no hay corrección inmediata, es examen).
 */
export function SimulacroQuiz({ preguntas, tiempoLimiteSegundos, etiquetaFase, onFinalizar }: Props) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [segundos, setSegundos] = useState(tiempoLimiteSegundos);
  const [confirmando, setConfirmando] = useState(false);
  const [supuestoAbierto, setSupuestoAbierto] = useState(false);

  // Refs para que el intervalo y el aviso de tiempo agotado siempre vean el último estado.
  const respuestasRef = useRef<Record<string, string>>({});
  const onFinalizarRef = useRef(onFinalizar);
  useEffect(() => {
    onFinalizarRef.current = onFinalizar;
  });

  const total = preguntas.length;
  const respondidas = Object.keys(respuestas).length;
  const sinResponder = total - respondidas;

  useEffect(() => {
    if (segundos <= 0) {
      onFinalizarRef.current(respuestasRef.current);
      return;
    }
    const id = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [segundos]);

  function irA(nuevoIndice: number) {
    setIndice(nuevoIndice);
    setSupuestoAbierto(false); // el supuesto se cierra al cambiar de pregunta
  }

  function elegir(opcionId: string) {
    const p = preguntas[indice];
    const next = { ...respuestasRef.current, [p.id]: opcionId };
    respuestasRef.current = next;
    setRespuestas(next);
  }

  function handleFinalizar() {
    if (sinResponder > 0) setConfirmando(true);
    else onFinalizarRef.current(respuestasRef.current);
  }

  const pregunta = preguntas[indice];
  const elegida = respuestas[pregunta.id];
  const progreso = ((indice + 1) / total) * 100;

  if (confirmando) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="space-y-5 p-8 text-center">
          <p className="text-4xl">⚠️</p>
          <h3 className="text-xl font-bold text-brand-900">¿Finalizar {etiquetaFase}?</h3>
          <p className="text-slate-600">
            Tienes <span className="font-bold text-red-600">{sinResponder} {sinResponder === 1 ? "pregunta" : "preguntas"} sin responder</span>.
            Las preguntas sin contestar no puntúan ni penalizan.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button variante="contorno" onClick={() => setConfirmando(false)} className="flex-1">
              Seguir respondiendo
            </Button>
            <Button onClick={() => onFinalizarRef.current(respuestasRef.current)} className="flex-1">
              Sí, finalizar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{etiquetaFase}</p>
          <p className="text-sm text-slate-500">
            Pregunta {indice + 1} de {total} · {respondidas} respondidas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p
            className={`rounded-lg px-3 py-1.5 font-mono text-sm font-semibold ${
              segundos <= 60 ? "bg-red-50 text-red-700" : segundos <= 300 ? "bg-amber-50 text-amber-700" : "bg-brand-50 text-brand-700"
            }`}
            role="timer"
            aria-live="polite"
          >
            ⏱ {formatearTiempo(segundos)}
          </p>
          <button
            type="button"
            onClick={handleFinalizar}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Finalizar
          </button>
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
        <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${progreso}%` }} />
      </div>

      {pregunta.casoSupuesto && (
        <div className="rounded-xl border border-brand-100 bg-brand-50">
          <button
            type="button"
            onClick={() => setSupuestoAbierto((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm font-semibold text-brand-700">📋 {pregunta.casoTitulo} — Ver supuesto</span>
            <span className="text-xs text-brand-500">{supuestoAbierto ? "▲" : "▼"}</span>
          </button>
          {supuestoAbierto && (
            <div className="border-t border-brand-100 px-4 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-brand-800">{pregunta.casoSupuesto}</p>
            </div>
          )}
        </div>
      )}

      <Card className="p-6">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
          {pregunta.dificultad === "facil" ? "Básico" : pregunta.dificultad === "dificil" ? "Avanzado" : "Medio"}
        </span>
        <h2 className="mt-3 text-lg font-semibold text-brand-950">{pregunta.enunciado}</h2>

        <div className="mt-5 space-y-3">
          {pregunta.opciones.map((o, j) => {
            const esElegida = elegida === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => elegir(o.id)}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                  esElegida ? "border-brand-500 bg-brand-50 text-brand-900" : "border-brand-100 bg-white hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-current text-sm font-bold">
                  {letra(j)}
                </span>
                <span>{o.texto}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button variante="contorno" onClick={() => irA(Math.max(0, indice - 1))} disabled={indice === 0}>
          ← Anterior
        </Button>
        {indice < total - 1 ? (
          <Button onClick={() => irA(indice + 1)}>Siguiente →</Button>
        ) : (
          <Button variante="secundario" onClick={handleFinalizar}>
            Finalizar parte
          </Button>
        )}
      </div>
    </div>
  );
}
