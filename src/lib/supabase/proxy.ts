import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Refresca la sesión de Supabase en cada petición y reescribe las cookies
 * de auth en la respuesta. Lo invoca `src/proxy.ts`.
 *
 * `setAll` recibe un segundo argumento `headers` en @supabase/ssr 0.12.x:
 * cabeceras anti-caché que deben acompañar a las cookies de sesión para que
 * un CDN no sirva el token de un usuario a otro.
 *
 * IMPORTANTE: no metas lógica entre crear el cliente y `getUser()`.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si faltan las variables de entorno, no tumbamos la petición: solo lo
  // avisamos en consola y dejamos pasar sin refrescar sesión.
  if (!url || !anonKey) {
    console.error(
      "❌ Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY para refrescar la sesión."
    );
    return response;
  }

  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          if (headers) {
            Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
          }
        },
      },
    });

    // Revalida el usuario contra el servidor de auth y dispara el refresco de token.
    await supabase.auth.getUser();
  } catch (error) {
    console.error("❌ Error de Supabase Auth en el proxy:", error);
  }

  return response;
}
