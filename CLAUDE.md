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

**Antes de dejar `enlaces_boe: []`, haz al menos una búsqueda real** para
comprobar que el punto del temario no tiene detrás un reglamento,
ordenanza o manual publicado (municipal, autonómico o estatal) — "es
conocimiento técnico del oficio" debe ser una conclusión tras buscar, no
una asunción por defecto. Auditoría hecha en agosto de 2026 sobre las
primeras 3 oposiciones "Oficial X" nuevas de esa sesión: 9/16, 9/16 y
6/16 temas se dejaron sin ninguna fuente enlazada, frente a 3/16 en
Oficial Albañil (el precedente que fijó el criterio) — varios de esos
huecos sí tenían fuente real (Manual de Atención a la Ciudadanía,
reglamentos de Centros Cívicos/Escolares, IDEAragón) que no se buscó a
fondo. El ratio razonable a mantener es el de Albañil, no el de esa
sesión.

## Casos prácticos y glosario — obligatorios en todo tema nuevo

Cada tema canónico nuevo de la parte específica de una oposición "Oficial
X" debe llevar, además de flashcards y preguntas, **casos prácticos y
glosario**, con la misma densidad que ya usa Auxiliar Administrativo:

- **Casos prácticos** (`casos_practicos` + `caso_preguntas`): 3 supuestos
  narrativos por tema, 10 preguntas cada uno, reutilizando las mismas
  `seccion` ya usadas por las flashcards/preguntas sueltas del tema (para
  que `secciones_incluidas` filtre igual). Patrón de script exacto en
  `scripts/seed-casos-practicos-tema-15.mjs`: la primera opción de cada
  pregunta es siempre la correcta (el cliente baraja el orden al
  mostrarlas).
- **Glosario** (`glosario`): selección curada (no exhaustiva) de términos
  que puedan resultar complejos, con la misma `seccion` que las
  flashcards. Patrón en `scripts/seed-glosario.mjs`.

Hasta agosto de 2026 este patrón NO se había aplicado a ninguna
oposición "Oficial X" (ni siquiera Albañil, la primera) — fue un hueco
heredado, no una decisión deliberada. **Se cerró retroactivamente en
esta misma sesión de agosto 2026 para las 4 oposiciones "Oficial X"
completas hasta entonces (Albañil, Mantenimiento General, Instalaciones
Deportivas y Agente Inspector) — glosario y casos_practicos 100%
completos en las 62 temas de sus 4 partes específicas** (16+16+15+16 —
Instalaciones Deportivas reutiliza tema-75 de Mantenimiento General, no
duplicado). Debe incluirse desde el principio en cualquier tema nuevo a
partir de ahora, en el mismo script de seed del tema (no como tarea
aparte) — el patrón de retrofit ya no aplica salvo que se detecte algún
hueco puntual no descubierto en la auditoría de esta sesión.

Progreso del retrofit (glosario ya está 100% completo en las 4 desde el
principio; lo que se hace tema a tema es casos_practicos, con scripts
`scripts/seed-casos-practicos-tema-NN.mjs` siguiendo el patrón de
`seed-casos-practicos-tema-15.mjs`):
- **Oficial Albañil (tema-45 a tema-60): completo — 16/16 temas.**
- **Oficial Mantenimiento General (tema-61 a tema-76): completo — 16/16
  temas** (tema-75, "Protección contra incendios", es canónico y
  compartido con Instalaciones Deportivas — sembrado una única vez).
- **Oficial Instalaciones Deportivas (tema-77 a tema-91, excluyendo
  tema-75 ya sembrado como parte de Mantenimiento General): completo —
  15/15 temas.**
