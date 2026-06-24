/*
 * VISTA FICHA (flujos §7). Preview en pantalla + maquetación @media print
 * (clases de src/styles/print.css). Renderiza los ejercicios congelados y, si se
 * pidió, una hoja de soluciones en página aparte coherente con esos valores.
 *
 * La barra de acciones lleva .tdp-no-print (no sale en papel). La ficha lleva
 * .tdp-print-sheet. window.print() lo dispara el navegador.
 */
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { PageLayout, AppHeader, Button } from "@/components";
import { esGenerado } from "@content/types";
import type { PrintItem } from "@/lib/printSheet";
import { printAnswerText, printPromptText, printSolutionText } from "@/lib/printRender";
import styles from "./PrintSheetScreen.module.css";

type PrintSheetScreenProps = {
  subjectTitle: string;
  topicTitle: string;
  items: PrintItem[];
  includeSolutions: boolean;
  onBack: () => void;
  onHome: () => void;
};

export function PrintSheetScreen({
  subjectTitle,
  topicTitle,
  items,
  includeSolutions,
  onBack,
  onHome,
}: PrintSheetScreenProps) {
  const { t } = useTranslation(["print", "quiz"]);

  return (
    <PageLayout
      width="wide"
      header={
        <div className="tdp-no-print">
          <AppHeader title={t("print:title")} onBack={onBack} onHome={onHome} />
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
          <h1 className={styles.sheetTitle}>{subjectTitle}</h1>
          <p className={styles.meta}>
            {t("print:sheet.topicLabel")}: {topicTitle}
          </p>
          <p className={styles.fields}>
            <span>
              {t("print:sheet.name")}: <span className="tdp-print-field" />
            </span>
            <span>
              {t("print:sheet.date")}: <span className="tdp-print-field" />
            </span>
          </p>
        </header>

        <h2 className={styles.blockTitle}>{t("print:exercisesTitle")}</h2>
        <ol className={styles.list}>
          {items.map((item, i) => (
            <li key={`${item.exercise.id}-${i}`} className="tdp-print-exercise">
              <p className={esGenerado(item.exercise) ? "tdp-print-operation" : styles.prompt}>
                {printPromptText(item, t)}
              </p>
              <div className="tdp-print-answer-line" />
            </li>
          ))}
        </ol>

        <footer className="tdp-print-footer">{t("print:footer.cheer")}</footer>

        {includeSolutions ? (
          <section className="tdp-print-solutions">
            <h2 className={styles.blockTitle}>{t("print:sheet.solutionsTitle")}</h2>
            <ol className={styles.list}>
              {items.map((item, i) => (
                <li key={`sol-${item.exercise.id}-${i}`}>
                  <Fragment>
                    {printSolutionText(item, t)}
                    {": "}
                    <strong>{printAnswerText(item, t)}</strong>
                  </Fragment>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </article>
    </PageLayout>
  );
}
