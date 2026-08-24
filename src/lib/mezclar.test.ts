import { describe, expect, it } from "vitest";
import { mezclar } from "./mezclar";

describe("mezclar", () => {
  it("devuelve un array con la misma longitud", () => {
    const original = [1, 2, 3, 4, 5];
    expect(mezclar(original)).toHaveLength(original.length);
  });

  it("es una permutación: mismos elementos, ni de más ni de menos", () => {
    const original = ["a", "b", "c", "d", "e", "f"];
    const resultado = mezclar(original);
    expect([...resultado].sort()).toEqual([...original].sort());
  });

  it("no muta el array original", () => {
    const original = [1, 2, 3, 4, 5];
    const copia = [...original];
    mezclar(original);
    expect(original).toEqual(copia);
  });

  it("con un array vacío, devuelve un array vacío", () => {
    expect(mezclar([])).toEqual([]);
  });

  it("con un solo elemento, lo devuelve igual", () => {
    expect(mezclar([42])).toEqual([42]);
  });

  it("con muchos elementos, produce órdenes distintos entre llamadas (no es determinista)", () => {
    const original = Array.from({ length: 30 }, (_, i) => i);
    const resultados = new Set(
      Array.from({ length: 5 }, () => mezclar(original).join(","))
    );
    // Con 30 elementos, la probabilidad de que 5 barajados salgan
    // idénticos por azar es astronómicamente baja: si esto falla, es que
    // el algoritmo no está barajando de verdad.
    expect(resultados.size).toBeGreaterThan(1);
  });
});
