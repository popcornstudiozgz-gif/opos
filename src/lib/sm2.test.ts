import { describe, expect, it } from "vitest";
import { ESTADO_SM2_INICIAL, calcularSM2, calidadDesdeBinario } from "./sm2";

describe("calidadDesdeBinario", () => {
  it("traduce 'me la sé' a una calidad alta (4)", () => {
    expect(calidadDesdeBinario(true)).toBe(4);
  });

  it("traduce 'no me la sé' a una calidad baja (1)", () => {
    expect(calidadDesdeBinario(false)).toBe(1);
  });
});

describe("calcularSM2", () => {
  it("con calidad baja (<3), resetea repeticiones y fija el intervalo a 1 día, sin importar el historial previo", () => {
    const conHistorial = { repeticiones: 5, factorFacilidad: 2.5, intervaloDias: 30 };
    const resultado = calcularSM2(conHistorial, calidadDesdeBinario(false));
    expect(resultado.repeticiones).toBe(0);
    expect(resultado.intervaloDias).toBe(1);
  });

  it("la primera vez que se acierta, el intervalo es de 1 día", () => {
    const resultado = calcularSM2(ESTADO_SM2_INICIAL, calidadDesdeBinario(true));
    expect(resultado.repeticiones).toBe(1);
    expect(resultado.intervaloDias).toBe(1);
  });

  it("la segunda vez que se acierta seguido, el intervalo salta a 6 días", () => {
    const trasLaPrimera = calcularSM2(ESTADO_SM2_INICIAL, calidadDesdeBinario(true));
    const resultado = calcularSM2(trasLaPrimera, calidadDesdeBinario(true));
    expect(resultado.repeticiones).toBe(2);
    expect(resultado.intervaloDias).toBe(6);
  });

  it("a partir de la tercera vez, el intervalo crece multiplicando por el factor de facilidad", () => {
    let estado = calcularSM2(ESTADO_SM2_INICIAL, calidadDesdeBinario(true)); // rep 1 → 1 día
    estado = calcularSM2(estado, calidadDesdeBinario(true)); // rep 2 → 6 días
    const resultado = calcularSM2(estado, calidadDesdeBinario(true)); // rep 3 → 6 * factor
    expect(resultado.repeticiones).toBe(3);
    expect(resultado.intervaloDias).toBe(Math.round(6 * estado.factorFacilidad));
  });

  it("el factor de facilidad nunca baja del mínimo (1.3), aunque se falle muchas veces seguidas", () => {
    let estado = ESTADO_SM2_INICIAL;
    for (let i = 0; i < 20; i++) {
      estado = calcularSM2(estado, calidadDesdeBinario(false));
    }
    expect(estado.factorFacilidad).toBeGreaterThanOrEqual(1.3);
  });

  it("acertar repetidamente aumenta (o al menos no reduce) el factor de facilidad", () => {
    let estado = ESTADO_SM2_INICIAL;
    const factorInicial = estado.factorFacilidad;
    for (let i = 0; i < 5; i++) {
      estado = calcularSM2(estado, calidadDesdeBinario(true));
    }
    expect(estado.factorFacilidad).toBeGreaterThanOrEqual(factorInicial);
  });

  it("calcula proximaRevision como hoy + intervaloDias, en formato YYYY-MM-DD", () => {
    const resultado = calcularSM2(ESTADO_SM2_INICIAL, calidadDesdeBinario(false));
    const esperada = new Date();
    esperada.setDate(esperada.getDate() + 1); // calidad baja → intervalo de 1 día
    expect(resultado.proximaRevision).toBe(esperada.toISOString().split("T")[0]);
  });

  it("no muta el objeto de estado recibido", () => {
    const estado = { repeticiones: 1, factorFacilidad: 2.5, intervaloDias: 1 };
    const copia = { ...estado };
    calcularSM2(estado, calidadDesdeBinario(true));
    expect(estado).toEqual(copia);
  });
});
