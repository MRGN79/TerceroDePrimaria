/*
 * Resolución de texto para la ficha imprimible: enunciado, recordatorio del
 * enunciado en soluciones y respuesta correcta congelada por tipo de ejercicio.
 * Separa la lógica de presentación impresa del componente.
 */
import { esGenerado, type EjercicioAny } from "@content/types";
import type { PrintItem } from "./printSheet";

type TFn = (key: string, opts?: Record<string, unknown>) => string;

export function printPromptText(item: PrintItem, t: TFn): string {
  const { exercise, math } = item;
  if (esGenerado(exercise) && math) {
    return t(exercise.plantillaKey, { a: math.a, b: math.b, op: math.operator });
  }
  if (!esGenerado(exercise)) {
    const base = t(exercise.enunciadoKey);
    if (exercise.opciones && exercise.tipo !== "verdadero-falso" && exercise.tipo !== "emparejar") {
      const opts = exercise.opciones.map((o) => t(o.textoKey)).join(" · ");
      return `${base}  (${opts})`;
    }
    return base;
  }
  return "";
}

/** Recordatorio corto del enunciado para la hoja de soluciones. */
export function printSolutionText(item: PrintItem, t: TFn): string {
  const { exercise, math } = item;
  if (esGenerado(exercise) && math) {
    return `${math.a} ${math.operator} ${math.b}`;
  }
  if (!esGenerado(exercise)) return t(exercise.enunciadoKey);
  return "";
}

export function printAnswerText(item: PrintItem, t: TFn): string {
  const { exercise, math } = item;
  if (esGenerado(exercise) && math) {
    return String(math.answer);
  }
  if (esGenerado(exercise)) return "";
  return staticAnswerText(exercise, t);
}

function staticAnswerText(exercise: EjercicioAny, t: TFn): string {
  if (esGenerado(exercise)) return "";
  const correct = exercise.respuestaCorrecta;

  if (exercise.tipo === "emparejar") {
    const pairs = (Array.isArray(correct) ? correct : []).map((p) => {
      const [l, r] = p.split(":");
      const lLabel = exercise.opciones?.find((o) => o.id === l)?.textoKey;
      const rLabel = exercise.opciones?.find((o) => o.id === r)?.textoKey;
      return `${lLabel ? t(lLabel) : l} → ${rLabel ? t(rLabel) : r}`;
    });
    return pairs.join("; ");
  }

  const ids = Array.isArray(correct) ? correct : [correct];
  return ids
    .map((id) => {
      const opt = exercise.opciones?.find((o) => o.id === id);
      return opt ? t(opt.textoKey) : id;
    })
    .join(", ");
}
