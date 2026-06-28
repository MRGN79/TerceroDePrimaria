import { useTranslation } from "react-i18next";
import { PageLayout, AppHeader, Button } from "@/components";
import styles from "./CalligraphySheet.module.css";

type CalligraphySheetProps = {
  jokeKeys: string[];
  onBack: () => void;
  onHome: () => void;
};

export function CalligraphySheet({ jokeKeys, onBack, onHome }: CalligraphySheetProps) {
  const { t } = useTranslation(["calligraphy", "print"]);

  return (
    <PageLayout
      width="wide"
      header={
        <div className="tdp-no-print">
          <AppHeader title={t("calligraphy:title")} onBack={onBack} onHome={onHome} />
        </div>
      }
    >
      <div className={`${styles.actions} tdp-no-print`}>
        <Button variant="primary" size="lg" onClick={() => window.print()}>
          {t("print:action.print")}
        </Button>
        <Button variant="secondary" size="lg" onClick={onBack}>
          {t("print:action.back")}
        </Button>
      </div>

      <article className={`tdp-print-sheet ${styles.sheet}`}>
        <header className="tdp-print-header">
          <h1 className={styles.sheetTitle}>{t("calligraphy:title")}</h1>
          <p className={styles.subtitle}>{t("calligraphy:subtitle")}</p>
          <p className={styles.fields}>
            <span>
              {t("print:sheet.name")}: <span className="tdp-print-field" />
            </span>
            <span>
              {t("print:sheet.date")}: <span className="tdp-print-field" />
            </span>
          </p>
        </header>

        {jokeKeys.map((key, i) => {
          const joke = t(key);
          return (
            <div key={i} className={styles.jokeBlock}>
              <p className={styles.stepLabel}>{t("calligraphy:step.read")}</p>
              <p className={styles.normalText}>{joke}</p>
              <p className={styles.stepLabel}>{t("calligraphy:step.trace")}</p>
              <p className={styles.traceText} aria-hidden="true">{joke}</p>
              <p className={styles.stepLabel}>{t("calligraphy:step.write")}</p>
              <div className={styles.writeLine} />
              <div className={styles.writeLine} />
              <div className={styles.writeLine} />
            </div>
          );
        })}

        <footer className="tdp-print-footer">{t("calligraphy:footer")}</footer>
      </article>
    </PageLayout>
  );
}
