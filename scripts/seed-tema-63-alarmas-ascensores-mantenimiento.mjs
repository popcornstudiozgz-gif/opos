/**
 * Crea tema-63: "Alarmas y ascensores: tipos y mantenimiento" — Tema 9
 * (numero=9, bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf):
 *   "Alarmas: Tipos de alarmas. Elementos que componen la instalación.
 *   Tipos de mantenimiento (preventivo, correctivo, predictivo...).
 *   Ascensores: Mantenimiento (funciones oficial mantenimiento general).
 *   Avisos."
 *
 * Conocimiento técnico consolidado (clasificación de alarmas, tipos de
 * mantenimiento industrial, funciones limitadas del oficial de
 * mantenimiento general sobre ascensores —aviso e incidencias, no
 * mantenimiento técnico reservado a empresa conservadora—); no requiere
 * cita legal artículo a artículo. Se señala explícitamente que el
 * mantenimiento técnico de ascensores está reservado por normativa a
 * empresas conservadoras autorizadas (Reglamento de aparatos elevadores),
 * y que la función del oficial se limita a la detección y aviso de
 * incidencias, no a la intervención técnica sobre el aparato.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-63-alarmas-ascensores-mantenimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-63";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";

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
  titulo: "Alarmas y ascensores: tipos y mantenimiento",
  descripcion: "Tipos de alarmas y elementos de la instalación. Tipos de mantenimiento (preventivo, correctivo, predictivo). Ascensores: funciones del oficial de mantenimiento general y avisos.",
  contenido: "Desarrolla los tipos de alarmas (intrusión, incendio, técnica) y los elementos que componen su instalación; los tipos de mantenimiento industrial (preventivo, correctivo y predictivo); y el papel del oficial de mantenimiento general respecto a los ascensores, limitado a la detección y aviso de incidencias, ya que el mantenimiento técnico está reservado por normativa a empresas conservadoras autorizadas.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipos de alarmas y elementos de la instalación", seccion: "tipos-alarmas-elementos-instalacion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Tipos de mantenimiento: preventivo, correctivo y predictivo", seccion: "tipos-mantenimiento-preventivo-correctivo-predictivo", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Ascensores: funciones del oficial de mantenimiento general y avisos", seccion: "ascensores-funciones-avisos-oficial-general", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "tipos-alarmas-elementos-instalacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipos de alarmas son habituales en edificios e instalaciones municipales?", reverso: "Alarmas de intrusión (antirrobo), alarmas de incendio (detección y aviso) y alarmas técnicas (fallo de suministro eléctrico, inundación, temperatura)" },
  { anverso: "¿Qué es una central de alarmas?", reverso: "El elemento que recibe las señales de los distintos detectores, las procesa y activa la señal de alarma (sonora, óptica o de aviso remoto) según la programación establecida" },
  { anverso: "¿Qué es un detector volumétrico (de movimiento) en una alarma de intrusión?", reverso: "Un sensor (habitualmente infrarrojos pasivo, PIR) que detecta el movimiento dentro de un área protegida y genera la señal de alarma" },
  { anverso: "¿Qué es un contacto magnético en una alarma de intrusión?", reverso: "Un sensor formado por dos piezas (imán y contacto) instaladas en una puerta o ventana, que genera alarma al separarse ambas piezas (apertura)" },
  { anverso: "¿Qué es un detector de humo en una alarma de incendio?", reverso: "Un sensor que detecta partículas de combustión en el aire (por ionización o por célula fotoeléctrica) y activa la señal de alarma de incendio" },
  { anverso: "¿Qué es un pulsador manual de alarma de incendio?", reverso: "Un dispositivo accionado manualmente por una persona que detecta un incendio, que activa directamente la señal de alarma sin esperar a la detección automática" },
  { anverso: "¿Qué es una sirena en una instalación de alarma?", reverso: "El elemento que emite la señal acústica (y a veces también óptica, con flash) de aviso ante la activación de la alarma" },
  { anverso: "¿Qué es un teclado de alarma?", reverso: "El elemento que permite armar, desarmar y programar la central de alarmas mediante un código de acceso" },
  { anverso: "¿Qué es una alarma técnica de fallo eléctrico?", reverso: "Una señal que avisa de un corte o anomalía en el suministro eléctrico de una instalación, permitiendo actuar antes de que afecte a otros sistemas (por ejemplo, cámaras frigoríficas o bombeo)" },
  { anverso: "¿Qué elemento permite el aviso remoto (a un teléfono o central receptora de alarmas) ante una activación?", reverso: "El comunicador o transmisor de la central, que envía la señal por línea telefónica, red de datos o red móvil" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué tipos de alarmas son habituales en instalaciones municipales?", explicacion: "De intrusión, de incendio y técnicas.", dificultad: "facil", opciones: ["De intrusión, de incendio y técnicas", "Solo de intrusión", "Solo de incendio", "Solo de fallo eléctrico"], correcta: 0 },
  { enunciado: "¿Qué función cumple la central de alarmas?", explicacion: "Recibe, procesa y activa la señal de alarma según la programación.", dificultad: "media", opciones: ["Recibe, procesa y activa la señal de alarma", "Emite únicamente la señal acústica", "Detecta el movimiento en un área", "Permite armar y desarmar por código"], correcta: 0 },
  { enunciado: "¿Qué tecnología emplea habitualmente un detector volumétrico de movimiento?", explicacion: "Infrarrojos pasivo (PIR).", dificultad: "media", opciones: ["Infrarrojos pasivo (PIR)", "Contacto magnético", "Célula fotoeléctrica de humo", "Pulsador manual"], correcta: 0 },
  { enunciado: "¿Qué es un contacto magnético en una alarma de intrusión?", explicacion: "Un sensor de dos piezas instalado en puertas o ventanas que detecta la apertura.", dificultad: "media", opciones: ["Un sensor que detecta la apertura de puertas/ventanas", "Un detector de humo", "Un pulsador manual de incendio", "Un comunicador remoto"], correcta: 0 },
  { enunciado: "¿Cómo detecta un incendio un detector de humo?", explicacion: "Por ionización o célula fotoeléctrica, detectando partículas de combustión.", dificultad: "media", opciones: ["Por ionización o célula fotoeléctrica", "Por contacto magnético", "Por infrarrojos pasivo", "Por código de teclado"], correcta: 0 },
  { enunciado: "¿Qué elemento activa la alarma directamente sin esperar a la detección automática?", explicacion: "El pulsador manual.", dificultad: "facil", opciones: ["El pulsador manual", "El detector volumétrico", "El teclado", "El comunicador"], correcta: 0 },
  { enunciado: "¿Qué elemento permite armar y desarmar la central de alarmas?", explicacion: "El teclado, mediante un código de acceso.", dificultad: "facil", opciones: ["El teclado", "La sirena", "El comunicador", "El detector de humo"], correcta: 0 },
  { enunciado: "¿Qué función cumple el comunicador o transmisor de una central de alarmas?", explicacion: "Enviar la señal de aviso remoto por línea telefónica, red de datos o móvil.", dificultad: "dificil", opciones: ["Enviar la señal de aviso remoto", "Detectar el movimiento en el área protegida", "Emitir únicamente el sonido de sirena", "Armar y desarmar la central"], correcta: 0 },
]);

const S2 = "tipos-mantenimiento-preventivo-correctivo-predictivo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el mantenimiento correctivo?", reverso: "El que se realiza después de que se ha producido una avería o fallo, para reparar y devolver el equipo a su funcionamiento normal" },
  { anverso: "¿Qué es el mantenimiento preventivo?", reverso: "El que se realiza de forma planificada y periódica, antes de que se produzca una avería, para reducir la probabilidad de fallo (revisiones, sustituciones programadas, limpiezas)" },
  { anverso: "¿Qué es el mantenimiento predictivo?", reverso: "El que se basa en el seguimiento y medición de parámetros del equipo (vibración, temperatura, desgaste) para anticipar cuándo va a producirse un fallo, interviniendo justo antes de que ocurra" },
  { anverso: "¿Qué ventaja principal tiene el mantenimiento preventivo frente al correctivo?", reverso: "Reduce las averías imprevistas y las paradas no planificadas del servicio, aunque implica un coste continuado de revisiones" },
  { anverso: "¿Qué es un plan de mantenimiento?", reverso: "El documento que recoge las operaciones de mantenimiento preventivo a realizar sobre cada equipo o instalación, con su periodicidad y responsable" },
  { anverso: "¿Qué es el mantenimiento correctivo de emergencia?", reverso: "El mantenimiento correctivo que se realiza de forma inmediata ante una avería que compromete la seguridad o interrumpe totalmente un servicio esencial" },
  { anverso: "¿Qué documenta habitualmente un parte o registro de mantenimiento?", reverso: "La fecha, el equipo o instalación afectada, la operación realizada, la incidencia detectada y el técnico o empresa que interviene" },
  { anverso: "¿Por qué es importante llevar un registro histórico de averías de un equipo?", reverso: "Porque permite detectar patrones de fallo recurrentes y decidir si conviene reforzar el mantenimiento preventivo o sustituir el equipo" },
  { anverso: "¿Qué relación hay entre el mantenimiento preventivo y la vida útil de una instalación?", reverso: "Un buen mantenimiento preventivo alarga la vida útil de la instalación y reduce el riesgo de averías graves o fallos catastróficos" },
  { anverso: "Cita un ejemplo de mantenimiento preventivo típico en instalaciones municipales", reverso: "La revisión periódica de extintores, la limpieza de filtros de climatización, o la comprobación programada de baterías de los equipos de alarma" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el mantenimiento correctivo?", explicacion: "El que se realiza tras producirse una avería, para reparar el equipo.", dificultad: "facil", opciones: ["El que se realiza tras producirse una avería", "El que se realiza de forma periódica planificada", "El que anticipa el fallo midiendo parámetros", "El que solo afecta a instalaciones de alarma"], correcta: 0 },
  { enunciado: "¿En qué se basa el mantenimiento predictivo?", explicacion: "En el seguimiento de parámetros del equipo para anticipar el fallo.", dificultad: "media", opciones: ["En el seguimiento de parámetros para anticipar el fallo", "En reparar tras la avería", "En revisiones periódicas fijas sin medición", "En sustituir el equipo cada año"], correcta: 0 },
  { enunciado: "¿Qué ventaja principal aporta el mantenimiento preventivo?", explicacion: "Reduce las averías imprevistas y las paradas no planificadas.", dificultad: "media", opciones: ["Reduce averías imprevistas y paradas no planificadas", "Elimina por completo el coste de mantenimiento", "Sustituye siempre al mantenimiento correctivo", "Solo se aplica a alarmas de incendio"], correcta: 0 },
  { enunciado: "¿Qué recoge un plan de mantenimiento?", explicacion: "Las operaciones preventivas a realizar, su periodicidad y responsable.", dificultad: "media", opciones: ["Las operaciones preventivas, periodicidad y responsable", "Solo el histórico de averías", "Solo el mantenimiento correctivo de emergencia", "Solo los datos del fabricante del equipo"], correcta: 0 },
  { enunciado: "¿Cuándo se aplica el mantenimiento correctivo de emergencia?", explicacion: "Cuando una avería compromete la seguridad o interrumpe un servicio esencial.", dificultad: "media", opciones: ["Cuando la avería compromete la seguridad o un servicio esencial", "En cada revisión periódica programada", "Solo en instalaciones de alarma técnica", "Cuando se mide la vibración de un equipo"], correcta: 0 },
  { enunciado: "¿Para qué sirve un registro histórico de averías de un equipo?", explicacion: "Para detectar patrones de fallo y decidir reforzar el mantenimiento o sustituir el equipo.", dificultad: "media", opciones: ["Para detectar patrones de fallo recurrentes", "Para sustituir siempre el mantenimiento preventivo", "Para activar la alarma técnica", "Para programar el teclado de la central"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el mantenimiento preventivo y la vida útil de una instalación?", explicacion: "Un buen mantenimiento preventivo la alarga y reduce el riesgo de fallos graves.", dificultad: "facil", opciones: ["Alarga la vida útil y reduce el riesgo de fallos graves", "No tiene ninguna relación", "Acorta la vida útil por el coste que implica", "Solo afecta a equipos eléctricos"], correcta: 0 },
  { enunciado: "¿Cuál de estos es un ejemplo típico de mantenimiento preventivo en instalaciones municipales?", explicacion: "La revisión periódica de extintores.", dificultad: "facil", opciones: ["La revisión periódica de extintores", "La reparación de una fuga tras producirse", "La sustitución urgente de un equipo averiado", "El aviso de una alarma técnica activada"], correcta: 0 },
]);

const S3 = "ascensores-funciones-avisos-oficial-general";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Quién puede realizar el mantenimiento técnico de un ascensor?", reverso: "Únicamente una empresa conservadora de ascensores autorizada y registrada, conforme a la normativa de seguridad industrial de aparatos elevadores; no forma parte de las funciones del oficial de mantenimiento general" },
  { anverso: "¿Cuál es la función principal del oficial de mantenimiento general respecto a los ascensores?", reverso: "Detectar incidencias visibles (ruidos anómalos, paradas, puertas que no cierran bien) y avisar a la empresa conservadora o al servicio municipal correspondiente, sin intervenir técnicamente sobre el aparato" },
  { anverso: "¿Qué debe hacer el oficial de mantenimiento general si detecta que un ascensor está detenido entre plantas con personas en su interior?", reverso: "Mantener la calma con las personas atrapadas a través del interfono/pulsador de emergencia si es posible, y avisar de inmediato al servicio de emergencia de la empresa conservadora (disponible 24 horas), sin intentar abrir manualmente el ascensor" },
  { anverso: "¿Qué es el botón o pulsador de alarma de un ascensor?", reverso: "Un dispositivo que conecta directamente con un servicio de atención de emergencias (de la empresa conservadora), permitiendo pedir ayuda desde el interior de la cabina" },
  { anverso: "¿Por qué está prohibido que personal no autorizado manipule el cuadro de maniobra o la maquinaria de un ascensor?", reverso: "Porque es una instalación de seguridad industrial regulada, y una manipulación indebida puede causar un accidente grave a personas usuarias o al propio personal que interviene" },
  { anverso: "¿Qué tipo de revisiones puede realizar el oficial de mantenimiento general en un ascensor sin ser conservador autorizado?", reverso: "Comprobaciones visuales externas básicas (limpieza de cabina, estado de puertas exteriores, iluminación, cartelería informativa), nunca sobre la maquinaria, cuadro eléctrico o sistemas de seguridad" },
  { anverso: "¿A quién corresponde la inspección periódica oficial (ITV) de un ascensor?", reverso: "A un Organismo de Control Autorizado (OCA), que realiza inspecciones periódicas obligatorias conforme a la normativa de seguridad industrial, independientes del mantenimiento de la empresa conservadora" },
  { anverso: "¿Qué debe hacer el oficial de mantenimiento general si observa un cartel de 'ascensor fuera de servicio' colocado por la empresa conservadora?", reverso: "Respetarlo y no intentar poner el ascensor en marcha, informando si es necesario a los usuarios y verificando que la señalización de fuera de servicio es visible" },
  { anverso: "¿Qué información debe comunicar el oficial al avisar de una incidencia en un ascensor?", reverso: "La ubicación exacta del edificio y ascensor, el tipo de incidencia observada, y si hay o no personas atrapadas en su interior" },
  { anverso: "¿Qué distingue las 'funciones' del oficial de mantenimiento general de las de un técnico conservador de ascensores?", reverso: "El oficial detecta, avisa y realiza comprobaciones externas básicas; el conservador autorizado es quien interviene técnicamente sobre la maquinaria, el cuadro eléctrico y los sistemas de seguridad del aparato" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Quién puede realizar el mantenimiento técnico de un ascensor?", explicacion: "Únicamente una empresa conservadora autorizada.", dificultad: "media", opciones: ["Únicamente una empresa conservadora autorizada", "El oficial de mantenimiento general", "Cualquier operario municipal cualificado", "El personal de limpieza del edificio"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal del oficial de mantenimiento general respecto a los ascensores?", explicacion: "Detectar incidencias y avisar, sin intervenir técnicamente.", dificultad: "media", opciones: ["Detectar incidencias y avisar a la empresa conservadora", "Reparar la maquinaria del ascensor", "Manipular el cuadro de maniobra", "Realizar la inspección periódica oficial"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el oficial si un ascensor queda detenido con personas dentro?", explicacion: "Avisar de inmediato al servicio de emergencia de la conservadora, sin intentar abrirlo manualmente.", dificultad: "media", opciones: ["Avisar al servicio de emergencia de la conservadora", "Intentar abrir manualmente las puertas", "Manipular el cuadro de maniobra para liberar la cabina", "Esperar a la siguiente revisión programada"], correcta: 0 },
  { enunciado: "¿Qué comprobaciones puede hacer el oficial de mantenimiento general sobre un ascensor?", explicacion: "Comprobaciones visuales externas básicas, nunca sobre maquinaria o cuadro eléctrico.", dificultad: "media", opciones: ["Comprobaciones visuales externas básicas", "Revisión de la maquinaria interna", "Manipulación del cuadro eléctrico", "Sustitución de componentes de seguridad"], correcta: 0 },
  { enunciado: "¿A quién corresponde la inspección periódica oficial de un ascensor?", explicacion: "A un Organismo de Control Autorizado (OCA).", dificultad: "dificil", opciones: ["A un Organismo de Control Autorizado (OCA)", "Al oficial de mantenimiento general", "A la empresa conservadora exclusivamente", "Al servicio de bomberos"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el oficial ante un cartel de 'ascensor fuera de servicio' colocado por la conservadora?", explicacion: "Respetarlo y no intentar ponerlo en marcha.", dificultad: "facil", opciones: ["Respetarlo y no intentar ponerlo en marcha", "Retirarlo si lleva más de un día", "Ponerlo en marcha si parece funcionar", "Ignorarlo si no hay usuarios cerca"], correcta: 0 },
  { enunciado: "¿Qué información es imprescindible comunicar al avisar de una incidencia en un ascensor?", explicacion: "Ubicación exacta, tipo de incidencia y si hay personas atrapadas.", dificultad: "media", opciones: ["Ubicación, tipo de incidencia y si hay personas atrapadas", "Solo el número de serie del ascensor", "Solo la hora en que se detectó", "Solo el nombre de la empresa conservadora"], correcta: 0 },
  { enunciado: "¿Por qué está prohibido que personal no autorizado manipule el cuadro de maniobra de un ascensor?", explicacion: "Porque puede causar un accidente grave; es una instalación de seguridad industrial regulada.", dificultad: "media", opciones: ["Porque puede causar un accidente grave", "Porque no forma parte del edificio", "Porque solo lo revisa el servicio de bomberos", "Porque no requiere ninguna cualificación"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-63 creado y vinculado como Tema 9 de Oficial Mantenimiento General.");
