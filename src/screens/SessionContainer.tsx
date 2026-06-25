/*
 * Contenedor de sesión: conecta useSession (motor) con SessionScreen (maqueta).
 * Gestiona la confirmación de salida, el anuncio aria-live y, al terminar,
 * consolida la sesión (estrellas/racha/medallas) y muestra Resultados.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SessionScreen } from "./SessionScreen";
import { ResultsScreen } from "./ResultsScreen";
import { Feedback, CelebrationModal, Button } from "@/components";
import type { Materia } from "@content/types";
import { useSession } from "@/hooks/useSession";
import { useGameStore } from "@/state/gameContext";
import type { ConsolidationResult } from "@/state/consolidation";
import { badgeDef } from "@/lib/badges";

type SessionContainerProps = {
  materia: Materia;
  tema: string | null;
  isDailyGoal: boolean;
  onExit: () => void;
  onHome: () => void;
  onPlayAgain: () => void;
};

export function SessionContainer({
  materia,
  tema,
  isDailyGoal,
  onExit,
  onHome,
  onPlayAgain,
}: SessionContainerProps) {
  const { t } = useTranslation(["quiz", "results", "common", "content"]);
  const { consolidateSession } = useGameStore();

  const {
    view,
    selectOption,
    inputDigit,
    deleteDigit,
    selectMatch,
    check,
    next,
    summary,
  } = useSession(materia, tema);

  const [confirmExit, setConfirmExit] = useState(false);
  const [result, setResult] = useState<ConsolidationResult | null>(null);
  const consolidated = useRef(false);

  // Al terminar la secuencia, consolidar una sola vez.
  useEffect(() => {
    if (view?.finished && !consolidated.current) {
      consolidated.current = true;
      const r = consolidateSession({
        starsEarned: summary.starsEarned,
        correctByTopic: summary.correctByTopic,
        subjectTried: materia,
        isDailyGoal,
      });
      setResult(r);
    }
  }, [view?.finished, consolidateSession, summary, materia, isDailyGoal]);

  const handleExit = useCallback(() => setConfirmExit(true), []);

  if (view?.finished && result) {
    const newBadgeId = result.newBadgeIds[0];
    const def = newBadgeId ? badgeDef(newBadgeId) : undefined;
    return (
      <ResultsScreen
        starsEarned={summary.starsEarned}
        streakDays={result.streakDays}
        streakFirst={result.streakOutcome === "first"}
        newBadge={def ? { name: t(def.nameKey), colorToken: def.colorToken } : null}
        dailyGoalDone={isDailyGoal}
        onPlayAgain={onPlayAgain}
        onHome={onHome}
      />
    );
  }

  if (!view) return null;

  return (
    <>
      <SessionScreen
        current={view.current}
        total={view.total}
        sessionStars={view.sessionStars}
        prompt={view.prompt}
        promptLang={view.promptLang}
        kind={view.kind}
        options={view.options}
        numericValue={view.numericValue}
        matchLeft={view.matchLeft}
        matchRight={view.matchRight}
        feedback={
          view.feedback ? (
            <Feedback kind={view.feedback.kind} message={view.feedback.message} />
          ) : undefined
        }
        canCheck={view.canCheck}
        resolved={view.resolved}
        onCheck={check}
        onNext={next}
        onSelectOption={selectOption}
        onDigit={inputDigit}
        onDelete={deleteDigit}
        onSelectMatch={selectMatch}
        onExit={handleExit}
      />

      {/* Anuncio aria-live del resultado / emparejado para lectores de pantalla */}
      <p className="tdp-visually-hidden" aria-live="polite">
        {view.liveMessage}
      </p>

      <CelebrationModal
        open={confirmExit}
        titleId="tdp-exit-confirm"
        title={t("quiz:session.exitConfirm.title")}
        closeLabel={t("quiz:session.exitConfirm.stay")}
        onClose={() => setConfirmExit(false)}
        actions={
          <>
            <Button variant="primary" size="lg" onClick={() => setConfirmExit(false)}>
              {t("quiz:session.exitConfirm.stay")}
            </Button>
            <Button variant="secondary" size="lg" onClick={onExit}>
              {t("quiz:session.exitConfirm.leave")}
            </Button>
          </>
        }
      />
    </>
  );
}
