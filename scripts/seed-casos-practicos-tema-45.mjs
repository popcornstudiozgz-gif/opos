/**
 * Casos prácticos — tema-45 (Conceptos fundamentales de albañilería:
 * materiales y herramientas). 3 casos de 10 preguntas cada uno:
 *   1. La dosificación del mortero en la obra de Torrero (conglomerantes,
 *      áridos y morteros)
 *   2. Elección de fábrica para un cerramiento en Valdespartera (materiales
 *      cerámicos, bloques y piezas)
 *   3. La caja de herramientas del oficial (herramientas manuales y
 *      máquinas básicas)
 *
 * Reutiliza las secciones ya usadas por las flashcards/preguntas sueltas
 * del tema (conglomerantes-aridos-morteros, materiales-ceramicos-
 * bloques-piezas, herramientas-manuales-maquinas-albanil). Misma
 * mecánica que scripts/seed-casos-practicos-tema-15.mjs: la primera
 * opción de cada pregunta es siempre la correcta.
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-45.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-45";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: TEMA, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();

    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }

    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${titulo} (${preguntas.length} preguntas)`);
}

// CASO 1 — La dosificación del mortero en la obra de Torrero
const CASO_1 = {
  slug: "caso-dosificacion-mortero-obra-torrero",
  titulo: "La dosificación del mortero en la obra de Torrero",
  orden: 1,
  supuesto:
    "En una obra de rehabilitación en el barrio de Torrero, el oficial de albañilería debe preparar mortero " +
    "para asentar una fábrica de ladrillo, enfoscar un paramento exterior expuesto a la lluvia, y reparar unas " +
    "juntas de una fachada de piedra antigua. El encargado le pide que elija en cada caso el conglomerante y la " +
    "dosificación adecuados, y que revise el estado de los áridos almacenados antes de amasar.",
  preguntas: [
    q("conglomerantes-aridos-morteros", "facil", "¿Qué conglomerante se emplea habitualmente para asentar la fábrica de ladrillo de la obra?", ["El cemento, por su rapidez de fraguado y resistencia", "El yeso, por su bajo coste", "La cal aérea exclusivamente, sin mezclar con cemento", "Ningún conglomerante, solo agua y arena"], "El cemento es el conglomerante habitual para morteros de asiento de fábrica por su resistencia y fraguado adecuado a obra."),
    q("conglomerantes-aridos-morteros", "media", "¿Por qué no sería adecuado usar yeso puro para enfoscar el paramento exterior expuesto a la lluvia?", ["Porque el yeso no resiste bien la humedad ni la intemperie", "Porque el yeso fragua demasiado despacio para exteriores", "Porque el yeso es más caro que el cemento", "Porque el yeso no admite mezcla con agua"], "El yeso se limita a usos de interior porque no resiste bien la humedad ni la intemperie."),
    q("conglomerantes-aridos-morteros", "media", "Para reparar las juntas de la fachada de piedra antigua, ¿qué conglomerante es más recomendable frente al cemento?", ["La cal, por ser más flexible y compatible con la fábrica antigua", "El cemento, porque siempre es más resistente", "El yeso, por su rapidez de fraguado", "No es necesario ningún conglomerante, basta con agua"], "La cal es más flexible y transpirable que el cemento, evitando tensiones incompatibles con fábricas antiguas."),
    q("conglomerantes-aridos-morteros", "facil", "¿Qué es un árido en la mezcla del mortero?", ["Un material granular (arena, gravilla) que se mezcla con el conglomerante y el agua", "Un tipo de conglomerante hidráulico", "Un aditivo acelerante de fraguado", "Un tipo de ladrillo cerámico"], "El árido es el material granular, clasificado en fino (arena) y grueso (grava), que se mezcla con el conglomerante y el agua."),
    q("conglomerantes-aridos-morteros", "media", "El encargado revisa que la arena almacenada esté limpia y sin exceso de finos. ¿Por qué es importante esto para el mortero?", ["Porque impurezas o exceso de finos reducen la resistencia y trabajabilidad del mortero", "Porque la arena sucia cambia el color del mortero, sin afectar a la resistencia", "No influye en la calidad del mortero", "Porque la arena sucia acelera el fraguado del cemento"], "Un árido limpio y bien graduado es clave para la resistencia y trabajabilidad de la mezcla."),
    q("conglomerantes-aridos-morteros", "dificil", "¿Qué diferencia fundamental existe entre el mortero que se usará para asentar el ladrillo y el hormigón que podría necesitarse para una zapata cercana?", ["El hormigón incorpora árido grueso además del fino, aportando mayor resistencia estructural", "El mortero siempre lleva más cemento que el hormigón", "No hay ninguna diferencia real entre ambos", "El hormigón no lleva agua en su composición"], "El hormigón añade árido grueso (grava) al árido fino, dándole mayor resistencia estructural que el mortero."),
    q("conglomerantes-aridos-morteros", "media", "Si se necesitara mejorar la trabajabilidad del mortero de enfoscado sin cambiar su dosificación básica, ¿qué se podría añadir?", ["Un aditivo plastificante", "Más agua sin límite", "Cal viva sin apagar", "Arena de mayor tamaño de grano"], "Un aditivo plastificante mejora la trabajabilidad de la mezcla sin necesidad de añadir agua en exceso, que perjudicaría la resistencia."),
    q("conglomerantes-aridos-morteros", "facil", "¿Qué dosificación aproximada de mortero cemento:arena es habitual para el asiento de fábrica de ladrillo?", ["En torno a 1:4 o 1:6", "Siempre 1:1", "Siempre 10:1", "No existe una dosificación de referencia habitual"], "Una dosificación en torno a 1:4 o 1:6 (cemento:arena) es habitual según la resistencia y uso requeridos."),
    q("conglomerantes-aridos-morteros", "media", "¿Qué tipo de conglomerante fragua por carbonatación, reaccionando lentamente con el CO2 del aire?", ["La cal aérea", "El cemento Portland", "El yeso", "Ninguno de los conglomerantes fragua así"], "La cal aérea fragua por carbonatación, un proceso mucho más lento que el fraguado hidráulico del cemento."),
    q("conglomerantes-aridos-morteros", "dificil", "¿Qué certificado de profesionalidad regula, entre otros, el módulo de materiales de albañilería empleados en esta obra?", ["EOCB0108, Fábricas de Albañilería", "EOCB0210, Revestimientos con pastas y morteros", "Ninguno, no existe certificado de profesionalidad para este oficio", "Un certificado de instalaciones eléctricas"], "El certificado EOCB0108 'Fábricas de Albañilería', establecido por el RD 1212/2009, regula entre otros el módulo de pastas, morteros y hormigones."),
  ],
};

// CASO 2 — Elección de fábrica para un cerramiento en Valdespartera
const CASO_2 = {
  slug: "caso-eleccion-fabrica-cerramiento-valdespartera",
  titulo: "Elección de fábrica para un cerramiento en Valdespartera",
  orden: 2,
  supuesto:
    "En una promoción de nueva construcción en Valdespartera, el oficial debe levantar un muro de cerramiento " +
    "exterior con hoja principal resistente, un tabique interior ligero, y reponer un tramo de forjado con " +
    "bovedillas dañadas. El arquitecto ha especificado además que la fachada exterior debe quedar vista, sin " +
    "revestimiento posterior, por lo que la elección de la pieza cerámica es especialmente relevante.",
  preguntas: [
    q("materiales-ceramicos-bloques-piezas", "media", "Para la hoja principal resistente del cerramiento, ¿qué tipo de ladrillo cerámico ofrece mayor resistencia?", ["El ladrillo macizo o perforado, con menos del 10% de perforación en cara", "El ladrillo hueco sencillo, por ser más ligero", "El ladrillo hueco doble, por ser más barato", "Cualquier ladrillo tiene la misma resistencia estructural"], "El ladrillo macizo o perforado (perforaciones <10% de la cara) ofrece mayor resistencia, apto para fábricas estructurales o de cara vista."),
    q("materiales-ceramicos-bloques-piezas", "facil", "¿Qué tipo de ladrillo es más adecuado para el tabique interior ligero, no resistente?", ["El ladrillo hueco (sencillo, doble o triple)", "El ladrillo macizo", "El ladrillo perforado", "El bloque de hormigón pesado"], "El ladrillo hueco, más ligero y de menor resistencia, es el habitual en tabiquería y hojas no resistentes."),
    q("materiales-ceramicos-bloques-piezas", "media", "Dado que la fachada exterior debe quedar vista sin revestimiento, ¿qué aspecto adicional debe cuidarse en la elección del ladrillo?", ["El acabado superficial y la regularidad de color y textura de las piezas", "Únicamente el precio de la pieza", "Únicamente que sea ladrillo hueco triple", "No es necesario ningún cuidado especial en cara vista"], "En fábrica de cara vista es clave la regularidad estética (color, textura, dimensiones) además de la resistencia."),
    q("materiales-ceramicos-bloques-piezas", "facil", "¿Cómo se llama la colocación del ladrillo mostrando su lado largo, habitual en un muro de cara vista?", ["A soga", "A tizón", "A panderete", "A rosca"], "A soga se muestra el lado largo del ladrillo; a tizón el lado corto (testa) y a panderete de canto."),
    q("materiales-ceramicos-bloques-piezas", "media", "Para reponer el tramo de forjado dañado, ¿qué pieza se coloca entre las viguetas para completar el entrevigado?", ["La bovedilla", "El bloque de hormigón macizo", "El sillarejo", "El ladrillo perforado"], "La bovedilla, cerámica o de hormigón, se coloca entre viguetas de forjado para completar el entrevigado."),
    q("materiales-ceramicos-bloques-piezas", "dificil", "Si en lugar de ladrillo se optara por bloque de hormigón para la hoja resistente, ¿qué ventaja aportaría un bloque de árido ligero frente a uno convencional?", ["Mejora el aislamiento térmico y reduce el peso propio del muro", "Aumenta siempre la resistencia estructural por encima del ladrillo macizo", "Elimina la necesidad de mortero de agarre", "Solo se fabrica en formato hueco triple"], "El bloque de árido ligero mejora el aislamiento térmico y reduce peso, manteniendo capacidad portante adecuada para cerramientos."),
    q("materiales-ceramicos-bloques-piezas", "facil", "¿Qué formato aproximado tiene el ladrillo cerámico normalizado más habitual en España?", ["24-25 x 11-12 x 5 cm aproximadamente", "50 x 25 x 25 cm", "10 x 10 x 10 cm", "No existe un formato normalizado"], "El formato 'métrico' o 'catalán', en torno a 24-25 x 11-12 x 5 cm, es el más habitual, aunque hay variantes regionales."),
    q("materiales-ceramicos-bloques-piezas", "media", "¿Qué distingue a la mampostería de la fábrica de ladrillo, en caso de que apareciera algún muro de piedra en la obra?", ["Se ejecuta con piedra natural sin labrar o con labra parcial, tomada con mortero", "Se ejecuta siempre con ladrillo hueco triple", "No lleva ningún tipo de mortero de agarre", "Es un sinónimo exacto de fábrica de bloque de hormigón"], "La mampostería es fábrica de piedra natural sin labrar o con labra parcial, tomada con mortero."),
    q("materiales-ceramicos-bloques-piezas", "dificil", "¿Qué distingue al sillarejo, si se empleara en algún elemento singular de la fachada, dentro de la mampostería?", ["Tiene las caras vistas escuadradas y labradas, aunque con menor precisión que un sillar", "Es siempre de menor tamaño que un ladrillo cerámico", "Se fabrica exclusivamente con hormigón prefabricado", "No admite mortero de agarre en su colocación"], "El sillarejo tiene caras vistas escuadradas y labradas, con menor precisión que un sillar propiamente dicho."),
    q("materiales-ceramicos-bloques-piezas", "media", "¿Por qué es importante que el material de fachada vista sea homogéneo entre distintos palés recibidos en obra?", ["Para evitar diferencias visibles de tono o textura entre distintas partidas de fabricación", "Porque afecta a la resistencia estructural del muro de forma decisiva", "Porque cada palé tiene un certificado de profesionalidad distinto", "No tiene ninguna relevancia práctica en obra"], "Distintas partidas de fabricación pueden variar ligeramente de tono; conviene mezclarlas o verificarlas para evitar parches visibles en cara vista."),
  ],
};

// CASO 3 — La caja de herramientas del oficial
const CASO_3 = {
  slug: "caso-caja-herramientas-oficial-albanil",
  titulo: "La caja de herramientas del oficial",
  orden: 3,
  supuesto:
    "Antes de empezar la jornada, el oficial prepara sus herramientas para tres tareas distintas: levantar una " +
    "hilada de bloque comprobando su verticalidad y horizontalidad, alicatar un paramento de baño con piezas " +
    "cerámicas, y amasar mortero para una pequeña reparación puntual sin disponer de hormigonera eléctrica en " +
    "ese punto de la obra.",
  preguntas: [
    q("herramientas-manuales-maquinas-albanil", "facil", "¿Qué herramienta usa el oficial para coger, extender y repartir el mortero al levantar la hilada?", ["La paleta o llana de albañil", "La plomada", "El nivel de burbuja", "La maza de goma"], "La paleta o llana se usa para coger, extender y repartir el mortero al asentar piezas o enfoscar."),
    q("herramientas-manuales-maquinas-albanil", "facil", "¿Con qué herramienta comprueba el oficial la verticalidad del muro de bloque?", ["La plomada", "La llana dentada", "El cordel de replanteo", "La rasqueta"], "La plomada, mediante un peso suspendido de un hilo, permite comprobar la verticalidad de un paramento."),
    q("herramientas-manuales-maquinas-albanil", "media", "¿Qué herramienta usa para comprobar la horizontalidad de la hilada de bloque?", ["El nivel de burbuja", "La plomada exclusivamente", "El cincel", "La maceta"], "El nivel de burbuja permite comprobar la horizontalidad (y con nivel vertical, también la verticalidad) de una hilada."),
    q("herramientas-manuales-maquinas-albanil", "media", "Para alinear la hilada de bloque con precisión a lo largo de todo el muro, ¿qué elemento tensa entre dos miras o reglas?", ["El cordel o hilo de replanteo", "La llana dentada", "La rasqueta", "La maza de goma"], "El cordel de replanteo, tensado entre dos miras, permite alinear las hiladas durante la ejecución de la fábrica."),
    q("herramientas-manuales-maquinas-albanil", "facil", "Para alicatar el paramento del baño, ¿con qué herramienta extiende el adhesivo de forma uniforme?", ["La llana dentada", "La paleta plana", "La plomada", "El cincel"], "La llana dentada extiende adhesivos o morteros cola con espesor uniforme mediante sus dientes, mejorando la adherencia del alicatado."),
    q("herramientas-manuales-maquinas-albanil", "media", "¿Qué herramienta emplea para asentar y ajustar las piezas de bloque sin dañar su superficie?", ["La maza de goma", "El cincel y la maceta", "La rasqueta", "El nivel de burbuja"], "La maza de goma permite golpear y ajustar piezas de fábrica sin desportillar su superficie."),
    q("herramientas-manuales-maquinas-albanil", "media", "Si necesita hacer una pequeña roza en un bloque ya colocado, ¿qué herramientas manuales emplea?", ["El cincel y la maceta", "La llana dentada", "El cordel de replanteo", "La plomada"], "El cincel y la maceta se usan para cortar, labrar o hacer rozas en piezas de fábrica o paramentos."),
    q("herramientas-manuales-maquinas-albanil", "facil", "Tras rejuntar el alicatado, ¿qué herramienta usa para limpiar los restos de mortero sobrantes?", ["La rasqueta", "El cordel de replanteo", "La maza de goma", "El nivel de burbuja"], "La rasqueta se emplea para limpiar restos de mortero, rejuntar o retirar rebabas en juntas y paramentos."),
    q("herramientas-manuales-maquinas-albanil", "dificil", "Sin hormigonera eléctrica en ese punto de la obra, ¿qué ventaja pierde el oficial al amasar el mortero de la reparación puntual a mano?", ["Pierde la homogeneidad y rapidez que aporta el mezclado mecánico", "No hay ninguna diferencia entre amasar a mano o con hormigonera", "El amasado a mano siempre da mayor resistencia final", "El amasado a mano elimina la necesidad de agua en la mezcla"], "La hormigonera logra una mezcla más homogénea y rápida que el amasado manual, aunque este último sigue siendo válido para pequeñas cantidades."),
    q("herramientas-manuales-maquinas-albanil", "media", "¿Qué herramienta larga y recta permite comprobar la planeidad del paramento antes de dar por buena la hilada?", ["La regla de albañil", "La llana dentada", "El cincel", "La rasqueta"], "La regla de albañil, larga y recta, sirve para comprobar la planeidad de un paramento o enrasar superficies."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema-45 (materiales y herramientas de albañilería) sembrados.");
