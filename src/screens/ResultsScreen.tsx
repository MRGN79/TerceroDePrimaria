/*
 * RESULTADOS DE SESIÓN — celebración (flujos §5).
 * El botín del día: estrellas ganadas, avance de racha, medalla si la hubo.
 * El refuerzo (cuánto ganó) vive en TEXTO + ICONO, nunca solo en la animación
 * (A11Y-MOTION-03). Datos y handlers vía props.
 */
import { useTranslation } from "react-i18next";
import {
  PageLayout,
  Button,
  Mascot,
  StarCounter,
  StreakBadge,
  Badge,
} from "@/components";
import styles from "./ResultsScreen.module.css";

type ResultsScreenProps = {
  starsEarned: number;
  streakDays: number;
  streakFirst?: boolean;
  newBadge?: { name: string; colorToken?: string } | null;
  dailyGoalDone?: boolean;
  onPlayAgain?: () => void;
  onHome?: () => void;
};

export function ResultsScreen({
  starsEarned,
  streakDays,
  streakFirst = false,
  newBadge = null,
  dailyGoalDone = false,
  onPlayAgain,
  onHome,
}: ResultsScreenProps) {
  const { t } = useTranslation("results");

  return (
    <PageLayout width="narrow">
      <div className={styles.celebration}>
        <Mascot expression="happy" size="lg" />
        <h1 className={styles.title}>
          {dailyGoalDone ? t("dailyGoal.done") : t("title")}
        </h1>

        <p className={styles.starsLine}>
          <StarCounter count={starsEarned} size="lg" />
        </p>
        <p className={styles.starsText}>
          {t("starsEarned", { count: starsEarned })}
        </p>

        <p className={styles.streakLine}>
          <StreakBadge days={streakDays} />
          <span className={styles.streakText}>
            {streakFirst
              ? t("streak.first")
              : t("streak.up", { count: streakDays })}
          </span>
        </p>

        {newBadge ? (
          <div className={styles.badgeBlock}>
            <p className={styles.badgeTitle}>{t("badge.unlocked")}</p>
            <Badge name={newBadge.name} colorToken={newBadge.colorToken} />
          </div>
        ) : null}

        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={onPlayAgain}>
            {t("action.playAgain")}
          </Button>
          <Button variant="secondary" size="lg" onClick={onHome}>
            {t("action.home")}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
