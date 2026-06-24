/*
 * ZONA IMPRIMIR (flujos §7). Elegir materia → tema → opciones → crear ficha.
 * Reusa SubjectCard/TopicCard. La generación y vista la hace PrintSheetScreen.
 */
import { useTranslation } from "react-i18next";
import { PageLayout, AppHeader, SubjectCard, TopicCard, Button, ToggleSwitch } from "@/components";
import type { IconName } from "@/components";
import type { SubjectVM, TopicVM } from "@/lib/catalog";
import styles from "./PrintConfigScreen.module.css";

type PrintConfigScreenProps = {
  subjects: SubjectVM[];
  topics: TopicVM[] | null;
  selectedSubjectTitle?: string;
  includeSolutions: boolean;
  onSelectSubject: (id: string) => void;
  onSelectTopic: (id: string) => void;
  onToggleSolutions: (on: boolean) => void;
  onCreate: () => void;
  canCreate: boolean;
  onBack: () => void;
  onHome: () => void;
};

export function PrintConfigScreen({
  subjects,
  topics,
  selectedSubjectTitle,
  includeSolutions,
  onSelectSubject,
  onSelectTopic,
  onToggleSolutions,
  onCreate,
  canCreate,
  onBack,
  onHome,
}: PrintConfigScreenProps) {
  const { t } = useTranslation(["print", "content"]);
  const showingTopics = topics !== null;

  return (
    <PageLayout
      width="wide"
      header={<AppHeader title={t("print:title")} onBack={onBack} onHome={onHome} />}
    >
      {!showingTopics ? (
        <>
          <h2 className={styles.stepTitle}>{t("print:step.subject")}</h2>
          <ul className={styles.grid} role="list">
            {subjects.map((s) => (
              <li key={s.id}>
                <SubjectCard
                  title={s.title}
                  zone={s.zone}
                  icon={s.icon as IconName}
                  colorToken={s.colorToken}
                  langTag={s.langTag}
                  soon={s.soon}
                  onClick={() => onSelectSubject(s.id)}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className={styles.stepTitle}>
            {selectedSubjectTitle ? `${selectedSubjectTitle} · ` : ""}
            {t("print:step.topic")}
          </h2>
          <ul className={styles.topicList} role="list">
            {(topics ?? []).map((tp) => (
              <li key={tp.id}>
                <TopicCard
                  title={tp.title}
                  challengeG4={tp.challengeG4}
                  soon={tp.soon}
                  onClick={() => onSelectTopic(tp.id)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.options}>
            <ToggleSwitch
              checked={includeSolutions}
              label={t("print:includeSolutions")}
              stateLabel={includeSolutions ? t("print:solutions.on") : t("print:solutions.off")}
              onToggle={() => onToggleSolutions(!includeSolutions)}
            />
            <Button variant="primary" size="lg" onClick={onCreate} disabled={!canCreate}>
              {t("print:create")}
            </Button>
          </div>
        </>
      )}
    </PageLayout>
  );
}
