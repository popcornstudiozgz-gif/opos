import { NextResponse } from "next/server";

/**
 * Recibe los Database Webhooks de Supabase y sincroniza con Brevo. Pese al
 * nombre de la carpeta (histórico, no lo cambiamos para no tener que
 * reconfigurar el webhook que ya apunta aquí), atiende DOS tablas —
 * distinguidas por `payload.table`:
 *
 *   - INSERT en `profiles` (alta de usuario nuevo, trigger `handle_new_user`
 *     en `supabase/migrations/0007_usuarios_progreso.sql`): da de alta/
 *     actualiza el contacto en Brevo, lista `alumnos-activos`, y te avisa
 *     por correo a `ADMIN_EMAILS` (Supabase no avisa de esto por sí solo).
 *     El alta en esta lista NO depende de `newsletter_optin` — es gestión
 *     del servicio (eres alumno), no marketing. Para campañas comerciales,
 *     segmenta en Brevo por el atributo `NEWSLETTER_OPTIN = true`.
 *
 *   - INSERT en `contactos` (formulario de contacto): solo si
 *     `newsletter_optin` es `true` (checkbox del formulario, ver
 *     `supabase/migrations/0012_intereses_newsletter.sql`), da de alta el
 *     contacto en Brevo, lista `contacto-leads`. Sin consentimiento, no se
 *     manda nada a Brevo.
 *
 * Configuración en el dashboard de Supabase (Database → Webhooks) — hacen
 * falta DOS webhooks, ambos con la misma URL y cabecera:
 *   - tabla `profiles`, evento Insert
 *   - tabla `contactos`, evento Insert
 * URL: `https://<tu-dominio>/api/webhooks/brevo-nuevo-alumno`
 * Cabecera: `x-webhook-secret: <mismo valor que SUPABASE_WEBHOOK_SECRET>`
 */

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";
const REMITENTE_AVISOS = { email: "contacto@oposicioneszaragoza.es", name: "Oposiciones Zaragoza" };

type SupabaseWebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Record<string, unknown> | null;
};

export async function POST(request: Request) {
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;
  const apiKey = process.env.BREVO_API_KEY;

  if (!secret || !apiKey) {
    console.error("❌ brevo-nuevo-alumno: faltan SUPABASE_WEBHOOK_SECRET o BREVO_API_KEY.");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  if (request.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as SupabaseWebhookPayload;

  if (payload.type !== "INSERT" || !payload.record) {
    return NextResponse.json({ skipped: true });
  }

  if (payload.table === "profiles") {
    return manejarNuevoAlumno(payload.record, apiKey);
  }
  if (payload.table === "contactos") {
    return manejarNuevoContacto(payload.record, apiKey);
  }

  // Defensa: si el webhook se reconfigura en el futuro para otra tabla, se
  // ignora en vez de romper.
  return NextResponse.json({ skipped: true });
}

async function manejarNuevoAlumno(record: Record<string, unknown>, apiKey: string) {
  const listId = process.env.BREVO_LIST_ID_ALUMNOS;
  if (!listId) {
    console.error("❌ brevo-nuevo-alumno: falta BREVO_LIST_ID_ALUMNOS.");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const email = record.email as string | null;
  if (!email) return NextResponse.json({ skipped: true });

  const nombre = record.nombre as string | null;
  const createdAt = record.created_at as string;
  const oposicionInteres = record.oposicion_interes as string | null;
  const interesTodas = Boolean(record.interes_todas_oposiciones);
  const newsletterOptin = Boolean(record.newsletter_optin);

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      email,
      attributes: {
        NOMBRE: nombre ?? undefined,
        FECHA_ALTA: createdAt.slice(0, 10), // YYYY-MM-DD
        OPOSICIONES: interesTodas ? "todas" : (oposicionInteres ?? undefined),
        NEWSLETTER_OPTIN: newsletterOptin,
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

  // Aviso al admin: best-effort, no debe tumbar la respuesta si falla (el
  // alta en Brevo, que es lo importante, ya se ha completado arriba).
  await avisarAdmin(apiKey, email, nombre);

  return NextResponse.json({ ok: true });
}

async function manejarNuevoContacto(record: Record<string, unknown>, apiKey: string) {
  // Sin consentimiento explícito no se manda nada a Brevo — el formulario
  // de contacto en sí no da base legal para marketing (ver migración 0012).
  if (!record.newsletter_optin) return NextResponse.json({ skipped: true });

  const listId = process.env.BREVO_LIST_ID_CONTACTO_LEADS;
  if (!listId) {
    console.error("❌ brevo-nuevo-alumno: falta BREVO_LIST_ID_CONTACTO_LEADS.");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const email = record.email as string | null;
  if (!email) return NextResponse.json({ skipped: true });

  const nombre = record.nombre as string | null;

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      email,
      attributes: { NOMBRE: nombre ?? undefined },
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`❌ brevo-nuevo-alumno (contacto): Brevo respondió ${res.status}: ${body}`);
    return NextResponse.json({ error: "brevo error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function avisarAdmin(apiKey: string, email: string, nombre: string | null) {
  const destinatarios = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (destinatarios.length === 0) return;

  try {
    const res = await fetch(BREVO_EMAIL_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        sender: REMITENTE_AVISOS,
        to: destinatarios.map((email) => ({ email })),
        subject: `Nuevo registro: ${nombre ?? email}`,
        htmlContent: `<p>Se acaba de registrar un nuevo usuario en oposicioneszaragoza.es:</p>
          <p><strong>${nombre ?? "(sin nombre)"}</strong><br>${email}</p>`,
      }),
    });
    if (!res.ok) {
      console.error(`❌ brevo-nuevo-alumno: aviso admin falló ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("❌ brevo-nuevo-alumno: aviso admin lanzó una excepción", err);
  }
}
