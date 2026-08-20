import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase SIN cookies de sesión (clave `anon`). A diferencia de
 * `server.ts`, no depende de `cookies()` de Next, así que funciona igual en
 * tiempo de build (`generateStaticParams`) que en tiempo de petición — y hoy
 * ninguna consulta de contenido depende del usuario (las políticas RLS solo
 * miran `activa`/`publicado`), así que es el cliente correcto para todo
 * `lib/oposiciones.ts` y `data/convocatorias.ts`.
 *
 * Cuando haya login, las consultas que sí dependan del usuario (progreso,
 * perfil...) usarán `server.ts` en su lugar, para que RLS pueda evaluar
 * `auth.uid()`.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "❌ Faltan las variables de entorno de Supabase (NEXT_PUBLIC_SUPABASE_URL y " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY). Configúralas en .env.local o en Vercel."
    );
  }

  return createSupabaseClient(url, anonKey);
}
