import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para componentes de cliente ("use client").
 * Gestiona las cookies de sesión automáticamente vía document.cookie.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error(
      "❌ Faltan las variables de entorno de Supabase (NEXT_PUBLIC_SUPABASE_URL y " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY) en el cliente de navegador."
    );
  }

  return createBrowserClient(url || "", anonKey || "");
}
