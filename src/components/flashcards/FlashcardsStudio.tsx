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
export function FlashcardsStudio({
  cards,
  contextLabel,
}: {
  cards: Flashcard[];
  contextLabel?: string;
}) {
  const [orden, setOrden] = useState(cards);
  const [indice, setIndice] = useState(0);
  const [volteada, setVolteada] = useState(false);

  const actual = orden[indice];
  const progreso = useMemo(() => `${indice + 1} / ${orden.length}`, [indice, orden.length]);

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
        <span>
          {contextLabel && <span className="mr-2 text-brand-700">{contextLabel} ·</span>}
          {progreso}
        </span>
        {actual.seccion && (
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            {actual.seccion.replace(/-/g, " ")}
          </span>
        )}
      </div>

      {/* Tarjeta con flip 3D */}
      <div className="mt-4 [perspective:1200px]">
        <div
          role="button"
          tabIndex={0}
          aria-label={volteada ? "Mostrar pregunta" : "Mostrar respuesta"}
          onClick={() => setVolteada((v) => !v)}
          className="group relative h-64 w-full cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] sm:h-80"
          style={{ transform: volteada ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Anverso */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-auto rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm [backface-visibility:hidden] group-hover:border-brand-300">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              Pregunta
            </span>
            <p className="text-lg font-semibold text-brand-950 sm:text-xl">{actual.anverso}</p>
            <span className="mt-2 text-xs text-slate-400">
              Clic o barra espaciadora para voltear
            </span>
          </div>

          {/* Reverso */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-auto rounded-2xl border border-brand-100 bg-brand-50 p-8 text-center shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Respuesta
            </span>
            <p className="text-lg font-semibold text-brand-950 sm:text-xl">{actual.reverso}</p>
          </div>
        </div>
      </div>

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
