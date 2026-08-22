/**
 * Casos prácticos — Tema 9 (Los contratos del sector público, Ley 9/2017:
 * delimitación de los tipos contractuales y competencias/normas
 * específicas de contratación en las Entidades Locales). 2 casos de 10
 * preguntas cada uno:
 *   1. El polideportivo de Zaragoza: tipos de contrato (obras, concesión
 *      de obras, suministro, servicios) y órgano de contratación
 *      competente en un municipio de gran población (arts. 13-17, 25;
 *      Disposición adicional segunda LCSP)
 *   2. El contrato de limpieza de colegios: Juntas de Contratación, Mesa
 *      de contratación y normas específicas de contratación local en un
 *      municipio pequeño (Disposiciones adicionales segunda y tercera
 *      LCSP)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (tipos-contractuales, competencias-entidades-locales,
 * normas-especificas-locales). Misma mecánica que los casos anteriores:
 * preguntas/opciones en las tablas ya existentes, enlazadas vía
 * caso_preguntas con su `orden`. La primera opción de cada pregunta es
 * siempre la correcta (el cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-9.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-9";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: TEMA, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();

    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }

    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${titulo} (${preguntas.length} preguntas)`);
}

// ═══════════════════════════════════════════════════════════════════════
// CASO 1 — El polideportivo de Zaragoza
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-polideportivo-zaragoza-tipos-contractuales",
  titulo: "El polideportivo de Zaragoza: tipos de contrato y órgano competente",
  orden: 1,
  supuesto:
    "El Ayuntamiento de Zaragoza, municipio de gran población conforme al art. 121 de la Ley 7/1985, quiere " +
    "construir un nuevo polideportivo en el barrio de Valdefierro. Se plantea dos fórmulas: que una empresa " +
    "ejecute la obra y además la explote después, cobrando a los usuarios (con el riesgo de que pocos socios se " +
    "apunten), o que otra empresa simplemente construya el edificio conforme al proyecto municipal, cobrando un " +
    "precio cierto. El valor estimado de esta segunda opción asciende a 2,3 millones de euros. En paralelo, el " +
    "Ayuntamiento también necesita adquirir 200 sillas plegables para las gradas y contratar el servicio de " +
    "socorrismo durante el verano.",
  preguntas: [
    q("tipos-contractuales", "facil",
      "Si una empresa simplemente construye el polideportivo según el proyecto municipal, a cambio de un precio cierto que le paga el Ayuntamiento, ¿qué tipo de contrato es?",
      ["Un contrato de obras, pues tiene por objeto la ejecución de una obra conforme al proyecto elaborado por o para la entidad contratante",
       "Un contrato de concesión de obras, porque implica la construcción de un edificio de titularidad pública",
       "Un contrato de suministro, al tratarse de la entrega de un bien inmueble terminado",
       "Un contrato mixto de obras y servicios, en todo caso"],
      "Art. 13.1 LCSP: son contratos de obras aquellos que tienen por objeto la ejecución de una obra, aislada o conjuntamente con la redacción del proyecto."),
    q("tipos-contractuales", "media",
      "Si en cambio una empresa construye el polideportivo y después lo explota cobrando a los usuarios, asumiendo el riesgo de que pocos socios se apunten, ¿qué tipo de contrato es?",
      ["Un contrato de concesión de obras, en el que la contraprestación consiste en el derecho a explotar la obra, con transferencia al concesionario de un riesgo operacional",
       "Un contrato de obras ordinario, exactamente igual que si el Ayuntamiento pagara un precio cierto",
       "Un contrato de servicios, porque lo relevante es la explotación posterior, no la construcción",
       "Un contrato de suministro con opción de compra"],
      "Art. 14.1 LCSP: la concesión de obras es un contrato en el que la contraprestación a favor del concesionario consiste en el derecho a explotar la obra, o en dicho derecho acompañado del de percibir un precio."),
    q("tipos-contractuales", "dificil",
      "Para que exista realmente esa concesión de obras, y no un simple contrato de obras camuflado, ¿qué debe implicar necesariamente el derecho de explotación otorgado a la empresa?",
      ["La transferencia al concesionario de un riesgo operacional en la explotación de las obras, abarcando el riesgo de demanda o el de suministro, o ambos",
       "La obligación de la empresa de aportar toda la financiación inicial de la obra, sin excepción alguna",
       "Que el Ayuntamiento renuncie por completo a cualquier control sobre la explotación posterior",
       "Que la empresa asuma la titularidad definitiva del terreno sobre el que se construye"],
      "Art. 14.4 LCSP: el derecho de explotación deberá implicar la transferencia al concesionario de un riesgo operacional en la explotación de las obras, abarcando el riesgo de demanda o el de suministro, o ambos."),
    q("tipos-contractuales", "facil",
      "La adquisición de las 200 sillas plegables para las gradas, ¿qué tipo de contrato es?",
      ["Un contrato de suministro, pues tiene por objeto la adquisición de bienes muebles",
       "Un contrato de obras, al tratarse de elementos destinados a un edificio de uso público",
       "Un contrato de servicios, por tratarse de un bien de consumo periódico",
       "Un contrato administrativo especial, en todo caso"],
      "Art. 16.1 LCSP: son contratos de suministro los que tienen por objeto la adquisición, el arrendamiento financiero, o el arrendamiento, con o sin opción de compra, de productos o bienes muebles."),
    q("tipos-contractuales", "media",
      "El contrato de socorrismo para el verano, ¿qué tipo de contrato es?",
      ["Un contrato de servicios, pues su objeto es una prestación de hacer consistente en el desarrollo de una actividad distinta de una obra o suministro",
       "Un contrato de suministro, porque implica la puesta a disposición de personal cualificado",
       "Un contrato de concesión de servicios, en todo caso, al tratarse de un servicio de interés público",
       "Un contrato mixto de servicios y suministro"],
      "Art. 17 LCSP: son contratos de servicios aquellos cuyo objeto son prestaciones de hacer consistentes en el desarrollo de una actividad o dirigidas a la obtención de un resultado distinto de una obra o suministro."),
    q("tipos-contractuales", "dificil",
      "Si el Ayuntamiento quisiera contratar externamente el ejercicio de funciones que impliquen autoridad inherente a los poderes públicos —por ejemplo, la propia potestad sancionadora—, ¿podría hacerlo mediante un contrato de servicios?",
      ["No, los servicios que impliquen ejercicio de la autoridad inherente a los poderes públicos no pueden ser objeto de un contrato de servicios",
       "Sí, siempre que se trate de un contrato sujeto a regulación armonizada",
       "Sí, sin ninguna limitación, si así lo decide el órgano de contratación competente",
       "No, pero solo si el valor estimado del contrato supera los 750.000 euros"],
      "Art. 17 LCSP (párrafo segundo): no podrán ser objeto de los contratos de servicios los servicios que impliquen ejercicio de la autoridad inherente a los poderes públicos."),
    q("competencias-entidades-locales", "media",
      "El valor estimado del contrato de construcción del polideportivo asciende a 2,3 millones de euros. En un municipio que no fuera de gran población, ¿a quién correspondería la competencia como órgano de contratación, atendiendo solo a la cuantía?",
      ["Al Alcalde o Presidente de la Entidad Local, siempre que ese valor no supere el 10 % de los recursos ordinarios del presupuesto ni, en cualquier caso, los seis millones de euros",
       "Siempre al Pleno, cualquiera que sea la cuantía del contrato de obras",
       "Siempre a la Junta de Gobierno Local, exista o no en ese municipio",
       "A la Diputación Provincial correspondiente, por superar el millón de euros"],
      "Disposición adicional segunda.1 LCSP: corresponden a los Alcaldes y Presidentes de las Entidades Locales las competencias como órgano de contratación cuando el valor estimado no supere el 10 % de los recursos ordinarios del presupuesto ni, en cualquier caso, los seis millones de euros."),
    q("competencias-entidades-locales", "dificil",
      "Pero Zaragoza es un municipio de gran población conforme al art. 121 de la Ley 7/1985. ¿A qué órgano corresponde entonces la competencia como órgano de contratación para este contrato?",
      ["A la Junta de Gobierno Local, cualquiera que sea el importe del contrato o su duración",
       "Al Alcalde, exactamente en los mismos términos que en cualquier otro municipio",
       "Al Pleno, por tratarse de una cuantía superior a un millón de euros",
       "A una Junta de Contratación constituida específicamente para este contrato"],
      "Disposición adicional segunda.4 y .11 LCSP: en los municipios de gran población del art. 121 de la Ley 7/1985, las competencias del órgano de contratación se ejercerán por la Junta de Gobierno Local, cualquiera que sea el importe del contrato o su duración."),
    q("competencias-entidades-locales", "facil",
      "En los municipios de gran población como Zaragoza, ¿qué órgano conserva en todo caso la competencia para aprobar los pliegos de cláusulas administrativas generales?",
      ["El Pleno",
       "La Junta de Gobierno Local, exactamente igual que para adjudicar los contratos",
       "El Alcalde, con carácter exclusivo",
       "La Mesa de contratación del expediente correspondiente"],
      "Disposición adicional segunda.4 LCSP (in fine): siendo el Pleno el competente para aprobar los pliegos de cláusulas administrativas generales."),
    q("competencias-entidades-locales", "media",
      "Al tratarse de contratos de obras, suministro y servicios celebrados por el Ayuntamiento, una Administración Pública, ¿qué carácter tienen estos contratos?",
      ["Carácter administrativo",
       "Carácter privado, en todo caso, por tratarse de una entidad local",
       "Carácter mixto administrativo-privado, indistintamente",
       "Depende exclusivamente de si superan el umbral de regulación armonizada"],
      "Art. 25.1.a) LCSP: tendrán carácter administrativo los contratos de obra, concesión de obra, concesión de servicios, suministro y servicios, siempre que se celebren por una Administración Pública."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — El contrato de limpieza de colegios
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-limpieza-colegios-mesa-contratacion-normas-locales",
  titulo: "El contrato de limpieza de colegios: Mesa de contratación y normas específicas locales",
  orden: 2,
  supuesto:
    "Un pequeño municipio aragonés de 3.200 habitantes necesita contratar el servicio de limpieza de sus dos " +
    "colegios públicos, con un valor estimado que no supera el 10 % de sus recursos ordinarios. El Ayuntamiento " +
    "decide constituir una Junta de Contratación para gestionar este tipo de contratos de servicios de " +
    "mantenimiento recurrente. Al mismo tiempo, tramita el expediente de un contrato de obras de reforma del " +
    "tejado de la casa consistorial, cuya aprobación del gasto se sustituye por una certificación de existencia " +
    "de crédito. El Secretario municipal emite el preceptivo informe jurídico sobre el expediente de " +
    "contratación, y el Interventor ejerce la función de fiscalización correspondiente. Por otro lado, el " +
    "Ayuntamiento se plantea tramitar anticipadamente un contrato cuya financiación depende de una subvención " +
    "autonómica todavía no concedida.",
  preguntas: [
    q("normas-especificas-locales", "media",
      "El Ayuntamiento constituye una Junta de Contratación para los contratos de servicios de mantenimiento recurrente como la limpieza de los colegios. ¿Es obligatoria la constitución de estas Juntas en las Entidades Locales?",
      ["No, en las Entidades Locales será potestativa la constitución de Juntas de Contratación, que actuarán como órganos de contratación en los supuestos que la Ley determina",
       "Sí, todas las Entidades Locales están obligadas a constituir una Junta de Contratación",
       "Sí, pero únicamente en los municipios de gran población",
       "No, las Juntas de Contratación han sido suprimidas por la Ley 9/2017"],
      "Disposición adicional segunda.5 LCSP: en las Entidades Locales será potestativa la constitución de Juntas de Contratación."),
    q("normas-especificas-locales", "facil",
      "¿A quién corresponde acordar la constitución de la Junta de Contratación y determinar su composición?",
      ["Al Pleno",
       "Al Alcalde, con carácter exclusivo y sin necesidad de acuerdo plenario",
       "Al Secretario de la Corporación, por tratarse de una cuestión de organización interna",
       "A la propia Junta de Contratación, que se autoconstituye"],
      "Disposición adicional segunda.5 LCSP (párrafo segundo): corresponde al Pleno acordar la constitución de las Juntas de Contratación y determinar su composición."),
    q("normas-especificas-locales", "dificil",
      "Cuando actúa la Junta de Contratación en un expediente como el de este municipio, ¿interviene también la Mesa de contratación?",
      ["No, en los casos de actuación de las Juntas de Contratación se prescindirá de la intervención de la Mesa de contratación",
       "Sí, ambos órganos deben intervenir siempre de forma conjunta y simultánea",
       "Sí, pero solo si el valor estimado del contrato supera los 100.000 euros",
       "No, porque las Mesas de contratación han sido sustituidas legalmente por las Juntas de Contratación en todo caso"],
      "Disposición adicional segunda.5 LCSP (in fine): en los casos de actuación de las Juntas de Contratación se prescindirá de la intervención de la Mesa de contratación."),
    q("normas-especificas-locales", "media",
      "Al tratarse de un municipio de menos de 5.000 habitantes, ¿podrían las competencias en materia de contratación ejercerse a través de centrales de contratación o mediante convenio con la Diputación Provincial?",
      ["Sí, en los municipios de población inferior a 5.000 habitantes las competencias en materia de contratación podrán ejercerse por órganos con carácter de centrales de contratación, o mediante convenios que encomienden la gestión a las Diputaciones Provinciales",
       "No, esa posibilidad solo está prevista para los municipios de gran población",
       "Sí, pero únicamente respecto de los contratos de obras, nunca de servicios",
       "No, cada municipio debe gestionar necesariamente sus propios contratos sin ningún tipo de encomienda"],
      "Disposición adicional segunda.6 LCSP: en los municipios de población inferior a 5.000 habitantes las competencias en materia de contratación podrán ser ejercidas por centrales de contratación, o mediante convenio con las Diputaciones Provinciales."),
    q("normas-especificas-locales", "facil",
      "En los contratos de obras de este municipio, como la reforma del tejado consistorial, la aprobación del gasto se sustituye por una certificación de existencia de crédito. ¿Es esto correcto para un municipio de menos de 5.000 habitantes?",
      ["Sí, en los contratos celebrados en municipios de menos de 5.000 habitantes, la aprobación del gasto podrá ser sustituida por una certificación de existencia de crédito expedida por el Secretario Interventor o, en su caso, el Interventor",
       "No, la aprobación del gasto es un trámite que nunca puede sustituirse por ningún otro documento",
       "Sí, pero únicamente en los contratos de suministro, nunca en los de obras",
       "No, esa sustitución solo está prevista para los municipios de gran población"],
      "Disposición adicional tercera.4 LCSP: en los contratos celebrados en municipios de menos de 5.000 habitantes, la aprobación del gasto podrá ser sustituida por una certificación de existencia de crédito."),
    q("normas-especificas-locales", "media",
      "El Secretario municipal emite el preceptivo informe jurídico sobre el expediente de contratación. ¿A quién corresponde, con carácter general en las Entidades Locales, evacuar los informes que la Ley asigna a los servicios jurídicos?",
      ["Al Secretario",
       "Al Interventor, por ser el responsable del control económico-presupuestario",
       "A un letrado externo contratado específicamente para cada expediente",
       "A la Junta de Gobierno Local, como órgano colegiado"],
      "Disposición adicional tercera.8 LCSP: los informes que la Ley asigna a los servicios jurídicos se evacuarán por el Secretario."),
    q("normas-especificas-locales", "facil",
      "El Interventor ejerce la función de fiscalización sobre el expediente de contratación. ¿A quién corresponden los actos de fiscalización en la Entidad Local?",
      ["Al órgano Interventor de la Entidad Local",
       "Al Secretario, conjuntamente con el Alcalde",
       "A la Mesa de contratación, como órgano colegiado del expediente",
       "Al Pleno de la Corporación, en todo caso"],
      "Disposición adicional tercera.3 LCSP: los actos de fiscalización se ejercen por el órgano Interventor de la Entidad Local."),
    q("normas-especificas-locales", "dificil",
      "El Ayuntamiento se plantea tramitar anticipadamente un contrato cuya financiación depende de una subvención autonómica todavía no concedida. ¿Permite esto la normativa específica de contratación local?",
      ["Sí, se podrán tramitar anticipadamente los contratos cuya financiación dependa de una subvención solicitada a otra entidad pública, sometiendo la adjudicación a la condición suspensiva de la efectiva consolidación de los recursos que han de financiar el contrato",
       "No, ningún contrato puede tramitarse mientras no esté garantizada por completo su financiación",
       "Sí, pero solo si la subvención procede de la Unión Europea, nunca de una Comunidad Autónoma",
       "No, la tramitación anticipada está reservada en exclusiva a los contratos de obras"],
      "Disposición adicional tercera.2 LCSP: se podrán tramitar anticipadamente los contratos cuya financiación dependa de una subvención solicitada a otra entidad pública, sometiendo la adjudicación a la condición suspensiva de la efectiva consolidación de los recursos."),
    q("competencias-entidades-locales", "media",
      "Con carácter general, ¿qué número mínimo de miembros debe tener la Mesa de contratación de una Entidad Local?",
      ["No inferior a tres, entre los que figurarán el Secretario o el titular del órgano de asesoramiento jurídico y el Interventor",
       "Exactamente cinco miembros, sin excepción alguna",
       "Un único miembro, que actuará también como Secretario",
       "La Ley no establece ningún número mínimo de miembros para la Mesa de contratación"],
      "Disposición adicional segunda.7 LCSP: la Mesa de contratación estará formada, entre otros, por el Secretario o el titular del asesoramiento jurídico y el Interventor, sin que su número total sea inferior a tres."),
    q("competencias-entidades-locales", "dificil",
      "¿Puede el personal eventual del Ayuntamiento formar parte de la Mesa de contratación o emitir informes de valoración de las ofertas?",
      ["No, en ningún caso podrá formar parte de las Mesas de contratación ni emitir informes de valoración de las ofertas el personal eventual",
       "Sí, siempre que el Alcalde lo autorice expresamente para un expediente concreto",
       "Sí, sin ninguna limitación, igual que el resto del personal municipal",
       "No, pero únicamente en los municipios de gran población; en los demás sí está permitido"],
      "Disposición adicional segunda.7 LCSP (in fine): en ningún caso podrá formar parte de las Mesas de contratación ni emitir informes de valoración de las ofertas el personal eventual."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 9 (Los contratos del sector público) sembrados.");
