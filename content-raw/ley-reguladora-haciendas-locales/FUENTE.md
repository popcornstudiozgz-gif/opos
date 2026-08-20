# Fuente

- **Norma:** Real Decreto Legislativo 2/2004, de 5 de marzo, por el que se aprueba el
  texto refundido de la Ley Reguladora de las Haciendas Locales (TRLRHL)
  (BOE-A-2004-4214), texto consolidado.
- **URL original:** https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214
- **PDF descargado de:** https://www.boe.es/buscar/pdf/2004/BOE-A-2004-4214-consolidado.pdf
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`, dividido por Título/Capítulo/Sección/
  Subsección tal como aparecen en el propio documento (26.239 líneas fue el mayor
  desafío tras la LCSP).

## Verificación

El propio preámbulo de la norma declara: *"El texto refundido se estructura en un
título preliminar, seis títulos, **223 artículos**..."*. Encontré 225 cabeceras de
artículo — la diferencia son 2 artículos "bis" añadidos por reformas posteriores a 2004
(**48 bis** y **193 bis**), que mi patrón de búsqueda cuenta como duplicados del número
base. Comprobado con `diff` que el conjunto de números de artículo del documento
original y el de los archivos troceados **coincide exactamente** — nada perdido.

## Granularidad: máximo detalle donde importa para el temario

Esta ley cubre `tema-12` (tributos municipales: tasas, contribuciones especiales,
impuestos obligatorios y potestativos, precios públicos) y `tema-13` (presupuesto:
estructura, aprobación y ejecución). Por eso:

- **Máximo detalle** (hasta Subsección) en el **Título I, Capítulo III** (régimen general
  de tributos: tasas y contribuciones especiales) y en el **Título II, Capítulo II,
  Sección 3ª** (los 5 impuestos municipales — IBI, IAE, IVTM, ICIO, IIVTNU — cada uno
  en su propio archivo) y en el **Título VI, Capítulo I** (contenido, aprobación,
  créditos y ejecución del presupuesto).
- **Nivel Capítulo** para el resto (Títulos III, IV, V y el resto de capítulos de I, II
  y VI) — completo y fiel, solo en bloques algo mayores.

## Nota sobre el formato

Mismo aviso que en las anteriores: texto literal y completo, con algún salto de línea
raro a media frase por cómo `pdftotext` interpreta el maquetado justificado del PDF.

## Índice de archivos

| Archivo | Contenido |
|---|---|
| `00-preambulo-y-disposiciones-del-rdleg.md` | Preámbulo + Artículo único + disposiciones propias del RD Legislativo |
| `01-titulo-preliminar-ambito-aplicacion.md` | Título Preliminar |
| `02` a `12` | **Título I** — Recursos de las haciendas locales (Cap. I Enumeración, II Ingresos de derecho privado, III Tasas/Contribuciones especiales/Impuestos por sección, IV Participaciones en tributos del Estado/CCAA, V Subvenciones, VI Precios públicos, VII Operaciones de crédito) |
| `13` a `25` | **Título II** — Recursos de los municipios (Cap. I Enumeración, II Tasas/Contrib. especiales/**Impuestos por subsección: IBI, IAE, IVTM, ICIO, IIVTNU**, III Cesión de recaudación, IV Participación en tributos del Estado, V Precios públicos, VI Prestación personal y de transporte) |
| `26` a `32` | **Título III** — Recursos de las provincias (mismos capítulos que Título II, adaptados) |
| `33` | **Título IV** — Recursos de otras entidades locales |
| `34` | **Título V** — Regímenes especiales |
| `35` a `40` | **Título VI** — Presupuesto y gasto público (Cap. I Contenido/aprobación/créditos/ejecución por sección, II Tesorería, III Contabilidad, IV Control y fiscalización) |
| `90-disposiciones-...md` | Disposiciones adicionales, transitorias, derogatoria y final |
