/**
 * Crea tema-317 — Tema 22 de Bombero/a Conductor/a: "Ascensores. Tipos de
 * ascensores. Ascensor hidráulico. Ascensor electromecánico."
 *
 * Fuentes: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual para bomberos, nivel básico" (2016) de la
 * Diputación Provincial de Sevilla. No se ha localizado el manual completo
 * publicado, pero su capítulo de rescate en ascensores ("Rescate en
 * ascensores. Manual para bomberos. Nivel básico", págs. 72-89) está
 * reproducido como Anexo I de la Guía Táctica GTA/CPEIS/9 "Actuaciones en
 * rescate en ascensor" del Consorcio de Bomberos de la Provincia de Sevilla
 * (aprobada 16-06-2021), publicada en dipusevilla.es y leída íntegra. Para
 * la tipología y las partes del ascensor se completa con el capítulo
 * "Rescate en ascensores" del Manual 3 del CEIS Guadalajara (CC BY-NC-SA
 * 4.0), leído íntegro. No se formulan preguntas sobre la reglamentación de
 * ascensores que cita el manual del CEIS (RAEM de 1985 y su ITC MIE-AEM-1),
 * por haber sido sustituida posteriormente y no ser objeto del enunciado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-317-ascensores.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const SEVILLA = "https://www.dipusevilla.es/export/sites/diputacion-sevilla-corporativo/.galleries/DOCUMENTOS-descarga/Documentos-bomberos/GTA-9-GUIA-TACTICA-DE-ACTUACIONES-EN-RESCATE-EN-ASCENSOR-.pdf";
const CEIS = "https://ceis.antiun.net/docus/pdfsonline/m3/m3-riesgostecnologicos-v12-04-ascensores/m3-riesgostecnologicos-v12-04-ascensores.pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "tipos-ascensores";
const S2 = "ascensor-electromecanico";
const S3 = "ascensor-hidraulico";
const S4 = "partes-seguridad-ascensor";
const S5 = "rescate-ascensor-pautas";

await sembrarTema({
  tema: {
    slug: "tema-317",
    titulo: "Ascensores: tipos, ascensor electromecánico y ascensor hidráulico",
    descripcion: "Tipos de ascensores por funcionamiento (eléctricos o de adherencia, con y sin engranajes; hidráulicos de impulsión directa, lateral, diferencial 2:1 y doble) y por uso (de emergencia, panorámico, doble cabina, inclinado, montacargas); partes (cuarto de máquinas, hueco, foso, contrapeso, limitador de velocidad y paracaídas, faldón); maniobras de rescate según el tipo, con y sin movimiento de cabina.",
    contenido: "Sigue el capítulo de rescate en ascensores del Manual para bomberos de la Diputación de Sevilla (recomendado por la Escuela de Bomberos de Zaragoza y reproducido en su Guía Táctica GTA/CPEIS/9) y el manual del CEIS Guadalajara: cómo funciona un ascensor eléctrico con contrapeso frente a uno hidráulico con pistón, qué elementos de seguridad tienen y por qué el rescate se hace bajando la cabina en uno y subiéndola o bajándola según la carga en el otro.",
    enlaces_boe: [
      { url: SEVILLA, titulo: "Consorcio de Bomberos de Sevilla — GTA/CPEIS/9 Rescate en ascensor (Anexo I: Manual para bomberos, nivel básico)" },
      { url: CEIS, titulo: "CEIS Guadalajara — Manual 3, Parte 4: Rescate en ascensores (caracterización)" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 22 al manual de la Diputación de Sevilla)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Tipos de ascensores por funcionamiento y por uso", articulos: "CEIS M3-P4, apartado 1", url: CEIS },
      { seccion: S2, titulo: "Ascensor electromecánico (de adherencia)", articulos: "CEIS M3-P4, 1.1.1 y 2; Sevilla, rescate b.2-b.3", url: CEIS },
      { seccion: S3, titulo: "Ascensor hidráulico", articulos: "CEIS M3-P4, 1.1.2; Sevilla, rescate b.1", url: CEIS },
      { seccion: S4, titulo: "Partes del ascensor y elementos de seguridad y emergencia", articulos: "CEIS M3-P4, apartado 2", url: CEIS },
      { seccion: S5, titulo: "Pautas de rescate sin y con movimiento de cabina", articulos: "Sevilla GTA/CPEIS/9, Anexo I", url: SEVILLA },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 22 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es un ascensor?", "Un sistema de movilidad vertical con cabina que se desplaza por guías, con inclinación sobre la horizontal nunca superior a 15° (salvo el inclinado)"],
        ["Tipos de ascensor por su funcionamiento", "Eléctricos o de adherencia (con o sin engranajes) e hidráulicos"],
        ["Ascensor de emergencia o de bomberos: cuándo es obligatorio", "En edificios con altura de evacuación superior a 28 m (15 m en uso hospitalario)"],
        ["Características mínimas del ascensor de emergencia", "630 kg de carga, cabina de 1,40 m², paso de 0,80 m, doble alimentación (la segunda con al menos 1 h), recorrido completo en un minuto o menos"],
        ["Otros tipos por uso", "Panorámico, doble cabina, inclinado, unifamiliar, para personas con discapacidad, industrial y montacargas"],
        ["¿A quién se delega el rescate en ascensores?", "Al ascensorista, a los responsables formados del ascensor y a los bomberos instruidos"],
      ],
      preguntas: [
        ["facil", "¿Qué dos grandes tipos de ascensor hay por funcionamiento?", ["Eléctricos (de adherencia) e hidráulicos", "Neumáticos y solares", "De vapor y de cuerda"], "CEIS M3-P4."],
        ["media", "¿Cuál es la carga mínima de un ascensor de emergencia?", ["630 kg", "300 kg", "1.000 kg"], "CEIS M3-P4."],
        ["media", "¿Con qué causa se relacionan la mayoría de accidentes en ascensores?", ["Caídas por el hueco al manipular puertas con la llave de emergencia", "Roturas de cables", "Incendios"], "CEIS M3-P4."],
        ["media", "¿Cómo funciona el ascensor de doble cabina?", ["Dos cabinas superpuestas: la inferior para pisos impares y la superior para pares", "Dos cabinas en paralelo", "Una cabina con dos puertas"], "CEIS M3-P4."],
        ["dificil", "¿Por encima de qué altura de evacuación es obligatorio el ascensor de emergencia en uso hospitalario?", ["15 m", "28 m", "50 m"], "CEIS M3-P4."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Principio del ascensor eléctrico", "La adherencia: los cables, anclados a cabina y contrapeso, se aprietan contra las gargantas de la polea motriz y la mueven sin deslizar"],
        ["Ascensor eléctrico con engranajes", "Motor de poca potencia con reductor de tornillo sin fin; velocidad lenta (0,1-1,75 m/s); montacargas y pasajeros"],
        ["Ascensor eléctrico sin engranajes", "Motor conectado directamente a una polea de gran diámetro; 2-10 m/s; edificios de gran altura"],
        ["¿Cuánto pesa el contrapeso?", "Según el CEIS, el peso de la cabina más un 45 % del mismo; en la práctica, el equilibrio cabina-contrapeso se da con la cabina a media carga (manual de Sevilla)"],
        ["¿Hacia dónde se mueve más fácil la cabina en el rescate?", "Depende de la carga: con poca gente pesa menos que el contrapeso y es más fácil subirla"],
        ["Rescate manual en electromecánico con cuarto de máquinas", "Abrir el freno progresivamente sujetando el volante de inercia y mover la cabina en el sentido que menos cueste"],
        ["Ascensor electromecánico sin cuarto de máquinas", "El armario de maniobra suele estar junto a la puerta de la última planta; el rescate abre el freno con baterías o con la botonera de inspección"],
      ],
      preguntas: [
        ["facil", "¿Qué elemento reduce la potencia que necesita el motor?", ["El contrapeso", "El foso", "El faldón"], "CEIS M3-P4."],
        ["media", "Cabina de 300 kg de carga máxima con una persona de 100 kg: ¿qué es más fácil?", ["Subirla", "Bajarla", "Igual"], "Sevilla: equilibrio a media carga."],
        ["media", "¿Qué velocidad alcanzan los ascensores eléctricos sin engranajes?", ["Entre 2 y 10 m/s", "Hasta 0,5 m/s", "Más de 50 m/s"], "CEIS M3-P4."],
        ["media", "Si al girar el volante no se mueve la polea, ¿qué puede indicar?", ["Rotura del reductor: avisar a la mantenedora", "Que todo va bien", "Que falta aceite al pistón"], "Sevilla GTA-9."],
        ["dificil", "¿Qué es la 'maniobra por compensación'?", ["El movimiento de la cabina al abrir el freno según el reparto de cargas cabina/contrapeso", "Llenar el pistón de aceite", "Cambiar las poleas"], "Sevilla GTA-9."],
        ["media", "¿Por qué no hay que acelerar el volante de inercia?", ["Porque podría acuñarse el ascensor", "Porque se rompe la cabina", "Porque se apaga la luz"], "Sevilla GTA-9."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Principio del ascensor hidráulico", "Una bomba impulsa un fluido a presión a un pistón que mueve la cabina; velocidad baja (0,1-1,75 m/s)"],
        ["¿Dónde se usan los hidráulicos?", "Donde importa controlar el ruido o hay problemas de espacio"],
        ["Tipos de ascensor hidráulico", "Impulsión directa 1:1 (foso profundo), directa lateral, diferencial o indirecta 2:1 (polea y cables, sin foso profundo) y doble impulsión (montacargas)"],
        ["¿Qué significa tracción diferencial 2:1?", "Por cada centímetro del pistón la cabina recorre dos"],
        ["¿Dónde está el cuarto de máquinas del hidráulico?", "Normalmente en el nivel inferior, y puede estar hasta a 15 m del hueco"],
        ["Sentido habitual del rescate en el hidráulico", "Descendente, pulsando el botón rojo (válvula de retorno) del bloque de válvulas"],
        ["¿Qué hacer si la cabina hidráulica no baja?", "Puede haber actuado la válvula paracaídas o el acuñamiento: subirla unos 10 cm con la bomba manual y volver a bajar"],
      ],
      preguntas: [
        ["facil", "¿Qué mueve la cabina en un ascensor hidráulico?", ["Un pistón accionado por fluido a presión", "Cables y contrapeso por adherencia", "Un motor lineal magnético"], "CEIS M3-P4."],
        ["media", "¿Qué tipo de hidráulico necesita un foso profundo?", ["El de impulsión directa 1:1", "El diferencial 2:1", "Ninguno"], "CEIS M3-P4."],
        ["media", "¿Qué se pulsa para bajar la cabina hidráulica en el rescate?", ["El pulsador rojo de la válvula de retorno", "El botón de alarma", "El pulsador de bomberos"], "Sevilla GTA-9."],
        ["media", "¿Qué riesgo tiene bajar el pistón de un 2:1 con la cabina acuñada?", ["Que se aflojen los cables y se enreden, quedando la cabina sobre el paracaídas", "Ninguno", "Que suba la cabina"], "Sevilla GTA-9."],
        ["dificil", "¿Qué sistema puede llevar el cuadro del hidráulico para cortes de luz?", ["Baterías que llevan la cabina a la planta baja o a la inferior", "Un generador diésel", "Un volante manual"], "Sevilla GTA-9."],
        ["media", "¿Qué velocidad tienen los hidráulicos?", ["Baja, entre 0,1 y 1,75 m/s", "Más de 5 m/s", "10 m/s"], "CEIS M3-P4."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Partes comunes de un ascensor", "Cuarto de máquinas, recinto o hueco y foso"],
        ["¿Qué contiene el cuarto de máquinas de un eléctrico?", "Motor-reductor, polea motriz, volante, freno, limitador de velocidad, cuadro de maniobras (230-400 V) y cuadros de distribución"],
        ["¿Qué hace el limitador de velocidad?", "Si la cabina excede una velocidad, acciona el paracaídas (acuñamiento) mediante un cable independiente y corta el motor"],
        ["¿Qué es el faldón de cabina?", "Chapa bajo la puerta de cabina que cubre el hueco cuando la cabina queda entre pisos; 750 mm (fijo o telescópico)"],
        ["¿Qué espacio libre debe quedar en el foso?", "Al menos medio metro con los amortiguadores totalmente comprimidos"],
        ["¿Qué hace el pulsador de bomberos?", "Lleva el ascensor a la planta de acceso, lo deja con la puerta abierta y solo obedece llamadas desde la cabina"],
        ["¿Cómo funcionan los mecanismos de seguridad?", "Conectados en serie: si se abre uno (p. ej. una puerta de planta) el ascensor se para"],
      ],
      preguntas: [
        ["facil", "¿Cómo se llama la parte del hueco por debajo de la última parada?", ["Foso", "Faldón", "Volante"], "CEIS M3-P4."],
        ["media", "¿Qué tensión puede haber en el cuadro de maniobras?", ["Entre 230 y 400 V", "12 V", "20.000 V"], "CEIS M3-P4."],
        ["media", "¿Qué longitud total debe tener el faldón?", ["750 mm", "75 mm", "2 m"], "CEIS M3-P4."],
        ["media", "Desde 1999, ¿qué es obligatorio en cabina?", ["Comunicación con el exterior (teleasistencia 24 h)", "Aire acondicionado", "Un extintor"], "CEIS M3-P4."],
        ["dificil", "Si se corta el automático de fuerza, ¿qué debe seguir funcionando?", ["El alumbrado de cabina, hueco y cuarto", "El motor", "La puerta automática"], "CEIS M3-P4."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Equipo básico de rescate en ascensor", "Casco, guantes, calzado dieléctrico, anticaídas, llave de desenclavamiento (triángulo), linternas, comunicaciones, escalera pequeña y herramientas"],
        ["Primera medida técnica en el cuarto de máquinas", "Desconectar el circuito de fuerza (aunque haya corte general) dejando el alumbrado de cabina, y comprobar ausencia de tensión"],
        ["¿Quién es responsable de una puerta de planta abierta?", "Quien la abre: nunca debe abandonarla sin cerrarla y bloquearla"],
        ["Cabina pasada de piso: cuándo es segura sin moverla", "Si entre la parte inferior del faldón y la pisadera de planta no hay más de 30 cm"],
        ["Cabina bajo nivel de piso: cuándo es segura sin moverla", "Si entre el dintel de la puerta de cabina y la pisadera de planta hay más de 80 cm"],
        ["Primer intento si hay que mover la cabina", "El reseteo: reconectar el circuito de fuerza con las puertas cerradas para que haga un viaje a planta baja"],
        ["¿Cómo se deja el ascensor al terminar?", "Inoperativo, con el circuito de fuerza desconectado, puertas cerradas y aviso a la propiedad y la mantenedora"],
      ],
      preguntas: [
        ["facil", "¿Qué llave abre normalmente las puertas de planta?", ["La llave de triángulo", "Una llave inglesa", "La llave de contacto"], "Sevilla GTA-9."],
        ["media", "¿Por qué se desconecta el circuito de fuerza aunque no haya luz?", ["Para evitar movimientos inesperados de la cabina", "Para ahorrar energía", "No se desconecta"], "Sevilla GTA-9."],
        ["media", "¿Qué se pide a los pasajeros antes de mover la cabina?", ["Que cierren la puerta de cabina y se coloquen al fondo", "Que salten", "Que abran la puerta"], "Sevilla GTA-9."],
        ["media", "¿En cuánto tiempo se da el informe flash al CECOP según la GTA?", ["En menos de 15 minutos tras la llegada", "En 2 horas", "Al día siguiente"], "Sevilla GTA-9."],
        ["dificil", "¿Dónde puede estar la llave del cuarto de máquinas si no la tiene nadie?", ["Sobre la guía superior de la puerta de planta más cercana al cuarto", "En la cabina", "En el foso"], "Sevilla GTA-9."],
        ["media", "¿Cómo se comporta el rescatador con los atrapados?", ["Con calma, comunicación continua y explicando ruidos y movimientos", "Gritando órdenes", "Sin hablarles"], "Sevilla GTA-9."],
      ],
    },
  ],
  glosario: [
    [S1, "Ascensor de emergencia", "Ascensor de uso prioritario para bomberos, con doble alimentación eléctrica, en edificios altos."],
    [S2, "Adherencia", "Rozamiento entre los cables y la polea motriz que permite mover la cabina sin deslizamiento."],
    [S2, "Contrapeso", "Masa que equilibra la cabina para reducir la potencia del motor; equilibrio a media carga."],
    [S3, "Tracción diferencial 2:1", "Sistema hidráulico en que la cabina recorre el doble que el pistón gracias a una polea y cables."],
    [S4, "Limitador de velocidad", "Dispositivo que acciona el paracaídas y para el motor si la cabina supera una velocidad."],
    [S4, "Paracaídas (acuñamiento)", "Sistema de cuñas que bloquea la cabina o el contrapeso contra las guías."],
    [S4, "Faldón", "Chapa bajo la puerta de cabina que cubre el hueco cuando la cabina queda entre plantas."],
    [S5, "Llave de triángulo", "Útil de desenclavamiento de las puertas de planta del ascensor."],
  ],
  casos: [
    {
      slug: "caso-hidraulico-entre-plantas",
      titulo: "Ascensor hidráulico parado entre plantas",
      supuesto: "Dos personas mayores están atrapadas en un ascensor hidráulico parado entre la planta 2 y la 3 de un edificio de cuatro plantas. El cuarto de máquinas está en el bajo, algo alejado del hueco.",
      preguntas: [
        [S5, "facil", "¿Qué se hace primero en el cuarto de máquinas?", ["Desconectar el circuito de fuerza y comprobar ausencia de tensión", "Pulsar todos los botones", "Abrir el pistón"], "Sevilla GTA-9."],
        [S3, "media", "¿Dónde suele estar el cuarto de máquinas de un hidráulico?", ["En el nivel inferior, hasta a 15 m del hueco", "En la azotea", "En la cabina"], "Sevilla GTA-9."],
        [S5, "media", "¿Qué maniobra común se intenta antes de la manual?", ["El reseteo reconectando la fuerza con puertas cerradas", "Romper la puerta", "Cortar los cables"], "Sevilla GTA-9."],
        [S3, "media", "Si el reseteo falla, ¿en qué sentido se mueve la cabina?", ["Hacia abajo, con el pulsador rojo de la válvula de retorno", "Hacia arriba siempre", "No se mueve"], "Sevilla GTA-9."],
        [S3, "media", "Si la cabina no baja, ¿qué puede haber ocurrido?", ["Que haya actuado la válvula paracaídas o el acuñamiento", "Que falte gasolina", "Nada"], "Sevilla GTA-9."],
        [S3, "media", "¿Qué se hace entonces?", ["Subir unos 10 cm con la bomba manual y volver a bajar", "Forzar la bajada", "Dejarlos dentro"], "Sevilla GTA-9."],
        [S3, "dificil", "Si el ascensor es 2:1, ¿qué precaución especial hay?", ["Que no se aflojen y enreden los cables al bajar con la cabina acuñada", "Ninguna", "Que no se moje"], "Sevilla GTA-9."],
        [S5, "media", "Al llegar a planta, ¿qué se vigila al sacar a las personas?", ["El posible escalón entre pisaderas", "La hora", "El color de la cabina"], "Sevilla GTA-9."],
        [S5, "media", "¿Cómo se deja el ascensor?", ["Inoperativo y con aviso a la mantenedora", "Funcionando", "Con la puerta abierta"], "Sevilla GTA-9."],
        [S1, "media", "¿Por qué se instalan ascensores hidráulicos?", ["Por control de ruido o falta de espacio", "Porque son los más rápidos", "Por ser obligatorios en rascacielos"], "CEIS M3-P4."],
      ],
    },
    {
      slug: "caso-electromecanico-una-persona",
      titulo: "Una persona atrapada en un ascensor eléctrico",
      supuesto: "Una sola persona está atrapada en un ascensor electromecánico de 300 kg de carga máxima, con cuarto de máquinas en la azotea. La cabina está a mitad de recorrido entre dos plantas.",
      preguntas: [
        [S2, "facil", "¿Qué principio mueve este ascensor?", ["Adherencia de los cables en la polea motriz", "Un pistón hidráulico", "Un tornillo vertical"], "CEIS M3-P4."],
        [S2, "media", "¿Qué será más fácil, subir o bajar la cabina?", ["Subirla, porque con poca carga el contrapeso pesa más", "Bajarla", "Igual"], "Sevilla GTA-9."],
        [S2, "media", "¿Cómo se mueve la cabina en el rescate manual?", ["Abriendo el freno progresivamente y sujetando el volante", "Empujando la cabina", "Con el pulsador rojo"], "Sevilla GTA-9."],
        [S2, "media", "Si los cables patinan en la polea y no se mueve, ¿qué indica?", ["Acuñamiento de cabina o contrapeso", "Que todo va bien", "Falta de aceite"], "Sevilla GTA-9."],
        [S2, "media", "Si la cabina está acuñada en bajada, ¿qué se intenta?", ["Subirla unos centímetros para soltar las cuñas", "Bajarla con más fuerza", "Nada"], "Sevilla GTA-9."],
        [S4, "media", "¿Qué dispositivo acciona el paracaídas por exceso de velocidad?", ["El limitador de velocidad", "El faldón", "El foso"], "CEIS M3-P4."],
        [S2, "media", "¿Cómo se sabe que la cabina está a nivel de planta desde el cuarto?", ["Por marcas en los cables o indicadores del cuadro", "Por el olor", "No se puede"], "Sevilla GTA-9."],
        [S5, "media", "¿Qué hace el jefe de intervención mientras tanto?", ["Está en la planta del rescate comunicándose con la persona", "Espera en el camión", "Se va"], "Sevilla GTA-9."],
        [S2, "dificil", "¿Qué ocurre si se acelera el volante de inercia?", ["Puede acuñarse el ascensor", "Se apaga la luz", "Nada"], "Sevilla GTA-9."],
        [S4, "media", "¿Qué tensión hay en el cuadro de maniobras que hay que respetar?", ["230-400 V", "5 V", "Ninguna"], "CEIS M3-P4."],
      ],
    },
    {
      slug: "caso-cabina-pasada-faldon",
      titulo: "Cabina pasada de piso con faldón retráctil",
      supuesto: "En un edificio nuevo con ascensor sin cuarto de máquinas, la cabina se ha detenido algo por encima de la planta 1. Hay un curioso que quiere ayudar a abrir la puerta.",
      preguntas: [
        [S5, "facil", "¿Qué se hace con el curioso?", ["Mantenerlo alejado de la puerta del hueco", "Dejarle abrir", "Pedirle la llave"], "Sevilla GTA-9."],
        [S5, "media", "¿Cuándo puede sacarse a la gente sin mover la cabina?", ["Si entre faldón y pisadera no hay más de 30 cm", "Siempre", "Nunca"], "Sevilla GTA-9."],
        [S4, "media", "Si el faldón es retráctil, ¿qué se hace antes?", ["Desplegarlo con la llave de triángulo", "Arrancarlo", "Ignorarlo"], "Sevilla GTA-9."],
        [S4, "media", "¿Qué precaución hay con algunos faldones?", ["Pueden no soportar el peso de una persona", "Son eléctricos", "Queman"], "Sevilla GTA-9."],
        [S2, "media", "¿Dónde suele estar el armario de maniobra sin cuarto de máquinas?", ["Junto a la puerta de la última planta", "En el foso siempre", "En la cabina"], "Sevilla GTA-9."],
        [S2, "media", "Si las baterías no mueven la cabina, ¿qué alternativa hay?", ["La botonera de inspección del techo de cabina", "Empujar la cabina", "Cortar cables"], "Sevilla GTA-9."],
        [S5, "media", "¿Qué hace el bombero que abre una puerta de planta al terminar?", ["Cerrarla y bloquearla", "Dejarla abierta", "Desmontarla"], "Sevilla GTA-9."],
        [S4, "media", "¿Qué hace el alumbrado de emergencia de cabina?", ["Funciona si falla el alumbrado normal", "Abre la puerta", "Mueve la cabina"], "CEIS M3-P4."],
        [S2, "dificil", "En maniobra por compensación con cargas equilibradas, ¿cómo se logra el movimiento?", ["Aportando peso sobre el techo de la cabina", "Abriendo la puerta", "No se puede"], "Sevilla GTA-9."],
        [S5, "media", "¿Por qué se corta selectivamente la fuerza y no el alumbrado de cabina?", ["Para no dejar a oscuras a los atrapados", "Para ahorrar", "Por error"], "Sevilla GTA-9."],
      ],
    },
  ],
});
