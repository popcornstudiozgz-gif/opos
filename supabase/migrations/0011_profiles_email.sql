-- ════════════════════════════════════════════════════════════════════════
-- 0011_profiles_email.sql
--
-- Añade `email` a `profiles`, denormalizado desde `auth.users`. Antes solo
-- vivía en `auth.users`, que no es accesible desde un Database Webhook de
-- Supabase (los webhooks solo envían las columnas de la fila que dispara
-- el evento). Lo necesitamos para el sync automático de nuevos alumnos a
-- Brevo (lista `alumnos-activos`, ver `src/app/api/webhooks/brevo-nuevo-
-- alumno/route.ts`): el webhook escucha inserts en `profiles`, y sin este
-- campo no tendría el correo del contacto a dar de alta.
--
-- No sustituye a `auth.users.email` como fuente de verdad (login sigue
-- usando ese) — es solo una copia de lectura cómoda para RLS/webhooks.
-- Si un usuario cambia su email en Auth, `handle_new_user` no lo actualiza
-- (solo corre en el insert inicial); eso es un futuro trigger `on update`
-- si hace falta, no incluido aquí.
--
-- Ejecutar a mano en el SQL Editor de Supabase (igual que el resto de
-- migraciones de este proyecto).
-- ════════════════════════════════════════════════════════════════════════

alter table profiles add column if not exists email text;

-- Backfill de los perfiles que ya existían antes de este campo.
update profiles p
set email = u.email
from auth.users u
where u.id = p.id and p.email is null;

-- `handle_new_user` (0007_usuarios_progreso.sql) pasa a copiar también el
-- email al crear el perfil automático.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  insert into public.profiles (id, nombre, email)
  values (new.id, new.raw_user_meta_data->>'nombre', new.email);
  return new;
end; $$;
