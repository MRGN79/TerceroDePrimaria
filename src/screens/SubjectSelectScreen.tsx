/*
 * ELEGIR MATERIA → ELEGIR TEMA (flujos §3).
 * Rejilla de SubjectCard (2 col móvil / 2-3 tablet) y, cuando hay materia
 * elegida, lista de TopicCard. Frontend inyecta VMs ya resueltos por i18n y la
 * navegación. Mantiene la estructura visual y las clases del Maquetador.
 */
import { useTranslation } from "react-i18next";
import { PageLayout, AppHeader, SubjectCard, TopicCard } from "@/components";
import type { IconName } from "@/components";
import type { SubjectVM, TopicVM } from "@/lib/catalog";
import styles from "./SubjectSelectScreen.module.css";

type SubjectSelectScreenProps = {
  subjects: SubjectVM[];
  /** si está definido, se muestra la vista de temas de esa materia */
  topics?: TopicVM[] | null;
  selectedSubjectTitle?: string;
  onSelectSubject?: (id: string) => void;
  onSelectTopic?: (id: string) => void;
  onBack?: () => void;
  onHome?: () => void;
};

export function SubjectSelectScreen({
  subjects,
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
                title={s.title}
                zone={s.zone}
                icon={s.icon as IconName}
                colorToken={s.colorToken}
                langTag={s.langTag}
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
