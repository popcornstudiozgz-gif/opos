"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Flashcard } from "@/lib/types";

/** Baraja un array sin mutar el original (Fisher-Yates). */
function barajar<T>(items: T[]): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Sesión de estudio de flashcards: una tarjeta a la vez, se voltea al hacer
 * clic (o con la barra espaciadora) y se navega con los botones o las
 * flechas del teclado. El orden se puede barajar sin recargar la página.
 */
export function FlashcardsStudio({ cards }: { cards: Flashcard[] }) {
  const [orden, setOrden] = useState(cards);
  const [indice, setIndice] = useState(0);
  const [volteada, setVolteada] = useState(false);

  const actual = orden[indice];
  const progreso = useMemo(
    () => `${indice + 1} / ${orden.length}`,
    [indice, orden.length]
  );

  function siguiente() {
    setVolteada(false);
    setIndice((i) => (i + 1) % orden.length);
  }

  function anterior() {
    setVolteada(false);
    setIndice((i) => (i - 1 + orden.length) % orden.length);
  }

  function mezclar() {
    setOrden(barajar(cards));
    setIndice(0);
    setVolteada(false);
  }

  if (!actual) return null;

  return (
    <div
      className="w-full"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") siguiente();
        if (e.key === "ArrowLeft") anterior();
        if (e.key === " ") {
          e.preventDefault();
          setVolteada((v) => !v);
        }
      }}
      tabIndex={0}
    >
      <div className="flex items-center justify-between text-sm font-medium text-slate-500">
        <span>{progreso}</span>
        {actual.seccion && (
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            {actual.seccion.replace(/-/g, " ")}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setVolteada((v) => !v)}
        className="group mt-4 flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm transition hover:border-brand-300 sm:min-h-80 sm:p-12"
        aria-label={volteada ? "Mostrar pregunta" : "Mostrar respuesta"}
      >
        <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-500">
          {volteada ? "Respuesta" : "Pregunta"}
        </span>
        <p className="text-lg font-semibold text-brand-950 sm:text-xl">
          {volteada ? actual.reverso : actual.anverso}
        </p>
        <span className="mt-6 text-xs text-slate-400 group-hover:text-brand-500">
          Clic o barra espaciadora para voltear
        </span>
      </button>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variante="contorno" tamano="sm" onClick={anterior}>
          ← Anterior
        </Button>
        <Button variante="fantasma" tamano="sm" onClick={mezclar}>
          Mezclar
        </Button>
        <Button variante="primario" tamano="sm" onClick={siguiente}>
          Siguiente →
        </Button>
      </div>
    </div>
  );
}
