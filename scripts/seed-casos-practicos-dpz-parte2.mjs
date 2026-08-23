/**
 * Casos prácticos DPZ, parte 2 de 2: Tema 15 (subvenciones), Tema 18
 * (transparencia, protección de datos e igualdad), Tema 19 (administración
 * electrónica) y Tema 20 (prevención de riesgos laborales).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-dpz-parte2.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function crearCaso(temaSlug, { slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: temaSlug, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

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
      body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${titulo} (${preguntas.length} preguntas)`);
}

const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

// ═══════════════════════════════════════════════════════════════════════
// TEMA-24 — DPZ Tema 15 (Las subvenciones)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA24 = {
  slug: "caso-asociacion-cultural-solicita-subvencion",
  titulo: "El caso de la asociación cultural «El Cachirulo Verde»",
  orden: 1,
  supuesto:
    "La asociación cultural «El Cachirulo Verde», de un pequeño municipio zaragozano, quiere solicitar una " +
    "subvención de la Diputación Provincial de Zaragoza para organizar sus fiestas tradicionales. Antes de " +
    "presentar la solicitud, su presidenta consulta la ordenanza reguladora de subvenciones de la Diputación " +
    "y descubre que existen dos vías distintas para conceder ayudas, que deberá justificar el gasto una vez " +
    "recibida la subvención, y que un club deportivo de la localidad fue sancionado el año pasado por no " +
    "justificar una ayuda anterior y debió devolver el dinero con intereses. También le informan de que la " +
    "Diputación puede colaborar con una entidad para que sea esta quien distribuya los fondos entre varias " +
    "asociaciones pequeñas del municipio.",
  preguntas: [
    q("ley-general-subvenciones", "facil",
      "¿Cómo define el art. 2.1 de la Ley 38/2003, General de Subvenciones, la ayuda que pretende solicitar «El Cachirulo Verde»?",
      ["Una disposición dineraria realizada por una Administración, sin contraprestación directa, sujeta al cumplimiento de un objetivo, ejecución de un proyecto o realización de una actividad, y que responde a una finalidad de fomento de interés público o social",
       "Un préstamo que la asociación deberá devolver íntegramente en un plazo determinado",
       "Un contrato administrativo de prestación de servicios entre la Diputación y la asociación",
       "Una donación de carácter puramente privado, ajena al Derecho Administrativo"],
      "El art. 2.1 LGS fija los rasgos definitorios de la subvención: entrega dineraria sin contraprestación directa, vinculada a un fin de fomento, distinta tanto de un préstamo (con obligación de devolución) como de un contrato (con contraprestación) o de una donación puramente privada."),
    q("ley-general-subvenciones", "media",
      "La presidenta descubre que existen dos vías distintas de concesión. ¿Cuál es el procedimiento ordinario según el art. 22.1 LGS, frente a la concesión directa (excepcional)?",
      ["El de concurrencia competitiva, mediante la comparación de las solicitudes presentadas conforme a los criterios de valoración fijados en las bases reguladoras, para establecer una prelación entre ellas",
       "La concesión directa a cualquier solicitante que presente su petición en plazo, sin comparación con otras solicitudes",
       "Un sorteo público entre todas las asociaciones inscritas en el registro municipal",
       "La subasta al mejor postor entre las entidades solicitantes"],
      "El art. 22.1 LGS consagra la concurrencia competitiva como procedimiento ordinario, precisamente para comparar y ordenar solicitudes según criterios objetivos, reservando la concesión directa a los supuestos tasados del art. 22.2 LGS."),
    q("ley-general-subvenciones", "media",
      "¿En qué norma deberá fijarse el importe, los requisitos y el procedimiento aplicable a la subvención que solicita la asociación, según el art. 17 LGS?",
      ["En las bases reguladoras de la subvención, aprobadas con carácter previo a su convocatoria (en el caso de las entidades locales, mediante ordenanza)",
       "Directamente en cada solicitud individual, sin necesidad de normativa previa",
       "Exclusivamente en el presupuesto anual de la Diputación, sin ordenanza específica",
       "En un simple decreto de la Presidencia, sin necesidad de aprobación por el Pleno"],
      "El art. 17 LGS exige que las bases reguladoras se aprueben antes de convocar la subvención, y para las entidades locales se instrumentan mediante ordenanza — no basta un decreto ni fijar las condiciones ad hoc en cada solicitud."),
    q("ley-general-subvenciones", "media",
      "Una vez concedida la subvención, ¿qué obligación esencial tendrá «El Cachirulo Verde» respecto a los fondos recibidos, según el art. 14.1.b LGS?",
      ["Justificar ante el órgano concedente el cumplimiento de los requisitos y condiciones, así como la realización de la actividad y el cumplimiento de la finalidad que determinaron la concesión",
       "Ninguna obligación posterior, la subvención se entiende justificada por el mero hecho de su concesión",
       "Devolver automáticamente la mitad del importe recibido, con independencia de cómo se haya gastado",
       "Publicar en el Boletín Oficial del Estado el detalle completo de todos sus gastos"],
      "El art. 14.1.b LGS convierte la justificación en una obligación central del beneficiario: no basta con recibir la subvención, hay que acreditar ante el órgano concedente que se cumplió la finalidad para la que se concedió."),
    q("ley-general-subvenciones", "dificil",
      "El club deportivo no justificó una ayuda anterior y tuvo que devolver el dinero. ¿Qué instituto de la LGS se aplicó, y con qué consecuencia añadida según el art. 37 y el art. 38 LGS?",
      ["El reintegro de las cantidades percibidas, junto con el interés de demora correspondiente, desde el momento del pago de la subvención hasta la fecha de reconocimiento de la obligación de reintegro",
       "Una sanción penal por delito de malversación de caudales públicos",
       "La disolución forzosa de la entidad beneficiaria, como consecuencia automática de cualquier incumplimiento",
       "La pérdida automática y permanente de la personalidad jurídica de la entidad"],
      "El art. 37 LGS regula las causas de reintegro (entre ellas, el incumplimiento de la obligación de justificación) y el art. 38 LGS añade el interés de demora como consecuencia económica adicional — sin que ello implique, por sí solo, responsabilidad penal ni disolución de la entidad."),
    q("ley-general-subvenciones", "media",
      "¿Puede la Diputación colaborar con otra entidad para que esta distribuya los fondos entre varias asociaciones pequeñas del municipio, y cómo se llama esa figura según el art. 12 LGS?",
      ["Sí, es la entidad colaboradora: actúa en nombre y por cuenta del órgano concedente para entregar y distribuir los fondos, sin que estos lleguen a integrar su propio patrimonio",
       "No, la Ley General de Subvenciones prohíbe cualquier intermediación en el pago de subvenciones",
       "Sí, pero solo si la entidad intermediaria es otra Administración Pública, nunca una entidad privada",
       "Sí, y en ese caso los fondos pasan a integrar el patrimonio propio de la entidad intermediaria"],
      "El art. 12 LGS define a la entidad colaboradora precisamente por actuar en nombre del concedente, sin apropiarse de los fondos que gestiona ni exigirse que sea necesariamente otra Administración."),
    q("ley-general-subvenciones", "facil",
      "¿Qué principios deben regir la gestión de la subvención que reciba la asociación, según el art. 8.3 LGS?",
      ["Publicidad, transparencia, concurrencia, objetividad, igualdad, no discriminación, eficacia y eficiencia",
       "Confidencialidad absoluta y discrecionalidad total del órgano concedente",
       "Exclusivamente el principio de antigüedad de la entidad solicitante",
       "El principio de reciprocidad política con el gobierno municipal de turno"],
      "El art. 8.3 LGS enumera estos principios como marco general de toda gestión subvencional, incompatibles con la discrecionalidad absoluta o con criterios ajenos al mérito y la igualdad de oportunidades entre solicitantes."),
    q("subvenciones-aragon", "media",
      "Si la subvención procede de la Diputación de Zaragoza como entidad local aragonesa, ¿qué texto autonómico complementa a la LGS estatal en esta materia?",
      ["El Decreto Legislativo 2/2023, del Gobierno de Aragón, por el que se aprueba el texto refundido de la Ley de Subvenciones de Aragón",
       "El Estatuto de Autonomía de Aragón, que agota por sí solo toda la regulación subvencional autonómica",
       "Ninguno: las Comunidades Autónomas carecen de competencia para regular esta materia",
       "El Reglamento de la Ley 38/2003, que sustituye a cualquier norma autonómica"],
      "El Decreto Legislativo 2/2023 (texto refundido de la Ley de Subvenciones de Aragón) es la norma autonómica que complementa a la LGS estatal (que tiene carácter básico) para las Administraciones aragonesas, incluida la Diputación de Zaragoza."),
    q("subvenciones-aragon", "media",
      "¿Qué papel cumple, según ese texto refundido aragonés, el registro de subvenciones al que debe remitir sus datos la Diputación?",
      ["Servir de instrumento de publicidad y control de las subvenciones concedidas por las Administraciones Públicas aragonesas, favoreciendo la transparencia",
       "Sustituir a la ordenanza reguladora, permitiendo conceder subvenciones sin bases previas",
       "Servir exclusivamente como archivo histórico sin ninguna finalidad de control",
       "Autorizar, con carácter previo y vinculante, cada subvención individual antes de su concesión"],
      "El registro de subvenciones aragonés cumple una función de publicidad y control transversal (no sustituye a las bases reguladoras ni actúa como autorización previa de cada expediente)."),
    q("ley-general-subvenciones", "dificil",
      "Si «El Cachirulo Verde» resultara beneficiaria, ¿qué requisito general debe cumplir para poder obtener la condición de beneficiaria, según el art. 13.2 LGS?",
      ["No hallarse incursa en las circunstancias que enumera el art. 13.2 LGS (entre otras, no estar al corriente de sus obligaciones tributarias o con la Seguridad Social, ni haber sido objeto de sanción que impida obtener subvenciones)",
       "Tener una antigüedad mínima de veinte años como entidad legalmente constituida",
       "Contar con un capital social mínimo equivalente al importe de la subvención solicitada",
       "Haber recibido previamente al menos una subvención de la misma Administración concedente"],
      "El art. 13.2 LGS enumera causas de prohibición (incumplimientos tributarios, con la Seguridad Social, sanciones previas...) que impiden obtener la condición de beneficiario, sin exigir antigüedad mínima, capital social ni experiencia previa como subvencionada."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TEMA-26 — DPZ Tema 18 (Transparencia, protección de datos e igualdad)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA26 = {
  slug: "caso-solicitud-informacion-y-fuga-de-datos",
  titulo: "El caso de la solicitud de información y la fuga de datos",
  orden: 1,
  supuesto:
    "Un periodista solicita a la Diputación de Zaragoza el listado de subvenciones concedidas el último año, " +
    "sin necesidad de justificar para qué las quiere. Días después, un funcionario del área de personal envía " +
    "por error un correo con datos de salud de varios empleados a una lista de distribución externa a la " +
    "Diputación, entre ellos un dato que revela la afiliación sindical de un trabajador. El Delegado de " +
    "Protección de Datos debe valorar si procede notificar la brecha a la Agencia Española de Protección de " +
    "Datos. Mientras tanto, la Diputación revisa su Plan de Igualdad, que exige incorporar la perspectiva de " +
    "género a todas sus políticas, no solo a las específicas de igualdad, y publica de oficio en su portal el " +
    "presupuesto anual, sin que nadie lo haya solicitado.",
  preguntas: [
    q("transparencia-acceso-informacion", "facil",
      "¿Necesita el periodista motivar su solicitud del listado de subvenciones, según el art. 17.3 de la Ley 19/2013, de Transparencia?",
      ["No: el solicitante no está obligado a motivar su solicitud de acceso a la información pública",
       "Sí, siempre debe acreditar un interés legítimo directo en la información solicitada",
       "Solo si la información afecta a más de diez expedientes distintos",
       "Sí, salvo que sea funcionario de la propia Diputación"],
      "El art. 17.3 de la Ley 19/2013 dispensa expresamente al solicitante de motivar su petición, a diferencia de otros procedimientos administrativos que sí exigen acreditar interés."),
    q("transparencia-acceso-informacion", "media",
      "La Diputación publica de oficio su presupuesto anual sin que nadie lo pida. ¿Qué obligación de la Ley 19/2013 está cumpliendo?",
      ["La publicidad activa, que obliga a los sujetos incluidos en el ámbito de la ley a publicar de forma periódica y actualizada la información cuyo conocimiento sea relevante, sin esperar solicitud",
       "El derecho de acceso a la información pública, que solo opera a instancia de parte",
       "Una obligación exclusivamente presupuestaria ajena a la Ley de Transparencia",
       "Un trámite de información pública propio del procedimiento de elaboración de disposiciones generales"],
      "La publicidad activa (Título I de la Ley 19/2013) es la vertiente proactiva de la transparencia: obliga a publicar sin esperar solicitud, a diferencia del derecho de acceso, que sí requiere petición del interesado, como la del periodista."),
    q("transparencia-acceso-informacion", "media",
      "Si parte de la información solicitada por el periodista contuviera datos que pudieran dañar la reputación de terceros sin causa justificada, ¿podría la Diputación denegarla, según el art. 14 de la Ley 19/2013?",
      ["Sí: el derecho de acceso puede limitarse cuando acceder a la información suponga un perjuicio para alguno de los bienes o intereses tasados en el art. 14 (entre ellos, la garantía de la confidencialidad o el secreto requerido en determinados procesos de toma de decisión), aplicando un test de proporcionalidad caso por caso",
       "No, el derecho de acceso a la información pública es absoluto y no admite límite alguno",
       "Sí, pero solo si el propio periodista solicitante lo consiente expresamente",
       "No, los límites del art. 14 solo son aplicables a solicitudes de empresas, nunca de particulares"],
      "El art. 14 de la Ley 19/2013 no es una lista de exclusiones automáticas: exige ponderar, caso por caso, si el acceso a esa información concreta perjudica alguno de los bienes protegidos — no existe un derecho absoluto ni una denegación automática."),
    q("proteccion-datos-principios", "dificil",
      "El correo erróneo reveló, entre otros datos, la afiliación sindical de un trabajador. ¿Qué régimen especial les da el RGPD/LOPDGDD a este tipo de datos frente a los datos personales comunes?",
      ["Son categorías especiales de datos (junto a los de ideología, religión, orientación sexual, salud u origen racial), sujetas a garantías reforzadas frente al resto de datos personales",
       "Reciben exactamente el mismo tratamiento que cualquier otro dato personal, sin especialidad alguna",
       "Solo se consideran datos sensibles si el trabajador lo solicita expresamente por escrito",
       "Dejan de tener protección alguna una vez que el trabajador ha cesado en su afiliación sindical"],
      "Las categorías especiales de datos (entre ellas la afiliación sindical) tienen un régimen de protección reforzado precisamente por el mayor riesgo de discriminación que su revelación puede generar, no un tratamiento equivalente al de cualquier otro dato."),
    q("proteccion-datos-principios", "dificil",
      "¿Debe el Delegado de Protección de Datos valorar notificar esta brecha a la Agencia Española de Protección de Datos?",
      ["Sí: ante una violación de seguridad de datos personales que suponga un riesgo para los derechos y libertades de los afectados (como en este caso, con datos de salud y afiliación sindical expuestos), debe notificarse a la autoridad de control sin dilación indebida",
       "No, las brechas de seguridad solo deben notificarse si afectan a más de cien personas",
       "No, la notificación de brechas solo es exigible a empresas privadas, nunca a Administraciones Públicas",
       "Solo sería necesario si el propio trabajador afectado lo exige expresamente por escrito"],
      "El envío erróneo de datos de salud y afiliación sindical a una lista externa es exactamente el tipo de incidente con riesgo para los derechos de los afectados que obliga a valorar y, en su caso, tramitar la notificación a la autoridad de control, sin depender de un umbral numérico ni de la petición del afectado."),
    q("proteccion-datos-principios", "media",
      "¿A quién alcanza el deber de confidencialidad sobre estos datos, más allá del funcionario que cometió el error?",
      ["A responsables, encargados y a cualquier persona que intervenga en el tratamiento de los datos, obligación que se mantiene incluso una vez finalizada la relación con el responsable",
       "Únicamente al funcionario que cometió el error, siendo el resto del personal ajeno a cualquier deber de reserva",
       "Solo a los cargos directivos de la Diputación, no al personal técnico",
       "El deber de confidencialidad desaparece automáticamente al cesar el contrato o relación estatutaria"],
      "El deber de confidencialidad tiene un alcance subjetivo amplio (todo aquel que intervenga en el tratamiento) y una vigencia que se prolonga más allá de la relación con el responsable, precisamente para evitar fugas como esta."),
    q("proteccion-datos-principios", "facil",
      "¿Qué principio general de protección de datos debería haber evitado enviar esos datos a una lista de distribución externa a la Diputación?",
      ["El principio de minimización de datos, que exige que el tratamiento se limite a lo estrictamente necesario en relación con los fines para los que se tratan",
       "El principio de máxima difusión, que favorece compartir cuanta más información mejor",
       "El principio de gratuidad, que solo regula el coste del tratamiento de datos",
       "El principio de territorialidad, que solo regula dónde se almacenan físicamente los datos"],
      "El principio de minimización exige limitar el tratamiento (y desde luego, la difusión) de datos personales a lo estrictamente necesario, incompatible con enviar datos de salud a una lista externa sin relación con la finalidad del tratamiento."),
    q("igualdad-oportunidades-aragon", "media",
      "El Plan de Igualdad de la Diputación exige incorporar la perspectiva de género a todas sus políticas, no solo a las específicas de igualdad. ¿Cómo se llama este principio según la Ley 7/2018, de Igualdad de Oportunidades entre Mujeres y Hombres en Aragón?",
      ["Transversalidad de género (mainstreaming), principio de actuación de los poderes públicos aragoneses en el diseño, ejecución y evaluación de todas sus políticas",
       "Discriminación positiva, aplicable únicamente a los procesos selectivos de personal",
       "Paridad, que solo obliga a la composición de los órganos colegiados",
       "Acción exclusiva, que reserva ciertas políticas en exclusiva a un único sexo"],
      "La transversalidad de género es precisamente el principio que impide reducir la igualdad a políticas específicas, exigiendo su incorporación al conjunto de la actuación administrativa, distinto de la paridad (composición de órganos) o la discriminación positiva (medidas concretas de acción positiva)."),
    q("igualdad-oportunidades-aragon", "media",
      "¿Qué tipo de instrumento es el Plan de Igualdad que revisa la Diputación, dentro del marco de la Ley 7/2018?",
      ["Un instrumento de planificación mediante el que los poderes públicos aragoneses concretan los objetivos y medidas concretas para hacer efectiva la igualdad entre mujeres y hombres en su ámbito de actuación",
       "Un simple documento declarativo sin ningún efecto vinculante para la propia Diputación",
       "Una norma con rango de ley que solo pueden aprobar las Cortes de Aragón",
       "Un contrato laboral colectivo negociado exclusivamente con los sindicatos"],
      "El Plan de Igualdad es un instrumento de planificación administrativa (no una ley ni un mero documento sin efectos), que concreta objetivos y medidas para el propio ámbito de actuación de la entidad que lo aprueba."),
    q("transparencia-acceso-informacion", "dificil",
      "Si la Diputación denegara la solicitud del periodista, ¿qué garantía específica prevé el art. 24 de la Ley 19/2013 frente a esa denegación, antes de acudir a la vía contencioso-administrativa?",
      ["Una reclamación potestativa ante el Consejo de Transparencia y Buen Gobierno (u organismo autonómico equivalente), previa a la vía contencioso-administrativa",
       "Un recurso de alzada ante el Ministerio de Hacienda, de carácter obligatorio",
       "Una denuncia penal directa ante el Juzgado de Instrucción competente",
       "No existe ninguna vía de reclamación específica, solo cabría el recurso contencioso-administrativo ordinario"],
      "El art. 24 de la Ley 19/2013 crea esta reclamación especializada y potestativa (sustitutiva de los recursos administrativos ordinarios) precisamente para dar una respuesta más ágil en materia de transparencia, sin cerrar el paso posterior a la vía contencioso-administrativa."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TEMA-27 — DPZ Tema 19 (Administración electrónica)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA27 = {
  slug: "caso-expediente-electronico-copia-autentica",
  titulo: "El caso del expediente electrónico incompleto",
  orden: 1,
  supuesto:
    "Un vecino presenta en el registro electrónico de la Diputación una instancia junto con una fotografía " +
    "escaneada de un documento en papel que ya no conserva en original. El funcionario encargado de tramitar " +
    "el expediente debe incorporar ambos documentos al expediente electrónico correspondiente, generar una " +
    "copia auténtica de un tercer documento que obra en un archivo distinto, y finalmente elevar el expediente " +
    "completo, ya cerrado, a la persona que debe resolver.",
  preguntas: [
    q("administracion-electronica", "media",
      "El vecino ha escaneado un documento en papel del que no conserva original. ¿Cómo se llama, según el art. 27.1 de la Ley 39/2015, el proceso que ha seguido?",
      ["Digitalización: proceso tecnológico que permite convertir un documento en soporte papel u otro no electrónico en un fichero electrónico que contiene la imagen codificada, fiel e íntegra del documento",
       "Compulsa, un trámite reservado en exclusiva al personal funcionario habilitado",
       "Certificación, que exige siempre la firma electrónica cualificada del propio interesado",
       "Notificación, al tratarse de una comunicación dirigida a la Administración"],
      "El art. 27.1 LPACAP define la digitalización como el proceso técnico que traslada un documento en papel a formato electrónico garantizando fidelidad e integridad de la imagen, distinto de trámites como la compulsa o la certificación."),
    q("administracion-electronica", "facil",
      "¿Qué requisitos debe reunir el documento electrónico administrativo que genere el funcionario al tramitar la instancia, según el art. 26.2 de la Ley 39/2015?",
      ["Contener información de cualquier naturaleza archivada en un soporte electrónico según un formato determinado y susceptible de identificación y tratamiento diferenciado, disponer de los metadatos que permitan su identificación y contexto, e incorporar una referencia temporal y la firma electrónica que proceda",
       "Estar redactado necesariamente en formato PDF/A, sin admitir ningún otro formato",
       "Llevar la firma manuscrita digitalizada del interesado, en todo caso",
       "Contar con el visto bueno previo de la Secretaría General, para cualquier documento del expediente"],
      "El art. 26.2 LPACAP fija estos elementos (contenido identificable, metadatos, referencia temporal, firma electrónica) sin exigir un formato único como PDF/A ni firma manuscrita digitalizada."),
    q("administracion-electronica", "media",
      "Para el tercer documento, que obra en un archivo distinto, el funcionario debe generar una copia auténtica. ¿Qué garantiza esa copia según el art. 27.3 de la Ley 39/2015?",
      ["La identidad del órgano que la expidió y su contenido, con la misma validez y eficacia que el documento original",
       "Únicamente que el documento existe, sin garantizar la identidad de su contenido",
       "Solo tiene valor probatorio si además la firma un notario público",
       "Una validez inferior a la del documento original, admisible solo a efectos meramente informativos"],
      "El art. 27.3 LPACAP equipara la copia auténtica al original en validez y eficacia, siempre que garantice identidad del órgano expedidor y del contenido, sin exigir intervención notarial adicional."),
    q("administracion-electronica", "dificil",
      "¿Qué formato deberá tener el expediente electrónico ya cerrado que se eleva a quien debe resolver, según el art. 70.2 de la Ley 39/2015?",
      ["El formato de expediente electrónico, formado por la agregación ordenada de documentos, pruebas, dictámenes, informes, acuerdos, notificaciones y demás diligencias, junto con un índice numerado de todos los documentos que contiene",
       "Un simple correo electrónico con los documentos adjuntos, sin necesidad de índice",
       "Un documento único en formato Word, editable por cualquier funcionario con acceso",
       "Una carpeta compartida en la nube sin ningún orden ni índice específico"],
      "El art. 70.2 LPACAP exige agregación ordenada más índice numerado, un formato estructurado, no un correo con adjuntos ni una carpeta sin ordenar, garantizando la integridad y foliado del expediente."),
    q("administracion-electronica", "media",
      "¿Qué efecto tiene ese índice electrónico del expediente sobre su foliado, según el art. 70.2 de la Ley 39/2015?",
      ["El índice deberá garantizar la integridad del expediente electrónico y permitir su recuperación, generándose de manera automatizada",
       "El índice es un trámite meramente decorativo, sin ninguna función de garantía",
       "El índice solo es exigible si el expediente supera las cien páginas de extensión",
       "El índice debe elaborarlo siempre el propio interesado, no la Administración"],
      "El índice electrónico cumple una función de garantía de integridad y recuperabilidad del expediente, generándose de forma automatizada por el sistema, no como un mero adorno documental ni una carga del interesado."),
    q("administracion-electronica", "facil",
      "¿Puede el vecino elegir presentar su instancia en el registro electrónico, o está obligado a acudir presencialmente, según el art. 16.1 de la Ley 39/2015?",
      ["Las personas físicas pueden elegir en todo momento si se comunican con las Administraciones Públicas para el ejercicio de sus derechos y obligaciones a través de medios electrónicos o no, salvo que estén obligadas a relacionarse electrónicamente",
       "Todas las personas, físicas o jurídicas, están obligadas a relacionarse electrónicamente con la Administración sin excepción",
       "El registro electrónico solo puede usarse para consultar el estado de expedientes ya iniciados, no para presentar nuevas instancias",
       "La elección del canal la determina exclusivamente el funcionario que atiende el expediente"],
      "El art. 16.1 LPACAP reconoce a las personas físicas libertad de elección de canal (salvo obligación legal de relacionarse electrónicamente, prevista para determinados colectivos), no una obligación universal ni una decisión del funcionario."),
    q("administracion-electronica", "media",
      "Si el funcionario detecta que el escaneado del vecino tiene una calidad deficiente que impide verificar su contenido, ¿qué puede exigirle la Administración según el art. 28.3 de la Ley 39/2015 (referido a documentos aportados por los interesados)?",
      ["La Administración podrá solicitar del correspondiente archivo el cotejo del contenido de las copias aportadas por el interesado, o bien requerir la exhibición del documento o de la información original",
       "Debe rechazar automáticamente la instancia sin posibilidad de subsanación",
       "Debe iniciar de oficio un procedimiento sancionador contra el vecino",
       "Debe dar por válido el documento sin más comprobación, al tratarse de una copia digitalizada"],
      "El art. 28.3 LPACAP permite verificar la autenticidad mediante cotejo con el archivo de origen o exhibición del original, en lugar de un rechazo automático o una sanción, que no proceden por la mera deficiencia técnica de un escaneado."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TEMA-25 — DPZ Tema 20 (Prevención de Riesgos Laborales)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA25 = {
  slug: "caso-trabajador-y-riesgo-en-brigada-municipal",
  titulo: "El caso del trabajador de la brigada municipal",
  orden: 1,
  supuesto:
    "Jesús Longares trabaja en la brigada de obras de un municipio de la provincia de Zaragoza. Un día, al " +
    "llegar a la nave donde se guarda maquinaria, observa que una de las máquinas tiene un cable pelado que " +
    "podría provocar una descarga eléctrica grave de forma inminente, y decide no utilizarla e informar a su " +
    "superior. Semanas antes, el servicio de prevención de la entidad había evaluado los riesgos del puesto de " +
    "Jesús y le había entregado equipos de protección individual. La entidad, además, tiene contratado a un " +
    "servicio de prevención ajeno para las especialidades que no puede cubrir con medios propios, y organiza " +
    "formación periódica para toda la plantilla de la brigada.",
  preguntas: [
    q("prevencion-riesgos-laborales", "media",
      "El cable pelado supone, según el art. 4.4 de la Ley 31/1995, un riesgo laboral que puede materializarse de forma inmediata. ¿Cómo se califica jurídicamente esta situación?",
      ["Riesgo laboral grave e inminente: aquel que, con probabilidad racional, puede materializarse en un futuro inmediato y suponer un daño grave para la salud del trabajador",
       "Riesgo laboral leve, al tratarse de un supuesto de baja probabilidad estadística",
       "Un simple incidente sin relevancia jurídica en materia preventiva",
       "Una infracción exclusivamente de índole administrativa sin relación con el concepto de riesgo grave e inminente"],
      "El art. 4.4 LPRL define exactamente este supuesto (probabilidad racional + materialización inmediata + daño grave), aplicable al cable pelado que observa Jesús, no una simple incidencia menor."),
    q("prevencion-riesgos-laborales", "dificil",
      "Ante ese riesgo grave e inminente, ¿qué derecho tiene Jesús según el art. 21 de la Ley 31/1995, además de informar a su superior?",
      ["El derecho a interrumpir su actividad y abandonar, si es necesario, el lugar de trabajo, sin que ello pueda acarrearle perjuicio alguno, salvo que actuara de mala fe o con negligencia grave",
       "Ningún derecho especial: debe seguir utilizando la máquina hasta recibir una orden expresa en sentido contrario",
       "Solo puede interrumpir su actividad si cuenta con autorización previa y expresa de la Inspección de Trabajo",
       "El derecho a exigir el cierre definitivo de la nave, con independencia de que el riesgo se corrija"],
      "El art. 21 LPRL reconoce al trabajador la facultad de interrumpir su actividad ante riesgo grave e inminente sin necesidad de autorización previa de la Inspección, protegiéndole frente a represalias salvo mala fe o negligencia grave, sin que ello implique automáticamente el cierre de toda la instalación."),
    q("prevencion-riesgos-laborales", "media",
      "El servicio de prevención había evaluado antes los riesgos del puesto de Jesús. ¿Qué obligación general del empresario (aquí, la entidad local) recoge el art. 16 de la Ley 31/1995?",
      ["Realizar una evaluación inicial de los riesgos para la seguridad y salud de los trabajadores, teniendo en cuenta la naturaleza de la actividad y las características de los puestos de trabajo existentes",
       "La evaluación de riesgos es un trámite meramente potestativo, que el empresario puede omitir libremente",
       "Solo debe evaluarse el riesgo una única vez, al inicio de la actividad de la entidad, sin actualización posterior",
       "La evaluación de riesgos corresponde en exclusiva al propio trabajador, no al empresario"],
      "El art. 16 LPRL configura la evaluación de riesgos como una obligación empresarial, no potestativa, sujeta además a actualización cuando cambien las condiciones de trabajo, no como un trámite único e inamovible."),
    q("prevencion-riesgos-laborales", "media",
      "¿Qué principio de la acción preventiva, de los enumerados en el art. 15.1 de la Ley 31/1995, explica que a Jesús se le entregaran equipos de protección individual solo tras evaluar el riesgo?",
      ["Los principios de la acción preventiva se aplican de forma jerárquica: evitar los riesgos, evaluar los que no se puedan evitar, combatirlos en su origen, y adoptar medidas de protección individual solo en último término, cuando las anteriores no basten",
       "El principio de igualdad de trato, que exige repartir el mismo equipo a toda la plantilla sin distinción de puesto",
       "El principio de economía procesal, ajeno al ámbito de la prevención de riesgos laborales",
       "El principio de jerarquía normativa, propio de las fuentes del Derecho, no de la prevención de riesgos"],
      "El art. 15.1 LPRL establece una jerarquía de medidas preventivas en la que la protección individual (como el equipo entregado a Jesús) es el último recurso, tras haber evitado, evaluado y combatido el riesgo en su origen — no un principio de igualdad de trato ni ajeno a la materia."),
    q("prevencion-riesgos-laborales", "media",
      "La entidad tiene contratado un servicio de prevención ajeno para las especialidades que no cubre con medios propios. ¿Qué modalidad organizativa de la prevención está utilizando, conforme al esquema de la Ley 31/1995?",
      ["Un modelo mixto: combina el servicio de prevención propio para determinadas especialidades con un servicio de prevención ajeno para el resto",
       "La asunción personal de la prevención por el propio empresario, sin ningún servicio especializado",
       "La designación de un único trabajador encargado de toda la actividad preventiva de la entidad, sin apoyo externo",
       "La ausencia total de organización preventiva, al no existir obligación legal de organizarla"],
      "La combinación de servicio propio (para ciertas especialidades) y ajeno (para el resto) es precisamente el modelo mixto que la LPRL permite, frente a la asunción personal por el empresario o la designación de un único trabajador, modalidades pensadas para otros supuestos (empresas muy pequeñas)."),
    q("prevencion-riesgos-laborales", "facil",
      "¿Qué obligación cumple la entidad al organizar formación periódica para toda la plantilla de la brigada, según el art. 19 de la Ley 31/1995?",
      ["Garantizar que cada trabajador reciba una formación teórica y práctica, suficiente y adecuada, en materia preventiva, centrada específicamente en su puesto de trabajo",
       "Una mera cortesía de la entidad, sin respaldo legal alguno",
       "Una obligación que solo alcanza a los trabajadores de nuevo ingreso, no a la plantilla ya consolidada",
       "Una obligación que puede sustituirse libremente por la entrega de un manual escrito, sin necesidad de formación efectiva"],
      "El art. 19 LPRL exige formación específica del puesto y de carácter periódico (no limitada a la incorporación inicial), sin que un manual escrito sin actividad formativa efectiva sea suficiente para cumplirla."),
    q("prevencion-riesgos-laborales", "dificil",
      "¿A quién corresponde, en última instancia, garantizar la seguridad y salud de Jesús en el trabajo, según el art. 14.1 de la Ley 31/1995?",
      ["Al empresario (aquí, la entidad local), que tiene el deber de protección de los trabajadores frente a los riesgos laborales, correlativo al derecho de estos a una protección eficaz",
       "Exclusivamente al propio trabajador, que asume individualmente el riesgo de su puesto",
       "Únicamente al servicio de prevención ajeno contratado, liberando de responsabilidad a la entidad",
       "A la Inspección de Trabajo, como único garante de la seguridad en cada centro de trabajo"],
      "El art. 14.1 LPRL sitúa el deber de protección en el empresario, como correlato del derecho del trabajador; ese deber no se traslada ni al propio trabajador ni se agota en contratar un servicio de prevención ajeno, que colabora pero no sustituye la responsabilidad empresarial."),
  ],
};

for (const caso of [
  { tema: "tema-24", data: CASO_TEMA24 },
  { tema: "tema-26", data: CASO_TEMA26 },
  { tema: "tema-27", data: CASO_TEMA27 },
  { tema: "tema-25", data: CASO_TEMA25 },
]) {
  await crearCaso(caso.tema, caso.data);
}
console.log("✔ Casos prácticos (parte 2 de 2) sembrados: temas 24, 26, 27, 25.");
