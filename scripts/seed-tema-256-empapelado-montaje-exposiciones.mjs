/**
 * Crea tema-256: "Empapelado. Materiales. Herramientas. Cálculos.
 * Técnicas de Aplicación. Interpretación planos en montaje de
 * exposiciones culturales" — Tema 12 (numero=12, bloque-2) de Oficial
 * Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea
 * 1512): "Empapelado. Materiales. Herramientas. Cálculos. Técnicas de
 * Aplicación. Interpretación planos en montaje de exposiciones
 * culturales."
 *
 * Mismo contenido de empapelado ya desarrollado en tema-245 de Oficial
 * Pintor General (enunciado oficial idéntico en su primera parte),
 * ampliado aquí con la interpretación de planos para el montaje de
 * exposiciones culturales, propia del perfil de artes gráficas de esta
 * especialidad. Conocimiento técnico consolidado del oficio, sin ley
 * única — mismo criterio ya aplicado en el tema homólogo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-256-empapelado-montaje-exposiciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-256";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

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
  titulo: "Empapelado y montaje de exposiciones culturales",
  descripcion: "Materiales, herramientas, cálculos y técnicas de aplicación del papel pintado. Interpretación de planos para el montaje de exposiciones culturales en centros municipales.",
  contenido: "Desarrolla, por un lado, la técnica de empapelado ya introducida para la especialidad general de pintura (tipos de papel pintado, cálculo de rollos, técnicas de aplicación); y, por otro, la interpretación de planos aplicada al montaje de exposiciones culturales, propia del perfil de artes gráficas: la lectura de un plano de sala que indica la ubicación de paneles, vitrinas y elementos gráficos, y su traducción práctica al montaje real de una exposición en un centro cultural municipal.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipos de papel pintado y materiales para su colocación", seccion: "tipos-papel-pintado-materiales-grafica", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Herramientas, cálculo de rollos y técnicas de aplicación", seccion: "herramientas-calculo-tecnicas-aplicacion-papel", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Interpretación de planos en el montaje de exposiciones culturales", seccion: "interpretacion-planos-montaje-exposiciones", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "tipos-papel-pintado-materiales-grafica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un papel pintado vinílico?", reverso: "Un papel con una capa decorativa de PVC sobre un soporte de papel, de elevada resistencia a la humedad, a la limpieza y al desgaste, adecuado para zonas de mayor tránsito o para paneles expositivos de larga duración" },
  { anverso: "¿Qué es un papel pintado tejido no tejido (TNT), especialmente adecuado si el mismo panel va a reutilizarse en distintas exposiciones?", reverso: "Un papel dimensionalmente estable que se aplica encolando la pared o el panel, no el propio papel, facilitando tanto su colocación como su retirado posterior sin dañar el soporte, útil cuando un mismo elemento debe redecorarse entre exposiciones sucesivas" },
  { anverso: "¿Qué es la cola de empapelar?", reverso: "El adhesivo específico empleado para fijar el papel pintado a la pared o al panel, formulado según el tipo de papel, disponible en polvo para diluir en agua o ya preparada en pasta" },
  { anverso: "¿Qué es el raport de un papel pintado con dibujo repetitivo, dato relevante al calcular el material necesario para un montaje expositivo?", reverso: "La distancia a la que se repite el motivo decorativo del papel, que debe tenerse en cuenta al colocar tiras contiguas para que el dibujo case correctamente, e influye directamente en la cantidad de material necesaria para cubrir un panel o una pared" },
  { anverso: "¿Por qué puede resultar preferible un material distinto del papel pintado tradicional (como un vinilo adhesivo sobre panel rígido) para un panel expositivo de una exposición temporal?", reverso: "Porque un panel rígido revestido con vinilo resulta más manejable, transportable y reutilizable entre distintas exposiciones que una pared empapelada fija, siendo especialmente adecuado para montajes temporales o itinerantes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un papel pintado vinílico?", explicacion: "Un papel con capa de PVC resistente a humedad y desgaste.", dificultad: "facil", opciones: ["Un papel con capa de PVC resistente a humedad y desgaste", "Un papel exclusivo para pintar posteriormente", "Un adhesivo específico para fijar el papel a la pared", "Una herramienta específica para alisar el papel colocado"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un papel pintado TNT, útil si el panel se reutiliza entre exposiciones?", explicacion: "Es estable y se aplica encolando la pared o el panel, facilitando el retirado.", dificultad: "media", opciones: ["Es estable y se aplica encolando el panel, no el papel", "Se aplica siempre encolando directamente el propio papel", "Carece por completo de cualquier resistencia mecánica", "Solo puede emplearse en superficies exteriores"], correcta: 0 },
  { enunciado: "¿Qué es la cola de empapelar?", explicacion: "El adhesivo específico para fijar el papel pintado a la pared o al panel.", dificultad: "media", opciones: ["El adhesivo específico para fijar el papel al panel", "Un tipo de papel pintado de fibra de vidrio", "Una herramienta para alisar el papel colocado", "Un tipo de imprimación antioxidante para metal"], correcta: 0 },
  { enunciado: "¿Qué es el raport de un papel pintado con dibujo repetitivo?", explicacion: "La distancia a la que se repite el motivo decorativo del papel.", dificultad: "media", opciones: ["La distancia a la que se repite el motivo decorativo", "El precio por rollo de un papel pintado concreto", "La resistencia mecánica del papel pintado", "El tiempo de secado de la cola de empapelar"], correcta: 0 },
  { enunciado: "¿Por qué puede preferirse un panel rígido con vinilo frente al papel pintado tradicional en una exposición temporal?", explicacion: "Resulta más manejable, transportable y reutilizable entre distintas exposiciones.", dificultad: "dificil", opciones: ["Resulta más manejable, transportable y reutilizable", "El papel pintado siempre resulta más práctico en cualquier caso", "No existe ninguna diferencia real entre ambas opciones", "Solo resulta relevante si la exposición dura más de un año"], correcta: 0 },
]);

const S2 = "herramientas-calculo-tecnicas-aplicacion-papel";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una rasqueta de empapelador?", reverso: "Una herramienta de hoja ancha y flexible empleada para eliminar papel antiguo, o para alisar y eliminar burbujas de aire durante la colocación de un nuevo papel sobre una pared o un panel expositivo" },
  { anverso: "¿Cómo se calcula, de forma aproximada, la cantidad de rollos necesarios para empapelar un panel expositivo de dimensiones conocidas?", reverso: "Calculando la superficie total del panel, dividiéndola entre el rendimiento de cada rollo según su altura de aprovechamiento, y añadiendo un margen adicional para mermas, recortes y ajuste del raport si el papel tiene dibujo repetitivo" },
  { anverso: "¿Cuál es la secuencia general para colocar una tira de papel pintado sobre un panel expositivo?", reverso: "Medir y cortar la tira con el margen adicional necesario, aplicar la cola al papel o al panel según el tipo, colocar la tira alineada con ayuda de un nivel, alisar de arriba abajo eliminando burbujas de aire, y recortar el sobrante en los bordes" },
  { anverso: "¿Qué precaución debe adoptarse al empapelar una esquina de un panel modular de exposición, dado que estas esquinas no siempre son perfectamente rectas?", reverso: "Evitar doblar una única tira completa sobre la esquina, cortando la tira cerca de ella y solapando una segunda tira estrecha que cubra el resto, garantizando un acabado recto en el siguiente panel o pared" },
  { anverso: "¿Qué debería hacerse con el exceso de cola visible en la superficie del papel tras colocar una tira sobre un panel expositivo?", reverso: "Retirarlo de inmediato con una esponja húmeda limpia, antes de que la cola seque, evitando marcas visibles sobre la superficie decorativa del papel que resultarían especialmente notorias en un panel destinado a la vista del público" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una rasqueta de empapelador?", explicacion: "Una herramienta para eliminar papel antiguo o alisar y eliminar burbujas del nuevo.", dificultad: "facil", opciones: ["Una herramienta para retirar papel antiguo o alisar el nuevo", "Un adhesivo específico para fijar el papel pintado", "Un tipo de papel pintado de fibra de vidrio", "Una brocha de cerdas suaves para pintura decorativa"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la cantidad de rollos necesarios para empapelar un panel expositivo?", explicacion: "Superficie entre rendimiento por rollo, más un margen para mermas y raport.", dificultad: "media", opciones: ["Superficie entre rendimiento del rollo, más margen de mermas", "Únicamente el número de paneles a cubrir, sin más cálculo", "Únicamente el color del papel elegido, sin más cálculo", "Ningún cálculo resulta necesario en la práctica"], correcta: 0 },
  { enunciado: "¿Cuál es la secuencia general para colocar una tira de papel sobre un panel expositivo?", explicacion: "Medir y cortar, encolar, colocar alineada, alisar y recortar el sobrante.", dificultad: "media", opciones: ["Medir, cortar, encolar, colocar alineada, alisar y recortar", "Colocar directamente sin ninguna medición ni corte previo", "Alisar el panel antes de aplicar cualquier cola o papel", "Recortar el sobrante antes de colocar la tira en el panel"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al empapelar una esquina de un panel modular?", explicacion: "Evitar doblar una única tira completa; cortar cerca de la esquina y solapar una tira estrecha.", dificultad: "dificil", opciones: ["Evitar doblar una única tira completa sobre la esquina", "Doblar siempre una única tira completa sobre cualquier esquina", "Ninguna precaución adicional distinta del resto del panel", "Solo resulta relevante en esquinas exteriores, nunca interiores"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse con el exceso de cola visible tras colocar una tira en un panel expositivo?", explicacion: "Retirarlo de inmediato con una esponja húmeda antes de que seque.", dificultad: "media", opciones: ["Retirarlo de inmediato con una esponja húmeda", "Dejarlo secar y retirarlo después con un cúter", "Ignorarlo si no resulta visible a simple vista", "Aplicar más cola encima para disimularlo"], correcta: 0 },
]);

const S3 = "interpretacion-planos-montaje-exposiciones";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un plano de montaje de una exposición cultural?", reverso: "Un documento gráfico, elaborado por el comisariado o el equipo técnico de la exposición, que indica la ubicación exacta de paneles, vitrinas, obras y elementos gráficos dentro de la sala, con sus dimensiones y cotas de referencia" },
  { anverso: "¿Qué información básica debería identificar el Oficial Pintor Especialidad Gráfica en un plano de montaje antes de comenzar a instalar los elementos gráficos de una exposición?", reverso: "La ubicación exacta de cada panel o elemento gráfico dentro de la sala, sus dimensiones, la altura a la que debe colocarse cada pieza, y cualquier indicación específica sobre el orden de montaje o las distancias mínimas entre elementos" },
  { anverso: "¿Qué es una cota, en el contexto de un plano de montaje de exposición?", reverso: "Un valor numérico que indica una medida (longitud, altura, distancia) de un elemento representado en el plano, referida habitualmente a un punto o nivel de referencia fijo de la sala, como el suelo o una pared concreta" },
  { anverso: "¿Por qué es especialmente importante para el Oficial Pintor Especialidad Gráfica interpretar con precisión la altura indicada para cada panel gráfico en el plano de una exposición?", reverso: "Porque una altura incorrecta puede afectar a la accesibilidad visual del contenido para las personas visitantes (incluidas personas con movilidad reducida o en silla de ruedas), y a la coherencia estética del conjunto expositivo diseñado por el comisariado" },
  { anverso: "¿Qué debería hacer el Oficial si, al interpretar el plano de montaje, detecta una incoherencia entre las medidas indicadas y el espacio real disponible en la sala?", reverso: "Comunicar la incidencia al responsable o comisariado de la exposición antes de proceder al montaje, en lugar de decidir por su cuenta una solución que pudiera alterar el diseño previsto de la exposición" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un plano de montaje de una exposición cultural?", explicacion: "Un documento que indica la ubicación de paneles, vitrinas y elementos gráficos en la sala.", dificultad: "facil", opciones: ["Un documento que indica la ubicación de elementos en la sala", "Un documento exclusivamente contable de la exposición", "Un contrato administrativo de la exposición", "Un informe exclusivamente fotográfico de la sala"], correcta: 0 },
  { enunciado: "¿Qué información básica debería identificar el Oficial en un plano de montaje antes de instalar los elementos?", explicacion: "Ubicación, dimensiones, altura y orden de montaje de cada elemento gráfico.", dificultad: "media", opciones: ["Ubicación, dimensiones, altura y orden de montaje", "Únicamente el color de cada panel a instalar", "Únicamente el precio de cada elemento gráfico", "Únicamente la fecha de inauguración de la exposición"], correcta: 0 },
  { enunciado: "¿Qué es una cota en un plano de montaje de exposición?", explicacion: "Un valor numérico que indica una medida referida a un punto de referencia fijo de la sala.", dificultad: "media", opciones: ["Un valor numérico que indica una medida de referencia", "El nombre técnico asignado a cada panel de la exposición", "El color empleado para representar cada elemento", "La fecha de instalación prevista para cada elemento"], correcta: 0 },
  { enunciado: "¿Por qué es importante interpretar con precisión la altura indicada para cada panel gráfico?", explicacion: "Afecta a la accesibilidad visual del contenido y a la coherencia estética del conjunto.", dificultad: "dificil", opciones: ["Afecta a la accesibilidad visual y a la coherencia estética", "La altura de los paneles nunca resulta relevante en una exposición", "Solo resulta relevante en exposiciones de gran tamaño", "Solo resulta relevante si la sala tiene techos muy altos"], correcta: 0 },
  { enunciado: "¿Qué debería hacer el Oficial si detecta una incoherencia entre el plano y el espacio real de la sala?", explicacion: "Comunicarlo al responsable o comisariado antes de proceder al montaje.", dificultad: "media", opciones: ["Comunicarlo al responsable antes de proceder al montaje", "Decidir por su cuenta una solución sin comunicarlo a nadie", "Ignorar la incoherencia si el montaje puede realizarse igualmente", "Cancelar el montaje sin ninguna comunicación adicional"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-256 creado y vinculado como Tema 12 de Oficial Pintor Gráfica.");
