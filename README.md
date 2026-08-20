# Kiuti — plataforma multi-oposición

Sitio único para varias oposiciones (`oposicioneszaragoza.es` → `/auxiliar-administrativo`,
`/auxiliar-administrativo-dga`, ...). Arranca con **Auxiliar Administrativo del
Ayuntamiento de Zaragoza**, con el temario actualizado a la última convocatoria (20 temas).

**Flashcards y glosario se han retirado a propósito** (decisión del 20 de agosto de 2026):
se rehacen desde cero cuando el proyecto esté conectado a Supabase, en vez de mantener una
versión intermedia en TypeScript que luego habría que migrar. El material fuente para
generarlas (leyes troceadas por Título/Capítulo) sigue disponible en `content-raw/` — no se
ha tocado. **Test, simulacros y casos prácticos** también siguen fuera, como se pidió desde
el principio.

Todo funciona en local con datos en TypeScript (sin Supabase todavía).

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## La decisión de arquitectura clave

Un **tema** (`src/data/temario/temas.ts`) es contenido reutilizable: no pertenece a ninguna
oposición. Una **oposición** (`src/data/oposiciones.ts`) no contiene temas directamente —
los **asigna** mediante `src/data/temario/asignaciones.ts` (equivalente en memoria a la
futura tabla puente `tema_oposicion` en Supabase), donde se decide en qué bloque cae, qué
número de tema es y si está publicado/es premium **para esa oposición concreta**.

Cuando se reintroduzcan, flashcards y glosario colgarán del `temaSlug` del tema canónico
(igual que hacían antes de retirarlas), así que se compartirán automáticamente en cualquier
oposición que asigne ese tema — sin duplicar nada.

**Al incorporar la segunda oposición (DGA):** si un tema coincide (misma ley, misma
materia), NO se duplica en `temas.ts` — se añade solo una fila nueva en `asignaciones.ts`
apuntando al mismo `temaSlug`. Si un tema existente solo coincide parcialmente, hay que
trocearlo en unidades más atómicas primero (ver conversación de diseño).

Todo esto está pensado para migrar a Supabase sin cambiar quien lo consume: las funciones
de `src/lib/oposiciones.ts` hacen exactamente el "join" que haría la base de datos
(`getBloquesConTemas`, `getTemaDeOposicion`...); el día de mañana se sustituye su
implementación por queries reales y las páginas no se enteran.

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
    oposiciones.ts                 → catálogo (hoy: 1 oposición)
    temario/
      temas.ts                     → temas CANÓNICOS (reutilizables)
      bloques.ts                   → bloques, por oposición
      asignaciones.ts              → tema_oposicion: qué tema va en qué bloque/número/oposición
    convocatorias.ts               → datos de convocatoria, por oposición
  lib/
    types.ts                       → tipos de dominio (documentados con la razón de cada decisión)
    oposiciones.ts                 → funciones de consulta/"join" del catálogo
    site.ts                        → metadatos globales del dominio (ya no hay un SITE.oposicion fijo)
```

## Qué falta y qué necesito de ti

1. **Flashcards y glosario**: retirados a propósito (ver arriba). El material fuente para
   generarlos cuando se retomen ya está en `content-raw/` — 15 normas troceadas por
   Título/Capítulo, cada una con su `FUENTE.md` documentando qué tema cubre. Se rehacen
   sobre Supabase, no en TypeScript.
2. **Test / casos prácticos / simulacros**: pausados a propósito (decisión explícita,
   confirmada de nuevo el 20 de agosto de 2026). Cuando se retomen, misma mecánica:
   colgarán de `temaSlug`, reutilizables igual que el resto de contenido.
3. **Login / perfil / progreso / panel de admin**: esperan a que exista el proyecto de
   Supabase (confirmado) — no tiene sentido maquetar pantallas que no van a funcionar.
   Cuando migremos, sustituimos `data/` por las tablas ya diseñadas (`oposiciones`,
   `bloques`, `temas`, `tema_oposicion`, `flashcards`, `glosario`) y las funciones de
   `lib/oposiciones.ts` por queries — las páginas no cambian.
4. **Páginas legales** (aviso legal, privacidad, cookies): también en espera. Las de
   `kubo-calendario` describen cuentas de usuario y cookies de sesión que aquí todavía
   no existen — portarlas tal cual ahora sería publicar una política que no es cierta.
   Se escriben cuando haya auth real (o antes, si se piden explícitamente en una
   versión mínima sin mencionar cuentas).
5. **Convocatoria**: ✅ ya portada (`data/convocatorias.ts`, oposición-específica —
   a diferencia del temario, no es reutilizable entre oposiciones).
6. **`sitemap.xml` / `robots.txt`**: ✅ ya generados, recorren todas las oposiciones
   activas del catálogo. Ojo: `robots.ts` bloquea TODO a los buscadores (`disallow: "/"`),
   igual que en `kubo-calendario` — es así a propósito mientras no hay dominio propio,
   pero hay que revisarlo antes de lanzar o Google nunca indexará el sitio.
7. **Segunda oposición (DGA)**: en cuanto me pases su temario oficial, reviso qué temas
   coinciden con los ya existentes para reutilizarlos (nueva fila en `asignaciones.ts`)
   y creo solo los que sean realmente nuevos.
8. **Diseño**: he mantenido el mismo lenguaje visual (azul institucional) del proyecto
   original para no partir de cero. Dime si quieres una identidad visual propia para Kiuti.
