/*
 * CelebrationModal (§3.7). Aparece al terminar sesión / desbloquear medalla.
 * Rumbo happy + confeti (respeta reduced-motion) + estrellas en grande + botón.
 *
 * Estructura accesible: role="dialog" aria-modal, aria-labelledby al título.
 * El MANEJO de foco (mover foco al abrir, trap, retorno, Esc) lo implementa
 * Frontend — aquí se entregan el contenedor, los ids y el botón de cierre.
 *
 * 🚨 Confeti: partículas pequeñas que caen, NUNCA estroboscópico global; no
 * parpadea > 3 veces/seg (A11Y-MOTION-04/05). Bajo reduced-motion no hay confeti
 * ni vuelo: la info (estrellas, mensaje) vive en texto + icono fijos (A11Y-MOTION-03).
 */
import type { ReactNode } from "react";
import { Mascot } from "./Mascot";
import { StarCounter } from "./StarCounter";
import styles from "./CelebrationModal.module.css";

type CelebrationModalProps = {
  open: boolean;
  titleId: string;
  title: string;
  /** estrellas ganadas, mostradas en grande */
  stars?: number;
  /** contenido extra: avance de racha, medalla, etc. */
  children?: ReactNode;
  /** acciones (botones) que pone la pantalla */
  actions?: ReactNode;
  onClose?: () => void;
  closeLabel: string;
};

/* Confeti decorativo: posiciones fijas, animación de caída suave. Puramente
   visual y aria-hidden. Cada pieza cae una vez; no hay parpadeo. */
const CONFETTI = Array.from({ length: 14 }, (_, i) => i);

export function CelebrationModal({
  open,
  titleId,
  title,
  stars,
  children,
  actions,
  onClose,
  closeLabel,
}: CelebrationModalProps) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.confetti} aria-hidden="true">
        {CONFETTI.map((i) => (
          <span key={i} className={styles.piece} data-i={i % 7} />
        ))}
      </div>

      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <Mascot expression="happy" size="lg" />
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        {typeof stars === "number" ? (
          <div className={styles.stars}>
            <StarCounter count={stars} size="lg" />
          </div>
        ) : null}

        {children ? <div className={styles.extra}>{children}</div> : null}

        <div className={styles.actions}>
          {actions}
          <button
            type="button"
            className={styles.closeIcon}
            onClick={onClose}
            aria-label={closeLabel}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
