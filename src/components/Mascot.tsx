/*
 * Rumbo — la brújula-sol (§1).
 * 3 expresiones: happy / cheer / idle. Decoración semántica reforzante:
 * NUNCA el único canal de información. El texto adyacente lleva el significado.
 *
 * - decorative (default): aria-hidden, la info ya vive en el texto cercano (A11Y-SR-02).
 * - decorative={false}: usa el alt vía clave i18n (ilustración informativa).
 */
import { useTranslation } from "react-i18next";
import styles from "./Mascot.module.css";

export type RumboExpression = "happy" | "cheer" | "idle";

type MascotProps = {
  expression?: RumboExpression;
  /** xs ~48px · sm ~72px · md ~120px · lg ~180px */
  size?: "xs" | "sm" | "md" | "lg";
  /** true → aria-hidden (decorativo). false → con alt informativo. */
  decorative?: boolean;
  className?: string;
};

const FACE: Record<RumboExpression, JSX.Element> = {
  happy: (
    <>
      <circle cx="26" cy="33" r="1.8" fill="#1E2433" />
      <circle cx="38" cy="33" r="1.8" fill="#1E2433" />
      <path
        d="M26 38 q6 6 12 0"
        fill="none"
        stroke="#1E2433"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  ),
  cheer: (
    <>
      {/* guiño: un ojo cerrado */}
      <path
        d="M24 33 q2 -2 4 0"
        fill="none"
        stroke="#1E2433"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="38" cy="33" r="1.8" fill="#1E2433" />
      <path
        d="M27 39 q5 4 10 0"
        fill="none"
        stroke="#1E2433"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  ),
  idle: (
    <>
      <circle cx="26" cy="33" r="1.8" fill="#1E2433" />
      <circle cx="38" cy="33" r="1.8" fill="#1E2433" />
      <path
        d="M27 39 h10"
        fill="none"
        stroke="#1E2433"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  ),
};

export function Mascot({
  expression = "idle",
  size = "md",
  decorative = true,
  className,
}: MascotProps) {
  const { t } = useTranslation("common");
  const label = t(`mascot.alt.${expression}`);

  return (
    <span
      className={[styles.root, styles[`size-${size}`], className]
        .filter(Boolean)
        .join(" ")}
      data-expression={expression}
    >
      <svg
        viewBox="0 0 64 64"
        className={styles.svg}
        role={decorative ? undefined : "img"}
        aria-hidden={decorative ? true : undefined}
        aria-label={decorative ? undefined : label}
        focusable="false"
      >
        <g
          className={styles.rays}
          stroke="#FFB23E"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <line x1="32" y1="3" x2="32" y2="9" />
          <line x1="50" y1="14" x2="46" y2="18" />
          <line x1="61" y1="32" x2="55" y2="32" />
          <line x1="50" y1="50" x2="46" y2="46" />
          <line x1="32" y1="61" x2="32" y2="55" />
          <line x1="14" y1="50" x2="18" y2="46" />
          <line x1="3" y1="32" x2="9" y2="32" />
          <line x1="14" y1="14" x2="18" y2="18" />
        </g>
        <circle
          cx="32"
          cy="32"
          r="20"
          fill="#DCEFFB"
          stroke="#0B7FB0"
          strokeWidth="3"
        />
        <polygon points="32,18 37,32 32,30 27,32" fill="#C7452A" />
        <polygon
          points="32,46 27,32 32,34 37,32"
          fill="#FFFFFF"
          stroke="#0B7FB0"
          strokeWidth="1.5"
        />
        {FACE[expression]}
      </svg>
    </span>
  );
}
