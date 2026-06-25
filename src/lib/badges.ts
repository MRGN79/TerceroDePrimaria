/*
 * Medallas / insignias (gamificación §4). Reglas puras de desbloqueo evaluadas
 * tras consolidar una sesión. Cada medalla declara su condición sobre el estado
 * persistido. Módulo puro y testeable.
 *
 * El catálogo aquí define ids estables; el nombre/pista se resuelven por i18n
 * (content:badge.<id>.name / .hint).
 */
import type { PersistedState } from "./storage";

export interface BadgeDef {
  id: string;
  /** clave i18n del nombre (namespace content) */
  nameKey: string;
  /** clave i18n de la pista de cómo conseguirla */
  hintKey: string;
  /** token de color del relleno de la medalla desbloqueada */
  colorToken?: string;
  /** condición de desbloqueo evaluada sobre el estado ya consolidado */
  isEarned: (state: PersistedState) => boolean;
}

/** Aciertos en el tema de tablas de multiplicar (para "Maestro de las tablas"). */
const TIMES_TABLES_TOPIC = "operations.times_tables";
const ALL_SUBJECT_IDS = ["matematicas", "lengua", "ciencias", "sociales", "ingles"];

export const BADGES: BadgeDef[] = [
  {
    id: "firstSession",
    nameKey: "content:badge.firstSession.name",
    hintKey: "content:badge.firstSession.hint",
    colorToken: "--tdp-subject-math",
    isEarned: (s) => s.streak.lastPlayedDate !== null,
  },
  {
    id: "streak3",
    nameKey: "content:badge.streak3.name",
    hintKey: "content:badge.streak3.hint",
    colorToken: "--tdp-subject-social",
    isEarned: (s) => s.streak.longest >= 3,
  },
  {
    id: "streak7",
    nameKey: "content:badge.streak7.name",
    hintKey: "content:badge.streak7.hint",
    colorToken: "--tdp-subject-english",
    isEarned: (s) => s.streak.longest >= 7,
  },
  {
    id: "tablesMaster",
    nameKey: "content:badge.tablesMaster.name",
    hintKey: "content:badge.tablesMaster.hint",
    colorToken: "--tdp-subject-science",
    isEarned: (s) => (s.progress.correctByTopic[TIMES_TABLES_TOPIC] ?? 0) >= 10,
  },
  {
    id: "explorer",
    nameKey: "content:badge.explorer.name",
    hintKey: "content:badge.explorer.hint",
    colorToken: "--tdp-subject-spanish",
    isEarned: (s) =>
      ALL_SUBJECT_IDS.every((id) => s.progress.subjectsTried.includes(id)),
  },
  {
    id: "hundredStars",
    nameKey: "content:badge.hundredStars.name",
    hintKey: "content:badge.hundredStars.hint",
    colorToken: "--tdp-subject-math",
    isEarned: (s) => s.stars.total >= 100,
  },
];

/**
 * Devuelve los ids de medallas recién desbloqueadas: condición cumplida y no
 * presentes aún en state.badges.unlocked. No muta el estado.
 */
export function newlyEarnedBadges(state: PersistedState): string[] {
  return BADGES.filter(
    (b) => b.isEarned(state) && !(b.id in state.badges.unlocked),
  ).map((b) => b.id);
}

export function badgeDef(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}
