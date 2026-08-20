-- ════════════════════════════════════════════════════════════════════════
-- 0001_init.sql · Esquema base de Kiuti (plataforma multi-oposición)
--
-- Refleja en SQL la arquitectura ya usada en src/data/temario/*.ts:
--   · un TEMA es contenido reutilizable, no pertenece a ninguna oposición.
--   · una OPOSICIÓN no contiene temas directamente: los ASIGNA mediante
--     tema_oposicion (tabla puente), que es donde vive todo lo que puede
--     variar de una oposición a otra para el mismo tema (bloque, número,
--     premium, publicado).
--   · flashcards y glosario cuelgan del tema canónico (tema_slug), así que
--     se comparten automáticamente entre cualquier oposición que asigne
--     ese tema.
--
-- Las claves primarias de oposiciones/bloques/temas son el propio `slug`
-- (texto), no un uuid aparte: así el código y la base de datos hablan el
-- mismo idioma sin una capa de traducción id↔slug.
--
-- No incluye todavía perfiles de usuario, roles ni progreso — eso llega
-- con la fase de autenticación. Por ahora, la escritura de contenido se
-- hace únicamente con la clave `service_role` (que salta RLS), como en
-- los scripts de seed; no hay políticas de escritura para anon/authenticated.
-- ════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────
-- FUNCIÓN GENÉRICA updated_at
-- ─────────────────────────────────────────────────────────
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ─────────────────────────────────────────────────────────
-- OPOSICIONES
-- ─────────────────────────────────────────────────────────
create table oposiciones (
  slug               text primary key,
  nombre             text not null,
  organismo          text not null,
  descripcion_corta  text not null,
  descripcion_larga  text not null,
  activa             boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create trigger set_updated_at before update on oposiciones
  for each row execute function public.tg_set_updated_at();

-- ─────────────────────────────────────────────────────────
-- BLOQUES (agrupan temas dentro de UNA oposición; no se comparten)
-- ─────────────────────────────────────────────────────────
create table bloques (
  id             uuid primary key default gen_random_uuid(),
  oposicion_slug text not null references oposiciones(slug) on delete cascade,
  slug           text not null,
  titulo         text not null,
  descripcion    text,
  orden          int not null default 0,
  unique (oposicion_slug, slug)
);
create index on bloques (oposicion_slug);

-- ─────────────────────────────────────────────────────────
-- TEMAS (canónicos — contenido reutilizable entre oposiciones)
-- ─────────────────────────────────────────────────────────
create table temas (
  slug        text primary key,
  titulo      text not null,
  descripcion text not null,
  contenido   text,
  -- array de { titulo, url, pdf? } — mismo shape que EnlaceLegal en lib/types.ts
  enlaces_boe jsonb not null default '[]',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger set_updated_at before update on temas
  for each row execute function public.tg_set_updated_at();

-- ─────────────────────────────────────────────────────────
-- TEMA_OPOSICION (tabla puente — el corazón del diseño de reutilización)
-- ─────────────────────────────────────────────────────────
create table tema_oposicion (
  tema_slug      text not null references temas(slug) on delete cascade,
  oposicion_slug text not null references oposiciones(slug) on delete cascade,
  bloque_id      uuid not null references bloques(id) on delete restrict,
  numero         int not null,
  orden          int not null,
  es_premium     boolean not null default false,
  publicado      boolean not null default true,
  primary key (tema_slug, oposicion_slug),
  unique (oposicion_slug, numero)
);
create index on tema_oposicion (oposicion_slug);
create index on tema_oposicion (bloque_id);

-- ─────────────────────────────────────────────────────────
-- FLASHCARDS (cuelgan del tema canónico, no de la oposición)
-- ─────────────────────────────────────────────────────────
create table flashcards (
  id         uuid primary key default gen_random_uuid(),
  tema_slug  text not null references temas(slug) on delete cascade,
  anverso    text not null,
  reverso    text not null,
  created_at timestamptz not null default now()
);
create index on flashcards (tema_slug);

-- ─────────────────────────────────────────────────────────
-- GLOSARIO (tema_slug nulo = término general, sin tema asociado)
-- ─────────────────────────────────────────────────────────
create table glosario (
  id         uuid primary key default gen_random_uuid(),
  tema_slug  text references temas(slug) on delete cascade,
  termino    text not null,
  definicion text not null,
  created_at timestamptz not null default now()
);
create index on glosario (tema_slug);

-- ─────────────────────────────────────────────────────────
-- CONVOCATORIAS (una por oposición; NO es reutilizable entre oposiciones)
-- ─────────────────────────────────────────────────────────
create table convocatorias (
  oposicion_slug            text primary key references oposiciones(slug) on delete cascade,
  numero                    text not null,
  organismo                 text not null,
  plaza                     text not null,
  fecha_decreto             text not null,
  sistema_seleccion         text not null,
  requisito_titulacion      text not null,
  plazo_instancias          text not null,
  duracion_maxima_proceso   text not null,
  orden_actuacion           text not null,
  plazas_total              int not null,
  desglose_plazas           jsonb not null default '[]',
  aspirantes_que_pasan_fase jsonb not null default '[]',
  enlaces_oficiales         jsonb not null default '[]',
  ultima_actualizacion      text not null,
  -- array de PruebaExamen — mismo shape que en data/convocatorias.ts
  pruebas                   jsonb not null default '[]'
);

-- ════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- Todo es de lectura pública (es contenido de estudio, no hay premium real
-- todavía). Las escrituras solo las hace `service_role` desde scripts, que
-- salta RLS — por eso no hay políticas de INSERT/UPDATE/DELETE aquí.
-- ════════════════════════════════════════════════════════════════════════

alter table oposiciones enable row level security;
create policy "oposiciones: lectura pública (activas)" on oposiciones
  for select using (activa);

alter table bloques enable row level security;
create policy "bloques: lectura pública" on bloques
  for select using (true);

alter table temas enable row level security;
create policy "temas: lectura pública" on temas
  for select using (true);

alter table tema_oposicion enable row level security;
create policy "tema_oposicion: lectura pública (publicados)" on tema_oposicion
  for select using (publicado);

alter table flashcards enable row level security;
create policy "flashcards: lectura pública" on flashcards
  for select using (true);

alter table glosario enable row level security;
create policy "glosario: lectura pública" on glosario
  for select using (true);

alter table convocatorias enable row level security;
create policy "convocatorias: lectura pública" on convocatorias
  for select using (true);

-- ─────────────────────────────────────────────────────────
-- GRANTS DE ROL (necesarios además de las políticas RLS)
-- ─────────────────────────────────────────────────────────
grant select on
  public.oposiciones,
  public.bloques,
  public.temas,
  public.tema_oposicion,
  public.flashcards,
  public.glosario,
  public.convocatorias
to anon, authenticated;

-- service_role necesita ALL para los scripts de seed/administración.
-- Las políticas RLS siguen activas para anon/authenticated; service_role las salta.
grant all on
  public.oposiciones,
  public.bloques,
  public.temas,
  public.tema_oposicion,
  public.flashcards,
  public.glosario,
  public.convocatorias
to service_role;
