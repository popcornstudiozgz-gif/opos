-- ════════════════════════════════════════════════════════════════════════
-- 0013_contactos_motivo_colaboraciones.sql
--
-- Añade "colaboraciones" como motivo válido del formulario de contacto
-- (propuestas de colaboración, patrocinio, intercambio de contenido...),
-- junto a los ya existentes ('duda', 'error_contenido', 'fallo_web', 'otro')
-- definidos en 0006_contactos.sql.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

alter table contactos drop constraint contactos_tipo_check;
alter table contactos add constraint contactos_tipo_check
  check (tipo in ('duda', 'error_contenido', 'fallo_web', 'colaboraciones', 'otro'));
