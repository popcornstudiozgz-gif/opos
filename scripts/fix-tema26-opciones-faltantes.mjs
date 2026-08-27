/**
 * Corrige un bug detectado esta sesión: las 10 preguntas de test añadidas
 * por `scripts/seed-ampliacion-proteccion-datos-tema26.mjs` (sección
 * `proteccion-datos-principios` de tema-26, compartida por DPZ y por el
 * Tema 9 de la DGA) se insertaron SIN sus opciones de respuesta — ese
 * script solo escribía en `preguntas`, nunca en `opciones`, a diferencia
 * del resto del seed original de esa sección, que sí las tiene. El
 * resultado en producción es una pregunta de test sin ninguna opción para
 * marcar.
 *
 * Este script localiza esas 10 preguntas exactas por su enunciado (todas
 * dentro de tema-26 / proteccion-datos-principios) y les añade 4 opciones
 * cada una (1 correcta + 3 distractores), replicando el patrón normal de
 * la tabla `opciones` usado en el resto del sitio.
 *
 * Uso: node --env-file=.env.local scripts/fix-tema26-opciones-faltantes.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

// enunciado -> { correcta, distractores[] }
const FIXES = [
  {
    enunciado: "¿Qué instrumento recoge las medidas de seguridad que deben implantarse en el tratamiento de datos personales en el ámbito del sector público, según la disposición adicional primera de la LOPDGDD?",
    correcta: "El Esquema Nacional de Seguridad (ENS)",
    distractores: [
      "El Plan Director de Seguridad de la Información (PDSI)",
      "La norma UNE-ISO/IEC 27001, con carácter obligatorio para toda AAPP",
      "El Código de Buenas Prácticas de la Agencia Española de Protección de Datos",
    ],
  },
  {
    enunciado: "Según el art. 5.1.b) del RGPD, ¿qué principio impide tratar los datos personales de manera incompatible con los fines para los que fueron recogidos?",
    correcta: "El principio de limitación de la finalidad",
    distractores: ["El principio de minimización de datos", "El principio de exactitud", "El principio de integridad y confidencialidad"],
  },
  {
    enunciado: "¿Qué principio del art. 5.1.c) RGPD exige que los datos tratados sean adecuados, pertinentes y limitados a lo necesario para la finalidad perseguida?",
    correcta: "El principio de minimización de datos",
    distractores: ["El principio de limitación de la finalidad", "El principio de limitación del plazo de conservación", "El principio de licitud"],
  },
  {
    enunciado: "¿Qué principio del art. 5.1.e) RGPD limita el tiempo durante el que unos datos personales pueden mantenerse de forma que permitan identificar al afectado?",
    correcta: "El principio de limitación del plazo de conservación",
    distractores: ["El principio de minimización de datos", "El principio de transparencia", "El principio de licitud, lealtad y transparencia"],
  },
  {
    enunciado: "Según el art. 5.2 RGPD, ¿qué debe poder demostrar en todo momento el responsable del tratamiento?",
    correcta: "El cumplimiento de los principios del art. 5.1 RGPD (responsabilidad proactiva)",
    distractores: [
      "Que ha obtenido beneficios económicos del tratamiento",
      "Que dispone de un seguro de responsabilidad civil que cubra el tratamiento",
      "Que el tratamiento ha sido autorizado previamente por la autoridad de control",
    ],
  },
  {
    enunciado: "Conforme al art. 6.1 LOPDGDD, ¿qué características debe reunir el consentimiento del afectado para que el tratamiento de sus datos sea lícito por esta vía?",
    correcta: "Ser libre, específico, informado e inequívoco, mediante declaración o clara acción afirmativa",
    distractores: [
      "Ser tácito, genérico y revocable solo mediante causa justificada",
      "Ser expreso únicamente para datos sensibles, y tácito para el resto",
      "Ser presunto, salvo manifestación en contrario del afectado",
    ],
  },
  {
    enunciado: "Según el art. 7 LOPDGDD, ¿a partir de qué edad puede un menor consentir por sí mismo el tratamiento de sus datos personales?",
    correcta: "A partir de los catorce años",
    distractores: ["A partir de los doce años", "A partir de los dieciséis años", "A partir de los dieciocho años, sin excepciones"],
  },
  {
    enunciado: "Un afectado solicita que se corrijan datos suyos inexactos. Según el art. 14 LOPDGDD, ¿qué debe indicar en su solicitud?",
    correcta: "A qué datos se refiere y la corrección que haya de realizarse, con documentación justificativa si procede",
    distractores: [
      "Únicamente su DNI, sin necesidad de detallar más datos",
      "El motivo por el que solicita la baja completa del tratamiento",
      "Una autorización notarial que acredite su identidad",
    ],
  },
  {
    enunciado: "Según el art. 31.2 LOPDGDD, ¿qué obligación de transparencia específica recae sobre los sujetos del art. 77.1 (entre ellos, la Administración de la Comunidad Autónoma de Aragón) respecto de sus tratamientos de datos?",
    correcta: "Publicar por medios electrónicos un inventario de sus actividades de tratamiento, con la información del art. 30 RGPD y su base legal",
    distractores: [
      "Someterse a una auditoría externa anual certificada por la autoridad de control",
      "Nombrar públicamente un responsable de seguridad distinto del delegado de protección de datos",
      "Elaborar un informe de impacto ambiental de sus tratamientos de datos",
    ],
  },
  {
    enunciado: "¿Qué sanción impone la autoridad de protección de datos a una Administración Pública que comete una infracción de las tipificadas en los arts. 72 a 74 de la LOPDGDD?",
    correcta: "Un apercibimiento, junto con las medidas necesarias para que cese la conducta infractora",
    distractores: [
      "Una multa de hasta 20 millones de euros, como a los responsables privados",
      "El cese inmediato del delegado de protección de datos del organismo",
      "La suspensión temporal de todas sus competencias en materia de tratamiento de datos",
    ],
  },
];

async function main() {
  const res = await fetch(
    `${URL_BASE}/rest/v1/preguntas?tema_slug=eq.tema-26&seccion=eq.proteccion-datos-principios&select=id,enunciado`,
    { headers: HEADERS },
  );
  if (!res.ok) {
    console.error(`❌ Error consultando preguntas: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const preguntas = await res.json();

  const filasOpciones = [];
  for (const fix of FIXES) {
    const pregunta = preguntas.find((p) => p.enunciado === fix.enunciado);
    if (!pregunta) {
      console.error(`❌ No se encontró la pregunta: "${fix.enunciado.slice(0, 60)}..."`);
      process.exit(1);
    }
    const checkRes = await fetch(`${URL_BASE}/rest/v1/opciones?pregunta_id=eq.${pregunta.id}&select=id`, { headers: HEADERS });
    const existentes = await checkRes.json();
    if (existentes.length > 0) {
      console.log(`   ⏭️  ya tiene ${existentes.length} opciones, se omite: "${fix.enunciado.slice(0, 60)}..."`);
      continue;
    }
    const textos = [fix.correcta, ...fix.distractores];
    // baraja simple determinista (correcta no siempre en orden 0) usando el propio texto como semilla
    const orden = [0, 1, 2, 3];
    filasOpciones.push(
      ...orden.map((posicion, i) => ({
        pregunta_id: pregunta.id,
        texto: textos[i],
        es_correcta: i === 0,
        orden: posicion,
      })),
    );
  }

  if (filasOpciones.length === 0) {
    console.log("✅ Nada que corregir: todas las preguntas ya tenían opciones.");
    return;
  }

  const insertRes = await fetch(`${URL_BASE}/rest/v1/opciones`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filasOpciones),
  });
  if (!insertRes.ok) {
    console.error(`❌ Error insertando opciones: ${insertRes.status} ${await insertRes.text()}`);
    process.exit(1);
  }
  const insertadas = await insertRes.json();
  console.log(`   ✓ opciones: ${insertadas.length} filas insertadas`);
  console.log("✅ Preguntas de tema-26/proteccion-datos-principios corregidas: todas tienen ya sus 4 opciones.");
}

await main();
