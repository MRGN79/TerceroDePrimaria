/*
 * SessionProgress (§3.3). Píldora que se llena con cada ejercicio.
 * Muestra "X de N" en TEXTO además del relleno (no solo visual).
 * Semántica: role="progressbar" con aria-valuenow/min/max y texto accesible.
 */
import { useTranslation } from "react-i18next";
import { Mascot } from "./Mascot";
import styles from "./SessionProgress.module.css";

type SessionProgressProps = {
  current: number; /* 1-based: ejercicio actual */
  total: number;
};

export function SessionProgress({ current, total }: SessionProgressProps) {
  const { t } = useTranslation("quiz");
  const safeTotal = Math.max(total, 1);
  const pct = Math.min(Math.max(current / safeTotal, 0), 1) * 100;
  const text = t("progress.label", { current, total });

  return (
    <div className={styles.root}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={text}
      >
        <div className={styles.fill} style={{ width: `${pct}%` }}>
          <span className={styles.marker} aria-hidden="true">
            <Mascot expression="idle" size="xs" />
          </span>
        </div>
      </div>
      <p className={styles.text} aria-hidden="true">
        {text}
      </p>
    </div>
  );
}
