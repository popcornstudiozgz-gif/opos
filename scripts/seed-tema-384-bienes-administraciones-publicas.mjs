/**
 * Crea tema-384 — Tema 12 de Administrativo DGA (tema 7 del programa de
 * materias específicas): "Los bienes de las Administraciones Públicas:
 * bienes de dominio público y bienes de dominio privado. Afectación y
 * desafectación. Utilización."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Constitución Española (BOE-A-1978-31229): art. 132.
 * - Ley 33/2003, del Patrimonio de las Administraciones Públicas
 *   (BOE-A-2003-20254): arts. 3-8 (concepto, clases y principios), 28, 30
 *   (inalienabilidad, imprescriptibilidad, inembargabilidad), 41 y 55
 *   (prerrogativas y recuperación posesoria) y 84-86 (uso del dominio
 *   público).
 * - Decreto Legislativo 1/2023, de 22 de febrero, Texto Refundido de la Ley
 *   del Patrimonio de Aragón (BOE-A-2023-7507), que sustituye al Decreto
 *   Legislativo 4/2013: arts. 1-5 (patrimonio de Aragón, demanio y bienes
 *   privados), 86-95 (afectación, desafectación, mutación demanial,
 *   adscripción) y 106-122 (utilización del dominio público, autorizaciones
 *   y concesiones, extinción).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-384-bienes-administraciones-publicas.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const L33 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20254";
const TRLPA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-7507";
const S1 = "patrimonio-dominio-publico-privado";
const S2 = "regimen-proteccion-defensa";
const S3 = "afectacion-desafectacion-mutacion";
const S4 = "utilizacion-dominio-publico";

await sembrarTema({
  tema: {
    slug: "tema-384",
    titulo: "Los bienes de las Administraciones Públicas: dominio público y privado, afectación, desafectación y utilización",
    descripcion: "El patrimonio de las Administraciones públicas y el patrimonio de Aragón (Ley 33/2003 y Texto Refundido de la Ley del Patrimonio de Aragón de 2023). Bienes de dominio público o demaniales y de dominio privado o patrimoniales: concepto, principios y régimen (inalienabilidad, imprescriptibilidad, inembargabilidad) y prerrogativas de defensa. Afectación expresa y tácita, desafectación, mutación demanial y adscripción. Utilización del dominio público: uso común, aprovechamiento especial y uso privativo; autorizaciones y concesiones demaniales, plazos, otorgamiento y extinción.",
    contenido: "Qué bienes son de dominio público (una carretera, un hospital, la oficina donde se trabaja) y cuáles son patrimoniales (unas acciones, un local alquilado), por qué los primeros no se pueden vender ni embargar, cómo un bien pasa de una categoría a otra y qué permiso hace falta para usar un bien público de forma especial: desde montar una terraza desmontable con una autorización de hasta cuatro años hasta construir una instalación fija con una concesión de hasta setenta y cinco.",
    enlaces_boe: [
      { url: CE, titulo: "Constitución Española, art. 132 (BOE-A-1978-31229)" },
      { url: L33, titulo: "Ley 33/2003, de 3 de noviembre, del Patrimonio de las Administraciones Públicas (BOE-A-2003-20254)" },
      { url: TRLPA, titulo: "Decreto Legislativo 1/2023, Texto Refundido de la Ley del Patrimonio de Aragón (BOE-A-2023-7507)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Patrimonio: bienes de dominio público y de dominio privado", articulos: "art. 132 CE; arts. 3-8 Ley 33/2003; arts. 1-5 TRLPA", url: `${TRLPA}#a4` },
      { seccion: S2, titulo: "Régimen jurídico, protección y defensa", articulos: "arts. 28, 30, 41 y 55 Ley 33/2003", url: `${L33}#a30` },
      { seccion: S3, titulo: "Afectación, desafectación, mutación demanial y adscripción", articulos: "arts. 86-95 TRLPA", url: `${TRLPA}#a8-8` },
      { seccion: S4, titulo: "Utilización del dominio público: autorizaciones y concesiones", articulos: "arts. 84-86 Ley 33/2003; arts. 106-122 TRLPA", url: `${TRLPA}#a1-19` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 12 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Mandato constitucional (art. 132.1 CE)", "La ley regulará los bienes de dominio público y comunales inspirándose en la inalienabilidad, imprescriptibilidad e inembargabilidad, así como su desafectación"],
        ["Dominio público estatal por la CE (art. 132.2)", "Los que determine la ley y, en todo caso, la zona marítimo-terrestre, las playas, el mar territorial y los recursos de la zona económica y la plataforma continental"],
        ["Patrimonio de las Administraciones (art. 3 Ley 33/2003)", "Conjunto de sus bienes y derechos, sea cual sea su naturaleza y título; no incluye el dinero, valores, créditos y demás recursos financieros de su hacienda"],
        ["Clasificación (art. 4 Ley 33/2003)", "Bienes y derechos de dominio público o demaniales y de dominio privado o patrimoniales"],
        ["Patrimonio de Aragón (art. 2 TRLPA)", "Bienes y derechos de las Cortes de Aragón, el Justicia, la Administración de la Comunidad Autónoma, sus organismos públicos y los órganos estatutarios"],
        ["Dominio público en Aragón (art. 4 TRLPA)", "Los afectados al uso general o al servicio público, los que una ley declare demaniales y los destinados a servicios, oficinas o dependencias de sus órganos"],
        ["Dominio privado en Aragón (art. 5 TRLPA)", "Los que no son de dominio público; en todo caso, arrendamientos, valores, participaciones sociales, instrumentos financieros y propiedad incorporal"],
        ["Patrimonios especiales (art. 3.2 TRLPA)", "Viario, agrario, forestal, vías pecuarias, suelo y vivienda y universitario: se rigen preferentemente por su legislación específica"],
        ["Principios del demanio (art. 6 Ley 33/2003)", "Inalienabilidad, inembargabilidad e imprescriptibilidad; adecuación; aplicación efectiva al uso o servicio; preferencia del uso común; inventario; cooperación"],
        ["Principios de los patrimoniales (art. 8 Ley 33/2003)", "Eficiencia y economía, eficacia y rentabilidad, publicidad, transparencia y concurrencia, inventario y colaboración"],
      ],
      preguntas: [
        ["media", "Según la Ley 33/2003, los bienes de dominio público son los de titularidad pública que:", ["Están afectados al uso general o al servicio público, o una ley les da ese carácter", "Producen rentas", "Están inscritos en el Registro de la Propiedad", "Se adquirieron a título oneroso"], "Art. 5.1 Ley 33/2003."],
        ["media", "El edificio donde se ubican las oficinas de un departamento del Gobierno de Aragón es:", ["Un bien de dominio público", "Un bien patrimonial", "Un bien comunal", "Un bien de dominio privado del Estado"], "Art. 4.c) TRLPA."],
        ["media", "Las participaciones del Gobierno de Aragón en el capital de una sociedad mercantil son:", ["Bienes de dominio privado", "Bienes de dominio público", "Bienes comunales", "No forman parte del patrimonio"], "Art. 5.2 TRLPA."],
        ["dificil", "¿Cuál de estos NO forma parte del patrimonio de las Administraciones según el art. 3.2 de la Ley 33/2003?", ["El dinero y los créditos de su hacienda", "Un inmueble arrendado a un particular", "Los derechos de propiedad incorporal", "Las acciones de una sociedad pública"], "Art. 3.2 Ley 33/2003."],
        ["media", "Según la Constitución, son en todo caso de dominio público estatal:", ["La zona marítimo-terrestre, las playas y el mar territorial", "Los montes de utilidad pública", "Las carreteras autonómicas", "Los edificios administrativos"], "Art. 132.2 CE."],
        ["media", "El patrimonio de Aragón incluye los bienes y derechos de:", ["Las Cortes de Aragón, el Justicia, la Administración autonómica, sus organismos públicos y los órganos estatutarios", "Todos los municipios aragoneses", "Las empresas privadas que contratan con la Administración", "La Delegación del Gobierno en Aragón"], "Art. 2.1 TRLPA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Régimen del demanio (art. 30.1 Ley 33/2003)", "Los bienes y derechos de dominio público son inalienables, imprescriptibles e inembargables"],
        ["Bienes patrimoniales (art. 30.2)", "Pueden enajenarse con el procedimiento y requisitos legales y pueden ser adquiridos por terceros por prescripción según el Código Civil"],
        ["Inembargabilidad de patrimoniales afectados (art. 30.3)", "Tampoco pueden embargarse los patrimoniales materialmente afectados a un servicio o función pública o cuyos rendimientos estén afectados a fines determinados"],
        ["Deber de defensa (art. 28)", "Las Administraciones están obligadas a proteger y defender su patrimonio, procurar su inscripción registral y ejercer las potestades y acciones procedentes"],
        ["Prerrogativas (art. 41)", "Investigación, deslinde administrativo, recuperación de oficio de la posesión y desahucio administrativo de inmuebles demaniales"],
        ["Recuperación posesoria (art. 55)", "Demaniales: en cualquier tiempo; patrimoniales: notificando el inicio en el plazo de un año desde la usurpación (después, vía civil)"],
        ["Cuestiones civiles (art. 41.2)", "Las cuestiones de naturaleza civil que surjan al ejercer estas potestades corresponden a la jurisdicción civil"],
      ],
      preguntas: [
        ["facil", "Los bienes de dominio público son:", ["Inalienables, imprescriptibles e inembargables", "Enajenables previa subasta", "Prescriptibles a los treinta años", "Embargables por deudas tributarias"], "Art. 30.1 Ley 33/2003 y art. 132.1 CE."],
        ["media", "La Administración puede recuperar de oficio la posesión de un bien patrimonial usurpado si notifica el inicio del procedimiento antes de:", ["Un año desde el día siguiente a la usurpación", "Seis meses", "Cuatro años", "En cualquier momento"], "Art. 55.3 Ley 33/2003."],
        ["media", "La recuperación posesoria de un bien demanial puede ejercerse:", ["En cualquier tiempo", "Solo en el plazo de un año", "Solo con autorización judicial", "Nunca, hay que acudir a la vía civil"], "Art. 55.2 Ley 33/2003."],
        ["media", "¿Cuál de estas NO es una prerrogativa de la Administración para defender su patrimonio según el art. 41 de la Ley 33/2003?", ["La expropiación de bienes propios", "El deslinde", "La investigación", "El desahucio administrativo"], "Art. 41.1 Ley 33/2003."],
        ["dificil", "Un bien patrimonial que está materialmente afectado a un servicio público:", ["Tampoco puede ser embargado", "Puede embargarse libremente", "Es demanial por ese solo hecho", "Puede adquirirse por usucapión en un año"], "Art. 30.3 Ley 33/2003."],
        ["media", "Los bienes patrimoniales de la Administración:", ["Pueden adquirirse por terceros por prescripción, según el Código Civil", "Nunca prescriben", "Solo prescriben a favor de otra Administración", "Son siempre inembargables"], "Art. 30.2 Ley 33/2003."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Afectación (art. 86 TRLPA)", "Vincula un bien o derecho a un uso general o servicio público y lo integra en el dominio público"],
        ["Afectación expresa (art. 87.1 TRLPA)", "Salvo que derive de una ley, la acuerda el titular del departamento competente en patrimonio, indicando el bien, el fin, su integración en el demanio y el órgano que lo gestiona"],
        ["Afectación implícita o tácita (art. 87.2 TRLPA)", "Uso público notorio y continuado, usucapión con actos de uso público, expropiación, aprobación de planes o proyectos, adquisición de muebles para servicios y reparcelación"],
        ["Efectos de la orden de afectación (art. 89.2 TRLPA)", "Surte efectos desde la recepción de los bienes por el departamento destinatario, mediante acta"],
        ["Afectaciones concurrentes (art. 88 TRLPA)", "Un bien puede afectarse a varios usos o servicios compatibles, fijando las facultades de cada departamento"],
        ["Desafectación (art. 91 TRLPA)", "El bien deja de destinarse al uso o servicio público y pasa a dominio privado; salvo excepción legal, debe ser expresa"],
        ["Competencia de la desafectación (art. 92 TRLPA)", "La acuerda el titular del departamento de patrimonio (instruye la dirección general de patrimonio) y requiere recepción formal mediante acta"],
        ["Mutación demanial (art. 93 TRLPA)", "Desafectación con simultánea afectación a otro uso o servicio, de la propia Comunidad, de sus organismos o de otra Administración"],
        ["Mutación con cesión a otra Administración (arts. 93-94 TRLPA)", "La acuerda el Gobierno de Aragón; la cesionaria debe mantener el destino al menos 30 años (inmuebles); si incumple, el bien revierte"],
        ["Adscripción (art. 95 TRLPA)", "Vinculación de un bien a un organismo público, sociedad, fundación o consorcio sin cambiar la titularidad; si es a un organismo público, implica afectación"],
      ],
      preguntas: [
        ["media", "En la Administración de la Comunidad Autónoma de Aragón, la afectación expresa de un bien la acuerda:", ["El titular del departamento competente en materia de patrimonio", "El Gobierno de Aragón siempre", "El departamento que vaya a usar el bien", "El Presidente de Aragón"], "Arts. 87.1 y 89.1 TRLPA."],
        ["media", "¿Cuál de estos hechos produce los mismos efectos que una afectación expresa?", ["La adquisición del bien por expropiación forzosa", "Su inscripción en el Registro de la Propiedad", "Su arrendamiento a un particular", "Su inclusión en el Inventario"], "Art. 87.2.c) TRLPA."],
        ["media", "La desafectación supone que el bien:", ["Pierde la condición de dominio público y pasa a ser de dominio privado", "Pasa a ser comunal", "Se extingue", "Pasa a otra Administración"], "Art. 91.1 TRLPA."],
        ["dificil", "Si una mutación demanial implica transmitir la titularidad de un inmueble a un ayuntamiento, la acuerda:", ["El Gobierno de Aragón, y el ayuntamiento debe mantener el destino al menos treinta años", "El consejero de patrimonio, sin plazo", "El ayuntamiento", "El director general, con un plazo de diez años"], "Arts. 93.4 y 94.1 TRLPA."],
        ["media", "La desafectación de bienes muebles adquiridos por un departamento corresponde:", ["Al titular del propio departamento", "Al Gobierno de Aragón", "A la Cámara de Cuentas", "Al Consejo Consultivo"], "Art. 92.4 TRLPA."],
        ["media", "La adscripción de un bien a una sociedad mercantil autonómica:", ["No altera la titularidad del bien", "Transmite la propiedad a la sociedad", "Lo convierte en comunal", "Exige ley"], "Art. 95.2 TRLPA."],
        ["media", "Como regla general, la desafectación debe realizarse:", ["De forma expresa", "De forma tácita", "Por el mero desuso", "Por silencio administrativo"], "Art. 91.2 TRLPA."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Título habilitante (art. 84 Ley 33/2003 y art. 106 TRLPA)", "Nadie puede ocupar el dominio público ni usarlo más allá del uso que corresponde a todos sin título otorgado por el órgano competente"],
        ["Uso común (art. 85.1 Ley 33/2003 y art. 107.1 TRLPA)", "Corresponde por igual a toda la ciudadanía: el uso de unos no impide el de los demás; es libre"],
        ["Aprovechamiento especial (art. 107.2 TRLPA)", "Sin impedir el uso común, supone peligrosidad, intensidad, preferencia por escasez o rentabilidad singular"],
        ["Uso privativo (art. 107.3 TRLPA)", "Ocupación de una porción del dominio público que limita o excluye su uso por otros"],
        ["Autorización o concesión (art. 108.2 TRLPA)", "Aprovechamiento especial y uso privativo con instalaciones desmontables o muebles: autorización; si dura más de cuatro años, concesión"],
        ["Concesión obligatoria (art. 108.3 TRLPA)", "El uso privativo con obras o instalaciones fijas exige concesión administrativa"],
        ["Autorizaciones demaniales (art. 112 TRLPA)", "Directas salvo número limitado (concurrencia o sorteo); máximo 4 años con prórrogas; revocables por interés público sin indemnización"],
        ["Concesiones demaniales (art. 115 TRLPA)", "En régimen de concurrencia salvo excepciones; formalizadas en documento administrativo inscribible; máximo 75 años con prórrogas"],
        ["Competencia para otorgarlas (art. 116 TRLPA)", "Los titulares de los departamentos a los que estén afectados los bienes o los órganos rectores de los organismos públicos"],
        ["Concurrencia competitiva (art. 118 TRLPA)", "Convocatoria en el BOA y 30 días para peticiones; resolución en 6 meses; si no, se entiende desestimada"],
        ["Extinción (art. 119 TRLPA)", "Muerte o extinción del titular, vencimiento, rescate o revocación, mutuo acuerdo, impago o incumplimiento grave, desaparición del bien y desafectación, entre otras"],
        ["Efectos de la extinción de la concesión (art. 120 TRLPA)", "Las instalaciones fijas se demuelen a costa del concesionario salvo que se acuerde mantenerlas, que pasan gratis al patrimonio de Aragón; el rescate se indemniza"],
      ],
      preguntas: [
        ["media", "Pasear por un parque público es un ejemplo de:", ["Uso común", "Aprovechamiento especial", "Uso privativo", "Uso patrimonial"], "Art. 107.1 TRLPA."],
        ["media", "Instalar durante dos años un quiosco desmontable en un espacio demanial autonómico requiere:", ["Una autorización", "Una concesión", "Ningún título", "Una ley"], "Art. 108.2 TRLPA."],
        ["media", "Construir una instalación fija sobre dominio público autonómico requiere:", ["Una concesión administrativa", "Una autorización", "Una comunicación previa", "Un contrato menor"], "Art. 108.3 TRLPA."],
        ["media", "La duración máxima de una autorización demanial en Aragón, incluidas prórrogas, es de:", ["Cuatro años", "Setenta y cinco años", "Diez años", "Un año"], "Art. 112.3 TRLPA."],
        ["media", "El plazo máximo de una concesión demanial, incluidas prórrogas, salvo norma especial, es de:", ["Setenta y cinco años", "Noventa y nueve años", "Cuatro años", "Cincuenta años"], "Art. 115.4 TRLPA."],
        ["dificil", "Las autorizaciones demaniales pueden revocarse unilateralmente por razones de interés público:", ["En cualquier momento y sin derecho a indemnización, en los supuestos legales", "Solo al vencer el plazo", "Con indemnización en todo caso", "Nunca"], "Art. 112.4 TRLPA."],
        ["media", "En un procedimiento de concurrencia competitiva para otorgar una concesión, si no se notifica resolución en seis meses, la solicitud:", ["Puede entenderse desestimada", "Se entiende estimada", "Caduca", "Se prorroga"], "Art. 118.5 TRLPA."],
        ["media", "El rescate de una concesión antes de su vencimiento:", ["Da derecho a indemnización al concesionario", "No genera indemnización", "Requiere sentencia judicial", "Solo cabe si hay impago"], "Arts. 119.d) y 120.2 TRLPA."],
      ],
    },
  ],
  glosario: [
    [S1, "Demanio", "Conjunto de bienes de dominio público, destinados al uso general o a un servicio público o declarados así por una ley."],
    [S1, "Bien patrimonial", "Bien de la Administración que no es de dominio público y que gestiona con criterios de rentabilidad, de forma similar a un propietario privado."],
    [S2, "Inalienabilidad", "Imposibilidad de vender o transmitir un bien de dominio público mientras conserve esa condición."],
    [S2, "Imprescriptibilidad", "Imposibilidad de que un particular adquiera un bien de dominio público por haberlo poseído durante cierto tiempo."],
    [S2, "Deslinde", "Procedimiento por el que la Administración fija en vía administrativa los límites de un inmueble de su titularidad."],
    [S3, "Afectación", "Acto o hecho que destina un bien a un uso general o a un servicio público y lo incorpora al dominio público."],
    [S3, "Mutación demanial", "Cambio del destino público de un bien demanial a otro uso o servicio público, sin que deje de ser de dominio público."],
    [S4, "Concesión demanial", "Título que permite el uso privativo del dominio público durante un plazo largo, normalmente con obras o instalaciones fijas."],
    [S4, "Autorización demanial", "Título de corta duración (hasta cuatro años) para un aprovechamiento especial o un uso privativo con instalaciones desmontables."],
    [S4, "Rescate", "Extinción anticipada de una concesión por decisión de la Administración, con indemnización al concesionario."],
  ],
  casos: [
    {
      slug: "edificio-administrativo-vacio",
      titulo: "Un edificio que se queda vacío",
      supuesto: "Un departamento del Gobierno de Aragón traslada sus oficinas a una nueva sede. El antiguo edificio, de titularidad autonómica, queda sin uso. Otro departamento quiere instalar allí un servicio social y, más adelante, un ayuntamiento pide que se le ceda la propiedad para un centro cívico.",
      preguntas: [
        [S1, "media", "Mientras albergaba las oficinas, el edificio era:", ["Un bien de dominio público", "Un bien patrimonial", "Un bien comunal", "Un bien del Estado"], "Art. 4.c) TRLPA."],
        [S2, "media", "Por ello, mientras fue demanial, el edificio era:", ["Inalienable, imprescriptible e inembargable", "Enajenable por subasta", "Embargable por deudas de la Comunidad", "Usucapible por un ocupante"], "Art. 30.1 Ley 33/2003."],
        [S3, "media", "Para destinarlo directamente al servicio social de otro departamento, sin que deje de ser demanial, se utiliza:", ["La mutación demanial", "La desafectación", "La enajenación", "La adscripción a una sociedad"], "Art. 93.1 TRLPA."],
        [S3, "media", "Esa mutación entre departamentos de la Comunidad la acuerda:", ["El titular del departamento competente en materia de patrimonio", "El Gobierno de Aragón", "El departamento receptor", "El ayuntamiento"], "Art. 94.1 TRLPA."],
        [S3, "dificil", "Si después se cede la titularidad al ayuntamiento para el centro cívico, la mutación la acuerda:", ["El Gobierno de Aragón, mediante acuerdo", "El consejero de patrimonio", "El alcalde", "Las Cortes de Aragón"], "Art. 94.1 TRLPA."],
        [S3, "media", "El ayuntamiento deberá destinar el inmueble al uso previsto al menos durante:", ["Treinta años", "Diez años", "Setenta y cinco años", "Cuatro años"], "Art. 93.4 TRLPA."],
        [S3, "media", "Si el ayuntamiento incumple la finalidad:", ["El bien revierte al patrimonio de Aragón, con las indemnizaciones que procedan", "El ayuntamiento lo conserva", "Se subasta", "Pasa al Estado"], "Art. 93.5 TRLPA."],
        [S3, "media", "Si en lugar de reutilizarlo se decidiera venderlo, antes sería necesaria:", ["Su desafectación expresa, para que pase a dominio privado", "Una afectación tácita", "Una concesión", "Nada, puede venderse directamente"], "Arts. 91 TRLPA y 30 Ley 33/2003."],
        [S3, "media", "La desafectación será efectiva cuando:", ["El departamento de patrimonio reciba formalmente el bien mediante acta", "Se publique en el BOE", "Se inscriba en el Registro Mercantil", "Lo apruebe el Consejo Consultivo"], "Art. 92.2 TRLPA."],
        [S2, "media", "Si un tercero ocupara el edificio vacío siendo aún demanial, la Administración podría recuperar la posesión:", ["En cualquier tiempo", "Solo en el plazo de un año", "Solo ante el juez civil", "Nunca, por prescripción"], "Art. 55.2 Ley 33/2003."],
      ],
    },
    {
      slug: "cafeteria-hospital-concesion",
      titulo: "La cafetería de un centro público",
      supuesto: "Un organismo público autonómico quiere que una empresa explote durante quince años la cafetería de uno de sus centros, para lo que la empresa hará obras e instalará una barra fija. Además, en el patio, una asociación pide colocar durante un mes una carpa desmontable para una campaña solidaria.",
      preguntas: [
        [S4, "media", "La explotación de la cafetería con obras e instalaciones fijas exige:", ["Una concesión demanial", "Una autorización", "Un simple permiso verbal", "Ningún título"], "Art. 108.3 TRLPA."],
        [S4, "media", "Como regla general, la concesión se otorgará:", ["En régimen de concurrencia", "Directamente a la primera empresa que lo pida", "Por sorteo", "Por decisión del Justicia"], "Art. 115.2 TRLPA."],
        [S4, "media", "Si se inicia de oficio, la convocatoria se publicará en el Boletín Oficial de Aragón y los interesados tendrán para presentar peticiones:", ["Treinta días", "Diez días", "Dos meses", "Quince días hábiles"], "Art. 118.2 TRLPA."],
        [S4, "media", "Una vez otorgada, la concesión debe formalizarse en:", ["Documento administrativo, título suficiente para inscribirla en el Registro de la Propiedad", "Escritura pública obligatoria", "Contrato verbal", "El BOE"], "Art. 115.3 TRLPA."],
        [S4, "media", "¿Es posible un plazo de quince años?", ["Sí, el máximo de las concesiones es de setenta y cinco años incluidas prórrogas", "No, el máximo es de cuatro años", "No, el máximo es de diez años", "Solo con autorización de las Cortes"], "Art. 115.4 TRLPA."],
        [S4, "dificil", "Al terminar la concesión, la barra fija y las obras:", ["Se demolerán a costa del concesionario salvo que se acuerde mantenerlas, en cuyo caso pasan gratis al patrimonio de Aragón", "Pertenecerán siempre a la empresa", "Se pagarán a precio de mercado a la empresa", "Se subastarán"], "Art. 120.1 TRLPA."],
        [S4, "media", "La carpa desmontable durante un mes es un uso que requiere:", ["Una autorización", "Una concesión", "Una ley", "Nada, es uso común"], "Arts. 108.2 y 110.2 TRLPA."],
        [S4, "media", "La autorización a la asociación puede revocarse por razones de interés público:", ["Sin derecho a indemnización en los supuestos legales", "Con indemnización en todo caso", "Solo por sentencia", "Nunca"], "Art. 112.4 TRLPA."],
        [S4, "media", "Al solicitante de la autorización se le puede exigir:", ["Una garantía para responder de la reposición o reparación del bien", "El pago de la concesión completa", "Un aval de la Comunidad", "Nada"], "Art. 113 TRLPA."],
        [S4, "media", "¿Qué órgano otorga ambos títulos?", ["El órgano rector del organismo público que tiene el bien adscrito o en su patrimonio", "El Gobierno de Aragón en todo caso", "El ayuntamiento", "La Cámara de Cuentas"], "Art. 116 TRLPA."],
      ],
    },
    {
      slug: "camino-ocupado-recuperacion",
      titulo: "Un terreno ocupado sin permiso",
      supuesto: "Al inventariar sus bienes, el departamento competente detecta que un vecino ha vallado parte de una finca patrimonial autonómica hace diez meses, y que otro particular ocupa desde hace años una franja de un terreno destinado a un servicio público. Además, hay dudas sobre los límites exactos de ambas fincas.",
      preguntas: [
        [S2, "media", "Para aclarar los límites de las fincas, la Administración puede utilizar:", ["El deslinde administrativo", "El desahucio", "La expropiación", "La mutación demanial"], "Art. 41.1.b) Ley 33/2003."],
        [S2, "media", "Respecto de la finca patrimonial vallada hace diez meses, la Administración:", ["Puede recuperar de oficio la posesión si notifica el inicio antes del año desde la usurpación", "Debe acudir siempre a la vía civil", "No puede hacer nada", "Debe esperar a que el vecino la devuelva"], "Art. 55.3 Ley 33/2003."],
        [S2, "dificil", "Si hubiera pasado más de un año desde la usurpación de la finca patrimonial, la Administración:", ["Debería ejercitar las acciones ante la jurisdicción civil", "Podría recuperarla de oficio igualmente", "La perdería automáticamente", "Debería expropiarla"], "Art. 55.3 Ley 33/2003."],
        [S2, "media", "Respecto del terreno demanial ocupado desde hace años, la recuperación de oficio:", ["Puede ejercerse en cualquier tiempo", "Ya no es posible por el paso del tiempo", "Requiere sentencia", "Solo procede si el ocupante lo acepta"], "Art. 55.2 Ley 33/2003."],
        [S2, "media", "¿Puede el particular alegar que ha adquirido por usucapión el terreno demanial?", ["No, los bienes demaniales son imprescriptibles", "Sí, tras diez años", "Sí, tras treinta años", "Sí, si lo inscribió en el Registro"], "Art. 30.1 Ley 33/2003."],
        [S4, "media", "Nadie puede ocupar bienes de dominio público sin:", ["Título habilitante otorgado por el órgano competente", "Avisar al ayuntamiento", "Pagar un canon simbólico", "Permiso de los vecinos"], "Art. 106.1 TRLPA."],
        [S2, "media", "La obligación de la Administración de defender su patrimonio incluye:", ["Protegerlo, procurar su inscripción registral y ejercer las potestades y acciones procedentes", "Solo inscribirlo", "Solo asegurarlo", "Nada, es potestativo"], "Art. 28 Ley 33/2003."],
        [S2, "media", "Si en la recuperación surge una cuestión de propiedad de naturaleza civil, la conocerá:", ["La jurisdicción civil", "La jurisdicción contencioso-administrativa", "El Consejo Consultivo", "El propio departamento"], "Art. 41.2 Ley 33/2003."],
        [S1, "media", "El terreno destinado a un servicio público es:", ["De dominio público", "Patrimonial", "Comunal", "Privado del ocupante"], "Art. 4.a) TRLPA."],
        [S1, "media", "Los principios de gestión de la finca patrimonial incluyen:", ["Eficiencia, rentabilidad, publicidad y concurrencia", "Inalienabilidad absoluta", "Uso común preferente", "Gratuidad"], "Art. 8 Ley 33/2003."],
      ],
    },
  ],
});
