/**
 * Crea tema-225: "Trabajos con palas cargadoras" — Tema 13 (numero=13,
 * bloque-2) de Oficial Conductor, Especialidad Maquinaria Pesada (Ayto.
 * de Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea
 * 2130): "Trabajos con palas cargadoras. Método de trabajo. Vías de
 * acceso a la explotación o lugar de trabajo e inspección visual. Áreas
 * de estacionamiento en zonas de peligro. Carga de materiales.
 * Alimentación de tolvas. Acopio de materiales."
 *
 * Conocimiento técnico consolidado del oficio, sin ley española única
 * — mismo criterio que en temas anteriores de esta oposición (búsqueda
 * previa realizada conforme al estándar del proyecto). Referencia
 * técnica: NTP 126 (INSST), ya citada en tema-222 y tema-223.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-225-palas-cargadoras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-225";
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
  titulo: "Trabajos con palas cargadoras",
  descripcion: "Método de trabajo de la pala cargadora. Vías de acceso e inspección visual del lugar de trabajo. Áreas de estacionamiento en zonas de peligro. Carga de materiales, alimentación de tolvas y acopio.",
  contenido: "Desarrolla los trabajos con pala cargadora: su método de trabajo característico, distinto del de la excavadora, basado en el desplazamiento frontal de la máquina para el llenado del cazo; la inspección visual previa de las vías de acceso a la explotación o lugar de trabajo antes de iniciar la jornada; las áreas de estacionamiento en zonas de peligro y las precauciones que exigen; y las operaciones de carga de materiales, alimentación de tolvas y formación de acopios.",
  enlaces_boe: [
    { url: NTP_126, titulo: "INSST — NTP 126: Máquinas para movimiento de tierras" },
  ],
  indice_estudio: [
    { url: NTP_126, titulo: "La pala cargadora: método de trabajo", seccion: "pala-cargadora-metodo-trabajo", articulos: "Conocimiento técnico del oficio" },
    { url: NTP_126, titulo: "Vías de acceso, inspección visual y áreas de estacionamiento en zonas de peligro", seccion: "vias-acceso-estacionamiento-zonas-peligro", articulos: "Conocimiento técnico del oficio" },
    { url: NTP_126, titulo: "Carga de materiales, alimentación de tolvas y acopio", seccion: "carga-materiales-alimentacion-tolvas-acopio", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "pala-cargadora-metodo-trabajo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una pala cargadora?", reverso: "Una máquina autopropulsada, sobre neumáticos o cadenas, dotada de un cazo frontal fijo a la propia estructura de la máquina (sin torreta giratoria independiente), que carga material desplazándose hacia adelante para llenar el cazo y elevándolo después para su descarga" },
  { anverso: "¿Qué diferencia principal existe, en el método de trabajo, entre una pala cargadora y una excavadora?", reverso: "La pala cargadora llena el cazo mediante el desplazamiento de toda la máquina hacia el montón de material (empuje frontal), mientras que la excavadora llena el cazo mediante el movimiento articulado de su pluma y brazo, permaneciendo la máquina estática durante la excavación" },
  { anverso: "¿Cuáles son las fases básicas del ciclo de trabajo de una pala cargadora?", reverso: "Aproximación y penetración en el material, elevación y giro del cazo cargado, desplazamiento hasta el punto de descarga (tolva, camión o acopio), descarga del material, y retorno a la posición de carga" },
  { anverso: "¿Qué técnica se emplea para llenar completamente el cazo de una pala cargadora en un material compacto o apilado?", reverso: "Penetrar el cazo en el material con el borde inferior ligeramente inclinado hacia abajo, avanzando la máquina mientras se acciona el basculamiento del cazo, aprovechando tanto la fuerza de avance de la máquina como la del cilindro de vuelco" },
  { anverso: "¿Qué precaución debe adoptarse al desplazarse con el cazo de la pala cargadora cargado y elevado?", reverso: "Mantener el cazo a la menor altura posible compatible con el desplazamiento (evitando elevarlo innecesariamente), dado que una carga elevada reduce la estabilidad de la máquina y limita la visibilidad de la persona operadora" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una pala cargadora?", explicacion: "Una máquina con cazo frontal fijo a la estructura, que carga material desplazándose hacia adelante.", dificultad: "facil", opciones: ["Una máquina con cazo frontal que carga desplazándose hacia adelante", "Una máquina exclusiva para la nivelación fina de superficies", "Una máquina exclusiva para el transporte a larga distancia", "Una máquina exclusiva para la compactación de terrenos"], correcta: 0 },
  { enunciado: "¿Qué diferencia el método de trabajo de la pala cargadora del de la excavadora?", explicacion: "La pala llena el cazo mediante el desplazamiento de la máquina; la excavadora, mediante pluma y brazo.", dificultad: "media", opciones: ["La pala llena el cazo desplazando toda la máquina", "Ambas máquinas emplean exactamente el mismo método", "La excavadora siempre carece de cazo como elemento de trabajo", "La pala cargadora nunca puede desplazarse con carga"], correcta: 0 },
  { enunciado: "¿Cuál es la primera fase del ciclo de trabajo de una pala cargadora?", explicacion: "Aproximación y penetración en el material.", dificultad: "media", opciones: ["Aproximación y penetración en el material", "Descarga del material en el punto final", "Retorno vacío a la posición inicial", "Elevación del cazo ya cargado"], correcta: 0 },
  { enunciado: "¿Qué técnica facilita llenar completamente el cazo en un material compacto?", explicacion: "Penetrar el cazo inclinado hacia abajo, combinando avance de la máquina y basculamiento del cazo.", dificultad: "dificil", opciones: ["Penetrar el cazo inclinado combinando avance y basculamiento", "Detener la máquina antes de tocar el material a cargar", "Elevar el cazo al máximo antes de iniciar la penetración", "Girar la máquina 90 grados antes de penetrar en el material"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al desplazarse con el cazo cargado?", explicacion: "Mantener el cazo a la menor altura posible compatible con el desplazamiento.", dificultad: "media", opciones: ["Mantener el cazo a la menor altura posible", "Elevar el cazo siempre al máximo durante el desplazamiento", "La altura del cazo no influye en la estabilidad de la máquina", "Desplazarse siempre marcha atrás con el cazo cargado"], correcta: 0 },
]);

const S2 = "vias-acceso-estacionamiento-zonas-peligro";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué debe comprobar el Oficial Conductor sobre las vías de acceso a la explotación o lugar de trabajo antes de comenzar la jornada?", reverso: "Que las vías se encuentran en condiciones adecuadas de firmeza, pendiente y anchura para el tránsito seguro de la máquina, libres de obstáculos, socavones o zonas de terreno inestable que puedan comprometer la estabilidad de la pala cargadora" },
  { anverso: "¿Qué es la inspección visual previa a la jornada de trabajo?", reverso: "La comprobación ocular del estado general de la máquina (niveles, neumáticos o cadenas, sistema hidráulico, luces, frenos) y del entorno de trabajo (vías de acceso, zona de maniobra, presencia de terceros), realizada antes de poner la máquina en marcha" },
  { anverso: "¿Qué es una zona de peligro, en el contexto del estacionamiento de una pala cargadora?", reverso: "Un área donde existe un riesgo específico para la máquina o para terceros: proximidad a un desnivel o talud, terreno de escasa capacidad portante, cercanía a líneas eléctricas aéreas, o zona de paso habitual de otras máquinas o vehículos" },
  { anverso: "¿Qué precaución debe adoptarse al estacionar una pala cargadora en una zona próxima a un talud o desnivel?", reverso: "Mantener una distancia de seguridad suficiente respecto al borde del talud, evitando que el peso de la máquina sobrecargue una zona de terreno potencialmente inestable, y accionar el freno de estacionamiento con el cazo apoyado en el suelo" },
  { anverso: "¿Por qué debe evitarse estacionar la máquina en una zona de paso habitual de otros vehículos o del propio personal de obra?", reverso: "Porque incrementa el riesgo de colisión o atropello, especialmente si la máquina queda parcialmente dentro de las zonas muertas de otros equipos o fuera del campo de visión habitual de quienes circulan por esa zona" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué debe comprobar el Oficial Conductor sobre las vías de acceso antes de comenzar la jornada?", explicacion: "Que están en condiciones adecuadas de firmeza, pendiente y anchura, libres de obstáculos.", dificultad: "media", opciones: ["Que están en condiciones adecuadas y libres de obstáculos", "Únicamente que existe suficiente iluminación artificial", "Ninguna comprobación distinta de la revisión de la propia máquina", "Únicamente la distancia total hasta el punto de descarga"], correcta: 0 },
  { enunciado: "¿Qué es la inspección visual previa a la jornada de trabajo?", explicacion: "La comprobación ocular del estado de la máquina y del entorno de trabajo antes de ponerla en marcha.", dificultad: "media", opciones: ["Comprobación ocular de la máquina y el entorno antes de arrancar", "Un trámite administrativo exigido solo una vez al año", "Una revisión exclusivamente mecánica realizada por un taller", "Una comprobación exigida solo tras un accidente ocurrido"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una zona de peligro para el estacionamiento de una pala cargadora?", explicacion: "La proximidad a un desnivel o talud, entre otras zonas de riesgo.", dificultad: "facil", opciones: ["La proximidad a un desnivel o talud", "Una superficie completamente horizontal y firme", "Una zona alejada de cualquier línea eléctrica", "Un área señalizada y delimitada de la obra"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al estacionar junto a un talud o desnivel?", explicacion: "Mantener distancia de seguridad y accionar el freno con el cazo apoyado en el suelo.", dificultad: "media", opciones: ["Mantener distancia de seguridad y apoyar el cazo en el suelo", "Estacionar siempre lo más próximo posible al borde del talud", "Elevar el cazo al máximo antes de accionar el freno", "Ninguna precaución adicional distinta de un terreno llano"], correcta: 0 },
  { enunciado: "¿Por qué debe evitarse estacionar en una zona de paso habitual de otros vehículos?", explicacion: "Incrementa el riesgo de colisión o atropello por quedar fuera del campo de visión habitual.", dificultad: "dificil", opciones: ["Incrementa el riesgo de colisión o atropello", "No existe ningún riesgo adicional en esa circunstancia", "Solo afecta a la comodidad del resto del personal de obra", "Solo es relevante si la obra se desarrolla de noche"], correcta: 0 },
]);

const S3 = "carga-materiales-alimentacion-tolvas-acopio";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una tolva, en el contexto de la alimentación de materiales con pala cargadora?", reverso: "Un recipiente o estructura con forma de embudo, situada en la parte superior de una máquina o instalación (por ejemplo, una planta de hormigón o de áridos), en la que se descarga el material desde el cazo de la pala cargadora para su procesamiento posterior" },
  { anverso: "¿Qué precaución debe adoptarse al alimentar una tolva con una pala cargadora?", reverso: "Aproximarse a la velocidad adecuada, elevar el cazo solo hasta la altura estrictamente necesaria para verter el material dentro de la boca de la tolva, y evitar golpear la propia estructura de la tolva con el cazo o con la máquina" },
  { anverso: "¿Qué es el acopio de materiales, en obra?", reverso: "La formación de montones o pilas ordenadas de material (tierra, áridos, escombro) en una zona determinada de la obra, destinados a su uso o retirada posterior, y que deben formarse respetando una altura y una pendiente de talud seguras según el tipo de material" },
  { anverso: "¿Qué precauciones deben adoptarse al formar un acopio de materiales con pala cargadora?", reverso: "No superar una altura excesiva que comprometa la estabilidad del propio montón, dejar una distancia de seguridad respecto a excavaciones, vallados o zonas de paso, y evitar que el acopio obstruya la visibilidad en puntos de circulación de la obra" },
  { anverso: "¿Por qué es importante coordinar el ritmo de carga de la pala cargadora con la capacidad de recepción de la tolva o del vehículo de transporte?", reverso: "Porque un ritmo de carga excesivo respecto a la capacidad de recepción puede provocar derrames de material, atascos en la tolva, o sobrecarga del vehículo, mientras que un ritmo insuficiente reduce el rendimiento global del proceso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una tolva, en el contexto de la alimentación de materiales?", explicacion: "Un recipiente en forma de embudo en el que se descarga material para su procesamiento posterior.", dificultad: "facil", opciones: ["Un recipiente en forma de embudo para recibir material", "Un tipo de cazo exclusivo de la pala cargadora", "Un accesorio exclusivo del sistema de frenado de la máquina", "Un tipo de vehículo de transporte de materiales"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al alimentar una tolva con pala cargadora?", explicacion: "Elevar el cazo solo hasta la altura necesaria y evitar golpear la estructura de la tolva.", dificultad: "media", opciones: ["Elevar el cazo solo lo necesario y evitar golpear la tolva", "Elevar siempre el cazo al máximo antes de aproximarse", "Aproximarse siempre a la máxima velocidad posible", "Ninguna precaución adicional distinta de la carga en camión"], correcta: 0 },
  { enunciado: "¿Qué es el acopio de materiales en obra?", explicacion: "La formación de montones ordenados de material en una zona determinada de la obra.", dificultad: "media", opciones: ["La formación de montones ordenados de material", "El transporte de material fuera de los límites de la obra", "La excavación inicial de una zanja o vaciado", "El vertido de material directamente en una tolva"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al formar un acopio de materiales?", explicacion: "No superar una altura excesiva y dejar distancia de seguridad respecto a excavaciones o vallados.", dificultad: "media", opciones: ["No superar una altura excesiva y respetar distancias de seguridad", "Formar siempre el acopio con la máxima altura posible", "Situar siempre el acopio junto al borde de una excavación", "Ninguna precaución adicional distinta del resto de la obra"], correcta: 0 },
  { enunciado: "¿Por qué es importante coordinar el ritmo de carga con la capacidad de recepción de la tolva o del vehículo?", explicacion: "Un ritmo excesivo provoca derrames o atascos; uno insuficiente reduce el rendimiento.", dificultad: "dificil", opciones: ["Un ritmo inadecuado provoca derrames, atascos o bajo rendimiento", "El ritmo de carga no influye en ningún caso en el resultado", "Solo es relevante si se trabaja con más de una máquina a la vez", "Solo afecta al consumo de combustible de la pala cargadora"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-225 creado y vinculado como Tema 13 de Oficial Conductor Maquinaria Pesada.");
