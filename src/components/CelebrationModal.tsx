/*
 * CelebrationModal (§3.7). Aparece al terminar sesión / desbloquear medalla.
 * Rumbo happy + confeti (respeta reduced-motion) + estrellas en grande + botón.
 *
 * Estructura accesible: role="dialog" aria-modal, aria-labelledby al título.
 * Manejo de foco (WCAG 2.4.3): al abrir mueve el foco al primer elemento
 * enfocable y guarda el disparador; mientras está abierto atrapa el Tab/Shift+Tab
 * dentro del diálogo; Esc lo cierra; al cerrar devuelve el foco al disparador.
 *
 * 🚨 Confeti: partículas pequeñas que caen, NUNCA estroboscópico global; no
 * parpadea > 3 veces/seg (A11Y-MOTION-04/05). Bajo reduced-motion no hay confeti
 * ni vuelo: la info (estrellas, mensaje) vive en texto + icono fijos (A11Y-MOTION-03).
 */
import { useEffect, useRef, type ReactNode } from "react";
import { Mascot } from "./Mascot";
import { StarCounter } from "./StarCounter";
import styles from "./CelebrationModal.module.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function focusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Al abrir: guarda el disparador y mueve el foco dentro del diálogo.
  // Al cerrar: devuelve el foco al disparador (WCAG 2.4.3).
  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog) {
      const first = focusableElements(dialog)[0];
      (first ?? dialog).focus();
    }

    return () => {
      triggerRef.current?.focus?.();
    };
  }, [open]);

  // Trampa de foco + cierre con Esc mientras está abierto.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = focusableElements(dialog);
      if (focusables.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.confetti} aria-hidden="true">
        {CONFETTI.map((i) => (
          <span key={i} className={styles.piece} data-i={i % 7} />
        ))}
      </div>

      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
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
