/**
 * Crea tema-150: "Automatismos eléctricos cableados" — Tema 18
 * (numero=18, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea 1361):
 *   "Automatismos Eléctricos Cableados. Aparamenta de maniobra y
 *   protección: contactores, relés auxiliares, temporizadores,
 *   pulsadores y finales de carrera. Interpretación de esquemas de
 *   automatismos (circuitos de fuerza y mando)."
 *
 * Conocimiento técnico consolidado de automatización industrial cableada
 * (contactores, relés, temporizadores, esquemas de fuerza y mando):
 * contenido de formación profesional electrotécnica sin una ley española
 * única que lo regule como tal — mismo criterio ya aplicado en tema-140
 * (conceptos fundamentales de electricidad). Búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto: la referencia técnica
 * habitual de este ámbito es la norma UNE-EN 60204-1 (seguridad de las
 * máquinas — equipo eléctrico de las máquinas), una norma técnica privada
 * de aplicación voluntaria (salvo remisión desde el marcado CE de
 * maquinaria), no una disposición del BOE, por lo que no se cita como
 * fuente legal sino como referencia técnica del sector.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-150-automatismos-electricos-cableados.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-150";
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
  titulo: "Automatismos eléctricos cableados",
  descripcion: "Aparamenta de maniobra y protección: contactores, relés auxiliares, temporizadores, pulsadores y finales de carrera. Interpretación de esquemas de automatismos (circuitos de fuerza y mando).",
  contenido: "Desarrolla los automatismos eléctricos cableados y su aparamenta de maniobra y protección: contactores, relés auxiliares, temporizadores, pulsadores y finales de carrera, así como la interpretación de los esquemas eléctricos de automatismos, diferenciando el circuito de fuerza (que alimenta al receptor, por ejemplo un motor) del circuito de mando (que gobierna su funcionamiento mediante contactos auxiliares y elementos de control).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Contactores, relés auxiliares y temporizadores", seccion: "contactores-reles-auxiliares-temporizadores", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Pulsadores, finales de carrera y demás aparamenta de mando", seccion: "pulsadores-finales-carrera-aparamenta-mando", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Interpretación de esquemas de automatismos: circuitos de fuerza y mando", seccion: "interpretacion-esquemas-automatismos-fuerza-mando", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "contactores-reles-auxiliares-temporizadores";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un contactor?", reverso: "Un dispositivo electromagnético de maniobra que permite conectar y desconectar un circuito de potencia (por ejemplo, la alimentación de un motor) mediante el mando de una bobina alimentada a menor potencia" },
  { anverso: "¿Qué partes principales componen un contactor?", reverso: "La bobina (que, al energizarse, genera el campo magnético que atrae al núcleo móvil), los contactos principales (que conectan el circuito de fuerza) y los contactos auxiliares (empleados en el circuito de mando)" },
  { anverso: "¿Qué diferencia existe entre un contacto normalmente abierto (NA) y uno normalmente cerrado (NC) de un contactor?", reverso: "El contacto NA permanece abierto (sin conducir) cuando la bobina no está energizada, y se cierra al energizarse; el NC permanece cerrado en reposo, y se abre al energizarse la bobina" },
  { anverso: "¿Qué es un relé auxiliar?", reverso: "Un dispositivo electromagnético similar a un contactor pero de menor capacidad de conmutación, empleado habitualmente en el circuito de mando para multiplicar contactos, aislar circuitos o realizar funciones lógicas auxiliares" },
  { anverso: "¿Qué es un temporizador en un automatismo eléctrico?", reverso: "Un dispositivo que retrasa la conmutación de sus contactos un tiempo determinado y ajustable, respecto al instante en que recibe la orden de activación o desactivación" },
  { anverso: "¿Qué es un temporizador a la conexión (temporizado al trabajo)?", reverso: "Un temporizador cuyos contactos cambian de estado un tiempo determinado después de energizar la bobina, mientras que al desenergizarla los contactos vuelven a su posición de reposo de forma instantánea" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un contactor?", explicacion: "Un dispositivo electromagnético que conecta y desconecta un circuito de potencia mediante el mando de una bobina.", dificultad: "facil", opciones: ["Un dispositivo electromagnético que conecta y desconecta un circuito de potencia", "Un dispositivo que mide la resistencia de tierra de una instalación", "Un dispositivo que protege exclusivamente frente a sobretensiones", "Un dispositivo que regula la temperatura de color de una luminaria"], correcta: 0 },
  { enunciado: "¿Qué partes principales componen un contactor?", explicacion: "Bobina, contactos principales y contactos auxiliares.", dificultad: "media", opciones: ["Bobina, contactos principales y contactos auxiliares", "Electrodo, línea de enlace y borne de tierra", "Estátor, rotor y devanado auxiliar", "Driver, diodo LED y disipador térmico"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un contacto normalmente abierto (NA) y uno normalmente cerrado (NC)?", explicacion: "El NA se cierra al energizar la bobina; el NC se abre al energizarla.", dificultad: "media", opciones: ["El NA se cierra al energizar la bobina; el NC se abre", "Ambos permanecen siempre abiertos en cualquier circunstancia", "Ambos permanecen siempre cerrados en cualquier circunstancia", "El NA solo existe en relés, nunca en contactores"], correcta: 0 },
  { enunciado: "¿Qué es un relé auxiliar?", explicacion: "Un dispositivo similar a un contactor, de menor capacidad, empleado en el circuito de mando.", dificultad: "media", opciones: ["Un dispositivo similar a un contactor, de menor capacidad, para el mando", "Un dispositivo exclusivo del circuito de fuerza de un motor", "Un dispositivo que mide la intensidad consumida por un motor", "Un dispositivo que protege frente a sobrecargas mecánicas"], correcta: 0 },
  { enunciado: "¿Qué es un temporizador en un automatismo eléctrico?", explicacion: "Retrasa la conmutación de sus contactos un tiempo determinado y ajustable.", dificultad: "media", opciones: ["Retrasa la conmutación de sus contactos un tiempo determinado", "Mide la resistencia de tierra de la instalación", "Genera el campo magnético giratorio de un motor trifásico", "Protege frente a sobretensiones transitorias de origen atmosférico"], correcta: 0 },
]);

const S2 = "pulsadores-finales-carrera-aparamenta-mando";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un pulsador en un circuito de mando?", reverso: "Un elemento de accionamiento manual que cambia el estado de sus contactos mientras se mantiene pulsado, volviendo a su posición de reposo al soltarlo (a diferencia de un interruptor, que mantiene la posición)" },
  { anverso: "¿Qué es un pulsador de marcha (o de arranque) en un automatismo típico?", reverso: "Un pulsador con contacto normalmente abierto (NA) que, al accionarlo, envía la orden de puesta en marcha del automatismo (por ejemplo, energizando la bobina de un contactor)" },
  { anverso: "¿Qué es un pulsador de paro en un automatismo típico?", reverso: "Un pulsador con contacto normalmente cerrado (NC) que, al accionarlo, interrumpe la alimentación de la bobina y detiene el automatismo" },
  { anverso: "¿Qué es un pulsador de emergencia (o seta de emergencia)?", reverso: "Un pulsador de accionamiento manual, de gran tamaño (habitualmente en forma de seta roja), con contacto normalmente cerrado (NC) y enclavamiento mecánico, que interrumpe de inmediato el automatismo y permanece enclavado hasta que se desenclava manualmente (giro o tirador)" },
  { anverso: "¿Qué es un final de carrera?", reverso: "Un dispositivo de detección que cambia el estado de sus contactos cuando un elemento móvil (por ejemplo, una puerta, una cinta transportadora o el carro de una máquina) alcanza una determinada posición física, accionando mecánicamente su palanca o rodillo" },
  { anverso: "¿Para qué se emplea habitualmente un final de carrera en un automatismo industrial?", reverso: "Para detectar posiciones límite de un elemento móvil (fin de recorrido, apertura o cierre completos) y detener, invertir o condicionar el funcionamiento del automatismo según esa posición detectada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué diferencia a un pulsador de un interruptor en un circuito de mando?", explicacion: "El pulsador vuelve a su posición de reposo al soltarlo; el interruptor mantiene la posición.", dificultad: "media", opciones: ["El pulsador vuelve a su posición de reposo al soltarlo", "El interruptor vuelve a su posición de reposo al soltarlo", "Ambos son exactamente equivalentes en su funcionamiento", "El pulsador solo existe en circuitos de corriente continua"], correcta: 0 },
  { enunciado: "¿Qué tipo de contacto tiene habitualmente un pulsador de marcha?", explicacion: "Normalmente abierto (NA).", dificultad: "media", opciones: ["Normalmente abierto (NA)", "Normalmente cerrado (NC)", "Un contacto conmutado, sin posición de reposo definida", "Ningún contacto, al tratarse de un elemento óptico"], correcta: 0 },
  { enunciado: "¿Qué tipo de contacto tiene habitualmente un pulsador de paro?", explicacion: "Normalmente cerrado (NC).", dificultad: "media", opciones: ["Normalmente cerrado (NC)", "Normalmente abierto (NA)", "Un contacto conmutado, sin posición de reposo definida", "Ningún contacto, al tratarse de un elemento óptico"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un pulsador de emergencia (seta de emergencia)?", explicacion: "Contacto NC con enclavamiento mecánico tras su accionamiento.", dificultad: "dificil", opciones: ["Contacto NC con enclavamiento mecánico tras su accionamiento", "Contacto NA sin ningún tipo de enclavamiento mecánico", "Un temporizador que retrasa la parada del automatismo", "Un relé auxiliar exclusivo del circuito de fuerza"], correcta: 0 },
  { enunciado: "¿Para qué se emplea un final de carrera en un automatismo industrial?", explicacion: "Para detectar posiciones límite de un elemento móvil.", dificultad: "media", opciones: ["Para detectar posiciones límite de un elemento móvil", "Para medir la resistencia de tierra de la instalación", "Para regular la velocidad de un motor de forma continua", "Para proteger frente a sobretensiones transitorias"], correcta: 0 },
]);

const S3 = "interpretacion-esquemas-automatismos-fuerza-mando";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el circuito de fuerza en un esquema de automatismo eléctrico?", reverso: "El circuito que alimenta directamente al receptor de potencia (por ejemplo, un motor), conectado a través de los contactos principales del contactor, y dimensionado para la intensidad nominal de ese receptor" },
  { anverso: "¿Qué es el circuito de mando en un esquema de automatismo eléctrico?", reverso: "El circuito de menor potencia que gobierna el funcionamiento del automatismo, integrado por la bobina del contactor, los pulsadores, los contactos auxiliares, los relés y demás elementos de control" },
  { anverso: "¿Qué es un contacto de autorretención (o enclavamiento eléctrico) en un circuito de mando típico de marcha-paro?", reverso: "Un contacto auxiliar del propio contactor, conectado en paralelo con el pulsador de marcha, que mantiene energizada la bobina una vez soltado dicho pulsador, mientras no se accione el pulsador de paro" },
  { anverso: "¿Qué es un enclavamiento eléctrico entre dos contactores (por ejemplo, en una inversión de giro estrella-triángulo o marcha adelante-atrás)?", reverso: "La conexión de un contacto normalmente cerrado de cada contactor en el circuito de mando del otro, de forma que ambos no puedan energizarse simultáneamente, evitando un cortocircuito o una maniobra incompatible" },
  { anverso: "¿Qué debe identificar en primer lugar un electricista al interpretar un esquema de automatismo desconocido?", reverso: "El circuito de fuerza (receptor alimentado y sus protecciones) y, por separado, el circuito de mando (secuencia lógica de pulsadores, contactos y bobinas que gobiernan ese receptor)" },
  { anverso: "¿Por qué es importante distinguir claramente el circuito de fuerza del circuito de mando al diagnosticar una avería en un automatismo?", reverso: "Porque cada circuito tiene una función y un nivel de tensión/intensidad distintos, y una avería en el circuito de mando (por ejemplo, un pulsador defectuoso) puede impedir el funcionamiento del automatismo sin que exista ningún problema en el circuito de fuerza, y viceversa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el circuito de fuerza en un esquema de automatismo eléctrico?", explicacion: "El que alimenta directamente al receptor de potencia, como un motor.", dificultad: "facil", opciones: ["El que alimenta directamente al receptor de potencia", "El que gobierna el funcionamiento mediante pulsadores y relés", "El que mide la resistencia de tierra de la instalación", "El que protege frente a sobretensiones transitorias"], correcta: 0 },
  { enunciado: "¿Qué es el circuito de mando en un esquema de automatismo eléctrico?", explicacion: "El circuito de menor potencia que gobierna el funcionamiento mediante bobina, pulsadores y contactos auxiliares.", dificultad: "media", opciones: ["El circuito de menor potencia que gobierna el funcionamiento", "El circuito que alimenta directamente al motor de potencia", "El circuito exclusivo de puesta a tierra del automatismo", "El circuito que mide la intensidad consumida por el motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple un contacto de autorretención en un circuito típico de marcha-paro?", explicacion: "Mantiene energizada la bobina tras soltar el pulsador de marcha.", dificultad: "dificil", opciones: ["Mantiene energizada la bobina tras soltar el pulsador de marcha", "Interrumpe permanentemente el circuito de mando", "Alimenta directamente el circuito de fuerza del motor", "Sustituye por completo al pulsador de paro del automatismo"], correcta: 0 },
  { enunciado: "¿Qué finalidad tiene un enclavamiento eléctrico entre dos contactores de una inversión de giro?", explicacion: "Evitar que ambos se energicen simultáneamente, previniendo un cortocircuito.", dificultad: "dificil", opciones: ["Evitar que ambos contactores se energicen simultáneamente", "Permitir que ambos contactores se energicen siempre a la vez", "Aumentar la velocidad de giro del motor de forma permanente", "Sustituir a la necesidad de relé térmico en el automatismo"], correcta: 0 },
  { enunciado: "¿Por qué es importante distinguir el circuito de fuerza del circuito de mando al diagnosticar una avería?", explicacion: "Cada circuito tiene función y nivel de tensión distintos; el fallo puede estar en uno sin afectar al otro.", dificultad: "media", opciones: ["Cada circuito tiene función y nivel de tensión distintos", "Ambos circuitos son siempre exactamente equivalentes", "Solo existe un único circuito en cualquier automatismo", "El circuito de mando nunca puede fallar de forma independiente"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-150 creado y vinculado como Tema 18 de Oficial Electricista.");
