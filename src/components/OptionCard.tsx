/*
 * OptionCard (§3.2). Tarjeta de opción de respuesta para opción múltiple y V/F.
 * Estado por BORDE + ICONO + TEXTO, nunca solo color (A11Y-COLOR-01/03).
 * Pasa el test de escala de grises: correct ✓ vs incorrect ✗ son formas distintas.
 *
 * Semántica: se renderiza como un `radio` real dentro de un fieldset (lo monta
 * la pantalla de sesión). Aquí es presentacional; Frontend conecta checked,
 * onChange, name, y el estado de revelación (status).
 *
 * Mínimo 64px de alto (§4). El componente NO decide la respuesta correcta:
 * recibe `status` ya calculado por Frontend.
 */
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import styles from "./OptionCard.module.css";

export type OptionStatus =
  | "idle"
  | "selected"
  | "correct"
  | "incorrect"
  | "correct-revealed"; /* correcta no elegida, resaltada al revelar */

type OptionCardProps = {
  id: string;
  name: string;
  /** texto de la opción (ya resuelto por i18n en la pantalla) */
  label: ReactNode;
  status?: OptionStatus;
  checked?: boolean;
  disabled?: boolean;
  /** etiqueta textual del estado para lector de pantalla (i18n) */
  statusLabel?: string;
  onChange?: () => void;
};

const STATUS_ICON: Partial<Record<OptionStatus, "check" | "cross">> = {
  correct: "check",
  "correct-revealed": "check",
  incorrect: "cross",
};

export function OptionCard({
  id,
  name,
  label,
  status = "idle",
  checked = false,
  disabled = false,
  statusLabel,
  onChange,
}: OptionCardProps) {
  const icon = STATUS_ICON[status];

  return (
    <label
      className={[styles.card, styles[`status-${status}`]].join(" ")}
      htmlFor={id}
      data-status={status}
    >
      <input
        id={id}
        className={styles.input}
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.indicator} aria-hidden="true">
        {icon ? <Icon name={icon} size={28} /> : <span className={styles.dot} />}
      </span>
      <span className={styles.label}>{label}</span>
      {statusLabel ? (
        <span className={styles.statusText}>{statusLabel}</span>
      ) : null}
    </label>
  );
}
