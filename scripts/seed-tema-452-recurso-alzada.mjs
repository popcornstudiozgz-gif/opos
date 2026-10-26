/**
 * Crea tema-452 — Tema 30 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XXII): recursos administrativos. Recurso de
 * alzada."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título V, Capítulo II, Sección 2.ª,
 * arts. 121 y 122, más el art. 24.1, párrafo tercero (silencio en la alzada
 * contra una desestimación presunta), al que remite el art. 122.2; texto
 * consolidado leído íntegro (content-raw/ley-39-2015-procedimiento-
 * administrativo; consolidado del BOE actualizado a 06-11-2024).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-452-recurso-alzada.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "alzada-objeto-organo";
const S2 = "alzada-plazos-resolucion";

await sembrarTema({
  tema: {
    slug: "tema-452",
    titulo: "El recurso de alzada",
    descripcion: "Ley 39/2015, Título V, Capítulo II, Sección 2.ª (arts. 121 y 122): objeto (resoluciones y actos de trámite cualificados que no ponen fin a la vía administrativa); órgano competente (superior jerárquico; tribunales de selección y órganos con autonomía funcional); lugar de interposición y remisión en diez días con informe y copia del expediente; plazo de un mes contra actos expresos y en cualquier momento contra presuntos; plazo de resolución de tres meses, silencio desestimatorio y excepción del art. 24.1; irrecurribilidad salvo revisión extraordinaria.",
    contenido: "El recurso de alzada se interpone contra las resoluciones y actos de trámite cualificados que no ponen fin a la vía administrativa y lo resuelve el superior jerárquico de quien los dictó; los tribunales de selección se consideran dependientes del órgano al que están adscritos o del que nombró a su presidente. Puede presentarse ante el órgano que dictó el acto, que lo remite en diez días con informe y expediente, o ante el que debe resolverlo. El plazo es de un mes si el acto es expreso (después es firme) y sin límite si es presunto. Debe resolverse en tres meses; si no, se entiende desestimado, salvo cuando la alzada se dirige contra una desestimación por silencio de una solicitud, en cuyo caso el silencio es estimatorio. Contra su resolución solo cabe el extraordinario de revisión.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Objeto y órgano competente", articulos: "art. 121", url: `${L}#a121` },
      { seccion: S2, titulo: "Plazos, silencio y resolución", articulos: "art. 122 y art. 24.1", url: `${L}#a122` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 30 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto del recurso de alzada (art. 121.1)", "Las resoluciones y actos del art. 112.1 que no pongan fin a la vía administrativa"],
        ["Órgano que resuelve la alzada (art. 121.1)", "El superior jerárquico del que dictó el acto"],
        ["Tribunales de selección y órganos con autonomía funcional (art. 121.1)", "Se consideran dependientes del órgano al que estén adscritos o, en su defecto, del que nombró a su presidente"],
        ["¿Dónde se interpone la alzada (art. 121.2)?", "Ante el órgano que dictó el acto o ante el competente para resolver"],
        ["Remisión del recurso (art. 121.2)", "Si se presenta ante el órgano que dictó el acto, este lo remite al competente en diez días, con su informe y copia completa y ordenada del expediente; su titular es responsable directo"],
      ],
      preguntas: [
        ["facil", "El recurso de alzada se interpone contra actos que:", ["No pongan fin a la vía administrativa", "Pongan fin a la vía administrativa", "Sean firmes"], "Art. 121.1 Ley 39/2015."],
        ["media", "El recurso de alzada lo resuelve:", ["El órgano superior jerárquico del que dictó el acto", "El mismo órgano que dictó el acto", "El juzgado contencioso"], "Art. 121.1 Ley 39/2015."],
        ["media", "Los tribunales de selección se consideran dependientes, a efectos de la alzada:", ["Del órgano al que estén adscritos o, en su defecto, del que nombró a su presidente", "Del propio tribunal", "Del Defensor del Pueblo"], "Art. 121.1 Ley 39/2015."],
        ["media", "Si el recurso se interpone ante el órgano que dictó el acto, este debe remitirlo al competente en:", ["Diez días, con su informe y copia completa y ordenada del expediente", "Un mes, sin informe", "Tres días"], "Art. 121.2 Ley 39/2015."],
        ["dificil", "Es responsable directo de remitir en plazo el recurso de alzada:", ["El titular del órgano que dictó el acto recurrido", "El recurrente", "El registro general"], "Art. 121.2, párrafo tercero, Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Plazo de interposición contra actos expresos (art. 122.1)", "Un mes; pasado sin recurrir, la resolución es firme a todos los efectos"],
        ["Plazo contra actos presuntos (art. 122.1)", "En cualquier momento a partir del día siguiente a aquel en que se produzcan los efectos del silencio"],
        ["Plazo para resolver la alzada (art. 122.2)", "Tres meses; si no se resuelve, puede entenderse desestimado, salvo el supuesto del art. 24.1, tercer párrafo"],
        ["Excepción del art. 24.1, tercer párrafo", "Si la alzada se interpuso contra la desestimación por silencio de una solicitud, y no se resuelve en plazo, se entiende estimada (salvo materias excluidas: derecho de petición, dominio o servicio público, medio ambiente, responsabilidad patrimonial)"],
        ["Recursos contra la resolución de alzada (art. 122.3)", "Ningún otro recurso administrativo, salvo el extraordinario de revisión en los casos del art. 125.1"],
      ],
      preguntas: [
        ["facil", "El plazo para interponer el recurso de alzada contra un acto expreso es de:", ["Un mes", "Tres meses", "Quince días"], "Art. 122.1 Ley 39/2015."],
        ["media", "Transcurrido el plazo de alzada sin haberse interpuesto el recurso contra un acto expreso:", ["La resolución será firme a todos los efectos", "Puede interponerse reposición", "Se abre un nuevo plazo de un mes"], "Art. 122.1 Ley 39/2015."],
        ["media", "El plazo máximo para dictar y notificar la resolución del recurso de alzada es de:", ["Tres meses", "Un mes", "Seis meses"], "Art. 122.2 Ley 39/2015."],
        ["media", "Si el acto no es expreso, el recurso de alzada puede interponerse:", ["En cualquier momento a partir del día siguiente a aquel en que se produzcan los efectos del silencio", "En un mes desde el silencio", "En tres meses desde la solicitud"], "Art. 122.1 Ley 39/2015."],
        ["dificil", "Si se interpone alzada contra la desestimación por silencio de una solicitud y no se resuelve en plazo, como regla:", ["Se entiende estimado el recurso", "Se entiende desestimado", "El procedimiento caduca"], "Arts. 122.2 y 24.1, párrafo tercero, Ley 39/2015."],
        ["media", "Contra la resolución de un recurso de alzada cabe:", ["Solo el recurso extraordinario de revisión en los casos del art. 125.1", "Recurso de reposición", "Una segunda alzada"], "Art. 122.3 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Recurso de alzada", "Recurso ordinario contra actos que no agotan la vía administrativa, resuelto por el superior jerárquico (art. 121)."],
    [S1, "Superior jerárquico", "Órgano situado por encima del que dictó el acto en la estructura administrativa; resuelve la alzada."],
    [S1, "Autonomía funcional", "Independencia de criterio de ciertos órganos, como los tribunales de selección; a efectos de alzada dependen del órgano de adscripción (art. 121.1)."],
    [S2, "Firmeza", "Situación de un acto que ya no puede recurrirse en vía ordinaria por haber vencido el plazo (art. 122.1)."],
    [S2, "Silencio desestimatorio", "Efecto de entender rechazado el recurso si no se resuelve en plazo; regla general en los recursos (arts. 24.1 y 122.2)."],
  ],
  casos: [
    {
      slug: "adm-ayto-alzada-tribunal-calificador",
      titulo: "Recurso contra la nota de un tribunal calificador",
      supuesto: "El tribunal de una promoción interna, nombrado por el concejal delegado de Personal, publica las calificaciones definitivas el 10 de marzo. Una aspirante quiere recurrirlas porque considera mal corregida una pregunta. Presenta el recurso ante el propio tribunal el 2 de abril.",
      preguntas: [
        [S1, "media", "Las calificaciones del tribunal, que no ponen fin a la vía administrativa, se recurren en:", ["Alzada", "Reposición", "Revisión extraordinaria"], "Art. 121.1 Ley 39/2015."],
        [S1, "media", "A efectos de la alzada, el tribunal se considera dependiente:", ["Del órgano al que está adscrito o, en su defecto, del que nombró a su presidente", "De sí mismo", "Del Pleno siempre"], "Art. 121.1 Ley 39/2015."],
        [S1, "media", "¿Puede presentarse el recurso ante el propio tribunal?", ["Sí, ante el órgano que dictó el acto o ante el competente para resolver", "No, solo ante el superior", "No, solo en el juzgado"], "Art. 121.2 Ley 39/2015."],
        [S1, "media", "Recibido el recurso, el tribunal debe remitirlo al órgano competente en:", ["Diez días, con informe y copia del expediente", "Un mes", "Tres meses"], "Art. 121.2 Ley 39/2015."],
        [S2, "media", "¿Está el recurso del 2 de abril dentro de plazo?", ["Sí, el plazo es de un mes desde el día siguiente a la publicación", "No, el plazo era de quince días", "No, el plazo era de diez días"], "Art. 122.1 Ley 39/2015."],
        [S2, "facil", "El órgano competente tiene para resolver y notificar:", ["Tres meses", "Un mes", "Seis meses"], "Art. 122.2 Ley 39/2015."],
        [S2, "media", "Si no resuelve en ese plazo, el recurso de la aspirante:", ["Podrá entenderse desestimado", "Se entenderá estimado", "Caducará"], "Art. 122.2 Ley 39/2015."],
        [S2, "media", "Si la aspirante no hubiera recurrido en el mes:", ["Las calificaciones serían firmes a todos los efectos", "Podría recurrir en reposición después", "Tendría tres meses más"], "Art. 122.1 Ley 39/2015."],
        [S2, "dificil", "Contra la resolución de la alzada, la aspirante podrá:", ["Acudir a la vía contencioso-administrativa; en vía administrativa solo cabría la revisión extraordinaria", "Interponer reposición", "Interponer otra alzada"], "Art. 122.3 Ley 39/2015."],
        [S1, "media", "Las calificaciones son recurribles porque:", ["Determinan la imposibilidad de continuar o deciden el fondo para la aspirante", "Todos los actos lo son", "Lo dice el tribunal"], "Arts. 112.1 y 121.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-alzada-contra-silencio",
      titulo: "Una alzada contra el silencio",
      supuesto: "Una asociación cultural solicitó a un organismo autónomo municipal la cesión puntual de una sala para un acto. El organismo no resolvió en plazo y la asociación entendió desestimada su solicitud, por así disponerlo la norma aplicable. Interpone recurso de alzada ante el órgano superior, que tampoco resuelve en tres meses. La cesión no implica transferir facultades sobre el dominio público.",
      preguntas: [
        [S2, "media", "¿Cuándo pudo interponer la alzada contra la desestimación presunta?", ["En cualquier momento desde el día siguiente a producirse los efectos del silencio", "Solo en el mes siguiente", "Solo en los tres meses siguientes"], "Art. 122.1, párrafo segundo, Ley 39/2015."],
        [S2, "dificil", "Como el órgano superior tampoco resuelve la alzada en plazo, y la materia no está excluida:", ["Se entiende estimado el recurso", "Se entiende desestimado", "Hay que esperar un año"], "Art. 24.1, párrafo tercero, Ley 39/2015."],
        [S2, "media", "Esta excepción no se aplicaría si la solicitud implicara:", ["Transferir facultades relativas al dominio público o al servicio público", "Una sala pequeña", "Un acto cultural"], "Art. 24.1, párrafos segundo y tercero, Ley 39/2015."],
        [S2, "media", "En general, el silencio en los procedimientos de impugnación de actos tiene sentido:", ["Desestimatorio", "Estimatorio", "Neutro"], "Art. 24.1, párrafo tercero, Ley 39/2015."],
        [S1, "media", "La alzada se dirige al:", ["Superior jerárquico del órgano que no resolvió", "Mismo órgano", "Juzgado"], "Art. 121.1 Ley 39/2015."],
        [S1, "media", "La asociación podía presentar la alzada:", ["Ante el órgano que debió resolver o ante el superior competente", "Solo ante el superior", "Solo por correo"], "Art. 121.2 Ley 39/2015."],
        [S2, "facil", "El plazo para resolver la alzada era de:", ["Tres meses", "Un mes", "Diez días"], "Art. 122.2 Ley 39/2015."],
        [S1, "media", "Si se presentó ante el organismo, este debía remitirla:", ["En diez días con su informe y el expediente", "Cuando pudiera", "Nunca"], "Art. 121.2 Ley 39/2015."],
        [S2, "media", "Tras la resolución de la alzada, ¿cabe recurso de reposición?", ["No, solo el extraordinario de revisión en vía administrativa", "Sí, en un mes", "Sí, en tres meses"], "Art. 122.3 Ley 39/2015."],
        [S1, "media", "El recurso de alzada puede fundarse en:", ["Cualquier motivo de nulidad o anulabilidad", "Solo en la nulidad", "Solo en el silencio"], "Art. 112.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-alzada-o-reposicion",
      titulo: "¿Alzada o reposición?",
      supuesto: "En la oficina de registro te consultan varios vecinos. Uno quiere recurrir un decreto del Alcalde; otro, una resolución de la gerente de un organismo autónomo municipal que no agota la vía administrativa según sus estatutos; un tercero, la resolución de una alzada que ya le desestimaron.",
      preguntas: [
        [S1, "media", "Contra el decreto del Alcalde, que pone fin a la vía administrativa, procede:", ["Reposición potestativa o recurso contencioso, no alzada", "Alzada ante el Pleno", "Alzada ante el Gobierno de Aragón"], "Art. 121.1 Ley 39/2015 y art. 52.2.a) Ley 7/1985."],
        [S1, "media", "Contra la resolución de la gerente, que no agota la vía administrativa, procede:", ["Recurso de alzada ante su superior jerárquico", "Reposición", "Revisión extraordinaria"], "Art. 121.1 Ley 39/2015."],
        [S2, "media", "Contra la resolución de la alzada ya desestimada, en vía administrativa solo cabe:", ["El recurso extraordinario de revisión en los casos tasados", "Una nueva alzada", "La reposición"], "Art. 122.3 Ley 39/2015."],
        [S2, "facil", "El plazo de alzada contra la resolución expresa de la gerente es de:", ["Un mes", "Dos meses", "Tres meses"], "Art. 122.1 Ley 39/2015."],
        [S1, "media", "El vecino que recurra a la gerente puede presentar su escrito:", ["Ante la gerente o ante el órgano superior competente", "Solo en el juzgado", "Solo ante el Alcalde"], "Art. 121.2 Ley 39/2015."],
        [S2, "media", "Si el vecino deja pasar el mes sin recurrir a la gerente:", ["La resolución será firme a todos los efectos", "Podrá recurrir en reposición", "Podrá recurrir en alzada en tres meses"], "Art. 122.1 Ley 39/2015."],
        [S2, "media", "Si el superior no resuelve la alzada en tres meses, como regla el recurso:", ["Puede entenderse desestimado", "Se entiende estimado", "Se archiva"], "Art. 122.2 Ley 39/2015."],
        [S1, "media", "Si un vecino titula «alzada» su recurso contra el decreto del Alcalde:", ["Se tramitará según su verdadero carácter si se deduce", "Se inadmitirá siempre", "Se remitirá al Pleno"], "Art. 115.2 Ley 39/2015."],
        [S1, "dificil", "Si la gerente recibe un recurso de alzada contra su resolución, su obligación es:", ["Remitirlo en diez días al superior con informe y copia del expediente", "Resolverlo ella misma", "Devolverlo al vecino"], "Art. 121.2 Ley 39/2015."],
        [S1, "media", "El superior jerárquico, al resolver la alzada:", ["No puede agravar la situación inicial del recurrente", "Puede imponerle una sanción", "Puede ampliar la deuda"], "Art. 119.3 Ley 39/2015."],
      ],
    },
  ],
});
