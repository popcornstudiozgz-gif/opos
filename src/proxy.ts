import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Proxy de Next 16 (antes `middleware.ts`). Mantiene viva la sesión de
 * Supabase antes de que un Server Component la lea.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

/**
 * Solo en las rutas cuyo servidor lee la sesión (`/perfil`, `/admin` y sus
 * server actions). Hasta octubre de 2026 corría en casi todas las
 * peticiones — cada visita, de alumno o de robot, a cualquier página
 * pagaba una invocación de función con su `getUser()`, y eso cuenta para
 * el límite de "Fluid Active CPU" de Vercel. El resto de páginas ya no
 * leen la sesión en el servidor (test, flashcards, casos prácticos y
 * simulacro la resuelven en el navegador con `useUsuarioId`), y el cliente
 * de navegador de Supabase refresca el token por su cuenta.
 *
 * Si una página nueva lee la sesión en el servidor (`supabase/server` +
 * `getUser()`), añádela aquí.
 */
export const config = {
  matcher: ["/perfil/:path*", "/admin/:path*"],
};
