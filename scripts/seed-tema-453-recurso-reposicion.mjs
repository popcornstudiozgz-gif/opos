/**
 * Crea tema-453 — Tema 31 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XXIII): recursos administrativos. Recurso
 * potestativo de reposición."
 *
 * Fuentes leídas íntegras en la sesión:
 * - Ley 39/2015 (BOE-A-2015-10565), Título V, Capítulo II, Sección 3.ª, arts.
 *   123 y 124 (content-raw/ley-39-2015-procedimiento-administrativo;
 *   consolidado del BOE actualizado a 06-11-2024).
 * - Ley 7/1985 (BOE-A-1985-5392), art. 52.1 y 2: reposición potestativa
 *   contra los actos locales que ponen fin a la vía administrativa.
 * - Bases específicas de la CONV 5.2bis/2025 (bases1739.pdf), base sexta:
 *   ejemplo real de pie de recursos municipal (reposición en un mes o
 *   contencioso en dos meses).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-453-recurso-reposicion.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const LBRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392";
const S1 = "reposicion-objeto-naturaleza";
const S2 = "reposicion-plazos";

await sembrarTema({
  tema: {
    slug: "tema-453",
    titulo: "El recurso potestativo de reposición",
    descripcion: "Ley 39/2015, Título V, Capítulo II, Sección 3.ª (arts. 123 y 124): objeto (actos que ponen fin a la vía administrativa) y carácter potestativo frente al recurso contencioso-administrativo directo; órgano que lo resuelve (el mismo que dictó el acto); prohibición de acudir al contencioso mientras no se resuelva o se desestime presuntamente; plazo de un mes contra actos expresos y en cualquier momento contra presuntos; plazo de resolución de un mes; imposibilidad de una segunda reposición. Aplicación a las entidades locales (art. 52 LBRL).",
    contenido: "El recurso de reposición se dirige contra los actos que ponen fin a la vía administrativa (en un ayuntamiento, por ejemplo, los del Alcalde, el Pleno o la Junta de Gobierno) y lo resuelve el mismo órgano que dictó el acto. Es potestativo: el interesado puede elegir entre presentarlo o acudir directamente al juzgado, pero si lo presenta no puede ir al contencioso hasta que se resuelva o se entienda desestimado. El plazo es de un mes si el acto es expreso; si es presunto, puede interponerse en cualquier momento desde que se produce. La Administración tiene un mes para resolver y notificar, y contra la resolución no cabe otra reposición.",
    enlaces_boe: [
      { url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" },
      { url: LBRL, titulo: "Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local (BOE-A-1985-5392), art. 52" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Objeto y naturaleza del recurso de reposición", articulos: "art. 123 Ley 39/2015; art. 52 LBRL", url: `${L}#a123` },
      { seccion: S2, titulo: "Plazos del recurso de reposición", articulos: "art. 124", url: `${L}#a124` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 31 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto del recurso de reposición (art. 123.1)", "Los actos administrativos que pongan fin a la vía administrativa"],
        ["Órgano que resuelve la reposición (art. 123.1)", "El mismo órgano que dictó el acto"],
        ["Carácter potestativo (art. 123.1)", "El interesado puede interponer reposición o impugnar directamente ante el orden contencioso-administrativo"],
        ["Reposición y contencioso (art. 123.2)", "Interpuesta la reposición, no puede acudirse al contencioso hasta que se resuelva expresamente o se produzca su desestimación presunta"],
        ["Reposición en las entidades locales (art. 52.1 LBRL)", "Contra los actos y acuerdos que ponen fin a la vía administrativa cabe, con carácter previo y potestativo, recurso de reposición antes de la vía judicial"],
      ],
      preguntas: [
        ["facil", "El recurso de reposición se interpone contra los actos administrativos que:", ["Pongan fin a la vía administrativa", "No pongan fin a la vía administrativa", "Sean de trámite no cualificados"], "Art. 123.1 Ley 39/2015."],
        ["media", "El recurso de reposición se interpone ante:", ["El mismo órgano que dictó el acto", "El superior jerárquico", "El juzgado"], "Art. 123.1 Ley 39/2015."],
        ["media", "El carácter potestativo del recurso de reposición significa que el interesado:", ["Puede interponerlo o acudir directamente a la vía contencioso-administrativa", "Debe interponerlo siempre antes del contencioso", "No puede interponerlo si hay alzada"], "Art. 123.1 Ley 39/2015."],
        ["media", "Si se interpone recurso de reposición, el recurso contencioso-administrativo:", ["No puede interponerse hasta que se resuelva expresamente o se desestime presuntamente la reposición", "Puede interponerse a la vez", "Ya no puede interponerse nunca"], "Art. 123.2 Ley 39/2015."],
        ["dificil", "En el Ayuntamiento, contra un acuerdo de la Junta de Gobierno que pone fin a la vía administrativa cabe:", ["Recurso potestativo de reposición o recurso contencioso-administrativo", "Recurso de alzada ante el Pleno", "Recurso de alzada ante el Gobierno de Aragón"], "Art. 52.1 y 2 Ley 7/1985; art. 123 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Plazo de reposición contra actos expresos (art. 124.1)", "Un mes"],
        ["Pasado el mes sin recurrir en reposición (art. 124.1)", "Solo cabe recurso contencioso-administrativo, sin perjuicio del extraordinario de revisión"],
        ["Plazo contra actos presuntos (art. 124.1)", "En cualquier momento a partir del día siguiente a aquel en que se produzca el acto presunto"],
        ["Plazo para resolver la reposición (art. 124.2)", "Un mes para dictar y notificar"],
        ["¿Cabe reposición contra la resolución de una reposición (art. 124.3)?", "No"],
      ],
      preguntas: [
        ["facil", "El plazo para interponer el recurso de reposición contra un acto expreso es de:", ["Un mes", "Dos meses", "Tres meses"], "Art. 124.1 Ley 39/2015."],
        ["media", "El plazo máximo para dictar y notificar la resolución del recurso de reposición es de:", ["Un mes", "Tres meses", "Quince días"], "Art. 124.2 Ley 39/2015."],
        ["media", "Contra la resolución de un recurso de reposición:", ["No puede interponerse de nuevo dicho recurso", "Cabe una segunda reposición", "Cabe alzada"], "Art. 124.3 Ley 39/2015."],
        ["media", "Transcurrido el mes sin interponer reposición contra un acto expreso:", ["Únicamente podrá interponerse recurso contencioso-administrativo, salvo la revisión extraordinaria", "Puede interponerse alzada", "El acto queda anulado"], "Art. 124.1 Ley 39/2015."],
        ["dificil", "Contra un acto presunto, la reposición puede interponerse:", ["En cualquier momento a partir del día siguiente a aquel en que se produzca el acto presunto", "En el plazo de un mes desde el acto presunto", "En el plazo de tres meses"], "Art. 124.1, párrafo segundo, Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Recurso de reposición", "Recurso potestativo ante el mismo órgano que dictó un acto que pone fin a la vía administrativa (art. 123)."],
    [S1, "Recurso contencioso-administrativo", "Recurso ante los juzgados y tribunales del orden contencioso contra la actuación administrativa, regulado en la Ley 29/1998."],
    [S1, "Pie de recursos", "Parte final de una resolución que indica los recursos procedentes, el órgano y el plazo (art. 88.3 y 40.2)."],
    [S2, "Desestimación presunta", "Rechazo del recurso que se entiende producido si no se resuelve en plazo; permite acudir a la vía judicial (art. 123.2)."],
  ],
  casos: [
    {
      slug: "adm-ayto-reposicion-decreto-alcaldia",
      titulo: "Un pie de recursos de un decreto municipal",
      supuesto: "Una funcionaria recibe el 15 de febrero un decreto de la Concejalía delegada de Personal (que actúa por delegación de la Alcaldía) que le deniega un complemento. El pie de recursos dice: «Contra la presente resolución, que pone fin a la vía administrativa, podrá interponerse recurso potestativo de reposición en el plazo de un mes, o bien recurso contencioso-administrativo en el plazo de dos meses». Ella presenta reposición el 10 de marzo.",
      preguntas: [
        [S1, "media", "El decreto pone fin a la vía administrativa porque:", ["Lo dicta un órgano por delegación del Alcalde", "Lo dice la funcionaria", "Todos los decretos lo hacen"], "Art. 52.2.b) Ley 7/1985."],
        [S1, "facil", "La reposición la resuelve:", ["El mismo órgano que dictó el decreto", "El Pleno", "El juzgado"], "Art. 123.1 Ley 39/2015."],
        [S2, "media", "¿Está la reposición del 10 de marzo dentro de plazo?", ["Sí, el plazo es de un mes", "No, el plazo era de diez días", "No, el plazo era de quince días"], "Art. 124.1 Ley 39/2015."],
        [S1, "media", "Habiendo presentado reposición, ¿puede a la vez ir al juzgado?", ["No, hasta que se resuelva o se desestime presuntamente", "Sí, siempre", "Sí, si paga una tasa"], "Art. 123.2 Ley 39/2015."],
        [S2, "media", "El Ayuntamiento tiene para resolver y notificar la reposición:", ["Un mes", "Tres meses", "Seis meses"], "Art. 124.2 Ley 39/2015."],
        [S2, "media", "Si el Ayuntamiento no resuelve en ese plazo:", ["Podrá entender desestimado el recurso y acudir al contencioso", "Se entiende estimado", "Debe presentar otra reposición"], "Arts. 123.2 y 24.1 Ley 39/2015."],
        [S2, "media", "Si le desestiman la reposición, ¿puede presentar otra reposición?", ["No", "Sí, una vez más", "Sí, ante el Pleno"], "Art. 124.3 Ley 39/2015."],
        [S1, "media", "Si en vez de recurrir en reposición hubiera ido directamente al juzgado:", ["Habría sido posible, por el carácter potestativo de la reposición", "Habría sido inadmitido", "Habría tenido que hacer antes alzada"], "Art. 123.1 Ley 39/2015."],
        [S2, "dificil", "Si hubiera dejado pasar el mes sin recurrir en reposición:", ["Solo podría acudir al contencioso (o, en su caso, la revisión extraordinaria)", "Podría recurrir en alzada", "Ya no podría hacer nada en ningún caso"], "Art. 124.1 Ley 39/2015."],
        [S1, "media", "Contra este decreto no procede alzada porque:", ["Ya pone fin a la vía administrativa", "Es un acto de trámite", "Es una disposición general"], "Art. 121.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-reposicion-silencio-licencia",
      titulo: "Una reposición contra el silencio",
      supuesto: "Un vecino pidió al Ayuntamiento el reintegro de una tasa pagada dos veces. El órgano competente para resolver, cuyas resoluciones ponen fin a la vía administrativa, no contestó en plazo y la norma aplicable da al silencio sentido desestimatorio. Siete meses después, el vecino presenta un recurso de reposición.",
      preguntas: [
        [S2, "media", "¿Puede el vecino recurrir en reposición siete meses después?", ["Sí, contra un acto presunto puede recurrir en cualquier momento desde que se produce", "No, el plazo era de un mes", "No, el plazo era de tres meses"], "Art. 124.1, párrafo segundo, Ley 39/2015."],
        [S1, "media", "La reposición procede porque:", ["La resolución presunta pone fin a la vía administrativa", "Siempre procede contra el silencio", "Es lo único posible"], "Art. 123.1 Ley 39/2015."],
        [S1, "facil", "La reposición se presenta ante:", ["El mismo órgano que debió resolver", "El superior jerárquico", "El Tribunal de Cuentas"], "Art. 123.1 Ley 39/2015."],
        [S2, "media", "El Ayuntamiento debe resolver la reposición en:", ["Un mes", "Tres meses", "Diez días"], "Art. 124.2 Ley 39/2015."],
        [S1, "media", "Mientras la reposición no se resuelva ni se entienda desestimada:", ["El vecino no puede acudir al contencioso", "Puede acudir al contencioso", "Debe acudir al Justicia de Aragón"], "Art. 123.2 Ley 39/2015."],
        [S1, "media", "En vez de la reposición, el vecino podía haber elegido:", ["Ir directamente al recurso contencioso-administrativo", "Interponer alzada", "Pedir revisión extraordinaria"], "Art. 123.1 Ley 39/2015."],
        [S2, "media", "Si le desestiman la reposición:", ["No puede repetir la reposición", "Puede presentar otra", "Puede presentar alzada"], "Art. 124.3 Ley 39/2015."],
        [S1, "dificil", "La reposición en las entidades locales se configura en el art. 52.1 LBRL como un recurso:", ["Previo y potestativo a la vía judicial", "Obligatorio", "Extraordinario"], "Art. 52.1 Ley 7/1985."],
        [S2, "media", "El plazo de reposición contra un acto expreso habría sido de:", ["Un mes", "Dos meses", "Tres meses"], "Art. 124.1 Ley 39/2015."],
        [S1, "media", "El recurso de reposición puede fundarse en:", ["Cualquier motivo de nulidad o anulabilidad", "Solo en la nulidad", "Solo en errores materiales"], "Art. 112.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-reposicion-bases-convocatoria",
      titulo: "Recurrir las bases de una convocatoria",
      supuesto: "Un aspirante a la promoción interna de Administrativa/o quiere impugnar las bases específicas, aprobadas por decreto de la Concejalía delegada de Personal. La base sexta indica que contra la resolución, que pone fin a la vía administrativa, cabe reposición en un mes o contencioso en dos meses, y que si se interpone reposición no puede acudirse al contencioso hasta su resolución expresa o desestimación presunta.",
      preguntas: [
        [S1, "media", "Según la base sexta, contra las bases cabe:", ["Reposición potestativa en un mes o contencioso en dos meses", "Alzada en un mes", "Solo queja"], "Base sexta de las bases (bases1739.pdf) y arts. 123 y 124 Ley 39/2015."],
        [S1, "media", "La regla de no acudir al contencioso mientras no se resuelva la reposición procede de:", ["El art. 123.2 de la Ley 39/2015", "Una costumbre municipal", "El Estatuto de Aragón"], "Art. 123.2 Ley 39/2015."],
        [S1, "facil", "La reposición contra las bases la resuelve:", ["El órgano que las aprobó", "El tribunal de selección", "El Pleno"], "Art. 123.1 Ley 39/2015."],
        [S2, "media", "El plazo de un mes para la reposición se cuenta desde:", ["El día siguiente a su publicación", "El día del examen", "La publicación de las notas"], "Arts. 30.4 y 124.1 Ley 39/2015."],
        [S2, "media", "El órgano debe resolver la reposición en:", ["Un mes", "Tres meses", "Seis meses"], "Art. 124.2 Ley 39/2015."],
        [S1, "media", "Si el aspirante presentara un escrito titulado «alzada» contra las bases:", ["Se tramitaría como reposición si se deduce su verdadero carácter", "Se inadmitiría siempre", "Se mandaría al Gobierno de Aragón"], "Art. 115.2 Ley 39/2015."],
        [S2, "media", "Si se desestima su reposición, el aspirante podrá:", ["Acudir al contencioso; no cabe otra reposición", "Interponer otra reposición", "Interponer alzada"], "Art. 124.3 Ley 39/2015."],
        [S1, "dificil", "Las calificaciones del tribunal, en cambio, al no poner fin a la vía administrativa, se recurrirían en:", ["Alzada", "Reposición", "Revisión extraordinaria"], "Art. 121.1 Ley 39/2015."],
        [S1, "media", "Las bases de una convocatoria, aunque se dirijan a muchas personas, son un acto administrativo y por eso:", ["Admiten recurso administrativo", "No admiten ningún recurso", "Solo admiten recurso de inconstitucionalidad"], "Arts. 112.1 y 123 Ley 39/2015."],
        [S2, "media", "Si el aspirante deja pasar el mes, en vía administrativa ordinaria:", ["Ya no puede recurrir en reposición", "Puede recurrir en alzada", "Puede pedir una prórroga"], "Art. 124.1 Ley 39/2015."],
      ],
    },
  ],
});
