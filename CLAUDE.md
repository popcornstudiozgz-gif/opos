# oposicioneszaragoza.es — guía de contexto para trabajar en este repo

Plataforma web multi-oposición (temario, flashcards, tests, casos prácticos,
simulacros, fichas de convocatoria) para oposiciones de Zaragoza y Aragón.
Next.js 16 (Turbopack) + Supabase (Postgres + Auth) + Vercel. El propietario
del proyecto (dariomarinanson@gmail.com) es no técnico: explica las cosas en
términos de qué se ve en la web, no de código, salvo que pida detalle.

Este documento es el mapa del proyecto para retomar trabajo sin tener que
releer todo el histórico de conversaciones. Actualízalo cuando cambie algo
estructural (nueva tabla, nueva convención, nuevo hito de contenido
completado) — es más barato mantenerlo al día que reconstruirlo de cero.

## Comandos básicos

```
npm run dev        # servidor de desarrollo — escucha en 127.0.0.1:3000, NO "localhost"
npm run build       # build de producción
npm run typecheck   # tsc --noEmit
npm run lint
npm run test         # vitest run (tests unitarios: src/lib/*.test.ts)
node --env-file=.env.local scripts/<script>.mjs   # ejecutar un seed
```

`npm run dev` usa Next 16 + Turbopack y se vincula explícitamente a
`127.0.0.1` (ver `package.json`); un `curl http://localhost:3000/...` falla
aunque el servidor esté corriendo — usa siempre `127.0.0.1`.

Despliegue: cada `git push` a `main` despliega solo en Vercel (ver
`SETUP.md` para el proceso completo de infraestructura, ya hecho una vez).

## El modelo de datos: contenido canónico reutilizable entre oposiciones

Esta es la decisión de diseño que más determina cómo se trabaja en este
proyecto. Documentado con detalle en los comentarios de
`supabase/migrations/0001_init.sql` y siguientes — merece la pena leer esos
comentarios directamente si algo aquí no cuadra.

- **`temas`** (PK = `slug`, texto tipo `tema-1`, `tema-45`...) es contenido
  **canónico**: no pertenece a ninguna oposición. Un tema legal (p. ej.
  `tema-1` = Constitución Española) se escribe **una sola vez** y se
  reutiliza en todas las oposiciones que lo necesiten.
- **`oposiciones`** (PK = `slug` interno, p. ej.
  `oficial-albanil-ayto-zaragoza`) NO contiene temas directamente. Columnas
  `organismo_slug` + `puesto_slug` (con `unique` compuesto) son los
  segmentos de la URL pública (`/[organismo]/[oposicion]/...`) y son
  **independientes** del `slug` interno — no lo renombres nunca, es la FK
  que usan `bloques`, `tema_oposicion`, `convocatorias` y las tablas de
  progreso de usuario. No hay tabla `organismos`: el nombre del organismo
  es un atributo de texto repetido en cada fila de `oposiciones` (ver
  comentario en `src/lib/oposiciones.ts` línea ~134).
- **`bloques`** agrupan temas dentro de **una** oposición concreta (p. ej.
  "Parte común" / "Parte específica"); no se comparten entre oposiciones.
- **`tema_oposicion`** es la tabla puente — el corazón del diseño. Liga un
  `tema_slug` canónico a una `oposicion_slug`, con `bloque_id`, `numero`
  (posición en el examen de esa oposición), `orden`, `es_premium`,
  `publicado` y `secciones_incluidas text[]` (nullable).
  - `secciones_incluidas = NULL` → esa oposición ve el tema completo.
  - `secciones_incluidas = ['titulo-preliminar', 'titulo-1-cap-1']` → esa
    oposición solo ve esas secciones del tema (crop parcial). Es lo que
    permite que un tema legal completo (p. ej. la LPACAP entera) se recorte
    distinto para cada oposición sin duplicar contenido.
- **`flashcards`**, **`preguntas`** (+ `opciones`), **`glosario`**,
  **`casos_practicos`** (+ `caso_preguntas`) cuelgan del **`tema_slug`
  canónico**, no de la oposición. Todas menos `casos_practicos` llevan una
  columna `seccion` (texto libre, p. ej. `titulo-preliminar`,
  `conglomerantes-aridos-morteros`) que se cruza con
  `tema_oposicion.secciones_incluidas` para el recorte. `casos_practicos`
  **no se recorta** por sección (decisión deliberada: un caso práctico
  mezcla secciones a propósito y recortarlo rompería su coherencia
  narrativa) — se muestra completo o no se muestra.
  - `preguntas` NO lleva las opciones de respuesta: viven en `opciones`
    (`pregunta_id`, `texto`, `es_correcta`, `orden`).
  - `preguntas.dificultad` tiene un CHECK: solo `'facil' | 'media' |
    'dificil'`.
