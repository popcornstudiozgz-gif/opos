/**
 * Crea tema-296: "Normativa de redes de agua potable y saneamiento" —
 * Tema 20 (numero=20, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases1716.pdf, línea 548):
 * "Normativa aplicable en materia de redes de distribución de agua potable
 * y saneamiento."
 *
 * Sourcing: Real Decreto 140/2003, de 7 de febrero, criterios sanitarios de
 * la calidad del agua de consumo humano (BOE, transpone la Directiva
 * 98/83/CE), modificado por el Real Decreto 902/2018 — ya verificado en
 * Oficial Planta Potabilizadora, con el mismo caso de norma derogada que el
 * temario oficial puede seguir citando: la Orden SSI/304/2013, derogada
 * desde el 2-08-2018 por el propio RD 902/2018 (verificado de nuevo en esta
 * sesión). Ordenanza Municipal para la Ecoeficiencia y la Calidad de la
 * Gestión Integral del Agua (OMECGIA, BOPZ núm. 29 de 07-02-2011), arts.
 * 8-13 (titularidad de acometidas, servicio de las redes como dominio
 * público, requisitos constructivos, instalación de servicios en la red de
 * saneamiento, criterios de alcantarillado y suministro en alta) —
 * descargados y leídos en esta sesión (misma ordenanza usada en tema-287
 * para las acometidas, aquí con artículos distintos sobre la red general).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-296-normativa-redes-agua-saneamiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-296";
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
  titulo: "Normativa de redes de agua potable y saneamiento",
  descripcion: "Real Decreto 140/2003 sobre criterios sanitarios de la calidad del agua de consumo humano, y su modificación por el RD 902/2018. La OMECGIA: titularidad de las redes, requisitos constructivos, instalación de servicios en la red de saneamiento y el suministro en alta.",
  contenido: "Desarrolla el marco normativo que regula las redes de distribución de agua potable y saneamiento: el Real Decreto 140/2003 sobre los criterios sanitarios que debe cumplir el agua de consumo humano, modificado por el Real Decreto 902/2018; y la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA), en lo relativo a la titularidad y gestión de las redes municipales, los requisitos constructivos de las urbanizaciones, la instalación de otros servicios en la red de saneamiento, y el suministro de agua en alta a otros municipios.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596", titulo: "Real Decreto 140/2003, de 7 de febrero, criterios sanitarios de la calidad del agua de consumo humano" },
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA), arts. 8-13" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596", titulo: "El RD 140/2003 y la calidad del agua", seccion: "el-rd-140-2003-y-la-calidad-del-agua", articulos: "RD 140/2003, modificado por RD 902/2018" },
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "La OMECGIA y la gestión de las redes", seccion: "la-omecgia-y-la-gestion-de-las-redes", articulos: "OMECGIA, arts. 8-10" },
    { url: "https://www.zaragoza.es/sede/servicio/normativa/1542", titulo: "Alcantarillado y suministro en alta", seccion: "alcantarillado-y-suministro-en-alta", articulos: "OMECGIA, arts. 11-13" },
  ],
}]);

const S1 = "el-rd-140-2003-y-la-calidad-del-agua";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el Real Decreto 140/2003, y qué directiva europea transpone a la legislación española?", reverso: "Regula los criterios sanitarios de la calidad del agua de consumo humano; transpone a la legislación española la Directiva 98/83/CE del Consejo" },
  { anverso: "¿Qué Real Decreto modificó el RD 140/2003, actualizando sus criterios de calidad?", reverso: "El Real Decreto 902/2018, de 20 de julio" },
  { anverso: "¿Qué norma cita a veces el temario o la documentación antigua sobre sustancias para el tratamiento del agua, que en realidad está derogada desde 2018?", reverso: "La Orden SSI/304/2013, de 19 de febrero, sobre sustancias para el tratamiento del agua, derogada con efectos de 2 de agosto de 2018 por la disposición derogatoria única del RD 902/2018" },
  { anverso: "¿Por qué es importante para un Oficial Fontanero saber que la Orden SSI/304/2013 está derogada?", reverso: "Porque si se encuentra citada en documentación antigua o en el propio temario oficial, no debe tomarse como norma vigente para el tratamiento del agua: la referencia actual es el RD 902/2018, que la sustituyó" },
  { anverso: "¿A qué tipo de aguas se aplica el RD 140/2003, en términos generales?", reverso: "A todas las aguas destinadas al consumo humano, ya sea suministradas a través de una red de distribución pública o privada, con independencia de su origen" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué regula el Real Decreto 140/2003?", explicacion: "Los criterios sanitarios de la calidad del agua de consumo humano.", dificultad: "facil", opciones: ["Los criterios sanitarios de la calidad del agua de consumo humano", "Exclusivamente el control metrológico de los contadores de agua", "Exclusivamente las válvulas para el suministro de agua a presión", "Exclusivamente las instalaciones térmicas en los edificios"], correcta: 0 },
  { enunciado: "¿Qué directiva europea transpone el RD 140/2003?", explicacion: "La Directiva 98/83/CE del Consejo.", dificultad: "media", opciones: ["La Directiva 98/83/CE", "El Reglamento (UE) 2020/740", "El Reglamento (CE) 561/2006", "La Directiva 2014/68/UE"], correcta: 0 },
  { enunciado: "¿Qué Real Decreto modificó el RD 140/2003?", explicacion: "El RD 902/2018.", dificultad: "media", opciones: ["El RD 902/2018", "El RD 244/2016", "El RD 1027/2007", "El RD 513/2017"], correcta: 0 },
  { enunciado: "¿Qué ocurrió con la Orden SSI/304/2013 desde el 2 de agosto de 2018?", explicacion: "Quedó derogada por el RD 902/2018.", dificultad: "dificil", opciones: ["Quedó derogada por la disposición derogatoria única del RD 902/2018", "Sigue plenamente vigente, sin ninguna modificación posterior", "Fue elevada a rango de Real Decreto sin cambiar su contenido", "Nunca ha estado relacionada con la calidad del agua de consumo humano"], correcta: 0 },
  { enunciado: "¿A qué tipo de aguas se aplica el RD 140/2003?", explicacion: "A todas las destinadas al consumo humano, de red pública o privada.", dificultad: "media", opciones: ["A todas las aguas destinadas al consumo humano, sea cual sea su origen o tipo de red", "Exclusivamente a las aguas de redes de titularidad privada, nunca a las públicas", "Exclusivamente a las aguas embotelladas comercializadas en España", "Exclusivamente a las aguas de piscinas de uso público o colectivo"], correcta: 0 },
]);

const S2 = "la-omecgia-y-la-gestion-de-las-redes";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "Según el artículo 8 de la OMECGIA, ¿de quién es la titularidad de los elementos de las acometidas de agua y vertido, y quién debe mantenerlos?", reverso: "Son de titularidad privada, por lo que su construcción y mantenimiento son competencia del propietario del inmueble al que prestan servicio, salvo que el Ayuntamiento asuma en el futuro el mantenimiento de las de uso mayoritariamente doméstico" },
  { anverso: "¿Qué carácter tienen las redes de abastecimiento y saneamiento según el artículo 9 de la OMECGIA?", reverso: "Son bienes de servicio público de dominio público municipal, y la prestación de esos servicios es competencia municipal de carácter obligatorio" },
  { anverso: "¿Qué derecho ostenta el municipio sobre la vía pública en relación con las redes de abastecimiento y saneamiento, según el artículo 9 de la OMECGIA?", reverso: "El derecho de realizar cualquier trabajo de construcción, reparación, remoción o reposición de infraestructuras que requiera la instalación, mejora o mantenimiento del servicio, por sí mismo o mediante la entidad gestora o empresas adjudicatarias" },
  { anverso: "¿Qué exige el artículo 10 de la OMECGIA para los proyectos de urbanización con instalaciones de bombeo o dosificación de hipoclorito que vayan a ser recibidos por el Ayuntamiento?", reverso: "Que cumplan los requisitos recogidos en el anexo II de la propia ordenanza" },
  { anverso: "¿Qué exige el artículo 10 de la OMECGIA para proyectos de urbanización de más de 3 hectáreas?", reverso: "Un estudio de sectorización de la red que determine las válvulas a accionar, la situación del contador y las presiones resultantes de cada sector" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿De quién es la titularidad de los elementos de las acometidas de agua y vertido, según el artículo 8 de la OMECGIA?", explicacion: "De titularidad privada, con mantenimiento a cargo del propietario del inmueble.", dificultad: "facil", opciones: ["De titularidad privada, con mantenimiento a cargo del propietario del inmueble", "De titularidad exclusivamente municipal desde el momento de su ejecución", "De titularidad exclusivamente estatal, ajena al Ayuntamiento de Zaragoza", "De titularidad compartida al 50% entre el propietario y la empresa constructora"], correcta: 0 },
  { enunciado: "¿Qué carácter tienen las redes de abastecimiento y saneamiento según el artículo 9 de la OMECGIA?", explicacion: "Bienes de servicio público de dominio público municipal.", dificultad: "media", opciones: ["Bienes de servicio público de dominio público municipal", "Bienes de titularidad exclusivamente privada, sin ninguna intervención municipal", "Bienes de titularidad estatal, ajenos a la competencia municipal", "Bienes sin ninguna clasificación jurídica específica según la OMECGIA"], correcta: 0 },
  { enunciado: "¿Qué derecho ostenta el municipio sobre la vía pública en relación con estas redes?", explicacion: "Realizar trabajos de construcción, reparación, remoción o reposición de infraestructuras.", dificultad: "media", opciones: ["El derecho de realizar trabajos de construcción, reparación, remoción o reposición de infraestructuras", "Ningún derecho específico, al corresponder toda intervención exclusivamente a los propietarios", "El derecho exclusivo de cobrar tasas, sin ninguna facultad de intervención física en la vía pública", "El derecho exclusivo de vender el agua a otros municipios, sin ninguna otra facultad"], correcta: 0 },
  { enunciado: "¿Qué exige el artículo 10 de la OMECGIA en proyectos de urbanización de más de 3 hectáreas?", explicacion: "Un estudio de sectorización de la red (válvulas, contador, presiones).", dificultad: "dificil", opciones: ["Un estudio de sectorización de la red, determinando válvulas, contador y presiones de cada sector", "La eliminación de cualquier válvula de la red proyectada, sin excepción posible", "La renuncia expresa a instalar cualquier sistema de dosificación de hipoclorito", "La cesión inmediata de la titularidad de todas las acometidas al Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Qué documento de la OMECGIA recoge los requisitos para instalaciones de bombeo o dosificación de hipoclorito que vayan a ser recibidas por el Ayuntamiento?", explicacion: "El anexo II de la propia ordenanza.", dificultad: "media", opciones: ["El anexo II", "El anexo IV", "El anexo V", "El anexo III"], correcta: 0 },
]);

const S3 = "alcantarillado-y-suministro-en-alta";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige, con carácter general, el artículo 11 de la OMECGIA para instalar cualquier elemento (cables, tuberías, conducciones) en la red de saneamiento?", reverso: "Autorización expresa del órgano municipal competente; por razones justificadas puede autorizarse en función de la naturaleza y compatibilidad de la instalación" },
  { anverso: "¿Qué exige el artículo 12 de la OMECGIA para proyectos de urbanización de más de 3 hectáreas, respecto al alcantarillado?", reverso: "Además de dimensionar la red (exigible en cualquier caso), un estudio de las cuencas efluentes y los puntos de situación de los medidores de caudal" },
  { anverso: "¿Qué es el «suministro en alta» regulado en el artículo 13 de la OMECGIA?", reverso: "El suministro de agua potable que el Ayuntamiento de Zaragoza puede prestar a otras poblaciones próximas a su término municipal, bajo determinadas condiciones" },
  { anverso: "¿Qué condición exige el artículo 13 de la OMECGIA para autorizar un suministro en alta a otra población?", reverso: "Que exista posibilidad técnica de suministrar los caudales demandados sin afectar a la garantía de suministro en el término municipal de Zaragoza, entre otras condiciones" },
  { anverso: "¿De qué es responsable el Ayuntamiento de Zaragoza en un suministro en alta, según el artículo 13 de la OMECGIA, y de qué no responde?", reverso: "Es responsable del suministro hasta los puntos de derivación; no es responsable de las consecuencias de cortes de suministro o disminuciones de presión en su propia red por cualquier causa, aunque repara las averías en el menor plazo posible" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué exige el artículo 11 de la OMECGIA para instalar elementos ajenos en la red de saneamiento?", explicacion: "Autorización expresa del órgano municipal competente.", dificultad: "facil", opciones: ["Autorización expresa del órgano municipal competente", "Ninguna autorización, al estar completamente liberalizada esa instalación", "Autorización exclusiva del propietario del inmueble más próximo a la red", "Autorización exclusiva de la empresa suministradora de energía eléctrica"], correcta: 0 },
  { enunciado: "¿Qué exige el artículo 12 de la OMECGIA para proyectos de urbanización de más de 3 hectáreas sobre alcantarillado?", explicacion: "Un estudio de cuencas efluentes y puntos de medidores de caudal.", dificultad: "media", opciones: ["Un estudio de las cuencas efluentes y los puntos de situación de los medidores de caudal", "La eliminación de cualquier medidor de caudal de la red proyectada", "La renuncia expresa a dimensionar la red de alcantarillado proyectada", "La cesión inmediata de la titularidad del alcantarillado a una empresa privada"], correcta: 0 },
  { enunciado: "¿Qué es el «suministro en alta» regulado en el artículo 13 de la OMECGIA?", explicacion: "El suministro de agua potable a otras poblaciones próximas al término municipal.", dificultad: "media", opciones: ["El suministro de agua potable a otras poblaciones próximas al término municipal de Zaragoza", "El suministro de agua exclusivamente a los pisos más altos de un edificio", "El suministro de agua exclusivamente durante los meses de verano", "El suministro de agua exclusivamente a instalaciones deportivas municipales"], correcta: 0 },
  { enunciado: "¿Qué condición exige el artículo 13 de la OMECGIA para autorizar un suministro en alta?", explicacion: "Que exista posibilidad técnica sin afectar a la garantía de suministro en Zaragoza.", dificultad: "dificil", opciones: ["Que exista posibilidad técnica de suministrar sin afectar a la garantía de suministro en Zaragoza", "Que la población beneficiaria renuncie expresamente a cualquier sistema de medida de caudal", "Que el suministro se realice exclusivamente de forma gratuita, sin ningún convenio regulador", "Que el suministro en alta tenga siempre carácter indefinido, sin ningún límite de caudal"], correcta: 0 },
  { enunciado: "¿De qué no es responsable el Ayuntamiento de Zaragoza en un suministro en alta, según el artículo 13 de la OMECGIA?", explicacion: "De cortes de suministro o disminuciones de presión en su red por cualquier causa.", dificultad: "dificil", opciones: ["De las consecuencias de cortes de suministro o disminuciones de presión en su red por cualquier causa", "De realizar las reparaciones necesarias en caso de avería en su término municipal", "De establecer un límite máximo de caudal diario disponible para cada suministro", "De suscribir un Convenio Regulador para las condiciones particulares de cada suministro"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "RD 140/2003", definicion: "Real Decreto que establece los criterios sanitarios de la calidad del agua de consumo humano, transponiendo la Directiva 98/83/CE." },
  { tema_slug: TEMA, seccion: S1, termino: "Orden SSI/304/2013", definicion: "Orden sobre sustancias para el tratamiento del agua, derogada desde el 2-08-2018 por el RD 902/2018; no debe citarse como vigente." },
  { tema_slug: TEMA, seccion: S2, termino: "Bien de dominio público municipal", definicion: "Calificación jurídica de las redes de abastecimiento y saneamiento según la OMECGIA, que las sujeta a un régimen de servicio público." },
  { tema_slug: TEMA, seccion: S2, termino: "Estudio de sectorización", definicion: "Documento exigido en proyectos de urbanización de más de 3 hectáreas, que determina válvulas, contador y presiones de cada sector de la red." },
  { tema_slug: TEMA, seccion: S3, termino: "Suministro en alta", definicion: "Suministro de agua potable que el Ayuntamiento de Zaragoza puede prestar a otras poblaciones próximas, bajo condiciones técnicas y un Convenio Regulador." },
  { tema_slug: TEMA, seccion: S3, termino: "Convenio Regulador", definicion: "Documento que establece las condiciones particulares de cada suministro en alta autorizado por el Ayuntamiento de Zaragoza." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-296 creado y vinculado como Tema 20 de Oficial Fontanero.");
