/*
 * StarCounter (§3.4). Estrella (icono) + número. aria-label "N estrellas".
 * El número usa el token de texto de estrella (-700), NUNCA el amarillo de relleno
 * como color de texto (A11Y-CONTRAST-03/05). El amarillo es solo el relleno del icono.
 */
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./StarCounter.module.css";

type StarCounterProps = {
  count: number;
  size?: "md" | "lg";
};

export function StarCounter({ count, size = "md" }: StarCounterProps) {
  const { t } = useTranslation("common");
  return (
    <span
      className={[styles.root, styles[`size-${size}`]].join(" ")}
      aria-label={t("stars.label", { count })}
    >
      <Icon
        name="star"
        size={size === "lg" ? 40 : 28}
        className={styles.star}
        aria-hidden="true"
      />
      <span className={styles.number} aria-hidden="true">
        {count}
      </span>
    </span>
  );
}
