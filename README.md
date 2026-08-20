# Kiuti — plataforma multi-oposición

Sitio único para varias oposiciones (`oposicioneszaragoza.es` → `/auxiliar-administrativo`,
`/auxiliar-administrativo-dga`, ...). Arranca con **Auxiliar Administrativo del
Ayuntamiento de Zaragoza**, con el temario actualizado a la última convocatoria (20 temas).

**Conectado a Supabase de verdad** desde el 20 de agosto de 2026: oposiciones, bloques,
temas, la asignación tema↔oposición y la convocatoria viven en Postgres; el código ya no
lee de archivos `.ts` locales para ese contenido (ver "Arquitectura" abajo).

**Flashcards y glosario se retiraron a propósito** antes de conectar Supabase, para no
mantener una versión intermedia en TypeScript que luego habría que migrar. Las tablas
`flashcards` y `glosario` ya existen en Supabase (ver `supabase/migrations/0001_init.sql`)
pero están vacías — se rellenan cuando se retome ese contenido, con el material fuente que
ya está en `content-raw/` (15 normas troceadas por Título/Capítulo). **Test, simulacros y
casos prácticos** también siguen fuera, como se pidió desde el principio. **Login, perfil,
progreso y panel de admin** tampoco existen todavía — el esquema no incluye ni siquiera
`profiles`/roles: eso llega con la fase de autenticación.

Desplegado en Vercel: **https://opos-khaki.vercel.app**

## Cómo arrancar en local

```bash
npm install
cp .env.local.example .env.local   # y rellena tus propias claves de Supabase
npm run dev
```

Abre `http://localhost:3000`.

## Arquitectura

### Oposición ↔ tema (por qué existe `tema_oposicion`)

Un **tema** es contenido reutilizable: no pertenece a ninguna oposición. Una **oposición**
no contiene temas directamente — los **asigna** mediante la tabla puente `tema_oposicion`,
donde se decide en qué bloque cae, qué número de tema es y si está publicado/es premium
**para esa oposición concreta**. Cuando dos oposiciones comparten una ley o materia, el
mismo `tema.slug` se asigna a ambas sin duplicar contenido — solo se añade una fila nueva
en `tema_oposicion`.

Flashcards y glosario (cuando se rellenen) cuelgan de `tema_slug`, así que se comparten
automáticamente en cualquier oposición que asigne ese tema.

**Al incorporar la segunda oposición (DGA):** si un tema coincide (misma ley, misma
materia), NO se duplica en la tabla `temas` — se añade solo una fila nueva en
`tema_oposicion`. Si un tema existente solo coincide parcialmente, hay que trocearlo en
unidades más atómicas primero.

### Supabase

- **Esquema**: `supabase/migrations/0001_init.sql` — 7 tablas (`oposiciones`, `bloques`,
  `temas`, `tema_oposicion`, `flashcards`, `glosario`, `convocatorias`), con RLS de solo
  lectura pública (nadie escribe salvo `service_role`, usada por scripts).
- **Seed**: `scripts/seed.mjs` — vuelca los datos actuales (1 oposición, 7 bloques, 20
  temas, convocatoria). Idempotente (upsert): se puede volver a ejecutar sin duplicar.
  Uso: `node --env-file=.env.local scripts/seed.mjs`.
- **Clientes** (`src/lib/supabase/`):
  - `public.ts` — clave `anon`, sin cookies. Es el que usa todo `lib/oposiciones.ts` y
    `data/convocatorias.ts`, porque hoy ninguna consulta de contenido depende del usuario
    y así funciona igual en build time (`generateStaticParams`) que en request time.
  - `server.ts` — clave `anon` con cookies de sesión (vía `@supabase/ssr`). Todavía no lo
    usa nadie: es para cuando haya login y RLS necesite evaluar `auth.uid()`.
  - `admin.ts` — clave `service_role`, salta RLS. Solo para scripts de servidor
    (`server-only` hace fallar el build si se cuela en el bundle del cliente).

## Estructura

```
src/
  app/
    page.tsx                      → catálogo general de oposiciones (portada del dominio)
    [oposicion]/
      layout.tsx                   → valida el slug, pone la navbar con contexto de oposición
      page.tsx                     → home de la oposición (estadísticas, accesos)
      temario/page.tsx             → temario por bloques
      temario/[slug]/page.tsx      → contenido de un tema
      convocatoria/page.tsx        → ficha de la convocatoria vigente
  data/
    convocatorias.ts               → consulta la tabla `convocatorias` de Supabase
  lib/
    types.ts                       → tipos de dominio (documentados con la razón de cada decisión)
    oposiciones.ts                 → consultas a Supabase (oposiciones, bloques, temas, tema_oposicion)
    site.ts                        → metadatos globales del dominio
    supabase/                      → los tres clientes (ver arriba)
supabase/
  migrations/0001_init.sql         → esquema completo + RLS
scripts/
  seed.mjs                         → rellena Supabase con el contenido actual
```

## Qué falta y qué necesito de ti

1. **Flashcards y glosario**: tablas creadas, vacías. El material fuente sigue en
   `content-raw/` (15 normas, cada una con su `FUENTE.md`). Falta generarlas y hacer un
   segundo script de seed para ellas.
2. **Test / casos prácticos / simulacros**: pausados a propósito. Cuando se retomen, misma
   mecánica: colgarán de `tema_slug`, reutilizables igual que el resto de contenido.
3. **Login / perfil / progreso / panel de admin**: el esquema de Supabase no los incluye
   todavía (ni `profiles` ni roles) — se diseñan cuando llegue esa fase.
4. **Páginas legales** (aviso legal, privacidad, cookies): en espera de que exista login de
   verdad, para no publicar una política que describa cosas que la web no hace.
5. **Segunda oposición (DGA)**: en cuanto me pases su temario oficial, reviso qué temas
   coinciden con los ya existentes para reutilizarlos (nueva fila en `tema_oposicion`) y
   creo solo los que sean realmente nuevos.
6. **`robots.txt`**: bloquea TODO a los buscadores (`disallow: "/"`) a propósito mientras
   no hay dominio propio — revisar antes de lanzar o Google nunca indexará el sitio.
7. **Dominio propio**: cuando se compre `oposicioneszaragoza.es`, añadirlo en Vercel y
   actualizar `SITE.url` en `src/lib/site.ts` (ver `SETUP.md`).
8. **Diseño**: se ha mantenido el mismo lenguaje visual (azul institucional) del proyecto
   original para no partir de cero. Decir si se quiere una identidad visual propia.
