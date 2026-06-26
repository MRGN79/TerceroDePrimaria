/*
 * NumPad (§3.5). Teclado numérico en pantalla para respuesta-corta (mates).
 * - Teclas grandes (≥56×56px), separadas (--tdp-gap-touch).
 * - "Borrar" CLARAMENTE separada de las numéricas y de "comprobar"
 *   (acciones de signo opuesto, ≥24px — A11Y-TOUCH-02).
 * - Cada tecla es un <button> enfocable real; orden lógico 1-2-3 / 4-5-6...
 * - Display con aria-live="polite" anuncia lo tecleado (A11Y-LIVE-01).
 *
 * Presentacional: Frontend pasa value (string mostrado) y los handlers
 * onDigit / onDelete. La acción "comprobar" la pone la pantalla de sesión.
 */
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./NumPad.module.css";

type NumPadProps = {
  /** texto que se muestra en el display (lo gobierna Frontend) */
  value: string;
  /** true cuando se muestra la solución revelada tras dos fallos */
  revealed?: boolean;
  onDigit?: (digit: string) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export function NumPad({ value, revealed = false, onDigit, onDelete, disabled = false }: NumPadProps) {
  const { t } = useTranslation("quiz");

  return (
    <div className={styles.root}>
      <output
        className={[styles.display, revealed ? styles.displayRevealed : ""].join(" ").trim()}
        aria-live="polite"
        aria-label={t("answer.numpad.display")}
      >
        {value || " "}
      </output>

      <div className={styles.keys} role="group" aria-label={t("answer.numpad.display")}>
        {KEYS.map((k) => (
          <button
            key={k}
            type="button"
            className={styles.key}
            onClick={() => onDigit?.(k)}
            disabled={disabled}
          >
            {k}
          </button>
        ))}
        {/* Borrar: separada (ocupa su propia zona, color distinto) */}
        <button
          type="button"
          className={[styles.key, styles.delete].join(" ")}
          onClick={() => onDelete?.()}
          disabled={disabled}
          aria-label={t("answer.numpad.delete")}
        >
          <Icon name="delete" size={28} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
