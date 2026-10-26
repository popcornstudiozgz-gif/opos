/**
 * Da de alta administrativo-ayto-zaragoza: Administrativa/o del Ayuntamiento
 * de Zaragoza (Escala de Administración General, Subescala Administrativa,
 * grupo C1), que se convoca solo por promoción interna desde Auxiliar
 * Administrativo; sus dos bloques y los 7 temas que reutilizan canónicos.
 *
 * Fuente del temario: Anexo I de las bases específicas de la CONV 5.2bis/2025
 * (bases1739.pdf, BOP de Zaragoza núm. 267 de 20-11-2025), con la Parte
 * primera SUSTITUIDA por la rectificación del BOP núm. 278 de 3-12-2025
 * (decreto de 21-11-2025, art. 109.2 Ley 39/2015). Ambos leídos íntegros. La
 * Parte primera original (Constitución, Estatuto, capitalidad, haciendas...)
 * ya no rige; la vigente es: 1 deberes; 2 código de conducta; 3 calendario
 * laboral y Acuerdo de condiciones de trabajo; 4 jornada, permisos y
 * vacaciones; 5 evaluación del desempeño (art. 20 TREBEP); 6 faltas
 * disciplinarias (arts. 93 y 95 TREBEP); 7 PRL: objeto y carácter; 8 Plan
 * de Igualdad del Ayuntamiento. La Parte segunda (temas 9-32) divide la Ley
 * 39/2015 en 24 temas.
 *
 * `numero` = número oficial (1-32). Temas nuevos: slug = 422 + número
 * (tema-424 a tema-454, salvo los números que reutilizan). Cada tema solo
 * puede vincularse una vez por oposición (PK tema_slug + oposicion_slug),
 * así que de los canónicos de la Ley 39/2015 (tema-4 a tema-8) se reutiliza
 * cada uno en el único número cuyo enunciado coincide con un capítulo
 * completo, y el resto de números van a temas nuevos:
 *  - 1 → tema-17, recortado a `deberes-codigo-conducta` (arts. 52-54 TREBEP).
 *  - 6 → tema-18, recortado a `regimen-disciplinario` (arts. 93-98 TREBEP;
 *    incluye los arts. 93 y 95 que pide el enunciado).
 *  - 7 → tema-44, recortado a `ley-prl-objeto-caracter-norma` (enunciado
 *    literal de su sección).
 *  - 8 → tema-2, recortado a `plan-igualdad-zaragoza`.
 *  - 9 → tema-4 [titulo-1-cap-1] (arts. 3-8: capacidad de obrar e interesado).
 *  - 11 → tema-5 [titulo-2-cap-1] (arts. 13-28: normas generales de actuación).
 *  - 28 → tema-8 [titulo-5-cap-1] (arts. 106-111: revisión de oficio).
 *  Los Temas 13 y 16 se vincularon primero a tema-6 y tema-7, pero con ese
 *  recorte apenas tenían preguntas; ahora son los temas dedicados tema-435 y
 *  tema-438 (ver fix-administrativo-ayto-temas-dedicados-13-16.mjs).
 *
 * Uso: node --env-file=.env.local scripts/seed-administrativo-ayto-setup-y-reutilizados.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

const OPOSICION_SLUG = "administrativo-ayto-zaragoza";
const NOMBRE = "Administrativo/a";

const TEMAS_REUTILIZADOS = [
  { temaSlug: "tema-17", numero: 1, parte: 1, secciones: ["deberes-codigo-conducta"] },
  { temaSlug: "tema-18", numero: 6, parte: 1, secciones: ["regimen-disciplinario"] },
  { temaSlug: "tema-44", numero: 7, parte: 1, secciones: ["ley-prl-objeto-caracter-norma"] },
  { temaSlug: "tema-2", numero: 8, parte: 1, secciones: ["plan-igualdad-zaragoza"] },
  { temaSlug: "tema-4", numero: 9, parte: 2, secciones: ["titulo-1-cap-1"] },
  { temaSlug: "tema-5", numero: 11, parte: 2, secciones: ["titulo-2-cap-1"] },
  { temaSlug: "tema-8", numero: 28, parte: 2, secciones: ["titulo-5-cap-1"] },
];

console.log(`🏛️  Dando de alta ${NOMBRE} (Ayuntamiento de Zaragoza)...`);
await upsert("oposiciones", [{
  slug: OPOSICION_SLUG,
  nombre: NOMBRE,
  organismo: "Ayuntamiento de Zaragoza",
  descripcion_corta: `Preparación online para ${NOMBRE} del Ayuntamiento de Zaragoza (C1, promoción interna desde Auxiliar Administrativo): temario, test, casos prácticos y simulacros.`,
  descripcion_larga:
    "Temario interactivo para preparar la promoción interna a Administrativa/o del Ayuntamiento de Zaragoza (Escala de Administración General, Subescala Administrativa, grupo C1), reservada a funcionarias y funcionarios de carrera de la plaza de Auxiliar Administrativo con dos años de antigüedad. Recoge los 32 temas del Anexo I de la convocatoria CONV 5.2bis/2025, con la Parte primera rectificada en el BOPZ de 3-12-2025: deberes y código de conducta, calendario laboral, jornada, permisos y vacaciones del Acuerdo de condiciones de trabajo del personal funcionario, evaluación del desempeño, faltas disciplinarias, prevención de riesgos laborales y Plan de Igualdad; y la Ley 39/2015 de Procedimiento Administrativo Común dividida en 24 temas, de los interesados a los recursos administrativos. Flashcards, preguntas tipo test de 3 opciones como en el examen y supuestos prácticos.",
  activa: true,
  organismo_slug: "ayuntamiento-zaragoza",
  puesto_slug: "administrativo",
}], "slug");

console.log("\n📦 Dando de alta los bloques...");
const bloques = await upsert("bloques", [
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-1", orden: 1,
    titulo: "Parte primera (común)",
    descripcion: "Temas 1 a 8, en la redacción rectificada (BOPZ núm. 278 de 3-12-2025): deberes y código de conducta, calendario laboral, jornada, permisos y vacaciones, evaluación del desempeño, faltas disciplinarias, prevención de riesgos laborales y Plan de Igualdad del Ayuntamiento. Como máximo el 10 % de las preguntas del examen.",
  },
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-2", orden: 2,
    titulo: "Parte segunda (Administrativa/o)",
    descripcion: "Temas 9 a 32: la Ley 39/2015, del Procedimiento Administrativo Común de las Administraciones Públicas, de los interesados y la actividad administrativa a los actos, el procedimiento y los recursos administrativos.",
  },
], "oposicion_slug,slug");
const bloqueId = { 1: bloques.find((b) => b.slug === "bloque-1").id, 2: bloques.find((b) => b.slug === "bloque-2").id };

console.log("\n📚 Enlazando los temas canónicos reutilizados...");
await upsert("tema_oposicion", TEMAS_REUTILIZADOS.map((t) => ({
  tema_slug: t.temaSlug,
  oposicion_slug: OPOSICION_SLUG,
  bloque_id: bloqueId[t.parte],
  numero: t.numero,
  orden: t.numero,
  es_premium: false,
  publicado: true,
  secciones_incluidas: t.secciones,
})), "tema_slug,oposicion_slug");

console.log(`\n✅ ${NOMBRE} dado de alta. bloque-1=${bloqueId[1]} bloque-2=${bloqueId[2]}`);