- **`temas.indice_estudio`** (jsonb, default `[]`) es el índice de estudio
  del tema: array de `{ seccion, titulo, articulos?, url }`, con enlace
  directo al artículo exacto del BOE cuando existe ancla (`#a159` = art.
  159). Para temas técnicos sin ley única, `url: ""` es válido (ver
  ejemplo en cualquier `seed-tema-4N-*.mjs` de Oficial Albañil).
- **`convocatorias`** es **1:1 por `oposicion_slug`** — a diferencia de todo
  lo anterior, **no es reutilizable** entre oposiciones aunque compartan
  puesto. El contrato TypeScript exacto (`Convocatoria`,
  `mapConvocatoria()`) está en `src/data/convocatorias.ts`.
- Progreso de usuario (`profiles`, `test_intentos`, `flashcard_progreso`,
  `tema_progreso`, etc. — `supabase/migrations/0007_usuarios_progreso.sql`)
  se guarda **por `oposicion_slug`**, no por tema: si dos oposiciones
  comparten un tema canónico, el progreso de un alumno en cada una es
  independiente.
- RLS: todo lo de contenido es lectura pública para `anon`/`authenticated`
  (`for select using (true)`, o `using (activa)`/`using (publicado)` según
  tabla). Las escrituras de contenido se hacen **solo** con
  `SUPABASE_SERVICE_ROLE_KEY` desde scripts (`service_role` salta RLS) —
  nunca con la clave `anon`.

La capa de acceso a datos de la app vive en `src/lib/oposiciones.ts` (todas
las `getXxxDeOposicion`/`getXxxDeTema`) — es el sitio para ver exactamente
qué consulta hace cada página antes de asumir la forma de una tabla.

## Convención de scripts de seed (`scripts/*.mjs`)

Hay ~150 scripts, uno por unidad lógica de trabajo (un tema nuevo, una
convocatoria, una corrección puntual). Patrón que siguen casi todos (mira
cualquier `scripts/seed-tema-*.mjs` reciente como plantilla exacta):

```js
// node --env-file=.env.local scripts/seed-tema-NN-slug.mjs
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

// insertar(): POST simple, Prefer: return=representation
// upsert(): POST con Prefer: resolution=merge-duplicates,return=representation
//           + `?on_conflict=<columnas>` en la URL — para tema_oposicion,
//           convocatorias, etc. donde puede haber reejecución
// insertarPreguntasConOpciones(seccion, preguntas): separa opciones+correcta
//           del resto de la pregunta, inserta en `preguntas`, luego
//           flat-mapea las opciones de cada una a `opciones`
```

Nomenclatura: `seed-tema-<slug>-<descriptor>.mjs` para temas nuevos,
`seed-convocatoria-<oposicion>.mjs` para fichas de convocatoria,
`seed-<oposicion>-parte-comun.mjs` para scripts que reutilizan temas
canónicos existentes en varias oposiciones a la vez (datadriven, un array
`PUESTOS` + un array `TEMAS_PARTE_COMUN`). `fix-*.mjs` para correcciones
puntuales sobre datos ya sembrados.

Fuentes de texto legal/técnico:
- `content-raw/<norma>/` — textos legales curados a mano en markdown,
  organizados por norma (usados por scripts de seed más antiguos,
  principalmente temas de Auxiliar Administrativo). Sí se versiona en git.
- `scripts/tmp-fuentes/` — caché de descargas en bruto (PDF/HTML/TXT de
  BOE, CTE, etc.) generada durante el sourcing de los 16 temas de la parte
  específica de Oficial Albañil en esta sesión. **No está en
  `.gitignore` pero tampoco se ha añadido nunca a git** (queda fuera de los
  `git add` selectivos que se hacen por script) — es desechable y
  regenerable; se puede seguir usando como caché de fuentes ya verificadas
  o borrar sin pérdida real. Si se vuelve a necesitar (p. ej. para hacer la
  parte específica de las 14 "Oficial X" restantes, que comparten normativa
  de seguridad con Oficial Albañil), ya contiene texto íntegro de: RD
  1212/2009 (certificados EOCB0108), RD 1627/1997 (seguridad en obras), RD
  396/2006 (amianto), RD 773/1997 (EPI), CTE DB-HS completo.

## Flujo de trabajo git (repetido en cada tarea de contenido)

```
git checkout -b <rama-descriptiva>
git add <ficheros concretos>          # nunca `git add .` a ciegas
git commit -m "<mensaje detallado>"   # ver convención de mensaje abajo
git checkout main
git merge --no-ff <rama> -m "Merge: <resumen>"
git push origin main
git branch -d <rama>
```

