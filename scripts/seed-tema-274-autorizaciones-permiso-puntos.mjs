/**
 * Crea tema-274: "Autorizaciones administrativas para la conducción de
 * vehículos. Tipos. Permiso de conducción por puntos" — Tema 14
 * (numero=14, bloque-2) de Oficial Conductor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea
 * 1583):
 *   "Autorizaciones administrativas para la conducción de vehículos.
 *   Tipos. Permiso de conducción por puntos."
 *
 * Sourcing: normativa real y verificada — Real Decreto 818/2009
 * (BOE-A-2009-9481, Reglamento General de Conductores), que regula los
 * tipos de permisos y licencias de conducción y el sistema de permiso
 * por puntos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-274-autorizaciones-permiso-puntos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-274";
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
  titulo: "Autorizaciones administrativas para conducir y permiso por puntos",
  descripcion: "El Reglamento General de Conductores (RD 818/2009): tipos de permisos y licencias de conducción. El sistema de permiso de conducción por puntos: pérdida y recuperación de puntos.",
  contenido: "Desarrolla las distintas autorizaciones administrativas exigidas para conducir vehículos en España, reguladas por el Real Decreto 818/2009 (Reglamento General de Conductores): los tipos de permisos y licencias de conducción según la categoría de vehículo, y el sistema de control de las infracciones mediante la pérdida y recuperación de puntos del permiso de conducción.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2009-9481", titulo: "Real Decreto 818/2009 (Reglamento General de Conductores)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2009-9481", titulo: "Tipos de permisos y licencias de conducción", seccion: "tipos-de-permisos-y-licencias-de-conduccion", articulos: "RD 818/2009" },
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2009-9481", titulo: "El permiso de conducción por puntos", seccion: "el-permiso-de-conduccion-por-puntos", articulos: "RD 818/2009" },
    { url: "", titulo: "Vigencia, renovación y pérdida de vigencia del permiso", seccion: "vigencia-renovacion-y-perdida-de-vigencia", articulos: "RD 818/2009" },
  ],
}]);

const S1 = "tipos-de-permisos-y-licencias-de-conduccion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el permiso de conducción de la clase B?", reverso: "La autorización que habilita, con carácter general, para conducir automóviles cuya masa máxima autorizada no exceda de 3.500 kg y que no tengan más de 8 plazas además de la del conductor" },
  { anverso: "¿Qué es el permiso de conducción de la clase C?", reverso: "La autorización que habilita para conducir automóviles destinados al transporte de mercancías cuya masa máxima autorizada exceda de 3.500 kg, es decir, camiones" },
  { anverso: "¿Qué es el permiso de conducción de la clase D?", reverso: "La autorización que habilita para conducir automóviles destinados al transporte de personas con más de 8 plazas además de la del conductor, es decir, autobuses" },
  { anverso: "¿Qué significa el añadido \"E\" a una clase de permiso, como en \"BE\" o \"CE\"?", reverso: "Que el permiso habilita, además, para conducir el vehículo tractor de esa clase enganchado a un remolque cuya masa máxima autorizada supere determinados límites, ampliando la autorización a conjuntos de vehículo más remolque" },
  { anverso: "¿Qué diferencia existe entre un permiso de conducción y una licencia de conducción?", reverso: "El permiso de conducción habilita para conducir con carácter general las categorías de vehículos correspondientes; la licencia de conducción es una autorización de ámbito más limitado, exigida para determinados vehículos especiales (como ciclomotores en algunos casos, o determinada maquinaria) no cubiertos por las clases ordinarias de permiso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el permiso de conducción de la clase B?", explicacion: "Habilita para conducir automóviles de hasta 3.500 kg y 8 plazas además del conductor.", dificultad: "facil", opciones: ["Habilita para conducir automóviles de hasta 3.500 kg", "Habilita exclusivamente para conducir camiones de gran tonelaje", "Habilita exclusivamente para conducir autobuses de gran capacidad", "Habilita exclusivamente para conducir maquinaria agrícola especial"], correcta: 0 },
  { enunciado: "¿Qué es el permiso de conducción de la clase C?", explicacion: "Habilita para conducir camiones (más de 3.500 kg de masa máxima autorizada).", dificultad: "media", opciones: ["Habilita para conducir camiones de más de 3.500 kg", "Habilita para conducir automóviles de hasta 3.500 kg exclusivamente", "Habilita exclusivamente para conducir autobuses de gran capacidad", "Habilita exclusivamente para conducir ciclomotores y motocicletas"], correcta: 0 },
  { enunciado: "¿Qué es el permiso de conducción de la clase D?", explicacion: "Habilita para conducir autobuses (más de 8 plazas además del conductor).", dificultad: "media", opciones: ["Habilita para conducir autobuses de más de 8 plazas", "Habilita para conducir camiones de más de 3.500 kg exclusivamente", "Habilita para conducir automóviles de hasta 3.500 kg exclusivamente", "Habilita exclusivamente para conducir ciclomotores y motocicletas"], correcta: 0 },
  { enunciado: "¿Qué significa el añadido \"E\" a una clase de permiso, como en \"BE\"?", explicacion: "Amplía la autorización a conducir con un remolque enganchado que supere determinados límites de masa.", dificultad: "media", opciones: ["Amplía la autorización a conducir con un remolque enganchado", "Reduce la autorización exclusivamente a vehículos sin remolque alguno", "No tiene ningún significado adicional distinto de la clase B ordinaria", "Habilita exclusivamente para conducir vehículos eléctricos de la clase B"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un permiso y una licencia de conducción?", explicacion: "La licencia es de ámbito más limitado, para determinados vehículos especiales.", dificultad: "dificil", opciones: ["La licencia es de ámbito más limitado, para vehículos especiales", "Ambos términos designan exactamente la misma autorización administrativa", "La licencia habilita para conducir cualquier categoría de vehículo existente", "El permiso solo es exigible para vehículos de menos de 4 ruedas"], correcta: 0 },
]);

const S2 = "el-permiso-de-conduccion-por-puntos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste el sistema de permiso de conducción por puntos?", reverso: "Un sistema de control administrativo en el que cada conductor dispone de un saldo inicial de puntos, que se va reduciendo al cometer determinadas infracciones de tráfico, con el fin de fomentar un comportamiento respetuoso con las normas de circulación" },
  { anverso: "¿Cuál es el saldo inicial de puntos de un conductor que obtiene por primera vez el permiso de conducción?", reverso: "Con carácter general, 8 puntos para un conductor novel (durante los primeros años tras la obtención del permiso), frente a los 12 puntos del saldo inicial general de un conductor ya no novel" },
  { anverso: "¿Qué ocurre cuando un conductor pierde la totalidad de los puntos de su permiso de conducción?", reverso: "Pierde la vigencia del permiso de conducción, debiendo superar de nuevo las pruebas correspondientes (o un curso de recuperación de puntos, según el caso) para poder recuperar la autorización para conducir" },
  { anverso: "¿Cómo puede un conductor recuperar puntos de su permiso de conducción?", reverso: "Mediante el transcurso de un determinado periodo de tiempo sin cometer ninguna infracción que conlleve pérdida de puntos, o realizando de forma voluntaria un curso de sensibilización y reeducación vial homologado" },
  { anverso: "¿Qué tipo de infracciones conllevan la pérdida de puntos del permiso de conducción?", reverso: "Determinadas infracciones graves y muy graves de tráfico expresamente tipificadas (como el exceso de velocidad significativo, conducir bajo los efectos del alcohol o las drogas, o el uso manual del teléfono móvil), no las infracciones leves" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué consiste el sistema de permiso de conducción por puntos?", explicacion: "Un sistema de control que reduce un saldo de puntos al cometer determinadas infracciones.", dificultad: "facil", opciones: ["Un sistema que reduce un saldo de puntos al cometer infracciones", "Un sistema exclusivo para el pago de multas de tráfico pendientes", "Un sistema exclusivo para la renovación de la ITV del vehículo", "Un sistema exclusivo para la obtención del Certificado de Aptitud Profesional"], correcta: 0 },
  { enunciado: "¿Cuál es el saldo inicial de puntos de un conductor novel?", explicacion: "8 puntos, con carácter general, frente a los 12 de un conductor ya no novel.", dificultad: "media", opciones: ["8 puntos, con carácter general", "20 puntos, con carácter general", "0 puntos, con carácter general", "12 puntos, igual que un conductor ya no novel"], correcta: 0 },
  { enunciado: "¿Qué ocurre cuando un conductor pierde la totalidad de los puntos de su permiso?", explicacion: "Pierde la vigencia del permiso de conducción.", dificultad: "media", opciones: ["Pierde la vigencia del permiso de conducción", "No tiene ninguna consecuencia real sobre la vigencia de su permiso", "Únicamente recibe una advertencia informal sin ninguna consecuencia", "Solo pierde el derecho a conducir vehículos de la clase C o D"], correcta: 0 },
  { enunciado: "¿Cómo puede un conductor recuperar puntos de su permiso?", explicacion: "Por el transcurso de tiempo sin infracciones, o mediante un curso de sensibilización vial.", dificultad: "media", opciones: ["Por el transcurso de tiempo sin infracciones o un curso homologado", "Únicamente pagando una tasa administrativa adicional sin ningún curso", "No existe ninguna forma posible de recuperar puntos ya perdidos", "Únicamente renovando el permiso de conducción antes de su caducidad"], correcta: 0 },
  { enunciado: "¿Qué tipo de infracciones conllevan la pérdida de puntos del permiso?", explicacion: "Determinadas infracciones graves y muy graves expresamente tipificadas.", dificultad: "dificil", opciones: ["Determinadas infracciones graves y muy graves tipificadas", "Cualquier infracción de tráfico, incluidas las leves, sin excepción", "Únicamente las infracciones relacionadas con el estacionamiento indebido", "Ninguna infracción conlleva la pérdida de puntos del permiso actual"], correcta: 0 },
]);

const S3 = "vigencia-renovacion-y-perdida-de-vigencia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la vigencia general de un permiso de conducción de la clase B para un conductor entre 30 y 65 años?", reverso: "Con carácter general, 10 años, siendo la vigencia inferior para conductores más jóvenes o de mayor edad, y sujeta a superar el preceptivo reconocimiento médico para su renovación" },
  { anverso: "¿Qué debe hacer un conductor antes de que caduque la vigencia de su permiso de conducción?", reverso: "Renovarlo, lo que exige superar el reconocimiento médico correspondiente, dado que circular con el permiso caducado equivale a hacerlo sin la autorización administrativa exigida" },
  { anverso: "¿Qué diferencia existe entre la caducidad del permiso de conducción y la pérdida de vigencia por agotamiento del saldo de puntos?", reverso: "La caducidad se produce por el simple transcurso del plazo de vigencia sin renovar, mientras que la pérdida de vigencia por puntos se produce por la acumulación de infracciones que agotan el saldo disponible, siendo dos causas distintas de no poder conducir legalmente" },
  { anverso: "¿Qué consecuencia tiene conducir con el permiso caducado o con la vigencia perdida por agotamiento de puntos?", reverso: "Equivale a conducir sin la autorización administrativa exigida, lo que constituye una infracción sancionable, en determinados casos con relevancia incluso penal si se trata de una conducta reiterada" },
  { anverso: "¿Qué debe hacer un conductor que ha perdido la vigencia de su permiso por agotamiento de puntos para poder volver a conducir?", reverso: "Superar un curso de sensibilización y reeducación vial y las pruebas correspondientes exigidas por la normativa para recuperar la autorización para conducir" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la vigencia general de un permiso de la clase B para un conductor entre 30 y 65 años?", explicacion: "10 años, con carácter general.", dificultad: "facil", opciones: ["10 años, con carácter general", "1 año, con carácter general", "50 años, con carácter general", "No existe ningún plazo de vigencia para el permiso de conducción"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un conductor antes de que caduque su permiso de conducción?", explicacion: "Renovarlo, superando el reconocimiento médico correspondiente.", dificultad: "media", opciones: ["Renovarlo, superando el reconocimiento médico correspondiente", "No es necesario hacer nada, al renovarse automáticamente el permiso", "Solicitar directamente un permiso de una clase distinta a la anterior", "Esperar a que caduque para poder solicitar entonces su renovación"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre la caducidad del permiso y la pérdida de vigencia por puntos?", explicacion: "La caducidad es por transcurso de plazo sin renovar; la pérdida por puntos, por infracciones.", dificultad: "media", opciones: ["La caducidad es por plazo; la pérdida por puntos, por infracciones", "Ambas situaciones son exactamente equivalentes entre sí, sin diferencia real", "La caducidad se produce siempre por agotamiento del saldo de puntos", "La pérdida de vigencia por puntos nunca puede producirse en la práctica"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene conducir con el permiso caducado o sin vigencia por puntos?", explicacion: "Equivale a conducir sin autorización, infracción sancionable y en su caso penal.", dificultad: "dificil", opciones: ["Equivale a conducir sin la autorización administrativa exigida", "No tiene ninguna consecuencia real si el conductor no comete ninguna infracción adicional", "Únicamente afecta a la validez del seguro del vehículo utilizado", "Solo tiene consecuencias si se repite en más de tres ocasiones distintas"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un conductor sin vigencia de permiso por agotamiento de puntos para volver a conducir?", explicacion: "Superar un curso de sensibilización y reeducación vial y las pruebas exigidas.", dificultad: "media", opciones: ["Superar un curso de sensibilización y reeducación vial y las pruebas exigidas", "Esperar simplemente a que transcurra un año desde la pérdida de vigencia", "Pagar una tasa administrativa adicional, sin necesidad de ningún curso", "No puede recuperar en ningún caso la autorización para conducir"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Permiso de conducción clase C", definicion: "Autorización que habilita para conducir automóviles destinados al transporte de mercancías con masa máxima autorizada superior a 3.500 kg (camiones)." },
  { tema_slug: TEMA, seccion: S1, termino: "Licencia de conducción", definicion: "Autorización de ámbito más limitado que el permiso ordinario, exigida para determinados vehículos especiales no cubiertos por las clases ordinarias de permiso." },
  { tema_slug: TEMA, seccion: S2, termino: "Conductor novel", definicion: "Conductor que se encuentra dentro de los primeros años tras la obtención de su primer permiso de conducción, con un saldo inicial de puntos reducido respecto al general." },
  { tema_slug: TEMA, seccion: S2, termino: "Curso de sensibilización y reeducación vial", definicion: "Curso homologado que permite recuperar puntos del permiso de conducción, o recuperar la autorización tras haber perdido su vigencia por agotamiento del saldo." },
  { tema_slug: TEMA, seccion: S3, termino: "Caducidad del permiso", definicion: "Pérdida de la vigencia del permiso de conducción por el simple transcurso del plazo establecido sin haberlo renovado mediante el reconocimiento médico correspondiente." },
  { tema_slug: TEMA, seccion: S3, termino: "Reconocimiento médico", definicion: "Prueba de aptitud psicofísica exigida para obtener o renovar el permiso de conducción, que verifica que el conductor reúne las condiciones necesarias para conducir con seguridad." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-274 creado y vinculado como Tema 14 de Oficial Conductor General.");
