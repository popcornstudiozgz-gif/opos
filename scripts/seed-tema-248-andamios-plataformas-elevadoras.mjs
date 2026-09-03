/**
 * Crea tema-248: "Andamios. Plataformas Elevadoras y otros medios
 * auxiliares" — Tema 20 (numero=20, bloque-2) de Oficial Pintor,
 * Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea
 * 1483): "Andamios. Plataformas Elevadoras y otros medios auxiliares.
 * Condiciones que deben reunir."
 *
 * Normativa verificada en esta sesión (y ya citada en otros temas del
 * proyecto):
 * - RD 2177/2004, de 12 de noviembre, por el que se modifica el RD
 *   1215/1997 en materia de trabajos temporales en altura
 *   (BOE-A-2004-19311) — disposiciones específicas sobre escaleras de
 *   mano, andamios y técnicas de acceso mediante cuerdas.
 * - RD 1215/1997, de 18 de julio, equipos de trabajo (BOE-A-1997-17824)
 *   — ya citado en otros temas del proyecto.
 * - Ley 31/1995 y RD 773/1997 (EPI), ya citados.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-248-andamios-plataformas-elevadoras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-248";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

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
  titulo: "Andamios, plataformas elevadoras y otros medios auxiliares",
  descripcion: "Tipos de andamios y condiciones que deben reunir. Plataformas elevadoras móviles de personal. Escaleras de mano y otros medios auxiliares para trabajos en altura.",
  contenido: "Desarrolla los medios auxiliares empleados por el Oficial Pintor para trabajar en altura: los andamios (tubulares, de borriquetas, colgados) y las condiciones de montaje, uso y desmontaje que deben reunir conforme al RD 2177/2004; las plataformas elevadoras móviles de personal (PEMP), su tipología y condiciones de uso seguro; y las escaleras de mano y otros medios auxiliares, con sus condiciones específicas de utilización segura conforme a la normativa de trabajos temporales en altura.",
  enlaces_boe: [
    { url: RD_2177_2004, titulo: "RD 2177/2004 — trabajos temporales en altura (andamios, escaleras, cuerdas)" },
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo" },
    { url: RD_773_1997, titulo: "RD 773/1997 — equipos de protección individual" },
  ],
  indice_estudio: [
    { url: RD_2177_2004, titulo: "Andamios: tipos y condiciones que deben reunir", seccion: "andamios-tipos-condiciones", articulos: "RD 2177/2004" },
    { url: RD_2177_2004, titulo: "Plataformas elevadoras móviles de personal (PEMP)", seccion: "plataformas-elevadoras-moviles-personal", articulos: "RD 2177/2004, RD 1215/1997" },
    { url: RD_773_1997, titulo: "Escaleras de mano y otros medios auxiliares", seccion: "escaleras-mano-otros-medios-auxiliares", articulos: "RD 2177/2004, RD 773/1997" },
  ],
}]);

const S1 = "andamios-tipos-condiciones";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un andamio tubular (o andamio modular), habitual en trabajos de pintura de fachadas?", reverso: "Una estructura auxiliar formada por elementos tubulares metálicos (montantes, travesaños, diagonales) ensamblados mediante uniones normalizadas, que conforma una plataforma de trabajo elevada y estable, montada, modificada y desmontada conforme a un plan de montaje" },
  { anverso: "¿Qué es un andamio de borriquetas, y en qué situaciones resulta habitual su uso en trabajos de pintura?", reverso: "Un andamio de baja altura formado por dos o más caballetes o borriquetas sobre los que se apoyan tablones, empleado habitualmente en trabajos de pintura de interiores o de exteriores de escasa altura, donde no resulta necesario un andamio tubular completo" },
  { anverso: "¿Qué exige el RD 2177/2004 respecto al montaje, modificación y desmontaje de un andamio?", reverso: "Que estas operaciones sean realizadas por personal con la formación específica adecuada, siguiendo un plan de montaje, utilización y desmontaje elaborado por una persona con formación universitaria o profesional que le habilite para ello, salvo que se trate de configuraciones tipo habituales previstas por el fabricante" },
  { anverso: "¿Qué condiciones básicas debe reunir la plataforma de trabajo de un andamio conforme a la normativa de trabajos en altura?", reverso: "Una anchura mínima adecuada al trabajo a realizar, una superficie sin huecos peligrosos y con la resistencia suficiente, barandillas de protección perimetral (pasamanos, barra intermedia y rodapié) en los lados abiertos, y un sistema de acceso seguro (escalera interior u otro medio homologado)" },
  { anverso: "¿Qué debe comprobar el Oficial Pintor antes de subir a un andamio ya montado por otra persona, antes de comenzar su jornada de trabajo?", reverso: "Que el andamio dispone de la documentación de montaje correspondiente (nota de cálculo o plan de montaje, en su caso) y de un distintivo o comunicación que confirme que ha sido revisado y aceptado como seguro para su uso, sin confiar únicamente en la apariencia visual de la estructura" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un andamio tubular?", explicacion: "Una estructura de elementos tubulares metálicos ensamblados que conforma una plataforma elevada.", dificultad: "facil", opciones: ["Una estructura de elementos tubulares que conforma una plataforma", "Un andamio de baja altura formado por caballetes y tablones", "Una plataforma elevadora accionada mediante motor hidráulico", "Una escalera de mano de gran longitud y estabilidad"], correcta: 0 },
  { enunciado: "¿Qué es un andamio de borriquetas?", explicacion: "Un andamio de baja altura con caballetes sobre los que se apoyan tablones.", dificultad: "media", opciones: ["Un andamio de baja altura con caballetes y tablones", "Una estructura tubular de gran altura para fachadas", "Una plataforma elevadora móvil de personal", "Un sistema de acceso mediante cuerdas y arneses"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 2177/2004 respecto al montaje de un andamio?", explicacion: "Que lo realice personal con formación específica, siguiendo un plan de montaje.", dificultad: "media", opciones: ["Personal con formación específica y un plan de montaje", "Ninguna exigencia específica sobre quién realiza el montaje", "Que lo realice exclusivamente el fabricante del andamio", "Que se monte siempre sin ningún plan previo por rapidez"], correcta: 0 },
  { enunciado: "¿Qué condición básica debe reunir la plataforma de trabajo de un andamio?", explicacion: "Barandillas de protección perimetral en los lados abiertos, entre otras condiciones.", dificultad: "media", opciones: ["Barandillas de protección perimetral en los lados abiertos", "Ninguna protección perimetral resulta exigible en la práctica", "Una anchura mínima nunca resulta relevante en la normativa", "Un sistema de acceso resulta opcional según el criterio del pintor"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial Pintor antes de subir a un andamio montado por otra persona?", explicacion: "Que dispone de documentación de montaje y ha sido revisado y aceptado como seguro.", dificultad: "dificil", opciones: ["Que dispone de documentación y ha sido revisado como seguro", "Basta con una comprobación visual superficial de la estructura", "Ninguna comprobación adicional resulta necesaria en la práctica", "Solo resulta relevante si el andamio supera los diez metros"], correcta: 0 },
]);

const S2 = "plataformas-elevadoras-moviles-personal";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una plataforma elevadora móvil de personal (PEMP)?", reverso: "Un equipo de trabajo autopropulsado o remolcado, dotado de una plataforma o cesta en la que se sitúan las personas trabajadoras, que puede elevarse y desplazarse para realizar trabajos en altura sin necesidad de montar un andamio, especialmente útil para trabajos de pintura puntuales o de corta duración" },
  { anverso: "¿Qué diferencia principal existe entre una PEMP de tijera y una PEMP articulada (o brazo articulado)?", reverso: "La PEMP de tijera se eleva verticalmente mediante un mecanismo de tijera, con un desplazamiento horizontal limitado de la plataforma; la PEMP articulada dispone de un brazo con varios segmentos articulados que permite alcanzar puntos alejados de la base o sortear obstáculos, con mayor versatilidad de alcance" },
  { anverso: "¿Qué formación exige, con carácter general, el manejo de una plataforma elevadora móvil de personal?", reverso: "Una formación específica para su manejo (habitualmente certificada mediante un carné o certificado de operador de PEMP), que capacite a la persona operadora en el conocimiento de los mandos, los dispositivos de seguridad y los riesgos característicos de este equipo de trabajo" },
  { anverso: "¿Qué elemento de seguridad debe utilizarse, con carácter general, dentro de la cesta o plataforma de una PEMP durante su elevación?", reverso: "Un arnés anticaídas conectado mediante un punto de anclaje homologado a la propia estructura de la cesta, dado que, pese a disponer de barandilla perimetral, existe riesgo de proyección fuera de la cesta ante un movimiento brusco o una colisión" },
  { anverso: "¿Qué precaución debe adoptarse respecto al terreno de apoyo antes de desplegar y elevar una plataforma elevadora móvil de personal?", reverso: "Verificar que el terreno de apoyo es suficientemente firme y nivelado, y respetar las distancias de seguridad frente a desniveles, huecos o líneas eléctricas aéreas, dado que la elevación de la plataforma desplaza el centro de gravedad del conjunto y exige una base de apoyo estable" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una plataforma elevadora móvil de personal (PEMP)?", explicacion: "Un equipo con plataforma o cesta que se eleva y desplaza para trabajos en altura sin andamio.", dificultad: "facil", opciones: ["Un equipo con cesta que se eleva para trabajos en altura", "Un andamio tubular de gran altura montado en fachada", "Una escalera de mano de gran longitud", "Un andamio de borriquetas de baja altura"], correcta: 0 },
  { enunciado: "¿Qué diferencia una PEMP de tijera de una PEMP articulada?", explicacion: "La de tijera eleva verticalmente con desplazamiento limitado; la articulada alcanza puntos alejados.", dificultad: "media", opciones: ["La articulada alcanza puntos alejados mediante su brazo", "Ambos tipos ofrecen exactamente el mismo alcance", "La de tijera siempre resulta más versátil que la articulada", "La articulada nunca puede sortear obstáculos"], correcta: 0 },
  { enunciado: "¿Qué formación exige, con carácter general, el manejo de una PEMP?", explicacion: "Una formación específica certificada mediante carné o certificado de operador.", dificultad: "media", opciones: ["Una formación específica certificada de operador", "Ninguna formación específica resulta exigible", "Basta con la experiencia general en maquinaria de obra", "Solo resulta exigible si la PEMP supera los veinte metros"], correcta: 0 },
  { enunciado: "¿Qué elemento de seguridad debe utilizarse dentro de la cesta de una PEMP en elevación?", explicacion: "Un arnés anticaídas conectado a un punto de anclaje homologado de la cesta.", dificultad: "dificil", opciones: ["Un arnés anticaídas conectado a un punto de anclaje", "Ningún elemento adicional distinto de la barandilla perimetral", "Un chaleco de alta visibilidad, sin ningún otro elemento", "Un casco de protección, sin ningún sistema anticaídas"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse respecto al terreno antes de elevar una PEMP?", explicacion: "Verificar que es firme y nivelado, respetando distancias frente a desniveles o líneas eléctricas.", dificultad: "media", opciones: ["Verificar que el terreno es firme y nivelado", "El terreno de apoyo nunca resulta relevante en una PEMP", "Solo resulta relevante si la PEMP es de tipo articulado", "Solo resulta relevante en trabajos de más de un día"], correcta: 0 },
]);

const S3 = "escaleras-mano-otros-medios-auxiliares";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué disposiciones específicas introdujo el RD 2177/2004 en relación con las escaleras de mano?", reverso: "Disposiciones sobre sus condiciones de uso seguro: apoyo estable y sobre superficie firme, ángulo de inclinación adecuado (regla aproximada de 1:4), sujeción o amarre en la parte superior o inferior cuando sea necesario, y prohibición de su uso como puesto de trabajo para determinadas tareas de riesgo o larga duración, salvo que las características del lugar no permitan otro medio más seguro" },
  { anverso: "¿Qué precaución debe adoptarse al utilizar una escalera de mano para un trabajo de pintura de corta duración a poca altura, conforme a la normativa de trabajos en altura?", reverso: "Verificar que el uso de la escalera resulta adecuado por la ligereza del trabajo, su corta duración y la existencia de agarre firme, dado que la propia normativa limita su empleo como puesto de trabajo a estas circunstancias, prefiriendo otros medios auxiliares (andamio, PEMP) cuando el trabajo lo exija" },
  { anverso: "¿Qué son las técnicas de acceso y posicionamiento mediante cuerdas (\"trabajos verticales\"), mencionadas expresamente en el RD 2177/2004?", reverso: "Un sistema de trabajo en altura basado en el uso de cuerdas, arneses y dispositivos específicos de progresión y posicionamiento, empleado en fachadas u otros elementos de difícil acceso donde no resulta viable un andamio o una plataforma elevadora, exigiendo formación especializada y un sistema de doble cuerda (de trabajo y de seguridad)" },
  { anverso: "¿Qué otros medios auxiliares, distintos del andamio, la PEMP y la escalera de mano, puede emplear el Oficial Pintor para trabajos puntuales a poca altura?", reverso: "Plataformas de trabajo individuales portátiles, banquetas o taburetes de trabajo homologados para uso profesional, o pequeños andamios modulares de fácil montaje para trabajos de interior de altura reducida, siempre respetando las condiciones de estabilidad y protección exigibles a cualquier medio auxiliar" },
  { anverso: "¿Qué criterio general debe seguir el Oficial Pintor para elegir el medio auxiliar más adecuado (andamio, PEMP, escalera) para un trabajo concreto en altura?", reverso: "Evaluar la altura, la duración del trabajo, la superficie de apoyo disponible, el número de personas que deben trabajar simultáneamente y el riesgo específico de la tarea, seleccionando siempre el medio que ofrezca mayor seguridad razonablemente posible para esas circunstancias concretas, conforme al principio de jerarquía de medidas preventivas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué disposiciones introdujo el RD 2177/2004 en relación con las escaleras de mano?", explicacion: "Condiciones de apoyo, ángulo de inclinación, sujeción y limitación de su uso como puesto de trabajo.", dificultad: "media", opciones: ["Condiciones de apoyo, inclinación y limitación de su uso", "Ninguna disposición específica sobre escaleras de mano", "Solo disposiciones sobre su fabricación, no sobre su uso", "La prohibición absoluta de su uso en cualquier circunstancia"], correcta: 0 },
  { enunciado: "¿En qué circunstancias limita la normativa el uso de una escalera de mano como puesto de trabajo?", explicacion: "A trabajos ligeros, de corta duración y con agarre firme, prefiriendo otros medios si el trabajo lo exige.", dificultad: "media", opciones: ["A trabajos ligeros, de corta duración y con agarre firme", "Nunca limita su uso, siendo válida para cualquier trabajo", "Solo la limita si la escalera supera los cinco metros", "Solo la limita en trabajos de exterior, nunca en interior"], correcta: 0 },
  { enunciado: "¿Qué son las técnicas de acceso y posicionamiento mediante cuerdas o \"trabajos verticales\"?", explicacion: "Un sistema con cuerdas, arneses y dispositivos de progresión, con sistema de doble cuerda.", dificultad: "dificil", opciones: ["Un sistema con cuerdas y arneses de doble cuerda", "Un tipo de andamio tubular de gran altura", "Una plataforma elevadora de tipo articulado", "Una escalera de mano de uso profesional reforzada"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es otro medio auxiliar que puede emplear el Oficial Pintor para trabajos puntuales a poca altura?", explicacion: "Banquetas o taburetes de trabajo homologados para uso profesional, entre otros medios.", dificultad: "media", opciones: ["Banquetas o taburetes de trabajo homologados", "Una plataforma elevadora articulada de gran alcance", "Un andamio tubular de fachada de gran altura", "Un sistema de cuerdas para trabajos verticales"], correcta: 0 },
  { enunciado: "¿Qué criterio general debe seguir el Oficial Pintor para elegir el medio auxiliar más adecuado a un trabajo en altura?", explicacion: "Evaluar altura, duración, apoyo, personal y riesgo, eligiendo el medio más seguro razonablemente posible.", dificultad: "dificil", opciones: ["Evaluar las circunstancias del trabajo y elegir el medio más seguro", "Emplear siempre la escalera de mano por ser la más rápida", "El medio auxiliar elegido nunca influye en la seguridad del trabajo", "Emplear siempre el mismo medio con independencia del trabajo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-248 creado y vinculado como Tema 20 de Oficial Pintor General.");
