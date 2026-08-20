# content-raw — zona de entrada de material (NO es contenido final)

Aquí es donde dejas el material en bruto (leyes, apuntes, temario oficial en PDF...)
para que yo lo lea y genere flashcards/glosario/test/casos prácticos a partir de él.
Esta carpeta no la lee la web — es solo mi "bandeja de entrada".

## Convención

Un subdirectorio por **norma/documento fuente** (no por tema-slug), y dentro un archivo
por capítulo/título/sección:

```
content-raw/
  constitucion-espanola/
    titulo-preliminar.pdf
    titulo-i-derechos-y-deberes.pdf
    titulo-viii-organizacion-territorial.pdf
  ley-39-2015-procedimiento-administrativo/
    titulo-iv-cap-1-garantias.pdf
    titulo-iv-cap-2-iniciacion.pdf
  estatuto-autonomia-aragon/
    titulo-preliminar.pdf
    titulo-i-organizacion-institucional.pdf
```

**Por qué así y no por tema-slug**: un tema-slug (`tema-3`, `tema-7`...) es una unidad
artificial que decido yo al montar el temario de UNA oposición concreta. Una ley no
cambia, pero cómo se reparte en "temas" sí varía de una oposición a otra (una puede
juntar dos títulos en un tema y otra separarlos en dos). Organizando por norma y
capítulo, cuando proceso el material soy yo quien decide cómo mapearlo a temas
canónicos — esa decisión queda en `src/data/temario/asignaciones.ts`, no en la carpeta.

Si al pedirme algo el tema resultante todavía no existe en `temas.ts`, no pasa nada:
dímelo (o directamente indícame de qué ley/capítulo se trata y para qué oposición) y lo
doy de alta yo mismo como parte del mismo encargo.

## Formatos que puedo leer directamente

- **PDF** — el mejor formato, incluso si es un escaneo (lo leo página a página).
- **`.md` / `.txt`** — texto plano o markdown.
- **Imágenes** (`.png`, `.jpg`) — capturas de pantalla, fotos de apuntes, etc.
- **Word (`.docx`)** — no lo puedo abrir directamente: expórtalo a PDF antes, o pega el
  texto directamente en el chat.

Para textos cortos (un artículo de ley, un resumen de dos párrafos) no hace falta ni
subir archivo: pégalo directamente en el chat.

## Qué hago yo con ello

1. Leo el material (la norma/capítulo que me indiques).
2. Compruebo si ese contenido ya corresponde a un tema canónico existente (de esta
   oposición o de otra) — si coincide, reutilizo ese tema en vez de crear uno duplicado.
   Si es nuevo, decido junto contigo el tema-slug y lo doy de alta en `temas.ts` +
   `asignaciones.ts`.
3. Genero flashcards (pregunta/respuesta) y/o glosario (término/definición) fieles al
   texto fuente, con el mismo estilo que ya existe en `tema-7` y `tema-3`.
4. Los añado a `src/data/flashcards.ts` / `src/data/glosario.ts`.
5. Te digo qué he añadido y cuántas entradas, para que lo revises en la web.

Cuando retomemos test/casos prácticos, funcionará igual: nuevos archivos de datos
(`preguntas.ts`, `casos-practicos.ts`) enlazados por `temaSlug`, así que se benefician
del mismo mecanismo de reutilización entre oposiciones.
