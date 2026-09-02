/**
 * Crea tema-151: "Averías y mantenimiento de instalaciones eléctricas" —
 * Tema 19 (numero=19, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea 1364):
 *   "Averías y Mantenimiento de Instalaciones Eléctricas. Mantenimiento
 *   preventivo, correctivo y predictivo. Técnicas de localización de
 *   averías comunes: cortocircuitos, derivaciones a tierra, sobrecargas y
 *   falsos contactos. Instrumentos de medida: polímetro (multímetro),
 *   pinza amperimétrica y medidor de aislamiento."
 *
 * Contenido técnico consolidado de mantenimiento eléctrico (tipos de
 * mantenimiento, técnicas de diagnóstico, instrumentos de medida), sin
 * una ley española única que lo regule como tal. Se complementa con dos
 * referencias normativas ya verificadas en temas anteriores de esta
 * misma oposición: la ITC-BT-05 del REBT (verificaciones e inspecciones
 * periódicas) y el Real Decreto 614/2001 (seguridad en los trabajos sin
 * tensión, de aplicación a cualquier intervención de mantenimiento o
 * reparación sobre una instalación eléctrica).
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT), ITC-BT-05 —
 * BOE-A-2002-18099; Real Decreto 614/2001 — BOE-A-2001-11881.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-151-averias-mantenimiento-instalaciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-151";
const OPOSICION = "oficial-electricista-ayto-zaragoza";
const BLOQUE_2_ID = "4dbd9335-cb26-48e5-a83b-aef9eeb23097";

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
  titulo: "Averías y mantenimiento de instalaciones eléctricas",
  descripcion: "Mantenimiento preventivo, correctivo y predictivo. Técnicas de localización de averías comunes: cortocircuitos, derivaciones a tierra, sobrecargas y falsos contactos. Instrumentos de medida: polímetro (multímetro), pinza amperimétrica y medidor de aislamiento.",
  contenido: "Desarrolla los tipos de mantenimiento de una instalación eléctrica (preventivo, correctivo y predictivo), las técnicas de localización de las averías más comunes (cortocircuitos, derivaciones a tierra, sobrecargas y falsos contactos), y los instrumentos de medida básicos empleados en el diagnóstico: el polímetro o multímetro, la pinza amperimétrica y el medidor de aislamiento, complementado con las prescripciones de la ITC-BT-05 sobre verificaciones e inspecciones y del Real Decreto 614/2001 sobre seguridad en los trabajos eléctricos.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-05)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
    { titulo: "Real Decreto 614/2001, disposiciones mínimas de protección frente al riesgo eléctrico", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881" },
  ],
  indice_estudio: [
    { url: "", titulo: "Mantenimiento preventivo, correctivo y predictivo", seccion: "mantenimiento-preventivo-correctivo-predictivo", articulos: "Conceptos fundamentales; ITC-BT-05" },
    { url: "", titulo: "Técnicas de localización de averías comunes", seccion: "tecnicas-localizacion-averias-comunes", articulos: "Conceptos fundamentales; RD 614/2001" },
    { url: "", titulo: "Instrumentos de medida: polímetro, pinza amperimétrica y medidor de aislamiento", seccion: "instrumentos-medida-polimetro-pinza-medidor-aislamiento", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "mantenimiento-preventivo-correctivo-predictivo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el mantenimiento preventivo de una instalación eléctrica?", reverso: "El conjunto de operaciones programadas y periódicas (revisiones, limpieza, comprobaciones, sustitución de elementos con vida útil limitada) realizadas para reducir la probabilidad de que se produzca una avería, antes de que esta llegue a manifestarse" },
  { anverso: "¿Qué es el mantenimiento correctivo de una instalación eléctrica?", reverso: "El conjunto de operaciones realizadas para reparar una avería ya producida, restableciendo el funcionamiento normal de la instalación tras detectarse el fallo" },
  { anverso: "¿Qué es el mantenimiento predictivo de una instalación eléctrica?", reverso: "El mantenimiento basado en el seguimiento de parámetros medibles (temperatura, vibración, resistencia de aislamiento) para anticipar el momento en que un elemento previsiblemente fallará, permitiendo intervenir antes de que se produzca la avería" },
  { anverso: "¿Qué ventaja aporta el mantenimiento predictivo frente al preventivo puramente programado por calendario?", reverso: "Permite intervenir según el estado real del elemento (evidenciado por los parámetros medidos), evitando tanto sustituciones innecesarias de elementos aún en buen estado como averías no detectadas a tiempo por un simple calendario fijo" },
  { anverso: "¿Qué instrucción técnica complementaria del REBT regula las verificaciones e inspecciones periódicas de determinadas instalaciones de baja tensión?", reverso: "La ITC-BT-05" },
  { anverso: "¿Qué documentación es recomendable llevar de las operaciones de mantenimiento realizadas sobre una instalación eléctrica?", reverso: "Un registro o historial de mantenimiento, con la fecha, el tipo de operación realizada, las incidencias detectadas y las medidas correctoras aplicadas, útil tanto para el seguimiento técnico como para acreditar el cumplimiento de las revisiones exigibles" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el mantenimiento preventivo de una instalación eléctrica?", explicacion: "Operaciones programadas para reducir la probabilidad de avería antes de que se produzca.", dificultad: "facil", opciones: ["Operaciones programadas para reducir la probabilidad de avería", "Operaciones realizadas únicamente tras producirse una avería", "Operaciones basadas exclusivamente en la medida de vibraciones", "Operaciones exclusivas de instalaciones de alta tensión"], correcta: 0 },
  { enunciado: "¿Qué es el mantenimiento correctivo de una instalación eléctrica?", explicacion: "Operaciones para reparar una avería ya producida.", dificultad: "facil", opciones: ["Operaciones para reparar una avería ya producida", "Operaciones programadas antes de que exista ninguna avería", "Operaciones basadas en el seguimiento de parámetros medibles", "Operaciones exclusivas de la fase de diseño de la instalación"], correcta: 0 },
  { enunciado: "¿Qué es el mantenimiento predictivo de una instalación eléctrica?", explicacion: "Se basa en el seguimiento de parámetros medibles para anticipar un fallo.", dificultad: "media", opciones: ["Se basa en el seguimiento de parámetros medibles para anticipar un fallo", "Se basa exclusivamente en un calendario fijo de revisiones periódicas", "Se realiza únicamente tras producirse una avería grave", "Consiste en sustituir toda la instalación de forma preventiva cada año"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula las verificaciones e inspecciones periódicas de baja tensión?", explicacion: "La ITC-BT-05.", dificultad: "media", opciones: ["La ITC-BT-05", "La ITC-BT-18", "La ITC-BT-47", "La ITC-BT-24"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el mantenimiento predictivo frente al preventivo programado por calendario?", explicacion: "Permite intervenir según el estado real del elemento, evitando sustituciones innecesarias.", dificultad: "dificil", opciones: ["Permite intervenir según el estado real del elemento", "Elimina por completo la necesidad de cualquier revisión periódica", "Sustituye por completo al mantenimiento correctivo en cualquier caso", "Solo es aplicable a instalaciones de corriente continua"], correcta: 0 },
]);

const S2 = "tecnicas-localizacion-averias-comunes";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cortocircuito en una instalación eléctrica?", reverso: "El contacto directo, de muy baja resistencia, entre dos conductores a distinto potencial (por ejemplo, fase y neutro, o dos fases entre sí), que provoca una intensidad muy elevada y la actuación inmediata de las protecciones" },
  { anverso: "¿Qué es una derivación a tierra (o defecto de aislamiento a tierra)?", reverso: "El contacto, de resistencia variable, entre un conductor activo y una parte puesta a tierra (una masa metálica o el propio terreno), que provoca una corriente de fuga detectable por el interruptor diferencial" },
  { anverso: "¿Qué técnica básica emplea el electricista para localizar un cortocircuito en un circuito extenso con varias derivaciones?", reverso: "La división del circuito en tramos (por ejemplo, desconectando ramas sucesivas) hasta aislar el tramo concreto en el que se mantiene el cortocircuito, reduciendo progresivamente la zona de búsqueda" },
  { anverso: "¿Qué es una sobrecarga en un circuito eléctrico?", reverso: "Una intensidad superior a la nominal del circuito, mantenida en el tiempo, que puede producirse por conectar más receptores de los previstos originalmente o por el mal funcionamiento de alguno de ellos" },
  { anverso: "¿Qué es un falso contacto?", reverso: "Una conexión eléctrica deficiente entre dos elementos (por ejemplo, un borne mal apretado o un conector oxidado), que provoca una resistencia de contacto anómala, con calentamiento localizado y funcionamiento intermitente del circuito afectado" },
  { anverso: "¿Qué síntoma habitual permite sospechar un falso contacto en una instalación?", reverso: "Un funcionamiento intermitente de un receptor (que se enciende y apaga sin motivo aparente al mover o vibrar la instalación), o un calentamiento localizado detectable al tacto o mediante cámara termográfica en un punto concreto del circuito" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un cortocircuito en una instalación eléctrica?", explicacion: "El contacto directo de baja resistencia entre dos conductores a distinto potencial.", dificultad: "facil", opciones: ["El contacto directo de baja resistencia entre dos conductores a distinto potencial", "Una corriente de fuga hacia tierra de pequeño valor", "Una sobretensión transitoria de origen atmosférico", "Un falso contacto en un borne mal apretado"], correcta: 0 },
  { enunciado: "¿Qué es una derivación a tierra o defecto de aislamiento a tierra?", explicacion: "El contacto entre un conductor activo y una parte puesta a tierra, detectable por el diferencial.", dificultad: "media", opciones: ["El contacto entre un conductor activo y una parte puesta a tierra", "El contacto directo entre dos conductores de fase distintos", "Una intensidad superior a la nominal mantenida en el tiempo", "Una conexión deficiente entre dos bornes de un circuito"], correcta: 0 },
  { enunciado: "¿Qué técnica básica se emplea para localizar un cortocircuito en un circuito extenso con varias derivaciones?", explicacion: "La división del circuito en tramos, aislando progresivamente la zona de búsqueda.", dificultad: "media", opciones: ["La división del circuito en tramos", "El aumento de la tensión de la instalación", "La sustitución completa del cableado sin diagnóstico previo", "La eliminación de todas las protecciones del circuito"], correcta: 0 },
  { enunciado: "¿Qué es una sobrecarga en un circuito eléctrico?", explicacion: "Una intensidad superior a la nominal, mantenida en el tiempo.", dificultad: "facil", opciones: ["Una intensidad superior a la nominal, mantenida en el tiempo", "Una elevación breve de la tensión de origen atmosférico", "Una conexión deficiente entre dos bornes de un circuito", "Una corriente de fuga hacia tierra de pequeño valor"], correcta: 0 },
  { enunciado: "¿Qué síntoma habitual permite sospechar un falso contacto en una instalación?", explicacion: "Funcionamiento intermitente y calentamiento localizado.", dificultad: "media", opciones: ["Funcionamiento intermitente y calentamiento localizado", "Un disparo inmediato y permanente del Interruptor General Automático", "Una elevación generalizada de la tensión de toda la instalación", "Un aumento constante de la frecuencia de la red eléctrica"], correcta: 0 },
]);

const S3 = "instrumentos-medida-polimetro-pinza-medidor-aislamiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un polímetro o multímetro?", reverso: "Un instrumento de medida que integra varias funciones (voltímetro, amperímetro, óhmetro, comprobación de continuidad, y en muchos modelos otras funciones adicionales), empleado como herramienta básica de diagnóstico eléctrico" },
  { anverso: "¿Qué magnitudes básicas puede medir un polímetro?", reverso: "Tensión (en corriente continua y alterna), intensidad, resistencia y continuidad de un circuito, entre otras funciones según el modelo" },
  { anverso: "¿Qué es una pinza amperimétrica?", reverso: "Un instrumento que mide la intensidad que circula por un conductor sin necesidad de interrumpir el circuito, mediante la detección del campo magnético generado por dicha corriente al abrazar el conductor con sus mordazas" },
  { anverso: "¿Qué ventaja aporta la pinza amperimétrica frente a la medida de intensidad con un polímetro convencional?", reverso: "Permite medir la intensidad sin interrumpir el circuito ni tener que insertar el instrumento en serie, agilizando y haciendo más segura la medida en instalaciones en funcionamiento" },
  { anverso: "¿Qué es un medidor de aislamiento (megóhmetro)?", reverso: "Un instrumento que aplica una tensión continua elevada (habitualmente 250, 500 o 1.000 V, según el nivel de tensión de la instalación) entre un conductor y tierra, o entre conductores, para medir la resistencia de aislamiento y detectar posibles fallos o degradación del aislamiento" },
  { anverso: "¿Por qué debe realizarse la medida con el medidor de aislamiento sobre una instalación sin tensión y desconectada de los receptores?", reverso: "Porque la tensión elevada aplicada por el propio instrumento podría dañar receptores electrónicos sensibles, y porque la medida debe realizarse en ausencia de la tensión normal de servicio para obtener un resultado fiable del aislamiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un polímetro o multímetro?", explicacion: "Un instrumento que integra varias funciones de medida eléctrica.", dificultad: "facil", opciones: ["Un instrumento que integra varias funciones de medida eléctrica", "Un instrumento exclusivo para medir la resistencia de tierra", "Un instrumento exclusivo para medir el nivel de iluminancia", "Un instrumento exclusivo para medir la temperatura de un conductor"], correcta: 0 },
  { enunciado: "¿Qué magnitudes básicas puede medir un polímetro?", explicacion: "Tensión, intensidad, resistencia y continuidad, entre otras.", dificultad: "media", opciones: ["Tensión, intensidad, resistencia y continuidad", "Únicamente la resistencia de tierra de la instalación", "Únicamente el nivel de iluminancia de una estancia", "Únicamente la temperatura de color de una luminaria"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece una pinza amperimétrica frente a un polímetro convencional para medir intensidad?", explicacion: "Mide sin necesidad de interrumpir el circuito.", dificultad: "media", opciones: ["Mide sin necesidad de interrumpir el circuito", "Solo puede emplearse en circuitos de corriente continua", "Sustituye por completo a la necesidad de un polímetro", "Solo puede emplearse para medir tensión, nunca intensidad"], correcta: 0 },
  { enunciado: "¿Qué mide un medidor de aislamiento o megóhmetro?", explicacion: "La resistencia de aislamiento entre un conductor y tierra, o entre conductores.", dificultad: "media", opciones: ["La resistencia de aislamiento entre un conductor y tierra", "La intensidad instantánea consumida por un receptor", "El nivel de iluminancia de un puesto de trabajo", "La temperatura de color de una luminaria LED"], correcta: 0 },
  { enunciado: "¿Por qué debe realizarse la medida con el medidor de aislamiento sobre una instalación sin tensión y desconectada de los receptores?", explicacion: "Porque la tensión elevada aplicada podría dañar receptores sensibles y falsear la medida.", dificultad: "dificil", opciones: ["Porque la tensión elevada aplicada podría dañar receptores sensibles", "Porque el instrumento solo funciona correctamente con tensión de red presente", "Porque de lo contrario el instrumento no ofrecería ninguna lectura", "Porque la normativa lo prohíbe únicamente en instalaciones de vivienda"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-151 creado y vinculado como Tema 19 de Oficial Electricista.");