Mensaje de commit para contenido nuevo: qué tema/pieza es y a qué tema
oficial del temario corresponde, fuente primaria citada con su identificador
verificado (BOE-A-YYYY-NNNNN, artículo/apartado exacto si aplica), qué se
verificó en la sesión (texto leído íntegro vs. resumen), y cualquier laguna
señalada explícitamente (documento interno no público, etc.). El propio
histórico de `git log` de este repo es el mejor banco de ejemplos.

## Estándar de sourcing — la regla no negociable del proyecto

Todo hecho legal o técnico debe venir de una fuente primaria verificable
(BOE, CTE, normativa autonómica/municipal publicada). Nunca inventar un
artículo, una cifra, o un identificador BOE-A-... sin haberlo verificado
(vía `WebSearch`/`WebFetch`, o leyendo el texto descargado). Si el temario
oficial de una oposición cita un documento **interno** de una Administración
que no está publicado (ha pasado dos veces con Ayuntamiento de Zaragoza:
`PPRL-1606` "ejecución de zanjas" en el tema de excavaciones, `PPRL-1602`
"trabajos con amianto" en el tema de seguridad; también un "pliego de
prescripciones técnicas del Ayuntamiento de Zaragoza" no localizado en el
tema de cimentaciones) — **nunca fabricar su contenido**. El patrón
seguido, y que hay que repetir si aparece un caso nuevo: dedicar una
sección/parte del tema a señalar explícitamente que el documento existe, que
lo cita el temario oficial, que no está publicado y no se ha podido
verificar, y qué marco legal general (norma pública equivalente) debería
respetar como mínimo — con preguntas/flashcards que evalúan precisamente
ese hecho (que el candidato sepa que existe y no es público), no contenido
inventado en su nombre.

Para contenido técnico consolidado del oficio sin una ley única que lo
regule (p. ej. herramientas de albañil, pavimentación urbana, rellenos y
terraplenes), está bien tratarlo como conocimiento técnico sin forzar una
cita legal — pero decirlo explícitamente en el comentario de cabecera del
script (ver `scripts/seed-tema-49-rellenos-terraplenes.mjs` como ejemplo).

Antes de citar un `BOE-A-YYYY-NNNNN` que no se haya confirmado ya en la
conversación, verifícalo (búsqueda + lectura del título real de la norma) —
un ID inventado que devuelva 200 en `boe.es` no prueba que sea el correcto.

## Estado actual del contenido (referencia rápida — puede quedar desactualizado, comprobar en BD si hay dudas)

18 oposiciones en la base de datos, todas bajo `ayuntamiento-zaragoza`
excepto Auxiliar Administrativo en `dpz` y `gobierno-aragon`:

- **Auxiliar Administrativo** (Ayto. Zaragoza / DPZ / DGA): 20 temas cada
  una, temario + convocatoria completos.
- **Oficial Albañil** (`oficial-albanil-ayto-zaragoza`): **22 temas
  completos** — temas 1-6 son parte común reutilizando temas canónicos ya
  existentes (`tema-1`, `tema-3`, `tema-7`, `tema-42`, `tema-43`,
  `tema-44`); temas 7-22 son la parte específica, **16 temas técnicos
  nuevos** (`tema-45` a `tema-60`), cada uno con 3 secciones, 30
  flashcards y 24 preguntas de test, sourcing verificado. Convocatoria
  (`CONV 4/2026`) creada.
- **Oficial Mantenimiento General** (`oficial-mantenimiento-ayto-zaragoza`):
  **completa** — 22 temas (misma parte común que Oficial Albañil, temas
  1-6, más 16 temas técnicos nuevos de parte específica, `tema-61` a
  `tema-76`: electricidad, fontanería/calefacción, alarmas/ascensores,
  albañilería de mantenimiento, carpintería/cerrajería/persianas,
  audio/imagen/informática, ofimática/fotocopiadoras, organigrama/
  atención al público, documentos administrativos, Albergue/Casa Amparo,
  Centros Cívicos, Centros Escolares, movilidad urbana/escenarios, Juntas
  Municipales/Vecinales, protección de incendios, PRL en mantenimiento) y
  convocatoria (`CONV 4/2026`, sin prueba adicional práctica — a
  diferencia de la mayoría de las otras "Oficial X", su proceso consta
  solo de 2 ejercicios). Segunda oposición "Oficial X", tras Oficial
  Albañil, totalmente terminada.
