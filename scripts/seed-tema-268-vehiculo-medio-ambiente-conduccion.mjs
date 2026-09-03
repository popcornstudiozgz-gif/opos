/**
 * Crea tema-268: "Vehículo y medio ambiente. Conducción segura. Conducción
 * eficiente" — Tema 8 (numero=8, bloque-2) de Oficial Conductor,
 * Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea 1573):
 *   "Vehículo y Medio Ambiente. Conducción segura. Conducción eficiente."
 *
 * Sourcing: conocimiento técnico consolidado de conducción eficiente y
 * segura, sin ley única que lo regule como tal (mismo criterio ya aplicado
 * en Oficial Mecánico y en tema-267 de esta misma oposición). Se cita como
 * referencia informativa el sistema de distintivos ambientales de la DGT
 * (Cero Emisiones/ECO/C/B), de aplicación administrativa real pero
 * regulado mediante instrucción interna de la DGT y no mediante una norma
 * publicada en el BOE — se señala expresamente esa naturaleza al citarlo,
 * sin presentarlo como norma con rango de ley o reglamento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-268-vehiculo-medio-ambiente-conduccion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-268";
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
  titulo: "Vehículo y medio ambiente. Conducción segura y eficiente",
  descripcion: "Impacto ambiental del vehículo y distintivos ambientales de la DGT. Técnicas de conducción eficiente (eco-driving). Principios y técnicas de conducción segura.",
  contenido: "Desarrolla la relación entre el vehículo y el medio ambiente (emisiones contaminantes, distintivos ambientales de la DGT), las técnicas de conducción eficiente orientadas a reducir el consumo de combustible y las emisiones sin perder seguridad, y los principios básicos de la conducción segura (distancia de seguridad, tiempo de reacción, anticipación y sistemas de ayuda a la conducción).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Vehículo y medio ambiente", seccion: "vehiculo-y-medio-ambiente", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Conducción eficiente", seccion: "conduccion-eficiente", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Conducción segura", seccion: "conduccion-segura", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "vehiculo-y-medio-ambiente";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son los principales contaminantes emitidos por un vehículo con motor de combustión interna?", reverso: "Dióxido de carbono (CO₂, gas de efecto invernadero), óxidos de nitrógeno (NOx), monóxido de carbono (CO), partículas en suspensión (especialmente en motores diésel) e hidrocarburos no quemados" },
  { anverso: "¿Qué es el distintivo ambiental de la DGT?", reverso: "Una clasificación administrativa de los vehículos (Cero Emisiones, ECO, C y B) según su nivel de impacto ambiental, gestionada por la DGT mediante instrucción interna (no mediante una norma publicada en el BOE), que condiciona el acceso a determinadas zonas de bajas emisiones" },
  { anverso: "¿Qué vehículos obtienen el distintivo Cero Emisiones de la DGT?", reverso: "Los vehículos eléctricos puros (BEV), los de hidrógeno con pila de combustible (FCEV) y los híbridos enchufables (PHEV) con una autonomía eléctrica igual o superior a 40 km" },
  { anverso: "¿Qué es una zona de bajas emisiones (ZBE)?", reverso: "Un área urbana delimitada en la que se restringe o condiciona la circulación de determinados vehículos según su distintivo ambiental, con el objetivo de reducir la contaminación atmosférica en esa zona" },
  { anverso: "¿Qué relación existe entre el mantenimiento periódico de un vehículo y su impacto ambiental?", reverso: "Un vehículo correctamente mantenido (filtros, presión de neumáticos, puesta a punto del motor) consume menos combustible y emite menos contaminantes que un vehículo con un mantenimiento deficiente, para un mismo recorrido" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son contaminantes habituales de un vehículo de combustión interna?", explicacion: "CO₂, NOx, CO, partículas e hidrocarburos no quemados.", dificultad: "facil", opciones: ["CO₂, óxidos de nitrógeno, monóxido de carbono y partículas", "Únicamente vapor de agua, sin ningún otro contaminante relevante", "Únicamente oxígeno puro, sin ningún otro contaminante relevante", "Únicamente nitrógeno puro, sin ningún otro contaminante relevante"], correcta: 0 },
  { enunciado: "¿Qué es el distintivo ambiental de la DGT?", explicacion: "Una clasificación de vehículos según impacto ambiental, gestionada mediante instrucción interna de la DGT.", dificultad: "media", opciones: ["Una clasificación de vehículos según su impacto ambiental", "Una autorización administrativa para conducir vehículos pesados", "Un certificado exclusivo de aptitud profesional del conductor", "Un permiso exclusivo para circular por autovías y autopistas"], correcta: 0 },
  { enunciado: "¿Qué vehículos obtienen el distintivo Cero Emisiones?", explicacion: "BEV, FCEV y PHEV con autonomía eléctrica igual o superior a 40 km.", dificultad: "media", opciones: ["Eléctricos puros, de hidrógeno y PHEV de gran autonomía eléctrica", "Únicamente los vehículos propulsados por gasolina de última generación", "Únicamente los vehículos propulsados por gasóleo de última generación", "Únicamente los vehículos híbridos no enchufables (HEV)"], correcta: 0 },
  { enunciado: "¿Qué es una zona de bajas emisiones (ZBE)?", explicacion: "Un área urbana donde se restringe la circulación según el distintivo ambiental del vehículo.", dificultad: "media", opciones: ["Un área urbana con restricciones de circulación según el distintivo ambiental", "Una autovía exclusiva para vehículos de transporte de mercancías", "Un tipo de vía exclusiva para vehículos de emergencia municipales", "Una categoría exclusiva de permiso de conducción por puntos"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el mantenimiento del vehículo y su impacto ambiental?", explicacion: "Un vehículo bien mantenido consume menos y contamina menos para un mismo recorrido.", dificultad: "dificil", opciones: ["Un vehículo bien mantenido consume y contamina menos para el mismo recorrido", "El mantenimiento del vehículo no influye en ningún caso en su consumo real", "Un vehículo bien mantenido siempre contamina más que uno sin mantenimiento", "El mantenimiento solo influye en la seguridad, nunca en el impacto ambiental"], correcta: 0 },
]);

const S2 = "conduccion-eficiente";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la conducción eficiente o eco-driving?", reverso: "Un conjunto de técnicas y hábitos de conducción orientados a reducir el consumo de combustible y las emisiones contaminantes de un vehículo, manteniendo la seguridad y sin aumentar significativamente el tiempo de trayecto" },
  { anverso: "¿Por qué se recomienda anticipar las frenadas y evitar aceleraciones bruscas en conducción eficiente?", reverso: "Porque las aceleraciones y frenadas bruscas aumentan notablemente el consumo de combustible y el desgaste de frenos y neumáticos, frente a una conducción anticipada y progresiva que mantiene una velocidad más constante" },
  { anverso: "¿Qué recomienda la conducción eficiente sobre el cambio de marchas?", reverso: "Cambiar a una marcha superior lo antes posible dentro del rango de revoluciones recomendado por el fabricante, evitando mantener el motor a altas revoluciones más tiempo del necesario" },
  { anverso: "¿Qué relación existe entre la presión de los neumáticos y la conducción eficiente?", reverso: "Una presión de neumáticos inferior a la recomendada aumenta la resistencia a la rodadura y, con ello, el consumo de combustible, además de acelerar el desgaste del propio neumático" },
  { anverso: "¿Qué recomienda la conducción eficiente sobre el uso de la climatización o el aire acondicionado?", reverso: "Utilizarlo de forma moderada y solo cuando sea necesario, dado que su uso continuado aumenta el consumo de combustible o de energía eléctrica del vehículo, especialmente en trayectos cortos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la conducción eficiente o eco-driving?", explicacion: "Técnicas orientadas a reducir consumo y emisiones sin perder seguridad.", dificultad: "facil", opciones: ["Técnicas para reducir consumo y emisiones manteniendo la seguridad", "Técnicas exclusivas para reducir el tiempo total de un trayecto", "Técnicas exclusivas para aumentar la velocidad máxima del vehículo", "Técnicas exclusivas de mantenimiento mecánico del motor"], correcta: 0 },
  { enunciado: "¿Por qué se recomienda anticipar frenadas y evitar aceleraciones bruscas?", explicacion: "Porque aumentan el consumo y el desgaste de frenos y neumáticos.", dificultad: "media", opciones: ["Porque aumentan el consumo de combustible y el desgaste de componentes", "Porque reducen siempre el tiempo total del trayecto realizado", "Porque no tienen ninguna relación real con el consumo del vehículo", "Porque aumentan siempre la seguridad frente a una conducción anticipada"], correcta: 0 },
  { enunciado: "¿Qué recomienda la conducción eficiente sobre el cambio de marchas?", explicacion: "Cambiar a marcha superior lo antes posible dentro del rango recomendado.", dificultad: "media", opciones: ["Cambiar a marcha superior lo antes posible dentro del rango recomendado", "Mantener siempre la primera marcha durante todo el trayecto realizado", "Mantener el motor siempre a las revoluciones máximas posibles", "Evitar por completo el uso de marchas superiores a la tercera"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la presión de los neumáticos y el consumo del vehículo?", explicacion: "Una presión inferior a la recomendada aumenta la resistencia a la rodadura y el consumo.", dificultad: "media", opciones: ["Una presión inferior a la recomendada aumenta el consumo del vehículo", "La presión de los neumáticos no influye en ningún caso en el consumo", "Una presión inferior a la recomendada reduce siempre el consumo real", "La presión de los neumáticos solo influye en la duración del propio neumático"], correcta: 0 },
  { enunciado: "¿Qué recomienda la conducción eficiente sobre el uso de la climatización?", explicacion: "Utilizarla de forma moderada, dado que aumenta el consumo de combustible o energía.", dificultad: "dificil", opciones: ["Utilizarla de forma moderada, dado que aumenta el consumo del vehículo", "Utilizarla siempre a máxima potencia con independencia del trayecto", "Evitar por completo su uso en cualquier circunstancia del trayecto", "Su uso no tiene ninguna relación real con el consumo del vehículo"], correcta: 0 },
]);

const S3 = "conduccion-segura";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la distancia de seguridad entre vehículos?", reverso: "El espacio que debe mantenerse respecto al vehículo que circula delante, suficiente para poder detenerse sin colisionar si este frena bruscamente, en función de la velocidad, el estado de la vía y las condiciones meteorológicas" },
  { anverso: "¿Qué es el tiempo de reacción de un conductor?", reverso: "El tiempo que transcurre desde que el conductor percibe un peligro hasta que inicia la respuesta física correspondiente (por ejemplo, pisar el freno), habitualmente estimado en torno a 1 segundo en condiciones normales, y mayor en caso de fatiga, distracción o consumo de alcohol o drogas" },
  { anverso: "¿En qué consiste la anticipación en la conducción segura?", reverso: "La capacidad de prever con antelación posibles situaciones de riesgo (un peatón que puede cruzar, un vehículo que puede frenar) observando el entorno más allá del vehículo inmediatamente precedente, para poder reaccionar con margen suficiente" },
  { anverso: "¿Qué son los sistemas ADAS?", reverso: "Sistemas Avanzados de Ayuda a la Conducción (Advanced Driver Assistance Systems): dispositivos electrónicos que asisten al conductor, como el frenado de emergencia autónomo, el aviso de colisión, el control de crucero adaptativo o el aviso de abandono de carril" },
  { anverso: "¿Por qué aumenta la distancia de seguridad necesaria en condiciones de lluvia o pavimento mojado?", reverso: "Porque la adherencia entre el neumático y la calzada disminuye, aumentando la distancia de frenado real necesaria para detener el vehículo a una misma velocidad respecto a condiciones de calzada seca" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la distancia de seguridad entre vehículos?", explicacion: "El espacio necesario para poder detenerse sin colisionar si el vehículo precedente frena.", dificultad: "facil", opciones: ["El espacio necesario para poder detenerse sin colisionar", "El espacio máximo permitido entre dos vehículos en cualquier vía", "El espacio exclusivo reservado para vehículos de emergencia", "El espacio exclusivo reservado para el adelantamiento de vehículos"], correcta: 0 },
  { enunciado: "¿Qué es el tiempo de reacción de un conductor?", explicacion: "El tiempo entre percibir un peligro e iniciar la respuesta física correspondiente.", dificultad: "media", opciones: ["El tiempo entre percibir un peligro e iniciar la respuesta física", "El tiempo total que tarda el vehículo en detenerse por completo", "El tiempo máximo legal permitido de conducción sin descanso", "El tiempo necesario para recargar la batería de un vehículo eléctrico"], correcta: 0 },
  { enunciado: "¿En qué consiste la anticipación en la conducción segura?", explicacion: "Prever situaciones de riesgo observando el entorno más allá del vehículo precedente.", dificultad: "media", opciones: ["Prever situaciones de riesgo observando el entorno con antelación", "Circular siempre a la velocidad máxima permitida en la vía", "Mantener la vista fijada exclusivamente en el vehículo precedente", "Reducir al mínimo posible la distancia de seguridad mantenida"], correcta: 0 },
  { enunciado: "¿Qué son los sistemas ADAS?", explicacion: "Sistemas electrónicos avanzados de ayuda a la conducción.", dificultad: "media", opciones: ["Sistemas electrónicos avanzados de ayuda a la conducción", "Sistemas exclusivos de recarga rápida de vehículos eléctricos", "Sistemas exclusivos de homologación de vehículos de motor", "Sistemas exclusivos de control del tacógrafo del vehículo"], correcta: 0 },
  { enunciado: "¿Por qué aumenta la distancia de seguridad necesaria con pavimento mojado?", explicacion: "Porque disminuye la adherencia y aumenta la distancia de frenado real.", dificultad: "dificil", opciones: ["Porque disminuye la adherencia y aumenta la distancia de frenado", "Porque aumenta la visibilidad general del conductor en ese momento", "Porque disminuye el tiempo de reacción del conductor en ese momento", "Porque el pavimento mojado no influye en ningún caso en el frenado"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Zona de bajas emisiones (ZBE)", definicion: "Área urbana delimitada en la que se restringe o condiciona la circulación de determinados vehículos según su distintivo ambiental, para reducir la contaminación atmosférica." },
  { tema_slug: TEMA, seccion: S1, termino: "NOx", definicion: "Óxidos de nitrógeno: contaminantes atmosféricos emitidos principalmente por motores diésel, asociados a problemas respiratorios y a la formación de smog urbano." },
  { tema_slug: TEMA, seccion: S2, termino: "Eco-driving", definicion: "Conjunto de técnicas de conducción orientadas a reducir el consumo de combustible y las emisiones sin perder seguridad ni aumentar significativamente el tiempo de trayecto." },
  { tema_slug: TEMA, seccion: S2, termino: "Resistencia a la rodadura", definicion: "Fuerza que se opone al avance del vehículo por el contacto del neumático con la calzada, que aumenta cuando la presión del neumático es inferior a la recomendada." },
  { tema_slug: TEMA, seccion: S3, termino: "ADAS", definicion: "Advanced Driver Assistance Systems: sistemas electrónicos que asisten al conductor, como el frenado de emergencia autónomo o el control de crucero adaptativo." },
  { tema_slug: TEMA, seccion: S3, termino: "Distancia de frenado", definicion: "Espacio recorrido por el vehículo desde que se acciona el freno hasta su detención completa, que aumenta con la velocidad y disminuye la adherencia (pavimento mojado, neumáticos desgastados)." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-268 creado y vinculado como Tema 8 de Oficial Conductor General.");