- Oficial Agente Inspector (tema-92 a tema-107): pendiente, 0/16.

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
- **Oficial Carpintero** (`oficial-carpintero-ayto-zaragoza`): **completa**
  — 22 temas (misma parte común, temas 1-6, más 16 temas de parte
  específica: `tema-108` a `tema-123`, 16 temas nuevos — la madera
  (propiedades, el bosque, tala y defectos de sierra), enfermedades de
  la madera y clasificación del aserrado, secado de la madera,
  pegamentos/colas y plásticos termoestables, maderas compuestas y
  tableros derivados, tratamientos de superficie, banco de carpintero y
  herramientas manuales, máquinas de carpintería, ensambles/uniones de
  esquina/marcos y bastidores, dibujo técnico (UNE 1032/ISO 128),
  mediciones en la construcción y tolerancias, tipos de puertas,
  construcción de ventanas, suelos de madera, tabiques de separación
  ligeros, PRL en carpintería) y convocatoria (`CONV 4/2026`, 2 plazas
  —1 TLO, 1 TLO-D—, con prueba adicional práctica, requiere certificado
  de profesionalidad de la familia Madera, mueble y corcho). De perfil
  de oficio manual con escasa normativa pública específica: la mayoría
  de los 16 temas se sourcean como "conocimiento técnico consolidado
  del oficio sin ley única que lo regule" citando AITIM (Asociación de
  Investigación Técnica de las Industrias de la Madera) como referencia
  técnica del sector — criterio verificado explícitamente mediante
  búsqueda antes de aplicarlo, según exige el estándar de sourcing—,
  con dos excepciones de normativa pública real y verificada: dibujo
  técnico (UNE 1032, adaptación española de la ISO 128) y PRL (Ley
  31/1995, RD 1215/1997, RD 773/1997, y RD 665/1997 modificado por RD
  349/2003 sobre el polvo de madera dura como agente cancerígeno, con
  RD 1299/2006 reconociéndolo como enfermedad profesional). Quinta
  oposición "Oficial X" completa — primera en que la mayoría del
  temario carece de ley única y se resuelve con el criterio de
  "conocimiento técnico del oficio" en vez de sourcing normativo.
