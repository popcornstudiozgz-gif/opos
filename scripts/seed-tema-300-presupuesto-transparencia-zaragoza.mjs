/**
 * Crea tema-300: "El presupuesto local, ingresos y gastos de las entidades
 * locales y la Ordenanza de Transparencia del Ayuntamiento de Zaragoza" —
 * Tema 5 (numero=5, bloque-1) de Bombero/a Conductor/a.
 *
 * Tema 5 oficial (bases2107.pdf, Anexo I): "Presupuesto. Régimen jurídico de
 * los ingresos y gastos locales. La Ordenanza sobre Transparencia y Libre
 * acceso a la información del Ayuntamiento de Zaragoza."
 *
 * Tema dedicado: el presupuesto está en tema-13 y los ingresos en tema-12 y
 * tema-42, pero la Ordenanza de Transparencia de Zaragoza no estaba en
 * ningún tema (tema-26 trata la Ley estatal 19/2013, no la ordenanza).
 *
 * Fuentes leídas en la sesión:
 * - RDLeg 2/2004, texto refundido de la Ley reguladora de las Haciendas
 *   Locales (BOE-A-2004-4214): arts. 2, 59, 162-165, 168, 169 y 184.
 * - Ordenanza sobre Transparencia y Libre Acceso a la Información del
 *   Ayuntamiento de Zaragoza (aprobación inicial BOPZ nº 30 de 07-02-2014;
 *   aprobación definitiva BOPZ nº 74 de 01-04-2014), texto vigente íntegro
 *   (preámbulo, arts. 1-40, disposiciones adicionales y transitorias) en el
 *   portal de normativa municipal (zaragoza.es/sede/servicio/normativa/3983).
 *   Su texto cita normas ya sustituidas (Ley 30/1992, LO 5/1999); el tema se
 *   ciñe a lo que regula la propia Ordenanza y no pregunta por esas remisiones.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-300-presupuesto-transparencia-zaragoza.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-300";
const OPOSICION = "bombero-conductor-ayto-zaragoza";
const BLOQUE_1_ID = "653513ce-b965-421a-a408-7bcc01058baf";
const NUMERO = 5;

const TRLRHL = "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214";
const OTLAI = "https://www.zaragoza.es/sede/servicio/normativa/3983";

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
  const insertadas = await insertar("preguntas", preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden }))));
  console.log(`   ✓ preguntas (${seccion}): ${insertadas.length}`);
}
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });
async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  if (preguntas.length !== 10) { console.error(`❌ ${titulo}: ${preguntas.length} preguntas (se esperaban 10)`); process.exit(1); }
  const [caso] = await insertar("casos_practicos", [{ tema_slug: TEMA, slug, titulo, supuesto, orden }]);
  const insertadas = await insertar("preguntas", preguntas.map((p) => ({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion, dificultad: p.dificultad })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }))));
  await insertar("caso_preguntas", insertadas.map((pregunta, i) => ({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i })));
  console.log(`   ✓ caso: ${titulo}`);
}

const S1 = "presupuesto-general-entidad-local";
const S2 = "ingresos-gastos-locales";
const S3 = "ordenanza-transparencia-zaragoza";

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "El presupuesto local, los ingresos y gastos de las entidades locales y la Ordenanza de Transparencia de Zaragoza",
  descripcion: "El presupuesto general de las entidades locales: definición, contenido, elaboración, aprobación y prórroga. Recursos de las haciendas locales, impuestos municipales y fases del gasto. La Ordenanza sobre Transparencia y Libre Acceso a la Información del Ayuntamiento de Zaragoza.",
  contenido: "Explica qué es el presupuesto municipal, qué documentos lo integran y cuál es su calendario de aprobación hasta su entrada en vigor o prórroga; de dónde obtiene sus ingresos un ayuntamiento y en qué fases se gestiona el gasto; y cómo garantiza el Ayuntamiento de Zaragoza la transparencia, el acceso a su información pública y su reutilización según su propia Ordenanza de 2014.",
  enlaces_boe: [
    { url: TRLRHL, titulo: "Texto refundido de la Ley reguladora de las Haciendas Locales (RDLeg 2/2004)" },
    { url: OTLAI, titulo: "Ordenanza sobre Transparencia y Libre Acceso a la Información del Ayuntamiento de Zaragoza (BOPZ nº 74, 01-04-2014)" },
  ],
  indice_estudio: [
    { seccion: S1, titulo: "El presupuesto general de las entidades locales", articulos: "TRLRHL, arts. 162-169", url: `${TRLRHL}#a162` },
    { seccion: S2, titulo: "Ingresos y gastos de las entidades locales", articulos: "TRLRHL, arts. 2, 59 y 184", url: `${TRLRHL}#a2` },
    { seccion: S3, titulo: "Ordenanza sobre Transparencia y Libre Acceso a la Información", articulos: "Ordenanza, arts. 1-40", url: OTLAI },
  ],
}]);

console.log(`📝 ${S1}...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los presupuestos generales de las entidades locales (art. 162 TRLRHL)?", reverso: "La expresión cifrada, conjunta y sistemática de las obligaciones que como máximo pueden reconocer la entidad y sus organismos autónomos y de los derechos que prevean liquidar en el ejercicio, más las previsiones de ingresos y gastos de sus sociedades mercantiles íntegramente participadas" },
  { anverso: "¿Con qué coincide el ejercicio presupuestario local (art. 163 TRLRHL)?", reverso: "Con el año natural" },
  { anverso: "¿Qué integra el presupuesto general de una entidad local (art. 164 TRLRHL)?", reverso: "El presupuesto de la propia entidad, los de sus organismos autónomos y los estados de previsión de gastos e ingresos de las sociedades mercantiles cuyo capital le pertenezca íntegramente" },
  { anverso: "¿Quién forma el presupuesto general y antes de qué fecha debe remitirlo al Pleno (art. 168 TRLRHL)?", reverso: "Lo forma el Presidente de la entidad (el Alcalde) y lo remite al Pleno, informado por la Intervención, antes del 15 de octubre" },
  { anverso: "¿Qué ocurre si al empezar el ejercicio no ha entrado en vigor el nuevo presupuesto (art. 169.6 TRLRHL)?", reverso: "Se considera automáticamente prorrogado el del ejercicio anterior, con sus créditos iniciales, hasta la entrada en vigor del nuevo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Aprobado inicialmente el presupuesto general, ¿durante cuánto tiempo se expone al público?", explicacion: "15 días, previo anuncio en el boletín oficial de la provincia, para que los interesados puedan presentar reclamaciones ante el Pleno (art. 169.1 TRLRHL).", dificultad: "facil", opciones: ["15 días", "30 días", "10 días"], correcta: 0 },
  { enunciado: "¿Antes de qué fecha debe aprobarse definitivamente el presupuesto general?", explicacion: "Antes del 31 de diciembre del año anterior al del ejercicio en que deba aplicarse (art. 169.2).", dificultad: "media", opciones: ["Antes del 31 de diciembre del año anterior", "Antes del 15 de octubre del año anterior", "Antes del 31 de marzo del propio ejercicio"], correcta: 0 },
  { enunciado: "Cada uno de los presupuestos que integran el presupuesto general debe aprobarse:", explicacion: "Sin déficit inicial (art. 165.4).", dificultad: "media", opciones: ["Sin déficit inicial", "Con un déficit máximo del 3 %", "Con superávit obligatorio del 10 %"], correcta: 0 },
  { enunciado: "Los organismos autónomos remiten su presupuesto a la entidad local de la que dependen antes del:", explicacion: "15 de septiembre de cada año (art. 168.2).", dificultad: "dificil", opciones: ["15 de septiembre", "15 de octubre", "31 de diciembre"], correcta: 0 },
  { enunciado: "El acuerdo de aprobación del presupuesto general:", explicacion: "Es único y no puede aprobarse ninguno de los presupuestos integrantes por separado (art. 168.5).", dificultad: "dificil", opciones: ["Es único, sin que pueda aprobarse ninguno de sus presupuestos por separado", "Se adopta por separado para cada organismo autónomo", "Lo adopta el Alcalde por decreto"], correcta: 0 },
]);

console.log(`📝 ${S2}...`);
await insertar("flashcards", [
  { anverso: "Enumera los recursos de las haciendas locales (art. 2 TRLRHL)", reverso: "Ingresos de su patrimonio y de derecho privado; tributos propios (tasas, contribuciones especiales e impuestos) y recargos; participaciones en tributos del Estado y CCAA; subvenciones; precios públicos; operaciones de crédito; multas y sanciones; y demás prestaciones de derecho público" },
  { anverso: "¿Qué impuestos exigen obligatoriamente los ayuntamientos (art. 59.1 TRLRHL)?", reverso: "El Impuesto sobre Bienes Inmuebles (IBI), el Impuesto sobre Actividades Económicas (IAE) y el Impuesto sobre Vehículos de Tracción Mecánica (IVTM)" },
  { anverso: "¿Qué impuestos pueden establecer potestativamente los ayuntamientos (art. 59.2 TRLRHL)?", reverso: "El Impuesto sobre Construcciones, Instalaciones y Obras (ICIO) y el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (IIVTNU)" },
  { anverso: "¿En qué fases se gestiona el presupuesto de gastos (art. 184 TRLRHL)?", reverso: "Autorización del gasto, disposición o compromiso del gasto, reconocimiento o liquidación de la obligación y ordenación del pago" },
  { anverso: "¿Pueden reunirse varias fases del gasto en un solo acto (art. 184.2 TRLRHL)?", reverso: "Sí, las entidades locales pueden abarcar en un solo acto administrativo dos o más fases, en la forma que se establezca reglamentariamente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuál de estos impuestos es de exigencia obligatoria para los ayuntamientos?", explicacion: "El IVTM figura entre los obligatorios del art. 59.1 TRLRHL, junto al IBI y el IAE.", dificultad: "media", opciones: ["El Impuesto sobre Vehículos de Tracción Mecánica", "El Impuesto sobre Construcciones, Instalaciones y Obras", "El Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana"], correcta: 0 },
  { enunciado: "Los tributos propios de las entidades locales se clasifican en:", explicacion: "Tasas, contribuciones especiales e impuestos (art. 2.1.b TRLRHL).", dificultad: "facil", opciones: ["Tasas, contribuciones especiales e impuestos", "Precios públicos, multas y subvenciones", "Impuestos estatales y autonómicos"], correcta: 0 },
  { enunciado: "¿Cuál es la primera fase de gestión del presupuesto de gastos?", explicacion: "La autorización del gasto (art. 184.1.a).", dificultad: "facil", opciones: ["La autorización del gasto", "La ordenación del pago", "El reconocimiento de la obligación"], correcta: 0 },
  { enunciado: "¿Es el producto de las multas un recurso de las haciendas locales?", explicacion: "Sí, el art. 2.1.g) incluye el producto de las multas y sanciones en el ámbito de sus competencias.", dificultad: "media", opciones: ["Sí, en el ámbito de sus competencias", "No, las multas se ingresan siempre en el Estado", "Solo en municipios de gran población"], correcta: 0 },
  { enunciado: "¿Qué fase del gasto consiste en la orden de pagar una obligación ya reconocida?", explicacion: "La ordenación del pago, última de las cuatro fases del art. 184.1.", dificultad: "media", opciones: ["La ordenación del pago", "La disposición del gasto", "La autorización del gasto"], correcta: 0 },
]);

console.log(`📝 ${S3}...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el objeto de la Ordenanza sobre Transparencia y Libre Acceso a la Información del Ayuntamiento de Zaragoza (art. 1)?", reverso: "Garantizar la transparencia en la actuación del Ayuntamiento, el libre acceso a su información pública y la reutilización de la misma, con medios preferentemente electrónicos" },
  { anverso: "¿Quién puede ejercer los derechos de la Ordenanza de Transparencia (art. 2)?", reverso: "Cualquier persona, física o jurídica, sin que pueda exigirse una nacionalidad determinada ni la residencia en Zaragoza" },
  { anverso: "¿Cuáles son los dos medios de acceso a la información pública que prevé la Ordenanza?", reverso: "La publicación, por iniciativa del propio Ayuntamiento en su sede electrónica, y la puesta a disposición, previa solicitud del interesado" },
  { anverso: "¿Quién es competente para resolver las solicitudes de acceso a la información según la Ordenanza (art. 4)?", reverso: "El Alcalde, que puede delegar su ejercicio en un órgano o servicio del Ayuntamiento" },
  { anverso: "¿En qué plazo debe resolverse una solicitud de acceso según la Ordenanza (art. 34)?", reverso: "En un plazo máximo de veinte días, ampliable veinte días más por traslado a terceros o por la elevada complejidad de la solicitud" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según la Ordenanza de Transparencia de Zaragoza, para solicitar información pública:", explicacion: "La solicitud es gratuita y no exige alegar motivo ni indicar la finalidad (art. 30).", dificultad: "facil", opciones: ["No es necesario alegar ningún motivo ni indicar la finalidad", "Hay que acreditar un interés legítimo directo", "Hay que estar empadronado en Zaragoza"], correcta: 0 },
  { enunciado: "¿Qué principio de la Ordenanza presume el carácter público de la información municipal?", explicacion: "El principio de publicidad de la información (art. 3): el acceso solo puede denegarse en los supuestos previstos y mediante resolución motivada.", dificultad: "media", opciones: ["Publicidad de la información", "Privacidad en el diseño", "Compromiso de servicio"], correcta: 0 },
  { enunciado: "Si la información solicitada ya está publicada, el Ayuntamiento comunicará al solicitante dónde encontrarla en la sede electrónica en un plazo:", explicacion: "Inferior a cinco días, dándose por finalizado el procedimiento (art. 32).", dificultad: "dificil", opciones: ["Inferior a cinco días", "De veinte días", "De dos meses"], correcta: 0 },
  { enunciado: "¿Qué infracción considera muy grave la Ordenanza (art. 36)?", explicacion: "La alteración del contenido de forma que induzca a confusión o engaño, o la desnaturalización del sentido de la información pública reutilizada.", dificultad: "dificil", opciones: ["Desnaturalizar el sentido de la información pública reutilizada", "No citar la fecha de la última actualización", "Solicitar información de forma reiterada"], correcta: 0 },
  { enunciado: "¿Cómo es la puesta a disposición de la información según el art. 35 de la Ordenanza?", explicacion: "Gratuita, aunque la expedición de copias o la conversión a otro formato pueden devengar tasas o precios.", dificultad: "media", opciones: ["Gratuita, salvo copias o conversión de formato", "Siempre sujeta a tasa", "Gratuita solo para personas empadronadas"], correcta: 0 },
]);

console.log("📖 glosario...");
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Prórroga presupuestaria", definicion: "Aplicación automática del presupuesto del año anterior, con sus créditos iniciales, cuando al empezar el ejercicio no ha entrado en vigor el nuevo (art. 169.6 TRLRHL)." },
  { tema_slug: TEMA, seccion: S1, termino: "Bases de ejecución", definicion: "Parte del presupuesto que adapta las normas presupuestarias generales a la organización y circunstancias de la entidad local (art. 165.1 TRLRHL)." },
  { tema_slug: TEMA, seccion: S2, termino: "Impuesto potestativo", definicion: "Impuesto que el ayuntamiento puede decidir establecer mediante ordenanza fiscal; en los municipios son el ICIO y el IIVTNU (art. 59.2 TRLRHL)." },
  { tema_slug: TEMA, seccion: S2, termino: "Ordenación del pago", definicion: "Última fase de gestión del gasto, en la que se ordena pagar una obligación ya reconocida (art. 184 TRLRHL)." },
  { tema_slug: TEMA, seccion: S3, termino: "Publicidad activa", definicion: "Publicación por iniciativa propia del Ayuntamiento de la información que potencie la transparencia y el control de su actuación, sin esperar a que nadie la pida." },
  { tema_slug: TEMA, seccion: S3, termino: "Reutilización", definicion: "Uso por personas o entidades de la información pública municipal para otros fines; según la Ordenanza no necesita autorización previa salvo que se indique lo contrario." },
]);

console.log("🧩 casos prácticos...");
await crearCaso({
  slug: "caso-nuevo-vehiculo-servicio-presupuesto",
  titulo: "La compra de un nuevo vehículo para el Servicio",
  orden: 1,
  supuesto: "El Servicio contra Incendios necesita un nuevo vehículo de rescate. La jefatura explica a la plantilla cómo debe preverse ese gasto en el presupuesto municipal y cómo se tramita hasta su pago.",
  preguntas: [
    q(S1, "facil", "¿En qué documento debe preverse el crédito para comprar el vehículo?", ["En el presupuesto general del Ayuntamiento", "En el Estatuto de Autonomía", "En la Ordenanza de Transparencia"], "Los créditos necesarios para atender las obligaciones figuran en los estados de gastos del presupuesto (art. 165.1.a TRLRHL)."),
    q(S1, "media", "¿Quién forma el presupuesto general del Ayuntamiento?", ["El Alcalde, como Presidente de la entidad", "El jefe del Servicio contra Incendios", "El Gobierno de Aragón"], "Art. 168.1 y 168.4 TRLRHL."),
    q(S1, "media", "¿Qué anexo del presupuesto recogerá la inversión en el vehículo?", ["El anexo de las inversiones a realizar en el ejercicio", "El anexo de personal", "El anexo de beneficios fiscales"], "Art. 168.1.d) TRLRHL."),
    q(S1, "media", "Si el nuevo presupuesto no entrara en vigor el 1 de enero, ¿qué ocurriría?", ["Se prorrogaría automáticamente el del año anterior con sus créditos iniciales", "El Servicio no podría gastar nada hasta su aprobación", "Se aplicaría el presupuesto del Estado"], "Art. 169.6 TRLRHL."),
    q(S1, "media", "¿Con qué coincide el ejercicio en el que debe imputarse la compra?", ["Con el año natural", "Con el año escolar", "Con el mandato de la corporación"], "Art. 163 TRLRHL."),
    q(S2, "facil", "¿Cuál es la primera fase del gasto para comprar el vehículo?", ["La autorización del gasto", "La ordenación del pago", "El reconocimiento de la obligación"], "Art. 184.1 TRLRHL."),
    q(S2, "media", "Adjudicado el contrato, ¿qué fase compromete el gasto con el proveedor?", ["La disposición o compromiso del gasto", "La autorización del gasto", "La ordenación del pago"], "La segunda fase es la disposición o compromiso del gasto."),
    q(S2, "media", "Entregado el vehículo y conformada la factura, ¿qué fase sigue?", ["El reconocimiento o liquidación de la obligación", "La autorización del gasto", "La prórroga del presupuesto"], "Tercera fase del art. 184.1."),
    q(S2, "media", "¿Podría el Ayuntamiento abarcar varias de esas fases en un solo acto?", ["Sí, en la forma que se establezca reglamentariamente", "No, nunca", "Solo si lo autoriza el Estado"], "Art. 184.2 TRLRHL."),
    q(S3, "media", "Una vez adjudicado el contrato, ¿dónde podrá consultar cualquier ciudadano la información de esa compra?", ["En el perfil de contratante de la sede electrónica, según la Ordenanza de Transparencia", "Solo pidiéndola por escrito al Alcalde", "En ningún sitio, la información de contratos es reservada"], "El art. 22 de la Ordenanza obliga a publicar el perfil de contratante y la relación de contratos adjudicados."),
  ],
});
await crearCaso({
  slug: "caso-ciudadano-pide-datos-intervenciones",
  titulo: "Un ciudadano pide datos de las intervenciones del Servicio",
  orden: 2,
  supuesto: "Un investigador que vive en Huesca solicita al Ayuntamiento de Zaragoza datos sobre el número de intervenciones del Servicio contra Incendios en los últimos años para un estudio.",
  preguntas: [
    q(S3, "facil", "¿Puede solicitar la información aunque no viva en Zaragoza?", ["Sí, la Ordenanza no exige residencia ni nacionalidad", "No, solo pueden pedirla los empadronados", "Solo si acredita un interés directo"], "Art. 2 de la Ordenanza."),
    q(S3, "facil", "¿Debe explicar para qué quiere los datos?", ["No, no es necesario alegar motivo ni finalidad", "Sí, siempre", "Solo si los va a publicar"], "Art. 30 de la Ordenanza."),
    q(S3, "media", "¿Qué debe contener su solicitud?", ["Una descripción suficiente de la información, su identidad, una dirección para notificaciones y, en su caso, el formato preferido", "Únicamente su firma", "La identificación exacta del expediente y del servicio responsable"], "Art. 30: no es precisa la identificación específica de la información ni del órgano responsable."),
    q(S3, "media", "Si la solicitud fuese confusa, ¿qué plazo tendría para aclararla?", ["Diez días", "Cinco días", "Un mes"], "Art. 30: requerimiento de subsanación o aclaración en plazo de diez días."),
    q(S3, "media", "¿En qué plazo máximo debe resolverse la solicitud?", ["Veinte días, ampliables otros veinte en los casos previstos", "Tres meses", "Seis meses"], "Art. 34 de la Ordenanza."),
    q(S3, "dificil", "Si para darle los datos hubiera que elaborar un informe nuevo cruzando varias fuentes, ¿qué podría ocurrir?", ["Podría inadmitirse por requerir una reelaboración previa", "Habría que estimarla siempre", "Se le cobraría el coste completo del estudio"], "El art. 31.d) prevé inadmitir solicitudes relativas a información para cuya divulgación sea necesaria una reelaboración previa."),
    q(S3, "media", "Si el Ayuntamiento no respondiera en plazo, ¿cómo podría entender su solicitud?", ["Desestimada", "Estimada", "Archivada sin efectos"], "Art. 34: el solicitante puede entender desestimada su solicitud si no se dicta y notifica resolución en plazo."),
    q(S3, "media", "Si luego quisiera publicar los datos en su estudio, ¿necesitaría autorización previa?", ["No, salvo que se indique expresamente lo contrario", "Sí, siempre del Pleno", "Sí, del Gobierno de Aragón"], "Art. 12: la información es reutilizable sin autorización previa salvo indicación expresa."),
    q(S3, "media", "Al reutilizarlos, ¿qué condición general debe respetar?", ["Citar al Ayuntamiento como fuente sin dar a entender que patrocina el estudio", "Pagar siempre una tasa", "Enviar el estudio al Alcalde antes de publicarlo"], "Art. 12.b) de la Ordenanza."),
    q(S3, "dificil", "¿Qué sanción corresponde a una infracción grave de la Ordenanza?", ["Multa de 1.001 a 2.000 euros", "Multa de hasta 1.000 euros", "Multa de 2.001 a 3.000 euros"], "Art. 37: graves, de 1.001 a 2.000 euros."),
  ],
});
await crearCaso({
  slug: "caso-presupuesto-publicacion-transparencia",
  titulo: "La tramitación y publicación del presupuesto municipal",
  orden: 3,
  supuesto: "En otoño, el Ayuntamiento tramita el presupuesto del año siguiente y un grupo vecinal sigue el proceso para presentar reclamaciones y consultar después la información publicada.",
  preguntas: [
    q(S1, "facil", "¿Antes de qué fecha debe remitirse el presupuesto general al Pleno?", ["Antes del 15 de octubre", "Antes del 15 de septiembre", "Antes del 31 de diciembre"], "Art. 168.4 TRLRHL."),
    q(S1, "media", "Tras la aprobación inicial, ¿cuánto tiempo tiene el grupo vecinal para presentar reclamaciones?", ["15 días de exposición pública", "Un mes", "Tres días hábiles"], "Art. 169.1 TRLRHL."),
    q(S1, "media", "¿Ante quién se presentan las reclamaciones?", ["Ante el Pleno", "Ante el Alcalde", "Ante el Tribunal de Cuentas"], "Art. 169.1 TRLRHL."),
    q(S1, "media", "Si no se presenta ninguna reclamación, ¿qué ocurre?", ["El presupuesto se considera definitivamente aprobado", "Hay que repetir la exposición pública", "Lo aprueba el Gobierno de Aragón"], "Art. 169.1 TRLRHL."),
    q(S1, "dificil", "Una vez aprobado definitivamente, ¿cuándo entra en vigor el presupuesto?", ["Una vez publicado en la forma prevista (resumido por capítulos en el boletín de la provincia)", "El mismo día de su aprobación inicial", "Al mes de su aprobación definitiva, en todo caso"], "Art. 169.3 y 169.5 TRLRHL."),
    q(S3, "media", "Según la Ordenanza de Transparencia, ¿debe publicarse el presupuesto anual en la sede electrónica?", ["Sí, junto con su memoria, alegaciones, modificaciones y liquidación", "No, solo en el boletín oficial", "Solo si lo solicita un concejal"], "Art. 21.a) de la Ordenanza."),
    q(S3, "media", "¿Con qué periodicidad debe publicarse la información sobre la ejecución presupuestaria?", ["Mensual", "Anual", "Cuatrienal"], "Art. 21.c) de la Ordenanza."),
    q(S3, "dificil", "¿Durante cuánto tiempo, como mínimo, debe mantenerse publicada la información económica?", ["Cinco años desde que se generó", "Dos años", "Mientras dure el mandato"], "Art. 29 de la Ordenanza."),
    q(S3, "media", "¿Qué principio de la Ordenanza exige indicar la unidad responsable y la fecha de última actualización?", ["Calidad de la información", "Libre reutilización", "Acceso inmediato"], "Art. 3, principio de calidad de la información."),
    q(S2, "media", "Entre los ingresos que prevé el presupuesto, ¿cuál es un tributo propio del Ayuntamiento?", ["El Impuesto sobre Bienes Inmuebles", "La participación en los tributos del Estado", "Una subvención autonómica"], "El IBI es un impuesto municipal (tributo propio); las participaciones y subvenciones son otros recursos del art. 2 TRLRHL."),
  ],
});

console.log(`\n🔗 Vinculando ${TEMA} como Tema ${NUMERO} de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_1_ID, numero: NUMERO, orden: NUMERO, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log(`\n✅ ${TEMA} creado y vinculado como Tema ${NUMERO} de Bombero/a Conductor/a.`);
