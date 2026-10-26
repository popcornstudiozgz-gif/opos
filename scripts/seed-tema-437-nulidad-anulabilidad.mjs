/**
 * Crea tema-437 — Tema 15 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (VII): nulidad y anulabilidad."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título III, Capítulo III, arts. 47
 * a 52, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-437-nulidad-anulabilidad.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "nulidad-pleno-derecho";
const S2 = "anulabilidad";
const S3 = "limites-conservacion-convalidacion";

await sembrarTema({
  tema: {
    slug: "tema-437",
    titulo: "Nulidad y anulabilidad de los actos administrativos",
    descripcion: "Ley 39/2015, Título III, Capítulo III (arts. 47 a 52): causas tasadas de nulidad de pleno derecho de los actos y nulidad de las disposiciones administrativas; anulabilidad por cualquier infracción del ordenamiento, incluida la desviación de poder, y sus límites en defectos de forma y actuaciones fuera de plazo; límites a la extensión de la invalidez; conversión de actos viciados; conservación de actos y trámites; convalidación de actos anulables.",
    contenido: "Qué pasa cuando un acto administrativo tiene un vicio. Los vicios más graves, enumerados en una lista cerrada (lesionar derechos fundamentales, órgano manifiestamente incompetente, contenido imposible, delito, prescindir totalmente del procedimiento, adquirir derechos sin requisitos esenciales o lo que diga una ley), producen nulidad de pleno derecho. Cualquier otra infracción, incluida la desviación de poder, produce anulabilidad; los defectos de forma y los retrasos solo anulan en casos concretos. La Ley limita los efectos de la invalidez: no arrastra a actos independientes, permite convertir el acto en otro válido, conservar trámites y convalidar los anulables.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Nulidad de pleno derecho", articulos: "art. 47", url: `${L}#a47` },
      { seccion: S2, titulo: "Anulabilidad", articulos: "art. 48", url: `${L}#a48` },
      { seccion: S3, titulo: "Límites, conversión, conservación y convalidación", articulos: "arts. 49 a 52", url: `${L}#a49` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 15 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Causas de nulidad de pleno derecho de los actos (art. 47.1)", "a) lesionar derechos y libertades susceptibles de amparo; b) órgano manifiestamente incompetente por materia o territorio; c) contenido imposible; d) infracción penal; e) prescindir total y absolutamente del procedimiento o de las reglas esenciales de los órganos colegiados; f) adquirir facultades o derechos sin requisitos esenciales; g) otros que fije una ley"],
        ["Incompetencia que causa nulidad (art. 47.1.b)", "Solo la manifiesta por razón de la materia o del territorio (no la jerárquica)"],
        ["Derechos cuya lesión causa nulidad (art. 47.1.a)", "Los derechos y libertades susceptibles de amparo constitucional"],
        ["Vicio de procedimiento que causa nulidad (art. 47.1.e)", "Prescindir total y absolutamente del procedimiento legalmente establecido o de las reglas esenciales para formar la voluntad de los órganos colegiados"],
        ["Actos presuntos y nulidad (art. 47.1.f)", "Son nulos los actos expresos o presuntos contrarios al ordenamiento por los que se adquieren facultades o derechos sin los requisitos esenciales"],
        ["Nulidad de las disposiciones administrativas (art. 47.2)", "Las que vulneren la Constitución, las leyes u otras de rango superior, regulen materias reservadas a la ley o establezcan la retroactividad de disposiciones sancionadoras no favorables o restrictivas de derechos individuales"],
        ["¿Puede una ley crear nuevas causas de nulidad (art. 47.1.g)?", "Sí, cualquier otra que se establezca expresamente en una disposición con rango de ley"],
      ],
      preguntas: [
        ["facil", "Es nulo de pleno derecho el acto:", ["Que tenga un contenido imposible", "Dictado fuera de plazo", "Con un defecto de forma subsanable"], "Art. 47.1.c) Ley 39/2015."],
        ["media", "Un acto dictado por un órgano incompetente por razón de la jerarquía, pero no manifiestamente incompetente por la materia o el territorio, es:", ["Anulable", "Nulo de pleno derecho", "Inexistente"], "El art. 47.1.b) solo recoge la incompetencia manifiesta por materia o territorio; el resto es anulabilidad (art. 48) convalidable por el superior (art. 52.3)."],
        ["media", "Son nulos de pleno derecho los actos dictados prescindiendo:", ["Total y absolutamente del procedimiento legalmente establecido", "De un informe facultativo", "Del trámite de información pública cuando es potestativo"], "Art. 47.1.e) Ley 39/2015."],
        ["media", "Los actos que lesionen derechos y libertades son nulos de pleno derecho cuando esos derechos sean:", ["Susceptibles de amparo constitucional", "De cualquier naturaleza", "Solo de carácter económico"], "Art. 47.1.a) Ley 39/2015."],
        ["dificil", "Es nula de pleno derecho la disposición administrativa que:", ["Establezca la retroactividad de disposiciones sancionadoras no favorables", "Establezca la retroactividad de disposiciones favorables", "Se apruebe por un órgano colegiado"], "Art. 47.2 Ley 39/2015."],
        ["media", "Un acto presunto por el que se adquiere una licencia sin cumplir los requisitos esenciales para obtenerla es:", ["Nulo de pleno derecho", "Válido, porque el silencio fue positivo", "Simplemente irregular"], "Art. 47.1.f) Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Anulabilidad (art. 48.1)", "Son anulables los actos que incurran en cualquier infracción del ordenamiento jurídico, incluso la desviación de poder"],
        ["Desviación de poder", "Ejercicio de potestades administrativas para fines distintos de los fijados por el ordenamiento; es causa de anulabilidad (art. 48.1)"],
        ["Defecto de forma (art. 48.2)", "Solo produce anulabilidad si el acto carece de los requisitos formales indispensables para alcanzar su fin o causa indefensión"],
        ["Actuaciones fuera de plazo (art. 48.3)", "Solo implican anulabilidad cuando así lo imponga la naturaleza del término o plazo"],
        ["Diferencia básica entre nulidad y anulabilidad", "La nulidad se limita a causas tasadas y graves (art. 47); la anulabilidad es la regla general para el resto de infracciones y admite convalidación (art. 52)"],
      ],
      preguntas: [
        ["facil", "La desviación de poder es causa de:", ["Anulabilidad", "Nulidad de pleno derecho", "Inexistencia del acto"], "Art. 48.1 Ley 39/2015."],
        ["media", "El defecto de forma solo determinará la anulabilidad cuando:", ["El acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a indefensión", "Lo alegue el interesado", "El acto sea desfavorable"], "Art. 48.2 Ley 39/2015."],
        ["media", "La realización de actuaciones fuera del tiempo establecido:", ["Solo implica anulabilidad cuando lo imponga la naturaleza del término o plazo", "Siempre determina nulidad", "Siempre determina anulabilidad"], "Art. 48.3 Ley 39/2015."],
        ["media", "Son anulables los actos que incurran en:", ["Cualquier infracción del ordenamiento jurídico no constitutiva de nulidad", "Solo infracciones de la Constitución", "Solo infracciones penales"], "Art. 48.1 Ley 39/2015, en relación con el art. 47."],
        ["dificil", "Una resolución dictada un día después de vencer el plazo para resolver, sin otras irregularidades:", ["No es inválida por ese solo hecho, salvo que la naturaleza del plazo lo imponga", "Es nula de pleno derecho", "Es inexistente"], "Art. 48.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Actos sucesivos independientes (art. 49.1)", "La nulidad o anulabilidad de un acto no implica la de los sucesivos del procedimiento que sean independientes del primero"],
        ["Invalidez parcial (art. 49.2)", "No implica la de las partes independientes, salvo que la parte viciada sea tan importante que sin ella el acto no se habría dictado"],
        ["Conversión (art. 50)", "Los actos nulos o anulables que contengan los elementos constitutivos de otro distinto producen los efectos de este"],
        ["Conservación (art. 51)", "El órgano que declare la nulidad o anule dispondrá siempre conservar los actos y trámites cuyo contenido se habría mantenido igual sin la infracción"],
        ["Convalidación (art. 52.1)", "La Administración puede convalidar los actos anulables subsanando sus vicios (no los nulos)"],
        ["Efectos de la convalidación (art. 52.2)", "Desde su fecha, salvo la retroactividad del art. 39.3"],
        ["Convalidación por incompetencia (art. 52.3)", "Si la incompetencia no determina nulidad, puede convalidar el órgano competente cuando sea superior jerárquico del que dictó el acto"],
        ["Convalidación por falta de autorización (art. 52.4)", "Mediante el otorgamiento de la autorización por el órgano competente"],
      ],
      preguntas: [
        ["facil", "La Administración puede convalidar:", ["Los actos anulables", "Los actos nulos de pleno derecho", "Cualquier acto, nulo o anulable"], "Art. 52.1 Ley 39/2015."],
        ["media", "El acto de convalidación produce efecto:", ["Desde su fecha, salvo la retroactividad del art. 39.3", "Siempre desde la fecha del acto convalidado", "Desde su publicación en el BOE"], "Art. 52.2 Ley 39/2015."],
        ["media", "El principio por el que un acto inválido que reúne los elementos de otro distinto produce los efectos de este se llama:", ["Conversión", "Convalidación", "Conservación"], "Art. 50 Ley 39/2015."],
        ["media", "Al declarar una nulidad, el órgano dispondrá siempre la conservación de los actos y trámites:", ["Cuyo contenido se hubiera mantenido igual de no haberse cometido la infracción", "Que sean favorables al interesado", "Que se hayan dictado por el mismo órgano"], "Art. 51 Ley 39/2015."],
        ["dificil", "Si el vicio es una incompetencia no determinante de nulidad, la convalidación puede realizarla:", ["El órgano competente cuando sea superior jerárquico del que dictó el acto", "Cualquier órgano de la misma Administración", "Solo el Pleno"], "Art. 52.3 Ley 39/2015."],
        ["media", "La nulidad de una parte de un acto implica la del acto entero cuando:", ["La parte viciada sea de tal importancia que sin ella el acto no se habría dictado", "Siempre", "Nunca"], "Art. 49.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Nulidad de pleno derecho", "Grado máximo de invalidez, reservado a las causas tasadas del art. 47; el acto nulo no puede convalidarse y puede revisarse de oficio en cualquier momento."],
    [S1, "Incompetencia manifiesta", "Falta de competencia evidente por razón de la materia o del territorio; causa nulidad de pleno derecho (art. 47.1.b)."],
    [S1, "Contenido imposible", "Acto cuyo cumplimiento resulta material o jurídicamente imposible; es nulo de pleno derecho (art. 47.1.c)."],
    [S2, "Anulabilidad", "Invalidez ordinaria por cualquier infracción del ordenamiento no incluida en el art. 47; el acto es eficaz mientras no se anule y puede convalidarse."],
    [S2, "Indefensión", "Situación en que el interesado se ve privado de la posibilidad de defender sus derechos; convierte un defecto de forma en causa de anulabilidad (art. 48.2)."],
    [S3, "Convalidación", "Subsanación por la Administración de los vicios de un acto anulable (art. 52)."],
    [S3, "Conservación de actos", "Mantenimiento de los actos y trámites que no habrían cambiado sin la infracción, al declarar la nulidad o anulación (art. 51)."],
  ],
  casos: [
    {
      slug: "adm-ayto-licencia-sin-requisitos",
      titulo: "Una licencia obtenida por silencio sin requisitos",
      supuesto: "Un particular pidió una autorización municipal para instalar un quiosco en la vía pública. La solicitud no incluía documentación esencial exigida por la ordenanza y el Ayuntamiento no resolvió en plazo, por lo que el particular entiende que ha obtenido la autorización por silencio. Además, en el expediente consta que un funcionario de otro servicio, sin competencia alguna en la materia, le había firmado un «visto bueno».",
      preguntas: [
        [S1, "media", "El acto presunto por el que el particular adquiere la autorización sin los requisitos esenciales es:", ["Nulo de pleno derecho", "Válido por el silencio", "Anulable y convalidable"], "Art. 47.1.f) Ley 39/2015."],
        [S1, "media", "El «visto bueno» firmado por un funcionario de un servicio sin competencia en la materia sería, si se considerase un acto, un acto dictado por órgano:", ["Manifiestamente incompetente por razón de la materia, causa de nulidad", "Competente", "Incompetente por jerarquía, causa de anulabilidad"], "Art. 47.1.b) Ley 39/2015."],
        [S3, "media", "¿Podría el Ayuntamiento convalidar la autorización presunta?", ["No, solo se convalidan los actos anulables", "Sí, en todo caso", "Sí, si paga una tasa"], "Art. 52.1 Ley 39/2015."],
        [S1, "facil", "La lista de causas de nulidad del art. 47.1 es:", ["Cerrada, salvo las que añada expresamente una ley", "Abierta a cualquier infracción", "Fijada por cada ordenanza"], "Art. 47.1.g) Ley 39/2015."],
        [S2, "media", "Si el único vicio fuera que falta un documento no esencial que no causa indefensión, el acto sería:", ["Válido, porque el defecto de forma no determina anulabilidad", "Nulo de pleno derecho", "Anulable en todo caso"], "Art. 48.2 Ley 39/2015."],
        [S3, "media", "Si se anula la autorización, ¿se anulan automáticamente los trámites independientes posteriores, como un informe de tráfico encargado aparte?", ["No, la invalidez no alcanza a los actos sucesivos independientes", "Sí, siempre", "Sí, salvo que lo pida el particular"], "Art. 49.1 Ley 39/2015."],
        [S3, "media", "Al declarar la nulidad, el órgano debe conservar:", ["Los trámites cuyo contenido no habría cambiado sin la infracción", "Solo los favorables al particular", "Ningún trámite"], "Art. 51 Ley 39/2015."],
        [S1, "media", "Si la autorización lesionara un derecho fundamental susceptible de amparo de un tercero, sería:", ["Nula de pleno derecho", "Anulable", "Válida hasta su recurso"], "Art. 47.1.a) Ley 39/2015."],
        [S2, "dificil", "El retraso del Ayuntamiento en resolver, por sí mismo:", ["Solo invalidaría el acto si lo impusiera la naturaleza del plazo", "Hace nulo cualquier acto posterior", "Impide resolver expresamente"], "Art. 48.3 Ley 39/2015."],
        [S3, "media", "Si la autorización, aunque inválida como tal, reuniera los elementos de un permiso provisional distinto, produciría:", ["Los efectos de ese otro acto, por conversión", "Ningún efecto", "Los efectos de la autorización definitiva"], "Art. 50 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-decreto-competencia-delegada",
      titulo: "Un decreto firmado por quien no debía",
      supuesto: "Un jefe de unidad firma una resolución sobre la concesión de un permiso a un funcionario, cuando la competencia corresponde al jefe del Servicio de Relaciones Laborales, superior jerárquico suyo. La resolución omite además el pie de recursos. El funcionario la ha recurrido en plazo sin problema.",
      preguntas: [
        [S2, "media", "La incompetencia del jefe de unidad, al ser jerárquica dentro de la misma materia, determina:", ["Anulabilidad", "Nulidad de pleno derecho", "Inexistencia"], "Arts. 47.1.b) y 48.1 Ley 39/2015."],
        [S3, "media", "¿Quién puede convalidar esa resolución?", ["El jefe del Servicio de Relaciones Laborales, órgano competente y superior jerárquico", "El propio jefe de unidad", "El funcionario interesado"], "Art. 52.3 Ley 39/2015."],
        [S3, "media", "La convalidación surtirá efectos:", ["Desde su fecha, salvo que proceda la retroactividad del art. 39.3", "Desde la fecha de la resolución viciada en todo caso", "Desde que la publique el BOPZ"], "Art. 52.2 Ley 39/2015."],
        [S3, "dificil", "Al ser la concesión del permiso favorable al funcionario, la convalidación podría tener eficacia retroactiva:", ["Sí, si los supuestos de hecho ya existían y no se lesionan derechos de terceros", "No, nunca", "Solo si lo autoriza el Pleno"], "Arts. 52.2 y 39.3 Ley 39/2015."],
        [S2, "media", "La omisión del pie de recursos, que no causó indefensión porque el funcionario recurrió en plazo:", ["No determina por sí sola la anulabilidad", "Hace nula la resolución", "Hace anulable la resolución en todo caso"], "Art. 48.2 Ley 39/2015."],
        [S2, "facil", "La anulabilidad abarca:", ["Cualquier infracción del ordenamiento no incluida en las causas de nulidad", "Solo los delitos", "Solo los defectos de forma"], "Art. 48.1 Ley 39/2015."],
        [S1, "media", "Si quien hubiera firmado fuera un órgano de otra Administración sin competencia territorial sobre Zaragoza, el acto sería:", ["Nulo de pleno derecho", "Anulable", "Válido"], "Art. 47.1.b) Ley 39/2015."],
        [S3, "media", "Si en vez de incompetencia el vicio fuera la falta de una autorización previa, podría convalidarse:", ["Otorgando esa autorización el órgano competente", "No puede convalidarse", "Solo mediante una nueva ley"], "Art. 52.4 Ley 39/2015."],
        [S3, "media", "Si solo una parte de la resolución estuviera viciada y fuera independiente del resto:", ["La invalidez no alcanzaría a las partes independientes", "Se anularía la resolución entera", "Se convertiría en otro acto"], "Art. 49.2 Ley 39/2015."],
        [S2, "media", "Si el jefe de unidad hubiera concedido el permiso para favorecer a un amigo, con un fin distinto del previsto por la norma, habría:", ["Desviación de poder, causa de anulabilidad", "Contenido imposible", "Incompetencia manifiesta"], "Art. 48.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-reglamento-sancionador-retroactivo",
      titulo: "Un reglamento sancionador con efectos hacia atrás",
      supuesto: "Un borrador de ordenanza municipal endurece las sanciones por ocupación indebida de la vía pública y dispone que se aplicará también a las infracciones cometidas en los seis meses anteriores. Además, una junta vecinal adoptó un acuerdo sin convocar a la mitad de sus miembros y sin orden del día.",
      preguntas: [
        [S1, "media", "La ordenanza que aplique hacia atrás sanciones más duras sería:", ["Nula de pleno derecho", "Anulable", "Válida si se publica"], "Art. 47.2 Ley 39/2015."],
        [S1, "media", "También es nula la disposición administrativa que:", ["Regule materias reservadas a la ley", "Se apruebe por el Pleno", "Tenga exposición de motivos"], "Art. 47.2 Ley 39/2015."],
        [S1, "media", "Una ordenanza que contradiga una ley autonómica es:", ["Nula de pleno derecho", "Anulable", "Válida en el término municipal"], "Art. 47.2 Ley 39/2015."],
        [S1, "dificil", "El acuerdo de la junta vecinal adoptado infringiendo las reglas esenciales de formación de la voluntad de los órganos colegiados es:", ["Nulo de pleno derecho", "Anulable", "Válido si nadie lo recurre"], "Art. 47.1.e) Ley 39/2015."],
        [S1, "media", "Un acto que constituya infracción penal o se dicte como consecuencia de esta es:", ["Nulo de pleno derecho", "Anulable", "Válido hasta sentencia firme"], "Art. 47.1.d) Ley 39/2015."],
        [S3, "media", "¿Puede convalidarse el acuerdo nulo de la junta vecinal?", ["No, solo son convalidables los actos anulables", "Sí, por el presidente de la junta", "Sí, por el Pleno"], "Art. 52.1 Ley 39/2015."],
        [S3, "media", "Si de la sesión nula de la junta vecinal se derivara un trámite cuyo contenido sería idéntico aunque se repitiera bien:", ["El órgano que declare la nulidad dispondrá su conservación", "Debe repetirse siempre", "Se convierte en otro acto"], "Art. 51 Ley 39/2015."],
        [S2, "media", "Si la ordenanza solo tuviera un error de redacción que no impide su finalidad ni causa indefensión:", ["No sería inválida por ese defecto de forma", "Sería nula", "Sería inexistente"], "Art. 48.2 Ley 39/2015."],
        [S1, "facil", "La retroactividad de las disposiciones sancionadoras favorables:", ["No está entre las causas de nulidad del art. 47.2", "Es causa de nulidad", "Es causa de anulabilidad"], "Art. 47.2 Ley 39/2015: solo las no favorables o restrictivas."],
        [S2, "media", "En la práctica, la regla general ante una infracción del ordenamiento es:", ["La anulabilidad", "La nulidad de pleno derecho", "La validez"], "Art. 48.1 Ley 39/2015."],
      ],
    },
  ],
});
