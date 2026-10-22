/**
 * Crea tema-365 — Tema 38 de Policía Local: "Reglamento General de
 * Circulación: Ámbito de aplicación. Normas generales de comportamiento en
 * la circulación. Circulación de vehículos. Otras normas de circulación."
 *
 * Fuente: Real Decreto 1428/2003, de 21 de noviembre, Reglamento General de
 * Circulación (BOE-A-2003-23514), texto consolidado vigente descargado de la
 * API de legislación consolidada del BOE (octubre de 2026). Leídos los
 * arts. 1-28 (ámbito, normas generales, alcohol y drogas), 29, 46-57
 * (sentido, velocidad, distancias, prioridad), 64-69 (ciclistas, peatones,
 * vehículos prioritarios), 79-94 (cambio de sentido, marcha atrás,
 * adelantamiento, parada y estacionamiento), 98, 114-130 (puertas, cinturón,
 * casco, peatones, auxilio) y el nuevo Título VI (arts. 151-158, normas
 * específicas en zonas urbanas). El Real Decreto 518/2026, de 24 de junio
 * (BOE-A-2026-13889, citado por el propio texto consolidado), modificó
 * numerosos artículos y añadió el Título VI con efectos del 1-10-2026: se
 * usa siempre la redacción posterior. El art. 51 (rebasar en 20 km/h el
 * límite al adelantar) está derogado y se señala como tal. Definiciones
 * de parada y estacionamiento: anexo I de la Ley (RDLeg 6/2015), puntos 81-82.
 * Las señales (Título IV) no forman parte del enunciado oficial.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-365-reglamento-general-circulacion.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const RGC = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";
const a = (ancla) => `${RGC}#${ancla}`;
const S1 = "ambito-normas-generales";
const S2 = "alcohol-drogas-rgc";
const S3 = "sentido-velocidad-distancias";
const S4 = "prioridad-vehiculos-urgencia";
const S5 = "maniobras-adelantamiento";
const S6 = "parada-estacionamiento";
const S7 = "otras-normas-zonas-urbanas";

await sembrarTema({
  tema: {
    slug: "tema-365",
    titulo: "Reglamento General de Circulación (RD 1428/2003)",
    descripcion: "Ámbito de aplicación; normas generales de comportamiento: usuarios y conductores, transporte de personas, ciclomotores y motocicletas, atención a la conducción; alcohol y drogas: tasas, personas obligadas, práctica de las pruebas y diligencias; circulación de vehículos: sentido, velocidad (límites urbanos e interurbanos), distancias, prioridad de paso en intersecciones, ciclistas y peatones, vehículos prioritarios; maniobras: cambio de sentido, marcha atrás, adelantamiento; parada y estacionamiento; otras normas: puertas, apagado del motor, cinturón, casco, peatones, auxilio en accidentes; normas específicas en zonas urbanas (Título VI, en vigor desde el 1-10-2026).",
    contenido: "El reglamento que desarrolla la ley de tráfico, con lo que más se aplica en la calle: tasas de alcohol y cómo se hace la prueba, límites de velocidad en ciudad (20, 30 y 50 km/h), quién tiene preferencia en un cruce, cómo actuar ante un vehículo policial con sirena, dónde está prohibido parar y estacionar, quién debe llevar casco o silla infantil, y las nuevas normas urbanas para peatones, bicis y patinetes en vigor desde octubre de 2026.",
    enlaces_boe: [
      { url: RGC, titulo: "Real Decreto 1428/2003, de 21 de noviembre, por el que se aprueba el Reglamento General de Circulación (BOE-A-2003-23514)" },
      { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889", titulo: "Real Decreto 518/2026, de 24 de junio, que modifica el Reglamento General de Circulación (BOE-A-2026-13889)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Título preliminar y Título I, Caps. I-III: ámbito y normas generales", articulos: "arts. 1-19", url: a("a1") },
      { seccion: S2, titulo: "Título I, Caps. IV-V: alcohol, estupefacientes y pruebas", articulos: "arts. 20-28", url: a("a20") },
      { seccion: S3, titulo: "Título II, Caps. I-II: sentido de la circulación, velocidad y distancias", articulos: "arts. 29-55", url: a("a29") },
      { seccion: S4, titulo: "Título II, Cap. III: prioridad de paso y vehículos prioritarios", articulos: "arts. 56-71", url: a("a56") },
      { seccion: S5, titulo: "Título II, Caps. V-VII: incorporación, cambios de dirección y sentido, marcha atrás y adelantamiento", articulos: "arts. 72-89", url: a("a72") },
      { seccion: S6, titulo: "Título II, Caps. VIII-XI: parada, estacionamiento, alumbrado y advertencias", articulos: "arts. 90-113", url: a("a90") },
      { seccion: S7, titulo: "Título III y Título VI: otras normas y normas específicas en zonas urbanas", articulos: "arts. 114-130 y 151-158", url: a("a114") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 38 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Ámbito (art. 1.1)", "Vías y terrenos públicos aptos para circular, urbanos e interurbanos, vías de uso común y, en defecto de otras normas, vías privadas usadas por una colectividad indeterminada de usuarios"],
        ["Excluidos (art. 1.2)", "Caminos, terrenos, garajes y cocheras dentro de fincas privadas, sustraídos al uso público y de uso exclusivo de sus propietarios y dependientes"],
        ["Conducción negligente y temeraria (art. 3)", "Negligente: infracción grave; temeraria: muy grave"],
        ["Plazas autorizadas (art. 9)", "No pueden transportarse más personas que plazas; un exceso del 50 % (excluido el conductor y salvo autobuses de línea) es muy grave e implica inmovilización"],
        ["Pasajero de motocicleta (art. 12.1)", "Mayor de doce años, con casco, a horcajadas, pies en los reposapiés y en el asiento detrás del conductor; nunca entre el conductor y el manillar"],
        ["Remolque en motocicleta (art. 12.3)", "Hasta el 50 % de la masa en vacío del tractor, de día, con visibilidad, velocidad reducida un 10 % y sin personas en el remolque"],
        ["Pantallas (art. 18.1)", "Incompatible usar con el vehículo en movimiento pantallas con internet, televisión o vídeo; se permiten las de visión de maniobra o de acceso de peatones y el GPS"],
        ["Intercomunicadores en el casco (art. 18.2)", "Permitidos los dispositivos inalámbricos homologados integrados en el casco de motocicletas y ciclomotores, solo para intercomunicación o navegación"],
      ],
      preguntas: [
        ["media", "¿Se aplica el Reglamento General de Circulación al garaje privado de una vivienda sustraído al uso público?", ["No", "Sí", "Solo de noche"], "Art. 1.2."],
        ["media", "Según el reglamento, la conducción temeraria es una infracción…", ["Muy grave", "Grave", "Leve"], "Art. 3.2."],
        ["media", "¿Desde qué edad puede, con carácter general, viajar un pasajero en motocicleta?", ["Mayor de doce años", "Mayor de siete años siempre", "Mayor de dieciséis años"], "Art. 12.1."],
        ["dificil", "¿Qué ocupación excesiva convierte la infracción en muy grave?", ["La que aumenta en un 50 % las plazas autorizadas, excluida la del conductor", "Una persona más", "El doble de las plazas"], "Art. 9.3."],
        ["media", "¿Puede el conductor usar el GPS con el vehículo en movimiento?", ["Sí, está expresamente exceptuado", "No", "Solo parado"], "Art. 18.1."],
        ["media", "¿Puede un motorista usar un intercomunicador inalámbrico homologado integrado en el casco?", ["Sí, para intercomunicación o navegación", "No, nunca", "Solo en autopista"], "Art. 18.2.a)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Tasa general (art. 20)", "0,5 g/l en sangre o 0,25 mg/l en aire espirado; también para ciclistas"],
        ["Tasa reducida (art. 20)", "0,3 g/l en sangre o 0,15 mg/l en aire: mercancías de más de 3.500 kg, viajeros de más de nueve plazas, servicio público, escolar, mercancías peligrosas, urgencias y transportes especiales"],
        ["Noveles (art. 20)", "0,3 g/l o 0,15 mg/l durante los dos años siguientes a la obtención del permiso o licencia"],
        ["Quién puede ser sometido a la prueba (art. 21)", "Implicados como posibles responsables en un accidente, conductores con síntomas, denunciados por una infracción y requeridos en controles preventivos"],
        ["Segunda prueba (art. 23.1-2)", "Si la primera es positiva o hay síntomas: segunda prueba con etilómetro evidencial; el interesado puede controlar que medien al menos diez minutos entre ambas"],
        ["Derechos del examinado (art. 23.3)", "Formular alegaciones, que se consignan por diligencia, y contrastar los resultados con análisis de sangre, orina u otros en un centro sanitario"],
        ["Coste del contraste (art. 23.4)", "El interesado deposita previamente el importe; si el contraste es positivo se paga con él; si es negativo lo paga la Administración y se devuelve el depósito"],
        ["Diligencias (art. 24)", "Describir el procedimiento y el instrumento, consignar las advertencias hechas y, si los hechos son delictivos, conducir al examinado o al que se niega al juzgado según la LECrim"],
        ["Inmovilización por alcohol (art. 25)", "Si el resultado es positivo o hay negativa, salvo que otra persona habilitada se haga cargo; los gastos son del conductor"],
        ["Drogas (art. 28)", "Personas obligadas: las mismas que para el alcohol; la negativa permite la inmovilización y es infracción muy grave"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la tasa máxima general de alcohol en aire espirado?", ["0,25 mg/l", "0,15 mg/l", "0,50 mg/l"], "Art. 20."],
        ["media", "¿Qué tasa máxima en aire espirado tiene el conductor de un autobús escolar?", ["0,15 mg/l", "0,25 mg/l", "0"], "Art. 20."],
        ["media", "¿Durante cuánto tiempo se aplica la tasa reducida a los conductores noveles según el reglamento?", ["Dos años desde la obtención del permiso", "Un año", "Tres años"], "Art. 20."],
        ["media", "¿Qué tiempo mínimo debe mediar entre la primera y la segunda prueba de alcohol?", ["Diez minutos", "Dos minutos", "Treinta minutos"], "Art. 23.2."],
        ["media", "¿Están obligados los ciclistas a someterse a las pruebas de alcohol?", ["Sí", "No", "Solo si hay accidente"], "Art. 21."],
        ["dificil", "Si el análisis de sangre de contraste resulta negativo, ¿quién paga su importe?", ["La Administración competente, y se devuelve el depósito", "El interesado", "El seguro"], "Art. 23.4."],
        ["media", "Si los hechos revisten caracteres delictivos, el agente debe…", ["Conducir al examinado al juzgado según la Ley de Enjuiciamiento Criminal", "Dejarlo marchar", "Solo multar"], "Art. 24.c)."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Sentido (art. 29)", "Por la derecha y lo más cerca posible del borde; en curvas y cambios de rasante de visibilidad reducida, dejar libre la mitad contraria; circular por la izquierda en sentido contrario es muy grave"],
        ["Moderar la velocidad (art. 46)", "Ante peatones (especialmente niños, mayores o personas con discapacidad), ciclos, mercados y centros docentes, animales, autobús en parada, pavimento deslizante, deslumbramiento, niebla o lluvia intensa"],
        ["Límites urbanos genéricos (art. 50.1)", "20 km/h en plataforma única de calzada y acera; 30 km/h con un único carril por sentido; 50 km/h con dos o más carriles por sentido (sin contar carriles reservados)"],
        ["Facultades municipales (art. 50.2-3)", "Rebajar los límites con señalización; excepcionalmente, subir hasta 50 km/h las vías de un carril por sentido"],
        ["Mercancías peligrosas en ciudad (art. 50.4)", "Máximo 40 km/h en vías urbanas de dos o más carriles por sentido y en travesías"],
        ["Travesías y autovías urbanas (art. 50.5-6)", "Travesías: 50 km/h; autopistas y autovías dentro de poblado: 80 km/h"],
        ["Fuera de poblado (art. 48)", "Turismos y motos: 120 en autopista y autovía y 90 en convencional; camiones y furgonetas: 90 y 80; autobuses: 100 y 90; vías sin pavimentar: 30"],
        ["Adelantamiento y velocidad (art. 51)", "Derogado: ya no se permite rebasar en 20 km/h el límite al adelantar"],
        ["Distancia de seguridad (art. 54.1)", "Espacio que permita detenerse en caso de frenado brusco; los ciclistas en grupo pueden no mantenerla"],
        ["50 metros (art. 54.2-3)", "Vehículos de más de 3.500 kg o de más de 10 m deben dejar 50 m para facilitar que les adelanten; no se aplica en poblado ni donde está prohibido adelantar"],
      ],
      preguntas: [
        ["facil", "¿Cuál es el límite genérico en una vía urbana con un único carril por sentido?", ["30 km/h", "50 km/h", "20 km/h"], "Art. 50.1.b)."],
        ["media", "¿Y en una calle de plataforma única de calzada y acera?", ["20 km/h", "30 km/h", "10 km/h"], "Art. 50.1.a)."],
        ["media", "¿Se cuentan los carriles bus para determinar el límite genérico urbano?", ["No", "Sí", "Solo en hora punta"], "Art. 50.1, último párrafo."],
        ["media", "¿Puede el Ayuntamiento elevar a 50 km/h una vía urbana de un único carril por sentido?", ["Sí, excepcionalmente y con señalización específica", "No", "Solo la DGT"], "Art. 50.3."],
        ["media", "¿A qué velocidad máxima circula un vehículo con mercancías peligrosas en una travesía?", ["40 km/h", "50 km/h", "30 km/h"], "Art. 50.4."],
        ["dificil", "¿Sigue en vigor la posibilidad de rebasar en 20 km/h el límite en convencionales al adelantar?", ["No, el art. 51 está derogado", "Sí, para turismos y motos", "Sí, para todos"], "Art. 51 (derogado)."],
        ["media", "¿Cuál es el límite de un turismo en una carretera convencional?", ["90 km/h", "100 km/h", "80 km/h"], "Art. 48.1.a)."],
        ["media", "¿Se aplica en poblado la separación de 50 m a los camiones de más de 3.500 kg?", ["No", "Sí", "Solo de noche"], "Art. 54.3.a)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Intersecciones señalizadas (art. 56)", "Prevalece la señalización; ante agente, obedecer sus señales; con ceda el paso o stop se cede a la vía preferente venga por donde venga"],
        ["Sin señalizar (art. 57)", "Preferencia de quien viene por la derecha, salvo: vía pavimentada frente a no pavimentada, vehículos sobre raíles, quien está dentro de la glorieta y quien circula por autopista o autovía"],
        ["Prioridad de ciclistas (art. 64.2)", "En carril bici, paso para ciclistas o arcén señalizados; cuando un vehículo gira con un ciclista próximo; en grupo, si el primero ya inició el cruce o entró en la glorieta"],
        ["Prioridad de peatones (art. 65)", "En pasos señalizados, aceras y zonas peatonales; al girar con peatones cruzando; al cruzar un arcén con peatones; al subir o bajar del autobús en parada; ante unidades militares, filas escolares y comitivas"],
        ["Vehículos prioritarios (art. 67)", "Servicios de urgencia en servicio urgente: pueden superar los límites y dejar de cumplir normas con uso ponderado y extremada precaución en cruces y semáforos"],
        ["Señales de prioridad (art. 68.2)", "Policía, extinción de incendios, protección civil y salvamento y asistencia sanitaria, usando simultáneamente señal luminosa y acústica; solo la luminosa si omitir la acústica no entraña peligro"],
        ["Límite de sus facultades (art. 68.1)", "Pueden dejar de cumplir los Títulos II, III y IV, pero siempre deben obedecer las órdenes y señales de los agentes"],
        ["Ante un vehículo prioritario (art. 69)", "Facilitar el paso, apartándose normalmente a la derecha o deteniéndose si es preciso"],
        ["Orden de detención policial (art. 69)", "Si el vehículo policial, detrás, activa además una luz roja hacia delante intermitente o destellante, detenerse a la derecha delante de él, en lugar seguro, permanecer dentro y seguir las instrucciones por megafonía"],
      ],
      preguntas: [
        ["media", "En una intersección sin señalizar, ¿a quién se cede el paso como regla general?", ["A los vehículos que se aproximan por la derecha", "A los que vienen por la izquierda", "Al vehículo más grande"], "Art. 57.1."],
        ["media", "En una glorieta sin señalizar, ¿quién tiene preferencia?", ["Quien ya circula por la vía circular", "Quien pretende acceder", "Quien viene por la derecha"], "Art. 57.1.c)."],
        ["media", "Un turismo gira a la derecha y un ciclista circula en sus proximidades. ¿Quién tiene prioridad?", ["El ciclista", "El turismo", "El que llegue antes"], "Art. 64.2.b)."],
        ["media", "¿Tienen prioridad los peatones que cruzan la vía a la que gira un vehículo aunque no haya paso de peatones?", ["Sí", "No", "Solo si son niños"], "Art. 65.1.b)."],
        ["dificil", "¿Qué señales debe usar, como regla general, un vehículo policial en servicio urgente para ser prioritario?", ["Simultáneamente la luminosa y la acústica especiales", "Solo la acústica", "Las luces de emergencia"], "Art. 68.2."],
        ["media", "¿Puede un vehículo prioritario desobedecer la señal de un agente que regula el tráfico?", ["No, las órdenes de los agentes son siempre obligatorias", "Sí", "Solo si va con sirena"], "Art. 68.1."],
        ["dificil", "Un coche patrulla con sirena y luces se sitúa detrás y activa una luz roja intermitente hacia delante. El conductor debe…", ["Detenerse a la derecha delante del vehículo policial y permanecer en su interior", "Bajar del coche y acercarse", "Apartarse y continuar"], "Art. 69, párrafo segundo."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Cambio de sentido prohibido (art. 79)", "Donde no se puedan comprobar las circunstancias, en pasos a nivel, túneles y pasos inferiores, en autopistas y autovías salvo lugares habilitados y donde esté prohibido adelantar, salvo autorización"],
        ["Marcha atrás (art. 80)", "Solo si no se puede ir hacia delante ni cambiar de dirección o sentido, con el recorrido mínimo; como maniobra complementaria, máximo 15 m sin invadir un cruce; prohibida en autopistas y autovías"],
        ["Adelantamiento por la izquierda (art. 82.1)", "Regla general"],
        ["Por la derecha (art. 82.2-3)", "Cuando el adelantado indica que gira o para a la izquierda, a tranvías por la zona central, y en poblado con dos o más carriles en el mismo sentido delimitados"],
        ["Durante el adelantamiento (art. 85.1-3)", "Velocidad notoriamente superior, separación lateral suficiente, reintegrarse cuanto antes y de modo gradual"],
        ["Adelantar a ciclistas y vulnerables (art. 85.4)", "Ocupar parte o todo el carril contiguo con al menos 1,5 m; con más de un carril por sentido, cambio completo de carril; fuera de poblado, reducir al menos 20 km/h respecto al límite"],
        ["Grupo de ciclistas (art. 85.4)", "Se considera una única unidad móvil a efectos del adelantamiento"],
        ["Prohibido adelantar (art. 87)", "En curvas y cambios de rasante de visibilidad reducida, en pasos de peatones, intersecciones con vías ciclistas y pasos a nivel, en intersecciones (salvo glorietas, por la derecha, vía con prioridad señalizada o a vehículos de dos ruedas) y en túneles de un carril"],
      ],
      preguntas: [
        ["media", "¿Cuántos metros como máximo puede recorrer marcha atrás un vehículo como maniobra complementaria del estacionamiento?", ["15 metros", "25 metros", "5 metros"], "Art. 80.2."],
        ["media", "¿Está permitida la marcha atrás en autovía?", ["No", "Sí, con precaución", "Solo en el arcén"], "Art. 80.3."],
        ["media", "En poblado, en una calzada con dos carriles en el mismo sentido delimitados por marcas, ¿se puede adelantar por la derecha?", ["Sí, cerciorándose de que no hay peligro", "No, nunca", "Solo a autobuses"], "Art. 82.3."],
        ["media", "¿Qué separación lateral mínima hay que dejar al adelantar a un ciclista?", ["1,5 metros", "1 metro", "50 centímetros"], "Art. 85.4."],
        ["dificil", "Fuera de poblado, al adelantar a ciclistas, el conductor debe además…", ["Reducir su velocidad al menos 20 km/h respecto al límite de la vía", "Aumentar la velocidad", "Tocar el claxon"], "Art. 85.4, párrafo tercero."],
        ["media", "¿Está permitido adelantar en una intersección si se adelanta a una motocicleta?", ["Sí, es una de las excepciones", "No", "Solo de día"], "Art. 87.1.c).4.º"],
        ["media", "¿Está permitido cambiar de sentido en un tramo en que está prohibido adelantar?", ["No, salvo que esté expresamente autorizado", "Sí", "Solo en poblado"], "Art. 79.1."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Parada (Ley, anexo I.81)", "Inmovilización del vehículo durante menos de dos minutos, sin que el conductor pueda abandonarlo"],
        ["Estacionamiento (Ley, anexo I.82)", "Inmovilización que no es detención ni parada"],
        ["Dónde parar en vía urbana (art. 90.2)", "Lo más cerca posible del borde derecho; en vías de sentido único, también en el izquierdo"],
        ["Lugares peligrosos o que obstaculizan gravemente (art. 91.2) I", "Menos de tres metros hasta el borde opuesto o la línea continua, impedir incorporarse a otro, obstaculizar un vado señalizado o un paso rebajado, medianas e isletas, impedir un giro autorizado"],
        ["Lugares peligrosos o que obstaculizan gravemente (art. 91.2) II", "Carga y descarga en horas de uso, doble fila sin conductor, parada de transporte público, reservas de urgencia y seguridad, vía de atención preferente y en medio de la calzada"],
        ["Prohibido parar (art. 94.1)", "Curvas y cambios de rasante de visibilidad reducida, túneles, pasos a nivel, pasos de peatones y ciclistas, carriles reservados, intersecciones si se dificulta el giro, raíles del tranvía, ocultando señales, autopistas, carriles bus y bici, paradas de transporte público y plazas de personas con discapacidad"],
        ["Prohibido estacionar (art. 94.2)", "Donde está prohibido parar, en zona de limitación horaria sin distintivo o excediendo el tiempo, en carga y descarga, en plazas de personas con discapacidad, en aceras y zonas peatonales, ante vados y en doble fila"],
        ["Colocación (art. 92)", "Paralelo al borde; al dejar el vehículo: parar el motor, freno de mano y primera en subida o marcha atrás en bajada; los de más de 3.500 kg, calzados en pendiente"],
        ["Autocaravanas (art. 92.4)", "Sin desbordar el perímetro, solo sobre neumáticos (calzos permitidos) y sin verter fluidos"],
      ],
      preguntas: [
        ["media", "¿Qué es una parada según la ley?", ["La inmovilización durante menos de dos minutos sin que el conductor pueda abandonar el vehículo", "Cualquier detención por semáforo", "Estacionar menos de cinco minutos"], "RDLeg 6/2015, anexo I.81."],
        ["media", "¿Se considera que obstaculiza gravemente un vehículo que deja menos de tres metros hasta el borde opuesto de la calzada?", ["Sí", "No", "Solo si es un camión"], "Art. 91.2.a)."],
        ["media", "¿Está prohibido parar en un paso para peatones?", ["Sí", "No, solo estacionar", "Solo de noche"], "Art. 94.1.b)."],
        ["media", "¿Está prohibido estacionar delante de un vado correctamente señalizado?", ["Sí", "No", "Solo en días laborables"], "Art. 94.2.f)."],
        ["media", "En una vía urbana de sentido único, ¿se puede estacionar en el lado izquierdo?", ["Sí", "No", "Solo motocicletas"], "Art. 90.2."],
        ["dificil", "Al estacionar en pendiente descendente un turismo con caja de cambios manual, debe dejarse…", ["Colocada la marcha atrás", "La primera velocidad", "Punto muerto"], "Art. 92.3.c)."],
        ["media", "¿El estacionamiento en doble fila sin conductor se considera de los que obstaculizan gravemente la circulación?", ["Sí", "No", "Solo en el centro"], "Art. 91.2.h)."],
      ],
    },
    {
      seccion: S7,
      flashcards: [
        ["Puertas (art. 114)", "Prohibido abrirlas antes de la completa inmovilización o sin comprobar que no hay peligro, especialmente para los ciclistas"],
        ["Apagar el motor (art. 115)", "Detenido en túnel o lugar cerrado y al repostar; en el túnel, si la detención dura más de dos minutos, conservando la luz de posición"],
        ["Sistemas de retención infantil (art. 117)", "Obligatorios para menores de 135 cm o menos; en asientos traseros, salvo excepciones; orientados hacia atrás en el asiento delantero solo con el airbag desactivado"],
        ["Casco en motocicleta (art. 118.1)", "Casco homologado (R22) en todas las vías, guantes en interurbanas y calzado cerrado en todas las vías"],
        ["Casco en bicicleta (art. 118.2)", "Obligatorio en vías interurbanas; para menores de dieciséis años en todo tipo de vías; para quienes trabajan en bicicleta, también en vías urbanas y travesías"],
        ["Casco en VMP (art. 118.3)", "Obligatorio para los conductores de vehículos de movilidad personal, con elemento luminoso o reflectante visible a 150 m de noche o con poca visibilidad"],
        ["Exenciones de cinturón (art. 119)", "Marcha atrás o estacionamiento, certificado médico, servicios de urgencia en poblado, pasajeros de ambulancias que asisten al paciente y menores en el asiento trasero del taxi urbano"],
        ["Peatones fuera de zona peatonal (art. 122)", "Por el arcén izquierdo o la calzada; por la derecha quienes empujan un ciclo o VMP, los grupos dirigidos y quienes deben hacerlo por seguridad"],
        ["Auxilio (art. 129)", "Los implicados y testigos deben auxiliar o pedir auxilio, evitar mayores peligros, no alterar las huellas si hay muertos o heridos graves y avisar a la autoridad si hay heridos"],
        ["Título VI (arts. 151-158)", "En vigor desde el 1-10-2026: aceras solo para peatones (niños de hasta doce años en bici acompañados, si la ordenanza lo permite); los VMP están prohibidos a menores de quince años; los vehículos a motor dejan cinco metros con el ciclista que les precede"],
      ],
      preguntas: [
        ["media", "¿Cuándo es obligatorio el casco en bicicleta para un adulto que no trabaja en ella?", ["En vías interurbanas", "En todas las vías", "Nunca"], "Art. 118.2."],
        ["media", "¿Hasta qué edad es obligatorio el casco en bicicleta en todo tipo de vías?", ["Menores de dieciséis años", "Menores de doce años", "Menores de dieciocho años"], "Art. 118.2."],
        ["media", "¿Deben llevar casco los conductores de patinetes eléctricos (vehículos de movilidad personal)?", ["Sí", "No", "Solo los menores"], "Art. 118.3."],
        ["media", "¿Pueden conducir un VMP los menores de quince años?", ["No", "Sí, acompañados", "Sí, en aceras"], "Art. 155.3."],
        ["media", "¿Qué distancia mínima debe dejar en ciudad un vehículo a motor con el ciclista que le precede en el mismo carril?", ["Cinco metros", "Dos metros", "Diez metros"], "Art. 153.4."],
        ["dificil", "¿Pueden los ocupantes de un vehículo policial en servicio de urgencia ir sin cinturón por una carretera convencional?", ["No, la exención solo alcanza a la circulación en poblado", "Sí", "Solo el conductor"], "Art. 119.2."],
        ["media", "Si hay heridos graves en un accidente, los implicados deben…", ["Avisar a la autoridad y evitar modificar el estado de las cosas y las huellas, salvo por seguridad", "Retirar los vehículos y marcharse", "Esperar sin hacer nada"], "Art. 129.2.c) y e)."],
        ["media", "¿Pueden los Ayuntamientos permitir, por ordenanza, la parada y el estacionamiento de motos sobre la acera?", ["Sí, si no se perjudica el tránsito de peatones", "No, nunca", "Sí, sin condiciones"], "Art. 156.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Colectividad indeterminada de usuarios", "Conjunto abierto de personas que usan una vía privada; determina que se aplique la normativa de tráfico en defecto de otras normas."],
    [S2, "Etilómetro evidencial", "Aparato oficialmente autorizado que mide cuantitativamente el alcohol en aire espirado."],
    [S2, "Prueba de contraste", "Análisis de sangre, orina u otro a petición del interesado para contrastar el resultado del etilómetro."],
    [S3, "Plataforma única", "Vía urbana en que calzada y acera están al mismo nivel; límite genérico de 20 km/h."],
    [S3, "Travesía", "Tramo de carretera que discurre por poblado sin variante alternativa."],
    [S4, "Vehículo prioritario", "Vehículo de servicio de urgencia que, en servicio urgente y con las señales especiales, tiene prioridad de paso."],
    [S5, "Unidad móvil", "Consideración que tiene un grupo de ciclistas a efectos de ser adelantado."],
    [S6, "Doble fila", "Estacionamiento junto a otro vehículo ya estacionado en el borde de la calzada; prohibido."],
    [S7, "Sistema de retención infantil", "Silla o elevador homologado adaptado a la talla y peso del menor."],
    [S7, "Zona de prioridad residencial", "Área urbana en la que el Ayuntamiento puede restringir el acceso, la velocidad o el estacionamiento (art. 152.3)."],
  ],
  casos: [
    {
      slug: "caso-control-preventivo-alcohol-rgc",
      titulo: "Control preventivo de alcoholemia",
      supuesto: "La Policía Local monta un control preventivo de alcoholemia en la avenida de Navarra. Un repartidor de una furgoneta de 3.200 kg da 0,22 mg/l en la primera prueba; un conductor de autobús urbano da 0,18 mg/l; y un tercer conductor se niega a soplar. Todos ellos tienen permiso desde hace más de cinco años.",
      preguntas: [
        [S2, "media", "¿Puede la Policía Local someter a la prueba a quien no ha cometido infracción alguna?", ["Sí, dentro de un control preventivo ordenado por la autoridad", "No", "Solo si hay síntomas"], "Art. 21.d)."],
        [S2, "media", "¿Supera la tasa permitida el repartidor de la furgoneta de 3.200 kg?", ["No: su tasa máxima es 0,25 mg/l", "Sí", "Sí, porque es profesional"], "Art. 20: la tasa reducida es para mercancías de más de 3.500 kg."],
        [S2, "media", "¿Supera la tasa permitida el conductor del autobús urbano?", ["Sí: su tasa máxima es 0,15 mg/l", "No", "Solo si lleva pasajeros"], "Art. 20, párrafo segundo."],
        [S2, "media", "Con un primer resultado positivo, el agente debe…", ["Hacer una segunda prueba con etilómetro evidencial", "Detenerlo directamente", "Dejarlo seguir"], "Art. 23.1."],
        [S2, "media", "¿Qué tiempo mínimo debe pasar entre las dos pruebas?", ["Diez minutos", "Cinco minutos", "Una hora"], "Art. 23.2."],
        [S2, "media", "¿Puede el conductor del autobús pedir un análisis de sangre de contraste?", ["Sí", "No", "Solo con abogado"], "Art. 23.3."],
        [S2, "media", "¿Se puede inmovilizar el vehículo de quien se niega a soplar?", ["Sí", "No", "Solo con orden judicial"], "Art. 25.2."],
        [S2, "media", "¿Qué debe consignar el agente en el boletín o atestado?", ["El procedimiento seguido, el instrumento empleado y las advertencias hechas", "Solo el resultado", "Nada"], "Art. 24.a) y b)."],
        [S2, "dificil", "Si la negativa reviste caracteres delictivos, el agente…", ["Conduce al interesado al juzgado conforme a la LECrim", "Solo lo denuncia", "Le retira el permiso en el acto"], "Art. 24.c)."],
        [S2, "media", "¿Quién paga los gastos de inmovilización y depósito?", ["El conductor o quien legalmente responda por él", "El Ayuntamiento", "Nadie"], "Art. 25.4."],
      ],
    },
    {
      slug: "caso-cruce-patrulla-urgencia",
      titulo: "Un servicio urgente por el centro",
      supuesto: "Una patrulla de la Policía Local acude a un aviso urgente con luces y sirena por una calle de un carril por sentido. Cruza un semáforo en rojo, adelanta a un grupo de ciclistas y, más adelante, ordena detenerse a un conductor que circulaba de forma irregular activando la luz roja hacia delante.",
      preguntas: [
        [S4, "media", "¿Puede la patrulla circular por encima del límite de velocidad?", ["Sí, en servicio urgente y con las señales especiales", "No", "Solo en autopista"], "Art. 67.1."],
        [S4, "media", "¿Qué precaución debe adoptar antes de cruzar el semáforo en rojo?", ["Extremar las precauciones hasta cerciorarse de que no hay riesgo y los demás se han detenido", "Ninguna", "Tocar el claxon"], "Art. 67.2."],
        [S4, "media", "¿Qué señales le dan la condición de prioritaria?", ["La luminosa y la acústica especiales simultáneamente", "Solo las luces de cruce", "Ninguna"], "Art. 68.2."],
        [S4, "media", "¿Qué deben hacer los demás conductores al percibir las señales?", ["Facilitar el paso, normalmente apartándose a la derecha o deteniéndose", "Acelerar", "Continuar igual"], "Art. 69."],
        [S3, "media", "¿Cuál es el límite genérico de esa calle para el resto de conductores?", ["30 km/h", "50 km/h", "20 km/h"], "Art. 50.1.b)."],
        [S5, "media", "Al adelantar al grupo de ciclistas, los demás vehículos deben dejar…", ["Al menos 1,5 metros de separación lateral", "50 cm", "No hay mínimo en ciudad"], "Art. 85.4."],
        [S5, "media", "El grupo de ciclistas, a efectos del adelantamiento, se considera…", ["Una única unidad móvil", "Varios vehículos independientes", "Peatones"], "Art. 85.4."],
        [S4, "dificil", "El conductor al que se ordena detenerse con la luz roja debe…", ["Parar a la derecha, delante del vehículo policial, y permanecer dentro", "Salir del coche", "Parar detrás del vehículo policial"], "Art. 69, párrafo segundo."],
        [S4, "media", "¿Cómo recibe el conductor las instrucciones del agente?", ["Por megafonía o cualquier medio que perciba claramente", "Solo por escrito", "Por teléfono"], "Art. 69."],
        [S4, "media", "¿Exime el régimen especial a la patrulla de su responsabilidad?", ["No, deja de cumplir las normas bajo su exclusiva responsabilidad", "Sí, totalmente", "Solo de noche"], "Art. 68.1."],
      ],
    },
    {
      slug: "caso-estacionamientos-patinete-colegio",
      titulo: "La salida del colegio",
      supuesto: "A la salida de un colegio de Delicias, un agente encuentra un turismo en doble fila sin conductor, otro estacionado sobre un paso de peatones y una furgoneta en la parada del autobús. Un niño de 13 años circula en patinete eléctrico sin casco por la acera, y un padre lleva a su hija de 8 años en una bicicleta con asiento homologado.",
      preguntas: [
        [S6, "media", "El estacionamiento en doble fila sin conductor se considera…", ["Uno de los que obstaculizan gravemente la circulación", "Correcto si es breve", "Parada"], "Art. 91.2.h)."],
        [S6, "media", "¿Está prohibido estacionar sobre un paso de peatones?", ["Sí", "No", "Solo de día"], "Art. 94.1.b) y 94.2.a)."],
        [S6, "media", "Estacionar en la parada señalizada de autobús es…", ["Estacionamiento que obstaculiza gravemente la circulación", "Correcto", "Leve sin más"], "Art. 91.2.i)."],
        [S7, "media", "¿Puede el niño de 13 años conducir el patinete eléctrico?", ["No, los menores de quince años no pueden conducir VMP", "Sí", "Sí, con casco"], "Art. 155.3."],
        [S7, "media", "¿Pueden circular VMP por las aceras?", ["No: las aceras son para peatones y está prohibida la circulación de cualquier vehículo", "Sí", "Solo despacio"], "Art. 152.1."],
        [S7, "media", "¿Es obligatorio el casco para los conductores de VMP?", ["Sí", "No", "Solo de noche"], "Art. 118.3."],
        [S7, "media", "¿Puede el padre llevar a su hija en la bicicleta?", ["Sí, si es mayor de edad, en asiento adicional homologado y la niña pesa hasta 22 kg y se sienta sola", "No, nunca", "Solo en carril bici"], "Art. 154.1-2."],
        [S7, "media", "¿Debe llevar casco la niña de 8 años?", ["Sí, los menores de dieciséis años en todo tipo de vías", "No", "Solo en interurbanas"], "Art. 118.2."],
        [S7, "dificil", "¿Qué medida pueden adoptar los Ayuntamientos en el entorno escolar?", ["Establecer caminos o zonas escolares seguros con reducción de velocidad y restricciones", "Ninguna", "Solo poner multas"], "Art. 158.1."],
        [S3, "media", "Al aproximarse a un centro docente, los conductores deben…", ["Moderar la velocidad y detenerse si es preciso", "Mantener la velocidad", "Tocar el claxon"], "Art. 46.1.b)."],
      ],
    },
  ],
});
