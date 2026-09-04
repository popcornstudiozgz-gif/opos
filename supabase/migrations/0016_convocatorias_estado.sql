-- ════════════════════════════════════════════════════════════════════════
-- 0016_convocatorias_estado.sql · Estado real de cada convocatoria
--
-- Hasta ahora `convocatorias.plazo_instancias` es texto libre ("20 días
-- naturales a partir de..."), sin forma de saber en el propio dato si el
-- plazo sigue abierto sin leer y calcular a mano cada fila. La home va a
-- destacar las convocatorias con el plazo de instancias abierto ahora
-- mismo — para eso hace falta un campo explícito, no una fecha calculada
-- (las fechas de publicación en el BOE, de las que depende el cierre real
-- del plazo, no siempre están en la propia base de datos).
--
-- `estado` se fija a mano en cada script de convocatoria (igual que el
-- resto de campos de esta tabla), con tres valores posibles:
--   - 'abierta': plazo de instancias abierto ahora mismo, se puede
--     presentar instancia.
--   - 'cerrada': proceso ya en marcha o resuelto, plazo ya cerrado. Es el
--     valor por defecto porque, a fecha de esta migración, ninguna de las
--     convocatorias ya sembradas tiene el plazo abierto (todas son la
--     CONV 4/2026 del Ayuntamiento, con decreto de julio de 2026 y 20
--     días desde su publicación en el BOE, ya transcurridos).
--   - 'pendiente_publicacion': la plaza está prevista en la oferta de
--     empleo público pero sus bases específicas todavía no se han
--     publicado (caso de Oficial Fontanero).
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

alter table convocatorias
  add column estado text not null default 'cerrada'
  check (estado in ('abierta', 'cerrada', 'pendiente_publicacion'));

update convocatorias set estado = 'pendiente_publicacion'
  where oposicion_slug = 'oficial-fontanero-ayto-zaragoza';