- **Oficial Polivalente Instalaciones Deportivas**
  (`oficial-instalaciones-deportivas-ayto-zaragoza`): **completa** — 22
  temas (misma parte común, temas 1-6, más 16 temas de parte específica:
  `tema-77` a `tema-91` son 15 temas nuevos —organización del deporte
  municipal, calidad del servicio, ofimática con OpenOffice, electricidad
  en piscinas/REBT ITC-BT-31, fontanería, pintura, calefacción/ACS/
  legionela, limpieza y desinfección, Decreto 50/1993 de piscinas,
  depuración y desinfección del agua, jardinería (riego, césped/arbustos/
  árboles), fitosanitarios, seguridad y gestión de riesgos— más `tema-75`
  reutilizado (protección de incendios, enunciado idéntico al de Oficial
  Mantenimiento General) y convocatoria (`CONV 4/2026`, con prueba
  adicional práctica, a diferencia de Mantenimiento General). Tercera
  oposición "Oficial X" completa.
- **Oficial Agente Inspector** (`oficial-agente-inspector-ayto-zaragoza`):
  **completa** — 22 temas (misma parte común, temas 1-6, más 16 temas de
  parte específica: `tema-92` a `tema-107`, 16 temas nuevos — parques y
  jardines/arbolado, montes y riberas, mobiliario urbano, sanidad
  vegetal/especies invasoras/CITES, PRL en zonas verdes, limpieza
  pública, mantenimiento de vías/Ordenanza del Arbolado Urbano, residuos
  especiales/CTRUZ, sensibilización ambiental, Término Municipal/PGOU/
  bienes patrimoniales, vías pecuarias/caza de Aragón, normativa forestal/
  aguas/ambiental de Aragón, conservación de la naturaleza/Red Natura
  2000/LAESRPE, incendios forestales/PROCINFO, PAC, cartografía) y
  convocatoria (`CONV 4/2026`, sin prueba adicional práctica, como
  Mantenimiento General). De perfil marcadamente distinto a las 3
  anteriores (gestión ambiental/forestal, no oficio manual): ~15 normas
  estatales y aragonesas verificadas en la sesión (vías pecuarias, caza,
  montes, aguas, prevención ambiental, espacios protegidos, especies
  amenazadas, protección civil, PAC), con dos casos de norma derogada
  señalados explícitamente (Ley 30/2002 de Protección Civil de Aragón →
  Ley 4/2024; Ley 5/2002 de Caza de Aragón → Ley 1/2015). Cuarta
  oposición "Oficial X" completa.
- **Las otras 11 "Oficial X"** (carpintero, cementerio, conductor-general,
  conductor-maquinaria-pesada, electricista, guardallaves, herrero,
  mecanico, pintor-general, pintor-grafica, planta-potabilizadora): solo
  tienen la **parte común** (6 temas, igual que las cuatro anteriores).
  El **bloque-2 (parte específica) está vacío** y **no tienen ficha de
  convocatoria** todavía.

Próximo trabajo natural si se retoma: parte específica + convocatoria de
las 11 oposiciones "Oficial X" restantes, siguiendo el mismo patrón
(leer el temario oficial de cada puesto en `scripts/tmp-fuentes/
bases2110.txt` — ya descargado y convertido a texto con `pdftotext
-layout`, contiene el Anexo I completo de las 15 oposiciones "Oficial X",
cada una con su "Parte primera"/"Parte segunda" separadas por su propio
encabezado en mayúsculas — buscar fuente primaria por tema, un script
`seed-tema-NN-*.mjs` por tema). Los datos de plazas ya compilados para las
11 restantes están como comentarios en `scripts/seed-oficial-x-parte-
comun.mjs`. `scripts/seed-tema-92-*.mjs` a `seed-tema-107-*.mjs` (los 16
de Oficial Agente Inspector) son la plantilla de referencia más reciente
del patrón de script + estándar de sourcing — incluida la más exigente en
verificación normativa hecha hasta ahora en el proyecto — y
`scripts/seed-convocatoria-oficial-agente-inspector.mjs` la más reciente
de ficha de convocatoria (sin prueba adicional práctica) —
cada tema nuevo usa `BLOQUE_2_ID` fijo de su oposición (consultarlo una
vez por `oposicion_slug` si no se conoce) y `numero`/`orden` correlativos
empezando en 7; `scripts/seed-oficial-albanil-setup-y-parte-comun.mjs`
muestra el patrón para crear un tema canónico nuevo desde cero, y
`scripts/fix-instalaciones-deportivas-reusa-tema-75-incendios.mjs` el
patrón para reutilizar (sin duplicar) un tema de parte específica ya
creado para otra "Oficial X" cuando el enunciado oficial coincide
literalmente. Cuando el temario oficial de un puesto coincide en el fondo
con un punto ya cubierto por un tema
canónico de otra oposición (p. ej. Juntas Municipales/Vecinales con
tema-15 de Auxiliar Administrativo), valorar reutilizar vía
`secciones_incluidas` solo si el recorte cubre el contenido exacto exigido
(incluidas particularidades como el Alcalde de Barrio) — si no, mejor
contenido nuevo dedicado que forzar un recorte incompleto o tocar un
canónico ya publicado y en uso por otra oposición.

`casos_practicos` es una funcionalidad del esquema (supuestos narrativos con
preguntas encadenadas) que existe y se usa en otras oposiciones pero que
**no se ha usado todavía** en ninguna de las "Oficial X".
