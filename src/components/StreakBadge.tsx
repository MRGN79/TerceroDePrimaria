/*
 * StreakBadge (§3.4). Icono de racha (fuego/cohete) + número + texto
 * "X días seguidos". Nunca solo el icono (A11Y-SR-01).
 * Estados: empty (¡empieza tu racha!), reset (amable, sin culpa), normal.
 */
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./StreakBadge.module.css";

type StreakBadgeProps = {
  days: number;
  /** "empty" → sin racha aún · "reset" → se rompió (mensaje amable) */
  variant?: "normal" | "empty" | "reset";
};

export function StreakBadge({ days, variant = "normal" }: StreakBadgeProps) {
  const { t } = useTranslation(["common", "home"]);

  if (variant === "empty") {
    return (
      <span className={[styles.root, styles.muted].join(" ")}>
        <Icon name="streak" size={26} className={styles.icon} />
        <span className={styles.text}>{t("home:streak.empty")}</span>
      </span>
    );
  }
  if (variant === "reset") {
    return (
      <span className={[styles.root, styles.muted].join(" ")}>
        <Icon name="streak" size={26} className={styles.icon} />
        <span className={styles.text}>{t("home:streak.reset")}</span>
      </span>
    );
  }

  return (
    <span className={styles.root} aria-label={t("common:streak.days", { count: days })}>
      <Icon name="streak" size={26} className={styles.icon} aria-hidden="true" />
      <span className={styles.number} aria-hidden="true">
        {days}
      </span>
      <span className={styles.text} aria-hidden="true">
        {t("home:streak.days")}
      </span>
    </span>
  );
}
