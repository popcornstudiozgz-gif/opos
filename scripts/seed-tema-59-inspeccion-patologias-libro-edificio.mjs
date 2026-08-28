/**
 * Crea el tema canónico tema-59: "La Inspección previa: Detección de
 * patologías. Reconocimiento físico de las estructuras. Estado de
 * conservación y mantenimiento de edificios. El libro de mantenimiento
 * del edificio" y lo asigna como Tema 21 (bloque-2) de la oposición
 * Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf).
 *
 * Fuente primaria: Ley 38/1999, de 5 de noviembre, de Ordenación de la
 * Edificación (LOE, BOE-A-1999-21567), artículo 7 "Documentación de la
 * obra ejecutada" (verificado en este turno): el Libro del Edificio
 * incorpora el acta de recepción, la relación identificativa de los
 * agentes intervinientes, y las instrucciones de uso y mantenimiento del
 * edificio y sus instalaciones, y debe entregarse a los usuarios finales.
 * Para las patologías estructurales y el reconocimiento físico se
 * desarrolla conocimiento técnico consolidado del oficio, complementario
 * (sin duplicar) al de patologías de materiales de fábrica ya visto en
 * el tema-56 (eflorescencias, desconchados, heladicidad, permeabilidad,
 * expansión por humedad).
 *
 * Tres secciones:
 * 1. inspeccion-previa-patologias-estructurales — inspección previa y
 *    detección de patologías estructurales.
 * 2. reconocimiento-fisico-estado-conservacion — reconocimiento físico
 *    de estructuras y estado de conservación de edificios.
 * 3. libro-edificio-mantenimiento — el libro del edificio y su
 *    contenido.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-59-inspeccion-patologias-libro-edificio.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-59";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const LEY_38_1999 = "https://www.boe.es/buscar/act.php?id=BOE-A-1999-21567";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Inspección previa, patologías estructurales y libro del edificio",
    descripcion: "La Inspección previa: Detección de patologías. Reconocimiento físico de las estructuras. Estado de conservación y mantenimiento de edificios. El libro de mantenimiento del edificio.",
    contenido:
      "Desarrolla la inspección previa y la detección de patologías estructurales, el reconocimiento físico de las estructuras y el estado de conservación de los edificios, y el Libro del Edificio conforme a la Ley 38/1999 de Ordenación de la Edificación, que recoge la documentación de la obra ejecutada y las instrucciones de uso y mantenimiento.",
    enlaces_boe: [
      { url: LEY_38_1999, titulo: "Ley 38/1999, de Ordenación de la Edificación (LOE), art. 7" },
    ],
    indice_estudio: [
      { url: "", titulo: "Inspección previa y patologías estructurales", seccion: "inspeccion-previa-patologias-estructurales", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Reconocimiento físico y estado de conservación", seccion: "reconocimiento-fisico-estado-conservacion", articulos: "Conceptos fundamentales" },
      { url: LEY_38_1999, titulo: "El libro del edificio", seccion: "libro-edificio-mantenimiento", articulos: "art. 7" },
    ],
  },
]);

const S1 = "inspeccion-previa-patologias-estructurales";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es la inspección previa de un edificio o elemento constructivo, antes de intervenir sobre él?", reverso: "El reconocimiento sistemático que se realiza antes de iniciar una obra de reforma, rehabilitación o reparación, para detectar el estado real del elemento, sus posibles patologías y las precauciones necesarias antes de intervenir" },
    { anverso: "¿Qué es una grieta, como patología estructural?", reverso: "Una fisura de anchura apreciable que afecta a todo el espesor de un elemento constructivo, generalmente indicativa de un movimiento o esfuerzo estructural importante, a diferencia de la fisura superficial" },
    { anverso: "¿Qué diferencia hay entre una grieta y una fisura?", reverso: "La fisura es una abertura fina, generalmente superficial, que no compromete la integridad estructural; la grieta es de mayor anchura y afecta a todo el espesor del elemento, pudiendo indicar un problema estructural" },
    { anverso: "¿Qué es un asiento diferencial en una estructura o cimentación?", reverso: "El hundimiento desigual de distintos puntos de la cimentación de un edificio, que provoca grietas características (a menudo inclinadas, en forma de escalera en fábricas de ladrillo) por el esfuerzo de flexión que genera en la estructura" },
    { anverso: "¿Qué es la flecha de un elemento estructural (viga, forjado)?", reverso: "La deformación vertical (curvatura hacia abajo) que experimenta el elemento bajo la acción de las cargas; una flecha excesiva puede ser indicio de una insuficiencia estructural o de un exceso de carga" },
    { anverso: "¿Qué es la corrosión de armaduras, como patología del hormigón armado?", reverso: "El deterioro del acero de las armaduras por oxidación, generalmente provocado por la entrada de humedad y agentes agresivos hasta el acero (por carbonatación del hormigón o por cloruros), que provoca su expansión, la fisuración y el desprendimiento del recubrimiento de hormigón" },
    { anverso: "¿Qué es una 'coquera' en un elemento de hormigón?", reverso: "Un hueco u oquedad en la masa de hormigón, generalmente causado por una compactación o vibrado insuficiente durante el hormigonado, que reduce la sección resistente y facilita la entrada de humedad hasta las armaduras" },
    { anverso: "¿Qué debe hacer un oficial de albañilería al detectar indicios de una patología estructural grave (grietas activas, desplomes, corrosión de armaduras)?", reverso: "Comunicarlo de inmediato al responsable técnico de la obra, sin intervenir por su cuenta, ya que puede requerir un estudio y un apeo o apuntalamiento previo antes de cualquier actuación" },
    { anverso: "¿Qué es un desplome, como patología de un muro?", reverso: "La pérdida de verticalidad de un muro respecto a su plano original, que puede deberse a empujes no compensados, asientos diferenciales o defectos de ejecución, y que compromete su estabilidad si es excesivo" },
    { anverso: "¿Por qué es importante distinguir entre una fisura activa y una fisura estabilizada?", reverso: "Porque una fisura activa (que sigue abriéndose) indica un proceso en curso que requiere estudio y posible intervención estructural; una fisura estabilizada, aunque deba repararse estéticamente, no representa el mismo riesgo inmediato" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la inspección previa de un edificio antes de una intervención?", explicacion: "El reconocimiento sistemático que detecta el estado real y posibles patologías antes de intervenir.", dificultad: "facil", opciones: ["El reconocimiento del estado real antes de intervenir", "El acta final de recepción de la obra", "El presupuesto de ejecución material", "El plan de seguridad y salud de la obra"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre una grieta y una fisura?", explicacion: "La grieta afecta a todo el espesor y puede indicar un problema estructural; la fisura es superficial.", dificultad: "media", opciones: ["La grieta afecta a todo el espesor, la fisura es superficial", "Son términos sinónimos e intercambiables", "La fisura es siempre más grave que la grieta", "La grieta solo aparece en hormigón armado"], correcta: 0 },
  { enunciado: "¿Qué provoca típicamente un asiento diferencial de cimentación?", explicacion: "Grietas características, a menudo inclinadas en forma de escalera en fábricas de ladrillo.", dificultad: "media", opciones: ["Grietas inclinadas en forma de escalera en fábricas de ladrillo", "Un aumento uniforme de la resistencia del muro", "La mejora del aislamiento térmico del cerramiento", "Ninguna consecuencia visible en el paramento"], correcta: 0 },
  { enunciado: "¿Qué es la flecha de un elemento estructural?", explicacion: "La deformación vertical que experimenta bajo la acción de las cargas.", dificultad: "media", opciones: ["La deformación vertical bajo la acción de las cargas", "El ángulo de inclinación de una escalera", "El grosor del recubrimiento de una armadura", "Un tipo de grieta horizontal en cimentación"], correcta: 0 },
  { enunciado: "¿Qué provoca la corrosión de armaduras en el hormigón armado?", explicacion: "La expansión del acero oxidado, que fisura y desprende el recubrimiento de hormigón.", dificultad: "media", opciones: ["Fisuración y desprendimiento del recubrimiento de hormigón", "Una mejora de la adherencia acero-hormigón", "La reducción del peso propio del elemento", "Ningún efecto visible en la estructura"], correcta: 0 },
  { enunciado: "¿Qué es una coquera en un elemento de hormigón?", explicacion: "Un hueco por compactación o vibrado insuficiente durante el hormigonado.", dificultad: "media", opciones: ["Un hueco por compactación o vibrado insuficiente", "Una mancha blanquecina de sales en superficie", "Un tipo de junta de dilatación estructural", "El desplome de un muro de carga"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un oficial de albañilería ante indicios de una patología estructural grave?", explicacion: "Comunicarlo de inmediato al responsable técnico, sin intervenir por su cuenta.", dificultad: "media", opciones: ["Comunicarlo de inmediato al responsable técnico", "Repararlo directamente sin consultar a nadie", "Ignorarlo si no afecta a la producción diaria", "Ocultarlo hasta la siguiente inspección programada"], correcta: 0 },
  { enunciado: "¿Por qué es importante distinguir entre una fisura activa y una estabilizada?", explicacion: "Porque la activa indica un proceso en curso que requiere estudio y posible intervención estructural.", dificultad: "dificil", opciones: ["Porque la activa indica un proceso en curso a estudiar", "Porque no existe diferencia real entre ambas", "Porque la estabilizada siempre es más peligrosa", "Porque solo la fisura activa requiere reparación estética"], correcta: 0 },
]);

const S2 = "reconocimiento-fisico-estado-conservacion";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el reconocimiento físico de una estructura, en el marco de una inspección técnica?", reverso: "La observación y comprobación directa in situ del estado de los elementos estructurales (cimentación visible, muros, pilares, forjados, cubierta), detectando síntomas de deterioro mediante examen visual y, en su caso, ensayos sencillos no destructivos" },
    { anverso: "¿Qué medios sencillos pueden emplearse en un reconocimiento físico preliminar de una fábrica o estructura?", reverso: "La plomada y el nivel (para detectar desplomes o falta de horizontalidad), el golpeo con maza o martillo (para detectar huecos o desprendimientos por el sonido), y la observación directa de fisuras, humedades o manchas" },
    { anverso: "¿Qué es el 'estado de conservación' de un edificio?", reverso: "La valoración global de las condiciones físicas de sus elementos constructivos e instalaciones en un momento dado, en relación con su funcionalidad, seguridad y habitabilidad" },
    { anverso: "¿Qué es la Inspección Técnica de Edificios (ITE)?", reverso: "Un procedimiento de evaluación periódica obligatoria del estado de conservación de los edificios (regulado por la normativa estatal y autonómica), que determina si el edificio se encuentra en estado favorable, con deficiencias leves o con deficiencias graves o muy graves" },
    { anverso: "¿Qué es el mantenimiento preventivo de un edificio?", reverso: "El conjunto de operaciones programadas y periódicas destinadas a conservar los elementos constructivos e instalaciones en buen estado, anticipándose a la aparición de averías o patologías" },
    { anverso: "¿Qué es el mantenimiento correctivo de un edificio?", reverso: "El conjunto de actuaciones que se realizan para reparar una avería, patología o deficiencia ya detectada, a diferencia del mantenimiento preventivo, que busca evitarla" },
    { anverso: "¿Qué elementos constructivos suelen priorizarse en una inspección de estado de conservación por su repercusión en la seguridad?", reverso: "Los elementos estructurales (cimentación, muros de carga, forjados, cubierta) y los relacionados con la estanqueidad frente al agua, por su influencia directa en la seguridad y la durabilidad del edificio" },
    { anverso: "¿Qué relación existe entre un buen mantenimiento y la vida útil de un edificio?", reverso: "Un mantenimiento adecuado y periódico prolonga la vida útil del edificio, reduce el coste de las reparaciones (al detectar y corregir problemas en fases tempranas) y mejora la seguridad de sus ocupantes" },
    { anverso: "¿Qué debe registrarse tras una inspección de estado de conservación de un edificio?", reverso: "Las patologías detectadas, su ubicación y gravedad, y las recomendaciones de actuación (reparación inmediata, seguimiento o actuación programada), como base para las decisiones de mantenimiento" },
    { anverso: "¿Por qué es recomendable que el reconocimiento físico de una estructura antes de una obra de reforma lo dirija un técnico competente?", reverso: "Porque la interpretación correcta de los síntomas detectados (grietas, desplomes, humedades) y la decisión sobre las precauciones necesarias (apeos, apuntalamientos) requieren conocimientos específicos de patología estructural" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el reconocimiento físico de una estructura en una inspección técnica?", explicacion: "La observación y comprobación directa in situ del estado de los elementos estructurales.", dificultad: "facil", opciones: ["La observación y comprobación directa in situ del estado", "El cálculo estructural mediante software", "El presupuesto de la reforma proyectada", "El plan de seguridad y salud de la obra"], correcta: 0 },
  { enunciado: "¿Qué medios sencillos pueden emplearse en un reconocimiento físico preliminar?", explicacion: "Plomada y nivel, golpeo con maza para detectar huecos, y observación directa.", dificultad: "media", opciones: ["Plomada, nivel y golpeo con maza", "Únicamente cálculo estructural avanzado", "Solo ensayos destructivos de laboratorio", "Exclusivamente fotografía aérea con dron"], correcta: 0 },
  { enunciado: "¿Qué es el estado de conservación de un edificio?", explicacion: "La valoración global de las condiciones físicas de sus elementos en relación con seguridad y habitabilidad.", dificultad: "media", opciones: ["La valoración global de sus condiciones físicas", "El precio de mercado del inmueble", "El número de plantas del edificio", "La antigüedad exacta de la construcción"], correcta: 0 },
  { enunciado: "¿Qué es la Inspección Técnica de Edificios (ITE)?", explicacion: "Un procedimiento de evaluación periódica obligatoria del estado de conservación.", dificultad: "media", opciones: ["Un procedimiento de evaluación periódica obligatoria", "Un tipo de licencia de obra menor", "Un certificado de eficiencia energética", "Un contrato de mantenimiento voluntario"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre mantenimiento preventivo y correctivo?", explicacion: "El preventivo anticipa problemas; el correctivo repara una avería ya detectada.", dificultad: "media", opciones: ["El preventivo anticipa; el correctivo repara lo ya detectado", "Son exactamente el mismo concepto", "El correctivo siempre es más barato que el preventivo", "El preventivo solo se aplica a instalaciones eléctricas"], correcta: 0 },
  { enunciado: "¿Qué elementos se priorizan habitualmente en una inspección de estado de conservación?", explicacion: "Los elementos estructurales y los relacionados con la estanqueidad frente al agua.", dificultad: "media", opciones: ["Elementos estructurales y de estanqueidad al agua", "Únicamente el acabado estético de fachada", "Solo el mobiliario interior del edificio", "Exclusivamente las zonas ajardinadas"], correcta: 0 },
  { enunciado: "¿Qué beneficio aporta un buen mantenimiento a la vida útil de un edificio?", explicacion: "La prolonga, reduce el coste de reparaciones y mejora la seguridad.", dificultad: "media", opciones: ["Prolonga la vida útil y mejora la seguridad", "No tiene ninguna influencia relevante", "Solo afecta al valor estético del inmueble", "Aumenta siempre el coste sin otro beneficio"], correcta: 0 },
  { enunciado: "¿Por qué es recomendable que un técnico competente dirija el reconocimiento físico previo a una reforma?", explicacion: "Porque la interpretación de síntomas y la decisión sobre precauciones requiere conocimientos específicos de patología.", dificultad: "dificil", opciones: ["Porque requiere conocimientos específicos de patología", "Porque la ley lo prohíbe expresamente a los oficiales", "Porque no influye en la seguridad de la intervención", "Porque encarece innecesariamente cualquier obra"], correcta: 0 },
]);

const S3 = "libro-edificio-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué ley regula el Libro del Edificio en España?", reverso: "La Ley 38/1999, de 5 de noviembre, de Ordenación de la Edificación (LOE), en su artículo 7" },
    { anverso: "¿Qué documentos debe incorporar, como mínimo, la documentación de la obra ejecutada según el artículo 7 de la LOE?", reverso: "El acta de recepción, la relación identificativa de los agentes que han intervenido durante el proceso de edificación, y las instrucciones de uso y mantenimiento del edificio y sus instalaciones" },
    { anverso: "¿Quién debe entregar la documentación de la obra ejecutada al promotor, según la LOE?", reverso: "El director de obra, una vez finalizados los trabajos y para la formalización de los trámites administrativos correspondientes" },
    { anverso: "¿A quién debe entregarse el Libro del Edificio, según el artículo 7 de la LOE?", reverso: "A los usuarios finales del edificio" },
    { anverso: "¿Qué finalidad tiene el Libro del Edificio?", reverso: "Documentar el edificio tal como se construyó y facilitar a sus usuarios y responsables de mantenimiento la información necesaria para su correcto uso, conservación y mantenimiento a lo largo de su vida útil" },
    { anverso: "¿Qué información sobre instalaciones debe incluir el Libro del Edificio, según la LOE?", reverso: "Las instrucciones de uso y mantenimiento de las instalaciones del edificio, conforme a la normativa que les sea aplicable en cada caso" },
    { anverso: "¿Por qué es relevante para un oficial albañil que participe en obras de mantenimiento conocer el Libro del Edificio?", reverso: "Porque contiene información sobre los materiales, sistemas constructivos y agentes que intervinieron en la obra original, útil para planificar correctamente reparaciones o intervenciones posteriores coherentes con la construcción existente" },
    { anverso: "¿Qué relación existe entre el Libro del Edificio y las tareas periódicas de mantenimiento del oficial de albañilería?", reverso: "Las instrucciones de uso y mantenimiento recogidas en el Libro del Edificio sirven de referencia para programar las revisiones y actuaciones de conservación de los elementos constructivos a lo largo del tiempo" },
    { anverso: "¿Qué relación existe entre el Libro del Edificio y el acta de recepción de la obra?", reverso: "El acta de recepción, que certifica que la obra ha sido entregada conforme al proyecto, forma parte integrante de la documentación que compone el Libro del Edificio" },
    { anverso: "¿Es el Libro del Edificio un documento estático que ya no se actualiza tras la entrega?", reverso: "No necesariamente; a lo largo de la vida del edificio conviene incorporar información sobre reformas, reparaciones relevantes e inspecciones periódicas (como la ITE), para mantener actualizado el historial del inmueble" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué ley regula el Libro del Edificio?", explicacion: "La Ley 38/1999, de Ordenación de la Edificación, artículo 7.", dificultad: "media", opciones: ["La Ley 38/1999 (LOE), artículo 7", "El RD 1627/1997", "El Código Técnico de la Edificación", "El RD 396/2006"], correcta: 0 },
  { enunciado: "¿Qué documentos incorpora, como mínimo, la documentación de la obra ejecutada según la LOE?", explicacion: "Acta de recepción, relación de agentes intervinientes e instrucciones de uso y mantenimiento.", dificultad: "media", opciones: ["Acta de recepción, agentes intervinientes e instrucciones de uso", "Únicamente el presupuesto final de la obra", "Solo el plan de seguridad y salud", "Exclusivamente los planos as-built"], correcta: 0 },
  { enunciado: "¿Quién debe entregar la documentación de la obra ejecutada al promotor?", explicacion: "El director de obra, una vez finalizados los trabajos.", dificultad: "media", opciones: ["El director de obra", "El Ayuntamiento correspondiente", "Únicamente el contratista principal", "El colegio profesional de arquitectos"], correcta: 0 },
  { enunciado: "¿A quién debe entregarse el Libro del Edificio según la LOE?", explicacion: "A los usuarios finales del edificio.", dificultad: "facil", opciones: ["A los usuarios finales del edificio", "Únicamente a la administración local", "Solo al arquitecto redactor del proyecto", "Exclusivamente a la empresa constructora"], correcta: 0 },
  { enunciado: "¿Cuál es la finalidad principal del Libro del Edificio?", explicacion: "Documentar el edificio construido y facilitar su correcto uso, conservación y mantenimiento.", dificultad: "media", opciones: ["Facilitar el correcto uso, conservación y mantenimiento", "Servir exclusivamente como documento fiscal", "Sustituir la licencia de obra municipal", "Certificar la eficiencia energética del edificio"], correcta: 0 },
  { enunciado: "¿Qué información sobre instalaciones incluye el Libro del Edificio?", explicacion: "Las instrucciones de uso y mantenimiento de las instalaciones conforme a su normativa aplicable.", dificultad: "media", opciones: ["Instrucciones de uso y mantenimiento de instalaciones", "Únicamente el coste de cada instalación", "Solo el fabricante de los materiales empleados", "Exclusivamente el plazo de garantía comercial"], correcta: 0 },
  { enunciado: "¿Por qué es útil el Libro del Edificio para un oficial albañil en obras de mantenimiento posteriores?", explicacion: "Porque documenta materiales y sistemas constructivos originales, útiles para planificar reparaciones coherentes.", dificultad: "media", opciones: ["Porque documenta materiales y sistemas originales", "Porque sustituye cualquier inspección técnica posterior", "Porque no tiene relación con el mantenimiento", "Porque solo interesa a efectos fiscales"], correcta: 0 },
  { enunciado: "¿Qué documento forma parte integrante del Libro del Edificio junto con las instrucciones de mantenimiento?", explicacion: "El acta de recepción de la obra.", dificultad: "media", opciones: ["El acta de recepción de la obra", "El certificado de profesionalidad del oficial", "El cuadro de precios n.º 2 del proyecto", "El parte de accidentes de trabajo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-59 creado y vinculado como Tema 21 de Oficial Albañil.");
