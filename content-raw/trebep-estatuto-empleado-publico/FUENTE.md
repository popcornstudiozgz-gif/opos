# Fuente

- **Norma:** Real Decreto Legislativo 5/2015, de 30 de octubre, por el que se aprueba el
  texto refundido de la Ley del Estatuto Básico del Empleado Público (TREBEP)
  (BOE-A-2015-11719), texto consolidado.
- **URL original:** https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719
- **PDF descargado de:** https://www.boe.es/buscar/pdf/2015/BOE-A-2015-11719-consolidado.pdf
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`, dividido por Título/Capítulo tal como
  aparecen en el propio documento.

## Verificación

101 cabeceras de artículo, hasta el 100 (hay un artículo "bis" añadido por reforma
posterior que mi patrón cuenta como duplicado del número base — mismo caso que en
la Ley de Haciendas Locales). Comprobado con `diff`: el conjunto de números de artículo
del documento original y el de los archivos troceados **coincide exactamente**.

## Cobertura de temas

Esta ley cubre `tema-17` (Título I-III: clases de personal, derechos y deberes) y
`tema-18` (Título IV, situaciones administrativas del Título VI, régimen disciplinario
del Título VII: adquisición/pérdida de la relación de servicio, situaciones
administrativas, faltas y sanciones).

## Nota sobre el formato

Mismo aviso que en las anteriores: texto literal y completo, con algún salto de línea
raro a media frase por cómo `pdftotext` interpreta el maquetado justificado del PDF.

## Índice de archivos

| Archivo | Contenido | Artículos | Tema actual |
|---|---|---|---|
| `00-preambulo-y-disposiciones-del-rdleg.md` | Preámbulo + Artículo único + disposiciones propias del RD Legislativo | — | — |
| `01-titulo1-objeto-y-ambito-de-aplicacion.md` | Título I | 1–7 | tema-17 |
| `02-titulo2-cap1-clases-de-personal.md` | Título II, Cap. I | 8–12 | tema-17 |
| `03-titulo2-cap2-personal-directivo.md` | Título II, Cap. II | 13 | tema-17 |
| `04-titulo3-cap1-derechos-de-los-empleados-publicos.md` | Título III, Cap. I | 14–15 | tema-17 |
| `05-titulo3-cap2-carrera-profesional-y-evaluacion-desempeno.md` | Título III, Cap. II | 16–20 | tema-17 |
| `06-titulo3-cap3-derechos-retributivos.md` | Título III, Cap. III | 21–30 | tema-17 |
| `07-titulo3-cap4-negociacion-colectiva-representacion-participacion.md` | Título III, Cap. IV | 31–46 | tema-17 |
| `08-titulo3-cap5-jornada-permisos-y-vacaciones.md` | Título III, Cap. V | 47–51 | tema-17 |
| `09-titulo3-cap6-deberes-y-codigo-de-conducta.md` | Título III, Cap. VI — deberes y código de conducta | 52–54 | tema-17 |
| `10-titulo4-cap1-acceso-al-empleo-publico.md` | Título IV, Cap. I — adquisición de la relación de servicio | 55–62 | tema-18 |
| `11-titulo4-cap2-perdida-de-la-relacion-de-servicio.md` | Título IV, Cap. II | 63–68 | tema-18 |
| `12-titulo5-cap1-planificacion-de-recursos-humanos.md` | Título V, Cap. I | 69–71 | tema-19 (posible) |
| `13-titulo5-cap2-estructuracion-del-empleo-publico.md` | Título V, Cap. II | 72–77 | tema-19 (posible) |
| `14-titulo5-cap3-provision-de-puestos-y-movilidad.md` | Título V, Cap. III | 78–84 | tema-19 (posible) |
| `15-titulo6-situaciones-administrativas.md` | Título VI | 85–92 | tema-18 |
| `16-titulo7-regimen-disciplinario.md` | Título VII — faltas y sanciones | 93–98 | tema-18 |
| `17-titulo8-cooperacion-entre-administraciones-publicas.md` | Título VIII | 99–100 | — |
| `90-disposiciones-...md` | Disposiciones adicionales, transitorias, derogatoria y finales | — | — |
