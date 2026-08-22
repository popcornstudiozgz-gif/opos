import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para Server Components y Route Handlers, con la clave
 * `anon` (respeta RLS: solo lee lo público/publicado — ver
 * `supabase/migrations/0001_init.sql`). También gestiona la sesión del
 * usuario logueado (cookies de auth) — ver
 * `supabase/migrations/0007_usuarios_progreso.sql`.
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "❌ Faltan las variables de entorno de Supabase (NEXT_PUBLIC_SUPABASE_URL y " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY). Configúralas en .env.local o en Vercel."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Llamado desde un Server Component: no se pueden escribir cookies aquí.
          // Sin problema mientras no haya sesión que refrescar.
        }
      },
    },
  });
}
