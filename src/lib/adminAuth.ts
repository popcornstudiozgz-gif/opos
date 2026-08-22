import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Gate del panel de admin: sin tabla de roles todavía (ver
 * `supabase/migrations/0007_usuarios_progreso.sql`), así que se comprueba
 * el email de la sesión contra `ADMIN_EMAILS` (lista separada por comas
 * en `.env.local`/Vercel). Redirige a login si no hay sesión o el email
 * no está en la lista. Se llama desde `src/app/admin/layout.tsx` (gate de
 * toda la sección) y de nuevo desde cada Server Action antes de escribir
 * (defensa en profundidad: el layout no protege las Server Actions).
 */
export async function requireAdmin(next: string = "/admin/blog") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const permitidos = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const email = user?.email?.toLowerCase();
  if (!email || !permitidos.includes(email)) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return user;
}
