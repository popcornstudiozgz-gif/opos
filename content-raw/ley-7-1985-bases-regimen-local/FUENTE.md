# Fuente

- **Norma:** Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local (LBRL /
  LRBRL) (BOE-A-1985-5392), texto consolidado.
- **URL original:** https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392
- **PDF descargado de:** https://www.boe.es/buscar/pdf/1985/BOE-A-1985-5392-consolidado.pdf
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`, dividido por Título/Capítulo tal como
  aparecen en el propio documento.

## Verificación

159 cabeceras de artículo, hasta el número 141 — la diferencia son numerosos artículos
"bis"/"ter" (p. ej. tras la reforma de la Ley 27/2013 de racionalización y sostenibilidad
de la Administración Local), que mi patrón cuenta como duplicados del número base. Es la
ley con más reformas acumuladas de las que llevamos (41 años). Comprobado con `diff`:
el conjunto de números de artículo del original y de los archivos troceados
**coincide exactamente** — nada perdido.

## Es probablemente la ley más transversal del temario

Esta es la ley marco del régimen local español. Toca, total o parcialmente:
- `tema-1` (organización territorial, Administración local) → Título I, II
- `tema-10` (bienes de las entidades locales) → Título VI, Cap. I
- `tema-11` (actividad: policía, fomento, servicio público) → Título VI, Cap. II
  (complementa al Reglamento de Servicios de las Corporaciones Locales de 1955)
- `tema-14` (municipio, régimen de gran población) → Título II, Cap. I y **Título X**
  completo (régimen de organización de los municipios de gran población — la base legal
  del régimen especial de Zaragoza como capital aragonesa)
- `tema-15` (participación ciudadana) → Título V, Cap. IV
- `tema-16` (reglamentos y ordenanzas, potestad reglamentaria) → Título I (potestades) y
  Título V, Cap. I

## Nota sobre el formato

Mismo aviso que en las anteriores: texto literal y completo, con algún salto de línea
raro a media frase por cómo `pdftotext` interpreta el maquetado justificado del PDF.

## Índice de archivos

| Archivo | Contenido |
|---|---|
| `00-preambulo.md` | Preámbulo |
| `01-titulo1-disposiciones-generales.md` | Título I |
| `02` a `05` | **Título II — El municipio** (Cap. I Territorio y población, II Organización, III Competencias, IV Regímenes especiales) |
| `06` a `08` | **Título III — La Provincia** (Cap. I Organización, II Competencias, III Regímenes especiales) |
| `09-titulo4-otras-entidades-locales.md` | Título IV |
| `10` a `14` | **Título V — Disposiciones comunes** (Cap. I Funcionamiento, II Relaciones interadministrativas, III Impugnación de actos, IV Información y participación ciudadana, V Estatuto de los miembros de las Corporaciones) |
| `15` a `17` | **Título VI — Bienes, actividades y servicios, y contratación** (Cap. I Bienes, II Actividades y servicios, III Contratación) |
| `18` a `22` | **Título VII — Personal** (Cap. I-V: disposiciones generales, funcionarios de carrera, habilitación nacional, otros funcionarios, personal laboral/eventual) |
| `23-titulo8-haciendas-locales.md` | Título VIII |
| `24-titulo9-cooperacion-administraciones-publicas.md` | Título IX |
| `25` a `28` | **Título X — Municipios de gran población** (Cap. I Ámbito, II Organización de órganos municipales, III Gestión económico-financiera, IV Conferencia de Ciudades) |
| `29-titulo11-infracciones-y-sanciones.md` | Título XI |
| `90-disposiciones-...md` | Disposiciones adicionales, transitorias, derogatoria y finales |
