/**
 * Crea el tema canónico tema-56: "Organización del trabajo en la
 * ejecución de obras. El plan de trabajo" y lo asigna como Tema 18
 * (bloque-2) de la oposición Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf).
 *
 * Fuente primaria: RD 1212/2009 (BOE-A-2009-13743), Anexo I, módulo
 * MF0141_2 "Trabajos de albañilería" del certificado EOCB0108 (texto
 * leído íntegro en este turno) — contenido formativo 2 "Organización de
 * obras de fábrica" (plan de obra, plan de calidad, plan de seguridad,
 * ordenación del tajo, planificación a corto plazo, cumplimentación de
 * partes) y capacidades C1/C3/C5 (planificación, recursos, control de
 * calidad y patologías).
 *
 * Tres secciones:
 * 1. plan-obra-planificacion — el plan de obra y la planificación a
 *    corto plazo.
 * 2. organizacion-tajo-recursos — ordenación del tajo, distribución de
 *    recursos y partes de producción.
 * 3. plan-calidad-patologias — plan de calidad y patologías habituales
 *    de las fábricas de albañilería.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-56-organizacion-trabajo-plan-obra.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-56";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_1212_2009 = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-13743";

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
    titulo: "Organización del trabajo en la ejecución de obras. El plan de trabajo",
    descripcion: "Organización del trabajo en la ejecución de obras. El plan de trabajo.",
    contenido:
      "Desarrolla el plan de obra (planos, secuencia temporal, recursos) y la planificación a corto plazo, la ordenación del tajo y la distribución de trabajadores, materiales y equipos, la cumplimentación de partes de producción e incidencias, el plan de calidad de las fábricas de albañilería y las patologías más habituales.",
    enlaces_boe: [
      { url: RD_1212_2009, titulo: "RD 1212/2009 — Certificado de profesionalidad EOCB0108, Fábricas de Albañilería (MF0141_2)" },
    ],
    indice_estudio: [
      { url: RD_1212_2009, titulo: "El plan de obra y la planificación a corto plazo", seccion: "plan-obra-planificacion", articulos: "MF0141_2, contenido 2 y C1/C3" },
      { url: RD_1212_2009, titulo: "Organización del tajo y distribución de recursos", seccion: "organizacion-tajo-recursos", articulos: "MF0141_2, contenido 2" },
      { url: RD_1212_2009, titulo: "Plan de calidad y patologías de las fábricas", seccion: "plan-calidad-patologias", articulos: "MF0141_2, contenido 2 y C5" },
    ],
  },
]);

const S1 = "plan-obra-planificacion";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el plan de obra, según el certificado EOCB0108?", reverso: "El documento que organiza la ejecución de una obra, incluyendo los planos de referencia, la secuencia temporal de los trabajos y los recursos (trabajadores, materiales, equipos) necesarios" },
    { anverso: "¿Qué es la planificación a corto plazo del tajo?", reverso: "La programación detallada de las tareas a realizar en un periodo próximo (días o semanas), ajustando recursos y secuencia con base en el avance real de la obra y detectando desviaciones respecto al plan general" },
    { anverso: "Cita métodos o herramientas básicas de planificación de obras", reverso: "El diagrama de barras o cronograma (Gantt), los listados de tareas con sus duraciones y precedencias, y los partes de seguimiento de obra" },
    { anverso: "¿Qué recursos deben determinarse para alcanzar un rendimiento concreto en un tajo, según el certificado EOCB0108?", reverso: "Los trabajadores, materiales y equipos necesarios, indicando fechas y cantidades para cada uno de estos recursos" },
    { anverso: "¿Qué es un 'punto singular' o 'punto de control' en una secuencia de trabajos de albañilería?", reverso: "Un hito o momento crítico de la ejecución en el que conviene verificar que el trabajo cumple las condiciones previstas antes de continuar, para evitar errores que se propaguen a fases posteriores" },
    { anverso: "¿Qué es un 'punto muerto' en la planificación de una obra?", reverso: "Un momento en que la actividad se detiene o ralentiza por falta de recursos, dependencia de otra tarea no finalizada, o cualquier otra causa que interrumpe el avance previsto" },
    { anverso: "¿De qué depende la estimación del tiempo necesario para ejecutar una fábrica de albañilería?", reverso: "De sus características constructivas (tipo, dimensiones, complejidad) y de la disponibilidad de recursos (trabajadores, materiales, equipos) en cada momento" },
    { anverso: "¿Qué relación existe entre el plan de obra y el plan de seguridad y salud?", reverso: "El plan de seguridad debe coordinarse con el plan de obra, ya que la secuencia de trabajos condiciona las medidas preventivas necesarias en cada fase (organización, formación, señalización, ubicación de medios y equipos)" },
    { anverso: "¿Qué documentos suelen componer, junto al plan de obra, la planificación integral de una obra de albañilería?", reverso: "El plan de calidad (criterios y plan de muestreo) y el plan de seguridad (organización, formación, señalización, ubicación de medios, equipos e instalaciones)" },
    { anverso: "¿Por qué es importante ajustar la planificación a corto plazo mediante el seguimiento del plan de obra general?", reverso: "Porque permite detectar desviaciones a tiempo, proponer alternativas razonables ante contingencias y mantener el cumplimiento de los plazos generales de la obra" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué elementos incluye el plan de obra según el certificado EOCB0108?", explicacion: "Planos, secuencia temporal y recursos necesarios.", dificultad: "media", opciones: ["Planos, secuencia temporal y recursos", "Únicamente el presupuesto de licitación", "Solo la memoria descriptiva del proyecto", "Exclusivamente el plan de seguridad"], correcta: 0 },
  { enunciado: "¿Qué es la planificación a corto plazo de un tajo?", explicacion: "La programación detallada de tareas próximas, ajustando recursos según el avance real.", dificultad: "media", opciones: ["La programación detallada de tareas próximas ajustada al avance real", "El presupuesto final de la obra", "El plan de seguridad y salud completo", "La memoria de cálculo estructural"], correcta: 0 },
  { enunciado: "¿Qué herramienta básica de planificación de obras es habitual citar?", explicacion: "El diagrama de barras o cronograma (Gantt).", dificultad: "facil", opciones: ["El diagrama de barras o cronograma", "El cuadro de precios n.º 2", "El libro de incidencias exclusivamente", "El certificado de profesionalidad del oficial"], correcta: 0 },
  { enunciado: "¿Qué recursos deben determinarse para alcanzar un rendimiento concreto en un tajo?", explicacion: "Trabajadores, materiales y equipos, con fechas y cantidades.", dificultad: "media", opciones: ["Trabajadores, materiales y equipos", "Únicamente el precio de la mano de obra", "Solo el tipo de mortero a emplear", "Exclusivamente la maquinaria pesada"], correcta: 0 },
  { enunciado: "¿Qué es un punto de control en una secuencia de trabajos de albañilería?", explicacion: "Un momento crítico en el que se verifica el cumplimiento de las condiciones antes de continuar.", dificultad: "media", opciones: ["Un momento crítico de verificación antes de continuar", "Un punto donde la obra se detiene definitivamente", "Un tipo de junta de dilatación", "Un elemento de la instalación eléctrica"], correcta: 0 },
  { enunciado: "¿Qué es un punto muerto en la planificación de una obra?", explicacion: "Un momento en que la actividad se detiene o ralentiza por falta de recursos u otra causa.", dificultad: "media", opciones: ["Un momento en que la actividad se detiene o ralentiza", "El punto final de la obra ya entregada", "Un tipo de mortero de baja resistencia", "Una junta estructural de la cimentación"], correcta: 0 },
  { enunciado: "¿De qué depende la estimación del tiempo necesario para ejecutar una fábrica de albañilería?", explicacion: "De sus características constructivas y de la disponibilidad de recursos.", dificultad: "media", opciones: ["De sus características constructivas y la disponibilidad de recursos", "Únicamente del precio del metro cuadrado", "Solo de la orientación de la fachada", "Exclusivamente de la climatología anual"], correcta: 0 },
  { enunciado: "¿Por qué debe coordinarse el plan de seguridad con el plan de obra?", explicacion: "Porque la secuencia de trabajos condiciona las medidas preventivas necesarias en cada fase.", dificultad: "media", opciones: ["Porque la secuencia de trabajos condiciona las medidas preventivas", "Porque ambos documentos son legalmente idénticos", "Porque el plan de seguridad sustituye al de obra", "Porque no existe relación alguna entre ambos"], correcta: 0 },
]);

const S2 = "organizacion-tajo-recursos";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es la 'ordenación del tajo', según el certificado EOCB0108?", reverso: "La organización del espacio y las tareas de un tajo de trabajo atendiendo a tres aspectos: producción, seguridad y mantenimiento de los equipos empleados" },
    { anverso: "¿Qué criterios deben tenerse en cuenta al distribuir trabajadores, materiales y equipos en el tajo?", reverso: "La secuencia de ejecución prevista, el rendimiento esperado, el espacio disponible, la seguridad de los operarios y la accesibilidad para el acopio y manejo de materiales" },
    { anverso: "¿Qué es un parte de producción?", reverso: "Un documento donde se registra diariamente (o por periodo) el trabajo realmente ejecutado en el tajo, permitiendo comparar el avance real con lo planificado" },
    { anverso: "¿Qué es un parte de incidencia?", reverso: "Un documento donde se registran los sucesos imprevistos que afectan al desarrollo normal de la obra (retrasos, averías, accidentes, cambios de condiciones), para su seguimiento y análisis" },
    { anverso: "¿Qué es un parte de suministro?", reverso: "Un documento que registra la entrada de materiales o equipos a la obra, indicando cantidad, fecha y procedencia, para el control del acopio y la facturación" },
    { anverso: "¿Qué es un parte de entrega, en el contexto de la organización de una obra?", reverso: "Un documento que certifica la finalización y entrega de una unidad de obra, fase o trabajo concreto, formalizando el traspaso de responsabilidad o el cierre de esa parte del proyecto" },
    { anverso: "¿Por qué es importante cumplimentar correctamente los partes de producción, incidencia y suministro?", reverso: "Porque constituyen la base documental para el seguimiento del plan de obra, la elaboración de certificaciones y la resolución de posibles discrepancias o reclamaciones" },
    { anverso: "¿Qué aspectos de seguridad deben considerarse al ordenar un tajo, además de la producción?", reverso: "La correcta ubicación de medios de protección colectiva, la señalización, las vías de circulación seguras y el mantenimiento en buen estado de los equipos y máquinas empleados" },
    { anverso: "¿Qué se entiende por 'mantenimiento de equipos' dentro de la ordenación del tajo?", reverso: "Las tareas de comprobación, limpieza y conservación de las herramientas y máquinas empleadas en el tajo, para garantizar su correcto funcionamiento y evitar averías o riesgos" },
    { anverso: "¿Qué relación hay entre una buena distribución de acopios en el tajo y la productividad?", reverso: "Una distribución adecuada minimiza los desplazamientos y tiempos muertos de los operarios, reduce riesgos de tropiezo o caída y facilita el flujo continuo de trabajo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué tres aspectos atiende la ordenación del tajo según el certificado EOCB0108?", explicacion: "Producción, seguridad y mantenimiento de equipos.", dificultad: "media", opciones: ["Producción, seguridad y mantenimiento de equipos", "Únicamente el coste de la mano de obra", "Solo la estética del acabado final", "Exclusivamente la climatología prevista"], correcta: 0 },
  { enunciado: "¿Qué es un parte de producción?", explicacion: "Un documento que registra el trabajo realmente ejecutado, comparándolo con lo planificado.", dificultad: "media", opciones: ["Un documento que registra el trabajo realmente ejecutado", "Un documento que certifica la calidad del hormigón", "Un tipo de junta de dilatación en fachada", "Un certificado de profesionalidad"], correcta: 0 },
  { enunciado: "¿Qué es un parte de incidencia?", explicacion: "Un documento que registra sucesos imprevistos que afectan al desarrollo normal de la obra.", dificultad: "media", opciones: ["Un documento que registra sucesos imprevistos", "Un documento de recepción de materiales", "Un tipo de plano de detalle constructivo", "Un informe de ensayo de laboratorio"], correcta: 0 },
  { enunciado: "¿Para qué sirve un parte de suministro?", explicacion: "Para registrar la entrada de materiales o equipos a la obra, con cantidad, fecha y procedencia.", dificultad: "media", opciones: ["Para registrar la entrada de materiales o equipos", "Para certificar la seguridad estructural", "Para planificar el plan de calidad", "Para señalizar riesgos en el tajo"], correcta: 0 },
  { enunciado: "¿Por qué es importante cumplimentar correctamente los partes de obra?", explicacion: "Porque son la base documental para el seguimiento, certificaciones y resolución de discrepancias.", dificultad: "media", opciones: ["Porque son la base documental del seguimiento y certificaciones", "Porque no tienen ninguna utilidad práctica", "Porque sustituyen al plan de seguridad", "Porque determinan el precio de licitación"], correcta: 0 },
  { enunciado: "¿Qué aspectos de seguridad deben considerarse al ordenar un tajo?", explicacion: "Ubicación de protección colectiva, señalización, vías de circulación y mantenimiento de equipos.", dificultad: "media", opciones: ["Protección colectiva, señalización y vías de circulación", "Únicamente el color de los EPI", "Solo la temperatura ambiente del tajo", "Exclusivamente el horario laboral"], correcta: 0 },
  { enunciado: "¿Qué comprende el mantenimiento de equipos dentro de la ordenación del tajo?", explicacion: "Comprobación, limpieza y conservación de herramientas y máquinas.", dificultad: "media", opciones: ["Comprobación, limpieza y conservación de herramientas", "Únicamente la sustitución anual obligatoria", "Solo el registro contable de compras", "Exclusivamente la formación de operarios"], correcta: 0 },
  { enunciado: "¿Qué beneficio aporta una buena distribución de acopios en el tajo?", explicacion: "Minimiza desplazamientos y tiempos muertos, y reduce riesgos de tropiezo o caída.", dificultad: "media", opciones: ["Minimiza desplazamientos y reduce riesgos", "Aumenta siempre el coste de la obra", "Elimina la necesidad de plan de seguridad", "No influye en la productividad del tajo"], correcta: 0 },
]);

const S3 = "plan-calidad-patologias";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el plan de calidad de una obra de fábrica de albañilería?", reverso: "El documento que establece los criterios y el plan de muestreo para verificar que los materiales y la ejecución cumplen las condiciones de calidad exigidas en el proyecto" },
    { anverso: "¿Qué son las probetas, en el control de calidad de una obra?", reverso: "Muestras normalizadas de un material (mortero, hormigón) tomadas durante la ejecución, que se ensayan en laboratorio para verificar que cumplen las resistencias y características exigidas" },
    { anverso: "¿Qué es una eflorescencia, como patología de una fábrica de albañilería?", reverso: "Una mancha o depósito blanquecino de sales solubles que aflora en la superficie de la fábrica al evaporarse el agua que las transportaba desde el interior de los materiales" },
    { anverso: "¿Qué son los desconchados, como patología de fábricas o revestimientos?", reverso: "El desprendimiento de parte del material superficial (revestimiento, pintura, mortero) dejando el soporte al descubierto, generalmente por falta de adherencia, humedad o heladicidad" },
    { anverso: "¿Qué es la heladicidad, como patología de los materiales de fábrica?", reverso: "El deterioro (fisuración, desprendimiento) que sufre un material poroso saturado de agua cuando ésta se congela en su interior y aumenta de volumen, ejerciendo presión interna sobre el material" },
    { anverso: "¿Qué se entiende por 'permeabilidad' como patología en una fábrica de albañilería?", reverso: "El paso no deseado de agua a través de la fábrica por un exceso de porosidad del material, defectos de ejecución o ausencia de tratamiento hidrófugo, provocando humedades en el interior" },
    { anverso: "¿Qué es la expansión por humedad, como patología de materiales cerámicos?", reverso: "El aumento de volumen que experimentan ciertos materiales cerámicos (como el ladrillo) al absorber humedad progresivamente a lo largo del tiempo, lo que puede generar tensiones y fisuras si no se prevén juntas de movimiento" },
    { anverso: "¿Qué debe realizarse tras la toma de muestras en el control de calidad de una fábrica?", reverso: "El registro y archivo de las muestras y de los resultados de ensayos y comprobaciones, según las condiciones de custodia establecidas en el plan de calidad" },
    { anverso: "Cita tres comprobaciones rutinarias de calidad en la ejecución de una fábrica de albañilería", reverso: "Planeidad, nivelación (horizontalidad de hiladas) y aplomado (verticalidad), además del espesor de juntas y el correcto aparejo" },
    { anverso: "¿Por qué es importante detectar precozmente patologías como eflorescencias o desconchados en una fábrica?", reverso: "Porque suelen ser síntoma de un problema de fondo (humedad, mala ejecución, material inadecuado) que, de no corregirse, puede agravarse y afectar a la durabilidad o la seguridad del elemento constructivo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué establece el plan de calidad de una obra de fábrica de albañilería?", explicacion: "Los criterios y el plan de muestreo para verificar el cumplimiento de las condiciones de calidad.", dificultad: "media", opciones: ["Los criterios y el plan de muestreo de calidad", "Únicamente el presupuesto de la obra", "Solo el calendario de ejecución", "Exclusivamente el plan de seguridad"], correcta: 0 },
  { enunciado: "¿Qué son las probetas en el control de calidad?", explicacion: "Muestras normalizadas de un material que se ensayan en laboratorio.", dificultad: "media", opciones: ["Muestras normalizadas ensayadas en laboratorio", "Piezas especiales de cumbrera o limatesa", "Un tipo de junta de dilatación", "Documentos de recepción de materiales"], correcta: 0 },
  { enunciado: "¿Qué es una eflorescencia?", explicacion: "Una mancha blanquecina de sales solubles que aflora en la superficie al evaporarse el agua.", dificultad: "media", opciones: ["Una mancha blanquecina de sales que aflora en superficie", "Una grieta estructural por asiento diferencial", "Un tipo de aislante térmico reflectante", "Un sistema de drenaje perimetral"], correcta: 0 },
  { enunciado: "¿Qué es la heladicidad como patología de un material poroso?", explicacion: "El deterioro por congelación del agua en su interior, que aumenta de volumen y ejerce presión.", dificultad: "media", opciones: ["El deterioro por congelación del agua en el interior del material", "El desprendimiento por falta de adherencia exclusivamente", "El aumento de volumen por absorción lenta de humedad", "Un tipo de ensayo de resistencia en laboratorio"], correcta: 0 },
  { enunciado: "¿A qué se refiere la 'permeabilidad' como patología de una fábrica?", explicacion: "Al paso no deseado de agua por porosidad excesiva o defectos de ejecución.", dificultad: "media", opciones: ["Al paso no deseado de agua por porosidad o defectos", "A la resistencia mecánica final de la fábrica", "Al color final del acabado de la fachada", "A la velocidad de fraguado del mortero"], correcta: 0 },
  { enunciado: "¿Qué es la expansión por humedad en materiales cerámicos?", explicacion: "El aumento de volumen por absorción progresiva de humedad a lo largo del tiempo.", dificultad: "dificil", opciones: ["El aumento de volumen por absorción progresiva de humedad", "La rotura inmediata por exceso de carga", "La pérdida de color por radiación solar", "El desprendimiento del mortero de agarre"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse tras la toma de muestras en el control de calidad?", explicacion: "Registrar y archivar las muestras y resultados según las condiciones de custodia establecidas.", dificultad: "media", opciones: ["Registrar y archivar muestras y resultados", "Desecharlas inmediatamente tras el ensayo", "Aplicarlas directamente como material de obra", "Enviarlas sin registro al vertedero"], correcta: 0 },
  { enunciado: "¿Cuáles son comprobaciones rutinarias de calidad en la ejecución de una fábrica?", explicacion: "Planeidad, nivelación y aplomado, entre otras.", dificultad: "facil", opciones: ["Planeidad, nivelación y aplomado", "Únicamente el precio de la partida", "Solo la fecha de fabricación del ladrillo", "Exclusivamente el peso de cada pieza"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-56 creado y vinculado como Tema 18 de Oficial Albañil.");
