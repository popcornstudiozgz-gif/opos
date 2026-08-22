import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Proxy de Next 16 (antes `middleware.ts`). Mantiene viva la sesión de
 * Supabase en cada navegación.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Aplica a todo salvo: ficheros estáticos, optimización de imágenes y
     * metadatos. Evita refrescar sesión en assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
