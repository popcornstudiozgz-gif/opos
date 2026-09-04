/**
 * Crea tema-288: "Instalaciones de agua caliente sanitaria (ACS)" — Tema 12
 * (numero=12, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases1716.pdf, línea 528):
 * "Instalaciones de agua caliente sanitaria. Tipos, materiales y
 * características. CTE-HS4."
 *
 * Sourcing: CTE, Documento Básico HS Salubridad, Sección HS4, apartado
 * 3.2.2 (Instalaciones de agua caliente sanitaria: distribución,
 * impulsión y retorno, regulación y control) y tabla 2.1 (caudales
 * instantáneos mínimos de ACS por aparato) — texto oficial descargado de
 * codigotecnico.org en esta sesión, mismo documento ya usado en tema-284
 * (Instalaciones interiores de agua fría) y tema-285 (pruebas de
 * estanquidad).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-288-agua-caliente-sanitaria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-288";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Instalaciones de agua caliente sanitaria (ACS)",
  descripcion: "Tipos de producción de ACS (individual y centralizada). Caudales instantáneos mínimos de ACS por aparato. La red de retorno: cuándo es obligatoria y cómo se compone. Regulación y control de la temperatura de preparación y distribución.",
  contenido: "Desarrolla las instalaciones de agua caliente sanitaria (ACS) conforme al CTE DB-HS4: los tipos de producción (individual y centralizada), los caudales instantáneos mínimos exigidos para cada aparato, las condiciones de diseño de la red de distribución —impulsión y retorno— y cuándo es obligatoria una red de retorno, y la regulación y control de la temperatura de preparación y distribución del agua caliente sanitaria.",
  enlaces_boe: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "CTE, Documento Básico HS Salubridad, Sección HS4, apartado 3.2.2 (Instalaciones de ACS)" },
  ],
  indice_estudio: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Tipos y caudales de ACS", seccion: "tipos-y-caudales-de-acs", articulos: "CTE DB-HS4, tabla 2.1" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "La red de retorno de ACS", seccion: "la-red-de-retorno-de-acs", articulos: "CTE DB-HS4, apartado 3.2.2.1" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Regulación y control de la temperatura", seccion: "regulacion-y-control-de-la-temperatura", articulos: "CTE DB-HS4, apartados 2.1.3 y 3.2.2.2" },
  ],
}]);

const S1 = "tipos-y-caudales-de-acs";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué diferencia hay entre una instalación de producción de ACS individual y una centralizada?", reverso: "En la individual, cada vivienda o unidad de consumo dispone de su propio equipo de producción (caldera o calentador); en la centralizada, un único equipo (o batería de equipos) produce ACS para todo el edificio, distribuyéndola después por una red común" },
  { anverso: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de ACS exige una ducha?", reverso: "0,10 dm³/s, la mitad del caudal instantáneo mínimo de agua fría exigido para el mismo aparato (0,20 dm³/s)" },
  { anverso: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de ACS exige un lavabo?", reverso: "0,065 dm³/s" },
  { anverso: "¿Qué aparatos, según la tabla 2.1 del CTE DB-HS4, no tienen exigido ningún caudal instantáneo mínimo de ACS, a diferencia del de agua fría?", reverso: "El inodoro (con cisterna o con fluxor), el urinario, el grifo de garaje y el vertedero, entre otros: son aparatos que solo requieren agua fría, no agua caliente sanitaria" },
  { anverso: "¿Qué exige el CTE DB-HS4 en los edificios sujetos a la contribución mínima de energía renovable para ACS (sección HE-4 del DB-HE), además de las tomas de agua fría de lavadora y lavavajillas?", reverso: "Disponer también sendas tomas de agua caliente en esos puntos, para permitir la instalación de equipos bitérmicos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué diferencia hay entre una producción de ACS individual y una centralizada?", explicacion: "Individual: un equipo por vivienda. Centralizada: un equipo común para todo el edificio.", dificultad: "facil", opciones: ["En la individual cada vivienda tiene su propio equipo; en la centralizada un equipo común produce ACS para todo el edificio", "Ambas son exactamente lo mismo, sin ninguna diferencia real entre sí", "La individual solo existe en edificios de más de veinte viviendas", "La centralizada nunca requiere ningún tipo de red de distribución"], correcta: 0 },
  { enunciado: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de ACS exige una ducha?", explicacion: "0,10 dm³/s.", dificultad: "media", opciones: ["0,10 dm³/s", "0,20 dm³/s", "0,065 dm³/s", "0,30 dm³/s"], correcta: 0 },
  { enunciado: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de ACS exige un lavabo?", explicacion: "0,065 dm³/s.", dificultad: "media", opciones: ["0,065 dm³/s", "0,10 dm³/s", "0,20 dm³/s", "0,05 dm³/s"], correcta: 0 },
  { enunciado: "¿Qué aparato de los siguientes NO tiene exigido caudal instantáneo mínimo de ACS según la tabla 2.1?", explicacion: "El inodoro (con cisterna o fluxor) solo requiere agua fría.", dificultad: "dificil", opciones: ["El inodoro con cisterna", "La ducha", "El lavabo", "El fregadero doméstico"], correcta: 0 },
  { enunciado: "¿Qué exige el CTE DB-HS4, además de las tomas de agua fría, en edificios sujetos a la contribución mínima de energía renovable para ACS?", explicacion: "Tomas de agua caliente en lavadora y lavavajillas, para equipos bitérmicos.", dificultad: "dificil", opciones: ["Disponer también de tomas de agua caliente para lavadora y lavavajillas, para equipos bitérmicos", "Prescindir por completo de cualquier toma de agua fría en esos puntos", "Instalar exclusivamente producción de ACS de tipo individual, nunca centralizada", "Eliminar la obligación de instalar ningún tipo de red de retorno en el edificio"], correcta: 0 },
]);

const S2 = "la-red-de-retorno-de-acs";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuándo es obligatorio disponer una red de retorno en una instalación de ACS, según el CTE DB-HS4?", reverso: "Cuando la longitud de la tubería de ida al punto de consumo más alejado sea igual o mayor que 15 metros" },
  { anverso: "¿Qué finalidad tiene la red de retorno de una instalación de ACS?", reverso: "Mantener el agua caliente en circulación continua, para que al abrir un grifo el agua salga caliente casi de inmediato, sin tener que dejarla correr hasta vaciar toda el agua fría acumulada en la tubería" },
  { anverso: "¿Cómo debe realizarse el retorno en los montantes de una instalación de ACS, según el CTE DB-HS4?", reverso: "Desde la parte superior del montante y por debajo de la última derivación particular, con válvulas de asiento en su base para regular y equilibrar hidráulicamente el retorno" },
  { anverso: "¿Qué equipo se dispone habitualmente para hacer circular el agua por la red de retorno, salvo en viviendas unifamiliares o instalaciones pequeñas?", reverso: "Una bomba de recirculación doble, de montaje paralelo o «gemelas», funcionando de forma análoga a las de un grupo de presión de agua fría" },
  { anverso: "¿Qué precaución exige el CTE DB-HS4 para las tuberías de ACS por los movimientos de dilatación térmica?", reverso: "Disponer las tuberías y sus anclajes de forma que dilaten libremente, según lo establecido en el Reglamento de Instalaciones Térmicas en los Edificios (RITE) para las redes de calefacción" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿A partir de qué longitud de tubería de ida es obligatoria una red de retorno de ACS?", explicacion: "A partir de 15 metros.", dificultad: "facil", opciones: ["15 metros", "5 metros", "50 metros", "No es obligatoria en ningún caso"], correcta: 0 },
  { enunciado: "¿Qué finalidad tiene la red de retorno de una instalación de ACS?", explicacion: "Mantener el agua en circulación para que salga caliente casi de inmediato.", dificultad: "media", opciones: ["Mantener el agua caliente en circulación continua para que salga caliente casi de inmediato al abrir el grifo", "Reducir la temperatura del agua caliente antes de llegar al punto de consumo", "Medir el caudal exacto de ACS consumido en cada punto de la instalación", "Impedir por completo la circulación de agua caliente por la instalación"], correcta: 0 },
  { enunciado: "¿Dónde deben disponerse válvulas de asiento en un montante de ACS con red de retorno?", explicacion: "En la base, para regular y equilibrar hidráulicamente el retorno.", dificultad: "media", opciones: ["En la base de los montantes, para regular y equilibrar hidráulicamente el retorno", "Exclusivamente en la parte superior del montante, nunca en la base", "Exclusivamente en el punto de consumo más alejado de la instalación", "En ningún punto: el CTE DB-HS4 no exige ninguna válvula de asiento"], correcta: 0 },
  { enunciado: "¿Qué equipo hace circular habitualmente el agua por la red de retorno, salvo en instalaciones pequeñas?", explicacion: "Una bomba de recirculación doble, de montaje paralelo.", dificultad: "media", opciones: ["Una bomba de recirculación doble, de montaje paralelo", "Un grupo de presión convencional de agua fría, sin ninguna adaptación", "Un fluxor, adaptado específicamente para agua caliente sanitaria", "Ningún equipo adicional: la circulación es siempre exclusivamente por gravedad"], correcta: 0 },
  { enunciado: "¿A qué reglamento remite el CTE DB-HS4 para la dilatación de las tuberías de ACS en las distribuciones principales?", explicacion: "Al Reglamento de Instalaciones Térmicas en los Edificios (RITE).", dificultad: "dificil", opciones: ["Al Reglamento de Instalaciones Térmicas en los Edificios (RITE)", "Al Reglamento Electrotécnico para Baja Tensión (REBT)", "Al Real Decreto 140/2003 de calidad del agua de consumo humano", "A la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua"], correcta: 0 },
]);

const S3 = "regulacion-y-control-de-la-temperatura";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Entre qué valores debe estar comprendida la temperatura de ACS en los puntos de consumo, según el CTE DB-HS4?", reverso: "Entre 50 ºC y 65 ºC, excepto en instalaciones de viviendas de uso exclusivo que no afecten al ambiente exterior de esos edificios" },
  { anverso: "¿Qué se regula y controla en una instalación de ACS según el apartado 3.2.2.2 del CTE DB-HS4?", reverso: "La temperatura de preparación (en el equipo de producción) y la temperatura de distribución (en la red hasta los puntos de consumo)" },
  { anverso: "¿Dónde están incorporados los sistemas de regulación y control de temperatura en una instalación individual de ACS?", reverso: "En los propios equipos de producción y preparación del agua caliente" },
  { anverso: "¿Qué control exige el CTE DB-HS4 sobre la recirculación en sistemas individuales de producción directa de ACS?", reverso: "Que pueda recircularse el agua sin consumo (sin gasto real de agua) hasta que se alcance la temperatura adecuada en el punto de consumo" },
  { anverso: "¿Por qué es relevante mantener la temperatura de ACS dentro del rango 50-65 ºC, más allá del confort del usuario?", reverso: "Porque temperaturas más bajas favorecen el desarrollo de bacterias como la legionela, mientras que el rango exigido, junto con otras medidas preventivas, ayuda a controlar ese riesgo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Entre qué valores debe estar la temperatura de ACS en los puntos de consumo, según el CTE DB-HS4?", explicacion: "Entre 50ºC y 65ºC, con la excepción de viviendas de uso exclusivo.", dificultad: "facil", opciones: ["Entre 50 ºC y 65 ºC", "Entre 20 ºC y 35 ºC", "Entre 65 ºC y 90 ºC", "Sin ningún rango de temperatura exigido por el CTE DB-HS4"], correcta: 0 },
  { enunciado: "¿Qué dos aspectos se regulan y controlan en una instalación de ACS según el CTE DB-HS4?", explicacion: "La temperatura de preparación y la de distribución.", dificultad: "media", opciones: ["La temperatura de preparación y la temperatura de distribución", "Exclusivamente el caudal máximo admisible en cada punto de consumo", "Exclusivamente la presión máxima admisible en la acometida general", "Exclusivamente el diámetro de las tuberías de la instalación"], correcta: 0 },
  { enunciado: "¿Dónde están incorporados los sistemas de regulación y control de temperatura en una instalación individual de ACS?", explicacion: "En los propios equipos de producción y preparación.", dificultad: "media", opciones: ["En los propios equipos de producción y preparación del agua caliente", "Exclusivamente en un panel de control centralizado, ajeno al equipo de producción", "Exclusivamente en el contador general del edificio", "En ningún elemento concreto: la regulación es siempre manual en cada grifo"], correcta: 0 },
  { enunciado: "¿Qué exige el CTE DB-HS4 sobre la recirculación en sistemas individuales de producción directa de ACS?", explicacion: "Que pueda recircularse sin consumo hasta alcanzar la temperatura adecuada.", dificultad: "dificil", opciones: ["Que pueda recircularse el agua sin consumo hasta alcanzar la temperatura adecuada", "Que se prohíba cualquier tipo de recirculación en sistemas individuales", "Que la recirculación solo pueda hacerse mediante bomba de recirculación doble", "Que la temperatura de recirculación supere siempre los 65 ºC en cualquier caso"], correcta: 0 },
  { enunciado: "¿Por qué es relevante mantener la temperatura de ACS dentro del rango exigido, además de por el confort?", explicacion: "Porque temperaturas bajas favorecen el desarrollo de bacterias como la legionela.", dificultad: "dificil", opciones: ["Porque temperaturas más bajas favorecen el desarrollo de bacterias como la legionela", "Porque no existe ninguna relación entre la temperatura del agua y el riesgo sanitario", "Porque una temperatura más alta reduce siempre el caudal disponible en la instalación", "Porque el rango de temperatura solo afecta al color visible del agua suministrada"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Producción centralizada de ACS", definicion: "Sistema en el que un único equipo (o batería de equipos) produce agua caliente sanitaria para todo un edificio, distribuida después por una red común." },
  { tema_slug: TEMA, seccion: S1, termino: "Equipo bitérmico", definicion: "Equipo capaz de utilizar tanto agua fría como agua precalentada (agua caliente) como entrada, aprovechando el ACS ya disponible para reducir el consumo energético." },
  { tema_slug: TEMA, seccion: S2, termino: "Red de retorno", definicion: "Circuito que devuelve el agua caliente no consumida desde el extremo de la red de impulsión hasta el equipo de producción, manteniéndola en circulación continua." },
  { tema_slug: TEMA, seccion: S2, termino: "Bomba de recirculación doble", definicion: "Conjunto de dos bombas montadas en paralelo, de funcionamiento alterno, empleadas para hacer circular el agua por la red de retorno de ACS." },
  { tema_slug: TEMA, seccion: S3, termino: "Temperatura de preparación", definicion: "Temperatura a la que se produce el agua caliente sanitaria en el propio equipo de producción, antes de su distribución." },
  { tema_slug: TEMA, seccion: S3, termino: "Legionela", definicion: "Bacteria cuyo desarrollo se ve favorecido por temperaturas del agua por debajo del rango exigido para el ACS, de ahí la importancia de mantener la temperatura mínima establecida." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-288 creado y vinculado como Tema 12 de Oficial Fontanero.");
