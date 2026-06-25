/*
 * TopicCard (§3.6). Tema dentro de una materia.
 * "Reto 4º" se comunica por ICONO (cohete) + TEXTO, no solo color morado
 * (A11Y-COLOR-03). Tema sin contenido → "Pronto" (aria-disabled + texto).
 */
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./TopicCard.module.css";

type TopicCardProps = {
  title: string;
  challengeG4?: boolean;
  soon?: boolean;
  onClick?: () => void;
};

export function TopicCard({
  title,
  challengeG4 = false,
  soon = false,
  onClick,
}: TopicCardProps) {
  const { t } = useTranslation(["common", "content"]);
  return (
    <button
      type="button"
      className={[styles.card, challengeG4 ? styles.challenge : ""].join(" ")}
      onClick={soon ? undefined : onClick}
      disabled={soon}
      aria-disabled={soon || undefined}
    >
      <span className={styles.title}>{title}</span>
      {challengeG4 ? (
        <span className={styles.challengeTag}>
          <Icon name="rocket" size={20} aria-hidden="true" />
          {t("content:label.challengeG4")}
        </span>
      ) : null}
      {soon ? (
        <span className={styles.soon}>{t("common:state.soon")}</span>
      ) : (
        <Icon name="chevron-right" size={24} className={styles.chevron} aria-hidden="true" />
      )}
    </button>
  );
}
