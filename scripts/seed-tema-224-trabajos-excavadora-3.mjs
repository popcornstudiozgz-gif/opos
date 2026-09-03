/**
 * Crea tema-224: "Trabajos con excavadora (III): técnicas de excavación,
 * interpretación de croquis y aritmética de obra" — Tema 12 (numero=12,
 * bloque-2) de Oficial Conductor, Especialidad Maquinaria Pesada (Ayto.
 * de Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea
 * 2122): "Trabajos con excavadora (III). Técnicas de realización de
 * trabajos de excavación y carga de materiales. Estudio e interpretación
 * de croquis y dibujos. Aritmética. Operaciones elementales. Áreas y
 * volúmenes. Movimientos de piedras."
 *
 * Conocimiento técnico consolidado del oficio (técnicas operativas de
 * excavación, lectura de planos de obra y cálculo geométrico aplicado),
 * sin una ley española única que lo regule — mismo criterio que en
 * tema-222 y tema-223, y ya aplicado en Oficial Carpintero y Herrero.
 * Búsqueda previa realizada conforme al estándar de sourcing del
 * proyecto: no existe normativa específica sobre estas materias
 * distinta de la ya citada en temas anteriores (NTP 126 del INSST).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-224-trabajos-excavadora-3.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-224";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

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
  titulo: "Trabajos con excavadora (III): técnicas de excavación, croquis y aritmética de obra",
  descripcion: "Técnicas de excavación y carga de materiales. Estudio e interpretación de croquis y dibujos de obra. Aritmética aplicada: operaciones elementales, áreas, volúmenes y movimientos de tierras.",
  contenido: "Desarrolla los trabajos con excavadora en su tercera parte: las técnicas de realización de trabajos de excavación y carga de materiales que optimizan producción y calidad; el estudio e interpretación de croquis y dibujos de obra (perfiles, cotas, rasantes) necesarios para ejecutar correctamente los trabajos encomendados; y las nociones de aritmética aplicada al movimiento de tierras: operaciones elementales, cálculo de áreas y volúmenes de excavación, y estimación de movimientos de piedras y materiales.",
  enlaces_boe: [
    { url: NTP_126, titulo: "INSST — NTP 126: Máquinas para movimiento de tierras" },
  ],
  indice_estudio: [
    { url: NTP_126, titulo: "Técnicas de realización de trabajos de excavación y carga", seccion: "tecnicas-excavacion-carga-materiales", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Estudio e interpretación de croquis y dibujos de obra", seccion: "interpretacion-croquis-dibujos-obra", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Aritmética aplicada: áreas, volúmenes y movimientos de tierras", seccion: "aritmetica-areas-volumenes-movimientos-tierras", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "tecnicas-excavacion-carga-materiales";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué se entiende por una técnica de excavación eficiente, en el trabajo con excavadora?", reverso: "Aquella que combina el máximo aprovechamiento de la capacidad del cazo en cada pasada, el mínimo número de ciclos necesarios, y el respeto de las cotas y perfiles del proyecto, sin comprometer la seguridad ni la calidad del acabado" },
  { anverso: "¿Qué es la posición de trabajo óptima de una excavadora respecto al frente que va a excavar?", reverso: "Aquella que permite alcanzar el punto de excavación sin forzar el equipo de trabajo (pluma y brazo próximos a su posición de máxima fuerza), manteniendo la máquina nivelada y estable durante todo el ciclo" },
  { anverso: "¿Por qué es preferible excavar por capas o tongadas sucesivas en materiales muy compactos, en lugar de intentar una única pasada profunda?", reverso: "Porque reduce el esfuerzo exigido al equipo hidráulico en cada pasada, disminuye el riesgo de forzar o dañar la máquina, y permite un mayor control sobre la estabilidad del frente de excavación" },
  { anverso: "¿Qué debe tenerse en cuenta al planificar la secuencia de excavación y carga en una obra con varios vehículos de transporte?", reverso: "Coordinar los tiempos de llegada y posicionamiento de los vehículos con el ciclo de la excavadora, minimizando los tiempos de espera tanto de la máquina como de los vehículos, para optimizar el rendimiento conjunto del equipo de trabajo" },
  { anverso: "¿Qué relación existe entre una buena técnica de excavación y el desgaste de los dientes y del cazo de la máquina?", reverso: "Una técnica adecuada, que evita forzar el equipo contra materiales excesivamente duros sin preparación previa, reduce el desgaste prematuro de los dientes y del filo del cazo, prolongando su vida útil y reduciendo los costes de mantenimiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué caracteriza a una técnica de excavación eficiente?", explicacion: "Aprovechar el cazo, minimizar ciclos y respetar cotas y perfiles con seguridad.", dificultad: "media", opciones: ["Aprovechar el cazo, minimizar ciclos y respetar cotas con seguridad", "Excavar siempre a la máxima velocidad posible sin más criterio", "Utilizar siempre el cazo de menor tamaño disponible", "Prescindir de la planificación previa de la excavación"], correcta: 0 },
  { enunciado: "¿Qué caracteriza la posición de trabajo óptima de una excavadora respecto al frente?", explicacion: "Alcanzar el punto de excavación sin forzar el equipo, manteniendo la máquina nivelada.", dificultad: "media", opciones: ["Alcanzar el punto sin forzar el equipo, con la máquina nivelada", "Situarse siempre a la máxima distancia posible del frente", "Situarse siempre con la torreta girada 180 grados", "No influye la posición de la máquina en el resultado del trabajo"], correcta: 0 },
  { enunciado: "¿Por qué es preferible excavar por capas sucesivas en materiales muy compactos?", explicacion: "Reduce el esfuerzo hidráulico y el riesgo de dañar la máquina, con mayor control de estabilidad.", dificultad: "dificil", opciones: ["Reduce el esfuerzo hidráulico y mejora el control de estabilidad", "No aporta ninguna ventaja frente a una única pasada profunda", "Solo resulta relevante en materiales sueltos, no en compactos", "Aumenta siempre el tiempo total de ejecución sin ningún beneficio"], correcta: 0 },
  { enunciado: "¿Qué debe coordinarse al planificar la excavación y carga con varios vehículos de transporte?", explicacion: "Los tiempos de llegada y posicionamiento de los vehículos con el ciclo de la excavadora.", dificultad: "media", opciones: ["Los tiempos de llegada de los vehículos con el ciclo de la máquina", "Únicamente el color de los vehículos de transporte empleados", "Únicamente el horario de salida de la obra al final del día", "No es necesaria ninguna coordinación entre máquina y vehículos"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre una buena técnica de excavación y el desgaste del cazo?", explicacion: "Reduce el desgaste prematuro de dientes y filo, prolongando su vida útil.", dificultad: "media", opciones: ["Reduce el desgaste prematuro de dientes y filo del cazo", "No existe ninguna relación real entre técnica y desgaste", "Solo influye en el desgaste del motor, no en el del cazo", "El desgaste del cazo depende únicamente de su antigüedad"], correcta: 0 },
]);

const S2 = "interpretacion-croquis-dibujos-obra";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un croquis de obra?", reverso: "Un dibujo esquemático, realizado a mano alzada o con instrumentos sencillos, que representa de forma simplificada las dimensiones, cotas y elementos principales de una excavación o de un elemento constructivo, sin la precisión ni el formalismo de un plano técnico completo" },
  { anverso: "¿Qué es una cota, en un croquis o plano de obra?", reverso: "Un valor numérico que indica una medida (longitud, altura, profundidad) de un elemento representado en el dibujo, referida habitualmente a un punto o nivel de referencia fijo de la obra" },
  { anverso: "¿Qué es la rasante, en un perfil o croquis de excavación?", reverso: "La línea que representa el nivel o cota final que debe alcanzar el fondo de la excavación o la superficie del terreno una vez concluidos los trabajos, y que sirve de referencia para controlar la profundidad de excavación durante la ejecución" },
  { anverso: "¿Qué es un perfil longitudinal, en el contexto de una zanja o una pista de obra?", reverso: "Una representación gráfica que muestra la variación de cotas del terreno y de la rasante de proyecto a lo largo del eje longitudinal de la zanja o de la pista, permitiendo visualizar pendientes, desniveles y profundidades a lo largo de todo el trazado" },
  { anverso: "¿Por qué es importante para el Oficial Conductor saber interpretar correctamente un croquis o un perfil de obra antes de comenzar a excavar?", reverso: "Porque permite ejecutar la excavación con las cotas, pendientes y dimensiones exactas previstas en el proyecto, evitando excavar de más o de menos, y facilita la coordinación con el resto de personal técnico de la obra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un croquis de obra?", explicacion: "Un dibujo esquemático simplificado, sin la precisión de un plano técnico completo.", dificultad: "facil", opciones: ["Un dibujo esquemático simplificado de la obra", "Un documento exclusivamente contable de la obra", "Un contrato administrativo de la obra", "Un informe exclusivamente fotográfico de la obra"], correcta: 0 },
  { enunciado: "¿Qué es una cota en un croquis o plano de obra?", explicacion: "Un valor numérico que indica una medida referida a un punto de referencia fijo.", dificultad: "media", opciones: ["Un valor numérico que indica una medida de referencia", "El nombre técnico asignado a cada máquina de la obra", "El color empleado para representar cada material", "La fecha de ejecución prevista para cada fase de obra"], correcta: 0 },
  { enunciado: "¿Qué es la rasante en un perfil de excavación?", explicacion: "La línea que representa el nivel final que debe alcanzar el fondo de la excavación.", dificultad: "media", opciones: ["La línea que representa el nivel final de la excavación", "La línea que delimita el vallado perimetral de la obra", "El trazado exacto de las líneas eléctricas subterráneas", "El límite de propiedad entre parcelas colindantes"], correcta: 0 },
  { enunciado: "¿Qué representa un perfil longitudinal de una zanja o pista de obra?", explicacion: "La variación de cotas del terreno y de la rasante a lo largo del eje longitudinal.", dificultad: "dificil", opciones: ["La variación de cotas a lo largo del eje longitudinal", "Únicamente la anchura de la zanja en un punto concreto", "Únicamente el tipo de material excavado en la zanja", "El presupuesto económico asociado a la excavación"], correcta: 0 },
  { enunciado: "¿Por qué es relevante para el Oficial Conductor saber interpretar un croquis antes de excavar?", explicacion: "Permite ejecutar la excavación con las cotas y dimensiones exactas previstas en proyecto.", dificultad: "media", opciones: ["Permite ejecutar la excavación con las cotas exactas de proyecto", "No aporta ninguna utilidad real durante la ejecución del trabajo", "Solo es relevante para el personal técnico, no para el operador", "Solo resulta necesario en obras de gran envergadura"], correcta: 0 },
]);

const S3 = "aritmetica-areas-volumenes-movimientos-tierras";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se calcula el área de una superficie rectangular, como la de una zanja vista en planta?", reverso: "Multiplicando su longitud por su anchura (Área = longitud × anchura), expresando el resultado en metros cuadrados (m²) cuando ambas medidas se expresan en metros" },
  { anverso: "¿Cómo se calcula, de forma aproximada, el volumen de tierra a excavar en una zanja de sección rectangular constante?", reverso: "Multiplicando el área de la sección transversal de la zanja (anchura × profundidad) por su longitud total (Volumen = anchura × profundidad × longitud), expresando el resultado en metros cúbicos (m³)" },
  { anverso: "¿Cómo se calcula, de forma aproximada, el volumen de tierra de un vaciado con forma de prisma rectangular?", reverso: "Multiplicando el área de la superficie en planta (longitud × anchura) por la profundidad media del vaciado (Volumen = longitud × anchura × profundidad), expresando el resultado en metros cúbicos (m³)" },
  { anverso: "¿Qué es el coeficiente de esponjamiento de un material excavado?", reverso: "El factor que expresa el aumento de volumen que experimenta un material al ser excavado y removido respecto a su volumen original en el terreno (\"en banco\"), debido a que pierde su compacidad natural al fragmentarse; debe tenerse en cuenta al calcular la capacidad de los vehículos de transporte necesarios" },
  { anverso: "¿Por qué es útil para el Oficial Conductor saber estimar de forma aproximada el número de ciclos de excavadora o de viajes de camión necesarios para mover un volumen determinado de tierra?", reverso: "Porque permite planificar mejor el ritmo de trabajo, coordinar la llegada de los vehículos de transporte con la producción de la excavadora, y estimar de forma más realista el tiempo necesario para completar una fase de la obra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cómo se calcula el área de una superficie rectangular?", explicacion: "Multiplicando su longitud por su anchura.", dificultad: "facil", opciones: ["Multiplicando su longitud por su anchura", "Sumando su longitud y su anchura", "Dividiendo su longitud entre su anchura", "Multiplicando su longitud por su profundidad"], correcta: 0 },
  { enunciado: "¿Cómo se calcula el volumen aproximado de tierra a excavar en una zanja de sección rectangular constante?", explicacion: "Multiplicando anchura × profundidad × longitud de la zanja.", dificultad: "media", opciones: ["Multiplicando anchura, profundidad y longitud de la zanja", "Multiplicando únicamente la longitud por la profundidad", "Sumando la anchura, la profundidad y la longitud", "Dividiendo la longitud entre la profundidad de la zanja"], correcta: 0 },
  { enunciado: "¿Cómo se calcula el volumen aproximado de un vaciado con forma de prisma rectangular?", explicacion: "Multiplicando longitud × anchura × profundidad media del vaciado.", dificultad: "media", opciones: ["Multiplicando longitud, anchura y profundidad media", "Multiplicando únicamente longitud y anchura, sin profundidad", "Sumando longitud, anchura y profundidad del vaciado", "Dividiendo el área en planta entre la profundidad media"], correcta: 0 },
  { enunciado: "¿Qué es el coeficiente de esponjamiento de un material excavado?", explicacion: "El factor de aumento de volumen del material al ser excavado respecto a su volumen en banco.", dificultad: "dificil", opciones: ["El aumento de volumen del material al ser excavado", "La reducción de peso del material al ser excavado", "El aumento de dureza del material al ser excavado", "La reducción de volumen del material al ser compactado"], correcta: 0 },
  { enunciado: "¿Por qué es útil estimar el número de ciclos o de viajes necesarios para mover un volumen de tierra?", explicacion: "Permite planificar el ritmo de trabajo y coordinar la llegada de vehículos con la producción.", dificultad: "media", opciones: ["Permite planificar el ritmo de trabajo y coordinar vehículos", "No aporta ninguna utilidad práctica real en la obra", "Solo es relevante para el cálculo del presupuesto económico", "Solo resulta necesario si la obra dura más de un año"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-224 creado y vinculado como Tema 12 de Oficial Conductor Maquinaria Pesada.");
