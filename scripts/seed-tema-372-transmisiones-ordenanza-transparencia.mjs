/**
 * Crea tema-372 — Tema 45 de Policía Local: "Transmisiones. Ordenanza de
 * Transparencia y Libre Acceso a la Información del Ayuntamiento de
 * Zaragoza."
 *
 * Tema dedicado: la Ordenanza de Transparencia ya figura en tema-300, pero
 * ese canónico está vinculado como Tema 7 de esta oposición (recortado a
 * presupuesto e ingresos) y cada canónico solo puede vincularse una vez.
 * Fuentes:
 * - Transmisiones: Tema 34 "Las comunicaciones en el SEIS y PC" (V.
 *   31-10-2024) de la Escuela de Bomberos del Ayuntamiento de Zaragoza,
 *   leído íntegro (ondas, modulación, simplex/dúplex/semidúplex, redes de
 *   emergencia, red TETRA municipal NEBULA de Teltronic implantada en 2004
 *   para todos los servicios de emergencia del Ayuntamiento, SIRDEE).
 *   Alfabeto de deletreo: Reglamento de Radiocomunicaciones de la UIT,
 *   Apéndice 14 "Cuadro para el deletreo de letras y cifras" (versión CMR-07
 *   en itu.int).
 * - Ordenanza sobre Transparencia y Libre Acceso a la Información del
 *   Ayuntamiento de Zaragoza (aprobación definitiva BOPZ nº 74 de
 *   01-04-2014), texto vigente íntegro en zaragoza.es/sede/servicio/
 *   normativa/3983 (copia en scripts/tmp-fuentes/bombero/otlai.clean.txt),
 *   releído en esta sesión: arts. 1-40 y disposiciones. Sus remisiones a la
 *   Ley 30/1992 y a la LO 5/1999 (ya sustituidas) no se preguntan.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-372-transmisiones-ordenanza-transparencia.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const ESCUELA = "https://www.zaragoza.es/sede/portal/bomberos/temarios/";
const UIT = "https://itu.int/dms_pub/itu-r/opb/act/R-ACT-WRC.8-2007-PDF-S.pdf";
const OTLAI = "https://www.zaragoza.es/sede/servicio/normativa/3983";
const S1 = "radiocomunicaciones-conceptos";
const S2 = "redes-emergencia-tetra-deletreo";
const S3 = "transparencia-objeto-principios";
const S4 = "transparencia-publicidad-reutilizacion";
const S5 = "transparencia-acceso-sanciones";

await sembrarTema({
  tema: {
    slug: "tema-372",
    titulo: "Transmisiones y Ordenanza de Transparencia y Libre Acceso a la Información de Zaragoza",
    descripcion: "Transmisiones: ondas de radio, frecuencia y longitud de onda, modulación AM y FM, modos simplex, dúplex y semidúplex, repetidores; redes de radiocomunicación para emergencias (TETRA, TETRAPOL/SIRDEE, DMR), la red TETRA municipal de Zaragoza y el alfabeto de deletreo de la UIT. Ordenanza de Transparencia del Ayuntamiento de Zaragoza: objeto, ámbito, principios y competencias; información pública y limitaciones; reutilización; publicidad activa; solicitud de acceso, inadmisión, plazos y resolución; infracciones y sanciones.",
    contenido: "La primera parte explica cómo funciona la radio que usa el agente (por qué no se puede hablar a la vez que otro en la misma frecuencia, qué es un repetidor, qué es la red TETRA del Ayuntamiento) y cómo se deletrea por radio una matrícula. La segunda parte resume la ordenanza municipal que obliga al Ayuntamiento a publicar información y permite a cualquier persona pedirla: qué se publica, quién resuelve, en qué plazo y qué multas hay por mal uso de los datos.",
    enlaces_boe: [
      { url: ESCUELA, titulo: "Escuela de Bomberos del Ayuntamiento de Zaragoza, Tema 34: Las comunicaciones en el SEIS y PC" },
      { url: UIT, titulo: "Reglamento de Radiocomunicaciones de la UIT, Apéndice 14: Cuadro para el deletreo de letras y cifras" },
      { url: OTLAI, titulo: "Ordenanza sobre Transparencia y Libre Acceso a la Información del Ayuntamiento de Zaragoza (BOPZ nº 74, 01-04-2014)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos básicos de radiocomunicaciones", url: ESCUELA },
      { seccion: S2, titulo: "Redes de emergencia, red TETRA de Zaragoza y deletreo", url: ESCUELA },
      { seccion: S3, titulo: "Ordenanza de Transparencia: Título I", articulos: "arts. 1-5", url: OTLAI },
      { seccion: S4, titulo: "Ordenanza de Transparencia: información pública, limitaciones, reutilización y publicidad activa", articulos: "arts. 6-29", url: OTLAI },
      { seccion: S5, titulo: "Ordenanza de Transparencia: puesta a disposición, infracciones y sanciones", articulos: "arts. 30-40", url: OTLAI },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 45 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Radiocomunicaciones", "Comunicaciones que usan ondas de radio (radioeléctricas), un tipo de onda electromagnética que no necesita medio para propagarse"],
        ["Propiedades de una onda", "Frecuencia (Hz), longitud de onda (m), velocidad (m/s) y amplitud"],
        ["Relación v = λ × f", "Como la velocidad es constante (300.000.000 m/s en el vacío), a más frecuencia, menor longitud de onda"],
        ["Ondas de radio", "Frecuencias entre 3 kHz y 3.000 GHz (longitudes de onda de 100 km a 0,1 mm)"],
        ["Interferencia", "Varias emisiones simultáneas en la misma frecuencia se solapan y la comunicación se hace imposible"],
        ["Sintonización", "Ajuste del equipo a la frecuencia concreta de emisión o recepción"],
        ["Modulación", "Modificación de la onda portadora para que transporte información: en AM varía la amplitud; en FM, la frecuencia"],
        ["Simplex", "Misma frecuencia para emitir y recibir; solo uno puede hablar a la vez"],
        ["Dúplex", "Frecuencias distintas para emitir y recibir; permitiría hablar los dos a la vez"],
        ["Semidúplex", "Dos frecuencias, usadas a través de un repetidor que recibe y reemite amplificado; su ventaja es el mayor alcance, no más conversaciones"],
      ],
      preguntas: [
        ["media", "¿En qué unidad se mide la frecuencia?", ["En hercios (Hz)", "En metros", "En vatios"], "Tema 34 de la Escuela de Bomberos."],
        ["media", "Si aumenta la frecuencia de una onda electromagnética, su longitud de onda…", ["Disminuye", "Aumenta", "No cambia"], "Tema 34: v = λ × f con velocidad constante."],
        ["media", "¿Qué ocurre si dos equipos emiten a la vez en la misma frecuencia?", ["Se produce interferencia", "Se oyen ambos perfectamente", "Se amplifica la señal"], "Tema 34."],
        ["media", "¿Qué varía en la modulación en frecuencia (FM)?", ["La frecuencia de la portadora", "La amplitud", "La velocidad"], "Tema 34."],
        ["media", "¿Qué modo usa la misma frecuencia para emitir y recibir?", ["Simplex", "Dúplex", "Semidúplex"], "Tema 34."],
        ["dificil", "¿Cuál es la ventaja del modo semidúplex a través de repetidor?", ["Un mayor alcance de la señal", "Mantener más conversaciones a la vez", "No necesita antena"], "Tema 34."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Redes de emergencia", "Sistemas alternativos a la telefonía para el mando y control entre centros de coordinación e intervinientes: TETRA, TETRAPOL, DMR y radio analógica"],
        ["TETRA", "Terrestrial Trunked Radio: estándar abierto de radio digital para comunicaciones críticas; celular, de banda estrecha (25 kHz) y para voz y datos cortos (incluida la localización)"],
        ["SIRDEE", "Red TETRAPOL (no estándar abierto) del Estado, usada por Policía Nacional, Guardia Civil y UME"],
        ["Red TETRA municipal", "El Ayuntamiento de Zaragoza la implantó en 2004 integrando todos sus servicios de comunicaciones de emergencia; infraestructura NEBULA, de Teltronic"],
        ["Cobertura", "Quince estaciones base cubren todo el término municipal y parte de las principales carreteras de acceso"],
        ["Elementos de la red", "Nodo central (SCN), estaciones base (SBS, MBS, MCBS), sistema de gestión de red (NMS) y red de transporte de fibra y radioenlaces"],
        ["Terminales", "Portátiles (de menos potencia) y móviles instalados en vehículos (más potencia y mejor antena)"],
        ["Deletreo (UIT, Apéndice 14)", "Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike"],
        ["Deletreo (continuación)", "November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu"],
      ],
      preguntas: [
        ["media", "¿Qué significa TETRA?", ["Terrestrial Trunked Radio", "Telefonía Terrestre Analógica", "Transmisión Electrónica de Radio Avanzada"], "Tema 34."],
        ["media", "¿En qué año decidió el Ayuntamiento de Zaragoza implantar su red TETRA?", ["2004", "2021", "1995"], "Tema 34."],
        ["media", "¿Qué cuerpos usan el sistema SIRDEE?", ["Policía Nacional, Guardia Civil y UME", "Solo las Policías Locales", "Los bomberos municipales"], "Tema 34."],
        ["media", "¿Para qué no está pensado TETRA por ser de banda estrecha?", ["Para la transmisión masiva de datos", "Para la voz", "Para la localización"], "Tema 34."],
        ["media", "En el alfabeto de deletreo de la UIT, la letra M se transmite como…", ["Mike", "Madrid", "Mario"], "UIT, Apéndice 14."],
        ["media", "¿Cómo se deletrea la matrícula 1234 BCD?", ["Uno, dos, tres, cuatro, Bravo, Charlie, Delta", "Uno, dos, tres, cuatro, Barcelona, Cádiz, Dénia", "Mil doscientos treinta y cuatro, bcd"], "UIT, Apéndice 14."],
        ["dificil", "¿Cuántas estaciones base dan cobertura a la red TETRA municipal según la Escuela de Bomberos?", ["Quince", "Cinco", "Cincuenta"], "Tema 34."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Objeto (art. 1)", "Garantizar la transparencia del Ayuntamiento, el libre acceso a su información pública y su reutilización, por medios preferentemente electrónicos"],
        ["Ámbito (art. 2)", "Incluye organismos autónomos, entidades públicas empresariales, sociedades municipales o participadas mayoritariamente y fundaciones municipales; concesionarios y perceptores de subvenciones deben facilitar información"],
        ["Quién puede ejercer los derechos (art. 2)", "Cualquier persona física o jurídica, sin exigir nacionalidad ni residencia en Zaragoza"],
        ["Principios (art. 3)", "Publicidad de la información, publicidad activa, libre reutilización, información abierta, acceso inmediato y electrónico, privacidad en el diseño, calidad de la información y compromiso de servicio"],
        ["Publicidad (art. 3)", "Se presume pública la información municipal; solo se deniega en los casos previstos, por resolución motivada e impugnable"],
        ["Calidad (art. 3)", "Información veraz, fehaciente y actualizada, con la unidad responsable y la fecha de la última actualización"],
        ["Competencias (art. 4)", "Alcalde: resolver el acceso (delegable); Gobierno de Zaragoza: licencias de reutilización y sanciones; órgano técnico: catálogo, tramitación e instrucción"],
        ["Exención (art. 5)", "El Ayuntamiento no responde del uso que terceros hagan de la información publicada"],
      ],
      preguntas: [
        ["media", "¿Debe residir en Zaragoza quien solicita información al Ayuntamiento?", ["No", "Sí", "Solo si es persona jurídica"], "Ordenanza de Transparencia, art. 2."],
        ["media", "¿Quién resuelve las solicitudes de acceso a la información?", ["El Alcalde, que puede delegar", "El Pleno", "El Justicia de Aragón"], "Art. 4."],
        ["media", "¿Qué órgano impone las sanciones de la Ordenanza?", ["El Gobierno de Zaragoza", "El Alcalde", "La Policía Local"], "Art. 4."],
        ["media", "¿Qué presunción establece el principio de publicidad?", ["Que la información municipal es pública", "Que es reservada", "Que solo es pública la publicada en el BOPZ"], "Art. 3."],
        ["dificil", "¿Responde el Ayuntamiento del uso que un tercero haga de la información publicada?", ["No, bajo ningún concepto", "Sí, siempre", "Solo si hay lucro"], "Art. 5."],
        ["media", "¿Qué debe indicar toda publicación según el principio de calidad?", ["La unidad responsable y la fecha de la última actualización", "El precio", "El nombre del Alcalde"], "Art. 3."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Información pública (art. 6)", "Toda la que obre en poder del Ayuntamiento, elaborada o adquirida en sus funciones, en papel o electrónica"],
        ["Expedientes en tramitación (art. 6)", "Quedan fuera de la Ordenanza; solo terminados los procedimientos su información es pública"],
        ["Limitaciones (art. 9)", "Perjuicio a la seguridad nacional o pública, defensa, relaciones exteriores, prevención e investigación de ilícitos, procesos judiciales, inspección y control, intereses económicos, secreto profesional, confidencialidad de decisiones o medio ambiente"],
        ["Datos personales (art. 10)", "Se publican si hay interés público preferente (se presume para cargos y empleados en sus funciones, agenda y retribuciones de cargos electos); en otro caso, previa disociación"],
        ["Aplicación de límites (art. 11)", "Interpretación restrictiva, justificada y proporcionada; acceso parcial cuando solo una parte sea publicable"],
        ["Reutilización (art. 12)", "Sin autorización previa salvo indicación contraria: mantener el sentido, citar al Ayuntamiento sin sugerir patrocinio y conservar los elementos de calidad"],
        ["Publicidad activa (arts. 19-25)", "Normativa, actas del Pleno, plantilla y RPT, agendas, presupuesto y ejecución mensual, contratos y subvenciones, urbanismo, medio ambiente y servicios (estado del tráfico, callejero, cortes de servicio…)"],
        ["Plenos (art. 19)", "Se graban íntegramente, se publican en la sede electrónica y se retransmiten en directo, salvo los asuntos secretos por afectar al art. 18.1 CE"],
        ["Plazos de publicación (art. 29)", "Normas mientras estén vigentes; contratos, convenios y subvenciones mientras haya obligaciones y dos años después; información económica cinco años"],
      ],
      preguntas: [
        ["media", "¿Es información pública un expediente todavía en tramitación?", ["No; solo lo es una vez terminado el procedimiento", "Sí", "Solo si lo pide un concejal"], "Art. 6."],
        ["media", "¿Necesita autorización previa reutilizar la información municipal publicada?", ["No, salvo que se indique expresamente lo contrario", "Sí, siempre", "Solo si es para un periódico"], "Art. 12."],
        ["media", "¿Cómo se interpretan las limitaciones a la publicidad?", ["Restrictivamente y de forma justificada y proporcionada", "Ampliamente", "Libremente por cada funcionario"], "Art. 11."],
        ["media", "¿Debe publicar el Ayuntamiento el estado del tráfico y los cortes?", ["Sí, como información vinculada a la prestación de servicios", "No", "Solo en fiestas"], "Art. 25.b)."],
        ["dificil", "¿Durante cuánto tiempo debe mantenerse publicada la información sobre contratos y subvenciones?", ["Mientras persistan las obligaciones y al menos dos años después", "Cinco años desde su firma", "Un mes"], "Art. 29."],
        ["media", "¿Se retransmiten los Plenos municipales?", ["Sí, en directo en la web municipal, salvo asuntos secretos", "No", "Solo los extraordinarios"], "Art. 19."],
        ["media", "Las retribuciones de los empleados municipales se publican…", ["Por categorías profesionales, sin vincularlas a personas concretas", "Con nombre y apellidos", "No se publican"], "Art. 10.d)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Solicitud (art. 30)", "Gratuita, sin alegar motivo ni finalidad; basta una descripción suficiente de la información; si hay defectos, diez días para subsanar"],
        ["Inadmisión (art. 31)", "Información en elaboración, de un procedimiento en tramitación, auxiliar (notas, borradores, informes internos), que exija reelaboración, dirigida a órgano que no la tiene o abusiva"],
        ["Información ya publicada (art. 32)", "En menos de cinco días se indica dónde está en la sede electrónica y se termina el procedimiento"],
        ["Terceros afectados (art. 33)", "Quince días para alegar; se suspende el plazo"],
        ["Plazo de resolución (art. 34)", "Veinte días, ampliables otros veinte por traslado a terceros o complejidad; sin resolución en plazo, se entiende desestimada"],
        ["Puesta a disposición (art. 35)", "Gratuita, salvo copias o conversión de formato, que pueden devengar tasa o precio"],
        ["Infracciones (art. 36)", "Muy grave: alterar o desnaturalizar la información reutilizada induciendo a engaño; graves: reutilizar sin licencia o para otro fin; leves: suprimir elementos de calidad o incumplir condiciones"],
        ["Sanciones (art. 37)", "Muy graves: 2.001 a 3.000 euros; graves: 1.001 a 2.000; leves: hasta 1.000; además, prohibición de reutilizar de uno a cinco años en muy graves y graves"],
        ["Personal municipal (art. 38)", "Sus infracciones se sujetan al régimen disciplinario"],
      ],
      preguntas: [
        ["media", "¿Debe el solicitante explicar para qué quiere la información?", ["No", "Sí", "Solo si es periodista"], "Art. 30."],
        ["media", "¿En qué plazo máximo se resuelve, en general, una solicitud de acceso?", ["Veinte días", "Tres meses", "Diez días"], "Art. 34."],
        ["media", "Si no hay resolución en plazo, la solicitud se entiende…", ["Desestimada", "Estimada", "Caducada"], "Art. 34."],
        ["media", "¿Puede inadmitirse una solicitud sobre un borrador o un informe interno?", ["Sí, es información auxiliar o de apoyo", "No", "Solo si es secreto"], "Art. 31.c)."],
        ["media", "¿Qué multa corresponde a una infracción muy grave de la Ordenanza?", ["De 2.001 a 3.000 euros", "Hasta 1.000 euros", "De 1.001 a 2.000 euros"], "Art. 37."],
        ["dificil", "Si la información pedida ya está publicada, ¿qué plazo hay para indicar al solicitante dónde está?", ["Menos de cinco días", "Veinte días", "Un mes"], "Art. 32."],
        ["media", "¿Cuánto plazo tienen los terceros afectados para alegar?", ["Quince días como máximo", "Tres días", "Dos meses"], "Art. 33."],
      ],
    },
  ],
  glosario: [
    [S1, "Portadora", "Onda básica que se modula para transportar información."],
    [S1, "Repetidor", "Equipo que recibe una señal y la reemite amplificada en otra frecuencia para aumentar el alcance."],
    [S2, "TETRA", "Estándar abierto de radio digital para comunicaciones críticas de seguridad y emergencias."],
    [S2, "Estación base", "Elemento de la red que da cobertura radio a los terminales."],
    [S2, "Alfabeto de deletreo", "Palabras de código de la UIT para transmitir letras sin confusión (Alfa, Bravo, Charlie…)."],
    [S3, "Publicidad activa", "Publicación de información por iniciativa propia del Ayuntamiento, sin esperar a que se pida."],
    [S4, "Reutilización", "Uso por terceros de la información pública municipal para otros fines."],
    [S4, "Disociación", "Tratamiento que impide asociar los datos a una persona identificada."],
    [S5, "Puesta a disposición", "Entrega de información pública al solicitante tras su solicitud."],
    [S5, "Silencio desestimatorio", "Efecto por el que, sin resolución en plazo, se entiende denegada la solicitud."],
  ],
  casos: [
    {
      slug: "caso-radio-control-matricula",
      titulo: "Una comunicación por radio en un control",
      supuesto: "Una patrulla de la Policía Local en un control en la Z-30 necesita consultar una matrícula a la sala y pedir apoyo a otra unidad. Al hablar por radio se pisan dos comunicaciones y no se entiende nada. Una de las patrullas está en un sótano donde el terminal portátil apenas tiene cobertura.",
      preguntas: [
        [S1, "media", "¿Por qué no se entiende nada cuando dos agentes hablan a la vez en la misma frecuencia?", ["Por interferencia entre las dos emisiones", "Porque la batería está baja", "Porque falta sintonización"], "Tema 34."],
        [S1, "media", "En modo simplex, ¿cuántos participantes pueden emitir a la vez?", ["Solo uno", "Dos", "Todos"], "Tema 34."],
        [S2, "media", "¿Cómo deletrea la matrícula 5678 KLM?", ["Cinco, seis, siete, ocho, Kilo, Lima, Mike", "Cinco, seis, siete, ocho, Kenia, Lugo, Madrid", "Cinco mil seiscientos, KLM"], "UIT, Apéndice 14."],
        [S2, "media", "¿Qué red de radio usa la Policía Local de Zaragoza junto con el resto de servicios de emergencia municipales?", ["La red TETRA municipal", "El SIRDEE", "La telefonía móvil"], "Tema 34."],
        [S2, "media", "¿Por qué un terminal móvil de vehículo suele tener mejor cobertura que el portátil?", ["Tiene más potencia de transmisión y mejor antena", "Usa otra red", "No tiene mejor cobertura"], "Tema 34."],
        [S1, "media", "¿Qué equipo amplía el alcance de las comunicaciones?", ["El repetidor", "El micrófono", "La batería"], "Tema 34."],
        [S2, "media", "¿Qué otros datos, además de la voz, transmite TETRA?", ["Datos cortos, como la localización de los terminales", "Vídeo en alta definición", "Nada"], "Tema 34."],
        [S2, "media", "¿Qué letra corresponde a 'Quebec'?", ["Q", "K", "C"], "UIT, Apéndice 14."],
        [S1, "dificil", "¿Qué modo usa dos frecuencias a través de repetidor?", ["Semidúplex", "Simplex", "Dúplex sin repetidor"], "Tema 34."],
        [S2, "media", "Si la patrulla necesitara hablar con la Guardia Civil, ¿qué red estatal usa esta?", ["El SIRDEE (TETRAPOL)", "La red NEBULA municipal", "Ninguna"], "Tema 34."],
      ],
    },
    {
      slug: "caso-solicitud-datos-multas",
      titulo: "Una periodista pide datos de denuncias",
      supuesto: "Una periodista de Huesca pide al Ayuntamiento de Zaragoza los datos agregados de denuncias de tráfico de 2025 por distrito, sin explicar para qué. También pide los borradores internos del informe anual de la Policía Local y, más tarde, publica los datos alterando sus cifras.",
      preguntas: [
        [S3, "media", "¿Puede pedir la información aunque no viva en Zaragoza?", ["Sí", "No", "Solo con poder notarial"], "Art. 2."],
        [S5, "media", "¿Debe justificar la finalidad?", ["No", "Sí", "Solo si es profesional"], "Art. 30."],
        [S5, "media", "¿Qué puede ocurrir con la petición de los borradores internos?", ["Inadmitirse por tratarse de información auxiliar", "Concederse siempre", "Remitirse al juez"], "Art. 31.c)."],
        [S5, "media", "¿En qué plazo debe resolverse la petición de los datos agregados?", ["Veinte días, ampliables otros veinte", "Seis meses", "Tres días"], "Art. 34."],
        [S4, "media", "Si se le entregan, ¿puede publicarlos sin autorización?", ["Sí, citando al Ayuntamiento y sin alterar su sentido", "No", "Solo pagando"], "Art. 12."],
        [S5, "media", "Alterar las cifras induciendo a engaño es una infracción…", ["Muy grave", "Leve", "Grave"], "Art. 36."],
        [S5, "media", "¿Con qué multa se sanciona?", ["De 2.001 a 3.000 euros", "Hasta 1.000 euros", "De 1.001 a 2.000 euros"], "Art. 37."],
        [S5, "dificil", "¿Qué sanción adicional cabe?", ["Prohibición de reutilizar información municipal de uno a cinco años", "Privación del carné de prensa", "Ninguna"], "Art. 37."],
        [S3, "media", "¿Quién impone la sanción?", ["El Gobierno de Zaragoza", "El Jefe de la Policía Local", "El Pleno"], "Art. 4."],
        [S4, "media", "Si los datos incluyeran nombres de denunciados, ¿cómo se facilitarían?", ["Previa disociación de los datos personales", "Con nombres", "No se facilitarían nunca"], "Art. 10."],
      ],
    },
    {
      slug: "caso-publicidad-activa-sede",
      titulo: "Lo que se publica sin pedirlo",
      supuesto: "En una charla a una asociación vecinal de Delicias, un agente explica qué información del Ayuntamiento puede consultarse directamente en la sede electrónica sin hacer ninguna solicitud: desde los cortes de tráfico hasta el sueldo de los concejales.",
      preguntas: [
        [S4, "media", "¿Cómo se llama la publicación por iniciativa propia del Ayuntamiento?", ["Publicidad activa", "Puesta a disposición", "Reutilización"], "Art. 3."],
        [S4, "media", "¿Se publican los cortes de tráfico y las afecciones importantes?", ["Sí", "No", "Solo en el BOPZ"], "Art. 25.b)."],
        [S4, "media", "¿Se publican las retribuciones de los cargos electos?", ["Sí, hay interés público preferente", "No", "Solo las del Alcalde"], "Arts. 10.c) y 20.e)."],
        [S4, "media", "¿Con qué periodicidad se publica la ejecución presupuestaria?", ["Mensual", "Anual", "Cada cuatro años"], "Art. 21.c)."],
        [S4, "media", "¿Se publican las agendas del Alcalde y de los concejales?", ["Sí", "No", "Solo en campaña"], "Art. 20.m)."],
        [S4, "media", "¿Se publica el callejero de la ciudad con carriles bici y aparcamientos?", ["Sí", "No", "Solo para la Policía"], "Art. 25.a)."],
        [S4, "media", "¿Durante cuánto tiempo se mantiene la información económica?", ["Al menos cinco años desde que se generó", "Un año", "Dos años"], "Art. 29."],
        [S4, "media", "¿Se publican las licencias de obras mayores y las sanciones urbanísticas?", ["Sí", "No", "Solo las denegadas"], "Art. 23.d)."],
        [S4, "dificil", "¿Cada cuánto se publica el informe completo sobre el estado del medio ambiente?", ["Cada cuatro años, con un informe de coyuntura al menos anual", "Cada año", "Cada diez años"], "Art. 24."],
        [S3, "media", "¿Qué medios prefiere la Ordenanza para dar acceso a la información?", ["Los electrónicos", "El papel", "El teléfono"], "Art. 1."],
      ],
    },
  ],
});
