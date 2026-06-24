/*
 * Feedback inline de acierto/error (§5.1-5.3). Multicanal: ICONO + TEXTO
 * (+ animación opcional). Quitar la animación no quita la información
 * (A11Y-MOTION-03). Error AMABLE: nunca rojo agresivo ni lenguaje negativo.
 *
 * Presentacional: Frontend pasa el mensaje ya rotado del banco
 * (quiz.feedback.correct.<n> / quiz.feedback.almost.<n>) y el tipo.
 * El "shake" de error es pequeño, una vez, y se desactiva con reduced-motion.
 */
import { Mascot } from "./Mascot";
import { Icon } from "./Icon";
import styles from "./Feedback.module.css";

type FeedbackProps = {
  kind: "correct" | "almost";
  message: string;
};

export function Feedback({ kind, message }: FeedbackProps) {
  const isCorrect = kind === "correct";
  return (
    <div
      className={[styles.root, isCorrect ? styles.correct : styles.almost].join(" ")}
    >
      <Mascot expression={isCorrect ? "happy" : "cheer"} size="xs" />
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon name={isCorrect ? "check" : "retry"} size={28} />
      </span>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
