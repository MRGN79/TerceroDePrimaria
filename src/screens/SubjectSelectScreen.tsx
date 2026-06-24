/*
 * ELEGIR MATERIA → ELEGIR TEMA (flujos §3).
 * Rejilla de SubjectCard (2 col móvil / 2-3 tablet) y, cuando hay materia
 * elegida, lista de TopicCard. Datos y navegación los inyecta Frontend.
 * Las materias de ejemplo son placeholders de maquetación.
 */
import { useTranslation } from "react-i18next";
import { PageLayout, AppHeader, SubjectCard, TopicCard } from "@/components";
import type { IconName } from "@/components";
import styles from "./SubjectSelectScreen.module.css";

type SubjectVM = {
  id: string;
  titleKey: string;
  zoneKey: string;
  icon: IconName;
  colorToken: string;
  langTagKey?: string;
  soon?: boolean;
};

type TopicVM = {
  id: string;
  title: string;
  challengeG4?: boolean;
  soon?: boolean;
};

type SubjectSelectScreenProps = {
  subjects?: SubjectVM[];
  /** si está definido, se muestra la vista de temas de esa materia */
  topics?: TopicVM[] | null;
  selectedSubjectTitle?: string;
  onSelectSubject?: (id: string) => void;
  onSelectTopic?: (id: string) => void;
  onBack?: () => void;
  onHome?: () => void;
};

/* Placeholder de maquetación — Frontend lo sustituye por content/materias.json */
const PLACEHOLDER_SUBJECTS: SubjectVM[] = [
  { id: "matematicas", titleKey: "content:math.title", zoneKey: "content:math.zone", icon: "star", colorToken: "--tdp-subject-math" },
  { id: "lengua", titleKey: "content:spanish.title", zoneKey: "content:spanish.zone", icon: "backpack", colorToken: "--tdp-subject-spanish" },
  { id: "ciencias", titleKey: "content:science.title", zoneKey: "content:science.zone", icon: "rocket", colorToken: "--tdp-subject-science", langTagKey: "content:science.langTag" },
  { id: "sociales", titleKey: "content:social.title", zoneKey: "content:social.zone", icon: "home", colorToken: "--tdp-subject-social" },
  { id: "ingles", titleKey: "content:english.title", zoneKey: "content:english.zone", icon: "streak", colorToken: "--tdp-subject-english", langTagKey: "content:english.langTag" },
];

export function SubjectSelectScreen({
  subjects = PLACEHOLDER_SUBJECTS,
  topics = null,
  selectedSubjectTitle,
  onSelectSubject,
  onSelectTopic,
  onBack,
  onHome,
}: SubjectSelectScreenProps) {
  const { t } = useTranslation(["subjects", "common", "content"]);
  const showingTopics = topics !== null;

  return (
    <PageLayout
      width="wide"
      header={
        <AppHeader
          title={
            showingTopics
              ? (selectedSubjectTitle ?? t("subjects:chooseTopic"))
              : t("subjects:title")
          }
          onBack={onBack}
          onHome={onHome}
        />
      }
    >
      {!showingTopics ? (
        <ul className={styles.subjectGrid} role="list">
          {subjects.map((s) => (
            <li key={s.id}>
              <SubjectCard
                title={t(s.titleKey)}
                zone={t(s.zoneKey)}
                icon={s.icon}
                colorToken={s.colorToken}
                langTag={s.langTagKey ? t(s.langTagKey) : undefined}
                soon={s.soon}
                onClick={() => onSelectSubject?.(s.id)}
              />
            </li>
          ))}
        </ul>
      ) : topics && topics.length > 0 ? (
        <ul className={styles.topicList} role="list">
          {topics.map((tp) => (
            <li key={tp.id}>
              <TopicCard
                title={tp.title}
                challengeG4={tp.challengeG4}
                soon={tp.soon}
                onClick={() => onSelectTopic?.(tp.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{t("subjects:empty")}</p>
      )}
    </PageLayout>
  );
}
