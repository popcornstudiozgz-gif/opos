/**
 * Índice de estudio — Tema 1 (Constitución Española).
 *
 * Rellena `temas.indice_estudio` (ver `0010_temas_indice_estudio.sql`): un
 * punto por título/capítulo, con su rango de artículos y un enlace directo
 * al BOE anclado en el artículo inicial (`#aN` — comprobado a mano que el
 * texto consolidado de la CE en el BOE lleva ese ancla por artículo).
 * `seccion` coincide 1:1 con la `seccion` que ya usan las flashcards/
 * preguntas de este tema (ver `scripts/seed-preguntas-tema-1*.mjs`) y con
 * el nombre de archivo en `content-raw/constitucion-espanola/`, de donde
 * salen los rangos de artículos (comprobados con `grep -oE '^Artículo
 * [0-9]+'` sobre cada fichero).
 *
 * Idempotente: es un PATCH que sobreescribe la columna entera, se puede
 * relanzar sin duplicar nada.
 *
 * Uso: node --env-file=.env.local scripts/seed-indice-estudio-tema-1.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA_SLUG = "tema-1";
const BOE_ID = "BOE-A-1978-31229";
const boe = (articulo) => `https://www.boe.es/buscar/act.php?id=${BOE_ID}${articulo ? `#a${articulo}` : ""}`;

const p = (seccion, titulo, primerArticulo, ultimoArticulo) => ({
  seccion,
  titulo,
  articulos: primerArticulo == null ? undefined : primerArticulo === ultimoArticulo ? `art. ${primerArticulo}` : `arts. ${primerArticulo}-${ultimoArticulo}`,
  url: boe(primerArticulo),
});

const INDICE_ESTUDIO = [
  p("titulo-preliminar", "Título Preliminar", 1, 9),
  p("titulo-1-cap-1", "Título I, Cap. I: De los españoles y los extranjeros", 10, 13),
  p("titulo-1-cap-2", "Título I, Cap. II: Derechos y libertades", 14, 38),
  p("titulo-1-cap-3", "Título I, Cap. III: Principios rectores de la política social y económica", 39, 52),
  p("titulo-1-cap-4", "Título I, Cap. IV: Garantías de las libertades y derechos", 53, 54),
  p("titulo-1-cap-5", "Título I, Cap. V: Suspensión de los derechos y libertades", 55, 55),
  p("titulo-2", "Título II: La Corona", 56, 65),
  p("titulo-3-cap-1", "Título III, Cap. I: Las Cámaras", 66, 80),
  p("titulo-3-cap-2", "Título III, Cap. II: La elaboración de las leyes", 81, 92),
  p("titulo-3-cap-3", "Título III, Cap. III: Los tratados internacionales", 93, 96),
  p("titulo-4", "Título IV: Del Gobierno y de la Administración", 97, 107),
  p("titulo-5", "Título V: De las relaciones entre el Gobierno y las Cortes Generales", 108, 116),
  p("titulo-6", "Título VI: Del Poder Judicial", 117, 127),
  p("titulo-7", "Título VII: Economía y Hacienda", 128, 136),
  p("titulo-8-cap-1", "Título VIII, Cap. I: Principios generales", 137, 139),
  p("titulo-8-cap-2", "Título VIII, Cap. II: La Administración Local", 140, 142),
  p("titulo-8-cap-3", "Título VIII, Cap. III: De las Comunidades Autónomas", 143, 158),
  p("titulo-9", "Título IX: Del Tribunal Constitucional", 159, 165),
  p("titulo-10", "Título X: De la reforma constitucional", 166, 169),
  // Sin numeración de artículos propia (disposiciones adicional/transitoria/derogatoria/final):
  // enlace a la norma sin ancla, no hay un `#aN` fiable al que apuntar.
  { seccion: "disposiciones", titulo: "Disposiciones adicionales, transitorias, derogatoria y final", url: boe(null) },
];

async function main() {
  const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${TEMA_SLUG}`, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ indice_estudio: INDICE_ESTUDIO }),
  });
  if (!res.ok) {
    console.error(`❌ ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const [row] = await res.json();
  console.log(`✅ Índice de estudio de ${TEMA_SLUG} actualizado: ${row.indice_estudio.length} puntos.`);
}

main();
