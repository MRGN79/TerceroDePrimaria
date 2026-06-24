/*
 * AppHeader. Cabecera de navegación reutilizable: botón "volver" / "casa"
 * (siempre visible, sin perder progreso — §5.5) + título de pantalla + slot
 * a la derecha (estrellas, racha, ajustes). Es un landmark <nav>.
 *
 * Presentacional: Frontend pasa los handlers de navegación.
 */
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Icon } from "./Icon";
import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  title?: ReactNode;
  /** muestra el botón de volver */
  onBack?: () => void;
  /** muestra el botón de ir a casa */
  onHome?: () => void;
  /** contenido a la derecha: StarCounter, StreakBadge, ajustes... */
  right?: ReactNode;
};

export function AppHeader({ title, onBack, onHome, right }: AppHeaderProps) {
  const { t } = useTranslation("common");
  return (
    <nav className={styles.bar} aria-label={t("nav.home")}>
      <div className={styles.left}>
        {onBack ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("nav.back")}
            onClick={onBack}
          >
            <Icon name="back" size={26} aria-hidden="true" />
          </Button>
        ) : null}
        {onHome ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("nav.backToHome")}
            onClick={onHome}
          >
            <Icon name="home" size={26} aria-hidden="true" />
          </Button>
        ) : null}
        {title ? <h1 className={styles.title}>{title}</h1> : null}
      </div>
      {right ? <div className={styles.right}>{right}</div> : null}
    </nav>
  );
}
