/*
 * SESIÓN DE EJERCICIOS (flujos §4) — el corazón del producto.
 * Compone: header persistente (progreso + estrellas de sesión + salir),
 * ExerciseCard con la zona de respuesta del tipo correspondiente, y la zona de
 * feedback + acción.
 *
 * Esta pantalla es la MAQUETA: muestra las 4 variantes de zona de respuesta
 * del MVP a partir de un prop `kind`. Toda la LÓGICA (qué opción está marcada,
 * validar, generar mates, rotar feedback, avanzar) la pone Frontend; aquí los
 * estados visuales y los slots están listos. Los datos son placeholders.
 */
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import {
  PageLayout,
  Button,
  StarCounter,
  SessionProgress,
  ExerciseCard,
  OptionCard,
  NumPad,
  MatchingBoard,
  Icon,
} from "@/components";
import type { OptionStatus, MatchItem } from "@/components";
import styles from "./SessionScreen.module.css";

export type ResponseKind =
  | "opcion-multiple"
  | "verdadero-falso"
  | "respuesta-corta"
  | "emparejar";

type OptionVM = { id: string; label: string; status?: OptionStatus; checked?: boolean };

type SessionScreenProps = {
  current: number;
  total: number;
  sessionStars: number;
  prompt: ReactNode;
  /** idioma del contenido del ejercicio si es fijo (ej. "en" para Science/English) */
  promptLang?: "en" | "es" | null;
  kind: ResponseKind;
  /** opciones (opcion-multiple / verdadero-falso) */
  options?: OptionVM[];
  /** valor del display del NumPad (respuesta-corta) */
  numericValue?: string;
  /** columnas del emparejado */
  matchLeft?: MatchItem[];
  matchRight?: MatchItem[];
  /** feedback inline ya construido por Frontend (componente Feedback) */
  feedback?: ReactNode;
  /** habilita "comprobar" (Frontend lo decide según haya respuesta) */
  canCheck?: boolean;
  /** muestra "siguiente" en vez de "comprobar" tras responder */
  resolved?: boolean;
  onCheck?: () => void;
  onNext?: () => void;
  onSelectOption?: (id: string) => void;
  onDigit?: (d: string) => void;
  onDelete?: () => void;
  onSelectMatch?: (side: "left" | "right", id: string) => void;
  onExit?: () => void;
};

const NAME = "tdp-answer";

export function SessionScreen({
  current,
  total,
  sessionStars,
  prompt,
  promptLang,
  kind,
  options = [],
  numericValue = "",
  matchLeft = [],
  matchRight = [],
  feedback,
  canCheck = false,
  resolved = false,
  onCheck,
  onNext,
  onSelectOption,
  onDigit,
  onDelete,
  onSelectMatch,
  onExit,
}: SessionScreenProps) {
  const { t, i18n } = useTranslation("quiz");

  // Solo etiquetamos el contenido con lang cuando difiere del idioma de la UI
  // (ej. Natural Science / English en EN mientras la interfaz está en ES) — WCAG 3.1.2.
  const uiLang = i18n.language.startsWith("es") ? "es" : "en";
  const contentLang =
    promptLang && promptLang !== uiLang ? promptLang : undefined;

  return (
    <PageLayout
      width="narrow"
      header={
        <div className={styles.sessionBar}>
          <div className={styles.progress}>
            <SessionProgress current={current} total={total} />
          </div>
          <div className={styles.barRight}>
            <StarCounter count={sessionStars} />
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("session.exit")}
              onClick={onExit}
              className={styles.exit}
            >
              <Icon name="cross" size={26} aria-hidden="true" />
            </Button>
          </div>
        </div>
      }
    >
      <ExerciseCard
        prompt={prompt}
        promptId="tdp-prompt"
        contentLang={contentLang}
        feedback={feedback}
        actions={
          resolved ? (
            <Button variant="primary" size="lg" onClick={onNext}>
              {t("action.next")}
              <Icon name="chevron-right" size={24} aria-hidden="true" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={onCheck}
              disabled={!canCheck}
              aria-disabled={!canCheck}
            >
              {t("action.check")}
            </Button>
          )
        }
      >
        {/* Zona de respuesta según tipo. fieldset + radios para opción múltiple
            y V/F (A11Y-KBD-05); el enunciado etiqueta el grupo. */}
        {(kind === "opcion-multiple" || kind === "verdadero-falso") && (
          <fieldset className={styles.fieldset} aria-labelledby="tdp-prompt">
            <legend className="tdp-visually-hidden">{t("progress.label", { current, total })}</legend>
            <div
              className={
                kind === "verdadero-falso" ? styles.trueFalse : styles.optionGrid
              }
            >
              {options.map((o) => (
                <OptionCard
                  key={o.id}
                  id={`${NAME}-${o.id}`}
                  name={NAME}
                  label={o.label}
                  status={o.status}
                  checked={o.checked}
                  onChange={() => onSelectOption?.(o.id)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {kind === "respuesta-corta" && (
          <NumPad value={numericValue} onDigit={onDigit} onDelete={onDelete} />
        )}

        {kind === "emparejar" && (
          <MatchingBoard
            instruction={t("answer.matching.instruction")}
            left={matchLeft}
            right={matchRight}
            onSelect={onSelectMatch}
          />
        )}
      </ExerciseCard>
    </PageLayout>
  );
}
