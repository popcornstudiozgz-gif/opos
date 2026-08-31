/**
 * Crea tema-64: "Albañilería básica de mantenimiento" — Tema 10
 * (numero=10, bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf):
 *   "Albañilería: tipos de materiales (cemento, áridos, azulejos, yeso,
 *   cal y mortero) y reparaciones más frecuentes (desconchados, grietas,
 *   agujeros, reposición de baldosas, azulejos y goteras). Reconocimiento
 *   de herramientas."
 *
 * A diferencia de tema-45 (Oficial Albañil: materiales/herramientas para
 * ejecutar fábricas de obra nueva), este tema se centra en el enfoque de
 * mantenimiento correctivo de pequeñas reparaciones en edificios ya
 * construidos — enfoque distinto que justifica contenido propio en lugar
 * de reutilizar tema-45. Conocimiento técnico consolidado del oficio, sin
 * cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-64-albanileria-basica-mantenimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-64";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";

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
  titulo: "Albañilería básica de mantenimiento",
  descripcion: "Tipos de materiales (cemento, áridos, azulejos, yeso, cal y mortero) y reparaciones más frecuentes (desconchados, grietas, agujeros, reposición de baldosas, azulejos y goteras). Reconocimiento de herramientas.",
  contenido: "Desarrolla los materiales básicos de albañilería empleados en tareas de mantenimiento (cemento, áridos, azulejos, yeso, cal y mortero), las reparaciones más frecuentes en edificios ya construidos (desconchados, grietas, agujeros, reposición de baldosas y azulejos, goteras) y las herramientas propias de estas tareas de mantenimiento correctivo.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Materiales de albañilería para mantenimiento", seccion: "materiales-albanileria-mantenimiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Reparaciones frecuentes: desconchados, grietas, agujeros, baldosas, goteras", seccion: "reparaciones-frecuentes-albanileria", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Herramientas de albañilería de mantenimiento", seccion: "herramientas-albanileria-mantenimiento", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "materiales-albanileria-mantenimiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el cemento y para qué se usa en tareas de mantenimiento?", reverso: "Un conglomerante hidráulico que, mezclado con agua y árido, fragua y endurece; se usa para preparar morteros de reparación y pequeños remates de albañilería" },
  { anverso: "¿Qué son los áridos y qué función cumplen en un mortero de reparación?", reverso: "Materiales granulares (arena, gravilla) que, mezclados con el conglomerante y el agua, dan cuerpo y resistencia al mortero" },
  { anverso: "¿Qué es el yeso y para qué se emplea en tareas de mantenimiento de interiores?", reverso: "Un conglomerante aéreo de fraguado rápido, usado para tapar agujeros, regularizar paramentos interiores y pequeños enlucidos; no resiste bien la humedad" },
  { anverso: "¿Qué es la cal y qué ventaja aporta frente al cemento en reparaciones de fachadas antiguas?", reverso: "Un conglomerante más flexible y transpirable que el cemento, adecuado para reparar fábricas antiguas sin generar tensiones incompatibles con el material original" },
  { anverso: "¿Qué es un mortero de reparación y qué diferencia tiene frente a un mortero de obra nueva?", reverso: "Un mortero (cemento/cal + árido + agua) formulado para adherirse bien a un soporte ya existente, a veces con aditivos específicos de adherencia o retracción controlada" },
  { anverso: "¿Qué es un azulejo y qué distingue a las piezas de reposición frente a las originales?", reverso: "Una pieza cerámica esmaltada de revestimiento; al reponer una pieza rota conviene buscar el mismo formato y, si es posible, tono, aunque con piezas antiguas puede no encontrarse un tono idéntico" },
  { anverso: "¿Qué es el mortero cola (adhesivo cementoso) y para qué se usa?", reverso: "Un mortero especial con resinas que mejora la adherencia, usado para pegar baldosas o azulejos de reposición sobre el soporte existente" },
  { anverso: "¿Qué es una lechada de rejuntar y para qué se emplea?", reverso: "Una pasta fina (cemento o resina + agua) que rellena las juntas entre baldosas o azulejos tras su colocación" },
  { anverso: "¿Qué es un producto de imprimación en la reparación de un paramento?", reverso: "Un producto que se aplica antes del enlucido o pintura para mejorar la adherencia del material posterior y sellar la porosidad del soporte" },
  { anverso: "¿Qué es un sellador o masilla elástica y en qué reparaciones de mantenimiento se usa?", reverso: "Un producto flexible (silicona, poliuretano) que sella juntas de dilatación o pequeñas fisuras permitiendo el movimiento del material sin agrietarse" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué materiales se combinan para preparar un mortero de reparación?", explicacion: "Conglomerante (cemento o cal), árido y agua.", dificultad: "facil", opciones: ["Conglomerante, árido y agua", "Solo cemento y agua", "Solo yeso y arena", "Solo cal y agua"], correcta: 0 },
  { enunciado: "¿Para qué se emplea habitualmente el yeso en tareas de mantenimiento de interiores?", explicacion: "Para tapar agujeros y regularizar paramentos interiores.", dificultad: "facil", opciones: ["Para tapar agujeros y regularizar paramentos interiores", "Para reparar fachadas expuestas a la lluvia", "Para pegar azulejos de reposición", "Para rejuntar baldosas de exterior"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la cal frente al cemento al reparar fábricas antiguas?", explicacion: "Es más flexible y transpirable, compatible con el material original.", dificultad: "media", opciones: ["Es más flexible y transpirable", "Fragua más rápido que el cemento", "Resiste mejor la humedad que el cemento", "No requiere mezclarse con agua"], correcta: 0 },
  { enunciado: "¿Qué producto se usa para pegar una baldosa o azulejo de reposición?", explicacion: "El mortero cola o adhesivo cementoso.", dificultad: "media", opciones: ["El mortero cola o adhesivo cementoso", "El yeso puro", "La cal aérea sin árido", "El sellador de silicona"], correcta: 0 },
  { enunciado: "¿Para qué se usa una lechada de rejuntar?", explicacion: "Para rellenar las juntas entre baldosas o azulejos tras su colocación.", dificultad: "media", opciones: ["Para rellenar las juntas entre piezas", "Para pegar la pieza al soporte", "Para tapar grietas estructurales", "Para imprimar el paramento"], correcta: 0 },
  { enunciado: "¿Qué función cumple un producto de imprimación antes de enlucir o pintar?", explicacion: "Mejora la adherencia del material posterior y sella la porosidad del soporte.", dificultad: "media", opciones: ["Mejora la adherencia y sella la porosidad", "Sustituye al mortero de reparación", "Elimina la necesidad de lechada", "Solo se usa en exteriores"], correcta: 0 },
  { enunciado: "¿Qué característica define a un sellador o masilla elástica?", explicacion: "Es flexible y permite el movimiento del material sin agrietarse.", dificultad: "media", opciones: ["Es flexible y permite el movimiento sin agrietarse", "Es rígido como el mortero de cemento", "Solo se usa para pegar azulejos", "Sustituye al árido en el mortero"], correcta: 0 },
  { enunciado: "¿Qué se recomienda buscar al reponer una pieza de azulejo rota?", explicacion: "El mismo formato y, si es posible, tono similar.", dificultad: "facil", opciones: ["El mismo formato y tono similar", "Cualquier pieza disponible sin importar tamaño", "Una pieza siempre de mayor grosor", "Solo importa el color, no el tamaño"], correcta: 0 },
]);

const S2 = "reparaciones-frecuentes-albanileria";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un desconchado en un paramento y cómo se repara?", reverso: "La pérdida de una porción superficial de revestimiento (pintura, enlucido); se repara limpiando la zona, aplicando un producto de relleno o enlucido y lijando antes de repintar" },
  { anverso: "¿Qué diferencia hay entre una grieta y una fisura en un paramento?", reverso: "La fisura es una abertura muy fina, casi superficial; la grieta es más ancha y profunda y puede indicar un movimiento estructural que conviene vigilar antes de repararla" },
  { anverso: "¿Qué pasos básicos sigue la reparación de una grieta no estructural en un paramento?", reverso: "Abrir ligeramente la grieta en forma de V, limpiar el polvo, rellenar con un mortero o masilla adecuada, y enlucir/lijar el acabado" },
  { anverso: "¿Cuándo debe un oficial de mantenimiento avisar a un técnico superior en lugar de reparar directamente una grieta?", reverso: "Cuando la grieta es de gran anchura, sigue creciendo con el tiempo, o afecta a elementos estructurales (pilares, vigas, muros de carga), ya que puede indicar un problema estructural" },
  { anverso: "¿Cómo se repara un agujero pequeño en un tabique de yeso o ladrillo hueco?", reverso: "Rellenando con yeso o mortero adecuado (a veces con una malla de refuerzo si el agujero es de cierto tamaño), enrasando y lijando antes del acabado" },
  { anverso: "¿Qué causa habitual provoca una gotera en una cubierta o terraza?", reverso: "El deterioro o rotura de la capa impermeabilizante, un fallo en un punto singular (encuentro, junta, bajante) o la obstrucción de un desagüe/sumidero" },
  { anverso: "¿Qué comprobación básica debe hacerse antes de reparar una gotera?", reverso: "Localizar el origen real de la entrada de agua (que no siempre coincide con el punto donde aparece la humedad en el interior), antes de intervenir sobre el punto visible" },
  { anverso: "¿Qué es una reposición de baldosa suelta o rota en un pavimento?", reverso: "La sustitución de la pieza dañada, retirando el mortero antiguo, limpiando el hueco, y colocando la nueva pieza con mortero cola o mortero de agarre, respetando el nivel del pavimento existente" },
  { anverso: "¿Por qué es importante dejar secar bien un mortero de reparación antes de aplicar pintura o sellador?", reverso: "Porque la humedad residual puede provocar que el acabado posterior no fragüe/adhiera bien, se agriete o aparezcan manchas" },
  { anverso: "¿Qué precaución de seguridad debe tomarse al picar un paramento para reparar una grieta o desconchado?", reverso: "Usar gafas de protección y mascarilla frente al polvo, y comprobar previamente que no hay instalaciones eléctricas o de fontanería empotradas en la zona" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un desconchado en un paramento?", explicacion: "La pérdida de una porción superficial de revestimiento.", dificultad: "facil", opciones: ["La pérdida de una porción superficial de revestimiento", "Una grieta estructural profunda", "Una gotera en cubierta", "Una baldosa suelta"], correcta: 0 },
  { enunciado: "¿Qué diferencia una grieta de una fisura?", explicacion: "La fisura es muy fina y superficial; la grieta es más ancha y profunda.", dificultad: "media", opciones: ["La grieta es más ancha y profunda que la fisura", "Son exactamente lo mismo", "La fisura solo aparece en cubiertas", "La grieta solo aparece en tabiques de yeso"], correcta: 0 },
  { enunciado: "¿Cuándo debe el oficial avisar a un técnico superior ante una grieta?", explicacion: "Cuando es de gran anchura, sigue creciendo o afecta a elementos estructurales.", dificultad: "media", opciones: ["Cuando es amplia, crece o afecta a elementos estructurales", "Siempre, nunca debe repararla él mismo", "Solo si aparece en un tabique de yeso", "Nunca, todas las grietas se reparan igual"], correcta: 0 },
  { enunciado: "¿Cómo se repara habitualmente un agujero pequeño en un tabique?", explicacion: "Rellenando con yeso o mortero adecuado, enrasando y lijando.", dificultad: "facil", opciones: ["Rellenando con yeso o mortero, enrasando y lijando", "Sustituyendo todo el tabique", "Aplicando solo pintura sin relleno", "Colocando una baldosa de reposición"], correcta: 0 },
  { enunciado: "¿Qué causa habitual provoca una gotera en cubierta?", explicacion: "El deterioro de la impermeabilización o la obstrucción de un desagüe.", dificultad: "media", opciones: ["Deterioro de la impermeabilización u obstrucción de desagüe", "El desgaste de un cartucho de grifo", "Un fallo en el cuadro eléctrico", "La rotura de un azulejo de pavimento"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de reparar una gotera?", explicacion: "El origen real de la entrada de agua, que no siempre coincide con el punto visible.", dificultad: "media", opciones: ["El origen real de la entrada de agua", "Solo el color de la mancha de humedad", "El tipo de baldosa del pavimento", "El grosor del enlucido de yeso"], correcta: 0 },
  { enunciado: "¿Con qué material se coloca habitualmente una baldosa de reposición?", explicacion: "Con mortero cola o mortero de agarre.", dificultad: "facil", opciones: ["Con mortero cola o mortero de agarre", "Con yeso puro sin árido", "Con sellador de silicona únicamente", "Con lechada de rejuntar únicamente"], correcta: 0 },
  { enunciado: "¿Qué precaución de seguridad debe tomarse al picar un paramento?", explicacion: "Usar protección frente al polvo y comprobar instalaciones empotradas.", dificultad: "media", opciones: ["Usar protección frente al polvo y comprobar instalaciones empotradas", "No es necesaria ninguna precaución especial", "Solo usar guantes, sin protección respiratoria", "Picar siempre sin comprobar antes el paramento"], correcta: 0 },
]);

const S3 = "herramientas-albanileria-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Para qué se usa la paleta o llana pequeña en reparaciones de mantenimiento?", reverso: "Para coger, extender y repartir pequeñas cantidades de mortero o yeso en reparaciones puntuales" },
  { anverso: "¿Para qué se usa un cincel y una maceta en tareas de mantenimiento de albañilería?", reverso: "Para picar y sanear una grieta, retirar material suelto o abrir una roza pequeña antes de reparar" },
  { anverso: "¿Para qué se usa una espátula en tareas de albañilería/pintura de mantenimiento?", reverso: "Para aplicar y alisar masilla, plaste o pequeñas cantidades de yeso sobre un desconchado o agujero" },
  { anverso: "¿Para qué sirve una amoladora radial (radial) en reparaciones de albañilería?", reverso: "Para cortar piezas cerámicas, baldosas o rozar un paramento con precisión, mediante un disco de corte" },
  { anverso: "¿Para qué se usa un nivel de burbuja al reponer una baldosa?", reverso: "Para comprobar que la nueva pieza queda a nivel con el pavimento existente" },
  { anverso: "¿Para qué se usa una pistola de silicona o masilla?", reverso: "Para aplicar de forma controlada sellador o masilla elástica en juntas o pequeñas fisuras" },
  { anverso: "¿Para qué se usa un taladro con broca de corona (o de vídea) en mantenimiento de albañilería?", reverso: "Para practicar taladros de mayor diámetro en fábrica, por ejemplo para pasos de instalaciones" },
  { anverso: "¿Para qué se usa una llana dentada al colocar una baldosa de reposición?", reverso: "Para extender el mortero cola con un espesor uniforme mediante sus dientes, mejorando la adherencia de la pieza" },
  { anverso: "¿Qué equipo de protección individual es imprescindible al picar o cortar material de albañilería?", reverso: "Gafas de protección frente a proyecciones y mascarilla frente al polvo; guantes y protección auditiva si se usa maquinaria" },
  { anverso: "¿Para qué se usa un flexómetro (metro) en tareas de mantenimiento de albañilería?", reverso: "Para medir dimensiones exactas de la zona a reparar y de la pieza de reposición necesaria" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Para qué se usa el cincel y la maceta en una reparación de albañilería?", explicacion: "Para picar y sanear una grieta o abrir una pequeña roza.", dificultad: "facil", opciones: ["Para picar y sanear una grieta", "Para nivelar una baldosa", "Para aplicar silicona en una junta", "Para medir la zona a reparar"], correcta: 0 },
  { enunciado: "¿Para qué se usa una espátula en una reparación de mantenimiento?", explicacion: "Para aplicar y alisar masilla, plaste o yeso.", dificultad: "facil", opciones: ["Para aplicar y alisar masilla o yeso", "Para cortar piezas cerámicas", "Para taladrar fábrica", "Para nivelar una baldosa"], correcta: 0 },
  { enunciado: "¿Con qué herramienta se corta con precisión una pieza cerámica o baldosa?", explicacion: "Con una amoladora radial (radial) con disco de corte.", dificultad: "media", opciones: ["Con una amoladora radial", "Con una espátula", "Con una llana dentada", "Con una pistola de silicona"], correcta: 0 },
  { enunciado: "¿Para qué se usa el nivel de burbuja al reponer una baldosa?", explicacion: "Para comprobar que queda a nivel con el pavimento existente.", dificultad: "media", opciones: ["Para comprobar que queda a nivel", "Para medir la superficie a reparar", "Para picar la zona dañada", "Para extender el mortero cola"], correcta: 0 },
  { enunciado: "¿Con qué herramienta se aplica una masilla elástica de forma controlada?", explicacion: "Con una pistola de silicona o masilla.", dificultad: "facil", opciones: ["Con una pistola de silicona o masilla", "Con una llana dentada", "Con un cincel y maceta", "Con una amoladora radial"], correcta: 0 },
  { enunciado: "¿Para qué se usa un taladro con broca de corona en mantenimiento de albañilería?", explicacion: "Para practicar taladros de mayor diámetro, por ejemplo para pasos de instalaciones.", dificultad: "media", opciones: ["Para taladros de mayor diámetro", "Para picar una grieta", "Para nivelar una baldosa", "Para medir la zona a reparar"], correcta: 0 },
  { enunciado: "¿Para qué sirve la llana dentada al colocar una baldosa de reposición?", explicacion: "Para extender el mortero cola con espesor uniforme.", dificultad: "media", opciones: ["Para extender el mortero cola con espesor uniforme", "Para picar el paramento", "Para medir dimensiones", "Para aplicar silicona"], correcta: 0 },
  { enunciado: "¿Qué protección es imprescindible al picar o cortar material de albañilería?", explicacion: "Gafas y mascarilla, y protección auditiva si se usa maquinaria.", dificultad: "facil", opciones: ["Gafas de protección y mascarilla frente al polvo", "No es necesaria ninguna protección", "Solo calzado de seguridad", "Solo guantes de látex"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-64 creado y vinculado como Tema 10 de Oficial Mantenimiento General.");
