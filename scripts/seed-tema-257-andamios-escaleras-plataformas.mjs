/**
 * Crea tema-257: "Andamios. Escaleras. Plataformas Elevadoras y otros
 * medios auxiliares" — Tema 13 (numero=13, bloque-2) de Oficial Pintor,
 * Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea
 * 1515): "Andamios. Escaleras. Plataformas Elevadoras y otros medios
 * auxiliares. Condiciones que deben reunir. Normativa."
 *
 * Mismo contenido normativo ya desarrollado en tema-248 de Oficial
 * Pintor General (enunciado oficial equivalente), aplicado aquí al
 * contexto propio de los trabajos de rotulación e instalación de
 * elementos gráficos en altura.
 *
 * Normativa verificada (ya citada en el proyecto):
 * - RD 2177/2004, de 12 de noviembre, trabajos temporales en altura
 *   (BOE-A-2004-19311).
 * - RD 1215/1997, equipos de trabajo (BOE-A-1997-17824).
 * - RD 773/1997, equipos de protección individual (BOE-A-1997-12735).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-257-andamios-escaleras-plataformas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-257";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const RD_2177_2004 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2004-19311";
const RD_1215_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";

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
  titulo: "Andamios, escaleras, plataformas elevadoras y otros medios auxiliares",
  descripcion: "Tipos de andamios y condiciones que deben reunir. Escaleras de mano y su uso seguro. Plataformas elevadoras móviles de personal. Aplicación a la instalación de rótulos y elementos gráficos en altura.",
  contenido: "Desarrolla los medios auxiliares empleados por el Oficial Pintor Especialidad Gráfica para instalar rótulos, banderolas o elementos de señalética en altura: los andamios y las condiciones de montaje, uso y desmontaje que deben reunir conforme al RD 2177/2004; las escaleras de mano, con sus condiciones de uso seguro como puesto de trabajo; y las plataformas elevadoras móviles de personal (PEMP), especialmente habituales para la instalación puntual de rótulos en fachadas o elementos de señalética de gran tamaño.",
  enlaces_boe: [
    { url: RD_2177_2004, titulo: "RD 2177/2004 — trabajos temporales en altura (andamios, escaleras, cuerdas)" },
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo" },
    { url: RD_773_1997, titulo: "RD 773/1997 — equipos de protección individual" },
  ],
  indice_estudio: [
    { url: RD_2177_2004, titulo: "Andamios: condiciones que deben reunir", seccion: "andamios-condiciones-grafica", articulos: "RD 2177/2004" },
    { url: RD_2177_2004, titulo: "Escaleras de mano: condiciones de uso seguro", seccion: "escaleras-mano-condiciones-uso-seguro", articulos: "RD 2177/2004" },
    { url: RD_1215_1997, titulo: "Plataformas elevadoras móviles de personal aplicadas a la rotulación", seccion: "pemp-aplicadas-rotulacion", articulos: "RD 2177/2004, RD 1215/1997" },
  ],
}]);

const S1 = "andamios-condiciones-grafica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un andamio tubular, medio auxiliar que puede necesitar el Oficial Pintor Especialidad Gráfica para instalar un rótulo de gran tamaño en una fachada?", reverso: "Una estructura auxiliar formada por elementos tubulares metálicos ensamblados mediante uniones normalizadas, que conforma una plataforma de trabajo elevada y estable, montada conforme a un plan de montaje elaborado por personal con formación específica" },
  { anverso: "¿Qué exige el RD 2177/2004 respecto al montaje, modificación y desmontaje de un andamio empleado para la instalación de rotulación?", reverso: "Que estas operaciones sean realizadas por personal con la formación específica adecuada, siguiendo un plan de montaje, utilización y desmontaje, salvo que se trate de configuraciones tipo habituales previstas por el fabricante" },
  { anverso: "¿Qué condiciones básicas debe reunir la plataforma de trabajo de un andamio empleado para instalar un rótulo en altura?", reverso: "Una anchura mínima adecuada al trabajo a realizar, una superficie sin huecos peligrosos y con resistencia suficiente, barandillas de protección perimetral en los lados abiertos, y un sistema de acceso seguro" },
  { anverso: "¿Qué debería comprobar el Oficial Pintor Especialidad Gráfica antes de subir a un andamio ya montado por otra persona para instalar un elemento de señalética?", reverso: "Que el andamio dispone de la documentación de montaje correspondiente y de una revisión que confirme que ha sido aceptado como seguro para su uso, sin confiar únicamente en la apariencia visual de la estructura" },
  { anverso: "¿Por qué resulta especialmente relevante, en un trabajo de instalación de rótulos, coordinar el uso del andamio con el peso y las dimensiones del propio rótulo o panel a instalar?", reverso: "Porque manejar un elemento gráfico de gran tamaño o peso sobre una plataforma elevada añade un riesgo adicional de desequilibrio o de sobrecarga puntual del andamio, exigiendo prever cómo se izará y sujetará el elemento durante toda la maniobra de instalación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un andamio tubular?", explicacion: "Una estructura de elementos tubulares que conforma una plataforma de trabajo elevada.", dificultad: "facil", opciones: ["Una estructura de elementos tubulares que conforma una plataforma", "Una escalera de mano de gran longitud", "Una plataforma elevadora accionada mediante motor hidráulico", "Un andamio de baja altura formado por caballetes"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 2177/2004 respecto al montaje de un andamio empleado en rotulación?", explicacion: "Personal con formación específica, siguiendo un plan de montaje.", dificultad: "media", opciones: ["Personal con formación específica y un plan de montaje", "Ninguna exigencia específica sobre quién realiza el montaje", "Que lo realice exclusivamente el fabricante del andamio", "Que se monte siempre sin ningún plan previo por rapidez"], correcta: 0 },
  { enunciado: "¿Qué condición básica debe reunir la plataforma de trabajo de un andamio para instalar un rótulo?", explicacion: "Barandillas de protección perimetral en los lados abiertos, entre otras.", dificultad: "media", opciones: ["Barandillas de protección perimetral en los lados abiertos", "Ninguna protección perimetral resulta exigible en la práctica", "Una anchura mínima nunca resulta relevante en la normativa", "Un sistema de acceso resulta opcional según el criterio del pintor"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial antes de subir a un andamio ya montado por otra persona?", explicacion: "Que dispone de documentación de montaje y ha sido aceptado como seguro.", dificultad: "dificil", opciones: ["Que dispone de documentación y ha sido aceptado como seguro", "Basta con una comprobación visual superficial de la estructura", "Ninguna comprobación adicional resulta necesaria en la práctica", "Solo resulta relevante si el andamio supera los diez metros"], correcta: 0 },
  { enunciado: "¿Por qué es relevante coordinar el uso del andamio con el peso del rótulo a instalar?", explicacion: "Manejar un elemento de gran peso añade riesgo de desequilibrio o sobrecarga del andamio.", dificultad: "dificil", opciones: ["Añade riesgo de desequilibrio o sobrecarga del andamio", "El peso del rótulo nunca influye en la seguridad del andamio", "Solo resulta relevante si el rótulo es de vinilo de corte", "Solo resulta relevante en trabajos de exterior"], correcta: 0 },
]);

const S2 = "escaleras-mano-condiciones-uso-seguro";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué disposiciones específicas introdujo el RD 2177/2004 en relación con las escaleras de mano?", reverso: "Disposiciones sobre sus condiciones de uso seguro: apoyo estable y sobre superficie firme, ángulo de inclinación adecuado (regla aproximada de 1:4), sujeción cuando sea necesario, y limitación de su uso como puesto de trabajo para determinadas tareas de riesgo o larga duración" },
  { anverso: "¿En qué circunstancias resulta habitual que el Oficial Pintor Especialidad Gráfica emplee una escalera de mano para un trabajo de rotulación de corta duración?", reverso: "Para la aplicación de vinilos a poca altura, la instalación de pequeños rótulos o directorios interiores, o la revisión puntual de una señalética ya instalada, siempre que el trabajo resulte ligero, de corta duración y exista un agarre firme disponible" },
  { anverso: "¿Qué precaución debe adoptarse al apoyar una escalera de mano sobre un pavimento pulido o resbaladizo, habitual en interiores de edificios institucionales?", reverso: "Verificar que la base de la escalera dispone de elementos antideslizantes en buen estado, o emplear una persona auxiliar que sujete la base durante su uso, dado el mayor riesgo de deslizamiento de la escalera sobre este tipo de pavimento" },
  { anverso: "¿Qué debe evitarse, con carácter general, al emplear una escalera de mano para instalar un elemento gráfico que exija ambas manos libres (por ejemplo, sujetar un panel mientras se atornilla)?", reverso: "Trabajar en una posición inestable sobre la escalera sin un tercer punto de apoyo seguro, valorando en su lugar el empleo de un medio auxiliar más adecuado (andamio, plataforma) cuando la tarea exija ambas manos libres de forma prolongada" },
  { anverso: "¿Qué relación existe entre la limitación normativa al uso de la escalera de mano como puesto de trabajo y la elección de otros medios auxiliares (andamio, PEMP) para trabajos de mayor duración o riesgo en rotulación?", reverso: "La normativa reserva la escalera de mano para tareas ligeras y de corta duración, orientando hacia un andamio o una PEMP cuando el trabajo de instalación de un elemento gráfico exija mayor tiempo, peso a manipular o altura, por resultar estos medios más seguros" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué disposiciones introdujo el RD 2177/2004 en relación con las escaleras de mano?", explicacion: "Condiciones de apoyo, ángulo de inclinación, sujeción y limitación de su uso como puesto de trabajo.", dificultad: "media", opciones: ["Condiciones de apoyo, inclinación y limitación de su uso", "Ninguna disposición específica sobre escaleras de mano", "Solo disposiciones sobre su fabricación, no sobre su uso", "La prohibición absoluta de su uso en cualquier circunstancia"], correcta: 0 },
  { enunciado: "¿En qué circunstancias resulta habitual usar una escalera de mano en trabajos de rotulación?", explicacion: "En trabajos ligeros y de corta duración con agarre firme disponible, como vinilos a poca altura.", dificultad: "media", opciones: ["En trabajos ligeros y de corta duración con agarre firme", "En cualquier trabajo de rotulación sin ninguna limitación", "Nunca resulta adecuada en trabajos de rotulación", "Solo en trabajos de exterior de gran envergadura"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al apoyar una escalera sobre un pavimento pulido o resbaladizo?", explicacion: "Verificar elementos antideslizantes en la base o emplear una persona auxiliar de sujeción.", dificultad: "dificil", opciones: ["Verificar antideslizantes o emplear una persona auxiliar", "Ninguna precaución adicional distinta de un pavimento normal", "El tipo de pavimento nunca influye en la seguridad de la escalera", "Solo resulta relevante en pavimentos de exterior"], correcta: 0 },
  { enunciado: "¿Qué debe evitarse al usar una escalera para una tarea que exija ambas manos libres?", explicacion: "Trabajar en posición inestable sin un tercer punto de apoyo seguro.", dificultad: "media", opciones: ["Trabajar en posición inestable sin tercer punto de apoyo", "Ninguna precaución adicional resulta necesaria en este caso", "Emplear siempre las dos manos sin ninguna otra consideración", "Sustituir siempre la escalera por una plataforma en cualquier caso"], correcta: 0 },
  { enunciado: "¿Hacia qué medio auxiliar orienta la normativa cuando el trabajo de rotulación exige mayor tiempo, peso o altura que el propio de una escalera?", explicacion: "Hacia un andamio o una PEMP, medios más seguros para ese tipo de trabajo.", dificultad: "dificil", opciones: ["Hacia un andamio o una PEMP más seguros", "Siempre hacia la propia escalera, sin ninguna otra alternativa", "Ningún medio auxiliar resulta preferible a la escalera de mano", "Hacia un sistema de cuerdas exclusivamente, sin otra opción"], correcta: 0 },
]);

const S3 = "pemp-aplicadas-rotulacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una plataforma elevadora móvil de personal (PEMP), medio especialmente habitual para instalar rótulos de gran tamaño en fachadas?", reverso: "Un equipo autopropulsado o remolcado, dotado de una plataforma o cesta en la que se sitúan las personas trabajadoras, que puede elevarse y desplazarse para realizar trabajos en altura sin necesidad de montar un andamio completo" },
  { anverso: "¿Qué ventaja ofrece una PEMP frente a un andamio para la instalación puntual de un rótulo en una fachada de un edificio municipal?", reverso: "Permite acceder rápidamente al punto exacto de instalación sin el tiempo y el coste de montar un andamio completo, resultando especialmente eficiente para trabajos puntuales o de corta duración como la colocación de un único rótulo" },
  { anverso: "¿Qué formación exige, con carácter general, el manejo de una plataforma elevadora móvil de personal?", reverso: "Una formación específica para su manejo, habitualmente certificada mediante un carné o certificado de operador de PEMP, que capacite en el conocimiento de los mandos y de los riesgos característicos de este equipo" },
  { anverso: "¿Qué elemento de seguridad debe utilizarse, con carácter general, dentro de la cesta de una PEMP mientras se instala un rótulo de cierto peso en una fachada?", reverso: "Un arnés anticaídas conectado a un punto de anclaje homologado de la propia cesta, dado que la manipulación de un rótulo pesado puede generar movimientos bruscos que aumenten el riesgo de proyección fuera de la cesta" },
  { anverso: "¿Qué precaución adicional debería adoptar el Oficial al planificar el izado de un rótulo pesado hasta la cesta de una PEMP ya elevada?", reverso: "Prever un sistema seguro de izado del elemento (grúa auxiliar, cuerda con el equipo adecuado) que no dependa de que la propia persona operadora sostenga físicamente todo el peso del rótulo mientras maneja al mismo tiempo los mandos de la plataforma" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una plataforma elevadora móvil de personal (PEMP)?", explicacion: "Un equipo con plataforma o cesta que se eleva y desplaza para trabajos en altura sin andamio.", dificultad: "facil", opciones: ["Un equipo con cesta que se eleva para trabajos en altura", "Un andamio tubular de gran altura montado en fachada", "Una escalera de mano de gran longitud", "Un andamio de borriquetas de baja altura"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece una PEMP frente a un andamio para instalar un único rótulo en fachada?", explicacion: "Permite acceder rápidamente sin el tiempo y coste de montar un andamio completo.", dificultad: "media", opciones: ["Permite acceder rápidamente sin montar un andamio completo", "Siempre resulta más lenta que montar un andamio completo", "No ofrece ninguna ventaja real frente a un andamio", "Solo resulta útil para trabajos de larga duración"], correcta: 0 },
  { enunciado: "¿Qué formación exige, con carácter general, el manejo de una PEMP?", explicacion: "Una formación específica certificada mediante carné o certificado de operador.", dificultad: "media", opciones: ["Una formación específica certificada de operador", "Ninguna formación específica resulta exigible", "Basta con la experiencia general en el oficio de pintor", "Solo resulta exigible si la PEMP supera los veinte metros"], correcta: 0 },
  { enunciado: "¿Qué elemento de seguridad debe usarse dentro de la cesta de una PEMP al instalar un rótulo pesado?", explicacion: "Un arnés anticaídas conectado a un punto de anclaje homologado de la cesta.", dificultad: "dificil", opciones: ["Un arnés anticaídas conectado a un punto de anclaje", "Ningún elemento adicional distinto de la barandilla perimetral", "Un chaleco de alta visibilidad, sin ningún otro elemento", "Un casco de protección, sin ningún sistema anticaídas"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al izar un rótulo pesado hasta la cesta de una PEMP ya elevada?", explicacion: "Prever un sistema seguro de izado que no dependa de que el operador sostenga todo el peso a mano.", dificultad: "dificil", opciones: ["Prever un sistema de izado que no dependa del propio operador", "Sostener siempre el rótulo con las manos mientras se opera la PEMP", "Ninguna precaución adicional resulta necesaria en este caso", "Elevar siempre el rótulo antes de elevar la propia cesta"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-257 creado y vinculado como Tema 13 de Oficial Pintor Gráfica.");
