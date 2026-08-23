/**
 * Completa a 10 preguntas los dos casos de la parte 2 que se quedaron en 7
 * (tema-27 "El caso del expediente electrónico incompleto" y tema-25 "El
 * caso del trabajador de la brigada municipal"), añadiendo 3 preguntas más
 * a cada uno con orden continuado (7, 8, 9).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-dpz-parte2b.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function getCasoId(temaSlug, slug) {
  const res = await fetch(`${URL_BASE}/rest/v1/casos_practicos?tema_slug=eq.${temaSlug}&slug=eq.${slug}&select=id`, { headers: HEADERS });
  if (!res.ok) { console.error(`❌ get caso ${res.status} ${await res.text()}`); process.exit(1); }
  const [row] = await res.json();
  if (!row) { console.error(`❌ no se encontró el caso ${temaSlug}/${slug}`); process.exit(1); }
  return row.id;
}

async function anadirPreguntas(temaSlug, casoId, ordenInicial, preguntas) {
  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: temaSlug, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();

    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }

    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ caso_id: casoId, pregunta_id: pregunta.id, orden: ordenInicial + i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${preguntas.length} preguntas añadidas a ${temaSlug}`);
}

const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

// TEMA-27 — 3 preguntas adicionales
const MAS_TEMA27 = [
  q("administracion-electronica", "media",
    "Si el vecino quisiera firmar electrónicamente su instancia, ¿qué sistemas de firma admite con carácter general el art. 10.1 de la Ley 39/2015 para las personas físicas?",
    ["Sistemas basados en certificados electrónicos cualificados de firma, sistemas de clave concertada u otros sistemas que las Administraciones consideren válidos, en los términos y condiciones que se establezcan",
     "Únicamente el certificado electrónico cualificado, sin admitir ningún otro sistema alternativo",
     "Únicamente la firma manuscrita digitalizada mediante escáner",
     "Ningún sistema de firma electrónica es válido para personas físicas, solo para personas jurídicas"],
    "El art. 10.1 LPACAP admite una pluralidad de sistemas de firma (certificado cualificado, clave concertada, otros que la Administración considere válidos), no restringe la firma electrónica a un único sistema ni la excluye para personas físicas."),
  q("administracion-electronica", "media",
    "¿Qué efectos produce, según el art. 31 de la Ley 39/2015, el momento de presentación de la instancia en el registro electrónico de la Diputación?",
    ["El registro electrónico de cada Administración permite la presentación de documentos todos los días del año durante las veinticuatro horas, y la fecha y hora de presentación se acredita mediante un recibo expedido por el propio registro",
     "El registro electrónico solo admite presentaciones en horario de oficina, igual que el registro presencial",
     "La fecha de presentación es la que decida unilateralmente el funcionario que tramite el expediente",
     "No existe constancia formal del momento de presentación en el registro electrónico"],
    "El art. 31 LPACAP garantiza la disponibilidad del registro electrónico las 24 horas todos los días del año, con un recibo acreditativo automático de fecha y hora, a diferencia del registro presencial sujeto a horario de oficina."),
  q("administracion-electronica", "facil",
    "¿Puede consultar el vecino el estado de tramitación de su expediente por medios electrónicos, según el derecho reconocido en el art. 53.1.a de la Ley 39/2015?",
    ["Sí: los interesados en un procedimiento administrativo tienen derecho a conocer, en cualquier momento, el estado de la tramitación de los procedimientos en los que tengan la condición de interesados",
     "No, ese derecho solo existe si el procedimiento ha finalizado con resolución expresa",
     "Solo puede conocerlo si lo solicita mediante un escrito adicional dirigido a la Secretaría General",
     "No, el estado de tramitación es información interna no accesible a los interesados"],
    "El art. 53.1.a LPACAP reconoce este derecho de información en cualquier momento del procedimiento (no solo al final, ni condicionado a solicitud adicional), como parte del estatuto general del interesado."),
];

// TEMA-25 — 3 preguntas adicionales
const MAS_TEMA25 = [
  q("prevencion-riesgos-laborales", "media",
    "¿Qué derecho fundamental de la relación laboral de Jesús recoge, con carácter general, el art. 14.1 de la Ley 31/1995 antes citado?",
    ["El derecho de los trabajadores a una protección eficaz en materia de seguridad y salud en el trabajo",
     "El derecho exclusivamente económico a un plus salarial por riesgo, sin ninguna vertiente preventiva",
     "El derecho a elegir libremente su turno de trabajo, sin relación con la prevención de riesgos",
     "El derecho a la negociación colectiva, ajeno a la materia de prevención de riesgos laborales"],
    "El art. 14.1 LPRL formula el derecho de los trabajadores en términos de protección eficaz frente a los riesgos, no como una compensación económica ni como un derecho de negociación colectiva."),
  q("prevencion-riesgos-laborales", "media",
    "Si Jesús necesitara información sobre los riesgos de su puesto y las medidas de emergencia previstas, ¿qué obligación empresarial recoge el art. 18.1 de la Ley 31/1995?",
    ["El empresario debe adoptar las medidas adecuadas para que los trabajadores reciban todas las informaciones necesarias en relación con los riesgos para su seguridad y salud, y con las medidas de protección y prevención aplicables",
     "La información sobre riesgos es una gestión que corresponde en exclusiva al comité de empresa, no al empresario",
     "El empresario solo debe informar por escrito una vez al año, con independencia de cualquier cambio en las condiciones de trabajo",
     "No existe obligación legal de informar a los trabajadores sobre los riesgos de su propio puesto"],
    "El art. 18.1 LPRL impone al empresario un deber de información activo y actualizado (no limitado a un informe anual ni delegable en exclusiva en el comité de empresa) sobre los riesgos del puesto concreto de cada trabajador."),
  q("prevencion-riesgos-laborales", "facil",
    "¿Qué órgano de representación específico en materia preventiva podría existir en la entidad local donde trabaja Jesús, según el art. 35 de la Ley 31/1995?",
    ["El Delegado de Prevención, representante de los trabajadores con funciones específicas en materia de prevención de riesgos laborales, designado de entre los representantes del personal",
     "El Comité de Empresa, que asume siempre y en exclusiva estas funciones, sin figura específica adicional",
     "Un sindicato concreto, designado directamente por la entidad empleadora",
     "No existe ninguna figura de representación específica en materia de prevención"],
    "El art. 35 LPRL crea la figura específica del Delegado de Prevención, distinta (aunque vinculada) del Comité de Empresa u órgano de representación general, designado de entre los representantes del personal ya existentes."),
];

const casoId27 = await getCasoId("tema-27", "caso-expediente-electronico-copia-autentica");
await anadirPreguntas("tema-27", casoId27, 7, MAS_TEMA27);

const casoId25 = await getCasoId("tema-25", "caso-trabajador-y-riesgo-en-brigada-municipal");
await anadirPreguntas("tema-25", casoId25, 7, MAS_TEMA25);

console.log("✔ Ambos casos completados a 10 preguntas.");
