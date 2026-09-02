/**
 * Crea tema-188: "Cartografía del Servicio de Explotación de Redes y
 * Sistema de Información Geográfica" — Tema 8 (numero=8, bloque-2) de
 * Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea 902):
 *   "Interpretación de la cartografía del Servicio de Explotación de
 *   Redes. Planos de proyectos y planos específicos de guardallaves.
 *   Sistema de Información Geográfica."
 *
 * Sourcing mixto, conforme al estándar del proyecto:
 * - La interpretación de planos de redes de agua (simbología de tuberías,
 *   válvulas, arquetas, escalas, cotas, plantas y perfiles longitudinales)
 *   es conocimiento técnico consolidado del oficio de guardallaves, sin
 *   una norma española que lo regule como tal — mismo criterio ya
 *   aplicado en Oficial Carpintero y Oficial Herrero para dibujo técnico
 *   de oficio (ver scripts/seed-tema-117-*.mjs y scripts/seed-tema-163-*.mjs)
 *   salvo por la referencia general a la normalización de planos que sí
 *   tienen esos temas (UNE 1032). Aquí no se ha localizado una norma
 *   específica para planos de redes de agua urbanas más allá de esa
 *   normalización general de dibujo técnico, y así se señala.
 * - Los "planos específicos de guardallaves" y del "Servicio de
 *   Explotación de Redes" son documentación interna de gestión de la red
 *   municipal de Zaragoza (no publicada como tal, por su propia
 *   naturaleza operativa) — se explica su función sin fabricar su
 *   contenido concreto.
 * - El Sistema de Información Geográfica sí cuenta con una referencia
 *   pública verificada mediante búsqueda en esta sesión: IDEZar,
 *   Infraestructura de Datos Espaciales de Zaragoza, en marcha desde 2004
 *   como nodo local de la iniciativa europea INSPIRE
 *   (https://www.zaragoza.es/ciudad/idezar/profesionales/saber.htm),
 *   que da acceso a información geográfica municipal (incluida la de
 *   infraestructuras) mediante estándares de interoperabilidad. El SIG
 *   interno específico del Servicio de Explotación de Redes es una
 *   herramienta corporativa de gestión no publicada en detalle, que se
 *   apoya en esos mismos estándares.
 *
 * Tres secciones:
 * 1. interpretacion-planos-redes-simbologia-escalas
 * 2. planos-proyecto-planos-especificos-guardallaves
 * 3. sistema-informacion-geografica-idezar
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-188-cartografia-sig-explotacion-redes.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-188";
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
  titulo: "Cartografía del Servicio de Explotación de Redes y Sistema de Información Geográfica",
  descripcion: "Interpretación de planos de redes de agua: simbología, escalas y perfiles. Planos de proyecto y planos específicos de guardallaves. El Sistema de Información Geográfica y su referencia municipal, IDEZar.",
  contenido: "Desarrolla la interpretación de la cartografía técnica empleada en la gestión de la red de abastecimiento de agua: simbología de tuberías, válvulas y elementos auxiliares en planta, escalas habituales y perfiles longitudinales. Explica la función de los planos de proyecto (documentación de una obra nueva o reforma) frente a los planos específicos de guardallaves (documentación operativa para la localización y maniobra de válvulas en el día a día). Y sitúa el uso de estos planos dentro de un Sistema de Información Geográfica (SIG), con referencia a IDEZar, la Infraestructura de Datos Espaciales del Ayuntamiento de Zaragoza.",
  enlaces_boe: [
    "https://www.zaragoza.es/ciudad/idezar/profesionales/saber.htm",
  ],
  indice_estudio: [
    { url: "", titulo: "Interpretación de planos de redes: simbología y escalas", seccion: "interpretacion-planos-redes-simbologia-escalas", articulos: "Conocimiento técnico del oficio de guardallaves" },
    { url: "", titulo: "Planos de proyecto y planos específicos de guardallaves", seccion: "planos-proyecto-planos-especificos-guardallaves", articulos: "Conocimiento técnico del oficio de guardallaves" },
    { url: "https://www.zaragoza.es/ciudad/idezar/profesionales/saber.htm", titulo: "El Sistema de Información Geográfica: IDEZar", seccion: "sistema-informacion-geografica-idezar", articulos: "Ayuntamiento de Zaragoza — IDEZar" },
  ],
}]);

const S1 = "interpretacion-planos-redes-simbologia-escalas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la simbología en un plano de red de agua?", reverso: "El conjunto de signos convencionales normalizados (líneas, colores, formas) que representan de forma abreviada tuberías, válvulas, arquetas, hidrantes y demás elementos de la red sobre el plano" },
  { anverso: "¿Qué información suele indicar el trazado de una tubería en un plano de red?", reverso: "Su diámetro, su material y, habitualmente, su cota o profundidad, junto con el sentido general del flujo cuando es relevante" },
  { anverso: "¿Qué es la escala de un plano?", reverso: "La relación entre las medidas representadas en el plano y las medidas reales sobre el terreno; por ejemplo, en una escala 1:1.000, un centímetro del plano equivale a 1.000 centímetros (10 metros) reales" },
  { anverso: "¿Qué es un perfil longitudinal de una conducción?", reverso: "Una representación en corte a lo largo del trazado de una tubería que muestra su profundidad, sus pendientes y la posición relativa respecto a otras conducciones o servicios que cruza" },
  { anverso: "¿Por qué es importante para un guardallaves leer correctamente la simbología y la escala de un plano antes de intervenir en la red?", reverso: "Porque permite localizar con precisión la válvula, la acometida o la avería sobre el terreno real, evitar errores de maniobra sobre elementos equivocados y coordinar la intervención con otros servicios que puedan compartir la misma zanja" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la simbología en un plano de red de agua?", explicacion: "El conjunto de signos convencionales que representan los elementos de la red.", dificultad: "facil", opciones: ["El conjunto de signos convencionales que representan los elementos de la red", "Exclusivamente el título y la fecha de redacción del plano", "Exclusivamente el nombre del técnico que redactó el plano", "El listado de precios de los materiales representados en el plano"], correcta: 0 },
  { enunciado: "¿Qué información suele indicar el trazado de una tubería en un plano de red?", explicacion: "Diámetro, material y, habitualmente, cota o profundidad.", dificultad: "media", opciones: ["Su diámetro, material y cota o profundidad", "Exclusivamente su color exterior", "Exclusivamente el nombre del fabricante de la tubería", "Exclusivamente la fecha de fabricación de la tubería"], correcta: 0 },
  { enunciado: "En una escala 1:1.000, ¿a cuántos metros reales equivale un centímetro del plano?", explicacion: "Un centímetro equivale a 1.000 cm, es decir, 10 metros.", dificultad: "media", opciones: ["10 metros", "1 metro", "100 metros", "1.000 metros"], correcta: 0 },
  { enunciado: "¿Qué muestra un perfil longitudinal de una conducción?", explicacion: "La profundidad, las pendientes y la posición respecto a otros servicios que cruza.", dificultad: "dificil", opciones: ["La profundidad, las pendientes y los cruces con otros servicios", "Únicamente el color exterior de la tubería representada", "Únicamente el precio total de la conducción representada", "Únicamente el nombre de la calle en la que se sitúa la conducción"], correcta: 0 },
  { enunciado: "¿Por qué es importante para un guardallaves interpretar correctamente un plano antes de intervenir en la red?", explicacion: "Permite localizar con precisión el elemento y evitar errores de maniobra.", dificultad: "media", opciones: ["Permite localizar con precisión el elemento y evitar errores de maniobra", "No aporta ninguna utilidad real si se conoce bien la zona de memoria", "Solo es relevante si el guardallaves va a redactar un proyecto nuevo", "Solo es relevante en zonas de reciente urbanización, no en el resto de la red"], correcta: 0 },
]);

const S2 = "planos-proyecto-planos-especificos-guardallaves";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un plano de proyecto de una red de abastecimiento?", reverso: "El documento técnico que define una instalación nueva o una reforma de la red antes de su ejecución, con el trazado, los materiales, las secciones y los cálculos que la justifican" },
  { anverso: "¿Qué es un plano específico de guardallaves?", reverso: "Un plano operativo, de uso interno del Servicio de Explotación de Redes, orientado a la localización rápida de válvulas, sus maniobras asociadas y los sectores que aíslan, más que a la documentación completa de una obra" },
  { anverso: "¿Qué diferencia principal existe entre un plano de proyecto y un plano específico de guardallaves?", reverso: "El plano de proyecto documenta cómo se construye o modifica una instalación; el plano específico de guardallaves documenta cómo se opera y mantiene esa instalación una vez construida, priorizando la información útil para maniobras" },
  { anverso: "¿Qué es un plano \"as built\" o \"de obra ejecutada\"?", reverso: "El plano que recoge la instalación tal y como quedó realmente construida, incorporando las modificaciones surgidas durante la ejecución respecto al proyecto original, y que sirve de base para los planos de explotación posteriores" },
  { anverso: "¿Por qué es importante mantener actualizados los planos específicos de guardallaves ante cualquier modificación de la red?", reverso: "Porque un plano desactualizado puede llevar a maniobrar una válvula equivocada, dejar sin servicio a una zona no prevista, o retrasar la localización de una avería o de un corte necesario" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un plano de proyecto de una red de abastecimiento?", explicacion: "El documento técnico que define una instalación nueva o una reforma antes de su ejecución.", dificultad: "facil", opciones: ["El documento que define una instalación nueva antes de su ejecución", "El documento exclusivo para la facturación del consumo de agua", "El documento exclusivo para la tramitación de altas de suministro", "El documento que recoge únicamente el histórico de averías de la red"], correcta: 0 },
  { enunciado: "¿Para qué está orientado principalmente un plano específico de guardallaves?", explicacion: "Para la localización rápida de válvulas y sus maniobras asociadas.", dificultad: "media", opciones: ["Para la localización rápida de válvulas y sus maniobras", "Para el cálculo estructural de los depósitos de la red", "Para la facturación del consumo de los abonados", "Para el diseño arquitectónico de las instalaciones municipales"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre un plano de proyecto y un plano específico de guardallaves?", explicacion: "Uno documenta la construcción; el otro, la operación y el mantenimiento.", dificultad: "media", opciones: ["Uno documenta la construcción; el otro, la operación y el mantenimiento", "Ninguna diferencia real entre ambos tipos de plano", "El plano específico de guardallaves siempre sustituye al de proyecto", "El plano de proyecto solo existe para las redes de saneamiento"], correcta: 0 },
  { enunciado: "¿Qué es un plano \"as built\" o \"de obra ejecutada\"?", explicacion: "El plano que recoge la instalación tal y como quedó realmente construida.", dificultad: "dificil", opciones: ["El plano que recoge la instalación tal y como quedó construida", "El plano inicial de proyecto, sin ninguna modificación posterior", "El plano exclusivo de facturación del consumo de agua", "El plano exclusivo para la tramitación de licencias de obra"], correcta: 0 },
  { enunciado: "¿Por qué es importante mantener actualizados los planos específicos de guardallaves?", explicacion: "Un plano desactualizado puede llevar a maniobrar la válvula equivocada.", dificultad: "media", opciones: ["Un plano desactualizado puede llevar a maniobrar la válvula equivocada", "No tiene ninguna importancia real si el guardallaves conoce bien la zona", "Solo es relevante en las zonas de reciente urbanización de la ciudad", "Solo es relevante para el personal de nueva incorporación al servicio"], correcta: 0 },
]);

const S3 = "sistema-informacion-geografica-idezar";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un Sistema de Información Geográfica (SIG)?", reverso: "Un sistema que permite capturar, almacenar, consultar y analizar información asociada a una localización geográfica concreta, superponiendo distintas capas de datos (por ejemplo, calles, edificios y redes de servicios) sobre una base cartográfica común" },
  { anverso: "¿Qué es IDEZar?", reverso: "La Infraestructura de Datos Espaciales de Zaragoza, en marcha desde 2004, que facilita el acceso a la información geográfica del municipio (incluidas infraestructuras) localizándola sobre un mapa, como nodo local de la iniciativa europea INSPIRE" },
  { anverso: "¿Qué es INSPIRE, y qué relación tiene con IDEZar?", reverso: "INSPIRE es la iniciativa europea (\"Infrastructure for Spatial Information in Europe\") que promueve infraestructuras de datos espaciales interoperables entre administraciones; IDEZar constituye el nodo local de esa iniciativa en el Ayuntamiento de Zaragoza" },
  { anverso: "¿Qué ventaja aporta un SIG frente a un plano en papel tradicional a la hora de gestionar la red de abastecimiento?", reverso: "Permite consultar y cruzar distintas capas de información (redes, catastro, otros servicios urbanos) de forma dinámica, actualizar los datos de forma centralizada y localizar elementos de la red mediante búsquedas, en lugar de depender de un único plano físico" },
  { anverso: "¿Qué papel cumple la interoperabilidad de estándares dentro de una Infraestructura de Datos Espaciales como IDEZar?", reverso: "Permite que la información geográfica generada por distintos servicios municipales (como el de Explotación de Redes) se pueda compartir, consultar y reutilizar de forma coherente con otros sistemas, tanto internos como de otras administraciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un Sistema de Información Geográfica (SIG)?", explicacion: "Un sistema que permite capturar, almacenar y analizar información asociada a una localización.", dificultad: "facil", opciones: ["Un sistema que gestiona información asociada a una localización geográfica", "Un sistema exclusivo para la facturación del consumo de agua", "Un sistema exclusivo para el cálculo estructural de depósitos", "Un sistema exclusivo para la gestión de personal municipal"], correcta: 0 },
  { enunciado: "¿Qué es IDEZar?", explicacion: "La Infraestructura de Datos Espaciales de Zaragoza, en marcha desde 2004.", dificultad: "media", opciones: ["La Infraestructura de Datos Espaciales de Zaragoza", "Un procedimiento exclusivo de facturación municipal del agua", "Una ordenanza municipal sobre el uso del dominio público", "Un tipo específico de válvula empleado en la red de abastecimiento"], correcta: 0 },
  { enunciado: "¿Qué es INSPIRE respecto a IDEZar?", explicacion: "La iniciativa europea de la que IDEZar es nodo local.", dificultad: "dificil", opciones: ["La iniciativa europea de la que IDEZar es nodo local", "El nombre comercial del programa informático de IDEZar", "Un organismo exclusivamente español sin relación europea", "El antecesor directo de IDEZar, ya sustituido por completo"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un SIG frente a un plano en papel tradicional?", explicacion: "Permite cruzar capas de información y actualizar los datos de forma centralizada.", dificultad: "media", opciones: ["Permite cruzar capas de información y actualizarlas de forma centralizada", "Elimina por completo la necesidad de cualquier trabajo de campo", "Sustituye por completo la necesidad de mantenimiento de válvulas", "Solo resulta útil para la gestión del arbolado urbano de la ciudad"], correcta: 0 },
  { enunciado: "¿Qué papel cumple la interoperabilidad de estándares en una infraestructura como IDEZar?", explicacion: "Permite compartir y reutilizar la información entre distintos servicios y administraciones.", dificultad: "dificil", opciones: ["Permite compartir y reutilizar la información entre servicios y administraciones", "No tiene ninguna relevancia práctica para el Servicio de Explotación de Redes", "Obliga a que toda la información se gestione en un único servicio municipal", "Solo afecta a la información sobre el arbolado urbano de la ciudad"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-188 creado y vinculado como Tema 8 de Oficial Guardallaves.");
