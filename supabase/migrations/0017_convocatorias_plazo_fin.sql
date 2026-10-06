-- ════════════════════════════════════════════════════════════════════════
-- 0017_convocatorias_plazo_fin.sql · Cierre automático del plazo
--
-- `estado` (0016) se fija a mano, y nadie se acuerda de volver a ponerlo a
-- 'cerrada' el día que acaba el plazo: la CONV 4/2026 del Ayuntamiento
-- cerró el 5-10-2026 y la home siguió mostrando 16 convocatorias como
-- abiertas. `plazo_fin` es el último día del plazo (inclusive): si una
-- convocatoria 'abierta' tiene `plazo_fin` y ese día ya pasó (hora
-- peninsular), la app la trata como cerrada sin tocar la fila (ver
-- src/lib/plazos.ts). Nullable: sin fecha, manda solo `estado`.
--
-- Al marcar una convocatoria como 'abierta', rellenar SIEMPRE `plazo_fin`.
--
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

alter table convocatorias add column plazo_fin date;

-- CONV 4/2026: BOE-A-2026-19150, plazo del 15-09 al 5-10-2026.
update convocatorias set plazo_fin = '2026-10-05'
  where oposicion_slug in (
    'auxiliar-administrativo-ayto-zaragoza',
    'oficial-mantenimiento-ayto-zaragoza',
    'oficial-instalaciones-deportivas-ayto-zaragoza',
    'oficial-agente-inspector-ayto-zaragoza',
    'oficial-guardallaves-ayto-zaragoza',
    'oficial-albanil-ayto-zaragoza',
    'oficial-herrero-ayto-zaragoza',
    'oficial-electricista-ayto-zaragoza',
    'oficial-mecanico-ayto-zaragoza',
    'oficial-cementerio-ayto-zaragoza',
    'oficial-planta-potabilizadora-ayto-zaragoza',
    'oficial-carpintero-ayto-zaragoza',
    'oficial-conductor-general-ayto-zaragoza',
    'oficial-conductor-maquinaria-pesada-ayto-zaragoza',
    'oficial-pintor-general-ayto-zaragoza',
    'oficial-pintor-grafica-ayto-zaragoza'
  );
