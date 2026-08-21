"use client";

import { useMemo, useState } from "react";
import type { TerminoGlosario } from "@/lib/types";

/** Lista de términos con un cuadro de búsqueda que filtra en el cliente. */
export function GlosarioBuscador({ terminos }: { terminos: TerminoGlosario[] }) {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return terminos;
    return terminos.filter(
      (t) => t.termino.toLowerCase().includes(q) || t.definicion.toLowerCase().includes(q)
    );
  }, [terminos, busqueda]);

  return (
    <div>
      <input
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar un término..."
        className="w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm text-brand-950 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none"
      />

      <dl className="mt-6 divide-y divide-brand-100">
        {filtrados.map((t) => (
          <div key={t.id} className="py-4">
            <dt className="font-semibold text-brand-900">{t.termino}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-600">{t.definicion}</dd>
          </div>
        ))}
      </dl>

      {filtrados.length === 0 && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Ningún término coincide con &quot;{busqueda}&quot;.
        </p>
      )}
    </div>
  );
}
