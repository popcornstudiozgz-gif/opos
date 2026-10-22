/**
 * Crea tema-361 — Tema 34 de Policía Local: "Reglamento de Armas:
 * clasificación de las armas reglamentarias, armas prohibidas. Guías de
 * pertenencia, licencias, tarjetas y autorizaciones especiales.
 * Disposiciones sobre tenencia y uso de armas. Régimen sancionador."
 *
 * Fuente: Real Decreto 137/1993, de 29 de enero, por el que se aprueba el
 * Reglamento de Armas (BOE-A-1993-6202, título verificado; vigente según
 * los metadatos de la API de legislación consolidada), texto consolidado
 * leído en los arts. 3 a 5 (clasificación y prohibidas), 88 a 119 (guías,
 * revista, cesión, titularidad, licencias, tarjetas, menores y personal de
 * las FCS), 144 a 149 (tenencia y uso) y 155 a 171 (régimen sancionador y
 * armas depositadas). Se usa la redacción del RD 726/2020 (vigente desde
 * el 5-11-2020); el BOE intercala la anterior como nota y no se usa.
 * El régimen sancionador del Reglamento (arts. 155-164) sigue remitiendo a
 * la LO 1/1992, sustituida por la LO 4/2015 (que tipifica hoy las
 * infracciones sobre armas en sus arts. 35.2, 36.10, 36.12 y 37.8); se
 * señala esa remisión sin reinterpretar las cuantías del Reglamento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-361-reglamento-armas.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const RA = "https://www.boe.es/buscar/act.php?id=BOE-A-1993-6202";
const a = (ancla) => `${RA}#${ancla}`;
const S1 = "clasificacion-armas";
const S2 = "armas-prohibidas";
const S3 = "guias-licencias-tarjetas";
const S4 = "tenencia-uso";
const S5 = "regimen-sancionador-depositos";

await sembrarTema({
  tema: {
    slug: "tema-361",
    titulo: "Reglamento de Armas (RD 137/1993): clasificación, armas prohibidas, documentación, tenencia, uso y régimen sancionador",
    descripcion: "Las nueve categorías de armas reglamentadas; armas prohibidas en todo caso (art. 4) y prohibidas salvo para funcionarios habilitados (art. 5): cargadores de gran capacidad, cañones recortados, sprays, defensas eléctricas y extensibles, silenciadores, munición perforante o expansiva, navajas de más de 11 cm e imitaciones; guías de pertenencia y revista cada cinco años; cesión temporal y cambio de titularidad; licencias A, B, C, D, E y F; tarjetas de armas A y B que conceden los alcaldes; armas blancas; autorización especial para menores; licencia A del personal de las Policías Locales; obligaciones de custodia y presentación; prohibiciones de portar y usar; ocupación de armas por los agentes; régimen sancionador, retirada de armas y licencias, y depósito de armas decomisadas en la Guardia Civil.",
    contenido: "Recorre el Reglamento de Armas con la mirada del agente de Policía Local: cómo se clasifican las armas (cortas, largas, de aire comprimido, blancas, antiguas…), qué armas están prohibidas (navajas automáticas, puñales, llaves de pugilato, defensas extensibles, sprays…), qué documentación ampara cada arma (guía de pertenencia, licencias, tarjetas que expide el Ayuntamiento), qué licencia tienen los propios policías locales, dónde y cómo se pueden llevar armas, qué hace el agente cuando las interviene y qué sanciones prevé el Reglamento.",
    enlaces_boe: [{ url: RA, titulo: "Real Decreto 137/1993, de 29 de enero, por el que se aprueba el Reglamento de Armas (BOE-A-1993-6202)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Clasificación de las armas reglamentadas", articulos: "art. 3", url: a("a3") },
      { seccion: S2, titulo: "Armas prohibidas", articulos: "arts. 4-5", url: a("a4") },
      { seccion: S3, titulo: "Guías de pertenencia, revista, licencias, tarjetas y autorizaciones especiales", articulos: "arts. 88-119", url: a("a88") },
      { seccion: S4, titulo: "Disposiciones generales sobre tenencia y uso", articulos: "arts. 144-149", url: a("a144") },
      { seccion: S5, titulo: "Régimen sancionador y armas depositadas y decomisadas", articulos: "arts. 155-171", url: a("a155") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 34 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["1.ª categoría (art. 3)", "Armas de fuego cortas: pistolas y revólveres"],
        ["2.ª categoría", "1. Armas de fuego largas para vigilancia y guardería; 2. Armas de fuego largas rayadas para caza mayor"],
        ["3.ª categoría", "1. Largas rayadas deportivas de calibre 5,6 mm (.22) de percusión anular; 2. Escopetas y armas largas de ánima lisa; 3. Armas de aire o gas comprimido con energía en boca superior a 24,2 julios"],
        ["4.ª categoría", "Carabinas y pistolas de aire o gas comprimido no asimiladas a escopetas: 1. semiautomáticas, de repetición y revólveres de doble acción; 2. de un solo tiro y revólveres de acción simple"],
        ["5.ª categoría", "Armas blancas y de hoja cortante o punzante no prohibidas, y cuchillos o machetes militares o sus imitaciones"],
        ["6.ª categoría", "Armas de fuego antiguas o históricas, anteriores a 1890, artísticas y, en general, las de avancarga"],
        ["7.ª categoría", "Armas de inyección anestésica, ballestas, lanzacabos, sistema Flobert, arcos y fusiles de pesca submarina, y armas de alarma y señales y lanzabengalas"],
        ["8.ª y 9.ª categorías", "8.ª: armas acústicas y de salvas. 9.ª: armas inutilizadas"],
      ],
      preguntas: [
        ["facil", "Las pistolas y revólveres pertenecen a la…", ["1.ª categoría", "2.ª categoría", "4.ª categoría"], "Art. 3, 1.ª categoría."],
        ["media", "Las escopetas de caza (armas largas de ánima lisa) pertenecen a la…", ["3.ª categoría", "2.ª categoría", "5.ª categoría"], "Art. 3, 3.ª categoría, 2."],
        ["media", "Las armas blancas no prohibidas pertenecen a la…", ["5.ª categoría", "7.ª categoría", "6.ª categoría"], "Art. 3, 5.ª categoría."],
        ["media", "Las ballestas y los arcos se incluyen en la…", ["7.ª categoría", "5.ª categoría", "3.ª categoría"], "Art. 3, 7.ª categoría."],
        ["dificil", "Un arma de aire comprimido cuya energía en boca supera los 24,2 julios pertenece a la…", ["3.ª categoría", "4.ª categoría", "7.ª categoría"], "Art. 3, 3.ª categoría, 3."],
        ["media", "Las armas acústicas y de salvas constituyen la…", ["8.ª categoría", "9.ª categoría", "6.ª categoría"], "Art. 3, 8.ª categoría."],
        ["media", "Las armas largas rayadas utilizables para caza mayor pertenecen a la…", ["2.ª categoría", "1.ª categoría", "3.ª categoría"], "Art. 3, 2.ª categoría, 2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Prohibidas en todo caso (art. 4.1) I", "Armas de fabricación ilícita o modificadas sin autorización; armas largas que alojen pistolas; pistolas y revólveres con culatín; armas de fuego en bastones u otros objetos o simuladas"],
        ["Prohibidas en todo caso (art. 4.1) II", "Bastones-estoque, puñales (hoja de menos de 11 cm, dos filos y puntiaguda) y navajas automáticas; armas de fuego o aire combinadas con blancas; defensas de alambre o plomo, rompecabezas, llaves de pugilato, tiragomas y cerbatanas perfeccionados, munchacos y xiriquetes"],
        ["Excepción del art. 4.2", "No está prohibida su tenencia por museos, coleccionistas u organismos autorizados conforme al art. 107"],
        ["Prohibidas salvo funcionarios habilitados (art. 5.1) I", "Armas cortas semiautomáticas de percusión central con más de 21 cartuchos y largas con más de 11; cañones recortados; automáticas transformadas en semiautomáticas; cargadores de más de 20 (cortas) o 10 (largas) cartuchos; largas que se reducen a menos de 60 cm"],
        ["Prohibidas salvo funcionarios habilitados (art. 5.1) II", "Sprays de defensa personal y armas que despidan gases o aerosoles (salvo los aprobados por Sanidad); defensas eléctricas, de goma o extensibles y tonfas; silenciadores; munición perforante, explosiva, incendiaria, dum-dum o de punta hueca"],
        ["Imitaciones de armas de fuego (art. 5.2)", "Prohibida su tenencia salvo en el domicilio como adorno o colección, excepto los modelos aprobados por la Guardia Civil"],
        ["Navajas no automáticas (art. 5.3)", "Prohibido comercializar, tener y usar las de hoja superior a 11 cm, salvo su tenencia en el domicilio con fines de ornato y coleccionismo"],
      ],
      preguntas: [
        ["media", "¿Está prohibida la navaja automática?", ["Sí, en todo caso", "No", "Solo si mide más de 11 cm"], "Art. 4.1.f)."],
        ["media", "A efectos del Reglamento, se considera puñal el arma blanca de hoja…", ["Menor de 11 cm, de dos filos y puntiaguda", "Mayor de 20 cm", "De un solo filo y roma"], "Art. 4.1.f)."],
        ["media", "Las llaves de pugilato (puño americano) son…", ["Armas prohibidas", "Armas de 5.ª categoría permitidas", "Objetos de libre tenencia"], "Art. 4.1.h)."],
        ["media", "Las defensas extensibles y las tonfas…", ["Están prohibidas salvo para funcionarios especialmente habilitados", "Son de libre uso", "Solo requieren tarjeta municipal"], "Art. 5.1.j)."],
        ["dificil", "¿Puede un particular tener en su domicilio una navaja no automática de hoja superior a 11 cm?", ["Sí, exclusivamente en el domicilio con fines de ornato y coleccionismo", "No, nunca", "Sí, y llevarla por la calle"], "Art. 5.3, párrafo tercero."],
        ["media", "Los silenciadores adaptables a armas de fuego…", ["Están prohibidos salvo para funcionarios especialmente habilitados", "Son de libre venta", "Solo requieren licencia E"], "Art. 5.1.k)."],
        ["dificil", "¿Pueden venderse sprays de defensa personal?", ["Solo los aprobados por el Ministerio de Sanidad, en armerías y a mayores de edad", "Nunca", "Sí, libremente en cualquier tienda"], "Art. 5.1.i), párrafo segundo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Guía de pertenencia (art. 88)", "Documenta cada arma de las categorías 1.ª, 2.ª, 3.ª, 6.ª, 7.ª (1 a 4) y 8.ª; la expiden las Intervenciones de Armas y debe acompañar al arma en su uso, depósito y transporte"],
        ["Revista de armas (art. 90)", "Cada cinco años, al renovar la licencia; no pasar dos revistas consecutivas anula la guía y obliga a depositar el arma"],
        ["Cesión temporal (art. 91)", "Las armas de caza pueden prestarse con autorización escrita a quien tenga licencia de caza y de armas, hasta quince días y solo para cazar"],
        ["Fallecimiento del titular (art. 93)", "Los herederos depositan las armas (en seis meses como máximo); quedan un año a su disposición para adquirirlas, enajenarlas o inutilizarlas"],
        ["Clases de licencias (art. 96)", "A: personal de las FCS, Fuerzas Armadas y SVA; B: armas cortas de particulares; C: armas de dotación de vigilantes; D: armas largas rayadas de caza mayor; E: escopetas y armas de 3.ª y 7.ª (2 y 3); F: tiro deportivo federado"],
        ["Licencia B (art. 99)", "Restrictiva, solo ante riesgo especial y necesidad (la defensa de personas o bienes por sí sola no basta); la concede la Dirección General de la Guardia Civil; cinco años; una licencia y un arma"],
        ["Licencias D y E (arts. 100-101)", "D: hasta cinco armas de caza mayor; E: hasta seis escopetas o seis rifles deportivos y doce armas en total; ambas cinco años, las concede el Jefe de la Comandancia de la Guardia Civil"],
        ["Tarjetas de armas (art. 105)", "Para llevar armas de 4.ª categoría fuera del domicilio; las conceden los alcaldes y valen solo en el término municipal; tarjeta A (4.ª,1: hasta seis armas, cinco años, desde 14 años) y tarjeta B (4.ª,2: ilimitadas, permanente)"],
        ["Armas blancas (art. 106)", "La adquisición y tenencia de las de 5.ª categoría, 1, es libre para mayores de edad"],
        ["Menores (art. 109)", "De 16 a 18 años pueden usar armas largas de caza mayor y de 14 a 18 escopetas para caza o tiro, con autorización especial y supervisión de un adulto con licencia"],
        ["Licencia A de los policías locales (arts. 114-115)", "Su carné profesional, estando en activo, se considera licencia A; la guía de pertenencia la expide la Dirección General de la Guardia Civil y se marca con «PL»"],
        ["Armas cortas particulares de policías locales (art. 118.2)", "Solo pueden poseer un arma corta, aparte de las de dotación reglamentaria"],
      ],
      preguntas: [
        ["media", "¿Cada cuánto deben pasar revista las armas con guía de pertenencia?", ["Cada cinco años", "Cada año", "Cada diez años"], "Art. 90.1."],
        ["media", "¿Quién concede las tarjetas de armas para las armas de 4.ª categoría?", ["El alcalde del municipio de residencia", "La Guardia Civil", "El Delegado del Gobierno"], "Art. 105.1."],
        ["media", "La licencia de armas B se concede…", ["Con carácter restrictivo, solo ante riesgo especial y necesidad", "A cualquier mayor de edad que la pida", "A los cazadores"], "Art. 99.2."],
        ["media", "El carné profesional de un policía local en activo se considera…", ["Licencia A", "Licencia B", "Tarjeta de armas"], "Art. 114.1.d)."],
        ["dificil", "¿Cuántas armas cortas particulares puede poseer un policía local, aparte de las de dotación?", ["Una", "Tres", "Ninguna"], "Art. 118.2."],
        ["media", "La validez territorial de las tarjetas de armas se limita…", ["Al término municipal respectivo", "A la provincia", "A todo el territorio nacional"], "Art. 105.1."],
        ["dificil", "¿Desde qué edad puede solicitarse la tarjeta A de armas?", ["Catorce años", "Dieciséis años", "Dieciocho años"], "Art. 105.4."],
        ["media", "No pasar dos revistas consecutivas supone…", ["La anulación y retirada de la guía de pertenencia y el depósito del arma", "Una simple advertencia", "Nada"], "Art. 90.5."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Obligaciones de los poseedores (art. 144.1)", "Guardar las armas en lugar seguro, presentarlas a la autoridad o sus agentes cuando lo requieran, declarar inmediatamente su pérdida o robo, que armas y munición no sean accesibles conjuntamente, y supervisarlas en transporte y uso"],
        ["Pérdida o robo (art. 145)", "Dar cuenta inmediata a la Intervención de Armas con entrega de la guía; si no hay responsabilidad, se conserva la licencia"],
        ["Prohibición de portar (art. 146.1)", "Prohibido portar, exhibir y usar fuera del domicilio, del trabajo o de las actividades deportivas armas de fuego cortas y armas blancas, especialmente las de hoja puntiaguda, y en general las de 5.ª, 6.ª y 7.ª categorías"],
        ["Lugares públicos (art. 146.2)", "Se estima ilícito llevar armas en establecimientos públicos y lugares de reunión, concentración, recreo o esparcimiento"],
        ["Uso prohibido (art. 147.2)", "Portar, exhibir o usar armas sin necesidad o de modo negligente o temerario, con auriculares conectados o bajo los efectos del alcohol o drogas"],
        ["Facultades de los agentes (art. 148)", "Comprobaciones en vías y lugares públicos y ocupación temporal de las armas, incluso con licencia, para prevenir delitos o por seguridad, dando cuenta a la Intervención de Armas"],
        ["Transporte por vía urbana (art. 149.1)", "Solo desmontadas o en sus cajas o fundas, durante el trayecto entre el lugar de guarda y el de uso autorizado"],
        ["Espacios para armas de aire comprimido (art. 149.5)", "Los alcaldes pueden autorizar espacios para usar armas de aire comprimido de 4.ª categoría"],
      ],
      preguntas: [
        ["media", "Una persona lleva un cuchillo de hoja puntiaguda por la calle sin motivo. Según el art. 146…", ["Está prohibido portarlo fuera del domicilio, trabajo o actividades deportivas", "Es libre", "Solo está prohibido de noche"], "Art. 146.1."],
        ["media", "¿Pueden los agentes ocupar temporalmente un arma que se porta con licencia?", ["Sí, para prevenir delitos o garantizar la seguridad", "No, nunca", "Solo con orden judicial"], "Art. 148.2."],
        ["media", "Las armas solo pueden llevarse por vías urbanas…", ["Desmontadas o en sus fundas durante el trayecto al lugar de uso autorizado", "Cargadas y a la vista", "En cualquier caso con licencia"], "Art. 149.1."],
        ["media", "¿Está prohibido usar armas bajo los efectos de bebidas alcohólicas?", ["Sí", "No", "Solo en la caza"], "Art. 147.2.c)."],
        ["dificil", "¿Quién puede autorizar espacios para el uso de armas de aire comprimido de 4.ª categoría?", ["Los alcaldes", "El Ministerio de Defensa", "Las federaciones"], "Art. 149.5."],
        ["media", "Los poseedores deben presentar sus armas a las autoridades o sus agentes…", ["Siempre que se lo requieran", "Solo una vez al año", "Nunca"], "Art. 144.1.b)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Muy graves (art. 155)", "Si no son delito: fabricar o comerciar sin habilitación armas prohibidas o de guerra; usar armas de fuego prohibidas; usar armas cortas sin licencia, autorización o guía; graves fallos de seguridad en fabricación y comercio"],
        ["Algunas graves (art. 156)", "Tener armas sin licencia; usar armas reglamentadas sin licencia o guía; portar armas en establecimientos públicos y lugares de reunión; usarlas sin precauciones o contra el art. 146; tener cargadores de gran capacidad"],
        ["Algunas leves (art. 157)", "Infracciones con armas de 4.ª a 7.ª categoría; omitir revistas, depósitos o exhibición a los agentes; no denunciar la pérdida o robo de armas o de su documentación; otras contravenciones"],
        ["Retirada de armas y licencias (art. 158)", "Desposesión y prohibición de adquirir otras, o revocación de la licencia, por un máximo de dos años, comunicándolo al Registro Nacional de Armas"],
        ["Competencia de los alcaldes (art. 159.1)", "Sancionar las infracciones leves relacionadas con las tarjetas de armas (art. 105) y los espacios de aire comprimido (art. 149.5)"],
        ["Miembros de las FCS (art. 160)", "Sus infracciones con las armas en el ejercicio de sus funciones se sancionan conforme a su régimen disciplinario"],
        ["Si hay delito (art. 161)", "Se remiten los antecedentes al Ministerio Fiscal"],
        ["Armas decomisadas por agentes (art. 166)", "Toda autoridad o agente que decomise o intervenga armas debe dar cuenta a la Guardia Civil y depositarlas en su Intervención de Armas; si se aportan a un proceso penal, rige la LECrim"],
        ["Remisión legal", "El régimen sancionador del Reglamento remite a la LO 1/1992, sustituida por la LO 4/2015, que tipifica hoy las infracciones sobre armas"],
      ],
      preguntas: [
        ["media", "El agente de Policía Local que interviene un arma de fuego debe…", ["Dar cuenta a la Guardia Civil y depositarla en su Intervención de Armas", "Guardarla en el Ayuntamiento indefinidamente", "Devolverla al día siguiente"], "Art. 166.1."],
        ["media", "Usar armas de fuego cortas careciendo de licencia, autorización o guía, si no es delito, es infracción…", ["Muy grave", "Grave", "Leve"], "Art. 155.c)."],
        ["media", "Portar armas en establecimientos públicos y lugares de reunión, salvo los habilitados, es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 156.i)."],
        ["media", "No dar cuenta a la Guardia Civil del robo de un arma es infracción…", ["Leve", "Grave", "Muy grave"], "Art. 157.c)."],
        ["dificil", "¿Qué infracciones del Reglamento pueden sancionar los alcaldes?", ["Las leves relacionadas con las tarjetas de armas y los espacios de aire comprimido", "Todas las graves", "Ninguna"], "Art. 159.1."],
        ["media", "La retirada de armas o licencias como sanción no puede exceder de…", ["Dos años", "Cinco años", "Seis meses"], "Art. 158."],
        ["media", "Las infracciones de un policía local con su arma en el ejercicio de sus funciones se sancionan…", ["Conforme a su régimen disciplinario", "Por la Guardia Civil", "Por el Ministerio de Defensa"], "Art. 160."],
      ],
    },
  ],
  glosario: [
    [S1, "Arma reglamentada", "Arma cuya adquisición, tenencia y uso pueden autorizarse conforme al Reglamento (art. 3)."],
    [S1, "Ánima lisa", "Cañón sin estrías, propio de las escopetas."],
    [S2, "Arma prohibida", "Arma cuya fabricación, comercio, tenencia y uso están vedados (arts. 4 y 5)."],
    [S2, "Puñal", "Arma blanca de hoja de menos de 11 cm, de dos filos y puntiaguda; prohibida."],
    [S3, "Guía de pertenencia", "Documento que identifica cada arma y a su titular y la acompaña siempre."],
    [S3, "Tarjeta de armas", "Documento municipal para llevar armas de 4.ª categoría fuera del domicilio."],
    [S3, "Revista de armas", "Presentación periódica del arma (cada cinco años) ante la Intervención de Armas."],
    [S4, "Intervención de Armas", "Unidad de la Guardia Civil que controla armas y explosivos."],
    [S5, "Retirada de armas", "Desposesión del arma y prohibición de adquirir otras por un plazo de hasta dos años."],
  ],
  casos: [
    {
      slug: "caso-navaja-puno-americano-salida-bar",
      titulo: "Armas en un control a la salida de un bar",
      supuesto: "En un control de seguridad a la salida de una zona de bares, los agentes encuentran a un joven con una navaja automática y unas llaves de pugilato, a otro con una navaja de hoja de 9 cm y a un tercero con un spray de pimienta comprado por internet sin marcado de aprobación.",
      preguntas: [
        [S2, "media", "La navaja automática es…", ["Un arma prohibida en todo caso", "Un arma de 5.ª categoría permitida", "Un objeto de libre tenencia"], "Art. 4.1.f)."],
        [S2, "media", "Las llaves de pugilato son…", ["Un arma prohibida", "Un adorno permitido", "Un arma de 7.ª categoría"], "Art. 4.1.h)."],
        [S1, "media", "La navaja no automática de 9 cm es, en principio, un arma de la…", ["5.ª categoría", "1.ª categoría", "8.ª categoría"], "Art. 3, 5.ª categoría."],
        [S4, "media", "Aunque no esté prohibida, ¿puede llevarse esa navaja en lugares de reunión o recreo?", ["No, se estima ilícito portarla en esos lugares", "Sí, siempre", "Solo de día"], "Art. 146.2."],
        [S2, "media", "El spray de pimienta no aprobado por Sanidad…", ["Está prohibido salvo para funcionarios habilitados", "Es de libre uso", "Requiere tarjeta municipal"], "Art. 5.1.i)."],
        [S4, "media", "Los agentes pueden…", ["Ocupar temporalmente los objetos y armas para prevenir delitos", "Solo advertir verbalmente", "Nada sin orden judicial"], "Art. 148.2."],
        [S5, "media", "Las armas intervenidas deben…", ["Depositarse en la Intervención de Armas de la Guardia Civil, dando cuenta a esta", "Destruirse en el acto por los agentes", "Devolverse al salir del control"], "Art. 166.1."],
        [S5, "dificil", "Si hubiera indicios de delito, ¿qué se hace con los antecedentes?", ["Se remiten al Ministerio Fiscal", "Se archivan", "Se entregan al bar"], "Art. 161."],
        [S2, "dificil", "¿Se considera puñal la navaja de 9 cm si es de un solo filo?", ["No: el puñal exige hoja de menos de 11 cm, de dos filos y puntiaguda", "Sí, siempre", "Solo si es automática"], "Art. 4.1.f)."],
        [S5, "media", "Portar armas en un lugar de recreo, si no es delito, es según el Reglamento infracción…", ["Grave", "Leve", "Muy grave"], "Art. 156.i)."],
      ],
    },
    {
      slug: "caso-escopeta-coche-cazador",
      titulo: "Un cazador en el control",
      supuesto: "En un control en una salida de Zaragoza, un cazador lleva en el maletero su escopeta montada y cargada junto a la munición. Muestra su licencia E pero ha olvidado la guía de pertenencia en casa. Además, ha prestado a un amigo su otra escopeta para una cacería que dura tres semanas.",
      preguntas: [
        [S1, "media", "La escopeta de caza pertenece a la…", ["3.ª categoría", "2.ª categoría", "1.ª categoría"], "Art. 3, 3.ª categoría, 2."],
        [S3, "media", "¿Qué licencia ampara las escopetas?", ["La licencia E", "La licencia B", "La tarjeta A"], "Art. 96.4.d) y 101."],
        [S3, "media", "¿Debe la guía de pertenencia acompañar siempre al arma en el transporte?", ["Sí", "No", "Solo en cacerías"], "Art. 89.2."],
        [S4, "media", "¿Cómo deben transportarse las armas por vías urbanas?", ["Desmontadas o en sus cajas o fundas", "Montadas y cargadas", "Indiferentemente"], "Art. 149.1."],
        [S4, "media", "Llevar el arma cargada y accesible junto a la munición vulnera la obligación de…", ["Que armas y municiones no sean fácilmente accesibles conjuntamente y la adecuada supervisión", "Pasar revista", "Tener seguro de caza"], "Art. 144.1.d) y e)."],
        [S3, "dificil", "El préstamo de un arma de caza a otro cazador con licencia puede hacerse como máximo…", ["Durante quince días y con autorización escrita", "Sin límite de tiempo", "Solo un día"], "Art. 91.1."],
        [S3, "media", "Una licencia E permite tener como máximo…", ["Seis escopetas y doce armas en total", "Una escopeta", "Veinte armas"], "Art. 101.1."],
        [S4, "media", "¿Pueden los agentes ocupar temporalmente la escopeta?", ["Sí, si es necesario para la seguridad o prevenir delitos", "No", "Solo la Guardia Civil"], "Art. 148.2."],
        [S5, "media", "Usar armas con omisión de las medidas de seguridad obligatorias, según el Reglamento, es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 156.h)."],
        [S3, "media", "¿Cada cuántos años es válida la licencia E?", ["Cinco años", "Diez años", "Un año"], "Art. 101.2."],
      ],
    },
    {
      slug: "caso-carabina-aire-comprimido-parque",
      titulo: "Una carabina de aire comprimido en un parque",
      supuesto: "Unos vecinos avisan de que un chico de 15 años dispara con una carabina de aire comprimido de un solo tiro contra latas en un parque público. Su padre muestra una tarjeta de armas expedida por el Ayuntamiento de otro municipio. La carabina no supera los 24,2 julios.",
      preguntas: [
        [S1, "media", "Una carabina de aire comprimido de un solo tiro, no asimilada a escopeta, es de la…", ["4.ª categoría", "3.ª categoría", "7.ª categoría"], "Art. 3, 4.ª categoría, 2."],
        [S3, "media", "Para llevarla y usarla fuera del domicilio se necesita…", ["Tarjeta de armas", "Licencia B", "Nada"], "Arts. 96.6 y 105."],
        [S3, "media", "La tarjeta expedida por el alcalde de otro municipio…", ["Solo es válida en su término municipal", "Vale en toda España", "Vale en toda la provincia"], "Art. 105.1."],
        [S4, "media", "¿Puede usarse en un parque público?", ["No: solo en espacios autorizados por los alcaldes o lugares habilitados", "Sí, libremente", "Sí, si hay pocos vecinos"], "Arts. 149.2 y 149.5."],
        [S3, "dificil", "Las armas de 4.ª categoría, 2 (un solo tiro) se documentan con…", ["Tarjeta B, de validez permanente", "Tarjeta A, de cinco años", "Licencia F"], "Art. 105.2."],
        [S4, "media", "Usar armas sin necesidad o de modo temerario cerca de personas…", ["Está prohibido", "Está permitido", "Solo requiere aviso"], "Art. 147.2.a)."],
        [S5, "media", "¿Quién podría sancionar una infracción leve relativa a la tarjeta de armas?", ["El alcalde", "El Ministro de Defensa", "Nadie"], "Art. 159.1."],
        [S4, "media", "Los agentes pueden…", ["Ocupar temporalmente la carabina", "Romperla en el acto", "No intervenir"], "Art. 148.2."],
        [S3, "media", "¿Quién concede y retira las tarjetas de armas?", ["Los alcaldes", "La Guardia Civil", "El juez"], "Art. 105.1."],
        [S5, "media", "Si la carabina tuviera más de 24,2 julios, sería un arma de 3.ª categoría que requeriría…", ["Licencia E y guía de pertenencia", "Solo tarjeta municipal", "Nada"], "Arts. 3, 88 y 96.4.d)."],
      ],
    },
  ],
});
