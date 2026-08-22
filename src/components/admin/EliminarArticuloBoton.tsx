"use client";

import { useState } from "react";
import { eliminarArticulo } from "@/app/admin/blog/actions";

export function EliminarArticuloBoton({ id, slug }: { id: string; slug: string }) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function eliminar() {
    setEliminando(true);
    setError(null);
    const resultado = await eliminarArticulo(id, slug);
    // Si tiene éxito, la Server Action redirige y este componente se desmonta:
    // solo llegamos aquí si hubo un error.
    if (resultado?.error) {
      setError(resultado.error);
      setEliminando(false);
    }
  }

  if (confirmando) {
    return (
      <span className="flex shrink-0 items-center gap-1.5">
        {error && <span className="text-xs text-rose-600">{error}</span>}
        <button
          type="button"
          onClick={eliminar}
          disabled={eliminando}
          className="cursor-pointer rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white transition-colors hover:bg-rose-700 disabled:opacity-60"
        >
          {eliminando ? "Eliminando…" : "Confirmar"}
        </button>
        <button
          type="button"
          onClick={() => setConfirmando(false)}
          disabled={eliminando}
          className="cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-60"
        >
          Cancelar
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirmando(true)}
      className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
    >
      Eliminar
    </button>
  );
}
