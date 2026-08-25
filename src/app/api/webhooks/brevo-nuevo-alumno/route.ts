import { NextResponse } from "next/server";

/**
 * Recibe el Database Webhook de Supabase en cada INSERT sobre `profiles`
 * (alta de un usuario nuevo, ver el trigger `handle_new_user` en
 * `supabase/migrations/0007_usuarios_progreso.sql`) y da de alta ese
 * contacto en Brevo, en la lista `alumnos-activos`.
 *
 * Configuración pendiente en el dashboard de Supabase (Database →
 * Webhooks): método POST, tabla `profiles`, evento Insert, URL
 * `https://<tu-dominio>/api/webhooks/brevo-nuevo-alumno`, cabecera
 * `x-webhook-secret: <mismo valor que SUPABASE_WEBHOOK_SECRET>`.
 *
 * `OPOSICIONES` y `PLAN` se quedan sin enviar de momento: todavía no
 * existe en la base de datos el control de acceso por oposición/plan de
 * pago (ver conversación — es una idea de futuro). Cuando exista esa
 * tabla, se añaden aquí como atributos más, sin tocar el resto del flujo.
 */

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

type SupabaseWebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: {
    id: string;
    email: string | null;
    nombre: string | null;
    created_at: string;
  } | null;
};

export async function POST(request: Request) {
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID_ALUMNOS;

  if (!secret || !apiKey || !listId) {
    console.error(
      "❌ brevo-nuevo-alumno: faltan variables de entorno " +
      "(SUPABASE_WEBHOOK_SECRET, BREVO_API_KEY, BREVO_LIST_ID_ALUMNOS)."
    );
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  if (request.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as SupabaseWebhookPayload;

  // Defensa: solo nos interesa el alta de un perfil nuevo. Si el webhook
  // se reconfigura en el futuro para más eventos/tablas, aquí se ignoran
  // en vez de romper.
  if (payload.type !== "INSERT" || payload.table !== "profiles" || !payload.record?.email) {
    return NextResponse.json({ skipped: true });
  }

  const { email, nombre, created_at } = payload.record;

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      attributes: {
        NOMBRE: nombre ?? undefined,
        FECHA_ALTA: created_at.slice(0, 10), // YYYY-MM-DD
      },
      listIds: [Number(listId)],
      updateEnabled: true, // si el contacto ya existe (p. ej. era lead de newsletter), lo actualiza en vez de fallar
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`❌ brevo-nuevo-alumno: Brevo respondió ${res.status}: ${body}`);
    return NextResponse.json({ error: "brevo error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
