/**
 * Crea tema-283: "Conceptos fundamentales en fontanería" — Tema 7
 * (numero=7, bloque-2) de Oficial Fontanero (Ayto. Zaragoza). Primer tema
 * de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases1716.pdf, BOPZ núm. 147
 * de 30-06-2025, línea 516): "Conceptos fundamentales en fontanería.
 * Caudales y consumos, velocidad, desplazamiento del agua, relación entre
 * caudal, velocidad y sección. Presión, relación presión-altura, pérdidas
 * de carga, golpe de ariete."
 *
 * Sourcing: hidráulica básica aplicada a fontanería — conocimiento técnico
 * consolidado sin ley única que lo regule (fórmulas y magnitudes físicas:
 * continuidad Q=v·S, relación presión-altura, pérdida de carga, golpe de
 * ariete), verificado con búsqueda previa conforme al estándar del
 * proyecto. Las magnitudes de referencia de velocidad de cálculo (0,50-2,00
 * m/s en tuberías metálicas; 0,50-3,50 m/s en termoplásticas/multicapa) y
 * de presión en los puntos de consumo (100-150 kPa mínimo, 500 kPa máximo)
 * están tomadas del propio CTE DB-HS4 (Sección HS4, apartados 2.1.3 y 4.2.1
 * del documento oficial descargado de codigotecnico.org), que se desarrolla
 * como norma aplicable en el tema 8 ("Instalaciones interiores").
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-283-conceptos-fundamentales-fontaneria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-283";
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
  titulo: "Conceptos fundamentales en fontanería",
  descripcion: "Caudal, velocidad y sección: la ecuación de continuidad. Presión del agua y su relación con la altura geométrica. Pérdidas de carga por rozamiento. El golpe de ariete: causas, efectos y protección.",
  contenido: "Desarrolla los conceptos de hidráulica básica que sirven de base a todo el resto del temario específico de fontanería: la relación entre caudal, velocidad y sección de una tubería (ecuación de continuidad), la presión del agua y su relación con la altura geométrica, las pérdidas de carga por rozamiento a lo largo de una conducción, y el fenómeno del golpe de ariete — su origen, sus efectos sobre la instalación y los sistemas empleados para prevenirlo.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Caudal, velocidad y sección", seccion: "caudal-velocidad-y-seccion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Presión, altura y pérdidas de carga", seccion: "presion-altura-y-perdidas-de-carga", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El golpe de ariete", seccion: "el-golpe-de-ariete", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "caudal-velocidad-y-seccion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el caudal de una tubería?", reverso: "El volumen de agua que atraviesa una sección de la tubería por unidad de tiempo. Se expresa habitualmente en litros por segundo (l/s o dm³/s) o en metros cúbicos por hora (m³/h)" },
  { anverso: "¿Cuál es la ecuación de continuidad que relaciona caudal, velocidad y sección?", reverso: "Q = v · S, donde Q es el caudal, v es la velocidad de circulación del agua y S es la sección interior de la tubería. Es la relación fundamental de la hidráulica de conducciones a presión" },
  { anverso: "Si el caudal permanece constante, ¿qué ocurre con la velocidad del agua al reducirse el diámetro de la tubería?", reverso: "La velocidad aumenta, porque al reducirse la sección debe aumentar la velocidad para que el producto v·S siga dando el mismo caudal Q (ecuación de continuidad)" },
  { anverso: "¿Qué se entiende por consumo o dotación en una instalación de fontanería?", reverso: "El caudal instantáneo mínimo que debe suministrarse a cada tipo de aparato sanitario (lavabo, ducha, inodoro, fregadero...) para que funcione correctamente, distinto del caudal máximo simultáneo de toda la instalación" },
  { anverso: "¿Por qué no se dimensiona una instalación sumando sin más los caudales de todos los aparatos que alimenta?", reverso: "Porque no todos los aparatos se usan a la vez: se aplica un coeficiente de simultaneidad que reduce el caudal de cálculo respecto a la suma de los caudales máximos de todos los puntos de consumo servidos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el caudal de una tubería?", explicacion: "El volumen de agua que la atraviesa por unidad de tiempo.", dificultad: "facil", opciones: ["El volumen de agua que atraviesa una sección por unidad de tiempo", "La presión del agua medida en el punto más alto de la instalación", "El diámetro interior de la tubería expresado en milímetros", "La temperatura del agua en el punto de consumo más desfavorable"], correcta: 0 },
  { enunciado: "¿Cuál es la ecuación de continuidad de la hidráulica de conducciones?", explicacion: "Q = v · S (caudal igual a velocidad por sección).", dificultad: "facil", opciones: ["Q = v · S", "Q = v / S", "Q = S / v", "Q = v + S"], correcta: 0 },
  { enunciado: "Si el caudal se mantiene constante y se reduce el diámetro de una tubería, ¿qué ocurre con la velocidad del agua?", explicacion: "Aumenta, para que v·S siga dando el mismo caudal.", dificultad: "media", opciones: ["Aumenta", "Disminuye", "Se mantiene exactamente igual en todos los casos", "Se hace nula, deteniendo la circulación del agua"], correcta: 0 },
  { enunciado: "¿Qué es la dotación o consumo de un aparato sanitario?", explicacion: "El caudal instantáneo mínimo que necesita ese aparato concreto.", dificultad: "media", opciones: ["El caudal instantáneo mínimo que necesita ese aparato para funcionar correctamente", "La presión máxima que puede soportar el aparato sin dañarse", "El diámetro mínimo del sifón que debe llevar instalado el aparato", "La distancia máxima admisible entre el aparato y la bajante"], correcta: 0 },
  { enunciado: "¿Por qué se aplica un coeficiente de simultaneidad al dimensionar una instalación con varios aparatos?", explicacion: "Porque no todos los aparatos se usan a la vez, y sumar sin más sobredimensionaría la red.", dificultad: "dificil", opciones: ["Porque no todos los aparatos servidos se usan simultáneamente, y sumar todos los caudales máximos sobredimensionaría la instalación", "Porque la normativa prohíbe expresamente sumar los caudales de más de dos aparatos en cualquier circunstancia", "Porque el caudal de cada aparato varía aleatoriamente sin ninguna relación con su uso real", "Porque el coeficiente de simultaneidad solo se aplica a las instalaciones de agua caliente, nunca a las de agua fría"], correcta: 0 },
]);

const S2 = "presion-altura-y-perdidas-de-carga";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se relacionan la presión del agua y la altura geométrica en una columna de agua en reposo?", reverso: "Son directamente proporcionales: a mayor altura de la columna de agua, mayor presión en su base (presión hidrostática, P = ρ·g·h). Por eso un depósito situado en alto proporciona presión por gravedad a los puntos de consumo situados más abajo" },
  { anverso: "¿Qué es un metro de columna de agua (m.c.a.) como unidad de presión?", reverso: "La presión que ejerce una columna de agua de un metro de altura sobre su base; equivale aproximadamente a 9,8 kPa (unos 0,098 bar). Es una unidad habitual en fontanería para expresar presiones de servicio" },
  { anverso: "¿Qué es la pérdida de carga en una conducción?", reverso: "La disminución de presión que sufre el agua al circular por una tubería, debida al rozamiento con las paredes interiores y con los propios elementos de la instalación (codos, válvulas, reducciones...)" },
  { anverso: "¿De qué factores depende principalmente la pérdida de carga por rozamiento en un tramo recto de tubería?", reverso: "De la longitud del tramo, del diámetro y la rugosidad interior de la tubería, y de la velocidad de circulación del agua: a mayor longitud, mayor rugosidad o mayor velocidad, mayor pérdida de carga; a mayor diámetro, menor pérdida de carga" },
  { anverso: "¿Qué son las pérdidas de carga localizadas?", reverso: "Las pérdidas de presión adicionales que se producen en puntos singulares de la instalación —codos, derivaciones, válvulas, reducciones de diámetro, contadores— distintas de las pérdidas por rozamiento en tramos rectos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo se relacionan presión y altura en una columna de agua en reposo?", explicacion: "Son directamente proporcionales: a mayor altura, mayor presión en la base.", dificultad: "facil", opciones: ["A mayor altura de la columna de agua, mayor presión en su base", "A mayor altura de la columna de agua, menor presión en su base", "La presión no depende en ningún caso de la altura de la columna de agua", "La relación entre presión y altura solo existe en tuberías horizontales"], correcta: 0 },
  { enunciado: "¿A qué equivale aproximadamente 1 metro de columna de agua (m.c.a.)?", explicacion: "Aproximadamente 9,8 kPa (unos 0,098 bar).", dificultad: "media", opciones: ["Aproximadamente 9,8 kPa", "Aproximadamente 98 kPa", "Aproximadamente 0,98 kPa", "Exactamente 1 kPa, sin ninguna aproximación"], correcta: 0 },
  { enunciado: "¿Qué es la pérdida de carga en una conducción de agua?", explicacion: "La disminución de presión por rozamiento al circular el agua por la tubería.", dificultad: "facil", opciones: ["La disminución de presión que sufre el agua al circular por rozamiento con la tubería", "El aumento de temperatura del agua al circular por la tubería", "La reducción del diámetro interior de la tubería con el paso del tiempo", "El incremento de caudal que se produce en los cambios de dirección"], correcta: 0 },
  { enunciado: "¿Qué ocurre con la pérdida de carga por rozamiento si aumenta el diámetro de la tubería, manteniendo el resto de factores?", explicacion: "Disminuye: a mayor diámetro, menor pérdida de carga.", dificultad: "media", opciones: ["Disminuye", "Aumenta", "Se mantiene exactamente igual en todos los casos", "Se vuelve negativa, aumentando la presión disponible"], correcta: 0 },
  { enunciado: "¿Qué son las pérdidas de carga localizadas?", explicacion: "Las que se producen en puntos singulares como codos, válvulas o reducciones.", dificultad: "dificil", opciones: ["Las pérdidas adicionales de presión en puntos singulares como codos, válvulas o reducciones de diámetro", "Las pérdidas de presión que solo se producen en los tramos rectos más largos de la instalación", "Las pérdidas de presión que solo pueden producirse en instalaciones de agua caliente sanitaria", "Un sinónimo exacto de la pérdida de carga total de toda la instalación, sin ninguna diferencia real"], correcta: 0 },
]);

const S3 = "el-golpe-de-ariete";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el golpe de ariete?", reverso: "Una sobrepresión (o depresión) brusca y transitoria que se produce en una conducción cuando se detiene o se pone en marcha bruscamente el movimiento del agua, por el cierre rápido de una válvula o grifo, o por la parada o arranque súbitos de una bomba" },
  { anverso: "¿Cuáles son las dos causas más habituales de golpe de ariete en una instalación de fontanería?", reverso: "El cierre brusco de una válvula, grifo o electroválvula (por ejemplo, de una lavadora o un fluxor), y la parada o el arranque brusco de un grupo de bombeo o grupo de presión" },
  { anverso: "¿Qué efectos puede provocar el golpe de ariete en una instalación?", reverso: "Ruido y vibraciones características (un golpeteo metálico en las tuberías), y en los casos más severos, fatiga de materiales, rotura de tuberías, uniones o accesorios, y daños en válvulas y aparatos" },
  { anverso: "¿Qué medidas se emplean para prevenir o amortiguar el golpe de ariete?", reverso: "Evitar cierres bruscos de válvulas (usar válvulas de cierre progresivo), instalar válvulas antiariete o calderines/depósitos de membrana que absorban la sobrepresión, y disponer válvulas antirretorno de tipo membrana en los grupos de presión, entre otras" },
  { anverso: "¿Exige el CTE DB-HS4 una magnitud numérica máxima de golpe de ariete admisible?", reverso: "No fija una cifra concreta como exigencia básica: lo que exige es que la instalación incorpore dispositivos de protección frente al golpe de ariete (por ejemplo, válvula antirretorno de tipo membrana en los grupos de presión convencionales, y un depósito de protección contra sobrepresiones)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el golpe de ariete?", explicacion: "Una sobrepresión brusca y transitoria por detención o arranque súbito del flujo de agua.", dificultad: "facil", opciones: ["Una sobrepresión brusca y transitoria por detención o arranque súbito del flujo de agua", "Una pérdida de presión progresiva y constante a lo largo de toda la instalación", "Un aumento gradual y permanente de la temperatura del agua en la instalación", "Una reducción progresiva del diámetro interior de las tuberías por incrustaciones"], correcta: 0 },
  { enunciado: "¿Cuáles son dos causas habituales de golpe de ariete?", explicacion: "Cierre brusco de válvulas/grifos y parada o arranque súbitos de bombas.", dificultad: "media", opciones: ["El cierre brusco de una válvula y la parada o arranque súbitos de una bomba", "La apertura lenta y progresiva de un grifo doméstico convencional", "El uso continuado de la instalación durante varias horas seguidas", "La instalación de un filtro nuevo en la acometida general del edificio"], correcta: 0 },
  { enunciado: "¿Qué efecto característico produce el golpe de ariete en una instalación?", explicacion: "Ruido y vibraciones (golpeteo) en las tuberías, pudiendo llegar a dañarlas.", dificultad: "facil", opciones: ["Ruido y vibraciones características, pudiendo dañar tuberías, uniones o accesorios", "Un aumento permanente y beneficioso del caudal disponible en la instalación", "Una mejora inmediata de la calidad sanitaria del agua suministrada", "Una reducción del consumo eléctrico de los equipos de bombeo instalados"], correcta: 0 },
  { enunciado: "¿Qué medida ayuda a prevenir el golpe de ariete en un grupo de presión convencional?", explicacion: "Instalar una válvula antirretorno de tipo membrana.", dificultad: "media", opciones: ["Instalar una válvula antirretorno de tipo membrana que amortigüe la sobrepresión", "Aumentar al máximo la velocidad de cierre de todas las válvulas de la instalación", "Eliminar por completo las válvulas antirretorno de toda la instalación", "Reducir al mínimo el diámetro de todas las tuberías de la instalación"], correcta: 0 },
  { enunciado: "¿Fija el CTE DB-HS4 una magnitud numérica máxima admisible de golpe de ariete?", explicacion: "No fija una cifra; exige dispositivos de protección frente al fenómeno.", dificultad: "dificil", opciones: ["No fija una cifra concreta; exige que la instalación incorpore dispositivos de protección frente al golpe de ariete", "Sí, fija una cifra concreta expresada en kPa que no puede superarse en ningún punto de la instalación", "No regula en absoluto el golpe de ariete en ninguno de sus apartados", "Sí, pero solo para instalaciones de agua caliente sanitaria, nunca para las de agua fría"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Caudal", definicion: "Volumen de agua que atraviesa una sección de tubería por unidad de tiempo, expresado habitualmente en l/s o m³/h." },
  { tema_slug: TEMA, seccion: S1, termino: "Coeficiente de simultaneidad", definicion: "Factor que reduce la suma de los caudales máximos de todos los aparatos servidos por un tramo, para reflejar que no todos se usan a la vez." },
  { tema_slug: TEMA, seccion: S2, termino: "Metro de columna de agua (m.c.a.)", definicion: "Unidad de presión habitual en fontanería, equivalente a la presión que ejerce una columna de agua de un metro de altura (aprox. 9,8 kPa)." },
  { tema_slug: TEMA, seccion: S2, termino: "Pérdida de carga localizada", definicion: "Pérdida adicional de presión que se produce en un punto singular de la instalación (codo, válvula, reducción) distinta de la pérdida por rozamiento en tramo recto." },
  { tema_slug: TEMA, seccion: S3, termino: "Golpe de ariete", definicion: "Sobrepresión o depresión brusca y transitoria producida por la detención o el arranque súbito del flujo de agua en una conducción." },
  { tema_slug: TEMA, seccion: S3, termino: "Válvula antiariete", definicion: "Dispositivo instalado para amortiguar la sobrepresión generada por el golpe de ariete, absorbiendo el pico de presión antes de que dañe la instalación." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-283 creado y vinculado como Tema 7 de Oficial Fontanero.");
