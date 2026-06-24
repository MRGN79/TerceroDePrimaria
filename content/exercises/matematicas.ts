/*
 * Contenido real de Matemáticas.
 * Mates sigue el idioma de la UI (las claves i18n viven en EN y ES).
 * Los ejercicios de cálculo son GENERADOS (D-6): operandos aleatorios por
 * repetición, respuesta calculada. Los de numeración son estáticos.
 */
import type { EjercicioAny } from "../types";

export const matematicas: EjercicioAny[] = [
  // --- Sumas con llevadas (generado) ---
  {
    id: "mat-3-add-gen",
    materia: "matematicas",
    tema: "operations.add_carry",
    nivel: "3",
    tipo: "respuesta-corta",
    operacion: "add",
    plantillaKey: "exercises:math.template.operation",
    imprimible: true,
  },
  // --- Tablas de multiplicar (generado) ---
  {
    id: "mat-3-times-gen",
    materia: "matematicas",
    tema: "operations.times_tables",
    nivel: "3",
    tipo: "respuesta-corta",
    operacion: "times-tables",
    plantillaKey: "exercises:math.template.operation",
    imprimible: true,
  },
  // --- División exacta (generado) ---
  {
    id: "mat-3-div-gen",
    materia: "matematicas",
    tema: "operations.division_intro",
    nivel: "3",
    tipo: "respuesta-corta",
    operacion: "division-exact",
    plantillaKey: "exercises:math.template.operation",
    imprimible: true,
  },

  // --- Pares e impares (estático, varios tipos) ---
  {
    id: "mat-3-evenodd-001",
    materia: "matematicas",
    tema: "numbers.even_odd",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:math.evenodd.q1.prompt",
    opciones: [
      { id: "true", textoKey: "quiz:answer.trueLabel" },
      { id: "false", textoKey: "quiz:answer.falseLabel" },
    ],
    respuestaCorrecta: "true",
    imprimible: true,
  },
  {
    id: "mat-3-evenodd-002",
    materia: "matematicas",
    tema: "numbers.even_odd",
    nivel: "3",
    tipo: "verdadero-falso",
    enunciadoKey: "exercises:math.evenodd.q2.prompt",
    opciones: [
      { id: "true", textoKey: "quiz:answer.trueLabel" },
      { id: "false", textoKey: "quiz:answer.falseLabel" },
    ],
    respuestaCorrecta: "false",
    imprimible: true,
  },
  {
    id: "mat-3-evenodd-003",
    materia: "matematicas",
    tema: "numbers.even_odd",
    nivel: "3",
    tipo: "opcion-multiple",
    enunciadoKey: "exercises:math.evenodd.q3.prompt",
    opciones: [
      { id: "a", textoKey: "exercises:math.evenodd.q3.a" },
      { id: "b", textoKey: "exercises:math.evenodd.q3.b" },
      { id: "c", textoKey: "exercises:math.evenodd.q3.c" },
    ],
    respuestaCorrecta: "b",
    imprimible: true,
  },
];
