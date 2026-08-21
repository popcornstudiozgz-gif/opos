-- ════════════════════════════════════════════════════════════════════════
-- 0005_casos_practicos.sql
--
-- Casos prácticos: un supuesto narrativo (situación ficticia pero
-- jurídicamente coherente) resuelto mediante una secuencia ORDENADA de
-- preguntas tipo test que se apoyan en él. A diferencia del test suelto,
-- las preguntas de un caso no son hechos aislados: se interrogan en el
-- orden en que se plantean en el supuesto y muchas dan por conocida la
-- respuesta a la anterior.
--
-- Reutiliza las tablas `preguntas`/`opciones` ya existentes (0004): un
-- caso práctico NO duplica esquema de preguntas, solo añade una tabla de
-- cabecera (`casos_practicos`, con el `supuesto`) y una tabla puente
-- ordenada (`caso_preguntas`) que enlaza el caso con sus preguntas. Las
-- preguntas de un caso viven en `preguntas` igual que las del test suelto,
-- así que en teoría podrían reutilizarse en el test — en la práctica se
-- escriben específicas para el supuesto porque dan por hecho su contexto
-- ("la funcionaria del Ayuntamiento de Zamora del enunciado...").
--
-- `casos_practicos` cuelga del tema canónico (`tema_slug`), igual que
-- `flashcards`/`glosario`/`preguntas`. A diferencia de esas tres tablas,
-- NO se recorta por `tema_oposicion.secciones_incluidas`: un caso mezcla
-- a propósito varias secciones de un tema para plantear un supuesto
-- realista, y recortarlo a medias rompería su coherencia narrativa
-- (decisión acordada con el usuario). Se muestra completo si el tema está
-- asignado a la oposición, o no se muestra.
--
-- Sin `caso_intentos` todavía, por el mismo motivo que `preguntas`: la app
-- no tiene login, la corrección es en cliente.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

create table if not exists casos_practicos (
  id          uuid primary key default gen_random_uuid(),
  tema_slug   text not null references temas(slug) on delete cascade,
  slug        text not null unique,
  titulo      text not null,
  supuesto    text not null,
  orden       int not null default 0,
  created_at  timestamptz not null default now()
);
create index on casos_practicos (tema_slug);

create table if not exists caso_preguntas (
  caso_id     uuid not null references casos_practicos(id) on delete cascade,
  pregunta_id uuid not null references preguntas(id) on delete cascade,
  orden       int not null default 0,
  primary key (caso_id, pregunta_id)
);
create index on caso_preguntas (caso_id);

alter table casos_practicos enable row level security;
create policy "casos_practicos: lectura pública" on casos_practicos for select using (true);

alter table caso_preguntas enable row level security;
create policy "caso_preguntas: lectura pública" on caso_preguntas for select using (true);

grant select on public.casos_practicos, public.caso_preguntas to anon, authenticated;
grant all on public.casos_practicos, public.caso_preguntas to service_role;
