/**
 * Crea tema-195: "Acometidas domiciliarias de agua potable" — Tema 15
 * (numero=15, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea 926):
 *   "Acometidas domiciliarias de agua potable. Normativa,
 *   características, materiales e instalación."
 *
 * Fuentes primarias verificadas y leídas íntegras en esta sesión:
 * - Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión
 *   Integral del Agua (OMECGIA), aprobación definitiva Pleno 28-01-2011,
 *   BOPZ 07-02-2011: art. 14.1 (elementos componentes de la acometida de
 *   abastecimiento: toma, tubería, llave de registro, contador), art. 15
 *   (condiciones generales para la concesión: distancias de 80 y 200
 *   metros a la primera arista del inmueble, estado de la conducción,
 *   una única toma por inmueble), y Anexo IV (requisitos de las
 *   solicitudes de acometida, remitido desde el art. 14.1.d).
 * - Real Decreto 140/2003, de 7 de febrero, por el que se establecen los
 *   criterios sanitarios de la calidad del agua de consumo humano
 *   (BOE-A-2003-3596): define la acometida como la tubería que enlaza la
 *   instalación interior del edificio, junto con su llave de paso
 *   correspondiente, con la red de distribución, y sitúa en la llave de
 *   registro de la acometida el límite de responsabilidad del gestor
 *   del abastecimiento sobre la calidad del agua suministrada.
 *
 * Tres secciones:
 * 1. elementos-componentes-acometida-abastecimiento
 * 2. condiciones-generales-concesion-toma-agua
 * 3. normativa-sanitaria-materiales-instalacion
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-195-acometidas-domiciliarias-agua-potable.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-195";
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
  titulo: "Acometidas domiciliarias de agua potable",
  descripcion: "Elementos de la acometida de abastecimiento: toma, tubería, llave de registro y contador (art. 14 OMECGIA). Condiciones generales de concesión (art. 15 OMECGIA). Normativa sanitaria del RD 140/2003.",
  contenido: "Desarrolla la acometida domiciliaria de agua potable de Zaragoza conforme a la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA): sus elementos componentes (toma, tubería y llave de registro), las condiciones generales para la concesión de una nueva toma (distancias máximas, estado de la red, una única toma por inmueble), y el marco sanitario del Real Decreto 140/2003 que define la acometida como el límite de responsabilidad sobre la calidad del agua suministrada.",
  enlaces_boe: [
    "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf",
    "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Elementos componentes de la acometida de abastecimiento", seccion: "elementos-componentes-acometida-abastecimiento", articulos: "OMECGIA, art. 14.1" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Condiciones generales para la concesión de la toma de agua", seccion: "condiciones-generales-concesion-toma-agua", articulos: "OMECGIA, art. 15" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596", titulo: "Normativa sanitaria, materiales e instalación", seccion: "normativa-sanitaria-materiales-instalacion", articulos: "RD 140/2003; OMECGIA, Anexo IV" },
  ],
}]);

const S1 = "elementos-componentes-acometida-abastecimiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué elementos está constituida la toma de agua de una acometida de abastecimiento, según el art. 14.1 de la OMECGIA?", reverso: "Por el grifo de toma, la tubería y la llave de registro" },
  { anverso: "¿Dónde debe ubicarse la llave de registro de una acometida, y quién puede maniobrarla?", reverso: "En la arqueta exterior a la finca, en la acera, según modelo oficial; solo puede ser manejada por el personal del Servicio Municipal competente" },
  { anverso: "¿Dónde debe instalarse habitualmente la toma de una acometida respecto a la fachada de la finca?", reverso: "Perpendicularmente a la fachada, salvo autorización en contrario; no puede quedar empotrada en obras de fábrica ni alojada en el interior de alcantarillas o conductos de otros servicios" },
  { anverso: "¿Qué elemento privado debe instalarse a continuación de la llave de registro, hacia el interior de la finca?", reverso: "El tubo de alimentación de carácter privado, cuyo trazado discurrirá por lugares comunitarios del inmueble" },
  { anverso: "¿Qué exige la OMECGIA cuando de una misma toma deben suministrarse varios abonados de un mismo inmueble?", reverso: "La instalación en planta baja de una batería de contadores certificada conforme a las normas técnicas vigentes, capaz de montar el número de contadores previsto para la totalidad de los servicios a suministrar" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Por qué elementos está constituida la toma de agua de una acometida, según el art. 14.1 de la OMECGIA?", explicacion: "Por el grifo de toma, la tubería y la llave de registro.", dificultad: "facil", opciones: ["Por el grifo de toma, la tubería y la llave de registro", "Exclusivamente por el contador de agua del abonado", "Exclusivamente por la arqueta exterior de registro", "Por el depósito domiciliario y el grupo de presión"], correcta: 0 },
  { enunciado: "¿Quién puede maniobrar la llave de registro de una acometida?", explicacion: "Exclusivamente el personal del Servicio Municipal competente.", dificultad: "media", opciones: ["Exclusivamente el personal del Servicio Municipal competente", "Cualquier instalador autorizado por el propietario del inmueble", "El propio abonado, en cualquier momento y sin autorización previa", "Cualquier empresa de mantenimiento contratada por la comunidad"], correcta: 0 },
  { enunciado: "¿Dónde debe instalarse habitualmente la toma de una acometida respecto a la fachada?", explicacion: "Perpendicularmente a la fachada, salvo autorización en contrario.", dificultad: "media", opciones: ["Perpendicularmente a la fachada de la finca", "Empotrada siempre dentro de la obra de fábrica de la finca", "Alojada siempre en el interior de la alcantarilla más próxima", "Paralelamente a la fachada, en cualquier caso y sin excepción"], correcta: 0 },
  { enunciado: "¿Qué elemento debe instalarse a continuación de la llave de registro, hacia el interior de la finca?", explicacion: "El tubo de alimentación de carácter privado.", dificultad: "dificil", opciones: ["El tubo de alimentación de carácter privado", "Una segunda llave de registro de titularidad municipal", "Una arqueta de telecontrol de titularidad municipal", "Un hidrante contra incendios de titularidad municipal"], correcta: 0 },
  { enunciado: "¿Qué exige la OMECGIA cuando de una misma toma deben suministrarse varios abonados?", explicacion: "La instalación de una batería de contadores certificada en planta baja.", dificultad: "media", opciones: ["Una batería de contadores certificada en planta baja", "Una toma independiente para cada uno de los abonados afectados", "La contratación de una póliza única sin contador individual", "La instalación de un depósito domiciliario para cada abonado"], correcta: 0 },
]);

const S2 = "condiciones-generales-concesion-toma-agua";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿A quién corresponde la concesión de la acometida para suministro de agua apta para el consumo humano, según el art. 15.1 de la OMECGIA?", reverso: "Al Ayuntamiento, que la concederá a todas las solicitudes que cumplan las condiciones y requisitos de la ordenanza" },
  { anverso: "¿Hasta qué distancia entre la red municipal y la primera arista del edificio están obligadas las edificaciones a utilizar la red de abastecimiento, con carácter general?", reverso: "Hasta 80 metros, según el art. 15.2 de la OMECGIA" },
  { anverso: "¿Qué distancia máxima entre la red y la primera arista del inmueble condiciona, con carácter general, la concesión de una acometida de abastecimiento?", reverso: "200 metros, según el art. 15.3.a de la OMECGIA; pueden autorizarse tomas a distancias superiores como ampliaciones de red, y si la distancia supera los 80 metros la instalación requiere un proyecto aprobado por los servicios técnicos municipales" },
  { anverso: "¿Qué otras dos condiciones exige el art. 15.3 de la OMECGIA, además de la distancia, para conceder una acometida de abastecimiento?", reverso: "Que el inmueble cuente con instalaciones interiores adaptadas a la ordenanza, y que la conducción que ha de abastecerlo esté en perfecto estado de servicio y tenga capacidad de transporte suficiente" },
  { anverso: "¿Cuántas tomas de acometida puede tener, en principio, un mismo inmueble, según el art. 15.4 de la OMECGIA?", reverso: "Una única toma; si el interesado desea un segundo punto de conexión, debe justificarlo debidamente y contar con la aprobación de los servicios técnicos municipales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿A quién corresponde la concesión de la acometida de abastecimiento en Zaragoza, según el art. 15.1 de la OMECGIA?", explicacion: "Al Ayuntamiento.", dificultad: "facil", opciones: ["Al Ayuntamiento", "A la comunidad de propietarios del inmueble", "A la empresa instaladora que ejecute la obra", "Al organismo de cuenca competente sobre la red"], correcta: 0 },
  { enunciado: "¿Hasta qué distancia entre la red y la primera arista del edificio son obligadas las edificaciones a usar la red de abastecimiento?", explicacion: "80 metros, según el art. 15.2 de la OMECGIA.", dificultad: "media", opciones: ["80 metros", "200 metros", "15 metros", "50 metros"], correcta: 0 },
  { enunciado: "¿Qué distancia máxima entre la red y la primera arista del inmueble condiciona, con carácter general, la concesión de la acometida?", explicacion: "200 metros, según el art. 15.3.a de la OMECGIA.", dificultad: "media", opciones: ["200 metros", "80 metros", "500 metros", "15 metros"], correcta: 0 },
  { enunciado: "¿Qué otras dos condiciones exige el art. 15.3 de la OMECGIA para conceder una acometida?", explicacion: "Instalaciones interiores adaptadas y conducción en perfecto estado con capacidad suficiente.", dificultad: "dificil", opciones: ["Instalaciones interiores adaptadas y conducción con capacidad suficiente", "Únicamente que el inmueble esté dado de alta en el catastro municipal", "Únicamente que el propietario esté al corriente de sus obligaciones fiscales", "Únicamente que exista una arqueta de telecontrol en la finca"], correcta: 0 },
  { enunciado: "¿Cuántas tomas de acometida puede tener, en principio, un mismo inmueble según el art. 15.4 de la OMECGIA?", explicacion: "Una única toma, salvo justificación y aprobación de los servicios técnicos.", dificultad: "media", opciones: ["Una única toma, salvo justificación y aprobación municipal", "Tantas tomas como plantas tenga el edificio", "Un mínimo de dos tomas en cualquier caso", "Una toma por cada abonado del inmueble, sin excepción"], correcta: 0 },
]);

const S3 = "normativa-sanitaria-materiales-instalacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto establece los criterios sanitarios de la calidad del agua de consumo humano en España?", reverso: "El Real Decreto 140/2003, de 7 de febrero (BOE-A-2003-3596), que incorpora al derecho español la Directiva europea 98/83/CE" },
  { anverso: "¿Cómo define el marco sanitario la acometida, a efectos de la calidad del agua?", reverso: "Como la tubería que enlaza la instalación interior del edificio, junto con su llave de paso correspondiente, con la red de distribución (la red municipal)" },
  { anverso: "¿Hasta dónde llega la responsabilidad del gestor del abastecimiento sobre la calidad del agua suministrada?", reverso: "Hasta el punto de entrega al consumidor, que se sitúa en la llave general de la acometida del abonado (o en el punto de entrega a otro gestor, en caso de suministros en alta); a partir de ahí, la instalación interior es responsabilidad del titular del inmueble" },
  { anverso: "¿Qué remite el art. 14.1.d de la OMECGIA respecto a los requisitos de las solicitudes de acometida?", reverso: "Remite al Anexo IV de la propia ordenanza, que detalla los requisitos de las acometidas a las instalaciones de abastecimiento y saneamiento y sus esquemas de acometida" },
  { anverso: "¿Por qué es relevante que los materiales y la instalación de una acometida cumplan la normativa técnica y sanitaria aplicable?", reverso: "Porque una acometida mal instalada o con materiales inadecuados puede comprometer la calidad sanitaria del agua entregada al consumidor y generar fugas o averías más frecuentes, además de incumplir las condiciones exigidas para su autorización municipal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué Real Decreto establece los criterios sanitarios de la calidad del agua de consumo humano?", explicacion: "El RD 140/2003.", dificultad: "facil", opciones: ["El Real Decreto 140/2003", "El Real Decreto 244/2016", "El Real Decreto 1215/1997", "El Real Decreto 773/1997"], correcta: 0 },
  { enunciado: "¿Cómo define el marco sanitario la acometida, a efectos de la calidad del agua?", explicacion: "Como la tubería que enlaza la instalación interior con la red, junto con su llave de paso.", dificultad: "media", opciones: ["Como la tubería que enlaza la instalación interior con la red", "Como el contador de agua instalado en la finca", "Como el depósito domiciliario de almacenamiento de agua", "Como la arqueta exterior de telecontrol de la finca"], correcta: 0 },
  { enunciado: "¿Hasta dónde llega la responsabilidad del gestor sobre la calidad del agua suministrada?", explicacion: "Hasta la llave general de la acometida del abonado.", dificultad: "dificil", opciones: ["Hasta la llave general de la acometida del abonado", "Hasta el último grifo de la instalación interior del abonado", "Hasta el depósito de Casablanca, sin extenderse más allá", "No existe ningún límite definido en la normativa sanitaria"], correcta: 0 },
  { enunciado: "¿Qué anexo de la OMECGIA detalla los requisitos de las solicitudes de acometida?", explicacion: "El Anexo IV.", dificultad: "media", opciones: ["El Anexo IV", "El Anexo I", "El Anexo XIII", "El Anexo VII"], correcta: 0 },
  { enunciado: "¿Por qué es relevante que los materiales de una acometida cumplan la normativa técnica y sanitaria?", explicacion: "Porque una instalación inadecuada puede comprometer la calidad del agua y generar averías.", dificultad: "media", opciones: ["Puede comprometer la calidad del agua y generar averías", "No tiene ninguna relevancia si el calibre de la acometida es pequeño", "Solo es relevante en acometidas de uso exclusivamente industrial", "Solo es relevante durante el primer año tras su instalación"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-195 creado y vinculado como Tema 15 de Oficial Guardallaves.");
