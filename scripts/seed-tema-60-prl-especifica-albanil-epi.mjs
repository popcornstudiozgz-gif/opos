/**
 * Crea el tema canónico tema-60: "Prevención de riesgos laborales
 * específicos en las funciones de albañil. Medidas de protección
 * específicas a las funciones de la categoría. Equipos de protección
 * individual, tipología, características y aplicaciones. Trabajos en el
 * interior de espacios confinados" y lo asigna como Tema 22 (bloque-2,
 * último tema de la parte específica) de la oposición Oficial Albañil
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf) — cierra el
 * temario oficial completo (temas 1-20).
 *
 * Fuente primaria: Real Decreto 773/1997, de 30 de mayo (BOE-A-1997-
 * 12735, verificado y texto descargado en este turno), sobre
 * disposiciones mínimas de seguridad y salud relativas a la utilización
 * por los trabajadores de equipos de protección individual: definición
 * de EPI (art. 2), obligaciones del empresario y del trabajador (arts.
 * 3, 7 y 10), y clasificación de EPI por zona del cuerpo protegida
 * (Anexo I: cabeza, oído, ojos y cara, vías respiratorias, manos y
 * brazos, pies y piernas, piel, tronco y abdomen). Los riesgos
 * específicos del oficio se desarrollan como síntesis de conocimiento
 * técnico-preventivo consolidado del sector, dentro del marco general de
 * la Ley 31/1995 de Prevención de Riesgos Laborales ya tratada en el
 * bloque común. La sección 3 (espacios confinados) complementa, sin
 * duplicar, la ya vista en el tema-57 (medios auxiliares), centrándose
 * aquí en el procedimiento de trabajo (permiso, atmósfera, vigilancia y
 * rescate) más que en la definición general.
 *
 * Tres secciones:
 * 1. riesgos-especificos-albanil — riesgos propios de las funciones de
 *    albañil.
 * 2. epi-tipologia-caracteristicas — equipos de protección individual:
 *    tipología y características.
 * 3. espacios-confinados-procedimiento-trabajo — procedimiento de
 *    trabajo en espacios confinados.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-60-prl-especifica-albanil-epi.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-60";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";

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
    titulo: "PRL específica del albañil, equipos de protección individual y espacios confinados",
    descripcion:
      "Prevención de riesgos laborales específicos en las funciones de albañil. Medidas de protección específicas a las funciones de la categoría. Equipos de protección individual, tipología, características y aplicaciones. Trabajos en el interior de espacios confinados.",
    contenido:
      "Desarrolla los riesgos laborales específicos de las funciones de albañil y sus medidas de protección, los equipos de protección individual (EPI) según el RD 773/1997 —su definición, obligaciones y clasificación por zona del cuerpo protegida— y el procedimiento de trabajo en espacios confinados (permiso de trabajo, control de la atmósfera, vigilancia y plan de rescate).",
    enlaces_boe: [
      { url: RD_773_1997, titulo: "RD 773/1997 — Utilización de equipos de protección individual" },
    ],
    indice_estudio: [
      { url: "", titulo: "Riesgos específicos de las funciones de albañil", seccion: "riesgos-especificos-albanil", articulos: "Conceptos fundamentales" },
      { url: RD_773_1997, titulo: "Equipos de protección individual: tipología y características", seccion: "epi-tipologia-caracteristicas", articulos: "arts. 2, 3, 7, 10 y Anexo I" },
      { url: "", titulo: "Procedimiento de trabajo en espacios confinados", seccion: "espacios-confinados-procedimiento-trabajo", articulos: "Conceptos fundamentales" },
    ],
  },
]);

const S1 = "riesgos-especificos-albanil";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Cita los principales riesgos ergonómicos (sobreesfuerzos) del oficio de albañil", reverso: "Manipulación manual de cargas (ladrillos, sacos de cemento, bloques), posturas forzadas mantenidas (agachado, de rodillas) y movimientos repetitivos, que pueden provocar lesiones musculoesqueléticas, especialmente lumbares" },
    { anverso: "¿Qué riesgo respiratorio es especialmente relevante en trabajos de albañilería con corte, picado o lijado de materiales pétreos o cerámicos?", reverso: "La exposición a polvo con sílice cristalina respirable, generado al cortar, picar o lijar hormigón, ladrillo, piedra o mortero, que puede provocar silicosis y otras enfermedades pulmonares a largo plazo" },
    { anverso: "¿Qué riesgo dermatológico está asociado al contacto directo y prolongado con cemento y morteros frescos?", reverso: "Dermatitis de contacto (irritativa o alérgica) por el carácter alcalino y, en ocasiones, por el contenido en cromo de los cementos, que puede afectar a manos y antebrazos" },
    { anverso: "Cita riesgos mecánicos habituales en las funciones de albañil", reverso: "Cortes con herramientas manuales o eléctricas (sierras, radiales) y con aristas de materiales, golpes con herramientas o piezas, proyección de partículas al cortar o picar, y atrapamientos con máquinas (hormigonera, sierra de corte)" },
    { anverso: "¿Qué riesgo de caída al mismo nivel es habitual en un tajo de albañilería?", reverso: "Tropiezos y resbalones por acopios desordenados de materiales, herramientas o escombros, superficies irregulares o mojadas, y cables o mangueras sin recoger" },
    { anverso: "¿Qué medida de protección colectiva reduce el riesgo de proyección de partículas al cortar materiales con radial o sierra?", reverso: "El uso de discos de corte con agua (corte húmedo), que reduce la generación de polvo, y la instalación de pantallas o mamparas de protección cuando otros trabajadores están cerca" },
    { anverso: "¿Qué medida organizativa reduce el riesgo de sobreesfuerzos al manipular cargas pesadas en el tajo?", reverso: "Emplear medios auxiliares de elevación (carretillas, grúas, montacargas) siempre que sea posible, y cuando no lo sea, aplicar técnicas correctas de manipulación manual de cargas y alternar tareas para evitar posturas mantenidas" },
    { anverso: "¿Qué riesgo específico presentan las operaciones de amasado de mortero u hormigón con hormigonera?", reverso: "El riesgo de atrapamiento por las partes móviles (tambor, paletas) si se introducen las manos o herramientas en marcha, y el riesgo de proyección de material o de vuelco de la máquina si no está bien asentada" },
    { anverso: "¿Qué riesgo de exposición a ruido está presente en tareas como el picado con martillo eléctrico o el corte con radial?", reverso: "Un riesgo de exposición a niveles de ruido elevados que, sin protección auditiva, pueden provocar pérdida de audición a medio y largo plazo, además de dificultar la comunicación y la percepción de señales de alarma" },
    { anverso: "¿Por qué se consideran 'medidas de protección específicas a las funciones de la categoría' distintas de las medidas generales de la obra?", reverso: "Porque, además de las medidas colectivas comunes a toda la obra (vallado, señalización general), cada categoría profesional está expuesta a riesgos propios de sus tareas concretas, que exigen medidas y EPI adaptados específicamente a ellas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué riesgos ergonómicos son principales en el oficio de albañil?", explicacion: "Manipulación manual de cargas, posturas forzadas y movimientos repetitivos.", dificultad: "media", opciones: ["Manipulación de cargas, posturas forzadas y movimientos repetitivos", "Únicamente el riesgo eléctrico por contacto directo", "Solo el riesgo de exposición a radiaciones ionizantes", "Exclusivamente el riesgo psicosocial por estrés"], correcta: 0 },
  { enunciado: "¿Qué enfermedad puede provocar a largo plazo la exposición a polvo con sílice cristalina al cortar materiales pétreos?", explicacion: "La silicosis, entre otras enfermedades pulmonares.", dificultad: "media", opciones: ["Silicosis", "Dermatitis de contacto", "Hipoacusia por ruido", "Lumbalgia crónica"], correcta: 0 },
  { enunciado: "¿Qué riesgo dermatológico está asociado al contacto prolongado con cemento fresco?", explicacion: "Dermatitis de contacto irritativa o alérgica.", dificultad: "media", opciones: ["Dermatitis de contacto", "Silicosis pulmonar", "Hipoacusia inducida por ruido", "Fatiga visual crónica"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un riesgo mecánico habitual del oficio de albañil?", explicacion: "Cortes con herramientas o aristas de materiales.", dificultad: "facil", opciones: ["Cortes con herramientas o aristas de materiales", "Exposición a radiación ultravioleta intensa", "Riesgo biológico por contacto con animales", "Riesgo de descompresión por presión atmosférica"], correcta: 0 },
  { enunciado: "¿Qué medida reduce el riesgo de proyección de partículas al cortar con radial?", explicacion: "El corte húmedo (con agua) y el uso de pantallas de protección.", dificultad: "media", opciones: ["El corte húmedo y pantallas de protección", "Aumentar la velocidad de corte sin más medidas", "Trabajar sin gafas para mayor visibilidad", "Eliminar la ventilación del tajo"], correcta: 0 },
  { enunciado: "¿Qué medida organizativa reduce el riesgo de sobreesfuerzos al manipular cargas?", explicacion: "Emplear medios auxiliares de elevación siempre que sea posible.", dificultad: "media", opciones: ["Emplear medios auxiliares de elevación", "Aumentar el peso de las cargas manipuladas", "Prescindir de pausas durante la jornada", "Trabajar siempre en solitario sin ayuda"], correcta: 0 },
  { enunciado: "¿Qué riesgo presenta el uso de una hormigonera si se introducen las manos con el tambor en marcha?", explicacion: "Riesgo de atrapamiento por las partes móviles.", dificultad: "media", opciones: ["Atrapamiento por partes móviles", "Electrocución exclusivamente", "Intoxicación por gases de combustión", "Exposición a radiaciones ionizantes"], correcta: 0 },
  { enunciado: "¿Por qué existen medidas de protección específicas por categoría profesional, además de las generales de la obra?", explicacion: "Porque cada categoría está expuesta a riesgos propios de sus tareas concretas.", dificultad: "media", opciones: ["Porque cada categoría tiene riesgos propios de sus tareas", "Porque la ley prohíbe medidas comunes a toda la obra", "Porque solo los oficiales requieren protección alguna", "Porque las medidas generales ya cubren todos los riesgos"], correcta: 0 },
]);

const S2 = "epi-tipologia-caracteristicas";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Cómo define el RD 773/1997 un equipo de protección individual (EPI)?", reverso: "Cualquier equipo destinado a ser llevado o sujetado por el trabajador para que le proteja de uno o varios riesgos que puedan amenazar su seguridad o su salud, así como cualquier complemento o accesorio destinado a tal fin" },
    { anverso: "¿En qué caso deben utilizarse los EPI, según el criterio general del RD 773/1997?", reverso: "Cuando los riesgos no se hayan podido evitar o limitar suficientemente por medios técnicos de protección colectiva o mediante medidas de organización del trabajo" },
    { anverso: "Cita las categorías de EPI que recoge el Anexo I del RD 773/1997, clasificadas por zona del cuerpo", reverso: "Protectores de la cabeza, del oído, de los ojos y la cara, de las vías respiratorias, de manos y brazos, de pies y piernas, de la piel, y del tronco y el abdomen" },
    { anverso: "¿Qué obligación tiene el empresario respecto al mantenimiento de los EPI, según el RD 773/1997?", reverso: "Velar por que los EPI se utilicen en las condiciones y de la forma que indique el fabricante, y garantizar su mantenimiento (limpieza, reparación, sustitución) para que conserven su eficacia protectora" },
    { anverso: "¿Qué obligación tiene el trabajador si detecta un defecto o daño en su EPI?", reverso: "Informar de inmediato a su superior jerárquico directo del defecto, anomalía o daño apreciado que, a su juicio, pueda entrañar una pérdida de su eficacia protectora" },
    { anverso: "¿Qué EPI de protección de la cabeza es de uso habitual y obligatorio en la práctica totalidad de los tajos de una obra de construcción?", reverso: "El casco de seguridad, que protege frente a impactos de objetos y golpes" },
    { anverso: "¿Qué EPI protege las manos del albañil frente a cortes, abrasiones y el contacto con mortero o cemento?", reverso: "Los guantes de protección mecánica (frente a cortes y abrasión) o, según la tarea, guantes resistentes a productos químicos y a la abrasión, adecuados al manejo de materiales de albañilería" },
    { anverso: "¿Qué tipo de calzado de seguridad es habitual en obras de albañilería?", reverso: "Calzado con puntera reforzada (resistente al impacto y la compresión) y suela antiperforación, que protege el pie frente a la caída de objetos y a pisar elementos punzantes" },
    { anverso: "¿Qué EPI de protección respiratoria se emplea habitualmente frente al polvo generado al cortar o picar materiales?", reverso: "Mascarillas autofiltrantes contra partículas (tipo FFP2 o FFP3, según el nivel de riesgo), que protegen frente a la inhalación de polvo, incluido el que contiene sílice cristalina" },
    { anverso: "¿Qué EPI protege frente al ruido en tareas de picado o corte con maquinaria ruidosa?", reverso: "Los protectores auditivos, ya sea en forma de tapones o de orejeras, seleccionados según el nivel de atenuación necesario para el ruido del tajo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo define el RD 773/1997 un equipo de protección individual?", explicacion: "Cualquier equipo llevado o sujetado por el trabajador para protegerle de riesgos a su seguridad o salud.", dificultad: "media", opciones: ["Cualquier equipo llevado por el trabajador para protegerle de riesgos", "Únicamente los cascos de seguridad", "Solo la maquinaria de protección colectiva", "Exclusivamente el vallado perimetral de la obra"], correcta: 0 },
  { enunciado: "¿Cuándo deben utilizarse los EPI según el RD 773/1997?", explicacion: "Cuando los riesgos no se hayan podido evitar o limitar suficientemente por otros medios.", dificultad: "media", opciones: ["Cuando no se puedan evitar los riesgos por otros medios", "Siempre, con independencia de otras medidas", "Nunca, si existe protección colectiva mínima", "Solo si lo solicita expresamente el trabajador"], correcta: 0 },
  { enunciado: "¿Qué categorías de EPI recoge el Anexo I del RD 773/1997?", explicacion: "Protectores clasificados por zona del cuerpo: cabeza, oído, ojos, vías respiratorias, manos, pies, piel, tronco.", dificultad: "media", opciones: ["Protectores clasificados por zona del cuerpo protegida", "Únicamente cascos y guantes", "Solo equipos de protección colectiva", "Exclusivamente ropa de alta visibilidad"], correcta: 0 },
  { enunciado: "¿Qué debe garantizar el empresario respecto al mantenimiento de los EPI?", explicacion: "Que se utilicen según indique el fabricante y se mantengan para conservar su eficacia protectora.", dificultad: "media", opciones: ["Su correcto mantenimiento y uso según el fabricante", "Únicamente su compra inicial, sin más obligación", "Solo su sustitución una vez al año", "Exclusivamente su almacenamiento centralizado"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un trabajador si detecta un defecto en su EPI?", explicacion: "Informar de inmediato a su superior jerárquico directo.", dificultad: "media", opciones: ["Informar de inmediato a su superior jerárquico", "Seguir utilizándolo hasta el final de la jornada", "Repararlo por su cuenta sin comunicarlo", "Desecharlo sin informar a nadie"], correcta: 0 },
  { enunciado: "¿Qué EPI de cabeza es de uso habitual y obligatorio en obras de construcción?", explicacion: "El casco de seguridad.", dificultad: "facil", opciones: ["El casco de seguridad", "Las gafas de protección exclusivamente", "El calzado de seguridad", "Los guantes de protección mecánica"], correcta: 0 },
  { enunciado: "¿Qué característica es habitual en el calzado de seguridad de obras de albañilería?", explicacion: "Puntera reforzada y suela antiperforación.", dificultad: "media", opciones: ["Puntera reforzada y suela antiperforación", "Suela lisa sin ningún refuerzo", "Ausencia total de puntera protectora", "Material exclusivamente textil sin refuerzo"], correcta: 0 },
  { enunciado: "¿Qué tipo de mascarilla se emplea habitualmente frente al polvo con sílice cristalina?", explicacion: "Mascarillas autofiltrantes FFP2 o FFP3, según el nivel de riesgo.", dificultad: "media", opciones: ["Mascarillas autofiltrantes FFP2 o FFP3", "Mascarillas de tela sin certificación", "No se requiere protección respiratoria alguna", "Exclusivamente pantallas faciales sin filtro"], correcta: 0 },
]);

const S3 = "espacios-confinados-procedimiento-trabajo";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un 'permiso de trabajo' o 'permiso de entrada' para acceder a un espacio confinado?", reverso: "Un documento formal que autoriza y controla el acceso a un espacio confinado, recogiendo las comprobaciones realizadas, las medidas preventivas aplicadas, los EPI necesarios y las personas autorizadas, antes de permitir la entrada" },
    { anverso: "¿Qué parámetros de la atmósfera interior de un espacio confinado deben medirse antes de entrar y durante la permanencia en él?", reverso: "El nivel de oxígeno (para descartar deficiencia o exceso), la presencia de gases o vapores tóxicos, y la posible presencia de atmósferas inflamables o explosivas" },
    { anverso: "¿Qué se entiende por 'deficiencia de oxígeno' en un espacio confinado?", reverso: "Una concentración de oxígeno en el aire inferior a la normal (en torno al 20,9 % en aire ambiente), que puede provocar pérdida de conocimiento y asfixia si desciende significativamente por debajo de ese valor" },
    { anverso: "¿Qué medida de ventilación debe adoptarse antes y durante los trabajos en un espacio confinado, cuando la atmósfera no sea segura?", reverso: "Ventilación forzada (mediante extractores o insufladores) que renueve el aire interior y mantenga los niveles de oxígeno y contaminantes dentro de los límites seguros durante toda la permanencia en el interior" },
    { anverso: "¿Por qué debe existir siempre un vigilante en el exterior durante los trabajos en un espacio confinado?", reverso: "Para mantener comunicación continua con el trabajador que está dentro, detectar cualquier incidencia y activar de inmediato el procedimiento de rescate si fuera necesario, sin tener que entrar él mismo sin la preparación adecuada" },
    { anverso: "¿Qué es un plan de rescate en el contexto de los espacios confinados?", reverso: "El procedimiento previsto de antemano para evacuar y auxiliar a un trabajador en caso de emergencia dentro de un espacio confinado, que debe estar definido y disponible antes de iniciar cualquier entrada" },
    { anverso: "¿Qué equipo suele emplearse para izar o rescatar a un trabajador desde el exterior de un espacio confinado vertical (pozo, arqueta profunda)?", reverso: "Un trípode con sistema de izado (polea, torno o dispositivo anticaídas retráctil) conectado al arnés del trabajador, que permite su extracción sin necesidad de que otra persona descienda al interior" },
    { anverso: "¿Qué precaución debe tomarse respecto a fuentes de ignición al trabajar en un espacio confinado con posible atmósfera inflamable?", reverso: "Evitar cualquier fuente de ignición (chispas, llamas, equipos eléctricos no antideflagrantes) y utilizar herramientas y equipos adecuados para atmósferas potencialmente explosivas cuando el riesgo lo exija" },
    { anverso: "¿Qué formación debe tener un trabajador antes de entrar en un espacio confinado?", reverso: "Una formación específica sobre los riesgos de los espacios confinados, el uso de los equipos de medición y protección, el procedimiento de entrada y el plan de rescate previsto" },
    { anverso: "¿Qué tareas de albañilería pueden requerir acceso a espacios confinados con relativa frecuencia?", reverso: "Trabajos de registro, reparación o conexión en arquetas y pozos de saneamiento o abastecimiento profundos, y en algunas cámaras o galerías de instalaciones" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un permiso de trabajo para acceder a un espacio confinado?", explicacion: "Un documento que autoriza y controla el acceso, recogiendo comprobaciones y medidas preventivas.", dificultad: "media", opciones: ["Un documento que autoriza y controla el acceso", "Una licencia municipal de obras", "Un certificado de profesionalidad del oficial", "Un parte de accidente de trabajo"], correcta: 0 },
  { enunciado: "¿Qué parámetros deben medirse en la atmósfera de un espacio confinado antes de entrar?", explicacion: "Nivel de oxígeno, gases tóxicos y posible atmósfera inflamable o explosiva.", dificultad: "media", opciones: ["Oxígeno, gases tóxicos y atmósfera inflamable", "Únicamente la temperatura ambiente", "Solo el nivel de ruido presente", "Exclusivamente la humedad relativa"], correcta: 0 },
  { enunciado: "¿Qué es la deficiencia de oxígeno en un espacio confinado?", explicacion: "Una concentración de oxígeno inferior a la normal, que puede provocar asfixia.", dificultad: "media", opciones: ["Una concentración de oxígeno inferior a la normal", "Un exceso de dióxido de carbono exclusivamente", "Una temperatura ambiente elevada", "Un nivel de ruido por encima de lo permitido"], correcta: 0 },
  { enunciado: "¿Qué medida se adopta cuando la atmósfera de un espacio confinado no es segura?", explicacion: "Ventilación forzada mediante extractores o insufladores.", dificultad: "media", opciones: ["Ventilación forzada con extractores o insufladores", "Aumentar la iluminación del recinto", "Reducir el número de mediciones realizadas", "Prescindir de la vigilancia exterior"], correcta: 0 },
  { enunciado: "¿Por qué debe haber un vigilante en el exterior durante trabajos en espacio confinado?", explicacion: "Para mantener comunicación y activar el rescate si es necesario, sin entrar sin preparación.", dificultad: "media", opciones: ["Para mantener comunicación y activar el rescate", "Porque lo exige únicamente por motivos estéticos", "Para controlar el horario de descanso", "Porque no tiene ninguna función preventiva real"], correcta: 0 },
  { enunciado: "¿Qué es un plan de rescate en espacios confinados?", explicacion: "El procedimiento previsto de antemano para evacuar y auxiliar a un trabajador en emergencia.", dificultad: "media", opciones: ["El procedimiento previsto para evacuar en emergencia", "Un documento exclusivamente administrativo sin uso práctico", "El plan de seguridad y salud general de la obra", "Un tipo de seguro de responsabilidad civil"], correcta: 0 },
  { enunciado: "¿Qué equipo se emplea habitualmente para rescatar a un trabajador de un pozo o arqueta profunda?", explicacion: "Un trípode con sistema de izado conectado al arnés del trabajador.", dificultad: "media", opciones: ["Un trípode con sistema de izado y arnés", "Una escalera de tijera exclusivamente", "Un andamio tubular modular", "Una plataforma elevadora de tijera"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tomarse frente a fuentes de ignición en un espacio confinado con riesgo de atmósfera inflamable?", explicacion: "Evitar chispas, llamas y equipos no antideflagrantes, usando equipos adecuados.", dificultad: "dificil", opciones: ["Evitar fuentes de ignición y usar equipos adecuados", "No existe ninguna precaución especial al respecto", "Aumentar la temperatura para dispersar los gases", "Usar exclusivamente herramientas manuales de acero"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-60 creado y vinculado como Tema 22 de Oficial Albañil.");
console.log("🎉 Parte específica de Oficial Albañil completa: temas 7 a 22 (16 temas técnicos).");
