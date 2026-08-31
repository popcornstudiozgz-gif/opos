/**
 * Crea tema-84: "Limpieza y desinfección de superficies" — Tema 14
 * (numero=14, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf):
 *   "Limpieza y desinfección de superficies: Útiles y herramientas.
 *   Productos de limpieza. Operaciones básicas."
 *
 * Conocimiento técnico consolidado de limpieza e higiene aplicado al
 * contexto de instalaciones deportivas (vestuarios, suelos húmedos,
 * superficies de alto contacto); no requiere cita legal artículo a
 * artículo, si bien se menciona la clasificación general de productos
 * químicos de limpieza (etiquetado de peligrosidad) como conocimiento
 * técnico de seguridad consolidado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-84-limpieza-desinfeccion-superficies.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-84";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Limpieza y desinfección de superficies",
  descripcion: "Útiles y herramientas de limpieza. Productos de limpieza y su clasificación. Operaciones básicas de limpieza y desinfección de superficies en instalaciones deportivas.",
  contenido: "Desarrolla los útiles y herramientas de limpieza, la clasificación básica de productos de limpieza y desinfección (con especial atención a su etiquetado de seguridad), y las operaciones básicas de limpieza y desinfección de superficies propias de instalaciones deportivas.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Útiles y herramientas de limpieza", seccion: "utiles-herramientas-limpieza", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Productos de limpieza: clasificación y etiquetado", seccion: "productos-limpieza-clasificacion-etiquetado", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Operaciones básicas de limpieza y desinfección", seccion: "operaciones-basicas-limpieza-desinfeccion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "utiles-herramientas-limpieza";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Para qué se usa una mopa en tareas de limpieza de instalaciones deportivas?", reverso: "Para barrer o fregar en seco/húmedo grandes superficies de suelo de forma eficiente, arrastrando polvo y suciedad sin levantarlo al aire" },
  { anverso: "¿Para qué se usa una fregona y cubo con escurridor en la limpieza de suelos?", reverso: "Para fregar con agua y producto de limpieza superficies de suelo, escurriendo el exceso de agua para evitar encharcamientos y facilitar el secado" },
  { anverso: "¿Para qué se usa una máquina fregadora-secadora en instalaciones deportivas de gran superficie?", reverso: "Para lavar, aclarar y secar mecánicamente grandes superficies de suelo (pabellones, pasillos) de forma más rápida y eficiente que con métodos manuales" },
  { anverso: "¿Para qué se usa un carro de limpieza en un centro deportivo?", reverso: "Para transportar de forma organizada los productos, útiles y bolsas de residuos necesarios durante la ronda de limpieza de un centro" },
  { anverso: "¿Para qué se usan los paños de colores diferenciados (código de colores) en limpieza?", reverso: "Para evitar la contaminación cruzada entre zonas: por ejemplo, un color para aseos/sanitarios, otro para superficies de contacto general, y otro para cocina, sin mezclar su uso" },
  { anverso: "¿Qué EPI básico debe usarse al manipular productos de limpieza concentrados?", reverso: "Guantes de protección química y, según el producto, gafas de protección frente a salpicaduras" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Para qué se usa una mopa en la limpieza de instalaciones deportivas?", explicacion: "Para barrer o fregar grandes superficies de forma eficiente.", dificultad: "facil", opciones: ["Para barrer o fregar grandes superficies", "Para desinfectar productos químicos", "Para transportar residuos peligrosos", "Para secar mecánicamente el suelo"], correcta: 0 },
  { enunciado: "¿Para qué se usa una máquina fregadora-secadora?", explicacion: "Para lavar, aclarar y secar mecánicamente grandes superficies.", dificultad: "media", opciones: ["Para lavar, aclarar y secar grandes superficies", "Para desinfectar exclusivamente vestuarios", "Para transportar productos de limpieza", "Para aplicar pintura antideslizante"], correcta: 0 },
  { enunciado: "¿Para qué se usa un carro de limpieza?", explicacion: "Para transportar de forma organizada productos y útiles durante la ronda.", dificultad: "media", opciones: ["Para transportar productos y útiles de limpieza", "Para fregar suelos mecánicamente", "Para desinfectar superficies con vapor", "Para almacenar residuos peligrosos permanentemente"], correcta: 0 },
  { enunciado: "¿Para qué sirve el código de colores en paños de limpieza?", explicacion: "Para evitar la contaminación cruzada entre zonas.", dificultad: "media", opciones: ["Para evitar la contaminación cruzada entre zonas", "Para identificar el turno de trabajo del personal", "Para diferenciar el tipo de suelo del centro", "No tiene ninguna función higiénica real"], correcta: 0 },
  { enunciado: "¿Qué EPI básico debe usarse al manipular productos de limpieza concentrados?", explicacion: "Guantes de protección química y, según el producto, gafas.", dificultad: "facil", opciones: ["Guantes de protección química y gafas", "No es necesaria ninguna protección", "Solo calzado de seguridad", "Solo mascarilla de tela"], correcta: 0 },
]);

const S2 = "productos-limpieza-clasificacion-etiquetado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué diferencia hay entre limpiar y desinfectar una superficie?", reverso: "Limpiar elimina la suciedad visible (polvo, restos orgánicos); desinfectar reduce o elimina los microorganismos (bacterias, virus) presentes en la superficie, aunque esta ya esté visualmente limpia" },
  { anverso: "¿Qué es un producto de limpieza neutro y cuándo se usa?", reverso: "Un producto de pH cercano a 7, de uso general y bajo riesgo de dañar superficies delicadas; se usa para la limpieza rutinaria de suelos y mobiliario" },
  { anverso: "¿Qué es un desengrasante y para qué superficies se emplea en un centro deportivo?", reverso: "Un producto formulado para disolver grasas y residuos oleosos; se emplea en cocinas, cafeterías o zonas con maquinaria (salas de calderas, bombas)" },
  { anverso: "¿Por qué es peligroso mezclar lejía con amoniaco u otros productos ácidos?", reverso: "Porque genera gases tóxicos (cloraminas) que pueden causar daños respiratorios graves; nunca deben mezclarse productos de limpieza sin conocer su compatibilidad química" },
  { anverso: "¿Qué información básica debe figurar en la etiqueta de un producto químico de limpieza?", reverso: "El nombre del producto, los pictogramas de peligro (si aplica), las precauciones de uso, la composición básica y las instrucciones de primeros auxilios en caso de exposición" },
  { anverso: "¿Qué es una ficha de datos de seguridad (FDS) de un producto de limpieza?", reverso: "El documento técnico que detalla la composición, peligros, medidas de primeros auxilios, manipulación, almacenamiento y EPI recomendado para un producto químico" },
  { anverso: "¿Cómo deben almacenarse los productos de limpieza en un centro deportivo?", reverso: "En su envase original etiquetado, en un lugar ventilado y fuera del alcance de personas ajenas al personal de limpieza, separando productos incompatibles entre sí" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué diferencia hay entre limpiar y desinfectar?", explicacion: "Limpiar elimina la suciedad visible; desinfectar reduce o elimina microorganismos.", dificultad: "media", opciones: ["Limpiar elimina suciedad; desinfectar elimina microorganismos", "Son términos exactamente sinónimos", "Desinfectar solo elimina el polvo visible", "Limpiar siempre incluye desinfección automática"], correcta: 0 },
  { enunciado: "¿Qué es un producto de limpieza neutro?", explicacion: "Uno de pH cercano a 7, de uso general y bajo riesgo para superficies.", dificultad: "media", opciones: ["Uno de pH cercano a 7, de uso general", "Un producto exclusivamente desengrasante", "Un producto que solo se usa en piscinas", "Un producto sin ningún tipo de composición química"], correcta: 0 },
  { enunciado: "¿Para qué se usa un desengrasante en un centro deportivo?", explicacion: "Para disolver grasas en cocinas, cafeterías o salas de maquinaria.", dificultad: "media", opciones: ["Para disolver grasas en cocinas o salas de maquinaria", "Para desinfectar el agua de la piscina", "Para tratar la madera de las gradas", "Para pintar líneas de juego"], correcta: 0 },
  { enunciado: "¿Por qué es peligroso mezclar lejía con amoniaco?", explicacion: "Genera gases tóxicos (cloraminas) que pueden causar daños respiratorios graves.", dificultad: "media", opciones: ["Genera gases tóxicos peligrosos para la salud", "No supone ningún riesgo real", "Solo decolora las superficies tratadas", "Solo afecta al color del producto resultante"], correcta: 0 },
  { enunciado: "¿Qué información debe figurar en la etiqueta de un producto químico de limpieza?", explicacion: "Nombre, pictogramas de peligro, precauciones y primeros auxilios.", dificultad: "media", opciones: ["Nombre, pictogramas de peligro y precauciones", "Solo el precio de venta al público", "Solo el nombre del fabricante", "Ninguna información es obligatoria"], correcta: 0 },
  { enunciado: "¿Qué es una ficha de datos de seguridad (FDS)?", explicacion: "El documento técnico con composición, peligros, manipulación y EPI recomendado.", dificultad: "media", opciones: ["El documento técnico de composición y peligros del producto", "La etiqueta comercial del envase", "El manual de uso de la máquina fregadora", "El registro de limpieza diario del centro"], correcta: 0 },
  { enunciado: "¿Cómo deben almacenarse los productos de limpieza?", explicacion: "En envase original etiquetado, ventilado, separando incompatibles y fuera de acceso ajeno.", dificultad: "media", opciones: ["En envase original, ventilado y separando incompatibles", "En cualquier envase disponible sin etiquetar", "Mezclados todos juntos para ahorrar espacio", "Sin ninguna condición especial de almacenamiento"], correcta: 0 },
]);

const S3 = "operaciones-basicas-limpieza-desinfeccion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué superficies de un centro deportivo requieren especial atención en la limpieza por ser de alto contacto?", reverso: "Pomos y manillas de puertas, barandillas, taquillas, grifería, bancos de vestuario y superficies de máquinas de fitness compartidas" },
  { anverso: "¿Con qué frecuencia deben limpiarse las superficies de alto contacto en un centro deportivo de uso intensivo?", reverso: "Varias veces al día, además de la limpieza general programada, dado el elevado número de personas usuarias que las tocan sucesivamente" },
  { anverso: "¿Qué orden general se recomienda seguir al limpiar una estancia (de arriba a abajo o al revés)?", reverso: "De arriba hacia abajo y de zonas menos sucias a más sucias, para que la suciedad desprendida de superficies altas no vuelva a ensuciar zonas ya limpiadas" },
  { anverso: "¿Qué precaución debe tomarse al fregar suelos en zonas de paso de un centro deportivo?", reverso: "Señalizar la zona como suelo mojado con carteles visibles, y priorizar el fregado por tramos para mantener siempre una vía de paso seca cuando sea posible" },
  { anverso: "¿Qué tiempo de contacto debe respetarse al aplicar un desinfectante sobre una superficie?", reverso: "El tiempo indicado por el fabricante en la etiqueta o ficha técnica, necesario para que el producto actúe eficazmente antes de aclarar o secar la superficie" },
  { anverso: "¿Por qué debe renovarse periódicamente el agua de fregado en la limpieza de grandes superficies?", reverso: "Porque el agua sucia pierde eficacia de limpieza y puede redistribuir suciedad y microorganismos en lugar de eliminarlos" },
  { anverso: "¿Qué relación tiene la limpieza y desinfección de vestuarios con la prevención de infecciones (por ejemplo, hongos en duchas)?", reverso: "Una limpieza y desinfección inadecuada favorece la proliferación de hongos y bacterias en ambientes húmedos, aumentando el riesgo de infecciones cutáneas entre las personas usuarias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué superficies requieren especial atención por ser de alto contacto?", explicacion: "Pomos, barandillas, taquillas, grifería y bancos de vestuario.", dificultad: "facil", opciones: ["Pomos, barandillas, taquillas y grifería", "Únicamente el techo de las instalaciones", "Únicamente las ventanas exteriores", "Ninguna superficie requiere atención especial"], correcta: 0 },
  { enunciado: "¿Con qué frecuencia deben limpiarse las superficies de alto contacto en un centro de uso intensivo?", explicacion: "Varias veces al día, además de la limpieza general.", dificultad: "media", opciones: ["Varias veces al día", "Una vez al mes", "Solo una vez al año", "Nunca es necesario limpiarlas aparte"], correcta: 0 },
  { enunciado: "¿Qué orden general se recomienda al limpiar una estancia?", explicacion: "De arriba hacia abajo y de menos a más sucio.", dificultad: "media", opciones: ["De arriba hacia abajo y de menos a más sucio", "De abajo hacia arriba siempre", "El orden no tiene ninguna importancia", "Solo limpiar las zonas visibles al público"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tomarse al fregar suelos en zonas de paso?", explicacion: "Señalizar suelo mojado y priorizar el fregado por tramos.", dificultad: "facil", opciones: ["Señalizar suelo mojado y fregar por tramos", "No es necesaria ninguna señalización", "Fregar siempre toda la superficie a la vez", "Cerrar el centro completo durante el fregado"], correcta: 0 },
  { enunciado: "¿Qué debe respetarse al aplicar un desinfectante sobre una superficie?", explicacion: "El tiempo de contacto indicado por el fabricante.", dificultad: "media", opciones: ["El tiempo de contacto del fabricante", "Ningún tiempo específico, se aclara de inmediato", "Solo se aplica sin necesidad de aclarado nunca", "El tiempo lo decide libremente cada trabajador"], correcta: 0 },
  { enunciado: "¿Por qué debe renovarse periódicamente el agua de fregado?", explicacion: "Porque el agua sucia pierde eficacia y puede redistribuir suciedad.", dificultad: "media", opciones: ["El agua sucia pierde eficacia y redistribuye suciedad", "No es necesario renovarla nunca", "Solo se renueva una vez al mes", "Renovarla no afecta al resultado de limpieza"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-84 creado y vinculado como Tema 14 de Oficial Polivalente Instalaciones Deportivas.");
