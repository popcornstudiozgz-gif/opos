# Fuente

- **Norma:** Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las
  Administraciones Públicas (BOE-A-2015-10565), texto consolidado.
- **URL original:** https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565
- **PDF descargado de:** https://www.boe.es/buscar/pdf/2015/BOE-A-2015-10565-consolidado.pdf
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`, dividido por Título/Capítulo tal como
  aparecen en el propio documento. Verificado: 133 artículos, todos presentes en el
  conjunto de archivos, sin huecos ni duplicados (limpio a la primera esta vez).

## Nota sobre el formato

Mismo aviso que en las anteriores: texto literal y completo, con algún salto de línea
raro a media frase por cómo `pdftotext` interpreta el maquetado justificado del PDF.

## Esta ley ya cubre 5 temas del temario actual

El Título IV (Capítulos I–VII) es exactamente el contenido de `tema-7`, para el que ya
había flashcards y glosario reales — la división en 7 capítulos que salió del propio PDF
(Garantías, Iniciación, Ordenación, Instrucción, Finalización, Tramitación simplificada,
Ejecución) coincide con la estructura que ya usaban esas flashcards, así que no hace
falta regenerarlas. Además:
- Título I → `tema-4` (Los interesados en el procedimiento)
- Título II → `tema-5` (La actividad de las Administraciones Públicas)
- Título III → `tema-6` (Los actos administrativos)
- Título IV → `tema-7` (ya tiene contenido)
- Título V → `tema-8` (Revisión de actos en vía administrativa)

El Título Preliminar, el Título VI (iniciativa legislativa y potestad reglamentaria) y las
disposiciones no tienen tema asignado todavía en `asignaciones.ts` — quedan disponibles
por si hacen falta.

## Índice de archivos

| Archivo | Contenido | Artículos | Tema actual |
|---|---|---|---|
| `preambulo.md` | Preámbulo (exposición de motivos) | — | — |
| `titulo-preliminar-disposiciones-generales.md` | Título Preliminar | 1–2 | — |
| `titulo-1-cap-1-capacidad-de-obrar-y-concepto-de-interesado.md` | Título I, Cap. I | 3–8 | tema-4 |
| `titulo-1-cap-2-identificacion-y-firma.md` | Título I, Cap. II | 9–12 | tema-4 |
| `titulo-2-cap-1-normas-generales-de-actuacion.md` | Título II, Cap. I | 13–28 | tema-5 |
| `titulo-2-cap-2-terminos-y-plazos.md` | Título II, Cap. II | 29–33 | tema-5 |
| `titulo-3-cap-1-requisitos-de-los-actos-administrativos.md` | Título III, Cap. I | 34–36 | tema-6 |
| `titulo-3-cap-2-eficacia-de-los-actos.md` | Título III, Cap. II | 37–46 | tema-6 |
| `titulo-3-cap-3-nulidad-y-anulabilidad.md` | Título III, Cap. III | 47–52 | tema-6 |
| `titulo-4-cap-1-garantias-del-procedimiento.md` | Título IV, Cap. I | 53 | tema-7 (ya tiene flashcards/glosario) |
| `titulo-4-cap-2-iniciacion-del-procedimiento.md` | Título IV, Cap. II | 54–69 | tema-7 |
| `titulo-4-cap-3-ordenacion-del-procedimiento.md` | Título IV, Cap. III | 70–74 | tema-7 |
| `titulo-4-cap-4-instruccion-del-procedimiento.md` | Título IV, Cap. IV | 75–83 | tema-7 |
| `titulo-4-cap-5-finalizacion-del-procedimiento.md` | Título IV, Cap. V | 84–95 | tema-7 |
| `titulo-4-cap-6-tramitacion-simplificada.md` | Título IV, Cap. VI | 96 | tema-7 |
| `titulo-4-cap-7-ejecucion.md` | Título IV, Cap. VII | 97–105 | tema-7 |
| `titulo-5-cap-1-revision-de-oficio.md` | Título V, Cap. I | 106–111 | tema-8 |
| `titulo-5-cap-2-recursos-administrativos.md` | Título V, Cap. II | 112–126 | tema-8 |
| `titulo-6-iniciativa-legislativa-y-potestad-reglamentaria.md` | Título VI | 127–133 | — |
| `disposiciones-adicionales-transitorias-derogatoria-finales.md` | Disposiciones adicionales (9), transitorias (5), derogatoria y finales (7) | — | — |
