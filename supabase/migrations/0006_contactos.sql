-- ════════════════════════════════════════════════════════════════════════
-- 0006_contactos.sql
--
-- Página de contacto: dudas generales, dudas de una oposición concreta
-- (desplegable opcional), o avisos de errores (pregunta/caso incorrectos,
-- fallo técnico en la web). Un formulario público, sin login.
--
-- A diferencia de las demás tablas (flashcards, preguntas, casos...), aquí
-- el sentido de la RLS se invierte: cualquiera puede ESCRIBIR (insertar un
-- mensaje), pero nadie puede LEER desde el navegador — solo `service_role`
-- ve los mensajes. Si `anon` tuviera permiso de SELECT, cualquier visitante
-- podría listar los correos y mensajes de todo el mundo con la clave
-- pública del sitio.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

create table if not exists contactos (
  id             uuid primary key default gen_random_uuid(),
  nombre         text,
  email          text not null,
  oposicion_slug text references oposiciones(slug) on delete set null,
  tipo           text not null default 'duda' check (tipo in ('duda', 'error_contenido', 'fallo_web', 'otro')),
  mensaje        text not null,
  referencia     text,
  atendido       boolean not null default false,
  created_at     timestamptz not null default now()
);
create index on contactos (created_at desc);

alter table contactos enable row level security;

-- Cualquiera puede enviar un mensaje...
create policy "contactos: cualquiera puede enviar" on contactos for insert with check (true);
-- ...pero nadie puede leerlos, actualizarlos ni borrarlos salvo service_role
-- (sin política de select/update/delete para anon/authenticated).

grant insert on public.contactos to anon, authenticated;
grant all on public.contactos to service_role;
