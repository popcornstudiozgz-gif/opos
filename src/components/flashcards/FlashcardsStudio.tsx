"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import type { Flashcard } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { calcularSM2, calidadDesdeBinario, ESTADO_SM2_INICIAL } from "@/lib/sm2";

type Cantidad = 10 | 20 | 30 | 50 | "todas";
type Modo = "todas" | "repasar";
type Fase = "config" | "sesion" | "fin";

const CANTIDADES: { id: Cantidad; label: string }[] = [
  { id: 10, label: "10" },
  { id: 20, label: "20" },
  { id: 30, label: "30" },
  { id: 50, label: "50" },
  { id: "todas", label: "Todas" },
];

interface DailyStats {
  fecha: string;
  tarjetasHoy: number;
  paraRepasar: string[];
}

/** Fallback anónimo (sin sesión): igual criterio que el resto de runners de la app. */
const STATS_EVENT = "kiuti-flashcards-stats-actualizado";

function storageKey(oposicionSlug: string): string {
  return `kiuti_flashcards_stats_${oposicionSlug}`;
}

function getHoy(): string {
  return new Date().toISOString().split("T")[0];
}

function statsPorDefecto(): DailyStats {
  return { fecha: getHoy(), tarjetasHoy: 0, paraRepasar: [] };
}

function saveStats(oposicionSlug: string, stats: DailyStats): void {
  try {
    localStorage.setItem(storageKey(oposicionSlug), JSON.stringify(stats));
    // localStorage no dispara el evento "storage" en la misma pestaña que
    // escribe: se avisa a mano para que useStatsFlashcards vuelva a leer.
    window.dispatchEvent(new Event(STATS_EVENT));
  } catch {
    /* ignore */
  }
}

/**
 * Lee las estadísticas del día (localStorage) vía useSyncExternalStore, no
 * con useState + useEffect: así el snapshot del servidor y el del cliente
 * quedan sincronizados sin el efecto secundario de setState dentro de un
 * useEffect ni riesgo de desajuste en la hidratación (mismo patrón que
 * `useHistorialSimulacro` en SimulacroRunner).
 */
function useStatsFlashcards(oposicionSlug: string): DailyStats {
  const suscribirse = useCallback((cb: () => void) => {
    window.addEventListener(STATS_EVENT, cb);
    window.addEventListener("storage", cb);
    return () => {
      window.removeEventListener(STATS_EVENT, cb);
      window.removeEventListener("storage", cb);
    };
  }, []);
  const getSnapshot = useCallback(() => localStorage.getItem(storageKey(oposicionSlug)) ?? "", [oposicionSlug]);
  const getServerSnapshot = useCallback(() => "", []);
  const raw = useSyncExternalStore(suscribirse, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    if (!raw) return statsPorDefecto();
    try {
      const parsed: DailyStats = JSON.parse(raw);
      return parsed.fecha === getHoy() ? parsed : statsPorDefecto();
    } catch {
      return statsPorDefecto();
    }
  }, [raw]);
}

function barajar<T>(items: T[]): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export interface ProgresoFlashcard {
  repeticiones: number;
  factorFacilidad: number;
  intervaloDias: number;
  proximaRevision: string; // YYYY-MM-DD
}

interface Props {
  cards: Flashcard[];
  contextLabel?: string;
  oposicionSlug: string;
  /** Id del usuario logueado, o null/undefined si es anónimo. */
  usuarioId?: string | null;
  /** Progreso SM-2 ya guardado en Supabase, solo relevante si hay usuarioId. */
  progresoInicial?: Record<string, ProgresoFlashcard>;
}

/**
 * Sesión de estudio de flashcards con repetición espaciada (SM-2): fases
 * config → sesión → fin, autoevaluación "me la sé"/"no la sé" con
 * auto-avance, y un modo "solo para repasar". Con sesión iniciada, cada
 * evaluación se guarda en `flashcard_progreso` (por oposición); sin
 * sesión, el "para repasar" del día se guarda en `localStorage`.
 */
