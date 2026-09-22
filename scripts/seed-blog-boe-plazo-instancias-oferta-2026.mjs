/**
 * Artículo de blog (noticia): apertura del plazo de instancias de la OEP
 * 2026 del Ayuntamiento de Zaragoza.
 *
 * Fuente verificada: Resolución de 7 de septiembre de 2026 del
 * Ayuntamiento de Zaragoza, publicada en el BOE núm. 227 de 14 de
 * septiembre de 2026 (BOE-A-2026-19150), leída íntegra en esta sesión
 * (https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf).
 *
 * Cifras cruzadas y verificadas contra la propia BD: las 179 plazas
 * repartidas en las 16 oposiciones enlazadas coinciden exactamente con
 * `convocatorias.plazas_total` ya sembrado para cada una (CONV 4/2026),
 * confirmando que lo sembrado en su momento era correcto — esta
 * resolución solo aporta la fecha real del plazo (que la migración
 * 0016_convocatorias_estado.sql asumía, incorrectamente, ya transcurrida).
 * Fecha de cierre (5 de octubre, no 4) verificada aplicando el art. 30.5
 * de la Ley 39/2015 (el día 20 natural cae en domingo).
 *
 * Oficial Fontanero, deliberadamente excluido de esta noticia y no
 * enlazado: no aparece en la resolución del BOE (sus bases 2026 siguen
 * sin publicarse, ver scripts/seed-convocatoria-oficial-fontanero.mjs).
 *
 * Uso: node --env-file=.env.local scripts/seed-blog-boe-plazo-instancias-oferta-2026.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

const SLUG = "boe-abre-plazo-instancias-oferta-empleo-2026-ayuntamiento-zaragoza";

const CONTENIDO = `El Boletín Oficial del Estado del 14 de septiembre de 2026 ha publicado la resolución que abre oficialmente el plazo de instancias de una de las ofertas de empleo público más grandes que ha lanzado el Ayuntamiento de Zaragoza en los últimos años. Si llevas tiempo preparando alguna de las oposiciones de esta web, esto es lo que tienes que saber.

## El plazo, en una frase

Tienes **del 15 de septiembre al 5 de octubre de 2026** para presentar tu instancia.

El BOE marca 20 días naturales a contar desde el día siguiente a su publicación, lo que técnicamente termina el 4 de octubre — pero al caer en domingo, el plazo se prorroga automáticamente al primer día hábil siguiente (art. 30.5 de la Ley 39/2015), es decir, el lunes 5 de octubre.

## No es una convocatoria nueva — es la apertura del plazo del que ya te hablamos

Esta resolución no cambia bases ni temario. Las bases de esta oferta se publicaron el 27 de julio de 2026 en el Boletín Oficial de la Provincia de Zaragoza (BOP núm. 170) — [ya te contamos entonces](/blog/urbanismo-vuelve-temario-auxiliar-administrativo-zaragoza) que el temario de Auxiliar Administrativo cambiaba un tema — y se rectificaron después en el BOP del 27 de agosto y del 4 de septiembre. Lo único que añade el BOE ahora es la fecha oficial: a partir de aquí, el plazo de instancias corre de verdad.

## Las plazas que puedes preparar en esta web

Esta única resolución agrupa toda la oferta de personal del Ayuntamiento de Zaragoza — unas 475 plazas en total, repartidas en más de 60 categorías distintas, desde técnicos superiores hasta policía local y bomberos. De ahí salen 179 plazas de las 16 oposiciones que tienes disponibles aquí (todas por turno libre, sistema de oposición):

- **[Auxiliar Administrativo](/ayuntamiento-zaragoza/aux-administrativo/convocatoria)** — 85 plazas
- **[Oficial Mantenimiento General](/ayuntamiento-zaragoza/oficial-mantenimiento/convocatoria)** — 29 plazas
- **[Oficial Polivalente Instalaciones Deportivas](/ayuntamiento-zaragoza/oficial-instalaciones-deportivas/convocatoria)** — 13 plazas
- **[Oficial Agente Inspector](/ayuntamiento-zaragoza/oficial-agente-inspector/convocatoria)** — 10 plazas
- **[Oficial Guardallaves](/ayuntamiento-zaragoza/oficial-guardallaves/convocatoria)** — 9 plazas
- **[Oficial Albañil](/ayuntamiento-zaragoza/oficial-albanil/convocatoria)** — 6 plazas
- **[Oficial Herrero](/ayuntamiento-zaragoza/oficial-herrero/convocatoria)** — 5 plazas
- **[Oficial Electricista](/ayuntamiento-zaragoza/oficial-electricista/convocatoria)** — 4 plazas
- **[Oficial Mecánico](/ayuntamiento-zaragoza/oficial-mecanico/convocatoria)** — 4 plazas
- **[Oficial Cementerio](/ayuntamiento-zaragoza/oficial-cementerio/convocatoria)** — 3 plazas
- **[Oficial Planta Potabilizadora](/ayuntamiento-zaragoza/oficial-planta-potabilizadora/convocatoria)** — 3 plazas
- **[Oficial Carpintero](/ayuntamiento-zaragoza/oficial-carpintero/convocatoria)** — 2 plazas
- **[Oficial Conductor — Especialidad General](/ayuntamiento-zaragoza/oficial-conductor-general/convocatoria)** — 2 plazas
- **[Oficial Conductor — Especialidad Maquinaria Pesada](/ayuntamiento-zaragoza/oficial-conductor-maquinaria-pesada/convocatoria)** — 2 plazas
- **[Oficial Pintor — Especialidad General](/ayuntamiento-zaragoza/oficial-pintor-general/convocatoria)** — 1 plaza
- **[Oficial Pintor — Especialidad Gráfica](/ayuntamiento-zaragoza/oficial-pintor-grafica/convocatoria)** — 1 plaza

Varias de ellas tienen además una segunda tanda de plazas en turno de promoción interna, reservada a quien ya es personal del Ayuntamiento — no están contadas en esta lista ni entran en este mismo plazo de instancias de turno libre.

## Si preparas Oficial Fontanero

Tu plaza no está en esta resolución: la oferta municipal prevé una plaza nueva de Oficial Fontanero, pero sus bases específicas de 2026 todavía no se han publicado en el BOP, así que tampoco entra en este plazo del BOE. El temario ya está completo en la web para que no pierdas tiempo mientras tanto — en cuanto salgan las bases, lo contamos aquí.

## Cómo presentar la instancia

La tramitación se hace según lo indicado en las propias bases de cada plaza, a través del [Portal de Oferta de Empleo Público del Ayuntamiento de Zaragoza](https://www.zaragoza.es/oferta). En la ficha de convocatoria de cada oposición (enlaces arriba) tienes el desglose de plazas, el requisito de titulación, el sistema de selección y las bases específicas y generales enlazadas directamente.

**Fuente**: Resolución de 7 de septiembre de 2026 del Ayuntamiento de Zaragoza, publicada en el BOE núm. 227 de 14 de septiembre de 2026 ([BOE-A-2026-19150](https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf)).`;

console.log("📝 articulos...");
const [articulo] = await upsert(
  "articulos",
  [
    {
      slug: SLUG,
      titulo: "Ya puedes presentar instancia en la gran oferta de empleo del Ayuntamiento de Zaragoza",
      resumen:
        'El BOE del 14 de septiembre publica la resolución que abre el plazo de instancias de la OEP 2026 del Ayuntamiento de Zaragoza: 85 plazas de Auxiliar Administrativo y las de 15 oposiciones "Oficial X" con convocatoria ya resuelta. Tienes hasta el 5 de octubre para presentarte.',
      contenido: CONTENIDO,
      tipo: "noticia",
      publicado: true,
      publicado_en: new Date().toISOString(),
    },
  ],
  "slug"
);

const OPOSICIONES = [
  "auxiliar-administrativo-ayto-zaragoza",
  "oficial-mantenimiento-ayto-zaragoza",
  "oficial-instalaciones-deportivas-ayto-zaragoza",
  "oficial-agente-inspector-ayto-zaragoza",
  "oficial-guardallaves-ayto-zaragoza",
  "oficial-albanil-ayto-zaragoza",
  "oficial-herrero-ayto-zaragoza",
  "oficial-electricista-ayto-zaragoza",
  "oficial-mecanico-ayto-zaragoza",
  "oficial-cementerio-ayto-zaragoza",
  "oficial-planta-potabilizadora-ayto-zaragoza",
  "oficial-carpintero-ayto-zaragoza",
  "oficial-conductor-general-ayto-zaragoza",
  "oficial-conductor-maquinaria-pesada-ayto-zaragoza",
  "oficial-pintor-general-ayto-zaragoza",
  "oficial-pintor-grafica-ayto-zaragoza",
];

console.log("🔗 articulo_oposicion...");
await insertar(
  "articulo_oposicion",
  OPOSICIONES.map((oposicion_slug) => ({ articulo_id: articulo.id, oposicion_slug }))
);

console.log(`\n✅ Artículo publicado: /blog/${SLUG}`);
console.log(`   Enlazado a ${OPOSICIONES.length} oposiciones.`);
