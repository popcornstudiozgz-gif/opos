"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Props {
  intentoId: string;
}

export function EliminarIntentoBoton({ intentoId }: Props) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function eliminar() {
    setEliminando(true);
    setError(null);
    const supabase = createClient();
    // Se borran primero las respuestas y luego el intento: más explícito y
    // fiable que depender del ON DELETE CASCADE de la base de datos.
    const { error: errRespuestas } = await supabase.from("test_respuestas").delete().eq("intento_id", intentoId);
    if (errRespuestas) {
      setError("No se pudo eliminar. Inténtalo de nuevo.");
      setEliminando(false);
      return;
    }
    const { error: errIntento } = await supabase.from("test_intentos").delete().eq("id", intentoId);
    setEliminando(false);
    if (errIntento) {
      setError("No se pudo eliminar. Inténtalo de nuevo.");
      return;
    }
    router.refresh();
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
      aria-label="Eliminar test del historial"
      title="Eliminar test del historial"
      className="shrink-0 cursor-pointer rounded-md p-1.5 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-600"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
        />
      </svg>
    </button>
  );
}
