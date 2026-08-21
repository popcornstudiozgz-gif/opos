-- ════════════════════════════════════════════════════════════════════════
-- 0003_glosario_secciones.sql
--
-- Añade a `glosario` la misma columna `seccion` que ya tiene `flashcards`
-- (migración 0002), etiquetando cada término con la sección fina del tema
-- (p. ej. "titulo-preliminar") de la que procede. Con esto, la columna ya
-- existente `tema_oposicion.secciones_incluidas` puede filtrar AMBAS
-- tablas (flashcards y glosario) con el mismo criterio por oposición, sin
-- necesidad de un segundo mecanismo de recorte.
--
-- Ejecutar manualmente en el SQL Editor de Supabase (igual que 0002):
-- este proyecto no tiene acceso DDL vía service_role automatizado.
-- ════════════════════════════════════════════════════════════════════════

alter table glosario add column if not exists seccion text;
create index if not exists glosario_tema_seccion_idx on glosario (tema_slug, seccion);

comment on column glosario.seccion is
  'Sección fina del tema (mismo vocabulario de slugs que flashcards.seccion) para poder recortar el glosario por oposición reutilizando tema_oposicion.secciones_incluidas.';
