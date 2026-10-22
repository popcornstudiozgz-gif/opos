/**
 * Crea tema-347 — Tema 20 de Policía Local: "De las torturas y otros delitos
 * contra la integridad moral (Libro II, Título VII). De la trata de seres
 * humanos (Libro II, Título VII bis). Delitos contra la libertad e
 * indemnidad sexuales (Libro II, Título VIII)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 173 a 194 bis. Nota: desde
 * la LO 10/2022 el Título VIII se rotula «Delitos contra la libertad
 * sexual» (el temario oficial mantiene el rótulo anterior, «libertad e
 * indemnidad sexuales») y ya no distingue abuso y agresión: todo acto sin
 * consentimiento es agresión sexual. El texto consolidado conserva dos
 * bloques antiguos (arts. 183 ter y 183 quater del extinto Capítulo II bis)
 * que no se usan aquí; se sigue el art. 183 y el 183 bis vigentes.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-347-codigo-penal-integridad-moral-trata-libertad-sexual.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "integridad-moral-tortura";
const S2 = "trata-seres-humanos";
const S3 = "agresiones-sexuales";
const S4 = "agresiones-sexuales-menores-16";
const S5 = "acoso-exhibicionismo-prostitucion-comunes";

await sembrarTema({
  tema: {
    slug: "tema-347",
    titulo: "Código Penal: torturas e integridad moral, trata de seres humanos y delitos contra la libertad sexual",
    descripcion: "Trato degradante, acoso laboral e inmobiliario, violencia habitual en el ámbito familiar, injurias y vejaciones leves y acoso callejero; tortura y atentados contra la integridad moral por autoridad o funcionario; trata de seres humanos; agresión sexual y consentimiento, violación y agravantes; agresiones sexuales a menores de dieciséis años, child grooming y cláusula de proximidad; acoso sexual; exhibicionismo y provocación sexual; prostitución, explotación sexual y pornografía infantil; perseguibilidad, libertad vigilada e inhabilitaciones.",
    contenido: "Recorre los Títulos VII, VII bis y VIII del Libro II del Código Penal (arts. 173 a 194 bis): el trato degradante y la violencia habitual del art. 173.2, la tortura cometida por autoridad o funcionario, la trata de seres humanos y sus finalidades, la agresión sexual tras la LO 10/2022 (consentimiento expreso, violación, agravantes), los delitos contra menores de dieciséis años, el acoso sexual, el exhibicionismo, la prostitución y la pornografía infantil, y las reglas sobre denuncia, perdón y penas añadidas.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Torturas y otros delitos contra la integridad moral", articulos: "arts. 173-177", url: a("a173") },
      { seccion: S2, titulo: "Trata de seres humanos", articulos: "art. 177 bis", url: a("a177bis") },
      { seccion: S3, titulo: "Agresiones sexuales", articulos: "arts. 178-180", url: a("a178") },
      { seccion: S4, titulo: "Agresiones sexuales a menores de dieciséis años", articulos: "arts. 181-183 bis", url: a("a181") },
      { seccion: S5, titulo: "Acoso sexual, exhibicionismo, prostitución y disposiciones comunes", articulos: "arts. 184-194 bis", url: a("a184") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 20 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Trato degradante (art. 173.1)", "Infligir a otro un trato degradante que menoscabe gravemente su integridad moral: prisión de seis meses a dos años"],
        ["Otras conductas del art. 173.1 con la misma pena", "Ocultar reiteradamente el paradero de un cadáver a sus familiares; acoso laboral o funcionarial con prevalimiento de superioridad; actos hostiles reiterados para impedir el disfrute de la vivienda"],
        ["Violencia habitual (art. 173.2)", "Ejercer habitualmente violencia física o psíquica sobre la pareja o expareja, familiares, menores o personas con discapacidad convivientes o personas vulnerables bajo custodia: prisión de 6 meses a 3 años y privación de armas de 3 a 5 años, más las penas de cada acto"],
        ["¿Cómo se aprecia la habitualidad? (art. 173.3)", "Por el número de actos acreditados y su proximidad temporal, sobre la misma o distintas víctimas y aunque se hayan enjuiciado o no antes"],
        ["Injuria o vejación leve en el ámbito familiar (art. 173.4)", "Localización permanente o TBC de 5 a 30 días, o multa de 1 a 4 meses; también el acoso callejero de carácter sexual; perseguibles por denuncia"],
        ["Tortura (art. 174.1)", "Autoridad o funcionario que, abusando de su cargo, para obtener confesión o información, castigar o por discriminación, somete a alguien a sufrimientos físicos o mentales o atenta contra su integridad moral"],
        ["Penas de la tortura", "Prisión de 2 a 6 años si es grave y de 1 a 3 si no lo es, más inhabilitación absoluta de 8 a 12 años en todo caso"],
        ["Atentado contra la integridad moral por funcionario (art. 175)", "Fuera de la tortura: prisión de 2 a 4 años si es grave y de 6 meses a 2 años si no, e inhabilitación especial de 2 a 4 años"],
        ["Comisión por omisión del funcionario (art. 176)", "La autoridad o funcionario que, faltando a sus deberes, permite que otros cometan estos hechos sufre las mismas penas"],
        ["Concurso del art. 177", "Si además se produce lesión o daño a la vida, integridad, salud, libertad sexual o bienes, se castigan separadamente"],
      ],
      preguntas: [
        ["media", "El trato degradante que menoscaba gravemente la integridad moral se castiga con prisión de…", ["Seis meses a dos años", "Dos a seis años", "Uno a tres años"], "Art. 173.1."],
        ["media", "La violencia física o psíquica habitual sobre la pareja se castiga con prisión de…", ["Seis meses a tres años", "Dos a cinco años", "Tres meses a un año"], "Art. 173.2."],
        ["dificil", "Para apreciar la habitualidad, ¿es necesario que los actos se hayan juzgado antes?", ["No: con independencia de que hayan sido o no objeto de enjuiciamiento", "Sí", "Solo si son más de diez"], "Art. 173.3."],
        ["media", "La tortura grave se castiga con prisión de dos a seis años y, en todo caso, con…", ["Inhabilitación absoluta de ocho a doce años", "Suspensión de empleo de un año", "Multa"], "Art. 174.1."],
        ["media", "El agente que permite, faltando a sus deberes, que un compañero torture a un detenido…", ["Sufre las mismas penas que el autor", "No comete delito", "Solo comete una falta disciplinaria"], "Art. 176."],
        ["media", "Dirigirse a otra persona con expresiones de carácter sexual que le creen una situación objetivamente humillante, sin constituir delito más grave, se castiga en el…", ["Art. 173.4", "Art. 184", "Art. 178"], "Art. 173.4, párrafo segundo."],
        ["dificil", "Si en una tortura se causan además lesiones, ¿cómo se castigan?", ["Separadamente, con la pena de cada delito", "Solo como tortura", "Solo como lesiones"], "Art. 177."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Pena de la trata de seres humanos (art. 177 bis.1)", "Prisión de cinco a ocho años"],
        ["Medios de la trata", "Violencia, intimidación, engaño, abuso de superioridad, necesidad o vulnerabilidad, o pagos para obtener el consentimiento de quien controla a la víctima"],
        ["Acciones de la trata", "Captar, transportar, trasladar, acoger o recibir a la víctima, incluido el intercambio o transferencia de control"],
        ["Finalidades de la trata", "Trabajos o servicios forzados, esclavitud, servidumbre o mendicidad; explotación sexual (incluida la pornografía); actividades delictivas; extracción de órganos; matrimonios forzados"],
        ["Situación de necesidad o vulnerabilidad", "Cuando la persona no tiene otra alternativa, real o aceptable, que someterse al abuso"],
        ["Trata de menores (art. 177 bis.2)", "Hay trata aunque no se use ninguno de los medios, si es con fines de explotación"],
        ["Consentimiento de la víctima (art. 177 bis.3)", "Es irrelevante cuando se ha recurrido a alguno de los medios"],
        ["Exención de la víctima (art. 177 bis.11)", "Queda exenta por las infracciones cometidas en la explotación, si fueron consecuencia directa de la violencia o abuso sufridos y hay proporcionalidad"],
        ["Trata por autoridad o funcionario (art. 177 bis.5)", "Pena superior en grado e inhabilitación absoluta de seis a doce años"],
      ],
      preguntas: [
        ["facil", "La trata de seres humanos se castiga con prisión de…", ["Cinco a ocho años", "Dos a cinco años", "Ocho a doce años"], "Art. 177 bis.1."],
        ["media", "¿Cuál de estas es una finalidad de la trata según el art. 177 bis?", ["La celebración de matrimonios forzados", "La adopción legal", "El turismo"], "Art. 177 bis.1.e)."],
        ["media", "¿Es relevante el consentimiento de la víctima si se empleó engaño?", ["No", "Sí, excluye el delito", "Solo si es mayor de edad"], "Art. 177 bis.3."],
        ["media", "Respecto de menores con fines de explotación, ¿es necesario emplear violencia, intimidación o engaño?", ["No", "Sí", "Solo engaño"], "Art. 177 bis.2."],
        ["dificil", "¿Responde la víctima de trata por los delitos que cometió obligada en la situación de explotación?", ["No, queda exenta si fueron consecuencia directa y hay proporcionalidad", "Sí, siempre", "Solo de los leves"], "Art. 177 bis.11."],
        ["media", "Si el autor de la trata se prevale de su condición de agente de la autoridad…", ["Pena superior en grado e inhabilitación absoluta de seis a doce años", "La misma pena", "Pena inferior"], "Art. 177 bis.5."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Agresión sexual (art. 178.1)", "Cualquier acto que atente contra la libertad sexual de otra persona sin su consentimiento: prisión de uno a cuatro años"],
        ["Concepto de consentimiento (art. 178.1)", "Solo hay consentimiento cuando se haya manifestado libremente mediante actos que, según las circunstancias, expresen de manera clara la voluntad de la persona"],
        ["Agresión sexual en todo caso (art. 178.2)", "Actos con violencia, intimidación o abuso de superioridad o vulnerabilidad; sobre personas privadas de sentido o con abuso de su situación mental; o con la voluntad anulada"],
        ["Agresión con violencia, intimidación o voluntad anulada (art. 178.3)", "Prisión de uno a cinco años"],
        ["Violación (art. 179.1)", "Acceso carnal por vía vaginal, anal o bucal, o introducción de miembros corporales u objetos por las dos primeras vías: prisión de 4 a 12 años"],
        ["Violación con violencia, intimidación o voluntad anulada (art. 179.2)", "Prisión de seis a doce años"],
        ["Agravantes del art. 180.1", "Actuación conjunta de dos o más; violencia extrema o actos degradantes; víctima especialmente vulnerable; víctima esposa o pareja mujer; prevalimiento de convivencia, parentesco o superioridad; uso de armas; anular la voluntad con fármacos o drogas"],
        ["Penas agravadas del art. 180", "178.1: 2 a 8 años; 178.3: 5 a 10; 179.1: 7 a 15; 179.2: 12 a 15; mitad superior si concurren dos o más circunstancias"],
        ["Prevalimiento de la condición de autoridad (art. 180.3)", "Además, inhabilitación absoluta de seis a doce años"],
      ],
      preguntas: [
        ["media", "Según el art. 178.1, solo se entiende que hay consentimiento cuando…", ["Se ha manifestado libremente mediante actos que expresen claramente la voluntad", "La víctima no se opone", "Hay una relación previa"], "Art. 178.1."],
        ["facil", "La agresión sexual del art. 178.1 se castiga con prisión de…", ["Uno a cuatro años", "Cuatro a doce años", "Seis meses a dos años"], "Art. 178.1."],
        ["media", "La agresión sexual consistente en acceso carnal se denomina…", ["Violación", "Abuso sexual", "Acoso sexual"], "Art. 179.1."],
        ["media", "La violación con violencia o intimidación se castiga con prisión de…", ["Seis a doce años", "Cuatro a doce años", "Doce a quince años"], "Art. 179.2."],
        ["media", "Anular la voluntad de la víctima suministrándole drogas para cometer la agresión es…", ["Una circunstancia agravante del art. 180", "Una atenuante", "Irrelevante"], "Art. 180.1.7.ª."],
        ["dificil", "Si concurren dos o más circunstancias del art. 180.1…", ["Las penas agravadas se imponen en su mitad superior", "Se aplica prisión permanente revisable", "Se aplica la pena básica"], "Art. 180.2."],
        ["media", "Los actos sexuales sobre una persona privada de sentido son…", ["Agresión sexual en todo caso", "Acoso sexual", "No son delito"], "Art. 178.2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Actos sexuales con menor de 16 años (art. 181.1)", "Prisión de dos a seis años; incluye los que el menor realice con un tercero o sobre sí mismo a instancia del autor"],
        ["Con violencia, intimidación o las modalidades del art. 178.2 (art. 181.2)", "Prisión de cinco a diez años"],
        ["Acceso carnal con menor de 16 (art. 181.4)", "Prisión de 8 a 12 años; de 12 a 15 si concurren las modalidades del apartado 2"],
        ["Agravante específica de edad (art. 181.5.c)", "Mitad superior si la víctima es especialmente vulnerable y, en todo caso, si es menor de cuatro años"],
        ["Hacer presenciar actos sexuales a menor de 16 (art. 182)", "Prisión de 6 meses a 2 años; de 1 a 3 años si los actos son delito contra la libertad sexual"],
        ["Child grooming (art. 183.1)", "Contactar por internet o teléfono con un menor de 16 y proponer un encuentro para cometer delitos de los arts. 181 o 189, con actos materiales de acercamiento: prisión de 1 a 3 años o multa de 12 a 24 meses"],
        ["Embaucar a un menor para obtener pornografía (art. 183.2)", "Prisión de seis meses a dos años"],
        ["Cláusula de proximidad (art. 183 bis)", "El libre consentimiento del menor de 16 excluye la responsabilidad si el autor es próximo por edad y grado de desarrollo o madurez, salvo las circunstancias del art. 178.2"],
      ],
      preguntas: [
        ["media", "Realizar actos de carácter sexual con un menor de dieciséis años se castiga con prisión de…", ["Dos a seis años", "Uno a cuatro años", "Cinco a diez años"], "Art. 181.1."],
        ["media", "El contacto por internet con un menor de 16 años proponiendo un encuentro con fines sexuales y con actos de acercamiento se conoce como…", ["Child grooming (art. 183.1)", "Sexting", "Acoso escolar"], "Art. 183.1."],
        ["dificil", "¿Excluye la responsabilidad el consentimiento libre del menor de 16 años?", ["Sí, si el autor es próximo en edad y madurez y no concurre el art. 178.2", "Nunca", "Siempre"], "Art. 183 bis."],
        ["media", "Hacer presenciar a un menor de 16 años actos sexuales con fines sexuales se castiga con prisión de…", ["Seis meses a dos años", "Dos a seis años", "Uno a tres años, siempre"], "Art. 182.1."],
        ["dificil", "La agresión sexual a un menor de cuatro años supone…", ["Imponer la pena en su mitad superior", "Una atenuante", "La misma pena"], "Art. 181.5.c)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Acoso sexual (art. 184.1)", "Solicitar favores sexuales en una relación laboral, docente o de servicios continuada, provocando una situación objetiva y gravemente intimidatoria, hostil o humillante: prisión de 6 a 12 meses o multa de 10 a 15 meses e inhabilitación"],
        ["Acoso sexual con prevalimiento de superioridad (art. 184.2)", "Prisión de uno a dos años e inhabilitación de 18 a 24 meses"],
        ["Exhibicionismo (art. 185)", "Ejecutar o hacer ejecutar actos de exhibición obscena ante menores o personas con discapacidad necesitadas de especial protección: prisión de 6 meses a 1 año o multa de 12 a 24 meses"],
        ["Provocación sexual (art. 186)", "Vender, difundir o exhibir material pornográfico entre menores o personas con discapacidad necesitadas de especial protección: misma pena"],
        ["Prostitución coactiva (art. 187.1)", "Determinar a un mayor de edad a ejercer o mantenerse en la prostitución con violencia, intimidación, engaño o abuso: prisión de 2 a 5 años y multa"],
        ["Proxenetismo (art. 187.1, párrafo segundo)", "Lucrarse explotando la prostitución ajena aun con consentimiento: prisión de 2 a 4 años; hay explotación si la víctima es vulnerable o se le imponen condiciones gravosas"],
        ["Posesión de pornografía infantil para uso propio (art. 189.5)", "Prisión de 3 meses a 1 año o multa de 6 meses a 2 años; también acceder a ella a sabiendas por internet"],
        ["Perseguibilidad (art. 191)", "Agresiones y acoso sexual: denuncia del agraviado, su representante o querella del fiscal; si la víctima es menor o desvalida basta denuncia del fiscal; el perdón no extingue la acción"],
        ["Libertad vigilada (art. 192.1)", "Se impone a los condenados a prisión por estos delitos: de 5 a 10 años si alguno es grave y de 1 a 5 si son menos graves"],
        ["Inhabilitación para trabajar con menores (art. 192.3)", "Se impone en todo caso, por un tiempo superior a la prisión entre 5 y 20 años (delito grave) o entre 2 y 20 (menos grave)"],
      ],
      preguntas: [
        ["media", "El acoso sexual del art. 184 exige que se soliciten favores sexuales en el ámbito de una relación…", ["Laboral, docente, de prestación de servicios o análoga, continuada o habitual", "Familiar exclusivamente", "Ocasional entre desconocidos"], "Art. 184.1."],
        ["media", "Exhibirse obscenamente ante menores de edad se castiga con…", ["Prisión de seis meses a un año o multa de 12 a 24 meses", "Prisión de dos a seis años", "No es delito"], "Art. 185."],
        ["media", "Lucrarse explotando la prostitución de otra persona aun con su consentimiento…", ["Es delito del art. 187.1", "No es delito si hay consentimiento", "Es una infracción administrativa"], "Art. 187.1, párrafo segundo."],
        ["media", "Poseer pornografía infantil para uso propio…", ["Es delito del art. 189.5", "No es delito", "Solo es infracción si se difunde"], "Art. 189.5."],
        ["dificil", "En los delitos de agresión sexual, ¿extingue el perdón del ofendido la acción penal?", ["No", "Sí", "Solo si es mayor de edad"], "Art. 191.2."],
        ["media", "Si la víctima de una agresión sexual es menor de edad, para proceder…", ["Basta la denuncia del Ministerio Fiscal", "Se requiere denuncia de los padres", "No puede perseguirse"], "Art. 191.1."],
        ["dificil", "¿Qué se decreta cuando se utilizan locales en los delitos de prostitución o exhibicionismo?", ["La clausura definitiva del establecimiento", "Una multa al local", "Nada"], "Art. 194."],
      ],
    },
  ],
  glosario: [
    [S1, "Integridad moral", "Derecho a no ser sometido a tratos degradantes o humillantes (art. 15 CE)."],
    [S1, "Violencia habitual", "Reiteración de actos de violencia física o psíquica en el ámbito familiar del art. 173.2."],
    [S1, "Tortura", "Sufrimientos o atentados a la integridad moral infligidos por autoridad o funcionario abusando de su cargo con un fin determinado."],
    [S2, "Trata de seres humanos", "Captar, trasladar o recibir personas con medios coactivos o abusivos para explotarlas."],
    [S3, "Consentimiento sexual", "Voluntad manifestada libremente mediante actos que la expresen claramente."],
    [S3, "Violación", "Agresión sexual con acceso carnal o introducción de miembros u objetos por vía vaginal o anal."],
    [S4, "Child grooming", "Contacto por medios tecnológicos con un menor de 16 años para cometer delitos sexuales, con actos de acercamiento."],
    [S5, "Proxenetismo", "Lucrarse explotando la prostitución de otra persona."],
    [S5, "Libertad vigilada", "Medida de seguridad que se ejecuta tras la prisión en los delitos sexuales."],
  ],
  casos: [
    {
      slug: "caso-detenido-golpeado-comisaria",
      titulo: "Un detenido en dependencias policiales",
      supuesto: "Un detenido denuncia que, en el calabozo, un agente lo golpeó y lo obligó a permanecer horas de pie y esposado en una postura forzada para que confesara dónde había escondido lo robado. Otro agente presente no hizo nada para impedirlo. El parte médico recoge contusiones.",
      preguntas: [
        [S1, "media", "Someter al detenido a sufrimientos para obtener una confesión, por un funcionario abusando de su cargo, es…", ["Tortura", "Trato degradante del 173.1 cometido por particular", "Coacción leve"], "Art. 174.1."],
        [S1, "media", "Si el atentado es grave, la pena de prisión es de…", ["Dos a seis años", "Uno a tres años", "Seis meses a dos años"], "Art. 174.1."],
        [S1, "media", "Además, en todo caso, se le impone…", ["Inhabilitación absoluta de ocho a doce años", "Inhabilitación especial de dos a cuatro años", "Suspensión de un año"], "Art. 174.1."],
        [S1, "media", "El agente que presenció los hechos sin impedirlos, faltando a sus deberes…", ["Sufre las mismas penas", "No responde", "Solo comete falta disciplinaria"], "Art. 176."],
        [S1, "dificil", "Las contusiones causadas, ¿se castigan aparte?", ["Sí, separadamente, salvo que ya estén especialmente castigadas", "No, quedan absorbidas", "Solo si son graves"], "Art. 177."],
        [S1, "media", "Si el funcionario atentara contra su integridad moral sin ninguna de las finalidades de la tortura, el delito sería…", ["El del art. 175", "El del art. 174", "Ninguno"], "Art. 175."],
        [S1, "media", "Pena del art. 175 si el atentado es grave…", ["Prisión de dos a cuatro años e inhabilitación especial de dos a cuatro", "Prisión de cinco a ocho años", "Multa"], "Art. 175."],
        [S1, "facil", "¿Puede cometer tortura un particular según el art. 174?", ["No: el autor es autoridad o funcionario público", "Sí", "Solo si es vigilante"], "Art. 174.1."],
        [S1, "dificil", "¿Incurren en las mismas penas los funcionarios de centros de menores respecto de los internos?", ["Sí", "No", "Solo con mayores de edad"], "Art. 174.2."],
        [S3, "media", "Si el agente se hubiera prevalido de su condición para cometer una agresión sexual, además se impondría…", ["Inhabilitación absoluta de seis a doce años", "Nada más", "Multa"], "Art. 180.3."],
      ],
    },
    {
      slug: "caso-piso-explotacion-sexual",
      titulo: "Un piso de explotación sexual",
      supuesto: "En una inspección, la Policía Local y la Policía Nacional encuentran en un piso a varias mujeres extranjeras captadas en su país con una falsa oferta de trabajo. Les retienen el pasaporte, les imponen deudas y las obligan a ejercer la prostitución. Una de ellas tiene 17 años.",
      preguntas: [
        [S2, "media", "Captar y trasladar a las mujeres con engaño para explotarlas sexualmente es…", ["Trata de seres humanos", "Solo prostitución", "Detención ilegal exclusivamente"], "Art. 177 bis.1.b)."],
        [S2, "facil", "Pena básica de la trata…", ["Prisión de cinco a ocho años", "Prisión de dos a cuatro años", "Multa"], "Art. 177 bis.1."],
        [S2, "media", "Si alguna dijera que aceptó venir, ¿excluye su consentimiento el delito?", ["No, es irrelevante si hubo engaño o abuso", "Sí", "Solo si firmó un contrato"], "Art. 177 bis.3."],
        [S2, "media", "Respecto de la joven de 17 años, ¿hace falta probar el engaño para que haya trata?", ["No, al ser menor con fines de explotación", "Sí", "Solo si tiene menos de 16"], "Art. 177 bis.2."],
        [S2, "dificil", "Que la víctima sea menor de edad supone…", ["La pena superior en grado", "La misma pena", "Una atenuante"], "Art. 177 bis.4.b)."],
        [S5, "media", "Obligarlas con intimidación a ejercer la prostitución es además delito del…", ["Art. 187.1", "Art. 185", "Art. 184"], "Art. 187.1."],
        [S5, "media", "Respecto de la menor, favorecer o explotar su prostitución es delito del…", ["Art. 188.1", "Art. 187.1", "Art. 186"], "Art. 188.1."],
        [S2, "dificil", "¿Se castigan aparte los delitos de explotación efectivamente cometidos?", ["Sí, sin perjuicio de la pena por trata", "No, quedan absorbidos", "Solo el más grave"], "Art. 177 bis.9."],
        [S5, "media", "Si el piso se usa como local para estos actos, la sentencia decretará…", ["Su clausura definitiva", "Una multa", "Nada"], "Art. 194."],
        [S2, "media", "Si las víctimas hubieran cometido pequeños hurtos obligadas por los tratantes…", ["Quedarían exentas si es consecuencia directa de la explotación y proporcionado", "Responderían igual", "Responderían con agravante"], "Art. 177 bis.11."],
      ],
    },
    {
      slug: "caso-agresion-sexual-fiesta",
      titulo: "Una agresión sexual en una fiesta",
      supuesto: "Una joven denuncia que, en una fiesta en un piso, dos chicos le echaron algo en la bebida, quedó semiinconsciente y ambos mantuvieron con ella relaciones con acceso carnal. Días antes, uno de ellos le había enviado mensajes sexuales que la hicieron sentir intimidada.",
      preguntas: [
        [S3, "media", "Los actos sexuales sobre una persona privada de sentido o con la voluntad anulada son…", ["Agresión sexual en todo caso", "Abuso sexual sin agresión", "No son delito si no se resistió"], "Art. 178.2."],
        [S3, "media", "Con acceso carnal y voluntad anulada, la conducta es violación del…", ["Art. 179.2", "Art. 179.1", "Art. 178.1"], "Art. 179.2."],
        [S3, "media", "Que actuaran conjuntamente dos personas es…", ["Agravante del art. 180.1.1.ª", "Atenuante", "Irrelevante"], "Art. 180.1.1.ª."],
        [S3, "media", "Echarle una sustancia para anular su voluntad es…", ["Agravante del art. 180.1.7.ª", "Elemento sin relevancia", "Atenuante"], "Art. 180.1.7.ª."],
        [S3, "dificil", "La pena del art. 179.2 agravada por el art. 180 es prisión de…", ["Doce a quince años", "Seis a doce años", "Siete a quince años"], "Art. 180.1."],
        [S3, "dificil", "Al concurrir dos circunstancias del art. 180.1…", ["La pena agravada se impone en su mitad superior", "Se aplica la pena básica", "Se rebaja"], "Art. 180.2."],
        [S3, "facil", "¿Hay consentimiento si la víctima no se opuso porque estaba semiinconsciente?", ["No: el consentimiento exige actos que expresen claramente la voluntad", "Sí", "Depende de la relación previa"], "Art. 178.1."],
        [S5, "media", "¿Cómo se inicia el procedimiento por agresión sexual si la víctima es mayor de edad?", ["Denuncia de la agraviada, su representante o querella del fiscal", "De oficio por cualquier agente", "Solo por querella de la víctima"], "Art. 191.1."],
        [S1, "media", "Los mensajes previos de carácter sexual que le crearon una situación objetivamente intimidatoria, sin ser delito más grave, encajan en el…", ["Art. 173.4", "Art. 184", "Art. 181"], "Art. 173.4, párrafo segundo."],
        [S5, "media", "Tras la prisión, a los condenados se les impondrá…", ["La medida de libertad vigilada", "Una multa", "Nada más"], "Art. 192.1."],
      ],
    },
  ],
});
