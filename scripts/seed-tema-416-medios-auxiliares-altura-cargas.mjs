/**
 * Crea tema-416 — Tema 9 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "Medios auxiliares. Trabajos en altura: andamios
 * plataformas y escaleras de mano. Manipulación de cargas."
 *
 * Tema dedicado: tema-132 (Cementerio) y tema-248 (Pintor General) tratan
 * andamios y escaleras pero no la manipulación manual de cargas.
 *
 * Fuentes leídas en esta sesión:
 * - RD 1215/1997, equipos de trabajo (BOE-A-1997-17824), anexo II,
 *   apartado 4 (trabajos temporales en altura), introducido por el RD
 *   2177/2004 (BOE-A-2004-19311): prioridad de la protección colectiva;
 *   escaleras de mano (estabilidad, antideslizantes, sobrepasar 1 m el
 *   plano de acceso, unos 75°, de frente, EPI anticaídas a más de 3,5 m con
 *   movimientos peligrosos, nunca dos personas, revisión periódica y
 *   prohibición de las de madera pintadas, más de 5 m solo con garantías de
 *   resistencia); andamios (plan de montaje, utilización y desmontaje en los
 *   casos tasados: más de 6 m de altura, vuelos de más de 8 m, más de 24 m
 *   sobre azoteas, torres móviles a más de 6 m; montaje dirigido por persona
 *   con formación universitaria o profesional habilitante; inspecciones).
 * - RD 486/1997, lugares de trabajo (BOE-A-1997-8669), anexo I, apartado
 *   A.3: protección de desniveles con riesgo de caída de 2 m o más y
 *   barandillas de al menos 90 cm con protección inferior.
 * - RD 487/1997, manipulación manual de cargas (BOE-A-1997-8670), arts. 1-6
 *   y anexo de factores de riesgo, leídos íntegros.
 * - Guía técnica del INSST sobre manipulación manual de cargas, edición de
 *   septiembre de 2024 (descargada y leída): cargas de 3 kg o más como
 *   umbral de evaluación; más de 25 kg, probablemente riesgo no tolerable;
 *   pesos máximos en condiciones ideales según la ISO 11228-1: 25 kg para
 *   hombres de 20 a 45 años, 20 kg para mujeres de 20 a 45 y para hombres de
 *   otras edades, y 15 kg para mujeres de otras edades. El RD 487/1997 no
 *   fija ningún peso: las cifras son de la Guía (ojo con los valores de la
 *   edición anterior, 25/15/40 kg, que muchos temarios siguen repitiendo).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-416-medios-auxiliares-altura-cargas.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const RD1215 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const RD2177 = "https://www.boe.es/buscar/act.php?id=BOE-A-2004-19311";
const RD486 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";
const RD487 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8670";
const GUIA_MMC = "https://www.insst.es/documents/94886/203536/Guia+tecnica+para+la+evaluacion+y+prevencion+de+los+riesgos+relativos+a+la+manipulacion+manual+de+cargas+2024.pdf";
const S1 = "medios-auxiliares-principios";
const S2 = "escaleras-de-mano";
const S3 = "andamios-plataformas";
const S4 = "manipulacion-manual-cargas";

await sembrarTema({
  tema: {
    slug: "tema-416",
    titulo: "Medios auxiliares, trabajos en altura (andamios, plataformas y escaleras de mano) y manipulación de cargas",
    descripcion: "Medios auxiliares y trabajos temporales en altura según el RD 1215/1997 (anexo II.4, introducido por el RD 2177/2004): elección del equipo, prioridad de la protección colectiva, condiciones meteorológicas y protección de desniveles y barandillas (RD 486/1997). Escaleras de mano: tipos, colocación a unos 75°, sobrepasar 1 m, uso de frente, EPI anticaídas por encima de 3,5 m, prohibiciones y revisión. Andamios y plataformas: tipos (borriquetas, tubulares, modulares, torres móviles, plataformas suspendidas y elevadoras), plan de montaje, utilización y desmontaje, dirección del montaje e inspecciones. Manipulación manual de cargas (RD 487/1997): obligaciones del empresario, factores de riesgo, pesos de referencia de la Guía técnica del INSST (2024) y técnica correcta de levantamiento.",
    contenido: "Cómo trabajar con seguridad cuando hay que subir: qué equipo elegir, cómo usar una escalera de mano, qué exige un andamio y qué es una plataforma elevadora; y cómo levantar y transportar pesos sin dañarse la espalda, con los pesos de referencia del INSST.",
    enlaces_boe: [
      { url: RD1215, titulo: "Real Decreto 1215/1997, de 18 de julio, equipos de trabajo, anexo II, apartado 4 (BOE-A-1997-17824)" },
      { url: RD2177, titulo: "Real Decreto 2177/2004, de 12 de noviembre, trabajos temporales en altura (BOE-A-2004-19311)" },
      { url: RD486, titulo: "Real Decreto 486/1997, de 14 de abril, lugares de trabajo (BOE-A-1997-8669)" },
      { url: RD487, titulo: "Real Decreto 487/1997, de 14 de abril, manipulación manual de cargas (BOE-A-1997-8670)" },
      { url: GUIA_MMC, titulo: "INSST, Guía técnica para la evaluación y prevención de los riesgos relativos a la manipulación manual de cargas (septiembre de 2024)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Medios auxiliares y principios de los trabajos en altura", articulos: "Anexo II.4.1 RD 1215/1997; anexo I.A.3 RD 486/1997", url: RD1215 },
      { seccion: S2, titulo: "Escaleras de mano", articulos: "Anexo II.4.2 RD 1215/1997", url: RD1215 },
      { seccion: S3, titulo: "Andamios y plataformas", articulos: "Anexo II.4.3 RD 1215/1997", url: RD1215 },
      { seccion: S4, titulo: "Manipulación manual de cargas", articulos: "RD 487/1997 y Guía técnica del INSST", url: RD487 },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 9 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Medios auxiliares", "Equipos de trabajo que sirven para acceder o trabajar en un lugar elevado o de difícil acceso: escaleras de mano, andamios, plataformas elevadoras, pasarelas, borriquetas"],
        ["Elección del equipo (RD 1215/1997, 4.1.1)", "Si no se puede trabajar en altura con seguridad desde una superficie adecuada, se elige el equipo más apropiado, dando prioridad a la protección colectiva frente a la individual; la elección no puede subordinarse a criterios económicos"],
        ["Criterios de elección del medio de acceso", "La frecuencia de circulación, la altura a la que se debe subir y la duración de la utilización; además, debe permitir la evacuación en caso de peligro inminente"],
        ["Protección colectiva y retirada temporal", "Las barandillas y redes solo se interrumpen en los accesos; si hay que retirarlas para una tarea, se adoptan medidas compensatorias y se reponen al terminar"],
        ["Condiciones meteorológicas", "Los trabajos temporales en altura solo pueden hacerse si el tiempo no pone en peligro la seguridad y la salud"],
        ["Desniveles y barandillas (RD 486/1997)", "Se protegen las aberturas y desniveles con riesgo de caída de 2 m o más; las barandillas son rígidas, de al menos 90 cm de altura, con protección que impida el paso por debajo o la caída de objetos"],
        ["EPI anticaídas", "Arnés anticaídas unido a un punto de anclaje seguro o línea de vida; es protección individual y se usa cuando la colectiva no es posible o no basta"],
      ],
      preguntas: [
        ["media", "Al elegir un equipo para trabajos en altura, el RD 1215/1997 da prioridad a:", ["La protección colectiva frente a la individual", "El equipo más barato", "La protección individual frente a la colectiva"], "Anexo II.4.1.1 RD 1215/1997."],
        ["media", "Según el RD 486/1997, la altura mínima de una barandilla es:", ["90 cm", "60 cm", "120 cm"], "Anexo I.A.3 RD 486/1997."],
        ["media", "Las aberturas o desniveles deben protegerse obligatoriamente cuando la altura de caída es de:", ["2 m o más", "50 cm o más", "5 m o más"], "Anexo I.A.3 RD 486/1997."],
        ["facil", "¿Puede trabajarse en un andamio exterior con fuertes rachas de viento?", ["No, si las condiciones meteorológicas ponen en peligro la seguridad", "Sí, siempre", "Sí, si se trabaja rápido"], "Anexo II.4.1.6 RD 1215/1997."],
        ["media", "Si hay que retirar una barandilla para subir material:", ["Se adoptan medidas compensatorias y se repone al terminar", "Se retira y se deja así", "Se sustituye por una cinta de balizar"], "Anexo II.4.1.5 RD 1215/1997."],
        ["dificil", "¿Cuál NO es un criterio del RD 1215/1997 para elegir el medio de acceso a un puesto en altura?", ["El coste del equipo", "La altura a la que hay que subir", "La duración de la utilización"], "Anexo II.4.1.1 RD 1215/1997."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Escalera de mano como puesto de trabajo", "Solo cuando no esté justificado usar equipos más seguros por el bajo nivel de riesgo y por las características del lugar que no se puedan modificar"],
        ["Colocación (4.2.1 y 4.2.2)", "Apoyos sólidos y estables, travesaños horizontales, pies antideslizantes o fijación superior o inferior, y en las simples un ángulo aproximado de 75° con la horizontal"],
        ["Escaleras de acceso", "Deben sobresalir al menos 1 m del plano de trabajo al que se accede"],
        ["Uso (4.2.3)", "Subir, bajar y trabajar de frente a la escalera, con un punto de apoyo y sujeción seguros; nunca dos o más personas a la vez"],
        ["EPI anticaídas en escalera", "Obligatorio, o medidas alternativas, en trabajos a más de 3,5 m desde el punto de operación al suelo que exijan movimientos o esfuerzos peligrosos para la estabilidad"],
        ["Cargas en escalera", "El transporte de cargas no debe impedir una sujeción segura; se prohíbe cuando por su peso o dimensiones comprometan la seguridad"],
        ["Prohibiciones (4.2.4 y 4.2.5)", "Escaleras de construcción improvisada, escaleras de madera pintadas (ocultan defectos) y escaleras de más de 5 m sobre cuya resistencia no haya garantías"],
        ["Escaleras de tijera y extensibles", "Las de tijera deben tener el tirante o cadena que impide su apertura; en las extensibles debe asegurarse la inmovilización recíproca de los tramos; las de ruedas se inmovilizan antes de subir"],
        ["Revisión", "Las escaleras de mano se revisan periódicamente: largueros, peldaños, zapatas antideslizantes y herrajes"],
      ],
      preguntas: [
        ["facil", "Una escalera de mano simple debe formar con la horizontal un ángulo aproximado de:", ["75°", "45°", "90°"], "Anexo II.4.2.2 RD 1215/1997."],
        ["media", "Una escalera de mano para acceder a una cubierta debe sobresalir del plano de llegada al menos:", ["1 m", "30 cm", "2 m"], "Anexo II.4.2.2 RD 1215/1997."],
        ["media", "Se exige EPI anticaídas (o medida alternativa) en escalera cuando el trabajo, con movimientos peligrosos, se hace a más de:", ["3,5 m de altura", "1 m", "10 m"], "Anexo II.4.2.3 RD 1215/1997."],
        ["facil", "El ascenso y descenso por una escalera de mano se hace:", ["De frente a la escalera", "De espaldas a la escalera", "De lado, con una mano libre"], "Anexo II.4.2.3 RD 1215/1997."],
        ["media", "¿Pueden subir dos personas a la vez a una escalera de mano?", ["No", "Sí, si es de aluminio", "Sí, si es de tijera"], "Anexo II.4.2.3 RD 1215/1997."],
        ["media", "Está prohibido usar escaleras de madera pintadas porque:", ["La pintura dificulta detectar sus defectos", "Resbalan más", "La pintura conduce la electricidad"], "Anexo II.4.2.5 RD 1215/1997."],
        ["dificil", "No se emplearán escaleras de mano de más de cierta longitud sobre cuya resistencia no se tengan garantías. Esa longitud es:", ["5 m", "3 m", "7 m"], "Anexo II.4.2.4 RD 1215/1997."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Tipos de andamios", "De borriquetas o caballetes (poca altura), tubulares y modulares o prefabricados, torres de trabajo móviles con ruedas, plataformas suspendidas de nivel variable y plataformas elevadoras sobre mástil"],
        ["Plataformas elevadoras móviles de personal (PEMP)", "Máquinas con una cesta o plataforma que se eleva (de tijera o de brazo articulado o telescópico) para situar a las personas a la altura de trabajo"],
        ["Condiciones del andamio (4.3.1 y 4.3.4)", "Proyectado, montado y mantenido para que no se desplome ni se desplace; apoyos protegidos contra el deslizamiento sobre una superficie portante suficiente; andamios móviles inmovilizados durante el trabajo"],
        ["Plan de montaje, utilización y desmontaje (4.3.3)", "Obligatorio en plataformas suspendidas y elevadoras sobre mástil, andamios prefabricados de más de 6 m de altura o con vuelos de más de 8 m entre apoyos, andamios a más de 24 m sobre azoteas o cubiertas y torres móviles con trabajos a más de 6 m; se exceptúan los de borriquetas"],
        ["Andamios con marcado CE", "El plan puede sustituirse por las instrucciones del fabricante, salvo que se monten de forma no prevista en ellas"],
        ["Montaje (4.3.7)", "Bajo la dirección de una persona con formación universitaria o profesional habilitante, por trabajadores con formación específica; si no se exige plan, puede dirigirlo alguien con más de 2 años de experiencia certificada y formación preventiva de nivel básico"],
        ["Inspecciones (4.3.8)", "Antes de la puesta en servicio, periódicamente y tras cualquier modificación, periodo sin uso, exposición a la intemperie, sacudida sísmica u otra circunstancia que afecte a su resistencia o estabilidad"],
        ["Plataformas de trabajo", "Adecuadas a las cargas y al trabajo, con componentes que no se desplacen y sin huecos peligrosos con la protección colectiva; las partes no listas se señalizan y se impide el acceso"],
      ],
      preguntas: [
        ["media", "Es obligatorio el plan de montaje, utilización y desmontaje en un andamio prefabricado cuya altura supere:", ["6 m", "2 m", "24 m"], "Anexo II.4.3.3 RD 1215/1997."],
        ["media", "¿Qué andamios quedan exceptuados del plan de montaje aunque superen esas medidas?", ["Los de caballetes o borriquetas", "Los tubulares", "Las torres móviles"], "Anexo II.4.3.3 RD 1215/1997."],
        ["media", "El montaje de un andamio con plan debe dirigirlo:", ["Una persona con formación universitaria o profesional que la habilite", "Cualquier operario con experiencia", "El conductor del camión que lo trae"], "Anexo II.4.3.7 RD 1215/1997."],
        ["media", "Un andamio debe inspeccionarse, entre otros momentos:", ["Antes de su puesta en servicio y tras una exposición a la intemperie que pueda afectarle", "Solo al desmontarlo", "Solo una vez al año"], "Anexo II.4.3.8 RD 1215/1997."],
        ["facil", "Antes de subir a una torre de trabajo móvil hay que:", ["Inmovilizar sus ruedas", "Quitar las barandillas", "Cargar todo el material en la plataforma superior"], "Anexo II.4.3.4 RD 1215/1997."],
        ["dificil", "El plan de un andamio con marcado CE puede sustituirse por:", ["Las instrucciones del fabricante, salvo montajes no previstos en ellas", "Una declaración del encargado", "Nada, es siempre obligatorio"], "Anexo II.4.3.3 RD 1215/1997."],
        ["media", "Una PEMP es:", ["Una plataforma elevadora móvil de personal", "Un tipo de escalera de tijera", "Un andamio de borriquetas"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Manipulación manual de cargas (art. 2 RD 487/1997)", "Cualquier operación de transporte o sujeción de una carga por uno o varios trabajadores (levantar, colocar, empujar, tirar, desplazar) que por sus características o condiciones ergonómicas inadecuadas entrañe riesgos, en particular dorsolumbares"],
        ["Obligaciones del empresario (art. 3)", "Evitar la manipulación manual con equipos mecánicos; si no es posible, organizar el trabajo, dar medios adecuados y evaluar el riesgo según los factores del anexo"],
        ["Formación, información y salud (arts. 4 y 6)", "Formación sobre la forma correcta de manipular, información sobre el peso y el centro de gravedad de las cargas, y vigilancia de la salud cuando la manipulación es habitual y concurren factores de riesgo"],
        ["Factores de riesgo (anexo)", "Características de la carga (pesada, voluminosa, inestable, alejada del tronco), esfuerzo físico (torsión, flexión, movimiento brusco), medio de trabajo (espacio, suelo, temperatura, iluminación), exigencias de la actividad y factores individuales"],
        ["Pesos de referencia (Guía INSST 2024)", "El RD no fija pesos. La Guía evalúa cargas de 3 kg o más y considera que más de 25 kg probablemente es un riesgo no tolerable; máximos en condiciones ideales: 25 kg hombres de 20 a 45 años, 20 kg mujeres de 20 a 45 y hombres de otras edades, 15 kg mujeres de otras edades"],
        ["Condiciones ideales", "Carga próxima al cuerpo, a la altura de las caderas, espalda recta, sin giros ni inclinaciones, buen agarre, ambiente favorable y sin limitaciones de espacio; si no se dan, el peso máximo disminuye"],
        ["Técnica de levantamiento", "Separar los pies para tener una base estable, flexionar las piernas manteniendo la espalda recta, agarrar firmemente, levantar con la fuerza de las piernas, mantener la carga pegada al cuerpo y no girar el tronco (girar con los pies)"],
        ["Medidas alternativas", "Carretillas, transpaletas, carros, polipastos o elevadores; dividir la carga; manipular entre dos personas; reducir distancias y alturas de manipulación"],
      ],
      preguntas: [
        ["media", "El RD 487/1997 establece como primera obligación del empresario:", ["Evitar la manipulación manual de cargas, en especial con equipos mecánicos", "Fijar un peso máximo legal de 25 kg", "Entregar una faja lumbar a cada trabajador"], "Art. 3.1 RD 487/1997."],
        ["media", "¿Qué tipo de riesgo destaca el RD 487/1997 en la manipulación manual de cargas?", ["Dorsolumbar", "Eléctrico", "Químico"], "Arts. 1 y 2 RD 487/1997."],
        ["dificil", "Según la Guía técnica del INSST (2024), el peso máximo en condiciones ideales para una mujer de 30 años es:", ["20 kg", "15 kg", "25 kg"], "Guía INSST, tabla 2 (ISO 11228-1)."],
        ["media", "Según la Guía del INSST, manipular una carga de más de 25 kg:", ["Probablemente constituye un riesgo no tolerable por sí mismo", "Está prohibido por el RD 487/1997", "No supone riesgo si se hace rápido"], "Guía INSST, tabla 1."],
        ["media", "La Guía del INSST considera que requieren evaluación las cargas a partir de:", ["3 kg", "10 kg", "1 kg"], "Guía INSST."],
        ["facil", "Al levantar una carga del suelo hay que:", ["Flexionar las piernas y mantener la espalda recta", "Doblar la espalda con las piernas rectas", "Girar el tronco mientras se levanta"], "Guía INSST, técnica de levantamiento."],
        ["media", "¿Cuál de estos es un factor de riesgo del medio de trabajo según el anexo del RD 487/1997?", ["Suelo irregular o resbaladizo", "Carga ligera y compacta", "Buena iluminación"], "Anexo RD 487/1997."],
        ["media", "Para girar con una carga en las manos debe hacerse:", ["Moviendo los pies, sin torcer el tronco", "Torciendo la cintura", "Lanzando la carga"], "Guía INSST."],
      ],
    },
  ],
  glosario: [
    [S1, "Medio auxiliar", "Equipo que permite acceder o trabajar en un lugar elevado o de difícil acceso, como escaleras, andamios o plataformas."],
    [S1, "Protección colectiva", "Medida que protege a varios trabajadores a la vez sin depender de cada uno (barandillas, redes), prioritaria frente a los EPI."],
    [S1, "Línea de vida", "Cable o carril anclado al que se sujeta el arnés para desplazarse con protección anticaídas."],
    [S2, "Escalera de tijera", "Escalera de dos tramos articulados que se sostiene sola; debe llevar un tirante que impida su apertura."],
    [S2, "Zapata antideslizante", "Pieza de goma u otro material en el pie de la escalera que evita que resbale."],
    [S3, "Borriqueta", "Caballete sobre el que se apoyan tablones para formar un andamio de poca altura."],
    [S3, "PEMP", "Plataforma elevadora móvil de personal: máquina con cesta que eleva a las personas a la altura de trabajo."],
    [S3, "Plan de montaje, utilización y desmontaje", "Documento que, en los andamios que lo exigen, fija cómo se montan, usan y desmontan con seguridad."],
    [S4, "Riesgo dorsolumbar", "Riesgo de lesión en la espalda, especialmente en la zona lumbar, al manipular cargas."],
    [S4, "Transpaleta", "Equipo con horquillas para levantar y desplazar palés sin cargar el peso a mano."],
    [S4, "Condiciones ideales de manipulación", "Carga pegada al cuerpo, a la altura de las caderas, espalda recta y sin giros: las que permiten el peso máximo de referencia."],
  ],
  casos: [
    {
      slug: "cambio-luminaria-salon-actos",
      titulo: "Cambiar una luminaria en el salón de actos",
      supuesto: "Hay que sustituir una luminaria del techo de un salón de actos a 4,5 m de altura. En el almacén hay una escalera de madera pintada de 6 m, una escalera de tijera de aluminio de 2,5 m, una torre de trabajo móvil con barandillas y la posibilidad de alquilar una plataforma elevadora de tijera.",
      preguntas: [
        [S2, "media", "¿Puedes usar la escalera de madera pintada?", ["No, está prohibido usar escaleras de madera pintadas", "Sí, si está en buen estado aparente", "Sí, si la sujeta un compañero", "Sí, por ser más alta"], "Anexo II.4.2.5 RD 1215/1997."],
        [S1, "media", "Para elegir el equipo, el RD 1215/1997 da prioridad a:", ["La protección colectiva, como la torre con barandillas o la plataforma", "La escalera más barata", "El arnés como primera opción", "Lo que haya más cerca"], "Anexo II.4.1.1 RD 1215/1997."],
        [S2, "media", "Si se usara una escalera para trabajar a esa altura con esfuerzos que comprometan la estabilidad, por encima de 3,5 m se exigiría:", ["EPI anticaídas u otra medida de protección alternativa", "Solo casco", "Nada", "Que suban dos personas"], "Anexo II.4.2.3 RD 1215/1997."],
        [S3, "media", "Antes de subir a la torre de trabajo móvil debes:", ["Inmovilizar las ruedas y comprobar que está bien montada y nivelada", "Quitar las barandillas para trabajar mejor", "Moverla con una persona encima", "Subir por fuera de la estructura"], "Anexo II.4.3.4 RD 1215/1997."],
        [S3, "dificil", "La torre móvil se usará para trabajar a menos de 6 m. ¿Exige plan de montaje, utilización y desmontaje?", ["No por ese motivo: lo exige para trabajos a más de 6 m desde el punto de operación al suelo", "Sí, siempre", "Solo si es de aluminio", "Solo en exterior"], "Anexo II.4.3.3.d) RD 1215/1997."],
        [S3, "media", "La plataforma elevadora de tijera es una:", ["PEMP (plataforma elevadora móvil de personal)", "Escalera extensible", "Borriqueta", "Grúa torre"], "Conocimiento técnico."],
        [S1, "media", "Las barandillas de la torre deben tener una altura mínima de:", ["90 cm", "50 cm", "1,50 m", "70 cm"], "Anexo I.A.3 RD 486/1997."],
        [S2, "media", "La escalera de tijera de 2,5 m debe llevar:", ["El tirante o cadena que impide su apertura", "Ruedas libres", "Un tablón entre peldaños", "Nada especial"], "Conocimiento técnico."],
        [S2, "media", "Para subir la luminaria nueva por la escalera:", ["No debe impedir una sujeción segura; si compromete la seguridad, se sube por otros medios", "Se sube en una mano sin más", "Se lanza a quien está arriba", "Se sube en la boca"], "Anexo II.4.2.3 RD 1215/1997."],
        [S1, "media", "Antes de cambiar la luminaria, además del trabajo en altura hay que:", ["Desconectar el circuito y verificar la ausencia de tensión", "Nada más", "Mojar el techo", "Encender las luces para ver mejor"], "Anexo II RD 614/2001."],
      ],
    },
    {
      slug: "andamio-fachada-colegio",
      titulo: "El andamio en la fachada del colegio",
      supuesto: "Una empresa va a montar un andamio tubular prefabricado de 9 m de altura apoyado sobre la acera para reparar la cornisa de un colegio. Tú, como operario municipal, colaborarás en tareas auxiliares y debes conocer qué se exige. Por la noche ha habido una fuerte tormenta.",
      preguntas: [
        [S3, "media", "¿Exige este andamio plan de montaje, utilización y desmontaje?", ["Sí, por superar los 6 m de altura", "No, por ser tubular", "No, por estar en la acera", "Solo si supera los 24 m"], "Anexo II.4.3.3.b) RD 1215/1997."],
        [S3, "media", "¿Quién debe dirigir su montaje?", ["Una persona con formación universitaria o profesional que la habilite", "El conserje del colegio", "Cualquier trabajador", "El director del centro"], "Anexo II.4.3.7 RD 1215/1997."],
        [S3, "media", "Tras la tormenta, antes de volver a usarlo:", ["Debe inspeccionarse por una persona habilitada", "Basta con secar las plataformas", "Se puede usar sin más", "Hay que desmontarlo"], "Anexo II.4.3.8.c) RD 1215/1997."],
        [S3, "media", "Los apoyos del andamio sobre la acera deben estar:", ["Protegidos contra el deslizamiento y sobre una superficie portante suficiente", "Apoyados sobre ladrillos sueltos", "Sin placas de apoyo", "Sobre cajas de madera"], "Anexo II.4.3.4 RD 1215/1997."],
        [S3, "media", "Mientras se monta, las partes que aún no están listas deben:", ["Señalizarse con advertencia de peligro y delimitarse para impedir el acceso", "Usarse con cuidado", "Dejarse sin protección", "Cubrirse con plástico"], "Anexo II.4.3.6 RD 1215/1997."],
        [S1, "media", "Si sopla un viento fuerte que pone en peligro la seguridad:", ["Se suspenden los trabajos en altura", "Se trabaja más deprisa", "Se atan las herramientas y se sigue", "Se quita la lona del andamio"], "Anexo II.4.1.6 RD 1215/1997."],
        [S1, "media", "Las plataformas del andamio deben tener barandillas de al menos:", ["90 cm, con protección inferior", "60 cm", "50 cm sin rodapié", "2 m"], "Anexo I.A.3 RD 486/1997."],
        [S3, "media", "Si el andamio tiene marcado CE y se monta según el fabricante, el plan puede sustituirse por:", ["Las instrucciones específicas del fabricante", "Una foto del montaje", "El permiso de la Junta de Distrito", "Nada"], "Anexo II.4.3.3 RD 1215/1997."],
        [S1, "dificil", "Si un trabajador debe retirar temporalmente una barandilla para meter un material:", ["Se adoptan medidas compensatorias eficaces previstas y se repone al terminar", "Se quita y se deja quitada hasta el final de la obra", "Se sustituye por una cuerda", "No pasa nada si es breve"], "Anexo II.4.1.5 RD 1215/1997."],
        [S4, "media", "Para subir los sacos de mortero de 25 kg a la plataforma lo adecuado es:", ["Usar un medio mecánico como un polipasto o montacargas", "Subirlos a hombros por las escaleras del andamio", "Lanzarlos", "Subirlos de dos en dos"], "Art. 3 RD 487/1997."],
      ],
    },
    {
      slug: "mudanza-mobiliario-junta",
      titulo: "La mudanza del mobiliario de la Junta de Distrito",
      supuesto: "Hay que trasladar el mobiliario de la Junta de Distrito a una nueva sede: cajas de archivo de unos 12 kg, sillas, mesas de 35 kg y un armario metálico. Participan compañeros y compañeras de distintas edades. El suelo de la entrada está mojado por la lluvia y hay que subir un tramo de escaleras.",
      preguntas: [
        [S4, "media", "¿Qué debe hacerse en primer lugar según el RD 487/1997?", ["Evitar la manipulación manual con medios mecánicos (carros, carretillas, transpaletas)", "Repartir las cargas al azar", "Que cada uno cargue lo que pueda", "Contratar a personas más fuertes"], "Art. 3.1 RD 487/1997."],
        [S4, "dificil", "Según la Guía del INSST (2024), el peso máximo en condiciones ideales para un compañero de 50 años es:", ["20 kg", "25 kg", "15 kg", "40 kg"], "Guía INSST, tabla 2."],
        [S4, "media", "Las mesas de 35 kg deben trasladarse:", ["Con medios mecánicos o entre varias personas", "Por una sola persona, rápidamente", "Arrastrándolas por la escalera", "Lanzándolas por la ventana"], "RD 487/1997 y Guía INSST: más de 25 kg, probablemente riesgo no tolerable."],
        [S4, "media", "El suelo mojado de la entrada es un factor de riesgo de:", ["El medio de trabajo", "La carga", "Las exigencias de la actividad", "Los factores individuales"], "Anexo RD 487/1997."],
        [S4, "media", "Al levantar una caja de archivo del suelo hay que:", ["Flexionar las rodillas, espalda recta y carga pegada al cuerpo", "Doblar la espalda y estirar los brazos", "Levantarla de un tirón", "Girar el tronco mientras se levanta"], "Guía INSST."],
        [S4, "media", "Para girarte con la caja en las manos:", ["Mueve los pies sin torcer el tronco", "Gira la cintura", "Gira la cabeza solamente", "Suéltala y vuelve a cogerla"], "Guía INSST."],
        [S4, "media", "El armario metálico es voluminoso y difícil de agarrar. Eso es un factor de riesgo de:", ["Las características de la carga", "El medio de trabajo", "La iluminación", "La temperatura"], "Anexo RD 487/1997."],
        [S4, "media", "¿Qué información debe dar el empresario sobre las cargas?", ["Indicaciones sobre su peso y, si el contenido está descentrado, sobre su centro de gravedad o lado más pesado", "Ninguna", "Solo su precio", "Solo su color"], "Art. 4 RD 487/1997."],
        [S2, "media", "Para descolgar un cuadro alto se usa una escalera de mano simple. ¿Cómo se coloca?", ["Con un ángulo aproximado de 75° y pies antideslizantes", "Casi vertical", "Muy inclinada, a 45°", "Apoyada sobre una silla"], "Anexo II.4.2.2 RD 1215/1997."],
        [S4, "media", "Si un trabajador manipula cargas habitualmente y concurren factores de riesgo, el empresario debe garantizar:", ["La vigilancia de su salud", "Un plus económico", "Que trabaje solo", "Que no reciba formación"], "Art. 6 RD 487/1997."],
      ],
    },
  ],
});