export function FlashcardsStudio({
  cards,
  contextLabel,
  oposicionSlug,
  usuarioId = null,
  progresoInicial = {},
}: Props) {
  const [fase, setFase] = useState<Fase>("config");
  const [cantidad, setCantidad] = useState<Cantidad>(20);
  const [modo, setModo] = useState<Modo>("todas");
  const [tarjetasSesion, setTarjetasSesion] = useState<Flashcard[]>([]);
  const [indice, setIndice] = useState(0);
  const [volteada, setVolteada] = useState(false);
  const [ultimaEval, setUltimaEval] = useState<boolean | null>(null);
  const stats = useStatsFlashcards(oposicionSlug);
  const [progresoSM2, setProgresoSM2] = useState<Record<string, ProgresoFlashcard>>(progresoInicial);

  const hoy = getHoy();
  const estaParaRepasar = useCallback(
    (id: string): boolean => {
      if (usuarioId) {
        const p = progresoSM2[id];
        return !p || p.proximaRevision <= hoy;
      }
      return stats.paraRepasar.includes(id);
    },
    [usuarioId, progresoSM2, hoy, stats.paraRepasar]
  );

  const paraRepasar = cards.filter((c) => estaParaRepasar(c.id));
  const pool = modo === "repasar" ? paraRepasar : cards;
  const disponibles = pool.length;
  const numEfectivo = cantidad === "todas" ? disponibles : Math.min(cantidad, disponibles);

  function comenzar() {
    const mezcladas = barajar(pool);
    const seleccionadas = cantidad === "todas" ? mezcladas : mezcladas.slice(0, cantidad);
    setTarjetasSesion(seleccionadas);
    setIndice(0);
    setVolteada(false);
    setUltimaEval(null);
    setFase("sesion");
  }

  const avanzar = useCallback(
    (paso: number) => {
      const siguiente = indice + paso;
      if (siguiente >= tarjetasSesion.length) {
        setFase("fin");
        return;
      }
      if (siguiente < 0) return;
      setVolteada(false);
      setUltimaEval(null);
      setIndice(siguiente);
    },
    [indice, tarjetasSesion.length]
  );

  function evaluar(sabe: boolean) {
    const tarjeta = tarjetasSesion[indice];
    const updated: DailyStats = { ...stats, paraRepasar: [...stats.paraRepasar] };
    if (ultimaEval === null) updated.tarjetasHoy += 1;
    if (sabe) {
      updated.paraRepasar = updated.paraRepasar.filter((id) => id !== tarjeta.id);
    } else if (!updated.paraRepasar.includes(tarjeta.id)) {
      updated.paraRepasar.push(tarjeta.id);
    }
    saveStats(oposicionSlug, updated);

    if (usuarioId) {
      const actual = progresoSM2[tarjeta.id] ?? ESTADO_SM2_INICIAL;
      const resultado = calcularSM2(actual, calidadDesdeBinario(sabe));
      setProgresoSM2((prev) => ({ ...prev, [tarjeta.id]: resultado }));
      const supabase = createClient();
      supabase
        .from("flashcard_progreso")
        .upsert(
          {
            user_id: usuarioId,
            oposicion_slug: oposicionSlug,
            flashcard_id: tarjeta.id,
            repeticiones: resultado.repeticiones,
            factor_facilidad: resultado.factorFacilidad,
            intervalo_dias: resultado.intervaloDias,
            proxima_revision: resultado.proximaRevision,
            ultima_revision: new Date().toISOString(),
          },
          { onConflict: "user_id,oposicion_slug,flashcard_id" }
        )
        .then(({ error }) => {
          if (error) console.warn("No se pudo guardar el progreso de la tarjeta:", error);
        });
    }

    setUltimaEval(sabe);
  }

  // Auto-avance 900ms tras evaluar
  useEffect(() => {
    if (ultimaEval === null) return;
    const timer = setTimeout(() => avanzar(1), 900);
    return () => clearTimeout(timer);
  }, [ultimaEval, avanzar]);

  // ── Config ──────────────────────────────────────────────
  if (fase === "config") {
    return (
      <div className="space-y-6">
        {contextLabel && (
          <p className="text-sm text-slate-500">
            Repasando: <span className="font-semibold text-brand-700">{contextLabel}</span>
          </p>
        )}

        <div className="space-y-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3">
              <span className="text-2xl font-black text-brand-700">{cards.length}</span>
              <span className="text-xs leading-tight text-brand-500">
                tarjetas
                <br />
                disponibles
              </span>
            </div>
            {paraRepasar.length > 0 && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3">
                <span className="text-2xl font-black text-red-600">{paraRepasar.length}</span>
                <span className="text-xs leading-tight text-red-500">
                  para
                  <br />
                  repasar
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-2xl font-black text-slate-700">{stats.tarjetasHoy}</span>
              <span className="text-xs leading-tight text-slate-500">
                vistas
                <br />
                hoy
              </span>
            </div>
          </div>

          {paraRepasar.length > 0 && (
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Modo</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "todas" as Modo, label: `Todas (${cards.length})` },
                    { id: "repasar" as Modo, label: `Solo para repasar (${paraRepasar.length})` },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModo(m.id)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      modo === m.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Número de tarjetas</p>
            <div className="flex flex-wrap gap-2">
              {CANTIDADES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCantidad(c.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    cantidad === c.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  {c.label}
                  {c.id === "todas" && <span className="ml-1 opacity-60">({disponibles})</span>}
                </button>
              ))}
            </div>
            {typeof cantidad === "number" && cantidad > disponibles && (
              <p className="mt-2 text-xs text-amber-600">Solo hay {disponibles} tarjetas disponibles; se usarán todas.</p>
            )}
          </div>

          <button
            onClick={comenzar}
            disabled={disponibles === 0}
            className="w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Empezar sesión · {numEfectivo} tarjetas
          </button>
        </div>
      </div>
    );
  }

  // ── Fin de sesión ────────────────────────────────────────
  if (fase === "fin") {
    const tarjetasNoSabidas = tarjetasSesion.filter((t) => estaParaRepasar(t.id));
    const noSabidas = tarjetasNoSabidas.length;
    const sabidas = tarjetasSesion.length - noSabidas;

    function comenzarRepaso() {
      setTarjetasSesion(barajar(tarjetasNoSabidas));
      setIndice(0);
      setVolteada(false);
      setUltimaEval(null);
      setFase("sesion");
    }

    return (
      <div className="space-y-5">
        <button onClick={() => setFase("config")} className="text-sm font-medium text-brand-600 hover:underline">
          ← Configuración
        </button>
        <div className="space-y-5 rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">🎉</p>
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Sesión completada</h2>
            <p className="mt-1 text-slate-500">{tarjetasSesion.length} tarjetas repasadas</p>
          </div>
          <div className="flex justify-center gap-4">
            <div className="rounded-xl bg-emerald-50 px-6 py-4 text-center">
              <p className="text-3xl font-black text-emerald-700">{sabidas}</p>
              <p className="mt-0.5 text-xs text-emerald-600">Me la sé</p>
            </div>
            <div className="rounded-xl bg-red-50 px-6 py-4 text-center">
              <p className="text-3xl font-black text-red-600">{noSabidas}</p>
              <p className="mt-0.5 text-xs text-red-500">Para repasar</p>
            </div>
          </div>

          {noSabidas > 0 && (
            <button
              onClick={comenzarRepaso}
              className="w-full rounded-xl bg-red-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600"
            >
              Repasar las {noSabidas} que no sé →
            </button>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button variante="primario" className="flex-1" onClick={comenzar}>
              Repetir sesión
            </Button>
            <Button variante="contorno" className="flex-1" onClick={() => setFase("config")}>
              Nueva sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Sesión activa ───────────────────────────────────────
  const tarjeta = tarjetasSesion[indice];
  if (!tarjeta) return null;
  const total = tarjetasSesion.length;
  const progreso = ((indice + 1) / total) * 100;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button onClick={() => setFase("config")} className="text-sm font-medium text-brand-600 hover:underline">
          ← Volver
        </button>
        <p className="text-sm text-slate-500">
          {indice + 1} / {total}
        </p>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
        <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${progreso}%` }} />
      </div>

      <div className="[perspective:1200px]">
        <div
          role="button"
          tabIndex={0}
          aria-label={volteada ? "Mostrar pregunta" : "Mostrar respuesta"}
          className="relative h-64 cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] sm:h-72"
          style={{ transform: volteada ? "rotateY(180deg)" : "rotateY(0deg)" }}
          onClick={() => !volteada && setVolteada(true)}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-auto rounded-2xl border border-brand-200 bg-white p-8 text-center shadow-sm [backface-visibility:hidden]">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-500">
              Pregunta
            </span>
            <p className="text-xl leading-relaxed font-semibold text-brand-900">{tarjeta.anverso}</p>
            <p className="text-xs text-slate-400">Pulsa para ver la respuesta</p>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-auto rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
              Respuesta
            </span>
            <p className="text-xl leading-relaxed font-semibold text-brand-900">{tarjeta.reverso}</p>
          </div>
        </div>
      </div>

      {volteada && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">¿Cómo ha ido?</p>

          {ultimaEval !== null && (
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
              {/* key nueva en cada evaluación: remonta el div y reinicia la animación CSS desde 0% */}
              <div
                key={`${indice}-${ultimaEval}`}
                className="h-full rounded-full bg-brand-400"
                style={{ animation: "kiuti-barra-progreso 900ms linear forwards" }}
              />
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => evaluar(false)}
              className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                ultimaEval === false
                  ? "border-red-400 bg-red-100 text-red-700 ring-2 ring-red-200"
                  : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              🔴 No la sé
            </button>
            <button
              type="button"
              onClick={() => evaluar(true)}
              className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                ultimaEval === true
                  ? "border-green-400 bg-green-100 text-green-700 ring-2 ring-green-200"
                  : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              🟢 Me la sé
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => avanzar(-1)}
          disabled={indice === 0}
          className="rounded-lg border border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Anterior
        </button>
        <button
          type="button"
          onClick={() => avanzar(1)}
          className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {indice === total - 1 ? "Finalizar" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}
