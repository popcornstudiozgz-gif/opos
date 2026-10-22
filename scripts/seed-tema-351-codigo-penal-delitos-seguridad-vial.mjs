/**
 * Crea tema-351 — Tema 24 de Policía Local: "Delitos contra la seguridad
 * vial (Libro II, Título XVII, Capítulo IV)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 379 a 385 ter (el art. 382
 * bis tiene en el BOE el ancla «a3-2»).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-351-codigo-penal-delitos-seguridad-vial.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "velocidad-alcohol-drogas";
const S2 = "temeridad-desprecio-vida";
const S3 = "resultado-lesivo-abandono";
const S4 = "negativa-pruebas-sin-permiso";
const S5 = "riesgo-circulacion-comunes";

await sembrarTema({
  tema: {
    slug: "tema-351",
    titulo: "Código Penal: delitos contra la seguridad vial",
    descripcion: "Conducción a velocidad excesiva (60 km/h en vía urbana y 80 km/h en interurbana por encima del límite); conducción bajo la influencia de alcohol o drogas y tasas objetivas (0,60 mg/l en aire espirado y 1,2 g/l en sangre); conducción temeraria con peligro concreto; conducción con manifiesto desprecio por la vida; resultado lesivo y regla concursal del art. 382; abandono del lugar del accidente; negativa a las pruebas de alcoholemia y drogas; conducción sin permiso, sin puntos o privado judicialmente; creación de grave riesgo para la circulación; vehículo como instrumento del delito y rebaja de la pena.",
    contenido: "Recorre el Capítulo IV del Título XVII del Libro II del Código Penal (arts. 379 a 385 ter), el capítulo penal que la Policía Local aplica a diario: los excesos de velocidad y las tasas de alcohol que son delito, la conducción temeraria y la que muestra desprecio por la vida, qué pasa cuando además se causa un resultado lesivo, el abandono del lugar del accidente, la negativa a soplar o a la prueba de drogas, conducir sin permiso o sin puntos, y crear obstáculos o riesgos en la vía.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Velocidad excesiva y conducción bajo la influencia de alcohol o drogas", articulos: "art. 379", url: a("a379") },
      { seccion: S2, titulo: "Conducción temeraria y con manifiesto desprecio por la vida", articulos: "arts. 380-381", url: a("a380") },
      { seccion: S3, titulo: "Resultado lesivo y abandono del lugar del accidente", articulos: "arts. 382-382 bis", url: a("a382") },
      { seccion: S4, titulo: "Negativa a las pruebas y conducción sin permiso", articulos: "arts. 383-384", url: a("a383") },
      { seccion: S5, titulo: "Grave riesgo para la circulación y disposiciones comunes", articulos: "arts. 385-385 ter", url: a("a385") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 24 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Velocidad que es delito (art. 379.1)", "Superar en 60 km/h la velocidad permitida en vía urbana o en 80 km/h en vía interurbana"],
        ["Penas del art. 379", "Prisión de 3 a 6 meses, o multa de 6 a 12 meses, o TBC de 31 a 90 días, y en cualquier caso privación del derecho a conducir de más de 1 y hasta 4 años"],
        ["Conducción bajo la influencia (art. 379.2)", "Conducir un vehículo de motor o ciclomotor bajo la influencia de drogas tóxicas, estupefacientes, psicotrópicos o bebidas alcohólicas: mismas penas"],
        ["Tasas que son delito en todo caso (art. 379.2)", "Más de 0,60 mg/l de alcohol en aire espirado o más de 1,2 g/l en sangre"],
        ["Por debajo de esas tasas", "Puede haber delito si se acredita que conducía bajo la influencia del alcohol (síntomas, forma de conducir), aunque no se alcance la tasa objetiva"],
        ["¿A qué vehículos se refiere el art. 379?", "Vehículos de motor y ciclomotores"],
      ],
      preguntas: [
        ["facil", "Circular a 111 km/h en una vía urbana limitada a 50 km/h…", ["Es delito, porque supera en más de 60 km/h el límite", "Es solo infracción administrativa", "Es delito solo si hay accidente"], "Art. 379.1."],
        ["media", "En vía interurbana, el exceso de velocidad es delito si se supera el límite en…", ["Más de 80 km/h", "Más de 60 km/h", "Más de 50 km/h"], "Art. 379.1."],
        ["media", "¿Qué tasa de alcohol en aire espirado es delito en todo caso?", ["Superior a 0,60 mg/l", "Superior a 0,25 mg/l", "Superior a 0,50 mg/l"], "Art. 379.2."],
        ["media", "¿Qué tasa de alcohol en sangre es delito en todo caso?", ["Superior a 1,2 g/l", "Superior a 0,5 g/l", "Superior a 0,8 g/l"], "Art. 379.2."],
        ["media", "La privación del derecho a conducir en el art. 379 es…", ["De más de uno y hasta cuatro años, en cualquier caso", "Potestativa", "De seis a diez años"], "Art. 379.1."],
        ["dificil", "Un conductor da 0,45 mg/l pero presenta signos evidentes de embriaguez y conduce haciendo eses. ¿Puede haber delito?", ["Sí, por conducir bajo la influencia de bebidas alcohólicas", "No, porque no supera 0,60", "No, solo multa"], "Art. 379.2, primer inciso."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Conducción temeraria (art. 380.1)", "Conducir con temeridad manifiesta poniendo en concreto peligro la vida o integridad de las personas: prisión de 6 meses a 2 años y privación del permiso de más de 1 y hasta 6 años"],
        ["Temeridad manifiesta por ley (art. 380.2)", "Se reputa manifiestamente temeraria la conducción en la que concurren el exceso de velocidad del 379.1 y la tasa objetiva de alcohol del 379.2"],
        ["Manifiesto desprecio por la vida (art. 381.1)", "Conducción temeraria del art. 380 con manifiesto desprecio por la vida de los demás: prisión de 2 a 5 años, multa de 12 a 24 meses y privación del permiso de 6 a 10 años"],
        ["Desprecio por la vida sin peligro concreto (art. 381.2)", "Prisión de 1 a 2 años, multa de 6 a 12 meses y privación de 6 a 10 años"],
        ["Peligro concreto", "Situación real de riesgo para personas determinadas, distinta del peligro abstracto de los delitos del art. 379"],
      ],
      preguntas: [
        ["media", "La conducción temeraria del art. 380 exige poner en peligro…", ["Concreto la vida o la integridad de las personas", "Abstracto la circulación", "Solo bienes materiales"], "Art. 380.1."],
        ["media", "La conducción temeraria se castiga con prisión de…", ["Seis meses a dos años", "Dos a cinco años", "Tres a seis meses"], "Art. 380.1."],
        ["dificil", "Se reputa manifiestamente temeraria la conducción en la que concurren…", ["El exceso de velocidad del 379.1 y la tasa de alcohol del 379.2", "Dos infracciones leves", "Velocidad y no llevar cinturón"], "Art. 380.2."],
        ["media", "La conducción temeraria con manifiesto desprecio por la vida de los demás se castiga con prisión de…", ["Dos a cinco años", "Seis meses a dos años", "Uno a cuatro años"], "Art. 381.1."],
        ["media", "La privación del permiso en el art. 381 es de…", ["Seis a diez años", "Uno a cuatro años", "Uno a seis años"], "Art. 381.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Regla del art. 382", "Si los delitos de los arts. 379 a 381 causan además un resultado lesivo constitutivo de delito, se aprecia solo la infracción más gravemente penada, en su mitad superior, con condena a la responsabilidad civil"],
        ["Resultado lesivo con el art. 381", "Se impone en todo caso la privación del permiso del art. 381 en su mitad superior"],
        ["Abandono del lugar del accidente (art. 382 bis.1)", "El conductor que, fuera de los casos del art. 195, voluntariamente y sin riesgo propio o ajeno, abandona el lugar tras causar un accidente con fallecidos o lesionados de los arts. 147.1, 149 o 150"],
        ["Pena si el accidente fue imprudente (art. 382 bis.2)", "Prisión de 6 meses a 4 años y privación del permiso de 1 a 4 años"],
        ["Pena si el accidente fue fortuito (art. 382 bis.3)", "Prisión de 3 a 6 meses y privación del permiso de 6 meses a 2 años"],
        ["Relación con la omisión del deber de socorro", "El art. 382 bis se aplica fuera de los casos del art. 195 (cuando no hay víctima desamparada a la que socorrer, por ejemplo porque ha fallecido o ya la atienden otros)"],
      ],
      preguntas: [
        ["media", "Si un conductor ebrio causa lesiones constitutivas de delito, el art. 382 manda apreciar…", ["Solo la infracción más gravemente penada, en su mitad superior", "Ambos delitos por separado", "Solo el delito de lesiones en su mitad inferior"], "Art. 382."],
        ["media", "El abandono del lugar del accidente imprudente con fallecidos se castiga con prisión de…", ["Seis meses a cuatro años", "Tres a seis meses", "Uno a dos años"], "Art. 382 bis.2."],
        ["dificil", "¿Se aplica el art. 382 bis cuando concurre la omisión del deber de socorro del art. 195?", ["No, se aplica fuera de los casos del art. 195", "Sí, siempre ambos", "Solo si hay alcohol"], "Art. 382 bis.1."],
        ["media", "Si el accidente que se abandona fue fortuito, la pena es…", ["Prisión de tres a seis meses y privación de seis meses a dos años", "Prisión de seis meses a cuatro años", "Multa solo"], "Art. 382 bis.3."],
        ["media", "El abandono exige que el conductor se marche…", ["Voluntariamente y sin riesgo propio o de terceros", "Por miedo a una agresión", "Para pedir ayuda"], "Art. 382 bis.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Negativa a las pruebas (art. 383)", "El conductor que, requerido por un agente de la autoridad, se niega a someterse a las pruebas legales de alcoholemia y drogas: prisión de 6 meses a 1 año y privación del permiso de más de 1 y hasta 4 años"],
        ["¿Quién debe requerir las pruebas del art. 383?", "Un agente de la autoridad"],
        ["Conducción sin puntos (art. 384, párrafo primero)", "Conducir tras la pérdida de vigencia del permiso por pérdida total de puntos: prisión de 3 a 6 meses o multa de 12 a 24 meses o TBC de 31 a 90 días"],
        ["Otros supuestos del art. 384", "Conducir tras haber sido privado cautelar o definitivamente del permiso por decisión judicial, y conducir sin haber obtenido nunca permiso o licencia"],
        ["Diferencia con la falta de permiso de la clase adecuada", "El art. 384 castiga no haber obtenido nunca permiso; tener un permiso de clase distinta no está en el art. 384"],
      ],
      preguntas: [
        ["facil", "Negarse a la prueba de alcoholemia requerida por un agente es…", ["Delito del art. 383", "Solo infracción administrativa", "Desobediencia leve"], "Art. 383."],
        ["media", "La negativa a las pruebas se castiga con prisión de…", ["Seis meses a un año y privación del permiso de más de uno y hasta cuatro años", "Tres a seis meses", "Dos a cinco años"], "Art. 383."],
        ["media", "Conducir sin haber obtenido nunca permiso de conducción es…", ["Delito del art. 384", "Infracción leve", "Delito del art. 383"], "Art. 384, párrafo segundo."],
        ["media", "Conducir con el permiso sin vigencia por pérdida total de puntos se castiga con…", ["Prisión de 3 a 6 meses, multa de 12 a 24 meses o TBC de 31 a 90 días", "Prisión de seis meses a dos años", "Solo multa administrativa"], "Art. 384."],
        ["dificil", "Conducir estando privado cautelarmente del permiso por un juez…", ["Es delito del art. 384", "No es delito por ser cautelar", "Es delito del art. 383"], "Art. 384, párrafo segundo."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Grave riesgo para la circulación (art. 385)", "Originarlo colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables, alterando o anulando la señalización, o no restableciendo la seguridad de la vía cuando hay obligación"],
        ["Penas del art. 385", "Prisión de 6 meses a 2 años o multa de 12 a 24 meses y TBC de 10 a 40 días"],
        ["Vehículo como instrumento del delito (art. 385 bis)", "El vehículo utilizado en estos delitos se considera instrumento del delito a efectos del decomiso (arts. 127 y 128)"],
        ["Rebaja del art. 385 ter", "En los arts. 379, 383, 384 y 385 el juez puede rebajar en un grado la prisión por la menor entidad del riesgo"],
      ],
      preguntas: [
        ["media", "Colocar en la vía obstáculos imprevisibles que originan grave riesgo para la circulación es delito del…", ["Art. 385", "Art. 380", "Art. 263"], "Art. 385.1.ª."],
        ["media", "Arrancar una señal de stop originando grave riesgo para la circulación es…", ["Delito del art. 385", "Solo daños", "Hurto"], "Art. 385.1.ª."],
        ["media", "El vehículo usado en un delito contra la seguridad vial puede ser…", ["Decomisado como instrumento del delito", "Nunca decomisado", "Subastado por el Ayuntamiento sin juicio"], "Art. 385 bis."],
        ["dificil", "¿En cuál de estos delitos NO prevé el art. 385 ter la rebaja de un grado de la prisión?", ["Conducción temeraria del art. 380", "Negativa a las pruebas del art. 383", "Conducción sin permiso del art. 384"], "Art. 385 ter: solo arts. 379, 383, 384 y 385."],
      ],
    },
  ],
  glosario: [
    [S1, "Tasa objetiva", "Umbral de alcohol (0,60 mg/l en aire o 1,2 g/l en sangre) a partir del cual la conducción es delito en todo caso."],
    [S1, "Delito de peligro abstracto", "El que castiga la conducta peligrosa sin exigir un peligro concreto para personas determinadas (art. 379)."],
    [S2, "Temeridad manifiesta", "Conducción que crea un riesgo evidente y grave; presupuesto del art. 380."],
    [S2, "Peligro concreto", "Riesgo real y efectivo para la vida o integridad de personas determinadas."],
    [S3, "Abandono del lugar del accidente", "Marcharse voluntariamente tras causar un accidente con muertos o lesionados graves (art. 382 bis)."],
    [S4, "Pérdida de vigencia", "Extinción del permiso por pérdida total de los puntos asignados."],
    [S5, "Instrumento del delito", "Medio empleado para cometerlo; en seguridad vial, el vehículo, susceptible de decomiso."],
  ],
  casos: [
    {
      slug: "caso-control-alcoholemia-noche",
      titulo: "Un control de alcoholemia nocturno",
      supuesto: "En un control preventivo en la Avenida de Navarra, la Policía Local detiene a un turismo. El conductor presenta fuerte olor a alcohol y habla con dificultad. La primera prueba arroja 0,72 mg/l en aire espirado. Su acompañante, que también tiene permiso, se niega a soplar cuando se le pide, aunque no conducía.",
      preguntas: [
        [S1, "facil", "Con 0,72 mg/l en aire espirado, ¿comete delito el conductor?", ["Sí, supera la tasa de 0,60 mg/l", "No, solo infracción", "Solo si ha causado un accidente"], "Art. 379.2."],
        [S1, "media", "¿Qué penas puede imponerse por el art. 379?", ["Prisión de 3 a 6 meses o multa de 6 a 12 meses o TBC de 31 a 90 días, y privación del permiso de más de 1 a 4 años", "Prisión de dos a cinco años", "Solo retirada de puntos"], "Art. 379."],
        [S4, "media", "¿Comete delito del art. 383 el acompañante que no conducía y se niega a soplar?", ["No: el art. 383 se refiere al conductor", "Sí", "Solo si tiene permiso"], "Art. 383."],
        [S4, "media", "Si fuera el conductor quien se negara a la prueba, cometería…", ["Delito del art. 383", "Solo una infracción grave", "Desobediencia leve"], "Art. 383."],
        [S4, "dificil", "Si el conductor se negara y además diera positivo después en análisis de sangre por encima de 1,2 g/l, ¿podría responder por ambos?", ["Sí, son conductas distintas tipificadas en los arts. 379.2 y 383", "No, solo uno", "Ninguno"], "Arts. 379.2 y 383."],
        [S2, "media", "Si además circulara a 140 km/h en una vía urbana de 50, la conducción se reputaría…", ["Manifiestamente temeraria (art. 380.2)", "Normal", "Solo exceso de velocidad"], "Art. 380.2."],
        [S2, "media", "Para castigarlo por el art. 380 hace falta además…", ["Que ponga en concreto peligro la vida o integridad de las personas", "Que haya muertos", "Que sea reincidente"], "Art. 380.1."],
        [S5, "media", "El turismo podría ser…", ["Decomisado como instrumento del delito", "Devuelto siempre", "Subastado sin juicio"], "Art. 385 bis."],
        [S5, "dificil", "¿Puede el juez rebajar en un grado la prisión por la menor entidad del riesgo en el delito del art. 379?", ["Sí", "No", "Solo en el art. 380"], "Art. 385 ter."],
        [S1, "media", "Si solo diera 0,50 mg/l y condujera con normalidad sin síntomas, el hecho sería en principio…", ["Una infracción administrativa, no delito", "Delito del art. 379.2 en todo caso", "Delito del art. 383"], "Art. 379.2: por debajo de 0,60 exige acreditar la influencia."],
      ],
    },
    {
      slug: "caso-atropello-fuga-sin-permiso",
      titulo: "Atropello y fuga de un conductor sin permiso",
      supuesto: "Un joven que nunca ha obtenido el permiso de conducir atropella a un peatón en un paso de cebra en el Actur por ir mirando el móvil. Otros peatones atienden al herido, que sufre fracturas que requieren cirugía, y el conductor se marcha del lugar. Lo localizan días después.",
      preguntas: [
        [S4, "media", "Conducir sin haber obtenido nunca permiso es…", ["Delito del art. 384", "Infracción leve", "Delito del art. 380"], "Art. 384, párrafo segundo."],
        [S3, "media", "Como otros atendían al herido y se marchó voluntariamente sin riesgo, puede responder por…", ["Abandono del lugar del accidente (art. 382 bis)", "Omisión del deber de socorro del 195 siempre", "Nada"], "Art. 382 bis.1."],
        [S3, "media", "Siendo el accidente imprudente, la pena del abandono es…", ["Prisión de seis meses a cuatro años y privación del permiso de uno a cuatro años", "Prisión de tres a seis meses", "Multa"], "Art. 382 bis.2."],
        [S3, "media", "Las fracturas que requieren cirugía encajan en las lesiones del…", ["Art. 147.1", "Art. 147.2", "Art. 147.3"], "Art. 147.1: tratamiento quirúrgico."],
        [S3, "dificil", "Las lesiones causadas por ir mirando el móvil serán, como delito imprudente…", ["Grave o menos grave según la entidad de la imprudencia (art. 152)", "Siempre dolosas", "Nunca delito"], "Art. 152."],
        [S4, "dificil", "¿Se le puede privar del derecho a conducir aunque nunca haya tenido permiso?", ["Sí: la pena priva del derecho, aunque no tenga permiso", "No", "Solo si lo obtiene después"], "Arts. 39.d) y 47 (la pena priva del derecho a conducir)."],
        [S1, "media", "Si diera 0,80 mg/l en aire espirado, además cometería…", ["El delito del art. 379.2", "Nada más", "El del art. 385"], "Art. 379.2."],
        [S3, "media", "Si con ese delito del art. 379 causara las lesiones, el art. 382 obliga a…", ["Apreciar solo la infracción más gravemente penada en su mitad superior", "Sumar todas las penas", "Aplicar la más leve"], "Art. 382."],
        [S4, "media", "Pena del art. 384…", ["Prisión de 3 a 6 meses o multa de 12 a 24 meses o TBC de 31 a 90 días", "Prisión de seis meses a un año", "Solo multa administrativa"], "Art. 384."],
        [S5, "media", "El vehículo utilizado se considera…", ["Instrumento del delito", "Efecto del delito", "Irrelevante"], "Art. 385 bis."],
      ],
    },
    {
      slug: "caso-aceite-calzada-obras",
      titulo: "Aceite en la calzada y una obra sin señalizar",
      supuesto: "Varios motoristas sufren caídas en una curva del Tercer Cinturón. La patrulla comprueba que un camión de una empresa ha derramado aceite y no ha avisado ni limpiado. A pocos metros, una empresa de obras ha dejado una zanja sin señalizar tras retirar las vallas al acabar la jornada.",
      preguntas: [
        [S5, "media", "Derramar sustancias deslizantes que originan grave riesgo para la circulación es delito del…", ["Art. 385.1.ª", "Art. 380", "Art. 263"], "Art. 385.1.ª."],
        [S5, "media", "No restablecer la seguridad de la vía cuando hay obligación de hacerlo es…", ["Delito del art. 385.2.ª", "Atípico", "Infracción leve siempre"], "Art. 385.2.ª."],
        [S5, "media", "Pena del art. 385…", ["Prisión de seis meses a dos años o multa de 12 a 24 meses y TBC de 10 a 40 días", "Prisión de dos a cinco años", "Solo multa administrativa"], "Art. 385."],
        [S5, "media", "Dejar una zanja sin señalizar tras retirar las vallas puede encajar en…", ["El art. 385 si origina grave riesgo para la circulación", "Ningún delito", "El art. 384"], "Art. 385.1.ª («por cualquier otro medio») y 2.ª."],
        [S5, "dificil", "¿Exige el art. 385 que se produzca un accidente?", ["No: basta con originar un grave riesgo para la circulación", "Sí", "Solo si hay muertos"], "Art. 385."],
        [S5, "media", "Anular la señalización para crear un riesgo grave es otra modalidad del…", ["Art. 385.1.ª", "Art. 379", "Art. 383"], "Art. 385.1.ª."],
        [S5, "dificil", "¿Puede el juez rebajar en un grado la prisión del art. 385 por la menor entidad del riesgo?", ["Sí", "No", "Solo si se reparan los daños"], "Art. 385 ter."],
        [S3, "media", "Si un motorista resultara con lesiones del art. 147.1 por imprudencia, ¿cómo se resuelve con el art. 385?", ["El art. 382 no menciona el 385, por lo que se aplican las reglas generales de concurso", "Se aplica el art. 382", "Solo el 385"], "Art. 382 se refiere a los arts. 379, 380 y 381."],
        [S2, "media", "¿Es el art. 385 un delito que cometa necesariamente un conductor?", ["No, puede cometerlo cualquiera que origine el riesgo", "Sí", "Solo profesionales"], "Art. 385: «el que originare»."],
        [S5, "facil", "¿En qué capítulo del Código está el art. 385?", ["Capítulo IV del Título XVII, delitos contra la seguridad vial", "Título XIII", "Título XXII"], "Capítulo IV."],
      ],
    },
  ],
});
