# Fuente

- **Norma:** Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público (LCSP),
  por la que se transponen al ordenamiento jurídico español las Directivas del
  Parlamento Europeo y del Consejo 2014/23/UE y 2014/24/UE (BOE-A-2017-12902),
  texto consolidado.
- **URL original:** https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902
- **PDF descargado de:** https://www.boe.es/buscar/pdf/2017/BOE-A-2017-12902-consolidado.pdf
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`. Verificado: **347 artículos**, todos
  presentes en el conjunto de archivos, sin huecos ni duplicados — es, con diferencia,
  la ley más grande que hemos troceado hasta ahora (19.678 líneas de texto extraído).

## Aviso importante: granularidad desigual, y por qué

Esta ley es enorme y el temario de esta oposición solo pide una parte muy concreta
(`tema-9`: "Delimitación de los tipos contractuales. Competencias en materia de
contratación en las Entidades Locales. Normas específicas de contratación local").
Para no invertir el mismo esfuerzo en las 347 partes por igual, he aplicado dos niveles
de detalle distintos, siempre respetando los cortes reales del documento (nunca un
criterio inventado):

- **Máximo detalle** en el Libro Segundo, Título I, Capítulo I (arts. 115-217): es el
  núcleo procedimental de la contratación administrativa (preparación, adjudicación,
  efectos/cumplimiento/extinción), troceado hasta el nivel de Subsección — incluye la
  **Sección 1ª del Capítulo II del Título Preliminar**, que es literalmente la
  "Delimitación de los tipos contractuales" del enunciado del tema (dentro del archivo
  `02-titulo-preliminar-cap-2-contratos-del-sector-publico.md`, arts. 12-27).
- **Nivel Título** (sin bajar a capítulo) para el resto de la ley: sigue siendo texto
  completo y fiel, solo que en bloques más grandes. Si en algún momento necesitas más
  detalle de alguno de esos títulos, dímelo y lo trocero más.

Sobre **"competencias en materia de contratación en las Entidades Locales"**: no hay un
título específico dedicado solo a ello — la LCSP trata la contratación local de forma
transversal (los órganos de contratación de las entidades locales están en
`50-libro4-titulo1-organos-de-contratacion.md`, y hay referencias sueltas en varios
artículos). Habrá que localizar los artículos concretos al generar el contenido de
`tema-9`, no es un bloque autocontenido como en las otras leyes.

## Nota sobre el formato

Mismo aviso que en las anteriores: texto literal y completo, con algún salto de línea
raro a media frase por cómo `pdftotext` interpreta el maquetado justificado del PDF.

## Índice de archivos

| Archivo | Contenido | Artículos |
|---|---|---|
| `00-preambulo.md` | Preámbulo | — |
| `01-titulo-preliminar-cap-1-objeto-y-ambito.md` | Título Preliminar, Cap. I | 1–11 |
| `02-titulo-preliminar-cap-2-contratos-del-sector-publico.md` | Título Preliminar, Cap. II — **incluye la delimitación de tipos contractuales (Sección 1ª)** | 12–27 |
| `10-libro1-titulo1-disposiciones-generales-sobre-contratacion.md` | Libro I, Título I | 28–60 |
| `11-libro1-titulo2-partes-en-el-contrato.md` | Libro I, Título II | 61–98 |
| `12-libro1-titulo3-objeto-presupuesto-precio-revision.md` | Libro I, Título III | 99–105 |
| `13-libro1-titulo4-garantias-exigibles.md` | Libro I, Título IV | 106–114 |
| `20-...-subsec1-expediente-de-contratacion.md` | Libro II, T.I, Cap.I, Sec.1ª, Subsec.1ª | 115–120 |
| `21-...-subsec2-pliegos.md` | Libro II, T.I, Cap.I, Sec.1ª, Subsec.2ª | 121–130 |
| `22-...-subsec1-normas-generales-adjudicacion.md` | Libro II, T.I, Cap.I, Sec.2ª, Subsec.1ª | 131–155 |
| `23-...-subsec2-procedimiento-abierto.md` | Sec.2ª, Subsec.2ª | 156–159 |
| `24-...-subsec3-procedimiento-restringido.md` | Sec.2ª, Subsec.3ª | 160–165 |
| `25-...-subsec4-procedimientos-con-negociacion.md` | Sec.2ª, Subsec.4ª | 166–171 |
| `26-...-subsec5-dialogo-competitivo.md` | Sec.2ª, Subsec.5ª | 172–176 |
| `27-...-subsec6-asociacion-para-la-innovacion.md` | Sec.2ª, Subsec.6ª | 177–182 |
| `28-...-subsec7-concursos-de-proyectos.md` | Sec.2ª, Subsec.7ª | 183–187 |
| `29-...-subsec1-efectos-de-los-contratos.md` | Sec.3ª, Subsec.1ª | 188–189 |
| `30-...-subsec2-prerrogativas-de-la-administracion.md` | Sec.3ª, Subsec.2ª | 190–191 |
| `31-...-subsec3-ejecucion-de-los-contratos.md` | Sec.3ª, Subsec.3ª | 192–202 |
| `32-...-subsec4-modificacion-de-los-contratos.md` | Sec.3ª, Subsec.4ª | 203–207 |
| `33-...-subsec5-suspension-y-extincion.md` | Sec.3ª, Subsec.5ª | 208–213 |
| `34-...-subsec6-cesion-y-subcontratacion.md` | Sec.3ª, Subsec.6ª | 214–217 |
| `35-libro2-titulo1-cap2-racionalizacion-tecnica-de-la-contratacion.md` | Libro II, T.I, Cap.II (acuerdos marco, centrales de contratación...) | 218–230 |
| `36-libro2-titulo2-tipos-de-contratos-administraciones-publicas.md` | Libro II, Título II — obras, concesión de obras, concesión de servicios, suministro, servicios | 231–315 |
| `40-libro3-titulo1-contratos-poderes-adjudicadores-no-ap.md` | Libro III, Título I | 316–320 |
| `41-libro3-titulo2-contratos-entidades-que-no-son-poderes-adjudicadores.md` | Libro III, Título II | 321–322 |
| `50-libro4-titulo1-organos-de-contratacion.md` | Libro IV, Título I — **incluye órganos de contratación de entidades locales** | 323–336 |
| `51-libro4-titulo2-registros-oficiales.md` | Libro IV, Título II | 337–346 |
| `52-libro4-titulo3-publicidad-contractual-electronica.md` | Libro IV, Título III | 347 |
| `90-disposiciones-y-anexos.md` | Disposiciones adicionales/transitorias/derogatoria/finales + anexos técnicos (códigos CPV, umbrales...) | — |
