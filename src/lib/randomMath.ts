/*
 * Números aleatorios en Matemáticas (ADR-001 §7, D-6).
 * Función pura `generarOperandos(tipo, rango)` con los rangos del ADR.
 * La respuesta se CALCULA a partir de los operandos, no se almacena.
 * Cada repetición genera números distintos.
 *
 * Para la versión imprimible, generarOperandos produce una instancia concreta
 * que se CONGELA (se guardan los valores) para que la ficha y su hoja de
 * soluciones sean coherentes.
 *
 * Módulo puro y testeable. La fuente de aleatoriedad es inyectable (rng) para
 * poder fijar una semilla en tests.
 */

export type MathOpType =
  | "add" // sumas, resultado ≤ 9999
  | "sub" // restas, resultado ≥ 0
  | "times-tables" // factor 1-10 × factor 1-10
  | "multiply-one-digit" // 2-3 cifras × 1 cifra
  | "division-exact"; // divisor 1-9, cociente ≤ 99, resto 0

export interface GeneratedMath {
  type: MathOpType;
  a: number;
  b: number;
  /** símbolo de la operación para la plantilla (+, −, ×, ÷) */
  operator: "+" | "−" | "×" | "÷";
  /** respuesta calculada, nunca almacenada en el contenido */
  answer: number;
}

export type Rng = () => number; // [0, 1)

/** Entero aleatorio en [min, max] inclusivo. */
function randInt(min: number, max: number, rng: Rng): number {
  return min + Math.floor(rng() * (max - min + 1));
}

const ADD_MAX = 9999;

/**
 * Genera operandos válidos para `type` respetando los rangos del ADR.
 * `rng` por defecto es Math.random; se inyecta para tests / semilla imprimible.
 */
export function generarOperandos(
  type: MathOpType,
  rng: Rng = Math.random,
): GeneratedMath {
  switch (type) {
    case "add": {
      // sumandos 1..9999 con resultado ≤ 9999
      const a = randInt(1, ADD_MAX - 1, rng);
      const b = randInt(1, ADD_MAX - a, rng);
      return { type, a, b, operator: "+", answer: a + b };
    }
    case "sub": {
      // minuendo ≥ sustraendo → resultado ≥ 0
      const a = randInt(1, ADD_MAX, rng);
      const b = randInt(0, a, rng);
      return { type, a, b, operator: "−", answer: a - b };
    }
    case "times-tables": {
      const a = randInt(1, 10, rng);
      const b = randInt(1, 10, rng);
      return { type, a, b, operator: "×", answer: a * b };
    }
    case "multiply-one-digit": {
      const a = randInt(10, 999, rng); // 2-3 cifras
      const b = randInt(1, 9, rng); // 1 cifra
      return { type, a, b, operator: "×", answer: a * b };
    }
    case "division-exact": {
      // dividendo = divisor × cociente; divisor 1-9, cociente ≤ 99, resto 0
      const divisor = randInt(1, 9, rng);
      const cociente = randInt(1, 99, rng);
      const dividendo = divisor * cociente;
      return { type, a: dividendo, b: divisor, operator: "÷", answer: cociente };
    }
  }
}

/** Mapea un id de tema de mates a su tipo de operación generable, o null si no genera. */
const TOPIC_TO_OP: Record<string, MathOpType> = {
  "operations.add_carry": "add",
  "operations.sub_borrow": "sub",
  "operations.times_tables": "times-tables",
  "operations.multiply": "multiply-one-digit",
  "operations.division_intro": "division-exact",
};

export function opForTopic(topicId: string): MathOpType | null {
  return TOPIC_TO_OP[topicId] ?? null;
}
