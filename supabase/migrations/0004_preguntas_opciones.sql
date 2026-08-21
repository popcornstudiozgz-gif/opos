-- ════════════════════════════════════════════════════════════════════════
-- 0004_preguntas_opciones.sql
--
-- Test de oposición: preguntas tipo test de opción múltiple, derivadas 1:1
-- de las flashcards existentes (mismo hecho, mismo `seccion`). `preguntas`
-- y `opciones` separadas, como `flashcards`: cuelgan del tema canónico, no
-- de una oposición, y se recortan por oposición reutilizando la MISMA
-- `tema_oposicion.secciones_incluidas` que ya filtra flashcards y glosario
-- — no se toca esa tabla en este script.
--
-- Sin `test_intentos`/`test_respuestas` todavía: la app no tiene login. La
-- corrección es en cliente (como las flashcards), igual que hace la propia
-- página de test del proyecto de referencia. Cuando haya autenticación se
-- puede añadir seguimiento de intentos sin tocar este esquema.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

create table if not exists preguntas (
  id          uuid primary key default gen_random_uuid(),
  tema_slug   text not null references temas(slug) on delete cascade,
  seccion     text,
  enunciado   text not null,
  explicacion text,
  dificultad  text not null default 'media' check (dificultad in ('facil', 'media', 'dificil')),
  created_at  timestamptz not null default now()
);
create index on preguntas (tema_slug, seccion);

create table if not exists opciones (
  id          uuid primary key default gen_random_uuid(),
  pregunta_id uuid not null references preguntas(id) on delete cascade,
  texto       text not null,
  es_correcta boolean not null default false,
  orden       int not null default 0
);
create index on opciones (pregunta_id);

alter table preguntas enable row level security;
create policy "preguntas: lectura pública" on preguntas for select using (true);

alter table opciones enable row level security;
create policy "opciones: lectura pública" on opciones for select using (true);

grant select on public.preguntas, public.opciones to anon, authenticated;
grant all on public.preguntas, public.opciones to service_role;
