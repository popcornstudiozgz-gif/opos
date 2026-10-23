/**
 * Crea tema-405 — Tema 33 de Administrativo DGA (tema 28 del programa de
 * materias específicas): "Informática básica: conceptos fundamentales sobre
 * el hardware y el software. Sistemas de almacenamiento de datos. Sistemas
 * operativos. Nociones básicas de seguridad informática."
 *
 * No se reutiliza tema-36 (Informática básica de Auxiliar DGA) porque ya
 * está vinculado a esta oposición como Tema 34 (recortado a Internet y
 * navegadores) y un canónico solo puede vincularse una vez por oposición.
 *
 * Fuentes:
 * - Contenido técnico consolidado sin ley única que lo regule (hardware,
 *   software, almacenamiento, sistemas operativos): se trata como
 *   conocimiento técnico de la materia, sin cifras de mercado ni versiones
 *   comerciales que puedan quedar desfasadas.
 * - Seguridad informática en la Administración: Real Decreto 311/2022, del
 *   Esquema Nacional de Seguridad (BOE-A-2022-7191), leído en la API del
 *   BOE: arts. 1, 2, 5, 12, 40 y anexo I (categorías BÁSICA, MEDIA y ALTA).
 * - Art. 156.2 de la Ley 40/2015 (BOE-A-2015-10566), citado por el art. 1
 *   del ENS como su base legal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-405-informatica-basica-hardware-software-seguridad.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const ENS = "https://www.boe.es/buscar/act.php?id=BOE-A-2022-7191";
const S1 = "conceptos-informatica-datos";
const S2 = "hardware-componentes";
const S3 = "software-tipos-licencias";
const S4 = "almacenamiento-datos-copias";
const S5 = "sistemas-operativos";
const S6 = "seguridad-informatica-ens";

await sembrarTema({
  tema: {
    slug: "tema-405",
    titulo: "Informática básica: hardware y software, sistemas de almacenamiento, sistemas operativos y nociones de seguridad informática",
    descripcion: "Conceptos fundamentales: información y datos, sistema binario, bit y byte, unidades de medida. Hardware: unidad central de proceso, memorias (RAM, ROM, caché), placa base, periféricos de entrada, salida y mixtos, puertos y conexiones. Software: de sistema, de aplicación y de programación; licencias (propietario, libre, de código abierto, freeware, shareware). Almacenamiento: magnético, óptico y de estado sólido; almacenamiento en red y en la nube; copias de seguridad. Sistemas operativos: funciones, tipos, interfaz, sistemas de archivos y gestión de usuarios. Seguridad informática: amenazas (malware, ransomware, phishing), medidas básicas (contraseñas, doble factor, actualizaciones, copias) y el Esquema Nacional de Seguridad (RD 311/2022): principios básicos, dimensiones, requisitos mínimos y categorías de los sistemas.",
    contenido: "Lo básico del ordenador de trabajo: qué es cada pieza (procesador, memoria, disco), qué programas hay y con qué licencias, dónde se guardan los datos y cómo hacer copias, qué hace el sistema operativo y cómo protegerse de virus, ransomware y correos fraudulentos, con las reglas del Esquema Nacional de Seguridad que obliga a todas las Administraciones.",
    enlaces_boe: [
      { url: ENS, titulo: "Real Decreto 311/2022, de 3 de mayo, por el que se regula el Esquema Nacional de Seguridad (BOE-A-2022-7191)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566", titulo: "Ley 40/2015, de Régimen Jurídico del Sector Público, art. 156 (BOE-A-2015-10566)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos fundamentales: datos, sistema binario y unidades", articulos: "Conocimiento técnico", url: "" },
      { seccion: S2, titulo: "El hardware: componentes y periféricos", articulos: "Conocimiento técnico", url: "" },
      { seccion: S3, titulo: "El software: tipos y licencias", articulos: "Conocimiento técnico", url: "" },
      { seccion: S4, titulo: "Sistemas de almacenamiento de datos y copias de seguridad", articulos: "Conocimiento técnico", url: "" },
      { seccion: S5, titulo: "Sistemas operativos", articulos: "Conocimiento técnico", url: "" },
      { seccion: S6, titulo: "Seguridad informática y Esquema Nacional de Seguridad", articulos: "arts. 1, 5, 12, 40 y anexo I RD 311/2022", url: `${ENS}#a5` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueInformatica, numero: 33 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Informática", "Ciencia del tratamiento automático de la información mediante ordenadores"],
        ["Hardware y software", "Hardware: parte física del equipo; software: programas y datos que lo hacen funcionar"],
        ["Sistema binario", "Representación con dos dígitos (0 y 1), base del funcionamiento de los ordenadores"],
        ["Bit", "Unidad mínima de información: un dígito binario (0 o 1)"],
        ["Byte", "Conjunto de 8 bits; permite representar 256 valores distintos, por ejemplo un carácter"],
        ["Múltiplos del byte", "Kilobyte, megabyte, gigabyte, terabyte, petabyte; en el uso informático tradicional cada uno equivale a 1.024 del anterior (en el Sistema Internacional, a 1.000)"],
        ["Datos e información", "Los datos son hechos o valores en bruto; la información es el resultado de procesarlos y darles significado"],
      ],
      preguntas: [
        ["facil", "Un byte está formado por:", ["8 bits", "4 bits", "16 bits", "1.024 bits"], "Conocimiento técnico."],
        ["media", "La unidad mínima de información en informática es:", ["El bit", "El byte", "El kilobyte", "El píxel"], "Conocimiento técnico."],
        ["media", "Con un byte pueden representarse:", ["256 valores distintos", "8 valores", "1.024 valores", "100 valores"], "2^8 = 256."],
        ["media", "Ordenadas de menor a mayor, las unidades son:", ["Kilobyte, megabyte, gigabyte, terabyte", "Megabyte, kilobyte, terabyte, gigabyte", "Gigabyte, terabyte, kilobyte, megabyte", "Terabyte, gigabyte, megabyte, kilobyte"], "Conocimiento técnico."],
        ["media", "La parte física de un ordenador se denomina:", ["Hardware", "Software", "Firmware", "Freeware"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["CPU o procesador", "Unidad central de proceso: ejecuta las instrucciones; incluye la unidad de control y la unidad aritmético-lógica"],
        ["Memoria RAM", "Memoria principal de acceso aleatorio, de lectura y escritura y volátil: pierde su contenido al apagar el equipo"],
        ["Memoria ROM", "Memoria de solo lectura y no volátil; contiene el firmware de arranque del equipo"],
        ["Memoria caché", "Memoria muy rápida y pequeña que guarda los datos de uso más frecuente para acelerar el procesador"],
        ["Placa base", "Tarjeta principal que conecta procesador, memoria, almacenamiento y periféricos"],
        ["Periféricos de entrada", "Introducen datos: teclado, ratón, escáner, micrófono, lector de tarjetas"],
        ["Periféricos de salida", "Muestran o extraen datos: monitor, impresora, altavoces"],
        ["Periféricos mixtos", "De entrada y salida: pantalla táctil, impresora multifunción, disco externo"],
        ["Puertos y conexiones", "USB para periféricos y almacenamiento; HDMI para vídeo; red Ethernet o wifi para comunicaciones"],
      ],
      preguntas: [
        ["media", "La memoria que pierde su contenido al apagar el ordenador es la:", ["RAM", "ROM", "Disco duro", "Memoria USB"], "Conocimiento técnico."],
        ["media", "El componente que ejecuta las instrucciones de los programas es:", ["El procesador (CPU)", "El monitor", "La tarjeta de red", "El teclado"], "Conocimiento técnico."],
        ["media", "Es un periférico de entrada:", ["El escáner", "La impresora", "El monitor", "Los altavoces"], "Conocimiento técnico."],
        ["media", "Una impresora multifunción que también escanea es un periférico:", ["Mixto (de entrada y salida)", "Solo de entrada", "Solo de salida", "De almacenamiento interno"], "Conocimiento técnico."],
        ["dificil", "La memoria de solo lectura que contiene el firmware de arranque es la:", ["ROM", "RAM", "Caché", "Virtual"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Software de sistema", "Gestiona el hardware y sirve de base a los demás programas: sistema operativo, controladores (drivers), utilidades"],
        ["Software de aplicación", "Programas para tareas del usuario: procesador de textos, hoja de cálculo, navegador, correo, gestión de expedientes"],
        ["Software de programación", "Herramientas para crear programas: lenguajes, compiladores, intérpretes y entornos de desarrollo"],
        ["Software propietario", "Su uso, copia o modificación están restringidos por la licencia del titular; normalmente no se facilita el código fuente"],
        ["Software libre y de código abierto", "Permite usar, estudiar, modificar y redistribuir el programa, con acceso al código fuente (p. ej., LibreOffice, Linux)"],
        ["Freeware y shareware", "Freeware: gratuito pero no necesariamente libre; shareware: se prueba gratis con limitaciones de tiempo o funciones"],
        ["Controlador (driver)", "Programa que permite al sistema operativo comunicarse con un dispositivo concreto"],
      ],
      preguntas: [
        ["media", "El sistema operativo es software:", ["De sistema", "De aplicación", "De programación", "Shareware necesariamente"], "Conocimiento técnico."],
        ["media", "Una hoja de cálculo es software:", ["De aplicación", "De sistema", "De programación", "Firmware"], "Conocimiento técnico."],
        ["media", "El software libre permite, entre otras cosas:", ["Estudiar y modificar el programa con acceso al código fuente", "Solo usarlo sin ver el código", "Usarlo solo durante 30 días", "Nada sin pagar licencia"], "Conocimiento técnico."],
        ["dificil", "El software que se distribuye gratis para probarlo con limitaciones de tiempo o funciones es:", ["Shareware", "Freeware", "Software libre", "Firmware"], "Conocimiento técnico."],
        ["media", "El programa que permite al sistema operativo comunicarse con una impresora es su:", ["Controlador o driver", "Compilador", "Navegador", "Antivirus"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Almacenamiento magnético", "Disco duro mecánico (HDD) y cintas: gran capacidad y bajo coste por gigabyte; las cintas se usan para copias de seguridad"],
        ["Almacenamiento óptico", "CD, DVD y Blu-ray, leídos mediante láser"],
        ["Almacenamiento de estado sólido", "SSD, memorias USB y tarjetas de memoria: sin piezas móviles, más rápidos y resistentes a golpes"],
        ["Almacenamiento en red", "Servidores de archivos y NAS compartidos por varios usuarios de la organización"],
        ["Almacenamiento en la nube", "Datos alojados en servidores remotos accesibles por Internet"],
        ["Copia de seguridad", "Duplicado de los datos para recuperarlos ante pérdida o daño; puede ser completa, incremental (cambios desde la última copia) o diferencial (cambios desde la última completa)"],
        ["Regla 3-2-1", "Buena práctica: tres copias, en dos soportes distintos y una fuera de las instalaciones"],
      ],
      preguntas: [
        ["media", "Un disco SSD es un sistema de almacenamiento:", ["De estado sólido", "Magnético", "Óptico", "Volátil"], "Conocimiento técnico."],
        ["media", "Un DVD es un soporte de almacenamiento:", ["Óptico", "Magnético", "De estado sólido", "Volátil"], "Conocimiento técnico."],
        ["dificil", "La copia que guarda solo los cambios producidos desde la última copia de cualquier tipo es la:", ["Incremental", "Diferencial", "Completa", "Espejo"], "Conocimiento técnico."],
        ["media", "Una ventaja del SSD frente al disco duro mecánico es:", ["Mayor velocidad y ausencia de piezas móviles", "Menor precio por gigabyte siempre", "Mayor capacidad siempre", "Que no necesita alimentación"], "Conocimiento técnico."],
        ["media", "Guardar documentos en servidores remotos accesibles por Internet es almacenamiento:", ["En la nube", "Óptico", "En memoria RAM", "En caché"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Sistema operativo", "Software de sistema que gestiona los recursos del equipo (procesador, memoria, archivos, dispositivos) y ofrece la interfaz con el usuario"],
        ["Funciones", "Gestión de procesos, de memoria, de archivos, de dispositivos de entrada y salida, de usuarios y permisos y de la seguridad"],
        ["Ejemplos", "De escritorio: Windows, macOS, distribuciones Linux; de dispositivos móviles: Android, iOS"],
        ["Interfaz", "Gráfica (ventanas, iconos, ratón) o de línea de comandos (órdenes escritas)"],
        ["Multitarea y multiusuario", "Multitarea: varios procesos a la vez; multiusuario: varios usuarios con sus cuentas y permisos"],
        ["Sistema de archivos", "Forma de organizar y guardar los ficheros en un soporte: p. ej., NTFS y FAT32 en Windows, ext4 en Linux; carpetas jerárquicas y extensiones de archivo"],
        ["Núcleo (kernel)", "Parte central del sistema operativo que gestiona directamente el hardware"],
      ],
      preguntas: [
        ["media", "Gestionar la memoria, los procesos y los archivos es función de:", ["El sistema operativo", "El procesador de textos", "El navegador", "La impresora"], "Conocimiento técnico."],
        ["media", "Es un sistema operativo de dispositivos móviles:", ["Android", "LibreOffice", "Excel", "Chrome"], "Conocimiento técnico."],
        ["media", "Un sistema operativo que permite ejecutar varios procesos a la vez es:", ["Multitarea", "Monotarea", "Monousuario", "De línea única"], "Conocimiento técnico."],
        ["dificil", "La parte central del sistema operativo que gestiona directamente el hardware es:", ["El núcleo o kernel", "El escritorio", "El explorador de archivos", "El antivirus"], "Conocimiento técnico."],
        ["media", "Es un sistema de archivos habitual en Windows:", ["NTFS", "HTML", "PDF", "SMTP"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Malware", "Software malicioso: virus, gusanos, troyanos, espías (spyware) y ransomware"],
        ["Ransomware", "Malware que cifra los datos y exige un rescate; la mejor defensa son las copias de seguridad y las actualizaciones"],
        ["Phishing", "Engaño por correo, SMS o web que suplanta a una entidad para obtener credenciales o datos"],
        ["Medidas básicas", "Contraseñas robustas y no reutilizadas, doble factor de autenticación, actualizaciones, antivirus, copias de seguridad, bloqueo del equipo y desconfiar de adjuntos y enlaces"],
        ["Esquema Nacional de Seguridad (art. 1 RD 311/2022)", "Principios básicos y requisitos mínimos para proteger la información y los servicios electrónicos del sector público; desarrolla el art. 156.2 de la Ley 40/2015"],
        ["Dimensiones de seguridad (art. 40 RD 311/2022)", "Disponibilidad, autenticidad, integridad, confidencialidad y trazabilidad"],
        ["Principios básicos (art. 5 RD 311/2022)", "Seguridad como proceso integral; gestión basada en riesgos; prevención, detección, respuesta y conservación; líneas de defensa; vigilancia continua; reevaluación periódica; diferenciación de responsabilidades"],
        ["Política de seguridad (art. 12 RD 311/2022)", "Cada Administración debe tener una política de seguridad aprobada formalmente, desarrollada con requisitos mínimos como mínimo privilegio, control de accesos o gestión de incidentes"],
        ["Categorías de los sistemas (anexo I RD 311/2022)", "BÁSICA, MEDIA y ALTA, según el nivel más alto alcanzado en alguna de sus dimensiones de seguridad"],
      ],
      preguntas: [
        ["media", "El malware que cifra los archivos y pide un rescate es:", ["Ransomware", "Spyware", "Adware", "Firewall"], "Conocimiento técnico."],
        ["media", "Un correo que suplanta a un banco para obtener nuestras claves es un caso de:", ["Phishing", "Backup", "Spam legítimo", "Cifrado"], "Conocimiento técnico."],
        ["media", "El Esquema Nacional de Seguridad está regulado actualmente por:", ["El Real Decreto 311/2022", "La Ley 39/2015", "El RD 3/2010 vigente", "La Ley 19/2013"], "BOE-A-2022-7191."],
        ["dificil", "Según el ENS, los sistemas de información se clasifican en las categorías:", ["Básica, media y alta", "Baja, normal y crítica", "Pública, reservada y secreta", "A, B y C"], "Anexo I RD 311/2022."],
        ["media", "Es una dimensión de seguridad del ENS:", ["La trazabilidad", "La rapidez", "La gratuidad", "La portabilidad"], "Art. 40.2 RD 311/2022."],
        ["media", "Es un principio básico del ENS:", ["La gestión de la seguridad basada en los riesgos", "La seguridad como tarea exclusiva del informático", "La revisión única al implantar el sistema", "La confianza plena en los usuarios"], "Art. 5.b) RD 311/2022."],
        ["media", "Una medida eficaz para proteger el acceso a las cuentas es:", ["El doble factor de autenticación", "Usar la misma contraseña en todo", "Apuntar la contraseña en el monitor", "Desactivar las actualizaciones"], "Conocimiento técnico; requisito de control de accesos (art. 12.6.e RD 311/2022)."],
      ],
    },
  ],
  glosario: [
    [S1, "Bit", "Dígito binario, unidad mínima de información (0 o 1)."],
    [S1, "Byte", "Grupo de 8 bits que permite representar un carácter."],
    [S2, "RAM", "Memoria principal de trabajo, de lectura y escritura y volátil."],
    [S2, "Periférico", "Dispositivo conectado al ordenador para introducir, mostrar o almacenar datos."],
    [S3, "Código fuente", "Instrucciones de un programa escritas en un lenguaje de programación legible por personas."],
    [S3, "Software libre", "Programa que puede usarse, estudiarse, modificarse y redistribuirse libremente."],
    [S4, "NAS", "Dispositivo de almacenamiento conectado a la red que comparten varios usuarios."],
    [S4, "Copia incremental", "Copia de seguridad que guarda solo lo cambiado desde la última copia."],
    [S5, "Sistema operativo", "Programa base que gestiona los recursos del equipo y la interacción con el usuario."],
    [S6, "Ransomware", "Programa malicioso que secuestra los datos cifrándolos y exige un rescate."],
    [S6, "Doble factor de autenticación", "Acceso que exige dos pruebas de identidad distintas, como contraseña y código en el móvil."],
    [S6, "ENS", "Esquema Nacional de Seguridad: normas de seguridad obligatorias para los sistemas de las Administraciones."],
  ],
  casos: [
    {
      slug: "nuevo-equipo-oficina",
      titulo: "Un equipo nuevo en la oficina",
      supuesto: "Al administrativo de un servicio provincial le instalan un ordenador nuevo con disco SSD, 16 GB de RAM, monitor, teclado, ratón e impresora multifunción en red. El equipo trae un sistema operativo de escritorio, un paquete ofimático libre y la aplicación corporativa de expedientes.",
      preguntas: [
        [S2, "media", "Los 16 GB de RAM son memoria:", ["Principal y volátil", "De solo lectura", "De almacenamiento permanente", "Óptica"], "Conocimiento técnico."],
        [S4, "media", "El disco SSD es almacenamiento:", ["De estado sólido", "Magnético", "Óptico", "En la nube"], "Conocimiento técnico."],
        [S2, "media", "El teclado y el ratón son periféricos:", ["De entrada", "De salida", "De almacenamiento", "Mixtos siempre"], "Conocimiento técnico."],
        [S2, "media", "La impresora multifunción, que también escanea, es un periférico:", ["Mixto", "Solo de entrada", "Solo de salida", "Interno"], "Conocimiento técnico."],
        [S3, "media", "La aplicación corporativa de expedientes es software:", ["De aplicación", "De sistema", "De programación", "Firmware"], "Conocimiento técnico."],
        [S3, "media", "El paquete ofimático libre permite, según su licencia:", ["Usarlo, estudiarlo, modificarlo y redistribuirlo", "Solo usarlo 30 días", "Nada sin pagar", "Solo leer documentos"], "Conocimiento técnico."],
        [S5, "media", "Para que la impresora funcione, el sistema operativo necesita su:", ["Controlador o driver", "Compilador", "Antivirus", "Licencia de usuario final de ofimática"], "Conocimiento técnico."],
        [S5, "media", "Gestionar las cuentas y permisos de los usuarios del equipo es función de:", ["El sistema operativo", "La impresora", "El monitor", "La memoria caché"], "Conocimiento técnico."],
        [S1, "media", "Si un documento ocupa 2 MB, su tamaño es mayor que uno de:", ["500 KB", "1 GB", "3 MB", "1 TB"], "Conocimiento técnico."],
        [S6, "media", "Al ausentarse de su puesto, conviene:", ["Bloquear la sesión del equipo", "Dejarla abierta", "Apuntar la contraseña en un pósit", "Apagar el monitor solamente"], "Buenas prácticas; art. 12.6.e) RD 311/2022 (control de accesos)."],
      ],
    },
    {
      slug: "ataque-ransomware-servicio",
      titulo: "Un correo sospechoso y un ransomware",
      supuesto: "Una compañera recibe un correo que aparenta venir de la Agencia Tributaria con un adjunto «notificación.zip». Lo abre y, al poco, los archivos de su carpeta compartida aparecen cifrados con un mensaje que exige un pago en criptomonedas.",
      preguntas: [
        [S6, "media", "El correo que suplanta a la Agencia Tributaria es un intento de:", ["Phishing", "Copia de seguridad", "Actualización legítima", "Firma electrónica"], "Conocimiento técnico."],
        [S6, "media", "El programa que cifra los archivos y pide un pago es:", ["Ransomware", "Un antivirus", "Un controlador", "Un cortafuegos"], "Conocimiento técnico."],
        [S6, "media", "Lo primero que debe hacer es:", ["Desconectar el equipo de la red y avisar al servicio de informática o de seguridad", "Pagar el rescate", "Reenviar el correo a todos", "Esperar a ver qué pasa"], "Buenas prácticas; gestión de incidentes (art. 12.6.m RD 311/2022)."],
        [S4, "media", "La medida que permite recuperar los archivos sin pagar es contar con:", ["Copias de seguridad recientes y separadas", "Más memoria RAM", "Un monitor más grande", "Una contraseña más corta"], "Conocimiento técnico."],
        [S4, "media", "Según la regla 3-2-1, una de las copias debe estar:", ["Fuera de las instalaciones", "En el mismo disco", "En la memoria RAM", "En papel"], "Buena práctica de copias de seguridad."],
        [S6, "media", "El ENS exige a cada Administración:", ["Una política de seguridad formalmente aprobada", "Contratar siempre empresas extranjeras", "Prescindir de copias", "Publicar sus contraseñas"], "Art. 12.2 RD 311/2022."],
        [S6, "dificil", "Que el sistema vuelva a estar disponible y los datos íntegros afecta a las dimensiones de:", ["Disponibilidad e integridad", "Gratuidad y rapidez", "Portabilidad y estética", "Antigüedad y volumen"], "Art. 40.2 RD 311/2022."],
        [S6, "media", "Entre los principios del ENS está:", ["Prevención, detección, respuesta y conservación", "Confianza total en los correos internos", "Seguridad solo perimetral", "Revisión cada diez años"], "Art. 5.c) RD 311/2022."],
        [S6, "media", "Para reducir este riesgo es importante:", ["Mantener actualizados el sistema operativo y el antivirus", "Desactivar las actualizaciones", "Usar cuentas de administrador para todo", "Abrir todos los adjuntos comprimidos"], "Conocimiento técnico; requisito de integridad y actualización (art. 12.6.i RD 311/2022)."],
        [S6, "media", "Dar a cada usuario solo los permisos que necesita es el requisito de:", ["Mínimo privilegio", "Máximo acceso", "Igualdad de contraseñas", "Libre disposición"], "Art. 12.6.h) RD 311/2022."],
      ],
    },
    {
      slug: "almacenar-expedientes-servicio",
      titulo: "Dónde guardar los expedientes",
      supuesto: "Un servicio debe decidir cómo almacenar y proteger la documentación digital de sus expedientes: algunos funcionarios los guardan en el escritorio de su ordenador, otros en memorias USB personales y otros en la unidad de red del departamento.",
      preguntas: [
        [S4, "media", "La opción más adecuada para compartirlos y protegerlos es:", ["La unidad de red corporativa con copias de seguridad", "Las memorias USB personales", "El escritorio de cada ordenador", "El correo personal"], "Buenas prácticas de almacenamiento."],
        [S4, "media", "Una memoria USB es almacenamiento:", ["De estado sólido extraíble", "Magnético interno", "Óptico", "Volátil"], "Conocimiento técnico."],
        [S6, "media", "Llevar expedientes con datos personales en una USB personal sin cifrar pone en riesgo sobre todo su:", ["Confidencialidad", "Gratuidad", "Velocidad", "Formato"], "Art. 40.2 RD 311/2022."],
        [S4, "dificil", "La copia que guarda los cambios desde la última copia completa es la:", ["Diferencial", "Incremental", "Espejo instantáneo", "Parcial aleatoria"], "Conocimiento técnico."],
        [S4, "media", "Las cintas magnéticas siguen usándose sobre todo para:", ["Copias de seguridad de gran volumen", "Ejecutar programas", "Mostrar imágenes", "Imprimir"], "Conocimiento técnico."],
        [S5, "media", "Organizar los expedientes en carpetas y subcarpetas se apoya en:", ["El sistema de archivos del sistema operativo", "La memoria caché", "El monitor", "La BIOS"], "Conocimiento técnico."],
        [S6, "media", "Registrar quién accede a cada expediente responde a la dimensión de:", ["Trazabilidad", "Disponibilidad", "Rapidez", "Portabilidad"], "Art. 40.2 RD 311/2022."],
        [S6, "media", "Un sistema con algún dato cuyo impacto sería alto en caso de incidente se clasifica en categoría:", ["Alta", "Básica", "Media", "Ninguna"], "Anexo I RD 311/2022."],
        [S6, "media", "El ENS se aplica también a empresas privadas cuando:", ["Prestan servicios a entidades del sector público por contrato", "Nunca", "Solo si son extranjeras", "Solo si lo piden"], "Art. 2.3 RD 311/2022."],
        [S1, "media", "Los datos de los expedientes, una vez procesados y con significado, se convierten en:", ["Información", "Hardware", "Firmware", "Ruido"], "Conocimiento técnico."],
      ],
    },
  ],
});
