/**
 * Crea tema-329 — Tema 34 de Bombero/a Conductor/a: "Centro de
 * comunicaciones. Conceptos básicos de las comunicaciones de radio. Redes de
 * comunicación. Las redes de comunicaciones para emergencias. Sistema de
 * comunicaciones TETRA del SCIS y PC. Centro de comunicaciones. Manual
 * programa de gestión de servicios IPSIGE."
 *
 * Fuente: Tema 34 "Las comunicaciones en el SEIS y PC" (versión 31-10-2024)
 * de la Escuela de Bomberos del Ayuntamiento de Zaragoza, leído íntegro.
 *
 * Laguna señalada: el "Manual programa de gestión de servicios IPSIGE" que
 * cita el temario oficial es un documento interno del Servicio que no está
 * publicado (búsqueda realizada sin resultado). El apunte de la Escuela solo
 * dice que IPSIGE gestiona servicios, personal y vehículos y que está en
 * cada puesto de operador y en el PMA. No se fabrica su contenido: la
 * sección "ipsige" se limita a eso y a advertir que el manual no es público.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-329-centro-comunicaciones-tetra.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/TEMA_34._Las_comunicaciones_en_el_SEIS_y_PC_V_31102024.pdf";
const S1 = "conceptos-radio";
const S2 = "redes-emergencia-tetra";
const S3 = "terminales-tetra";
const S4 = "centro-comunicaciones-pma";
const S5 = "ipsige";

await sembrarTema({
  tema: {
    slug: "tema-329",
    titulo: "Centro de comunicaciones: radio, red TETRA del SCIS y PC, PMA e IPSIGE",
    descripcion: "Ondas de radio (frecuencia, longitud de onda, velocidad, amplitud), modulación AM/FM y modos simplex, dúplex y semidúplex; redes de emergencia (TETRA, TETRAPOL/SIRDEE, DMR); red TETRA NEBULA de Zaragoza, estaciones base y terminales; Centro de Comunicaciones, Puesto de Mando Avanzado y el programa IPSIGE.",
    contenido: "Sigue el Tema 34 de la Escuela de Bomberos: cómo funcionan las comunicaciones por radio, por qué los servicios de emergencia usan redes propias como TETRA, cómo es la red NEBULA del Ayuntamiento de Zaragoza (nodo central, 15 estaciones base, red de transporte), qué terminales usan los bomberos y cómo se organiza el Centro de Comunicaciones y el vehículo PMA. El manual de IPSIGE que cita el temario no es público: el tema lo advierte.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 34: Las comunicaciones en el SEIS y PC" }],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos básicos de las comunicaciones de radio", articulos: "Tema 34, apartado 1", url: FUENTE },
      { seccion: S2, titulo: "Redes de emergencias y red TETRA del SCIS y PC", articulos: "Tema 34, apartado 1", url: FUENTE },
      { seccion: S3, titulo: "Terminales TETRA portátiles y móviles", articulos: "Tema 34, apartado 1", url: FUENTE },
      { seccion: S4, titulo: "Centro de Comunicaciones y Puesto de Mando Avanzado", articulos: "Tema 34, apartado 2", url: FUENTE },
      { seccion: S5, titulo: "Programa de gestión IPSIGE (manual interno no publicado)", articulos: "Tema 34, apartado 2", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 34 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué son las radiocomunicaciones?", "Las comunicaciones que usan ondas de radio (radioeléctricas), un tipo de onda electromagnética que no necesita medio para propagarse"],
        ["¿Cuáles son las cuatro propiedades de una onda?", "Frecuencia (Hz), longitud de onda (m), velocidad (m/s) y amplitud"],
        ["¿Qué relación hay entre velocidad, longitud de onda y frecuencia?", "v = λ × f; como la velocidad de las ondas electromagnéticas es constante, frecuencia y longitud de onda son inversamente proporcionales"],
        ["¿Qué rango de frecuencias abarcan las ondas de radio?", "De 3 kHz a 3.000 GHz (longitudes de onda de 100 km a 0,1 mm)"],
        ["¿Qué es la modulación?", "Modificar la onda portadora en función de la señal para que lleve información: en AM varía la amplitud y en FM la frecuencia"],
        ["¿Qué es la interferencia?", "El solapamiento de varias emisiones simultáneas en la misma frecuencia, que impide separarlas al recibirlas"],
        ["Diferencia entre simplex, dúplex y semidúplex", "Simplex: una frecuencia, solo uno emite a la vez. Dúplex: frecuencias distintas para emitir y recibir, ambos pueden hablar a la vez. Semidúplex: dos frecuencias a través de repetidor, aumenta el alcance pero no permite dos transmisiones simultáneas"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la velocidad de las ondas electromagnéticas en el vacío?", ["300.000.000 m/s", "340 m/s", "3.000 m/s"], "Tema 34."],
        ["media", "Si aumenta la frecuencia de una onda electromagnética, su longitud de onda…", ["Disminuye", "Aumenta", "No cambia"], "Son inversamente proporcionales."],
        ["media", "¿Cómo se llama el ajuste de la frecuencia de emisión o recepción?", ["Sintonización", "Modulación", "Interferencia"], "Tema 34."],
        ["media", "¿Qué modo de transmisión se usa con repetidores?", ["Semidúplex", "Simplex", "Ninguno"], "Tema 34."],
        ["dificil", "¿Cuál es la ventaja real del semidúplex sobre el simplex?", ["Mayor alcance gracias al repetidor", "Más conversaciones simultáneas", "Menor consumo"], "Tema 34."],
        ["media", "En FM, ¿qué propiedad de la onda representa la señal?", ["Las variaciones de frecuencia", "La amplitud", "La velocidad"], "Tema 34."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué son las redes de comunicaciones para emergencias?", "Sistemas alternativos a la telefonía convencional, diseñados para el intercambio de información, mando y control entre centros de coordinación e intervinientes"],
        ["¿Qué estándares principales se usan en redes de emergencia?", "TETRA, TETRAPOL, DMR (Digital Mobile Radio) y radio analógica"],
        ["¿Qué significa TETRA y qué características tiene?", "Terrestrial Trunked Radio: estándar abierto de radio digital para comunicaciones críticas; celular, de banda estrecha (25 kHz) e independiente de las infraestructuras públicas"],
        ["¿Qué es el SIRDEE?", "El Sistema de Radiocomunicaciones Digitales de Emergencia del Estado, basado en TETRAPOL (no abierto), usado por Policía Nacional, Guardia Civil y UME"],
        ["¿Desde cuándo tiene Zaragoza red TETRA y cómo se llama su infraestructura?", "Desde 2004; la infraestructura es NEBULA, del fabricante aragonés Teltronic"],
        ["¿Qué es el SCN?", "El nodo central de control de red (Switching Control Node), que da inteligencia a la red y gestiona usuarios y servicios"],
        ["Tipos de estaciones base de la red de Zaragoza", "SBS (fija, mayor cobertura, triple diversidad y controlador LSC para modo fallback), MBS (en mástil, una portadora ampliable a dos) y MCBS (multiportadora SDR, hasta 4 portadoras y 40 W, IP66)"],
        ["¿Cuántas estaciones base cubren el término municipal?", "15 estaciones base, que cubren todo el término y parte de las carreteras de acceso"],
      ],
      preguntas: [
        ["facil", "¿Qué estándar usa la red del SCIS y PC de Zaragoza?", ["TETRA", "TETRAPOL", "GSM"], "Tema 34."],
        ["media", "¿Qué ancho de banda tiene TETRA?", ["25 kHz (banda estrecha)", "20 MHz", "5 GHz"], "Por eso no está pensado para transmisión masiva de datos."],
        ["media", "¿Qué servicios principales ofrece TETRA?", ["Voz y datos cortos, incluida la localización de terminales", "Vídeo en alta definición", "Televisión"], "Tema 34."],
        ["media", "¿Qué hace el NMS?", ["Gestiona la red: flotas, terminales, comunicaciones y alarmas", "Fabrica terminales", "Cifra la voz"], "Tema 34."],
        ["dificil", "¿Qué protocolo incorpora la red de transporte en malla de Zaragoza?", ["RSTP (Rapid Spanning Tree Protocol)", "HTTP", "FTP"], "Tema 34."],
        ["media", "¿Desde qué año despliega el Gobierno de Aragón una red TETRA autonómica?", ["2021", "1995", "2030"], "Tema 34."],
        ["dificil", "¿Para qué sirve el controlador LSC de algunas estaciones SBS?", ["Para el modo fallback si falla la conexión con el nodo central", "Para cargar baterías", "Para grabar llamadas"], "Tema 34."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué terminales portátiles usa el SCIS y PC?", "El Sepura SC-20 en intervenciones y el Teltronic HTT-500 (antiguo) principalmente para prácticas"],
        ["Características destacadas del Sepura SC-20", "Audio de 2 W, alta potencia clase 3, tecnología háptica para usar con guantes, banda 380-430 MHz y batería de litio de 7,4 V y 1880 mAh"],
        ["¿Qué emisora móvil hace de DMO-Gateway y repetidor DMO?", "La Sepura SRG3900, que une la cobertura TMO con DMO en puntos ciegos como edificios y túneles"],
        ["¿Qué es el sistema CT-SkullMike?", "Un sistema intercraneal de Ceotronics con micrófono de contacto que recoge la voz desde el cráneo, usado con casco y máscara del ERA"],
        ["¿Para qué terminales se dimensiona la cobertura de la red?", "Para los portátiles, los más débiles en potencia y antena"],
      ],
      preguntas: [
        ["facil", "¿Qué terminal usan los bomberos en intervención?", ["Sepura SC-20", "HTT-500", "Un móvil particular"], "Tema 34."],
        ["media", "¿Qué tecnología del SC-20 facilita usarlo con guantes?", ["La háptica", "El Bluetooth", "La pantalla grande"], "Tema 34."],
        ["media", "¿En qué banda trabaja el SC-20?", ["380-430 MHz", "88-108 MHz", "2,4 GHz"], "Tema 34."],
        ["media", "¿Qué conexión une el CT-SkullMike al terminal portátil?", ["Tipo Nexus", "USB", "Wifi"], "El apunte la escribe «Nexux»."],
        ["dificil", "¿Qué grado de protección tiene el microaltavoz Ultra CSM de Sepura?", ["IP67", "IP20", "IP44"], "Tema 34."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué se gestiona desde el Centro de Comunicaciones?", "Todos los servicios del SCISyPC, llamadas telefónicas y de radio, megafonía, puertas de las naves de los parques, accesos y control semafórico de salidas de emergencia"],
        ["¿Cuándo se renovó el Centro de Comunicaciones?", "Durante 2021, inaugurado oficialmente a principios de 2022"],
        ["¿Qué puestos tiene la sala?", "4 puestos de operador de comunicaciones, 1 de Jefe de Sala y 1 de telefonista-recepcionista para llamadas no urgentes"],
        ["¿Qué es el PMA?", "El vehículo Puesto de Mando Avanzado y Comunicaciones, un centro de comunicaciones autónomo para grandes siniestros y apoyo a drones, UCAB o buceo"],
        ["¿Por qué lleva el PMA una emisora Motorola DM 4600?", "Para comunicar con bomberos de la DPZ o la sala del 112, que no tienen sistema TETRA"],
        ["¿Para qué sirve la carpa del PMA?", "Para instalar el puesto de mando en el exterior cuando haya que establecer un CECOP y/o CECOPAL"],
      ],
      preguntas: [
        ["facil", "¿Cuántos puestos de operador de comunicaciones hay en la sala?", ["4", "1", "12"], "Más un puesto de Jefe de Sala."],
        ["media", "¿Dónde están las CPU del Centro de Comunicaciones?", ["En una sala del sótano", "En cada parque", "En el PMA"], "Tema 34."],
        ["media", "¿Qué tamaño aproximado tiene el videowall?", ["3 × 1,6 m", "1 × 1 m", "10 × 5 m"], "Tema 34."],
        ["media", "¿Cuántos operadores pueden trabajar a la vez en el PMA?", ["Dos", "Seis", "Uno"], "Tema 34."],
        ["dificil", "¿Cuántos terminales portátiles SC-20 lleva el PMA?", ["6", "2", "20"], "Tema 34."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué es IPSIGE según el apunte de la Escuela?", "El programa de gestión de servicios, personal y vehículos que tienen todos los operadores del Centro de Comunicaciones"],
        ["¿Está publicado el manual de IPSIGE que cita el temario?", "No: es un documento interno del Servicio; no se ha localizado en ninguna fuente pública"],
        ["¿Dónde más se usa IPSIGE además del Centro de Comunicaciones?", "En los dos portátiles del PMA, conectados a la red municipal"],
      ],
      preguntas: [
        ["facil", "¿Para qué sirve IPSIGE?", ["Gestión de servicios, personal y vehículos", "Cifrar la radio", "Controlar semáforos"], "Tema 34."],
        ["media", "¿Corre IPSIGE en el mismo equipo que el sistema TETRA?", ["No, el TETRA está en CPU diferentes", "Sí, siempre", "IPSIGE no existe"], "Tema 34."],
        ["media", "¿Es público el manual de IPSIGE citado en el temario?", ["No, es un documento interno no publicado", "Sí, en el BOE", "Sí, en el BOA"], "Debe estudiarse en la documentación interna del Servicio."],
      ],
    },
  ],
  glosario: [
    [S1, "Portadora", "Onda básica que se modifica (modula) para que transporte la información."],
    [S1, "Repetidor", "Equipo que recibe una señal y la reemite amplificada en otra frecuencia para ampliar el alcance."],
    [S2, "TETRA", "Terrestrial Trunked Radio, estándar abierto de radio digital para comunicaciones críticas."],
    [S2, "Modo fallback", "Funcionamiento local de las estaciones base cuando se pierde la conexión con el nodo central."],
    [S3, "DMO / TMO", "Modo directo entre terminales sin red (DMO) y modo a través de la red troncal (TMO)."],
    [S4, "PMA", "Puesto de Mando Avanzado: centro de mando y comunicaciones desplazado al lugar del siniestro."],
    [S4, "CECOPAL", "Centro de Coordinación Operativa municipal en una emergencia de protección civil."],
  ],
  casos: [
    {
      slug: "caso-incendio-sotano-sin-cobertura",
      titulo: "Sin cobertura en un sótano",
      supuesto: "Una dotación interviene en un incendio en el tercer sótano de un aparcamiento. Los bomberos con ERA pierden cobertura de la red al bajar.",
      preguntas: [
        [S3, "media", "¿Qué equipo permite unir la red TMO con DMO en puntos ciegos?", ["La emisora SRG3900 como DMO-Gateway", "El HTT-500", "El videowall"], "Tema 34."],
        [S3, "media", "¿Cómo hablan los bomberos con la máscara del ERA puesta?", ["Con el sistema intercraneal CT-SkullMike", "Quitándose la máscara", "Por señas únicamente"], "Tema 34."],
        [S1, "media", "Si dos terminales emiten a la vez en la misma frecuencia en simplex…", ["Se produce interferencia", "Se oyen los dos", "Se amplifica"], "Tema 34."],
        [S2, "media", "¿Para qué tipo de terminal se diseña la cobertura de la red?", ["Para los portátiles", "Para los móviles de vehículo", "Para los fijos"], "Tema 34."],
        [S3, "facil", "¿Qué terminal lleva cada bombero en la intervención?", ["Sepura SC-20", "Motorola DM 4600", "Un satélite"], "Tema 34."],
        [S1, "media", "¿Qué modo amplía el alcance mediante repetidor?", ["Semidúplex", "Simplex directo", "Dúplex"], "Tema 34."],
        [S2, "media", "¿Qué tipo de servicio de datos permite TETRA?", ["Datos cortos, como la localización", "Vídeo masivo", "Descarga de películas"], "Tema 34."],
        [S4, "media", "¿Desde dónde se coordinan las comunicaciones de radio y teléfono del servicio?", ["Desde el Centro de Comunicaciones", "Desde el parque más cercano", "Desde el 112"], "Tema 34."],
        [S3, "dificil", "¿Qué función adicional configurable pueden tener los terminales para un bombero inmovilizado?", ["Man/down", "Radio FM", "Cámara"], "Tema 34."],
        [S5, "media", "¿Qué programa registra el servicio y los vehículos implicados?", ["IPSIGE", "CorelDRAW", "SIRDEE"], "Tema 34."],
      ],
    },
    {
      slug: "caso-gran-siniestro-pma",
      titulo: "Gran siniestro con despliegue del PMA",
      supuesto: "Un incendio industrial en un polígono junto al término municipal obliga a desplegar el PMA. Intervienen también bomberos de la DPZ y se activa el plan municipal.",
      preguntas: [
        [S4, "facil", "¿Qué vehículo actúa como centro de comunicaciones autónomo?", ["El PMA", "Una autobomba", "Una autoescala"], "Tema 34."],
        [S4, "media", "¿Cómo se comunica el PMA con los bomberos de la DPZ?", ["Con la emisora Motorola DM 4600, porque no tienen TETRA", "Con el SC-20", "No se puede"], "Tema 34."],
        [S4, "media", "¿Qué permite la carpa del PMA?", ["Instalar el puesto de mando fuera para un CECOP/CECOPAL", "Dormir", "Guardar herramientas"], "Tema 34."],
        [S4, "media", "¿Qué alimenta los equipos en caso de corte?", ["Un SAI", "Las baterías de los walkies", "Nada"], "Tema 34."],
        [S2, "media", "¿Cubre la red TETRA los polígonos de acceso donde actúa el Servicio?", ["Sí, parte de las carreteras y polígonos adyacentes", "No, solo el centro", "Solo el aeropuerto"], "Tema 34."],
        [S5, "media", "¿Con qué programa trabajan los portátiles del PMA?", ["IPSIGE", "Excel", "SIRDEE"], "Tema 34."],
        [S4, "media", "¿Qué otros medios de voz alternativos lleva el PMA?", ["Dos teléfonos vía satélite", "Una radio FM", "Un fax"], "Tema 34."],
        [S2, "dificil", "¿Qué red usarían la Guardia Civil o la UME?", ["SIRDEE (TETRAPOL)", "NEBULA", "DMR municipal"], "Tema 34."],
        [S4, "media", "¿Cuántas emisoras TETRA SRG3900 tiene el PMA?", ["2", "6", "0"], "Tema 34."],
        [S4, "dificil", "¿Qué unidades especializadas puede apoyar el PMA en búsquedas?", ["Drones, UCAB y buceo", "Solo autoescalas", "Ninguna"], "Tema 34."],
      ],
    },
    {
      slug: "caso-caida-nodo-central",
      titulo: "Fallo de conexión con el nodo central",
      supuesto: "Durante una tormenta, una estación base pierde el enlace con el nodo central de la red NEBULA mientras hay servicios en curso.",
      preguntas: [
        [S2, "media", "¿Qué elemento da inteligencia a la red TETRA?", ["El nodo central SCN", "El terminal", "El videowall"], "Tema 34."],
        [S2, "media", "¿Qué permite seguir funcionando localmente a ciertas SBS?", ["El controlador LSC en modo fallback", "El SAI del PMA", "Un fax"], "Tema 34."],
        [S2, "media", "¿Qué sistema recibe las alarmas de fallos de funcionamiento?", ["El NMS", "IPSIGE", "El SC-20"], "Tema 34."],
        [S2, "media", "¿Cómo se interconectan las estaciones base?", ["Por fibra óptica y radioenlaces en malla", "Por cable telefónico", "Por satélite"], "Tema 34."],
        [S2, "dificil", "¿Cómo se llama la transmisión de radioenlace punto a punto con visión directa?", ["LOS (Line Of Sight)", "DMO", "AM"], "Tema 34."],
        [S2, "media", "¿Qué estación base tiene hasta 4 portadoras con técnica SDR?", ["MCBS", "MBS", "SBS"], "Tema 34."],
        [S2, "media", "¿Qué ventaja tiene usar bandas más bajas que la telefonía móvil?", ["Se necesitan menos celdas", "Más ancho de banda", "Ninguna"], "Tema 34."],
        [S3, "media", "Sin red, ¿cómo pueden comunicarse dos terminales cercanos?", ["En modo directo DMO", "No pueden", "Por correo"], "Tema 34."],
        [S1, "media", "¿Necesitan las ondas de radio un medio para propagarse?", ["No, se propagan incluso en el vacío", "Sí, el agua", "Sí, cables"], "Tema 34."],
        [S2, "facil", "¿Quién fabrica la infraestructura NEBULA?", ["Teltronic, empresa aragonesa", "Motorola", "Sepura"], "Tema 34."],
      ],
    },
  ],
});