- **Oficial Cementerio** (`oficial-cementerio-ayto-zaragoza`): **completa**
  — 22 temas (misma parte común, temas 1-6, más 16 temas de parte
  específica: `tema-124` a `tema-138`, 14 temas nuevos más `tema-52`
  reutilizado — conglomerantes ordinarios/RC-16, morteros, elementos
  constructivos de fábrica (dintel/jamba/solerete), excavaciones
  (entibaciones/pozos/zanjas), innovación de materiales para
  tabiquería (`tema-52`, reutilizado literalmente de Oficial Albañil),
  inspección previa y patologías, recursos materiales y organización
  del trabajo (con equipos específicos de inhumación), PRL con
  agentes biológicos, EPI, trabajos en altura/andamios/escaleras,
  historia del Cementerio de Torrero, Reglamento de Policía Sanitaria
  Mortuoria, Ordenanza municipal de cementerios y Ordenanza fiscal
  nº 19, el Procedimiento PPRL-1605, la instrucción operativa de
  trabajo, y el recurso preventivo) y convocatoria (`CONV 4/2026`, 3
  plazas TLO, con prueba adicional práctica, requiere certificado de
  profesionalidad de la familia Servicios socioculturales y a la
  comunidad — cualificación "actividades funerarias y de
  mantenimiento en cementerios"). De perfil mixto entre albañilería
  tradicional (varios temas comparten sourcing y estructura con
  Oficial Albañil: conglomerantes, morteros, elementos de fábrica,
  excavaciones) y contenido específico de cementerio con normativa
  propia real y verificada (Decreto 2263/1974 del Reglamento de
  Policía Sanitaria Mortuoria, complementado por los Decretos
  aragoneses 15/1987 y 106/1996; Ordenanza Municipal de Cementerios de
  Zaragoza y Ordenanza Fiscal nº 19, verificadas en el portal de
  normativa municipal; RD 664/1997 sobre agentes biológicos,
  especialmente relevante por el riesgo de exhumaciones; art. 32 bis
  de la Ley 31/1995 sobre el recurso preventivo). El Procedimiento
  PPRL-1605 (enterramiento en nichos/capillas/panteones/sepulturas/
  columbarios) sigue el mismo patrón de no fabricación que PPRL-1606 y
  PPRL-1602 de Oficial Albañil: no localizado en ninguna fuente
  pública, tema dedicado explícitamente a señalar ese hecho y
  desarrollar el marco legal supletorio verificable en su lugar.
  Primera "Oficial X" en reutilizar un tema canónico completo de otra
  "Oficial X" fuera del caso ya conocido de tema-75 (aquí, tema-52 de
  Oficial Albañil, por coincidencia literal del enunciado oficial del
  TEMA 9). Sexta oposición "Oficial X" completa.
- **Oficial Electricista** (`oficial-electricista-ayto-zaragoza`):
  **completa** — 22 temas (misma parte común, temas 1-6, más 16 temas
  de parte específica: `tema-139` a `tema-154`, 16 temas nuevos — el
  Reglamento Electrotécnico para Baja Tensión (REBT) y sus ITC-BT,
  conceptos fundamentales de electricidad (magnitudes, ley de Ohm,
  leyes de Kirchhoff, CC/CA), seguridad eléctrica y PRL (RD 614/2001,
  Cinco Reglas de Oro), instalaciones de enlace en edificios, cuadros
  generales de mando y protección, cables y conductores, instalaciones
  interiores en viviendas y locales, locales de características
  especiales, alumbrado e iluminación (luminotecnia, LED), receptores
  y motores de corriente alterna, puesta a tierra, automatismos
  eléctricos cableados, averías y mantenimiento, corrientes débiles y
  telecomunicaciones (ICT, RIPCI), eficiencia energética y factor de
  potencia, e instalaciones solares fotovoltaicas) y convocatoria
  (`CONV 4/2026`, 4 plazas TLO, con prueba adicional práctica, requiere
  certificado de profesionalidad de la familia Electricidad y
  electrónica o Energía y agua). De perfil marcadamente normativo en el
  REBT (Real Decreto 842/2002 y sus 52 Instrucciones Técnicas
  Complementarias, ITC-BT-01 a ITC-BT-52, citadas individualmente según
  el contenido de cada tema) combinado con contenido de electrotecnia
  básica sin ley única (magnitudes eléctricas, motores, automatismos
  cableados — criterio ya verificado con búsqueda previa en cada caso,
  siguiendo el estándar de sourcing del proyecto) y normativa sectorial
  específica verificada para telecomunicaciones (RD 346/2011, ICT),
  protección contra incendios (RD 513/2017, RIPCI), autoconsumo
  fotovoltaico (RD 244/2019) y facturación de energía reactiva (Orden
  ITC/1723/2009). Séptima oposición "Oficial X" completa.
- **Oficial Herrero** (`oficial-herrero-ayto-zaragoza`): **completa** —
  22 temas (misma parte común, temas 1-6, más 16 temas de parte
  específica: `tema-155` a `tema-170`, 16 temas nuevos — metalurgia
  básica, metalografía y tratamientos térmicos, propiedades y ensayos
  de materiales, normalización/tolerancias/escalas, materiales
  normalizados y perfilería metálica, el taller y su maquinaria y
  herramientas, mecanizado manual básico (limado, cincelado, taladrado,
  roscado, remachado, punzonado, chaflanado), dibujo técnico y trazado
  de piezas, soldadura oxiacetilénica y corte de metales, soldadura
  eléctrica (arco manual, MAG/MIG/TIG), calderería (desarrollos y
  triangulación), torneado —tipos de torno y manipulación avanzada,
  repartidos en dos temas—, carpintería metálica, herramientas de
  medición/verificación e inspección de soldaduras, y PRL específica
  del oficio con trabajos en espacios confinados) y convocatoria
  (`CONV 4/2026`, 5 plazas —4 TLO, 1 TLO-D—, con prueba adicional
  práctica, requiere certificado de profesionalidad de la familia
  Fabricación mecánica). De perfil casi enteramente técnico del oficio
  sin ley única que lo regule (metalurgia, soldadura, mecanizado,
  torneado, calderería — mismo criterio que Oficial Carpintero, con
  búsqueda previa verificada en cada caso), con solo dos excepciones de
  normativa pública real: seguridad en equipos de trabajo/maquinaria
  del taller (RD 1215/1997, BOE-A-1997-17824, verificado en esta
  sesión) y PRL específica del oficio (Ley 31/1995, RD 773/1997, RD
  614/2001, ya verificados en otros temas del proyecto). Octava
  oposición "Oficial X" completa — la más rápida de las ocho
  restantes por su perfil mayoritariamente técnico sin apenas
  normativa que verificar, similar a Carpintero.
- **Oficial Mecánico** (`oficial-mecanico-ayto-zaragoza`): **completa**
  — 22 temas (misma parte común, temas 1-6, más 16 temas de parte
  específica: `tema-171` a `tema-186`, 16 temas nuevos — conceptos del
  automóvil y componentes del motor, distribución, engrase/aceites y
  refrigeración, sistemas de alimentación diésel y gasolina (con
  common rail), motor de combustión/ciclo Otto, encendido (convencional
  y electrónico integral DIS), instalación eléctrica del automóvil
  (batería/arranque/carga, circuitos, electrónica embarcada),
  sobrealimentación (turbo y compresor volumétrico), cajas de cambio y
  embragues (manual, automática, doble embrague), dirección (mecánica,
  asistida, geometría), frenos y seguridad pasiva/activa (ABS, ESP,
  airbag), árbol de transmisión/grupo/diferencial, sistema de escape
  (catalizador, FAP), vehículos híbridos y eléctricos (con seguridad de
  alta tensión), climatización (circuito frigorífico y normativa de
  gases fluorados), y PRL específica de oficial mecánico) y
  convocatoria (`CONV 4/2026`, 4 plazas —2 TLO, 2 TLO-D—, con prueba
  adicional práctica, requiere certificado de profesionalidad de
  manipulación de refrigerantes fluorados en vehículos — coincide con
  el propio contenido del tema de climatización). De perfil
  mayoritariamente técnico del automóvil sin ley única que lo regule
  (mismo criterio ya aplicado en Carpintero y Herrero, con búsqueda
  previa verificada en cada caso), con una única excepción real de
  normativa pública: el tema de climatización, cuyos gases
  refrigerantes fluorados están regulados por el Reglamento (UE) nº
  517/2014 y su desarrollo español, el RD 115/2017 (BOE-A-2017-1679,
  verificado en esta sesión), que exige certificación profesional para
  su manipulación — normativa que además coincide literalmente con el
  requisito de titulación de la propia convocatoria (base 2.2.1.4).
  Novena oposición "Oficial X" completa.
- **Oficial Guardallaves** (`oficial-guardallaves-ayto-zaragoza`):
  **completa** — 22 temas (misma parte común, temas 1-6, más 16 temas
  de parte específica: `tema-187` a `tema-202`, 16 temas nuevos — red
  de abastecimiento de Zaragoza (depósitos de Casablanca, Valdespartera,
  Canteras, Leones-Academia/AGM y Ecociudad; arterias principales),
  cartografía del Servicio de Explotación de Redes y SIG (IDEZar), corte
  y restitución del suministro (maniobra técnica + suspensión
  administrativa), conceptos fundamentales de hidráulica (masa, volumen,
  densidad, caudal, velocidad), presión/pérdida de carga/golpe de
  ariete, estructura y materiales de las conducciones (UNE-EN 545,
  UNE-EN ISO 1452, UNE-EN 12201), válvulas (UNE-EN 1074), hidrantes/
  ventosas/desagües/bocas de riego (UNE-EN 14339, UNE-EN 1074-4),
  acometidas domiciliarias, válvulas eléctricas y automatismo,
  detección y localización de averías (método acústico y otros),
  funcionamiento general de la red/escalones de presión/sectorización,
  instalaciones de riego (UNE-EN 12484), contadores de agua y
  caudalímetros (RD 244/2016), cámaras/arquetas/nudo tipo/trampillos
  (UNE-EN 124), y PRL en trabajos de guardallaves — espacios confinados
  y técnicas de rescate) y convocatoria (`CONV 4/2026`, 9 plazas —5 TLO,
  1 TLO-A, 2 TLO-D, 1 TLRDIS—, con prueba adicional práctica, requiere
  certificado de profesionalidad de la familia Energía y agua, o FP de
  las familias Energía y agua/Edificación y obra civil/Instalación y
  mantenimiento). De perfil marcadamente distinto al resto de "Oficial
  X" por tratarse de la primera con normativa municipal específica real
  y verificada como eje central: la Ordenanza Municipal para la
  Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA,
  aprobación definitiva Pleno 28-01-2011, BOPZ 07-02-2011), descargada y
  leída íntegra en esta sesión, cubre acometidas (arts. 14-19), gestión
  de redes (arts. 8-13), suspensión del suministro (arts. 62-64),
  contadores (arts. 48-56) e instalaciones de riego (art. 80, con
  límite de 1.600 m³/ha/año y restricción horaria de riego 11-20h en
  verano) — combinada con varias normas UNE-EN para materiales y
  elementos de la red, y con el Real Decreto 140/2003 de calidad del
  agua de consumo humano. Caso singular de sourcing en el tema de PRL
  (`tema-202`): a diferencia de los PPRL-1602/1605/1606 de otras
  "Oficial X" (documentos internos no localizados públicamente), el
  **PPRL-1601** ("Procedimiento para la realización de Trabajos en
  Espacios Confinados" del Ayuntamiento de Zaragoza, mayo 2020) **sí se
  localizó y se leyó íntegro** en esta sesión, republicado en un portal
  sindical (ayuntamiento.osta.es) — se usó como fuente real citando
  expresamente esa procedencia, en vez de aplicar el patrón de
  no-fabricación reservado a los PPRL no localizados. Décima oposición
  "Oficial X" completa.
- **Oficial Planta Potabilizadora**
  (`oficial-planta-potabilizadora-ayto-zaragoza`): **completa** — 22
  temas (misma parte común, temas 1-6, más 16 temas de parte
  específica: `tema-203` a `tema-218`, 16 temas nuevos — parámetros de
  calidad del agua y normativa sanitaria, desbaste/coagulación/
  floculación, decantación (el decantador Accelator, el mismo modelo
  real de la ETAP de Casablanca), filtración, desinfección por
  cloración, circulación de fluidos y medición de caudal/presión, la
  red de agua potable de Zaragoza, bombas y depósitos, máquinas y
  herramientas, soldadura, redes de distribución eléctrica y REBT,
  motores eléctricos, equipos neumáticos, automatización industrial
  (instrumentación de campo, controladores, SCADA y telecontrol), PRL
  general del Ayuntamiento de Zaragoza, y seguridad en trabajos en
  altura/espacios confinados/eléctricos/con productos químicos) y
  convocatoria (`CONV 4/2026`, 3 plazas TLO, con prueba adicional
  práctica, requiere ESO más certificado de profesionalidad o FP de las
  familias Electricidad y electrónica/Energía y agua/Edificación y obra
  civil). De perfil marcadamente técnico del proceso de potabilización
  combinado con normativa sanitaria y eléctrica real y verificada: RD
  140/2003 (criterios sanitarios de calidad del agua de consumo humano)
  junto con el RD 902/2018 que lo modificó, señalando explícitamente la
  Orden SSI/304/2013 como norma derogada que el temario oficial sigue
  citando (mismo patrón que Ley 30/2002→Ley 4/2024 y Ley 5/2002→Ley
  1/2015 de Agente Inspector); REBT (RD 842/2002) con varias ITC-BT
  citadas en los temas 213 y 214; RD 809/2021 (Reglamento de equipos a
  presión, vigente, sustituye al derogado RD 2060/2008), relevante para
  el calderín de aire comprimido del tema de equipos neumáticos; RD
  656/2017 (almacenamiento de productos químicos) y RD 97/2014
  (transporte de mercancías peligrosas, desarrollo español del ADR)
  para el hipoclorito sódico y demás reactivos. El tema de PRL en
  espacios confinados (`tema-218`) **reutiliza el PPRL-1601** ya
  localizado y verificado en la sesión de Guardallaves (mismo
  procedimiento municipal, aplicable también a los decantadores,
  depósitos y arquetas de una planta potabilizadora), sin necesidad de
  una nueva búsqueda. Undécima oposición "Oficial X" completa.
- **Oficial Conductor, Especialidad Maquinaria Pesada**
  (`oficial-conductor-maquinaria-pesada-ayto-zaragoza`): **completa** —
  22 temas (misma parte común, temas 1-6, más 16 temas de parte
  específica: `tema-219` a `tema-234`, 16 temas nuevos — normativa de
  tráfico y seguridad vial (RDLeg 6/2015, RD 1428/2003, RD 2822/1998),
  PRL en la utilización de maquinaria pesada (protección contra el
  vuelco ROPS/FOPS del RD 1644/2008, zonas muertas, distancia de
  seguridad, cables de acero), señalización de obras (Norma de
  carreteras 8.3-IC y Ordenanza de Accesibilidad de Zaragoza, art. 28,
  para el vallado e iluminación de zanjas), trabajos con excavadora en
  tres partes (pala frontal y cuchara bivalva; taludes/zanjas/frentes
  de excavación con RD 1627/1997; técnicas de excavación, croquis y
  aritmética de obra), trabajos con palas cargadoras, mini-excavadoras,
  motoniveladoras/bulldozer/angledozer, compactadores (con RD 1311/2005
  de vibraciones mecánicas), tipos de excavación y mecánica del suelo
  (con CTE DB SE-C), fuerzas de excavación/centro de gravedad/
  transporte de máquinas (autorizaciones complementarias de circulación
  del RD 1428/2003), mantenimiento de maquinaria, procedimientos de
  operación segura, motores diésel en maquinaria de obras (con el
  Reglamento UE 2016/1628 de emisiones NRMM) y camiones específicos
  para movimiento de tierras (dumper rígido/articulado)— y convocatoria
  (`CONV 4/2026`, 2 plazas TLO, con prueba adicional práctica, requiere
  ESO más permiso de conducción C y E y certificado de aptitud
  profesional CAP). Caso singular de sourcing en la convocatoria: la
  base 2.2.1.12 de `bases2110.pdf`, que fija el requisito de titulación
  de esta especialidad, está literalmente rotulada en el documento
  original como "Oficial Conductor Especialidad Gráfica" (una errata de
  copia y pega de las propias bases municipales, señalada explícitamente
  en el comentario de cabecera de `scripts/seed-convocatoria-oficial-
  conductor-maquinaria-pesada.mjs`) — el contenido sustantivo del
  apartado (permiso C y E + CAP) es el único compatible con un puesto de
  conducción de maquinaria pesada, por lo que se aplicó pese al rótulo
  erróneo. De perfil mayoritariamente técnico-operativo de maquinaria de
  obra pública sin ley única que lo regule (mismo criterio ya aplicado
  en Carpintero, Herrero y Mecánico, con búsqueda previa verificada en
  cada caso), mejorado en varios temas con referencias técnicas públicas
  reales del INSST (NTP 126 "Máquinas para movimiento de tierras" y NTP
  1.114 "Niveladora. Seguridad") en lugar de una simple declaración de
  "conocimiento técnico del oficio", además de normativa real verificada
  para tráfico y seguridad vial, señalización de obras (con la
  Ordenanza de Accesibilidad de Zaragoza, no usada hasta entonces en
  ninguna otra "Oficial X"), vibraciones mecánicas y emisiones de
  motores NRMM. Duodécima oposición "Oficial X" completa.
- **Oficial Pintor, Especialidad General**
  (`oficial-pintor-general-ayto-zaragoza`): **completa** — 22 temas
  (misma parte común, temas 1-6, más 16 temas de parte específica:
  `tema-235` a `tema-250`, 16 temas nuevos — el taller de pintura
  (almacenamiento de productos químicos, RD 656/2017), clases de
  pinturas y sus disolventes (límites de COV del RD 227/2006),
  imprimaciones e impermeabilización, composición y tecnología de la
  pintura (pigmentos, aditivos), cálculo de volumen y rendimiento,
  pintura para pavimentos, componentes del color (sistemas RAL/NCS),
  procesos de trabajo y preparación de superficies, sistemas de pintado
  exteriores/interiores y defectos de aplicación, pintura decorativa y
  aerografía, empapelado, aplicación de los DB HS-1/SUA-1/SI del CTE a
  la pintura, patologías en la edificación afectas a la pintura,
  andamios/PEMP/medios auxiliares (RD 2177/2004), materias primas de
  artes gráficas (vinilos, introductorio) y PRL en obras de
  construcción (líneas de vida) — y convocatoria (`CONV 4/2026`, 1
  plaza TLO, con prueba adicional práctica, requiere certificado de
  profesionalidad de Pintura industrial/decorativa nivel 2). De perfil
  mixto: temas de química/normativa real y verificada (RD 227/2006 COV,
  Reglamento CLP 1272/2008, RD 656/2017 almacenamiento, RD 2177/2004
  trabajos en altura, CTE) combinados con temas de técnica pura del
  oficio sin ley única (color, técnicas decorativas, empapelado),
  siguiendo en estos últimos el mismo criterio ya aplicado en
  Carpintero/Herrero con búsqueda previa verificada en cada caso.
  Primera "Oficial X" en emplear el Manual de Identidad Corporativa del
  Ayuntamiento de Zaragoza y la Ley de Propiedad Intelectual como
  fuentes (preparadas para su especialidad hermana, ver más abajo).
  Decimotercera oposición "Oficial X" completa.
- **Las otras 2 "Oficial X"** (conductor-general, pintor-grafica): solo
  tienen la **parte común** (6 temas, igual que las anteriores). El
  **bloque-2 (parte específica) está vacío** y **no tienen ficha de
  convocatoria** todavía. De estas 2, `oficial-conductor-general` es la
  más laboriosa de completar: su TEMA 20 oficial no es un punto de
  temario convencional, sino un callejero completo de Zaragoza (miles
  de vías listadas en bases2110.pdf), lo que exige un enfoque de
  contenido distinto al resto — dejarla para el final o abordarla con
  un criterio específico para ese tema en particular.
  `oficial-pintor-grafica` es la candidata natural inmediata: comparte
  la parte común y buena parte de la normativa de PRL/andamios ya
  sembrada para Oficial Pintor General, y su perfil (artes gráficas,
  rotulación, software de diseño) es mayoritariamente técnico sin ley
  única, con algunas excepciones reales ya localizadas en esta sesión
  (RD 485/1997 de señalización para el tema de señalética, el Manual de
  Identidad Corporativa del Ayuntamiento de Zaragoza para el tema de
  identidad corporativa, y la Ley de Propiedad Intelectual —RDLeg
  1/1996— para el tema de fuentes tipográficas).

Próximo trabajo natural si se retoma: parte específica + convocatoria de
las 2 oposiciones "Oficial X" restantes, siguiendo el mismo patrón
(leer el temario oficial de cada puesto en `bases2110.pdf` —
`https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2110.pdf`,
verificada de nuevo en la sesión de Guardallaves; conviértase a texto con
`pdftotext -layout` — contiene el Anexo I completo de las 15 oposiciones
"Oficial X", cada una con su "Parte primera"/"Parte segunda" separadas
por su propio encabezado en mayúsculas — buscar fuente primaria por
tema, un script `seed-tema-NN-*.mjs` por tema; el caché local de
descargas de la sesión de Guardallaves no se conservó en el repo, igual
que `scripts/tmp-fuentes/` de sesiones anteriores — es desechable y
regenerable). Los datos de plazas ya compilados para las 4 restantes
están como comentarios en `scripts/seed-oficial-x-parte-comun.mjs`.
`scripts/seed-tema-203-*.mjs` a `seed-tema-218-*.mjs` (los 16 de Oficial
Planta Potabilizadora, con `scripts/verificar-oficial-planta-
potabilizadora.mjs` como script de verificación final de conteos) son
la plantilla de referencia más reciente para un temario de proceso
técnico (potabilización, electromecánica de planta, automatización)
combinado con normativa sanitaria/eléctrica real y verificada por tema
en vez de una única norma general (RD 140/2003+RD 902/2018, REBT,
RD 809/2021, RD 656/2017, RD 97/2014) — incluye también el precedente
de reutilizar sin nueva búsqueda un documento interno ya localizado en
otra "Oficial X" (el PPRL-1601 de Guardallaves, reaplicado tal cual a
tema-218 por tratarse del mismo procedimiento municipal); también
`scripts/seed-glosario-oficial-planta-potabilizadora.mjs` y `scripts/
seed-convocatoria-oficial-planta-potabilizadora.mjs` (con prueba
adicional práctica) completan el patrón. `scripts/seed-tema-187-*.mjs`
a `seed-tema-202-*.mjs` (los 16 de Oficial Guardallaves) siguen siendo
también la plantilla de referencia para un temario con eje central en
una ordenanza municipal real y verificada (OMECGIA) combinada con
normas técnicas UNE-EN por elemento de la red; también `scripts/
seed-glosario-oficial-guardallaves.mjs` y `scripts/
seed-convocatoria-oficial-guardallaves.mjs` (con prueba adicional
práctica) completan ese patrón. `scripts/seed-tema-171-*.mjs` a
`seed-tema-186-*.mjs` (los 16 de Oficial Mecánico) siguen siendo la
plantilla de referencia para un
temario casi enteramente técnico del automóvil sin ley única (motor,
transmisión, frenos, dirección, electricidad del vehículo), mismo
criterio que Carpintero y Herrero pero con una única excepción de
normativa real (gases fluorados de climatización, RD 115/2017) que
además coincide con el requisito de titulación de la propia
convocatoria — la plantilla más rápida de replicar si aparece otro
puesto de perfil técnico similar en vehículos o maquinaria (por ejemplo,
Conductor Maquinaria Pesada). `scripts/seed-glosario-oficial-
mecanico.mjs` y `scripts/seed-convocatoria-oficial-mecanico.mjs` (con
prueba adicional práctica) completan el patrón. `scripts/
seed-tema-155-*.mjs` a `seed-tema-170-*.mjs` (los 16 de Oficial Herrero)
siguen siendo también una referencia válida para un temario casi
enteramente técnico del oficio sin ley única (metalurgia, soldadura,
mecanizado, torneado, calderería, carpintería metálica), con `scripts/
seed-glosario-oficial-herrero.mjs` y `scripts/seed-convocatoria-oficial-
herrero.mjs` (con prueba adicional práctica) completando ese patrón.
`scripts/seed-tema-139-*.mjs` a `seed-tema-154-*.mjs` (los 16 de Oficial
Electricista) siguen siendo la plantilla de referencia para un temario
con sourcing normativo intensivo pero muy fragmentado (cada ITC-BT del
REBT citada individualmente según el punto exacto del tema, en vez de
una única norma general por tema) combinado con varios temas de
electrotecnia básica sin ley única; también `scripts/seed-glosario-
oficial-electricista.mjs` y `scripts/seed-convocatoria-oficial-
electricista.mjs` (con prueba adicional práctica). `scripts/
seed-tema-124-*.mjs` a
`seed-tema-138-*.mjs` (los 16 de Oficial Cementerio, incluido
`fix-cementerio-reusa-tema-52-tabiqueria.mjs` para el tema reutilizado),
con dos patrones a tener presentes: (a) antes de dar por sentado que un
tema nuevo necesita contenido dedicado, comparar su enunciado oficial
palabra por palabra con los de otras "Oficial X" ya completas — puede
ahorrar un tema entero si coincide literalmente (precedente: tema-75 y
tema-52); (b) ante un procedimiento interno tipo "PPRL-NNNN" citado en
solitario como tema completo (no ya como referencia dentro de un tema
más amplio), el patrón de no fabricación se aplica igual pero exige
dedicar de verdad una sección a explicarlo y desarrollar el marco legal
supletorio en el resto del tema, en vez de una simple nota. `scripts/
seed-tema-108-*.mjs` a `seed-tema-123-*.mjs` (Oficial Carpintero) siguen
siendo la referencia para el criterio "conocimiento técnico del oficio
sin ley única" aplicado de forma extensa a la mayoría de un temario, y
`scripts/seed-convocatoria-oficial-cementerio.mjs` la ficha de
convocatoria con prueba adicional práctica; `scripts/
seed-tema-92-*.mjs` a `seed-tema-107-*.mjs` (Oficial Agente Inspector)
siguen siendo la plantilla de referencia para temas con sourcing
normativo intensivo con una única norma por tema (varias normas
estatales/autonómicas por tema, pero no fragmentadas dentro del mismo
tema como en el caso de las ITC-BT de Electricista), y `scripts/
seed-convocatoria-oficial-agente-inspector.mjs` la de una convocatoria
sin prueba adicional práctica —
cada tema nuevo usa `BLOQUE_2_ID` fijo de su oposición (consultarlo una
vez por `oposicion_slug` si no se conoce) y `numero`/`orden` correlativos
empezando en 7; `scripts/seed-oficial-albanil-setup-y-parte-comun.mjs`
muestra el patrón para crear un tema canónico nuevo desde cero, y
`scripts/fix-instalaciones-deportivas-reusa-tema-75-incendios.mjs` y
`scripts/fix-cementerio-reusa-tema-52-tabiqueria.mjs` el patrón para
reutilizar (sin duplicar) un tema de parte específica ya creado para
otra "Oficial X" cuando el enunciado oficial coincide literalmente.
Cuando el temario oficial de un puesto coincide en el fondo
con un punto ya cubierto por un tema
canónico de otra oposición (p. ej. Juntas Municipales/Vecinales con
tema-15 de Auxiliar Administrativo), valorar reutilizar vía
`secciones_incluidas` solo si el recorte cubre el contenido exacto exigido
(incluidas particularidades como el Alcalde de Barrio) — si no, mejor
contenido nuevo dedicado que forzar un recorte incompleto o tocar un
canónico ya publicado y en uso por otra oposición.

`casos_practicos` es una funcionalidad del esquema (supuestos narrativos con
preguntas encadenadas) que existe y se usa en Auxiliar Administrativo; el
retrofit para las 4 primeras "Oficial X" completas (Albañil, Mantenimiento
General, Instalaciones Deportivas, Agente Inspector) se terminó en la
sesión de agosto 2026 anterior a esta (ver nota en la sección "Casos
prácticos y glosario" más arriba). Oficial Carpintero, Oficial Cementerio,
Oficial Electricista, Oficial Herrero, Oficial Mecánico, Oficial
Guardallaves, Oficial Planta Potabilizadora, Oficial Conductor
Maquinaria Pesada y Oficial Pintor General, quinta a decimotercera
"Oficial X" completas, ya incorporaron glosario y casos_practicos desde
el origen en cada script de tema (sin retrofit posterior), conforme al
estándar vigente descrito en esa misma sección — las 13 oposiciones
"Oficial X" completas tienen glosario y casos_practicos al 100% de su
parte específica.
