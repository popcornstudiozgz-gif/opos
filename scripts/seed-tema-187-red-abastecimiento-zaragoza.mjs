/**
 * Crea tema-187: "Red de abastecimiento de agua de Zaragoza" — Tema 7
 * (numero=7, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza). Primer
 * tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 899):
 *   "Red de abastecimiento de Zaragoza. Depósitos de agua de la ciudad.
 *   Depósitos de Casablanca, Valdespartera y Academia General Militar,
 *   Subredes de la ciudad. Ámbitos de actuación. Principales arterias."
 *
 * Fuente primaria verificada mediante búsqueda y lectura en esta sesión:
 * portal oficial del Ayuntamiento de Zaragoza, "Red de abastecimiento de
 * agua" (https://www.zaragoza.es/sede/portal/infraestructuras/agua/red):
 * origen en el embalse de Yesa y el Canal Imperial de Aragón (con apoyo
 * puntual del río Ebro), potabilización y almacenamiento en los depósitos
 * de Casablanca (~148.000 m³), desde donde el agua se distribuye
 * directamente o se bombea a los depósitos secundarios de Valdespartera,
 * Canteras, Leones-Academia y Ecociudad; cinco zonas de presión; red de
 * distribución de ~1.300 km (2019), dividida en red arterial (16%, DN
 * ≥500 mm) y red de distribución (84%); seis arterias principales desde
 * Casablanca (Actur-Cartuja Ø1.400 mm, Malpica-Casetas Ø1.000-1.400 mm,
 * entre otras); telecontrol de potabilizadora, depósitos y bombeos, con
 * unos 40 sectores operativos (2019). Dato de la capacidad del depósito
 * de la Academia General Militar (23.360 m³) verificado mediante
 * búsqueda adicional (noticia municipal sobre la intervención en dichos
 * depósitos, febrero 2025, aragondigital.es / zaragoza.es).
 *
 * Tres secciones:
 * 1. origen-potabilizacion-deposito-casablanca
 * 2. depositos-secundarios-valdespartera-canteras-academia
 * 3. subredes-ambitos-actuacion-arterias-principales
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-187-red-abastecimiento-zaragoza.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-187";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Red de abastecimiento de agua de Zaragoza",
  descripcion: "Origen, potabilización y depósito de Casablanca. Depósitos secundarios de Valdespartera, Canteras y Academia General Militar. Subredes, ámbitos de actuación y arterias principales.",
  contenido: "Describe la red de abastecimiento de agua potable de la ciudad de Zaragoza: su origen en el embalse de Yesa y el Canal Imperial de Aragón, el proceso de potabilización y el papel central del depósito de Casablanca; los depósitos secundarios que reciben agua bombeada desde Casablanca (Valdespartera, Canteras, Leones-Academia y Ecociudad) y las zonas de la ciudad que abastece cada uno; y la estructura general de la red en subredes, ámbitos de actuación y arterias principales de gran diámetro.",
  enlaces_boe: [
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Origen, potabilización y depósito de Casablanca", seccion: "origen-potabilizacion-deposito-casablanca", articulos: "Ayuntamiento de Zaragoza — Red de abastecimiento de agua" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Depósitos secundarios: Valdespartera, Canteras y Academia General Militar", seccion: "depositos-secundarios-valdespartera-canteras-academia", articulos: "Ayuntamiento de Zaragoza — Red de abastecimiento de agua" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Subredes, ámbitos de actuación y arterias principales", seccion: "subredes-ambitos-actuacion-arterias-principales", articulos: "Ayuntamiento de Zaragoza — Red de abastecimiento de agua" },
  ],
}]);

const S1 = "origen-potabilizacion-deposito-casablanca";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el origen principal del agua que abastece a Zaragoza?", reverso: "El embalse de Yesa y el Canal Imperial de Aragón son las fuentes principales, con el río Ebro como apoyo puntual" },
  { anverso: "¿Dónde se potabiliza el agua antes de entrar en la red de distribución de Zaragoza?", reverso: "En la planta potabilizadora municipal, tras la cual el agua se almacena en los depósitos de Casablanca antes de su distribución" },
  { anverso: "¿Qué papel cumple el depósito de Casablanca en la red de abastecimiento de Zaragoza?", reverso: "Es el depósito central de la red: recibe el agua ya potabilizada, abastece directamente al centro histórico y otros barrios, y bombea agua hacia los depósitos secundarios de Valdespartera y Canteras" },
  { anverso: "¿Qué capacidad aproximada tiene el depósito de Casablanca?", reverso: "Aproximadamente 148.000 m³" },
  { anverso: "¿Qué zonas de la ciudad abastece directamente el depósito de Casablanca?", reverso: "El casco histórico, el centro, la Almozara, Las Fuentes, la margen izquierda del Ebro y parte de Delicias, entre otras zonas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son las fuentes principales del agua que abastece a Zaragoza?", explicacion: "El embalse de Yesa y el Canal Imperial de Aragón, con apoyo puntual del Ebro.", dificultad: "facil", opciones: ["El embalse de Yesa y el Canal Imperial de Aragón", "Exclusivamente pozos subterráneos del término municipal", "Exclusivamente el río Huerva, sin ninguna otra fuente", "Exclusivamente agua desalinizada transportada por cisterna"], correcta: 0 },
  { enunciado: "¿Qué ocurre con el agua tras ser potabilizada, antes de distribuirse por la ciudad?", explicacion: "Se almacena en los depósitos de Casablanca.", dificultad: "media", opciones: ["Se almacena en los depósitos de Casablanca", "Se vierte directamente al Canal Imperial de Aragón", "Se transporta directamente a Valdespartera sin pasar por Casablanca", "Se almacena exclusivamente en el depósito de la Academia General Militar"], correcta: 0 },
  { enunciado: "¿Qué función cumple el depósito de Casablanca respecto a los depósitos de Valdespartera y Canteras?", explicacion: "Casablanca bombea agua hacia esos depósitos secundarios.", dificultad: "media", opciones: ["Bombea agua hacia esos depósitos secundarios", "Recibe agua bombeada desde esos depósitos secundarios", "No mantiene ninguna relación operativa con esos depósitos", "Solo se conecta con ellos en caso de avería en la potabilizadora"], correcta: 0 },
  { enunciado: "¿Cuál es la capacidad aproximada del depósito de Casablanca?", explicacion: "Aproximadamente 148.000 m³.", dificultad: "media", opciones: ["Aproximadamente 148.000 m³", "Aproximadamente 14.800 m³", "Aproximadamente 1.480.000 m³", "Aproximadamente 23.360 m³"], correcta: 0 },
  { enunciado: "¿Qué zonas de Zaragoza abastece directamente el depósito de Casablanca?", explicacion: "El casco histórico, el centro, la Almozara, Las Fuentes y la margen izquierda, entre otras.", dificultad: "dificil", opciones: ["El casco histórico, el centro, la Almozara y Las Fuentes", "Exclusivamente San Gregorio y Juslibol", "Exclusivamente Montecanal y Arcosur", "Exclusivamente los polígonos industriales del término municipal"], correcta: 0 },
]);

const S2 = "depositos-secundarios-valdespartera-canteras-academia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué zonas abastece el depósito de Valdespartera?", reverso: "Casablanca (barrio), Valdefierro, Miralbueno, Oliver, Delicias, Universidad y Romareda" },
  { anverso: "¿Qué zonas abastece el depósito de Canteras?", reverso: "El área comprendida entre el río Huerva y el Canal Imperial de Aragón, incluyendo Torrero y La Paz" },
  { anverso: "¿Qué depósito abastece a la Academia General Militar y a las zonas de San Gregorio, San Juan de Mozarrifar y Juslibol?", reverso: "El depósito de Leones-Academia, situado junto a la carretera de Huesca, que recibe agua bombeada desde Casablanca" },
  { anverso: "¿Qué capacidad tiene el depósito de la Academia General Militar y cuándo se construyó?", reverso: "Una capacidad total de 23.360 m³, construido en la década de 1970" },
  { anverso: "¿Qué zonas abastece el depósito de Ecociudad?", reverso: "Los barrios del sur de la ciudad, como Montecanal y Arcosur" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué zonas abastece el depósito de Valdespartera?", explicacion: "Casablanca, Valdefierro, Miralbueno, Oliver, Delicias, Universidad y Romareda.", dificultad: "media", opciones: ["Casablanca, Valdefierro, Miralbueno, Oliver, Delicias, Universidad y Romareda", "Exclusivamente el barrio de Casablanca, sin ninguna otra zona", "San Gregorio, San Juan de Mozarrifar y Juslibol", "Montecanal y Arcosur, en el sur de la ciudad"], correcta: 0 },
  { enunciado: "¿Qué área abastece el depósito de Canteras?", explicacion: "La zona entre el Huerva y el Canal Imperial, incluyendo Torrero y La Paz.", dificultad: "media", opciones: ["El área entre el Huerva y el Canal Imperial, con Torrero y La Paz", "El área entre el Ebro y el Gállego, con Actur y Cartuja", "Los barrios de San Gregorio y Juslibol, junto a la carretera de Huesca", "Los barrios del sur de la ciudad, como Montecanal y Arcosur"], correcta: 0 },
  { enunciado: "¿Qué depósito abastece a la Academia General Militar?", explicacion: "El depósito de Leones-Academia.", dificultad: "media", opciones: ["El depósito de Leones-Academia", "El depósito de Valdespartera", "El depósito de Canteras", "El depósito de Ecociudad"], correcta: 0 },
  { enunciado: "¿Cuál es la capacidad total del depósito de la Academia General Militar?", explicacion: "23.360 m³, construido en la década de 1970.", dificultad: "dificil", opciones: ["23.360 m³", "148.000 m³", "2.336 m³", "233.600 m³"], correcta: 0 },
  { enunciado: "¿Qué zonas abastece el depósito de Ecociudad?", explicacion: "Los barrios del sur de la ciudad, como Montecanal y Arcosur.", dificultad: "media", opciones: ["Los barrios del sur de la ciudad, como Montecanal y Arcosur", "El casco histórico y el centro de la ciudad", "San Gregorio, San Juan de Mozarrifar y Juslibol", "El área entre el Huerva y el Canal Imperial de Aragón"], correcta: 0 },
]);

const S3 = "subredes-ambitos-actuacion-arterias-principales";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿En qué dos grandes tipos se organiza la red de distribución de agua de Zaragoza según el diámetro de sus tuberías?", reverso: "En red arterial (tuberías de gran diámetro, 500 mm o más, que conducen el agua desde los depósitos) y red de distribución (tuberías de menor diámetro que llegan a los puntos de consumo)" },
  { anverso: "¿Qué porcentaje aproximado de la red representa la red arterial frente a la red de distribución?", reverso: "La red arterial representa aproximadamente el 16% del total, y la red de distribución el 84% restante (dato de 2019)" },
  { anverso: "¿Cuál es la longitud aproximada de la red de tuberías de abastecimiento de Zaragoza?", reverso: "Aproximadamente 1.300 kilómetros (dato de 2019)" },
  { anverso: "¿Cuántas arterias principales parten del depósito de Casablanca y cuáles son dos ejemplos con su diámetro?", reverso: "Seis arterias principales; entre ellas, la arteria Actur-Cartuja (Ø 1.400 mm) y la arteria Malpica-Casetas (Ø 1.000-1.400 mm)" },
  { anverso: "¿Qué tecnología emplea el Ayuntamiento de Zaragoza para el seguimiento de la potabilizadora, los depósitos y los bombeos de la red?", reverso: "El telecontrol, un sistema de monitorización a distancia que, combinado con la sectorización de la red (unos 40 sectores operativos en 2019), permite detectar fugas de forma temprana y mejorar la eficiencia de la red" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cómo se organiza la red de distribución de agua de Zaragoza según el diámetro de sus tuberías?", explicacion: "En red arterial (gran diámetro) y red de distribución (menor diámetro).", dificultad: "facil", opciones: ["En red arterial y red de distribución", "En red primaria y red terciaria exclusivamente", "En red de riego y red de saneamiento exclusivamente", "En red norte y red sur, sin ninguna otra clasificación"], correcta: 0 },
  { enunciado: "¿Qué porcentaje aproximado de la red total representa la red arterial?", explicacion: "Aproximadamente el 16%, según datos de 2019.", dificultad: "media", opciones: ["Aproximadamente el 16%", "Aproximadamente el 84%", "Aproximadamente el 50%", "Aproximadamente el 5%"], correcta: 0 },
  { enunciado: "¿Cuál es la longitud aproximada de la red de tuberías de abastecimiento de Zaragoza (dato de 2019)?", explicacion: "Aproximadamente 1.300 km.", dificultad: "media", opciones: ["Aproximadamente 1.300 km", "Aproximadamente 130 km", "Aproximadamente 13.000 km", "Aproximadamente 300 km"], correcta: 0 },
  { enunciado: "¿Cuántas arterias principales parten del depósito de Casablanca?", explicacion: "Seis arterias principales.", dificultad: "dificil", opciones: ["Seis", "Dos", "Diez", "Tres"], correcta: 0 },
  { enunciado: "¿Qué permite el sistema de telecontrol combinado con la sectorización de la red?", explicacion: "Detectar fugas de forma temprana y mejorar la eficiencia de la red.", dificultad: "media", opciones: ["Detectar fugas de forma temprana y mejorar la eficiencia", "Eliminar por completo la necesidad de mantenimiento de válvulas", "Sustituir la necesidad de depósitos de almacenamiento de agua", "Prescindir por completo del personal de guardallaves en la red"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-187 creado y vinculado como Tema 7 de Oficial Guardallaves.");
