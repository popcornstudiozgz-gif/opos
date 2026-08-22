/**
 * Algoritmo SM-2 (SuperMemo 2) para repetición espaciada.
 * `calidad` va de 0 a 5; esta app solo usa dos valores derivados del botón
 * binario "me la sé"/"no me la sé" (ver `calidadDesdeBinario`).
 */

export interface EstadoSM2 {
  repeticiones: number;
  factorFacilidad: number;
  intervaloDias: number;
}

export interface ResultadoSM2 extends EstadoSM2 {
  proximaRevision: string; // YYYY-MM-DD
}

const FACTOR_MINIMO = 1.3;

export const ESTADO_SM2_INICIAL: EstadoSM2 = {
  repeticiones: 0,
  factorFacilidad: 2.5,
  intervaloDias: 0,
};

export function calidadDesdeBinario(sabe: boolean): number {
  return sabe ? 4 : 1;
}

export function calcularSM2(estado: EstadoSM2, calidad: number): ResultadoSM2 {
  let { repeticiones, intervaloDias } = estado;
  let { factorFacilidad } = estado;

  if (calidad < 3) {
    repeticiones = 0;
    intervaloDias = 1;
  } else {
    repeticiones += 1;
    if (repeticiones === 1) intervaloDias = 1;
    else if (repeticiones === 2) intervaloDias = 6;
    else intervaloDias = Math.round(intervaloDias * factorFacilidad);
  }

  factorFacilidad = Math.max(
    FACTOR_MINIMO,
    factorFacilidad + (0.1 - (5 - calidad) * (0.08 + (5 - calidad) * 0.02))
  );

  const proxima = new Date();
  proxima.setDate(proxima.getDate() + intervaloDias);

  return {
    repeticiones,
    factorFacilidad: Math.round(factorFacilidad * 100) / 100,
    intervaloDias,
    proximaRevision: proxima.toISOString().split("T")[0],
  };
}
