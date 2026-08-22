# content-raw — zona de entrada de material (NO es contenido final)

Aquí es donde dejas el material en bruto (leyes, apuntes, temario oficial en PDF...)
para que yo lo lea y genere flashcards/glosario/test/casos prácticos a partir de él.
Esta carpeta no la lee la web — es solo mi "bandeja de entrada".

Este archivo también sirve de referencia rápida del resto del proyecto: cómo está
montado, dónde vive cada cosa y qué conviene tener en cuenta antes de tocarlo. Si algo
de aquí queda desactualizado, dímelo y lo corrijo — es más útil que quede mal un rato a
que nadie lo actualice nunca.

## Convención de la carpeta

Un subdirectorio por **norma/documento fuente** (no por tema-slug), y dentro un archivo
por capítulo/título/sección:

```
content-raw/
  constitucion-espanola/
    titulo-preliminar.md
    titulo-1-cap-1-espanoles-y-extranjeros.md
    titulo-8-cap-3-comunidades-autonomas.md
  ley-39-2015-procedimiento-administrativo/
    titulo-1-cap-1-capacidad-de-obrar-y-concepto-de-interesado.md
    titulo-4-cap-2-iniciacion-del-procedimiento.md
  estatuto-aragon/
    titulo-preliminar.md
    titulo-2-cap-1-cortes-de-aragon.md
```

**Por qué así y no por tema-slug**: un tema-slug (`tema-3`, `tema-7`...) es una unidad
artificial que decido yo al montar el temario de UNA oposición concreta. Una ley no
cambia, pero cómo se reparte en "temas" sí varía de una oposición a otra (una puede
juntar dos títulos en un tema y otra separarlos en dos, o un tema puede combinar
fragmentos de varias leyes distintas — como `tema-2`, que mezcla LOIEMH + Ley 4/2007 de
Aragón + el Plan de Igualdad de Zaragoza). Organizando por norma y capítulo, cuando
proceso el material soy yo quien decide cómo mapearlo a temas canónicos — ver más abajo
"El modelo de datos".

Si al pedirme algo el tema resultante todavía no existe como tema canónico, no pasa
nada: dímelo (o indícame de qué ley/capítulo se trata y para qué oposición) y lo doy de
alta yo mismo como parte del mismo encargo, directamente en Supabase (ver siguiente
sección — ya no hay un fichero `asignaciones.ts` ni `temario/*.ts` locales, todo vive en
la base de datos).

## Formatos que puedo leer directamente

- **PDF** — el mejor formato, incluso si es un escaneo (lo leo página a página).
- **`.md` / `.txt`** — texto plano o markdown.
- **Imágenes** (`.png`, `.jpg`) — capturas de pantalla, fotos de apuntes, etc.
- **Word (`.docx`)** — no lo puedo abrir directamente: expórtalo a PDF antes, o pega el
  texto directamente en el chat.

Para textos cortos (un artículo de ley, un resumen de dos párrafos) no hace falta ni
subir archivo: pégalo directamente en el chat.

---

## Arquitectura general del proyecto

Next.js (App Router) + Supabase (Postgres con RLS) + Vercel. **No hay datos locales**:
todo el contenido (oposiciones, temario, flashcards, glosario, test, casos prácticos,
convocatorias) vive en Supabase y la web lee de ahí en tiempo de build/petición vía
`src/lib/oposiciones.ts` y `src/lib/supabase/`. Los antiguos `src/data/{oposiciones,
temario}/*.ts` ya no existen; solo queda `src/data/convocatorias.ts`, que sigue siendo
un wrapper de lectura sobre la tabla `convocatorias` (no un almacén de datos).

El esquema vive en `supabase/migrations/*.sql` (se ejecutan a mano en el SQL Editor de
Supabase, no hay migración automática todavía). Cada archivo trae en cabecera el
razonamiento de diseño de esa tabla — merece la pena leerlos antes de añadir una tabla
nueva, para no repetir un patrón ya resuelto de otra forma.

## El modelo de datos: por qué existe `tema_oposicion`

La pieza central del diseño es que **un tema es contenido reutilizable, no pertenece a
ninguna oposición**:

- `oposiciones` — una fila por oposición (`slug` como PK).
- `bloques` — agrupan temas dentro de **una** oposición concreta; NO se comparten entre
  oposiciones (cada oposición tiene sus propios bloques, con sus propios títulos).
- `temas` — **canónicos**: título, descripción, contenido, enlaces BOE. No saben a qué
  oposición pertenecen ni qué número tienen.
