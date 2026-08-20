# Fuente

- **Norma:** Decreto-Legislativo 1/2014, de 8 de julio, del Gobierno de Aragón, por el
  que se aprueba el texto refundido de la Ley de Urbanismo de Aragón (BOA-d-2014-90410),
  texto consolidado.
- **URL original:** https://www.boe.es/buscar/act.php?id=BOA-d-2014-90410
- **PDF descargado de:** https://www.boe.es/buscar/pdf/2014/BOA-d-2014-90410-consolidado.pdf
  (BOE también indexa y sirve el texto consolidado de normas autonómicas, con prefijo
  `BOA-d-` en vez de `BOE-A-`; el patrón de URL del PDF funciona igual).
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`, dividido **solo por Título** (sin bajar
  a Capítulo/Sección). Verificado: 295 artículos, todos presentes, sin huecos ni
  duplicados.

## Actualización: esta norma SÍ está en el temario (tema 20)

Cuando la pedí originalmente pensé que no encajaba en el temario y que sería para la
futura oposición DGA — resultó ser al revés: el 20 de agosto de 2026 el usuario trajo el
temario actualizado de la última convocatoria y el **tema 20** es ahora "La Ley de
Urbanismo de Aragón", con el alcance exacto que ya cubren los Títulos I, II, IV, V y VI
que tenía troceados aquí (deja fuera el III y el VII). El tema canónico correspondiente
es `tema-23` en `src/data/temario/temas.ts`, asignado como tema 20 de
`auxiliar-administrativo` en `asignaciones.ts`. Sustituyó al antiguo tema 20
("Prevención de Riesgos Laborales"), que salió del temario y se eliminó del proyecto.

## Granularidad: solo por Título, sin bajar más (pendiente de revisar)

La dividí solo por Título (sin Capítulo/Sección) cuando creía que no era prioritaria.
Ahora que sí lo es (tema 20), el Título IV en concreto es enorme (2.675 líneas) para
generar flashcards/glosario de una sola vez — cuando toque generar contenido de este
tema, probablemente convenga trocearlo más fino primero (tiene Capítulos internos, no
los usé). Los Títulos III y VII no hacen falta para este tema (no están en su alcance).

## Nota sobre el formato

Mismo aviso que en las anteriores: texto literal y completo, con algún salto de línea
raro a media frase por cómo `pdftotext` interpreta el maquetado justificado del PDF.

## Índice de archivos

| Archivo | Contenido |
|---|---|
| `00-preambulo-y-disposiciones-del-rdleg.md` | Preámbulo + Artículo único del Decreto-Legislativo |
| `01-titulo-preliminar.md` | Título Preliminar |
| `02-titulo1-regimen-urbanistico-del-suelo.md` | Título I |
| `03-titulo2-planeamiento-urbanistico.md` | Título II |
| `04-titulo3-instrumentos-politica-urbanistica-y-suelo.md` | Título III |
| `05-titulo4-gestion-urbanistica.md` | Título IV (el más largo, 2.675 líneas) |
| `06-titulo5-edificacion-y-uso-del-suelo.md` | Título V |
| `07-titulo6-disciplina-urbanistica.md` | Título VI |
| `08-titulo7-regimen-urbanistico-simplificado.md` | Título VII |
| `90-disposiciones-...md` | Disposiciones adicionales, transitorias, derogatorias y finales |
