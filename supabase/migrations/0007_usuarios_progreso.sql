-- ════════════════════════════════════════════════════════════════════════
-- 0007_usuarios_progreso.sql · Cuentas de usuario y progreso de estudio
--
-- Añade Supabase Auth (vía `profiles`, que extiende `auth.users`) y el
-- progreso que cada alumno/a guarda al estudiar: intentos de test/casos/
-- simulacro con su detalle de respuestas, repetición espaciada (SM-2) de
-- flashcards, y temas marcados como completados.
--
-- Diseño clave, distinto del proyecto de referencia de una sola oposición:
-- el contenido (temas/preguntas/flashcards) es canónico y se reutiliza
-- entre oposiciones (ver `tema_oposicion` en 0001_init.sql), pero el
-- PROGRESO se guarda separado por oposición — `oposicion_slug` en las 4
-- tablas de abajo. Si dos oposiciones comparten un tema, un alumno que
-- prepare ambas tiene un progreso independiente en cada una.
--
-- No se porta la RPC `corregir_respuesta` del proyecto de referencia:
-- `opciones.es_correcta` ya viaja al cliente en las consultas actuales de
-- `lib/oposiciones.ts` (getPreguntasDeTema/getPreguntasDeOposicion), así
-- que la corrección ya no es un secreto de servidor — un insert directo
-- en `test_respuestas` con el resultado calculado en cliente no reduce
-- ninguna protección real.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

create type modo_test as enum ('tema', 'aleatorio', 'simulacro', 'caso');

-- ─────────────────────────────────────────────────────────
-- IDENTIDAD · profiles (extiende auth.users)
-- ─────────────────────────────────────────────────────────
create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger set_updated_at before update on profiles
  for each row execute function public.tg_set_updated_at();

-- Alta automática de perfil al registrarse un usuario en Auth
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  insert into public.profiles (id, nombre)
  values (new.id, new.raw_user_meta_data->>'nombre');
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────
-- PROGRESO Y ACTIVIDAD (todo separado por oposicion_slug, ver cabecera)
-- ─────────────────────────────────────────────────────────
create table test_intentos (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references profiles(id) on delete cascade,
  oposicion_slug text not null references oposiciones(slug) on delete cascade,
  modo           modo_test not null,
  tema_slug      text references temas(slug) on delete set null,
  caso_id        uuid references casos_practicos(id) on delete set null,
  total          int not null default 0,
  aciertos       int not null default 0,
  started_at     timestamptz not null default now(),
  finished_at    timestamptz
);
create index on test_intentos (user_id, oposicion_slug, started_at desc);

create table test_respuestas (
  id              uuid primary key default gen_random_uuid(),
  intento_id      uuid not null references test_intentos(id) on delete cascade,
  pregunta_id     uuid not null references preguntas(id) on delete cascade,
  opcion_id       uuid references opciones(id) on delete set null,
  es_correcta     boolean not null default false,
  tiempo_segundos int,
  unique (intento_id, pregunta_id)
);
create index on test_respuestas (intento_id);

-- Repaso espaciado (tipo SM-2) por usuario, oposición y flashcard
create table flashcard_progreso (
  user_id          uuid not null references profiles(id) on delete cascade,
  oposicion_slug   text not null references oposiciones(slug) on delete cascade,
  flashcard_id     uuid not null references flashcards(id) on delete cascade,
  repeticiones     int  not null default 0,
  factor_facilidad numeric(4,2) not null default 2.50,
  intervalo_dias   int  not null default 0,
  proxima_revision date not null default current_date,
  ultima_revision  timestamptz,
  primary key (user_id, oposicion_slug, flashcard_id)
);
create index on flashcard_progreso (user_id, oposicion_slug, proxima_revision);

create table tema_progreso (
  user_id          uuid not null references profiles(id) on delete cascade,
  oposicion_slug   text not null references oposiciones(slug) on delete cascade,
  tema_slug        text not null references temas(slug) on delete cascade,
  completado       boolean not null default false,
  ultima_actividad timestamptz not null default now(),
  primary key (user_id, oposicion_slug, tema_slug)
);

-- ════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════════════════

-- ─── PROFILES ────────────────────────────────────────────
alter table profiles enable row level security;

create policy "perfil: leer el propio" on profiles
  for select using (id = auth.uid());

create policy "perfil: actualizar el propio" on profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- ─── PROGRESO: cada alumno gestiona lo suyo ──
alter table test_intentos enable row level security;
create policy "intentos: el alumno gestiona los suyos" on test_intentos for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

alter table test_respuestas enable row level security;
create policy "respuestas: dueñas del intento" on test_respuestas for all
  using (exists (select 1 from test_intentos t
                 where t.id = intento_id and t.user_id = auth.uid()))
  with check (exists (select 1 from test_intentos t
                      where t.id = intento_id and t.user_id = auth.uid()));

alter table flashcard_progreso enable row level security;
create policy "flashcard_progreso: el propio" on flashcard_progreso for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

alter table tema_progreso enable row level security;
create policy "tema_progreso: el propio" on tema_progreso for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────
-- GRANTS DE ROL
-- ─────────────────────────────────────────────────────────
grant all on
  public.profiles,
  public.test_intentos,
  public.test_respuestas,
  public.flashcard_progreso,
  public.tema_progreso
to authenticated;

grant all on
  public.profiles,
  public.test_intentos,
  public.test_respuestas,
  public.flashcard_progreso,
  public.tema_progreso
to service_role;