- `tema_oposicion` — tabla puente, el corazón del diseño. Por cada `(tema_slug,
  oposicion_slug)` guarda lo que **sí** varía de una oposición a otra para ese mismo
  tema: a qué `bloque_id` pertenece, qué `numero` tiene, `orden`, si es `es_premium`, si
  está `publicado`, y opcionalmente `secciones_incluidas` (recorte parcial, ver abajo).

Esto significa que el mismo tema canónico (`tema-4`, "Los interesados en el
procedimiento") puede ser el Tema 4 en esta oposición y, el día de mañana, el Tema 12 en
otra completamente distinta, con su propio recorte de contenido — sin duplicar nada. Es
el mecanismo de reutilización entre oposiciones futuras: cuando llegue una nueva, la
forma barata de darle temario es **asignar temas canónicos ya existentes** (aunque se
numeren distinto), no crear temas nuevos por sistema.

`convocatorias` es la excepción: es 1:1 con `oposicion_slug` (PK), porque plazas, plazos
y requisitos nunca son reutilizables entre oposiciones.

### Cómo cuelga cada tipo de contenido del tema — y por qué casos prácticos son distintos

`flashcards`, `glosario` y `preguntas` cuelgan de `tema_slug` y se **recortan** por
`tema_oposicion.secciones_incluidas` cuando esa columna tiene valor: si una oposición
solo quiere mostrar parte de un tema (p. ej. porque su convocatoria no exige todo el
articulado), basta con rellenar `secciones_incluidas` con la lista de `seccion` a
incluir, sin tocar el contenido.

`casos_practicos` cuelga también de `tema_slug` (mismo mecanismo de reutilización), pero
a propósito **no se recorta** por `secciones_incluidas` — ver el comentario sobre
`CasoPractico` en `src/lib/types.ts`. Un caso práctico mezcla varias `seccion` de su
tema a propósito, porque un supuesto realista rara vez cabe en un único apartado, y un
caso "a medias" no tiene sentido: se muestra completo si el tema está asignado a la
oposición, o no se muestra en absoluto.

Esto tiene una consecuencia práctica al escribir casos nuevos: **un caso solo puede
mezclar secciones de SU PROPIO tema canónico, nunca de otro**. Si una ley está repartida
en varios temas (como la Ley 39/2015, partida en `tema-4` a `tema-8`, uno por título),
cada caso práctico va con el tema cuyo título/alcance cubre — igual que ya hacen las
flashcards y preguntas sueltas de esos mismos temas. Que `tema-1` (Constitución) o
`tema-3` (Estatuto de Aragón) tengan casos que "abarcan toda la ley" no es una excepción
al criterio: es que, en el temario de esta oposición, esos dos temas *son* la ley
entera (1 tema = 1 norma completa), así que su recorrido natural coincide con el de la
norma. Mantener esta disciplina es lo que permite que, el día que una oposición nueva
asigne solo `tema-4` sin `tema-7`, sus opositores no se encuentren casos prácticos con
contenido de un título que no está en su temario.

## Scripts de seed: convención

Todos en `scripts/`, se ejecutan con `node --env-file=.env.local scripts/nombre.mjs`
(usan la clave `service_role`, que salta RLS).

- `seed.mjs` — el único **idempotente** (upsert por PK/unique, `Prefer:
  resolution=merge-duplicates`): oposiciones, bloques, temas, tema_oposicion,
  convocatorias. Se puede volver a ejecutar sin duplicar nada.
- `seed-flashcards-tema-N.mjs`, `seed-preguntas-tema-N.mjs`,
  `seed-casos-practicos-tema-N.mjs`, `seed-glosario.mjs` — **NO son idempotentes**: cada
  fila se inserta con un `POST` simple, sin `on_conflict`. **Volver a ejecutar uno de
  estos scripts duplica todo su contenido.** Si hay que corregir algo ya sembrado, se
  edita/borra directamente en Supabase (SQL Editor o tabla), no se relanza el script.

Convención de los scripts de `casos_practicos` (y la que sigo yo al escribir uno
nuevo):

- Un archivo por tema: `seed-casos-practicos-tema-N.mjs`.
- Cada caso es un supuesto (`supuesto`, narrativa) + 10 preguntas encadenadas
  (`caso_preguntas`, con `orden`), reutilizando las mismas tablas `preguntas`/`opciones`
  que el test suelto — no duplican esquema.
- Helper `q(seccion, dificultad, enunciado, opciones, explicacion)`: **la primera opción
  del array es siempre la correcta** — el cliente (`CasoRunner.tsx`) baraja el orden al
  mostrarlas, así que el orden de escritura no importa para el usuario final.
- `dificultad` solo admite `'facil' | 'media' | 'dificil'` (`check` constraint en la
  tabla `preguntas`).
- `seccion` debe coincidir con las que ya usan las flashcards/preguntas sueltas de ese
  mismo tema (comprobar con `grep -oE 'q\("[a-z0-9-]+"' scripts/seed-preguntas-tema-N.mjs`
  antes de inventar una nueva), para no fragmentar la taxonomía de un tema en dos
  vocabularios distintos.
- Antes de sembrar contra Supabase de verdad, merece la pena una pasada de validación en
  local (contar preguntas por caso, 4 opciones y exactamente 1 correcta cada una)
  interceptando `fetch` con un stub — evita descubrir un typo ya sembrado y duplicado.

## Cuentas y despliegue: el detalle que rompe los pushes

**GitHub, Vercel y Supabase de este proyecto están creados con `popcornstudiozgz@gmail.com`**,
no con la cuenta personal del usuario. Esto importa en dos sitios:

1. **Autoría de los commits**: el `git config` local de la máquina puede apuntar a otra
   identidad. Hay que forzar `GIT_AUTHOR_NAME`/`GIT_AUTHOR_EMAIL` (y los `COMMITTER_*`
   equivalentes) a `popcornstudiozgz-gif <popcornstudiozgz@gmail.com>` en cada commit de
   contenido/código de este repo, en vez de fiarse del config global.
2. **Credenciales de `git push`**: Windows guarda la sesión de GitHub en el Git
   Credential Manager, y puede estar cacheada para una cuenta distinta. Si `git push`
   falla con `Permission ... denied to <otro-usuario>`, la solución es: abrir el
   "Administrador de credenciales" de Windows → Credenciales de Windows → borrar la
   entrada `git:https://github.com` → volver a intentar el push, que esta vez abrirá el
   navegador pidiendo login y ahí hay que entrar como `popcornstudiozgz-gif`. Una vez
   reautenticado así, los pushes posteriores ya funcionan sin pedir nada más.

El resto del proceso de puesta en producción (crear el repo, el proyecto Supabase, el
proyecto Vercel, variables de entorno, dominio) está en `SETUP.md`, ya completado.

## Flujo de git para cada entrega de contenido

El patrón que sigue todo el historial del repo (visible con `git log --oneline`) es:
rama corta → un commit → merge a `main` con `--no-ff` → borrar la rama → push. Por
ejemplo, para una tanda de casos prácticos de un tema:

```bash
git checkout -b casos-practicos-tema-N-descripcion
git add scripts/seed-casos-practicos-tema-N.mjs
git commit -m "Añadir N casos prácticos del tema N (...)"
git checkout main
git merge --no-ff casos-practicos-tema-N-descripcion -m "Merge: ..."
git branch -d casos-practicos-tema-N-descripcion
git push origin main
```

El seed contra Supabase se ejecuta **antes** del commit (y se verifica con una consulta
de comprobación), para que el commit describa algo que ya está realmente en producción,
no una intención.

## Qué hago yo con el material que subes

1. Leo el material (la norma/capítulo que me indiques).
2. Compruebo si ese contenido ya corresponde a un tema canónico existente (de esta
   oposición o de otra) — si coincide, reutilizo ese tema en vez de crear uno duplicado.
   Si es nuevo, decido junto contigo el tema-slug y lo doy de alta en Supabase (tablas
   `temas` + `tema_oposicion`), normalmente vía `scripts/seed.mjs` o un script puntual.
3. Genero flashcards (pregunta/respuesta), glosario (término/definición), preguntas de
   test y/o casos prácticos fieles al texto fuente, con el mismo estilo que ya existe en
   el resto del temario.
4. Los siembro en Supabase con un script en `scripts/`, verifico con una consulta que
   han llegado, y hago commit + push siguiendo el flujo de arriba.
5. Te digo qué he añadido y cuántas entradas, para que lo revises en la web.

## Estado del temario (foto de este momento — puede quedar desactualizada)

Oposición activa: `auxiliar-administrativo` (Ayuntamiento de Zaragoza), 20 temas en 7
bloques. A fecha de 22 de agosto de 2026, los 20 temas tienen ya casos prácticos: 52
casos / 520 preguntas en total, repartidos según qué tan grande es cada tema (2-4 casos
por tema). El resto del contenido (flashcards, glosario, test suelto) está completo para
los 20 temas desde antes. Si esto ya no cuadra con lo que ves en la web, hazme caso a la
web, no a este párrafo.
