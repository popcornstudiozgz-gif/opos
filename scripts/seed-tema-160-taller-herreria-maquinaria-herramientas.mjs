/**
 * Crea tema-160: "El taller y herrería: maquinaria y herramientas" —
 * Tema 12 (numero=12, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea 1265):
 *   "El taller y herrería. Maquinaria del taller: clasificación,
 *   características, manejo, seguridad y mantenimiento. Herramientas de
 *   taller: tipos, características, seguridad, limpieza y mantenimiento."
 *
 * Fuente primaria: Real Decreto 1215/1997, de 18 de julio, disposiciones
 * mínimas de seguridad y salud para la utilización por los trabajadores
 * de los equipos de trabajo — BOE-A-1997-17824 (verificado en esta
 * sesión), de aplicación a la maquinaria y herramientas del taller. El
 * resto del contenido (clasificación, manejo, limpieza y mantenimiento
 * de maquinaria y herramientas) es conocimiento técnico consolidado del
 * oficio sin ley única adicional que lo regule.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-160-taller-herreria-maquinaria-herramientas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-160";
const OPOSICION = "oficial-herrero-ayto-zaragoza";
const BLOQUE_2_ID = "b0312afa-8a49-41a8-a672-99793edcc74e";

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
  titulo: "El taller y herrería: maquinaria y herramientas",
  descripcion: "Maquinaria del taller: clasificación, características, manejo, seguridad y mantenimiento. Herramientas de taller: tipos, características, seguridad, limpieza y mantenimiento.",
  contenido: "Desarrolla la maquinaria y herramientas propias del taller de herrería: clasificación y características de la maquinaria habitual (sierras, taladros, esmeriladoras, prensas, entre otras), su manejo seguro conforme al Real Decreto 1215/1997 sobre equipos de trabajo, y las herramientas manuales de taller, con sus tipos, características, seguridad, limpieza y mantenimiento.",
  enlaces_boe: [
    { titulo: "Real Decreto 1215/1997, disposiciones mínimas de seguridad para la utilización de equipos de trabajo", url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1997-17824" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1997-17824", titulo: "Maquinaria del taller: clasificación, manejo y seguridad", seccion: "maquinaria-taller-clasificacion-manejo-seguridad", articulos: "RD 1215/1997" },
    { url: "", titulo: "Herramientas de taller: tipos y características", seccion: "herramientas-taller-tipos-caracteristicas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Limpieza y mantenimiento del taller y sus herramientas", seccion: "limpieza-mantenimiento-taller-herramientas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "maquinaria-taller-clasificacion-manejo-seguridad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto establece las disposiciones mínimas de seguridad para la utilización de los equipos de trabajo (maquinaria y herramientas)?", reverso: "El Real Decreto 1215/1997, de 18 de julio" },
  { anverso: "¿Qué máquinas son habituales en un taller de herrería, según su función principal?", reverso: "La sierra mecánica (corte), el taladro de columna (perforación), la esmeriladora o amoladora (desbaste y afilado), la prensa (conformado y plegado), la cizalla (corte de chapa) y el torno (mecanizado por arranque de viruta)" },
  { anverso: "¿Qué obligación general establece el RD 1215/1997 respecto a los equipos de trabajo puestos a disposición de los trabajadores?", reverso: "Que sean adecuados al trabajo que deba realizarse y estén convenientemente adaptados, de forma que garanticen la seguridad y la salud de los trabajadores durante su utilización" },
  { anverso: "¿Qué medidas de seguridad son habituales en la maquinaria del taller para proteger frente a elementos móviles peligrosos?", reverso: "Resguardos fijos o móviles que impiden el acceso a las zonas de peligro, dispositivos de parada de emergencia, y en algunos casos sistemas de doble accionamiento que exigen el uso de ambas manos para iniciar el ciclo de la máquina" },
  { anverso: "¿Qué debe comprobar el herrero antes de utilizar cualquier máquina del taller?", reverso: "Que los resguardos y dispositivos de seguridad están correctamente instalados y en buen estado, que la máquina no presenta ningún deterioro visible, y que conoce su manejo correcto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué Real Decreto establece las disposiciones mínimas de seguridad para la utilización de equipos de trabajo?", explicacion: "El Real Decreto 1215/1997.", dificultad: "media", opciones: ["El Real Decreto 1215/1997", "El Real Decreto 614/2001", "El Real Decreto 773/1997", "El Real Decreto 486/1997"], correcta: 0 },
  { enunciado: "¿Qué máquina del taller de herrería se emplea principalmente para el desbaste y afilado de piezas?", explicacion: "La esmeriladora o amoladora.", dificultad: "facil", opciones: ["La esmeriladora o amoladora", "El taladro de columna", "La cizalla de chapa", "La prensa de plegado"], correcta: 0 },
  { enunciado: "¿Qué obligación general establece el RD 1215/1997 respecto a los equipos de trabajo?", explicacion: "Que sean adecuados al trabajo y garanticen la seguridad de los trabajadores.", dificultad: "media", opciones: ["Que sean adecuados al trabajo y garanticen la seguridad", "Que se sustituyan obligatoriamente cada dos años", "Que sean siempre del mismo fabricante en todo el taller", "Que se empleen exclusivamente por un único trabajador"], correcta: 0 },
  { enunciado: "¿Qué elemento de seguridad impide el acceso a las zonas de peligro de una máquina del taller?", explicacion: "Los resguardos fijos o móviles.", dificultad: "media", opciones: ["Los resguardos fijos o móviles", "El manual de instrucciones del fabricante exclusivamente", "El color exterior de la carcasa de la máquina", "La potencia eléctrica nominal de la máquina"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el herrero antes de utilizar cualquier máquina del taller?", explicacion: "Que los resguardos y dispositivos de seguridad están correctamente instalados y en buen estado.", dificultad: "media", opciones: ["Que los resguardos y dispositivos de seguridad están en buen estado", "Únicamente el color exterior de la máquina antes de su uso", "Únicamente la antigüedad de la máquina antes de su uso", "Ninguna comprobación previa es necesaria si la máquina ya está encendida"], correcta: 0 },
]);

const S2 = "herramientas-taller-tipos-caracteristicas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un yunque, herramienta fundamental del taller de herrería?", reverso: "Un bloque macizo de acero, con una superficie plana y una o dos puntas cónicas o piramidales, que sirve de base sólida sobre la que golpear y conformar el metal caliente durante la forja" },
  { anverso: "¿Qué es un martillo de forja, y qué lo diferencia de un martillo convencional?", reverso: "Un martillo con una cabeza de mayor peso y formas específicas (de bola, de peña) adaptado a las operaciones de forja, empleado para golpear y conformar el metal caliente sobre el yunque" },
  { anverso: "¿Qué son las tenazas de forja?", reverso: "Herramientas de sujeción con dos brazos articulados y bocas adaptadas a distintas formas de pieza (planas, redondas), que permiten manipular con seguridad el metal caliente durante la forja sin necesidad de tocarlo directamente" },
  { anverso: "¿Qué es un cincel, como herramienta manual de taller?", reverso: "Una herramienta de corte con un filo en uno de sus extremos, que se golpea con un martillo para cortar o labrar metal en frío o en caliente" },
  { anverso: "¿Qué son las herramientas de sujeción (tornillo de banco, mordazas) habituales en un taller de herrería?", reverso: "Herramientas que fijan firmemente la pieza durante su mecanizado manual (limado, roscado, aserrado), liberando ambas manos del operario para trabajar con seguridad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un yunque?", explicacion: "Un bloque macizo de acero que sirve de base para golpear y conformar el metal caliente.", dificultad: "facil", opciones: ["Un bloque macizo de acero, base para golpear el metal caliente", "Una herramienta exclusiva de medición de longitud", "Un dispositivo exclusivo de sujeción eléctrica de piezas", "Una máquina exclusiva de corte de chapa metálica"], correcta: 0 },
  { enunciado: "¿Qué son las tenazas de forja?", explicacion: "Herramientas de sujeción que permiten manipular con seguridad el metal caliente.", dificultad: "media", opciones: ["Herramientas de sujeción para manipular el metal caliente", "Herramientas exclusivas de medición de dureza", "Herramientas exclusivas de corte de chapa fina", "Herramientas exclusivas de galvanización de piezas"], correcta: 0 },
  { enunciado: "¿Qué es un cincel, como herramienta manual de taller?", explicacion: "Una herramienta de corte con filo que se golpea con un martillo.", dificultad: "media", opciones: ["Una herramienta de corte con filo, golpeada con un martillo", "Una herramienta exclusiva de medición de temperatura", "Una herramienta exclusiva de sujeción sin filo alguno", "Una máquina eléctrica de corte de gran potencia"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las herramientas de sujeción como el tornillo de banco?", explicacion: "Fijan firmemente la pieza, liberando ambas manos del operario.", dificultad: "media", opciones: ["Fijan firmemente la pieza, liberando ambas manos del operario", "Miden la dureza superficial de la pieza sujeta", "Aplican calor directo a la pieza durante su sujeción", "Sustituyen por completo a cualquier herramienta de corte"], correcta: 0 },
  { enunciado: "¿Qué característica adapta un martillo de forja a las operaciones propias de la herrería?", explicacion: "Una cabeza de mayor peso y formas específicas (de bola, de peña).", dificultad: "dificil", opciones: ["Una cabeza de mayor peso y formas específicas", "Un mango exclusivamente de plástico sin ninguna otra característica", "La ausencia total de cabeza metálica en la herramienta", "Un filo cortante en lugar de una cabeza de golpeo"], correcta: 0 },
]);

const S3 = "limpieza-mantenimiento-taller-herramientas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué es importante mantener limpio y ordenado el taller de herrería, más allá de una cuestión estética?", reverso: "Reduce el riesgo de accidentes (tropiezos, cortes con material o virutas dispersas), facilita la localización de herramientas y materiales, y contribuye a un ambiente de trabajo más seguro y eficiente" },
  { anverso: "¿Qué mantenimiento básico requiere una herramienta de corte manual, como un cincel o una broca, tras su uso?", reverso: "La limpieza de restos de material adherido, la revisión de su filo (afilándolo si es necesario) y su almacenamiento en un lugar adecuado que evite golpes o corrosión" },
  { anverso: "¿Qué mantenimiento preventivo requiere habitualmente la maquinaria del taller, además de su limpieza?", reverso: "La revisión y engrase periódico de sus partes móviles, la comprobación del estado de correas, cadenas o cables, y la verificación del correcto funcionamiento de sus dispositivos de seguridad" },
  { anverso: "¿Qué riesgo particular presenta la acumulación de virutas metálicas en el suelo del taller?", reverso: "Riesgo de cortes al manipularlas o pisarlas, riesgo de resbalones, y en el caso de virutas de determinados metales, riesgo de incendio si entran en contacto con fuentes de calor o chispas" },
  { anverso: "¿Qué debe comprobar el herrero respecto a las protecciones y resguardos de una máquina tras realizar una tarea de mantenimiento o limpieza sobre ella?", reverso: "Que todos los resguardos y dispositivos de seguridad retirados temporalmente para la tarea han sido correctamente repuestos antes de volver a poner la máquina en servicio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué es importante mantener limpio y ordenado el taller de herrería?", explicacion: "Reduce el riesgo de accidentes y facilita la localización de herramientas y materiales.", dificultad: "facil", opciones: ["Reduce el riesgo de accidentes y facilita la localización de material", "Únicamente por motivos estéticos, sin ninguna relación con la seguridad", "Únicamente para reducir el consumo eléctrico del taller", "No aporta ninguna ventaja real en el trabajo diario del taller"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento básico requiere una herramienta de corte manual tras su uso?", explicacion: "Limpieza, revisión del filo y almacenamiento adecuado.", dificultad: "media", opciones: ["Limpieza, revisión del filo y almacenamiento adecuado", "Ningún mantenimiento es necesario tras su uso habitual", "Únicamente pintarla con un color distintivo tras cada uso", "Únicamente pesarla tras cada uso, sin ninguna otra comprobación"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento preventivo requiere habitualmente la maquinaria del taller?", explicacion: "Revisión y engrase periódico de sus partes móviles, entre otras comprobaciones.", dificultad: "media", opciones: ["Revisión y engrase periódico de sus partes móviles", "Ninguna revisión periódica, siendo suficiente con su limpieza inicial", "Únicamente cambiar su color exterior de forma periódica", "Únicamente aumentar su potencia eléctrica de forma periódica"], correcta: 0 },
  { enunciado: "¿Qué riesgo particular presenta la acumulación de virutas metálicas en el suelo del taller?", explicacion: "Riesgo de cortes, resbalones y, en ciertos metales, riesgo de incendio.", dificultad: "media", opciones: ["Riesgo de cortes, resbalones y, en ciertos casos, de incendio", "Ningún riesgo relevante más allá de un aspecto poco cuidado", "Riesgo exclusivo de deterioro estético del suelo del taller", "Riesgo exclusivo de aumento del consumo eléctrico del taller"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el herrero tras realizar una tarea de mantenimiento sobre una máquina que exigió retirar temporalmente algún resguardo?", explicacion: "Que todos los resguardos han sido correctamente repuestos antes de volver a usar la máquina.", dificultad: "dificil", opciones: ["Que todos los resguardos han sido correctamente repuestos", "Que el color de la máquina no se ha visto alterado por la tarea", "Que la potencia eléctrica de la máquina ha aumentado tras la tarea", "Ninguna comprobación adicional es necesaria tras el mantenimiento"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-160 creado y vinculado como Tema 12 de Oficial Herrero.");
