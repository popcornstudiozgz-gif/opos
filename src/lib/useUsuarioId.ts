"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Id del usuario con sesión iniciada, resuelto en el navegador (null si es
 * anónimo o mientras se comprueba).
 *
 * Las páginas de estudio (test, flashcards, casos prácticos, simulacro) son
 * estáticas desde octubre de 2026 — el servidor ya no lee la sesión, porque
 * leer las cookies obligaba a renderizar la página en cada visita y eso era
 * el grueso del consumo de "Fluid Active CPU" de Vercel. El usuario solo se
 * necesita para guardar progreso, así que basta con conocerlo en cliente.
 */
export function useUsuarioId(): string | null {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let cancelado = false;
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        if (!cancelado) setUsuarioId(user?.id ?? null);
      })
      .catch(() => {});
    const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      if (!cancelado) setUsuarioId(sesion?.user.id ?? null);
    });
    return () => {
      cancelado = true;
      data.subscription.unsubscribe();
    };
  }, []);

  return usuarioId;
}
