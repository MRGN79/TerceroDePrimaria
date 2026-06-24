import { describe, it, expect } from "vitest";
import {
  generarOperandos,
  opForTopic,
  type MathOpType,
  type Rng,
} from "./randomMath";

/*
 * Generadores de Matemáticas (ADR-001 §7, D-6).
 * Estrategia: ejecutar cada generador muchas veces con un RNG que barre todo el
 * rango [0,1) para forzar los extremos, y comprobar invariantes en cada muestra:
 *  - los rangos del ADR se respetan,
 *  - la respuesta calculada coincide siempre con los operandos generados.
 */

const ITERATIONS = 1000;

/** RNG determinista que recorre [0,1) en N pasos, incluyendo 0 (mínimos) y casi-1 (máximos). */
function sweepingRng(steps: number): Rng {
  let i = 0;
  return () => {
    const v = i / steps; // genera 0, 1/steps, ... < 1
    i = (i + 1) % steps;
    return v;
  };
}

/** Recorre el generador `iterations` veces y aplica `assert` a cada muestra. */
function forEachSample(
  type: MathOpType,
  iterations: number,
  assert: (s: ReturnType<typeof generarOperandos>) => void,
) {
  const rng = sweepingRng(97); // primo: combina con randInt para barrer rangos
  for (let n = 0; n < iterations; n++) {
    assert(generarOperandos(type, rng));
  }
}

describe("generarOperandos: invariantes comunes", () => {
  const allTypes: MathOpType[] = [
    "add",
    "sub",
    "times-tables",
    "multiply-one-digit",
    "division-exact",
  ];
  it("devuelve siempre el tipo pedido y operandos enteros", () => {
    for (const type of allTypes) {
      forEachSample(type, 200, (s) => {
        expect(s.type).toBe(type);
        expect(Number.isInteger(s.a)).toBe(true);
        expect(Number.isInteger(s.b)).toBe(true);
        expect(Number.isInteger(s.answer)).toBe(true);
      });
    }
  });
});

describe("add (sumas)", () => {
  it("el resultado NUNCA supera 9999 y la respuesta = a + b", () => {
    forEachSample("add", ITERATIONS, (s) => {
      expect(s.operator).toBe("+");
      expect(s.a).toBeGreaterThanOrEqual(1);
      expect(s.b).toBeGreaterThanOrEqual(1);
      expect(s.answer).toBe(s.a + s.b);
      expect(s.answer).toBeLessThanOrEqual(9999);
    });
  });

  it("incluso con rng al máximo, a + b <= 9999", () => {
    // rng cercano a 1 fuerza a = ADD_MAX-1 y b = ADD_MAX-a → resultado tope.
    const maxRng: Rng = () => 0.999999;
    for (let n = 0; n < 50; n++) {
      const s = generarOperandos("add", maxRng);
      expect(s.answer).toBeLessThanOrEqual(9999);
    }
  });
});

describe("sub (restas)", () => {
  it("el resultado NUNCA es negativo y la respuesta = a - b", () => {
    forEachSample("sub", ITERATIONS, (s) => {
      expect(s.operator).toBe("−");
      expect(s.b).toBeLessThanOrEqual(s.a); // minuendo >= sustraendo
      expect(s.answer).toBe(s.a - s.b);
      expect(s.answer).toBeGreaterThanOrEqual(0);
      expect(s.a).toBeLessThanOrEqual(9999);
    });
  });

  it("con rng=0 el sustraendo es 0 (resta trivial, no negativa)", () => {
    const zeroRng: Rng = () => 0;
    const s = generarOperandos("sub", zeroRng);
    expect(s.b).toBe(0);
    expect(s.answer).toBe(s.a);
    expect(s.answer).toBeGreaterThanOrEqual(0);
  });
});

describe("times-tables (tablas 1-10)", () => {
  it("ambos factores están en 1..10 y la respuesta = a * b", () => {
    forEachSample("times-tables", ITERATIONS, (s) => {
      expect(s.operator).toBe("×");
      expect(s.a).toBeGreaterThanOrEqual(1);
      expect(s.a).toBeLessThanOrEqual(10);
      expect(s.b).toBeGreaterThanOrEqual(1);
      expect(s.b).toBeLessThanOrEqual(10);
      expect(s.answer).toBe(s.a * s.b);
    });
  });
});

describe("multiply-one-digit (2-3 cifras × 1 cifra)", () => {
  it("a en 10..999, b en 1..9, respuesta = a * b", () => {
    forEachSample("multiply-one-digit", ITERATIONS, (s) => {
      expect(s.operator).toBe("×");
      expect(s.a).toBeGreaterThanOrEqual(10);
      expect(s.a).toBeLessThanOrEqual(999);
      expect(s.b).toBeGreaterThanOrEqual(1);
      expect(s.b).toBeLessThanOrEqual(9);
      expect(s.answer).toBe(s.a * s.b);
    });
  });
});

describe("division-exact (división exacta)", () => {
  it("resto 0, divisor 1-9, cociente <= 99, dividendo = divisor*cociente", () => {
    forEachSample("division-exact", ITERATIONS, (s) => {
      expect(s.operator).toBe("÷");
      const divisor = s.b;
      const cociente = s.answer;
      const dividendo = s.a;
      expect(divisor).toBeGreaterThanOrEqual(1);
      expect(divisor).toBeLessThanOrEqual(9);
      expect(cociente).toBeGreaterThanOrEqual(1);
      expect(cociente).toBeLessThanOrEqual(99);
      // resto exactamente 0:
      expect(dividendo % divisor).toBe(0);
      // y el cociente declarado es el correcto:
      expect(dividendo / divisor).toBe(cociente);
    });
  });
});

describe("opForTopic", () => {
  it("mapea los temas conocidos a su operación", () => {
    expect(opForTopic("operations.add_carry")).toBe("add");
    expect(opForTopic("operations.sub_borrow")).toBe("sub");
    expect(opForTopic("operations.times_tables")).toBe("times-tables");
    expect(opForTopic("operations.multiply")).toBe("multiply-one-digit");
    expect(opForTopic("operations.division_intro")).toBe("division-exact");
  });
  it("devuelve null para un tema sin generador", () => {
    expect(opForTopic("numbers.even_odd")).toBeNull();
    expect(opForTopic("inexistente")).toBeNull();
  });
});
