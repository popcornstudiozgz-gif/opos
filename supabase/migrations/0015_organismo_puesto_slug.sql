-- ════════════════════════════════════════════════════════════════════════
-- 0015_organismo_puesto_slug.sql · Segmentos de URL desacoplados de la PK
--
-- Reestructura las URLs de /[oposicion]/... a /[organismo]/[oposicion]/...
-- (p. ej. /ayuntamiento-zaragoza/aux-administrativo/temario) sin tocar
-- `oposiciones.slug`, que sigue siendo la PK interna referenciada por
-- `bloques`, `tema_oposicion`, `convocatorias`, `test_intentos`,
-- `flashcard_progreso` y `tema_progreso` — no hay ningún motivo para
-- renombrarla ni migrar esas 6 tablas.
--
-- Por qué dos columnas nuevas y no reutilizar `slug` como segmento corto:
-- `slug` es única GLOBAL, pero dos oposiciones distintas pueden compartir
-- el mismo puesto bajo organismos distintos — de hecho ya pasa hoy:
-- "Auxiliar Administrativo" existe tanto en el Ayuntamiento de Zaragoza
-- como en la DPZ. El puesto solo es único como PAREJA
-- (organismo_slug, puesto_slug), de ahí el unique compuesto de abajo en
-- vez de uno en cada columna por separado.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

alter table oposiciones
  add column organismo_slug text,
  add column puesto_slug text;

update oposiciones set organismo_slug = 'ayuntamiento-zaragoza', puesto_slug = 'aux-administrativo'
  where slug = 'auxiliar-administrativo-ayto-zaragoza';
update oposiciones set organismo_slug = 'dpz', puesto_slug = 'aux-administrativo'
  where slug = 'auxiliar-administrativo-dpz';

alter table oposiciones
  alter column organismo_slug set not null,
  alter column puesto_slug set not null,
  add constraint oposiciones_organismo_puesto_key unique (organismo_slug, puesto_slug);

create index on oposiciones (organismo_slug);
