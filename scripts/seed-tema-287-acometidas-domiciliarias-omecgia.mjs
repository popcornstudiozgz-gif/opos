/**
 * Crea tema-287: "Acometidas domiciliarias de agua potable" — Tema 11
 * (numero=11, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases1716.pdf, línea 525):
 * "Acometidas domiciliarias de agua potable. Normativa, características,
 * materiales e instalación. Ordenanza Municipal para la ecoeficiencia y la
 * calidad de la gestión integral del agua."
 *
 * Sourcing: Ordenanza Municipal para la Ecoeficiencia y la Calidad de la
 * Gestión Integral del Agua (OMECGIA), aprobación definitiva Pleno
 * 28-01-2011, BOPZ núm. 29 de 07-02-2011 — descargada y leída íntegra en
 * esta sesión desde el portal de normativa municipal (texto consolidado
 * embebido en zaragoza.es/sede/servicio/normativa/eli/es-ar-01502973/
 * odnz/2011/02/07/(1)): artículos 14 (elementos de las acometidas de
 * abastecimiento y de saneamiento), 15 (condiciones generales de concesión
 * de la toma de agua) y 16 (condiciones generales de la acometida de
 * vertido). Misma ordenanza ya verificada en Oficial Guardallaves, con
 * artículos adicionales revisados en esta sesión específicamente para
 * acometidas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-287-acometidas-domiciliarias-omecgia.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-287";
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
  titulo: "Acometidas domiciliarias de agua potable",
  descripcion: "Elementos de la acometida de abastecimiento (toma, tubo de alimentación, llave de registro, contador) según la OMECGIA. Condiciones generales para la concesión de la toma de agua. La acometida de saneamiento y las condiciones de la acometida de vertido.",
  contenido: "Desarrolla la regulación de las acometidas domiciliarias en el municipio de Zaragoza conforme a la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA): los elementos que componen la acometida de abastecimiento (toma, llave de registro, tubo de alimentación privado, sistema de medición), las condiciones generales que debe cumplir una edificación para obtener la concesión de la toma de agua, y los elementos y condiciones propios de la acometida de saneamiento y su autorización de vertido.",
  enlaces_boe: [
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA), BOPZ núm. 29 de 07-02-2011" },
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "Elementos de la acometida de abastecimiento", seccion: "elementos-de-la-acometida-de-abastecimiento", articulos: "OMECGIA, art. 14.1" },
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "Concesión de la toma de agua", seccion: "concesion-de-la-toma-de-agua", articulos: "OMECGIA, art. 15" },
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "Acometida de saneamiento y vertido", seccion: "acometida-de-saneamiento-y-vertido", articulos: "OMECGIA, arts. 14.2 y 16" },
  ],
}]);

const S1 = "elementos-de-la-acometida-de-abastecimiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "Según el artículo 14.1 de la OMECGIA, ¿por qué elementos está constituida la toma de agua de una acometida de abastecimiento?", reverso: "Por el grifo de toma, la tubería y la llave de registro" },
  { anverso: "¿Dónde debe ubicarse la llave de registro de una acometida, y quién puede manejarla, según la OMECGIA?", reverso: "En la arqueta exterior a la finca, según modelo oficial, situada en la acera; solo puede ser manejada por el personal del Servicio Municipal competente, nunca por el particular" },
  { anverso: "¿Qué debe instalarse a continuación de la llave de registro, hacia el interior de la finca, según la OMECGIA?", reverso: "El tubo de alimentación de carácter privado, cuyo trazado debe discurrir por lugares comunitarios del inmueble" },
  { anverso: "¿Dónde debe situarse el sistema de medición mediante contador según la OMECGIA, y qué debe instalarse si de una misma toma se suministra a varios abonados?", reverso: "Lo más próximo posible a la toma de agua del inmueble; si hay varios abonados, debe instalarse en planta baja una batería certificada capaz de montar el número de contadores previsto para todos los servicios" },
  { anverso: "¿Cómo debe instalarse la toma de una acometida de abastecimiento respecto a la fachada de la finca, salvo autorización, según la OMECGIA?", reverso: "Perpendicularmente a la fachada, sin quedar empotrada dentro de las obras de fábrica ni alojada en el interior de alcantarillas o conductos de otros servicios" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el artículo 14.1 de la OMECGIA, ¿por qué elementos está constituida la toma de agua de una acometida de abastecimiento?", explicacion: "Por el grifo de toma, la tubería y la llave de registro.", dificultad: "facil", opciones: ["Por el grifo de toma, la tubería y la llave de registro", "Únicamente por el contador general del inmueble", "Únicamente por la arqueta ciega y la tubería de vertido", "Únicamente por la válvula antirretorno de la instalación"], correcta: 0 },
  { enunciado: "¿Dónde debe ubicarse la llave de registro de la acometida según la OMECGIA?", explicacion: "En la arqueta exterior a la finca, en la acera, según modelo oficial.", dificultad: "media", opciones: ["En la arqueta exterior a la finca, situada en la acera", "En el interior de cada vivienda particular del inmueble", "En la azotea del edificio, junto al depósito de agua", "En el interior de la alcantarilla municipal más próxima"], correcta: 0 },
  { enunciado: "¿Quién puede manejar la llave de registro de la acometida, según la OMECGIA?", explicacion: "Exclusivamente el personal del Servicio Municipal competente.", dificultad: "media", opciones: ["Exclusivamente el personal del Servicio Municipal competente", "Cualquier vecino del inmueble sin ninguna restricción", "Exclusivamente el propietario individual de cada vivienda", "Cualquier fontanero privado contratado por la comunidad"], correcta: 0 },
  { enunciado: "¿Qué debe instalarse a continuación de la llave de registro, hacia el interior de la finca?", explicacion: "El tubo de alimentación de carácter privado.", dificultad: "media", opciones: ["El tubo de alimentación, de carácter privado", "Una segunda llave de registro de carácter municipal", "Directamente el contador general, sin ningún tubo intermedio", "Una arqueta ciega de saneamiento, no de abastecimiento"], correcta: 0 },
  { enunciado: "Si de una misma toma se suministra a varios abonados, ¿qué exige la OMECGIA instalar en planta baja del inmueble?", explicacion: "Una batería certificada capaz de montar el número de contadores previsto.", dificultad: "dificil", opciones: ["Una batería certificada capaz de montar el número de contadores previsto para todos los servicios", "Un único contador general compartido, sin posibilidad de contadores individuales", "Una segunda acometida independiente para cada uno de los abonados", "Ninguna instalación adicional distinta de la toma de agua original"], correcta: 0 },
]);

const S2 = "concesion-de-la-toma-de-agua";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿A quién corresponde la concesión de la acometida para suministro de agua apta para el consumo humano, según la OMECGIA?", reverso: "Al Ayuntamiento, que la concederá a todas las solicitudes que cumplan las condiciones y requisitos establecidos en la propia ordenanza" },
  { anverso: "¿Hasta qué distancia máxima entre la red municipal y la primera arista del edificio obliga la OMECGIA a utilizar la red municipal de abastecimiento?", reverso: "80 metros: las edificaciones que por su actividad precisen agua están obligadas a utilizar la red municipal siempre que esa distancia no exceda de 80 metros" },
  { anverso: "¿Quién determina el lugar de conexión a la red municipal de abastecimiento, según la OMECGIA?", reverso: "El Ayuntamiento, previa solicitud del interesado" },
  { anverso: "¿Qué debe estar situado el inmueble para que se le pueda conceder la acometida de abastecimiento, según la OMECGIA?", reverso: "Debe estar situado en el área de influencia del abastecimiento, cumpliendo además la distancia máxima exigida por la ordenanza respecto a la red" },
  { anverso: "¿Qué ocurre si el Ayuntamiento introduce cambios sustanciales en los valores de presión de una acometida ya concedida?", reverso: "Debe notificarlo a los abonados afectados, según el artículo 14.1.e de la OMECGIA" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿A quién corresponde la concesión de la acometida para suministro de agua apta para el consumo humano?", explicacion: "Al Ayuntamiento.", dificultad: "facil", opciones: ["Al Ayuntamiento", "A la empresa constructora del inmueble", "A la comunidad de propietarios del inmueble", "A una empresa privada de fontanería a libre elección"], correcta: 0 },
  { enunciado: "¿Hasta qué distancia máxima entre la red municipal y la primera arista del edificio obliga la OMECGIA a utilizar la red municipal de abastecimiento?", explicacion: "80 metros.", dificultad: "media", opciones: ["80 metros", "50 metros", "200 metros", "15 metros"], correcta: 0 },
  { enunciado: "¿Quién determina el lugar de conexión a la red municipal de abastecimiento?", explicacion: "El Ayuntamiento, previa solicitud del interesado.", dificultad: "media", opciones: ["El Ayuntamiento, previa solicitud del interesado", "El propio solicitante, sin necesidad de autorización municipal", "La empresa suministradora de energía eléctrica del inmueble", "El colegio profesional de fontaneros correspondiente"], correcta: 0 },
  { enunciado: "¿Qué requisito de ubicación exige la OMECGIA al inmueble para poder concederle la acometida de abastecimiento?", explicacion: "Estar situado en el área de influencia del abastecimiento.", dificultad: "media", opciones: ["Estar situado en el área de influencia del abastecimiento", "Estar situado a más de 80 metros de la red municipal", "No disponer de ningún sistema de medición mediante contador", "Disponer de una acometida de vertido ya concedida previamente"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el Ayuntamiento si introduce cambios sustanciales en los valores de presión de una acometida ya concedida?", explicacion: "Notificarlo a los abonados afectados.", dificultad: "dificil", opciones: ["Notificarlo a los abonados afectados", "No tiene obligación alguna de comunicarlo a los abonados", "Solicitar autorización previa de cada abonado antes del cambio", "Suspender automáticamente el suministro de todos los abonados"], correcta: 0 },
]);

const S3 = "acometida-de-saneamiento-y-vertido";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "Según el artículo 14.2 de la OMECGIA, ¿por qué elementos está constituida la acometida al vertido?", reverso: "Por la arqueta ciega y la tubería, instalándose, salvo autorización, perpendicularmente a la fachada de la finca, sin quedar empotrada en obras de fábrica y ubicada sobre la parte superior de la tubería municipal" },
  { anverso: "¿Qué elemento debe colocarse en el ramal principal de evacuación que enlaza con la tubería municipal, dentro del inmueble, según la OMECGIA?", reverso: "Una arqueta de registro con válvula antirretorno o de retención incorporada, que evite el reflujo desde la tubería municipal hacia la finca particular" },
  { anverso: "¿Hasta qué distancia entre la red municipal de alcantarillado y la primera arista del edificio obliga con carácter general la OMECGIA a utilizar la red de alcantarillado?", reverso: "50 metros" },
  { anverso: "¿Cuántas acometidas de vertido a la alcantarilla general permite la OMECGIA como principio general por cada finca, y qué excepción contempla?", reverso: "Como principio general, solo una; se permiten dos en fincas de esquina a dos calles o con acceso por varios lados, si la construcción lo exige, y siempre que la distancia entre ambas supere los 15 metros" },
  { anverso: "¿Qué distancia máxima entre la red y el inmueble contempla la OMECGIA como área de influencia del alcantarillado para autorizar la acometida de vertido, aunque exija proyecto aprobado por los servicios técnicos si se supera cierta distancia?", reverso: "Hasta 200 metros como área de influencia; a partir de 50 metros, la instalación debe efectuarse de acuerdo con un proyecto aprobado por los servicios técnicos municipales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según el artículo 14.2 de la OMECGIA, ¿por qué elementos está constituida la acometida al vertido?", explicacion: "Por la arqueta ciega y la tubería.", dificultad: "facil", opciones: ["Por la arqueta ciega y la tubería", "Únicamente por el grifo de toma y la llave de registro", "Únicamente por el contador general del inmueble", "Únicamente por la batería certificada de contadores"], correcta: 0 },
  { enunciado: "¿Qué elemento debe llevar la arqueta de registro del ramal principal de evacuación, según la OMECGIA?", explicacion: "Válvula antirretorno o de retención, para evitar el reflujo desde la tubería municipal.", dificultad: "media", opciones: ["Una válvula antirretorno o de retención incorporada", "Un contador divisionario de aguas residuales", "Un fluxor de descarga directa desde la red municipal", "Una ventosa para la entrada y salida de aire"], correcta: 0 },
  { enunciado: "¿Hasta qué distancia entre la red municipal de alcantarillado y el edificio obliga con carácter general la OMECGIA a utilizar la red de alcantarillado?", explicacion: "50 metros.", dificultad: "media", opciones: ["50 metros", "80 metros", "200 metros", "15 metros"], correcta: 0 },
  { enunciado: "¿Cuántas acometidas de vertido permite la OMECGIA, como principio general, por cada finca?", explicacion: "Solo una, salvo excepciones en fincas de esquina.", dificultad: "media", opciones: ["Solo una", "Como máximo tres, sin excepción posible", "Tantas como viviendas tenga el inmueble", "No se permite ninguna acometida de vertido por finca"], correcta: 0 },
  { enunciado: "¿A partir de qué distancia exige la OMECGIA un proyecto aprobado por los servicios técnicos municipales para instalar la acometida de vertido?", explicacion: "A partir de 50 metros.", dificultad: "dificil", opciones: ["A partir de 50 metros", "A partir de 200 metros", "A partir de 15 metros", "En cualquier distancia, sin excepción, se exige siempre proyecto"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Llave de registro", definicion: "Llave situada en la arqueta exterior de la finca que permite cortar el suministro a través de la toma; solo puede manejarla el Servicio Municipal competente." },
  { tema_slug: TEMA, seccion: S1, termino: "Batería de contadores", definicion: "Instalación en planta baja capaz de montar varios contadores certificados cuando una misma toma suministra a distintos abonados de un mismo inmueble." },
  { tema_slug: TEMA, seccion: S2, termino: "Área de influencia", definicion: "Zona en la que debe estar situado un inmueble, respecto a la red municipal, para poder obtener la concesión de una acometida conforme a la OMECGIA." },
  { tema_slug: TEMA, seccion: S2, termino: "OMECGIA", definicion: "Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua del Ayuntamiento de Zaragoza (BOPZ núm. 29 de 07-02-2011)." },
  { tema_slug: TEMA, seccion: S3, termino: "Arqueta ciega", definicion: "Elemento de la acometida de vertido, sin tapa registrable de inspección, situado en el punto de conexión con la tubería municipal de saneamiento." },
  { tema_slug: TEMA, seccion: S3, termino: "Válvula de retención (en saneamiento)", definicion: "Dispositivo incorporado a la arqueta de registro interior que impide el reflujo de aguas desde la tubería municipal hacia la finca particular." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-287 creado y vinculado como Tema 11 de Oficial Fontanero.");
