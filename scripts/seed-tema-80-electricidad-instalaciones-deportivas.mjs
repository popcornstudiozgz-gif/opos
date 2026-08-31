/**
 * Crea tema-80: "Electricidad aplicada a instalaciones deportivas" —
 * Tema 10 (numero=10, bloque-2) de Oficial Polivalente Instalaciones
 * Deportivas (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf):
 *   "Electricidad: básica aplicada al mantenimiento de instalaciones
 *   deportivas. Reglamento electrotécnico de baja tensión aplicable a
 *   piscinas. Seguridad ante el riesgo eléctrico."
 *
 * Fuente primaria: Real Decreto 842/2002, de 2 de agosto, Reglamento
 * electrotécnico para baja tensión (REBT, BOE-A-2002-18099) — ya
 * verificado en scripts/seed-tema-61-electricidad-basica-mantenimiento.mjs
 * de Oficial Mantenimiento General. En concreto, la ITC-BT-31
 * (instalaciones eléctricas en piscinas y fuentes) es la instrucción
 * técnica complementaria específica para el entorno acuático (volúmenes
 * de protección 0, 1 y 2 alrededor de la piscina, con restricciones
 * crecientes de proximidad al agua). Contenido de electricidad básica y
 * seguridad frente al riesgo eléctrico tratado como conocimiento técnico
 * consolidado, en línea con tema-61.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-80-electricidad-instalaciones-deportivas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-80";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";
const REBT = "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099";

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
  titulo: "Electricidad aplicada a instalaciones deportivas",
  descripcion: "Electricidad básica aplicada al mantenimiento de instalaciones deportivas. Reglamento electrotécnico de baja tensión (REBT) aplicable a piscinas. Seguridad ante el riesgo eléctrico.",
  contenido: "Desarrolla las magnitudes eléctricas básicas aplicadas al mantenimiento de instalaciones deportivas, las prescripciones especiales del Reglamento electrotécnico para baja tensión (REBT) aplicables a piscinas (ITC-BT-31) y las medidas de seguridad frente al riesgo eléctrico en entornos con presencia de agua.",
  enlaces_boe: [
    { url: REBT, titulo: "RD 842/2002 — Reglamento electrotécnico para baja tensión (REBT)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Electricidad básica aplicada al mantenimiento deportivo", seccion: "electricidad-basica-mantenimiento-deportivo", articulos: "Conceptos fundamentales" },
    { url: REBT, titulo: "REBT aplicable a piscinas", seccion: "rebt-aplicable-piscinas", articulos: "ITC-BT-31" },
    { url: "", titulo: "Seguridad ante el riesgo eléctrico en entornos acuáticos", seccion: "seguridad-riesgo-electrico-piscinas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "electricidad-basica-mantenimiento-deportivo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué magnitudes eléctricas básicas debe conocer el personal de mantenimiento de instalaciones deportivas?", reverso: "Tensión (voltio), intensidad (amperio), resistencia (ohmio) y potencia (vatio), junto con la ley de Ohm que las relaciona" },
  { anverso: "¿Qué elementos eléctricos son habituales en el mantenimiento de una instalación deportiva (más allá de la propia piscina)?", reverso: "Iluminación de pistas y vestuarios, cuadros eléctricos de bombas de depuración, sistemas de climatización, megafonía y sistemas de control de accesos" },
  { anverso: "¿Qué avería eléctrica es habitual en la iluminación de pistas deportivas exteriores?", reverso: "El fallo de los balastos o driver de las luminarias (especialmente en instalaciones antiguas de descarga), o el deterioro de conexiones expuestas a la intemperie" },
  { anverso: "¿Qué es un cuadro eléctrico secundario en una instalación deportiva y qué contiene?", reverso: "Un cuadro que distribuye la energía a una zona concreta del centro (por ejemplo, sala de bombas o vestuarios), con sus propios interruptores magnetotérmicos y diferenciales" },
  { anverso: "¿Por qué requiere especial atención el mantenimiento eléctrico en salas de bombas de depuración de piscinas?", reverso: "Porque combina motores eléctricos, humedad ambiental y proximidad al agua, lo que exige protecciones eléctricas reforzadas frente al riesgo de contacto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué magnitudes eléctricas básicas debe conocer el personal de mantenimiento deportivo?", explicacion: "Tensión, intensidad, resistencia y potencia.", dificultad: "facil", opciones: ["Tensión, intensidad, resistencia y potencia", "Solo la tensión de red", "Solo la potencia contratada", "Solo la resistencia de los cables"], correcta: 0 },
  { enunciado: "¿Qué elementos eléctricos son habituales en una instalación deportiva?", explicacion: "Iluminación, cuadros de bombas, climatización, megafonía y control de accesos.", dificultad: "media", opciones: ["Iluminación, cuadros de bombas y climatización", "Únicamente el alumbrado exterior", "Únicamente el sistema de megafonía", "Ningún elemento eléctrico relevante"], correcta: 0 },
  { enunciado: "¿Qué avería es habitual en la iluminación de pistas deportivas exteriores?", explicacion: "El fallo de balastos/driver o el deterioro de conexiones a la intemperie.", dificultad: "media", opciones: ["Fallo de balastos o conexiones deterioradas", "Fallo del sistema de megafonía", "Rotura de un panel solar", "Fallo del cuadro de control de accesos"], correcta: 0 },
  { enunciado: "¿Qué contiene un cuadro eléctrico secundario en una instalación deportiva?", explicacion: "Interruptores magnetotérmicos y diferenciales propios de una zona concreta.", dificultad: "media", opciones: ["Magnetotérmicos y diferenciales de una zona concreta", "Solo el contador general de energía", "Solo la toma de tierra general", "Solo el interruptor de control de potencia"], correcta: 0 },
  { enunciado: "¿Por qué requiere especial atención el mantenimiento eléctrico en salas de bombas de depuración?", explicacion: "Por la combinación de motores, humedad y proximidad al agua.", dificultad: "media", opciones: ["Por motores, humedad y proximidad al agua", "Porque no tienen ningún riesgo eléctrico real", "Porque no requieren cuadro eléctrico propio", "Porque solo funcionan con baterías"], correcta: 0 },
]);

const S2 = "rebt-aplicable-piscinas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria del REBT regula las instalaciones eléctricas en piscinas y fuentes?", reverso: "La ITC-BT-31" },
  { anverso: "¿Por qué las piscinas tienen una instrucción técnica específica dentro del REBT?", reverso: "Porque la presencia de agua y de personas con el cuerpo mojado (menor resistencia eléctrica de la piel) aumenta considerablemente el riesgo de electrocución, exigiendo medidas de protección reforzadas" },
  { anverso: "¿Qué son los 'volúmenes de protección' 0, 1 y 2 que define la ITC-BT-31 alrededor de una piscina?", reverso: "Zonas concéntricas alrededor del vaso de la piscina (volumen 0: el propio vaso; volumen 1: hasta 2 m del borde; volumen 2: hasta 1,5 m más allá del volumen 1) con restricciones decrecientes sobre los equipos eléctricos permitidos en cada una" },
  { anverso: "¿Qué tipo de equipos eléctricos suele permitirse en el volumen 0 (el vaso de la piscina) según la ITC-BT-31?", reverso: "Únicamente equipos específicamente diseñados para ir sumergidos, alimentados a muy baja tensión de seguridad" },
  { anverso: "¿Qué tensión de seguridad se emplea habitualmente para equipos eléctricos próximos al agua de una piscina (como luminarias sumergidas)?", reverso: "Muy baja tensión de seguridad (habitualmente 12 V), mediante transformadores de seguridad específicos, muy inferior a la tensión de red de 230 V" },
  { anverso: "¿Qué protección diferencial exige el REBT en los circuitos que alimentan equipos próximos a una piscina?", reverso: "Interruptores diferenciales de alta sensibilidad (30 mA), reforzando la protección frente a contactos indirectos en un entorno de mayor riesgo" },
  { anverso: "¿Deben estar las bases de enchufe y demás elementos eléctricos fijos alejados del volumen 1 y 2 de una piscina?", reverso: "Sí: el REBT restringe la instalación de tomas de corriente y cuadros eléctricos a una distancia mínima del vaso, fuera de los volúmenes de protección más restrictivos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué instrucción técnica del REBT regula las instalaciones eléctricas en piscinas?", explicacion: "La ITC-BT-31.", dificultad: "media", opciones: ["ITC-BT-31", "ITC-BT-25", "ITC-BT-24", "ITC-BT-52"], correcta: 0 },
  { enunciado: "¿Por qué las piscinas requieren una regulación eléctrica específica?", explicacion: "Porque el agua y la piel mojada aumentan el riesgo de electrocución.", dificultad: "media", opciones: ["Porque el agua y la piel mojada aumentan el riesgo eléctrico", "Porque no llevan ninguna instalación eléctrica", "Porque el REBT no se aplica a instalaciones deportivas", "Porque solo afecta a piscinas cubiertas"], correcta: 0 },
  { enunciado: "¿Qué son los 'volúmenes de protección' de la ITC-BT-31?", explicacion: "Zonas concéntricas alrededor de la piscina con restricciones decrecientes.", dificultad: "media", opciones: ["Zonas concéntricas con restricciones eléctricas decrecientes", "Los depósitos de almacenamiento de agua", "Los filtros de arena de sílice", "Los vestuarios del centro deportivo"], correcta: 0 },
  { enunciado: "¿Qué tipo de equipos se permiten en el volumen 0 (el propio vaso de la piscina)?", explicacion: "Solo equipos diseñados para ir sumergidos a muy baja tensión de seguridad.", dificultad: "dificil", opciones: ["Equipos para ir sumergidos a muy baja tensión", "Cualquier equipo eléctrico estándar de 230 V", "Bases de enchufe convencionales", "Cuadros eléctricos generales"], correcta: 0 },
  { enunciado: "¿Qué tensión de seguridad es habitual en luminarias sumergidas de piscina?", explicacion: "12 V, muy baja tensión de seguridad.", dificultad: "media", opciones: ["12 V", "230 V", "400 V", "24.000 V"], correcta: 0 },
  { enunciado: "¿Qué sensibilidad de diferencial exige el REBT en circuitos próximos a piscinas?", explicacion: "30 mA, alta sensibilidad.", dificultad: "media", opciones: ["30 mA", "300 mA", "3 A", "30 A"], correcta: 0 },
  { enunciado: "¿Qué restricción impone el REBT sobre las tomas de corriente cerca de una piscina?", explicacion: "Deben mantenerse fuera de los volúmenes de protección más restrictivos.", dificultad: "media", opciones: ["Deben estar fuera de los volúmenes de protección restrictivos", "Pueden instalarse justo en el borde del vaso", "No existe ninguna restricción de distancia", "Solo se restringe la iluminación, no las tomas"], correcta: 0 },
]);

const S3 = "seguridad-riesgo-electrico-piscinas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué aumenta el riesgo de electrocución cuando el cuerpo está mojado?", reverso: "Porque el agua reduce significativamente la resistencia eléctrica de la piel, facilitando el paso de corriente a través del cuerpo con intensidades mucho menores que en piel seca" },
  { anverso: "¿Qué debe hacer el personal de mantenimiento antes de manipular cualquier equipo eléctrico próximo a una piscina?", reverso: "Cortar la alimentación eléctrica del circuito correspondiente y verificar la ausencia de tensión antes de iniciar cualquier intervención" },
  { anverso: "¿Qué EPI es imprescindible para trabajos eléctricos en entornos húmedos como salas de bombas de piscina?", reverso: "Guantes aislantes adecuados a la tensión de trabajo, calzado aislante y herramienta con mango aislado" },
  { anverso: "¿Qué debe hacerse si se detecta un cable o equipo eléctrico deteriorado cerca del vaso de una piscina en uso?", reverso: "Desconectar la alimentación si es posible sin riesgo, señalizar la zona, impedir el acceso de personas usuarias, y avisar de inmediato al personal responsable o a electricista cualificado" },
  { anverso: "¿Por qué debe evacuarse el agua de una piscina o vaciarse antes de reparaciones eléctricas que impliquen equipos sumergidos?", reverso: "Para eliminar por completo el riesgo de contacto entre el agua, las personas y los componentes eléctricos manipulados durante la intervención" },
  { anverso: "¿Qué protocolo básico debe seguirse ante un accidente eléctrico (electrocución) en una instalación deportiva?", reverso: "Cortar la corriente antes de tocar a la persona afectada (nunca tocarla directamente mientras el circuito esté activo), avisar a los servicios de emergencia, y aplicar primeros auxilios si se tiene formación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué aumenta el riesgo de electrocución con el cuerpo mojado?", explicacion: "Porque el agua reduce la resistencia eléctrica de la piel.", dificultad: "media", opciones: ["El agua reduce la resistencia eléctrica de la piel", "El agua aumenta la resistencia eléctrica del cuerpo", "No existe relación entre agua y riesgo eléctrico", "Solo afecta a menores de edad"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse antes de manipular un equipo eléctrico próximo a una piscina?", explicacion: "Cortar la alimentación y verificar la ausencia de tensión.", dificultad: "facil", opciones: ["Cortar la alimentación y verificar ausencia de tensión", "Manipularlo directamente sin cortar la corriente", "Esperar a que se seque el ambiente únicamente", "No es necesaria ninguna precaución previa"], correcta: 0 },
  { enunciado: "¿Qué EPI es imprescindible en trabajos eléctricos en salas de bombas húmedas?", explicacion: "Guantes aislantes, calzado aislante y herramienta de mango aislado.", dificultad: "media", opciones: ["Guantes, calzado y herramienta aislantes", "Guantes de látex desechables únicamente", "Ninguna protección especial es necesaria", "Solo gafas de protección"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante un cable deteriorado cerca del vaso de una piscina en uso?", explicacion: "Desconectar si es seguro, señalizar, impedir el acceso y avisar.", dificultad: "media", opciones: ["Desconectar si es seguro, señalizar y avisar", "Ignorarlo hasta el cierre del centro", "Repararlo de inmediato sin cortar la corriente", "Permitir el uso normal de la piscina"], correcta: 0 },
  { enunciado: "¿Por qué se vacía una piscina antes de reparar equipos sumergidos?", explicacion: "Para eliminar el riesgo de contacto entre agua, personas y componentes eléctricos.", dificultad: "media", opciones: ["Para eliminar el riesgo de contacto eléctrico", "Porque lo exige exclusivamente la ISO 14001", "Para facilitar la limpieza del filtro de arena", "No es necesario vaciarla en ningún caso"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante una electrocución en una instalación deportiva?", explicacion: "Cortar la corriente antes de tocar a la persona afectada y avisar a emergencias.", dificultad: "media", opciones: ["Cortar la corriente antes de tocar a la persona", "Tocar y separar directamente a la persona del cable", "Esperar sin actuar a que llegue el personal técnico", "Aplicar agua sobre la zona afectada de inmediato"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-80 creado y vinculado como Tema 10 de Oficial Polivalente Instalaciones Deportivas.");
