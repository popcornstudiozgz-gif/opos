/**
 * Crea tema-209: "La red de agua potable de Zaragoza" — Tema 13
 * (numero=13, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea
 * 1170): "La red de agua potable de Zaragoza: Esquema general. Tipos de
 * tuberías y uniones. Las válvulas: tipos, función, características,
 * instalación y mantenimiento. Ventosas: tipos, función,
 * características, instalación y mantenimiento. Accionamiento y
 * automatización de válvulas."
 *
 * Fuentes primarias ya verificadas en esta sesión (proyecto, Oficial
 * Guardallaves) y reutilizadas aquí por tratar el mismo objeto (la red
 * de abastecimiento de Zaragoza) desde la perspectiva de planta:
 * - Ayuntamiento de Zaragoza, "Red de abastecimiento de agua": esquema
 *   general (depósito de Casablanca, depósitos secundarios, red
 *   arterial y de distribución, telecontrol y sectorización).
 * - UNE-EN 545 (fundición dúctil), UNE-EN ISO 1452 (PVC), UNE-EN 12201
 *   (polietileno): tipos de tuberías.
 * - UNE-EN 1074 (válvulas de suministro de agua) y UNE-EN 1074-4
 *   (ventosas): tipos, función y características.
 * El accionamiento y automatización de válvulas (motorización, cuadros
 * de maniobra) es conocimiento técnico consolidado ya tratado también
 * en Oficial Guardallaves (tema-196), sin una norma española específica
 * más allá del REBT para su instalación eléctrica.
 *
 * Tres secciones:
 * 1. esquema-general-red-tipos-tuberias-uniones
 * 2. valvulas-tipos-funcion-instalacion-mantenimiento
 * 3. ventosas-accionamiento-automatizacion-valvulas
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-209-red-agua-potable-zaragoza.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-209";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "La red de agua potable de Zaragoza",
  descripcion: "Esquema general de la red: depósitos, arterias y distribución. Tipos de tuberías y uniones. Válvulas y ventosas: tipos, función, instalación y mantenimiento. Accionamiento y automatización de válvulas.",
  contenido: "Desarrolla la red de agua potable de Zaragoza desde la perspectiva de la planta potabilizadora, como origen de esa red: su esquema general (depósito de Casablanca, depósitos secundarios, red arterial y de distribución), los tipos de tuberías empleadas en su construcción y sus sistemas de unión, las válvulas de la red (tipos, función, características, instalación y mantenimiento), las ventosas, y el accionamiento y la automatización de las válvulas motorizadas.",
  enlaces_boe: [
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Esquema general de la red, tipos de tuberías y uniones", seccion: "esquema-general-red-tipos-tuberias-uniones", articulos: "Ayuntamiento de Zaragoza — Red de abastecimiento de agua; UNE-EN 545, UNE-EN ISO 1452, UNE-EN 12201" },
    { url: "", titulo: "Válvulas: tipos, función, instalación y mantenimiento", seccion: "valvulas-tipos-funcion-instalacion-mantenimiento", articulos: "UNE-EN 1074" },
    { url: "", titulo: "Ventosas, accionamiento y automatización de válvulas", seccion: "ventosas-accionamiento-automatizacion-valvulas", articulos: "UNE-EN 1074-4" },
  ],
}]);

const S1 = "esquema-general-red-tipos-tuberias-uniones";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué papel cumple la Planta Potabilizadora de Casablanca respecto al esquema general de la red de agua potable de Zaragoza?", reverso: "Es el origen de la red: tras el tratamiento, el agua se almacena en el depósito central de Casablanca (~148.000 m³) y desde ahí se distribuye, directamente o bombeada, hacia los depósitos secundarios (Valdespartera, Canteras, Leones-Academia, Ecociudad) que abastecen el resto de la ciudad" },
  { anverso: "¿En qué dos grandes tipos se organiza la red de distribución de Zaragoza según el diámetro de sus tuberías?", reverso: "En red arterial (tuberías de gran diámetro, que conducen el agua desde los depósitos) y red de distribución (tuberías de menor diámetro que llegan a los puntos de consumo)" },
  { anverso: "¿Qué norma regula los tubos y accesorios de fundición dúctil empleados en la red?", reverso: "La norma UNE-EN 545" },
  { anverso: "¿Qué normas regulan, respectivamente, las tuberías de polietileno y de PVC empleadas hoy predominantemente en la red?", reverso: "La UNE-EN 12201 para el polietileno, y la UNE-EN ISO 1452 para el PVC no plastificado" },
  { anverso: "¿Qué sistemas de unión son habituales en la fundición dúctil, el polietileno y el PVC, respectivamente?", reverso: "Junta elástica o embridada en fundición dúctil; termofusión o electrofusión en polietileno; encolado o junta elástica en PVC" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué papel cumple la Planta Potabilizadora de Casablanca respecto a la red de agua potable de Zaragoza?", explicacion: "Es el origen de la red: tras el tratamiento, el agua se almacena y distribuye desde el depósito de Casablanca.", dificultad: "facil", opciones: ["Es el origen de la red, tras el cual el agua se almacena y distribuye", "Es un depósito secundario más, sin ninguna relación con el origen del agua", "Es exclusivamente un punto de facturación del consumo de los abonados", "Es exclusivamente un punto de vaciado de la red en caso de avería"], correcta: 0 },
  { enunciado: "¿En qué dos grandes tipos se organiza la red de distribución de Zaragoza?", explicacion: "Red arterial y red de distribución.", dificultad: "media", opciones: ["Red arterial y red de distribución", "Red primaria y red secundaria de saneamiento", "Red de riego y red de saneamiento exclusivamente", "Red norte y red sur, sin ninguna otra clasificación"], correcta: 0 },
  { enunciado: "¿Qué norma regula los tubos y accesorios de fundición dúctil de la red?", explicacion: "La norma UNE-EN 545.", dificultad: "media", opciones: ["La norma UNE-EN 545", "La norma UNE-EN 12201", "La norma UNE-EN ISO 1452", "La norma UNE-EN 1074"], correcta: 0 },
  { enunciado: "¿Qué normas regulan las tuberías de polietileno y de PVC de la red, respectivamente?", explicacion: "UNE-EN 12201 (polietileno) y UNE-EN ISO 1452 (PVC).", dificultad: "dificil", opciones: ["UNE-EN 12201 y UNE-EN ISO 1452", "UNE-EN 545 y UNE-EN 124", "UNE-EN 1074 y UNE-EN 14339", "UNE-EN 124 y UNE-EN 1074-4"], correcta: 0 },
  { enunciado: "¿Qué sistema de unión es habitual en las tuberías de polietileno de la red?", explicacion: "Termofusión o electrofusión.", dificultad: "media", opciones: ["Termofusión o electrofusión", "Encolado con adhesivo específico", "Junta embridada exclusivamente", "Remachado exclusivamente"], correcta: 0 },
]);

const S2 = "valvulas-tipos-funcion-instalacion-mantenimiento";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma establece los requisitos de aptitud al uso de las válvulas para el suministro de agua de la red de Zaragoza?", reverso: "La norma UNE-EN 1074, dividida en varias partes: requisitos generales (Parte 1), válvulas de aislamiento (Parte 2), válvulas de retención (Parte 3), ventosas (Parte 4) e hidrantes (Parte 6)" },
  { anverso: "¿Qué dos grandes tipos de válvula de aislamiento son los más habituales en la red de Zaragoza?", reverso: "Las válvulas de compuerta (con cierre elástico o cierre metal) y las válvulas de mariposa (de eje excéntrico o de eje cerrado)" },
  { anverso: "¿Qué función cumple una válvula de aislamiento dentro de la red?", reverso: "Permitir el corte total del paso de agua por un tramo de conducción, para poder aislarlo en caso de avería o de trabajos de mantenimiento sin afectar al resto de la red" },
  { anverso: "¿Qué es una válvula reductora de presión, y para qué se emplea en la red de Zaragoza?", reverso: "Una válvula que regula automáticamente su apertura para mantener a su salida una presión inferior y más estable que la de entrada, empleada para adaptar la presión disponible a las necesidades concretas de un tramo o de una zona de la red" },
  { anverso: "¿Qué comprobaciones básicas de mantenimiento requiere periódicamente una válvula de la red?", reverso: "Comprobación de su estanqueidad al cerrar por completo, engrase o revisión del husillo y del sistema de accionamiento, y verificación de que no está agarrotada ni presenta corrosión que dificulte su maniobra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma establece los requisitos de aptitud al uso de las válvulas para el suministro de agua?", explicacion: "La norma UNE-EN 1074.", dificultad: "media", opciones: ["La norma UNE-EN 1074", "La norma UNE-EN 545", "La norma UNE-EN 12201", "La norma UNE-EN 124"], correcta: 0 },
  { enunciado: "¿Qué dos grandes tipos de válvula de aislamiento son los más habituales en la red?", explicacion: "Válvulas de compuerta y válvulas de mariposa.", dificultad: "media", opciones: ["Válvulas de compuerta y de mariposa", "Válvulas de seguridad y de retención exclusivamente", "Válvulas reductoras de presión exclusivamente", "Válvulas de bola exclusivamente, sin ninguna otra alternativa"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula de aislamiento en la red?", explicacion: "Permite el corte total del paso de agua por un tramo, para aislarlo.", dificultad: "facil", opciones: ["Permite el corte total del paso de agua por un tramo", "Mide el caudal exacto que circula por ese tramo", "Purga el aire acumulado en los puntos altos de la red", "Filtra las partículas sólidas que arrastra el agua"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula reductora de presión en la red de Zaragoza?", explicacion: "Mantiene a su salida una presión inferior y estable respecto a la de entrada.", dificultad: "media", opciones: ["Mantiene a su salida una presión inferior y estable", "Aumenta artificialmente la presión disponible aguas abajo", "Mide el caudal exacto que circula por la conducción", "Purga el aire acumulado en los puntos altos de la red"], correcta: 0 },
  { enunciado: "¿Qué comprobación básica de mantenimiento requiere periódicamente una válvula de la red?", explicacion: "Comprobación de su estanqueidad al cerrar por completo.", dificultad: "media", opciones: ["Comprobación de su estanqueidad al cerrar por completo", "Ninguna comprobación periódica, al ser equipos de vida indefinida", "Sustitución completa cada año, con independencia de su estado real", "Pintado exterior periódico, sin ninguna comprobación funcional"], correcta: 0 },
]);

const S3 = "ventosas-accionamiento-automatizacion-valvulas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple una ventosa en la red de agua potable de Zaragoza?", reverso: "Purgar el aire que se acumula en los puntos altos del trazado durante el funcionamiento normal, y admitir aire cuando la conducción se vacía, evitando así depresiones que podrían dañarla" },
  { anverso: "¿Qué norma regula específicamente las ventosas dentro de la familia UNE-EN 1074?", reverso: "La norma UNE-EN 1074-4, dedicada a ventosas y válvulas de vacío" },
  { anverso: "¿Por qué es importante para la red de Zaragoza que las ventosas funcionen correctamente en los puntos altos del trazado?", reverso: "Porque el aire acumulado reduce la sección útil de paso del agua, aumenta la pérdida de carga, puede provocar golpes de ariete al desplazarse bruscamente, y falsea la medición de caudal en algunos puntos de la red" },
  { anverso: "¿Qué es el accionamiento motorizado de una válvula de la red?", reverso: "Un sistema (motorreductor, cuadro de maniobras, elementos de mando y de protección eléctrica) que permite abrir y cerrar una válvula de forma automática o remota, en lugar de mediante una maniobra manual directa" },
  { anverso: "¿Qué ventaja aporta la automatización de válvulas dentro del sistema de telecontrol y sectorización de la red de Zaragoza?", reverso: "Permite maniobrar válvulas a distancia sin necesidad de desplazamiento físico inmediato, integrarlas en la gestión centralizada de sectores, y reaccionar con mayor rapidez ante una incidencia detectada por el propio sistema de telecontrol" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué función cumple una ventosa en la red de agua potable de Zaragoza?", explicacion: "Purga el aire acumulado en los puntos altos y admite aire al vaciarse.", dificultad: "facil", opciones: ["Purga el aire acumulado en los puntos altos de la conducción", "Mide el caudal exacto que circula por esa conducción", "Reduce de forma permanente la presión de servicio de la red", "Filtra las partículas sólidas que arrastra el agua"], correcta: 0 },
  { enunciado: "¿Qué norma regula específicamente las ventosas dentro de la familia UNE-EN 1074?", explicacion: "La norma UNE-EN 1074-4.", dificultad: "media", opciones: ["La norma UNE-EN 1074-4", "La norma UNE-EN 1074-1", "La norma UNE-EN 14339", "La norma UNE-EN 545"], correcta: 0 },
  { enunciado: "¿Por qué es importante que las ventosas funcionen correctamente en los puntos altos de la red?", explicacion: "El aire acumulado aumenta la pérdida de carga y puede provocar golpes de ariete.", dificultad: "media", opciones: ["El aire acumulado aumenta la pérdida de carga y el riesgo de golpe de ariete", "No genera ningún inconveniente técnico real en la conducción", "Mejora de forma directa la calidad sanitaria del agua distribuida", "Reduce de forma permanente el consumo eléctrico de la red"], correcta: 0 },
  { enunciado: "¿Qué es el accionamiento motorizado de una válvula de la red?", explicacion: "Un sistema que permite abrir y cerrar la válvula de forma automática o remota.", dificultad: "media", opciones: ["Un sistema que permite abrir y cerrar la válvula de forma remota", "Un sistema exclusivo de purga de aire de la conducción cercana", "Un sistema exclusivo de medición del caudal de esa conducción", "Un sistema exclusivo de facturación del consumo de esa zona"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la automatización de válvulas dentro del sistema de telecontrol de la red?", explicacion: "Permite maniobrar a distancia y reaccionar con mayor rapidez ante una incidencia.", dificultad: "dificil", opciones: ["Permite maniobrar a distancia y reaccionar con mayor rapidez", "Elimina por completo la necesidad de personal de mantenimiento", "Aumenta de forma directa la presión disponible en toda la ciudad", "Sustituye por completo la necesidad de ventosas en la red"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-209 creado y vinculado como Tema 13 de Oficial Planta Potabilizadora.");
