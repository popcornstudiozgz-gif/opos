/**
 * Crea tema-238: "Composición y tecnología de la pintura" — Tema 10
 * (numero=10, bloque-2) de Oficial Pintor, Especialidad General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea
 * 1454): "Composición y tecnología de la pintura. Aditivos. Pigmentos.
 * Tipos. Características. Usos. Métodos de aplicación. Normativa."
 *
 * Normativa: Reglamento CLP (DOUE-L-2008-82637), ya citado, relevante
 * para la clasificación de determinados pigmentos y aditivos peligrosos
 * (por ejemplo, pigmentos con metales pesados en desuso progresivo). El
 * resto (composición técnica de la pintura) es conocimiento técnico
 * consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-238-composicion-tecnologia-pintura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-238";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Composición y tecnología de la pintura",
  descripcion: "Los componentes básicos de una pintura: ligante, pigmento, carga, disolvente y aditivos. Tipos y características de los pigmentos. Aditivos habituales y su función.",
  contenido: "Desarrolla la composición técnica de una pintura y la función de cada uno de sus componentes: el ligante o resina, que forma la película tras el secado; los pigmentos, que aportan color y opacidad; las cargas, que modifican propiedades como el espesor o la textura; el disolvente o vehículo, que permite la aplicación; y los aditivos, sustancias añadidas en pequeña proporción para mejorar propiedades específicas (secado, conservación, viscosidad), con referencia al Reglamento CLP para la clasificación de determinados pigmentos y aditivos peligrosos.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Los componentes básicos de una pintura: ligante, disolvente y carga", seccion: "componentes-basicos-pintura-ligante-disolvente-carga", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Los pigmentos: tipos, características y usos", seccion: "pigmentos-tipos-caracteristicas-usos", articulos: "Reglamento CLP" },
    { url: "", titulo: "Los aditivos: función y tipos habituales", seccion: "aditivos-funcion-tipos-habituales", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "componentes-basicos-pintura-ligante-disolvente-carga";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el ligante o resina de una pintura?", reverso: "El componente que, tras el secado o curado, forma la película sólida y continua de la pintura, aglutinando el resto de componentes (pigmentos, cargas) y determinando en gran medida propiedades como la adherencia, la flexibilidad y la resistencia química de la pintura" },
  { anverso: "¿Qué es el disolvente o vehículo de una pintura?", reverso: "El componente líquido que mantiene el ligante y los pigmentos en un estado que permite su aplicación (con la viscosidad adecuada), y que se evapora total o parcialmente durante el proceso de secado de la película" },
  { anverso: "¿Qué es una carga, dentro de la composición de una pintura?", reverso: "Un material inerte de partícula fina (como el carbonato cálcico o el talco) añadido a la pintura para modificar propiedades como el espesor de la película, la textura, el poder cubriente o el coste del producto, sin aportar color por sí mismo" },
  { anverso: "¿Qué diferencia existe entre una pintura de base acuosa y una de base disolvente, en cuanto a su vehículo?", reverso: "En la de base acuosa, el agua actúa como vehículo principal, secando por evaporación de agua y coalescencia de las partículas de resina; en la de base disolvente, un disolvente orgánico actúa como vehículo, evaporándose durante el secado y dejando la película de resina y pigmento" },
  { anverso: "¿Qué relación existe entre el tipo de ligante empleado y la resistencia química y mecánica final de una pintura?", reverso: "El ligante determina en gran medida esa resistencia: por ejemplo, un ligante epoxi o de poliuretano ofrece una resistencia mecánica y química muy superior a la de un ligante acrílico convencional, explicando el uso de cada familia en aplicaciones distintas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el ligante o resina de una pintura?", explicacion: "El componente que forma la película sólida y continua tras el secado.", dificultad: "facil", opciones: ["El componente que forma la película sólida tras el secado", "El componente que aporta exclusivamente color a la pintura", "El componente líquido que se evapora durante el secado", "Un material inerte que modifica el espesor de la película"], correcta: 0 },
  { enunciado: "¿Qué es el disolvente o vehículo de una pintura?", explicacion: "El componente líquido que permite la aplicación y se evapora durante el secado.", dificultad: "media", opciones: ["El componente líquido que permite la aplicación", "El componente que forma la película sólida final", "El componente que aporta exclusivamente color", "Un material inerte que aumenta el espesor de la película"], correcta: 0 },
  { enunciado: "¿Qué es una carga, dentro de la composición de una pintura?", explicacion: "Un material inerte que modifica propiedades como el espesor o la textura, sin aportar color.", dificultad: "media", opciones: ["Un material inerte que modifica propiedades sin aportar color", "El componente que forma la película sólida final", "El componente líquido que permite la aplicación", "El componente que aporta exclusivamente el color de la pintura"], correcta: 0 },
  { enunciado: "¿Qué diferencia el secado de una pintura de base acuosa del de una de base disolvente?", explicacion: "La acuosa seca por evaporación de agua y coalescencia; la de disolvente, por evaporación del disolvente orgánico.", dificultad: "dificil", opciones: ["Difieren en el vehículo que se evapora durante el secado", "Ambos tipos secan exactamente de la misma manera", "La de base acuosa nunca llega a secar por completo", "La de base disolvente no requiere ningún tipo de evaporación"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el tipo de ligante y la resistencia final de una pintura?", explicacion: "El ligante determina en gran medida la resistencia mecánica y química de la pintura.", dificultad: "media", opciones: ["El ligante determina en gran medida esa resistencia", "El ligante no influye en ningún caso en la resistencia final", "Solo el pigmento determina la resistencia de una pintura", "Solo el disolvente determina la resistencia de una pintura"], correcta: 0 },
]);

const S2 = "pigmentos-tipos-caracteristicas-usos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un pigmento, en la composición de una pintura?", reverso: "Una partícula sólida, finamente molida e insoluble en el vehículo de la pintura, que aporta color y, según su naturaleza, también opacidad (poder cubriente) y otras propiedades como la resistencia a la luz o la protección anticorrosiva" },
  { anverso: "¿Qué diferencia existe entre un pigmento y un colorante?", reverso: "El pigmento es insoluble en el vehículo de la pintura y permanece como partícula sólida dispersa; el colorante, en cambio, se disuelve en el medio en el que se incorpora, careciendo del poder cubriente característico de los pigmentos" },
  { anverso: "¿Qué son los pigmentos de dióxido de titanio (TiO₂)?", reverso: "Los pigmentos blancos más empleados en la industria de la pintura, valorados por su elevado poder cubriente y su alta reflectancia de la luz, que constituyen la base de la mayoría de las pinturas blancas y de muchos colores claros" },
  { anverso: "¿Qué es el poder cubriente de un pigmento?", reverso: "La capacidad de un pigmento para ocultar el color o el aspecto del soporte sobre el que se aplica la pintura, de manera que a mayor poder cubriente, menor número de capas resultan necesarias para lograr un acabado uniforme y opaco" },
  { anverso: "¿Por qué han ido sustituyéndose progresivamente en el mercado los pigmentos formulados con metales pesados (como el plomo o el cromo), pese a sus buenas propiedades técnicas?", reverso: "Por su clasificación como sustancias peligrosas conforme al Reglamento CLP y a la normativa de sustancias químicas, dada su toxicidad y su impacto sobre la salud y el medio ambiente, siendo sustituidos progresivamente por alternativas de menor peligrosidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un pigmento, en la composición de una pintura?", explicacion: "Una partícula sólida e insoluble que aporta color y opacidad.", dificultad: "facil", opciones: ["Una partícula sólida e insoluble que aporta color", "Un componente líquido que permite la aplicación", "El componente que forma la película sólida final", "Un material inerte que solo modifica el espesor"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un pigmento y un colorante?", explicacion: "El pigmento es insoluble y permanece como partícula dispersa; el colorante se disuelve.", dificultad: "media", opciones: ["El pigmento es insoluble; el colorante se disuelve en el medio", "Ambos términos son exactamente sinónimos en pintura", "El colorante siempre aporta mayor poder cubriente", "El pigmento siempre se disuelve por completo en el vehículo"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a los pigmentos de dióxido de titanio (TiO₂)?", explicacion: "Elevado poder cubriente y alta reflectancia de la luz, base de la mayoría de pinturas blancas.", dificultad: "media", opciones: ["Elevado poder cubriente y alta reflectancia de la luz", "Son exclusivos de las pinturas epoxi bicomponente", "Carecen por completo de poder cubriente", "Solo se emplean en pinturas de color oscuro"], correcta: 0 },
  { enunciado: "¿Qué es el poder cubriente de un pigmento?", explicacion: "La capacidad de ocultar el color o aspecto del soporte sobre el que se aplica.", dificultad: "media", opciones: ["La capacidad de ocultar el color o aspecto del soporte", "La capacidad de resistir la abrasión mecánica", "La capacidad de evaporarse durante el secado", "La capacidad de diluirse en agua o disolvente"], correcta: 0 },
  { enunciado: "¿Por qué se han sustituido progresivamente los pigmentos con metales pesados como el plomo?", explicacion: "Por su clasificación como sustancias peligrosas, dada su toxicidad para la salud y el medio ambiente.", dificultad: "dificil", opciones: ["Por su clasificación como sustancias peligrosas y su toxicidad", "Porque ofrecían un poder cubriente insuficiente", "Porque resultaban excesivamente baratos de producir", "Porque no existía ninguna alternativa técnica disponible"], correcta: 0 },
]);

const S3 = "aditivos-funcion-tipos-habituales";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un aditivo, en la composición de una pintura?", reverso: "Una sustancia incorporada en pequeña proporción a la formulación de la pintura para mejorar o modificar una propiedad específica (secado, conservación, viscosidad, resistencia a hongos), sin constituir el componente principal de la pintura" },
  { anverso: "¿Qué es un secante, como aditivo habitual en pinturas al aceite?", reverso: "Un aditivo (habitualmente sales metálicas) que acelera el proceso de secado oxidativo de la película, reduciendo el tiempo necesario para que la pintura seque al tacto y pueda manipularse o repintarse" },
  { anverso: "¿Qué es un conservante o biocida, como aditivo de una pintura al agua?", reverso: "Un aditivo que protege la pintura, tanto en el propio envase (evitando su degradación por microorganismos durante el almacenamiento) como en la película ya aplicada (evitando el desarrollo de hongos o algas sobre la superficie pintada)" },
  { anverso: "¿Qué es un espesante, como aditivo de una pintura?", reverso: "Un aditivo que aumenta la viscosidad de la pintura, mejorando propiedades como la resistencia al goteo durante la aplicación o el poder de relleno sobre pequeñas irregularidades del soporte" },
  { anverso: "¿Por qué es relevante para el Oficial Pintor conocer la función de los aditivos, más allá de la del ligante, el pigmento y el disolvente?", reverso: "Porque permite entender mejor el comportamiento de una pintura concreta durante su aplicación y su vida útil (tiempo de secado, resistencia a hongos, viscosidad), y facilita interpretar correctamente las indicaciones de su ficha técnica" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un aditivo, en la composición de una pintura?", explicacion: "Una sustancia en pequeña proporción que mejora una propiedad específica de la pintura.", dificultad: "facil", opciones: ["Una sustancia en pequeña proporción que mejora una propiedad", "El componente principal que aporta el color a la pintura", "El componente que forma la película sólida final", "El componente líquido que permite la aplicación"], correcta: 0 },
  { enunciado: "¿Qué función cumple un secante en una pintura al aceite?", explicacion: "Acelera el proceso de secado oxidativo de la película.", dificultad: "media", opciones: ["Acelera el proceso de secado de la película", "Aumenta la viscosidad de la pintura", "Aporta color adicional a la pintura", "Protege la pintura frente a hongos y algas"], correcta: 0 },
  { enunciado: "¿Qué función cumple un conservante o biocida en una pintura al agua?", explicacion: "Protege la pintura en el envase y en la película frente a microorganismos, hongos o algas.", dificultad: "media", opciones: ["Protege frente a microorganismos, hongos o algas", "Acelera el secado de la película de pintura", "Aumenta el poder cubriente de la pintura", "Reduce la viscosidad de la pintura al agua"], correcta: 0 },
  { enunciado: "¿Qué función cumple un espesante en una pintura?", explicacion: "Aumenta la viscosidad, mejorando la resistencia al goteo y el poder de relleno.", dificultad: "media", opciones: ["Aumenta la viscosidad de la pintura", "Acelera el secado de la película de pintura", "Aporta color adicional a la pintura", "Protege la pintura frente a hongos y algas"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer la función de los aditivos de una pintura?", explicacion: "Facilita entender su comportamiento e interpretar correctamente su ficha técnica.", dificultad: "dificil", opciones: ["Facilita entender su comportamiento y su ficha técnica", "No aporta ninguna utilidad práctica en el trabajo diario", "Solo resulta relevante para pinturas epoxi bicomponente", "Solo resulta relevante si la pintura es de color blanco"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-238 creado y vinculado como Tema 10 de Oficial Pintor General.");
