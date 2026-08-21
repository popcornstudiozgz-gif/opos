-- ─────────────────────────────────────────────────────────
-- Alcance parcial de temas por oposición.
--
-- Un tema (ej. tema-1 = Constitución Española) puede tener flashcards de
-- TODA la norma (biblioteca completa, reutilizable entre oposiciones), pero
-- cada oposición concreta puede necesitar solo una parte de ese tema.
--
-- `flashcards.seccion` etiqueta de qué parte de la norma viene cada card
-- (normalmente el archivo de origen en content-raw/, ej. "titulo-4").
-- `tema_oposicion.secciones_incluidas` (nullable) filtra qué secciones ve
-- esa oposición para ese tema: NULL = todas (comportamiento actual,
-- retrocompatible); con valores = solo esas.
-- ─────────────────────────────────────────────────────────

alter table flashcards
  add column seccion text;

create index on flashcards (tema_slug, seccion);

alter table tema_oposicion
  add column secciones_incluidas text[];

comment on column flashcards.seccion is
  'Parte de la norma de origen (ej. "titulo-4", "titulo-8-cap-2"). NULL si el tema no se subdivide en secciones.';
comment on column tema_oposicion.secciones_incluidas is
  'Si es NULL, esta oposición ve todas las flashcards/secciones del tema. Si tiene valores, solo ve las flashcards cuya columna "seccion" esté en esta lista.';
