/**
 * Crea tema-281: "Reglamento General de Vehículos. Anexo IX (Masas y
 * dimensiones). Anexo XI (Señales en los vehículos: Tipos). Anexo XII
 * (Accesorios, repuestos y herramientas de los vehículos)" — Tema 21
 * (numero=21, bloque-2) de Oficial Conductor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, líneas
 * 1591-1594):
 *   "Reglamento General de Vehículos. Anexo IX. Masas y dimensiones.
 *   Anexo XI. Señales en los vehículos: Tipos. Anexo XII. Accesorios,
 *   repuestos y herramientas de los vehículos."
 *
 * Sourcing: normativa real y verificada — Real Decreto 2822/1998
 * (BOE-A-1999-1826, Reglamento General de Vehículos, ya usado en
 * tema-270, tema-271 y tema-276), en concreto sus Anexos IX, XI y XII.
 * Se verifica en esta sesión la sustitución de los triángulos de
 * preseñalización por la baliza luminosa V-16 conectada y homologada
 * como único dispositivo válido desde el 1 de enero de 2026 (Anexo
 * XII), y el mantenimiento de la obligatoriedad del chaleco reflectante
 * certificado conforme al RD 1407/1992 y la norma UNE-EN 471 (clase 2
 * mínima).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-281-reglamento-vehiculos-anexos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-281";
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
  titulo: "Reglamento General de Vehículos: Anexos IX, XI y XII",
  descripcion: "Anexo IX: límites de dimensiones (longitud, anchura, altura) de los vehículos. Anexo XI: tipos de señales identificativas en los vehículos (V-3 a V-24). Anexo XII: accesorios, repuestos y herramientas obligatorios, incluida la baliza V-16.",
  contenido: "Desarrolla tres anexos del Reglamento General de Vehículos (RD 2822/1998): el Anexo IX, con los límites de dimensiones exigibles a los vehículos; el Anexo XI, con los distintos tipos de señales identificativas que pueden o deben portar determinados vehículos (velocidad limitada, vehículo lento, transporte escolar, mercancías peligrosas, entre otras); y el Anexo XII, con los accesorios, repuestos y herramientas que deben llevarse a bordo, incluida la baliza luminosa V-16, único dispositivo válido de preseñalización de un vehículo inmovilizado desde el 1 de enero de 2026.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", titulo: "Real Decreto 2822/1998 (Reglamento General de Vehículos, Anexos IX, XI y XII)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", titulo: "Anexo IX: dimensiones máximas de los vehículos", seccion: "anexo-ix-dimensiones-maximas-de-los-vehiculos", articulos: "RD 2822/1998, Anexo IX" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", titulo: "Anexo XI: tipos de señales en los vehículos", seccion: "anexo-xi-tipos-de-senales-en-los-vehiculos", articulos: "RD 2822/1998, Anexo XI" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", titulo: "Anexo XII: accesorios, repuestos y herramientas", seccion: "anexo-xii-accesorios-repuestos-y-herramientas", articulos: "RD 2822/1998, Anexo XII" },
  ],
}]);

const S1 = "anexo-ix-dimensiones-maximas-de-los-vehiculos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipo de límites establece con carácter general el Anexo IX del Reglamento General de Vehículos, además de las masas ya estudiadas en un tema anterior?", reverso: "Los límites de longitud, anchura y altura máximas de los vehículos, con o sin carga, que no pueden superarse en la circulación ordinaria por las vías públicas salvo autorización especial de transporte" },
  { anverso: "¿Por qué establece el Anexo IX límites distintos de anchura para distintos tipos de vehículos?", reverso: "Porque un vehículo excesivamente ancho puede invadir el carril contrario o el espacio de otros usuarios de la vía, comprometiendo la seguridad de la circulación, por lo que el límite se adapta al tipo de vehículo y a su uso previsto" },
  { anverso: "¿Qué relación existe entre el Anexo IX y la autorización especial de transporte, ya estudiada en un tema anterior sobre la carga de vehículos?", reverso: "Cuando un vehículo o su carga superan los límites de dimensiones del Anexo IX, es necesario disponer de una autorización especial de transporte para poder circular legalmente con esas dimensiones excepcionales" },
  { anverso: "¿Qué relevancia tiene para un Oficial Conductor conocer los límites de altura máxima del Anexo IX?", reverso: "Permite anticipar si un vehículo cargado podría tener problemas de gálibo al pasar bajo un puente, un túnel o cualquier otra estructura con una altura limitada, evitando así una colisión por falta de previsión" },
  { anverso: "¿Qué ocurre si un vehículo circula superando los límites de dimensiones del Anexo IX sin la autorización especial correspondiente?", reverso: "Constituye una infracción administrativa sancionable, además de suponer un riesgo real para la seguridad de la circulación y de otros usuarios de la vía" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué tipo de límites establece el Anexo IX, además de las masas?", explicacion: "Los límites de longitud, anchura y altura máximas de los vehículos.", dificultad: "facil", opciones: ["Los límites de longitud, anchura y altura máximas", "Los límites de velocidad máxima permitida en cada tipo de vía", "Los límites de emisiones contaminantes de cada tipo de vehículo", "Los límites de tiempo de conducción y descanso del conductor"], correcta: 0 },
  { enunciado: "¿Por qué establece el Anexo IX límites de anchura para los vehículos?", explicacion: "Para evitar que invadan el carril contrario o comprometan la seguridad de otros usuarios.", dificultad: "media", opciones: ["Para evitar que invadan el carril contrario o el espacio de otros usuarios", "Para reducir exclusivamente el consumo de combustible de esos vehículos", "Para reducir exclusivamente el precio de fabricación de esos vehículos", "No existe ninguna razón real distinta de una simple convención administrativa"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el Anexo IX y la autorización especial de transporte?", explicacion: "Es necesaria cuando el vehículo o la carga superan los límites de dimensiones del Anexo IX.", dificultad: "media", opciones: ["Es necesaria si se superan los límites de dimensiones del Anexo IX", "No existe ninguna relación real entre ambos conceptos regulados por el RD 2822/1998", "La autorización especial sustituye por completo el cumplimiento del Anexo IX", "El Anexo IX solo se aplica a vehículos que ya disponen de autorización especial"], correcta: 0 },
  { enunciado: "¿Qué relevancia tiene conocer los límites de altura máxima del Anexo IX?", explicacion: "Permite anticipar problemas de gálibo bajo puentes, túneles u otras estructuras.", dificultad: "media", opciones: ["Permite anticipar problemas de gálibo bajo puentes o túneles", "No tiene ninguna relevancia práctica real para la conducción de un vehículo", "Solo es relevante para vehículos que circulan exclusivamente por autovías", "Solo es relevante si el vehículo transporta pasajeros, no mercancías"], correcta: 0 },
  { enunciado: "¿Qué ocurre si un vehículo supera los límites del Anexo IX sin autorización especial?", explicacion: "Constituye una infracción administrativa sancionable y un riesgo real para la seguridad.", dificultad: "dificil", opciones: ["Constituye una infracción sancionable y un riesgo para la seguridad", "No tiene ninguna consecuencia real si el vehículo llega a su destino", "Únicamente reduce el confort de la conducción, sin ninguna otra consecuencia", "Solo tiene consecuencias si el exceso supera el doble del límite permitido"], correcta: 0 },
]);

const S2 = "anexo-xi-tipos-de-senales-en-los-vehiculos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula, con carácter general, el Anexo XI del Reglamento General de Vehículos?", reverso: "Los distintos tipos de señales identificativas (placas y distintivos, numerados como V-3 a V-24) que pueden o deben portar determinados vehículos según su uso, sus características o su carga" },
  { anverso: "¿Qué indica, con carácter general, la señal de \"vehículo lento\" prevista en el Anexo XI?", reverso: "Que el vehículo, por sus características técnicas, no puede superar una velocidad determinada, advirtiendo a los demás conductores para que extremen la precaución al aproximarse o adelantarlo" },
  { anverso: "¿Qué tipo de señal debe portar, con carácter general, un vehículo destinado al transporte escolar?", reverso: "Una señal identificativa específica de transporte escolar, que advierte a otros usuarios de la vía sobre la naturaleza especial de ese servicio y las precauciones adicionales que puede requerir (paradas, subida y bajada de menores)" },
  { anverso: "¿Qué tipo de señal debe portar un vehículo que transporta mercancías peligrosas, según el Anexo XI?", reverso: "Paneles o placas de señalización de mercancías peligrosas, que identifican el tipo de riesgo del transporte (inflamable, tóxico, corrosivo, entre otros) para que los servicios de emergencia puedan actuar con el protocolo adecuado en caso de incidente" },
  { anverso: "¿Por qué es relevante que un Oficial Conductor reconozca correctamente los distintos tipos de señales del Anexo XI en otros vehículos con los que se cruza?", reverso: "Porque le permite anticipar el comportamiento probable de ese vehículo (menor velocidad, paradas frecuentes, mayor longitud) y adaptar su propia conducción con la prudencia adecuada a cada situación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué regula el Anexo XI del Reglamento General de Vehículos?", explicacion: "Los tipos de señales identificativas que pueden o deben portar determinados vehículos.", dificultad: "facil", opciones: ["Los tipos de señales identificativas de determinados vehículos", "Los límites de masa y dimensiones de los vehículos en circulación", "Los accesorios y herramientas obligatorios a bordo del vehículo", "El régimen de infracciones y sanciones de tráfico en España"], correcta: 0 },
  { enunciado: "¿Qué indica la señal de \"vehículo lento\" del Anexo XI?", explicacion: "Que el vehículo no puede superar una velocidad determinada por sus características técnicas.", dificultad: "media", opciones: ["Que el vehículo no puede superar una velocidad determinada", "Que el vehículo transporta mercancías peligrosas de tipo inflamable", "Que el vehículo está destinado exclusivamente al transporte escolar", "Que el vehículo dispone de la condición de vehículo prioritario"], correcta: 0 },
  { enunciado: "¿Qué señal debe portar un vehículo de transporte escolar, según el Anexo XI?", explicacion: "Una señal identificativa específica de transporte escolar.", dificultad: "media", opciones: ["Una señal identificativa específica de transporte escolar", "La misma señal genérica de vehículo lento, sin ninguna distinción adicional", "Ninguna señal específica distinta de la matrícula ordinaria del vehículo", "Un panel de mercancías peligrosas, igual que un vehículo de transporte de mercancías"], correcta: 0 },
  { enunciado: "¿Qué señal debe portar un vehículo que transporta mercancías peligrosas?", explicacion: "Paneles o placas que identifican el tipo de riesgo del transporte.", dificultad: "media", opciones: ["Paneles o placas que identifican el tipo de riesgo del transporte", "La misma señal genérica de transporte escolar, sin ninguna distinción adicional", "Ninguna señal específica distinta de la matrícula ordinaria del vehículo", "Una señal exclusiva de vehículo lento, sin relación con el tipo de mercancía"], correcta: 0 },
  { enunciado: "¿Por qué es relevante reconocer correctamente estas señales en otros vehículos?", explicacion: "Permite anticipar el comportamiento probable del vehículo y adaptar la propia conducción con prudencia.", dificultad: "dificil", opciones: ["Permite anticipar el comportamiento probable y adaptar la conducción", "No tiene ninguna relevancia práctica real para la conducción propia", "Solo es relevante si el propio vehículo también porta alguna de esas señales", "Solo es relevante en vías interurbanas, nunca en el núcleo urbano"], correcta: 0 },
]);

const S3 = "anexo-xii-accesorios-repuestos-y-herramientas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué dispositivo de preseñalización de un vehículo inmovilizado ha pasado a ser el único válido desde el 1 de enero de 2026, según el Anexo XII, sustituyendo a los triángulos tradicionales?", reverso: "La baliza luminosa V-16 conectada y homologada, que tiene la ventaja de poder colocarse sobre el propio vehículo sin necesidad de que el conductor descienda a la calzada, reduciendo el riesgo durante la señalización" },
  { anverso: "¿Sigue siendo obligatorio el chaleco reflectante pese a la sustitución de los triángulos por la baliza V-16?", reverso: "Sí, el chaleco reflectante certificado conforme al RD 1407/1992 y a la norma UNE-EN 471 (clase 2 mínima) sigue siendo obligatorio, al tratarse de una prenda de protección distinta y complementaria a la propia señalización del vehículo" },
  { anverso: "¿Qué obligación establece con carácter general la normativa española sobre la rueda de repuesto de un vehículo?", reverso: "Disponer de una rueda de repuesto, una rueda de uso temporal (\"galleta\") o, alternativamente, un kit antipinchazos, que permita continuar la circulación sin quedar inmovilizado ante un pinchazo" },
  { anverso: "¿Por qué tiene ventajas de seguridad la baliza V-16 frente a los triángulos de preseñalización tradicionales, según lo verificado en esta sesión?", reverso: "Porque puede colocarse sobre el techo del vehículo sin que el conductor tenga que descender a la calzada ni caminar por ella para señalizar el vehículo inmovilizado, reduciendo así la exposición al riesgo de atropello durante esa maniobra" },
  { anverso: "¿Qué debería comprobar un Oficial Conductor antes de iniciar un servicio, en relación con los accesorios del Anexo XII, además de las comprobaciones mecánicas ya estudiadas en un tema anterior?", reverso: "Que el vehículo cuenta con la baliza V-16 operativa y homologada, el chaleco reflectante certificado, y la rueda de repuesto, rueda de uso temporal o kit antipinchazos correspondiente, como parte de los accesorios y repuestos exigidos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué dispositivo ha sustituido a los triángulos como único válido desde el 1 de enero de 2026?", explicacion: "La baliza luminosa V-16 conectada y homologada.", dificultad: "facil", opciones: ["La baliza luminosa V-16 conectada y homologada", "Un nuevo modelo de triángulo reflectante de mayor tamaño", "Ningún dispositivo, siendo los triángulos tradicionales aún los únicos válidos", "Una señal acústica adicional, sin ningún dispositivo luminoso adicional"], correcta: 0 },
  { enunciado: "¿Sigue siendo obligatorio el chaleco reflectante pese a la baliza V-16?", explicacion: "Sí, sigue siendo obligatorio, al ser una prenda complementaria a la señalización.", dificultad: "media", opciones: ["Sí, sigue siendo obligatorio como prenda complementaria", "No, ha quedado sustituido también por la propia baliza V-16", "Solo sigue siendo obligatorio en vías interurbanas, no en el núcleo urbano", "Solo sigue siendo obligatorio para vehículos de transporte de mercancías"], correcta: 0 },
  { enunciado: "¿Qué obligación establece la normativa sobre la rueda de repuesto de un vehículo?", explicacion: "Disponer de rueda de repuesto, rueda de uso temporal o un kit antipinchazos.", dificultad: "media", opciones: ["Disponer de rueda de repuesto, rueda temporal o kit antipinchazos", "Ninguna obligación real, siendo opcional disponer de cualquiera de estos elementos", "Disponer únicamente de una rueda de repuesto idéntica a las restantes", "Disponer de dos ruedas de repuesto completas, sin ninguna alternativa posible"], correcta: 0 },
  { enunciado: "¿Por qué tiene ventajas de seguridad la baliza V-16 frente a los triángulos tradicionales?", explicacion: "Se coloca sin que el conductor descienda a la calzada, reduciendo el riesgo de atropello.", dificultad: "media", opciones: ["Se coloca sin que el conductor descienda a la calzada", "Porque ilumina a mayor distancia que cualquier triángulo reflectante", "Porque sustituye también a las luces de emergencia del propio vehículo", "No tiene ninguna ventaja real distinta de la de los triángulos tradicionales"], correcta: 0 },
  { enunciado: "¿Qué debería comprobar un Oficial Conductor sobre los accesorios del Anexo XII antes de un servicio?", explicacion: "Baliza V-16 operativa, chaleco reflectante certificado, y rueda de repuesto o kit antipinchazos.", dificultad: "dificil", opciones: ["Baliza V-16, chaleco reflectante y rueda de repuesto o kit antipinchazos", "Únicamente el nivel de combustible del vehículo, sin ninguna otra comprobación", "Únicamente el estado de las luces del vehículo, sin ninguna otra comprobación", "Ninguna comprobación adicional distinta de la ya realizada sobre el motor"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Gálibo", definicion: "Altura o dimensión máxima libre que permite el paso de un vehículo bajo una estructura (puente, túnel, paso elevado), relevante para respetar los límites de altura del Anexo IX." },
  { tema_slug: TEMA, seccion: S1, termino: "Autorización especial de transporte", definicion: "Permiso específico exigido para circular con un vehículo o una carga que superan los límites de masa o dimensiones ordinarios del Anexo IX del RD 2822/1998." },
  { tema_slug: TEMA, seccion: S2, termino: "Panel de mercancías peligrosas", definicion: "Señal identificativa del Anexo XI que debe portar un vehículo que transporta mercancías peligrosas, indicando el tipo de riesgo (inflamable, tóxico, corrosivo) para los servicios de emergencia." },
  { tema_slug: TEMA, seccion: S2, termino: "Señal de vehículo lento", definicion: "Distintivo del Anexo XI que advierte de que un vehículo, por sus características técnicas, no puede superar una velocidad determinada." },
  { tema_slug: TEMA, seccion: S3, termino: "Baliza V-16", definicion: "Dispositivo luminoso de preseñalización de emergencia, conectado y homologado, único válido desde el 1 de enero de 2026 para señalizar un vehículo inmovilizado en la vía." },
  { tema_slug: TEMA, seccion: S3, termino: "Kit antipinchazos", definicion: "Alternativa a la rueda de repuesto o a la rueda de uso temporal, que permite reparar provisionalmente un pinchazo y continuar la circulación sin quedar inmovilizado." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-281 creado y vinculado como Tema 21 de Oficial Conductor General.");
