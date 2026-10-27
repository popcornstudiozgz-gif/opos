/**
 * Ficha (sin material de estudio) de Agente para la Protección de la
 * Naturaleza (APN) del Gobierno de Aragón: Cuerpo Ejecutivo, Escala
 * Ejecutiva de Agentes para la Protección de la Naturaleza (C1),
 * convocatoria 25/0107.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), que convoca todas las clases del
 *   Cuerpo Ejecutivo (la misma que usa seed-convocatoria-administrativo-
 *   dga.mjs): base 1.3 (dos ejercicios y, solo para esta escala, una prueba
 *   física), 1.5, 2.1.e (Bachiller, Técnico o equivalente), 3.5 (16,94 €),
 *   6.1-6.3 (test de 80 + 10 en dos horas y test práctico de 40 + 5 en dos
 *   horas, el mismo día), 6.4 (marcha de 8 km con 8 kg en 60 minutos los
 *   hombres y con 6 kg en 66 minutos las mujeres, apto o no apto), 8 (0-80
 *   mínimo 40; 0-40 mínimo 20; error −0,3333), 10.4 (curso de 20 horas),
 *   letra «Q»; anexo I: 55 plazas (2 reservadas a víctimas de terrorismo).
 * - Programa: Anexo XXX de la Resolución de 25-11-2025 (5 temas comunes +
 *   30 específicos), PDF en aragon.es.
 * - Ficha oficial 25/0107 en aplicaciones.aragon.es/oepc: plazo del
 *   24-12-2025 al 23-01-2026; 53 de turno libre + 2; en observaciones,
 *   «se requiere carnet de conducir clase B» (no figura en el texto de las
 *   bases leído; se cita como dato de la ficha oficial).
 * - Decreto 11/2026 (OEP 2026), anexo I: 14 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-agente-proteccion-naturaleza-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "agente-proteccion-naturaleza-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Agente para la Protección de la Naturaleza",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "agente-proteccion-naturaleza",
    descripcion_corta: "Oposición de Agente para la Protección de la Naturaleza (APN, C1) del Gobierno de Aragón: plazas, requisitos, examen, prueba física y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo Ejecutivo de la Administración de la Comunidad Autónoma de Aragón, Escala Ejecutiva de Agentes para la Protección de la Naturaleza (subgrupo C1), los agentes forestales y medioambientales de Aragón. Se exige Bachiller o Técnico. El programa tiene 35 temas —5 comunes y 30 específicos: montes y gestión forestal, vías pecuarias, incendios forestales y PROCINFO, caza y pesca, aguas, espacios naturales protegidos y Red Natura 2000, especies amenazadas, patrimonio, evaluación ambiental, residuos o cartografía—, y el examen son dos test y una marcha de 8 km con carga.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0107)",
    organismo: DGA.organismo,
    plaza: "Agentes para la Protección de la Naturaleza — Cuerpo Ejecutivo de la Administración General de la Comunidad Autónoma de Aragón, Escala Ejecutiva de Agentes para la Protección de la Naturaleza (subgrupo C1)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre (dos test y una prueba física, las tres eliminatorias), seguida de un curso de formación selectivo (en línea, 20 horas, apto o no apto)",
    requisito_titulacion: "Título de Bachiller, Técnico o equivalente. La ficha oficial de la convocatoria indica además que se requiere carnet de conducir de clase B.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 16,94 €. La Oferta de Empleo Público de 2026 prevé 14 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 55,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 53 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 2 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo Ejecutivo (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427868650404" },
      { titulo: "Programa de materias de Agentes para la Protección de la Naturaleza (Anexo XXX de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/agentes-para-la-proteccion-de-la-naturaleza-pdf-1" },
      DGA.ficha("250107", "25/0107"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
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
      {
        id: "prueba-fisica", icono: "🥾", numero: 3,
        nombre: "Prueba de aptitud física",
        formato: "Marcha por terreno variado con mochila",
        duracion: "60 minutos (hombres) / 66 minutos (mujeres)",
        opciones: "Apto o no apto",
        detalle: "Solo para quienes superan los dos test: recorrer 8 kilómetros con una carga de 8 kg los hombres y de 6 kg las mujeres. Quien no la supera queda fuera del proceso.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
