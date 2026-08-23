/**
 * Alta del tema canónico nuevo: "Transparencia, protección de datos e
 * igualdad de oportunidades" — para el Tema 18 de la oposición de la DPZ
 * ("La transparencia de la actividad pública: publicidad activa y
 * derecho de acceso a la información pública. Protección de datos
 * personales: principios generales. Principios generales de la actuación
 * de los poderes públicos aragoneses en materia de igualdad de
 * oportunidades entre hombres y mujeres.").
 *
 * Tres secciones, tres normas distintas, las tres verificadas contra el
 * texto consolidado del BOE:
 * - transparencia-acceso-informacion: Ley 19/2013, de transparencia,
 *   acceso a la información pública y buen gobierno (BOE-A-2013-12887).
 * - proteccion-datos-principios: Ley Orgánica 3/2018, de Protección de
 *   Datos Personales y garantía de los derechos digitales
 *   (BOE-A-2018-16673).
 * - igualdad-oportunidades-aragon: Ley 7/2018, de igualdad de
 *   oportunidades entre mujeres y hombres en Aragón (BOE-A-2018-11932) —
 *   ¡OJO, no confundir con la Ley 4/2007 de violencia de género de
 *   Aragón, ya sembrada en tema-2! Son dos leyes aragonesas distintas
 *   sobre materias distintas (igualdad de oportunidades general, frente
 *   a protección contra la violencia). Su art. 3, literalmente titulado
 *   "Principios generales de la actuación de los poderes públicos
 *   aragoneses", es precisamente lo que pide el Tema 18 de la DPZ.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-26-transparencia-datos-igualdad.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

const TEMA = "tema-26";
const p = (seccion, dificultad, pregunta, opciones, explicacion) => ({ seccion, dificultad, pregunta, opciones, explicacion });

const ITEMS = [
  // ── Transparencia y acceso a la información (Ley 19/2013) ───────────────
  p("transparencia-acceso-informacion", "facil",
    "¿Qué tiene por objeto la Ley 19/2013 según su art. 1?",
    ["Ampliar y reforzar la transparencia de la actividad pública, regular y garantizar el derecho de acceso a la información y establecer las obligaciones de buen gobierno",
     "Regular exclusivamente el procedimiento sancionador de las Administraciones Públicas",
     "Sustituir a la Ley 39/2015 en materia de procedimiento administrativo",
     "Regular únicamente la protección de datos personales de los empleados públicos"],
    "El art. 1 LTAIBG combina tres pilares: publicidad activa (transparencia), derecho de acceso a la información, y buen gobierno — un objeto más amplio que un simple régimen sancionador."),
  p("transparencia-acceso-informacion", "media",
    "¿Qué deben publicar de forma periódica y actualizada los sujetos obligados según el art. 5.1 LTAIBG (publicidad activa)?",
    ["La información cuyo conocimiento sea relevante para garantizar la transparencia de su actividad relacionada con el funcionamiento y control de la actuación pública",
     "Únicamente los datos personales de sus empleados públicos",
     "Solo la información que sea expresamente solicitada por un ciudadano",
     "Exclusivamente sus cuentas anuales auditadas, sin más información"],
    "El art. 5.1 LTAIBG configura la publicidad activa como una obligación proactiva y periódica, no condicionada a que alguien la solicite (a diferencia del derecho de acceso, que sí exige solicitud)."),
  p("transparencia-acceso-informacion", "facil",
    "¿Quién tiene derecho a acceder a la información pública según el art. 12 LTAIBG?",
    ["Todas las personas, en los términos previstos en el art. 105.b) de la Constitución Española y desarrollados por esta Ley",
     "Únicamente los ciudadanos españoles mayores de edad",
     "Solo quienes acrediten un interés legítimo directo en la información solicitada",
     "Únicamente los periodistas acreditados y los investigadores universitarios"],
    "El art. 12 LTAIBG universaliza el derecho de acceso («todas las personas»), sin exigir nacionalidad, mayoría de edad ni interés legítimo específico, en desarrollo del art. 105.b) CE."),
  p("transparencia-acceso-informacion", "media",
    "¿Qué se entiende por «información pública» según el art. 13 LTAIBG?",
    ["Los contenidos o documentos, cualquiera que sea su formato o soporte, que obren en poder de un sujeto obligado y que hayan sido elaborados o adquiridos en el ejercicio de sus funciones",
     "Únicamente los documentos publicados oficialmente en un boletín oficial",
     "Solo la información que no tenga ningún dato de carácter personal",
     "Exclusivamente los expedientes administrativos ya resueltos y archivados"],
    "El art. 13 LTAIBG da un concepto amplio: cualquier contenido o documento, sea cual sea su soporte, vinculado al ejercicio de funciones públicas, no restringido a lo ya publicado oficialmente."),
  p("transparencia-acceso-informacion", "dificil",
    "¿Cuál de estos es un límite al derecho de acceso a la información pública según el art. 14.1 LTAIBG?",
    ["La seguridad pública",
     "El interés personal del solicitante en obtener la información",
     "El coste administrativo de tramitar la solicitud",
     "La falta de motivación de la solicitud por parte del ciudadano"],
    "El art. 14.1 LTAIBG enumera límites tasados (seguridad nacional, defensa, seguridad pública, secreto profesional...), todos vinculados a un interés público o de terceros a proteger — nunca al coste de tramitación ni a la falta de motivación, que el art. 17.3 LTAIBG expresamente no exige."),
  p("transparencia-acceso-informacion", "media",
    "¿Está el solicitante obligado a motivar su solicitud de acceso a la información según el art. 17.3 LTAIBG?",
    ["No: el solicitante no está obligado a motivar su solicitud, aunque puede exponer los motivos si lo desea; la ausencia de motivación no será por sí sola causa de rechazo",
     "Sí, en todo caso, so pena de inadmisión automática de la solicitud",
     "Solo si la información solicitada afecta a datos de terceros",
     "Solo si el solicitante es una persona jurídica, no si es una persona física"],
    "El art. 17.3 LTAIBG facilita el ejercicio del derecho: la motivación es voluntaria y puede tenerse en cuenta al resolver, pero su ausencia nunca es causa de rechazo por sí sola."),
  p("transparencia-acceso-informacion", "media",
    "¿En qué plazo máximo debe notificarse la resolución sobre una solicitud de acceso a la información según el art. 20.1 LTAIBG?",
    ["Un mes desde la recepción de la solicitud por el órgano competente, ampliable por otro mes si el volumen o complejidad de la información lo justifica",
     "Tres meses, sin posibilidad de ampliación",
     "Quince días hábiles, en todo caso, sin excepciones",
     "No existe plazo legal, se resuelve según la carga de trabajo del órgano"],
    "El art. 20.1 LTAIBG fija un plazo general de un mes, prorrogable motivadamente por otro mes ante solicitudes voluminosas o complejas."),
  p("transparencia-acceso-informacion", "dificil",
    "¿Qué efecto tiene el transcurso del plazo máximo para resolver sin que se haya dictado y notificado resolución expresa, según el art. 20.4 LTAIBG?",
    ["Se entenderá que la solicitud ha sido desestimada (silencio administrativo negativo)",
     "Se entenderá que la solicitud ha sido estimada (silencio administrativo positivo)",
     "El procedimiento se archiva automáticamente sin efecto alguno",
     "El solicitante debe volver a presentar la solicitud desde el principio"],
    "El art. 20.4 LTAIBG opta por el silencio negativo en materia de acceso a la información, a diferencia de la regla general más favorable de otros procedimientos — el solicitante puede recurrir la desestimación presunta."),
  // ── Protección de datos personales: principios generales (LO 3/2018) ────
  p("proteccion-datos-principios", "facil",
    "¿Qué objeto tiene la Ley Orgánica 3/2018 según su art. 1?",
    ["Adaptar el ordenamiento jurídico español al Reglamento (UE) 2016/679 (RGPD) y garantizar los derechos digitales de la ciudadanía, en desarrollo del art. 18.4 CE",
     "Sustituir íntegramente al Reglamento (UE) 2016/679, dejándolo sin efecto en España",
     "Regular exclusivamente el tratamiento de datos por parte de las empresas privadas",
     "Regular únicamente el uso de cámaras de videovigilancia en espacios públicos"],
    "El art. 1 LOPDGDD no sustituye al RGPD, lo completa y desarrolla, además de añadir la garantía de los derechos digitales, novedad de esta ley respecto a la anterior LOPD de 1999."),
  p("proteccion-datos-principios", "media",
    "¿Qué exige el art. 4.1 LOPDGDD respecto a los datos personales, en línea con el art. 5.1.d) del RGPD?",
    ["Que los datos sean exactos y, si fuere necesario, actualizados",
     "Que los datos se conserven de forma indefinida, sin límite temporal",
     "Que los datos se recaben siempre por escrito, nunca de forma verbal",
     "Que los datos se publiquen siempre en un registro de acceso público"],
    "El art. 4.1 LOPDGDD recoge el principio de exactitud (uno de los principios del tratamiento del art. 5 RGPD), no vinculado ni a la conservación indefinida ni a la publicidad de los datos."),
  p("proteccion-datos-principios", "media",
    "¿A quién alcanza el deber de confidencialidad según el art. 5.1 LOPDGDD?",
    ["A los responsables y encargados del tratamiento de datos, así como a todas las personas que intervengan en cualquier fase de este",
     "Únicamente al responsable del tratamiento, no a sus empleados ni encargados",
     "Solo a las Administraciones Públicas, no a las empresas privadas",
     "Únicamente durante el tiempo en que dure la relación laboral con el responsable"],
    "El art. 5 LOPDGDD extiende el deber de confidencialidad a todo interviniente en el tratamiento, y además lo mantiene vigente incluso tras finalizar la relación con el responsable o encargado (art. 5.3)."),
  p("proteccion-datos-principios", "dificil",
    "¿Cuándo puede considerarse fundado el tratamiento de datos personales en el ejercicio de poderes públicos conferidos al responsable, según el art. 8.2 LOPDGDD?",
    ["Cuando derive de una competencia atribuida por una norma con rango de ley",
     "En cualquier caso, sin necesidad de amparo normativo específico",
     "Únicamente si lo autoriza expresamente el afectado mediante consentimiento",
     "Solo cuando lo autorice una ordenanza municipal, sin necesidad de norma con rango de ley"],
    "El art. 8.2 LOPDGDD exige rango de ley (no basta un reglamento ni una ordenanza) para fundamentar el tratamiento de datos por el ejercicio de poderes públicos — una garantía especialmente relevante para la actividad de las Administraciones Públicas, incluidas las entidades locales."),
  p("proteccion-datos-principios", "media",
    "¿Basta el solo consentimiento del afectado para tratar datos que revelen su ideología, afiliación sindical, religión u orientación sexual, según el art. 9.1 LOPDGDD?",
    ["No: el solo consentimiento no basta para levantar la prohibición de tratamiento de estas categorías especiales de datos, a fin de evitar situaciones discriminatorias",
     "Sí, el consentimiento del afectado es siempre suficiente para cualquier categoría de datos",
     "Solo si el afectado es mayor de edad, sin más requisitos",
     "Solo si el tratamiento lo realiza una Administración Pública, no una empresa privada"],
    "El art. 9.1 LOPDGDD añade una garantía reforzada frente al RGPD para las categorías especiales de datos: ni siquiera el consentimiento expreso del afectado basta por sí solo cuando la finalidad principal sea identificar esos rasgos, precisamente para prevenir la discriminación."),
  p("proteccion-datos-principios", "facil",
    "¿Cómo se ejercita el derecho de acceso del afectado a sus propios datos según el art. 13.1 LOPDGDD?",
    ["De acuerdo con lo establecido en el art. 15 del Reglamento (UE) 2016/679 (RGPD)",
     "Únicamente mediante un procedimiento judicial previo",
     "Solo puede ejercitarse una vez en toda la vida del afectado",
     "Solo si el afectado es funcionario público, no si es un ciudadano particular"],
    "El art. 13 LOPDGDD no crea un derecho de acceso paralelo, remite directamente al art. 15 RGPD y solo añade especialidades de desarrollo (como el límite al ejercicio repetitivo del art. 13.3)."),
  // ── Igualdad de oportunidades en Aragón: principios generales (Ley 7/2018) ──
  p("igualdad-oportunidades-aragon", "facil",
    "¿Qué tiene por objeto la Ley 7/2018 de igualdad de oportunidades entre mujeres y hombres en Aragón, según su art. 1?",
    ["Hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres en Aragón, estableciendo los principios generales de actuación de los poderes públicos aragoneses en esta materia",
     "Regular exclusivamente la protección de las víctimas de violencia de género en Aragón (esa es la Ley 4/2007, distinta de esta)",
     "Sustituir íntegramente a la Ley Orgánica 3/2007 estatal en el territorio aragonés",
     "Regular únicamente las condiciones laborales de las mujeres en la Administración autonómica"],
    "El art. 1 de la Ley 7/2018 tiene un objeto más amplio que la Ley 4/2007 (centrada en la violencia de género): busca la igualdad de oportunidades en todos los ámbitos de la vida en Aragón, en desarrollo de la Constitución y del Estatuto de Autonomía."),
  p("igualdad-oportunidades-aragon", "media",
    "¿En desarrollo de qué precepto de la Ley Orgánica 3/2007 (LOIEMH) se formulan los principios generales de actuación de los poderes públicos aragoneses, según el art. 3 de la Ley 7/2018?",
    ["El art. 14 de la Ley Orgánica 3/2007, para la igualdad efectiva de mujeres y hombres",
     "El art. 106 de la Constitución Española",
     "El art. 25 de la Ley 7/1985, de Bases del Régimen Local",
     "El Reglamento (UE) 2016/679, de protección de datos"],
    "El art. 3 de la Ley 7/2018 vincula expresamente los principios aragoneses con el art. 14 LOIEMH (que fija los «criterios generales de actuación de los poderes públicos» a nivel estatal), adaptándolos y ampliándolos para Aragón."),
  p("igualdad-oportunidades-aragon", "media",
    "Cita uno de los principios generales de actuación de los poderes públicos aragoneses enumerados en el art. 3 de la Ley 7/2018",
    ["La integración de la igualdad de trato y de oportunidades entre mujeres y hombres en el conjunto de las políticas de Aragón",
     "La prioridad absoluta del criterio de antigüedad sobre el de mérito en la función pública",
     "La centralización de todas las competencias de igualdad en la Administración General del Estado",
     "La exclusión de las entidades locales de cualquier función en materia de igualdad"],
    "El art. 3 de la Ley 7/2018 enumera 17 principios (transversalidad, participación equilibrada, interseccionalidad, corresponsabilidad, lenguaje no sexista...), todos orientados a integrar la perspectiva de género, nunca a excluir a las entidades locales ni a anteponer la antigüedad al mérito."),
  p("igualdad-oportunidades-aragon", "media",
    "¿Qué deben incorporar las entidades locales en todas sus políticas, programas y acciones administrativas según el art. 7.3 de la Ley 7/2018?",
    ["La perspectiva de género, creando la estructura administrativa necesaria y promoviendo el uso integrador y no sexista del lenguaje y de las imágenes",
     "Ninguna obligación específica: la Ley 7/2018 solo vincula a la Administración autonómica, no a las entidades locales",
     "Únicamente la elaboración de estadísticas, sin más obligaciones sustantivas",
     "La creación de un Instituto de la Mujer propio en cada municipio, sea cual sea su tamaño"],
    "El art. 7.3 de la Ley 7/2018 impone a las entidades locales aragonesas (incluida la Diputación Provincial) un mandato transversal, mucho más amplio que la mera elaboración de estadísticas o la réplica de un organismo autonómico en cada municipio."),
  p("igualdad-oportunidades-aragon", "dificil",
    "¿Qué compromiso asume la Comunidad Autónoma de Aragón respecto a la suficiencia financiera de las entidades locales para el cumplimiento de las funciones de igualdad, según el art. 7.2 de la Ley 7/2018?",
    ["Complementará, bajo el principio de cooperación, la suficiencia financiera de las entidades locales, sin perjuicio de que estas consignen en sus presupuestos las dotaciones necesarias",
     "Asumirá el 100% del coste, sin ninguna aportación de las entidades locales",
     "No asume ningún compromiso financiero, la financiación corresponde en exclusiva a cada entidad local",
     "Transferirá la competencia íntegra a las entidades locales, sin ninguna cooperación posterior"],
    "El art. 7.2 de la Ley 7/2018 opta por la cooperación financiera (complementar, no sustituir ni desentenderse), coherente con el principio de autonomía local y de suficiencia financiera que el propio precepto invoca."),
  p("igualdad-oportunidades-aragon", "media",
    "Cita una de las funciones que el art. 7.5 de la Ley 7/2018 atribuye a las entidades locales en su ámbito territorial",
    ["Sensibilizar a la población sobre la igualdad de oportunidades entre mujeres y hombres y sobre las medidas necesarias para erradicar la desigualdad",
     "Legislar en materia de igualdad con el mismo rango que las Cortes de Aragón",
     "Sustituir al Instituto Aragonés de la Mujer en todas sus competencias",
     "Aprobar la Ley de Presupuestos de la Comunidad Autónoma en materia de igualdad"],
    "El art. 7.5 de la Ley 7/2018 atribuye a las entidades locales funciones de sensibilización, atención, formación y elaboración de planes de igualdad propios — funciones de gestión y proximidad, no legislativas ni sustitutivas del Instituto Aragonés de la Mujer."),
];

async function main() {
  console.log("📝 temas (alta del tema canónico)...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "Transparencia, protección de datos e igualdad de oportunidades",
        descripcion: "Transparencia de la actividad pública: publicidad activa y derecho de acceso a la información pública. Protección de datos personales: principios generales. Principios generales de actuación de los poderes públicos aragoneses en materia de igualdad de oportunidades entre mujeres y hombres.",
        contenido: "Combina tres normas de garantía frente a la actuación administrativa: la Ley 19/2013 de transparencia (obligaciones de publicidad activa y derecho de acceso a la información), la Ley Orgánica 3/2018 de protección de datos (principios generales del tratamiento y derechos del afectado), y la Ley 7/2018 aragonesa de igualdad de oportunidades entre mujeres y hombres (distinta de la Ley 4/2007 sobre violencia de género), con especial atención a las funciones que esta última atribuye a las entidades locales.",
        enlaces_boe: [
          { titulo: "Ley 19/2013, de transparencia, acceso a la información pública y buen gobierno", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2013-12887" },
          { titulo: "Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673" },
          { titulo: "Ley 7/2018, de igualdad de oportunidades entre mujeres y hombres en Aragón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-11932" },
        ],
        indice_estudio: [
          { seccion: "transparencia-acceso-informacion", titulo: "Ley 19/2013: publicidad activa y derecho de acceso a la información pública", articulos: "arts. 1, 5, 12-14, 17, 20", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2013-12887#a1" },
          { seccion: "proteccion-datos-principios", titulo: "LO 3/2018: principios generales de la protección de datos personales", articulos: "arts. 1, 4-5, 8-9, 13", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a1" },
          { seccion: "igualdad-oportunidades-aragon", titulo: "Ley 7/2018: principios de actuación de los poderes públicos aragoneses en igualdad", articulos: "arts. 1, 3, 7", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-11932#a1" },
        ],
      },
    ],
    "slug"
  );

  console.log("📇 flashcards + 📝 preguntas...");
  const flashcards = ITEMS.map((it) => ({ tema_slug: TEMA, seccion: it.seccion, anverso: it.pregunta, reverso: it.opciones[0] }));
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(flashcards) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ flashcards: ${flashcards.length}`);

  for (const it of ITEMS) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: it.seccion, enunciado: it.pregunta, explicacion: it.explicacion, dificultad: it.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = it.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
  console.log(`   ✓ preguntas: ${ITEMS.length}`);
  console.log(`✅ ${TEMA} completado.`);
}

await main();
