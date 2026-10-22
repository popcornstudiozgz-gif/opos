/**
 * Crea tema-364 — Tema 37 de Policía Local: "La Ley sobre Tráfico,
 * Circulación de Vehículos a Motor y Seguridad Vial."
 *
 * Fuente: Real Decreto Legislativo 6/2015, de 30 de octubre, texto
 * refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y
 * Seguridad Vial (BOE-A-2015-11722, título verificado; vigente según los
 * metadatos de la API de legislación consolidada, actualizado a octubre de
 * 2026). Leídos íntegros los arts. 1 a 14 (objeto, competencias, normas
 * generales, alcohol y drogas), 63 a 65 (permiso por puntos), 74 a 113
 * (infracciones, sanciones, responsables, procedimiento, medidas
 * provisionales, ejecución y prescripción) y el anexo II (baremo de puntos
 * en la redacción de la Ley 18/2021, vigente desde el 21-03-2022; el BOE
 * intercala el baremo anterior como nota y no se usa). Las normas de
 * circulación de detalle (velocidad, adelantamiento, parada…) se estudian
 * en el Tema 38 (Reglamento General de Circulación).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-364-ley-trafico-seguridad-vial.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "objeto-competencias";
const S2 = "normas-generales-alcohol-drogas";
const S3 = "permiso-por-puntos";
const S4 = "infracciones-sanciones-responsables";
const S5 = "procedimiento-sancionador";
const S6 = "medidas-provisionales-prescripcion";

await sembrarTema({
  tema: {
    slug: "tema-364",
    titulo: "Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial (RDLeg 6/2015)",
    descripcion: "Objeto y ámbito de aplicación; competencias del Estado, del Ministerio del Interior (Jefatura Central de Tráfico y Agrupación de Tráfico de la Guardia Civil) y de los municipios; Consejo Superior y Conferencia Sectorial; obligaciones de usuarios, conductores y titulares; obras y actividades prohibidas; normas generales de conducción (móvil, auriculares, cinturón, menores en motocicleta, detectores de radar); alcohol y drogas y pruebas de detección; permiso por puntos: asignación, pérdida y recuperación; infracciones leves, graves y muy graves; multas y graduación; responsables; procedimiento sancionador: competencia de los alcaldes, denuncias, valor probatorio, notificación, procedimiento abreviado y ordinario, recursos; inmovilización, retirada y depósito, tratamiento residual; cobro, prescripción y cancelación.",
    contenido: "Recorre la ley de tráfico desde el punto de vista del agente municipal: qué competencias tiene el Ayuntamiento (regular el tráfico urbano, denunciar y sancionar, inmovilizar y retirar vehículos, hacer pruebas de alcohol), las obligaciones del conductor y del titular, las pruebas de alcohol y drogas, cómo funciona el permiso por puntos, qué infracciones son leves, graves o muy graves y cuánto cuestan, cómo se tramita una denuncia (pago con descuento del 50 %, alegaciones, recursos) y cuándo se inmoviliza o se lleva la grúa un vehículo.",
    enlaces_boe: [{ url: LEY, titulo: "Real Decreto Legislativo 6/2015, de 30 de octubre, texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial (BOE-A-2015-11722)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Título preliminar y Título I: objeto, ámbito y competencias", articulos: "arts. 1-9", url: a("a1") },
      { seccion: S2, titulo: "Título II, Cap. I: normas generales de comportamiento, alcohol y drogas", articulos: "arts. 10-14", url: a("a10") },
      { seccion: S3, titulo: "Título IV, Cap. II: permiso por puntos y anexo II", articulos: "arts. 63-65 y anexo II", url: a("a63") },
      { seccion: S4, titulo: "Título V, Caps. I-III: infracciones, sanciones y responsables", articulos: "arts. 74-82", url: a("a74") },
      { seccion: S5, titulo: "Título V, Cap. IV: procedimiento sancionador", articulos: "arts. 83-96", url: a("a83") },
      { seccion: S6, titulo: "Título V, Caps. VI-VIII: medidas provisionales, ejecución, prescripción y cancelación", articulos: "arts. 103-113", url: a("a103") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 37 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto (art. 1)", "Regular el tráfico, la circulación de todos los vehículos y la seguridad vial: competencias, normas de circulación, seguridad de los vehículos, señalización, autorizaciones y régimen sancionador"],
        ["Ámbito (art. 2)", "Todo el territorio nacional: vías y terrenos públicos aptos para circular, urbanos e interurbanos, vías de uso común y, en defecto de otras normas, vías privadas usadas por una colectividad indeterminada de usuarios"],
        ["Conceptos básicos (art. 3)", "Los define el anexo I de la ley (conductor, conductor habitual, vehículo, vía urbana…)"],
        ["Organismo del Ministerio del Interior (art. 6)", "La Jefatura Central de Tráfico, con la Agrupación de Tráfico de la Guardia Civil para la vigilancia en las vías de su competencia"],
        ["Competencias de los municipios (art. 7) I", "Regular, ordenar, gestionar, vigilar y disciplinar con agentes propios el tráfico en las vías urbanas de su titularidad, denunciar y sancionar; regular por ordenanza los usos de las vías urbanas y el estacionamiento limitado"],
        ["Competencias de los municipios (art. 7) II", "Inmovilizar vehículos en zonas de estacionamiento limitado sin título; retirar y depositar vehículos; autorizar pruebas deportivas solo urbanas; hacer pruebas de alcohol y drogas en vías urbanas; cerrar vías urbanas y restringir la circulación por motivos medioambientales"],
        ["Bicicletas (art. 7.c)", "Solo pueden retirarse al depósito si están abandonadas o si, amarradas, dificultan la circulación o dañan el mobiliario urbano"],
        ["Consejo Superior de Tráfico y Seguridad Vial (art. 8)", "Órgano de consulta y participación presidido por el Ministro del Interior; tiene una Comisión para el tráfico en vías urbanas"],
      ],
      preguntas: [
        ["facil", "¿A quién corresponde la regulación y vigilancia del tráfico en las vías urbanas de titularidad municipal?", ["Al municipio, por medio de agentes propios", "A la Guardia Civil", "A la comunidad autónoma"], "Art. 7.a)."],
        ["media", "La vigilancia del tráfico en vías interurbanas corresponde al Ministerio del Interior, que actúa a través de…", ["La Agrupación de Tráfico de la Guardia Civil", "Las Policías Locales", "Los ayuntamientos"], "Arts. 5.i) y 6.2."],
        ["media", "¿Cuándo puede retirarse una bicicleta amarrada al depósito municipal?", ["Si dificulta la circulación de vehículos o personas o daña el mobiliario urbano", "Siempre", "Nunca"], "Art. 7.c)."],
        ["media", "¿Puede el municipio restringir la circulación de determinados vehículos en vías urbanas por motivos medioambientales?", ["Sí", "No", "Solo con permiso de la DGT"], "Art. 7.g)."],
        ["media", "¿Quién autoriza una prueba deportiva que discurre íntegra y exclusivamente por el casco urbano, sin travesías?", ["El municipio", "La Jefatura Central de Tráfico", "La comunidad autónoma"], "Art. 7.d)."],
        ["dificil", "¿Se aplica la ley a una vía privada usada por una colectividad indeterminada de usuarios?", ["Sí, en defecto de otras normas", "No, nunca", "Solo si es de un centro comercial"], "Art. 2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Deber general del usuario (art. 10.1)", "Comportarse sin entorpecer indebidamente la circulación ni causar peligro, perjuicios o molestias innecesarias o daños"],
        ["Obligaciones del titular (art. 11)", "Identificar al conductor responsable de una infracción e impedir que conduzca quien nunca obtuvo permiso; si comunica un conductor habitual, las obligaciones pasan a este"],
        ["Obstáculos en la vía (art. 12.3)", "Quien cree un obstáculo o peligro debe hacerlo desaparecer cuanto antes y señalizarlo entretanto"],
        ["Móvil y auriculares (art. 13.3)", "Prohibido conducir con cascos o auriculares de audio y usar el móvil salvo sin manos; exentos los agentes de la autoridad en sus funciones"],
        ["Menores en motocicleta (art. 13.5)", "Prohibido llevar menores de 12 años; excepcionalmente desde los 7 si conduce el padre, madre, tutor o adulto autorizado, con casco homologado"],
        ["Radares (art. 13.6)", "Prohibidos los inhibidores y los detectores de radares; se permiten los avisadores de la posición de los sistemas de vigilancia"],
        ["Alcohol en menores de edad (art. 14.1)", "El conductor menor de edad no puede circular con ninguna tasa de alcohol (0 g/l en sangre y 0 mg/l en aire)"],
        ["Drogas (art. 14.1)", "Prohibido conducir con presencia de drogas en el organismo, salvo sustancias por prescripción facultativa si se está en condiciones de conducir"],
        ["Obligación de someterse a las pruebas (art. 14.2)", "Todos los conductores y los demás usuarios implicados en un accidente o que hayan cometido una infracción"],
        ["Pruebas (art. 14.3 y 5)", "Alcohol: aire espirado con dispositivo autorizado; drogas: prueba salival y análisis de muestra; contraste, preferentemente sangre, a pagar por el interesado si es positivo"],
      ],
      preguntas: [
        ["media", "¿Puede un conductor menor de edad circular con una tasa de alcohol de 0,10 mg/l en aire?", ["No, su tasa debe ser 0", "Sí", "Solo en ciclomotor"], "Art. 14.1."],
        ["media", "¿Desde qué edad, excepcionalmente, puede ir un menor de pasajero en motocicleta?", ["Desde los siete años, con las condiciones legales", "Desde los cinco años", "Desde los doce años siempre"], "Art. 13.5."],
        ["media", "¿Están obligados a someterse a las pruebas de alcohol los peatones implicados en un accidente?", ["Sí, los usuarios implicados en un accidente también", "No, solo conductores", "Solo si lo pide la víctima"], "Art. 14.2."],
        ["media", "¿Están permitidos los avisadores que informan de la posición de los radares?", ["Sí, a diferencia de los detectores e inhibidores", "No", "Solo en autopistas"], "Art. 13.6."],
        ["dificil", "Si la prueba de contraste de alcohol pedida por el interesado da positivo, ¿quién la paga?", ["El interesado", "La Administración", "El seguro"], "Art. 14.5."],
        ["media", "¿En qué consiste la prueba de detección de drogas?", ["Una prueba salival con dispositivo autorizado y un análisis posterior de muestra salival", "Un análisis de orina en el acto", "Un examen visual"], "Art. 14.3."],
        ["media", "¿Pueden los agentes de la autoridad usar el móvil sin manos libres en el ejercicio de sus funciones?", ["Sí, están exentos de la prohibición", "No, nunca", "Solo de noche"], "Art. 13.3."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Crédito inicial (art. 63.1-2)", "Doce puntos; ocho para permisos con menos de tres años de antigüedad y para quien recupera el permiso tras perder todos los puntos"],
        ["Bonificación (art. 63.4)", "Sin sanciones: dos puntos en los tres primeros años y uno en los tres siguientes, hasta 15"],
        ["Cursos de conducción segura (art. 63.5)", "Compensan con dos puntos adicionales, hasta 15, como máximo un curso de cada tipo cada dos años"],
        ["Pérdida de puntos (art. 64.1)", "Por sanción firme de infracciones graves o muy graves que la lleven aparejada, según el anexo II (y el IV para velocidad)"],
        ["Límite diario (art. 64.4)", "No se pierden más de ocho puntos por acumulación en un día, salvo determinadas infracciones muy graves (alcohol, drogas, temeridad, sentido contrario…)"],
        ["Recuperación total (art. 65.1)", "Dos años sin sanciones firmes que detraigan puntos devuelve los doce iniciales"],
        ["Recuperación parcial (art. 65.4)", "Hasta seis puntos con un curso de sensibilización y reeducación vial, una vez cada dos años (anual para profesionales); máximo 15 horas"],
        ["Baremo: 6 puntos (anexo II)", "Alcohol de más de 0,50 mg/l (0,30 profesionales y noveles), drogas, negarse a las pruebas, temeridad, sentido contrario, carreras, inhibidores, móvil sujeto con la mano, arrojar objetos que causen incendios o accidentes, adelantar a ciclistas sin 1,5 m"],
        ["Baremo: 4 puntos (anexo II)", "Alcohol de 0,25 a 0,50 mg/l, preferencia, stop, ceda el paso y semáforo rojo, adelantamientos peligrosos, desobedecer agentes, distancia de seguridad, no usar cinturón o casco, conducir con permiso suspendido o no habilitante, marcha atrás en autopista"],
        ["Baremo: 3 puntos (anexo II)", "Cambio de sentido indebido, auriculares o uso manual del móvil distinto de sujetarlo, y detectores de radar"],
      ],
      preguntas: [
        ["facil", "¿Con cuántos puntos empieza, como regla general, el titular de un permiso de conducción?", ["Doce", "Ocho", "Quince"], "Art. 63.1."],
        ["media", "¿Cuántos puntos tiene un conductor novel con menos de tres años de permiso?", ["Ocho", "Doce", "Seis"], "Art. 63.2.a)."],
        ["media", "¿Cuántos puntos se pierden por conducir sujetando el móvil con la mano?", ["Seis", "Tres", "Cuatro"], "Anexo II, 8."],
        ["media", "¿Cuántos puntos se pierden por no usar el cinturón de seguridad?", ["Cuatro", "Tres", "Seis"], "Anexo II, 15."],
        ["dificil", "¿Cuántos puntos como máximo se pierden en un día por acumulación de infracciones, salvo ciertas muy graves?", ["Ocho", "Doce", "Seis"], "Art. 64.4."],
        ["media", "Tras dos años sin sanciones firmes que detraigan puntos, el conductor con pérdida parcial…", ["Recupera los doce puntos iniciales", "Recupera dos puntos", "No recupera nada"], "Art. 65.1."],
        ["media", "El curso de sensibilización y reeducación vial permite recuperar como máximo…", ["Seis puntos", "Doce puntos", "Dos puntos"], "Art. 65.4."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Clases de infracciones (art. 74.3)", "Leves, graves y muy graves"],
        ["Leves (art. 75)", "Bicicleta sin alumbrado o sin prendas reflectantes, impago de peaje, no estar en condiciones de controlar el vehículo y lo no calificado como grave o muy grave"],
        ["Algunas graves (art. 76)", "Exceso de velocidad del anexo IV, estacionar en carril bus, carril bici, plaza de discapacidad o lugar peligroso, móvil, cinturón, semáforo rojo, stop, desobedecer a agentes, distancia de seguridad, conducción negligente, no identificarse al agente en un accidente, carga mal acondicionada, zonas de bajas emisiones"],
        ["Algunas muy graves (art. 77)", "Alcohol o drogas, negarse a las pruebas, conducción temeraria, sentido contrario, carreras, inhibidores, no identificar verazmente al conductor, conducir sin permiso, vehículo sin autorización, alterar la señalización, no auxiliar en la vía"],
        ["Multas (art. 80.1)", "Leves: hasta 100 euros; graves: 200 euros; muy graves: 500 euros; velocidad según el anexo IV"],
        ["Multas especiales (art. 80.2)", "Alcohol y drogas y negativa a las pruebas: 1.000 euros (en alcohol, si reincide en el año o duplica la tasa); no identificar al conductor: doble o triple de la infracción originaria; inhibidores: 6.000 euros"],
        ["Graduación (art. 81)", "La multa puede incrementarse un 30 % por gravedad, antecedentes, reincidencia, peligro creado y proporcionalidad"],
        ["Responsable general (art. 82)", "El autor del hecho; el conductor responde del casco del pasajero y de los sistemas de retención infantil"],
        ["Menores infractores (art. 82.b)", "Responden solidariamente de la multa sus padres, tutores, acogedores y guardadores, por este orden"],
        ["Titular del vehículo (art. 82.f-g)", "Responde de la documentación, inspecciones y estado del vehículo, y del estacionamiento si no hay conductor habitual ni indica responsable"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la multa de una infracción grave?", ["200 euros", "100 euros", "500 euros"], "Art. 80.1."],
        ["media", "Saltarse un semáforo en rojo es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 76.k)."],
        ["media", "Estacionar en una plaza reservada a personas con discapacidad es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 76.d)."],
        ["media", "Conducir sin haber obtenido nunca el permiso, si no es delito, es una infracción…", ["Muy grave", "Grave", "Leve"], "Art. 77.k)."],
        ["media", "Negarse a la prueba de alcoholemia, en vía administrativa, se sanciona con…", ["1.000 euros", "200 euros", "500 euros"], "Art. 80.2.a)."],
        ["dificil", "Si el titular no identifica verazmente al conductor de una infracción grave, la multa es…", ["El triple de la infracción originaria", "El doble", "La misma"], "Art. 80.2.b)."],
        ["media", "Si un menor de 18 años comete una infracción, responden solidariamente de la multa…", ["Sus padres, tutores, acogedores y guardadores, por este orden", "Nadie", "El Ayuntamiento"], "Art. 82.b)."],
        ["media", "¿Cuánto puede incrementarse la multa por los criterios de graduación?", ["Hasta un 30 %", "Hasta un 50 %", "Hasta el doble"], "Art. 81."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Competencia de los alcaldes (art. 84.4)", "Sancionan las infracciones a normas de circulación en vías urbanas (delegable), salvo las del Título IV (autorizaciones, condiciones técnicas y seguro)"],
        ["Delito en el procedimiento (art. 85)", "Si hay indicios de delito, se comunica al fiscal y se suspende; los accidentes con lesión o muerte se comunican al juez con el atestado; con condena penal se archiva el procedimiento"],
        ["La denuncia como inicio (art. 86.2)", "La denuncia del agente notificada en el acto inicia el procedimiento sancionador"],
        ["Contenido de la denuncia (art. 87.2)", "Vehículo, identidad del denunciado si se conoce, descripción sucinta con lugar, fecha y hora, y número de identificación profesional del agente"],
        ["Valor probatorio (art. 88)", "Las denuncias de los agentes de tráfico hacen prueba, salvo prueba en contrario, de los hechos, la identidad y la notificación, sin perjuicio de aportar todas las pruebas posibles"],
        ["Notificación posterior (art. 89.2)", "Cuando detener el vehículo genere riesgo, el vehículo esté estacionado sin conductor, se capte por imagen o el agente no pueda seguirlo"],
        ["Dirección Electrónica Vial (art. 90)", "Las notificaciones se practican en la DEV; si en diez días naturales no se accede, se entiende rechazada; sin DEV, en el domicilio y, en su defecto, en el BOE"],
        ["Plazo tras la notificación (art. 93.1)", "Veinte días naturales para pagar con reducción, alegar o identificar al conductor"],
        ["Procedimiento abreviado (art. 94)", "Pago en el acto o en veinte días: 50 % de reducción, renuncia a alegar, fin del procedimiento y vía administrativa agotada; no aplicable a ciertas muy graves (art. 93.2)"],
        ["Denuncia como resolución (art. 95.4)", "Sin alegaciones ni pago en veinte días, la denuncia vale como resolución en leves, graves sin puntos no notificadas en el acto y graves o muy graves notificadas en el acto; ejecutable a los treinta días"],
        ["Recurso (art. 96)", "Reposición potestativa en un mes ante el mismo órgano; no suspende la ejecución; se entiende desestimado al mes"],
      ],
      preguntas: [
        ["media", "¿Quién sanciona las infracciones de circulación cometidas en las vías urbanas?", ["El alcalde respectivo, que puede delegar", "El Jefe Provincial de Tráfico siempre", "El Delegado del Gobierno"], "Art. 84.4."],
        ["media", "¿Puede el alcalde sancionar la falta de seguro obligatorio de un vehículo?", ["No, está excluida de la competencia municipal", "Sí", "Solo de noche"], "Art. 84.4, párrafo segundo."],
        ["media", "Si el denunciado paga la multa en el plazo de veinte días naturales, obtiene…", ["Una reducción del 50 %", "Una reducción del 20 %", "Ninguna reducción"], "Art. 94.a)."],
        ["media", "La denuncia formulada por un agente de tráfico tiene valor probatorio…", ["Salvo prueba en contrario", "Absoluto e irrebatible", "Ninguno"], "Art. 88."],
        ["dificil", "Si en la Dirección Electrónica Vial transcurren diez días naturales sin acceder a la notificación…", ["Se entiende rechazada y se continúa el procedimiento", "Se repite la notificación", "Se archiva"], "Art. 90.2."],
        ["media", "El recurso de reposición contra una sanción de tráfico se interpone en el plazo de…", ["Un mes", "Veinte días", "Dos meses"], "Art. 96.2."],
        ["media", "¿Cuándo puede notificarse una denuncia en un momento posterior?", ["Cuando el vehículo está estacionado sin el conductor presente, entre otros casos", "Nunca", "Siempre que el agente quiera"], "Art. 89.2.b)."],
        ["dificil", "Si un accidente produce lesiones o muerte, la autoridad administrativa…", ["Lo pone en conocimiento de la autoridad judicial con el atestado", "Sanciona sin más", "No hace nada"], "Art. 85.1, párrafo segundo."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Inmovilización (art. 104.1) I", "Vehículo sin autorización para circular, con deficiencias de riesgo especialmente grave, sin casco o sin sistema de retención infantil (no a ciclistas), negativa o positivo en alcohol o drogas, sin seguro"],
        ["Inmovilización (art. 104.1) II", "Exceso de más del 50 % en tiempos de conducción, ocupación excesiva del 50 %, gases o ruido superiores, manipulación de instrumentos de control, sistemas para eludir la vigilancia, o conducir vehículo de permiso C o D sin autorización"],
        ["Fin de la inmovilización (art. 104.2)", "Se levanta cuando cesa la causa; los gastos son del conductor infractor (o del habitual, arrendatario o titular) y deben pagarse antes de levantarla"],
        ["Retirada y depósito (art. 105.1)", "Si constituye peligro o perturbación grave, tras un accidente que impida seguir, cuando no hay lugar para inmovilizar, en plazas de discapacidad sin distintivo, carriles reservados o carga y descarga, o en zona horaria sin distintivo o rebasando el triple del tiempo abonado"],
        ["Comunicación de la retirada (art. 105.3)", "La Administración comunica al titular la retirada y el depósito en veinticuatro horas"],
        ["Tratamiento residual (art. 106)", "Traslado a un centro autorizado si pasan más de dos meses depositado sin alegaciones, o si lleva más de un mes estacionado en el mismo lugar con desperfectos o sin placas, previo requerimiento de un mes al titular"],
        ["Cobro (art. 110)", "Firme la sanción, quince días naturales para pagar; después, apremio"],
        ["Prescripción de infracciones (art. 112.1)", "Leves: tres meses; graves y muy graves: seis meses, desde el día de los hechos"],
        ["Caducidad (art. 112.3)", "Un año desde el inicio del procedimiento sin resolución"],
        ["Prescripción de sanciones (art. 112.4)", "Multas: cuatro años; suspensión: un año, desde la firmeza"],
        ["Cancelación de antecedentes (art. 113.4)", "De oficio, tres años después del total cumplimiento o prescripción"],
      ],
      preguntas: [
        ["media", "¿Pueden los agentes inmovilizar un vehículo si el conductor da positivo en la prueba de alcohol?", ["Sí", "No", "Solo si hay accidente"], "Art. 104.1.d)."],
        ["media", "¿Se inmoviliza la bicicleta del ciclista que circula sin casco obligatorio?", ["No, la inmovilización por casco no se aplica a ciclistas", "Sí", "Solo de noche"], "Art. 104.1.c)."],
        ["media", "En una zona de estacionamiento con limitación horaria, ¿cuándo puede retirarse un vehículo con ticket?", ["Cuando rebasa el triple del tiempo abonado", "Cuando rebasa diez minutos", "Nunca"], "Art. 105.1.g)."],
        ["media", "¿En qué plazo debe comunicarse al titular la retirada y depósito del vehículo?", ["Veinticuatro horas", "Una semana", "Un mes"], "Art. 105.3."],
        ["media", "Las infracciones graves de tráfico prescriben a los…", ["Seis meses", "Tres meses", "Un año"], "Art. 112.1."],
        ["dificil", "¿Cuándo puede trasladarse a un centro de tratamiento un vehículo depositado por la Administración?", ["Cuando han pasado más de dos meses sin que el titular haya formulado alegaciones, previo requerimiento", "A los quince días", "Nunca sin juez"], "Art. 106.1.a)."],
        ["media", "El procedimiento sancionador de tráfico caduca si no hay resolución en…", ["Un año desde su iniciación", "Seis meses", "Tres años"], "Art. 112.3."],
      ],
    },
  ],
  glosario: [
    [S1, "Jefatura Central de Tráfico", "Organismo autónomo a través del cual el Ministerio del Interior ejerce sus competencias de tráfico."],
    [S1, "Vía urbana", "Vía situada dentro de poblado, cuya gestión del tráfico corresponde al municipio."],
    [S2, "Conductor habitual", "Persona comunicada al Registro de Vehículos como la que conduce usualmente un vehículo; asume las obligaciones del titular."],
    [S2, "Prueba de contraste", "Repetición de la prueba de alcohol o drogas a petición del interesado, preferentemente análisis de sangre."],
    [S3, "Permiso por puntos", "Sistema de crédito de puntos que se pierden por infracciones graves y muy graves y se recuperan por tiempo o cursos."],
    [S4, "Conducción negligente", "Infracción grave por conducir sin la diligencia debida."],
    [S5, "Dirección Electrónica Vial (DEV)", "Buzón electrónico donde se practican las notificaciones de tráfico."],
    [S5, "Procedimiento abreviado", "Terminación por pago voluntario con reducción del 50 % y renuncia a alegar."],
    [S6, "Inmovilización", "Medida que impide que el vehículo siga circulando hasta que cese la causa."],
    [S6, "Retirada y depósito", "Traslado del vehículo por la grúa a un depósito en los supuestos del art. 105."],
  ],
  casos: [
    {
      slug: "caso-control-alcohol-novel",
      titulo: "Un conductor novel en un control",
      supuesto: "En un control de la Policía Local en el Paseo de la Constitución, un conductor con un año de permiso da 0,35 mg/l de alcohol en aire espirado. No presenta síntomas de embriaguez ni conducción irregular. Su acompañante, de 17 años, viaja en el asiento delantero sin cinturón.",
      preguntas: [
        [S3, "media", "Con un año de antigüedad, ¿cuántos puntos tenía inicialmente el conductor?", ["Ocho", "Doce", "Quince"], "Art. 63.2.a)."],
        [S3, "dificil", "Para un conductor novel, 0,35 mg/l supone, según el anexo II, una pérdida de…", ["Seis puntos (más de 0,30 mg/l)", "Cuatro puntos", "Ningún punto"], "Anexo II, 1."],
        [S4, "media", "Conducir con una tasa de alcohol superior a la reglamentaria, si no es delito, es infracción…", ["Muy grave", "Grave", "Leve"], "Art. 77.c)."],
        [S6, "media", "¿Puede inmovilizarse el vehículo?", ["Sí, por resultado positivo en la prueba", "No", "Solo si hay accidente"], "Art. 104.1.d)."],
        [S2, "media", "¿Puede pedir una prueba de contraste?", ["Sí, preferentemente análisis de sangre", "No", "Solo si es profesional"], "Art. 14.5."],
        [S4, "media", "No usar el cinturón el acompañante es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 76.h)."],
        [S4, "dificil", "¿Quién responde de que el acompañante de 17 años no lleve cinturón?", ["El propio acompañante, autor del hecho (con responsabilidad solidaria de sus padres en la multa)", "Siempre el conductor", "Nadie"], "Arts. 82 y 82.b): el conductor responde solo del casco del pasajero y de los sistemas de retención infantil."],
        [S5, "media", "Si el conductor paga la multa en el acto, obtiene…", ["El 50 % de reducción y termina el procedimiento", "Nada", "El 20 % de reducción"], "Art. 94."],
        [S5, "media", "¿Quién es competente para sancionar este hecho cometido en vía urbana?", ["El alcalde de Zaragoza (o en quien delegue)", "El juez", "El Delegado del Gobierno"], "Art. 84.4."],
        [S4, "media", "Si la tasa superara el doble de la permitida, la multa sería…", ["1.000 euros", "500 euros", "200 euros"], "Art. 80.2.a)."],
      ],
    },
    {
      slug: "caso-grua-carga-descarga-bici",
      titulo: "La grúa en el centro",
      supuesto: "Una furgoneta lleva tres horas estacionada en una zona de carga y descarga del Tubo; un turismo está en una plaza de personas con discapacidad sin tarjeta; y una bicicleta amarrada a una farola no molesta a nadie. Los titulares reclaman después en el depósito.",
      preguntas: [
        [S6, "media", "¿Puede retirarse la furgoneta estacionada en la zona de carga y descarga?", ["Sí", "No", "Solo si tiene multas pendientes"], "Art. 105.1.f)."],
        [S6, "media", "¿Puede retirarse el turismo de la plaza de discapacidad sin distintivo?", ["Sí", "No", "Solo con orden del alcalde"], "Art. 105.1.e)."],
        [S1, "media", "¿Puede retirarse la bicicleta amarrada que no molesta?", ["No: solo si está abandonada o dificulta la circulación o daña el mobiliario", "Sí", "Siempre"], "Art. 7.c)."],
        [S4, "media", "Estacionar en la plaza de discapacidad es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 76.d)."],
        [S6, "media", "Los gastos de retirada y depósito corren a cargo de…", ["El titular, arrendatario o conductor habitual, según el caso", "El Ayuntamiento", "El seguro siempre"], "Art. 105.2."],
        [S6, "media", "¿Deben pagarse los gastos antes de recuperar el vehículo?", ["Sí, sin perjuicio del derecho de recurso", "No", "Solo si se pierde el recurso"], "Art. 105.2."],
        [S6, "media", "¿En qué plazo se comunica al titular la retirada?", ["Veinticuatro horas", "Diez días", "Un mes"], "Art. 105.3."],
        [S4, "media", "¿Quién responde, salvo que haya conductor habitual o se indique otro, de la infracción de estacionamiento?", ["El titular del vehículo", "El agente", "El Ayuntamiento"], "Art. 82.g)."],
        [S5, "media", "Como el conductor no estaba presente, la denuncia puede notificarse…", ["En un momento posterior", "Nunca", "Solo en el BOE"], "Art. 89.2.b)."],
        [S6, "dificil", "Si nadie reclama la furgoneta en dos meses y no hay alegaciones, la Administración puede…", ["Ordenar su traslado a un centro autorizado de tratamiento, previo requerimiento", "Subastarla de inmediato", "Regalarla"], "Art. 106.1.a)."],
      ],
    },
    {
      slug: "caso-foto-radar-identificar-conductor",
      titulo: "Una denuncia por radar y el titular que no identifica",
      supuesto: "Un radar municipal capta un turismo de empresa circulando por encima del límite en una vía urbana. Se notifica la denuncia a la empresa titular por la Dirección Electrónica Vial, pero la empresa no identifica al conductor en el plazo concedido. Meses después alega que la infracción ha prescrito.",
      preguntas: [
        [S5, "media", "¿Puede notificarse la denuncia posteriormente si se captó por medios de imagen?", ["Sí", "No", "Solo si hay testigos"], "Art. 89.2.c)."],
        [S5, "media", "¿Dónde se notifica si la empresa tiene Dirección Electrónica Vial?", ["En la DEV", "En el BOE directamente", "Por teléfono"], "Art. 90.1."],
        [S5, "media", "¿Qué plazo tiene el titular para identificar al conductor?", ["Veinte días naturales", "Tres días", "Dos meses"], "Art. 93.1."],
        [S4, "media", "No identificar verazmente al conductor cuando se le requiere es infracción…", ["Muy grave", "Grave", "Leve"], "Art. 77.j)."],
        [S4, "dificil", "Si la infracción originaria es grave, la multa por no identificar al conductor es…", ["El triple de la originaria", "El doble", "500 euros fijos"], "Art. 80.2.b)."],
        [S4, "media", "Los excesos de velocidad se sancionan en la cuantía prevista en…", ["El anexo IV de la ley", "El Código Penal", "La ordenanza fiscal"], "Art. 80.1."],
        [S6, "media", "Una infracción grave prescribe a los seis meses, plazo que se interrumpe…", ["Por cualquier actuación de la que tenga conocimiento el denunciado o la notificación practicada", "Nunca", "Solo con sentencia"], "Art. 112.2."],
        [S5, "media", "Los aparatos de medida usados para denunciar deben estar sometidos a…", ["Control metrológico", "Ningún control", "Revisión del alcalde"], "Art. 83.2."],
        [S5, "media", "¿Puede la empresa interponer recurso de reposición contra la sanción?", ["Sí, potestativo, en un mes", "No", "Solo de alzada"], "Art. 96.2."],
        [S6, "media", "Si la multa no se paga en los quince días naturales siguientes a su firmeza…", ["Se inicia el procedimiento de apremio", "Se archiva", "Prescribe"], "Art. 110.1."],
      ],
    },
  ],
});
