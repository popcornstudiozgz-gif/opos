/**
 * Cierre automático del plazo de instancias. `convocatorias.estado` se fija
 * a mano, pero si además la fila lleva `plazo_fin` (último día del plazo,
 * inclusive), una convocatoria 'abierta' pasa a contar como 'cerrada' en
 * cuanto ese día termina — sin tener que acordarse de lanzar un script el
 * día del cierre (pasó con la CONV 4/2026: cerró el 5-10-2026 y la home
 * siguió mostrándola como abierta).
 */

/** Fecha de hoy en Zaragoza (hora peninsular), formato YYYY-MM-DD. */
export function hoyEnEspana(ahora: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(ahora);
}

/** `true` si hay `plazoFin` y ese día ya ha terminado (en hora peninsular). */
export function plazoVencido(plazoFin: string | null | undefined, ahora: Date = new Date()): boolean {
  if (!plazoFin) return false;
  return hoyEnEspana(ahora) > plazoFin;
}
