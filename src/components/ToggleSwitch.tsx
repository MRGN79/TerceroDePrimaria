/*
 * ToggleSwitch para Ajustes (sonido, reducir movimiento, idioma binario).
 * Estado por posición + texto on/off (no solo color — A11Y-COLOR-03).
 * Semántica: button con role="switch" y aria-checked. ≥48px de alto.
 */
import styles from "./ToggleSwitch.module.css";

type ToggleSwitchProps = {
  checked: boolean;
  label: string;
  /** texto del estado activado/desactivado, mostrado junto al control */
  stateLabel: string;
  onToggle?: () => void;
};

export function ToggleSwitch({
  checked,
  label,
  stateLabel,
  onToggle,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={styles.row}
      onClick={onToggle}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.right}>
        <span className={styles.stateLabel}>{stateLabel}</span>
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </span>
    </button>
  );
}
