/*
 * Contenido real de Lengua Castellana.
 * Específico del idioma castellano: NO se traduce (D-1). Las claves i18n de este
 * contenido sólo existen en ES; con cualquier idioma de UI se muestran en ES.
 * Contenido original.
 */
import type { EjercicioAny } from "../types";

export const lengua: EjercicioAny[] = [
  // --- Sinónimos y antónimos ---
  {
    id: "len-3-syn-001",
    materia: "lengua",
    tema: "vocabulary.synonyms_antonyms",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:spanish.syn.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:spanish.syn.q1.a" },
      { id: "b", textoKey: "exercises:spanish.syn.q1.b" },
      { id: "c", textoKey: "exercises:spanish.syn.q1.c" },
    ],
    respuestaCorrecta: "a",
    imprimible: true,
  },
  {
    id: "len-3-syn-002",
    materia: "lengua",
    tema: "vocabulary.synonyms_antonyms",
    nivel: "3",
    tipo: "emparejar",
    enunciadoKey: "exercises:spanish.syn.q2.prompt",
    opciones: [
      { id: "l1", textoKey: "exercises:spanish.syn.q2.l1" },
      { id: "l2", textoKey: "exercises:spanish.syn.q2.l2" },
      { id: "l3", textoKey: "exercises:spanish.syn.q2.l3" },
      { id: "r1", textoKey: "exercises:spanish.syn.q2.r1" },
      { id: "r2", textoKey: "exercises:spanish.syn.q2.r2" },
      { id: "r3", textoKey: "exercises:spanish.syn.q2.r3" },
    ],
    // pares correctos: izquierda → derecha
    respuestaCorrecta: ["l1:r2", "l2:r3", "l3:r1"],
    imprimible: true,
  },

  // --- El sustantivo: género y número ---
  {
    id: "len-3-noun-001",
    materia: "lengua",
    tema: "grammar.noun",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:spanish.noun.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:spanish.noun.q1.a" },
      { id: "b", textoKey: "exercises:spanish.noun.q1.b" },
      { id: "c", textoKey: "exercises:spanish.noun.q1.c" },
    ],
    respuestaCorrecta: "b",
    imprimible: true,
  },
  {
    id: "len-3-noun-002",
    materia: "lengua",
    tema: "grammar.noun",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:spanish.noun.q2.prompt",
    opciones: [
      { id: "true", textoKey: "quiz:answer.trueLabel" },
      { id: "false", textoKey: "quiz:answer.falseLabel" },
    ],
    respuestaCorrecta: "true",
    imprimible: true,
  },

  // --- Ortografía: mp / mb ---
  {
    id: "len-3-mpmb-001",
    materia: "lengua",
    tema: "spelling.mp_mb",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:spanish.mpmb.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:spanish.mpmb.q1.a" },
      { id: "b", textoKey: "exercises:spanish.mpmb.q1.b" },
    ],
    respuestaCorrecta: "a",
    imprimible: true,
  },
  {
    id: "len-3-mpmb-002",
    materia: "lengua",
    tema: "spelling.mp_mb",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:spanish.mpmb.q2.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:spanish.mpmb.q2.a" },
      { id: "b", textoKey: "exercises:spanish.mpmb.q2.b" },
    ],
    respuestaCorrecta: "b",
    imprimible: true,
  },
];
