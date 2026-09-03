/**
 * Crea tema-269: "Mecánica de vehículos a motor" — Tema 9 (numero=9,
 * bloque-2) de Oficial Conductor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea 1574):
 *   "Mecánica de vehículos a motor: Mantenimiento, tipos de motores,
 *   funcionamiento, partes del vehículo, conceptos generales."
 *
 * Sourcing: conocimiento técnico consolidado de mecánica del automóvil
 * orientado al conductor (no al mecánico especialista, ya cubierto con
 * mayor profundidad en tema-171 y siguientes de Oficial Mecánico), sin
 * ley única que lo regule como tal — mismo criterio ya aplicado en
 * Oficial Mecánico y en los temas 267/268 de esta misma oposición. Única
 * excepción real y verificada: la Inspección Técnica de Vehículos (ITV),
 * regulada por el Real Decreto 920/2017 (BOE-A-2017-12841), citada en la
 * sección de mantenimiento básico.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-269-mecanica-vehiculos-motor.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-269";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "Mecánica de vehículos a motor",
  descripcion: "Tipos de motores (gasolina, diésel, ciclos de 2 y 4 tiempos) y su funcionamiento general. Partes principales del vehículo. Mantenimiento básico que debe conocer un conductor profesional, incluida la Inspección Técnica de Vehículos (ITV).",
  contenido: "Desarrolla, desde la perspectiva de un conductor profesional (no de un mecánico especialista), los tipos de motores más habituales y su funcionamiento general (ciclos Otto y Diésel, motores de 2 y 4 tiempos), las partes principales que componen un vehículo y su función dentro del conjunto, y las tareas básicas de mantenimiento y comprobación que debe conocer y realizar un conductor antes y durante el uso del vehículo, incluida la Inspección Técnica de Vehículos (ITV) como control periódico obligatorio.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12841", titulo: "Real Decreto 920/2017, de 23 de octubre (Inspección Técnica de Vehículos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de motores y su funcionamiento", seccion: "tipos-de-motores-y-funcionamiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Partes principales del vehículo", seccion: "partes-principales-del-vehiculo", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12841", titulo: "Mantenimiento básico del conductor e ITV", seccion: "mantenimiento-basico-del-conductor-e-itv", articulos: "RD 920/2017" },
  ],
}]);

const S1 = "tipos-de-motores-y-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la diferencia fundamental entre un motor de gasolina y uno diésel en cuanto a su encendido?", reverso: "El motor de gasolina utiliza una bujía para provocar el encendido de la mezcla aire-combustible mediante una chispa eléctrica; el motor diésel no lleva bujía de encendido y provoca la combustión únicamente por la elevada temperatura que alcanza el aire al comprimirlo, sin necesidad de chispa" },
  { anverso: "¿Qué es un motor de cuatro tiempos?", reverso: "Un motor cuyo ciclo de funcionamiento completo se realiza en cuatro carreras del pistón (admisión, compresión, explosión y escape), correspondientes a dos vueltas completas del cigüeñal, siendo el tipo de motor más habitual en automóviles" },
  { anverso: "¿En qué consiste la carrera de admisión del ciclo de cuatro tiempos?", reverso: "El pistón desciende dentro del cilindro mientras la válvula de admisión permanece abierta, permitiendo la entrada de la mezcla aire-combustible (o solo aire, en motores diésel) al interior del cilindro" },
  { anverso: "¿En qué consiste la carrera de compresión del ciclo de cuatro tiempos?", reverso: "El pistón asciende con ambas válvulas cerradas, comprimiendo la mezcla o el aire admitido, lo que en el motor diésel eleva su temperatura hasta el punto de autoinflamación al inyectarse el combustible" },
  { anverso: "¿Qué diferencia principal existe entre un motor de dos tiempos y uno de cuatro tiempos?", reverso: "El motor de dos tiempos completa su ciclo de funcionamiento en solo dos carreras del pistón (una vuelta de cigüeñal), combinando admisión/compresión en una carrera y explosión/escape en la otra, frente a las cuatro carreras del motor de cuatro tiempos; es menos habitual en automóviles y más frecuente en maquinaria pequeña o motocicletas antiguas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué diferencia fundamental existe entre un motor de gasolina y uno diésel en cuanto a su encendido?", explicacion: "El de gasolina usa bujía; el diésel se autoinflama por la compresión, sin bujía.", dificultad: "facil", opciones: ["El de gasolina usa bujía; el diésel se autoinflama por compresión", "Ambos motores utilizan exactamente el mismo sistema de encendido", "El diésel utiliza bujía y el de gasolina se autoinflama por compresión", "Ninguno de los dos tipos de motor requiere ningún sistema de encendido"], correcta: 0 },
  { enunciado: "¿Qué es un motor de cuatro tiempos?", explicacion: "Un motor cuyo ciclo se completa en cuatro carreras del pistón: admisión, compresión, explosión y escape.", dificultad: "media", opciones: ["Un motor cuyo ciclo se completa en cuatro carreras del pistón", "Un motor cuyo ciclo se completa en una única carrera del pistón", "Un motor que carece por completo de carrera de compresión", "Un motor exclusivo de vehículos eléctricos sin combustión interna"], correcta: 0 },
  { enunciado: "¿Qué ocurre durante la carrera de admisión del ciclo de cuatro tiempos?", explicacion: "El pistón desciende con la válvula de admisión abierta, entrando la mezcla o el aire.", dificultad: "media", opciones: ["El pistón desciende y entra la mezcla o el aire al cilindro", "El pistón asciende comprimiendo la mezcla ya admitida en el cilindro", "Se produce la explosión de la mezcla dentro del cilindro del motor", "Los gases quemados salen del cilindro por la válvula de escape"], correcta: 0 },
  { enunciado: "¿Qué ocurre durante la carrera de compresión del ciclo de cuatro tiempos?", explicacion: "El pistón asciende con las válvulas cerradas, comprimiendo la mezcla o el aire.", dificultad: "media", opciones: ["El pistón asciende con las válvulas cerradas, comprimiendo la mezcla", "El pistón desciende permitiendo la entrada de la mezcla al cilindro", "Se abre la válvula de escape para expulsar los gases quemados", "El pistón permanece inmóvil durante toda la carrera de compresión"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre un motor de dos tiempos y uno de cuatro tiempos?", explicacion: "El de dos tiempos completa su ciclo en dos carreras (una vuelta de cigüeñal), frente a las cuatro del otro.", dificultad: "dificil", opciones: ["El de dos tiempos completa su ciclo en solo dos carreras del pistón", "El de dos tiempos completa su ciclo en ocho carreras del pistón", "Ambos tipos de motor completan su ciclo en el mismo número de carreras", "El motor de dos tiempos no requiere ninguna carrera de compresión"], correcta: 0 },
]);

const S2 = "partes-principales-del-vehiculo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple la transmisión de un vehículo?", reverso: "Trasladar la energía mecánica generada por el motor hasta las ruedas, adaptando el par y la velocidad de giro mediante la caja de cambios, el embrague (o convertidor de par) y el sistema de transmisión final" },
  { anverso: "¿Qué es el sistema de suspensión de un vehículo?", reverso: "El conjunto de elementos (muelles, amortiguadores, brazos) que absorbe las irregularidades del terreno, mantiene el contacto de las ruedas con el suelo y proporciona confort y estabilidad durante la marcha" },
  { anverso: "¿Qué función cumple el sistema de dirección?", reverso: "Permitir al conductor orientar las ruedas delanteras (habitualmente) para controlar la trayectoria del vehículo, transmitiendo el movimiento del volante hasta las ruedas mediante la cremallera o el mecanismo de dirección correspondiente" },
  { anverso: "¿Qué diferencia existe entre el chasis y la carrocería de un vehículo?", reverso: "El chasis es la estructura portante que soporta el motor, la transmisión y los mecanismos del vehículo; la carrocería es el recubrimiento exterior que aloja a los ocupantes y la carga, pudiendo ser independiente del chasis o formar con él una única estructura autoportante" },
  { anverso: "¿Qué función cumple el sistema de frenos de un vehículo?", reverso: "Reducir la velocidad del vehículo o detenerlo por completo, transformando la energía cinética en calor mediante el rozamiento entre las pastillas o zapatas y los discos o tambores de freno" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple la transmisión de un vehículo?", explicacion: "Trasladar la energía del motor a las ruedas, adaptando par y velocidad de giro.", dificultad: "facil", opciones: ["Trasladar la energía del motor a las ruedas", "Absorber las irregularidades del terreno durante la marcha", "Orientar las ruedas delanteras para controlar la trayectoria", "Reducir la velocidad del vehículo hasta detenerlo por completo"], correcta: 0 },
  { enunciado: "¿Qué es el sistema de suspensión de un vehículo?", explicacion: "El conjunto que absorbe irregularidades del terreno y proporciona confort y estabilidad.", dificultad: "media", opciones: ["El conjunto que absorbe irregularidades del terreno", "El conjunto que traslada la energía del motor a las ruedas", "El conjunto que orienta las ruedas delanteras del vehículo", "El conjunto que transforma energía cinética en calor al frenar"], correcta: 0 },
  { enunciado: "¿Qué función cumple el sistema de dirección?", explicacion: "Permitir orientar las ruedas para controlar la trayectoria del vehículo.", dificultad: "media", opciones: ["Permitir orientar las ruedas para controlar la trayectoria", "Absorber las irregularidades del terreno durante la marcha", "Trasladar la energía del motor hasta las ruedas del vehículo", "Reducir la velocidad del vehículo hasta detenerlo por completo"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre el chasis y la carrocería de un vehículo?", explicacion: "El chasis es la estructura portante; la carrocería es el recubrimiento exterior.", dificultad: "media", opciones: ["El chasis es la estructura portante; la carrocería, el recubrimiento", "Ambos términos designan exactamente el mismo elemento del vehículo", "La carrocería es la estructura portante y el chasis el recubrimiento", "El chasis solo existe en vehículos eléctricos, nunca en los de combustión"], correcta: 0 },
  { enunciado: "¿Qué función cumple el sistema de frenos de un vehículo?", explicacion: "Reducir la velocidad o detener el vehículo transformando energía cinética en calor.", dificultad: "dificil", opciones: ["Reducir la velocidad transformando energía cinética en calor", "Trasladar la energía del motor hasta las ruedas del vehículo", "Absorber las irregularidades del terreno durante la marcha", "Orientar las ruedas delanteras para controlar la trayectoria"], correcta: 0 },
]);

const S3 = "mantenimiento-basico-del-conductor-e-itv";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué comprobaciones básicas de mantenimiento debería realizar un conductor profesional antes de iniciar un servicio?", reverso: "El nivel de aceite del motor, el nivel de líquido refrigerante, la presión y el estado de los neumáticos, el funcionamiento de las luces, y el nivel de líquido de frenos y de limpiaparabrisas, entre otras comprobaciones visuales básicas" },
  { anverso: "¿Por qué es importante comprobar periódicamente la presión de los neumáticos?", reverso: "Porque una presión inadecuada (por defecto o por exceso) afecta a la adherencia, la distancia de frenado, el desgaste del neumático y el consumo de combustible del vehículo" },
  { anverso: "¿Qué es la Inspección Técnica de Vehículos (ITV)?", reverso: "Un control técnico periódico y obligatorio, regulado por el Real Decreto 920/2017, que verifica que el vehículo cumple las condiciones técnicas y de seguridad exigidas para poder circular, revisando frenos, luces, emisiones, neumáticos y otros elementos" },
  { anverso: "¿Qué consecuencia tiene circular con la ITV caducada o desfavorable?", reverso: "Constituye una infracción administrativa que puede ser sancionada, y en el caso de un resultado desfavorable no subsanado, puede implicar la inmovilización del vehículo hasta que se corrija el defecto detectado" },
  { anverso: "¿Con qué periodicidad general debe pasar la ITV un turismo, según la normativa española?", reverso: "Con carácter general, cada dos años entre el cuarto y el décimo año desde su primera matriculación, y anualmente a partir del décimo año, aunque la periodicidad exacta puede variar según el tipo concreto de vehículo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué comprobaciones básicas debería realizar un conductor profesional antes de un servicio?", explicacion: "Nivel de aceite, refrigerante, presión de neumáticos, luces, líquido de frenos.", dificultad: "facil", opciones: ["Nivel de aceite, refrigerante, presión de neumáticos y luces", "Ninguna comprobación es necesaria si el vehículo pasó la ITV recientemente", "Únicamente el nivel de combustible, sin ninguna otra comprobación", "Únicamente el estado de la carrocería exterior del vehículo"], correcta: 0 },
  { enunciado: "¿Por qué es importante comprobar periódicamente la presión de los neumáticos?", explicacion: "Afecta a adherencia, frenado, desgaste y consumo del vehículo.", dificultad: "media", opciones: ["Afecta a la adherencia, el frenado, el desgaste y el consumo", "No tiene ninguna relación real con la seguridad del vehículo", "Solo afecta al confort de los ocupantes, sin relación con la seguridad", "Solo es relevante en vehículos eléctricos, nunca en los de combustión"], correcta: 0 },
  { enunciado: "¿Qué es la Inspección Técnica de Vehículos (ITV)?", explicacion: "Un control técnico periódico obligatorio regulado por el RD 920/2017.", dificultad: "media", opciones: ["Un control técnico periódico obligatorio regulado por el RD 920/2017", "Un trámite voluntario sin ninguna consecuencia legal para el vehículo", "Un examen exclusivo para la obtención del permiso de conducción", "Un seguro obligatorio de responsabilidad civil del vehículo"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene circular con la ITV caducada o desfavorable no subsanada?", explicacion: "Es una infracción sancionable y puede implicar la inmovilización del vehículo.", dificultad: "media", opciones: ["Es una infracción sancionable que puede implicar la inmovilización", "No tiene ninguna consecuencia legal si el vehículo circula con normalidad", "Únicamente genera una advertencia verbal sin ninguna sanción económica", "Solo afecta a la validez del seguro, sin ninguna sanción administrativa"], correcta: 0 },
  { enunciado: "¿Con qué periodicidad general debe pasar la ITV un turismo entre el cuarto y el décimo año?", explicacion: "Cada dos años, con carácter general.", dificultad: "dificil", opciones: ["Cada dos años, con carácter general", "Cada seis meses, con carácter general", "Una única vez, sin ninguna renovación posterior necesaria", "Cada cinco años, con carácter general"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Ciclo Otto", definicion: "Ciclo termodinámico teórico en el que se basa el funcionamiento del motor de gasolina de cuatro tiempos, con encendido provocado mediante bujía." },
  { tema_slug: TEMA, seccion: S1, termino: "Autoinflamación", definicion: "Encendido de la mezcla de aire y combustible provocado únicamente por la elevada temperatura alcanzada al comprimirla, sin necesidad de chispa eléctrica, característico del motor diésel." },
  { tema_slug: TEMA, seccion: S2, termino: "Carrocería autoportante", definicion: "Tipo de carrocería que integra en su propia estructura la función portante del chasis, sin necesidad de un bastidor independiente." },
  { tema_slug: TEMA, seccion: S2, termino: "Par motor", definicion: "Fuerza de giro que genera el motor sobre el cigüeñal, que la transmisión traslada y adapta hasta las ruedas del vehículo." },
  { tema_slug: TEMA, seccion: S3, termino: "ITV", definicion: "Inspección Técnica de Vehículos: control técnico periódico y obligatorio, regulado por el RD 920/2017, que verifica el cumplimiento de las condiciones técnicas y de seguridad exigidas para circular." },
  { tema_slug: TEMA, seccion: S3, termino: "Distancia de frenado", definicion: "Espacio recorrido por el vehículo desde que se acciona el freno hasta su detención completa, que depende, entre otros factores, del estado de los neumáticos y del propio sistema de frenos." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-269 creado y vinculado como Tema 9 de Oficial Conductor General.");
