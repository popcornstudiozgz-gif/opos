/**
 * Crea tema-87: "Tratamiento del agua de piscinas: desinfección" — Tema
 * 17 (numero=17, bloque-2) de Oficial Polivalente Instalaciones
 * Deportivas (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf):
 *   "Tratamiento del agua de las piscinas: Tratamiento desinfectante.
 *   Sistemas de desinfección y productos químicos. Riesgos en la
 *   utilización de productos químicos."
 *
 * Conocimiento técnico consolidado de tratamiento de aguas de piscina;
 * no requiere cita legal artículo a artículo. Complementa a tema-85
 * (Decreto 50/1993, que exige la desinfección) y tema-86 (depuración
 * física). Los riesgos de manipulación de productos químicos se tratan
 * como conocimiento de seguridad laboral consolidado, coherente con el
 * criterio ya aplicado en otros temas del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-87-tratamiento-agua-desinfeccion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-87";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Tratamiento del agua de piscinas: desinfección",
  descripcion: "Sistemas de desinfección del agua de piscinas y productos químicos empleados. Riesgos en la utilización de productos químicos de tratamiento.",
  contenido: "Desarrolla los sistemas de desinfección del agua de piscinas (cloración, otros sistemas de desinfección) y los productos químicos habituales de tratamiento, junto con los riesgos derivados de su utilización y las medidas de seguridad exigibles en su manipulación.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Sistemas de desinfección del agua de piscina", seccion: "sistemas-desinfeccion-piscinas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Productos químicos de tratamiento del agua", seccion: "productos-quimicos-tratamiento-agua", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Riesgos en la utilización de productos químicos", seccion: "riesgos-productos-quimicos-piscinas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistemas-desinfeccion-piscinas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el sistema de desinfección más habitual en piscinas de uso público?", reverso: "La cloración, mediante la dosificación de productos a base de cloro que eliminan microorganismos patógenos presentes en el agua" },
  { anverso: "¿Qué es el cloro libre (o cloro residual libre) en el agua de una piscina?", reverso: "La fracción de cloro disponible en el agua para desinfectar, sin haber reaccionado todavía con materia orgánica; es el indicador principal de la capacidad desinfectante activa del agua" },
  { anverso: "¿Qué es el cloro combinado (o cloraminas) en el agua de una piscina?", reverso: "El cloro que ya ha reaccionado con materia orgánica (sudor, orina, cosméticos) formando compuestos (cloraminas) con menor poder desinfectante y responsables del característico olor a 'cloro' e irritación de ojos" },
  { anverso: "¿Qué es el cloro total del agua de una piscina?", reverso: "La suma del cloro libre y el cloro combinado presentes en el agua" },
  { anverso: "¿Qué es la desinfección por bromo y en qué se diferencia de la cloración?", reverso: "Un sistema alternativo que usa bromo como desinfectante en lugar de cloro; genera menos olor característico y es más estable a temperaturas altas, por lo que se usa a veces en piscinas climatizadas o spas" },
  { anverso: "¿Qué es la desinfección por UV (ultravioleta) como sistema complementario en piscinas?", reverso: "Un sistema que expone el agua a radiación ultravioleta para inactivar microorganismos, reduciendo la formación de cloraminas y la cantidad de cloro necesaria, aunque no sustituye por completo a la desinfección química residual" },
  { anverso: "¿Qué es la electrólisis salina como sistema de desinfección de piscinas?", reverso: "Un sistema que genera cloro de forma automática a partir de sal disuelta en el agua mediante un proceso electrolítico, reduciendo la manipulación directa de productos químicos concentrados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es el sistema de desinfección más habitual en piscinas de uso público?", explicacion: "La cloración.", dificultad: "facil", opciones: ["La cloración", "La desinfección exclusivamente por UV", "La electrólisis salina exclusivamente", "No se desinfecta el agua de piscinas públicas"], correcta: 0 },
  { enunciado: "¿Qué es el cloro libre en el agua de una piscina?", explicacion: "El cloro disponible para desinfectar, sin reaccionar aún con materia orgánica.", dificultad: "media", opciones: ["El cloro disponible sin reaccionar con materia orgánica", "El cloro que ya ha reaccionado formando cloraminas", "La suma de todo el cloro presente en el agua", "Un producto distinto del cloro, sin relación con él"], correcta: 0 },
  { enunciado: "¿Qué es el cloro combinado (cloraminas)?", explicacion: "Cloro que ya ha reaccionado con materia orgánica, con menor poder desinfectante.", dificultad: "media", opciones: ["Cloro que ha reaccionado con materia orgánica", "El cloro más eficaz para desinfectar", "Un sistema de desinfección por UV", "Un producto para regular el pH"], correcta: 0 },
  { enunciado: "¿Qué es el cloro total del agua de una piscina?", explicacion: "La suma del cloro libre y el cloro combinado.", dificultad: "media", opciones: ["La suma de cloro libre y cloro combinado", "Solo el cloro combinado", "Solo el cloro libre", "El cloro que se ha evaporado del agua"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el bromo frente al cloro en piscinas climatizadas?", explicacion: "Genera menos olor y es más estable a temperaturas altas.", dificultad: "media", opciones: ["Genera menos olor y es más estable con calor", "Es siempre más barato que el cloro", "Elimina la necesidad de filtrar el agua", "Sustituye al filtro de arena de sílice"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la desinfección UV como sistema complementario?", explicacion: "Reduce la formación de cloraminas y la cantidad de cloro necesaria.", dificultad: "media", opciones: ["Reduce la formación de cloraminas", "Sustituye por completo al cloro residual", "Elimina la necesidad de filtrado del agua", "Aumenta el pH del agua automáticamente"], correcta: 0 },
  { enunciado: "¿Cómo genera cloro un sistema de electrólisis salina?", explicacion: "A partir de sal disuelta en el agua mediante un proceso electrolítico.", dificultad: "media", opciones: ["A partir de sal disuelta mediante electrólisis", "Añadiendo pastillas de cloro manualmente", "Mediante radiación ultravioleta", "Mediante calentamiento del agua"], correcta: 0 },
]);

const S2 = "productos-quimicos-tratamiento-agua";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué formas comerciales habituales tiene el cloro empleado en piscinas?", reverso: "Hipoclorito sódico líquido, hipoclorito cálcico granulado o en pastillas, y dicloroisocianurato (tricloro/dicloro) en pastillas de disolución lenta" },
  { anverso: "¿Qué producto se usa para bajar el pH del agua de una piscina y por qué es necesario controlarlo?", reverso: "Un reductor de pH (ácido, como el bisulfato sódico o ácido clorhídrico diluido); es necesario porque un pH elevado reduce la eficacia del cloro y puede irritar ojos y piel" },
  { anverso: "¿Qué producto se usa para subir el pH del agua de una piscina?", reverso: "Un incrementador de pH (base, como el carbonato sódico), necesario cuando el pH ha bajado por debajo del rango adecuado" },
  { anverso: "¿Qué es un floculante en el tratamiento del agua de una piscina?", reverso: "Un producto que agrupa las partículas muy finas en suspensión (que el filtro de arena no retiene bien por su tamaño) formando 'flóculos' de mayor tamaño que sí quedan retenidos en la filtración" },
  { anverso: "¿Qué es un algicida y para qué se emplea en el mantenimiento de una piscina?", reverso: "Un producto que previene o elimina la aparición de algas en las paredes y el fondo del vaso, complementando a la desinfección con cloro" },
  { anverso: "¿Qué es el ácido isocianúrico (o estabilizante) del cloro y para qué se usa en piscinas exteriores?", reverso: "Un producto que protege al cloro de su degradación por la radiación solar (rayos UV), prolongando su efecto desinfectante en piscinas al aire libre" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué formas comerciales habituales tiene el cloro de piscinas?", explicacion: "Hipoclorito sódico líquido, hipoclorito cálcico y dicloro/tricloro en pastillas.", dificultad: "media", opciones: ["Hipoclorito líquido, cálcico y pastillas de dicloro", "Solo en forma de gas comprimido", "Solo en forma de pastillas efervescentes de aspirina", "El cloro no se comercializa para uso en piscinas"], correcta: 0 },
  { enunciado: "¿Por qué es necesario controlar el pH del agua de una piscina?", explicacion: "Un pH elevado reduce la eficacia del cloro y puede irritar ojos y piel.", dificultad: "media", opciones: ["Un pH elevado reduce la eficacia del cloro", "El pH no influye en la eficacia del cloro", "El pH solo afecta al color del agua", "El pH solo importa en piscinas cubiertas"], correcta: 0 },
  { enunciado: "¿Qué producto se usa para subir el pH del agua?", explicacion: "Un incrementador de pH (base, como carbonato sódico).", dificultad: "media", opciones: ["Un incrementador de pH", "Un reductor de pH", "Un algicida", "Un floculante"], correcta: 0 },
  { enunciado: "¿Qué es un floculante en el tratamiento del agua?", explicacion: "Agrupa partículas finas en flóculos que sí retiene el filtro de arena.", dificultad: "media", opciones: ["Agrupa partículas finas en flóculos filtrables", "Sube el pH del agua automáticamente", "Elimina las algas del vaso", "Genera cloro por electrólisis"], correcta: 0 },
  { enunciado: "¿Para qué se emplea un algicida en una piscina?", explicacion: "Para prevenir o eliminar algas en paredes y fondo del vaso.", dificultad: "facil", opciones: ["Para prevenir o eliminar algas", "Para regular el pH del agua", "Para agrupar partículas finas", "Para generar cloro por electrólisis"], correcta: 0 },
  { enunciado: "¿Para qué se usa el ácido isocianúrico (estabilizante) en piscinas exteriores?", explicacion: "Protege al cloro de la degradación por radiación solar (UV).", dificultad: "dificil", opciones: ["Protege al cloro de la degradación solar", "Sustituye por completo al cloro", "Elimina la necesidad de filtrado", "Reduce el pH del agua directamente"], correcta: 0 },
]);

const S3 = "riesgos-productos-quimicos-piscinas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué riesgo grave supone mezclar hipoclorito sódico (cloro líquido) con un producto ácido reductor de pH de forma incontrolada?", reverso: "La liberación de gas cloro tóxico, capaz de causar daños respiratorios graves en un espacio cerrado como una sala de productos químicos" },
  { anverso: "¿Deben almacenarse juntos el cloro y los productos ácidos de una piscina?", reverso: "No: deben almacenarse siempre separados físicamente, para evitar que un vertido accidental o un error de manipulación provoque una reacción química peligrosa entre ambos" },
  { anverso: "¿Qué EPI básico debe usarse al manipular productos químicos concentrados de tratamiento de piscinas?", reverso: "Guantes de protección química, gafas de protección frente a salpicaduras, y, según el producto y la ficha de seguridad, mascarilla o protección respiratoria" },
  { anverso: "¿Qué debe hacerse en caso de salpicadura de producto químico concentrado en la piel o los ojos?", reverso: "Lavar de inmediato con abundante agua durante varios minutos (siguiendo la ficha de seguridad del producto) y acudir a un centro sanitario si la irritación persiste" },
  { anverso: "¿Qué es una ficha de datos de seguridad (FDS) de un producto químico de piscina y por qué debe consultarse antes de manipularlo?", reverso: "El documento técnico que detalla su composición, peligros, primeros auxilios y EPI recomendado; debe consultarse porque cada producto tiene riesgos y protocolos de actuación específicos" },
  { anverso: "¿Qué precaución debe seguirse al dosificar manualmente productos químicos en una sala de tratamiento de piscina?", reverso: "Ventilar adecuadamente la sala, usar la dosificadora o utensilio específico para cada producto (sin mezclar utensilios entre productos distintos) y seguir siempre las cantidades indicadas" },
  { anverso: "¿Por qué es preferible el uso de sistemas de dosificación automática frente a la dosificación manual de productos químicos?", reverso: "Porque reducen el contacto directo y la manipulación humana de productos concentrados, minimizando el riesgo de errores, sobredosificación o accidentes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué riesgo grave supone mezclar cloro líquido con un producto ácido de forma incontrolada?", explicacion: "La liberación de gas cloro tóxico.", dificultad: "media", opciones: ["Liberación de gas cloro tóxico", "Ningún riesgo relevante para la salud", "Solo decoloración del producto", "Solo un aumento de temperatura leve"], correcta: 0 },
  { enunciado: "¿Cómo deben almacenarse el cloro y los productos ácidos de una piscina?", explicacion: "Siempre separados físicamente.", dificultad: "media", opciones: ["Siempre separados físicamente", "Juntos, para ahorrar espacio", "Da igual cómo se almacenen", "Solo separados si hay más de 10 litros"], correcta: 0 },
  { enunciado: "¿Qué EPI básico es necesario al manipular productos químicos concentrados de piscina?", explicacion: "Guantes de protección química y gafas, según el producto.", dificultad: "facil", opciones: ["Guantes de protección química y gafas", "No es necesaria ninguna protección", "Solo calzado de seguridad", "Solo casco de protección"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante una salpicadura de producto químico en la piel?", explicacion: "Lavar con abundante agua siguiendo la ficha de seguridad.", dificultad: "media", opciones: ["Lavar con abundante agua de inmediato", "Esperar a que se seque sola", "Aplicar otro producto químico encima", "Ignorarlo si no hay dolor inmediato"], correcta: 0 },
  { enunciado: "¿Qué es una ficha de datos de seguridad (FDS) de un producto de piscina?", explicacion: "El documento con composición, peligros, primeros auxilios y EPI recomendado.", dificultad: "media", opciones: ["El documento con peligros y EPI recomendado", "La etiqueta comercial del envase únicamente", "El manual de uso del filtro de arena", "El registro sanitario del centro deportivo"], correcta: 0 },
  { enunciado: "¿Qué precaución debe seguirse al dosificar manualmente productos químicos?", explicacion: "Ventilar la sala y no mezclar utensilios entre productos distintos.", dificultad: "media", opciones: ["Ventilar y no mezclar utensilios entre productos", "No es necesaria ninguna precaución especial", "Usar siempre el mismo utensilio para todo", "Dosificar sin comprobar las cantidades indicadas"], correcta: 0 },
  { enunciado: "¿Por qué son preferibles los sistemas de dosificación automática?", explicacion: "Reducen el contacto directo y el riesgo de errores o accidentes.", dificultad: "media", opciones: ["Reducen el contacto y el riesgo de errores", "Son siempre más baratos que la dosificación manual", "Eliminan la necesidad de fichas de seguridad", "No aportan ninguna ventaja real"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-87 creado y vinculado como Tema 17 de Oficial Polivalente Instalaciones Deportivas.");
