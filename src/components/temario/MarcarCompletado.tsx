"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  oposicionSlug: string;
  temaSlug: string;
}

type Estado = "cargando" | "anonimo" | "listo";

export function MarcarCompletado({ oposicionSlug, temaSlug }: Props) {
  const [estado, setEstado] = useState<Estado>("cargando");
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [completado, setCompletado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelado) setEstado("anonimo");
        return;
      }

      const { data: progreso } = await supabase
        .from("tema_progreso")
        .select("completado")
        .eq("user_id", user.id)
        .eq("oposicion_slug", oposicionSlug)
        .eq("tema_slug", temaSlug)
        .maybeSingle();

      if (cancelado) return;
      setUsuarioId(user.id);
      setCompletado(progreso?.completado ?? false);
      setEstado("listo");
    }

    cargar().catch(() => {
      if (!cancelado) setEstado("anonimo");
    });

    return () => {
      cancelado = true;
    };
  }, [oposicionSlug, temaSlug]);

  async function alternar() {
    if (!usuarioId) return;
    const nuevo = !completado;
    setGuardando(true);
    setCompletado(nuevo);
    const supabase = createClient();
    const { error } = await supabase.from("tema_progreso").upsert(
      {
        user_id: usuarioId,
        oposicion_slug: oposicionSlug,
        tema_slug: temaSlug,
        completado: nuevo,
        ultima_actividad: new Date().toISOString(),
      },
      { onConflict: "user_id,oposicion_slug,tema_slug" }
    );
    setGuardando(false);
    if (error) {
      console.warn("No se pudo guardar el progreso del tema:", error);
      setCompletado(!nuevo);
    }
  }

  if (estado !== "listo") return null;

  return (
    <button
      type="button"
      onClick={alternar}
      disabled={guardando}
      className={`mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${
        completado
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-brand-300 bg-white text-brand-700 hover:bg-brand-50"
      }`}
    >
      {completado ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Tema completado
        </>
      ) : (
        "Marcar como completado"
      )}
    </button>
  );
}
