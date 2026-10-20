/**
 * Crea tema-320 — Tema 25 de Bombero/a Conductor/a: "Electricidad.
 * Conceptos básicos. Redes eléctricas. Medidas de seguridad con el riesgo
 * eléctrico. Efectos de la electricidad en el organismo. Valoración e
 * intervención en incidentes con riesgo eléctrico."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual de formación para bomberos" de TRAGSA y el
 * CEIS Guadalajara. Leído íntegro el Manual 3 "Riesgos tecnológicos y
 * asistencias técnicas", Parte 6 "Riesgo eléctrico" (CC BY-NC-SA 4.0),
 * cuyo índice coincide literalmente con el enunciado oficial. El REBT
 * (RD 842/2002) se enlaza con su identificador verificado
 * (BOE-A-2002-18099). No se formulan preguntas sobre algunas cifras del
 * manual que son internamente incoherentes (el reparto porcentual de
 * accidentes por tipo de contacto aparece con valores distintos en texto y
 * gráfico, y el ejemplo de 22 mA se compara mal con el umbral de 30 mA).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-320-electricidad-riesgo-electrico.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const CEIS = "https://ceis.antiun.net/docus/pdfsonline/m3/m3-riesgostecnologicos-v12-06-riesgoelectrico/m3-riesgostecnologicos-v12-06-riesgoelectrico.pdf";
const REBT = "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "conceptos-basicos-electricidad";
const S2 = "redes-electricas";
const S3 = "medidas-seguridad-riesgo-electrico";
const S4 = "efectos-electricidad-organismo";
const S5 = "intervencion-incidentes-electricos";

await sembrarTema({
  tema: {
    slug: "tema-320",
    titulo: "Electricidad: conceptos, redes, seguridad, efectos en el organismo e intervención",
    descripcion: "Intensidad, tensión, resistencia y ley de Ohm, conductores y aislantes, serie y paralelo, corriente continua, alterna y trifásica, potencia; alta y baja tensión, líneas, subestaciones, centros de transformación e instalaciones de enlace; contactos directos e indirectos, medidas de clase A y B, cinco reglas de oro y distancias de seguridad; efectos de la corriente (tetanización, fibrilación, quemaduras), resistencia del cuerpo y tensiones de seguridad; protocolos de actuación en alta y baja tensión.",
    contenido: "Sigue el capítulo de riesgo eléctrico del Manual 3 del CEIS Guadalajara, que la Escuela de Bomberos de Zaragoza recomienda para este tema: qué es la tensión, la intensidad y la resistencia, cómo llega la electricidad de la central a casa, por qué la intensidad es la que mata, cómo se corta la corriente antes de actuar y qué hacer ante un transformador ardiendo, una farola accidentada o una máquina que ha tocado una línea de alta tensión.",
    enlaces_boe: [
      { url: CEIS, titulo: "CEIS Guadalajara — Manual 3, Parte 6: Riesgo eléctrico" },
      { url: REBT, titulo: "RD 842/2002, Reglamento electrotécnico para baja tensión (BOE-A-2002-18099)" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 25 al Manual CEIS Guadalajara)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos básicos de electricidad", articulos: "CEIS M3-P6, Caracterización, apartado 1", url: CEIS },
      { seccion: S2, titulo: "Redes eléctricas", articulos: "CEIS M3-P6, Caracterización, apartado 2", url: CEIS },
      { seccion: S3, titulo: "Medidas de seguridad con el riesgo eléctrico", articulos: "CEIS M3-P6, Caracterización, apartado 3", url: CEIS },
      { seccion: S4, titulo: "Efectos de la electricidad en el organismo", articulos: "CEIS M3-P6, Caracterización, apartado 4", url: CEIS },
      { seccion: S5, titulo: "Valoración e intervención en incidentes con riesgo eléctrico", articulos: "CEIS M3-P6, Valoración e intervención y Tácticas", url: CEIS },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 25 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es la intensidad de corriente y en qué se mide?", "La carga que circula por un conductor por unidad de tiempo; en amperios (A), con el amperímetro conectado en serie"],
        ["¿Qué es la tensión y en qué se mide?", "La diferencia de potencial entre dos puntos; en voltios (V), con el voltímetro conectado en paralelo"],
        ["Ley de Ohm", "I = V / R: la intensidad es proporcional a la tensión e inversamente proporcional a la resistencia"],
        ["¿De qué depende la resistencia de un conductor?", "De su resistividad, es proporcional a su longitud e inversamente proporcional a su sección"],
        ["Clasificación de materiales por conductividad", "Superconductores, conductores (metales, grafito, agua salada), semiconductores y dieléctricos o aislantes"],
        ["Circuito en serie frente a paralelo", "Serie: misma intensidad y la tensión se reparte; si un elemento se rompe, se abre todo. Paralelo: misma tensión y la intensidad se reparte"],
        ["Tensiones de la red española", "230 V entre fase y neutro y 400 V entre fases, a 50 Hz"],
        ["Tipos de potencia en alterna", "Activa (W, la que se factura), reactiva (VAr, bobinas y condensadores) y aparente (VA)"],
      ],
      preguntas: [
        ["facil", "¿Cómo se conecta el voltímetro?", ["En paralelo", "En serie", "No se conecta"], "CEIS M3-P6."],
        ["media", "¿Qué es el efecto Joule?", ["El calentamiento de un conductor por el paso de corriente", "La atracción de cargas", "La inducción de un transformador"], "CEIS M3-P6."],
        ["media", "¿Qué conductor se usa más en líneas de alta tensión por ser menos denso?", ["El aluminio", "El oro", "El hierro"], "CEIS M3-P6."],
        ["media", "¿Cuánto suman dos baterías de 12 V en serie?", ["24 V", "12 V", "6 V"], "CEIS M3-P6."],
        ["dificil", "¿Cómo están desfasadas las tres fases de la corriente trifásica?", ["120°", "90°", "180°"], "CEIS M3-P6."],
        ["media", "¿Qué fenómeno puede producir descargas al descargar hidrocarburos?", ["La electricidad electrostática", "El efecto Joule", "La fibrilación"], "CEIS M3-P6."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Límite entre alta y baja tensión", "Alta: más de 1.000 V en alterna y 1.500 V en continua; baja: por debajo"],
        ["Recorrido de la energía", "Central (alternador a unos 20 kV) → subestación elevadora → líneas de transporte (66-380 kV) → subestaciones → líneas de distribución en media tensión → centros de transformación → baja tensión"],
        ["¿Qué son los reenganches automáticos?", "El cierre automático de una línea de alta tensión tras dispararse, en un máximo de tres minutos: una línea aparentemente cortada puede volver a tener tensión"],
        ["¿Qué hacen los centros de transformación?", "Reducen la media tensión (11 o 20 kV) a baja tensión (400/230 V); es donde más intervienen los bomberos"],
        ["Tipos de centro de transformación por su posición en la red", "De punta, de paso y en anillo (el más usado en ciudades)"],
        ["Instalaciones de enlace", "Acometida, caja general de protección (CGP), línea general de alimentación, contadores centralizados y derivación individual hasta el cuadro de mando y protección"],
        ["Elementos del cuadro de mando y protección de una vivienda", "ICP, interruptor general automático, diferencial (normalmente 30 mA) y pequeños interruptores automáticos (PIA)"],
      ],
      preguntas: [
        ["facil", "¿Por encima de cuántos voltios en alterna hay alta tensión?", ["1.000 V", "220 V", "50 V"], "CEIS M3-P6."],
        ["media", "¿Cuántos kV soporta aproximadamente cada aislador de vidrio?", ["Unos 10 kV", "Unos 100 V", "Unos 1.000 kV"], "CEIS M3-P6."],
        ["media", "¿De qué color suelen ser los cables subterráneos de media tensión?", ["Rojo (marrón en los antiguos de aceite)", "Azul", "Verde"], "CEIS M3-P6."],
        ["media", "¿Qué protege el interruptor diferencial?", ["Contra derivaciones a tierra que pueden electrocutar a una persona", "Contra el exceso de potencia contratada", "Contra el robo"], "CEIS M3-P6."],
        ["dificil", "¿Qué compuesto tóxico podían llevar transformadores antiguos de aceite?", ["Piraleno", "Hexafluoruro de azufre", "Agua destilada"], "CEIS M3-P6."],
        ["media", "¿Dónde empieza la propiedad del usuario?", ["En la caja general de protección", "En el centro de transformación", "En la central"], "CEIS M3-P6."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Contacto directo e indirecto", "Directo: tocar una parte activa en tensión. Indirecto: tocar una masa que ha quedado en tensión por un fallo de aislamiento"],
        ["Medidas de protección contra contactos directos", "Alejamiento (elevar a 2,5 m o enterrar a 1 m), obstáculos o barreras y aislamiento de las partes activas"],
        ["Medidas de clase A y de clase B", "A: impiden el paso de corriente (separación de circuitos, muy baja tensión, aislamiento, equipotencialidad). B: corte automático (puesta a tierra y diferenciales)"],
        ["Las cinco reglas de oro", "Abrir con corte visible las fuentes de tensión, enclavar los aparatos de corte, comprobar ausencia de tensión, poner a tierra y en cortocircuito y acotar y señalizar la zona"],
        ["Reglas de oro obligatorias en baja tensión", "Abrir con corte visible y comprobar ausencia de tensión; enclavar siempre que sea posible; tierra y cortocircuito y señalizar, recomendables"],
        ["Distancias mínimas con elementos móviles (grúas)", "5 m si la tensión supera 66 kV y 3 m si es inferior"],
        ["Distancias en instalaciones subterráneas", "0,5 m con herramientas manuales y 1 m con herramientas mecánicas"],
      ],
      preguntas: [
        ["facil", "Tocar la carcasa de una lavadora con un cable suelto dentro es un contacto…", ["Indirecto", "Directo", "Nulo"], "CEIS M3-P6."],
        ["media", "¿Qué regla de oro va justo después de abrir y enclavar?", ["Comprobar la ausencia de tensión", "Acotar la zona", "Poner a tierra"], "CEIS M3-P6."],
        ["media", "¿Es obligatoria la puesta a tierra y en cortocircuito en alta tensión?", ["Sí", "No, es recomendable", "Solo de noche"], "CEIS M3-P6."],
        ["media", "¿Qué distancia mínima debe guardar una grúa de una línea de más de 66 kV?", ["5 m", "1 m", "50 cm"], "CEIS M3-P6."],
        ["dificil", "¿Por qué un pájaro posado en un cable de alta tensión no se electrocuta?", ["Está todo él al mismo potencial (equipotencialidad)", "Por sus plumas", "Porque el cable no tiene tensión"], "CEIS M3-P6."],
        ["media", "Según la tabla del manual, ¿qué distancia de seguridad corresponde a trabajos con hasta 1 kV?", ["0,5 m", "4 m", "10 m"], "CEIS M3-P6."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué mata en un accidente eléctrico?", "La intensidad que atraviesa el cuerpo ('la intensidad es la que mata')"],
        ["Umbrales de intensidad que cita el manual", "Umbral de no soltar o tetanización: 10 mA; umbral de seguridad: 30 mA"],
        ["Efectos graves de la corriente", "Tetanización muscular, paro respiratorio, asfixia, fibrilación ventricular y quemaduras"],
        ["Resistencia media del cuerpo a 50 Hz", "Unos 1.600 Ω en seco, 800 Ω en húmedo y 200 Ω sumergido; en bomberos sudorosos, menos de 1.000 Ω"],
        ["Tensiones de seguridad (UNE 20460)", "50 V en locales secos, 25 V en húmedos y 12 V en mojados"],
        ["¿Es más peligrosa la alterna o la continua?", "La alterna de 50/60 Hz; la continua tiene un umbral de fibrilación mucho más alto"],
        ["Trayectorias más peligrosas", "Mano-mano, cabeza-manos y cabeza-pies, por atravesar órganos vitales"],
      ],
      preguntas: [
        ["facil", "¿Cuál es el 'umbral de no soltar'?", ["10 mA", "1 A", "0,1 mA"], "CEIS M3-P6."],
        ["media", "¿Por qué se palpa con el dorso de la mano en rastreos sin visibilidad?", ["Para que la tetanización no cierre la mano sobre un conductor", "Por higiene", "Para no ensuciar los guantes"], "CEIS M3-P6."],
        ["media", "¿Cuál es la tensión de seguridad en un local mojado?", ["12 V", "50 V", "230 V"], "CEIS M3-P6."],
        ["media", "¿Qué tensiones suelen producir fibrilación ventricular?", ["Por debajo de 2.000 V; las altas producen sobre todo quemaduras", "Solo más de 100 kV", "Ninguna"], "CEIS M3-P6."],
        ["dificil", "¿Cuánto tiempo de contacto mínimo señalan las investigaciones para la fibrilación?", ["Al menos un segundo", "Un minuto", "Una hora"], "CEIS M3-P6."],
        ["media", "¿Puede aparecer daño horas o días después de una descarga sin lesiones visibles?", ["Sí, por eso debe valorarlo personal sanitario", "No", "Solo en niños"], "CEIS M3-P6."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Pasos ante un incendio en alta tensión", "Valorar, pedir el corte a la compañía (placa, número de CT o de apoyo), guardar distancias, balizar, verificar el corte, controlar la propagación, extinguir y volver a la normalidad"],
        ["¿Qué significa que una instalación está 'en descargo'?", "Fuera de servicio y puesta a tierra y en cortocircuito por la compañía, segura para trabajar"],
        ["¿Cómo se ataca con tensión presente?", "Con chorro discontinuo de agua o espuma, a distancia (monitores) y evitando entrar"],
        ["Maquinista cuya máquina toca una línea de alta tensión", "Que permanezca dentro (jaula de Faraday); si la máquina arde o no puede moverse, que salte lejos sin tocarla y se aleje a pasos cortos o saltando con los pies juntos"],
        ["Farola accidentada", "Abrir el cuadro de protección de baja que la alimenta; si no, aislarla actuando en la farola anterior y la posterior"],
        ["Corte de luz en un bloque con escape de gas", "No tocar interruptores dentro; cortar desde fuera retirando fusibles rápido en la CGP y ventilar"],
        ["Agentes en incendio eléctrico de baja tensión", "Polvo químico, CO2 o polvo ABC; agua pulverizada o espuma solo sin tensión"],
        ["Planteamientos tácticos", "Defensivo (controlar la propagación), ofensivo (corte y rescate) o mixto"],
      ],
      preguntas: [
        ["facil", "¿Quién corta la alta tensión en un incidente?", ["La compañía eléctrica, a petición de los bomberos", "Cualquier vecino", "La policía"], "CEIS M3-P6."],
        ["media", "¿Qué dato se da a la compañía para un CT de intemperie?", ["El número de apoyo además de la placa y el número del CT", "El color del poste", "Nada"], "CEIS M3-P6."],
        ["media", "¿A qué distancia mínima se trabaja en grandes subestaciones con tensión?", ["Al menos 5 m, con monitores", "50 cm", "Pegado"], "CEIS M3-P6."],
        ["media", "Con un transformador en poste fuera de población, ¿qué distancia se guarda?", ["Al menos vez y media la altura del poste", "1 m", "Ninguna"], "CEIS M3-P6."],
        ["dificil", "¿Por qué se retiran los fusibles de forma rápida?", ["Para evitar el cebado del arco eléctrico", "Para ahorrar tiempo de servicio", "Por costumbre"], "CEIS M3-P6."],
        ["media", "¿Qué material aislante se usa en un rescate en alta tensión?", ["Pértiga, banqueta, alfombrilla y guantes dieléctricos", "Guantes de cuero", "Una escalera de aluminio"], "CEIS M3-P6."],
      ],
    },
  ],
  glosario: [
    [S1, "Ley de Ohm", "Relación I = V/R entre intensidad, tensión y resistencia."],
    [S1, "Efecto Joule", "Calentamiento de un conductor por el paso de la corriente."],
    [S2, "Centro de transformación (CT)", "Instalación que reduce la media tensión a baja tensión de consumo."],
    [S2, "Caja general de protección (CGP)", "Caja con los fusibles de la línea general de alimentación, donde empieza la propiedad del usuario."],
    [S2, "Reenganche", "Reconexión automática de una línea de alta tensión tras su disparo."],
    [S3, "Reglas de oro", "Cinco pasos para dejar sin tensión y con seguridad una instalación antes de trabajar en ella."],
    [S4, "Tetanización", "Contracción muscular sostenida que impide soltar el conductor."],
    [S4, "Fibrilación ventricular", "Contracción desordenada del corazón que detiene la circulación."],
    [S5, "En descargo", "Instalación fuera de servicio, a tierra y en cortocircuito, segura para intervenir."],
  ],
  casos: [
    {
      slug: "caso-grua-linea-alta-tension",
      titulo: "Una grúa toca una línea de alta tensión",
      supuesto: "En una obra a las afueras, el brazo de un camión grúa ha tocado una línea aérea de alta tensión. El conductor sigue en la cabina, asustado; hay operarios alrededor.",
      preguntas: [
        [S5, "facil", "¿Qué se le dice al conductor?", ["Que permanezca en la cabina", "Que baje corriendo", "Que toque el suelo"], "CEIS M3-P6."],
        [S5, "media", "¿Por qué está seguro dentro?", ["Por el efecto jaula de Faraday", "Por los neumáticos únicamente", "No lo está"], "CEIS M3-P6."],
        [S5, "media", "¿Qué se solicita a la compañía?", ["El corte, indicando las torres próximas y su identificación", "Una factura", "Nada"], "CEIS M3-P6."],
        [S3, "media", "¿Qué hacer con los operarios?", ["Alejarlos y balizar la zona con distancias de seguridad", "Que ayuden a empujar el camión", "Nada"], "CEIS M3-P6."],
        [S5, "media", "Si el camión empieza a arder, ¿qué debe hacer el conductor?", ["Saltar lo más lejos posible sin tocarlo", "Bajar agarrado a la puerta", "Quedarse siempre"], "CEIS M3-P6."],
        [S5, "media", "¿Cómo se aleja una vez en el suelo?", ["A pasos cortos o saltando con los pies juntos", "Corriendo a zancadas", "Arrastrándose"], "CEIS M3-P6."],
        [S2, "dificil", "¿Por qué no fiarse de que la línea se haya disparado?", ["Por los reenganches automáticos", "Porque nunca se dispara", "Por la lluvia"], "CEIS M3-P6."],
        [S3, "media", "¿Qué distancia mínima recomienda el manual con elementos móviles en líneas de menos de 66 kV?", ["3 m", "10 cm", "20 m"], "CEIS M3-P6."],
        [S4, "media", "Si alguien recibe una descarga y parece estar bien, ¿qué se hace?", ["Que lo valore personal sanitario", "Dejarle irse", "Darle agua"], "CEIS M3-P6."],
        [S5, "media", "¿Qué planteamiento táctico es este si hay medios suficientes?", ["Ofensivo: corte y rescate", "Solo defensivo", "Ninguno"], "CEIS M3-P6."],
      ],
    },
    {
      slug: "caso-incendio-cuarto-contadores",
      titulo: "Incendio en el cuarto de contadores",
      supuesto: "Sale humo del cuarto de contadores de un bloque de viviendas. Hay chispazos y los vecinos bajan por la escalera.",
      preguntas: [
        [S2, "facil", "¿Qué elemento alimenta la centralización de contadores?", ["La caja general de protección", "El diferencial de una vivienda", "La farola"], "CEIS M3-P6."],
        [S5, "media", "¿Cómo se corta la alimentación del cuarto de contadores?", ["Retirando los fusibles de la CGP", "Mojando el cuadro", "Cortando el agua"], "CEIS M3-P6."],
        [S5, "media", "¿Qué extintor se usa preferentemente en contadores?", ["CO2 y, si no basta, polvo ABC", "Agua a chorro", "Espuma siempre"], "CEIS M3-P6."],
        [S5, "media", "¿Qué efecto secundario tiene accionar el interruptor general de maniobra?", ["Deja fuera de servicio ascensores y ventilación de garajes", "Ninguno", "Apaga el gas"], "CEIS M3-P6."],
        [S5, "media", "Si hay cortocircuitos, ¿qué es imprescindible?", ["Cortar la corriente", "Echar más polvo", "Esperar"], "CEIS M3-P6."],
        [S3, "media", "¿Qué hay que comprobar antes de usar agua?", ["La ausencia de tensión", "El color del humo", "La hora"], "CEIS M3-P6."],
        [S2, "media", "¿Hasta cuántos contadores pueden ir en una pared de paso común?", ["16", "100", "2"], "CEIS M3-P6."],
        [S5, "media", "¿Por dónde puede propagarse si se actúa tarde?", ["Por pasos de cableado mal sellados", "Por el aire acondicionado del coche", "No se propaga"], "CEIS M3-P6."],
        [S4, "dificil", "¿Por qué el bombero es más vulnerable a una descarga con el EPI puesto?", ["El sudor baja su resistencia por debajo de 1.000 Ω", "Porque el EPI conduce", "No es más vulnerable"], "CEIS M3-P6."],
        [S5, "media", "¿Quién repara el cuadro si se han destruido las protecciones?", ["El propietario", "Los bomberos", "La policía"], "CEIS M3-P6."],
      ],
    },
    {
      slug: "caso-escape-gas-bloque",
      titulo: "Escape de gas y corte de luz en un bloque",
      supuesto: "Hay un fuerte olor a gas en un bloque de pisos y hay que cortar la electricidad sin provocar una explosión.",
      preguntas: [
        [S5, "facil", "¿Se tocan los interruptores dentro de la zona afectada?", ["No", "Sí, para apagar todo", "Solo los de la cocina"], "CEIS M3-P6."],
        [S5, "media", "¿Desde dónde se corta el suministro?", ["Desde el exterior, en la CGP o el cuarto de contadores si lo permite la fuga", "Desde la cocina", "Desde el ascensor"], "CEIS M3-P6."],
        [S5, "media", "¿Por qué se retiran rápido los fusibles?", ["Para no cebar un arco que inflame el gas", "Para que no se calienten", "Por normativa estética"], "CEIS M3-P6."],
        [S5, "media", "¿Qué equipos deben manejarse con cuidado?", ["Linternas, emisoras y explosímetros", "Las mangueras", "Los cascos"], "CEIS M3-P6."],
        [S5, "media", "¿Quién evacúa la vivienda según el manual?", ["Las fuerzas del orden", "Los vecinos solos", "Nadie"], "CEIS M3-P6."],
        [S5, "media", "¿Qué se hace después del corte?", ["Ventilar abriendo huecos y con ventilador en la puerta", "Encender las luces", "Cerrar las ventanas"], "CEIS M3-P6."],
        [S1, "media", "¿Qué fenómeno se produce al desconectar un circuito con carga?", ["Un arco voltaico", "Una sublimación", "Nada"], "CEIS M3-P6."],
        [S2, "media", "¿Qué tensión hay entre fase y neutro en la vivienda?", ["230 V", "400 V", "20 kV"], "CEIS M3-P6."],
        [S3, "dificil", "¿Qué tipo de medida es el interruptor diferencial?", ["De clase B (corte automático)", "De clase A", "No es medida de seguridad"], "CEIS M3-P6."],
        [S5, "media", "¿Qué hay que comprobar en una vivienda unifamiliar tras cortar?", ["Que no haya otras fuentes como generadores", "Que llueva", "Nada"], "CEIS M3-P6."],
      ],
    },
  ],
});
