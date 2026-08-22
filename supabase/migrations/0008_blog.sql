-- ════════════════════════════════════════════════════════════════════════
-- 0008_blog.sql · Blog / noticias, generales o por oposición
--
-- Mismo patrón de reutilización que el temario (`temas` + `tema_oposicion`
-- en 0001_init.sql): `articulos` es el contenido canónico, y
-- `articulo_oposicion` es la tabla puente que dice a qué oposición(es)
-- afecta. Un artículo SIN filas en la puente es una noticia general (solo
-- sale en /blog); con filas, sale también en /[oposicion]/noticias de cada
-- oposición vinculada — con la MISMA URL /blog/[slug] en todos los casos
-- (nunca se duplica la página).
--
-- Sin políticas de escritura para `authenticated`: todas las escrituras
-- las hace el panel de admin (`/admin/blog`) vía Server Actions que usan
-- `createAdminClient()` (service_role, salta RLS) — no hay un cliente
-- autenticado normal escribiendo aquí, así que no hace falta una tabla de
-- roles (`profiles` no tiene columna de rol — ver 0007). El gate de acceso
-- al panel es a nivel de aplicación (`ADMIN_EMAILS`), no de RLS.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

create table articulos (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  titulo       text not null,
  resumen      text not null,        -- tarjetas de listado + meta description
  contenido    text not null,        -- markdown
  imagen_url   text,
  tipo         text not null default 'noticia' check (tipo in ('noticia', 'articulo')),
  publicado    boolean not null default false,
  publicado_en timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index on articulos (publicado, publicado_en desc);
create trigger set_updated_at before update on articulos
  for each row execute function public.tg_set_updated_at();

create table articulo_oposicion (
  articulo_id    uuid not null references articulos(id) on delete cascade,
  oposicion_slug text not null references oposiciones(slug) on delete cascade,
  primary key (articulo_id, oposicion_slug)
);
create index on articulo_oposicion (oposicion_slug);

-- ─────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────
alter table articulos enable row level security;
create policy "articulos: lectura pública (publicados)" on articulos for select using (publicado);

alter table articulo_oposicion enable row level security;
create policy "articulo_oposicion: lectura pública" on articulo_oposicion for select using (true);

grant select on public.articulos, public.articulo_oposicion to anon, authenticated;
grant all on public.articulos, public.articulo_oposicion to service_role;
