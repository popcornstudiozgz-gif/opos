/**
 * Crea tema-141: "Seguridad eléctrica y prevención de riesgos laborales" —
 * Tema 9 (numero=9, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea 1324):
 *   "Seguridad Eléctrica y Prevención de Riesgos Laborales. Efectos de la
 *   corriente eléctrica sobre el cuerpo humano. Tipos de contactos:
 *   directos e indirectos. Protecciones contra contactos directos e
 *   indirectos. Cinco Reglas de Oro para trabajos en descargo. Equipos de
 *   Protección Individual (EPI)."
 *
 * Fuentes primarias verificadas en esta sesión (WebSearch sobre boe.es):
 * - Real Decreto 614/2001, de 8 de junio, sobre disposiciones mínimas
 *   para la protección de la salud y seguridad de los trabajadores frente
 *   al riesgo eléctrico — BOE-A-2001-11881. Las "cinco reglas de oro"
 *   (desconectar, prevenir cualquier posible realimentación, verificar
 *   ausencia de tensión, poner a tierra y en cortocircuito, y señalizar y
 *   delimitar la zona de trabajo) figuran en su Anexo II.
 * - Real Decreto 842/2002 (REBT), ITC-BT-24: protección contra los
 *   contactos directos e indirectos.
 * - Real Decreto 773/1997, de 30 de mayo, sobre disposiciones mínimas de
 *   seguridad y salud relativas a la utilización por los trabajadores de
 *   equipos de protección individual — texto íntegro ya descargado en
 *   scripts/tmp-fuentes/rd773-1997-epi.txt (usado también en Oficial
 *   Albañil y Oficial Cementerio).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-141-seguridad-electrica-prl.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-141";
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
  titulo: "Seguridad eléctrica y prevención de riesgos laborales",
  descripcion: "Efectos de la corriente eléctrica sobre el cuerpo humano. Tipos de contactos: directos e indirectos. Protecciones contra contactos directos e indirectos. Cinco Reglas de Oro para trabajos en descargo. Equipos de Protección Individual (EPI).",
  contenido: "Desarrolla los efectos de la corriente eléctrica sobre el cuerpo humano (electrización, electrocución, tetanización, fibrilación ventricular, quemaduras), los tipos de contacto eléctrico (directo e indirecto) y las protecciones reglamentarias frente a cada uno de ellos (ITC-BT-24 del REBT). Desarrolla también las Cinco Reglas de Oro para la realización de trabajos sin tensión (descargo), recogidas en el Anexo II del Real Decreto 614/2001, y los Equipos de Protección Individual (EPI) propios de los trabajos eléctricos.",
  enlaces_boe: [
    { titulo: "Real Decreto 614/2001, disposiciones mínimas de protección frente al riesgo eléctrico", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881" },
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-24)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
    { titulo: "Real Decreto 773/1997, utilización de equipos de protección individual", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881", titulo: "Efectos de la corriente eléctrica sobre el cuerpo humano. Tipos de contactos", seccion: "efectos-corriente-electrica-cuerpo-humano-tipos-contactos", articulos: "RD 614/2001" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Protecciones contra contactos directos e indirectos", seccion: "protecciones-contactos-directos-indirectos", articulos: "ITC-BT-24" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881", titulo: "Cinco Reglas de Oro para trabajos en descargo. EPI", seccion: "cinco-reglas-oro-trabajos-descargo-epi", articulos: "RD 614/2001, Anexo II; RD 773/1997" },
  ],
}]);

const S1 = "efectos-corriente-electrica-cuerpo-humano-tipos-contactos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué se entiende por electrización?", reverso: "El conjunto de efectos fisiopatológicos que produce el paso de la corriente eléctrica a través del cuerpo humano, sin que necesariamente resulte mortal" },
  { anverso: "¿Qué se entiende por electrocución?", reverso: "La electrización que provoca la muerte de la persona afectada, habitualmente por fibrilación ventricular o parada cardiorrespiratoria" },
  { anverso: "¿Qué es la fibrilación ventricular como efecto de la corriente eléctrica sobre el cuerpo humano?", reverso: "Una alteración grave del ritmo cardiaco, con contracciones desordenadas del corazón que impiden que bombee sangre eficazmente, pudiendo causar la muerte si no se revierte de inmediato" },
  { anverso: "¿Qué es la tetanización muscular producida por la corriente eléctrica?", reverso: "La contracción involuntaria y sostenida de los músculos al paso de la corriente, que puede impedir a la víctima soltar el elemento en tensión que está tocando" },
  { anverso: "¿Qué es un contacto eléctrico directo?", reverso: "El contacto de una persona con una parte activa de la instalación que en condiciones normales está en tensión (un conductor desnudo, un borne, una parte activa sin aislar)" },
  { anverso: "¿Qué es un contacto eléctrico indirecto?", reverso: "El contacto de una persona con una masa (carcasa, envolvente metálica) que accidentalmente ha quedado en tensión por un fallo de aislamiento, sin que dicha masa esté normalmente en tensión" },
  { anverso: "¿Qué factores influyen en la gravedad de los efectos de la corriente eléctrica sobre el cuerpo humano?", reverso: "La intensidad de la corriente que atraviesa el cuerpo, el tiempo de contacto, el recorrido de la corriente por el organismo, la frecuencia, y la resistencia eléctrica del cuerpo (que depende, entre otros factores, de la humedad de la piel)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la electrocución?", explicacion: "La electrización que provoca la muerte de la persona afectada.", dificultad: "facil", opciones: ["La electrización que provoca la muerte de la persona", "Cualquier contacto con una instalación eléctrica sin excepción", "Un tipo de protección eléctrica reglamentaria", "Un instrumento de medida de la resistencia de tierra"], correcta: 0 },
  { enunciado: "¿Qué es un contacto eléctrico directo?", explicacion: "El contacto con una parte activa que en condiciones normales está en tensión.", dificultad: "media", opciones: ["El contacto con una parte activa normalmente en tensión", "El contacto con una masa que accidentalmente ha quedado en tensión", "El contacto con cualquier superficie metálica sin excepción", "Un contacto que nunca puede producirse en una instalación correctamente ejecutada"], correcta: 0 },
  { enunciado: "¿Qué es un contacto eléctrico indirecto?", explicacion: "El contacto con una masa que accidentalmente ha quedado en tensión por un fallo de aislamiento.", dificultad: "media", opciones: ["El contacto con una masa accidentalmente puesta en tensión por un fallo de aislamiento", "El contacto con una parte activa normalmente en tensión", "Un contacto que solo puede producirse en instalaciones de alta tensión", "Un contacto sin ninguna relación con fallos de aislamiento"], correcta: 0 },
  { enunciado: "¿Qué efecto de la corriente eléctrica puede impedir a la víctima soltar el elemento en tensión que está tocando?", explicacion: "La tetanización muscular.", dificultad: "media", opciones: ["La tetanización muscular", "La fibrilación ventricular exclusivamente", "El efecto Joule sobre los conductores", "La resistencia de aislamiento del conductor"], correcta: 0 },
  { enunciado: "¿Qué factores influyen en la gravedad de los efectos de la corriente eléctrica sobre el cuerpo humano?", explicacion: "Intensidad, tiempo de contacto, recorrido, frecuencia y resistencia del cuerpo.", dificultad: "media", opciones: ["Intensidad, tiempo de contacto, recorrido por el cuerpo y resistencia corporal", "Únicamente el color del cableado de la instalación", "Únicamente la marca del material eléctrico instalado", "Únicamente la hora del día en que se produce el contacto"], correcta: 0 },
]);

const S2 = "protecciones-contactos-directos-indirectos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria del REBT regula la protección contra los contactos directos e indirectos?", reverso: "La ITC-BT-24" },
  { anverso: "¿Qué es la protección contra contactos directos por alejamiento?", reverso: "Una medida de protección basada en situar las partes activas fuera del alcance de las personas, mediante distancias de seguridad suficientes" },
  { anverso: "¿Qué es la protección contra contactos directos mediante obstáculos o interposición?", reverso: "Una medida basada en interponer obstáculos (barreras, envolventes) que impidan un contacto accidental o involuntario con las partes activas" },
  { anverso: "¿Qué es el aislamiento de las partes activas como medida de protección contra contactos directos?", reverso: "El recubrimiento de las partes activas con un aislamiento apropiado, capaz de conservar sus propiedades con el tiempo y de soportar los esfuerzos mecánicos, químicos y eléctricos a los que puede verse sometido en servicio" },
  { anverso: "¿Qué es la puesta a tierra de las masas como medida de protección contra contactos indirectos?", reverso: "La conexión eléctrica de las masas metálicas de los receptores y equipos a un electrodo (o conjunto de electrodos) enterrado, para derivar a tierra las corrientes de defecto y facilitar la actuación de las protecciones" },
  { anverso: "¿Qué es el interruptor diferencial (ID) y qué función cumple frente a los contactos indirectos?", reverso: "Un dispositivo que detecta la diferencia entre la intensidad que entra y la que sale de un circuito (corriente de fuga o de defecto) y desconecta automáticamente la instalación cuando esa diferencia supera un valor preestablecido, protegiendo frente a contactos indirectos" },
  { anverso: "¿Qué es la protección por doble aislamiento de un equipo eléctrico (clase II)?", reverso: "Un sistema de protección que incorpora, además del aislamiento funcional normal, un aislamiento suplementario que evita que un fallo del aislamiento principal ponga en tensión las partes accesibles del equipo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué instrucción técnica complementaria del REBT regula la protección contra contactos directos e indirectos?", explicacion: "La ITC-BT-24.", dificultad: "media", opciones: ["La ITC-BT-24", "La ITC-BT-18", "La ITC-BT-03", "La ITC-BT-44"], correcta: 0 },
  { enunciado: "¿Qué medida de protección contra contactos directos consiste en situar las partes activas fuera del alcance de las personas?", explicacion: "El alejamiento.", dificultad: "media", opciones: ["El alejamiento", "El aislamiento de las partes activas", "La puesta a tierra de las masas", "El interruptor diferencial"], correcta: 0 },
  { enunciado: "¿Qué dispositivo detecta la corriente de fuga de un circuito y desconecta la instalación automáticamente, protegiendo frente a contactos indirectos?", explicacion: "El interruptor diferencial (ID).", dificultad: "facil", opciones: ["El interruptor diferencial (ID)", "El interruptor general automático (IGA)", "El pequeño interruptor automático (PIA)", "El interruptor de control de potencia (ICP)"], correcta: 0 },
  { enunciado: "¿Qué función cumple la puesta a tierra de las masas frente a los contactos indirectos?", explicacion: "Deriva a tierra las corrientes de defecto, facilitando la actuación de las protecciones.", dificultad: "media", opciones: ["Deriva a tierra las corrientes de defecto y facilita la actuación de las protecciones", "Elimina por completo la posibilidad de cualquier fallo de aislamiento", "Aumenta la tensión de la instalación para detectar fallos con mayor rapidez", "Sustituye por completo a la necesidad de un interruptor diferencial"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un equipo eléctrico de clase II frente a los contactos indirectos?", explicacion: "Incorpora un aislamiento suplementario (doble aislamiento) que protege sin necesidad de puesta a tierra.", dificultad: "dificil", opciones: ["Incorpora un aislamiento suplementario (doble aislamiento)", "Carece de cualquier tipo de aislamiento en sus partes activas", "Requiere obligatoriamente puesta a tierra para funcionar de forma segura", "Solo puede emplearse en instalaciones de alta tensión"], correcta: 0 },
]);

const S3 = "cinco-reglas-oro-trabajos-descargo-epi";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Dónde se recogen las Cinco Reglas de Oro para la realización de trabajos sin tensión (descargo)?", reverso: "En el Anexo II del Real Decreto 614/2001, sobre disposiciones mínimas para la protección de la salud y seguridad de los trabajadores frente al riesgo eléctrico" },
  { anverso: "¿Cuál es la primera de las Cinco Reglas de Oro?", reverso: "Desconectar: abrir con corte visible todas las fuentes de tensión mediante interruptores y seccionadores que aseguren la imposibilidad de su cierre intempestivo" },
  { anverso: "¿Cuál es la segunda de las Cinco Reglas de Oro?", reverso: "Prevenir cualquier posible realimentación: bloquear, si es posible, los aparatos de corte y señalizar en el mando de estos que no deben accionarse" },
  { anverso: "¿Cuál es la tercera de las Cinco Reglas de Oro?", reverso: "Verificar la ausencia de tensión mediante un dispositivo o equipo de comprobación adecuado y homologado" },
  { anverso: "¿Cuál es la cuarta de las Cinco Reglas de Oro?", reverso: "Poner a tierra y en cortocircuito todas las posibles fuentes de tensión, especialmente relevante en instalaciones de alta tensión" },
  { anverso: "¿Cuál es la quinta de las Cinco Reglas de Oro?", reverso: "Delimitar y señalizar la zona de trabajo, mediante los medios que resulten necesarios para advertir a terceras personas" },
  { anverso: "¿En qué orden deben aplicarse las Cinco Reglas de Oro?", reverso: "En el orden establecido (desconectar, prevenir la realimentación, verificar ausencia de tensión, poner a tierra y en cortocircuito, y señalizar/delimitar la zona), siendo de obligado cumplimiento antes de iniciar un trabajo sin tensión" },
  { anverso: "¿Qué EPI básicos son propios de los trabajos eléctricos de baja tensión?", reverso: "Guantes aislantes, calzado o botas aislantes, casco con protección dieléctrica, gafas de protección, pantalla facial, y herramientas y banquetas o alfombras aislantes homologadas para el nivel de tensión correspondiente" },
  { anverso: "¿Qué debe verificarse periódicamente en los guantes aislantes empleados en trabajos eléctricos?", reverso: "Su estado de conservación (ausencia de perforaciones, grietas o deterioro) y la vigencia de sus ensayos dieléctricos periódicos, conforme a la norma técnica aplicable" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Dónde se recogen las Cinco Reglas de Oro para trabajos sin tensión?", explicacion: "En el Anexo II del Real Decreto 614/2001.", dificultad: "media", opciones: ["En el Anexo II del Real Decreto 614/2001", "En la ITC-BT-24 del REBT", "En el Real Decreto 773/1997 sobre EPI", "En el Real Decreto 1215/1997 sobre equipos de trabajo"], correcta: 0 },
  { enunciado: "¿Cuál es la primera de las Cinco Reglas de Oro?", explicacion: "Desconectar, con corte visible, todas las fuentes de tensión.", dificultad: "facil", opciones: ["Desconectar todas las fuentes de tensión", "Verificar la ausencia de tensión", "Poner a tierra y en cortocircuito", "Señalizar y delimitar la zona de trabajo"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse, según las Cinco Reglas de Oro, para prevenir una posible realimentación tras desconectar?", explicacion: "Bloquear los aparatos de corte y señalizar que no deben accionarse.", dificultad: "media", opciones: ["Bloquear los aparatos de corte y señalizarlos", "Volver a conectar brevemente la instalación para comprobarla", "Retirar todos los fusibles de la instalación sin excepción", "Aumentar la tensión de la instalación de forma temporal"], correcta: 0 },
  { enunciado: "¿Con qué debe verificarse la ausencia de tensión antes de iniciar un trabajo sin tensión?", explicacion: "Con un dispositivo o equipo de comprobación adecuado y homologado.", dificultad: "media", opciones: ["Con un dispositivo de comprobación adecuado y homologado", "A simple vista, sin ningún instrumento adicional", "Tocando brevemente el conductor con la mano protegida por un guante de trabajo cualquiera", "No es necesaria esta verificación si ya se ha desconectado la instalación"], correcta: 0 },
  { enunciado: "¿Cuál es la quinta y última de las Cinco Reglas de Oro?", explicacion: "Delimitar y señalizar la zona de trabajo.", dificultad: "media", opciones: ["Delimitar y señalizar la zona de trabajo", "Desconectar todas las fuentes de tensión", "Poner a tierra y en cortocircuito", "Verificar la ausencia de tensión"], correcta: 0 },
  { enunciado: "¿Qué norma regula la utilización por los trabajadores de los Equipos de Protección Individual (EPI)?", explicacion: "El Real Decreto 773/1997.", dificultad: "media", opciones: ["El Real Decreto 773/1997", "El Real Decreto 614/2001", "El Real Decreto 842/2002", "El Real Decreto 1215/1997"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-141 creado y vinculado como Tema 9 de Oficial Electricista.");
