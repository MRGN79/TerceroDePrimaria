import { describe, it, expect } from "vitest";
import {
  advanceStreak,
  streakDisplayVariant,
  localDateKey,
  dayDiff,
  type StreakState,
} from "./streak";

/*
 * Racha diaria (ADR-001 §4). Todas las fechas se INYECTAN (todayKey); no se usa
 * el reloj real del sistema, para que el test sea determinista.
 */

const empty: StreakState = { current: 0, longest: 0, lastPlayedDate: null };

describe("dayDiff", () => {
  it("0 para el mismo día", () => {
    expect(dayDiff("2026-06-25", "2026-06-25")).toBe(0);
  });
  it("1 para días consecutivos, también cruzando mes y año", () => {
    expect(dayDiff("2026-06-25", "2026-06-26")).toBe(1);
    expect(dayDiff("2026-01-31", "2026-02-01")).toBe(1);
    expect(dayDiff("2025-12-31", "2026-01-01")).toBe(1);
  });
  it("negativo si la segunda fecha es anterior (reloj retrasado)", () => {
    expect(dayDiff("2026-06-25", "2026-06-24")).toBe(-1);
  });
});

describe("localDateKey", () => {
  it("formatea como YYYY-MM-DD con padding, en hora local", () => {
    // Construcción con componentes locales para evitar dependencia de TZ.
    const d = new Date(2026, 0, 5); // 5 enero 2026, local
    expect(localDateKey(d)).toBe("2026-01-05");
  });
});

describe("advanceStreak", () => {
  it("primer uso: current = 1, longest = 1, outcome 'first'", () => {
    const { state, outcome } = advanceStreak(empty, "2026-06-25");
    expect(outcome).toBe("first");
    expect(state.current).toBe(1);
    expect(state.longest).toBe(1);
    expect(state.lastPlayedDate).toBe("2026-06-25");
  });

  it("mismo día: la racha NO cambia, outcome 'same-day'", () => {
    const prev: StreakState = { current: 4, longest: 9, lastPlayedDate: "2026-06-25" };
    const { state, outcome } = advanceStreak(prev, "2026-06-25");
    expect(outcome).toBe("same-day");
    expect(state).toEqual(prev);
  });

  it("día siguiente: current += 1 y actualiza longest si procede", () => {
    const prev: StreakState = { current: 4, longest: 4, lastPlayedDate: "2026-06-25" };
    const { state, outcome } = advanceStreak(prev, "2026-06-26");
    expect(outcome).toBe("incremented");
    expect(state.current).toBe(5);
    expect(state.longest).toBe(5);
    expect(state.lastPlayedDate).toBe("2026-06-26");
  });

  it("día siguiente: NO baja longest si la mejor racha histórica era mayor", () => {
    const prev: StreakState = { current: 2, longest: 10, lastPlayedDate: "2026-06-25" };
    const { state } = advanceStreak(prev, "2026-06-26");
    expect(state.current).toBe(3);
    expect(state.longest).toBe(10);
  });

  it("hueco de >1 día: la racha se rompe a 1, conserva longest, outcome 'reset'", () => {
    const prev: StreakState = { current: 6, longest: 6, lastPlayedDate: "2026-06-20" };
    const { state, outcome } = advanceStreak(prev, "2026-06-25"); // 5 días después
    expect(outcome).toBe("reset");
    expect(state.current).toBe(1);
    expect(state.longest).toBe(6); // se conserva la mejor racha
    expect(state.lastPlayedDate).toBe("2026-06-25");
  });

  it("fecha futura (reloj cambiado hacia atrás en lastPlayed) se trata como reset", () => {
    const prev: StreakState = { current: 3, longest: 3, lastPlayedDate: "2026-06-30" };
    const { state, outcome } = advanceStreak(prev, "2026-06-25");
    expect(outcome).toBe("reset");
    expect(state.current).toBe(1);
  });
});

describe("streakDisplayVariant", () => {
  it("'empty' si nunca jugó o current 0", () => {
    expect(streakDisplayVariant(empty, "2026-06-25")).toBe("empty");
    expect(
      streakDisplayVariant({ current: 0, longest: 5, lastPlayedDate: "2026-06-20" }, "2026-06-25"),
    ).toBe("empty");
  });
  it("'normal' si jugó hoy o ayer", () => {
    expect(
      streakDisplayVariant({ current: 3, longest: 3, lastPlayedDate: "2026-06-25" }, "2026-06-25"),
    ).toBe("normal");
    expect(
      streakDisplayVariant({ current: 3, longest: 3, lastPlayedDate: "2026-06-24" }, "2026-06-25"),
    ).toBe("normal");
  });
  it("'reset' si el último día jugado fue hace más de 1 día", () => {
    expect(
      streakDisplayVariant({ current: 3, longest: 3, lastPlayedDate: "2026-06-22" }, "2026-06-25"),
    ).toBe("reset");
  });
});
