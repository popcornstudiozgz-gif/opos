# Fuente

- **Norma:** Reglamento de Órganos Territoriales y de Participación Ciudadana del
  Ayuntamiento de Zaragoza.
- **Aprobación definitiva:** Ayuntamiento Pleno, 28 de julio de 2005. Publicado en BOPZ
  nº 288 de 17 de diciembre de 2005.
- **Última modificación reflejada:** creación del Distrito Sur, aprobada el 22 de
  diciembre de 2017, publicada en BOPZ nº 44 de 23 de febrero de 2018.
- **URL:** https://www.zaragoza.es/sede/servicio/normativa/109 (texto consolidado,
  con enlace permanente ELI: `.../eli/es-ar-01502973/reg/2005/12/17/(1)`).
- **Fecha de descarga:** 20 de agosto de 2026.

## Cómo se obtuvo (a diferencia de las normas del BOE)

Esta norma **no tiene PDF**: la página del Ayuntamiento carga el texto por JavaScript
(es una SPA), así que una descarga directa con `curl` solo trae el menú de navegación,
no el articulado. Para conseguir el texto real tuve que descargar el HTML completo,
localizar el bloque de contenido (`id="texto_vigente"`) y limpiar las etiquetas HTML
con un script en Python. El resultado es fiel y completo — verificado igual que con
las normas del BOE.

## Verificación

117 artículos (el documento alterna "Artículo N." la primera vez que aparece en cada
apartado y "Art. N." las siguientes — es así en el original, no es un error mío).
Comprobado con `diff`: el conjunto de números de artículo del texto extraído y el de
los archivos troceados **coincide exactamente**.

## Nota sobre el formato

El HTML original tiene espacios múltiples a media frase (herencia de cómo está
maquetada la página web, con saltos de línea fijos en el HTML fuente) — no afecta al
contenido, que es literal y completo. También conservo tal cual una pequeña
irregularidad de numeración del propio documento: el Capítulo III de la Sección 1ª del
Título IV aparece como "CAPÍTULO IIII" (en vez de "IV") en la fuente original, y en la
Sección 2ª del mismo título salta del Capítulo IV al VI sin que exista un Capítulo V.

## Cobertura de temas

Corresponde a `tema-15` (Participación ciudadana y atención al público — "El Reglamento
de Órganos territoriales y Participación ciudadana de Zaragoza").

## Índice de archivos

| Archivo | Contenido |
|---|---|
| `00-titulo-primero-disposiciones-generales.md` | Título Primero |
| `01` a `03` | **Título II, Sección 1ª** — Distritos y Juntas Municipales (Cap. I Disposiciones generales, II Órganos de gestión, III Régimen de sesiones y acuerdos) |
| `04` a `05` | **Título II, Sección 2ª** — Distrito Rural, Barrios Rurales y Juntas Vecinales |
| `06` | **Título II, Sección 3ª** — Concejos Locales |
| `07` | **Título III** — Órganos territoriales de gestión: Consejos de Distrito |
| `08` a `10` | **Título IV, Sección 1ª** — Información municipal e instrumentos de participación individual |
| `11` a `15` | **Título IV, Sección 2ª** — Participación de la sociedad civil (diálogo civil, Censo Municipal de Entidades, interés público municipal, instrumentos) |
| `16` a `23` | **Título V** — El Consejo de la Ciudad de Zaragoza (disposiciones generales, estructura, presidencia, pleno, consejos sectoriales, oficina técnica, derechos/deberes de los miembros) |
| `24` a `25` | **Título VI** — La Comisión Especial de Sugerencias y Reclamaciones |
| `26` | **Título VII** — Los Consejos Sectoriales de Zaragoza |
| `90-disposiciones-...md` | Disposiciones adicionales (5), transitorias (4), derogatorias y finales (2) |
