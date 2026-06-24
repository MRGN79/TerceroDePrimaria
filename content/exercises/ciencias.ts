/*
 * Natural Science content — ALL IN ENGLISH (D-5).
 * This subject is taught in English; its content is fixed to English and does
 * NOT follow the UI language selector (like Spanish and English subjects).
 * Its i18n keys only exist in EN. Original content.
 */
import type { EjercicioAny } from "../types";

export const ciencias: EjercicioAny[] = [
  // --- Living things: animal classification ---
  {
    id: "sci-3-animals-001",
    materia: "ciencias",
    tema: "living_things.animals",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:science.animals.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:science.animals.q1.a" },
      { id: "b", textoKey: "exercises:science.animals.q1.b" },
      { id: "c", textoKey: "exercises:science.animals.q1.c" },
    ],
    respuestaCorrecta: "b",
    imprimible: true,
  },
  {
    id: "sci-3-animals-002",
    materia: "ciencias",
    tema: "living_things.animals",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:science.animals.q2.prompt",
    opciones: [
      { id: "true", textoKey: "exercises:science.common.true" },
      { id: "false", textoKey: "exercises:science.common.false" },
    ],
    respuestaCorrecta: "false",
    imprimible: true,
  },
  {
    id: "sci-3-animals-003",
    materia: "ciencias",
    tema: "living_things.animals",
    nivel: "3",
    tipo: "emparejar",
    enunciadoKey: "exercises:science.animals.q3.prompt",
    opciones: [
      { id: "l1", textoKey: "exercises:science.animals.q3.l1" },
      { id: "l2", textoKey: "exercises:science.animals.q3.l2" },
      { id: "l3", textoKey: "exercises:science.animals.q3.l3" },
      { id: "r1", textoKey: "exercises:science.animals.q3.r1" },
      { id: "r2", textoKey: "exercises:science.animals.q3.r2" },
      { id: "r3", textoKey: "exercises:science.animals.q3.r3" },
    ],
    respuestaCorrecta: ["l1:r3", "l2:r1", "l3:r2"],
    imprimible: true,
  },

  // --- The human body: the senses ---
  {
    id: "sci-3-senses-001",
    materia: "ciencias",
    tema: "human_body.senses",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:science.senses.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:science.senses.q1.a" },
      { id: "b", textoKey: "exercises:science.senses.q1.b" },
      { id: "c", textoKey: "exercises:science.senses.q1.c" },
    ],
    respuestaCorrecta: "c",
    imprimible: true,
  },
  {
    id: "sci-3-senses-002",
    materia: "ciencias",
    tema: "human_body.senses",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:science.senses.q2.prompt",
    opciones: [
      { id: "true", textoKey: "exercises:science.common.true" },
      { id: "false", textoKey: "exercises:science.common.false" },
    ],
    respuestaCorrecta: "true",
    imprimible: true,
  },

  // --- Matter and energy: states of matter ---
  {
    id: "sci-3-states-001",
    materia: "ciencias",
    tema: "matter_energy.states",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:science.states.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:science.states.q1.a" },
      { id: "b", textoKey: "exercises:science.states.q1.b" },
      { id: "c", textoKey: "exercises:science.states.q1.c" },
    ],
    respuestaCorrecta: "a",
    imprimible: true,
  },
  {
    id: "sci-3-states-002",
    materia: "ciencias",
    tema: "matter_energy.states",
    nivel: "3",
    tipo: "emparejar",
    enunciadoKey: "exercises:science.states.q2.prompt",
    opciones: [
      { id: "l1", textoKey: "exercises:science.states.q2.l1" },
      { id: "l2", textoKey: "exercises:science.states.q2.l2" },
      { id: "l3", textoKey: "exercises:science.states.q2.l3" },
      { id: "r1", textoKey: "exercises:science.states.q2.r1" },
      { id: "r2", textoKey: "exercises:science.states.q2.r2" },
      { id: "r3", textoKey: "exercises:science.states.q2.r3" },
    ],
    respuestaCorrecta: ["l1:r2", "l2:r1", "l3:r3"],
    imprimible: true,
  },
];
