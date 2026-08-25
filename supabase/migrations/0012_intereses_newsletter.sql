-- ════════════════════════════════════════════════════════════════════════
-- 0012_intereses_newsletter.sql
--
-- Dos cosas independientes que comparten migración por venir juntas:
--
-- 1. Interés declarado al registrarse: qué oposición le interesa a un
--    alumno, o si quiere acceso a todas. Es solo informativo por ahora —
--    no hay todavía control de acceso por oposición ni por plan de pago
--    (ver conversación), así que no restringe nada, solo alimenta el
--    atributo `OPOSICIONES` que se manda a Brevo desde
--    `src/app/api/webhooks/brevo-nuevo-alumno/route.ts`.
--
-- 2. Consentimiento de newsletter, tanto al registrarse como al escribir
--    por el formulario de contacto — checkbox explícito y desmarcado por
--    defecto (opt-in real, no una casilla premarcada), para poder mandar
--    comunicaciones de marketing con base legal de consentimiento (RGPD
--    art. 6.1.a). El alta en la lista `alumnos-activos` de Brevo al
--    registrarse NO depende de este campo — eso es gestión del servicio,
--    no marketing —, pero cualquier campaña comercial debe segmentar por
--    `NEWSLETTER_OPTIN = true` en Brevo antes de enviar.
--
-- Ejecutar a mano en el SQL Editor de Supabase (igual que el resto de
-- migraciones de este proyecto).
-- ════════════════════════════════════════════════════════════════════════

-- ── profiles ────────────────────────────────────────────────────────────
alter table profiles add column if not exists oposicion_interes text references oposiciones(slug) on delete set null;
alter table profiles add column if not exists interes_todas_oposiciones boolean not null default false;
alter table profiles add column if not exists newsletter_optin boolean not null default false;

-- `handle_new_user` (0007) pasa a copiar también estos tres campos desde
-- el metadata que manda el formulario de registro en el signUp.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  insert into public.profiles (
    id, nombre, email, oposicion_interes, interes_todas_oposiciones, newsletter_optin
  )
  values (
    new.id,
    new.raw_user_meta_data->>'nombre',
    new.email,
    new.raw_user_meta_data->>'oposicion_interes',
    coalesce((new.raw_user_meta_data->>'interes_todas_oposiciones')::boolean, false),
    coalesce((new.raw_user_meta_data->>'newsletter_optin')::boolean, false)
  );
  return new;
end; $$;

-- ── contactos ───────────────────────────────────────────────────────────
alter table contactos add column if not exists newsletter_optin boolean not null default false;
