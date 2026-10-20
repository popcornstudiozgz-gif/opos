/**
 * Crea tema-299: "La Administración Pública en la Constitución. Leyes
 * 39/2015 y 40/2015: disposiciones generales. El interesado y las fases del
 * procedimiento" — Tema 3 (numero=3, bloque-1) de Bombero/a Conductor/a.
 *
 * Tema 3 oficial (bases2107.pdf, Anexo I): "La Administración Pública en la
 * Constitución. La Ley 39/2015 [...]: Disposiciones generales. La Ley
 * 40/2015 [...]: Disposiciones generales, principios de actuación y
 * funcionamiento del sector público. El administrado. El procedimiento
 * administrativo: concepto y fases."
 *
 * Tema dedicado (no recorte de un canónico): la materia está repartida en
 * este proyecto entre tema-1 (título IV CE), tema-4 (interesados) y tema-7
 * (procedimiento), y cada número de tema admite un solo canónico.
 *
 * Fuentes leídas en la sesión (texto consolidado del BOE):
 * - Constitución (BOE-A-1978-31229), arts. 103-106.
 * - Ley 39/2015 (BOE-A-2015-10565), arts. 1-4, 54, 75 y 84.
 * - Ley 40/2015 (BOE-A-2015-10566), arts. 1-3.
 *
 * Incluye flashcards, preguntas (3 opciones, como el examen real), glosario
 * y 3 casos prácticos de 10 preguntas (primera opción = correcta).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-299-administracion-publica-procedimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-299";
const OPOSICION = "bombero-conductor-ayto-zaragoza";
const BLOQUE_1_ID = "653513ce-b965-421a-a408-7bcc01058baf";
const NUMERO = 3;

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const LPAC = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const LRJSP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566";

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

const S1 = "administracion-publica-constitucion";
const S2 = "leyes-39-40-2015-disposiciones-generales";
const S3 = "interesado-fases-procedimiento";

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "La Administración Pública en la Constitución, las Leyes 39/2015 y 40/2015 y el procedimiento administrativo",
  descripcion: "La Administración Pública en la Constitución (arts. 103-106). Disposiciones generales de la Ley 39/2015 y de la Ley 40/2015: objeto, ámbito subjetivo y principios de actuación del sector público. El interesado (administrado) y las fases del procedimiento administrativo.",
  contenido: "Recorre el marco constitucional de la Administración Pública (principios del art. 103, Fuerzas y Cuerpos de Seguridad, audiencia y acceso a archivos, control judicial y responsabilidad patrimonial), las disposiciones generales de las dos leyes administrativas básicas de 2015 —qué regula cada una, a quién se aplica y los principios de actuación del sector público— y el procedimiento administrativo visto desde el ciudadano: quién tiene capacidad de obrar, quién es interesado y cómo se inicia, se instruye y termina un procedimiento.",
  enlaces_boe: [
    { url: CE, titulo: "Constitución Española (título IV)" },
    { url: LPAC, titulo: "Ley 39/2015, del Procedimiento Administrativo Común de las Administraciones Públicas" },
    { url: LRJSP, titulo: "Ley 40/2015, de Régimen Jurídico del Sector Público" },
  ],
  indice_estudio: [
    { seccion: S1, titulo: "La Administración Pública en la Constitución", articulos: "CE, arts. 103-106", url: `${CE}#a103` },
    { seccion: S2, titulo: "Disposiciones generales de las Leyes 39/2015 y 40/2015", articulos: "Ley 39/2015, arts. 1-2; Ley 40/2015, arts. 1-3", url: `${LRJSP}#a3` },
    { seccion: S3, titulo: "El interesado y las fases del procedimiento", articulos: "Ley 39/2015, arts. 3-4, 54, 75 y 84", url: `${LPAC}#a4` },
  ],
}]);

console.log(`📝 ${S1}...`);
await insertar("flashcards", [
  { anverso: "¿Con qué principios actúa la Administración Pública según el art. 103.1 CE?", reverso: "Sirve con objetividad los intereses generales y actúa de acuerdo con los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho" },
  { anverso: "¿Qué debe regular la ley sobre los funcionarios según el art. 103.3 CE?", reverso: "Su estatuto, el acceso a la función pública según los principios de mérito y capacidad, las peculiaridades de su derecho de sindicación, el sistema de incompatibilidades y las garantías de imparcialidad" },
  { anverso: "¿Qué misión atribuye el art. 104 CE a las Fuerzas y Cuerpos de Seguridad?", reverso: "Proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana, bajo la dependencia del Gobierno" },
  { anverso: "¿Qué tres materias manda regular por ley el art. 105 CE?", reverso: "La audiencia de los ciudadanos en la elaboración de disposiciones que les afecten; el acceso a archivos y registros administrativos; y el procedimiento de los actos administrativos, garantizando la audiencia del interesado" },
  { anverso: "¿Qué establece el art. 106 CE sobre el control y la responsabilidad de la Administración?", reverso: "Los Tribunales controlan la potestad reglamentaria y la legalidad de la actuación administrativa; y los particulares tienen derecho a ser indemnizados por toda lesión causada por el funcionamiento de los servicios públicos, salvo fuerza mayor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el art. 103.1 CE, la Administración Pública actúa con sometimiento pleno:", explicacion: "\"Con sometimiento pleno a la ley y al Derecho\" (art. 103.1 CE).", dificultad: "facil", opciones: ["A la ley y al Derecho", "Al Gobierno de la Nación", "A las instrucciones de sus superiores jerárquicos"], correcta: 0 },
  { enunciado: "¿Cuál de estos NO es uno de los principios de actuación de la Administración que enumera el art. 103.1 CE?", explicacion: "El art. 103.1 cita eficacia, jerarquía, descentralización, desconcentración y coordinación; no la autonomía financiera.", dificultad: "media", opciones: ["Autonomía financiera", "Desconcentración", "Coordinación"], correcta: 0 },
  { enunciado: "Según el art. 103.3 CE, el acceso a la función pública se rige por los principios de:", explicacion: "Mérito y capacidad.", dificultad: "facil", opciones: ["Mérito y capacidad", "Antigüedad y jerarquía", "Libre designación y confianza"], correcta: 0 },
  { enunciado: "El derecho de los particulares a ser indemnizados por las lesiones causadas por el funcionamiento de los servicios públicos está en el artículo:", explicacion: "Art. 106.2 CE, salvo los casos de fuerza mayor.", dificultad: "media", opciones: ["106 CE", "103 CE", "105 CE"], correcta: 0 },
  { enunciado: "El acceso de los ciudadanos a los archivos y registros administrativos lo prevé el art. 105 CE, salvo en lo que afecte a:", explicacion: "La seguridad y defensa del Estado, la averiguación de los delitos y la intimidad de las personas.", dificultad: "dificil", opciones: ["La seguridad y defensa del Estado, la averiguación de los delitos y la intimidad de las personas", "Cualquier expediente municipal en tramitación", "Los documentos firmados por un alcalde"], correcta: 0 },
]);

console.log(`📝 ${S2}...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula la Ley 39/2015 según su art. 1?", reverso: "Los requisitos de validez y eficacia de los actos administrativos, el procedimiento administrativo común (incluido el sancionador y el de responsabilidad patrimonial) y los principios de la iniciativa legislativa y la potestad reglamentaria" },
  { anverso: "¿Qué regula la Ley 40/2015 según su art. 1?", reverso: "Las bases del régimen jurídico de las Administraciones Públicas, los principios del sistema de responsabilidad y de la potestad sancionadora, y la organización y funcionamiento de la Administración General del Estado y su sector público institucional" },
  { anverso: "¿Qué comprende el sector público según el art. 2 de las Leyes 39/2015 y 40/2015?", reverso: "La Administración General del Estado, las Administraciones de las Comunidades Autónomas, las Entidades que integran la Administración Local y el sector público institucional" },
  { anverso: "¿Qué principios generales fija el art. 3.1 de la Ley 40/2015 para las Administraciones Públicas?", reverso: "Sirven con objetividad los intereses generales y actúan según los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la Constitución, a la Ley y al Derecho" },
  { anverso: "Cita cuatro de los principios que deben respetar las Administraciones en su actuación (art. 3.1 Ley 40/2015)", reverso: "Por ejemplo: servicio efectivo a los ciudadanos; simplicidad, claridad y proximidad; participación, objetividad y transparencia; buena fe, confianza legítima y lealtad institucional; responsabilidad por la gestión pública; eficacia; economía; eficiencia; cooperación, colaboración y coordinación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué ley regula el procedimiento administrativo común de las Administraciones Públicas?", explicacion: "La Ley 39/2015, de 1 de octubre (art. 1).", dificultad: "facil", opciones: ["La Ley 39/2015, de 1 de octubre", "La Ley 40/2015, de 1 de octubre", "La Ley 7/1985, de 2 de abril"], correcta: 0 },
  { enunciado: "Según la Ley 40/2015, ¿se consideran Administraciones Públicas las Entidades que integran la Administración Local?", explicacion: "Sí: el art. 2.3 las incluye junto a la AGE, las CCAA y los organismos públicos y entidades de derecho público vinculados.", dificultad: "facil", opciones: ["Sí, expresamente", "No, solo el Estado y las Comunidades Autónomas", "Solo las de más de 250.000 habitantes"], correcta: 0 },
  { enunciado: "Según el art. 3.2 de la Ley 40/2015, las Administraciones Públicas se relacionan entre sí:", explicacion: "A través de medios electrónicos que aseguren la interoperabilidad y seguridad de los sistemas.", dificultad: "media", opciones: ["A través de medios electrónicos", "Exclusivamente por correo postal certificado", "Solo mediante convenios firmados en papel"], correcta: 0 },
  { enunciado: "¿Cuál de estos es un principio de actuación recogido en el art. 3.1 de la Ley 40/2015?", explicacion: "\"Buena fe, confianza legítima y lealtad institucional\" es la letra e) del art. 3.1.", dificultad: "media", opciones: ["Buena fe, confianza legítima y lealtad institucional", "Reserva y secreto de toda la actuación administrativa", "Prioridad de los intereses particulares sobre los generales"], correcta: 0 },
  { enunciado: "Según el art. 3.4 de la Ley 40/2015, cada Administración Pública actúa para el cumplimiento de sus fines con:", explicacion: "Personalidad jurídica única.", dificultad: "dificil", opciones: ["Personalidad jurídica única", "Una personalidad jurídica por cada órgano", "Sin personalidad jurídica propia"], correcta: 0 },
]);

console.log(`📝 ${S3}...`);
await insertar("flashcards", [
  { anverso: "¿Quién tiene capacidad de obrar ante las Administraciones Públicas (art. 3 Ley 39/2015)?", reverso: "Las personas físicas o jurídicas con capacidad de obrar según las normas civiles; los menores para los derechos que el ordenamiento les permita ejercer sin asistencia; y, cuando la ley lo declare, grupos de afectados, uniones sin personalidad y patrimonios independientes" },
  { anverso: "¿Quiénes son interesados en el procedimiento (art. 4.1 Ley 39/2015)?", reverso: "Quienes lo promuevan como titulares de derechos o intereses legítimos; quienes, sin haberlo iniciado, tengan derechos que puedan resultar afectados; y aquellos cuyos intereses legítimos puedan resultar afectados y se personen antes de la resolución definitiva" },
  { anverso: "¿Cómo pueden iniciarse los procedimientos administrativos (art. 54 Ley 39/2015)?", reverso: "De oficio o a solicitud del interesado" },
  { anverso: "¿Cómo se realizan los actos de instrucción del procedimiento (art. 75 Ley 39/2015)?", reverso: "De oficio y a través de medios electrónicos, por el órgano que tramite el procedimiento, sin perjuicio del derecho de los interesados a proponer actuaciones" },
  { anverso: "¿Qué pone fin al procedimiento administrativo (art. 84 Ley 39/2015)?", reverso: "La resolución, el desistimiento, la renuncia al derecho (si no está prohibida) y la declaración de caducidad; también la imposibilidad material de continuarlo por causas sobrevenidas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según el art. 54 de la Ley 39/2015, los procedimientos pueden iniciarse:", explicacion: "De oficio o a solicitud del interesado.", dificultad: "facil", opciones: ["De oficio o a solicitud del interesado", "Solo de oficio", "Solo a solicitud del interesado"], correcta: 0 },
  { enunciado: "Un vecino que no inició un procedimiento pero cuyos derechos pueden verse afectados por la resolución, ¿es interesado?", explicacion: "Sí, conforme al art. 4.1.b) de la Ley 39/2015.", dificultad: "media", opciones: ["Sí, según el art. 4.1.b) de la Ley 39/2015", "No, solo es interesado quien inicia el procedimiento", "Solo si lo autoriza el órgano instructor"], correcta: 0 },
  { enunciado: "¿Cuál de estas NO es una forma de terminación del procedimiento según el art. 84 de la Ley 39/2015?", explicacion: "Terminan el procedimiento la resolución, el desistimiento, la renuncia y la caducidad (y la imposibilidad material sobrevenida). La subsanación es un trámite, no una forma de terminación.", dificultad: "media", opciones: ["La subsanación de la solicitud", "El desistimiento", "La declaración de caducidad"], correcta: 0 },
  { enunciado: "Los actos de instrucción del procedimiento se realizan, según el art. 75 de la Ley 39/2015:", explicacion: "De oficio y a través de medios electrónicos por el órgano que tramita.", dificultad: "media", opciones: ["De oficio y a través de medios electrónicos", "Únicamente a instancia del interesado", "Por el órgano que resolverá, nunca por el que tramita"], correcta: 0 },
  { enunciado: "Cuando la condición de interesado deriva de una relación jurídica transmisible, el derecho-habiente:", explicacion: "Sucede en tal condición cualquiera que sea el estado del procedimiento (art. 4.3).", dificultad: "dificil", opciones: ["Sucede en la condición de interesado, sea cual sea el estado del procedimiento", "Debe iniciar un procedimiento nuevo", "Solo puede personarse antes del trámite de audiencia"], correcta: 0 },
]);

console.log("📖 glosario...");
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Desconcentración", definicion: "Traspaso de competencias de un órgano superior a otro inferior dentro de la misma Administración; es uno de los principios del art. 103.1 CE." },
  { tema_slug: TEMA, seccion: S1, termino: "Responsabilidad patrimonial", definicion: "Obligación de la Administración de indemnizar a los particulares por las lesiones causadas por el funcionamiento de los servicios públicos, salvo fuerza mayor (art. 106.2 CE)." },
  { tema_slug: TEMA, seccion: S2, termino: "Sector público institucional", definicion: "Organismos públicos y entidades de derecho público o privado vinculados o dependientes de las Administraciones Públicas, y universidades públicas (art. 2.2 Ley 40/2015)." },
  { tema_slug: TEMA, seccion: S2, termino: "Interoperabilidad", definicion: "Capacidad de los sistemas electrónicos de distintas Administraciones para intercambiar datos y servicios; la Ley 40/2015 exige asegurarla en sus relaciones." },
  { tema_slug: TEMA, seccion: S3, termino: "Interesado", definicion: "Persona que promueve un procedimiento o cuyos derechos o intereses legítimos pueden verse afectados por su resolución (art. 4 Ley 39/2015)." },
  { tema_slug: TEMA, seccion: S3, termino: "Caducidad", definicion: "Forma de terminación del procedimiento por el transcurso del plazo legal sin actividad, que lo deja sin efecto (art. 84 Ley 39/2015)." },
]);

console.log("🧩 casos prácticos...");
await crearCaso({
  slug: "caso-vecino-reclama-dano-intervencion-servicio-publico",
  titulo: "Un vecino reclama por un daño tras una intervención del servicio",
  orden: 1,
  supuesto: "Tras una salida del Servicio contra Incendios a un edificio, un vecino del bajo afirma que el agua utilizada en la extinción dañó su local y pregunta en el parque qué puede hacer y cómo debe actuar la Administración.",
  preguntas: [
    q(S1, "facil", "¿Qué artículo de la Constitución reconoce el derecho del vecino a ser indemnizado por las lesiones causadas por el funcionamiento de un servicio público?", ["El art. 106.2 CE", "El art. 103.3 CE", "El art. 104.1 CE"], "El art. 106.2 CE reconoce el derecho a indemnización por toda lesión consecuencia del funcionamiento de los servicios públicos, salvo fuerza mayor."),
    q(S1, "media", "¿En qué caso excluye la Constitución esa indemnización?", ["En los casos de fuerza mayor", "Siempre que el servicio actuara en una emergencia", "Cuando el daño lo cause personal funcionario"], "El art. 106.2 CE excluye únicamente los casos de fuerza mayor."),
    q(S1, "media", "¿Quién controla la legalidad de la actuación administrativa en este supuesto, según el art. 106.1 CE?", ["Los Tribunales", "El propio jefe del parque de bomberos", "El Consejo de Estado en exclusiva"], "Los Tribunales controlan la potestad reglamentaria y la legalidad de la actuación administrativa."),
    q(S2, "media", "¿Qué ley contiene los principios del sistema de responsabilidad de las Administraciones Públicas?", ["La Ley 40/2015", "La Ley 31/1995", "La Ley 53/1984"], "Según su art. 1, la Ley 40/2015 regula los principios del sistema de responsabilidad de las Administraciones Públicas."),
    q(S2, "media", "¿Y qué ley regula el procedimiento de reclamación de responsabilidad que tendría que seguir el vecino?", ["La Ley 39/2015, que incluye ese procedimiento dentro del procedimiento común", "La Ley 40/2015, que no remite a ninguna otra", "El Estatuto de Autonomía de Aragón"], "El art. 1 de la Ley 39/2015 incluye en su objeto el procedimiento de reclamación de responsabilidad de las Administraciones Públicas."),
    q(S3, "facil", "Si el vecino presenta una reclamación, ¿cómo se habrá iniciado ese procedimiento?", ["A solicitud del interesado", "De oficio", "Por denuncia anónima"], "Los procedimientos se inician de oficio o a solicitud del interesado (art. 54 Ley 39/2015); aquí lo promueve el propio vecino."),
    q(S3, "media", "¿Qué condición tiene el vecino en ese procedimiento?", ["Interesado, por promoverlo como titular de derechos", "Testigo, sin derechos en el procedimiento", "Órgano instructor"], "Es interesado por promoverlo como titular de derechos o intereses legítimos (art. 4.1.a Ley 39/2015)."),
    q(S3, "media", "Si el propietario del local, que no es el vecino reclamante, puede verse afectado por la resolución, ¿qué es?", ["También interesado, aunque no haya iniciado el procedimiento", "Un tercero sin ninguna intervención posible", "Responsable del daño"], "Son interesados quienes, sin iniciar el procedimiento, tengan derechos que puedan resultar afectados (art. 4.1.b)."),
    q(S3, "dificil", "Si el vecino decide retirar su reclamación antes de que se resuelva, ¿qué figura pondría fin al procedimiento?", ["El desistimiento", "La caducidad", "La responsabilidad patrimonial"], "El desistimiento es una de las formas de terminación previstas en el art. 84 de la Ley 39/2015."),
    q(S2, "media", "¿Qué principio del art. 3.1 de la Ley 40/2015 exige al Ayuntamiento tratar la reclamación del vecino con claridad y cercanía?", ["Simplicidad, claridad y proximidad a los ciudadanos", "Jerarquía", "Descentralización"], "La letra b) del art. 3.1 recoge la simplicidad, claridad y proximidad a los ciudadanos."),
  ],
});
await crearCaso({
  slug: "caso-nuevo-bombero-principios-administracion",
  titulo: "Un bombero en prácticas repasa los principios de la Administración",
  orden: 2,
  supuesto: "Un bombero en prácticas recién incorporado pregunta a su jefe de turno por qué el Servicio contra Incendios, como parte del Ayuntamiento, se rige por las mismas reglas que cualquier otra Administración Pública.",
  preguntas: [
    q(S2, "facil", "¿Forma parte el Ayuntamiento de Zaragoza del sector público al que se aplica la Ley 40/2015?", ["Sí, como Entidad que integra la Administración Local", "No, la Ley 40/2015 solo se aplica al Estado", "Solo su sector público institucional"], "El art. 2.1.c) incluye a las Entidades que integran la Administración Local."),
    q(S1, "facil", "¿A qué intereses sirve la Administración según el art. 103.1 CE?", ["A los intereses generales, con objetividad", "A los intereses del Gobierno de turno", "A los intereses de sus empleados"], "La Administración sirve con objetividad los intereses generales (art. 103.1 CE)."),
    q(S1, "media", "¿Qué principio del art. 103.1 CE explica que el bombero en prácticas siga las órdenes de su jefe de turno?", ["Jerarquía", "Descentralización", "Participación"], "La jerarquía es uno de los principios de actuación del art. 103.1 CE."),
    q(S1, "media", "¿Por qué principios se rigió el acceso del bombero a su plaza, según el art. 103.3 CE?", ["Mérito y capacidad", "Antigüedad", "Proximidad al parque"], "El art. 103.3 CE remite a la ley el acceso a la función pública de acuerdo con los principios de mérito y capacidad."),
    q(S2, "media", "Según el art. 3.1 de la Ley 40/2015, además de a la Ley y al Derecho, las Administraciones actúan con sometimiento pleno a:", ["La Constitución", "Los reglamentos internos del parque", "Los acuerdos sindicales"], "\"Con sometimiento pleno a la Constitución, a la Ley y al Derecho\" (art. 3.1)."),
    q(S2, "media", "¿Qué principio de la Ley 40/2015 se refleja en que el Servicio optimice el uso de vehículos y material?", ["Eficiencia en la asignación y utilización de los recursos públicos", "Confianza legítima", "Lealtad institucional"], "La eficiencia en la asignación y utilización de los recursos públicos es la letra j) del art. 3.1."),
    q(S2, "dificil", "¿Qué principio de la Ley 40/2015 rige la colaboración del Servicio municipal con otros servicios de emergencia de otras Administraciones?", ["Cooperación, colaboración y coordinación entre las Administraciones Públicas", "Desconcentración", "Simplicidad"], "La letra k) del art. 3.1 recoge la cooperación, colaboración y coordinación entre Administraciones."),
    q(S1, "media", "¿Qué artículo de la Constitución remite a la ley el sistema de incompatibilidades de los funcionarios?", ["El art. 103.3 CE", "El art. 106.2 CE", "El art. 105 CE"], "El art. 103.3 CE incluye el sistema de incompatibilidades entre las materias que debe regular la ley."),
    q(S2, "media", "¿Con qué personalidad jurídica actúa el Ayuntamiento para cumplir sus fines (art. 3.4 Ley 40/2015)?", ["Personalidad jurídica única", "Una personalidad por cada servicio municipal", "La personalidad del Gobierno de Aragón"], "Cada Administración actúa con personalidad jurídica única."),
    q(S2, "media", "¿Qué principio del art. 3.1 de la Ley 40/2015 obliga a rendir cuentas de la gestión del Servicio?", ["Responsabilidad por la gestión pública", "Desconcentración", "Proximidad"], "La responsabilidad por la gestión pública es la letra f) del art. 3.1."),
  ],
});
await crearCaso({
  slug: "caso-solicitud-informe-intervencion",
  titulo: "Una empresa solicita un informe de intervención",
  orden: 3,
  supuesto: "Una empresa cuya nave sufrió un incendio presenta en el Ayuntamiento una solicitud para obtener información sobre la intervención del Servicio, y la Administración tramita el procedimiento correspondiente.",
  preguntas: [
    q(S3, "facil", "¿Tiene la empresa capacidad de obrar ante la Administración?", ["Sí, como persona jurídica con capacidad de obrar según las normas civiles", "No, solo las personas físicas la tienen", "Solo si actúa mediante un funcionario"], "El art. 3.a) de la Ley 39/2015 reconoce capacidad de obrar a las personas físicas o jurídicas que la tengan según las normas civiles."),
    q(S3, "facil", "¿Cómo se ha iniciado este procedimiento?", ["A solicitud del interesado", "De oficio", "Por orden judicial"], "La empresa lo promueve mediante su solicitud (art. 54 Ley 39/2015)."),
    q(S3, "media", "¿Quién realiza los actos de instrucción del procedimiento?", ["El órgano que lo tramita, de oficio y por medios electrónicos", "La propia empresa solicitante", "El Tribunal Constitucional"], "Art. 75.1 de la Ley 39/2015."),
    q(S3, "media", "Si en el curso del procedimiento se requiere la intervención de la empresa, ¿cómo deben practicarse esos actos?", ["De la forma más conveniente para ella y compatible con sus obligaciones laborales o profesionales", "Siempre en horario de mañana y de forma presencial", "Sin ninguna consideración a la situación del interesado"], "Art. 75.3 de la Ley 39/2015."),
    q(S3, "media", "¿Qué principios debe respetar el órgano instructor entre los interesados?", ["Contradicción e igualdad", "Jerarquía y desconcentración", "Austeridad y economía"], "Art. 75.4: pleno respeto a los principios de contradicción y de igualdad de los interesados."),
    q(S1, "media", "¿Qué artículo de la Constitución prevé que la ley regule el acceso de los ciudadanos a archivos y registros administrativos?", ["El art. 105.b) CE", "El art. 104 CE", "El art. 106.1 CE"], "El art. 105.b) CE."),
    q(S1, "dificil", "¿Qué límite del art. 105.b) CE podría afectar a parte de la información de la intervención si contuviera datos de terceros?", ["La intimidad de las personas", "La eficacia administrativa", "La descentralización"], "El art. 105.b) exceptúa lo que afecte a la seguridad y defensa del Estado, la averiguación de los delitos y la intimidad de las personas."),
    q(S3, "media", "Si el procedimiento terminara por la imposibilidad material de continuarlo por causas sobrevenidas, ¿cómo debe ser la resolución?", ["Motivada en todo caso", "Verbal", "Sin necesidad de motivación"], "Art. 84.2: la resolución que se dicte deberá ser motivada en todo caso."),
    q(S2, "media", "¿Qué principio del art. 3.1 de la Ley 40/2015 se relaciona directamente con dar acceso a la información de la actuación administrativa?", ["Participación, objetividad y transparencia", "Jerarquía", "Economía"], "La letra c) del art. 3.1."),
    q(S3, "media", "Si la empresa renuncia al derecho en que basa su solicitud y la renuncia no está prohibida, ¿qué ocurre?", ["Se pone fin al procedimiento", "El procedimiento continúa de oficio sin excepción", "Se archiva sin efectos y debe iniciarse de nuevo"], "La renuncia al derecho, cuando no esté prohibida, pone fin al procedimiento (art. 84.1)."),
  ],
});

console.log(`\n🔗 Vinculando ${TEMA} como Tema ${NUMERO} de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_1_ID, numero: NUMERO, orden: NUMERO, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log(`\n✅ ${TEMA} creado y vinculado como Tema ${NUMERO} de Bombero/a Conductor/a.`);
