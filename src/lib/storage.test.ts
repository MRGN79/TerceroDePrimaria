// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  STORAGE_KEY,
  SCHEMA_VERSION,
  defaultState,
  parseState,
  loadState,
  saveState,
  isStorageAvailable,
  type PersistedState,
} from "./storage";

/*
 * Persistencia local (ADR-001 §4). Lectura defensiva: ante ausencia, corrupción
 * o schemaVersion desconocida, arranca con un estado por defecto limpio y nunca
 * lanza excepción. Si localStorage no está disponible, degrada en silencio.
 */

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
afterEach(() => {
  localStorage.clear();
});

describe("defaultState", () => {
  it("devuelve un estado limpio y coherente con schemaVersion actual", () => {
    const s = defaultState();
    expect(s.schemaVersion).toBe(SCHEMA_VERSION);
    expect(s.preferences.language).toBeNull();
    expect(s.preferences.sound).toBe(true);
    expect(s.streak).toEqual({ current: 0, longest: 0, lastPlayedDate: null });
    expect(s.stars.total).toBe(0);
    expect(s.badges.unlocked).toEqual({});
    expect(s.progress.correctByTopic).toEqual({});
    expect(s.progress.subjectsTried).toEqual([]);
  });
});

describe("parseState — lectura defensiva", () => {
  it("descarta valores no-objeto (null, array, string, number)", () => {
    expect(parseState(null)).toBeNull();
    expect(parseState([])).toBeNull();
    expect(parseState("texto")).toBeNull();
    expect(parseState(42)).toBeNull();
  });

  it("descarta schemaVersion desconocida (sin migraciones aún)", () => {
    expect(parseState({ schemaVersion: 999 })).toBeNull();
    expect(parseState({ schemaVersion: "1" })).toBeNull();
    expect(parseState({})).toBeNull(); // sin schemaVersion
  });

  it("fusiona un estado parcial válido con los valores por defecto", () => {
    const parsed = parseState({
      schemaVersion: SCHEMA_VERSION,
      stars: { total: 30 },
      streak: { current: 2, longest: 5, lastPlayedDate: "2026-06-24" },
    });
    expect(parsed).not.toBeNull();
    expect(parsed!.stars.total).toBe(30);
    expect(parsed!.streak.current).toBe(2);
    // lo no provisto cae a default:
    expect(parsed!.preferences.sound).toBe(true);
    expect(parsed!.progress.subjectsTried).toEqual([]);
  });

  it("ignora campos con tipos corruptos y usa el default de ese campo", () => {
    const parsed = parseState({
      schemaVersion: SCHEMA_VERSION,
      stars: { total: "muchas" }, // tipo inválido
      preferences: { language: "fr", sound: "no" }, // idioma no soportado, sound no-boolean
      progress: { correctByTopic: { math: "x" }, subjectsTried: [1, 2] },
      badges: { unlocked: { a: 5 } }, // valor no-string
    });
    expect(parsed!.stars.total).toBe(0);
    expect(parsed!.preferences.language).toBeNull(); // "fr" no soportado → default
    expect(parsed!.preferences.sound).toBe(true);
    expect(parsed!.progress.correctByTopic).toEqual({}); // valores no numéricos descartados
    expect(parsed!.progress.subjectsTried).toEqual([]); // no todos string → descartado
    expect(parsed!.badges.unlocked).toEqual({});
  });

  it("acepta idiomas soportados en/es", () => {
    expect(parseState({ schemaVersion: SCHEMA_VERSION, preferences: { language: "es" } })!
      .preferences.language).toBe("es");
    expect(parseState({ schemaVersion: SCHEMA_VERSION, preferences: { language: "en" } })!
      .preferences.language).toBe("en");
  });
});

describe("loadState", () => {
  it("sin datos en localStorage devuelve el estado por defecto", () => {
    expect(loadState()).toEqual(defaultState());
  });

  it("JSON corrupto se descarta y arranca limpio (no lanza)", () => {
    localStorage.setItem(STORAGE_KEY, "{ esto no es json válido ");
    expect(() => loadState()).not.toThrow();
    expect(loadState()).toEqual(defaultState());
  });

  it("JSON válido pero con schemaVersion desconocida arranca limpio", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99, stars: { total: 5 } }));
    expect(loadState()).toEqual(defaultState());
  });

  it("carga un estado válido previamente guardado (round-trip)", () => {
    const s = defaultState();
    s.stars.total = 12;
    s.streak = { current: 3, longest: 7, lastPlayedDate: "2026-06-25" };
    saveState(s);
    expect(loadState()).toEqual(s);
  });
});

describe("saveState / disponibilidad", () => {
  it("isStorageAvailable es true en jsdom", () => {
    expect(isStorageAvailable()).toBe(true);
  });

  it("saveState no lanza si setItem falla (almacenamiento lleno)", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("QuotaExceededError");
    });
    const s = defaultState();
    expect(() => saveState(s)).not.toThrow();
    spy.mockRestore();
  });

  it("si localStorage no está disponible, loadState degrada a default sin lanzar", () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    // Simula un entorno donde el acceso a localStorage lanza (modo privado estricto).
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("acceso denegado");
      },
    });
    let result: PersistedState | null = null;
    expect(() => {
      result = loadState();
    }).not.toThrow();
    expect(result).toEqual(defaultState());
    expect(isStorageAvailable()).toBe(false);
    expect(() => saveState(defaultState())).not.toThrow();
    // restaura
    if (original) Object.defineProperty(globalThis, "localStorage", original);
  });
});
