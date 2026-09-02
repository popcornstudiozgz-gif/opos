/**
 * Crea tema-202: "Prevención de riesgos laborales en trabajos de
 * guardallaves: espacios confinados y técnicas de rescate" — Tema 22
 * (numero=22, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza). Último
 * tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea 948):
 *   "Prevención de riesgos laborales en trabajos de guardallaves.
 *   Condiciones de seguridad en el uso de equipos y herramientas de
 *   trabajo. Riesgos higiénicos y medidas preventivas. Técnicas de
 *   rescate en cámaras de la red de abastecimiento. Trabajos en espacios
 *   confinados."
 *
 * Fuente primaria principal, verificada y leída íntegra en esta sesión:
 * Procedimiento de Prevención de Riesgos Laborales PPRL-1601,
 * "Procedimiento para la realización de Trabajos en Espacios
 * Confinados" del Ayuntamiento de Zaragoza (mayo 2020, 38 páginas),
 * documento interno municipal accedido a través de su republicación
 * pública en el portal sindical ayuntamiento.osta.es
 * (https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf)
 * — a diferencia de otros PPRL citados en el proyecto (PPRL-1602,
 * PPRL-1605, PPRL-1606, no localizados públicamente), el texto de este
 * PPRL-1601 SÍ se ha localizado y leído íntegro, por lo que su contenido
 * se usa como fuente real, citando expresamente su procedencia (no es
 * una publicación oficial en diario oficial, sino la republicación de un
 * documento interno del Servicio de Prevención y Salud Laboral del
 * Ayuntamiento de Zaragoza). Cita expresamente entre los espacios
 * confinados del Ayuntamiento las "arquetas de registro" y "arquetas
 * llaves de maniobra" — de aplicación directa al puesto de guardallaves.
 *
 * El propio PPRL-1601 recoge en su apartado 4 (Documentación de
 * referencia) el marco legal general en que se apoya: Ley 31/1995 de
 * PRL, Ley 54/2003, RD 39/1997 (Reglamento de los Servicios de
 * Prevención), RD 171/2004 (coordinación de actividades empresariales),
 * RD 486/1997 (lugares de trabajo), RD 773/1997 (EPI), RD 1215/1997
 * (equipos de trabajo, modificado por RD 2177/2004 en materia de
 * trabajos en altura), RD 664/1997 (agentes biológicos) y la NTP 223
 * del INSST ("Trabajos en recintos confinados") — todos ellos ya
 * verificados en el proyecto en otras oposiciones y aquí confirmados de
 * nuevo por su cita expresa en el propio procedimiento municipal.
 *
 * Tres secciones:
 * 1. marco-normativo-clasificacion-espacios-confinados
 * 2. autorizacion-trabajo-recurso-preventivo-equipos-medicion
 * 3. tecnicas-rescate-camaras-actuacion-emergencia
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-202-prl-guardallaves-espacios-confinados-rescate.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-202";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Prevención de riesgos laborales en trabajos de guardallaves: espacios confinados y técnicas de rescate",
  descripcion: "Marco normativo y clasificación de espacios confinados (PPRL-1601). Autorización de trabajo, recurso preventivo y equipos de medición de gases. Técnicas de rescate en cámaras y actuación ante una emergencia.",
  contenido: "Desarrolla la prevención de riesgos laborales específica del puesto de guardallaves conforme al Procedimiento municipal PPRL-1601, \"Procedimiento para la realización de Trabajos en Espacios Confinados\" del Ayuntamiento de Zaragoza: el marco normativo general de la prevención de riesgos laborales y la clasificación de los espacios confinados según su geometría y su grado de peligro; el sistema de autorización de trabajo, la figura del recurso preventivo y los equipos de medición de gases y de protección exigidos; y las técnicas de rescate en cámaras y arquetas de la red, con el protocolo de actuación ante una emergencia dentro de un espacio confinado.",
  enlaces_boe: [
    "https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf",
  ],
  indice_estudio: [
    { url: "https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf", titulo: "Marco normativo y clasificación de espacios confinados", seccion: "marco-normativo-clasificacion-espacios-confinados", articulos: "PPRL-1601, apartados 1, 4 y 5" },
    { url: "https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf", titulo: "Autorización de trabajo, recurso preventivo y equipos de medición", seccion: "autorizacion-trabajo-recurso-preventivo-equipos-medicion", articulos: "PPRL-1601, apartado 7.1" },
    { url: "https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf", titulo: "Técnicas de rescate en cámaras y actuación ante una emergencia", seccion: "tecnicas-rescate-camaras-actuacion-emergencia", articulos: "PPRL-1601, Anexos" },
  ],
}]);

const S1 = "marco-normativo-clasificacion-espacios-confinados";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué documento del Ayuntamiento de Zaragoza regula específicamente los trabajos en espacios confinados, y desde cuándo está vigente?", reverso: "El Procedimiento de Prevención de Riesgos Laborales PPRL-1601, \"Procedimiento para la realización de Trabajos en Espacios Confinados\", del Servicio de Prevención y Salud Laboral, vigente desde mayo de 2020" },
  { anverso: "¿Qué leyes y reglamentos generales cita el PPRL-1601 como documentación de referencia, entre otros?", reverso: "La Ley 31/1995 de Prevención de Riesgos Laborales, la Ley 54/2003, el RD 39/1997 (Reglamento de los Servicios de Prevención), el RD 171/2004 (coordinación de actividades empresariales), el RD 486/1997 (lugares de trabajo), el RD 773/1997 (EPI) y el RD 1215/1997 (equipos de trabajo)" },
  { anverso: "¿Cómo define el PPRL-1601 un \"espacio confinado\"?", reverso: "Un recinto con aberturas limitadas de entrada y salida, ventilación natural desfavorable y, en la mayoría de los casos, deficiencia de oxígeno o presencia de contaminantes tóxicos o inflamables, no concebido para la ocupación permanente de los trabajadores" },
  { anverso: "¿Qué dos ejemplos de espacio confinado cita expresamente el PPRL-1601 con relación directa al puesto de guardallaves?", reverso: "Las arquetas de registro y las arquetas de llaves de maniobra" },
  { anverso: "¿Qué caracteriza a un espacio confinado de Clase A, según la clasificación del PPRL-1601?", reverso: "Aquel donde existe un peligro inminente para la vida por riesgos atmosféricos (gases inflamables o tóxicos, deficiencia o enriquecimiento de oxígeno), y que exige autorización de entrada por escrito y un procedimiento de trabajo diseñado específicamente para la tarea" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué documento del Ayuntamiento de Zaragoza regula los trabajos en espacios confinados desde mayo de 2020?", explicacion: "El Procedimiento PPRL-1601.", dificultad: "media", opciones: ["El Procedimiento PPRL-1601", "El Procedimiento PPRL-1605", "El Procedimiento PPRL-1602", "El Procedimiento PPRL-1606"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes normas cita el PPRL-1601 como documentación de referencia?", explicacion: "La Ley 31/1995 de Prevención de Riesgos Laborales, entre otras.", dificultad: "media", opciones: ["La Ley 31/1995 de Prevención de Riesgos Laborales", "El Real Decreto 140/2003 de calidad del agua", "El Real Decreto 244/2016 de metrología legal", "La norma UNE-EN 1074 sobre válvulas de suministro"], correcta: 0 },
  { enunciado: "¿Cómo define el PPRL-1601 un espacio confinado?", explicacion: "Un recinto con aberturas limitadas, ventilación desfavorable y posible deficiencia de oxígeno.", dificultad: "facil", opciones: ["Un recinto con aberturas limitadas y ventilación desfavorable", "Cualquier local de trabajo con ventanas practicables", "Cualquier vehículo empleado en el mantenimiento de la red", "Un almacén de materiales de gran superficie y ventilado"], correcta: 0 },
  { enunciado: "¿Qué dos ejemplos cita expresamente el PPRL-1601 con relación directa al puesto de guardallaves?", explicacion: "Las arquetas de registro y las arquetas de llaves de maniobra.", dificultad: "media", opciones: ["Las arquetas de registro y las arquetas de llaves de maniobra", "Los depósitos de Casablanca y Valdespartera exclusivamente", "Los vehículos del parque móvil municipal exclusivamente", "Las oficinas administrativas del Servicio de Aguas"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un espacio confinado de Clase A según el PPRL-1601?", explicacion: "Peligro inminente para la vida por riesgos atmosféricos.", dificultad: "dificil", opciones: ["Peligro inminente para la vida por riesgos atmosféricos", "Ausencia total de cualquier riesgo relevante para el trabajador", "Riesgo exclusivamente de caída a distinto nivel, sin más factores", "Riesgo exclusivamente eléctrico, sin ningún otro factor asociado"], correcta: 0 },
]);

const S2 = "autorizacion-trabajo-recurso-preventivo-equipos-medicion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué documento es obligatorio disponer y cumplimentar antes de acceder a un espacio confinado, según el PPRL-1601?", reverso: "La \"Autorización de trabajo en espacios confinados\" (Anexo I del procedimiento); está terminantemente prohibido acceder o intervenir sin ella, y solo es válida para una jornada de trabajo" },
  { anverso: "¿Qué función cumple el recurso preventivo durante un trabajo en espacio confinado, según el PPRL-1601?", reverso: "Realizar una vigilancia externa y continua del cumplimiento del procedimiento, permaneciendo en el exterior del espacio confinado durante todo el tiempo que se mantenga la situación que determine su presencia, sin entrar al recinto" },
  { anverso: "¿Qué gases debe medir siempre el equipo detector multigas antes y durante el acceso a un espacio confinado, según el PPRL-1601?", reverso: "El nivel de oxígeno (O₂), el monóxido de carbono (CO), el ácido sulfhídrico (H₂S) y, en su caso, el resto de gases explosivos, midiendo también el nivel de explosividad en % L.I.E. (Límite Inferior de Explosividad)" },
  { anverso: "¿A partir de qué concentración de oxígeno se considera que existe riesgo de asfixia por insuficiencia de oxígeno, según las definiciones del PPRL-1601?", reverso: "Cuando la concentración de oxígeno es inferior al 19,5% en volumen" },
  { anverso: "¿A partir de qué concentración de oxígeno se considera una atmósfera sobreoxigenada, según el PPRL-1601, y por qué es peligrosa?", reverso: "Cuando la concentración de oxígeno supera el 23,5% en volumen; es peligrosa porque incrementa los riesgos de incendio y explosión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué documento es obligatorio antes de acceder a un espacio confinado, según el PPRL-1601?", explicacion: "La \"Autorización de trabajo en espacios confinados\".", dificultad: "facil", opciones: ["La \"Autorización de trabajo en espacios confinados\"", "Únicamente el permiso verbal del encargado de turno", "Únicamente la orden de trabajo diaria del Servicio", "Ningún documento adicional distinto de la ficha del trabajador"], correcta: 0 },
  { enunciado: "¿Qué función cumple el recurso preventivo durante un trabajo en espacio confinado?", explicacion: "Vigilancia externa y continua del cumplimiento del procedimiento, desde el exterior.", dificultad: "media", opciones: ["Vigilancia externa y continua desde el exterior del recinto", "Entrar siempre junto al trabajador para ayudarle físicamente", "Cumplimentar exclusivamente la factura del consumo del sector", "Sustituir al trabajador en caso de fatiga durante la tarea"], correcta: 0 },
  { enunciado: "¿Qué gases debe medir siempre el detector multigas antes de acceder a un espacio confinado?", explicacion: "Oxígeno, monóxido de carbono, ácido sulfhídrico y el nivel de explosividad.", dificultad: "media", opciones: ["Oxígeno, monóxido de carbono, ácido sulfhídrico y explosividad", "Únicamente el nivel de cloro residual del agua de la red", "Únicamente la humedad relativa del ambiente del recinto", "Únicamente la temperatura ambiente del espacio confinado"], correcta: 0 },
  { enunciado: "¿A partir de qué concentración de oxígeno existe riesgo de asfixia por insuficiencia de oxígeno, según el PPRL-1601?", explicacion: "Por debajo del 19,5% en volumen.", dificultad: "dificil", opciones: ["Por debajo del 19,5% en volumen", "Por debajo del 30% en volumen", "Por debajo del 10% en volumen exclusivamente", "Por debajo del 23,5% en volumen"], correcta: 0 },
  { enunciado: "¿A partir de qué concentración de oxígeno se considera una atmósfera sobreoxigenada, según el PPRL-1601?", explicacion: "Por encima del 23,5% en volumen.", dificultad: "dificil", opciones: ["Por encima del 23,5% en volumen", "Por encima del 19,5% en volumen", "Por encima del 30% en volumen exclusivamente", "Por encima del 10% en volumen"], correcta: 0 },
]);

const S3 = "tecnicas-rescate-camaras-actuacion-emergencia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué dispositivo de anclaje móvil, citado en el Anexo III del PPRL-1601, es el elemento central de las técnicas de rescate en cámaras de la red de abastecimiento?", reverso: "El trípode de rescate, combinado con un equipo anticaídas de rescate y evacuación y un dispositivo de ascenso-descenso con cable de acero inoxidable" },
  { anverso: "¿Qué elemento debe llevar el trabajador que accede a un espacio confinado con riesgo de caída, para permitir su rescate, según el PPRL-1601?", reverso: "Un arnés de seguridad con cuerdas conectadas al trípode exterior, de modo que pueda ser izado desde fuera en caso de pérdida de conocimiento o emergencia, sin necesidad de que otra persona entre al recinto" },
  { anverso: "¿Qué debe hacer el recurso preventivo en el exterior si el trabajador pierde el conocimiento dentro del espacio confinado, según el protocolo de emergencia del PPRL-1601?", reverso: "Comunicar de inmediato la situación al 080 o al 061, indicando la localización exacta del trabajador y del acceso al recinto" },
  { anverso: "Si para sacar al accidentado hay que entrar en el espacio confinado y la atmósfera interior es peligrosa, pero SÍ se dispone de equipos respiratorios autónomos y la formación adecuada, ¿qué indica el PPRL-1601 que se haga?", reverso: "Entrar a ayudar al accidentado con equipo autónomo de respiración" },
  { anverso: "Si para sacar al accidentado hay que entrar en el espacio confinado, la atmósfera es peligrosa y NO se dispone de equipos respiratorios autónomos, ¿qué indica expresamente el PPRL-1601 que se haga?", reverso: "NO ENTRAR; el personal de emergencia especializado realizará el rescate en condiciones de seguridad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué dispositivo es el elemento central de las técnicas de rescate en cámaras según el PPRL-1601?", explicacion: "El trípode de rescate.", dificultad: "facil", opciones: ["El trípode de rescate", "El detector multigas portátil", "La botella de aire comprimido exclusivamente", "El cuadro de maniobras de la válvula motorizada"], correcta: 0 },
  { enunciado: "¿Qué debe llevar el trabajador que accede a un espacio confinado con riesgo de caída, para permitir su rescate?", explicacion: "Un arnés de seguridad con cuerdas conectadas al trípode exterior.", dificultad: "media", opciones: ["Un arnés de seguridad conectado al trípode exterior", "Únicamente un chaleco reflectante de alta visibilidad", "Únicamente unos guantes de protección mecánica", "Un casco de protección, sin ningún otro equipo adicional"], correcta: 0 },
  { enunciado: "¿A qué teléfonos debe comunicar el recurso preventivo la pérdida de conocimiento de un trabajador, según el PPRL-1601?", explicacion: "Al 080 o al 061.", dificultad: "media", opciones: ["Al 080 o al 061", "Únicamente al encargado de turno del Servicio", "Únicamente al Servicio de Atención al Ciudadano", "Al teléfono de facturación del ciclo integral del agua"], correcta: 0 },
  { enunciado: "Si la atmósfera es peligrosa y SÍ se dispone de equipo respiratorio autónomo y formación adecuada, ¿qué indica el PPRL-1601?", explicacion: "Entrar a ayudar al accidentado con equipo autónomo de respiración.", dificultad: "dificil", opciones: ["Entrar a ayudar con equipo autónomo de respiración", "Esperar en todo caso a los servicios de emergencia sin entrar", "Entrar sin ningún equipo de protección respiratoria adicional", "Cerrar el espacio confinado y abandonar el lugar de inmediato"], correcta: 0 },
  { enunciado: "Si la atmósfera es peligrosa y NO se dispone de equipo respiratorio autónomo, ¿qué indica expresamente el PPRL-1601?", explicacion: "NO ENTRAR; el rescate lo realiza el personal de emergencia especializado.", dificultad: "media", opciones: ["NO ENTRAR; rescata el personal de emergencia especializado", "Entrar de inmediato, sin excepción, para socorrer al accidentado", "Esperar sin comunicar la incidencia a ningún servicio de emergencia", "Entrar solo si dos compañeros más acceden al mismo tiempo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-202 creado y vinculado como Tema 22 de Oficial Guardallaves.");
