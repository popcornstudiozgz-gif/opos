/**
 * Siembra una oposición "solo ficha" (sin temas vinculados — ver
 * `Oposicion.soloFicha` en src/lib/types.ts): la fila de `oposiciones` con
 * su programa oficial en `temario_oficial` (migración 0018) y la fila de
 * `convocatorias`. Usado por los `scripts/seed-ficha-*.mjs` (octubre 2026,
 * primera tanda de fichas para posicionamiento).
 *
 * El programa se lee de `scripts/data/temarios-oficiales/<slug>.json`
 * ([{ bloque, temas: [{ numero, titulo }] }]), extraído de las bases o del
 * programa oficial citados en cada script. Ambas escrituras son upsert:
 * relanzar un script actualiza la ficha sin duplicar nada, y nunca toca
 * `tema_oposicion` (cuando se siembre el material, la oposición deja sola de
 * ser ficha).
 *
 * Valida antes de escribir: programa no vacío y numerado sin saltos dentro
 * de cada bloque (o de forma continua entre bloques), y que el desglose de
 * plazas sume `plazas_total`.
 */
import { readFileSync } from "node:fs";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    const texto = await res.text();
    console.error(`❌ ${tabla}: ${res.status} ${texto}`);
    if (texto.includes("temario_oficial")) console.error("   ¿Falta aplicar supabase/migrations/0018_oposiciones_temario_oficial.sql?");
    process.exit(1);
  }
  return res.json();
}

function validar(oposicion, temario, convocatoria) {
  const errores = [];
  if (!temario.length || temario.some((b) => !b.temas.length)) errores.push("programa vacío o con un bloque sin temas");
  const numeros = temario.flatMap((b) => b.temas.map((t) => t.numero));
  const continuo = numeros.every((n, i) => n === i + 1);
  const porBloque = temario.every((b) => b.temas.every((t, i) => t.numero === i + 1));
  if (!continuo && !porBloque) errores.push("numeración del programa con saltos");
  if (temario.some((b) => b.temas.some((t) => !t.titulo || t.titulo.length < 10))) errores.push("algún tema sin título");
  const suma = convocatoria.desglose_plazas.reduce((s, d) => s + d.cantidad, 0);
  if (suma !== convocatoria.plazas_total) errores.push(`desglose de plazas (${suma}) ≠ plazas_total (${convocatoria.plazas_total})`);
  if (convocatoria.oposicion_slug !== oposicion.slug) errores.push("convocatoria.oposicion_slug no coincide");
  if (convocatoria.estado === "abierta" && !convocatoria.plazo_fin) errores.push("convocatoria abierta sin plazo_fin");
  if (errores.length) { console.error(`❌ Datos de ${oposicion.slug} no válidos:\n- ${errores.join("\n- ")}`); process.exit(1); }
}

export async function sembrarFicha({ oposicion, convocatoria }) {
  if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
  const ruta = new URL(`../data/temarios-oficiales/${oposicion.slug}.json`, import.meta.url);
  const temario = JSON.parse(readFileSync(ruta, "utf8"));
  validar(oposicion, temario, convocatoria);

  await upsert("oposiciones", [{ ...oposicion, activa: true, temario_oficial: temario }], "slug");
  await upsert("convocatorias", [convocatoria], "oposicion_slug");
  const temas = temario.reduce((n, b) => n + b.temas.length, 0);
  console.log(`✅ Ficha ${oposicion.slug}: ${temas} temas en ${temario.length} bloques, ${convocatoria.plazas_total} plazas (${convocatoria.estado}).`);
}

/** Datos comunes a las convocatorias de la DGA (Instituto Aragonés de Administración Pública). */
export const DGA = {
  organismo: "Gobierno de Aragón",
  organismo_slug: "gobierno-aragon",
  oep2026: { titulo: "Oferta de Empleo Público 2026 (Decreto 11/2026, BOA núm. 22, 3 de febrero de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1433527770303" },
  ficha: (codigo, clave) => ({ titulo: `Datos básicos de la convocatoria (código ${clave})`, url: `https://aplicaciones.aragon.es/oepc/oepc?dga_accion_app=mostrar_convocatoria&convocatoria_codigo=${codigo}` }),
  portal: { titulo: "Empleo público en Aragón: convocatorias", url: "https://www.aragon.es/-/empleo-publico-en-aragon-convocatorias" },
  /**
   * Ejercicios comunes a todas las clases de un mismo cuerpo, según las
   * bases de diciembre de 2025 (BOA núm. 247, de 23-12-2025, base 6).
   */
  pruebas: {
    /** Cuerpo de Funcionarios Técnicos (A2), bases 6.2-6.3 y 8.1-8.2. */
    tecnicosA2: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (teórico)",
        formato: "Test",
        duracion: "2 horas",
        opciones: "90 preguntas + 10 de reserva, 4 alternativas, 1 válida",
        detalle: "Se califica de 0 a 90 puntos y hay que sacar al menos 45. Cada acierto suma 1 punto, cada error resta 0,3333 y las preguntas en blanco no penalizan.",
      },
      {
        id: "segundo-ejercicio", icono: "📋", numero: 2,
        nombre: "Segundo ejercicio (práctico)",
        formato: "Preguntas cortas sobre supuestos + informe o dictamen",
        duracion: "3 horas",
        opciones: "20 preguntas cortas sobre un máximo de 3 supuestos",
        detalle: "Primera parte (0-20 puntos, mínimo 10): preguntas cortas sobre los supuestos. Segunda parte (0-10 puntos, mínimo 5): un informe, dictamen o análisis. Se pueden usar libros y textos propios, y un ordenador o tableta sin conexión a internet.",
      },
    ],
    /** Cuerpo Ejecutivo (C1), bases 6.1-6.3 y 8.1-8.2. */
    ejecutivoC1: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (teórico)",
        formato: "Test",
        duracion: "2 horas",
        opciones: "80 preguntas + 10 de reserva, 4 alternativas, 1 válida",
        detalle: "Se califica de 0 a 80 puntos y hay que sacar al menos 40. Cada acierto suma 1 punto, cada error resta 0,3333 y las preguntas en blanco no penalizan.",
      },
      {
        id: "segundo-ejercicio", icono: "📋", numero: 2,
        nombre: "Segundo ejercicio (práctico)",
        formato: "Test sobre supuestos prácticos",
        duracion: "2 horas",
        opciones: "40 preguntas + 5 de reserva, 4 alternativas, 1 válida",
        detalle: "Se hace el mismo día que el primero y solo se corrige a quien lo haya superado. Se califica de 0 a 40 puntos y hay que sacar al menos 20, con la misma penalización por error.",
      },
    ],
  },
};
