#!/bin/bash
# "Ignored Build Step" de Vercel — evita desplegar cuando el push no tocó
# nada que afecte a la app desplegada (solo scripts de seed, contenido en
# markdown de content-raw/, o documentación). Esos cambios ya se aplican
# directamente contra Supabase al ejecutar el script; no necesitan un build
# nuevo de Next.js.
#
# Contrato de Vercel: exit 0 = saltar el despliegue. exit != 0 = desplegar.
#
# Motivación (ver CLAUDE.md, sección de espacio/egress): en la sesión de
# contenido del 31/08-04/09/2026 se empujaron ~400 commits en unos días,
# cada uno disparando un despliegue completo que regenera TODAS las páginas
# estáticas leyendo Supabase de cero — eso agotó la cuota de egress de
# Supabase y llenó el almacenamiento de despliegues de Vercel. Este script
# corta el problema de raíz: los pushes de solo-contenido dejan de generar
# despliegues.

if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ]; then
  echo "Sin SHA anterior (primer despliegue del proyecto) — se despliega."
  exit 1
fi

# Rutas que si cambian SÍ requieren un build nuevo de la app.
APP_PATHS="src public package.json package-lock.json next.config.ts postcss.config.mjs tsconfig.json vercel.json"

if git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- $APP_PATHS 2>/dev/null; then
  echo "Solo cambios en scripts/contenido (no en la app) — build omitido."
  exit 0
else
  echo "Hay cambios en la app — se despliega."
  exit 1
fi
