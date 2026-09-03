/**
 * Crea tema-276: "La carga de vehículos y transporte de personas,
 * mercancías o cosas" — Tema 16 (numero=16, bloque-2) de Oficial
 * Conductor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea
 * 1585):
 *   "La carga de vehículos y transporte de personas, mercancías o
 *   cosas."
 *
 * Sourcing: normativa real y verificada — Real Decreto 2822/1998
 * (BOE-A-1999-1826, Reglamento General de Vehículos, ya usado en
 * tema-271, especialmente su Anexo IX de masas y dimensiones) y Real
 * Decreto 563/2017 (BOE-A-2017-6512, inspecciones técnicas en
 * carretera, con su Anexo III sobre sujeción de la carga).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-276-carga-vehiculos-transporte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-276";
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
  titulo: "La carga de vehículos y el transporte de personas y mercancías",
  descripcion: "Masas y dimensiones máximas de los vehículos (RD 2822/1998, Anexo IX). Condiciones de la carga: disposición y sujeción. El transporte de personas: normas específicas según el tipo de vehículo.",
  contenido: "Desarrolla las condiciones que debe cumplir la carga de un vehículo: los límites de masa y dimensiones establecidos por el Reglamento General de Vehículos, la correcta disposición y sujeción de la carga para no comprometer la seguridad de la conducción (Real Decreto 563/2017), y las normas específicas aplicables al transporte de personas según el tipo de vehículo utilizado.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", titulo: "Real Decreto 2822/1998 (Reglamento General de Vehículos, Anexo IX: masas y dimensiones)" },
    { url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2017-6512", titulo: "Real Decreto 563/2017 (inspecciones técnicas en carretera, sujeción de la carga)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", titulo: "Masas y dimensiones máximas de los vehículos", seccion: "masas-y-dimensiones-maximas-de-los-vehiculos", articulos: "RD 2822/1998, Anexo IX" },
    { url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2017-6512", titulo: "Disposición y sujeción de la carga", seccion: "disposicion-y-sujecion-de-la-carga", articulos: "RD 563/2017, Anexo III" },
    { url: "", titulo: "El transporte de personas", seccion: "el-transporte-de-personas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "masas-y-dimensiones-maximas-de-los-vehiculos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Masa Máxima Autorizada (MMA) de un vehículo?", reverso: "La masa máxima que la Administración autoriza a un vehículo para circular, cargado, por las vías públicas, que no puede superarse en ningún caso, y que se refleja en la documentación oficial del vehículo" },
  { anverso: "¿Qué es la carga útil de un vehículo?", reverso: "La diferencia entre la Masa Máxima Autorizada (MMA) del vehículo y su tara (el peso del propio vehículo vacío, sin carga ni pasajeros), es decir, el peso máximo que puede transportar de mercancía o personas" },
  { anverso: "¿Qué establece con carácter general el RD 2822/1998 sobre las dimensiones máximas de un vehículo cargado?", reverso: "Fija límites máximos de longitud, anchura y altura del vehículo, incluida la carga transportada, salvo que se disponga de una autorización especial de transporte para superar esos límites en supuestos concretos" },
  { anverso: "¿Qué consecuencia tiene circular con un vehículo cuya masa supere la MMA autorizada?", reverso: "Constituye una infracción administrativa sancionable, además de suponer un riesgo real para la seguridad, al afectar negativamente a la capacidad de frenado, la estabilidad y el comportamiento general del vehículo" },
  { anverso: "¿Qué es una autorización especial de transporte?", reverso: "Un permiso específico exigido para circular con cargas o vehículos que superen las masas o dimensiones máximas ordinarias establecidas por la normativa, habitual en transportes especiales (maquinaria de gran tamaño, cargas indivisibles)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la Masa Máxima Autorizada (MMA) de un vehículo?", explicacion: "La masa máxima que la Administración autoriza a circular, cargado, por las vías públicas.", dificultad: "facil", opciones: ["La masa máxima autorizada a circular, cargado, por las vías públicas", "El peso del propio vehículo vacío, sin carga ni pasajeros", "La velocidad máxima autorizada para ese tipo de vehículo", "El número máximo de plazas autorizadas para ese vehículo"], correcta: 0 },
  { enunciado: "¿Qué es la carga útil de un vehículo?", explicacion: "La diferencia entre la MMA y la tara del vehículo.", dificultad: "media", opciones: ["La diferencia entre la MMA y la tara del vehículo", "La masa total del vehículo, incluida siempre su propia tara", "La velocidad máxima que puede alcanzar el vehículo cargado", "El número de ejes que tiene el vehículo en su configuración"], correcta: 0 },
  { enunciado: "¿Qué establece con carácter general el RD 2822/1998 sobre las dimensiones máximas del vehículo cargado?", explicacion: "Fija límites de longitud, anchura y altura, salvo autorización especial de transporte.", dificultad: "media", opciones: ["Fija límites de longitud, anchura y altura, salvo autorización especial", "No fija ningún límite de dimensiones para el vehículo cargado", "Fija únicamente un límite de longitud, sin ningún otro límite adicional", "Fija los mismos límites de dimensiones para cualquier tipo de vehículo"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene circular con un vehículo cuya masa supere la MMA autorizada?", explicacion: "Constituye una infracción sancionable y un riesgo real para la seguridad.", dificultad: "media", opciones: ["Constituye una infracción sancionable y un riesgo para la seguridad", "No tiene ninguna consecuencia real si el vehículo llega a su destino", "Únicamente reduce el consumo de combustible del vehículo cargado", "Solo tiene consecuencias si el exceso supera el doble de la MMA"], correcta: 0 },
  { enunciado: "¿Qué es una autorización especial de transporte?", explicacion: "Un permiso exigido para superar las masas o dimensiones máximas ordinarias.", dificultad: "dificil", opciones: ["Un permiso exigido para superar las masas o dimensiones ordinarias", "Un permiso exigido para cualquier transporte de mercancías, sin excepción", "Un permiso exclusivo para el transporte de personas, no de mercancías", "Un permiso que sustituye por completo al permiso de conducción ordinario"], correcta: 0 },
]);

const S2 = "disposicion-y-sujecion-de-la-carga";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige con carácter general el Reglamento General de Circulación sobre la disposición de la carga en un vehículo?", reverso: "Que esté dispuesta de tal forma que no pueda interferir con la conducción segura del vehículo, ni comprometer la estabilidad, la visibilidad o el correcto funcionamiento de sus elementos" },
  { anverso: "¿Qué regula el Anexo III del Real Decreto 563/2017 en relación con la carga?", reverso: "Los criterios para verificar, durante una inspección técnica en carretera, que la carga transportada está correctamente sujeta y no supone un riesgo de desplazamiento que pueda afectar a la seguridad, la salud, los bienes o el medio ambiente" },
  { anverso: "¿Qué riesgo concreto busca evitar la correcta sujeción de la carga durante el transporte?", reverso: "El desplazamiento incontrolado de la carga durante frenazos, aceleraciones, curvas o irregularidades del terreno, que podría comprometer la estabilidad del vehículo o provocar la caída de la carga a la vía" },
  { anverso: "¿Qué medios habituales se emplean para la sujeción de la carga en un vehículo?", reverso: "Cinchas o correas de amarre, redes, lonas, topes o calzos, y elementos de anclaje del propio vehículo, seleccionados según el tipo, el peso y la forma de la carga concreta a transportar" },
  { anverso: "¿Qué debería comprobar un conductor antes de iniciar un trayecto con carga sujeta mediante cinchas o correas?", reverso: "Que las cinchas están correctamente tensadas, sin roturas ni desgaste visible, y que la carga no presenta ningún movimiento apreciable al comprobar manualmente su sujeción" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué exige el Reglamento General de Circulación sobre la disposición de la carga?", explicacion: "Que no pueda interferir con la conducción segura del vehículo.", dificultad: "facil", opciones: ["Que no pueda interferir con la conducción segura del vehículo", "Que ocupe siempre la totalidad del espacio disponible en el vehículo", "Que se disponga siempre en la parte delantera del vehículo utilizado", "Ninguna exigencia específica distinta de no superar la MMA del vehículo"], correcta: 0 },
  { enunciado: "¿Qué regula el Anexo III del RD 563/2017 en relación con la carga?", explicacion: "Los criterios para verificar, en una inspección en carretera, que la carga está correctamente sujeta.", dificultad: "media", opciones: ["Los criterios para verificar la correcta sujeción de la carga", "Los criterios exclusivos para la homologación de vehículos nuevos", "Los criterios exclusivos para la obtención del permiso de conducción", "Los criterios exclusivos para el etiquetado ambiental de vehículos"], correcta: 0 },
  { enunciado: "¿Qué riesgo busca evitar la correcta sujeción de la carga?", explicacion: "El desplazamiento incontrolado de la carga durante la marcha.", dificultad: "media", opciones: ["El desplazamiento incontrolado de la carga durante la marcha", "El aumento del consumo de combustible del vehículo cargado", "La reducción de la velocidad máxima autorizada del vehículo", "El desgaste prematuro de los neumáticos del vehículo cargado"], correcta: 0 },
  { enunciado: "¿Qué medios habituales se emplean para la sujeción de la carga?", explicacion: "Cinchas, redes, lonas, topes o calzos y elementos de anclaje del vehículo.", dificultad: "media", opciones: ["Cinchas, redes, lonas, topes o calzos y anclajes del vehículo", "Únicamente el propio peso de la carga, sin ningún medio adicional", "Únicamente la carrocería del vehículo, sin ningún medio adicional", "Ningún medio específico, al no ser necesaria la sujeción de la carga"], correcta: 0 },
  { enunciado: "¿Qué debería comprobar un conductor antes de un trayecto con carga sujeta mediante cinchas?", explicacion: "Que estén correctamente tensadas, sin roturas, y que la carga no presente movimiento.", dificultad: "dificil", opciones: ["Que estén correctamente tensadas, sin roturas ni movimiento de la carga", "Únicamente el color de las cinchas utilizadas para la sujeción", "Únicamente el número de cinchas, sin comprobar su estado real", "Ninguna comprobación adicional, siendo suficiente con haberlas colocado"], correcta: 0 },
]);

const S3 = "el-transporte-de-personas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué límite general establece la normativa sobre el número de personas que puede transportar un vehículo?", reverso: "El número de plazas autorizadas que figura en la ficha técnica del vehículo, sin poder superarse ese número, con independencia del tamaño o la edad de los ocupantes" },
  { anverso: "¿Qué exige con carácter general la normativa sobre el uso del cinturón de seguridad en el transporte de personas?", reverso: "Que todos los ocupantes del vehículo, tanto delanteros como traseros, utilicen el cinturón de seguridad durante la circulación, siempre que el vehículo disponga de él, salvo las excepciones expresamente previstas por la normativa" },
  { anverso: "¿Qué normas específicas suelen exigirse para el transporte de menores en vehículos?", reverso: "El uso de sistemas de retención infantil homologados y adaptados a la edad, el peso y la altura del menor, salvo las excepciones expresamente previstas por la normativa" },
  { anverso: "¿Qué diferencia existe entre transportar personas en un turismo y hacerlo en un vehículo destinado específicamente al transporte colectivo, como un autobús?", reverso: "El vehículo de transporte colectivo debe cumplir requisitos técnicos y de homologación específicos (número de salidas de emergencia, elementos de seguridad adicionales) y su conducción exige, además, el permiso de la clase D correspondiente" },
  { anverso: "¿Qué debería comprobar un conductor antes de iniciar un trayecto con personas a bordo de un vehículo municipal?", reverso: "Que el número de ocupantes no supera las plazas autorizadas, que todos disponen de cinturón de seguridad abrochado, y que los menores, en su caso, utilizan el sistema de retención infantil correspondiente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué límite general establece la normativa sobre el número de personas transportadas?", explicacion: "El número de plazas autorizadas que figura en la ficha técnica del vehículo.", dificultad: "facil", opciones: ["El número de plazas autorizadas en la ficha técnica del vehículo", "No existe ningún límite legal sobre el número de personas transportadas", "El límite depende exclusivamente del tamaño físico de los ocupantes", "El límite se establece únicamente para vehículos de más de 8 plazas"], correcta: 0 },
  { enunciado: "¿Qué exige con carácter general la normativa sobre el cinturón de seguridad?", explicacion: "Que todos los ocupantes lo utilicen, delanteros y traseros, si el vehículo dispone de él.", dificultad: "media", opciones: ["Que todos los ocupantes lo utilicen, delanteros y traseros", "Que únicamente lo utilice el conductor, sin ninguna exigencia adicional", "Que únicamente lo utilicen los ocupantes de las plazas delanteras", "Que su uso sea siempre opcional, con independencia de la plaza ocupada"], correcta: 0 },
  { enunciado: "¿Qué exige con carácter general la normativa sobre el transporte de menores?", explicacion: "El uso de sistemas de retención infantil homologados y adaptados a edad, peso y altura.", dificultad: "media", opciones: ["El uso de sistemas de retención infantil homologados y adaptados", "El uso del cinturón de seguridad ordinario, sin ningún sistema adicional", "Ninguna exigencia específica distinta de la exigida a los adultos", "El uso de sistemas de retención infantil únicamente en vías interurbanas"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre transportar personas en un turismo y en un autobús?", explicacion: "El autobús exige requisitos técnicos específicos y el permiso de la clase D.", dificultad: "media", opciones: ["El autobús exige requisitos técnicos específicos y el permiso clase D", "No existe ninguna diferencia real entre ambos tipos de transporte", "El turismo exige siempre un permiso de una clase superior al del autobús", "El autobús no requiere ningún permiso adicional distinto al del turismo"], correcta: 0 },
  { enunciado: "¿Qué debería comprobar un conductor antes de un trayecto con personas a bordo de un vehículo municipal?", explicacion: "Plazas no superadas, cinturones abrochados y sistemas de retención infantil si procede.", dificultad: "dificil", opciones: ["Plazas no superadas, cinturones abrochados y retención infantil si procede", "Únicamente el número total de ocupantes, sin ninguna otra comprobación", "Únicamente el estado del cinturón del propio conductor del vehículo", "Ninguna comprobación adicional, siendo responsabilidad de cada ocupante"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "MMA", definicion: "Masa Máxima Autorizada: masa máxima que la Administración autoriza a un vehículo para circular, cargado, por las vías públicas." },
  { tema_slug: TEMA, seccion: S1, termino: "Tara", definicion: "Peso del propio vehículo vacío, sin carga ni pasajeros, cuya diferencia con la MMA determina la carga útil disponible." },
  { tema_slug: TEMA, seccion: S2, termino: "Sujeción de la carga", definicion: "Conjunto de medios (cinchas, redes, topes, anclajes) empleados para evitar el desplazamiento incontrolado de la carga durante el transporte." },
  { tema_slug: TEMA, seccion: S2, termino: "Inspección técnica en carretera", definicion: "Comprobación realizada por los agentes de tráfico a un vehículo comercial en circulación, que puede incluir la verificación de la correcta sujeción de la carga, regulada por el RD 563/2017." },
  { tema_slug: TEMA, seccion: S3, termino: "Sistema de retención infantil", definicion: "Dispositivo homologado (silla, alzador) adaptado a la edad, el peso y la altura de un menor, exigido con carácter general para su transporte en vehículo." },
  { tema_slug: TEMA, seccion: S3, termino: "Plazas autorizadas", definicion: "Número máximo de ocupantes que figura en la ficha técnica de un vehículo, que no puede superarse durante el transporte de personas." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-276 creado y vinculado como Tema 16 de Oficial Conductor General.");
