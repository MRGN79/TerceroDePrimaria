/*
 * MOCHILA — mis estrellas, racha y medallas (flujos §6).
 * Escaparate del orgullo del niño. Motiva sin comparar (no hay ranking).
 * Datos vía props; medallas de ejemplo son placeholders de maquetación.
 */
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PageLayout,
  AppHeader,
  StarCounter,
  StreakBadge,
  Badge,
} from "@/components";
import styles from "./BackpackScreen.module.css";

type BadgeVM = {
  id: string;
  name: string;
  hint?: string;
  locked?: boolean;
  unlockedOn?: string;
  colorToken?: string;
};

type TopicProgressVM = {
  id: string;
  title: string;
  mastered: number;
  total: number;
};

type SubjectProgressVM = {
  id: string;
  title: string;
  colorToken: string;
  topics: TopicProgressVM[];
};

type BackpackScreenProps = {
  nickname?: string;
  totalStars?: number;
  currentStreak?: number;
  bestStreak?: number;
  badges?: BadgeVM[];
  subjectProgress?: SubjectProgressVM[];
  onHome?: () => void;
};

const PLACEHOLDER_BADGES: BadgeVM[] = [
  { id: "firstSession", name: "content:badge.firstSession.name", locked: true },
  { id: "streak3", name: "content:badge.streak3.name", locked: true },
  { id: "explorer", name: "content:badge.explorer.name", locked: true },
  { id: "hundredStars", name: "content:badge.hundredStars.name", locked: true },
];

export function BackpackScreen({
  nickname = "Explorador",
  totalStars = 0,
  currentStreak = 0,
  bestStreak = 0,
  badges = PLACEHOLDER_BADGES,
  subjectProgress = [],
  onHome,
}: BackpackScreenProps) {
  const { t } = useTranslation(["backpack", "content"]);

  return (
    <PageLayout
      width="wide"
      header={<AppHeader title={`${t("backpack:title")} · ${nickname}`} onHome={onHome} />}
    >
      <section className={styles.summary} aria-label={t("backpack:stars")}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t("backpack:stars")}</span>
          <StarCounter count={totalStars} size="lg" />
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t("backpack:streak.current")}</span>
          <StreakBadge days={currentStreak} variant={currentStreak > 0 ? "normal" : "empty"} />
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t("backpack:streak.best")}</span>
          <StreakBadge days={bestStreak} variant={bestStreak > 0 ? "normal" : "empty"} />
        </div>
      </section>

      <section aria-labelledby="badges-title">
        <h2 id="badges-title" className={styles.badgesTitle}>
          {t("backpack:badges.title")}
        </h2>
        <ul className={styles.badgeGrid} role="list">
          {badges.map((b) => (
            <li key={b.id}>
              <Badge
                name={b.name.startsWith("content:") ? t(b.name) : b.name}
                hint={b.hint}
                locked={b.locked}
                unlockedOn={b.unlockedOn}
                colorToken={b.colorToken}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="progress-title">
        <h2 id="progress-title" className={styles.progressTitle}>
          {t("backpack:progress.title")}
        </h2>
        {subjectProgress.length === 0 ? (
          <p className={styles.progressEmpty}>{t("backpack:progress.empty")}</p>
        ) : (
          subjectProgress.map((subject) => (
            <div key={subject.id} className={styles.progressSubject}>
              <h3
                className={styles.progressSubjectName}
                style={{ "--subject-color": `var(${subject.colorToken})` } as React.CSSProperties}
              >
                {subject.title}
              </h3>
              <ul className={styles.topicList} role="list">
                {subject.topics.map((topic) => {
                  const pct =
                    topic.total > 0
                      ? Math.min(100, Math.round((topic.mastered / topic.total) * 100))
                      : 0;
                  return (
                    <li key={topic.id} className={styles.topicRow}>
                      <span className={styles.topicName}>{topic.title}</span>
                      <div className={styles.topicBar}>
                        <div
                          className={styles.progressBar}
                          role="progressbar"
                          aria-valuenow={topic.mastered}
                          aria-valuemin={0}
                          aria-valuemax={topic.total}
                          aria-label={`${topic.title}: ${topic.mastered} ${t("backpack:progress.of")} ${topic.total}`}
                        >
                          <div
                            className={styles.progressFill}
                            style={
                              {
                                width: pct > 0 ? `max(4px, ${pct}%)` : "0",
                                "--fill-color": `var(${subject.colorToken})`,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                        <span className={styles.topicCount} aria-hidden="true">
                          {topic.mastered}/{topic.total}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </section>
    </PageLayout>
  );
}
