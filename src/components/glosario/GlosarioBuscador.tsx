"use client";

import { useMemo, useState } from "react";
import type { TerminoGlosario } from "@/lib/types";

const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function resaltar(texto: string, busqueda: string): React.ReactNode {
  if (!busqueda.trim()) return texto;
  const escapada = busqueda.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapada})`, "gi");
  const partes = texto.split(regex);
  return (
    <>
      {partes.map((parte, i) =>
        regex.test(parte) ? (
          <mark key={i} className="rounded bg-amber-200 px-0.5 text-amber-900">
            {parte}
          </mark>
        ) : (
          <span key={i}>{parte}</span>
        )
      )}
    </>
  );
}

interface Props {
  terminos: TerminoGlosario[];
  /** Total sin filtrar (p. ej. de toda la oposición), si difiere de `terminos`. */
  totalTerminos?: number;
}

/**
 * Lista de términos con buscador, índice alfabético y modo autoevaluación
 * (oculta las definiciones para poder repasar antes de ver la respuesta).
 */
export function GlosarioBuscador({ terminos, totalTerminos }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [modoEstudio, setModoEstudio] = useState(false);
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set());

  const total = totalTerminos ?? terminos.length;

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return terminos;
    return terminos.filter(
      (t) => t.termino.toLowerCase().includes(q) || t.definicion.toLowerCase().includes(q)
    );
  }, [busqueda, terminos]);

  const porLetra = useMemo(() => {
    const grupos: Record<string, TerminoGlosario[]> = {};
    for (const t of filtrados) {
      const letra = t.termino[0]?.toUpperCase() ?? "#";
      if (!grupos[letra]) grupos[letra] = [];
      grupos[letra].push(t);
    }
    return grupos;
  }, [filtrados]);

  const letrasDisponibles = Object.keys(porLetra).sort();

  function isExpandido(id: string): boolean {
    // Modo estudio: cerrado por defecto, abre el que está en el set.
    // Modo normal: abierto por defecto, cierra el que está en el set.
    return modoEstudio ? expandidos.has(id) : !expandidos.has(id);
  }

  function toggleTermino(id: string) {
    setExpandidos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function activarModoEstudio() {
    setModoEstudio(true);
    setExpandidos(new Set());
  }

  function desactivarModoEstudio() {
    setModoEstudio(false);
    setExpandidos(new Set());
  }

  return (
    <div className="space-y-5">
      {/* Barra de búsqueda + toggle modo estudio */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-400">
            🔍
          </span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar un término o definición…"
            className="w-full rounded-lg border border-brand-200 bg-white py-3 pr-4 pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <button
          onClick={modoEstudio ? desactivarModoEstudio : activarModoEstudio}
          className={`flex-shrink-0 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
            modoEstudio
              ? "bg-brand-600 text-white hover:bg-brand-700"
              : "border border-brand-200 text-brand-700 hover:bg-brand-50"
          }`}
        >
          {modoEstudio ? "✓ Autoevaluación activa" : "Modo autoevaluación"}
        </button>
      </div>

      {/* Contador + aviso modo estudio */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span>
          Mostrando <strong className="text-brand-700">{filtrados.length}</strong>
          {filtrados.length !== total && (
            <>
              {" "}
              de <strong className="text-slate-600">{total}</strong>
            </>
          )}{" "}
          conceptos
        </span>
        {modoEstudio && (
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700">
            Haz clic en cada término para ver su definición
          </span>
        )}
      </div>

      {/* Índice alfabético (solo sin búsqueda activa) */}
      {!busqueda && (
        <div className="flex flex-wrap gap-1 rounded-lg border border-brand-100 bg-brand-50/50 p-2">
          {ABECEDARIO.map((letra) => {
            const disponible = letrasDisponibles.includes(letra);
            return disponible ? (
              <a
                key={letra}
                href={`#letra-${letra}`}
                className="grid h-7 w-7 place-items-center rounded-md text-xs font-bold text-brand-600 transition-colors hover:bg-brand-100"
              >
                {letra}
              </a>
            ) : (
              <span key={letra} className="grid h-7 w-7 place-items-center rounded-md text-xs text-slate-300">
                {letra}
              </span>
            );
          })}
        </div>
      )}

      {/* Términos agrupados por letra */}
      {filtrados.length === 0 ? (
        <p className="py-12 text-center text-slate-500">No se encontraron términos para «{busqueda}».</p>
      ) : (
        <div className="space-y-8">
          {letrasDisponibles.map((letra) => (
            <section key={letra} id={`letra-${letra}`} className="scroll-mt-20">
              <h2 className="mb-3 border-b border-brand-100 pb-1.5 text-sm font-bold tracking-widest text-brand-600 uppercase">
                {letra}
              </h2>
              <dl className="space-y-2">
                {porLetra[letra].map((t) => {
                  const abierto = isExpandido(t.id);
                  return (
                    <div
                      key={t.id}
                      className="overflow-hidden rounded-lg border border-brand-100 bg-white transition-shadow hover:shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTermino(t.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-brand-50/50"
                      >
                        <dt className="font-semibold text-brand-900">{resaltar(t.termino, busqueda)}</dt>
                        <span
                          className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                            abierto ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {abierto ? "▲ Ocultar" : "▼ Ver definición"}
                        </span>
                      </button>
                      {abierto && (
                        <dd className="border-t border-brand-50 px-5 py-3.5 text-sm leading-relaxed text-slate-600">
                          {resaltar(t.definicion, busqueda)}
                        </dd>
                      )}
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
