-- ════════════════════════════════════════════════════════════════════════
-- 0014_simulacro_desglose.sql
--
-- Un simulacro guarda una única fila en `test_intentos` (modo 'simulacro',
-- ver `persistirSimulacro` en SimulacroRunner.tsx) con `total`/`aciertos`
-- combinando la Parte 1 (test) y la Parte 2 (casos prácticos) — no había
-- forma de reconstruir el desglose por parte ni la nota real del examen
-- (que penaliza fallos, -0,25 puntos, algo que `aciertos/total` no refleja)
-- sin duplicar en el perfil la lógica de puntuación de `SimulacroRunner`.
--
-- Estas columnas guardan ese desglose ya calculado en el momento de
-- terminar el simulacro (una sola fuente de verdad para la fórmula de
-- puntuación). Siempre nulas para el resto de modos ('tema', 'aleatorio',
-- 'caso'), que no tienen partes que desglosar.
--
-- Ejecutar a mano en el SQL Editor de Supabase.
-- ════════════════════════════════════════════════════════════════════════

alter table test_intentos add column if not exists total_test int;
alter table test_intentos add column if not exists aciertos_test int;
alter table test_intentos add column if not exists nota_test numeric(4,2);
alter table test_intentos add column if not exists total_casos int;
alter table test_intentos add column if not exists aciertos_casos int;
alter table test_intentos add column if not exists nota_casos numeric(4,2);
