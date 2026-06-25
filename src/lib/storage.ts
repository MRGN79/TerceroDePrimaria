/*
 * Persistencia local (ADR-001 §4): única clave raíz versionada "tdp:v1".
 * Lectura defensiva: ante ausencia, corrupción o schemaVersion desconocida,
 * se descarta y se arranca con un estado por defecto limpio. Nunca rompe la app.
 * Si localStorage no está disponible (modo privado, almacenamiento lleno), la
 * app funciona en memoria y degrada sin error.
 *
 * Módulo aislado y testeable: no depende de React ni de i18n.
 */

export const STORAGE_KEY = "tdp:v1";
export const SCHEMA_VERSION = 1 as const;

export type Language = "en" | "es";

export interface PersistedState {
  schemaVersion: typeof SCHEMA_VERSION;
  preferences: {
    language: Language | null; // null = no elegido explícitamente (sigue detección)
    sound: boolean;
    reducedMotion: boolean;
  };
  profile: {
    avatarId: string | null;
    nicknameId: string | null;
  };
  streak: {
    current: number;
    longest: number;
    lastPlayedDate: string | null; // "YYYY-MM-DD" en hora local
  };
  stars: {
    total: number;
  };
  badges: {
    /** id de medalla → fecha de desbloqueo "YYYY-MM-DD" */
    unlocked: Record<string, string>;
  };
  dailyGoal: {
    lastDoneDate: string | null; // "YYYY-MM-DD"
  };
  progress: {
    /** topicId → número de aciertos acumulados */
    correctByTopic: Record<string, number>;
    /** ids de materia probadas al menos una vez */
    subjectsTried: string[];
    /** ids de ejercicios estáticos respondidos correctamente (excluidos del pool hasta agotar la asignatura) */
    correctExerciseIds: string[];
  };
}

export function defaultState(): PersistedState {
  return {
    schemaVersion: SCHEMA_VERSION,
    preferences: { language: null, sound: true, reducedMotion: false },
    profile: { avatarId: null, nicknameId: null },
    streak: { current: 0, longest: 0, lastPlayedDate: null },
    stars: { total: 0 },
    badges: { unlocked: {} },
    dailyGoal: { lastDoneDate: null },
    progress: { correctByTopic: {}, subjectsTried: [], correctExerciseIds: [] },
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Valida y normaliza la forma del estado leído. Devuelve un estado completo y
 * coherente, fusionando lo que sea válido con los valores por defecto. Si el
 * dato no es ni siquiera un objeto o su schemaVersion es desconocida e
 * inmigrable, devuelve null (el llamante usa el estado por defecto).
 */
export function parseState(raw: unknown): PersistedState | null {
  if (!isPlainObject(raw)) return null;
  if (raw.schemaVersion !== SCHEMA_VERSION) return null; // sin migraciones aún

  const base = defaultState();
  const prefs = isPlainObject(raw.preferences) ? raw.preferences : {};
  const profile = isPlainObject(raw.profile) ? raw.profile : {};
  const streak = isPlainObject(raw.streak) ? raw.streak : {};
  const stars = isPlainObject(raw.stars) ? raw.stars : {};
  const badges = isPlainObject(raw.badges) ? raw.badges : {};
  const dailyGoal = isPlainObject(raw.dailyGoal) ? raw.dailyGoal : {};
  const progress = isPlainObject(raw.progress) ? raw.progress : {};

  const lang = prefs.language;
  const unlocked =
    isPlainObject(badges.unlocked) &&
    Object.values(badges.unlocked).every((v) => typeof v === "string")
      ? (badges.unlocked as Record<string, string>)
      : {};
  const correctByTopic =
    isPlainObject(progress.correctByTopic) &&
    Object.values(progress.correctByTopic).every((v) => typeof v === "number")
      ? (progress.correctByTopic as Record<string, number>)
      : {};
  const subjectsTried =
    Array.isArray(progress.subjectsTried) &&
    progress.subjectsTried.every((v) => typeof v === "string")
      ? (progress.subjectsTried as string[])
      : [];
  const correctExerciseIds =
    Array.isArray(progress.correctExerciseIds) &&
    progress.correctExerciseIds.every((v) => typeof v === "string")
      ? (progress.correctExerciseIds as string[])
      : [];

  return {
    schemaVersion: SCHEMA_VERSION,
    preferences: {
      language: lang === "en" || lang === "es" ? lang : base.preferences.language,
      sound: typeof prefs.sound === "boolean" ? prefs.sound : base.preferences.sound,
      reducedMotion:
        typeof prefs.reducedMotion === "boolean"
          ? prefs.reducedMotion
          : base.preferences.reducedMotion,
    },
    profile: {
      avatarId: typeof profile.avatarId === "string" ? profile.avatarId : null,
      nicknameId: typeof profile.nicknameId === "string" ? profile.nicknameId : null,
    },
    streak: {
      current: typeof streak.current === "number" ? streak.current : 0,
      longest: typeof streak.longest === "number" ? streak.longest : 0,
      lastPlayedDate:
        typeof streak.lastPlayedDate === "string" ? streak.lastPlayedDate : null,
    },
    stars: {
      total: typeof stars.total === "number" ? stars.total : 0,
    },
    badges: { unlocked },
    dailyGoal: {
      lastDoneDate:
        typeof dailyGoal.lastDoneDate === "string" ? dailyGoal.lastDoneDate : null,
    },
    progress: { correctByTopic, subjectsTried, correctExerciseIds },
  };
}

function getStorage(): Storage | null {
  try {
    const ls = globalThis.localStorage;
    if (!ls) return null;
    // Prueba de escritura: algunos navegadores en modo privado lanzan al escribir.
    const probe = "__tdp_probe__";
    ls.setItem(probe, "1");
    ls.removeItem(probe);
    return ls;
  } catch {
    return null;
  }
}

export function loadState(): PersistedState {
  const ls = getStorage();
  if (!ls) return defaultState();
  try {
    const raw = ls.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = parseState(JSON.parse(raw) as unknown);
    return parsed ?? defaultState();
  } catch {
    return defaultState();
  }
}

export function saveState(state: PersistedState): void {
  const ls = getStorage();
  if (!ls) return; // degrada en silencio: la sesión sigue en memoria
  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // almacenamiento lleno o restringido: no romper la experiencia del niño
  }
}

export function isStorageAvailable(): boolean {
  return getStorage() !== null;
}
