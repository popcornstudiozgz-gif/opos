/**
 * Vincula el tema canónico tema-25 ("La Ley de Prevención de Riesgos
 * Laborales", ya usado por Auxiliar Administrativo DPZ y DGA) como Tema 38
 * de Bombero/a Conductor/a: "Normativa de prevención de riesgos laborales.
 * Ley 31/95 de 8 de noviembre de prevención de riesgos laborales: Objeto,
 * ámbito de aplicación y definiciones. Derechos y obligaciones."
 *
 * tema-25 cubre exactamente esos puntos (arts. 2-4, 14-15, 19 y 29 de la Ley
 * 31/1995, BOE-A-1995-24292, ya verificada), así que se reutiliza completo
 * sin duplicar contenido — mismo patrón que los temas 1, 2, 4 y 6 de esta
 * oposición. No se toca el tema canónico.
 *
 * Uso: node --env-file=.env.local scripts/fix-bombero-reusa-tema-25-prl.mjs
 */
import { BOMBERO } from "./lib/sembrar-tema.mjs";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const r = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?on_conflict=tema_slug,oposicion_slug`, {
  method: "POST",
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  },
  body: JSON.stringify([{
    tema_slug: "tema-25",
    oposicion_slug: BOMBERO.oposicion,
    bloque_id: BOMBERO.bloqueParteII,
    numero: 38,
    orden: 38,
    es_premium: false,
    publicado: true,
    secciones_incluidas: null,
  }]),
});
if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
console.log("✅ tema-25 vinculado como Tema 38 de", BOMBERO.oposicion);
