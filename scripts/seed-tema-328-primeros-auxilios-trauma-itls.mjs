/**
 * Crea tema-328 — Tema 33 de Bombero/a Conductor/a: "Primeros auxilios.
 * Según la tercera edición en español de ITLS (International Trauma Life
 * Support): Evaluación y manejo inicial del paciente de trauma. Valoración
 * de la escena. Destrezas en el manejo del trauma espinal."
 *
 * Fuente: Tema 33 "Primeros auxilios" de la Escuela de Bomberos del
 * Ayuntamiento de Zaragoza, leído íntegro, que desarrolla los contenidos ITLS
 * que cita el temario oficial. Contenido sanitario sin norma legal: se ciñe
 * a lo que expone el documento oficial.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-328-primeros-auxilios-trauma-itls.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/TEMA_33_Primeros_auxilios_.pdf";
const S1 = "evaluacion-primaria-itls";
const S2 = "valoracion-escena";
const S3 = "mecanismo-lesion";
const S4 = "trauma-espinal";

await sembrarTema({
  tema: {
    slug: "tema-328",
    titulo: "Primeros auxilios (II): evaluación del paciente de trauma y trauma espinal según ITLS",
    descripcion: "Evaluación primaria ITLS (valoración de la escena, evaluación inicial, revisión rápida de trauma o exploración enfocada), intervenciones críticas y decisión de traslado; exploración continua y evaluación secundaria; seguridad de la escena y mecanismo de lesión; restricción de movimientos espinales con collarín, tabla corta, tabla larga y camilla de cuchara.",
    contenido: "Sigue el Tema 33 de la Escuela de Bomberos sobre el método ITLS: cómo valorar la escena antes de acercarse, cómo hacer la evaluación inicial en menos de dos minutos, cuándo basta una exploración enfocada y cuándo hace falta una revisión rápida de trauma, qué lesiones obligan a trasladar sin demora, qué enseñan los distintos tipos de colisión y cómo se restringe el movimiento de la columna.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 33: Primeros auxilios en trauma (ITLS)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Evaluación primaria, exploración continua y evaluación secundaria", articulos: "Tema 33, apartado 1", url: FUENTE },
      { seccion: S2, titulo: "Valoración de la escena", articulos: "Tema 33, apartado 2", url: FUENTE },
      { seccion: S3, titulo: "Mecanismo de lesión y colisiones", articulos: "Tema 33, apartado 2.4", url: FUENTE },
      { seccion: S4, titulo: "Destrezas en el manejo del trauma espinal", articulos: "Tema 33, apartado 3", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 33 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿De qué partes se compone la evaluación ITLS del paciente de trauma?", "Evaluación primaria (valoración de la escena, evaluación inicial y revisión rápida de trauma o exploración enfocada), evaluación secundaria y exploración continua"],
        ["¿En cuánto tiempo debe completarse la evaluación primaria y cuánto puede durar la estancia en la escena con un paciente crítico?", "La evaluación primaria en menos de 2 minutos y el tiempo total en la escena no más de 5 minutos"],
        ["¿En qué tres situaciones se interrumpe la evaluación primaria?", "Si la escena se vuelve insegura, si hay una obstrucción de vía aérea que no se resuelve con maniobras básicas y en caso de paro cardiorrespiratorio"],
        ["¿Qué incluye la evaluación inicial?", "Impresión general, nivel de consciencia con estabilización cervical, y vía aérea, respiración y circulación (ABC); con hemorragia importante, C-A-B-C"],
        ["¿Cuándo se hace revisión rápida de trauma y cuándo exploración enfocada?", "RRT con mecanismo generalizado y peligroso o inconsciente con mecanismo desconocido; exploración enfocada con mecanismo focalizado que sugiere lesión aislada o no peligroso"],
        ["¿Qué procedimientos se hacen en la escena antes del traslado?", "Vía aérea, ventilación, oxígeno, RCP, control de hemorragias importantes, sellado de heridas torácicas abiertas, estabilización de tórax inestable y de objetos empalados, descompresión de neumotórax a tensión e inmovilización"],
        ["¿Cada cuánto se hace la exploración continua?", "Cada 5 minutos si el paciente está crítico y cada 15 si está estable, tantas veces como permita el traslado"],
      ],
      preguntas: [
        ["facil", "¿En cuánto tiempo debe completarse la evaluación inicial?", ["Menos de 2 minutos", "Menos de 20 minutos", "Una hora"], "Tema 33."],
        ["media", "¿Qué escala valora el nivel de consciencia en la evaluación inicial?", ["AVDI", "Glasgow completa", "START"], "Tema 33."],
        ["media", "¿Qué frecuencia de pulso en un adulto se considera «muy rápida»?", ["Por encima de 120 lpm", "Por encima de 80 lpm", "Por encima de 200 lpm"], "Por debajo de 60 se considera muy lenta."],
        ["media", "¿Qué se hace con una hemorragia de extremidad no controlable que amenaza la vida?", ["Torniquete inmediatamente", "Elevar la extremidad", "Esperar a la ambulancia"], "Tema 33."],
        ["dificil", "¿Se recomienda elevar la extremidad mientras se comprime el punto sangrante?", ["No, no hay evidencia suficiente", "Sí, siempre", "Solo en niños"], "Tema 33."],
        ["media", "Si en la RRT se detecta una pelvis inestable, ¿qué no debe hacerse?", ["Volver a explorarla", "Inmovilizarla", "Comunicarlo"], "Aumentaría el riesgo de sangrado interno."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué incluye la valoración de la escena?", "Precauciones estándar frente a fluidos, peligros de la escena, número total de víctimas y recursos necesarios, y mecanismo de lesión"],
        ["¿Cuándo empieza la valoración de la escena?", "Durante el desplazamiento, pensando en material y recursos; la información de la central puede ser exagerada o errónea"],
        ["¿Cómo debe colocarse el vehículo asistencial?", "Cerca pero a distancia segura, orientado hacia la salida y preferiblemente de espaldas a la escena para poder irse rápido"],
        ["¿Qué es la «evaluación desde el cristal»?", "Valorar desde el vehículo, antes de bajar, riesgos de fuego, tóxicos, electrocución, estructuras inestables, escenas de crimen o explosión y testigos peligrosos"],
        ["¿Qué regla se aplica para entrar en áreas peligrosas?", "Nunca solo: con un compañero, línea de seguridad y el equipo de protección y respiración autónomo cuando haya bajo oxígeno o tóxicos"],
        ["¿Qué recurso suele necesitarse por cada paciente con lesiones graves?", "Una ambulancia"],
      ],
      preguntas: [
        ["facil", "¿Son siempre necesarios los guantes en una escena de trauma?", ["Sí, y deben cambiarse tras cada víctima", "No", "Solo si hay mucha sangre"], "Tema 33."],
        ["media", "¿Dónde debe estacionarse el vehículo en una escena de explosión?", ["Fuera de la zona donde los cristales están rotos", "Junto al foco", "En cualquier lugar"], "Tema 33."],
        ["media", "¿Debe acercarse el equipo a una escena de crimen sin seguridad pública?", ["No", "Sí, siempre", "Solo de día"], "Tema 33."],
        ["media", "¿Qué hacer si hay más víctimas de las que el equipo puede atender?", ["Pedir ayuda adicional y activar protocolos de IMV", "Atender solo a una", "Marcharse"], "Tema 33."],
        ["dificil", "¿En qué lugares no se entra sin protección respiratoria por bajo oxígeno y tóxicos?", ["Alcantarillas, bodegas de barcos o silos", "Parques", "Calles abiertas"], "Tema 33."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Por qué es importante el mecanismo de lesión?", "Porque las lesiones siguen patrones predecibles: junto con la exploración permite identificar hasta el 90 % de las lesiones"],
        ["¿Qué tres colisiones se producen en un accidente de vehículo?", "La del vehículo, la del cuerpo y la de los órganos"],
        ["¿Qué ley física explica las lesiones por desaceleración?", "La primera ley de Newton: un cuerpo en movimiento sigue en línea recta salvo que una fuerza actúe sobre él"],
        ["¿Cuáles son los cinco mecanismos más frecuentes de colisión de vehículos?", "Frontal, lateral, posterior (por alcance), vuelco y rotacional"],
        ["¿De qué protege el airbag en las colisiones múltiples?", "Solo de la primera colisión"],
        ["¿Qué dato aporta el Tema 33 sobre el casco de los motoristas?", "Previene el trauma craneal, responsable del 75 % de las muertes por motocicleta"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de trauma predomina en el medio urbano según el Tema 33?", ["El penetrante", "El contuso", "El térmico"], "El contuso es más frecuente en el medio rural."],
        ["media", "¿Qué son las colisiones secundarias?", ["Los golpes de objetos sueltos u otros ocupantes que actúan como proyectiles", "Las del segundo coche", "Las del día siguiente"], "Tema 33."],
        ["media", "¿Qué porcentaje de víctimas de alta energía sin lesiones aparentes desarrolla lesiones graves después?", ["Del 5 al 15 %", "Ninguno", "El 90 %"], "Tema 33."],
        ["media", "¿Qué proporción de las muertes por accidente agrícola representa el vuelco de tractor?", ["El 50 %", "El 5 %", "El 99 %"], "Tema 33."],
        ["dificil", "¿Qué indica la deformidad del interior del vehículo?", ["Los puntos de impacto del paciente", "El año del vehículo", "El combustible"], "Tema 33."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué componentes tiene un sistema de restricción de movimientos espinales?", "Tabla larga o espinal, collarín cervical, correas de sujeción y dispositivo de restricción de movimientos cefálicos"],
        ["¿Cómo se estabiliza la columna cervical al inicio?", "En posición neutra, sujetando la cabeza (no el cuello) con firmeza y sin movimientos bruscos, sin soltarla hasta que otro la releve o haya dispositivo"],
        ["¿Qué hacer si al alinear el cuello el paciente refiere dolor o hay resistencia?", "Inmovilizar la columna en la posición encontrada, sin intentar rectificarla"],
        ["¿Para qué sirve la tabla corta?", "Para pacientes cuya posición no permite la tabla larga (p. ej. sentados en un vehículo); se estabilizan en ella y se transfieren a la tabla larga"],
        ["¿Qué es el rodamiento?", "La maniobra coordinada para girar al paciente en bloque y colocarlo sobre la tabla larga, aprovechando para explorar la espalda"],
        ["¿Cuándo se usa la camilla de cuchara (palas)?", "Para pasar a la tabla larga a un paciente con pelvis inestable o fractura bilateral de fémur"],
      ],
      preguntas: [
        ["facil", "¿Qué se sujeta para estabilizar la columna cervical?", ["La cabeza", "El cuello", "Los hombros"], "Tema 33."],
        ["media", "¿Restringe por completo el collarín el movimiento del cuello?", ["No, solo en cierto grado", "Sí, totalmente", "No sirve para nada"], "Tema 33."],
        ["media", "¿Qué dispositivo se usa con un paciente sentado en el coche antes de pasarlo a la tabla larga?", ["La tabla corta o dispositivo de extracción", "La camilla de cuchara", "La silla de ruedas"], "Tema 33."],
        ["media", "¿Debe hiperextenderse el cuello para abrir la vía aérea en un paciente de trauma?", ["Nunca", "Siempre", "Solo si es joven"], "Tema 33."],
        ["dificil", "Con una pelvis inestable, ¿cómo se pasa al paciente a la tabla larga?", ["Con una camilla de cuchara", "Con rodamiento normal", "Arrastrándolo"], "Tema 33."],
      ],
    },
  ],
  glosario: [
    [S1, "Revisión rápida de trauma", "Exploración breve y ordenada de cabeza a pies para identificar lesiones que amenacen la vida."],
    [S1, "Cargar y llevar", "Decisión de trasladar de inmediato a un paciente crítico, haciendo la mayoría de intervenciones durante el traslado."],
    [S2, "Precauciones estándar", "Medidas de protección (guantes, protección ocular) frente a sangre y fluidos potencialmente infecciosos."],
    [S3, "Mecanismo de lesión", "Forma en que se transfirió la energía al paciente, que orienta sobre las lesiones probables."],
    [S4, "RME", "Restricción de movimientos espinales mediante collarín, tabla y dispositivos de sujeción."],
    [S4, "Camilla de cuchara", "Camilla de palas que se separa en dos mitades para recoger al paciente sin rodarlo."],
  ],
  casos: [
    {
      slug: "caso-motorista-caido-autovia",
      titulo: "Un motorista caído en la autovía",
      supuesto: "Un motorista ha caído a alta velocidad en la autovía. Está consciente, confuso, con el casco puesto, y sangra abundantemente por una pierna.",
      preguntas: [
        [S2, "facil", "¿Qué se hace antes de acercarse a la víctima?", ["Valorar la seguridad de la escena", "Quitarle el casco", "Hacer fotos"], "Tema 33."],
        [S1, "media", "Con una hemorragia importante, ¿cómo cambia la prioridad?", ["A C-A-B-C, controlando primero la hemorragia", "Se ignora la hemorragia", "Se empieza por la pierna sana"], "Tema 33."],
        [S1, "media", "Si la hemorragia no se controla con presión, ¿qué se usa?", ["Un torniquete", "Elevar la pierna", "Nada"], "Tema 33."],
        [S1, "media", "Siendo un mecanismo generalizado y peligroso, ¿qué exploración se hace?", ["Revisión rápida de trauma", "Solo exploración enfocada de la pierna", "Ninguna"], "Tema 33."],
        [S1, "media", "Al estar confuso, ¿qué nivel AVDI tiene si responde a la voz?", ["V (estímulo verbal)", "A (alerta)", "I (inconsciente)"], "Tema 33."],
        [S4, "media", "¿Cómo se estabiliza su cuello?", ["Sujetando la cabeza en posición neutra", "Moviéndolo para comprobar dolor", "No hace falta"], "Tema 33."],
        [S3, "media", "¿Qué lesión previene sobre todo el casco?", ["El trauma craneal", "La fractura de pierna", "El neumotórax"], "Tema 33."],
        [S1, "media", "¿Cuánto tiempo debería durar como máximo la estancia en la escena si es crítico?", ["5 minutos", "30 minutos", "1 hora"], "Tema 33."],
        [S1, "dificil", "¿Retrasaría el traslado la colocación de férulas y vendajes no vitales?", ["No debería retrasarlo", "Sí, siempre", "Solo de noche"], "Tema 33."],
        [S1, "media", "Durante el traslado crítico, ¿cada cuánto se repite la exploración continua?", ["Cada 5 minutos", "Cada hora", "Nunca"], "Tema 33."],
      ],
    },
    {
      slug: "caso-caida-andamio-obra",
      titulo: "Caída de un trabajador desde un andamio",
      supuesto: "Un trabajador ha caído desde un andamio de unos 6 metros en una obra. Está tumbado, inconsciente, con la cabeza ladeada, y hay material inestable alrededor.",
      preguntas: [
        [S2, "facil", "¿Qué hay que comprobar primero?", ["Que no hay riesgo de caída de más material ni estructuras inestables", "La identidad del trabajador", "El seguro de la empresa"], "Tema 33."],
        [S3, "media", "¿Qué tipo de mecanismo es una caída desde altura?", ["Generalizado y peligroso", "Focalizado", "Sin importancia"], "Tema 33."],
        [S4, "media", "Si al intentar alinear la cabeza ladeada se nota resistencia, ¿qué se hace?", ["Inmovilizarla en la posición encontrada", "Forzarla a neutra", "Soltarla"], "Tema 33."],
        [S1, "media", "Si no respira con maniobras básicas por obstrucción, ¿qué ocurre con la evaluación primaria?", ["Se interrumpe para resolver la vía aérea", "Se continúa igual", "Se termina"], "Tema 33."],
        [S1, "media", "¿Cómo se explora la pelvis en la RRT?", ["Presión suave sobre la sínfisis y hacia dentro en las crestas iliacas", "Moviendo las piernas", "No se explora"], "Tema 33."],
        [S4, "media", "¿Cómo se coloca sobre la tabla larga si la pelvis está estable?", ["Mediante rodamiento en bloque", "Arrastrándolo", "Sentándolo"], "Tema 33."],
        [S4, "media", "¿Qué se aprovecha del rodamiento?", ["Para explorar la espalda", "Para quitarle la ropa", "Nada"], "Tema 33."],
        [S1, "media", "¿Qué hallazgos obligan a trasladar sin demora?", ["Alteración de consciencia, respiración o circulación, tórax, abdomen o pelvis anormales, fractura bilateral de fémur", "Una herida leve", "Ninguno"], "Tema 33."],
        [S4, "dificil", "Si tuviera fractura bilateral de fémur, ¿qué se usaría para pasarlo a la tabla?", ["Camilla de cuchara", "Rodamiento simple", "Tabla corta"], "Tema 33."],
        [S1, "media", "¿Debe repetirse la evaluación de un paciente así?", ["Sí, puede deteriorarse rápidamente", "No", "Solo en el hospital"], "Tema 33."],
      ],
    },
    {
      slug: "caso-colision-lateral-turismo",
      titulo: "Colisión lateral en un cruce",
      supuesto: "Un turismo ha sido embestido lateralmente en un cruce. La puerta del conductor está muy hundida y la conductora, consciente, se queja del tórax y del cuello.",
      preguntas: [
        [S3, "facil", "¿Qué tipo de colisión es?", ["Lateral", "Frontal", "Por alcance"], "Tema 33."],
        [S3, "media", "¿Qué orienta sobre la gravedad de sus lesiones?", ["La deformidad del vehículo y del interior", "El color del coche", "La hora"], "Tema 33."],
        [S1, "media", "Con dolor torácico tras un mecanismo peligroso, ¿qué se explora en el tórax?", ["Simetría, movimiento paradójico, contusiones y dolor, inestabilidad o crepitación", "Solo la piel", "Nada"], "Tema 33."],
        [S1, "media", "Si se detecta un neumotórax a tensión con cianosis y sin pulso radial, ¿qué requiere?", ["Descompresión torácica inmediata", "Esperar", "Un vendaje"], "Tema 33."],
        [S4, "media", "Al estar sentada dentro del coche, ¿qué dispositivo se usa antes de la tabla larga?", ["La tabla corta", "La camilla de cuchara", "Ninguno"], "Tema 33."],
        [S4, "media", "¿Cuándo se coloca el collarín?", ["Tras valorar cabeza y cuello", "Antes de valorar la escena", "Nunca"], "Tema 33."],
        [S2, "media", "¿Cómo debe aproximarse el rescatador?", ["De frente, para que no gire el cuello", "Por detrás", "Por el techo"], "Tema 33."],
        [S1, "media", "¿Qué hacer con una herida torácica abierta que succiona aire?", ["Sellarla", "Taparla con algodón suelto", "Dejarla"], "Tema 33."],
        [S3, "dificil", "¿Qué ley física se recuerda sobre la energía en las colisiones?", ["La de conservación de la energía: no se crea ni se destruye, se transforma", "La de Ohm", "La de Pascal"], "Tema 33."],
        [S1, "media", "Si la paciente parece estable, ¿se descarta un traslado precoz?", ["No, los pacientes estables pueden volverse inestables rápidamente", "Sí", "Solo si lo pide"], "Tema 33."],
      ],
    },
  ],
});
