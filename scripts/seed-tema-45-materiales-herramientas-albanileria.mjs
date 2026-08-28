/**
 * Crea el tema canónico tema-45: "Conceptos fundamentales de albañilería.
 * Tipos de materiales. Herramientas" y lo asigna como Tema 7 (primer tema
 * de la parte específica, numero=7, bloque-2) de la oposición Oficial
 * Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf):
 *   "Conceptos fundamentales de albañilería. Tipos de materiales.
 *   Herramientas."
 *
 * Fuente primaria: Real Decreto 1212/2009, de 17 de julio, por el que se
 * establecen tres certificados de profesionalidad de la familia
 * profesional Edificación y Obra Civil (BOE-A-2009-13743) — Anexo I:
 * certificado EOCB0108 "Fábricas de Albañilería" (mismo certificado de
 * profesionalidad que exigen las bases como requisito de titulación).
 * Verificado en este turno: el Anexo I incluye MF0869_1 "Pastas,
 * morteros, adhesivos y hormigones" (conglomerantes: cal, yeso y cemento;
 * hormigones) y MF0142_1/MF0143_2 "Obras de fábrica" (fábricas de ladrillo
 * y bloque). El contenido de materiales y herramientas de albañilería es
 * conocimiento técnico consolidado del oficio (formatos de ladrillo,
 * tipos de mortero, herramientas manuales); no requiere cita artículo a
 * artículo como el contenido jurídico.
 *
 * Tres secciones:
 * 1. conglomerantes-aridos-morteros — cemento, cal, yeso, áridos,
 *    morteros y hormigón.
 * 2. materiales-ceramicos-bloques-piezas — ladrillos cerámicos, bloques
 *    de hormigón, piezas especiales y mampostería.
 * 3. herramientas-manuales-maquinas-albanil — herramientas manuales y
 *    máquinas básicas del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-45-materiales-herramientas-albanileria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-45";
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

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Conceptos fundamentales de albañilería: materiales y herramientas",
    descripcion: "Conceptos fundamentales de albañilería. Tipos de materiales. Herramientas.",
    contenido:
      "Desarrolla los materiales básicos del oficio de albañilería (conglomerantes como cemento, cal y yeso; áridos, morteros y hormigón), los materiales de fábrica (ladrillos cerámicos, bloques de hormigón, piezas especiales y mampostería) y las herramientas manuales y máquinas básicas empleadas en el oficio.",
    enlaces_boe: [
      { url: RD_1212_2009, titulo: "RD 1212/2009 — Certificado de profesionalidad EOCB0108, Fábricas de Albañilería" },
    ],
    indice_estudio: [
      { url: RD_1212_2009, titulo: "Conglomerantes, áridos, morteros y hormigón", seccion: "conglomerantes-aridos-morteros", articulos: "MF0869_1, Pastas, morteros, adhesivos y hormigones" },
      { url: RD_1212_2009, titulo: "Materiales cerámicos, bloques de hormigón, piezas especiales y mampostería", seccion: "materiales-ceramicos-bloques-piezas", articulos: "MF0142_1 / MF0143_2, Obras de fábrica" },
      { url: "", titulo: "Herramientas manuales y máquinas básicas del oficio", seccion: "herramientas-manuales-maquinas-albanil", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: conglomerantes-aridos-morteros
// ─────────────────────────────────────────────────────────────────────────
const S1 = "conglomerantes-aridos-morteros";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un conglomerante en construcción?", reverso: "Un material que, mezclado con agua, fragua y endurece, permitiendo unir o aglomerar otros materiales (áridos, piezas de fábrica); los principales son el cemento, la cal y el yeso" },
    { anverso: "¿Qué es el cemento Portland?", reverso: "Un conglomerante hidráulico obtenido por cocción de caliza y arcilla y posterior molienda con yeso; fragua y endurece tanto al aire como bajo el agua, y es la base de morteros y hormigones" },
    { anverso: "¿Qué diferencia hay entre un conglomerante aéreo y uno hidráulico?", reverso: "El aéreo (como la cal aérea o el yeso) solo fragua y endurece en contacto con el aire; el hidráulico (como el cemento o la cal hidráulica) fragua y endurece también bajo el agua" },
    { anverso: "¿Cómo fragua la cal aérea?", reverso: "Por carbonatación: reacciona lentamente con el CO2 del aire, por lo que su fraguado es mucho más lento que el del cemento" },
    { anverso: "¿Cuál es la principal limitación de uso del yeso como conglomerante?", reverso: "No resiste bien la humedad ni la intemperie, por lo que su uso se limita a interiores (guarnecidos, enlucidos, tabiquería)" },
    { anverso: "¿Qué es un árido en la fabricación de morteros y hormigones?", reverso: "Un material granular (arena, gravilla, grava) que se mezcla con el conglomerante y el agua; se clasifica en fino (arena, menor de 4 mm) y grueso (grava, mayor de 4 mm)" },
    { anverso: "¿Qué es un mortero?", reverso: "La mezcla de uno o varios conglomerantes, árido fino (arena), agua y, en su caso, aditivos, usada para asentar piezas de fábrica, enfoscar o revocar paramentos" },
    { anverso: "¿En qué se diferencia el mortero del hormigón?", reverso: "El mortero solo lleva árido fino (arena); el hormigón incorpora además árido grueso (grava o gravilla), lo que le da mayor resistencia mecánica para usos estructurales" },
    { anverso: "Cita tres funciones típicas de un aditivo para morteros u hormigones", reverso: "Plastificante (mejora la trabajabilidad), acelerante o retardante de fraguado, e impermeabilizante" },
    { anverso: "¿Qué dosificación de mortero es habitual para asiento de fábrica de ladrillo?", reverso: "En torno a 1:4 o 1:6 (una parte de cemento por cuatro o seis de arena), según la resistencia y el uso requeridos" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son los tres conglomerantes básicos empleados en albañilería?", explicacion: "Cemento, cal y yeso son los tres conglomerantes fundamentales del oficio.", dificultad: "facil", opciones: ["Cemento, cal y yeso", "Cemento, arena y grava", "Cal, arena y agua", "Yeso, grava y agua"], correcta: 0 },
  { enunciado: "¿Qué característica define a un conglomerante hidráulico como el cemento Portland?", explicacion: "Fragua y endurece tanto al aire como bajo el agua.", dificultad: "media", opciones: ["Fragua y endurece también bajo el agua", "Solo fragua en contacto con el aire", "No admite mezcla con agua", "Se usa exclusivamente en interiores"], correcta: 0 },
  { enunciado: "¿Cómo fragua la cal aérea?", explicacion: "Por carbonatación, reaccionando lentamente con el CO2 del aire.", dificultad: "media", opciones: ["Por carbonatación con el CO2 del aire", "Por hidratación instantánea", "Por reacción exclusivamente bajo el agua", "No fragua, solo se seca"], correcta: 0 },
  { enunciado: "¿Por qué el yeso no se emplea habitualmente en exteriores?", explicacion: "Porque no resiste bien la humedad ni la intemperie.", dificultad: "facil", opciones: ["Porque no resiste bien la humedad", "Porque es más caro que el cemento", "Porque tarda demasiado en fraguar", "Porque no admite ningún tipo de acabado"], correcta: 0 },
  { enunciado: "¿Cómo se clasifican los áridos según su tamaño?", explicacion: "En finos (arena, menores de 4 mm) y gruesos (grava/gravilla, mayores de 4 mm).", dificultad: "media", opciones: ["Finos y gruesos", "Naturales y artificiales", "Calcáreos y silíceos", "Redondeados y angulosos"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental hay entre mortero y hormigón?", explicacion: "El hormigón incorpora árido grueso además del fino, lo que le da mayor resistencia estructural.", dificultad: "media", opciones: ["El hormigón lleva árido grueso además del fino", "El mortero lleva árido grueso y el hormigón no", "El hormigón no lleva conglomerante", "No hay diferencia, son sinónimos"], correcta: 0 },
  { enunciado: "¿Qué función cumple un aditivo plastificante en un mortero?", explicacion: "Mejora la trabajabilidad de la mezcla.", dificultad: "media", opciones: ["Mejora la trabajabilidad de la mezcla", "Acelera siempre el fraguado", "Impermeabiliza siempre la mezcla", "Sustituye al árido fino"], correcta: 0 },
  { enunciado: "¿Qué certificado de profesionalidad regula, entre otros, el módulo de materiales de albañilería (pastas, morteros, adhesivos y hormigones)?", explicacion: "El certificado EOCB0108 'Fábricas de Albañilería', establecido por el RD 1212/2009.", dificultad: "dificil", opciones: ["EOCB0108, Fábricas de Albañilería", "EOCB0210, Revestimientos con pastas y morteros", "EOCB0211, Impermeabilización", "EOCB0108, Instalaciones eléctricas"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: materiales-ceramicos-bloques-piezas
// ─────────────────────────────────────────────────────────────────────────
const S2 = "materiales-ceramicos-bloques-piezas";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un ladrillo cerámico macizo?", reverso: "Una pieza de arcilla cocida sin perforaciones (o con perforaciones que no superan el 10 % de su cara), apta para fábricas vistas o estructurales por su mayor resistencia" },
    { anverso: "¿Qué es un ladrillo perforado?", reverso: "Un ladrillo cerámico con perforaciones perpendiculares a la tabla, de sección total inferior a la de un ladrillo hueco, usado en fábricas resistentes y de cara vista" },
    { anverso: "¿Qué es un ladrillo hueco (sencillo, doble o triple)?", reverso: "Un ladrillo cerámico aligerado, con perforaciones paralelas a la cara mayor, de menor resistencia y peso; se usa principalmente en tabiquería y hojas no resistentes" },
    { anverso: "¿Qué es el 'asta' o 'pie' de un ladrillo en el aparejo?", reverso: "Las formas de colocación del ladrillo según la cara vista: a soga (mostrando el lado largo), a tizón (mostrando el lado corto o testa) y a panderete (de canto)" },
    { anverso: "¿Qué es un bloque de hormigón?", reverso: "Una pieza prefabricada de hormigón, de mayor tamaño que el ladrillo cerámico, hueca o maciza, empleada en cerramientos y muros de carga; existen variantes de árido normal, ligero o aislante" },
    { anverso: "¿Qué es una bovedilla?", reverso: "Una pieza cerámica o de hormigón, hueca y aligerada, que se coloca entre las viguetas de un forjado para completar el entrevigado" },
    { anverso: "¿Qué es la mampostería?", reverso: "La fábrica construida con piedra natural sin labrar o con labra parcial, tomada con mortero; puede ser ordinaria (piedras irregulares), careada o concertada (piedras con caras más regulares)" },
    { anverso: "¿Qué es el sillarejo?", reverso: "Una piedra de mampostería con las caras vistas escuadradas y labradas, aunque de menor tamaño y precisión que el sillar propiamente dicho" },
    { anverso: "¿Qué formato aproximado tiene el ladrillo cerámico normalizado en España?", reverso: "24-25 x 11-12 x 5 cm aproximadamente (formato 'métrico' o 'catalán'), aunque existen otros formatos según la zona y el fabricante" },
    { anverso: "¿Qué ventaja aporta el bloque de hormigón aligerado (con árido ligero) frente al convencional?", reverso: "Mejora el aislamiento térmico y reduce el peso propio del muro, manteniendo capacidad portante para cerramientos y particiones" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué caracteriza a un ladrillo cerámico macizo?", explicacion: "No tiene perforaciones, o estas no superan el 10 % de su cara, lo que le da mayor resistencia.", dificultad: "media", opciones: ["No tiene perforaciones o son inferiores al 10 % de su cara", "Tiene perforaciones que ocupan más del 50 % de su cara", "Está fabricado exclusivamente con hormigón", "Solo se usa en tabiquería interior"], correcta: 0 },
  { enunciado: "¿Para qué uso es más adecuado el ladrillo hueco?", explicacion: "Por su menor resistencia y peso, se usa sobre todo en tabiquería y hojas no resistentes.", dificultad: "media", opciones: ["Tabiquería y hojas no resistentes", "Cimentaciones", "Muros de carga en fachadas pesadas", "Soleras de hormigón"], correcta: 0 },
  { enunciado: "¿Cómo se llama la colocación del ladrillo mostrando su lado largo?", explicacion: "A soga; a tizón se muestra el lado corto (testa), y a panderete de canto.", dificultad: "media", opciones: ["A soga", "A tizón", "A panderete", "A rosca"], correcta: 0 },
  { enunciado: "¿Qué es un bloque de hormigón?", explicacion: "Una pieza prefabricada de hormigón, de mayor tamaño que el ladrillo cerámico, para cerramientos y muros de carga.", dificultad: "facil", opciones: ["Una pieza prefabricada de hormigón mayor que el ladrillo cerámico", "Una pieza cerámica cocida a baja temperatura", "Un tipo de mortero endurecido", "Una pieza exclusiva para forjados"], correcta: 0 },
  { enunciado: "¿Para qué se emplea una bovedilla?", explicacion: "Se coloca entre las viguetas de un forjado para completar el entrevigado.", dificultad: "media", opciones: ["Para completar el entrevigado entre viguetas de forjado", "Para rejuntar fábricas de ladrillo", "Como pieza de arranque de una escalera", "Como remate de cornisas"], correcta: 0 },
  { enunciado: "¿Qué es la mampostería?", explicacion: "Fábrica de piedra natural sin labrar o con labra parcial, tomada con mortero.", dificultad: "facil", opciones: ["Fábrica de piedra natural sin labrar o con labra parcial", "Fábrica exclusiva de ladrillo hueco", "Un tipo de hormigón armado", "Un revestimiento de yeso"], correcta: 0 },
  { enunciado: "¿Qué distingue al sillarejo dentro de la mampostería?", explicacion: "Tiene las caras vistas escuadradas y labradas, aunque con menor precisión que un sillar.", dificultad: "dificil", opciones: ["Tiene las caras vistas escuadradas y labradas", "Es siempre de menor tamaño que un ladrillo", "Se fabrica con hormigón prefabricado", "No admite mortero de agarre"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un bloque de hormigón con árido ligero frente a uno convencional?", explicacion: "Mejora el aislamiento térmico y reduce el peso propio del muro.", dificultad: "media", opciones: ["Mejora el aislamiento térmico y reduce el peso", "Aumenta siempre la resistencia estructural", "Elimina la necesidad de mortero de agarre", "Solo se fabrica en formato macizo"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: herramientas-manuales-maquinas-albanil
// ─────────────────────────────────────────────────────────────────────────
const S3 = "herramientas-manuales-maquinas-albanil";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Para qué se usa la paleta o llana de albañil?", reverso: "Para coger, extender y repartir el mortero al asentar piezas de fábrica o al enfoscar/revocar paramentos" },
    { anverso: "¿Para qué sirve la llana dentada?", reverso: "Para extender adhesivos o morteros cola de forma uniforme (por ejemplo, en el alicatado), dejando un espesor regular mediante sus dientes" },
    { anverso: "¿Para qué se utiliza la plomada?", reverso: "Para comprobar la verticalidad de un paramento o elemento constructivo, mediante un peso suspendido de un hilo" },
    { anverso: "¿Para qué se utiliza el nivel de burbuja?", reverso: "Para comprobar la horizontalidad (y, con nivel de burbuja vertical, también la verticalidad) de una superficie o hilada" },
    { anverso: "¿Para qué sirve el cordel o hilo de replanteo en albañilería?", reverso: "Para alinear las hiladas de ladrillo o bloque durante la ejecución de una fábrica, tensándolo entre dos miras o reglas" },
    { anverso: "¿Para qué se emplea la maza de goma?", reverso: "Para asentar y ajustar las piezas de fábrica (ladrillos, bloques) golpeándolas sin dañar ni desportillar su superficie" },
    { anverso: "¿Para qué sirven el cincel y la maceta?", reverso: "Para cortar, labrar o hacer rozas en piezas de fábrica o en paramentos ya construidos" },
    { anverso: "¿Para qué se usa la rasqueta en albañilería?", reverso: "Para limpiar restos de mortero, rejuntar o retirar rebabas en juntas y paramentos" },
    { anverso: "¿Qué es la regla de albañil y para qué se usa?", reverso: "Una herramienta larga y recta (de madera, aluminio...) que sirve para comprobar la planeidad de un paramento o enrasar superficies" },
    { anverso: "¿Para qué se usa una hormigonera en obra?", reverso: "Para mezclar mecánicamente los componentes del hormigón o del mortero (conglomerante, áridos y agua), logrando una mezcla homogénea de forma más rápida y uniforme que a mano" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Para qué se emplea principalmente la paleta o llana de albañil?", explicacion: "Para coger, extender y repartir el mortero.", dificultad: "facil", opciones: ["Para coger, extender y repartir el mortero", "Para comprobar la verticalidad de un muro", "Para cortar piezas cerámicas", "Para mezclar hormigón mecánicamente"], correcta: 0 },
  { enunciado: "¿Qué herramienta se usa para comprobar la verticalidad de un paramento?", explicacion: "La plomada, mediante un peso suspendido de un hilo.", dificultad: "facil", opciones: ["La plomada", "La llana dentada", "El cordel de replanteo", "La maza de goma"], correcta: 0 },
  { enunciado: "¿Qué herramienta permite alinear las hiladas de una fábrica de ladrillo?", explicacion: "El cordel o hilo de replanteo, tensado entre dos miras o reglas.", dificultad: "media", opciones: ["El cordel o hilo de replanteo", "El nivel de burbuja únicamente", "La rasqueta", "El cincel"], correcta: 0 },
  { enunciado: "¿Para qué se utiliza la maza de goma en albañilería?", explicacion: "Para asentar y ajustar piezas de fábrica sin dañar su superficie.", dificultad: "media", opciones: ["Para asentar piezas de fábrica sin dañarlas", "Para amasar mortero", "Para comprobar la horizontalidad", "Para extender adhesivo de alicatado"], correcta: 0 },
  { enunciado: "¿Con qué herramienta se extiende de forma uniforme un adhesivo o mortero cola?", explicacion: "Con la llana dentada, cuyos dientes regulan el espesor.", dificultad: "media", opciones: ["Con la llana dentada", "Con la plomada", "Con la maceta", "Con el cordel de replanteo"], correcta: 0 },
  { enunciado: "¿Para qué sirven el cincel y la maceta en el oficio de albañil?", explicacion: "Para cortar, labrar o hacer rozas en piezas o paramentos.", dificultad: "facil", opciones: ["Para cortar, labrar o hacer rozas", "Para nivelar una hilada", "Para mezclar hormigón", "Para replantear una obra"], correcta: 0 },
  { enunciado: "¿Qué función cumple la regla de albañil?", explicacion: "Comprobar la planeidad de un paramento o enrasar superficies.", dificultad: "media", opciones: ["Comprobar la planeidad de un paramento", "Verificar la verticalidad exclusivamente", "Cortar piezas cerámicas", "Mezclar mortero"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la hormigonera frente al amasado manual?", explicacion: "Logra una mezcla más homogénea y de forma más rápida y uniforme.", dificultad: "facil", opciones: ["Una mezcla más homogénea y rápida", "Elimina la necesidad de agua en la mezcla", "Sustituye a los áridos gruesos", "Solo sirve para amasar yeso"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 7 — primer tema de la parte específica)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 7,
      orden: 7,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-45 creado y vinculado como Tema 7 de Oficial Albañil.");
