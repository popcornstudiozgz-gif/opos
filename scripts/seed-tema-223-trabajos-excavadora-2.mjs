/**
 * Crea tema-223: "Trabajos con excavadora (II): taludes, zanjas y frentes
 * de excavación" — Tema 11 (numero=11, bloque-2) de Oficial Conductor,
 * Especialidad Maquinaria Pesada (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea 2115):
 *   "Trabajos con excavadora (II). Construir y limpiar taludes. Excavar
 *   zanjas. Excavar frentes de distintas clases de materiales. Excavar
 *   vaciados. Construir pistas a media ladera. Cargar materiales
 *   fragmentados en vehículos de transporte. Martillos e implementos."
 *
 * Normativa verificada (ya citada y verificada en otras "Oficial X" del
 * proyecto para el contenido de zanjas y taludes — Oficial Albañil,
 * tema-48 "Excavaciones"):
 * - RD 1627/1997, de 24 de octubre, disposiciones mínimas de seguridad y
 *   de salud en las obras de construcción (BOE-A-1997-22614) — Anexo IV,
 *   parte C, sobre excavaciones, pozos, trabajos subterráneos y túneles.
 * - NTP 126 (INSST), "Máquinas para movimiento de tierras" — ya citada
 *   en tema-222, referencia técnica para el contenido operativo del
 *   resto del tema (frentes de excavación, martillos e implementos).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-223-trabajos-excavadora-2.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-223";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";
const NTP_126 = "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/4-serie-ntp-numeros-121-a-155-ano-1985/ntp-126-maquinas-para-movimiento-de-tierras";

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
  titulo: "Trabajos con excavadora (II): taludes, zanjas y frentes de excavación",
  descripcion: "Construcción y limpieza de taludes. Excavación de zanjas y vaciados conforme al RD 1627/1997. Excavación de frentes según el tipo de material y pistas a media ladera. Carga de materiales fragmentados, martillos e implementos.",
  contenido: "Desarrolla los trabajos con excavadora en su segunda parte: la construcción y limpieza de taludes y la excavación de zanjas y vaciados, con especial atención a las exigencias de seguridad del RD 1627/1997 en excavaciones (entibación, pendiente de talud según el terreno, distancia de acopios al borde); la excavación de frentes según distintas clases de materiales y la construcción de pistas a media ladera; y la carga de materiales fragmentados en vehículos de transporte, junto con el uso de martillos hidráulicos y otros implementos acoplables al equipo de la excavadora.",
  enlaces_boe: [
    { url: RD_1627_1997, titulo: "RD 1627/1997 — disposiciones mínimas de seguridad y salud en obras de construcción" },
    { url: NTP_126, titulo: "INSST — NTP 126: Máquinas para movimiento de tierras" },
  ],
  indice_estudio: [
    { url: RD_1627_1997, titulo: "Construcción y limpieza de taludes, excavación de zanjas y vaciados", seccion: "taludes-zanjas-vaciados-seguridad-excavaciones", articulos: "RD 1627/1997, Anexo IV" },
    { url: NTP_126, titulo: "Frentes de excavación según el material y pistas a media ladera", seccion: "frentes-excavacion-materiales-pistas-media-ladera", articulos: "Conocimiento técnico del oficio" },
    { url: NTP_126, titulo: "Carga de materiales fragmentados, martillos e implementos", seccion: "carga-materiales-martillos-implementos", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "taludes-zanjas-vaciados-seguridad-excavaciones";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un talud, en el contexto de una excavación?", reverso: "La superficie inclinada que forma el terreno en el límite lateral de una excavación, cuya pendiente debe adaptarse a las características del terreno (cohesión, ángulo de rozamiento interno, presencia de agua) para garantizar su estabilidad y evitar desprendimientos" },
  { anverso: "¿Qué exige, con carácter general, el RD 1627/1997 respecto a la estabilidad de los taludes y de las paredes de una excavación?", reverso: "Que se adopten las medidas adecuadas para evitar desprendimientos de tierras (entibación, taluzado con una pendiente segura según el tipo de terreno, u otro sistema equivalente), especialmente cuando existe riesgo de sepultamiento de personas trabajadoras" },
  { anverso: "¿Qué es una zanja, a efectos de excavación?", reverso: "Una excavación estrecha y alargada, de mayor longitud que anchura, empleada habitualmente para el tendido de tuberías, cables u otras canalizaciones, cuyas paredes requieren especial atención frente al riesgo de desprendimiento por su elevada relación profundidad-anchura" },
  { anverso: "¿Qué es un vaciado, en obra?", reverso: "La excavación general de una parcela o solar hasta la cota de cimentación prevista en el proyecto, previa a la ejecución de la propia cimentación del edificio o estructura" },
  { anverso: "¿Qué distancia mínima debe respetarse, con carácter general, entre el borde de una excavación y el acopio de materiales o el tránsito de maquinaria pesada?", reverso: "Una distancia de seguridad suficiente para evitar sobrecargas que comprometan la estabilidad del talud o de las paredes de la excavación, determinada en función de la profundidad de la excavación y de las características del terreno, conforme a la evaluación de riesgos de la obra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un talud, en el contexto de una excavación?", explicacion: "La superficie inclinada que forma el terreno en el límite lateral de una excavación.", dificultad: "facil", opciones: ["La superficie inclinada en el límite lateral de una excavación", "El fondo horizontal de la excavación una vez terminada", "El material sobrante retirado fuera de la obra", "El sistema de drenaje instalado en la excavación"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1627/1997 respecto a la estabilidad de las paredes de una excavación?", explicacion: "Adoptar medidas adecuadas para evitar desprendimientos (entibación, taluzado seguro, u otro sistema).", dificultad: "media", opciones: ["Adoptar medidas para evitar desprendimientos de tierras", "Ninguna medida específica distinta de la señalización", "Excavar siempre con una pendiente vertical de 90 grados", "Prescindir de cualquier medida si la obra es de corta duración"], correcta: 0 },
  { enunciado: "¿Qué es una zanja, a efectos de excavación?", explicacion: "Una excavación estrecha y alargada, empleada habitualmente para tuberías o cables.", dificultad: "media", opciones: ["Una excavación estrecha y alargada para canalizaciones", "Una excavación general de toda la superficie de un solar", "Una excavación exclusiva para cimentaciones superficiales", "Una excavación realizada exclusivamente en roca"], correcta: 0 },
  { enunciado: "¿Qué es un vaciado en obra?", explicacion: "La excavación general de una parcela hasta la cota de cimentación prevista en proyecto.", dificultad: "media", opciones: ["La excavación general de una parcela hasta la cota de cimentación", "Una excavación estrecha exclusiva para canalizaciones", "El relleno posterior de una zanja ya excavada", "La limpieza superficial del terreno antes de excavar"], correcta: 0 },
  { enunciado: "¿Por qué debe respetarse una distancia de seguridad entre el borde de una excavación y el acopio de materiales?", explicacion: "Para evitar sobrecargas que comprometan la estabilidad del talud o de las paredes.", dificultad: "dificil", opciones: ["Para evitar sobrecargas que comprometan la estabilidad", "Únicamente por motivos estéticos de la obra", "Únicamente para facilitar el acceso de vehículos ligeros", "No existe ninguna exigencia real sobre esta distancia"], correcta: 0 },
]);

const S2 = "frentes-excavacion-materiales-pistas-media-ladera";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un frente de excavación?", reverso: "La superficie de ataque del terreno sobre la que actúa directamente el equipo de la excavadora, cuya técnica de excavación varía según la naturaleza del material: tierra suelta, terreno cohesivo, roca fracturada o roca compacta" },
  { anverso: "¿Cómo varía la técnica de excavación de un frente según el tipo de material a excavar?", reverso: "En materiales sueltos o poco cohesivos, el cazo puede penetrar con facilidad mediante el propio peso y la fuerza de excavación; en materiales muy compactos o rocosos, puede requerirse un diente reforzado, un martillo hidráulico previo, o una técnica de ataque en capas sucesivas de menor espesor" },
  { anverso: "¿Qué es una pista a media ladera, en el contexto de las obras de movimiento de tierras?", reverso: "Un camino de acceso o de servicio construido sobre una ladera con pendiente transversal, que exige un cuidado especial en su trazado y en la compactación de su base para garantizar la estabilidad de la propia pista y evitar deslizamientos" },
  { anverso: "¿Qué precauciones debe adoptar el Oficial Conductor al construir una pista a media ladera?", reverso: "Verificar la estabilidad del terreno sobre el que se asienta la pista, evitar sobrecargar el borde exterior (el más próximo al desnivel), y garantizar un drenaje adecuado que evite la acumulación de agua que pueda debilitar la plataforma" },
  { anverso: "¿Por qué resulta relevante adaptar la técnica de excavación al tipo concreto de material del frente de trabajo?", reverso: "Porque una técnica inadecuada al material (por ejemplo, forzar el cazo en roca compacta sin apoyo previo) puede provocar un desgaste prematuro o una avería del equipo de trabajo, además de reducir la producción y comprometer la seguridad de la operación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un frente de excavación?", explicacion: "La superficie de ataque del terreno sobre la que actúa el equipo de la excavadora.", dificultad: "facil", opciones: ["La superficie de ataque del terreno para la excavadora", "El fondo horizontal ya terminado de la excavación", "El material ya cargado en el vehículo de transporte", "El acopio de materiales situado junto a la excavación"], correcta: 0 },
  { enunciado: "¿Qué puede requerirse para excavar un frente de material muy compacto o rocoso?", explicacion: "Un diente reforzado, un martillo hidráulico previo, o excavación en capas sucesivas.", dificultad: "media", opciones: ["Diente reforzado, martillo hidráulico previo o capas sucesivas", "Ninguna técnica distinta de la empleada en material suelto", "Exclusivamente reducir la velocidad de giro de la torreta", "Exclusivamente aumentar la anchura del cazo empleado"], correcta: 0 },
  { enunciado: "¿Qué es una pista a media ladera?", explicacion: "Un camino construido sobre una ladera con pendiente transversal.", dificultad: "media", opciones: ["Un camino construido sobre una ladera con pendiente transversal", "Una zanja excavada en terreno completamente horizontal", "Un vaciado general de una parcela en llano", "Un frente de excavación en roca compacta"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al construir una pista a media ladera?", explicacion: "Evitar sobrecargar el borde exterior más próximo al desnivel.", dificultad: "dificil", opciones: ["Evitar sobrecargar el borde exterior más próximo al desnivel", "Ninguna precaución adicional distinta de un camino en llano", "Construir siempre la pista con la máxima pendiente posible", "Prescindir del drenaje si la pista es de uso temporal"], correcta: 0 },
  { enunciado: "¿Por qué es relevante adaptar la técnica de excavación al tipo de material del frente?", explicacion: "Evita el desgaste prematuro o avería del equipo y mejora la producción y seguridad.", dificultad: "media", opciones: ["Evita averías del equipo y mejora producción y seguridad", "No influye en ningún caso en el desgaste del equipo", "Solo influye en el aspecto estético del frente excavado", "Solo es relevante si el frente supera los diez metros de altura"], correcta: 0 },
]);

const S3 = "carga-materiales-martillos-implementos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué debe tener en cuenta el Oficial Conductor al cargar materiales fragmentados en un vehículo de transporte (camión o dumper)?", reverso: "No superar la capacidad de carga del vehículo, distribuir el material de forma uniforme sobre la caja, evitar que la máquina invada el radio de giro del vehículo mientras este se posiciona, y esperar la señal de la persona conductora antes de comenzar a cargar" },
  { anverso: "¿Qué es un martillo hidráulico, como implemento de una excavadora?", reverso: "Un accesorio que sustituye al cazo, accionado por el circuito hidráulico de la máquina, que golpea repetidamente el terreno o el material mediante un pistón percutor, empleado para romper roca, hormigón o pavimentos que no pueden excavarse directamente con el cazo" },
  { anverso: "¿Qué otros implementos habituales, además del martillo hidráulico, pueden acoplarse al brazo de una excavadora?", reverso: "La pinza o cizalla (para demolición y manipulación de materiales), el compactador de placa vibrante, la barrena o taladro, y el martillo compactador, cada uno intercambiable según el tipo de trabajo a realizar" },
  { anverso: "¿Qué comprobación debe realizarse antes de acoplar un implemento distinto del cazo al brazo de la excavadora?", reverso: "Verificar que el sistema de acople rápido queda correctamente enclavado y bloqueado, y que las conexiones hidráulicas del implemento están bien ajustadas, evitando su desprendimiento accidental durante el trabajo" },
  { anverso: "¿Qué riesgo específico conlleva el uso del martillo hidráulico frente al del cazo convencional?", reverso: "El riesgo derivado de las vibraciones transmitidas a la máquina y a la persona operadora, la proyección de fragmentos de material durante la percusión, y el riesgo de rotura de mangueras hidráulicas por la propia vibración del percutor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué debe tener en cuenta el Oficial Conductor al cargar materiales en un vehículo de transporte?", explicacion: "No superar la capacidad de carga y distribuir el material de forma uniforme.", dificultad: "facil", opciones: ["No superar la capacidad de carga y distribuir el material", "Cargar siempre el máximo material posible sin ningún límite", "Cargar exclusivamente en el centro de la caja del vehículo", "Ninguna precaución adicional distinta del propio ciclo de excavación"], correcta: 0 },
  { enunciado: "¿Qué es un martillo hidráulico como implemento de una excavadora?", explicacion: "Un accesorio que golpea repetidamente el material mediante un pistón percutor.", dificultad: "media", opciones: ["Un accesorio que golpea el material mediante un pistón percutor", "Un accesorio exclusivo para el izado de cargas pesadas", "Un sistema de iluminación adicional del equipo de trabajo", "Un sistema de refrigeración del motor de la excavadora"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es otro implemento habitual, además del martillo hidráulico, acoplable a una excavadora?", explicacion: "La pinza o cizalla, entre otros implementos intercambiables.", dificultad: "media", opciones: ["La pinza o cizalla", "El volante de dirección del vehículo de transporte", "El tacógrafo del camión de carga", "El extintor portátil de la cabina"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de acoplar un implemento distinto del cazo?", explicacion: "Que el sistema de acople rápido queda correctamente enclavado y las conexiones hidráulicas ajustadas.", dificultad: "dificil", opciones: ["Que el acople queda enclavado y las conexiones ajustadas", "Únicamente el color del implemento a acoplar", "Ninguna comprobación distinta de la usada con el cazo", "Únicamente el peso total del implemento a acoplar"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico conlleva el uso del martillo hidráulico frente al cazo convencional?", explicacion: "Vibraciones, proyección de fragmentos y riesgo de rotura de mangueras hidráulicas.", dificultad: "media", opciones: ["Vibraciones, proyección de fragmentos y rotura de mangueras", "Ningún riesgo adicional distinto del uso del cazo convencional", "Únicamente el riesgo de vuelco total de la máquina", "Únicamente el riesgo derivado de la velocidad de giro"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-223 creado y vinculado como Tema 11 de Oficial Conductor Maquinaria Pesada.");
