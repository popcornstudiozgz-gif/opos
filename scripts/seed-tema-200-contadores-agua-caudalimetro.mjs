/**
 * Crea tema-200: "Contadores de agua y caudalímetros" — Tema 20
 * (numero=20, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea 944):
 *   "Contador de agua, caudalímetro. Instalación y montaje de los
 *   mismos."
 *
 * Fuentes primarias verificadas y leídas íntegras en esta sesión:
 * - Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión
 *   Integral del Agua (OMECGIA): art. 48 (obligatoriedad de contador de
 *   propiedad municipal; caudalímetro de vertido como excepción
 *   autorizada), art. 49 (adecuación del calibre), art. 50 (cambio de
 *   emplazamiento), art. 51 (titularidad municipal y sustitución
 *   obligatoria a los diez años) y art. 53 (verificación oficial del
 *   contador por el organismo competente de la Diputación General de
 *   Aragón).
 * - Real Decreto 244/2016, de 3 de junio, por el que se desarrolla la
 *   Ley 32/2014, de Metrología (BOE-A-2016-5530), que traspone la
 *   Directiva 2014/32/UE sobre instrumentos de medida: contadores de
 *   agua sujetos a los requisitos esenciales comunes de su Anexo II, a
 *   la evaluación de la conformidad de su Anexo VIII, y al marcado
 *   nacional complementario ("Ñ") de su Anexo III para los contadores
 *   válidos en extracciones del dominio público hidráulico; desarrollado
 *   en el control metrológico del Estado por la Orden ICT/155/2020.
 *
 * Tres secciones:
 * 1. obligatoriedad-titularidad-mantenimiento-contador
 * 2. cambio-emplazamiento-calibre-verificacion
 * 3. metrologia-legal-rd-244-2016-caudalimetro
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-200-contadores-agua-caudalimetro.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-200";
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
  titulo: "Contadores de agua y caudalímetros",
  descripcion: "Obligatoriedad, titularidad y mantenimiento del contador municipal (arts. 48 y 51 OMECGIA). Cambio de emplazamiento, calibre y verificación oficial (arts. 49, 50 y 53 OMECGIA). Metrología legal: RD 244/2016 y el caudalímetro.",
  contenido: "Desarrolla el régimen del contador de agua en el abastecimiento municipal de Zaragoza: su obligatoriedad y titularidad municipal, el deber de sustitución cada diez años, la adecuación del calibre al consumo, el cambio de emplazamiento y la verificación oficial del contador conforme a la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua; y el marco de metrología legal del Real Decreto 244/2016 que regula, junto con el contador convencional, el caudalímetro como sistema objetivo de medida en supuestos especiales.",
  enlaces_boe: [
    "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf",
    "https://www.boe.es/buscar/act.php?id=BOE-A-2016-5530",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Obligatoriedad, titularidad y mantenimiento del contador", seccion: "obligatoriedad-titularidad-mantenimiento-contador", articulos: "OMECGIA, arts. 48 y 51" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Cambio de emplazamiento, calibre y verificación", seccion: "cambio-emplazamiento-calibre-verificacion", articulos: "OMECGIA, arts. 49, 50 y 53" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2016-5530", titulo: "Metrología legal: RD 244/2016 y el caudalímetro", seccion: "metrologia-legal-rd-244-2016-caudalimetro", articulos: "RD 244/2016; OMECGIA, art. 48.1" },
  ],
}]);

const S1 = "obligatoriedad-titularidad-mantenimiento-contador";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo debe realizarse el control del agua consumida en cada póliza, según el art. 48.1 de la OMECGIA?", reverso: "Siempre a través de un contador de propiedad municipal" },
  { anverso: "¿De quién es la propiedad de los contadores empleados para medir el consumo de agua, con carácter general, según el art. 51.1 de la OMECGIA?", reverso: "De propiedad municipal, con carácter general y obligatorio, sin perjuicio de los sistemas objetivos de medida especiales autorizados excepcionalmente" },
  { anverso: "¿Durante cuánto tiempo máximo puede permanecer instalado ininterrumpidamente un contador, según el art. 51.4 de la OMECGIA?", reverso: "Diez años; transcurrido ese plazo, el contador debe ser sustituido, sin que sea precisa notificación expresa al usuario para que el Ayuntamiento lleve a cabo la sustitución" },
  { anverso: "¿A cargo de quién corren los desperfectos y reparaciones de un contador por mal uso o conservación, según el art. 51.5 de la OMECGIA?", reverso: "A cargo del titular de la póliza, independientemente de las sanciones a que hubiere lugar; en caso de rotura o desaparición imputable al titular, este responderá de su importe según la tarifa de la ordenanza fiscal" },
  { anverso: "¿Qué modalidad transitoria de facturación admite el art. 48.2 de la OMECGIA cuando no es posible instalar el contador por negligencia u obstrucción del usuario?", reverso: "El alta en la modalidad de \"tanto alzado\", tarifándose el abastecimiento conforme a la tarifa específica prevista en la ordenanza fiscal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo debe realizarse el control del agua consumida en cada póliza, según el art. 48.1 de la OMECGIA?", explicacion: "Siempre a través de un contador de propiedad municipal.", dificultad: "facil", opciones: ["Siempre a través de un contador de propiedad municipal", "A través de un contador de propiedad exclusiva del abonado", "Mediante estimación fija, sin ningún contador instalado", "Mediante un caudalímetro de propiedad del abonado en todo caso"], correcta: 0 },
  { enunciado: "¿De quién es la propiedad de los contadores de agua, con carácter general, según el art. 51.1 de la OMECGIA?", explicacion: "De propiedad municipal, con carácter general y obligatorio.", dificultad: "media", opciones: ["De propiedad municipal", "De propiedad exclusiva del abonado titular de la póliza", "De propiedad de la comunidad de propietarios del inmueble", "De propiedad del organismo de cuenca competente"], correcta: 0 },
  { enunciado: "¿Durante cuánto tiempo máximo puede permanecer instalado ininterrumpidamente un contador, según el art. 51.4 de la OMECGIA?", explicacion: "Diez años.", dificultad: "media", opciones: ["Diez años", "Cinco años", "Veinte años", "Dos años"], correcta: 0 },
  { enunciado: "¿A cargo de quién corren las reparaciones de un contador por mal uso o conservación, según el art. 51.5 de la OMECGIA?", explicacion: "A cargo del titular de la póliza.", dificultad: "media", opciones: ["A cargo del titular de la póliza", "A cargo del Ayuntamiento en todo caso, sin excepción", "A cargo del fabricante del contador exclusivamente", "A cargo del organismo de cuenca competente"], correcta: 0 },
  { enunciado: "¿Qué modalidad admite el art. 48.2 de la OMECGIA cuando no es posible instalar el contador por causa imputable al usuario?", explicacion: "El alta transitoria en la modalidad de \"tanto alzado\".", dificultad: "dificil", opciones: ["El alta transitoria en la modalidad de \"tanto alzado\"", "La suspensión definitiva e irrevocable del suministro", "La instalación obligatoria de un caudalímetro de vertido", "La exención total y permanente de la tasa de abastecimiento"], correcta: 0 },
]);

const S2 = "cambio-emplazamiento-calibre-verificacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Puede el Ayuntamiento exigir la modificación del calibre del contador de un abonado, según el art. 49 de la OMECGIA?", reverso: "Sí, el Ayuntamiento podrá exigir la modificación de la instalación particular para adaptar el calibre del contador al consumo comprobado; la reducción del calibre siempre requiere autorización previa municipal" },
  { anverso: "¿A cargo de quién corre, con carácter general, el cambio de emplazamiento de un contador, según el art. 50 de la OMECGIA?", reverso: "A cargo de la parte a cuya instancia se haya llevado a cabo el cambio; no obstante, siempre corre a cargo del abonado cuando el cambio se debe a reformas del abonado que dificulten la lectura o revisión del contador" },
  { anverso: "¿Qué otro supuesto hace que el cambio de emplazamiento del contador corra siempre a cargo del abonado, según el art. 50.2 de la OMECGIA?", reverso: "Cuando la instalación del contador no responda a las exigencias de la ordenanza y se produzca un cambio de titularidad del suministro" },
  { anverso: "¿Pueden los abonados solicitar la verificación oficial de su contador, según el art. 53.1 de la OMECGIA?", reverso: "Sí, y esa verificación se lleva a cabo por el organismo competente de la Diputación General de Aragón, que emite la correspondiente Acta de verificación" },
  { anverso: "¿Qué hace el Ayuntamiento con el contador tras una verificación oficial, mientras adquiere firmeza el resultado, según el art. 53 de la OMECGIA?", reverso: "Lo mantiene en reserva, en previsión de ulteriores peritaciones; transcurrido el plazo correspondiente, se actúa sobre el contador conforme a las tareas de mantenimiento previstas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Puede el Ayuntamiento exigir la modificación del calibre del contador de un abonado?", explicacion: "Sí, para adaptarlo al consumo comprobado (art. 49 OMECGIA).", dificultad: "media", opciones: ["Sí, para adaptarlo al consumo comprobado", "No, el calibre del contador nunca puede modificarse", "Solo si lo solicita expresamente el propio abonado", "Solo en caso de cambio de titularidad del suministro"], correcta: 0 },
  { enunciado: "¿A cargo de quién corre el cambio de emplazamiento de un contador debido a una reforma del abonado que dificulte su lectura?", explicacion: "A cargo del abonado, según el art. 50 de la OMECGIA.", dificultad: "media", opciones: ["A cargo del abonado", "A cargo del Ayuntamiento en todo caso", "A cargo del fabricante del contador", "A cargo de la comunidad de propietarios exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué otro supuesto, según el art. 50.2 de la OMECGIA, hace que el cambio de emplazamiento corra a cargo del abonado?", explicacion: "Cuando la instalación no cumple la ordenanza y hay cambio de titularidad del suministro.", dificultad: "dificil", opciones: ["Instalación no conforme y cambio de titularidad del suministro", "Cualquier avería de la red ajena a la instalación del abonado", "Cualquier obra municipal en la vía pública próxima al contador", "El simple transcurso de los diez años de vida del contador"], correcta: 0 },
  { enunciado: "¿Quién lleva a cabo la verificación oficial de un contador solicitada por un abonado, según el art. 53.1 de la OMECGIA?", explicacion: "El organismo competente de la Diputación General de Aragón.", dificultad: "media", opciones: ["El organismo competente de la Diputación General de Aragón", "El propio Servicio Municipal de Explotación de Redes", "Una empresa privada libremente elegida por el abonado", "El organismo de cuenca competente sobre el río Ebro"], correcta: 0 },
  { enunciado: "¿Qué hace el Ayuntamiento con el contador mientras adquiere firmeza el resultado de una verificación oficial?", explicacion: "Lo mantiene en reserva, en previsión de ulteriores peritaciones.", dificultad: "dificil", opciones: ["Lo mantiene en reserva, en previsión de ulteriores peritaciones", "Lo sustituye de inmediato por uno nuevo, sin ninguna reserva", "Lo devuelve de inmediato al abonado como prueba pericial", "Lo destruye de inmediato, sin conservarlo como prueba"], correcta: 0 },
]);

const S3 = "metrologia-legal-rd-244-2016-caudalimetro";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto desarrolla la Ley de Metrología en materia de instrumentos de medida, incluidos los contadores de agua?", reverso: "El Real Decreto 244/2016, de 3 de junio, que desarrolla la Ley 32/2014, de Metrología, y traspone la Directiva 2014/32/UE" },
  { anverso: "¿A qué requisitos esenciales están sujetos los contadores de agua conforme al RD 244/2016?", reverso: "A los requisitos esenciales comunes de los instrumentos de medida recogidos en el Anexo II del Real Decreto, además de los requisitos específicos que les correspondan" },
  { anverso: "¿Qué marcado nacional complementario deben llevar los contadores de agua válidos para extracciones del dominio público hidráulico, según el RD 244/2016?", reverso: "El marcado nacional \"Ñ\", conforme al art. 1.4 del Anexo III del Real Decreto" },
  { anverso: "¿Qué es un caudalímetro, y en qué se distingue de un contador convencional en el marco de la OMECGIA?", reverso: "Un instrumento que mide el caudal instantáneo o acumulado de agua; el art. 48.1 de la OMECGIA lo admite como sistema objetivo de medida distinto del contador municipal solo en supuestos especiales autorizados, con propiedad, instalación y mantenimiento a cargo del usuario" },
  { anverso: "¿Qué norma desarrolla el control metrológico del Estado sobre los instrumentos de medida, incluidos los contadores de agua, en sus distintas fases?", reverso: "La Orden ICT/155/2020, de 7 de febrero, que regula la evaluación de la conformidad, la verificación periódica y la verificación tras modificación o reparación de estos instrumentos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué Real Decreto desarrolla la Ley de Metrología en materia de instrumentos de medida?", explicacion: "El RD 244/2016.", dificultad: "media", opciones: ["El Real Decreto 244/2016", "El Real Decreto 140/2003", "El Real Decreto 1215/1997", "El Real Decreto 396/2006"], correcta: 0 },
  { enunciado: "¿A qué requisitos están sujetos los contadores de agua conforme al RD 244/2016?", explicacion: "A los requisitos esenciales comunes del Anexo II del Real Decreto.", dificultad: "dificil", opciones: ["A los requisitos esenciales comunes del Anexo II", "Exclusivamente a los requisitos de la ordenanza fiscal municipal", "Exclusivamente a los requisitos de la Ley de Aguas estatal", "A ningún requisito específico, al no ser instrumentos de medida"], correcta: 0 },
  { enunciado: "¿Qué marcado nacional deben llevar los contadores válidos para extracciones del dominio público hidráulico?", explicacion: "El marcado \"Ñ\".", dificultad: "dificil", opciones: ["El marcado \"Ñ\"", "El marcado \"CE\" exclusivamente, sin ningún otro marcado adicional", "El marcado \"D-400\", propio de las tapas de registro", "El marcado \"B-125\", propio de las tapas de registro"], correcta: 0 },
  { enunciado: "¿En qué supuestos admite el art. 48.1 de la OMECGIA el uso de un caudalímetro en lugar del contador municipal?", explicacion: "Solo en supuestos especiales autorizados, con propiedad y mantenimiento a cargo del usuario.", dificultad: "media", opciones: ["Solo en supuestos especiales autorizados por el Ayuntamiento", "En cualquier suministro, a libre elección del abonado", "Nunca, el caudalímetro está prohibido en la red municipal", "Únicamente en las bocas de riego de titularidad municipal"], correcta: 0 },
  { enunciado: "¿Qué norma desarrolla el control metrológico del Estado sobre los contadores de agua en sus distintas fases?", explicacion: "La Orden ICT/155/2020.", dificultad: "dificil", opciones: ["La Orden ICT/155/2020", "La Ordenanza Fiscal nº 24.25 de Zaragoza", "El Real Decreto 140/2003 de calidad del agua", "La norma UNE-EN 1074 sobre válvulas de suministro"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-200 creado y vinculado como Tema 20 de Oficial Guardallaves.");
