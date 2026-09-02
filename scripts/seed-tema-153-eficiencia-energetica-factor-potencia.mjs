/**
 * Crea tema-153: "Eficiencia energética y compensación del factor de
 * potencia" — Tema 21 (numero=21, bloque-2) de Oficial Electricista
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea 1369):
 *   "Eficiencia Energética y Compensación del Factor de Potencia. El
 *   factor de potencia (cosφ). Energía activa, reactiva y aparente.
 *   Consecuencias de un bajo factor de potencia y métodos de
 *   compensación mediante baterías de condensadores."
 *
 * Fuente primaria verificada en esta sesión (WebSearch sobre boe.es):
 * - Orden ITC/1723/2009, de 26 de junio, por la que se revisan los
 *   peajes de acceso — BOE-A-2009-10670. Regula, en desarrollo del art.
 *   9.3 del Real Decreto 1164/2001, la facturación de los términos de
 *   energía reactiva en las tarifas de acceso a la red eléctrica,
 *   penalizando un factor de potencia bajo (energía reactiva excesiva
 *   respecto a la activa consumida).
 * Los fundamentos técnicos del factor de potencia (cosφ), la energía
 * activa/reactiva/aparente y el cálculo de baterías de condensadores son
 * conceptos de electrotecnia sin ley específica que los defina como
 * magnitudes físicas — mismo criterio ya aplicado en tema-140.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-153-eficiencia-energetica-factor-potencia.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-153";
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
  titulo: "Eficiencia energética y compensación del factor de potencia",
  descripcion: "El factor de potencia (cosφ). Energía activa, reactiva y aparente. Consecuencias de un bajo factor de potencia y métodos de compensación mediante baterías de condensadores.",
  contenido: "Desarrolla el factor de potencia (cosφ) y las tres magnitudes de energía en corriente alterna: activa, reactiva y aparente. Explica las consecuencias técnicas y económicas de un bajo factor de potencia —mayor intensidad demandada, mayores pérdidas y penalización en la facturación de energía reactiva, conforme a la Orden ITC/1723/2009— y los métodos de compensación mediante baterías de condensadores, fijas o automáticas.",
  enlaces_boe: [
    { titulo: "Orden ITC/1723/2009, revisión de peajes de acceso (facturación de energía reactiva)", url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2009-10670" },
  ],
  indice_estudio: [
    { url: "", titulo: "El factor de potencia (cosφ). Energía activa, reactiva y aparente", seccion: "factor-potencia-energia-activa-reactiva-aparente", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2009-10670", titulo: "Consecuencias de un bajo factor de potencia", seccion: "consecuencias-bajo-factor-potencia", articulos: "Orden ITC/1723/2009" },
    { url: "", titulo: "Métodos de compensación mediante baterías de condensadores", seccion: "metodos-compensacion-baterias-condensadores", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "factor-potencia-energia-activa-reactiva-aparente";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la energía activa en un circuito de corriente alterna?", reverso: "La energía que efectivamente se transforma en trabajo útil (movimiento, calor, luz) en un receptor; se mide en kilovatios-hora (kWh) y es la que habitualmente se factura como consumo" },
  { anverso: "¿Qué es la energía reactiva en un circuito de corriente alterna?", reverso: "La energía que los receptores con componente inductiva (motores, transformadores, lámparas de descarga con reactancia) intercambian con la red sin producir trabajo útil, necesaria para crear los campos magnéticos de esos receptores; se mide en kilovoltiamperios reactivos-hora (kVArh)" },
  { anverso: "¿Qué es la energía aparente en un circuito de corriente alterna?", reverso: "La combinación vectorial de la energía activa y la reactiva, que representa la energía total que debe suministrar la red; se mide en kilovoltiamperios-hora (kVAh)" },
  { anverso: "¿Qué es el factor de potencia (cosφ)?", reverso: "La relación entre la potencia activa y la potencia aparente de una instalación (cosφ = P/S), que indica qué proporción de la energía suministrada por la red se aprovecha realmente como trabajo útil" },
  { anverso: "¿Qué valor de factor de potencia indica un aprovechamiento óptimo de la energía suministrada por la red?", reverso: "Un valor de cosφ = 1 (o muy próximo a 1), que indica que toda la energía aparente suministrada se aprovecha como energía activa, sin apenas componente reactiva" },
  { anverso: "¿Qué tipo de receptores eléctricos son los principales responsables de un factor de potencia bajo en una instalación industrial?", reverso: "Los receptores de carácter inductivo: motores eléctricos (especialmente cuando trabajan en vacío o a baja carga), transformadores y lámparas de descarga con reactancia, que demandan energía reactiva para crear su campo magnético" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la energía activa?", explicacion: "La que efectivamente se transforma en trabajo útil, medida en kWh.", dificultad: "facil", opciones: ["La que efectivamente se transforma en trabajo útil", "La que se intercambia sin producir ningún trabajo útil", "La combinación vectorial de activa y reactiva", "La energía exclusiva de los circuitos de corriente continua"], correcta: 0 },
  { enunciado: "¿Qué es la energía reactiva?", explicacion: "La que intercambian con la red los receptores inductivos, sin producir trabajo útil.", dificultad: "media", opciones: ["La que intercambian los receptores inductivos, sin trabajo útil", "La que efectivamente se transforma en trabajo útil", "La energía total suministrada por la red en cualquier caso", "La energía exclusiva de las lámparas de tecnología LED"], correcta: 0 },
  { enunciado: "¿Qué es el factor de potencia (cosφ)?", explicacion: "La relación entre la potencia activa y la potencia aparente de una instalación.", dificultad: "media", opciones: ["La relación entre la potencia activa y la potencia aparente", "La relación entre la tensión y la intensidad de un circuito", "La relación entre la resistencia y la reactancia de un receptor", "La relación entre la frecuencia y el periodo de la red eléctrica"], correcta: 0 },
  { enunciado: "¿Qué valor de factor de potencia indica un aprovechamiento óptimo de la energía suministrada?", explicacion: "cosφ = 1, o muy próximo a 1.", dificultad: "media", opciones: ["cosφ = 1, o muy próximo a 1", "cosφ = 0, sin ninguna excepción", "cosφ = 0,5 exactamente, en cualquier instalación", "El factor de potencia no tiene ningún valor óptimo de referencia"], correcta: 0 },
  { enunciado: "¿Qué tipo de receptores son los principales responsables de un bajo factor de potencia?", explicacion: "Los receptores de carácter inductivo, como motores y transformadores.", dificultad: "dificil", opciones: ["Los receptores de carácter inductivo, como motores y transformadores", "Las resistencias de calefacción exclusivamente", "Las lámparas incandescentes exclusivamente", "Los receptores de corriente continua exclusivamente"], correcta: 0 },
]);

const S2 = "consecuencias-bajo-factor-potencia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué consecuencia técnica tiene un bajo factor de potencia sobre la intensidad demandada por una instalación, para una misma potencia activa útil?", reverso: "Un aumento de la intensidad demandada a la red, ya que para obtener la misma potencia activa útil con un cosφ más bajo es necesaria una mayor potencia aparente, y por tanto mayor intensidad" },
  { anverso: "¿Qué consecuencia tiene ese aumento de intensidad sobre los conductores y las protecciones de la instalación?", reverso: "Mayores pérdidas por efecto Joule (calentamiento) en los conductores, y la necesidad de sobredimensionar conductores y protecciones respecto a lo que sería necesario con un factor de potencia óptimo" },
  { anverso: "¿Qué norma regula la facturación de la energía reactiva en las tarifas de acceso a la red eléctrica española?", reverso: "La Orden ITC/1723/2009, en desarrollo del artículo 9.3 del Real Decreto 1164/2001" },
  { anverso: "¿Qué consecuencia económica tiene un bajo factor de potencia para el titular de una instalación con tarifa de acceso adecuada?", reverso: "Una penalización económica en la facturación, al facturarse la energía reactiva consumida por encima de determinados límites relativos a la energía activa, conforme a la normativa de peajes de acceso" },
  { anverso: "¿Por qué puede interesarle a un titular de una instalación industrial o de gran consumo mejorar su factor de potencia, más allá de evitar la penalización directa?", reverso: "Porque reduce las pérdidas en su propia instalación, permite aprovechar mejor la capacidad de transformadores y líneas ya instaladas, y puede evitar la necesidad de sobredimensionar futuras ampliaciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué consecuencia técnica tiene un bajo factor de potencia sobre la intensidad demandada, para una misma potencia activa útil?", explicacion: "Un aumento de la intensidad demandada a la red.", dificultad: "media", opciones: ["Un aumento de la intensidad demandada a la red", "Una disminución de la intensidad demandada a la red", "Ningún efecto relevante sobre la intensidad demandada", "Una eliminación completa de las pérdidas en los conductores"], correcta: 0 },
  { enunciado: "¿Qué norma regula la facturación de la energía reactiva en las tarifas de acceso a la red eléctrica?", explicacion: "La Orden ITC/1723/2009.", dificultad: "media", opciones: ["La Orden ITC/1723/2009", "El Real Decreto 842/2002 (REBT)", "El Real Decreto 614/2001", "El Real Decreto 346/2011"], correcta: 0 },
  { enunciado: "¿Qué consecuencia económica tiene un bajo factor de potencia para el titular de una instalación?", explicacion: "Una penalización en la facturación de energía reactiva.", dificultad: "media", opciones: ["Una penalización en la facturación de energía reactiva", "Una bonificación automática en la factura eléctrica", "Ninguna consecuencia económica relevante en ningún caso", "Una reducción automática de la potencia contratada"], correcta: 0 },
  { enunciado: "¿Qué efecto tiene un bajo factor de potencia sobre los conductores de una instalación?", explicacion: "Mayores pérdidas por efecto Joule y necesidad de sobredimensionarlos.", dificultad: "dificil", opciones: ["Mayores pérdidas por efecto Joule y necesidad de sobredimensionarlos", "Ninguna consecuencia relevante sobre los conductores instalados", "Una reducción de la sección necesaria de los conductores", "Una eliminación de la necesidad de protección frente a sobrecargas"], correcta: 0 },
  { enunciado: "¿Por qué puede interesar a una instalación industrial mejorar su factor de potencia, más allá de evitar la penalización directa?", explicacion: "Reduce pérdidas y aprovecha mejor la capacidad de transformadores y líneas.", dificultad: "media", opciones: ["Reduce pérdidas y aprovecha mejor la capacidad ya instalada", "No existe ningún otro interés más allá de evitar la penalización", "Aumenta de forma automática la potencia contratada disponible", "Elimina por completo la necesidad de cualquier protección eléctrica"], correcta: 0 },
]);

const S3 = "metodos-compensacion-baterias-condensadores";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una batería de condensadores aplicada a la compensación del factor de potencia?", reverso: "Un conjunto de condensadores conectados a una instalación, que aportan energía reactiva de carácter capacitivo, compensando (contrarrestando) la energía reactiva de carácter inductivo demandada por motores y otros receptores, y mejorando así el factor de potencia global" },
  { anverso: "¿Qué es la compensación fija del factor de potencia?", reverso: "El sistema de compensación en el que la batería de condensadores conectada aporta un valor constante de energía reactiva capacitiva, adecuado para instalaciones con una demanda de reactiva relativamente estable en el tiempo" },
  { anverso: "¿Qué es la compensación automática del factor de potencia, y en qué instalaciones resulta más adecuada?", reverso: "Un sistema con varias etapas o escalones de condensadores, gobernado por un regulador que conecta o desconecta automáticamente los escalones necesarios según la demanda de reactiva real en cada momento; resulta adecuada en instalaciones con demanda de energía reactiva variable a lo largo del tiempo" },
  { anverso: "¿Qué riesgo debe evitarse al dimensionar una batería de condensadores para compensar el factor de potencia?", reverso: "La sobrecompensación: aportar más energía reactiva capacitiva de la necesaria, lo que puede provocar un factor de potencia capacitivo (en adelanto) también penalizable y con posibles efectos indeseados sobre la tensión de la instalación" },
  { anverso: "¿Qué elemento de protección es habitual instalar junto a una batería de condensadores?", reverso: "Fusibles o interruptores automáticos específicos para la protección de los condensadores, y en ocasiones reactancias de choque, para limitar las corrientes de conexión y las posibles resonancias con armónicos de la red" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una batería de condensadores aplicada a la compensación del factor de potencia?", explicacion: "Un conjunto de condensadores que aportan energía reactiva capacitiva, compensando la inductiva.", dificultad: "media", opciones: ["Un conjunto de condensadores que compensan la energía reactiva inductiva", "Un conjunto de resistencias que reducen la energía activa consumida", "Un dispositivo que mide la resistencia de tierra de la instalación", "Un dispositivo exclusivo de protección contra sobretensiones"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la compensación fija del factor de potencia?", explicacion: "Aporta un valor constante de energía reactiva capacitiva.", dificultad: "media", opciones: ["Aporta un valor constante de energía reactiva capacitiva", "Ajusta automáticamente el valor aportado según la demanda", "Solo puede aplicarse en instalaciones de corriente continua", "Elimina por completo la necesidad de cualquier protección"], correcta: 0 },
  { enunciado: "¿En qué tipo de instalaciones resulta más adecuada la compensación automática por escalones?", explicacion: "En instalaciones con demanda de energía reactiva variable en el tiempo.", dificultad: "dificil", opciones: ["En instalaciones con demanda de energía reactiva variable", "En instalaciones con demanda de energía reactiva siempre constante", "Únicamente en instalaciones de alumbrado exterior", "Únicamente en instalaciones de corriente continua"], correcta: 0 },
  { enunciado: "¿Qué riesgo debe evitarse al dimensionar una batería de condensadores?", explicacion: "La sobrecompensación, que genera un factor de potencia capacitivo también penalizable.", dificultad: "dificil", opciones: ["La sobrecompensación del factor de potencia", "La imposibilidad total de compensar cualquier instalación", "El aumento automático de la potencia contratada", "La eliminación completa de la energía activa consumida"], correcta: 0 },
  { enunciado: "¿Qué elemento de protección es habitual instalar junto a una batería de condensadores?", explicacion: "Fusibles o interruptores automáticos específicos, y en ocasiones reactancias de choque.", dificultad: "media", opciones: ["Fusibles o interruptores automáticos específicos", "Únicamente un interruptor diferencial de alta sensibilidad", "Ningún elemento de protección adicional es necesario", "Únicamente un medidor de aislamiento permanente"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-153 creado y vinculado como Tema 21 de Oficial Electricista.");
