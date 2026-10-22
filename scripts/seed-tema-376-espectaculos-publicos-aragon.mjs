/**
 * Crea tema-376 — Tema 49 de Policía Local: "La Ley de establecimientos,
 * espectáculos públicos y actividades recreativas de Aragón y normas de
 * desarrollo (Reglamento de admisión, Reglamento de espectáculos públicos
 * y actividades recreativas, ocasionales y extraordinarias, Catálogo de
 * espectáculos públicos)."
 *
 * Fuentes leídas en esta sesión:
 * - Ley 11/2005, de 28 de diciembre, reguladora de los espectáculos
 *   públicos, actividades recreativas y establecimientos públicos de Aragón
 *   (BOE-A-2006-1246, título verificado en la API del BOE; texto
 *   consolidado de octubre de 2026). Incluye la reforma del Decreto-ley
 *   2/2026, de 29 de julio (BOE-A-2026-20473, citado por el propio texto
 *   consolidado), que añade la prohibición del art. 5.1.f) (fiestas sin
 *   título habilitante) y modifica los arts. 42, 48 y 49.
 * - Decreto 23/2010, de 23 de febrero, Reglamento de admisión (BOA nº 46
 *   de 08-03-2010), arts. 1-16. Sus arts. 9-12 fueron derogados por el
 *   Decreto 63/2017 (dato de la búsqueda, no del texto leído): el servicio
 *   de admisión obligatorio se rige hoy por el art. 17 del Decreto 143/2018.
 * - Decreto 143/2018, de 26 de julio, espectáculos públicos y actividades
 *   recreativas ocasionales y extraordinarios (BOA nº 145 de 27-07-2018),
 *   arts. 1-18 y disposición derogatoria (deroga el Decreto 63/2017).
 * Laguna señalada: el texto del Catálogo (Decreto 220/2006, de 7 de
 *   noviembre) no se ha podido leer; solo se usa lo que de él dice la Ley
 *   (art. 2.2: catálogo no exhaustivo aprobado por el Gobierno de Aragón).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-376-espectaculos-publicos-aragon.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-1246";
const D143 = "https://www.boa.aragon.es/pdf/normas-aragon/D_143_2018_espectaculos.pdf";
const D23 = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=507921105656";
const S1 = "ley-espectaculos-objeto-prohibiciones";
const S2 = "licencias-competencias-municipales";
const S3 = "titulares-publico-menores-horarios";
const S4 = "inspeccion-infracciones-sanciones-espectaculos";
const S5 = "admision-ocasionales-extraordinarios";

await sembrarTema({
  tema: {
    slug: "tema-376",
    titulo: "Espectáculos públicos, actividades recreativas y establecimientos públicos de Aragón",
    descripcion: "Ley 11/2005 de Aragón (con la reforma del Decreto-ley 2/2026): objeto, definiciones y catálogo, exclusiones, espectáculos prohibidos, autorizaciones, licencias y seguros; competencias municipales; obligaciones de titulares y público, derecho de admisión, protección del menor y horarios de cierre; inspección, medidas provisionalísimas, infracciones, sanciones y competencia sancionadora. Reglamento de admisión (Decreto 23/2010): limitaciones de acceso, visado y cartel de condiciones, personal de admisión. Decreto 143/2018: espectáculos ocasionales y extraordinarios, autorización, fianzas, menores y servicio de admisión.",
    contenido: "La normativa aragonesa que aplica el agente en bares, discotecas, conciertos y fiestas: qué espectáculos están prohibidos, qué licencias hacen falta, a qué hora cierra cada tipo de local, cuándo pueden entrar menores, quién puede negar la entrada y cómo, qué es el 'portero' acreditado, cómo se autoriza una fiesta o concierto ocasional y qué puede hacer la Policía en el momento (por ejemplo, suspender un evento sin licencia). Incluye la reforma de julio de 2026, que prohíbe expresamente las fiestas sin título habilitante.",
    enlaces_boe: [
      { url: LEY, titulo: "Ley 11/2005, de 28 de diciembre, de espectáculos públicos, actividades recreativas y establecimientos públicos de Aragón (BOE-A-2006-1246)" },
      { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-20473", titulo: "Decreto-ley 2/2026, de 29 de julio, de Aragón, que modifica la Ley 11/2005 (BOE-A-2026-20473)" },
      { url: D23, titulo: "Decreto 23/2010, de 23 de febrero, Reglamento de admisión en espectáculos públicos, actividades recreativas y establecimientos públicos (BOA nº 46, 08-03-2010)" },
      { url: D143, titulo: "Decreto 143/2018, de 26 de julio, espectáculos públicos y actividades recreativas ocasionales y extraordinarios (BOA nº 145, 27-07-2018)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Ley 11/2005: objeto, definiciones, exclusiones y prohibiciones", articulos: "arts. 1-8", url: `${LEY}#a1` },
      { seccion: S2, titulo: "Ley 11/2005: competencias municipales, autorizaciones y licencias", articulos: "arts. 10-24", url: `${LEY}#a1-2` },
      { seccion: S3, titulo: "Ley 11/2005: titulares, público, menores y horarios", articulos: "arts. 25-38", url: `${LEY}#a2-7` },
      { seccion: S4, titulo: "Ley 11/2005: inspección, medidas, infracciones y sanciones", articulos: "arts. 39-57", url: `${LEY}#a3-11` },
      { seccion: S5, titulo: "Reglamento de admisión (D. 23/2010) y espectáculos ocasionales y extraordinarios (D. 143/2018)", url: D143 },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 49 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto (art. 1)", "Regular espectáculos públicos, actividades recreativas y establecimientos públicos en Aragón, sean sus titulares públicos o privados, con o sin ánimo de lucro, en instalaciones fijas o desmontables, habituales u ocasionales"],
        ["Espectáculo público (art. 2.1.a)", "Acontecimiento en que el público acude a presenciar una representación, actuación, exhibición o proyección ofrecida por un empresario o artistas"],
        ["Actividad recreativa (art. 2.1.b)", "Aquella en que el público acude para participar o recibir servicios con fines de ocio, entretenimiento y diversión"],
        ["Establecimiento público (art. 2.1.c)", "Local cerrado o abierto de pública concurrencia donde se consumen productos o reciben servicios con fines de ocio"],
        ["Catálogo (art. 2.2)", "El Gobierno de Aragón aprueba un catálogo no exhaustivo con sus definiciones (Decreto 220/2006; su texto no se ha podido leer en esta sesión)"],
        ["Legislación propia (art. 3)", "Taurinos, deportivos, turísticos y de juego tienen su legislación; la Ley es supletoria"],
        ["Exclusiones (art. 4)", "Actos privados familiares o sociales no abiertos a pública concurrencia y el ejercicio de derechos fundamentales"],
        ["Prohibidos (art. 5.1)", "Los constitutivos de delito, los que inciten a la violencia o la discriminación, los que atenten contra la infancia, los que maltraten animales (peleas de perros o gallos), festejos taurinos ilegales y, desde 2026, las fiestas o eventos sin título habilitante"],
        ["Clausura (art. 5.2)", "Los locales donde se celebren espectáculos prohibidos serán clausurados"],
        ["Seguro (art. 8)", "Obligatorio de responsabilidad civil por daños al público y a terceros antes de iniciar la actividad"],
      ],
      preguntas: [
        ["media", "¿Se aplica la Ley 11/2005 a una boda privada no abierta al público?", ["No, está excluida", "Sí", "Solo si hay música"], "Ley 11/2005, art. 4.1."],
        ["media", "¿Qué tipo de actividad es una discoteca, según la Ley?", ["Un establecimiento público", "Un espectáculo taurino", "Un acto privado"], "Art. 2.1.c)."],
        ["media", "¿Están permitidas en Aragón las peleas de gallos?", ["No", "Sí, con licencia", "Solo en fiestas"], "Art. 5.1.d)."],
        ["dificil", "¿Qué prohibición añadió el Decreto-ley 2/2026?", ["Las reuniones o fiestas para espectáculos o actividades recreativas sin el preceptivo título habilitante", "Los conciertos al aire libre", "Las terrazas"], "Art. 5.1.f), en la redacción del Decreto-ley 2/2026."],
        ["media", "¿Qué seguro deben suscribir los titulares antes de iniciar la actividad?", ["De responsabilidad civil por daños al público y a terceros", "De vida", "Ninguno"], "Art. 8."],
        ["media", "¿Qué legislación rige los espectáculos deportivos?", ["Su legislación específica, con la Ley 11/2005 como supletoria", "Solo la Ley 11/2005", "Ninguna"], "Art. 3."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Competencias municipales (art. 10)", "Licencias y autorizaciones, estructuras desmontables, atracciones de feria, limitaciones urbanísticas, horarios, terrazas y la función ordinaria de policía de espectáculos e inspección"],
        ["Autorizaciones municipales (art. 15)", "Espectáculos de fiestas locales y verbenas, los que usan la vía pública y los no regulados ni atribuidos a otra Administración"],
        ["Licencia de funcionamiento (art. 17)", "Se pide con certificado técnico; el Ayuntamiento resuelve en un mes tras inspeccionar; fija titular, aforo, terrazas, horario y actividad"],
        ["Incumplimiento de la licencia (art. 17.4)", "Suspensión cautelar de la actividad, que se convierte en revocación si en tres meses no se restablecen las condiciones"],
        ["Licencia y espectáculo habitual (art. 7.2)", "No necesita autorización adicional el espectáculo que figura expresamente en la licencia del local"],
      ],
      preguntas: [
        ["media", "¿Quién autoriza un espectáculo que se celebra en la vía pública?", ["El Ayuntamiento", "La Delegación del Gobierno", "El Gobierno central"], "Ley 11/2005, art. 15.1.b)."],
        ["media", "¿Quién fija el horario de los establecimientos dentro de los límites legales?", ["El Ayuntamiento", "El titular libremente", "La Policía Local"], "Arts. 10.f) y 35."],
        ["media", "¿En qué plazo resuelve el Ayuntamiento la licencia de funcionamiento?", ["Un mes desde la solicitud", "Seis meses", "Un año"], "Art. 17.2."],
        ["dificil", "Si el local incumple las condiciones de la licencia, ¿qué ocurre?", ["Suspensión cautelar, que pasa a revocación si en tres meses no se restablecen", "Nada", "Multa automática de 600 euros"], "Art. 17.4."],
        ["media", "¿Quién autoriza las atracciones de feria en espacios abiertos?", ["El municipio, tras comprobar su seguridad", "La comunidad autónoma siempre", "Nadie"], "Art. 10.c)."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derecho de admisión (art. 26)", "Los titulares deben impedir la entrada a quien sea violento, moleste o dificulte la actividad; las condiciones propias de admisión deben visarse y anunciarse; nunca discriminatorias"],
        ["Obligaciones de los titulares (art. 27)", "Seguridad e higiene, inspecciones, hojas de reclamaciones, carteles (horario, licencia, prohibición de alcohol y tabaco a menores), seguro, plan de autoprotección y evitar molestias por ruido"],
        ["Obligaciones del público (art. 31)", "No portar armas ni símbolos violentos o racistas, cumplir las reglas de admisión, no subir al escenario y respetar el horario; si incumple, la empresa puede pedir el auxilio de los agentes, que desalojan a los infractores"],
        ["Menores (art. 32)", "Prohibida su entrada en casinos, bingos y salones de juego con premios, y en salas de fiestas, discotecas, salas de baile y pubs (salvo sesiones de juventud desde los 14 años o acompañados); nunca alcohol ni tabaco"],
        ["Horario general (art. 34.1.a)", "Apertura desde las 6:00 y cierre a la 1:30"],
        ["Bares musicales y pubs (art. 34.1.b-c)", "No abren antes de las 12:00; cierran a las 3:30"],
        ["Discotecas y salas de fiestas (art. 34.1.c)", "Cierran a las 5:30 (también cafés-teatro y cafés-cantante)"],
        ["Desalojo y fines de semana (art. 34.1.d-e)", "Media hora más para desalojar, sin música ni nuevas consumiciones; viernes, sábados y vísperas de festivo, una hora más"],
        ["Dos horas cerrado (art. 34.1.f)", "Todo establecimiento debe permanecer cerrado al menos dos horas seguidas entre cierre y apertura"],
        ["Ampliaciones municipales (art. 35)", "Por fiestas locales y navideñas, y zonas de ocio donde se pueden superar los límites"],
      ],
      preguntas: [
        ["media", "¿A qué hora cierra, como límite general, una discoteca un martes?", ["A las 5:30", "A la 1:30", "A las 3:30"], "Ley 11/2005, art. 34.1.c)."],
        ["media", "¿Y un pub un martes?", ["A las 3:30", "A las 5:30", "A la 1:30"], "Art. 34.1.c)."],
        ["media", "¿Cuánto se amplía el horario de cierre los viernes, sábados y vísperas de festivo?", ["Una hora", "Dos horas", "Media hora"], "Art. 34.1.e)."],
        ["media", "Tras la hora de cierre, ¿de cuánto tiempo dispone el local para desalojar?", ["Media hora, sin música ni nuevas consumiciones", "Una hora", "Sin límite"], "Art. 34.1.d)."],
        ["media", "¿Puede un menor de 16 años entrar solo en una discoteca?", ["No, salvo sesiones de juventud autorizadas para mayores de 14", "Sí", "Sí, antes de las 22 h"], "Art. 32.1.b)."],
        ["dificil", "¿Cuánto tiempo mínimo debe permanecer cerrado un establecimiento entre cierre y apertura?", ["Dos horas ininterrumpidas", "Seis horas", "No hay mínimo"], "Art. 34.1.f)."],
        ["media", "Si un cliente incumple las normas y la empresa pide ayuda, los agentes pueden…", ["Desalojar a los infractores", "Nada", "Cerrar el local siempre"], "Art. 31.2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Inspección (art. 39)", "Funcionarios acreditados de la Comunidad, los Municipios y las Comarcas, con condición de agentes de la autoridad y actas con presunción de veracidad; los titulares deben permitir el acceso"],
        ["Medidas provisionalísimas (art. 42.1)", "Antes del procedimiento: espectáculos prohibidos, alteraciones del orden con peligro, riesgo grave, falta de licencia, autorización o seguro, e incumplimiento de horarios"],
        ["Por los agentes (art. 42.2)", "Los agentes de la autoridad pueden adoptarlas de inmediato en casos de absoluta urgencia o para evitar espectáculos prohibidos, dando cuenta al órgano competente"],
        ["Leves (art. 47)", "No comunicar cambios de titularidad, falta de hojas de reclamaciones o de su cartel, no exponer la licencia, falta del cartel de prohibición a menores"],
        ["Graves (art. 48)", "Abrir sin licencia, actividades distintas de las autorizadas, exceso de aforo sin grave riesgo, derecho de admisión arbitrario, incumplir horarios, admitir menores donde está prohibido, reventa no autorizada, falta de seguro, superar hasta 5 dB"],
        ["Muy graves (art. 49)", "Tolerar delitos (drogas), actividades sin licencia con grave riesgo, exceso de aforo con grave riesgo, incumplir prohibiciones o clausuras, espectáculos prohibidos, negar el acceso a los agentes u obstruir las medidas, alterar los aparatos de control de decibelios o superar en más de 5 dB"],
        ["Sanciones (art. 51)", "Leves: hasta 600 euros; graves: de 601 a 30.000, suspensión, clausura o inhabilitación de hasta seis meses; muy graves: de 30.001 a 60.000 y clausura, suspensión o inhabilitación de hasta tres años"],
        ["Prescripción (art. 50)", "Infracciones leves 9 meses, graves 2 años, muy graves 3 años; el procedimiento debe resolverse en 9 meses"],
        ["Competencia sancionadora (art. 53.1)", "Los municipios, cuando les corresponde la licencia y por horarios: el Alcalde en leves y graves; el Pleno o la Junta de Gobierno Local en muy graves"],
      ],
      preguntas: [
        ["media", "¿Pueden los agentes de la autoridad suspender en el acto una fiesta prohibida?", ["Sí, como medida provisionalísima inmediata, dando cuenta al órgano competente", "No, nunca", "Solo con orden judicial"], "Ley 11/2005, art. 42.2."],
        ["media", "Incumplir el horario de cierre es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 48.j)."],
        ["media", "Negar la entrada a los agentes que inspeccionan es una infracción…", ["Muy grave", "Leve", "Grave"], "Art. 49.i)."],
        ["media", "No tener a disposición las hojas de reclamaciones es una infracción…", ["Leve", "Grave", "Muy grave"], "Art. 47.b)."],
        ["media", "¿Cuál es la multa máxima de una infracción leve?", ["600 euros", "3.000 euros", "30.000 euros"], "Art. 51.1."],
        ["dificil", "¿Quién sanciona en un municipio las infracciones muy graves de su competencia?", ["El Pleno o la Junta de Gobierno Local", "El Alcalde", "La Policía Local"], "Art. 53.1."],
        ["media", "Superar en más de 5 decibelios los autorizados por la licencia es infracción…", ["Muy grave", "Leve", "Grave"], "Art. 49.n)."],
        ["media", "¿En qué plazo prescriben las infracciones leves de esta Ley?", ["Nueve meses", "Seis meses", "Un año"], "Art. 50.1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Derecho de admisión (D. 23/2010, art. 2)", "Facultad de los titulares para fijar las condiciones de acceso y permanencia dentro de los límites legales"],
        ["Impedir el acceso (art. 4)", "Aforo completo (con rótulo de aforo en la entrada), hora de cierre, espectáculo iniciado, falta de edad, violencia, armas (salvo policías en funciones o escoltas), molestias o signos de drogas o embriaguez"],
        ["Condiciones particulares (arts. 6-7)", "Las visa la Dirección General de Interior en un mes; se anuncian en un cartel de al menos 20 × 30 cm visible desde la entrada"],
        ["Personal de admisión (arts. 13-16)", "Acreditado por la Dirección General de Interior (mayor de edad, sin antecedentes, curso y pruebas); distintivo visible 'Personal del servicio de admisión'; comprueba edad, entradas y aforo y pide ayuda a vigilancia o a la policía"],
        ["Tipos de espectáculos (D. 143/2018, art. 2)", "Habituales (en establecimientos con licencia), ocasionales (espacios abiertos con instalaciones desmontables, tiempo determinado) y extraordinarios (distintos de los de la licencia del local)"],
        ["Autorización (arts. 8-10)", "La da el Ayuntamiento del lugar; se pide con 30 días hábiles de antelación (15 si el aforo es menor de 50) y fianza; se resuelve al menos 5 días hábiles antes"],
        ["Contenido (art. 11)", "Organizador, clase, fecha, lugar y horario, aforo, edad, servicios sanitarios, personal de admisión y vigilancia y la prohibición de bengalas, fuegos o armas"],
        ["Copia visible (art. 4)", "El organizador coloca en los accesos una copia de la autorización visible desde el exterior"],
        ["Menores (art. 14)", "Prohibida su entrada en bares con música, pubs, discotecas y salas de fiestas, salvo acompañados durante actuaciones en directo e identificados visiblemente"],
        ["Servicio de admisión obligatorio (art. 17)", "Bares musicales, pubs, discotecas y similares de más de 250 personas; eventos ocasionales con más de 250 (con alcohol) o 300 (sin alcohol); 2 personas de 250 a 500 de aforo, 3 de 501 a 1.000, y una por puerta"],
      ],
      preguntas: [
        ["media", "¿Puede negarse la entrada a una persona con signos evidentes de embriaguez?", ["Sí", "No", "Solo si es menor"], "Decreto 23/2010, art. 4.d).6."],
        ["media", "¿Qué tamaño mínimo tiene el cartel de condiciones de admisión?", ["20 cm de alto por 30 cm de ancho", "A4", "1 metro"], "Decreto 23/2010, art. 7."],
        ["media", "¿Quién acredita al personal del servicio de admisión?", ["La Dirección General de Interior del Gobierno de Aragón", "El Ayuntamiento", "La Guardia Civil"], "Decreto 23/2010, art. 13."],
        ["media", "¿Con cuánta antelación se pide la autorización de un concierto ocasional para 2.000 personas?", ["30 días hábiles", "Dos días", "Seis meses"], "Decreto 143/2018, art. 10.2."],
        ["media", "¿Quién autoriza, con carácter general, un espectáculo ocasional o extraordinario?", ["El Ayuntamiento del municipio donde se celebra", "El Gobierno de España", "La Policía Local"], "Decreto 143/2018, art. 9.1."],
        ["dificil", "¿Cuántas personas de admisión necesita, como mínimo, una discoteca con aforo de 400 personas que sirve alcohol?", ["Dos, y una por cada puerta de acceso", "Una", "Diez"], "Decreto 143/2018, art. 17."],
        ["media", "¿Qué debe colocar el organizador en los accesos de un evento ocasional?", ["Una copia de la autorización, visible desde el exterior", "Nada", "Su DNI"], "Decreto 143/2018, art. 4."],
        ["media", "¿Puede el personal de admisión ejercer funciones de seguridad privada?", ["No", "Sí", "Solo de noche"], "Decreto 143/2018, art. 17.7."],
      ],
    },
  ],
  glosario: [
    [S1, "Espectáculo público", "Acontecimiento en el que el público presencia una representación o actuación ofrecida por un empresario o artistas."],
    [S1, "Actividad recreativa", "Actividad de ocio en la que el público participa o recibe servicios."],
    [S2, "Licencia de funcionamiento", "Licencia municipal que permite abrir el establecimiento tras comprobar que se ajusta a lo autorizado."],
    [S3, "Derecho de admisión", "Facultad del titular para fijar las condiciones de acceso y permanencia, sin discriminación."],
    [S3, "Sesión de juventud", "Sesión autorizada en discoteca para mayores de 14 y menores de 18 años, sin alcohol."],
    [S4, "Medida provisionalísima", "Medida urgente adoptada antes de iniciar el procedimiento, como la suspensión de un evento sin licencia."],
    [S4, "Aforo", "Número máximo de personas autorizado en un local o recinto."],
    [S5, "Espectáculo ocasional", "El que se celebra en espacios abiertos con instalaciones desmontables durante un tiempo determinado."],
    [S5, "Espectáculo extraordinario", "El distinto de los autorizados en la licencia del establecimiento."],
    [S5, "Personal de admisión", "Personal acreditado que controla el acceso, la edad y el aforo, distinto de la seguridad privada."],
  ],
  casos: [
    {
      slug: "caso-discoteca-menores-horario",
      titulo: "Una discoteca un sábado de madrugada",
      supuesto: "Un sábado a las 7:15, una patrulla acude por quejas vecinales a una discoteca de la zona de ocio de la calle Doctor Cerrada. Sigue con música y sirviendo copas. Dentro hay dos chicas de 16 años con bebidas alcohólicas. El encargado se niega a dejar pasar a los agentes.",
      preguntas: [
        [S3, "media", "¿A qué hora debía cerrar la discoteca un sábado, como límite general?", ["A las 6:30 (5:30 más una hora)", "A las 7:30", "A las 3:30"], "Ley 11/2005, art. 34.1.c) y e)."],
        [S3, "media", "¿De cuánto tiempo disponía para desalojar tras el cierre?", ["Media hora, sin música ni nuevas consumiciones", "Una hora", "Sin límite"], "Art. 34.1.d)."],
        [S4, "media", "Incumplir el horario de cierre es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 48.j)."],
        [S3, "media", "¿Pueden estar las menores de 16 años en la discoteca sin acompañamiento fuera de una sesión de juventud?", ["No", "Sí", "Sí, antes de las 3"], "Art. 32.1.b)."],
        [S3, "media", "¿Se les podía servir alcohol?", ["No, en ningún caso", "Sí", "Solo cerveza"], "Art. 32.2."],
        [S4, "media", "Admitir a menores donde tienen prohibida la entrada es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 48.ñ)."],
        [S4, "media", "Negar el acceso a los agentes es infracción…", ["Muy grave", "Leve", "Grave"], "Art. 49.i)."],
        [S4, "media", "¿Pueden los agentes adoptar medidas provisionalísimas por el incumplimiento del horario?", ["Sí", "No", "Solo el Gobierno de Aragón"], "Art. 42.1.g) y 42.2."],
        [S4, "dificil", "Si la sanción fuera grave, ¿qué cuantía podría tener la multa?", ["De 601 a 30.000 euros", "Hasta 600 euros", "De 30.001 a 60.000 euros"], "Art. 51.2."],
        [S4, "media", "¿Qué valor tiene el acta de los agentes?", ["Presunción de veracidad", "Ninguno", "Solo orientativo"], "Art. 39.1."],
      ],
    },
    {
      slug: "caso-fiesta-sin-licencia-nave",
      titulo: "Una fiesta sin licencia en una nave",
      supuesto: "Por redes sociales se convoca una fiesta de pago con DJ en una nave del polígono Cogullada. Al llegar, los agentes comprueban que no hay ninguna autorización ni seguro, que hay unas 600 personas, que no hay salidas de emergencia señalizadas y que en la puerta dos personas sin acreditación cobran la entrada y deciden quién pasa.",
      preguntas: [
        [S1, "media", "¿Está prohibida una fiesta así sin título habilitante?", ["Sí, desde la reforma de 2026", "No", "Solo si hay menores"], "Ley 11/2005, art. 5.1.f)."],
        [S4, "media", "¿Qué pueden hacer los agentes en el momento?", ["Adoptar medidas provisionalísimas como la suspensión, dando cuenta al órgano competente", "Nada", "Solo pedir el DNI"], "Art. 42."],
        [S4, "media", "Celebrar un espectáculo sin licencia con grave riesgo para las personas es infracción…", ["Muy grave", "Leve", "Grave"], "Art. 49.b)."],
        [S1, "media", "Carecer del seguro obligatorio es…", ["Infracción grave y causa de medida provisionalísima", "Correcto", "Leve"], "Arts. 8, 42.1.f) y 48.q)."],
        [S5, "media", "¿Quién debería haber autorizado este evento extraordinario?", ["El Ayuntamiento de Zaragoza", "Nadie", "La Policía Local"], "Decreto 143/2018, art. 9.1."],
        [S5, "media", "¿Con cuánta antelación debía haberse pedido la autorización?", ["30 días hábiles", "Un día", "No hace falta"], "Decreto 143/2018, art. 10.2."],
        [S5, "media", "¿Necesitaba servicio de admisión acreditado un evento de 600 personas con alcohol?", ["Sí, al menos 3 personas y una por puerta", "No", "Solo uno"], "Decreto 143/2018, art. 17."],
        [S5, "media", "¿Pueden ejercer de 'porteros' personas sin acreditación ni habilitación?", ["No", "Sí", "Solo si son mayores de edad"], "Decreto 23/2010, art. 3.2; Decreto 143/2018, art. 17."],
        [S4, "dificil", "¿Qué sanción económica corresponde a una infracción muy grave?", ["De 30.001 a 60.000 euros", "Hasta 600 euros", "De 601 a 3.000 euros"], "Art. 51.3."],
        [S1, "media", "Si se desarrollaran delitos de tráfico de drogas, ¿qué tendría que hacer la autoridad?", ["Ponerlo en conocimiento del juzgado o del Ministerio Fiscal", "Nada", "Solo multar"], "Art. 42.1.a)."],
      ],
    },
    {
      slug: "caso-concierto-ocasional-plaza",
      titulo: "Un concierto ocasional en una plaza acotada",
      supuesto: "Una promotora organiza un concierto de pago en un espacio vallado del parque del Agua con aforo de 3.000 personas y venta de cerveza. La Policía Local colabora en el dispositivo y revisa en la entrada el cumplimiento de la autorización.",
      preguntas: [
        [S5, "media", "¿Qué tipo de espectáculo es, según el Decreto 143/2018?", ["Ocasional, en espacio abierto acotado", "Habitual", "Privado"], "Decreto 143/2018, art. 2."],
        [S5, "media", "¿Qué debe estar colocado en los accesos?", ["Una copia de la autorización visible desde el exterior", "Nada", "La lista de invitados"], "Art. 4."],
        [S5, "media", "¿Cómo se determina el aforo en un espacio acotado?", ["En función de la zona acotada y de la actividad", "Libremente", "Por la promotora"], "Art. 5.2."],
        [S5, "media", "¿Qué objetos debe prohibir el organizador introducir en el recinto?", ["Bengalas, fuegos de artificio, antorchas y armas", "Paraguas", "Nada"], "Art. 11.1.k)."],
        [S5, "media", "¿Qué dotación higiénica mínima adaptada debe existir?", ["Al menos un lavabo y un inodoro adaptados para personas con discapacidad", "Ninguna", "Solo urinarios"], "Art. 7.3."],
        [S5, "media", "¿Debe la promotora constituir fianza?", ["Sí, a favor del órgano que autoriza", "No", "Solo si llueve"], "Arts. 10.1 y 12."],
        [S3, "media", "¿Puede venderse alcohol a menores en el concierto?", ["No", "Sí", "Solo cerveza"], "Ley 11/2005, art. 32.2."],
        [S5, "dificil", "¿Pueden venderse entradas antes de obtener la autorización?", ["La publicidad y venta válidas quedan condicionadas a obtenerla, informando de la devolución", "Sí, libremente", "No, nunca"], "Art. 11.2."],
        [S3, "media", "Si un asistente intenta subir al escenario y la empresa pide ayuda, los agentes…", ["Pueden desalojarlo", "Nada", "Suspenden el concierto"], "Ley 11/2005, art. 31.1.e) y 31.2."],
        [S1, "media", "¿Debe la promotora tener seguro de responsabilidad civil?", ["Sí", "No", "Solo si es extranjera"], "Ley 11/2005, art. 8."],
      ],
    },
  ],
});
