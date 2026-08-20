import { createClient } from "@supabase/supabase-js";
import "server-only";

/**
 * Cliente con la clave `service_role`: SALTA TODAS LAS POLÍTICAS RLS.
 * Úsalo solo en código de servidor de confianza (scripts de seed, tareas
 * administrativas). Nunca lo importes desde un componente de cliente.
 *
 * El import "server-only" hace que el build falle si se cuela en el bundle
 * del navegador.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "❌ Faltan las variables de entorno de administración de Supabase " +
      "(NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
