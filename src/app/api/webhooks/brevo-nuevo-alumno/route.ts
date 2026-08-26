import { NextResponse } from "next/server";

/**
 * Recibe los Database Webhooks de Supabase y sincroniza con Brevo. Pese al
 * nombre de la carpeta (histórico, no lo cambiamos para no tener que
 * reconfigurar el webhook que ya apunta aquí), atiende DOS tablas —
 * distinguidas por `payload.table`:
 *
 *   - INSERT en `profiles` (alta de usuario nuevo, trigger `handle_new_user`
 *     en `supabase/migrations/0007_usuarios_progreso.sql`): da de alta/
 *     actualiza el contacto en Brevo, siempre en la lista `alumnos-activos`
 *     (gestión del servicio, no marketing — no depende de `newsletter_optin`),
 *     y además en `BREVO_LIST_ID_NEWSLETTER` si marcó el checkbox de
 *     newsletter — así el opt-in tiene un efecto real en Brevo (antes solo
 *     quedaba como atributo `NEWSLETTER_OPTIN`, sin mover al contacto a
 *     ninguna lista). Te avisa por correo a `ADMIN_EMAILS` con el detalle
 *     del registro (Supabase no avisa de esto por sí solo).
 *
 *   - INSERT en `contactos` (formulario de contacto): SIEMPRE te avisa por
 *     correo a `ADMIN_EMAILS` con el mensaje completo (antes no se avisaba
 *     de nada — el mensaje quedaba solo en la tabla `contactos`, sin que
 *     nadie se enterase salvo consultándola a mano en Supabase). Además, si
 *     marcó `newsletter_optin` (checkbox del formulario, ver
 *     `supabase/migrations/0012_intereses_newsletter.sql`), da de alta el
 *     contacto en Brevo, lista `contacto-leads`. Sin consentimiento, no se
 *     manda nada a Brevo — pero el aviso por correo llega igual.
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

  // Lista de servicio siempre; lista de newsletter solo si dio su consentimiento
  // explícito — así el checkbox tiene un efecto real en Brevo, no solo un
  // atributo informativo. Sin `BREVO_LIST_ID_NEWSLETTER` configurada, se
  // avisa por consola pero no se bloquea el alta del alumno.
  const listIds = [Number(listId)];
  const listIdNewsletter = process.env.BREVO_LIST_ID_NEWSLETTER;
  if (newsletterOptin) {
    if (listIdNewsletter) listIds.push(Number(listIdNewsletter));
    else console.error("❌ brevo-nuevo-alumno: falta BREVO_LIST_ID_NEWSLETTER (opt-in de newsletter no aplicado).");
  }

  // Log explícito de lo que se manda, tenga o no éxito: es lo único que
  // permite diagnosticar "el opt-in no hace nada en Brevo" desde los logs
  // de Vercel sin adivinar — comprueba aquí si `newsletterOptin` llegó en
  // `true` y si el id de la lista es el que esperas.
  console.log(`brevo-nuevo-alumno: alta de ${email} — newsletterOptin=${newsletterOptin}, listIds=[${listIds.join(", ")}]`);

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
      listIds,
      updateEnabled: true, // si el contacto ya existe (p. ej. era lead de newsletter), lo actualiza en vez de fallar
    }),
  });

  const resBody = await res.text();
  if (!res.ok) {
    console.error(`❌ brevo-nuevo-alumno: Brevo respondió ${res.status}: ${resBody}`);
    return NextResponse.json({ error: "brevo error" }, { status: 502 });
  }
  console.log(`brevo-nuevo-alumno: Brevo respondió ${res.status} para ${email}: ${resBody}`);

  // Aviso al admin: best-effort, no debe tumbar la respuesta si falla (el
  // alta en Brevo, que es lo importante, ya se ha completado arriba). Con
  // el detalle completo del formulario, no solo nombre y correo.
  await avisarAdmin(apiKey, { email, nombre, oposicionInteres, interesTodas, newsletterOptin });

  return NextResponse.json({ ok: true });
}

async function manejarNuevoContacto(record: Record<string, unknown>, apiKey: string) {
  const email = record.email as string | null;
  if (!email) return NextResponse.json({ skipped: true });

  const nombre = record.nombre as string | null;
  const newsletterOptin = Boolean(record.newsletter_optin);

  // Log explícito SIEMPRE (aunque sea false): confirma si el checkbox llegó
  // marcado desde el formulario antes de intentar nada con Brevo — sin
  // esto, "no hace nada" no se distingue de "nunca llegó marcado".
  console.log(`brevo-nuevo-alumno (contacto): mensaje de ${email} — newsletterOptin=${newsletterOptin}`);

  // Alta en Brevo solo con consentimiento explícito — el formulario de
  // contacto en sí no da base legal para marketing (ver migración 0012).
  // Un fallo aquí no debe impedir el aviso al admin de abajo, que es lo
  // importante: es el único sitio donde se ve el mensaje.
  if (newsletterOptin) {
    const listId = process.env.BREVO_LIST_ID_CONTACTO_LEADS;
    if (!listId) {
      console.error("❌ brevo-nuevo-alumno: falta BREVO_LIST_ID_CONTACTO_LEADS.");
    } else {
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
      const resBody = await res.text();
      if (!res.ok) {
        console.error(`❌ brevo-nuevo-alumno (contacto): Brevo respondió ${res.status}: ${resBody}`);
      } else {
        console.log(`brevo-nuevo-alumno (contacto): Brevo respondió ${res.status} para ${email} en lista ${listId}: ${resBody}`);
      }
    }
  }

  // Aviso al admin: SIEMPRE, tenga o no consentimiento de newsletter (son
  // cosas distintas) — antes no existía este aviso y el mensaje solo
  // quedaba guardado en la tabla `contactos`, sin que nadie se enterase.
  await avisarAdminContacto(apiKey, {
    nombre,
    email,
    oposicionSlug: record.oposicion_slug as string | null,
    tipo: (record.tipo as string | null) ?? "otro",
    mensaje: (record.mensaje as string | null) ?? "",
    referencia: record.referencia as string | null,
  });

  return NextResponse.json({ ok: true });
}

async function avisarAdmin(
  apiKey: string,
  datos: {
    email: string;
    nombre: string | null;
    oposicionInteres: string | null;
    interesTodas: boolean;
    newsletterOptin: boolean;
  }
) {
  const destinatarios = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (destinatarios.length === 0) return;

  const { email, nombre, oposicionInteres, interesTodas, newsletterOptin } = datos;
  const interesLabel = interesTodas ? "Todas las oposiciones" : (oposicionInteres ?? "(no indicado)");

  try {
    const res = await fetch(BREVO_EMAIL_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        sender: REMITENTE_AVISOS,
        to: destinatarios.map((email) => ({ email })),
        subject: `Nuevo registro: ${nombre ?? email}`,
        htmlContent: `<p>Se acaba de registrar un nuevo usuario en oposicioneszaragoza.es:</p>
          <ul>
            <li><strong>Nombre:</strong> ${nombre ?? "(sin nombre)"}</li>
            <li><strong>Correo:</strong> ${email}</li>
            <li><strong>Oposición de interés:</strong> ${interesLabel}</li>
            <li><strong>Newsletter:</strong> ${newsletterOptin ? "Sí" : "No"}</li>
          </ul>`,
      }),
    });
    if (!res.ok) {
      console.error(`❌ brevo-nuevo-alumno: aviso admin falló ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("❌ brevo-nuevo-alumno: aviso admin lanzó una excepción", err);
  }
}

// Duplica a propósito las etiquetas de `TIPOS_CONTACTO` en `lib/contacto.ts`
// (que es código de cliente) en vez de importarlas, para no acoplar esta
// ruta de servidor a ese módulo — ver el resto de motivos en
// `src/lib/contacto.ts`.
const TIPO_CONTACTO_LABELS: Record<string, string> = {
  duda: "Duda",
  error_contenido: "Error en una pregunta o caso práctico",
  fallo_web: "Fallo técnico en la web",
  colaboraciones: "Colaboraciones",
  otro: "Otro",
};

async function avisarAdminContacto(
  apiKey: string,
  datos: {
    nombre: string | null;
    email: string;
    oposicionSlug: string | null;
    tipo: string;
    mensaje: string;
    referencia: string | null;
  }
) {
  const destinatarios = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (destinatarios.length === 0) return;

  const { nombre, email, oposicionSlug, tipo, mensaje, referencia } = datos;
  const motivo = TIPO_CONTACTO_LABELS[tipo] ?? tipo;

  try {
    const res = await fetch(BREVO_EMAIL_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        sender: REMITENTE_AVISOS,
        to: destinatarios.map((email) => ({ email })),
        // Para poder responder directamente desde el buzón al remitente,
        // sin copiar/pegar su correo.
        replyTo: { email, name: nombre ?? undefined },
        subject: `Contacto (${motivo}): ${nombre ?? email}`,
        htmlContent: `<p>Nuevo mensaje desde el formulario de contacto de oposicioneszaragoza.es:</p>
          <ul>
            <li><strong>Nombre:</strong> ${nombre ?? "(sin nombre)"}</li>
            <li><strong>Correo:</strong> ${email}</li>
            <li><strong>Motivo:</strong> ${motivo}</li>
            <li><strong>Oposición relacionada:</strong> ${oposicionSlug ?? "General"}</li>
            ${referencia ? `<li><strong>Referencia:</strong> ${referencia}</li>` : ""}
          </ul>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje.replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!res.ok) {
      console.error(`❌ brevo-nuevo-alumno (aviso contacto): Brevo respondió ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("❌ brevo-nuevo-alumno: aviso de contacto lanzó una excepción", err);
  }
}
