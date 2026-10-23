/**
 * Crea tema-382 — Tema 10 de Administrativo DGA (tema 5 del programa de
 * materias específicas): "Revisión de los actos en vía administrativa. Los
 * recursos administrativos: concepto y clases. Los recursos de alzada, de
 * reposición y de revisión. Las reclamaciones económico-administrativas.
 * Las reclamaciones previas a la vía judicial civil y laboral."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 106-126 y preámbulo (apartado
 *   sobre la supresión de las reclamaciones previas en vía civil y laboral,
 *   leído en el texto original en boe.es).
 * - Ley 5/2021, de Organización y Régimen Jurídico del Sector Público
 *   Autonómico de Aragón (BOE-A-2021-12701): arts. 60-69 (fin de la vía
 *   administrativa, revisión de oficio, revocación, recursos y su
 *   sustitución por comisiones).
 * - Ley 58/2003, General Tributaria (BOE-A-2003-23186): arts. 222-224
 *   (reposición tributaria), 226-229, 235-236, 239-241, 243 y 249
 *   (reclamaciones económico-administrativas).
 * - Ley 1/1998, sobre reclamaciones tributarias en la Comunidad Autónoma de
 *   Aragón (BOE-A-1998-5831): arts. 1-20 y 32-36 (Junta de Reclamaciones
 *   Económico-Administrativas de Aragón, solo para tributos propios).
 * - Ley 36/2011, reguladora de la jurisdicción social (BOE-A-2011-15936):
 *   arts. 69-73 (agotamiento de la vía administrativa y reclamación previa
 *   en materia de prestaciones de Seguridad Social).
 * Hecho señalado: el programa oficial sigue citando las "reclamaciones
 * previas a la vía judicial civil y laboral", que la Ley 39/2015 suprimió
 * (preámbulo); el tema explica qué las sustituye y la única reclamación
 * previa que sobrevive (prestaciones de Seguridad Social, art. 71 LRJS).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-382-revision-recursos-reclamaciones.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const L5 = "https://www.boe.es/buscar/act.php?id=BOE-A-2021-12701";
const LGT = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186";
const L1_98 = "https://www.boe.es/buscar/act.php?id=BOE-A-1998-5831";
const LRJS = "https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936";
const S1 = "revision-oficio-lesividad-revocacion";
const S2 = "recursos-concepto-clases-reglas";
const S3 = "recursos-alzada-reposicion";
const S4 = "recurso-extraordinario-revision";
const S5 = "reclamaciones-economico-administrativas";
const S6 = "reclamaciones-previas-civil-laboral";

await sembrarTema({
  tema: {
    slug: "tema-382",
    titulo: "Revisión de oficio, recursos administrativos (alzada, reposición y revisión), reclamaciones económico-administrativas y reclamaciones previas",
    descripcion: "Revisión de oficio de actos y disposiciones nulos, declaración de lesividad, suspensión, revocación y rectificación de errores, con las reglas aragonesas de competencia (Ley 5/2021). Recursos administrativos: concepto, clases, actos recurribles, fin de la vía administrativa, interposición, inadmisión, suspensión, audiencia y resolución; sustitución por comisiones. Recurso de alzada, potestativo de reposición y extraordinario de revisión. Reclamaciones económico-administrativas: Ley General Tributaria y Junta de Reclamaciones Económico-Administrativas de Aragón para los tributos propios. Las reclamaciones previas a la vía civil y laboral: su supresión por la Ley 39/2015 y la reclamación previa en prestaciones de Seguridad Social.",
    contenido: "Cómo puede la propia Administración corregir sus errores (anulando un acto nulo, pidiendo al juez que anule uno favorable o rectificando una errata) y qué recursos tiene la ciudadanía antes de acudir a los tribunales: ante quién se presentan, en qué plazo y qué pasa si no se contesta. Incluye las reclamaciones contra impuestos y tasas, con el órgano aragonés que las resuelve, y aclara qué ha sido de las antiguas reclamaciones previas civiles y laborales.",
    enlaces_boe: [
      { url: L39, titulo: "Ley 39/2015, del Procedimiento Administrativo Común, Título V (BOE-A-2015-10565)" },
      { url: L5, titulo: "Ley 5/2021, de Organización y Régimen Jurídico del Sector Público Autonómico de Aragón (BOE-A-2021-12701)" },
      { url: LGT, titulo: "Ley 58/2003, General Tributaria (BOE-A-2003-23186)" },
      { url: L1_98, titulo: "Ley 1/1998, sobre reclamaciones tributarias en la Comunidad Autónoma de Aragón (BOE-A-1998-5831)" },
      { url: LRJS, titulo: "Ley 36/2011, reguladora de la jurisdicción social (BOE-A-2011-15936)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Revisión de oficio, lesividad, revocación y rectificación", articulos: "arts. 106-111 Ley 39/2015; arts. 61-63 Ley 5/2021", url: `${L39}#a106` },
      { seccion: S2, titulo: "Recursos administrativos: concepto, clases y reglas generales", articulos: "arts. 112-120 Ley 39/2015; arts. 60, 64 y 67-69 Ley 5/2021", url: `${L39}#a112` },
      { seccion: S3, titulo: "Recursos de alzada y potestativo de reposición", articulos: "arts. 121-124 Ley 39/2015", url: `${L39}#a121` },
      { seccion: S4, titulo: "Recurso extraordinario de revisión", articulos: "arts. 125-126 Ley 39/2015; art. 65 Ley 5/2021", url: `${L39}#a125` },
      { seccion: S5, titulo: "Reclamaciones económico-administrativas", articulos: "arts. 222-249 LGT; Ley 1/1998 de Aragón", url: `${L1_98}#a1` },
      { seccion: S6, titulo: "Reclamaciones previas a la vía civil y laboral", articulos: "preámbulo Ley 39/2015; arts. 69-73 Ley 36/2011", url: `${LRJS}#a71` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 10 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Revisión de actos nulos (art. 106.1 Ley 39/2015)", "En cualquier momento, de oficio o a solicitud, previo dictamen favorable del Consejo de Estado u órgano consultivo autonómico, de actos que pusieron fin a la vía administrativa o no se recurrieron en plazo"],
        ["Revisión de disposiciones nulas (art. 106.2)", "En cualquier momento, solo de oficio, previo dictamen favorable del órgano consultivo; subsisten los actos firmes dictados en su aplicación"],
        ["Inadmisión de la solicitud de revisión (art. 106.3)", "Sin dictamen, si no se basa en causa de nulidad del art. 47.1, carece manifiestamente de fundamento o ya se desestimaron otras iguales"],
        ["Plazo de la revisión de oficio (art. 106.5)", "6 meses: si se inició de oficio, caducidad; si a solicitud, puede entenderse desestimada"],
        ["Declaración de lesividad (art. 107)", "Para actos favorables anulables: la Administración los declara lesivos y los impugna ante el contencioso; máximo 4 años desde el acto; audiencia previa; caduca a los 6 meses"],
        ["Revisión de oficio en Aragón (art. 61 Ley 5/2021)", "Actos nulos: el consejero del departamento (o el Gobierno para los suyos), previo dictamen favorable del Consejo Consultivo de Aragón; lesividad por orden del consejero o acuerdo del Gobierno"],
        ["Revocación (art. 109.1 Ley 39/2015)", "De actos de gravamen o desfavorables, mientras no prescriba, si no es dispensa ilegal ni contraria a la igualdad, al interés público o al ordenamiento"],
        ["Revocación en Aragón (art. 62 Ley 5/2021)", "Actos desfavorables nulos: en cualquier momento; anulables: no pasados 4 años desde que se dictaron"],
        ["Rectificación de errores (art. 109.2 Ley 39/2015)", "En cualquier momento, de oficio o a instancia, de errores materiales, de hecho o aritméticos"],
        ["Límites de la revisión (art. 110)", "No cabe cuando por prescripción, tiempo transcurrido u otras circunstancias resulte contraria a la equidad, la buena fe, el derecho de los particulares o las leyes"],
      ],
      preguntas: [
        ["media", "La revisión de oficio de un acto nulo de pleno derecho requiere:", ["Dictamen favorable del Consejo de Estado u órgano consultivo autonómico", "Sentencia judicial previa", "Autorización de las Cortes", "Que lo solicite el interesado en el plazo de un mes"], "Art. 106.1 Ley 39/2015."],
        ["media", "En la Comunidad Autónoma de Aragón, el dictamen previo en la revisión de oficio de actos nulos lo emite:", ["El Consejo Consultivo de Aragón", "El Consejo de Estado", "El Justicia de Aragón", "La Dirección General de Servicios Jurídicos"], "Art. 61.a) Ley 5/2021."],
        ["media", "La declaración de lesividad de un acto favorable anulable no puede adoptarse una vez transcurridos:", ["Cuatro años desde que se dictó el acto", "Seis meses", "Un año", "Diez años"], "Art. 107.2 Ley 39/2015."],
        ["dificil", "Declarado lesivo un acto favorable anulable, la Administración:", ["Debe impugnarlo ante la jurisdicción contencioso-administrativa", "Lo anula ella misma", "Lo revoca directamente", "Lo somete a la Cámara de Cuentas"], "Art. 107.1 Ley 39/2015."],
        ["media", "Un procedimiento de revisión de oficio iniciado de oficio que no se resuelve en seis meses:", ["Caduca", "Se entiende estimado", "Se prorroga automáticamente", "Se convierte en lesividad"], "Art. 106.5 Ley 39/2015."],
        ["facil", "Un error aritmético en un acto puede rectificarse:", ["En cualquier momento, de oficio o a instancia del interesado", "Solo en el plazo de un mes", "Solo mediante recurso", "Solo por sentencia"], "Art. 109.2 Ley 39/2015 y art. 63 Ley 5/2021."],
        ["media", "La revisión de oficio de disposiciones administrativas nulas:", ["Solo puede iniciarse de oficio", "Puede pedirla cualquier persona con plazo de un mes", "La declara siempre el Tribunal Constitucional", "No existe"], "Art. 106.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Recurso administrativo (concepto)", "Medio por el que el interesado pide a la propia Administración que revise un acto suyo que considera inválido, fundándose en motivos de nulidad o anulabilidad"],
        ["Clases de recursos (Ley 39/2015)", "Ordinarios: alzada y potestativo de reposición; extraordinario: revisión"],
        ["Actos recurribles (art. 112.1)", "Resoluciones y actos de trámite cualificados (deciden el fondo, impiden continuar, causan indefensión o perjuicio irreparable)"],
        ["Disposiciones generales (art. 112.3)", "No cabe recurso administrativo contra ellas; el recurso contra un acto basado solo en la nulidad de una disposición puede dirigirse al órgano que la dictó"],
        ["Fin de la vía administrativa en Aragón (art. 60 Ley 5/2021)", "Actos del Presidente, del Gobierno, de sus comisiones delegadas, vicepresidentes y consejeros; resoluciones de alzada; responsabilidad patrimonial; y lo que diga una norma"],
        ["Calificación errónea (art. 115.2)", "El error en la calificación del recurso no impide tramitarlo si se deduce su verdadero carácter"],
        ["Causas de inadmisión (art. 116)", "Órgano incompetente de otra Administración, falta de legitimación, acto no recurrible, extemporaneidad o carencia manifiesta de fundamento"],
        ["Suspensión de la ejecución (art. 117)", "Recurrir no suspende, salvo norma; puede suspenderse por perjuicios de imposible o difícil reparación o causa de nulidad; si no se resuelve la solicitud en 1 mes, se entiende suspendido"],
        ["Audiencia en el recurso (art. 118)", "Si hay hechos o documentos nuevos, 10 a 15 días; no se tienen en cuenta los que pudieron aportarse antes y no se aportaron"],
        ["Resolución del recurso (art. 119)", "Estima, desestima o inadmite; congruente sin agravar la situación del recurrente (prohibición de reformatio in peius)"],
        ["Sustitución de los recursos en Aragón (arts. 67-69 Ley 5/2021)", "Solo por ley, ante comisiones o tribunales no sometidos a instrucciones jerárquicas: presidente, al menos dos vocales y secretario; mandato de dos años"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos actos pone fin a la vía administrativa en la Administración de la Comunidad Autónoma de Aragón?", ["Una orden de una consejera", "La resolución de un director general en materia no delegada", "La resolución de un jefe de servicio", "Un acto de trámite no cualificado"], "Art. 60.1.a) Ley 5/2021."],
        ["media", "Contra un decreto del Gobierno de Aragón de carácter general (reglamento):", ["No cabe recurso en vía administrativa", "Cabe recurso de alzada ante el Presidente", "Cabe recurso potestativo de reposición", "Cabe reclamación ante el Justicia"], "Art. 112.3 Ley 39/2015."],
        ["media", "La interposición de un recurso administrativo, como regla general:", ["No suspende la ejecución del acto impugnado", "Suspende siempre la ejecución", "Suspende la ejecución si el recurrente paga una fianza", "Paraliza el procedimiento principal"], "Art. 117.1 Ley 39/2015."],
        ["dificil", "Si se solicita la suspensión del acto recurrido y el órgano no resuelve sobre ella en un mes desde que entra en el registro:", ["La ejecución se entiende suspendida", "Se entiende denegada", "Se archiva el recurso", "El recurso se entiende estimado"], "Art. 117.3 Ley 39/2015."],
        ["media", "Al resolver un recurso, el órgano no puede:", ["Agravar la situación inicial del recurrente", "Declarar la inadmisión", "Estimarlo parcialmente", "Pronunciarse sobre cuestiones no alegadas, oyendo antes a los interesados"], "Art. 119.3 Ley 39/2015."],
        ["media", "¿Es causa de inadmisión del recurso que el recurrente lo haya calificado mal?", ["No, si se deduce su verdadero carácter", "Sí, siempre", "Sí, si es un recurso de alzada", "Solo en Aragón"], "Art. 115.2 Ley 39/2015."],
        ["dificil", "En Aragón, la sustitución del recurso de alzada por una reclamación ante una comisión independiente debe establecerse:", ["Mediante ley", "Mediante orden del consejero", "Mediante decreto del Gobierno", "Por acuerdo de la propia comisión"], "Art. 67.1 Ley 5/2021."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Recurso de alzada: objeto (art. 121 Ley 39/2015)", "Contra resoluciones y actos de trámite cualificados que no ponen fin a la vía administrativa, ante el superior jerárquico del órgano que los dictó"],
        ["Tribunales de selección (art. 121.1)", "A efectos de la alzada, dependen del órgano al que estén adscritos o, en su defecto, del que nombró a su presidente"],
        ["Dónde se presenta la alzada (art. 121.2)", "Ante el órgano que dictó el acto o ante el competente para resolver; si se presenta ante el primero, debe remitirlo en 10 días con su informe y el expediente"],
        ["Plazo de la alzada (art. 122.1)", "Un mes si el acto es expreso; si no, en cualquier momento desde el día siguiente a producirse el silencio"],
        ["Resolución de la alzada (art. 122.2-3)", "Plazo máximo de 3 meses; después se entiende desestimada (salvo doble silencio); contra ella solo cabe el extraordinario de revisión"],
        ["Alzada en Aragón (art. 64 Ley 5/2021)", "Ante el superior jerárquico, que resuelve; contra los máximos órganos de los organismos públicos, ante el consejero al que estén adscritos"],
        ["Recurso de reposición (art. 123)", "Potestativo, ante el mismo órgano, contra actos que ponen fin a la vía administrativa; alternativa: ir directamente al contencioso"],
        ["Plazo de la reposición (art. 124)", "Un mes si el acto es expreso (si no, en cualquier momento desde el acto presunto); se resuelve en un mes; no cabe reposición contra la reposición"],
        ["Reposición y contencioso (art. 123.2)", "Si se interpone reposición, no cabe contencioso hasta que se resuelva expresamente o se desestime por silencio"],
      ],
      preguntas: [
        ["facil", "El plazo para interponer recurso de alzada contra un acto expreso es de:", ["Un mes", "Dos meses", "Quince días", "Tres meses"], "Art. 122.1 Ley 39/2015."],
        ["media", "El plazo máximo para resolver y notificar el recurso de alzada es de:", ["Tres meses", "Un mes", "Seis meses", "Quince días"], "Art. 122.2 Ley 39/2015."],
        ["media", "El plazo máximo para resolver el recurso potestativo de reposición es de:", ["Un mes", "Tres meses", "Dos meses", "Quince días"], "Art. 124.2 Ley 39/2015."],
        ["media", "Contra la desestimación de un recurso de alzada en Aragón:", ["No cabe reposición; solo el extraordinario de revisión o el contencioso", "Cabe reposición potestativa", "Cabe una segunda alzada ante el Gobierno", "Cabe reclamación ante la Cámara de Cuentas"], "Art. 122.3 Ley 39/2015 y art. 64.3 Ley 5/2021."],
        ["dificil", "Contra los actos de un tribunal calificador de unas oposiciones del Gobierno de Aragón cabe recurso de alzada ante:", ["El órgano al que esté adscrito o, en su defecto, el que nombró a su presidente", "El propio tribunal", "El Justicia de Aragón", "El Tribunal Superior de Justicia directamente"], "Art. 121.1 Ley 39/2015; en la convocatoria de 2025, ante el Director General de la Función Pública."],
        ["media", "Si el recurso de alzada se presenta ante el órgano que dictó el acto, este debe remitirlo al competente en el plazo de:", ["Diez días, con su informe y el expediente", "Un mes", "Tres días", "Quince días"], "Art. 121.2 Ley 39/2015."],
        ["media", "Contra un acto que pone fin a la vía administrativa, el interesado puede:", ["Interponer reposición potestativa o acudir directamente al contencioso-administrativo", "Interponer obligatoriamente reposición", "Interponer alzada", "Solo acudir al Tribunal Constitucional"], "Art. 123.1 Ley 39/2015."],
        ["media", "Si el acto recurrido es presunto (silencio), el recurso de alzada puede interponerse:", ["En cualquier momento a partir del día siguiente a producirse el silencio", "En el plazo de tres meses", "En el plazo de un mes desde el silencio", "Nunca, hay que esperar a la resolución expresa"], "Art. 122.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Recurso extraordinario de revisión (art. 125.1 Ley 39/2015)", "Contra actos firmes en vía administrativa, ante el órgano que los dictó, que también lo resuelve"],
        ["Causas del recurso de revisión (art. 125.1)", "a) error de hecho que resulte de los documentos del expediente; b) documentos esenciales que evidencien el error; c) documentos o testimonios declarados falsos por sentencia firme; d) prevaricación, cohecho u otra conducta punible declarada por sentencia firme"],
        ["Plazos del recurso de revisión (art. 125.2)", "Causa a): cuatro años desde la notificación; demás causas: tres meses desde el conocimiento de los documentos o la firmeza de la sentencia"],
        ["Inadmisión (art. 126.1)", "Sin dictamen del órgano consultivo, si no se funda en las causas legales o se desestimaron en cuanto al fondo otros sustancialmente iguales"],
        ["Contenido de la resolución (art. 126.2)", "Se pronuncia sobre la procedencia del recurso y, en su caso, sobre el fondo de la cuestión"],
        ["Silencio en el recurso de revisión (art. 126.3)", "Pasados tres meses sin resolución, se entiende desestimado y queda expedita la vía contencioso-administrativa"],
        ["Recurso de revisión en Aragón (art. 65 Ley 5/2021)", "Se interpone ante el órgano que dictó el acto, competente también para resolverlo, en las circunstancias de la legislación básica"],
      ],
      preguntas: [
        ["media", "El recurso extraordinario de revisión procede contra:", ["Actos firmes en vía administrativa", "Cualquier acto de trámite", "Disposiciones generales", "Actos no firmes recurribles en alzada"], "Art. 113 y 125.1 Ley 39/2015."],
        ["media", "Si el recurso de revisión se funda en un error de hecho que resulta de los documentos del expediente, el plazo es de:", ["Cuatro años desde la notificación de la resolución", "Tres meses", "Un mes", "Un año"], "Art. 125.2 Ley 39/2015."],
        ["media", "Si se funda en la aparición de documentos esenciales posteriores, el plazo es de:", ["Tres meses desde que se conocieron los documentos", "Cuatro años", "Un mes", "Seis meses"], "Art. 125.2 Ley 39/2015."],
        ["media", "¿Ante qué órgano se interpone el recurso extraordinario de revisión?", ["Ante el órgano que dictó el acto, que también lo resuelve", "Ante el superior jerárquico", "Ante el Consejo Consultivo", "Ante el Tribunal Supremo"], "Art. 125.1 Ley 39/2015 y art. 65.2 Ley 5/2021."],
        ["dificil", "¿Cuál de estas NO es causa del recurso extraordinario de revisión?", ["Una nueva interpretación jurisprudencial de la norma aplicada", "Documentos declarados falsos por sentencia firme que influyeron en la resolución", "Cohecho declarado por sentencia firme", "Error de hecho que resulte de los documentos del expediente"], "Art. 125.1 Ley 39/2015."],
        ["media", "Transcurridos tres meses desde la interposición del recurso de revisión sin resolución:", ["Se entiende desestimado", "Se entiende estimado", "Caduca", "Debe reiterarse"], "Art. 126.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Reclamación económico-administrativa (concepto)", "Vía de revisión específica en materia tributaria ante órganos económico-administrativos con independencia funcional, previa al contencioso"],
        ["Remisión de la Ley 39/2015 (art. 112.4)", "Las reclamaciones económico-administrativas se rigen por su legislación específica"],
        ["Ámbito estatal (art. 226 LGT)", "Aplicación de los tributos del Estado y recargos, sanciones tributarias, incluidas las Administraciones tributarias autonómicas (tributos cedidos)"],
        ["Órganos estatales (art. 228 LGT)", "Tribunal Económico-Administrativo Central, tribunales regionales y locales (TEAR de Aragón) y Sala Especial para la Unificación de Doctrina"],
        ["Recurso de reposición tributario (art. 222 LGT)", "Potestativo y previo a la reclamación; un mes; si se interponen los dos, se tramita el primero y se inadmite el segundo"],
        ["Plazo de la reclamación (art. 235 LGT)", "Un mes desde el día siguiente a la notificación; el escrito se dirige al órgano que dictó el acto, que lo remite al tribunal en un mes"],
        ["Duración (art. 240 LGT)", "Un año desde la interposición; después puede entenderse desestimada, aunque el tribunal debe resolver expresamente"],
        ["Junta de Reclamaciones Económico-Administrativas de Aragón (Ley 1/1998)", "Resuelve en única instancia las reclamaciones contra actos de tributos propios aragoneses e ingresos de Derecho público autonómicos; no los tributos cedidos"],
        ["Composición de la Junta aragonesa (art. 33 Ley 1/1998)", "Presidente (un director general de Hacienda), dos vocales y un secretario, todos con voz y voto; adscrita al departamento de Hacienda"],
        ["Agotamiento previo en Aragón (art. 5.3 Ley 1/1998)", "Los actos sobre tributos propios no agotan la vía administrativa ni son recurribles en el contencioso sin reclamación económico-administrativa previa"],
        ["Fin de la vía económico-administrativa (art. 249 LGT)", "Sus resoluciones son recurribles ante la jurisdicción contencioso-administrativa"],
      ],
      preguntas: [
        ["media", "¿Qué órgano resuelve en Aragón las reclamaciones económico-administrativas contra la liquidación de un impuesto propio aragonés?", ["La Junta de Reclamaciones Económico-Administrativas de la Comunidad Autónoma de Aragón", "El Tribunal Económico-Administrativo Regional de Aragón", "El Tribunal Económico-Administrativo Central", "El Consejo Consultivo de Aragón"], "Arts. 1 y 32 Ley 1/1998."],
        ["dificil", "La reclamación contra un acto de gestión de un tributo cedido por el Estado (por ejemplo, el Impuesto sobre Sucesiones) gestionado por Aragón se rige por:", ["La legislación general tributaria, ante los órganos económico-administrativos del Estado", "La Ley 1/1998 de Aragón", "La Ley 39/2015", "El Reglamento de las Cortes de Aragón"], "Art. 3.a) Ley 1/1998 y art. 226.a) LGT."],
        ["media", "El plazo para interponer una reclamación económico-administrativa es de:", ["Un mes desde el día siguiente a la notificación", "Quince días", "Dos meses", "Tres meses"], "Art. 235.1 LGT y art. 12 Ley 1/1998."],
        ["media", "El recurso de reposición en materia tributaria es:", ["Potestativo y previo a la reclamación económico-administrativa", "Obligatorio", "Posterior a la reclamación", "Incompatible con la reclamación"], "Art. 222 LGT y art. 6 Ley 1/1998."],
        ["media", "La duración máxima del procedimiento económico-administrativo es de:", ["Un año desde la interposición", "Tres meses", "Seis meses", "Dos años"], "Art. 240.1 LGT y art. 18.3 Ley 1/1998."],
        ["media", "¿Cuántos miembros con voz y voto tiene la Junta de Reclamaciones Económico-Administrativas de Aragón?", ["Cuatro: presidente, dos vocales y secretario", "Tres", "Cinco", "Siete"], "Art. 33.1 Ley 1/1998."],
        ["media", "Las resoluciones que ponen fin a la vía económico-administrativa son recurribles ante:", ["La jurisdicción contencioso-administrativa", "La jurisdicción civil", "El Tribunal de Cuentas", "El Defensor del Pueblo"], "Art. 249 LGT."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Supresión de las reclamaciones previas (preámbulo Ley 39/2015)", "La Ley 39/2015 ya no contempla las reclamaciones previas en vía civil y laboral, que quedan suprimidas por su escasa utilidad práctica"],
        ["Situación anterior", "La Ley 30/1992 exigía una reclamación previa ante la Administración antes de demandarla ante los jueces civiles o laborales"],
        ["Vía laboral contra la Administración (art. 69.1 LRJS)", "Para demandar al Estado, CCAA o entidades locales hay que haber agotado la vía administrativa cuando proceda, según la normativa de procedimiento"],
        ["Plazo de demanda laboral (art. 69.2-3 LRJS)", "Dos meses desde que se agota la vía administrativa; en despido y acciones de caducidad, veinte días hábiles"],
        ["Excepción: tutela de derechos fundamentales (art. 70 LRJS)", "No es necesario agotar la vía administrativa para demandar la tutela de derechos fundamentales en materia laboral y sindical (plazo de 20 días)"],
        ["Reclamación previa en Seguridad Social (art. 71 LRJS)", "Sigue siendo necesaria en materia de prestaciones de Seguridad Social, ante la Entidad gestora, en 30 días desde la notificación"],
        ["Contestación a la reclamación previa (art. 71.5-6 LRJS)", "La Entidad debe contestar en 45 días; si no, se entiende denegada; la demanda se presenta en 30 días"],
        ["Efectos de la reclamación previa (art. 73 LRJS)", "Interrumpe los plazos de prescripción y suspende los de caducidad"],
      ],
      preguntas: [
        ["media", "Según la Ley 39/2015, las reclamaciones previas a la vía judicial civil y laboral:", ["Han quedado suprimidas", "Son obligatorias en todo caso", "Solo existen en Aragón", "Se tramitan ante el Consejo Consultivo"], "Preámbulo de la Ley 39/2015."],
        ["dificil", "¿En qué materia se mantiene la reclamación administrativa previa como requisito para demandar ante la jurisdicción social?", ["Prestaciones de Seguridad Social", "Despidos del personal laboral de la DGA", "Reclamaciones de cantidad salarial", "Tutela de derechos fundamentales"], "Art. 71 Ley 36/2011."],
        ["media", "Para demandar a la Administración de la Comunidad Autónoma ante la jurisdicción social, en general, hay que:", ["Haber agotado la vía administrativa cuando proceda", "Presentar reclamación previa civil", "Pedir dictamen del Consejo Consultivo", "Nada, se demanda directamente siempre"], "Art. 69.1 Ley 36/2011."],
        ["media", "Agotada la vía administrativa, el plazo general para formalizar la demanda laboral contra la Administración es de:", ["Dos meses", "Un mes", "Veinte días naturales", "Seis meses"], "Art. 69.2 Ley 36/2011."],
        ["media", "En una acción por despido contra la Administración, el plazo de interposición de la demanda es de:", ["Veinte días hábiles", "Dos meses", "Un mes", "Treinta días naturales"], "Art. 69.3 Ley 36/2011."],
        ["media", "La reclamación previa en materia de prestaciones de Seguridad Social:", ["Interrumpe la prescripción y suspende los plazos de caducidad", "No produce ningún efecto sobre los plazos", "Hace firme la resolución", "Sustituye a la demanda"], "Art. 73 Ley 36/2011."],
      ],
    },
  ],
  glosario: [
    [S1, "Revisión de oficio", "Procedimiento por el que la Administración, por sí misma, declara la nulidad de un acto o disposición nulos de pleno derecho."],
    [S1, "Declaración de lesividad", "Acuerdo por el que la Administración declara perjudicial para el interés público un acto favorable anulable, paso previo para pedir su anulación al juez."],
    [S1, "Revocación", "Retirada por la Administración de un acto desfavorable o de gravamen dictado por ella, dentro de los límites legales."],
    [S2, "Vía administrativa", "Conjunto de recursos ante la propia Administración que, una vez agotados, abre la vía judicial contencioso-administrativa."],
    [S2, "Reformatio in peius", "Prohibición de que la resolución de un recurso empeore la situación inicial del recurrente."],
    [S3, "Recurso de alzada", "Recurso ordinario ante el superior jerárquico contra actos que no ponen fin a la vía administrativa."],
    [S3, "Recurso potestativo de reposición", "Recurso voluntario ante el mismo órgano que dictó un acto que ya agota la vía administrativa."],
    [S4, "Acto firme", "Acto que no puede recurrirse por las vías ordinarias; solo admite el recurso extraordinario de revisión en casos tasados."],
    [S5, "Tributo propio", "Tributo creado y regulado por la Comunidad Autónoma (como sus impuestos medioambientales), frente al tributo cedido, que es estatal aunque lo gestione la Comunidad."],
    [S5, "Órgano económico-administrativo", "Órgano especializado e independiente funcionalmente que resuelve las reclamaciones en materia tributaria antes del contencioso."],
    [S6, "Reclamación previa", "Escrito que antes había que dirigir a la Administración para poder demandarla ante los jueces civiles o laborales; hoy solo subsiste en prestaciones de Seguridad Social."],
  ],
  casos: [
    {
      slug: "recurso-contra-baremo-ayuda",
      titulo: "Recurrir la denegación de una ayuda",
      supuesto: "Un director general del Gobierno de Aragón deniega mediante resolución expresa, notificada el 15 de marzo, una ayuda a una autónoma. La resolución no pone fin a la vía administrativa. La autónoma cree que se ha valorado mal su solicitud y además pide que no se le exija devolver un anticipo mientras se resuelve.",
      preguntas: [
        [S3, "media", "¿Qué recurso procede contra la resolución del director general?", ["Recurso de alzada ante el consejero, su superior jerárquico", "Recurso potestativo de reposición", "Recurso extraordinario de revisión", "Recurso contencioso directo"], "Art. 121 Ley 39/2015 y art. 64.1 Ley 5/2021."],
        [S3, "media", "El plazo para interponerlo es de:", ["Un mes desde el día siguiente a la notificación", "Dos meses", "Quince días hábiles", "Tres meses"], "Art. 122.1 Ley 39/2015."],
        [S2, "media", "Si se equivoca y lo llama «recurso de reposición»:", ["Se tramitará como alzada si se deduce su verdadero carácter", "Se inadmitirá", "Se archivará", "Deberá presentarlo de nuevo"], "Art. 115.2 Ley 39/2015."],
        [S3, "media", "Puede presentar el recurso:", ["Ante el director general o ante el consejero", "Solo ante el consejero", "Solo ante el Gobierno", "Solo ante el Justicia de Aragón"], "Art. 121.2 Ley 39/2015."],
        [S2, "media", "La interposición del recurso:", ["No suspende por sí sola la exigencia del anticipo", "Suspende automáticamente la exigencia", "Hace firme la resolución", "Obliga a la Administración a pagar la ayuda"], "Art. 117.1 Ley 39/2015."],
        [S2, "dificil", "Si pide la suspensión y en un mes desde la entrada de la solicitud en el registro no se resuelve sobre ella:", ["La ejecución se entiende suspendida", "Se entiende denegada", "Debe pedirla al juez", "Caduca el recurso"], "Art. 117.3 Ley 39/2015."],
        [S3, "media", "El consejero debe resolver y notificar el recurso en:", ["Tres meses", "Un mes", "Seis meses", "Diez días"], "Art. 122.2 Ley 39/2015."],
        [S2, "media", "Al resolverlo, el consejero no podrá:", ["Empeorar la situación de la autónoma respecto de la resolución recurrida", "Estimarlo en parte", "Ordenar la retroacción por vicio de forma", "Desestimarlo"], "Art. 119 Ley 39/2015."],
        [S3, "media", "Si el consejero desestima el recurso, ¿puede la autónoma interponer reposición?", ["No; solo cabe el contencioso o, en su caso, el extraordinario de revisión", "Sí, en un mes", "Sí, ante el Gobierno", "Sí, ante la Cámara de Cuentas"], "Art. 122.3 Ley 39/2015 y art. 64.3 Ley 5/2021."],
        [S2, "media", "La orden que resuelve el recurso de alzada:", ["Pone fin a la vía administrativa", "Es un acto de trámite", "Debe ser convalidada por el Gobierno", "No es recurrible"], "Art. 60.1.c) Ley 5/2021 y art. 114.1.a) Ley 39/2015."],
      ],
    },
    {
      slug: "licencia-favorable-ilegal",
      titulo: "Una autorización que no debió concederse",
      supuesto: "Hace tres años, un departamento del Gobierno de Aragón concedió una autorización a una empresa sin el informe técnico preceptivo, lo que la hace anulable. Ahora el departamento quiere dejarla sin efecto. Además, un vecino pide que se declare nula otra autorización concedida por un órgano manifiestamente incompetente por razón de la materia, que nadie recurrió en plazo.",
      preguntas: [
        [S1, "media", "Para anular la autorización anulable y favorable a la empresa, el departamento debe:", ["Declararla lesiva y luego impugnarla ante la jurisdicción contencioso-administrativa", "Anularla directamente por resolución", "Revocarla sin más", "Pedir al Consejo Consultivo que la anule"], "Art. 107 Ley 39/2015 y art. 61.b) Ley 5/2021."],
        [S1, "media", "¿Está a tiempo de declarar la lesividad, pasados tres años?", ["Sí, el límite es de cuatro años desde que se dictó el acto", "No, el límite es de un año", "No, el límite es de seis meses", "Sí, no hay límite"], "Art. 107.2 Ley 39/2015."],
        [S1, "media", "Antes de declarar la lesividad debe:", ["Dar audiencia a los interesados", "Pedir dictamen del Tribunal Supremo", "Publicar un anuncio en el BOE", "Obtener autorización de las Cortes"], "Art. 107.2 Ley 39/2015."],
        [S1, "media", "En la Administración autonómica, la lesividad se declara mediante:", ["Orden del titular del departamento (o acuerdo del Gobierno para sus actos)", "Resolución del jefe de servicio", "Decreto del Presidente siempre", "Sentencia"], "Art. 61.b) Ley 5/2021."],
        [S1, "media", "Si inicia el procedimiento de lesividad y no lo declara en seis meses:", ["Caduca", "Se entiende declarado", "Se prorroga otros seis meses", "Se convierte en revisión de oficio"], "Art. 107.3 Ley 39/2015."],
        [S1, "media", "La autorización dictada por un órgano manifiestamente incompetente por razón de la materia es:", ["Nula de pleno derecho y puede revisarse de oficio en cualquier momento", "Anulable, con plazo de cuatro años", "Válida porque nadie la recurrió", "Inexistente sin necesidad de procedimiento"], "Arts. 47.1.b) y 106.1 Ley 39/2015."],
        [S1, "dificil", "¿Qué órgano debe dictaminar favorablemente esa revisión de oficio?", ["El Consejo Consultivo de Aragón", "El Consejo de Estado", "La Cámara de Cuentas de Aragón", "El Justicia de Aragón"], "Art. 61.a) Ley 5/2021."],
        [S1, "media", "Si el procedimiento de revisión iniciado a solicitud del vecino no se resuelve en seis meses:", ["Puede entenderse desestimada su solicitud", "Se entiende estimada", "Caduca", "Debe reiterarla"], "Art. 106.5 Ley 39/2015."],
        [S1, "media", "Mientras se tramita, la ejecución del acto:", ["Puede suspenderse si causara perjuicios de imposible o difícil reparación", "Queda suspendida automáticamente", "No puede suspenderse nunca", "Solo la suspende el juez"], "Art. 108 Ley 39/2015."],
        [S1, "facil", "Si solo hubiese un error en la fecha de la autorización, el departamento podría:", ["Rectificarlo en cualquier momento", "Declararlo lesivo", "Revocarlo en cuatro años", "Nada, porque es firme"], "Art. 109.2 Ley 39/2015 y art. 63 Ley 5/2021."],
      ],
    },
    {
      slug: "tasa-propia-reclamacion-junta",
      titulo: "Reclamar contra una tasa aragonesa",
      supuesto: "El Gobierno de Aragón notifica a una empresa la liquidación de una tasa autonómica. La empresa considera que el importe está mal calculado. Su asesora duda entre recurrir en reposición o ir directamente a reclamar, y pregunta qué órgano resolverá y si podrá llegar después a los tribunales. Meses más tarde, un trabajador de esa empresa le comenta otro problema: la Seguridad Social le ha denegado una prestación.",
      preguntas: [
        [S5, "media", "La reclamación contra la liquidación de una tasa propia aragonesa la resuelve:", ["La Junta de Reclamaciones Económico-Administrativas de Aragón, en única instancia", "El TEAR de Aragón", "El consejero mediante alzada", "El Tribunal Superior de Justicia directamente"], "Arts. 1, 11 y 32 Ley 1/1998."],
        [S5, "media", "Antes de la reclamación, la empresa puede interponer:", ["Recurso de reposición potestativo, en el plazo de un mes", "Recurso de alzada obligatorio", "Recurso extraordinario de revisión", "Reclamación previa civil"], "Arts. 6-7 Ley 1/1998."],
        [S5, "media", "Si opta por la reposición, no podrá reclamar ante la Junta hasta que:", ["La reposición se resuelva expresamente o se entienda desestimada", "Pase un año", "Pague la tasa", "Lo autorice el consejero"], "Art. 6.2 Ley 1/1998."],
        [S5, "media", "La reposición en esta materia debe resolverse en:", ["Un mes", "Tres meses", "Un año", "Seis meses"], "Art. 9.3 Ley 1/1998."],
        [S5, "media", "El escrito de reclamación económico-administrativa se dirige:", ["Al órgano que dictó el acto, que lo remite a la Junta en un mes con el expediente", "Directamente al Tribunal Superior de Justicia", "Al Justicia de Aragón", "Al Ministerio de Hacienda"], "Art. 13 Ley 1/1998."],
        [S5, "dificil", "¿Puede la empresa acudir directamente al contencioso sin reclamar ante la Junta?", ["No; los actos sobre tributos propios requieren reclamación económico-administrativa previa", "Sí, siempre", "Sí, si la cuantía es pequeña", "Sí, si presentó reposición"], "Art. 5.3 Ley 1/1998."],
        [S5, "media", "La Junta dispone para resolver de un plazo de:", ["Un año desde la interposición", "Un mes", "Tres meses", "Dos años"], "Art. 18.3 Ley 1/1998."],
        [S5, "media", "Si el impuesto fuera un tributo cedido por el Estado, la reclamación iría:", ["A los órganos económico-administrativos del Estado (TEAR de Aragón)", "A la misma Junta aragonesa", "Al Consejo Consultivo", "Al Tribunal de Cuentas"], "Art. 3.a) Ley 1/1998; arts. 226 y 229 LGT."],
        [S6, "media", "Para demandar ante el juzgado de lo social por la prestación denegada, el trabajador debe antes:", ["Presentar reclamación previa ante la Entidad gestora en 30 días", "Presentar recurso de alzada ante el Gobierno de Aragón", "Nada, demanda directamente", "Presentar reclamación ante la Junta económico-administrativa"], "Art. 71 Ley 36/2011."],
        [S6, "media", "Si la Entidad gestora no contesta a esa reclamación previa en 45 días:", ["Se entiende denegada y puede demandar en 30 días", "Se entiende estimada", "Debe reiterarla", "Caduca su derecho"], "Art. 71.5-6 Ley 36/2011."],
      ],
    },
  ],
});
