/**
 * Crea tema-275: "Infracciones administrativas y penales en la
 * conducción. Alcoholemia. Drogas. Velocidad. Sanciones" — Tema 15
 * (numero=15, bloque-2) de Oficial Conductor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea
 * 1584):
 *   "Infracciones administrativas y penales en la conducción.
 *   Alcoholemia. Drogas. Velocidad. Sanciones."
 *
 * Sourcing: normativa real y verificada — Real Decreto Legislativo
 * 6/2015 (BOE-A-2015-11722, ya usado en tema-272) para el régimen de
 * infracciones y sanciones administrativas, y los artículos 379 a 385
 * del Código Penal (Ley Orgánica 10/1995, delitos contra la seguridad
 * vial) para la vertiente penal de alcoholemia, drogas y velocidad.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-275-infracciones-administrativas-penales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-275";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Infracciones administrativas y penales en la conducción",
  descripcion: "El régimen de infracciones y sanciones del RDLeg 6/2015: leves, graves y muy graves. Los delitos contra la seguridad vial (arts. 379-385 CP): alcoholemia, drogas y exceso de velocidad.",
  contenido: "Desarrolla la doble vertiente, administrativa y penal, de las infracciones relacionadas con la conducción: el régimen de infracciones leves, graves y muy graves del Real Decreto Legislativo 6/2015, y los delitos contra la seguridad vial regulados en los artículos 379 a 385 del Código Penal, con especial atención a la conducción bajo los efectos del alcohol o las drogas y al exceso de velocidad como conductas que pueden alcanzar relevancia penal, no solo administrativa.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", titulo: "Real Decreto Legislativo 6/2015 (régimen de infracciones y sanciones)" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", titulo: "Ley Orgánica 10/1995, del Código Penal (arts. 379-385: delitos contra la seguridad vial)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", titulo: "Infracciones y sanciones administrativas", seccion: "infracciones-y-sanciones-administrativas", articulos: "RDLeg 6/2015" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", titulo: "Delitos contra la seguridad vial: alcoholemia y drogas", seccion: "delitos-seguridad-vial-alcoholemia-y-drogas", articulos: "Código Penal, arts. 379-380" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", titulo: "Delitos contra la seguridad vial: velocidad y otras conductas", seccion: "delitos-seguridad-vial-velocidad-y-otras-conductas", articulos: "Código Penal, arts. 379-385" },
  ],
}]);

const S1 = "infracciones-y-sanciones-administrativas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo clasifica el Real Decreto Legislativo 6/2015 las infracciones administrativas de tráfico?", reverso: "En leves, graves y muy graves, según la naturaleza de la norma infringida y el riesgo que genere para la seguridad vial, cada una con su propia sanción económica asociada" },
  { anverso: "¿Qué ejemplo de infracción leve recoge con carácter general esta normativa?", reverso: "Incumplimientos de normas de circulación que no revistan especial gravedad ni pongan en riesgo directo a otros usuarios de la vía, y que no estén tipificados expresamente como graves o muy graves" },
  { anverso: "¿Qué ejemplo de infracción muy grave, con pérdida de puntos, recoge esta normativa?", reverso: "Conducir con una tasa de alcoholemia superior a la permitida (sin llegar al umbral penal), circular a una velocidad muy superior a la permitida, o utilizar de forma manual el teléfono móvil mientras se conduce, entre otras" },
  { anverso: "¿Qué es la sanción accesoria de detracción de puntos?", reverso: "La pérdida de puntos del permiso de conducción que acompaña, además de la sanción económica, a determinadas infracciones graves y muy graves expresamente tipificadas por la normativa" },
  { anverso: "¿Qué diferencia existe entre una infracción administrativa y un delito contra la seguridad vial?", reverso: "La infracción administrativa se sanciona por vía administrativa (multa, y en su caso pérdida de puntos); el delito, tipificado en el Código Penal, conlleva un proceso judicial y puede acarrear penas de prisión, multa penal o privación del derecho a conducir, al tratarse de conductas de mayor gravedad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo clasifica el RDLeg 6/2015 las infracciones administrativas de tráfico?", explicacion: "En leves, graves y muy graves.", dificultad: "facil", opciones: ["En leves, graves y muy graves", "Únicamente en leves y graves, sin una categoría de muy graves", "Únicamente en graves y muy graves, sin una categoría de leves", "En una única categoría común, sin distinción de gravedad"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una infracción leve, con carácter general?", explicacion: "Incumplimientos sin especial gravedad ni riesgo directo, no tipificados como graves o muy graves.", dificultad: "media", opciones: ["Incumplimientos sin especial gravedad ni riesgo directo", "Conducir con una tasa de alcoholemia superior a la permitida", "Circular a una velocidad muy superior a la permitida en la vía", "Utilizar de forma manual el teléfono móvil mientras se conduce"], correcta: 0 },
  { enunciado: "¿Qué tipo de infracción es, con carácter general, conducir con alcoholemia superior a la permitida (sin llegar al umbral penal)?", explicacion: "Una infracción muy grave, con detracción de puntos.", dificultad: "media", opciones: ["Una infracción muy grave, con detracción de puntos", "Una infracción leve, sin ninguna detracción de puntos asociada", "No constituye ninguna infracción si el conductor no causa un accidente", "Una infracción exclusivamente de carácter penal, nunca administrativa"], correcta: 0 },
  { enunciado: "¿Qué es la sanción accesoria de detracción de puntos?", explicacion: "La pérdida de puntos que acompaña a determinadas infracciones graves y muy graves.", dificultad: "media", opciones: ["La pérdida de puntos que acompaña a ciertas infracciones", "Una sanción económica adicional a la multa principal impuesta", "Un curso obligatorio de formación tras cualquier infracción leve", "La suspensión automática de la ITV del vehículo implicado"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre una infracción administrativa y un delito contra la seguridad vial?", explicacion: "La administrativa se sanciona por vía administrativa; el delito conlleva proceso judicial y penas.", dificultad: "dificil", opciones: ["La administrativa es multa; el delito conlleva proceso judicial", "Ambas se sancionan exactamente de la misma forma administrativa", "El delito nunca conlleva la posibilidad de pena de prisión real", "La infracción administrativa siempre es más grave que cualquier delito"], correcta: 0 },
]);

const S2 = "delitos-seguridad-vial-alcoholemia-y-drogas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué establece el artículo 379 del Código Penal sobre la conducción bajo los efectos del alcohol?", reverso: "Que constituye delito conducir un vehículo de motor bajo la influencia de bebidas alcohólicas, considerándose en todo caso cometido el delito cuando se conduzca con una tasa de alcohol en aire espirado superior a 0,60 mg/l, o de 1,2 g/l en sangre" },
  { anverso: "¿Qué pena general prevé el artículo 379 del Código Penal para el delito de conducción bajo la influencia del alcohol o las drogas?", reverso: "Prisión de tres a seis meses, o multa de seis a doce meses, o trabajos en beneficio de la comunidad de treinta y uno a noventa días, y en cualquier caso, privación del derecho a conducir vehículos de motor de uno a cuatro años" },
  { anverso: "¿Qué regula el artículo 382 bis del Código Penal en relación con las pruebas de alcoholemia?", reverso: "El delito de negativa a someterse a las pruebas legalmente establecidas para la comprobación de las tasas de alcoholemia y la presencia de drogas tóxicas, estupefacientes o sustancias psicotrópicas" },
  { anverso: "¿Qué diferencia existe entre conducir con una tasa de alcoholemia por encima del límite administrativo y hacerlo por encima del umbral penal del artículo 379?", reverso: "Por debajo del umbral penal (0,60 mg/l en aire espirado) pero por encima del límite administrativo, la conducta constituye infracción administrativa muy grave; al superar ese umbral, la conducta constituye delito contra la seguridad vial" },
  { anverso: "¿Es necesario haber causado un accidente para que la conducción bajo los efectos del alcohol o las drogas constituya delito, según el artículo 379?", reverso: "No, el delito de conducción bajo la influencia del alcohol o las drogas es un delito de riesgo, que se consuma por el propio hecho de conducir en esas condiciones, sin necesidad de haber causado un accidente o un resultado lesivo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué establece el artículo 379 del Código Penal sobre el umbral de alcoholemia constitutivo de delito?", explicacion: "Superior a 0,60 mg/l en aire espirado o 1,2 g/l en sangre.", dificultad: "facil", opciones: ["Superior a 0,60 mg/l en aire espirado o 1,2 g/l en sangre", "Superior a 0,15 mg/l en aire espirado, sin ninguna otra referencia", "No existe ningún umbral concreto establecido en el Código Penal", "Superior a 2 g/l en sangre, sin ninguna referencia al aire espirado"], correcta: 0 },
  { enunciado: "¿Qué pena general prevé el artículo 379 CP para este delito?", explicacion: "Prisión de 3 a 6 meses, multa de 6 a 12 meses o trabajos comunitarios, y privación del derecho a conducir de 1 a 4 años.", dificultad: "media", opciones: ["Prisión, multa o trabajos comunitarios, y privación del derecho a conducir", "Únicamente una multa administrativa, sin ninguna consecuencia penal real", "Únicamente la retirada temporal del vehículo, sin ninguna otra consecuencia", "Cadena perpetua, con independencia de las circunstancias concretas del caso"], correcta: 0 },
  { enunciado: "¿Qué regula el artículo 382 bis del Código Penal?", explicacion: "El delito de negativa a someterse a las pruebas de alcoholemia o drogas.", dificultad: "media", opciones: ["El delito de negativa a someterse a las pruebas de alcoholemia o drogas", "El delito de exceso de velocidad, sin relación con el alcohol o las drogas", "El delito de conducir sin el permiso de conducción correspondiente", "El delito de abandono del lugar del accidente tras una colisión"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre superar el límite administrativo y superar el umbral penal de alcoholemia?", explicacion: "Por debajo del umbral penal es infracción administrativa; por encima, delito.", dificultad: "media", opciones: ["Por debajo del umbral penal es infracción administrativa; por encima, delito", "Ambas situaciones constituyen exactamente el mismo tipo de infracción", "El límite administrativo siempre es superior al umbral penal establecido", "No existe ninguna diferencia real entre ambos límites establecidos"], correcta: 0 },
  { enunciado: "¿Es necesario causar un accidente para que la conducción bajo los efectos del alcohol constituya delito?", explicacion: "No, es un delito de riesgo que se consuma por el propio hecho de conducir así.", dificultad: "dificil", opciones: ["No, es un delito de riesgo que se consuma por conducir en esas condiciones", "Sí, es imprescindible haber causado un accidente con resultado lesivo real", "Sí, es imprescindible que se produzcan daños materiales en otro vehículo", "No existe delito en ningún caso si no se produce un resultado lesivo real"], correcta: 0 },
]);

const S3 = "delitos-seguridad-vial-velocidad-y-otras-conductas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué umbral de exceso de velocidad recoge el artículo 379 del Código Penal como constitutivo de delito?", reverso: "Conducir superando en 60 km/h en vía urbana o en 80 km/h en vía interurbana la velocidad máxima genérica permitida, con independencia de la velocidad concreta permitida en el tramo específico" },
  { anverso: "¿Qué regula el artículo 380 del Código Penal?", reverso: "El delito de conducción temeraria, cometido por quien condujere un vehículo de motor con temeridad manifiesta y pusiere en concreto peligro la vida o la integridad de las personas" },
  { anverso: "¿Qué regula el artículo 381 del Código Penal, y en qué se diferencia del delito de conducción temeraria del artículo 380?", reverso: "El delito de conducción con manifiesto desprecio por la vida de los demás, una modalidad agravada de la conducción temeraria que exige un elemento subjetivo adicional de indiferencia hacia el resultado, con penas superiores a las del artículo 380" },
  { anverso: "¿Qué regula el artículo 384 del Código Penal?", reverso: "El delito de conducir un vehículo de motor sin haber obtenido nunca el permiso o licencia de conducción correspondiente, o tras haber sido privado del mismo por decisión judicial o por pérdida total de vigencia por puntos" },
  { anverso: "¿Qué regula el artículo 382 bis y qué relación guarda con el abandono del lugar del accidente?", reverso: "El artículo 382 del Código Penal (no confundir con el 382 bis, relativo a la negativa a las pruebas) contempla como agravante el abandono del lugar del accidente por quien lo hubiera causado en el marco de un delito contra la seguridad vial con resultado lesivo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué umbral de exceso de velocidad constituye delito según el artículo 379 CP?", explicacion: "60 km/h en vía urbana u 80 km/h en vía interurbana sobre la velocidad máxima genérica.", dificultad: "facil", opciones: ["60 km/h en vía urbana u 80 km/h en vía interurbana", "10 km/h en cualquier tipo de vía, urbana o interurbana", "No existe ningún umbral de velocidad que constituya delito en España", "200 km/h en cualquier tipo de vía, urbana o interurbana"], correcta: 0 },
  { enunciado: "¿Qué regula el artículo 380 del Código Penal?", explicacion: "El delito de conducción temeraria con puesta en concreto peligro de la vida o integridad de las personas.", dificultad: "media", opciones: ["El delito de conducción temeraria con peligro concreto para las personas", "El delito exclusivo de exceso de velocidad, sin ninguna otra circunstancia", "El delito exclusivo de conducir sin el permiso de conducción correspondiente", "El delito exclusivo de negativa a someterse a las pruebas de alcoholemia"], correcta: 0 },
  { enunciado: "¿Qué diferencia al delito del artículo 381 del delito de conducción temeraria del artículo 380?", explicacion: "Exige un elemento subjetivo adicional de manifiesto desprecio por la vida de los demás.", dificultad: "media", opciones: ["Exige manifiesto desprecio por la vida de los demás, con penas superiores", "Ambos artículos regulan exactamente el mismo delito, sin diferencia real", "El artículo 381 solo se aplica a infracciones de velocidad, no de temeridad", "El artículo 380 conlleva siempre penas superiores a las del artículo 381"], correcta: 0 },
  { enunciado: "¿Qué regula el artículo 384 del Código Penal?", explicacion: "El delito de conducir sin haber obtenido nunca el permiso o tras su privación.", dificultad: "media", opciones: ["El delito de conducir sin haber obtenido nunca el permiso o tras su privación", "El delito exclusivo de exceso de velocidad en vía interurbana", "El delito exclusivo de conducción bajo los efectos de sustancias estupefacientes", "El delito exclusivo de negativa a someterse a las pruebas de alcoholemia"], correcta: 0 },
  { enunciado: "¿Qué contempla el artículo 382 del Código Penal en relación con el abandono del lugar del accidente?", explicacion: "Un agravante para quien abandona el lugar tras causar un accidente en un delito contra la seguridad vial con resultado lesivo.", dificultad: "dificil", opciones: ["Un agravante por abandonar el lugar tras causar un accidente con resultado lesivo", "Ninguna previsión relacionada con el abandono del lugar del accidente", "Una exención de responsabilidad para quien abandona el lugar del accidente", "Una previsión exclusiva para accidentes sin ningún resultado lesivo real"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Infracción muy grave", definicion: "Categoría de infracción administrativa de tráfico de mayor gravedad, que suele llevar aparejada la sanción accesoria de detracción de puntos del permiso de conducción." },
  { tema_slug: TEMA, seccion: S1, termino: "Detracción de puntos", definicion: "Sanción accesoria consistente en la pérdida de puntos del permiso de conducción, asociada a determinadas infracciones graves y muy graves." },
  { tema_slug: TEMA, seccion: S2, termino: "Delito de riesgo", definicion: "Delito que se consuma por el propio hecho de realizar una conducta peligrosa, sin necesidad de que se produzca un resultado lesivo, como la conducción bajo los efectos del alcohol o las drogas." },
  { tema_slug: TEMA, seccion: S2, termino: "Tasa de alcoholemia", definicion: "Concentración de alcohol en el organismo, medida en aire espirado (mg/l) o en sangre (g/l), cuyo umbral penal fija el artículo 379 del Código Penal." },
  { tema_slug: TEMA, seccion: S3, termino: "Conducción temeraria", definicion: "Delito tipificado en el artículo 380 del Código Penal, cometido por quien conduce con temeridad manifiesta poniendo en concreto peligro la vida o la integridad de las personas." },
  { tema_slug: TEMA, seccion: S3, termino: "Privación del derecho a conducir", definicion: "Pena accesoria que puede imponerse junto a la principal en los delitos contra la seguridad vial, distinta de la pérdida de vigencia administrativa del permiso por puntos." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-275 creado y vinculado como Tema 15 de Oficial Conductor General.");
