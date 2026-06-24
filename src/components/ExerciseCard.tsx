/*
 * ExerciseCard. Contenedor de un ejercicio en la sesión: enunciado + zona de
 * respuesta (slot) + zona de feedback (slot con aria-live).
 *
 * Presentacional puro. La zona de respuesta la inyecta Frontend según el tipo
 * de ejercicio (OptionCard[], V/F, NumPad, MatchingBoard). El enunciado se pasa
 * ya resuelto por i18n (con interpolación de operandos en mates).
 *
 * El enunciado es un heading legible (≥20px, izquierda, sin mayúsculas sostenidas
 * — A11Y-TYPO-01/03/04). La zona de feedback lleva aria-live="polite" para
 * anunciar acierto/error (A11Y-LIVE-01).
 */
import type { ReactNode } from "react";
import styles from "./ExerciseCard.module.css";

type ExerciseCardProps = {
  /** id del heading, para asociar el fieldset/grupo de respuesta vía aria-labelledby */
  promptId?: string;
  prompt: ReactNode;
  /** zona de respuesta inyectada por Frontend */
  children: ReactNode;
  /** feedback inline (acierto/error) — Frontend lo rellena */
  feedback?: ReactNode;
  /** acciones (comprobar / siguiente) */
  actions?: ReactNode;
};

export function ExerciseCard({
  promptId = "tdp-exercise-prompt",
  prompt,
  children,
  feedback,
  actions,
}: ExerciseCardProps) {
  return (
    <article className={styles.card}>
      <h2 id={promptId} className={styles.prompt}>
        {prompt}
      </h2>

      <div className={styles.answerZone}>{children}</div>

      {/* aria-live: el resultado de la respuesta se anuncia a lectores de pantalla */}
      <div className={styles.feedback} aria-live="polite" role="status">
        {feedback}
      </div>

      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </article>
  );
}
