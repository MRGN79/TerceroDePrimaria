/*
 * Modelo de datos de contenido (ADR-001 §3).
 * El contenido vive en JSON estático validado por estos tipos.
 * Jerarquía: Materia → Tema → Ejercicio.
 *
 * Maquetador deja el esquema y la estructura de carpetas.
 * Frontend implementa la carga bajo demanda, la validación en CI,
 * el tipo EjercicioGenerado (mates D-6) y rellena el contenido real.
 */

export type Materia =
  | "matematicas"
  | "lengua"
  | "ingles"
  | "ciencias"
  | "sociales";

export type Nivel = "3" | "4";

export type TipoEjercicio =
  | "opcion-multiple"
  | "verdadero-falso"
  | "respuesta-corta"
  | "emparejar";

export interface Opcion {
  /** ej. "a", "b", "c" */
  id: string;
  /** clave i18n del texto de la opción */
  textoKey: string;
}

export interface Ejercicio {
  /** estable y único, ej. "mat-3-sumas-001" */
  id: string;
  materia: Materia;
  /** clave de tema, ej. "sumas-llevando" */
  tema: string;
  nivel: Nivel;
  tipo: TipoEjercicio;
  /** clave i18n del enunciado */
  enunciadoKey: string;
  /** para opcion-multiple / verdadero-falso / emparejar */
  opciones?: Opcion[];
  /** id(s) de opción correcta, o texto normalizado */
  respuestaCorrecta: string | string[];
  /** clave i18n de pista opcional */
  pistaKey?: string;
  /** si aparece en la versión en papel */
  imprimible: boolean;
}

/** Entrada del índice ligero de materias/temas (materias.json). */
export interface TemaIndice {
  /** clave de tema, ej. "sumas-llevando" */
  id: string;
  /** clave i18n del título del tema (namespace content) */
  tituloKey: string;
  /** marca de Reto de 4º (icono + texto, nunca solo color) */
  reto4?: boolean;
  /** tema sin contenido aún → estado "Pronto" en la UI */
  disponible: boolean;
}

export interface MateriaIndice {
  id: Materia;
  /** clave i18n del título de la materia (namespace content) */
  tituloKey: string;
  /** token de color de materia, ej. "--tdp-subject-math" */
  colorToken: string;
  temas: TemaIndice[];
}
