/*
 * English subject content — naturally in English. Like Spanish and Natural
 * Science, its content does NOT follow the UI language selector. Its i18n keys
 * only exist in EN. Original content.
 */
import type { EjercicioAny } from "../types";

export const ingles: EjercicioAny[] = [
  // --- Vocabulary: colors and shapes ---
  {
    id: "eng-3-colors-001",
    materia: "ingles",
    tema: "en_vocabulary.colors_shapes",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:english.colors.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:english.colors.q1.a" },
      { id: "b", textoKey: "exercises:english.colors.q1.b" },
      { id: "c", textoKey: "exercises:english.colors.q1.c" },
    ],
    respuestaCorrecta: "c",
    imprimible: true,
  },
  {
    id: "eng-3-colors-002",
    materia: "ingles",
    tema: "en_vocabulary.colors_shapes",
    nivel: "3",
    tipo: "emparejar",
    enunciadoKey: "exercises:english.colors.q2.prompt",
    opciones: [
      { id: "l1", textoKey: "exercises:english.colors.q2.l1" },
      { id: "l2", textoKey: "exercises:english.colors.q2.l2" },
      { id: "l3", textoKey: "exercises:english.colors.q2.l3" },
      { id: "r1", textoKey: "exercises:english.colors.q2.r1" },
      { id: "r2", textoKey: "exercises:english.colors.q2.r2" },
      { id: "r3", textoKey: "exercises:english.colors.q2.r3" },
    ],
    respuestaCorrecta: ["l1:r2", "l2:r3", "l3:r1"],
    imprimible: true,
  },

  // --- Vocabulary: animals ---
  {
    id: "eng-3-animals-001",
    materia: "ingles",
    tema: "en_vocabulary.animals",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:english.animals.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:english.animals.q1.a" },
      { id: "b", textoKey: "exercises:english.animals.q1.b" },
      { id: "c", textoKey: "exercises:english.animals.q1.c" },
    ],
    respuestaCorrecta: "a",
    imprimible: true,
  },
  {
    id: "eng-3-animals-002",
    materia: "ingles",
    tema: "en_vocabulary.animals",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:english.animals.q2.prompt",
    opciones: [
      { id: "true", textoKey: "exercises:english.common.true" },
      { id: "false", textoKey: "exercises:english.common.false" },
    ],
    respuestaCorrecta: "true",
    imprimible: true,
  },

  // --- Basics: greetings and introductions ---
  {
    id: "eng-3-greet-001",
    materia: "ingles",
    tema: "en_basics.greetings",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:english.greetings.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:english.greetings.q1.a" },
      { id: "b", textoKey: "exercises:english.greetings.q1.b" },
      { id: "c", textoKey: "exercises:english.greetings.q1.c" },
    ],
    respuestaCorrecta: "b",
    imprimible: true,
  },
  {
    id: "eng-3-greet-002",
    materia: "ingles",
    tema: "en_basics.greetings",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:english.greetings.q2.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:english.greetings.q2.a" },
      { id: "b", textoKey: "exercises:english.greetings.q2.b" },
      { id: "c", textoKey: "exercises:english.greetings.q2.c" },
    ],
    respuestaCorrecta: "a",
    imprimible: true,
  },
];
