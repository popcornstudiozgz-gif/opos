/**
 * Tema-15: Participación ciudadana y atención al público — Reglamento de
 * Órganos Territoriales y Participación Ciudadana de Zaragoza + Manual de
 * Atención a la Ciudadanía del Ayuntamiento de Zaragoza (este último es un
 * manual de habilidades, no una norma articulada: se condensan sus
 * conceptos clave, que son precisamente los recuadros "RECUERDE" del
 * propio manual, diseñados como resumen).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-15.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-15";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Reglamento de Participación Ciudadana: disposiciones generales (arts. 1-10)
  c("participacion-general", "¿Cuál es el objeto del Reglamento de Órganos Territoriales y Participación Ciudadana (art. 1)?", "Regular los cauces de participación ciudadana, los Consejos de Distrito, las formas de participación de la sociedad civil y el Consejo de la Ciudad de Zaragoza"),
  c("participacion-general", "¿A través de qué organización territorial se canaliza la participación (art. 1)?", "Juntas Municipales, Juntas Vecinales y Concejos Locales, articulada sectorialmente por el Consejo de la Ciudad de Zaragoza"),
  c("participacion-general", "¿Cuántos distritos tiene el término municipal de Zaragoza (art. 2)?", "16 distritos, incluyendo el Distrito Rural que agrupa 14 barrios rurales"),
  c("participacion-general", "¿Qué son las Juntas Municipales y Vecinales (art. 3)?", "Órganos del Ayuntamiento de ámbito territorial para la gestión desconcentrada de Distritos y Barrios Rurales mediante la participación vecinal"),
  c("participacion-general", "¿Qué principios rigen la actuación de las Juntas Municipales y Vecinales (art. 3)?", "Unidad de gobierno, eficacia, coordinación y solidaridad"),
  c("participacion-general", "¿Qué derechos tiene todo vecino de Zaragoza según el art. 7?", "Iniciativa Ciudadana, Audiencia Pública, Consulta Popular, Encuesta Ciudadana, y acceso a la Comisión Especial de Sugerencias y Reclamaciones"),
  c("participacion-general", "¿Qué es el Censo Municipal de Entidades Ciudadanas (art. 8)?", "El instrumento básico para las relaciones de la Administración municipal con las entidades ciudadanas"),
  c("participacion-general", "¿Qué es el Consejo de la Ciudad de Zaragoza (art. 9)?", "El órgano compuesto por representantes de organizaciones económicas, sociales, profesionales y de vecinos, que emite informes y propuestas sobre desarrollo económico y planificación estratégica"),

  // Información municipal (arts. 44-50)
  c("informacion-municipal", "¿Qué existe en las dependencias municipales para canalizar la información (art. 44)?", "Una Oficina de Información que canaliza la información de la gestión municipal y la participación ciudadana"),
  c("informacion-municipal", "¿Cómo deben cursarse las solicitudes de los vecinos a los órganos municipales (art. 44)?", "Necesariamente por escrito, y se tramitan según la legislación de procedimiento administrativo"),
  c("informacion-municipal", "¿Qué es el Boletín municipal (art. 46)?", "Una publicación trimestral que aproxima la Administración a los ciudadanos, con consejo de redacción representando a todos los grupos políticos"),

  // Instrumentos de participación individual (arts. 51-54)
  c("instrumentos-participacion", "¿Qué es la Iniciativa Ciudadana (art. 51)?", "La forma de participación por la que los ciudadanos solicitan al Ayuntamiento realizar una actividad de interés público, aportando medios económicos, bienes o trabajo personal"),
  c("instrumentos-participacion", "¿Qué porcentaje del padrón se necesita para proponer un reglamento u ordenanza (art. 51)?", "El 10% del padrón municipal, mediante ciudadanos mayores de edad empadronados"),
  c("instrumentos-participacion", "¿Qué es la Audiencia Pública (art. 52)?", "La forma de participación oral, en unidad de acto, por la que los ciudadanos proponen acuerdos o reciben información de las actuaciones municipales"),
  c("instrumentos-participacion", "¿Quién puede pedir Audiencia Pública de ámbito ciudadano (art. 52)?", "Las Juntas Municipales/Vecinales, el Consejo de la Ciudad, la Comisión de Sugerencias y Reclamaciones, entidades ciudadanas, o un colectivo del 10% del padrón municipal"),
  c("instrumentos-participacion", "¿Qué es la Consulta Popular (art. 53)?", "El sometimiento a consulta de todos los ciudadanos de asuntos de competencia municipal de especial importancia, excepto los relativos a las Haciendas Locales"),
  c("instrumentos-participacion", "¿Quién autoriza la convocatoria de una Consulta Popular (art. 53)?", "El Gobierno del Estado, tras acuerdo del Pleno por mayoría absoluta y envío a través del Gobierno de Aragón"),
  c("instrumentos-participacion", "¿Qué es el Observatorio Urbano de Zaragoza (art. 54)?", "El órgano que, mediante encuesta ciudadana, recoge la opinión de vecinos y entidades sobre servicios públicos y analiza la calidad de vida"),

  // Consejos de Distrito (arts. 37-43)
  c("consejos-distrito", "¿Qué son los Consejos de Distrito (art. 37)?", "Órganos de ámbito territorial para la desconcentración administrativa que sirven de cauce para la tramitación de asuntos de gestión municipal"),
  c("consejos-distrito", "¿Cómo se constituyen los Consejos de Distrito (art. 38)?", "Por Juntas Municipales completas, limítrofes territorialmente, pudiendo incluir barrios urbanos y rurales"),
  c("consejos-distrito", "¿Quiénes son órganos del Consejo de Distrito (art. 40)?", "El Presidente y el Consejo Rector"),
  c("consejos-distrito", "¿Quién es el Presidente nato de todos los Consejos de Distrito (art. 41.1)?", "El Alcalde, que puede delegar en un Concejal"),
  c("consejos-distrito", "¿Quiénes integran el Consejo Rector (art. 42)?", "El Presidente del Consejo de Distrito y los Presidentes de las Juntas, con un vocal por grupo municipal y un representante vecinal (con voz sin voto)"),

  // Manual de Atención a la Ciudadanía: calidad del servicio
  c("calidad-atencion", "¿Cuáles son los 4 factores según los que se juzga la calidad de un servicio de atención?", "Aspectos tangibles, capacidad de respuesta, seguridad y fiabilidad, y empatía"),
  c("calidad-atencion", "¿Cuál es el factor clave en el \"momento de la verdad\" del servicio público?", "El trato recibido del personal directamente en contacto con la ciudadanía"),
  c("calidad-atencion", "¿Cuáles son las dos causas principales de baja calidad percibida en un servicio público?", "La actitud del personal y la lentitud del servicio"),
  c("calidad-atencion", "Enumera los \"siete errores\" de los servicios de atención a la ciudadanía", "Apatía, \"quitárselos de encima\", frialdad, condescendencia, robotización, excesiva reglamentación y transferencias (derivar sin resolver)"),
  c("calidad-atencion", "¿Cuáles son las 5 características de la calidad en un servicio de atención?", "Responsabilidad de todas y todos; hacer las cosas bien a la primera; autocontrol emocional; actitud activa (prevención) frente a pasiva; mejora continua"),

  // Manual de Atención a la Ciudadanía: comunicación
  c("comunicacion-atencion", "¿Con qué dos tipos de mensajes nos comunicamos?", "Mensajes verbales (palabras) y mensajes no verbales (conductas, gestos, tono)"),
  c("comunicacion-atencion", "¿Cuáles son los dos grandes momentos de la comunicación humana?", "Escuchar y hablar"),
  c("comunicacion-atencion", "¿Qué requiere la verdadera escucha activa?", "Ser activa, sin interrumpir ni dar consejos, captando no solo el significado sino la intención y el sentimiento del interlocutor"),
  c("comunicacion-atencion", "¿Qué cualidades debe tener el habla en la atención al público?", "Ser clara (términos comprensibles, sin jerga) y precisa (sin divagar), con brevedad"),
  c("comunicacion-atencion", "Enumera los 3 niveles de atención a la ciudadanía", "Acogida (situar a la persona), Recogida (saludo e indicación breve), y Reconocimiento (personalizar, usar el nombre, mostrar cercanía)"),
  c("comunicacion-atencion", "¿Qué estrategia se recomienda para mantener la calma en una situación tensa?", "Respirar profundamente varias veces y usar autoverbalizaciones constructivas (diálogo interior positivo)"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-15...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["participacion-general", "informacion-municipal", "instrumentos-participacion", "consejos-distrito", "calidad-atencion", "comunicacion-atencion"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-15&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-15) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-15 completado.");
