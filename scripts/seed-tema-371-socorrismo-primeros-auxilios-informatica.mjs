/**
 * Crea tema-371 — Tema 44 de Policía Local: "Socorrismo y primeros auxilios
 * básicos: R.C.P. hemorragias, traumas y quemaduras. El ordenador: sistema
 * operativo y procesador de textos. Las redes informáticas. Internet e
 * Intranet. Redes sociales."
 *
 * Tema mixto: cada número de tema admite un solo canónico, y los temas ya
 * existentes cubren solo una parte (tema-327 SVB y tema-328 trauma, de
 * Bombero; tema-36 Informática básica). Fuentes:
 * - RCP: Tema 32 "Primeros auxilios" (V.2) de la Escuela de Bomberos del
 *   Ayuntamiento de Zaragoza (recomendaciones AHA 2020), leído en la sesión
 *   de Bombero y releído aquí (cadena de supervivencia, 30:2, al menos 5 cm,
 *   100-120 compresiones/min, comprobación en no más de 10 s, DEA).
 * - Trauma y hemorragias: Tema 33 de la misma Escuela (ITLS: secuencia
 *   C-A-B-C ante hemorragia importante, torniquete) y Manual IVASPE de
 *   noviembre de 2017, Módulo 2, Tema 12 "Urgencias sanitarias" (conducta
 *   PAS, control de hemorragias, torniquete, pérdidas internas por fractura,
 *   inmovilización).
 * - Quemaduras: Manual IVASPE, Módulo 2, Tema 12, apartado 6.1 (grados,
 *   regla de los 9 de Wallace, regla de la palma, norma general, fuego,
 *   químicas y eléctricas), leído íntegro.
 * - Informática: conocimiento técnico general sin norma que lo regule, con
 *   el mismo criterio y alcance que el canónico tema-36 (Informática
 *   básica); no se citan normas ni cifras que no estén verificadas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-371-socorrismo-primeros-auxilios-informatica.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const ESCUELA = "https://www.zaragoza.es/sede/portal/bomberos/temarios/";
const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const S1 = "pas-soporte-vital-rcp";
const S2 = "hemorragias-traumatismos";
const S3 = "quemaduras";
const S4 = "ordenador-sistema-operativo-procesador";
const S5 = "redes-internet-intranet-redes-sociales";

await sembrarTema({
  tema: {
    slug: "tema-371",
    titulo: "Socorrismo y primeros auxilios básicos e informática para el policía",
    descripcion: "Conducta PAS y cadena de supervivencia; soporte vital básico y RCP de alta calidad (AHA 2020) y uso del DEA; posición lateral de seguridad; hemorragias externas e internas, presión directa, vendaje compresivo y torniquete; traumatismos de extremidades, fracturas y luxaciones; quemaduras: grados, extensión (regla de los 9 y de la palma), actuación general y quemaduras por fuego, químicas y eléctricas. El ordenador: hardware y software, sistema operativo y procesador de textos; redes informáticas (LAN, WAN), Internet e Intranet; redes sociales y seguridad.",
    contenido: "La primera parte enseña lo que el agente debe hacer al llegar antes que la ambulancia: proteger, avisar y socorrer, hacer una RCP correcta y usar el desfibrilador, cortar una hemorragia (incluido el torniquete), inmovilizar una fractura y atender una quemadura sin cometer errores habituales. La segunda parte repasa lo básico del ordenador, las redes, la diferencia entre Internet e Intranet y el uso seguro de las redes sociales.",
    enlaces_boe: [
      { url: ESCUELA, titulo: "Temarios de la Escuela de Bomberos del Ayuntamiento de Zaragoza: Temas 32 y 33 (Primeros auxilios, AHA 2020 e ITLS)" },
      { url: IVASPE, titulo: "Manual IVASPE (nov. 2017), Módulo 2, Tema 12 'Urgencias sanitarias' (publicado en valencia.es)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conducta PAS, cadena de supervivencia, RCP y DEA", url: ESCUELA },
      { seccion: S2, titulo: "Hemorragias, torniquete y traumatismos de extremidades", url: ESCUELA },
      { seccion: S3, titulo: "Quemaduras: clasificación y actuación", url: IVASPE },
      { seccion: S4, titulo: "El ordenador: sistema operativo y procesador de textos", url: "" },
      { seccion: S5, titulo: "Redes informáticas, Internet, Intranet y redes sociales", url: "" },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 44 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Conducta PAS", "Proteger (a uno mismo y a los demás), Alertar (al 112) y Socorrer"],
        ["Teléfono europeo de emergencias", "112"],
        ["Cadena de supervivencia", "Reconocer y activar el sistema de emergencias, RCP de alta calidad precoz, desfibrilación rápida y cuidados avanzados posteriores"],
        ["Comprobar la respiración", "Observar el tórax si no respira o solo jadea o boquea, en no más de 10 segundos"],
        ["RCP de alta calidad en adulto", "Compresiones de al menos 5 cm de profundidad a 100-120 por minuto, permitiendo la expansión completa y minimizando interrupciones"],
        ["Relación compresión-ventilación", "30 compresiones y 2 ventilaciones por parte de un reanimador único"],
        ["Testigo sin entrenamiento", "Debe al menos realizar compresiones torácicas (solo manos) hasta que llegue el DEA o el servicio de emergencias"],
        ["Dos reanimadores", "Se turnan en las compresiones cada 5 ciclos de 30:2 (unos 2 minutos) para mantener la calidad"],
        ["DEA", "Se usa en cuanto esté disponible: encender, colocar los parches en el tórax desnudo, apartarse para el análisis y seguir sus indicaciones; tras la descarga, reanudar la RCP de inmediato"],
        ["Víctima inconsciente que respira", "Posición lateral de seguridad (PLS) y vigilancia"],
      ],
      preguntas: [
        ["facil", "¿Qué significan las siglas PAS?", ["Proteger, Alertar y Socorrer", "Parar, Avisar y Salir", "Prevenir, Atender y Sanar"], "Manual IVASPE, Módulo 2, Tema 12, 1.2."],
        ["media", "¿A qué frecuencia deben realizarse las compresiones torácicas en un adulto?", ["Entre 100 y 120 por minuto", "Entre 60 y 80 por minuto", "Más de 150 por minuto"], "Tema 32 de la Escuela de Bomberos (AHA 2020)."],
        ["media", "¿Qué profundidad mínima deben tener las compresiones en un adulto?", ["Al menos 5 cm", "2 cm", "10 cm"], "Tema 32 (AHA 2020)."],
        ["media", "¿Cuál es la relación compresión-ventilación de un reanimador único?", ["30:2", "15:1", "5:1"], "Tema 32 (AHA 2020)."],
        ["media", "¿Cuánto tiempo máximo debe emplearse en comprobar si la víctima respira?", ["10 segundos", "1 minuto", "30 segundos"], "Tema 32 (AHA 2020)."],
        ["media", "¿Qué hace un testigo sin formación en RCP ante una parada?", ["Al menos compresiones torácicas", "Nada hasta que llegue la ambulancia", "Solo ventilaciones"], "Tema 32 (AHA 2020)."],
        ["media", "Una víctima inconsciente que respira con normalidad se coloca en…", ["Posición lateral de seguridad", "Boca arriba con las piernas elevadas siempre", "Sentada"], "Manual IVASPE."],
        ["dificil", "¿Qué se hace inmediatamente después de que el DEA administre una descarga?", ["Reanudar la RCP empezando por las compresiones", "Esperar un minuto", "Retirar los parches"], "Tema 32 (AHA 2020)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Hemorragia importante en trauma (ITLS)", "La secuencia ABC pasa a ser C-A-B-C: la primera C es el control de hemorragias exanguinantes"],
        ["Control de hemorragia externa", "Primero presión directa sobre el punto sangrante; después vendaje compresivo; si no basta, torniquete"],
        ["Indicaciones del torniquete", "Hemorragia no controlada con presión ni vendaje, amputaciones con hemorragia moderada o severa, múltiples víctimas y entornos hostiles"],
        ["Cómo colocarlo", "En la zona más proximal de la extremidad, nunca sobre una articulación; bandas anchas (4-10 cm); un segundo torniquete justo por debajo si el primero no basta"],
        ["Tiempo y control", "El mínimo posible (idealmente no más de 2-4 horas); anotar la hora de colocación y no aflojarlo periódicamente"],
        ["Hemorragia arterial", "Salida pulsátil: se identifica en la valoración primaria y exige actuación inmediata"],
        ["Hemorragias internas por fractura", "Pueden ser muy importantes: fémur 1.000-2.000 mL; pelvis de 1.000 mL a masiva"],
        ["Prioridad", "La vida antes que la función, y la función antes que la estética"],
        ["Luxación", "Separación de las superficies articulares: deformidad, cambio de longitud y de eje, impotencia funcional, dolor e inflamación"],
        ["Inmovilizar una fractura", "Inmovilizar la articulación por encima y por debajo de la lesión"],
      ],
      preguntas: [
        ["media", "¿Cuál es el primer paso para controlar una hemorragia externa?", ["Presión directa sobre el punto sangrante", "Colocar un torniquete", "Elevar la pierna y esperar"], "Manual IVASPE, 4.5.3."],
        ["media", "¿Cuándo está indicado el torniquete en primera intervención?", ["Si la hemorragia no se controla con presión directa ni vendaje compresivo", "En cualquier herida", "Nunca"], "Manual IVASPE, 4.5.3."],
        ["media", "¿Dónde no debe colocarse nunca un torniquete?", ["Encima de una articulación", "En el muslo", "En el brazo"], "Manual IVASPE, 4.5.3."],
        ["media", "¿Qué dato es muy importante anotar al colocar un torniquete?", ["La hora de colocación", "El color de la venda", "El nombre del testigo"], "Manual IVASPE, 4.5.3."],
        ["dificil", "Según ITLS, ante una hemorragia importante la secuencia ABC se convierte en…", ["C-A-B-C", "A-B-C-D", "B-A-C"], "Tema 33 de la Escuela de Bomberos (ITLS)."],
        ["media", "¿Debe aflojarse cada cierto tiempo el torniquete para devolver el riego?", ["No", "Sí, cada 10 minutos", "Sí, cada hora"], "Manual IVASPE, 4.5.3."],
        ["media", "Para inmovilizar una fractura de una extremidad hay que inmovilizar…", ["La articulación por encima y por debajo", "Solo el punto de la fractura", "Todo el cuerpo siempre"], "Manual IVASPE."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Quemadura", "Destrucción de tejidos por un agente térmico, eléctrico, químico o radiactivo"],
        ["Primer grado", "Solo epidermis: enrojecimiento (eritema), dolor, sin ampollas"],
        ["Segundo grado", "Afecta a la dermis: ampollas (flictenas), dolorosa; la dérmica profunda tarda tres semanas o más en curar"],
        ["Tercer grado", "Subdérmica: indolora por destrucción de las terminaciones nerviosas, aspecto carbonáceo o blanco nacarado (escaras)"],
        ["Regla de los 9 (Wallace)", "Cabeza y cuello 9 %; cada extremidad superior 9 %; cada inferior 18 %; tórax y abdomen 18 %; espalda y nalgas 18 %; genitales 1 %"],
        ["Regla de la palma", "La palma de la mano del accidentado equivale al 1 % de la superficie corporal; en quemaduras mixtas no se suman las de primer grado"],
        ["Qué hacer", "Retirar anillos y prendas que compriman antes de que se inflame, enfriar solo la zona con agua fría (no helada), cubrir con apósito húmedo y trasladar"],
        ["Qué no hacer", "No romper ampollas, no despegar la ropa adherida, no usar hielo, pomadas, pasta de dientes ni antisépticos colorantes, no presionar"],
        ["Quemado por fuego", "Detenerle si corre y apagar las llamas cubriéndole con una manta (o arena o tierra), no con agua ni con extintor"],
        ["Químicas y eléctricas", "Químicas: lavar con abundante agua 20-30 minutos (álcalis, hasta una hora); eléctricas: siempre graves, cortar la corriente con seguridad antes de tocar a la víctima"],
      ],
      preguntas: [
        ["media", "¿Qué porcentaje de superficie corporal supone cada extremidad inferior según la regla de los 9?", ["18 %", "9 %", "27 %"], "Manual IVASPE, 6.1.1.2."],
        ["media", "¿A qué porcentaje equivale la palma de la mano del accidentado?", ["1 %", "5 %", "9 %"], "Manual IVASPE, 6.1.1.2."],
        ["media", "¿Qué quemadura es indolora por destruir las terminaciones nerviosas?", ["La de tercer grado", "La de primer grado", "La de segundo grado superficial"], "Manual IVASPE, 6.1.1.1."],
        ["media", "¿Deben romperse las ampollas de una quemadura?", ["No, protegen frente a la infección", "Sí, siempre", "Solo si son grandes"], "Manual IVASPE, 6.1.2."],
        ["media", "¿Con qué se enfría una quemadura térmica?", ["Con agua fría o suero fisiológico, no helada, solo sobre la zona quemada", "Con hielo", "Con pomada"], "Manual IVASPE, 6.1.2."],
        ["dificil", "¿Cómo se apagan las llamas de una persona que arde?", ["Cubriéndola con una manta o con arena o tierra, no con agua ni extintor", "Con un extintor", "Con agua a presión"], "Manual IVASPE, 6.1.5."],
        ["media", "¿Cuánto tiempo se lava, en general, una quemadura química por ácido?", ["Entre 20 y 30 minutos con abundante agua", "Un minuto", "No se lava"], "Manual IVASPE, 6.1.6."],
        ["media", "Las quemaduras eléctricas se consideran…", ["Siempre graves", "Siempre leves", "Leves si no hay ampollas"], "Manual IVASPE, 6.1.7."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Hardware y software", "Hardware: componentes físicos (placa, procesador, memoria, periféricos); software: programas y datos, la parte lógica"],
        ["CPU", "Unidad central de procesamiento: ejecuta las instrucciones de los programas"],
        ["RAM y ROM", "RAM: memoria de trabajo volátil que se borra al apagar; ROM: memoria de solo lectura no volátil"],
        ["Sistema operativo", "Software base que gestiona los recursos (memoria, procesos, archivos, dispositivos) y permite ejecutar las aplicaciones; p. ej. Windows, macOS, Linux, Android"],
        ["Archivos y carpetas", "El sistema operativo organiza la información en archivos (identificados por nombre y extensión) dentro de carpetas o directorios"],
        ["Procesador de textos", "Aplicación para crear, editar, dar formato e imprimir documentos de texto (p. ej. Microsoft Word, LibreOffice Writer)"],
        ["Funciones del procesador", "Formato de fuente y párrafo, estilos, tablas, imágenes, encabezados y pies de página, corrector ortográfico, combinar correspondencia y exportar a PDF"],
        ["Copia de seguridad", "Copia periódica de la información en otro soporte o en la nube para recuperarla ante pérdidas o ataques"],
      ],
      preguntas: [
        ["media", "¿Qué memoria pierde su contenido al apagar el equipo?", ["La RAM", "La ROM", "El disco duro"], "Conocimiento técnico general."],
        ["media", "¿Qué es el sistema operativo?", ["El software base que gestiona los recursos del equipo y permite ejecutar las aplicaciones", "Un procesador de textos", "Un periférico"], "Conocimiento técnico general."],
        ["media", "¿Cuál de estos es un procesador de textos?", ["LibreOffice Writer", "Linux", "Google Chrome"], "Conocimiento técnico general."],
        ["media", "¿Qué función del procesador de textos permite generar cartas personalizadas a partir de una lista de datos?", ["Combinar correspondencia", "Corrector ortográfico", "Encabezado"], "Conocimiento técnico general."],
        ["media", "¿Cuál de estos es un sistema operativo?", ["Windows", "Word", "Excel"], "Conocimiento técnico general."],
        ["media", "¿Para qué sirve una copia de seguridad?", ["Para recuperar la información si se pierde o se daña", "Para acelerar el ordenador", "Para imprimir"], "Conocimiento técnico general."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Red informática", "Conjunto de equipos conectados para compartir información y recursos (impresoras, archivos, conexión)"],
        ["LAN y WAN", "LAN: red de área local (un edificio u organización); WAN: red de área extensa que conecta redes lejanas; Internet es la mayor WAN"],
        ["Internet", "Red mundial descentralizada de redes que se comunican con el protocolo común TCP/IP"],
        ["Intranet", "Red privada de una organización que usa las tecnologías de Internet pero solo es accesible a sus miembros autorizados"],
        ["Extranet", "Parte de una intranet abierta de forma controlada a usuarios externos autorizados"],
        ["Servicios de Internet", "Web (HTTP/HTTPS), correo electrónico (SMTP, POP3, IMAP), transferencia de ficheros (FTP), mensajería y videollamada"],
        ["Redes sociales", "Plataformas en Internet para crear perfiles, publicar y compartir contenidos e interactuar con otros usuarios"],
        ["Uso profesional de redes sociales", "Cuidar la imagen institucional, no publicar datos personales ni de servicio y vigilar la intimidad y la propia imagen de terceros"],
        ["Phishing", "Fraude que suplanta a una entidad legítima mediante correos, mensajes o webs falsas para obtener datos o credenciales"],
        ["Contraseña segura", "Larga, que combine mayúsculas, minúsculas, números y símbolos y no se reutilice en distintos servicios"],
      ],
      preguntas: [
        ["media", "¿Qué es una intranet?", ["Una red privada de una organización que usa tecnologías de Internet y solo es accesible a sus miembros", "Otro nombre de Internet", "Una red social"], "Conocimiento técnico general."],
        ["media", "¿Qué tipo de red es la de un edificio de oficinas?", ["LAN", "WAN", "Internet"], "Conocimiento técnico general."],
        ["media", "¿Qué protocolo común usa Internet?", ["TCP/IP", "PDF", "USB"], "Conocimiento técnico general."],
        ["media", "¿Qué indica HTTPS en una dirección web?", ["Que la comunicación está cifrada", "Que la web es gratuita", "Que es una intranet"], "Conocimiento técnico general."],
        ["media", "Un correo que suplanta al banco para pedir las claves es un caso de…", ["Phishing", "Copia de seguridad", "Intranet"], "Conocimiento técnico general."],
        ["dificil", "¿Qué es una extranet?", ["La parte de una intranet abierta de forma controlada a usuarios externos autorizados", "Una red sin cables", "Un navegador"], "Conocimiento técnico general."],
      ],
    },
  ],
  glosario: [
    [S1, "DEA", "Desfibrilador externo automatizado: analiza el ritmo cardíaco y, si procede, administra una descarga."],
    [S1, "RCP", "Reanimación cardiopulmonar: compresiones torácicas y ventilaciones ante una parada cardíaca."],
    [S1, "PLS", "Posición lateral de seguridad para la víctima inconsciente que respira."],
    [S2, "Torniquete", "Dispositivo que comprime una extremidad para detener una hemorragia que no cede con presión directa."],
    [S2, "Shock hemorrágico", "Fallo circulatorio por pérdida importante de sangre."],
    [S3, "Flictena", "Ampolla típica de la quemadura de segundo grado."],
    [S3, "Escara", "Tejido muerto de aspecto carbonáceo o blanco nacarado de la quemadura de tercer grado."],
    [S4, "Sistema operativo", "Software base que gestiona los recursos del ordenador."],
    [S5, "Intranet", "Red privada de una organización basada en tecnologías de Internet."],
    [S5, "TCP/IP", "Conjunto de protocolos que permite la comunicación entre los equipos de Internet."],
  ],
  casos: [
    {
      slug: "caso-parada-cardiaca-calle",
      titulo: "Una parada cardiaca en la calle Alfonso",
      supuesto: "Una patrulla a pie encuentra a un hombre de unos 60 años desplomado en la calle Alfonso I. No responde y solo boquea. Un comercio cercano tiene un DEA. Hay mucha gente alrededor.",
      preguntas: [
        [S1, "media", "¿Qué debe hacer primero el agente?", ["Asegurar la escena y protegerse (P de PAS)", "Iniciar ventilaciones de inmediato", "Trasladarlo en el coche patrulla"], "Manual IVASPE, conducta PAS."],
        [S1, "media", "Si no responde y solo boquea, se considera que…", ["No respira con normalidad: hay que iniciar la RCP", "Respira bien", "Está dormido"], "Tema 32 (AHA 2020)."],
        [S1, "media", "¿A quién debe alertar?", ["Al 112 (o pedir a alguien que llame) y que traigan el DEA", "A un familiar", "A nadie"], "Tema 32 y Manual IVASPE."],
        [S1, "media", "¿Qué ritmo de compresiones debe mantener?", ["100-120 por minuto", "60 por minuto", "Lo más rápido posible"], "Tema 32."],
        [S1, "media", "¿Qué profundidad?", ["Al menos 5 cm", "1 cm", "Hasta notar el suelo"], "Tema 32."],
        [S1, "media", "Si hace ventilaciones, ¿qué relación usa?", ["30:2", "15:2 siempre", "10:1"], "Tema 32."],
        [S1, "media", "Cuando llega el DEA, ¿qué hace?", ["Encenderlo, colocar los parches en el tórax desnudo y seguir sus indicaciones", "Esperar a la ambulancia", "Guardarlo"], "Tema 32."],
        [S1, "media", "Mientras el DEA analiza el ritmo…", ["Nadie debe tocar a la víctima", "Se siguen las compresiones", "Se le da agua"], "Tema 32."],
        [S1, "dificil", "Con dos agentes, ¿cada cuánto deben turnarse en las compresiones?", ["Cada 5 ciclos de 30:2, unos 2 minutos", "Cada 10 minutos", "No deben turnarse"], "Tema 32."],
        [S1, "media", "Si recupera la respiración normal pero sigue inconsciente, ¿cómo se le coloca?", ["En posición lateral de seguridad", "Sentado", "De pie"], "Manual IVASPE."],
      ],
    },
    {
      slug: "caso-atropello-hemorragia-quemadura",
      titulo: "Un atropello y una quemadura en un incendio de cocina",
      supuesto: "Un motorista atropellado en el paseo de la Constitución tiene una herida en el muslo con sangre que sale a borbotones y una posible fractura de tibia. Esa misma tarde, en un piso del Actur, una vecina se ha quemado el brazo entero y la mano al prender una sartén; tiene ampollas.",
      preguntas: [
        [S2, "media", "¿Qué indica la sangre que sale a borbotones (pulsátil)?", ["Una hemorragia arterial que requiere actuación inmediata", "Una herida leve", "Una hemorragia interna"], "Manual IVASPE, 4.5.3."],
        [S2, "media", "¿Qué hace primero el agente con la herida del muslo?", ["Presión directa sobre el punto sangrante", "Dar agua al herido", "Colocar la pierna en alto y marcharse"], "Manual IVASPE, 4.5.3."],
        [S2, "media", "Si no cede con presión ni vendaje compresivo, ¿qué hace?", ["Colocar un torniquete proximal", "Nada", "Aflojar el vendaje"], "Manual IVASPE, 4.5.3."],
        [S2, "media", "¿Qué anota al colocarlo?", ["La hora", "La matrícula de la moto", "El nombre del herido"], "Manual IVASPE, 4.5.3."],
        [S2, "media", "¿Cómo inmoviliza la tibia?", ["Incluyendo la rodilla y el tobillo", "Solo la zona de la fractura", "No se inmoviliza"], "Manual IVASPE."],
        [S3, "media", "Por las ampollas, ¿de qué grado es la quemadura de la vecina?", ["Segundo grado", "Primer grado", "Tercer grado"], "Manual IVASPE, 6.1.1.1."],
        [S3, "media", "¿Qué superficie corporal supone una extremidad superior completa?", ["9 %", "18 %", "1 %"], "Manual IVASPE, 6.1.1.2."],
        [S3, "media", "¿Qué debe retirarle antes de que se inflame el brazo?", ["Anillos, reloj y pulseras", "La piel suelta", "Las ampollas"], "Manual IVASPE, 6.1.2."],
        [S3, "media", "¿Cómo se enfría la quemadura?", ["Con agua fría no helada, solo en la zona quemada", "Con hielo", "Con mantequilla"], "Manual IVASPE, 6.1.2."],
        [S3, "dificil", "Si se presenta en la mano, antes de vendar hay que…", ["Colocar gasa entre los dedos", "Apretar fuerte el vendaje", "Aplicar pasta de dientes"], "Manual IVASPE, 6.1.2."],
      ],
    },
    {
      slug: "caso-redes-sociales-intranet",
      titulo: "Un vídeo de una intervención en redes sociales",
      supuesto: "Un agente redacta el informe de una intervención con el procesador de textos de la intranet municipal. Esa noche, un compañero recibe un correo que dice ser del servicio informático y le pide su contraseña de la intranet. Además, circula en redes sociales un vídeo de la intervención grabado por un vecino.",
      preguntas: [
        [S5, "media", "¿Qué es la intranet municipal?", ["Una red privada del Ayuntamiento accesible solo a usuarios autorizados", "Una red social pública", "Internet"], "Conocimiento técnico general."],
        [S4, "media", "¿Qué tipo de programa usa para el informe?", ["Un procesador de textos", "Un sistema operativo", "Un navegador"], "Conocimiento técnico general."],
        [S4, "media", "¿Qué conviene hacer al terminar el informe para no perderlo?", ["Guardarlo y mantener copia de seguridad conforme a las normas del servicio", "No guardarlo", "Enviarlo a su correo personal"], "Conocimiento técnico general."],
        [S5, "media", "El correo que pide la contraseña es probablemente…", ["Un intento de phishing", "Un aviso oficial", "Una copia de seguridad"], "Conocimiento técnico general."],
        [S5, "media", "¿Qué debe hacer el compañero?", ["No facilitar la contraseña y comunicarlo al servicio informático", "Responder con la contraseña", "Reenviarlo a todos"], "Conocimiento técnico general."],
        [S5, "media", "¿Cómo debe ser una contraseña segura?", ["Larga, combinando letras, números y símbolos, sin reutilizarla", "Su fecha de nacimiento", "1234"], "Conocimiento técnico general."],
        [S5, "media", "¿Debe un agente publicar en sus redes datos de la intervención?", ["No: debe proteger los datos y la imagen de terceros y del servicio", "Sí, para informar", "Solo fotos"], "Conocimiento técnico general; véase también el Tema 21 (intimidad y propia imagen)."],
        [S5, "media", "¿Qué tipo de red es Internet?", ["Una red de área extensa (WAN) mundial", "Una LAN", "Una intranet"], "Conocimiento técnico general."],
        [S5, "dificil", "¿Qué diferencia una extranet de una intranet?", ["La extranet abre parte de la intranet a usuarios externos autorizados", "Ninguna", "La extranet no usa Internet"], "Conocimiento técnico general."],
        [S5, "media", "¿Qué indica el candado o 'https' en la intranet?", ["Que la conexión está cifrada", "Que no hay virus", "Que es gratuita"], "Conocimiento técnico general."],
      ],
    },
  ],
});
