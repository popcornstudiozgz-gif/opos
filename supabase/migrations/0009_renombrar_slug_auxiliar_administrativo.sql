-- ════════════════════════════════════════════════════════════════════════
-- 0009_renombrar_slug_auxiliar_administrativo.sql
--
-- Renombra el slug de la oposición "Auxiliar Administrativo" de
-- `auxiliar-administrativo` a `auxiliar-administrativo-ayto-zaragoza`.
--
-- Motivo: varios organismos de Zaragoza/Aragón convocan puestos con el
-- mismo nombre — ahora mismo hay proceso activo de Auxiliar Administrativo
-- en la Diputación Provincial de Zaragoza (examen 26/09/2026) y lo hubo en
-- la DGA en 2026. Si algún día se añade cualquiera de ellas al catálogo,
-- necesita su propio slug sin ambigüedad — ver el comentario de
-- `Oposicion.slug` en `src/lib/types.ts` para la convención de nombres.
--
-- `oposiciones.slug` no tiene `on update cascade` en ninguna FK, así que
-- no se puede editar en sitio: hay que insertar la fila nueva, mover cada
-- tabla que la referencia, y solo entonces borrar la fila vieja (así
-- ninguna fila hija llega a apuntar a un slug que no existe).
--
-- Ya ejecutado a mano vía REST con la clave service_role (mismo
-- mecanismo que `scripts/seed.mjs`) el 22 de agosto de 2026. Este fichero
-- documenta la operación para el historial y por si hay que repetirla en
-- otro entorno (p. ej. un Supabase de pruebas).
-- ════════════════════════════════════════════════════════════════════════

begin;

-- 1. Fila nueva con el slug definitivo (copia de la vieja).
insert into oposiciones (slug, nombre, organismo, descripcion_corta, descripcion_larga, activa, created_at)
select 'auxiliar-administrativo-ayto-zaragoza', nombre, organismo, descripcion_corta, descripcion_larga, activa, created_at
from oposiciones
where slug = 'auxiliar-administrativo';

-- 2. Todas las tablas que referencian oposiciones.slug, movidas al slug nuevo.
update bloques            set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update tema_oposicion     set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update convocatorias      set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update contactos          set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update test_intentos      set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update flashcard_progreso set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update tema_progreso      set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';
update articulo_oposicion set oposicion_slug = 'auxiliar-administrativo-ayto-zaragoza' where oposicion_slug = 'auxiliar-administrativo';

-- 3. Ahora sí, borrar la fila vieja (ya no la referencia nadie).
delete from oposiciones where slug = 'auxiliar-administrativo';

commit;
