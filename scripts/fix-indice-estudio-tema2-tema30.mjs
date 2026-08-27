/**
 * Completa el `indice_estudio` (y `enlaces_boe`) de tema-2 y tema-30 con
 * las secciones añadidas por los scripts de corrección de esta sesión
 * (fix-tema10-dga-igualdad.mjs y fix-tema5-dga-administracion-consultiva.mjs).
 *
 * Detectado al revisar `mapTemaDeOposicion` en `src/lib/oposiciones.ts`:
 * el índice de estudio que se muestra en la página de temario de cada
 * oposición se recorta filtrando `temas.indice_estudio` por
 * `secciones_incluidas` — es un campo del TEMA canónico, independiente de
 * las flashcards/preguntas (que sí se filtran directamente por
 * `seccion`). Añadir solo flashcards/preguntas para una sección nueva deja
 * el índice de estudio (la página de "qué leer") incompleto para esa
 * sección, aunque el test y las flashcards ya funcionen. Este script
 * corrige ese hueco para las tres secciones añadidas esta sesión, y de
 * paso añade el punto "loiemh-titulo-preliminar" que faltaba en tema-2
 * desde antes de esta sesión (usado en el recorte de la DGA, pero sin
 * entrada en el índice de estudio).
 *
 * No afecta a otras oposiciones que reutilicen tema-2 (Ayuntamiento de
 * Zaragoza) o tema-30, porque cada una filtra este mismo índice por su
 * propio `secciones_incluidas`.
 *
 * Uso: node --env-file=.env.local scripts/fix-indice-estudio-tema2-tema30.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function getTema(slug) {
  const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}&select=*`, { headers: HEADERS });
  const [row] = await res.json();
  if (!row) {
    console.error(`❌ No se encontró tema-${slug}.`);
    process.exit(1);
  }
  return row;
}

async function patchTema(slug, body) {
  const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}`, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`❌ Error actualizando ${slug}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────
// tema-2: añade loiemh-titulo-preliminar (hueco previo) + las dos leyes
// nuevas del fix del Tema 10 de la DGA.
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 tema-2...");
const tema2 = await getTema("tema-2");

const nuevosEnlacesTema2 = [
  ...tema2.enlaces_boe,
  {
    pdf: "tema-2-ley7-2018-aragon",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-11932",
    titulo: "Ley 7/2018, de igualdad de oportunidades entre mujeres y hombres en Aragón",
  },
  {
    pdf: "tema-2-ley5-2019-discapacidad",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2019-7785",
    titulo: "Ley 5/2019, de derechos y garantías de las personas con discapacidad en Aragón",
  },
];

const nuevoIndiceTema2 = [
  {
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115#a1",
    titulo: "LO 3/2007, Título preliminar: objeto y ámbito de la ley",
    seccion: "loiemh-titulo-preliminar",
    articulos: "arts. 1-2",
  },
  ...tema2.indice_estudio,
  {
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-11932#a16",
    titulo: "Ley 7/2018 de Aragón, Título II: políticas públicas para la igualdad de género",
    seccion: "ley7-2018-titulo2-igualdad-genero",
    articulos: "arts. 16-28",
  },
  {
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2019-7785#a27",
    titulo: "Ley 5/2019 de Aragón: medidas en materia de empleo público",
    seccion: "ley5-2019-empleo-publico",
    articulos: "arts. 27-28",
  },
];

await patchTema("tema-2", { enlaces_boe: nuevosEnlacesTema2, indice_estudio: nuevoIndiceTema2 });
console.log("   ✓ tema-2 actualizado");

// ─────────────────────────────────────────────────────────────────────────
// tema-30: añade administracion-consultiva del fix del Tema 5 de la DGA.
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 tema-30...");
const tema30 = await getTema("tema-30");

const nuevosEnlacesTema30 = [
  ...tema30.enlaces_boe,
  {
    pdf: "tema-30-lo-consejo-estado",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1980-8648",
    titulo: "Ley Orgánica 3/1980, del Consejo de Estado",
  },
  {
    pdf: "tema-30-ley-consejo-consultivo-aragon",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-7196",
    titulo: "Ley 1/2009, del Consejo Consultivo de Aragón",
  },
];

const nuevoIndiceTema30 = [
  ...tema30.indice_estudio,
  {
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-7196#a1",
    titulo: "La Administración consultiva: el Consejo de Estado y el Consejo Consultivo de Aragón",
    seccion: "administracion-consultiva",
    articulos: "LO 3/1980 (Consejo de Estado); Ley 1/2009, arts. 1-19 (Consejo Consultivo de Aragón)",
  },
];

await patchTema("tema-30", { enlaces_boe: nuevosEnlacesTema30, indice_estudio: nuevoIndiceTema30 });
console.log("   ✓ tema-30 actualizado");

console.log("✅ Índices de estudio completados: los recortes de la DGA (Tema 5 y Tema 10) ya muestran el temario íntegro, no solo test/flashcards.");
