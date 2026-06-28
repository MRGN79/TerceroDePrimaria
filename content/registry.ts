/*
 * Registro central de contenido. Agrega los ejercicios de cada materia y expone
 * una API de consulta limpia para Frontend (sin que toque los JSON directamente).
 * Añadir contenido = editar un módulo de materia, sin tocar lógica.
 */
import type { EjercicioAny, Materia } from "./types";
import { matematicas } from "./exercises/matematicas";
import { lengua } from "./exercises/lengua";
import { ciencias } from "./exercises/ciencias";
import { sociales } from "./exercises/sociales";
import { ingles } from "./exercises/ingles";
import { cuarto } from "./exercises/cuarto";

export const ALL_EXERCISES: EjercicioAny[] = [
  ...matematicas,
  ...lengua,
  ...ciencias,
  ...sociales,
  ...ingles,
  ...cuarto,
];

const EXERCISE_MAP = new Map(ALL_EXERCISES.map((e) => [e.id, e]));

/**
 * Materias cuyo contenido NO sigue el selector de idioma de la UI (D-1, D-5):
 * Lengua e Inglés (idioma propio) y Natural Science (fija en inglés).
 * Sus claves i18n sólo existen en EN o ES respectivamente; el contenido se
 * resuelve siempre con su idioma fijo.
 */
export const FIXED_LANGUAGE_SUBJECTS: Record<Materia, "en" | "es" | null> = {
  matematicas: null, // sigue la UI
  sociales: null, // sigue la UI
  lengua: "es", // sólo ES
  ciencias: "en", // Natural Science: sólo EN
  ingles: "en", // English: sólo EN
  cuarto: null, // sigue la UI
};

export function fixedLanguageFor(materia: Materia): "en" | "es" | null {
  return FIXED_LANGUAGE_SUBJECTS[materia];
}

export function exercisesByTopic(materia: Materia, tema: string): EjercicioAny[] {
  return ALL_EXERCISES.filter((e) => e.materia === materia && e.tema === tema);
}

export function exercisesBySubject(materia: Materia): EjercicioAny[] {
  return ALL_EXERCISES.filter((e) => e.materia === materia);
}

/** Temas que realmente tienen contenido para una materia (orden de aparición). */
export function topicsWithContent(materia: Materia): string[] {
  const seen: string[] = [];
  for (const e of ALL_EXERCISES) {
    if (e.materia === materia && !seen.includes(e.tema)) seen.push(e.tema);
  }
  return seen;
}

export function exerciseById(id: string): EjercicioAny | undefined {
  return EXERCISE_MAP.get(id);
}
