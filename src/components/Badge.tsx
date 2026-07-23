/*
 * Badge / medalla (§3.9). Estados:
 *  - locked:   silueta atenuada + candado + texto "Por conseguir"
 *  - unlocked: ilustración a color + nombre + fecha
 * La diferencia NO es solo color: silueta vs color + icono de candado (A11Y-COLOR-03).
 */
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./Badge.module.css";

type BadgeProps = {
  name: string;
  /** pista de desbloqueo específica de la medalla */
  hint?: string;
  locked?: boolean;
  /** fecha ya formateada por Frontend (i18n del locale) */
  unlockedOn?: string;
  /** color del relleno de la medalla desbloqueada (token), opcional */
  colorToken?: string;
};

export function Badge({ name, hint, locked = false, unlockedOn, colorToken }: BadgeProps) {
  const { t } = useTranslation("backpack");
  const tooltipId = useId();
  // Desbloqueada: reutilizamos la pista de desbloqueo como explicación de
  // cómo se consiguió (el texto ya describe la condición cumplida).
  const showTooltip = !locked && !!hint;

  return (
    <figure
      className={[styles.badge, locked ? styles.locked : styles.unlocked].join(" ")}
      style={
        !locked && colorToken
          ? ({ ["--badge-color" as string]: `var(${colorToken})` } as React.CSSProperties)
          : undefined
      }
      tabIndex={showTooltip ? 0 : undefined}
      aria-describedby={showTooltip ? tooltipId : undefined}
    >
      <div className={styles.medal} aria-hidden="true">
        <Icon name="star" size={40} className={styles.medalIcon} />
        {locked ? (
          <span className={styles.lockChip}>
            <Icon name="lock" size={18} />
          </span>
        ) : null}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.name}>{name}</span>
        <span className={styles.status}>
          {locked
            ? (hint ?? t("badges.locked"))
            : unlockedOn
              ? t("badges.unlockedOn", { date: unlockedOn })
              : null}
        </span>
      </figcaption>
      {showTooltip ? (
        <span role="tooltip" id={tooltipId} className={styles.tooltip}>
          {hint}
        </span>
      ) : null}
    </figure>
  );
}
