import { describe, expect, it } from "vitest";
import { hoyEnEspana, plazoVencido } from "./plazos";

describe("plazoVencido", () => {
  it("sin plazo_fin nunca vence (manda el estado manual)", () => {
    expect(plazoVencido(null)).toBe(false);
    expect(plazoVencido(undefined)).toBe(false);
  });

  it("el último día del plazo sigue abierto hasta medianoche en España", () => {
    // 5-10-2026 23:30 en Madrid (UTC+2) = 21:30 UTC
    expect(plazoVencido("2026-10-05", new Date("2026-10-05T21:30:00Z"))).toBe(false);
  });

  it("vence al empezar el día siguiente en España, aunque en UTC aún sea la víspera", () => {
    // 6-10-2026 00:30 en Madrid = 5-10-2026 22:30 UTC
    expect(plazoVencido("2026-10-05", new Date("2026-10-05T22:30:00Z"))).toBe(true);
  });
});

describe("hoyEnEspana", () => {
  it("devuelve YYYY-MM-DD en hora peninsular", () => {
    expect(hoyEnEspana(new Date("2026-01-01T23:30:00Z"))).toBe("2026-01-02");
  });
});
