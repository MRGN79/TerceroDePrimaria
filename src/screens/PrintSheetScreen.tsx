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
  nickname?: string;
  avatarEmoji?: string;
  onBack: () => void;
  onHome: () => void;
};

export function PrintSheetScreen({
  subjectTitle,
  topicTitle,
  items,
  includeSolutions,
  nickname,
  avatarEmoji,
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
          {(avatarEmoji || nickname) ? (
            <p className={styles.avatarRow} aria-label={nickname}>
              {avatarEmoji ? <span className={styles.avatarEmoji} aria-hidden="true">{avatarEmoji}</span> : null}
              {nickname ? <span className={styles.avatarName}>{nickname}</span> : null}
            </p>
          ) : null}
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

        <div className={styles.doodleZone} aria-hidden="true">
          <p className={styles.doodleLabel}>{t("print:doodle.label")}</p>
          <div className="tdp-print-doodles">
            {/* Estrella */}
            <svg viewBox="0 0 100 100" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round">
              <polygon points="50,10 60,36 88,38 66,55 74,82 50,67 26,82 34,55 12,38 40,36" />
            </svg>
            {/* Gato */}
            <svg viewBox="0 0 100 100" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
              <circle cx="50" cy="57" r="30" />
              <polygon points="22,38 15,14 40,32" />
              <polygon points="78,38 85,14 60,32" />
              <ellipse cx="37" cy="52" rx="5" ry="6" />
              <ellipse cx="63" cy="52" rx="5" ry="6" />
              <polygon points="50,62 45,68 55,68" />
              <path d="M45,68 Q50,74 55,68" />
              <line x1="8" y1="56" x2="33" y2="60" />
              <line x1="8" y1="64" x2="33" y2="64" />
              <line x1="67" y1="60" x2="92" y2="56" />
              <line x1="67" y1="64" x2="92" y2="64" />
            </svg>
            {/* Cohete */}
            <svg viewBox="0 0 100 100" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
              <path d="M50,8 C36,24 30,50 32,74 L68,74 C70,50 64,24 50,8 Z" />
              <circle cx="50" cy="42" r="10" />
              <path d="M32,72 L18,88 L32,84" />
              <path d="M68,72 L82,88 L68,84" />
              <path d="M38,74 Q44,90 50,87 Q56,90 62,74" />
            </svg>
            {/* Sol */}
            <svg viewBox="0 0 100 100" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
              <circle cx="50" cy="50" r="18" />
              <line x1="50" y1="6" x2="50" y2="24" />
              <line x1="50" y1="76" x2="50" y2="94" />
              <line x1="6" y1="50" x2="24" y2="50" />
              <line x1="76" y1="50" x2="94" y2="50" />
              <line x1="20" y1="20" x2="33" y2="33" />
              <line x1="67" y1="67" x2="80" y2="80" />
              <line x1="80" y1="20" x2="67" y2="33" />
              <line x1="33" y1="67" x2="20" y2="80" />
            </svg>
            {/* Flor */}
            <svg viewBox="0 0 100 100" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
              <ellipse cx="50" cy="26" rx="9" ry="16" />
              <ellipse cx="50" cy="26" rx="9" ry="16" transform="rotate(60,50,50)" />
              <ellipse cx="50" cy="26" rx="9" ry="16" transform="rotate(120,50,50)" />
              <ellipse cx="50" cy="26" rx="9" ry="16" transform="rotate(180,50,50)" />
              <ellipse cx="50" cy="26" rx="9" ry="16" transform="rotate(240,50,50)" />
              <ellipse cx="50" cy="26" rx="9" ry="16" transform="rotate(300,50,50)" />
              <circle cx="50" cy="50" r="11" />
              <line x1="50" y1="61" x2="50" y2="93" />
              <path d="M50,78 Q38,72 34,62" />
            </svg>
          </div>
        </div>

        {includeSolutions ? (
          <>
            <div className={`${styles.pageBreakHint} tdp-no-print`} aria-hidden="true">
              {t("print:solutionsHint")}
            </div>
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
          </>
        ) : null}
      </article>
    </PageLayout>
  );
}
