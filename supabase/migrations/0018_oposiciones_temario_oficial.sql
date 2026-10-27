-- ════════════════════════════════════════════════════════════════════════
-- 0018_oposiciones_temario_oficial.sql · Fichas de oposición sin material
--
-- Desde octubre de 2026 se publican primero solo las fichas (página
-- principal + convocatoria) de las oposiciones más demandadas, y el
-- material de estudio (temas, test, flashcards...) se añade después. Una
-- ficha sin temas vinculados en `tema_oposicion` necesita igualmente
-- mostrar el programa oficial: es lo que más se busca ("temario oficial X")
-- y lo que evita que la página quede vacía.
--
-- `temario_oficial` guarda solo los ENUNCIADOS del programa, tal como los
-- publica la convocatoria, agrupados por bloque:
--   [{ "bloque": "Parte general", "temas": [{ "numero": 1, "titulo": "..." }] }]
-- No sustituye a `temas`/`tema_oposicion` (el contenido canónico): cuando
-- se siembre el material, la oposición deja de ser "solo ficha" por tener
-- temas vinculados, y este campo puede quedarse como referencia.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

alter table oposiciones
  add column temario_oficial jsonb not null default '[]'::jsonb;
