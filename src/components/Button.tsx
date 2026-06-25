/*
 * Button (§3.1). El botón "caramelo": relleno + sombra inferior física que se
 * hunde 2px al :active. No es un rectángulo plano genérico — tiene un momento
 * físico al pulsar y un foco diseñado.
 *
 * Variantes: primary | secondary | ghost | subject
 * Tamaños:   lg (≥60px) | md (≥48px) | icon (≥48px, ≥60px si principal del niño)
 *
 * Presentacional: Frontend inyecta onClick, disabled, type, aria-* etc. vía props.
 * Si es solo-icono, aria-label es obligatorio (lo valida el tipo).
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type BaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "subject";
  size?: "lg" | "md" | "icon";
  /** token de color de materia para variant="subject", ej. "--tdp-subject-math" */
  subjectColorToken?: string;
  /** botón principal de un niño (mute) → hit-area 60px aunque sea icon */
  emphasized?: boolean;
  children?: ReactNode;
};

/** Un botón solo-icono debe aportar aria-label (nombre accesible). */
type IconButtonProps = BaseProps & { size: "icon"; "aria-label": string };
type TextButtonProps = BaseProps & { size?: "lg" | "md" };

export type ButtonProps = IconButtonProps | TextButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  subjectColorToken,
  emphasized = false,
  className,
  children,
  style,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    emphasized ? styles.emphasized : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle =
    variant === "subject" && subjectColorToken
      ? { ...style, ["--btn-subject" as string]: `var(${subjectColorToken})` }
      : style;

  return (
    <button className={classes} style={mergedStyle} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
