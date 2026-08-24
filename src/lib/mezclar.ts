/**
 * Baraja Fisher-Yates: devuelve una copia nueva de `arr` con el mismo
 * contenido en orden aleatorio (no muta el array original).
 *
 * Se usa para no repetir siempre el mismo orden de preguntas (test,
 * simulacro, casos prácticos) ni el mismo orden de opciones dentro de una
 * pregunta.
 */
export function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
