/*
 * Contenido real de Ciencias Sociales.
 * Sigue el idioma de la UI: las claves i18n viven en EN y ES.
 * Contenido original.
 */
import type { EjercicioAny } from "../types";

export const sociales: EjercicioAny[] = [
  // --- El universo y la Tierra: el Sistema Solar ---
  {
    id: "soc-3-universe-001",
    materia: "sociales",
    tema: "earth_universe.universe",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:social.universe.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:social.universe.q1.a" },
      { id: "b", textoKey: "exercises:social.universe.q1.b" },
      { id: "c", textoKey: "exercises:social.universe.q1.c" },
    ],
    respuestaCorrecta: "a",
    imprimible: true,
  },
  {
    id: "soc-3-universe-002",
    materia: "sociales",
    tema: "earth_universe.universe",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:social.universe.q2.prompt",
    opciones: [
      { id: "true", textoKey: "quiz:answer.trueLabel" },
      { id: "false", textoKey: "quiz:answer.falseLabel" },
    ],
    respuestaCorrecta: "true",
    imprimible: true,
  },
  {
    id: "soc-3-universe-003",
    materia: "sociales",
    tema: "earth_universe.universe",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:social.universe.q3.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:social.universe.q3.a" },
      { id: "b", textoKey: "exercises:social.universe.q3.b" },
      { id: "c", textoKey: "exercises:social.universe.q3.c" },
    ],
    respuestaCorrecta: "c",
    imprimible: true,
  },

  // --- El paisaje: planos y mapas, puntos cardinales ---
  {
    id: "soc-3-maps-001",
    materia: "sociales",
    tema: "landscape.maps",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:social.maps.q1.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:social.maps.q1.a" },
      { id: "b", textoKey: "exercises:social.maps.q1.b" },
      { id: "c", textoKey: "exercises:social.maps.q1.c" },
      { id: "d", textoKey: "exercises:social.maps.q1.d" },
    ],
    respuestaCorrecta: "b",
    imprimible: true,
  },
  {
    id: "soc-3-maps-002",
    materia: "sociales",
    tema: "landscape.maps",
    nivel: "3",
    tipo: "emparejar",
    enunciadoKey: "exercises:social.maps.q2.prompt",
    opciones: [
      { id: "l1", textoKey: "exercises:social.maps.q2.l1" },
      { id: "l2", textoKey: "exercises:social.maps.q2.l2" },
      { id: "r1", textoKey: "exercises:social.maps.q2.r1" },
      { id: "r2", textoKey: "exercises:social.maps.q2.r2" },
    ],
    respuestaCorrecta: ["l1:r2", "l2:r1"],
    imprimible: true,
  },
];
