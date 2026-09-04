/**
 * Crea tema-286: "Elementos de las instalaciones: válvulas, grifería y
 * contadores" — Tema 10 (numero=10, bloque-2) de Oficial Fontanero (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases1716.pdf, línea 523):
 * "Elementos de las instalaciones. Tuberías y accesorios, válvulas y
 * dispositivos de control, grifería sanitaria, fluxores, contadores,
 * aljibes, desagües, ventosas."
 *
 * Sourcing: normas UNE-EN de elementos de red ya verificadas en Oficial
 * Guardallaves (misma tipología de elementos que gestiona la red municipal
 * de abastecimiento) — UNE-EN 1074 (válvulas para el suministro de agua),
 * UNE-EN 1074-4 (ventosas), RD 244/2016 (control metrológico de
 * contadores de agua) — reutilizadas sin nueva búsqueda por tratarse de la
 * misma normativa técnica. Tipos de grifería sanitaria: conocimiento
 * técnico consolidado del oficio, verificado con búsqueda previa.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-286-elementos-instalaciones-valvulas-griferia.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-286";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Elementos de las instalaciones: válvulas, grifería y contadores",
  descripcion: "Tipos de válvulas y dispositivos de control (compuerta, esfera, mariposa, retención) según UNE-EN 1074. Grifería sanitaria y fluxores. Contadores de agua y su control metrológico (RD 244/2016). Aljibes, desagües y ventosas (UNE-EN 1074-4).",
  contenido: "Desarrolla los elementos que componen una instalación de fontanería, más allá de las propias tuberías: los distintos tipos de válvulas y dispositivos de control de la red (compuerta, esfera, mariposa, retención), la grifería sanitaria y los fluxores como puntos de consumo, los contadores de agua y su régimen de control metrológico, y otros elementos singulares como los aljibes, los desagües y las ventosas.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2016-4266", titulo: "Real Decreto 244/2016, de 3 de junio, por el que se desarrolla la Ley 32/2014, de Metrología, en lo relativo a los instrumentos de medida" },
  ],
  indice_estudio: [
    { url: "", titulo: "Válvulas y dispositivos de control", seccion: "valvulas-y-dispositivos-de-control", articulos: "UNE-EN 1074" },
    { url: "", titulo: "Grifería sanitaria y fluxores", seccion: "griferia-sanitaria-y-fluxores", articulos: "Conocimiento técnico del oficio" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2016-4266", titulo: "Contadores, aljibes, desagües y ventosas", seccion: "contadores-aljibes-desagues-y-ventosas", articulos: "RD 244/2016; UNE-EN 1074-4" },
  ],
}]);

const S1 = "valvulas-y-dispositivos-de-control";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una válvula de compuerta y para qué se emplea principalmente?", reverso: "Una válvula cuyo elemento de cierre (una compuerta) se desplaza perpendicularmente al flujo; se emplea sobre todo para corte total (todo/nada) del paso de agua, no para regular caudal de forma precisa" },
  { anverso: "¿Qué es una válvula de esfera y qué ventaja tiene frente a otras válvulas de corte?", reverso: "Una válvula cuyo elemento de cierre es una esfera perforada que gira 90º entre abierto y cerrado; permite un cierre rápido y una pérdida de carga mínima cuando está totalmente abierta" },
  { anverso: "¿Qué es una válvula de mariposa?", reverso: "Una válvula cuyo elemento de cierre es un disco que gira sobre un eje transversal al flujo; se usa tanto para corte como para regulación de caudal, y es habitual en diámetros grandes por su tamaño compacto" },
  { anverso: "¿Qué función cumple una válvula de retención (o antirretorno)?", reverso: "Permitir el paso del agua en un único sentido e impedir su retorno, protegiendo así la instalación aguas arriba de reflujos" },
  { anverso: "¿Qué norma europea regula los requisitos generales de las válvulas empleadas en el suministro de agua?", reverso: "La UNE-EN 1074, que establece los requisitos generales de las válvulas para el suministro de agua y sus ensayos de idoneidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Para qué se emplea principalmente una válvula de compuerta?", explicacion: "Para corte total (todo/nada), no para regular caudal con precisión.", dificultad: "facil", opciones: ["Para el corte total (todo/nada) del paso de agua", "Exclusivamente para regular con precisión el caudal de la instalación", "Exclusivamente para medir el caudal que circula por la tubería", "Exclusivamente para amortiguar el golpe de ariete de la instalación"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una válvula de esfera frente a otras válvulas de corte?", explicacion: "Cierre rápido (giro de 90º) y pérdida de carga mínima abierta.", dificultad: "media", opciones: ["Un cierre rápido mediante giro de 90º y una pérdida de carga mínima estando abierta", "Un cierre exclusivamente progresivo, nunca rápido, mediante varias vueltas completas", "La imposibilidad de emplearse en ningún tipo de instalación de agua fría", "La necesidad de una fuente de alimentación eléctrica para poder accionarse"], correcta: 0 },
  { enunciado: "¿Qué elemento de cierre caracteriza a una válvula de mariposa?", explicacion: "Un disco que gira sobre un eje transversal al flujo.", dificultad: "media", opciones: ["Un disco que gira sobre un eje transversal al flujo", "Una esfera perforada que gira 90º entre abierto y cerrado", "Una compuerta que se desplaza perpendicularmente al flujo", "Un muelle que se comprime para permitir el paso del agua"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula de retención o antirretorno?", explicacion: "Permite el paso del agua en un único sentido, impidiendo su retorno.", dificultad: "facil", opciones: ["Permitir el paso del agua en un único sentido, impidiendo su retorno", "Regular con precisión la temperatura del agua caliente sanitaria", "Medir el caudal exacto de agua que circula por la instalación", "Amortiguar exclusivamente las vibraciones de un grupo de presión"], correcta: 0 },
  { enunciado: "¿Qué norma establece los requisitos generales de las válvulas para el suministro de agua?", explicacion: "La UNE-EN 1074.", dificultad: "dificil", opciones: ["UNE-EN 1074", "UNE-EN 12201", "UNE-EN 1057", "RD 244/2016"], correcta: 0 },
]);

const S2 = "griferia-sanitaria-y-fluxores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un grifo monomando y qué ventaja aporta frente a un grifo de dos llaves independientes?", reverso: "Un grifo con una única palanca que controla a la vez el caudal y la mezcla de agua fría y caliente, con un manejo más rápido e intuitivo que dos llaves independientes de agua fría y caliente" },
  { anverso: "¿Qué es un grifo termostático y en qué se diferencia de uno monomando convencional?", reverso: "Un grifo que mantiene automáticamente constante la temperatura de salida seleccionada, con independencia de variaciones de presión o temperatura en la red, a diferencia del monomando convencional, que exige ajustar manualmente la mezcla" },
  { anverso: "¿Qué es un grifo temporizado y dónde se emplea habitualmente?", reverso: "Un grifo que se cierra automáticamente transcurrido un tiempo tras su apertura, sin necesidad de que el usuario lo cierre; habitual en aseos públicos y zonas de uso colectivo, por su ahorro de agua" },
  { anverso: "¿Qué es un fluxor y en qué se diferencia de una cisterna convencional de inodoro?", reverso: "Un dispositivo de descarga directa desde la propia red de agua a presión, sin depósito intermedio, que exige un caudal instantáneo mucho mayor (1,25 dm³/s según el CTE DB-HS4) que una cisterna convencional (0,10 dm³/s)" },
  { anverso: "¿Qué requisito exige el CTE DB-HS4 en cuanto a presión mínima para instalar un fluxor?", reverso: "150 kPa como presión mínima en el punto de consumo, superior a los 100 kPa exigidos para un grifo común, precisamente por el mayor caudal instantáneo que necesita" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué ventaja aporta un grifo monomando frente a dos llaves independientes de agua fría y caliente?", explicacion: "Un manejo más rápido e intuitivo con una única palanca.", dificultad: "facil", opciones: ["Un manejo más rápido e intuitivo, al controlar caudal y mezcla con una única palanca", "La imposibilidad de regular la temperatura del agua en ningún caso", "La necesidad de dos llaves adicionales para su correcto funcionamiento", "Un consumo de agua siempre mayor que el de dos llaves independientes"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un grifo termostático?", explicacion: "Mantiene constante la temperatura de salida con independencia de variaciones en la red.", dificultad: "media", opciones: ["Mantiene automáticamente constante la temperatura de salida seleccionada", "Se cierra automáticamente transcurrido un tiempo tras su apertura", "Solo puede suministrar agua fría, nunca agua caliente sanitaria", "Requiere ajustar manualmente la mezcla en cada uso, igual que uno convencional"], correcta: 0 },
  { enunciado: "¿Dónde es habitual encontrar grifería temporizada?", explicacion: "En aseos públicos y zonas de uso colectivo, por su ahorro de agua.", dificultad: "media", opciones: ["En aseos públicos y zonas de uso colectivo", "Exclusivamente en cocinas de viviendas unifamiliares", "Exclusivamente en instalaciones de agua caliente sanitaria industrial", "Nunca se emplea en ningún tipo de instalación de fontanería"], correcta: 0 },
  { enunciado: "¿En qué se diferencia un fluxor de una cisterna convencional de inodoro?", explicacion: "El fluxor descarga directamente de la red, sin depósito intermedio, y exige mucho más caudal.", dificultad: "dificil", opciones: ["El fluxor descarga directamente desde la red a presión, sin depósito intermedio, exigiendo mucho más caudal instantáneo", "La cisterna exige siempre más caudal instantáneo que cualquier fluxor equivalente", "Ambos dispositivos exigen exactamente el mismo caudal instantáneo según el CTE DB-HS4", "El fluxor solo puede instalarse en instalaciones de agua caliente sanitaria"], correcta: 0 },
  { enunciado: "¿Qué presión mínima exige el CTE DB-HS4 en el punto de consumo para instalar un fluxor?", explicacion: "150 kPa, superior a la de un grifo común.", dificultad: "media", opciones: ["150 kPa", "100 kPa", "500 kPa", "50 kPa"], correcta: 0 },
]);

const S3 = "contadores-aljibes-desagues-y-ventosas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula en España el control metrológico de los contadores de agua?", reverso: "El Real Decreto 244/2016, de 3 de junio, que desarrolla la Ley 32/2014 de Metrología en lo relativo a los instrumentos de medida, incluidos los contadores de agua" },
  { anverso: "¿Qué es un aljibe en el contexto de una instalación de fontanería?", reverso: "Un depósito, tradicionalmente subterráneo, destinado a almacenar agua, ya sea procedente de la red pública (como reserva) o de recogida de agua de lluvia" },
  { anverso: "¿Qué función cumple un desagüe en una instalación de agua, y cómo se diferencia de un punto de consumo?", reverso: "El desagüe evacúa el agua sobrante o residual de un punto (aparato sanitario, depósito, arqueta) hacia la red de saneamiento, mientras que el punto de consumo es el que recibe el suministro de agua limpia" },
  { anverso: "¿Qué es una ventosa en una red de distribución de agua?", reverso: "Un dispositivo que permite la salida del aire acumulado en los puntos altos de la conducción durante el llenado, y su entrada durante el vaciado, evitando bolsas de aire que reducen la sección útil y pueden generar golpe de ariete" },
  { anverso: "¿Qué norma regula específicamente las ventosas dentro de la familia de normas UNE-EN 1074?", reverso: "La UNE-EN 1074-4, dedicada específicamente a los requisitos de las ventosas dentro del conjunto de válvulas para el suministro de agua" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma regula en España el control metrológico de los contadores de agua?", explicacion: "El Real Decreto 244/2016.", dificultad: "media", opciones: ["El Real Decreto 244/2016", "El Real Decreto 140/2003", "La UNE-EN 1074", "La UNE-EN 12201"], correcta: 0 },
  { enunciado: "¿Qué es un aljibe en el contexto de una instalación de fontanería?", explicacion: "Un depósito destinado a almacenar agua, de red o de lluvia.", dificultad: "facil", opciones: ["Un depósito destinado a almacenar agua, de la red pública o de recogida de lluvia", "Una válvula destinada exclusivamente a la regulación de caudal de la instalación", "Un tipo de grifo temporizado empleado en aseos de uso público", "Un dispositivo destinado exclusivamente a medir el caudal de la instalación"], correcta: 0 },
  { enunciado: "¿Qué función cumple un desagüe respecto a un punto de consumo?", explicacion: "Evacúa el agua sobrante o residual, al contrario que el punto de consumo, que la recibe.", dificultad: "media", opciones: ["Evacúa el agua sobrante o residual, mientras que el punto de consumo recibe el suministro", "Cumple exactamente la misma función que un punto de consumo, sin ninguna diferencia real", "Suministra exclusivamente agua caliente sanitaria a la vivienda", "Mide el caudal exacto de agua consumido en ese punto de la instalación"], correcta: 0 },
  { enunciado: "¿Qué finalidad tiene una ventosa instalada en un punto alto de una conducción?", explicacion: "Permitir la salida/entrada de aire, evitando bolsas de aire y golpe de ariete.", dificultad: "media", opciones: ["Permitir la salida del aire acumulado durante el llenado y su entrada durante el vaciado", "Medir el caudal exacto de agua que circula por ese punto de la conducción", "Regular la temperatura del agua en ese punto concreto de la conducción", "Impedir por completo el paso del agua en ese punto de la conducción"], correcta: 0 },
  { enunciado: "¿Qué norma regula específicamente las ventosas dentro de la familia UNE-EN 1074?", explicacion: "La UNE-EN 1074-4.", dificultad: "dificil", opciones: ["UNE-EN 1074-4", "UNE-EN 1074-1", "RD 244/2016", "UNE-EN 1057"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Válvula de esfera", definicion: "Válvula cuyo elemento de cierre es una esfera perforada que gira 90º entre las posiciones de abierto y cerrado, con pérdida de carga mínima abierta." },
  { tema_slug: TEMA, seccion: S1, termino: "Válvula antirretorno", definicion: "Dispositivo que permite el paso del agua en un único sentido, impidiendo su retorno hacia el punto de origen." },
  { tema_slug: TEMA, seccion: S2, termino: "Fluxor", definicion: "Dispositivo de descarga directa desde la red a presión, sin depósito intermedio, que exige un caudal instantáneo elevado." },
  { tema_slug: TEMA, seccion: S2, termino: "Grifo termostático", definicion: "Grifo que mantiene automáticamente constante la temperatura de salida seleccionada, con independencia de variaciones en la red." },
  { tema_slug: TEMA, seccion: S3, termino: "Ventosa", definicion: "Dispositivo que permite la salida y entrada de aire en los puntos altos de una conducción, evitando bolsas de aire y golpe de ariete." },
  { tema_slug: TEMA, seccion: S3, termino: "Control metrológico", definicion: "Régimen de verificación legal al que están sometidos los contadores de agua, regulado en España por el RD 244/2016, para garantizar la exactitud de su medida." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-286 creado y vinculado como Tema 10 de Oficial Fontanero.");
