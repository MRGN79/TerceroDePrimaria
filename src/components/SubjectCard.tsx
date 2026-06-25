/*
 * SubjectCard (§3.6). Cada materia es una zona de la isla.
 * Identidad = color de materia + ICONO propio + NOMBRE textual.
 * Un niño daltónico la reconoce por icono + nombre aunque el color le sea ambiguo
 * (A11Y-COLOR-03). Estado "soon" (aria-disabled + texto), nunca rompe navegación.
 *
 * Presentacional: Frontend pasa onClick/href. Es un `button` real (A11Y-KBD-05).
 */
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";
import styles from "./SubjectCard.module.css";

type SubjectCardProps = {
  title: string;
  zone?: string;
  icon: IconName;
  /** token de color de la materia, ej. "--tdp-subject-math" */
  colorToken: string;
  /** micro-etiqueta de idioma de materia (ej. "EN"), §8 */
  langTag?: string;
  soon?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

export function SubjectCard({
  title,
  zone,
  icon,
  colorToken,
  langTag,
  soon = false,
  onClick,
}: SubjectCardProps) {
  const { t } = useTranslation("common");
  return (
    <button
      type="button"
      className={styles.card}
      style={{ ["--subject-color" as string]: `var(${colorToken})` }}
      onClick={soon ? undefined : onClick}
      disabled={soon}
      aria-disabled={soon || undefined}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon name={icon} size={36} />
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        {zone ? <span className={styles.zone}>{zone}</span> : null}
      </span>
      {langTag ? <span className={styles.langTag}>{langTag}</span> : null}
      {soon ? <span className={styles.soon}>{t("state.soon")}</span> : null}
    </button>
  );
}
